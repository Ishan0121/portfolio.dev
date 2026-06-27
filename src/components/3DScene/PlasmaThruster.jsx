import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const darkSteelProps = { color: "#1a1a1a", metalness: 0.9, roughness: 0.6 };
const silverMatProps = { color: "#cccccc", metalness: 1, roughness: 0.3 };
const heatMetalProps = { color: "#3a1a1a", metalness: 0.8, roughness: 0.5 };
const plasmaColor = "#0055ff";
const corePlasmaColor = "#00aaff";

export function PlasmaThruster() {
  const groupRef = useRef();
  const turbineRef = useRef();
  const exhaustRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2) * 0.15;
    }
    
    // Spin turbine extremely fast
    if (turbineRef.current) {
      turbineRef.current.rotation.y -= delta * 15;
    }

    // Outer stabilization ring spins slowly
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 1.5;
    }

    // Pulse the exhaust thrust
    if (exhaustRef.current) {
      const scaleY = 1 + Math.sin(t * 40) * 0.05 + Math.random() * 0.08;
      exhaustRef.current.scale.set(1, scaleY, 1);
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.8;

  return (
    // Tilt the thruster so we can see inside the intake and see the exhaust shooting out
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
      <group ref={groupRef}>
        
        {/* === ENGINE BARREL === */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.5, 1.2, 2.5, 32]} />
          <meshStandardMaterial {...darkSteelProps} />
        </mesh>
        
        {/* Barrel Intake Lip */}
        <mesh position={[0, 1.75, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[1.5, 0.1, 16, 64]} />
          <meshStandardMaterial {...silverMatProps} />
        </mesh>
        
        {/* Burned Nozzle Ring */}
        <mesh position={[0, -0.75, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[1.2, 0.15, 16, 64]} />
          <meshStandardMaterial {...heatMetalProps} />
        </mesh>

        {/* === TURBINE BLADES === */}
        {/* Note: cylinder is along Y, so turbine rotates on Y axis */}
        <group ref={turbineRef} position={[0, 1.4, 0]}>
          <mesh>
             <cylinderGeometry args={[0.3, 0.4, 0.5, 16]} />
             <meshStandardMaterial {...silverMatProps} />
          </mesh>
          {[...Array(16)].map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            return (
              <mesh key={`blade-${i}`} position={[Math.cos(angle)*0.8, 0, Math.sin(angle)*0.8]} rotation={[0, -angle, Math.PI / 4]}>
                 <boxGeometry args={[1.2, 0.02, 0.4]} />
                 <meshStandardMaterial {...silverMatProps} />
              </mesh>
            )
          })}
        </group>

        {/* === MAGNETIC STABILIZER RING === */}
        <group ref={ringRef} position={[0, -0.2, 0]}>
           <mesh rotation={[Math.PI/2, 0, 0]}>
             <torusGeometry args={[1.8, 0.08, 16, 64]} />
             <meshStandardMaterial {...silverMatProps} />
           </mesh>
           {[...Array(6)].map((_, i) => {
             const angle = (i / 6) * Math.PI * 2;
             return (
               <group key={`mag-${i}`} position={[Math.cos(angle)*1.8, 0, Math.sin(angle)*1.8]} rotation={[0, -angle, 0]}>
                 <mesh>
                   <boxGeometry args={[0.3, 0.3, 0.4]} />
                   <meshStandardMaterial {...darkSteelProps} />
                 </mesh>
                 <mesh position={[0, 0, 0.2]}>
                   <sphereGeometry args={[0.06, 16, 16]} />
                   <meshStandardMaterial color={plasmaColor} emissive={plasmaColor} emissiveIntensity={3} toneMapped={false}/>
                 </mesh>
               </group>
             )
           })}
        </group>

        {/* === PLASMA EXHAUST === */}
        <group ref={exhaustRef} position={[0, -0.75, 0]}>
          {/* Main thrust plume */}
          {/* Cone defaults to pointing UP. We want it pointing DOWN, so rotate PI on X */}
          <mesh position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[1.0, 4, 32]} />
            <meshStandardMaterial color={plasmaColor} emissive={plasmaColor} emissiveIntensity={2.5} transparent opacity={0.6} toneMapped={false} />
          </mesh>
          {/* Inner intense core */}
          <mesh position={[0, -1.25, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.6, 2.5, 32]} />
            <meshStandardMaterial color={corePlasmaColor} emissive={corePlasmaColor} emissiveIntensity={5} toneMapped={false} />
          </mesh>
        </group>

        {/* === LIGHTING === */}
        <pointLight color={corePlasmaColor} intensity={5} distance={15} position={[0, -1, 0]} />
        <pointLight color="#ffffff" intensity={2} distance={5} position={[0, 2, 0]} />

      </group>
    </group>
  );
}
