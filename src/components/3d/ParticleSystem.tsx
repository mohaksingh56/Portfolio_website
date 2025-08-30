import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points } from 'three';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  size?: number;
  color?: string;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 1000,
  size = 0.02,
  color = '#00ffff',
}) => {
  const pointsRef = useRef<Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random spherical distribution
      const radius = Math.random() * 10 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color variations
      const colorObj = new THREE.Color(color);
      colorObj.setHSL(
        colorObj.getHSL({ h: 0, s: 0, l: 0 }).h + (Math.random() - 0.5) * 0.1,
        1,
        0.5 + Math.random() * 0.5
      );

      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
    }

    return [positions, colors];
  }, [count, color]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};
