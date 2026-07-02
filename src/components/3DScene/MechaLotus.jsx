/* eslint-disable react-hooks/purity */
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const darkSteelProps = { color: "#111111", metalness: 0.9, roughness: 0.8 };
const silverMatProps = { color: "#e0e0e0", metalness: 1, roughness: 0.2 };
const roseGoldProps = { color: "#b76e79", metalness: 0.9, roughness: 0.3 };
const coreColor = "#ff2a6d"; // Neon pink/red

export function MechaLotus() {
  const groupRef = useRef();
  
  const outerPetalsRefs = React.useMemo(() => Array(8).fill().map(() => React.createRef()), []);
  const innerPetalsRefs = React.useMemo(() => Array(8).fill().map(() => React.createRef()), []);
  const coreRef = useRef();
  const ringRef = useRef();
  const particlesRef = useRef();

  // Generate pollen/spore particles
  const numParticles = 150;
  const particlesPosition = useMemo(() => {
    const pos = new Float32Array(numParticles * 3);
    for(let i = 0; i < numParticles; i++) {
      pos[i*3] = (Math.random() - 0.5) * 4;
      pos[i*3+1] = Math.random() * 6; // Height
      pos[i*3+2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [numParticles]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Overall bobbing and slow spin
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1) * 0.2 - 0.5; 
      groupRef.current.rotation.y += delta * 0.2; 
    }
    
    // Animate Petals (Breathing / Opening and closing)
    // The Math.sin output is -1 to 1. We map it to 0 to 1.
    const openFactorOuter = (Math.sin(t * 0.8) + 1) / 2;
    const openFactorInner = (Math.sin(t * 0.8 - 0.8) + 1) / 2; // Delayed by phase

    outerPetalsRefs.forEach((ref) => {
      if (ref.current) {
        // Bend the petal outwards. 
        // X-axis rotation: 0 is standing straight up. Math.PI/2 is lying flat.
        const baseAngle = 0.15; // Tight bud
        const maxAngle = 1.3;   // Wide open
        ref.current.rotation.x = THREE.MathUtils.lerp(baseAngle, maxAngle, openFactorOuter);
      }
    });

    innerPetalsRefs.forEach((ref) => {
      if (ref.current) {
        const baseAngle = 0.1;
        const maxAngle = 1.0;
        ref.current.rotation.x = THREE.MathUtils.lerp(baseAngle, maxAngle, openFactorInner);
      }
    });
    
    // Core pulsating violently when open
    if (coreRef.current) {
      const scale = 1 + (openFactorOuter * Math.sin(t * 15) * 0.08);
      coreRef.current.scale.set(scale, scale, scale);
    }

    // Hovering energy ring
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 1.5;
    }

    // Floating spore particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < numParticles; i++) {
        positions[i*3+1] += delta * 0.4; // Float up slowly
        
        // Swirl around the center
        const angle = Math.atan2(positions[i*3+2], positions[i*3]);
        const radius = Math.sqrt(positions[i*3]**2 + positions[i*3+2]**2);
        const newAngle = angle + delta * 0.5;
        
        positions[i*3] = Math.cos(newAngle) * radius;
        positions[i*3+2] = Math.sin(newAngle) * radius;

        if (positions[i*3+1] > 6) {
          positions[i*3+1] = 0; // Respawn at the base
          const spawnRadius = Math.random() * 1.5;
          const spawnAngle = Math.random() * Math.PI * 2;
          positions[i*3] = Math.cos(spawnAngle) * spawnRadius;
          positions[i*3+2] = Math.sin(spawnAngle) * spawnRadius;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, -1, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* === BASE RECEPTACLE === */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.6, 0.4, 0.8, 16]} />
          <meshStandardMaterial {...darkSteelProps} />
        </mesh>
        
        {/* Floating Ring around the base */}
        <mesh ref={ringRef} position={[0, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 64]} />
          <meshStandardMaterial {...silverMatProps} />
          {/* Energy nodes on ring */}
          {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((angle, i) => (
            <mesh key={`r-${i}`} position={[Math.cos(angle)*1.5, Math.sin(angle)*1.5, 0]} rotation={[Math.PI/2, 0, angle]}>
              <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
              <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={2} toneMapped={false} />
            </mesh>
          ))}
        </mesh>

        {/* === OUTER PETALS === */}
        <group position={[0, 0, 0]}>
          {outerPetalsRefs.map((ref, i) => {
            const num = 8;
            const angle = (i / num) * Math.PI * 2;
            return (
              <group key={`outer-${i}`} rotation={[0, angle, 0]}>
                {/* The pivot is at the base. We offset the petal geometry away from the pivot. */}
                <group ref={ref}>
                  {/* Petal Geometry (Flattened Sphere acting like a leaf) */}
                  <mesh position={[0, 1.8, 0]} scale={[1, 3.2, 0.1]}>
                    <sphereGeometry args={[0.55, 32, 32]} />
                    <meshStandardMaterial {...roseGoldProps} />
                  </mesh>
                  {/* Mechanical Rib / Spine of the petal */}
                  <mesh position={[0, 1.8, -0.06]} scale={[1, 1, 1]}>
                    <cylinderGeometry args={[0.04, 0.04, 3.4, 8]} />
                    <meshStandardMaterial {...darkSteelProps} />
                  </mesh>
                  {/* Glowing tip */}
                  <mesh position={[0, 3.4, -0.06]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={3} toneMapped={false}/>
                  </mesh>
                </group>
              </group>
            )
          })}
        </group>

        {/* === INNER PETALS === */}
        <group position={[0, 0.2, 0]}>
          {innerPetalsRefs.map((ref, i) => {
            const num = 8;
            // Offset rotation so inner petals fit tightly between outer petals
            const angle = (i / num) * Math.PI * 2 + (Math.PI / num);
            return (
              <group key={`inner-${i}`} rotation={[0, angle, 0]}>
                <group ref={ref}>
                  <mesh position={[0, 1.2, 0]} scale={[1, 2.8, 0.08]}>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial {...silverMatProps} />
                  </mesh>
                  {/* Energy vein inside the inner petals */}
                  <mesh position={[0, 1.2, 0.04]} scale={[1, 1, 1]}>
                    <cylinderGeometry args={[0.015, 0.015, 2.2, 8]} />
                    <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={2} toneMapped={false} />
                  </mesh>
                </group>
              </group>
            )
          })}
        </group>

        {/* === CORE (Pollen / Energy Source) === */}
        <group position={[0, 1.2, 0]} ref={coreRef}>
          {/* Solid Core */}
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={4} toneMapped={false} />
          </mesh>
          {/* Containment cage around core */}
          <mesh>
            <icosahedronGeometry args={[0.55, 2]} />
            <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.6} emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
          </mesh>
        </group>

        {/* === FLOATING SPORES === */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={numParticles}
              array={particlesPosition}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.06} color={coreColor} transparent opacity={0.8} sizeAttenuation toneMapped={false} />
        </points>

        {/* === LIGHTING === */}
        <pointLight color={coreColor} intensity={5} distance={15} position={[0, 1.2, 0]} />
        <pointLight color="#ffffff" intensity={2} distance={10} position={[3, 5, 3]} />

      </group>
    </group>
  );
}
