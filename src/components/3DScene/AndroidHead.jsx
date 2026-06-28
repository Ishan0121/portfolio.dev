import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const whitePlastic = { color: "#ffffff", roughness: 0.1, metalness: 0.2 };
const darkFrame = { color: "#111111", roughness: 0.5, metalness: 0.8 };
const eyeGlow = "#00ffff";

export function AndroidHead() {
  const groupRef = useRef();
  const headRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.1;
    }
    if (headRef.current) {
      // Looks around
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.5;
      headRef.current.rotation.x = Math.cos(t * 1.2) * 0.2;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Neck */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 1, 32]} />
          <meshStandardMaterial {...darkFrame} />
        </mesh>
        
        <group ref={headRef} position={[0, -0.5, 0]}>
          
          {/* Main Skull */}
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
            <meshStandardMaterial {...whitePlastic} side={THREE.DoubleSide} />
          </mesh>
          
          {/* Face Plate (Black Visor) */}
          <mesh position={[0, 1, 0.6]} rotation={[-0.2, 0, 0]}>
            <cylinderGeometry args={[0.8, 0.7, 0.8, 32, 1, false, -Math.PI / 2.5, Math.PI / 1.25]} />
            <meshStandardMaterial {...darkFrame} />
          </mesh>

          {/* Glowing Eyes inside Visor */}
          <group position={[0, 1.1, 1.2]}>
             <mesh position={[-0.3, 0, 0]} rotation={[0, -0.2, 0]}>
               <boxGeometry args={[0.3, 0.08, 0.1]} />
               <meshStandardMaterial color={eyeGlow} emissive={eyeGlow} emissiveIntensity={3} toneMapped={false} />
             </mesh>
             <mesh position={[0.3, 0, 0]} rotation={[0, 0.2, 0]}>
               <boxGeometry args={[0.3, 0.08, 0.1]} />
               <meshStandardMaterial color={eyeGlow} emissive={eyeGlow} emissiveIntensity={3} toneMapped={false} />
             </mesh>
          </group>
          
          {/* Audio Receptors (Ears) */}
          {[-1, 1].map((x) => (
            <mesh key={`ear-${x}`} position={[x * 0.9, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
               <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
               <meshStandardMaterial {...darkFrame} />
            </mesh>
          ))}

          {/* Back of head details */}
          <mesh position={[0, 1.2, -0.8]}>
             <boxGeometry args={[0.6, 1, 0.2]} />
             <meshStandardMaterial {...darkFrame} />
          </mesh>
          
        </group>

        <pointLight color={eyeGlow} intensity={1.5} distance={5} position={[0, 1, 2]} />
        <pointLight color="#ffffff" intensity={2} distance={8} position={[0, 3, 2]} />

      </group>
    </group>
  );
}
