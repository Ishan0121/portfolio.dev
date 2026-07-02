import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const goldMatProps = { color: "#ffaa00", metalness: 1, roughness: 0.2 };
const brassMatProps = { color: "#cc8800", metalness: 0.9, roughness: 0.4 };
const darkSteelProps = { color: "#151515", metalness: 0.9, roughness: 0.8 };
const silverMatProps = { color: "#e0e0e0", metalness: 1, roughness: 0.3 };
const coreColor = "#ff5500"; // Fiery orange core
const accentColor = "#00ffff"; // Cyan for contrast

export function ChronosDial() {
  const groupRef = useRef();
  
  // Rings
  const outerRingRef = useRef();
  const midRing1Ref = useRef();
  const midRing2Ref = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.15;
    }
    
    // Ticking motion for the outer clock face (1 tick per second)
    if (outerRingRef.current) {
      const tick = Math.floor(t * 1.5); 
      const targetRotation = tick * (Math.PI / 12); // Rotate 15 degrees per tick
      outerRingRef.current.rotation.z += (targetRotation - outerRingRef.current.rotation.z) * 0.2;
    }
    
    // Smooth continuous rotations for astrolabe rings
    if (midRing1Ref.current) {
      midRing1Ref.current.rotation.x += delta * 0.4;
      midRing1Ref.current.rotation.y += delta * 0.2;
    }
    if (midRing2Ref.current) {
      midRing2Ref.current.rotation.y -= delta * 0.5;
      midRing2Ref.current.rotation.z += delta * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= delta * 0.7;
      innerRingRef.current.rotation.z -= delta * 0.6;
    }
    
    // Core pulsating and spinning extremely fast
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 12) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
      coreRef.current.rotation.y += delta * 3;
      coreRef.current.rotation.x += delta * 2;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.8;

  return (
    <group position={[0, -0.5, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* === OUTER RING (Clock Face) === */}
        <group ref={outerRingRef}>
          <mesh>
            <torusGeometry args={[3.0, 0.15, 16, 64]} />
            <meshStandardMaterial {...goldMatProps} />
          </mesh>
          <mesh>
            <torusGeometry args={[2.8, 0.05, 16, 64]} />
            <meshStandardMaterial {...darkSteelProps} />
          </mesh>
          
          {/* Hour Markers (12 markers) */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const isQuarter = i % 3 === 0;
            return (
              <group key={`h-${i}`} position={[Math.cos(angle)*3.0, Math.sin(angle)*3.0, 0]} rotation={[0, 0, angle]}>
                {/* Main block crossing the ring */}
                <mesh>
                  <boxGeometry args={[0.5, isQuarter ? 0.18 : 0.08, 0.22]} />
                  <meshStandardMaterial {...silverMatProps} />
                </mesh>
                {/* Glowing gem on the quarters */}
                {isQuarter && (
                  <mesh position={[0, 0, 0.12]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2} toneMapped={false} />
                  </mesh>
                )}
              </group>
            );
          })}
          
          {/* Gear teeth on outer ring (60 ticks) */}
          {[...Array(60)].map((_, i) => {
             const angle = (i / 60) * Math.PI * 2;
             return (
               <mesh key={`tooth-${i}`} position={[Math.cos(angle)*3.2, Math.sin(angle)*3.2, 0]} rotation={[0, 0, angle]}>
                 <boxGeometry args={[0.2, 0.05, 0.12]} />
                 <meshStandardMaterial {...brassMatProps} />
               </mesh>
             )
          })}
        </group>

        {/* === MIDDLE RING 1 (Astrolabe Axis) === */}
        <group ref={midRing1Ref}>
          <mesh>
            <torusGeometry args={[2.3, 0.08, 16, 64]} />
            <meshStandardMaterial {...brassMatProps} />
          </mesh>
          {/* Complex nodes */}
          {[...Array(8)].map((_, i) => {
             const angle = (i / 8) * Math.PI * 2;
             return (
               <mesh key={`m1-${i}`} position={[Math.cos(angle)*2.3, Math.sin(angle)*2.3, 0]} rotation={[0, 0, angle]}>
                 <cylinderGeometry args={[0.18, 0.18, 0.25, 6]} />
                 <meshStandardMaterial {...darkSteelProps} />
               </mesh>
             )
          })}
          {/* Inner tracking line */}
          <mesh>
            <torusGeometry args={[2.3, 0.09, 8, 32]} />
            <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={1} wireframe transparent opacity={0.6} toneMapped={false} />
          </mesh>
        </group>

        {/* === MIDDLE RING 2 (Counter Axis) === */}
        <group ref={midRing2Ref} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[1.7, 0.06, 16, 64]} />
            <meshStandardMaterial {...silverMatProps} />
          </mesh>
          <mesh>
            <torusGeometry args={[1.7, 0.08, 16, 8]} />
            <meshStandardMaterial {...darkSteelProps} wireframe />
          </mesh>
          {/* Connecting spokes holding it together */}
          <mesh rotation={[0, 0, Math.PI/2]}>
             <cylinderGeometry args={[0.02, 0.02, 3.4, 8]} />
             <meshStandardMaterial {...goldMatProps} />
          </mesh>
          <mesh rotation={[0, 0, 0]}>
             <cylinderGeometry args={[0.02, 0.02, 3.4, 8]} />
             <meshStandardMaterial {...goldMatProps} />
          </mesh>
        </group>

        {/* === INNER RING (Containment) === */}
        <group ref={innerRingRef} rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <mesh>
            <torusGeometry args={[1.1, 0.1, 16, 64]} />
            <meshStandardMaterial {...brassMatProps} />
          </mesh>
          {/* Magnetic locks */}
          {[...Array(4)].map((_, i) => {
             const angle = (i / 4) * Math.PI * 2;
             return (
               <group key={`in-${i}`} position={[Math.cos(angle)*1.1, Math.sin(angle)*1.1, 0]} rotation={[0, 0, angle]}>
                 <mesh>
                   <boxGeometry args={[0.3, 0.3, 0.3]} />
                   <meshStandardMaterial {...darkSteelProps} />
                 </mesh>
                 <mesh position={[0, 0.16, 0]}>
                   <cylinderGeometry args={[0.1, 0.1, 0.05, 8]} />
                   <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={3} toneMapped={false}/>
                 </mesh>
               </group>
             )
          })}
        </group>

        {/* === CORE SINGULARITY (Time Core) === */}
        <group ref={coreRef}>
          {/* Solid core */}
          <mesh>
            <icosahedronGeometry args={[0.5, 2]} />
            <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={4} toneMapped={false} />
          </mesh>
          {/* Energy corona wireframe */}
          <mesh>
            <icosahedronGeometry args={[0.55, 1]} />
            <meshStandardMaterial color={goldMatProps.color} wireframe transparent opacity={0.5} emissive={goldMatProps.color} emissiveIntensity={2} toneMapped={false} />
          </mesh>
          {/* Small orbiting particle tracks around the core */}
          <mesh rotation={[Math.PI/4, 0, 0]}>
             <torusGeometry args={[0.8, 0.015, 8, 32]} />
             <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={2} toneMapped={false}/>
          </mesh>
          <mesh rotation={[-Math.PI/4, Math.PI/3, 0]}>
             <torusGeometry args={[0.8, 0.015, 8, 32]} />
             <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={2} toneMapped={false}/>
          </mesh>
        </group>

        {/* === LIGHTING === */}
        <pointLight color={coreColor} intensity={5} distance={15} position={[0, 0, 0]} />
        <pointLight color={accentColor} intensity={3} distance={10} position={[3, 3, 3]} />
        <pointLight color={goldMatProps.color} intensity={2} distance={10} position={[-3, -3, -3]} />

      </group>
    </group>
  );
}
