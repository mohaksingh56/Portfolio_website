import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

interface DataFlowVisualizationProps {
  className?: string;
  theme?: 'neural' | 'quantum' | 'genetic';
}

// Flowing data packet
function DataPacket({ path, progress, color }: { 
  path: THREE.CatmullRomCurve3; 
  progress: number; 
  color: string; 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      const point = path.getPoint(progress);
      meshRef.current.position.copy(point);
      
      // Add some rotation
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.03;
    }
  });

  return (
    <Box ref={meshRef} args={[0.03, 0.03, 0.03]}>
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
      />
    </Box>
  );
}

// Data flow stream
function DataStream({ startPoint, endPoint, color, speed = 1 }: {
  startPoint: [number, number, number];
  endPoint: [number, number, number];
  color: string;
  speed?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...startPoint);
    const end = new THREE.Vector3(...endPoint);
    const mid1 = start.clone().lerp(end, 0.33).add(new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 1
    ));
    const mid2 = start.clone().lerp(end, 0.66).add(new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 1
    ));
    
    return new THREE.CatmullRomCurve3([start, mid1, mid2, end]);
  }, [startPoint, endPoint]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.005, 8, false);
  }, [curve]);

  const packets = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      progress: i * 0.2,
      color
    }));
  }, [color]);

  useFrame(() => {
    packets.forEach((packet) => {
      packet.progress = (packet.progress + speed * 0.01) % 1;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Stream tube */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Data packets */}
      {packets.map((packet) => (
        <DataPacket
          key={packet.id}
          path={curve}
          progress={packet.progress}
          color={packet.color}
        />
      ))}
    </group>
  );
}

// Central processing node
function ProcessingNode({ position, size = 0.2, color, pulseSpeed = 1 }: {
  position: [number, number, number];
  size?: number;
  color: string;
  pulseSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
    
    if (ringsRef.current) {
      ringsRef.current.rotation.x += 0.01;
      ringsRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group position={position}>
      {/* Core sphere */}
      <Sphere ref={meshRef} args={[size]}>
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </Sphere>
      
      {/* Orbital rings */}
      <group ref={ringsRef}>
        {[0.3, 0.4, 0.5].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, i * Math.PI / 3]}>
            <torusGeometry args={[radius, 0.005, 8, 32]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.4 - i * 0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Main data flow visualization
function DataFlowSystem({ theme }: { theme: 'neural' | 'quantum' | 'genetic' }) {
  const systemRef = useRef<THREE.Group>(null);
  
  const config = {
    neural: {
      nodes: [
        { pos: [-2, 1, 0] as [number, number, number], color: '#4db6ac' },
        { pos: [0, 0, 0] as [number, number, number], color: '#5c9bd5' },
        { pos: [2, -1, 0] as [number, number, number], color: '#9575cd' },
        { pos: [-1, -1.5, 0] as [number, number, number], color: '#ffca28' },
        { pos: [1, 1.5, 0] as [number, number, number], color: '#7cb342' }
      ],
      connections: [
        [0, 1], [1, 2], [0, 3], [3, 1], [1, 4], [4, 2]
      ]
    },
    quantum: {
      nodes: [
        { pos: [0, 0, 0] as [number, number, number], color: '#9c27b0' },
        { pos: [1.5, 0, 1.5] as [number, number, number], color: '#3f51b5' },
        { pos: [-1.5, 0, 1.5] as [number, number, number], color: '#00bcd4' },
        { pos: [0, 1.5, -1.5] as [number, number, number], color: '#4caf50' },
        { pos: [0, -1.5, -1.5] as [number, number, number], color: '#ff9800' }
      ],
      connections: [
        [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 3], [3, 4], [4, 1]
      ]
    },
    genetic: {
      nodes: [
        { pos: [-2, 0, 0] as [number, number, number], color: '#e91e63' },
        { pos: [-1, 1.5, 0] as [number, number, number], color: '#9c27b0' },
        { pos: [0, 0, 1.5] as [number, number, number], color: '#673ab7' },
        { pos: [1, 1.5, 0] as [number, number, number], color: '#3f51b5' },
        { pos: [2, 0, 0] as [number, number, number], color: '#2196f3' },
        { pos: [1, -1.5, 0] as [number, number, number], color: '#00bcd4' },
        { pos: [0, 0, -1.5] as [number, number, number], color: '#009688' },
        { pos: [-1, -1.5, 0] as [number, number, number], color: '#4caf50' }
      ],
      connections: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
        [0, 2], [2, 4], [4, 6], [6, 0], [1, 3], [3, 5], [5, 7], [7, 1]
      ]
    }
  };

  const currentConfig = config[theme];

  useFrame((state) => {
    if (systemRef.current) {
      systemRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={systemRef}>
      {/* Processing nodes */}
      {currentConfig.nodes.map((node, i) => (
        <ProcessingNode
          key={i}
          position={node.pos}
          color={node.color}
          pulseSpeed={1 + i * 0.2}
          size={0.15 + Math.sin(i) * 0.05}
        />
      ))}
      
      {/* Data streams */}
      {currentConfig.connections.map(([start, end], i) => (
        <DataStream
          key={i}
          startPoint={currentConfig.nodes[start].pos}
          endPoint={currentConfig.nodes[end].pos}
          color={currentConfig.nodes[start].color}
          speed={0.8 + Math.random() * 0.4}
        />
      ))}
      
      {/* Ambient floating particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <Sphere
          key={i}
          args={[0.01]}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4
          ]}
        >
          <meshBasicMaterial
            color={currentConfig.nodes[i % currentConfig.nodes.length].color}
            transparent
            opacity={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
}

const DataFlowVisualization: React.FC<DataFlowVisualizationProps> = ({ 
  className = "", 
  theme = 'neural' 
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-3, -3, 3]} intensity={0.6} color="#4db6ac" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.4}
          penumbra={0.5}
          intensity={0.7}
          color="#5c9bd5"
        />
        
        <DataFlowSystem theme={theme} />
      </Canvas>
    </div>
  );
};

export default DataFlowVisualization;
