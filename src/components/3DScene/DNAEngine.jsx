import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- DNA APPEARANCE SETTINGS ---
export const DNA_SETTINGS = {
  primaryColor: "#666666",   // Main backbone and structure color
  secondaryColor: "#444444", // Secondary backbone color
  accentColor: "#555555",    // Joints and connectors
  pistonColor: "#333333",    // Inner mechanics
  glowColorAT: "#00f0ff",    // A-T base pair glow (Cyan)
  glowColorGC: "#ff0055",    // G-C base pair glow (Pink/Red)
  metalness: 0.9,            // Restored high metalness for metallic vibe
  roughness: 0.15            // Restored low roughness for sharp reflections
};

// Procedural Cybernetic DNA - Double Helix
export function DNAEngine() {
  const groupRef = useRef();
  
  const numPairs = 40;
  const radius = 2;
  const heightSpacing = 0.6;
  const twist = 0.3;

  // Generate curves for the two continuous backbones
  const { curve1, curve2, basePairs } = useMemo(() => {
    const points1 = [];
    const points2 = [];
    const pairs = [];
    
    // Extend the loop slightly beyond the visible pairs to ensure the tube doesn't abruptly end
    for (let i = -2; i < numPairs + 2; i++) {
      const y = (i - numPairs / 2) * heightSpacing;
      const angle = i * twist;
      
      points1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      points2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
      
      if (i >= 0 && i < numPairs) {
        // Deterministic pseudo-randomness for a consistent "gene sequence"
        const pseudoRandom = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
        const isGC = pseudoRandom > 0.5;
        pairs.push({
          isGC,
          y,
          angle,
          leftPos: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
          rightPos: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius]
        });
      }
    }
    
    return {
      curve1: new THREE.CatmullRomCurve3(points1),
      curve2: new THREE.CatmullRomCurve3(points2),
      basePairs: pairs
    };
  }, [numPairs, radius, heightSpacing, twist]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5; // Rotate around its own local Y axis
    }
  });

  // --- Responsive Scaling & Tilt ---
  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  
  // The camera is at z=15. The DNA is at z=-8.
  // Distance to z=0 is 15, distance to z=-8 is 23.
  const distanceRatio = 23 / 15;
  const vHeight = viewport.height * distanceRatio;
  const vWidth = viewport.width * distanceRatio;
  const diagonal = Math.sqrt(vWidth ** 2 + vHeight ** 2);
  
  // DNA's unscaled length is approx 24 units (40 pairs * 0.6 heightSpacing).
  // This is roughly 2 twists of length.
  // We want it to span across the screen, so its length should match the screen diagonal (desktop) or height (mobile).
  // We add a slight multiplier (1.1 - 1.2) so the ends are hidden off-screen.
  const targetLength = isMobile ? vHeight * 1.2 : diagonal * 1.1;
  const responsiveScale = targetLength / (isMobile ? 15 : 24);
  
  // On mobile, tilt it to be more vertical so it fits better on tall screens.
  const responsiveTilt = isMobile ? -Math.PI / 6 : -Math.PI / 4;

  return (
    // Outer group to position perfectly centered, with responsive tilt and scale
    <group position={[0, 0, -8]} rotation={[0, 0, responsiveTilt]} scale={[responsiveScale, responsiveScale, responsiveScale]}>
      <group ref={groupRef}>
        
        {/* Continuous Backbone 1 */}
        <mesh>
          <tubeGeometry args={[curve1, 150, 0.15, 12, false]} />
          <meshStandardMaterial color={DNA_SETTINGS.primaryColor} metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
        </mesh>

        {/* Continuous Backbone 2 */}
        <mesh>
          <tubeGeometry args={[curve2, 150, 0.15, 12, false]} />
          <meshStandardMaterial color={DNA_SETTINGS.secondaryColor} metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
        </mesh>

        {/* Base Pairs (Rungs) */}
        {basePairs.map((pair, idx) => {
          const isGC = pair.isGC; // Use the generated sequence for realistic randomization
          
          return (
            <group key={idx}>
              {/* Left Outer Sphere (Joint Node) */}
              <group position={pair.leftPos}>
                <mesh>
                  <sphereGeometry args={[0.25, 16, 16]} />
                  <meshStandardMaterial color={DNA_SETTINGS.accentColor} metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                </mesh>
                {/* Mechanical clamp/ring around the joint */}
                <mesh rotation={[Math.PI / 2, 0, pair.angle]}>
                  <torusGeometry args={[0.26, 0.04, 8, 16]} />
                  <meshStandardMaterial color="#5b5b5b" metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                </mesh>
              </group>
              
              {/* Right Outer Sphere (Joint Node) */}
              <group position={pair.rightPos}>
                <mesh>
                  <sphereGeometry args={[0.25, 16, 16]} />
                  <meshStandardMaterial color={DNA_SETTINGS.accentColor} metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                </mesh>
                {/* Mechanical clamp/ring around the joint */}
                <mesh rotation={[Math.PI / 2, 0, pair.angle]}>
                  <torusGeometry args={[0.26, 0.04, 8, 16]} />
                  <meshStandardMaterial color="#333333" metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                </mesh>
              </group>

              {/* Left Arm Assembly (Piston-like) */}
              <group position={[Math.cos(pair.angle) * (radius / 2 + 0.1), pair.y, Math.sin(pair.angle) * (radius / 2 + 0.1)]} rotation={[0, -pair.angle, Math.PI / 2]}>
                <mesh>
                  <cylinderGeometry args={[0.08, 0.08, radius - 0.2, 8]} />
                  <meshStandardMaterial color={DNA_SETTINGS.pistonColor} metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                </mesh>
                {/* Piston Rings / Heat Sinks */}
                {[-0.3, 0, 0.3].map((offset, i) => (
                  <mesh key={i} position={[0, (radius - 0.2) * offset, 0]}>
                    <cylinderGeometry args={[0.11, 0.11, 0.04, 8]} />
                    <meshStandardMaterial color="#444444" metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                  </mesh>
                ))}
              </group>

              {/* Left Lego Cap (Connector with Pin & LED) */}
              <group position={[Math.cos(pair.angle) * 0.4, pair.y, Math.sin(pair.angle) * 0.4]} rotation={[0, -pair.angle, Math.PI / 2]}>
                <mesh>
                  <cylinderGeometry args={[0.14, 0.14, 0.15, 8]} />
                  <meshStandardMaterial color="#555" metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                </mesh>
                <mesh position={[0, -0.075, 0]}>
                  <cylinderGeometry args={[0.06, 0.06, 0.1, 8]} />
                  <meshStandardMaterial color="#666" metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                </mesh>
                {/* Micro Status LED */}
                <mesh position={[0.13, 0, 0]}>
                  <sphereGeometry args={[0.02, 8, 8]} />
                  <meshStandardMaterial color={DNA_SETTINGS.glowColorAT} emissive={DNA_SETTINGS.glowColorAT} emissiveIntensity={2} toneMapped={false} />
                </mesh>
              </group>

              {/* Right Arm Assembly (Piston-like) */}
              <group position={[Math.cos(pair.angle + Math.PI) * (radius / 2 + 0.1), pair.y, Math.sin(pair.angle + Math.PI) * (radius / 2 + 0.1)]} rotation={[0, -pair.angle, Math.PI / 2]}>
                <mesh>
                  <cylinderGeometry args={[0.08, 0.08, radius - 0.2, 8]} />
                  <meshStandardMaterial color={DNA_SETTINGS.pistonColor} metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                </mesh>
                {/* Piston Rings / Heat Sinks */}
                {[-0.3, 0, 0.3].map((offset, i) => (
                  <mesh key={i} position={[0, (radius - 0.2) * offset, 0]}>
                    <cylinderGeometry args={[0.11, 0.11, 0.04, 8]} />
                    <meshStandardMaterial color="#444444" metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                  </mesh>
                ))}
              </group>
              
              {/* Right Lego Cap (Connector with Hole & LED) */}
              <group position={[Math.cos(pair.angle + Math.PI) * 0.4, pair.y, Math.sin(pair.angle + Math.PI) * 0.4]} rotation={[0, -pair.angle, Math.PI / 2]}>
                <mesh>
                  <cylinderGeometry args={[0.14, 0.14, 0.15, 8]} />
                  <meshStandardMaterial color="#555" metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                </mesh>
                <mesh position={[0, 0.08, 0]}>
                  <cylinderGeometry args={[0.07, 0.07, 0.02, 8]} />
                  <meshStandardMaterial color="#111" metalness={DNA_SETTINGS.metalness} roughness={DNA_SETTINGS.roughness} />
                </mesh>
                {/* Micro Status LED */}
                <mesh position={[0.13, 0, 0]}>
                  <sphereGeometry args={[0.02, 8, 8]} />
                  <meshStandardMaterial color={isGC ? DNA_SETTINGS.glowColorGC : DNA_SETTINGS.glowColorAT} emissive={isGC ? DNA_SETTINGS.glowColorGC : DNA_SETTINGS.glowColorAT} emissiveIntensity={2} toneMapped={false} />
                </mesh>
              </group>

              {/* Hydrogen Bonds (Glowing Gap) */}
              <group position={[0, pair.y, 0]} rotation={[0, -pair.angle, Math.PI / 2]}>
                {isGC ? (
                  <>
                    {/* 3 Bonds for G-C */}
                    <mesh position={[-0.06, 0, 0]}>
                      <cylinderGeometry args={[0.015, 0.015, 0.65, 8]} />
                      <meshStandardMaterial color={DNA_SETTINGS.glowColorGC} emissive={DNA_SETTINGS.glowColorGC} emissiveIntensity={3} toneMapped={false} />
                    </mesh>
                    <mesh position={[0, 0, 0]}>
                      <cylinderGeometry args={[0.015, 0.015, 0.65, 8]} />
                      <meshStandardMaterial color={DNA_SETTINGS.glowColorGC} emissive={DNA_SETTINGS.glowColorGC} emissiveIntensity={3} toneMapped={false} />
                    </mesh>
                    <mesh position={[0.06, 0, 0]}>
                      <cylinderGeometry args={[0.015, 0.015, 0.65, 8]} />
                      <meshStandardMaterial color={DNA_SETTINGS.glowColorGC} emissive={DNA_SETTINGS.glowColorGC} emissiveIntensity={3} toneMapped={false} />
                    </mesh>
                  </>
                ) : (
                  <>
                    {/* 2 Bonds for A-T */}
                    <mesh position={[-0.04, 0, 0]}>
                      <cylinderGeometry args={[0.015, 0.015, 0.65, 8]} />
                      <meshStandardMaterial color={DNA_SETTINGS.glowColorAT} emissive={DNA_SETTINGS.glowColorAT} emissiveIntensity={3} toneMapped={false} />
                    </mesh>
                    <mesh position={[0.04, 0, 0]}>
                      <cylinderGeometry args={[0.015, 0.015, 0.65, 8]} />
                      <meshStandardMaterial color={DNA_SETTINGS.glowColorAT} emissive={DNA_SETTINGS.glowColorAT} emissiveIntensity={3} toneMapped={false} />
                    </mesh>
                  </>
                )}
              </group>
            </group>
          );
        })}
      </group>
    </group>
  );
}
