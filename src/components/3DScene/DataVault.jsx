import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const armorProps = { color: "#1a1a1a", metalness: 0.8, roughness: 0.3 };
const lockProps = { color: "#ffcc00", metalness: 1, roughness: 0.2 };
const vaultGlow = "#ff3300";

export function DataVault() {
  const groupRef = useRef();
  const coreRef = useRef();
  
  const plate0 = useRef();
  const plate1 = useRef();
  const plate2 = useRef();
  const plate3 = useRef();
  const plate4 = useRef();
  const plate5 = useRef();

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

    // Vault expanding/breathing effect
    const expansion = Math.sin(t * 1.2) * 0.5 + 0.5; // 0 to 1
    const offset = 1.0 + expansion * 0.3;

    if (plate0.current) plate0.current.position.z = offset;
    if (plate1.current) plate1.current.position.z = -offset;
    if (plate2.current) plate2.current.position.x = offset;
    if (plate3.current) plate3.current.position.x = -offset;
    if (plate4.current) plate4.current.position.y = offset;
    if (plate5.current) plate5.current.position.y = -offset;
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 1;

  return (
    <group position={[0, -0.5, -4]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Core Energy */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial color={vaultGlow} emissive={vaultGlow} emissiveIntensity={2} wireframe />
        </mesh>

        {/* Armor Plates */}
        {/* Front & Back */}
        <group ref={plate0} rotation={[0, 0, 0]}>
          <VaultPlate />
        </group>
        <group ref={plate1} rotation={[0, Math.PI, 0]}>
          <VaultPlate />
        </group>
        
        {/* Right & Left */}
        <group ref={plate2} rotation={[0, Math.PI / 2, 0]}>
          <VaultPlate />
        </group>
        <group ref={plate3} rotation={[0, -Math.PI / 2, 0]}>
          <VaultPlate />
        </group>

        {/* Top & Bottom */}
        <group ref={plate4} rotation={[-Math.PI / 2, 0, 0]}>
          <VaultPlate />
        </group>
        <group ref={plate5} rotation={[Math.PI / 2, 0, 0]}>
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
