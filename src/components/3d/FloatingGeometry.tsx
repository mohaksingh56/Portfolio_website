import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position?: [number, number, number];
  geometry: 'dodecahedron' | 'torus' | 'octahedron' | 'icosahedron' | 'sphere';
  color?: string;
  scale?: number;
}

export const FloatingGeometry: React.FC<FloatingGeometryProps> = ({
  position = [0, 0, 0],
  geometry = 'dodecahedron',
  color = '#4db6ac',
  scale = 1,
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Very gentle rotation - professional
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      // Subtle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const getGeometry = () => {
    switch (geometry) {
      case 'torus':
        return new THREE.TorusGeometry(0.6, 0.2, 16, 100);
      case 'octahedron':
        return new THREE.OctahedronGeometry(0.8);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(0.8);
      case 'sphere':
        return new THREE.SphereGeometry(0.8, 32, 32);
      default:
        return new THREE.DodecahedronGeometry(0.8);
    }
  };

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <primitive object={getGeometry()} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};
