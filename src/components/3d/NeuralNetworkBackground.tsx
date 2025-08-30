import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNetworkProps {
  nodeCount?: number;
  connections?: number;
}

const NeuralNode = ({ position, connections }: { position: [number, number, number], connections: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2 + position[0]) * 0.1);
      
      // Pulsing effect based on connections
      const intensity = 0.5 + (connections / 10) * 0.5;
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = intensity + Math.sin(time * 3) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial 
        color="#4db6ac" 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

const ConnectionLine = ({ start, end, strength }: { 
  start: [number, number, number], 
  end: [number, number, number],
  strength: number 
}) => {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.elapsedTime;
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = strength * (0.3 + Math.sin(time * 2) * 0.1);
    }
  });

  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
      color: "#5c9bd5", 
      transparent: true, 
      opacity: 0.4 
    }))} ref={lineRef} />
  );
};

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ 
  nodeCount = 20, 
  connections = 8 
}) => {
  // Generate neural network nodes
  const nodes = React.useMemo(() => {
    const nodeArray = [];
    for (let i = 0; i < nodeCount; i++) {
      nodeArray.push({
        position: [
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 2,
        ] as [number, number, number],
        connections: Math.floor(Math.random() * connections) + 1,
        id: i,
      });
    }
    return nodeArray;
  }, [nodeCount, connections]);

  // Generate connections between nodes
  const networkConnections = React.useMemo(() => {
    const connectionArray = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].position[0] - nodes[j].position[0], 2) +
          Math.pow(nodes[i].position[1] - nodes[j].position[1], 2) +
          Math.pow(nodes[i].position[2] - nodes[j].position[2], 2)
        );
        
        if (distance < 1.5 && Math.random() > 0.7) {
          connectionArray.push({
            start: nodes[i].position,
            end: nodes[j].position,
            strength: 1 - distance / 1.5,
          });
        }
      }
    }
    return connectionArray;
  }, [nodes]);

  return (
    <group>
      {/* Render neural nodes */}
      {nodes.map((node, index) => (
        <NeuralNode 
          key={index}
          position={node.position}
          connections={node.connections}
        />
      ))}
      
      {/* Render connections */}
      {networkConnections.map((connection, index) => (
        <ConnectionLine
          key={index}
          start={connection.start}
          end={connection.end}
          strength={connection.strength}
        />
      ))}
    </group>
  );
};

const NeuralNetworkBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <NeuralNetwork nodeCount={25} connections={6} />
      </Canvas>
    </div>
  );
};

export default NeuralNetworkBackground;
