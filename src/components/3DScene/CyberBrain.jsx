import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const brainMatProps = { color: "#bbbbbb", metalness: 0.7, roughness: 0.4 };
const darkSteel = { color: "#222222", metalness: 0.9, roughness: 0.7 };
const synColor = "#ff0088"; // Neon Pink
const thoughtColor = "#00ffff"; // Cyan

export function CyberBrain() {
  const leftHemisphereRef = useRef();
  const rightHemisphereRef = useRef();
  const coreRef = useRef();
  
  // Create static connection nodes
  const nodes = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 2.0
      ).clampLength(0.8, 1.4)
    }));
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (leftHemisphereRef.current) {
      leftHemisphereRef.current.position.x = -0.1 + Math.sin(t * 2) * 0.02;
    }
    if (rightHemisphereRef.current) {
      rightHemisphereRef.current.position.x = 0.1 - Math.sin(t * 2) * 0.02;
    }
    
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.rotation.z += delta * 0.3;
      const pulse = 1 + Math.sin(t * 8) * 0.05;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      {/* Base Stem / Spinal connection */}
      <mesh position={[0, -1.2, -0.5]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.2, 1.5, 16]} />
        <meshStandardMaterial {...darkSteel} />
      </mesh>
      {/* Stem rings */}
      {[ -0.8, -1.0, -1.2, -1.4 ].map((y, i) => (
        <mesh key={`ring-${i}`} position={[0, y, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
           <torusGeometry args={[0.35, 0.05, 8, 16]} />
           <meshStandardMaterial {...brainMatProps} />
        </mesh>
      ))}

      {/* Central Core (The "Pineal Gland" equivalent) */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial color={thoughtColor} emissive={thoughtColor} emissiveIntensity={3} toneMapped={false} />
      </mesh>

      {/* Left Hemisphere */}
      <group ref={leftHemisphereRef}>
        <mesh position={[-0.5, 0.2, 0]}>
          <sphereGeometry args={[1.2, 32, 32, Math.PI / 2, Math.PI]} />
          <meshStandardMaterial {...brainMatProps} wireframe={true} />
        </mesh>
        <mesh position={[-0.5, 0.2, 0]}>
          <sphereGeometry args={[1.1, 16, 16, Math.PI / 2, Math.PI]} />
          <meshStandardMaterial {...darkSteel} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Right Hemisphere */}
      <group ref={rightHemisphereRef}>
        <mesh position={[0.5, 0.2, 0]}>
          <sphereGeometry args={[1.2, 32, 32, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial {...brainMatProps} wireframe={true} />
        </mesh>
        <mesh position={[0.5, 0.2, 0]}>
          <sphereGeometry args={[1.1, 16, 16, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial {...darkSteel} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Neural Synapses (Floating nodes around the brain) */}
      {nodes.map((node, i) => (
        <mesh key={`syn-${i}`} position={node.pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={synColor} emissive={synColor} emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}

      <pointLight color={thoughtColor} intensity={2} distance={8} position={[0, 0, 0]} />
      <pointLight color={synColor} intensity={2} distance={5} position={[0, 2, 0]} />
    </group>
  );
}
