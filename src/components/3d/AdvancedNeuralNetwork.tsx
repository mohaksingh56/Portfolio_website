import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

interface AdvancedNeuralNetworkProps {
  className?: string;
}

// Individual neuron with pulsing activity
function Neuron({ position, activity, layer }: { position: [number, number, number], activity: number, layer: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + activity) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
      
      // Color based on activity
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      material.emissiveIntensity = activity * 0.5 + 0.2;
    }
  });

  const color = layer === 0 ? '#4db6ac' : layer === 1 ? '#5c9bd5' : '#9575cd';
  
  return (
    <Sphere ref={meshRef} args={[0.08]} position={position}>
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
}

// Synaptic connection with data flow
function Synapse({ start, end, activity }: { start: [number, number, number], end: [number, number, number], activity: number }) {
  const lineRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      // Animate data flow along the connection
      const flowPhase = (state.clock.elapsedTime + activity) % 2;
      lineRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const t = (i / 10 + flowPhase) % 1;
          const pos = new THREE.Vector3(...start).lerp(new THREE.Vector3(...end), t);
          child.position.copy(pos);
          child.visible = t < 0.8; // Hide near the end for flow effect
        }
      });
    }
  });

  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);

  return (
    <group ref={lineRef}>
      {/* Connection line */}
      <Line
        points={points}
        color="#4db6ac"
        lineWidth={2}
        transparent
        opacity={activity * 0.6 + 0.2}
      />
      
      {/* Data flow particles */}
      {Array.from({ length: 3 }, (_, i) => (
        <Sphere key={i} args={[0.02]} position={start}>
          <meshBasicMaterial
            color="#ffca28"
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Main neural network component
function NeuralNetworkVisualization() {
  const networkRef = useRef<THREE.Group>(null);
  
  // Generate network topology
  const network = useMemo(() => {
    const layers = [
      { neurons: 6, x: -2.5 }, // Input layer
      { neurons: 8, x: 0 },    // Hidden layer 1
      { neurons: 6, x: 2.5 }   // Output layer
    ];
    
    interface NeuronData {
      position: [number, number, number];
      activity: number;
      layer: number;
      id: number;
    }
    
    interface SynapseData {
      start: [number, number, number];
      end: [number, number, number];
      activity: number;
    }
    
    const neurons: NeuronData[] = [];
    const synapses: SynapseData[] = [];
    
    // Create neurons
    layers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.neurons; i++) {
        const y = (i - (layer.neurons - 1) / 2) * 0.6;
        const z = (Math.random() - 0.5) * 0.4;
        neurons.push({
          position: [layer.x, y, z] as [number, number, number],
          activity: Math.random(),
          layer: layerIndex,
          id: neurons.length
        });
      }
    });
    
    // Create synapses between layers
    let neuronIndex = 0;
    layers.forEach((layer, layerIndex) => {
      if (layerIndex < layers.length - 1) {
        const currentLayerStart = neuronIndex;
        const nextLayerStart = neuronIndex + layer.neurons;
        
        for (let i = 0; i < layer.neurons; i++) {
          for (let j = 0; j < layers[layerIndex + 1].neurons; j++) {
            synapses.push({
              start: neurons[currentLayerStart + i].position,
              end: neurons[nextLayerStart + j].position,
              activity: Math.random()
            });
          }
        }
      }
      neuronIndex += layer.neurons;
    });
    
    return { neurons, synapses };
  }, []);

  useFrame((state) => {
    if (networkRef.current) {
      // Gentle rotation
      networkRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      networkRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={networkRef}>
      {/* Render synapses first (behind neurons) */}
      {network.synapses.map((synapse, i) => (
        <Synapse
          key={`synapse-${i}`}
          start={synapse.start}
          end={synapse.end}
          activity={synapse.activity}
        />
      ))}
      
      {/* Render neurons */}
      {network.neurons.map((neuron, i) => (
        <Neuron
          key={`neuron-${i}`}
          position={neuron.position}
          activity={neuron.activity}
          layer={neuron.layer}
        />
      ))}
      
      {/* Layer labels */}
      <group position={[-2.5, -2.5, 0]}>
        <meshBasicMaterial transparent opacity={0.6} />
      </group>
      
      {/* Floating data packets */}
      <Sphere args={[0.03]} position={[-3, 1.5, 0.5]}>
        <meshBasicMaterial color="#ffca28" />
      </Sphere>
      <Sphere args={[0.03]} position={[3, -1.2, -0.3]}>
        <meshBasicMaterial color="#7cb342" />
      </Sphere>
    </group>
  );
}

const AdvancedNeuralNetwork: React.FC<AdvancedNeuralNetworkProps> = ({ className = "" }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#4db6ac" />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#5c9bd5" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={0.5}
          intensity={0.5}
          color="#9575cd"
        />
        
        <NeuralNetworkVisualization />
        
        {/* Background particles */}
        <group>
          {Array.from({ length: 50 }, (_, i) => (
            <Sphere
              key={i}
              args={[0.01]}
              position={[
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10
              ]}
            >
              <meshBasicMaterial
                color="#4db6ac"
                transparent
                opacity={Math.random() * 0.3 + 0.1}
              />
            </Sphere>
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default AdvancedNeuralNetwork;
