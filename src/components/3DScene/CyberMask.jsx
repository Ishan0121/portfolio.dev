import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const darkMetal = { color: "#111111", metalness: 0.9, roughness: 0.5 };
const silverMetal = { color: "#eeeeee", metalness: 1, roughness: 0.2 };
const eyeColor = "#ff0033"; // Sinister red
const ventColor = "#00ffff"; // Cyan for respiration vents

export function CyberMask() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.3;
      groupRef.current.rotation.x = Math.cos(t * 1.2) * 0.1;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Main Faceplate */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.0, 3, 32, 1, false, -Math.PI / 2.5, Math.PI / 1.25]} />
          <meshStandardMaterial {...darkMetal} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Forehead Armor */}
        <mesh position={[0, 1.2, 0.2]}>
          <boxGeometry args={[2.5, 0.6, 1]} />
          <meshStandardMaterial {...silverMetal} />
        </mesh>

        {/* Cyber Eyes */}
        <group position={[0, 0.5, 1.0]}>
          {/* Left Eye */}
          <mesh position={[-0.5, 0, 0]} rotation={[0, -0.2, 0]}>
             <boxGeometry args={[0.6, 0.15, 0.2]} />
             <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={3} toneMapped={false} />
          </mesh>
          {/* Right Eye */}
          <mesh position={[0.5, 0, 0]} rotation={[0, 0.2, 0]}>
             <boxGeometry args={[0.6, 0.15, 0.2]} />
             <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={3} toneMapped={false} />
          </mesh>
        </group>

        {/* Respirator / Lower Jaw */}
        <group position={[0, -0.8, 1.0]}>
          <mesh>
             <boxGeometry args={[1.2, 0.8, 0.5]} />
             <meshStandardMaterial {...silverMetal} />
          </mesh>
          {/* Vents */}
          {[-0.3, 0, 0.3].map((x, i) => (
            <mesh key={`vent-${i}`} position={[x, 0, 0.26]}>
               <boxGeometry args={[0.1, 0.5, 0.1]} />
               <meshStandardMaterial color={ventColor} emissive={ventColor} emissiveIntensity={2} toneMapped={false} />
            </mesh>
          ))}
          {/* Side Filters */}
          {[-0.7, 0.7].map((x, i) => (
            <mesh key={`filter-${i}`} position={[x, 0, -0.2]} rotation={[0, 0, Math.PI / 2]}>
               <cylinderGeometry args={[0.3, 0.3, 0.4, 16]} />
               <meshStandardMaterial {...darkMetal} />
            </mesh>
          ))}
        </group>

        {/* Head Straps / Mechanics on the side */}
        <mesh position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
           <torusGeometry args={[1.2, 0.1, 16, 32]} />
           <meshStandardMaterial {...darkMetal} />
        </mesh>
        <mesh position={[0, 0.8, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
           <torusGeometry args={[1.1, 0.08, 16, 32]} />
           <meshStandardMaterial {...darkMetal} />
        </mesh>

        <pointLight color={eyeColor} intensity={2} distance={5} position={[0, 0.5, 1.5]} />
        <pointLight color={ventColor} intensity={2} distance={4} position={[0, -1, 1.5]} />

      </group>
    </group>
  );
}
