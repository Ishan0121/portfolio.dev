import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const petalColor = "#ff0077"; // Deep neon pink/red
const stemColor = "#00ff66"; // Neon green

export function NeonRose() {
  const groupRef = useRef();
  
  const petals = useMemo(() => {
    const arr = [];
    const numPetals = 30;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < numPetals; i++) {
       const theta = i * goldenAngle;
       const r = Math.sqrt(i) * 0.18;
       
       const x = Math.cos(theta) * r;
       const z = Math.sin(theta) * r;
       const y = i * 0.03;
       
       // Tilt outwards
       const tilt = Math.PI / 8 + (i * 0.02);
       
       arr.push({
         pos: [x, y, z],
         rotY: -theta + Math.PI/2,
         rotX: tilt,
         scale: 0.4 + (i * 0.02)
       });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.1 - 0.5;
      
      // Breathing effect on petals
      groupRef.current.children[0].scale.setScalar(1 + Math.sin(t * 2) * 0.05);
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Flower Head */}
        <group position={[0, 0, 0]}>
          {petals.map((p, i) => (
            <mesh 
              key={i} 
              position={p.pos} 
              rotation={[p.rotX, p.rotY, 0]} 
              scale={[p.scale, p.scale * 1.5, 0.05]}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshPhysicalMaterial 
                color={petalColor} 
                emissive={petalColor} 
                emissiveIntensity={0.5}
                transmission={0.8}
                roughness={0.2}
                transparent
                opacity={0.9}
              />
            </mesh>
          ))}
          {/* Inner Core */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
          </mesh>
        </group>

        {/* Stem */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 3, 16]} />
          <meshStandardMaterial color={stemColor} emissive={stemColor} emissiveIntensity={1} toneMapped={false} />
        </mesh>
        
        {/* Leaves */}
        {[-0.8, -1.5].map((y, i) => (
          <mesh 
            key={i} 
            position={[i === 0 ? 0.4 : -0.4, y, 0]} 
            rotation={[0, 0, i === 0 ? -Math.PI / 4 : Math.PI / 4]}
            scale={[0.6, 0.2, 0.05]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color={stemColor} emissive={stemColor} emissiveIntensity={0.5} toneMapped={false} />
          </mesh>
        ))}

        <pointLight color={petalColor} intensity={3} distance={5} position={[0, 1, 0]} />
        <pointLight color={stemColor} intensity={1} distance={5} position={[0, -1, 0]} />

      </group>
    </group>
  );
}
