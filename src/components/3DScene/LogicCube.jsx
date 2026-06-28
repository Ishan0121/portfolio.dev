import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const cubeMat = { color: "#111111", metalness: 0.9, roughness: 0.2 };
const glowColor = "#00ff88"; // Neon green

export function LogicCube() {
  const groupRef = useRef();
  const blocksRef = useRef([]);

  if (blocksRef.current.length === 0) {
    blocksRef.current = Array(27).fill().map(() => React.createRef());
  }

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.2;
    }

    blocksRef.current.forEach((ref, i) => {
      if (ref.current) {
        // Create an expanding/contracting effect for the puzzle
        const x = (i % 3) - 1;
        const y = Math.floor((i / 3) % 3) - 1;
        const z = Math.floor(i / 9) - 1;
        
        // Multiplier for spacing
        const dist = Math.sin(t * 2 + (x*y*z)) * 0.2 + 1.1; 
        
        ref.current.position.set(x * dist, y * dist, z * dist);
        
        // Sometimes blocks spin individually
        if (i % 2 === 0) {
           ref.current.rotation.x += delta * 0.5;
        } else {
           ref.current.rotation.y -= delta * 0.5;
        }
      }
    });
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {blocksRef.current.map((ref, i) => (
          <group key={i} ref={ref}>
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial {...cubeMat} />
            </mesh>
            {/* Glowing inner core of each block */}
            <mesh>
              <boxGeometry args={[0.82, 0.82, 0.82]} />
              <meshBasicMaterial color={glowColor} wireframe transparent opacity={0.3} />
            </mesh>
          </group>
        ))}

        <pointLight color={glowColor} intensity={4} distance={8} position={[0, 0, 0]} />

      </group>
    </group>
  );
}
