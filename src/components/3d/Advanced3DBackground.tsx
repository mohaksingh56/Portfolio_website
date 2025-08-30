import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Advanced particle system with mathematical patterns
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      // Create mathematical patterns using Fibonacci spiral and golden ratio
      const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
      const theta = i * phi * Math.PI * 2;
      const radius = Math.sqrt(i) * 0.1;
      
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      
      // Color based on position and mathematical function
      const hue = (i / 2000) * 360;
      const color = new THREE.Color().setHSL(hue / 360, 0.7, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y += 0.002;
      
      // Animate individual particles
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = Math.sin(state.clock.elapsedTime + i) * 0.1;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Morphing geometric shapes using vertex shaders
function MorphingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#4db6ac') },
        color2: { value: new THREE.Color('#5c9bd5') },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          
          // Complex morphing using multiple sine waves
          float wave1 = sin(pos.x * 2.0 + time) * 0.1;
          float wave2 = sin(pos.y * 3.0 + time * 1.5) * 0.05;
          float wave3 = sin(pos.z * 4.0 + time * 0.8) * 0.03;
          
          pos += normal * (wave1 + wave2 + wave3);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.0);
          
          vec3 color = mix(color1, color2, fresnel);
          float alpha = 0.6 + fresnel * 0.4;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.time.value = state.clock.elapsedTime;
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <icosahedronGeometry args={[1, 2]} />
    </mesh>
  );
}

// Main 3D scene component
const Advanced3DBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#4db6ac" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#5c9bd5" />
        
        <ParticleField />
        <MorphingGeometry />
        
        {/* Additional floating elements */}
        <Sphere args={[0.1]} position={[2, 1, 0]}>
          <meshPhysicalMaterial
            color="#7cb342"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </Sphere>
        
        <Sphere args={[0.05]} position={[-1.5, -1, 1]}>
          <meshPhysicalMaterial
            color="#9575cd"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};

export default Advanced3DBackground;
