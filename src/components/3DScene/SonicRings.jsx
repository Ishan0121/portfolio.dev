import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const color1 = "#ff0077"; // Hot pink
const color2 = "#00e5ff"; // Cyan

export function SonicRings() {
  const groupRef = useRef();
  
  // We'll have 30 rings in a tunnel
  const numRings = 30;
  const ringsRef = useRef([]);
  if (ringsRef.current.length === 0) {
    ringsRef.current = Array(numRings).fill().map(() => React.createRef());
  }
  
  // Pre-calculate colors so we don't do it every frame
  const ringColors = useMemo(() => {
    return Array(numRings).fill().map((_, i) => {
      const c1 = new THREE.Color(color1);
      const c2 = new THREE.Color(color2);
      const ratio = i / (numRings - 1);
      return c1.lerp(c2, ratio).clone();
    });
  }, [numRings]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.15; // Slow spin of the whole tunnel
    }
    
    ringsRef.current.forEach((ref, i) => {
      if (ref.current) {
        // Create an audio-visualizer wave effect down the tunnel
        // The radius expands and contracts based on its Z position and time
        // We use Math.abs and powers to make it look spiky like an audio wave
        const wave = Math.sin(t * 6 + i * 0.5);
        const intenseWave = Math.pow(Math.abs(wave), 3) * Math.sign(wave);
        
        const scale = 1 + intenseWave * 0.4;
        ref.current.scale.set(scale, scale, 1);
        
        // Spin individual rings slightly back and forth
        ref.current.rotation.z = Math.sin(t * 0.5 + i) * 0.2;
      }
    });
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.8;

  return (
    <group position={[0, 0, -4]} scale={[baseScale, baseScale, baseScale]} rotation={[Math.PI/8, -Math.PI/6, 0]}>
      <group ref={groupRef}>
        
        {ringsRef.current.map((ref, i) => {
          // Calculate Z position to form a tunnel
          // i=0 is front, i=30 is deep back
          const zPos = -i * 0.35;
          const isWireframe = i % 3 === 0;
          
          return (
            <mesh key={`ring-${i}`} ref={ref} position={[0, 0, zPos]}>
              <torusGeometry args={[2, isWireframe ? 0.08 : 0.03, 16, 64]} />
              <meshStandardMaterial 
                color={ringColors[i]} 
                emissive={ringColors[i]} 
                emissiveIntensity={1.5} 
                toneMapped={false}
                wireframe={isWireframe}
              />
            </mesh>
          )
        })}

        {/* Central energy beam shooting through the rings */}
        <mesh position={[0, 0, -((numRings-1)*0.35)/2]} rotation={[Math.PI/2, 0, 0]}>
           <cylinderGeometry args={[0.08, 0.08, numRings*0.35, 16]} />
           <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} toneMapped={false} />
        </mesh>
        
        {/* Beam particles/sparks */}
        <points position={[0, 0, -((numRings-1)*0.35)/2]}>
          <cylinderGeometry args={[0.3, 0.3, numRings*0.35, 16, 32]} />
          <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation toneMapped={false} />
        </points>

        <pointLight color={color1} intensity={5} distance={10} position={[0, 0, 2]} />
        <pointLight color={color2} intensity={5} distance={20} position={[0, 0, -10]} />

      </group>
    </group>
  );
}
