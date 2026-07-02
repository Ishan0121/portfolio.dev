import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const planetColor = "#000a14";
const gridColor = "#00f0ff"; // Cyan

export function CyberPlanet() {
  const groupRef = useRef();
  const planetRef = useRef();
  const gridRef = useRef();
  const ringsRef = useRef();
  const satellitesRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1) * 0.15;
    }
    
    // Rotate planet slowly
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.1;
    if (gridRef.current) {
      gridRef.current.rotation.y += delta * 0.15;
      gridRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    
    // Spin rings
    if (ringsRef.current) {
      ringsRef.current.rotation.z -= delta * 0.3;
      ringsRef.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.5) * 0.05; // Wobble
    }

    // Orbit satellites
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y -= delta * 0.5;
      satellitesRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* === PLANET CORE === */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial color={planetColor} metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* === CYBER GRID === */}
        <mesh ref={gridRef}>
          <sphereGeometry args={[1.52, 32, 32]} />
          <meshStandardMaterial color={gridColor} wireframe transparent opacity={0.3} emissive={gridColor} emissiveIntensity={1} toneMapped={false} />
        </mesh>
        {/* Nodes on the grid */}
        <points>
          <sphereGeometry args={[1.54, 16, 16]} />
          <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.8} sizeAttenuation toneMapped={false} />
        </points>

        {/* === DATA RINGS === */}
        <group ref={ringsRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.2, 0.015, 16, 100]} />
            <meshStandardMaterial color={gridColor} emissive={gridColor} emissiveIntensity={2} toneMapped={false} />
          </mesh>
          <mesh>
            <torusGeometry args={[2.4, 0.005, 16, 100]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} transparent opacity={0.6} toneMapped={false} />
          </mesh>
          <mesh>
            <torusGeometry args={[2.7, 0.1, 16, 100]} />
            <meshStandardMaterial color={gridColor} wireframe transparent opacity={0.2} />
          </mesh>
          
          {/* Ring Nodes */}
          {[...Array(16)].map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            return (
              <mesh key={`node-${i}`} position={[Math.cos(angle)*2.2, Math.sin(angle)*2.2, 0]}>
                 <sphereGeometry args={[0.04, 8, 8]} />
                 <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} toneMapped={false} />
              </mesh>
            )
          })}
        </group>

        {/* === SATELLITES === */}
        <group ref={satellitesRef}>
          {[0, Math.PI * 0.66, Math.PI * 1.33].map((angle, i) => (
            <group key={`sat-${i}`} position={[Math.cos(angle)*3, Math.sin(angle)*1.5, Math.sin(angle)*3]} rotation={[0, -angle, 0]}>
              <mesh>
                <boxGeometry args={[0.2, 0.1, 0.4]} />
                <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
              </mesh>
              {/* Solar panels */}
              <mesh position={[0.25, 0, 0]}>
                <boxGeometry args={[0.3, 0.02, 0.2]} />
                <meshStandardMaterial color="#0055ff" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[-0.25, 0, 0]}>
                <boxGeometry args={[0.3, 0.02, 0.2]} />
                <meshStandardMaterial color="#0055ff" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Blinker */}
              <mesh position={[0, 0.06, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} toneMapped={false}/>
              </mesh>
            </group>
          ))}
        </group>

        {/* === LIGHTING === */}
        <pointLight color={gridColor} intensity={3} distance={10} position={[0, 0, 3]} />
        <pointLight color="#ffffff" intensity={2} distance={10} position={[3, 3, 3]} />
        <ambientLight intensity={0.5} />

      </group>
    </group>
  );
}
