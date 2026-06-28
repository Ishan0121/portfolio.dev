import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const darkMetal = { color: "#1a1a1a", metalness: 0.9, roughness: 0.5 };
const bronzeMetal = { color: "#b08d57", metalness: 1, roughness: 0.3 };
const glowColor = "#ffaa00";

const Gear = ({ position, rotation, scale = 1, teeth = 12, speed = 1, mat, reversed = false }) => {
  const gearRef = useRef();

  useFrame((state, delta) => {
    if (gearRef.current) {
      gearRef.current.rotation.y += delta * speed * (reversed ? -1 : 1);
    }
  });

  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]} ref={gearRef}>
       <mesh rotation={[Math.PI / 2, 0, 0]}>
         <cylinderGeometry args={[1, 1, 0.2, 32]} />
         <meshStandardMaterial {...mat} />
       </mesh>
       {Array.from({ length: teeth }).map((_, i) => {
         const angle = (i / teeth) * Math.PI * 2;
         return (
           <mesh key={i} position={[Math.cos(angle) * 1.1, 0, Math.sin(angle) * 1.1]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.4, 0.2, 0.2]} />
              <meshStandardMaterial {...mat} />
           </mesh>
         )
       })}
       {/* Center Hole */}
       <mesh rotation={[Math.PI / 2, 0, 0]}>
         <cylinderGeometry args={[0.3, 0.3, 0.25, 16]} />
         <meshStandardMaterial color="#000" />
       </mesh>
    </group>
  );
};

export function TitanGear() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2 + 0.2;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.8;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Main Central Gear */}
        <Gear position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.5} teeth={16} speed={0.5} mat={darkMetal} />
        
        {/* Top Right Gear */}
        <Gear position={[1.8, 0, 1.8]} rotation={[0, 0, 0]} scale={1.0} teeth={10} speed={0.8} reversed mat={bronzeMetal} />
        
        {/* Bottom Left Gear */}
        <Gear position={[-1.8, 0, -1.8]} rotation={[0, 0, 0]} scale={1.0} teeth={10} speed={0.8} reversed mat={bronzeMetal} />
        
        {/* Vertical Intersecting Gear */}
        <Gear position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={1.2} teeth={12} speed={0.625} mat={darkMetal} />

        {/* Central Energy Core inside Main Gear */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={2} toneMapped={false} />
        </mesh>

        <pointLight color={glowColor} intensity={3} distance={10} position={[0, 0, 0]} />
        <ambientLight intensity={0.5} />

      </group>
    </group>
  );
}
