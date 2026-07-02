/* eslint-disable react-hooks/purity */
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const darkSteelProps = { color: "#151515", metalness: 0.9, roughness: 0.8 };
const silverMatProps = { color: "#e0e0e0", metalness: 1, roughness: 0.2 };
const goldAccentProps = { color: "#ffaa00", metalness: 1, roughness: 0.3 };
const portalColor = "#4400ff"; // Deep space blue/purple
const energyColor = "#00ffff"; // Cyan energy

export function NexusGate() {
  const groupRef = useRef();
  const ring1Ref = useRef(); // Inner fast ring
  const ring2Ref = useRef(); // Middle ring
  const ring3Ref = useRef(); // Outer massive ring
  const eventHorizonRef = useRef(); // The portal surface
  const particlesRef = useRef();
  
  // Generate particle positions for the vortex
  const numParticles = 250;
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const radius = 2 + Math.random() * 3;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 6;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [numParticles]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Overall bobbing
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1) * 0.2;
    }
    
    // Spin rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 1.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.6;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.15;
    }

    // Portal surface ripple (scale pulsing)
    if (eventHorizonRef.current) {
      const scale = 1 + Math.sin(t * 5) * 0.03;
      eventHorizonRef.current.scale.set(scale, 1, scale); // Scale X and Z because the cylinder is rotated on X
      eventHorizonRef.current.rotation.y -= delta * 0.5; // Rotate the cylinder texture/surface
    }
    
    // Particles getting sucked into the center
    if (particlesRef.current) {
      particlesRef.current.rotation.z += delta * 0.8;
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < numParticles; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;
        
        let x = positions[ix];
        let y = positions[iy];
        let z = positions[iz];
        
        // Sucking motion towards origin
        x *= 0.97;
        y *= 0.97;
        z *= 0.94;
        
        // If a particle reaches the center, respawn it at the edges
        if (Math.abs(x) < 0.2 && Math.abs(y) < 0.2 && Math.abs(z) < 0.2) {
          const radius = 2.5 + Math.random() * 2.5;
          const angle = Math.random() * Math.PI * 2;
          x = Math.cos(angle) * radius;
          y = Math.sin(angle) * radius;
          z = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 3);
        }
        
        positions[ix] = x;
        positions[iy] = y;
        positions[iz] = z;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.8;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]} rotation={[Math.PI/10, -Math.PI/8, 0]}>
      <group ref={groupRef}>
        
        {/* === OUTER RING (Massive Stargate Structure) === */}
        <group ref={ring3Ref}>
          <mesh>
            <torusGeometry args={[3.2, 0.3, 32, 64]} />
            <meshStandardMaterial {...darkSteelProps} />
          </mesh>
          <mesh>
            <torusGeometry args={[3.2, 0.32, 16, 16]} />
            <meshStandardMaterial {...darkSteelProps} wireframe />
          </mesh>
          
          {/* Outer Chevrons */}
          {[...Array(9)].map((_, i) => {
            const angle = (i / 9) * Math.PI * 2;
            return (
              <group key={`r3-${i}`} position={[Math.cos(angle)*3.2, Math.sin(angle)*3.2, 0]} rotation={[0, 0, angle]}>
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[0.8, 0.4, 0.8]} />
                  <meshStandardMaterial {...silverMatProps} />
                </mesh>
                <mesh position={[0.2, 0, 0]}>
                  <boxGeometry args={[0.2, 0.45, 0.4]} />
                  <meshStandardMaterial {...goldAccentProps} />
                </mesh>
                <mesh position={[0, 0, 0.41]}>
                  <planeGeometry args={[0.4, 0.2]} />
                  <meshStandardMaterial color={energyColor} emissive={energyColor} emissiveIntensity={2} toneMapped={false} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* === MIDDLE RING (Counter Rotating) === */}
        <group ref={ring2Ref}>
          <mesh>
            <torusGeometry args={[2.5, 0.15, 16, 64]} />
            <meshStandardMaterial {...silverMatProps} />
          </mesh>
          {/* Energy track */}
          <mesh>
            <torusGeometry args={[2.5, 0.16, 16, 32]} />
            <meshStandardMaterial color={portalColor} emissive={portalColor} emissiveIntensity={1.5} wireframe transparent opacity={0.6} toneMapped={false}/>
          </mesh>
          
          {/* Middle Ring Gears */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <mesh key={`r2-${i}`} position={[Math.cos(angle)*2.5, Math.sin(angle)*2.5, 0]} rotation={[0, 0, angle]}>
                <cylinderGeometry args={[0.2, 0.2, 0.4, 6]} />
                <meshStandardMaterial {...darkSteelProps} />
              </mesh>
            );
          })}
        </group>

        {/* === INNER RING (Fast Spin) === */}
        <group ref={ring1Ref}>
          <mesh>
            <torusGeometry args={[1.9, 0.08, 16, 64]} />
            <meshStandardMaterial {...goldAccentProps} />
          </mesh>
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <group key={`r1-${i}`} position={[Math.cos(angle)*1.9, Math.sin(angle)*1.9, 0]} rotation={[0, 0, angle]}>
                <mesh>
                  <boxGeometry args={[0.4, 0.2, 0.2]} />
                  <meshStandardMaterial {...silverMatProps} />
                </mesh>
                <mesh position={[0, 0.12, 0]}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                  <meshStandardMaterial color={energyColor} emissive={energyColor} emissiveIntensity={3} toneMapped={false} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* === EVENT HORIZON (Portal Surface) === */}
        {/* We use a thin cylinder rotated to face forward (along Z axis) */}
        <mesh ref={eventHorizonRef} position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[1.85, 1.85, 0.05, 64]} />
          <meshStandardMaterial color={portalColor} emissive={portalColor} emissiveIntensity={2.5} transparent opacity={0.7} toneMapped={false} />
        </mesh>
        
        {/* Core Singularity */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color={energyColor} emissive={energyColor} emissiveIntensity={6} toneMapped={false} />
        </mesh>

        {/* === VORTEX PARTICLES === */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={numParticles}
              array={particlesPosition}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.08} color={energyColor} transparent opacity={0.9} sizeAttenuation toneMapped={false} />
        </points>
        
        {/* === DYNAMIC LIGHTING === */}
        <pointLight color={energyColor} intensity={5} distance={15} position={[0, 0, 2]} />
        <pointLight color={portalColor} intensity={5} distance={15} position={[0, 0, -2]} />

      </group>
    </group>
  );
}
