import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

const HolographicMaterial = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      // @ts-ignore
      meshRef.current.material.uniforms.uTime.value = time;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      pos.z += sin(pos.x * 2.0 + uTime * 2.0) * 0.1;
      pos.z += sin(pos.y * 3.0 + uTime * 1.5) * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vec2 uv = vUv;
      
      // Holographic interference pattern
      float interference = sin(uv.x * 20.0 + uTime * 2.0) * sin(uv.y * 20.0 + uTime * 1.5);
      interference *= 0.1;
      
      // RGB separation effect
      vec3 color = vec3(0.0);
      color.r = sin(uv.x * 10.0 + uTime + interference) * 0.5 + 0.5;
      color.g = sin(uv.y * 10.0 + uTime * 1.2 + interference) * 0.5 + 0.5;
      color.b = sin((uv.x + uv.y) * 8.0 + uTime * 0.8 + interference) * 0.5 + 0.5;
      
      // Edge glow
      float edge = 1.0 - smoothstep(0.0, 0.1, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
      color += edge * vec3(0.4, 0.8, 1.0) * 0.5;
      
      gl_FragColor = vec4(color * 0.3, 0.6);
    }
  `;

  return (
    <Plane ref={meshRef} args={[2, 2]}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 }
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </Plane>
  );
};

const HolographicCard: React.FC<HolographicCardProps> = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 0, 1], fov: 45 }}>
          <HolographicMaterial />
        </Canvas>
      </div>
      
      {/* Content */}
      <div className={`relative z-10 transition-transform duration-300 ${isHovered ? 'transform scale-105' : ''}`}>
        {children}
      </div>
      
      {/* Holographic borders */}
      <div className="absolute inset-0 rounded-lg border border-primary-teal/30 group-hover:border-primary-teal/60 transition-colors duration-300"></div>
      
      {/* Corner highlights */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default HolographicCard;
