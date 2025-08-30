import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface AdvancedHolographicCardProps {
  title: string;
  description: string;
  achievement: string;
  index: number;
}

// Neural network visualization
function NeuralNetwork({ index }: { index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const nodePositions = [];
    const connections = [];
    
    // Create layers of neural network
    for (let layer = 0; layer < 3; layer++) {
      for (let node = 0; node < 4; node++) {
        nodePositions.push([
          (layer - 1) * 1.5,
          (node - 1.5) * 0.5,
          0
        ]);
      }
    }
    
    // Create connections between layers
    for (let i = 0; i < 4; i++) {
      for (let j = 4; j < 8; j++) {
        connections.push([nodePositions[i], nodePositions[j]]);
      }
      for (let j = 8; j < 12; j++) {
        connections.push([nodePositions[j - 4], nodePositions[j]]);
      }
    }
    
    return { nodePositions, connections };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={0.3}>
      {/* Neural nodes */}
      {nodes.nodePositions.map((pos, i) => (
        <Sphere key={i} args={[0.05]} position={pos as [number, number, number]}>
          <meshPhysicalMaterial
            color="#4db6ac"
            emissive="#4db6ac"
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      ))}
      
      {/* Connection lines */}
      {nodes.connections.map((connection, i) => {
        const start = new THREE.Vector3(...connection[0]);
        const end = new THREE.Vector3(...connection[1]);
        const distance = start.distanceTo(end);
        const midpoint = start.clone().add(end).multiplyScalar(0.5);
        
        return (
          <Box key={i} args={[distance, 0.01, 0.01]} position={midpoint.toArray()}>
            <meshBasicMaterial color="#5c9bd5" transparent opacity={0.6} />
          </Box>
        );
      })}
    </group>
  );
}

// DNA helix visualization
function DNAHelix() {
  const helixRef = useRef<THREE.Group>(null);
  
  const helixData = useMemo(() => {
    const points = [];
    const connections = [];
    
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 4;
      const y = (i - 20) * 0.1;
      
      // First strand
      points.push([
        Math.cos(angle) * 0.3,
        y,
        Math.sin(angle) * 0.3
      ]);
      
      // Second strand (opposite)
      points.push([
        Math.cos(angle + Math.PI) * 0.3,
        y,
        Math.sin(angle + Math.PI) * 0.3
      ]);
      
      // Connections between strands
      if (i % 3 === 0) {
        connections.push([points[i * 2], points[i * 2 + 1]]);
      }
    }
    
    return { points, connections };
  }, []);

  useFrame((state) => {
    if (helixRef.current) {
      helixRef.current.rotation.y += 0.01;
      helixRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={helixRef} scale={0.8}>
      {helixData.points.map((point, i) => (
        <Sphere key={i} args={[0.02]} position={point as [number, number, number]}>
          <meshPhysicalMaterial
            color={i % 2 === 0 ? "#7cb342" : "#9575cd"}
            emissive={i % 2 === 0 ? "#7cb342" : "#9575cd"}
            emissiveIntensity={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Quantum field visualization
function QuantumField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.002;
        positions[i + 1] += Math.cos(state.clock.elapsedTime + i * 0.5) * 0.002;
        positions[i + 2] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.3) * 0.001;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#ffca28"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const AdvancedHolographicCard: React.FC<AdvancedHolographicCardProps> = ({ 
  title, 
  description, 
  achievement, 
  index 
}) => {
  const visualizationType = index % 3; // Rotate between different 3D visualizations
  
  return (
    <div className="relative group h-80 rounded-lg overflow-hidden bg-gradient-to-br from-dark-secondary/30 to-dark-tertiary/50 border border-primary-teal/20 hover:border-primary-teal/60 transition-all duration-500 backdrop-blur-sm">
      {/* Advanced 3D Canvas Background */}
      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[2, 2, 2]} intensity={0.8} color="#4db6ac" />
          <pointLight position={[-2, -2, -2]} intensity={0.6} color="#5c9bd5" />
          
          {/* Different 3D visualizations based on index */}
          {visualizationType === 0 && <NeuralNetwork index={index} />}
          {visualizationType === 1 && <DNAHelix />}
          {visualizationType === 2 && <QuantumField />}
          
          {/* Floating accent elements */}
          <Sphere args={[0.05]} position={[1.5, 1, 0.5]}>
            <meshPhysicalMaterial
              color="#ffca28"
              emissive="#ffca28"
              emissiveIntensity={0.4}
              metalness={0.9}
              roughness={0.1}
            />
          </Sphere>
          
          <Box args={[0.08, 0.08, 0.08]} position={[-1.2, -0.8, 1]}>
            <meshPhysicalMaterial
              color="#9575cd"
              emissive="#9575cd"
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
        </Canvas>
      </div>

      {/* Holographic overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-teal/5 to-primary-blue/10 group-hover:via-primary-teal/10 group-hover:to-primary-blue/20 transition-all duration-500"></div>
      
      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-teal to-transparent animate-pulse opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-transparent via-secondary-green to-transparent animate-pulse opacity-40"></div>
      </div>

      {/* Content overlay with enhanced typography */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-primary-teal transition-colors duration-300 tracking-wide">
              {title}
            </h3>
            <div className="w-2 h-2 bg-secondary-green rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-text-secondary text-sm leading-relaxed mb-4 font-light">
            {description}
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-secondary-green/20 border border-secondary-green/40 text-secondary-green text-sm rounded-lg backdrop-blur-sm">
            <div className="w-1.5 h-1.5 bg-secondary-green rounded-full animate-pulse"></div>
            <span className="font-medium">{achievement}</span>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-teal/30 to-primary-blue/30 text-white rounded-lg border border-primary-teal/50 hover:from-primary-teal hover:to-primary-blue transition-all duration-300 text-sm font-medium backdrop-blur-sm hover:scale-105 transform">
              Explore Project
            </button>
            <button className="px-4 py-2 bg-dark-tertiary/60 text-text-muted rounded-lg border border-dark-quaternary/60 hover:border-primary-teal/50 hover:text-primary-teal transition-all duration-300 text-sm backdrop-blur-sm hover:scale-105 transform">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Corner accent elements */}
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary-teal/60"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-secondary-green/60"></div>
    </div>
  );
};

export default AdvancedHolographicCard;
