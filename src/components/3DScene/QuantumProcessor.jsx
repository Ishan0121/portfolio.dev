import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const darkMetal = { color: "#111111", metalness: 0.9, roughness: 0.4 };
const goldProps = { color: "#ffcc00", metalness: 1, roughness: 0.2 };
const quantumColor = "#aa00ff"; // Deep purple
const dataColor = "#00ffff"; // Cyan

export function QuantumProcessor() {
  const groupRef = useRef();
  const coreRef = useRef();
  const particlesRef = useRef();

  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 1 + 1,
        (Math.random() - 0.5) * 3
      ),
      speed: Math.random() * 2 + 1
    }));
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2) * 0.1 - 0.5;
      groupRef.current.rotation.y = t * 0.2;
    }
    
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.5;
      const pulse = 1 + Math.sin(t * 10) * 0.1;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.2;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Base Socket */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[4, 0.2, 4]} />
          <meshStandardMaterial {...darkMetal} />
        </mesh>
        
        {/* Gold Pins Grid */}
        <group position={[0, -0.3, 0]}>
          {[-1.5, -0.5, 0.5, 1.5].map((x) => (
            [-1.5, -0.5, 0.5, 1.5].map((z) => (
              <mesh key={`pin-${x}-${z}`} position={[x, 0, z]}>
                <boxGeometry args={[0.2, 0.4, 0.2]} />
                <meshStandardMaterial {...goldProps} />
              </mesh>
            ))
          ))}
        </group>

        {/* Multi-level CPU Architecture */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 0.4, 3.2]} />
          <meshStandardMaterial {...darkMetal} />
        </mesh>
        
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2.4, 0.3, 2.4]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.6} />
        </mesh>
        
        {/* Heat sinks on the sides */}
        {[-1.3, 1.3].map((x) => (
          <group key={`sink-${x}`} position={[x, 0.3, 0]}>
             {[-0.8, -0.4, 0, 0.4, 0.8].map((z, i) => (
               <mesh key={`fin-${i}`} position={[0, 0.2, z]}>
                 <boxGeometry args={[0.6, 0.6, 0.1]} />
                 <meshStandardMaterial {...darkMetal} />
               </mesh>
             ))}
          </group>
        ))}

        {/* Quantum Core Chamber */}
        <mesh position={[0, 0.6, 0]}>
           <cylinderGeometry args={[0.8, 0.8, 0.6, 32]} />
           <meshPhysicalMaterial color="#111" transmission={0.9} roughness={0.1} thickness={0.5} />
        </mesh>

        <mesh ref={coreRef} position={[0, 0.6, 0]}>
           <icosahedronGeometry args={[0.5, 2]} />
           <meshStandardMaterial color={quantumColor} emissive={quantumColor} emissiveIntensity={3} toneMapped={false} />
        </mesh>

        {/* Quantum Data Pathways */}
        <group position={[0, 0.46, 0]}>
           {[-1, 1].map((x) => (
             [-1, 1].map((z) => (
                <mesh key={`path-${x}-${z}`} position={[x, 0, z]}>
                   <boxGeometry args={[1.5, 0.05, 0.1]} />
                   <meshStandardMaterial color={dataColor} emissive={dataColor} emissiveIntensity={2} toneMapped={false} />
                </mesh>
             ))
           ))}
        </group>

        {/* Floating Quantum Particles */}
        <group ref={particlesRef}>
          {particles.map((p, i) => (
            <mesh key={`p-${i}`} position={p.pos}>
               <sphereGeometry args={[0.03, 8, 8]} />
               <meshBasicMaterial color={Math.random() > 0.5 ? quantumColor : dataColor} />
            </mesh>
          ))}
        </group>

        <pointLight color={quantumColor} intensity={3} distance={5} position={[0, 1, 0]} />
        <pointLight color={dataColor} intensity={2} distance={4} position={[0, 0, 0]} />

      </group>
    </group>
  );
}
