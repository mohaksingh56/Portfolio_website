import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

interface DataVisualizationProps {
  data?: number[];
  title?: string;
}

const DataBar = ({ height, position, index }: { 
  height: number, 
  position: [number, number, number], 
  index: number 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      // Animated growth effect
      const targetScale = height;
      const currentScale = meshRef.current.scale.y;
      meshRef.current.scale.y = THREE.MathUtils.lerp(currentScale, targetScale, 0.05);
      
      // Color animation based on height
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      const colorIntensity = height * 0.8 + 0.2;
      material.emissive.setHSL(0.5 + colorIntensity * 0.2, 0.7, colorIntensity * 0.3);
      
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[1, 0.1, 1]}>
      <boxGeometry args={[0.3, 1, 0.3]} />
      <meshStandardMaterial 
        color="#4db6ac"
        emissive="#001a1a"
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  );
};

const FloatingLabel = ({ text, position }: { text: string, position: [number, number, number] }) => {
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.1}
        height={0.01}
        position={position}
        curveSegments={8}
      >
        {text}
        <meshStandardMaterial color="#5c9bd5" emissive="#001133" />
      </Text3D>
    </Float>
  );
};

const DataVisualization: React.FC<DataVisualizationProps> = ({ 
  data = [0.8, 0.6, 0.9, 0.7, 0.85, 0.75, 0.95], 
  title = "AI Model Performance" 
}) => {
  return (
    <group>
      {/* Data bars */}
      {data.map((value, index) => (
        <DataBar
          key={index}
          height={value}
          position={[(index - data.length / 2) * 0.5, 0, 0]}
          index={index}
        />
      ))}
      
      {/* Title */}
      <Center position={[0, 1.2, 0]}>
        <FloatingLabel text={title} position={[0, 0, 0]} />
      </Center>
      
      {/* Grid lines */}
      {[0.2, 0.4, 0.6, 0.8, 1.0].map((height, index) => (
        <group key={index}>
          <mesh position={[0, height - 0.5, 0]} scale={[data.length * 0.6, 0.005, 0.1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#4db6ac" transparent opacity={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const DataVisualizationCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`${className} h-64`}>
      <Canvas camera={{ position: [3, 2, 3], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4db6ac" />
        <DataVisualization 
          data={[0.85, 0.72, 0.94, 0.88, 0.91, 0.76, 0.97]} 
          title="Model Accuracy"
        />
      </Canvas>
    </div>
  );
};

export default DataVisualizationCanvas;
