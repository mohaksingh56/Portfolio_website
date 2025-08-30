import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface MorphingGeometryProps {
  complexity?: number;
}

const MorphingShape = ({ complexity = 3 }: { complexity: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [morphState, setMorphState] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotation with varying speeds
      groupRef.current.rotation.x = time * 0.3;
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.z = time * 0.1;
      
      // Morphing between different geometric forms
      const cycle = (Math.sin(time * 0.5) + 1) / 2;
      setMorphState(cycle);
      
      // Scale pulsing
      const scale = 0.8 + Math.sin(time * 2) * 0.2;
      groupRef.current.scale.setScalar(scale);
      
      // Position floating
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core sphere that morphs */}
      <Sphere args={[0.5, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#4db6ac"
          emissive="#001a1a"
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.8 + morphState * 0.2}
        />
      </Sphere>
      
      {/* Orbiting elements */}
      {Array.from({ length: complexity }).map((_, i) => {
        const angle = (i / complexity) * Math.PI * 2;
        const radius = 1 + morphState * 0.5;
        return (
          <group key={i} rotation={[0, angle, 0]}>
            <Box 
              args={[0.1, 0.1, 0.1]} 
              position={[radius, 0, 0]}
            >
              <meshStandardMaterial 
                color="#5c9bd5"
                emissive="#001133"
                metalness={0.5}
                roughness={0.4}
              />
            </Box>
          </group>
        );
      })}
      
      {/* Torus rings */}
      <Torus args={[1.2, 0.05, 8, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#7cb342"
          emissive="#001100"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </Torus>
      
      <Torus args={[1.4, 0.03, 8, 32]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial 
          color="#9575cd"
          emissive="#110011"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.4}
        />
      </Torus>
    </group>
  );
};

const MorphingGeometry: React.FC<MorphingGeometryProps> = ({ complexity = 6 }) => {
  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4db6ac" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#5c9bd5" angle={0.3} />
      
      <MorphingShape complexity={complexity} />
      
      {/* Background elements */}
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#000508"
          side={THREE.BackSide}
          transparent
          opacity={0.3}
        />
      </Sphere>
    </Canvas>
  );
};

export default MorphingGeometry;
