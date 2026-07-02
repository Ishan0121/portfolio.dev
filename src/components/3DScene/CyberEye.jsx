import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

// Hydraulic piston representing an extraocular muscle
function HydraulicMuscle({ position, rotation, length = 6 }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Outer cylinder attached to the eye */}
      <mesh position={[0, length/4, 0]}>
        <cylinderGeometry args={[0.15, 0.15, length/2, 16]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Inner piston rod extending backward */}
      <mesh position={[0, length * 0.75, 0]}>
        <cylinderGeometry args={[0.08, 0.08, length/2, 16]} />
        <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
      </mesh>
      {/* Anchor ring where it attaches to the Sclera */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.22, 0.06, 16, 32]} />
        <meshStandardMaterial color="#111" metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );
}

export function CyberEye() {
  const groupRef = useRef();
  const irisRef = useRef();
  const bladesRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Very slow, subtle biological drifting motion
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
      groupRef.current.position.x = Math.cos(t * 0.3) * 0.05;
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.6) * 0.1;
    }

    if (irisRef.current) {
      irisRef.current.rotation.y += delta * 0.05; // Slow rotation of iris panels
    }

    if (bladesRef.current) {
      // Dynamic pupil dilation (Pupillary light reflex)
      // The blades scale up and down to make the hole larger/smaller
      const dilation = 1 + Math.sin(t * 1.5) * 0.2 + Math.sin(t * 0.4) * 0.1;
      bladesRef.current.scale.set(dilation, 1, dilation);
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* === SCLERA (Outer White Shell) === */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[2.5, 64, 64, 0, Math.PI * 2, 0.55, Math.PI]} />
          {/* Smooth, glossy white/metallic material */}
          <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Subtle panel seams on the sclera */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[2.505, 32, 16, 0, Math.PI * 2, 0.55, Math.PI]} />
          <meshStandardMaterial color="#888" wireframe transparent opacity={0.15} />
        </mesh>

        {/* === CORNEA (Bulging Front Glass Dome) === */}
        {/* Placed forward so it protrudes past the 2.5 radius Sclera */}
        <mesh position={[0, 0, 1.3]} rotation={[Math.PI/2, 0, 0]}>
          <sphereGeometry args={[1.4, 64, 64, 0, Math.PI * 2, 0, 1.0]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.98} 
            opacity={1} 
            transparent 
            roughness={0} 
            ior={1.5} 
            clearcoat={1} 
            envMapIntensity={2} 
          />
        </mesh>

        {/* === WIDE BIOMECHANICAL IRIS === */}
        {/* Set exactly inside the Sclera front hole at Z=2.15 */}
        <group position={[0, 0, 2.15]} rotation={[Math.PI/2, 0, 0]}>
          
          {/* Base Iris Disc */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[1.35, 1.35, 0.05, 64]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.4} />
          </mesh>

          {/* Radial Muscles (Interlocking metal plates) */}
          <group ref={irisRef} position={[0, 0, 0]}>
            {Array.from({length: 48}).map((_, i) => (
              <mesh key={`radial-${i}`} position={[Math.cos(i * Math.PI/24) * 0.8, 0, Math.sin(i * Math.PI/24) * 0.8]} rotation={[0, -i * Math.PI/24, 0]}>
                <boxGeometry args={[0.06, 0.04, 0.9]} />
                <meshStandardMaterial color="#2a2a2a" metalness={1} roughness={0.3} />
              </mesh>
            ))}

            {/* Glowing Embedded LEDs (Cyan inner ring) */}
            {Array.from({length: 16}).map((_, i) => (
              <group key={`iris-led-${i}`} position={[Math.cos(i * Math.PI/8) * 0.6, 0.02, Math.sin(i * Math.PI/8) * 0.6]} rotation={[0, -i * Math.PI/8, 0]}>
                <mesh>
                  <boxGeometry args={[0.1, 0.05, 0.2]} />
                  <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} />
                </mesh>
              </group>
            ))}
          </group>
          
          {/* Outer Iris Boundary Ring */}
          <mesh position={[0, 0.02, 0]}>
            <torusGeometry args={[1.3, 0.05, 32, 64]} />
            <meshStandardMaterial color="#111" metalness={1} roughness={0.2} />
          </mesh>

          {/* === MECHANICAL SHUTTER PUPIL === */}
          <group position={[0, 0.05, 0]}>
            {/* Inner pupil rim */}
            <mesh>
               <torusGeometry args={[0.45, 0.02, 16, 32]} />
               <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} />
            </mesh>
            
            {/* The Shutter Blades */}
            <group ref={bladesRef}>
              {Array.from({length: 8}).map((_, i) => {
                const angle = i * Math.PI / 4;
                return (
                  <mesh key={`blade-${i}`} position={[Math.cos(angle) * 0.25, 0, Math.sin(angle) * 0.25]} rotation={[0, -angle + Math.PI/4, 0]}>
                    <boxGeometry args={[0.4, 0.02, 0.15]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.2} />
                  </mesh>
                )
              })}
            </group>
          </group>

          {/* Deep Crystalline Lens behind Pupil */}
          <mesh position={[0, -0.2, 0]}>
            <sphereGeometry args={[0.4, 32, 32, 0, Math.PI*2, 0, Math.PI/2]} />
            <meshPhysicalMaterial color="#000" metalness={0.9} roughness={0} clearcoat={1} envMapIntensity={2} />
          </mesh>

          {/* Internal Glow illuminating the pupil */}
          <pointLight color="#00f0ff" intensity={1} distance={4} position={[0, 0.2, 0]} />
        </group>

        {/* === EXTRAOCULAR HYDRAULIC MUSCLES === */}
        {/* These anchor the eyeball to the surrounding space, mimicking actual human eye muscles */}
        
        {/* Superior Rectus (Top) */}
        <HydraulicMuscle position={[0, 2.3, -0.5]} rotation={[-Math.PI/2 + 0.15, 0, 0]} />
        
        {/* Inferior Rectus (Bottom) */}
        <HydraulicMuscle position={[0, -2.3, -0.5]} rotation={[-Math.PI/2 - 0.15, 0, 0]} />
        
        {/* Lateral Rectus (Left) */}
        <HydraulicMuscle position={[-2.3, 0, -0.5]} rotation={[-Math.PI/2, -0.15, 0]} />
        
        {/* Medial Rectus (Right) */}
        <HydraulicMuscle position={[2.3, 0, -0.5]} rotation={[-Math.PI/2, 0.15, 0]} />
        
        {/* Superior Oblique (Top Left Angled) */}
        <HydraulicMuscle position={[-1.6, 1.6, -0.5]} rotation={[-Math.PI/2 + 0.2, -0.3, 0]} />
        
        {/* Inferior Oblique (Bottom Left Angled) */}
        <HydraulicMuscle position={[-1.6, -1.6, -0.5]} rotation={[-Math.PI/2 - 0.2, -0.3, 0]} />

        {/* === OPTIC NERVE BUNDLE (Rear) === */}
        <group position={[0, 0, -2.4]} rotation={[-Math.PI/2, 0, 0]}>
          {/* Main outer optic nerve sheath */}
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.6, 0.5, 5, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.5} />
          </mesh>
          {/* Internal glowing neural fibers (Data cables) */}
          {Array.from({length: 12}).map((_, i) => (
            <mesh key={`nerve-${i}`} position={[Math.cos(i * Math.PI/6) * 0.4, 2.5, Math.sin(i * Math.PI/6) * 0.4]}>
              <cylinderGeometry args={[0.06, 0.06, 5.1, 8]} />
              <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
            </mesh>
          ))}
          {/* Armor Rings around nerve */}
          {[0.5, 1.5, 2.5, 3.5, 4.5].map((y) => (
            <mesh key={`nerve-ring-${y}`} position={[0, y, 0]} rotation={[Math.PI/2, 0, 0]}>
              <torusGeometry args={[0.62, 0.08, 16, 32]} />
              <meshStandardMaterial color="#222" metalness={1} roughness={0.3} />
            </mesh>
          ))}
        </group>

      </group>
    </group>
  );
}
