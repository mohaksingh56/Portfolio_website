import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleWaveProps {
  count?: number;
  className?: string;
}

const ParticleWave = ({ count = 2000 }: { count: number }) => {
  const meshRef = useRef<THREE.Points>(null);
  
  // Generate particle positions in a wave pattern
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create wave pattern
      const x = (i % 100) * 0.1 - 5;
      const z = Math.floor(i / 100) * 0.1 - 5;
      const y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 2;
      
      positions[i3] = x + (Math.random() - 0.5) * 0.1;
      positions[i3 + 1] = y + (Math.random() - 0.5) * 0.1;
      positions[i3 + 2] = z + (Math.random() - 0.5) * 0.1;
      
      // Create gradient colors
      const colorIntensity = (y + 2) / 4;
      colors[i3] = 0.3 + colorIntensity * 0.4; // R
      colors[i3 + 1] = 0.7 + colorIntensity * 0.3; // G
      colors[i3 + 2] = 0.7 + colorIntensity * 0.2; // B
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotate the entire particle system
      meshRef.current.rotation.y = time * 0.1;
      
      // Animate wave motion
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const z = positions[i3 + 2];
        
        // Create moving wave effect
        positions[i3 + 1] = Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time * 0.5) * 2;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={meshRef} positions={positions} colors={colors}>
      <PointMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const ParticleWaveBackground: React.FC<ParticleWaveProps> = ({ 
  count = 2000, 
  className = '' 
}) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#4db6ac" />
        <ParticleWave count={count} />
      </Canvas>
    </div>
  );
};

export default ParticleWaveBackground;
