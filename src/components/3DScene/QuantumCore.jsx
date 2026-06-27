import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const silverMatProps = { color: "#e8e8e8", metalness: 1, roughness: 0.15 };
const darkSteelProps = { color: "#222222", metalness: 0.9, roughness: 0.6 };
const brushedAlloyProps = { color: "#888888", metalness: 0.8, roughness: 0.3 };
const accentCore = "#b829ff"; // Deep Purple
const accentSecondary = "#00f0ff"; // Bright Cyan

// Structural piston arm extending from the center
function SupportArm({ position, rotation, scale = [1, 1, 1] }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Base rod */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
        <meshStandardMaterial {...darkSteelProps} />
      </mesh>
      {/* Piston sleeve */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        <meshStandardMaterial {...brushedAlloyProps} />
      </mesh>
      {/* Heat sink rings on the sleeve */}
      {[-0.1, 0, 0.1].map((offset, i) => (
        <mesh key={i} position={[0, 0.3 + offset, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 8]} />
          <meshStandardMaterial {...silverMatProps} />
        </mesh>
      ))}
      {/* End joint node */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial {...silverMatProps} />
      </mesh>
    </group>
  );
}

export function QuantumCore() {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const coreCageRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const outerShellRef = useRef();
  
  // A sleek energy cable curve
  const cableCurve = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.75, 0),
      new THREE.Vector3(1, 1.2, 0.5),
      new THREE.Vector3(1.3, 0, 0)
    );
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Overall bobbing and subtle rotation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.15;
      groupRef.current.rotation.y = t * 0.1;
    }
    
    // Inner core violently vibrating and pulsing
    if (innerCoreRef.current) {
      const scale = 1 + Math.sin(t * 12) * 0.04 + Math.cos(t * 20) * 0.02;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }
    
    // Core cage spinning very fast to contain it
    if (coreCageRef.current) {
      coreCageRef.current.rotation.x += delta * 2;
      coreCageRef.current.rotation.y += delta * 2.5;
    }
    
    // Rings rotating at mechanical speeds on different axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 1.5;
      ring1Ref.current.rotation.y += delta * 1.0;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 1.8;
      ring2Ref.current.rotation.z += delta * 1.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.8;
      ring3Ref.current.rotation.z -= delta * 1.5;
    }

    // Outer shell mechanical stepped rotation (ticks like a clock)
    if (outerShellRef.current) {
      const tick = Math.floor(t * 2);
      const targetRotation = tick * (Math.PI / 8);
      outerShellRef.current.rotation.y += (targetRotation - outerShellRef.current.rotation.y) * 0.1;
      outerShellRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, -0.5, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* === INNER QUANTUM CORE === */}
        <mesh ref={innerCoreRef}>
          <icosahedronGeometry args={[0.7, 3]} />
          <meshStandardMaterial color={accentCore} emissive={accentCore} emissiveIntensity={4} toneMapped={false} />
        </mesh>
        
        {/* Core Cage (Fast rotating dark metal holding the energy) */}
        <mesh ref={coreCageRef}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial {...darkSteelProps} wireframe wireframeLinewidth={3} />
        </mesh>

        {/* Structural Core Support Arms */}
        <SupportArm position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 0.9, 1]} />
        <SupportArm position={[0, 0, 0]} rotation={[Math.PI, 0, 0]} scale={[1, 0.9, 1]} />
        <SupportArm position={[0, 0, 0]} rotation={[0, 0, Math.PI/2]} scale={[1, 0.9, 1]} />
        <SupportArm position={[0, 0, 0]} rotation={[0, 0, -Math.PI/2]} scale={[1, 0.9, 1]} />
        <SupportArm position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]} scale={[1, 0.9, 1]} />
        <SupportArm position={[0, 0, 0]} rotation={[-Math.PI/2, 0, 0]} scale={[1, 0.9, 1]} />

        {/* === ORBITING MECHANICAL GYRO RINGS === */}
        
        {/* RING 1 (Inner, Agile) */}
        <group ref={ring1Ref}>
          <mesh>
            <torusGeometry args={[1.4, 0.08, 16, 64]} />
            <meshStandardMaterial {...silverMatProps} />
          </mesh>
          <mesh>
            <torusGeometry args={[1.4, 0.1, 16, 8]} />
            <meshStandardMaterial {...darkSteelProps} wireframe />
          </mesh>
          {/* Heavy magnetic nodes on Ring 1 */}
          {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((angle, i) => (
            <mesh key={`r1-${i}`} position={[Math.cos(angle)*1.4, Math.sin(angle)*1.4, 0]} rotation={[0, 0, angle]}>
              <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
              <meshStandardMaterial {...brushedAlloyProps} />
              {/* LED Ring indicator */}
              <mesh position={[0, 0.16, 0]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial color={accentSecondary} emissive={accentSecondary} emissiveIntensity={3} toneMapped={false}/>
              </mesh>
            </mesh>
          ))}
        </group>

        {/* RING 2 (Middle, Heavy & Offset) */}
        <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.0, 0.14, 16, 64]} />
            <meshStandardMaterial {...darkSteelProps} />
          </mesh>
          {/* Inner glowing groove for Ring 2 */}
          <mesh>
            <torusGeometry args={[2.02, 0.06, 16, 64]} />
            <meshStandardMaterial color={accentCore} emissive={accentCore} emissiveIntensity={2} toneMapped={false} />
          </mesh>
          {/* Mechanical Clamp assemblies */}
          {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((angle, i) => (
            <group key={`r2-${i}`} position={[Math.cos(angle)*2.0, Math.sin(angle)*2.0, 0]} rotation={[0, 0, angle]}>
              <mesh>
                <boxGeometry args={[0.4, 0.5, 0.4]} />
                <meshStandardMaterial {...silverMatProps} />
              </mesh>
              {/* Clamp details */}
              <mesh position={[0, 0.26, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
                <meshStandardMaterial {...darkSteelProps} />
              </mesh>
            </group>
          ))}
        </group>

        {/* RING 3 (Outer, Massive Industrial Frame) */}
        <group ref={ring3Ref} rotation={[0, Math.PI / 3, Math.PI / 4]}>
          <mesh>
            <torusGeometry args={[2.8, 0.06, 16, 64]} />
            <meshStandardMaterial {...silverMatProps} />
          </mesh>
          <mesh>
            <torusGeometry args={[2.7, 0.02, 16, 64]} />
            <meshStandardMaterial {...brushedAlloyProps} />
          </mesh>
          {/* Massive energy relay nodes */}
          {[Math.PI/4, Math.PI*1.25].map((angle, i) => (
            <group key={`r3-${i}`} position={[Math.cos(angle)*2.8, Math.sin(angle)*2.8, 0]} rotation={[0, 0, angle]}>
              <mesh>
                <cylinderGeometry args={[0.3, 0.3, 0.4, 6]} />
                <meshStandardMaterial {...darkSteelProps} />
              </mesh>
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.35, 0.35, 0.1, 6]} />
                <meshStandardMaterial {...silverMatProps} />
              </mesh>
              {/* Glowing core vents on the relay node */}
              <mesh position={[0, 0.22, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.05, 6]} />
                <meshStandardMaterial color={accentSecondary} emissive={accentSecondary} emissiveIntensity={3} toneMapped={false} />
              </mesh>
            </group>
          ))}
        </group>

        {/* === OUTER CONTAINMENT FIELD (Hexagonal Panels) === */}
        <group ref={outerShellRef}>
          <mesh>
            <icosahedronGeometry args={[4.2, 1]} />
            <meshStandardMaterial color="#111111" wireframe transparent opacity={0.2} />
          </mesh>
          {/* Floating energy particles trapped in the containment field */}
          <points>
            <icosahedronGeometry args={[4.0, 2]} />
            <pointsMaterial size={0.06} color={accentSecondary} transparent opacity={0.8} sizeAttenuation />
          </points>
          {/* Outer anchor points */}
          <points>
            <icosahedronGeometry args={[4.2, 1]} />
            <pointsMaterial size={0.12} color={accentCore} transparent opacity={0.9} sizeAttenuation toneMapped={false} />
          </points>
        </group>

        {/* === ENERGY CONDUIT CABLES === */}
        {/* Fixed cables bridging the core and inner rings */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={`cable-${i}`} rotation={[i * (Math.PI / 2), i, i * 0.5]}>
             <tubeGeometry args={[cableCurve, 20, 0.015, 8, false]} />
             <meshStandardMaterial color={accentSecondary} emissive={accentSecondary} emissiveIntensity={2} toneMapped={false} />
          </mesh>
        ))}

        {/* === DYNAMIC INTERNAL LIGHTING === */}
        <pointLight color={accentCore} intensity={4} distance={12} position={[0,0,0]} />
        <pointLight color={accentSecondary} intensity={2} distance={8} position={[2,2,2]} />
        <pointLight color={accentSecondary} intensity={2} distance={8} position={[-2,-2,-2]} />

      </group>
    </group>
  );
}
