import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const armorProps = { color: "#1a1a1a", metalness: 0.8, roughness: 0.3 };
const lockProps = { color: "#ffcc00", metalness: 1, roughness: 0.2 };
const vaultGlow = "#ff3300";

export function DataVault() {
  const groupRef = useRef();
  const coreRef = useRef();
  const platesRef = useRef([]);
  if (platesRef.current.length === 0) {
    platesRef.current = Array(6).fill().map(() => React.createRef());
  }

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.2;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.5;
      coreRef.current.rotation.y += delta * 0.8;
      const pulse = 1 + Math.sin(t * 5) * 0.1;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Expanding and contracting armor plates
    const expansion = Math.sin(t * 1.2) * 0.5 + 0.5; // 0 to 1
    const offset = 1.0 + expansion * 0.3;

    if (platesRef.current[0]?.current) platesRef.current[0].current.position.z = offset;
    if (platesRef.current[1]?.current) platesRef.current[1].current.position.z = -offset;
    if (platesRef.current[2]?.current) platesRef.current[2].current.position.x = offset;
    if (platesRef.current[3]?.current) platesRef.current[3].current.position.x = -offset;
    if (platesRef.current[4]?.current) platesRef.current[4].current.position.y = offset;
    if (platesRef.current[5]?.current) platesRef.current[5].current.position.y = -offset;
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Core Data Drive */}
        <mesh ref={coreRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={vaultGlow} emissive={vaultGlow} emissiveIntensity={3} toneMapped={false} />
        </mesh>
        <mesh>
           <boxGeometry args={[1.2, 1.2, 1.2]} />
           <meshBasicMaterial color={vaultGlow} wireframe transparent opacity={0.3} />
        </mesh>

        {/* Armor Plates */}
        {/* Front & Back */}
        <group ref={platesRef.current[0]} rotation={[0, 0, 0]}>
          <VaultPlate />
        </group>
        <group ref={platesRef.current[1]} rotation={[0, Math.PI, 0]}>
          <VaultPlate />
        </group>
        
        {/* Right & Left */}
        <group ref={platesRef.current[2]} rotation={[0, Math.PI / 2, 0]}>
          <VaultPlate />
        </group>
        <group ref={platesRef.current[3]} rotation={[0, -Math.PI / 2, 0]}>
          <VaultPlate />
        </group>

        {/* Top & Bottom */}
        <group ref={platesRef.current[4]} rotation={[-Math.PI / 2, 0, 0]}>
          <VaultPlate />
        </group>
        <group ref={platesRef.current[5]} rotation={[Math.PI / 2, 0, 0]}>
          <VaultPlate />
        </group>

        <pointLight color={vaultGlow} intensity={3} distance={6} position={[0, 0, 0]} />
      </group>
    </group>
  );
}

function VaultPlate() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.8, 1.8, 0.2]} />
        <meshStandardMaterial {...armorProps} />
      </mesh>
      {/* Outer Detail frame */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshStandardMaterial color="#000" metalness={1} roughness={0.5} />
      </mesh>
      {/* Lock mechanism */}
      <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
        <meshStandardMaterial {...lockProps} />
      </mesh>
      {/* LED indicators */}
      <mesh position={[0.6, 0.6, 0.12]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={vaultGlow} emissive={vaultGlow} emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}
