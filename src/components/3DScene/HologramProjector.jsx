import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const darkMetalProps = { color: "#111111", metalness: 0.9, roughness: 0.6 };
const silverMatProps = { color: "#cccccc", metalness: 1, roughness: 0.2 };
const holoColor = "#0088ff"; 

export function HologramProjector() {
  const groupRef = useRef();
  const hologramRef = useRef();
  const baseRef = useRef();
  const innerHoloRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.1 - 0.5;
    }
    
    if (hologramRef.current) {
      hologramRef.current.rotation.y += delta * 0.5;
      hologramRef.current.rotation.x += delta * 0.3;
      hologramRef.current.position.y = 1.5 + Math.sin(t * 3) * 0.1;
      
      // Flickering effect
      const flicker = 0.8 + Math.random() * 0.4;
      hologramRef.current.material.opacity = 0.3 * flicker;
    }

    if (innerHoloRef.current) {
        innerHoloRef.current.rotation.y -= delta * 0.8;
        innerHoloRef.current.position.y = 1.5 + Math.sin(t * 3) * 0.1;
    }

    if (baseRef.current) {
      baseRef.current.rotation.y = t * 0.2;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, -1, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* === PROJECTOR BASE === */}
        <group ref={baseRef} position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.5, 1.8, 0.4, 32]} />
            <meshStandardMaterial {...darkMetalProps} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[1.2, 1.4, 0.2, 32]} />
            <meshStandardMaterial {...silverMatProps} />
          </mesh>
          {/* Lenses / Emitters */}
          <mesh position={[0, 0.36, 0]}>
            <cylinderGeometry args={[0.8, 1.0, 0.05, 32]} />
            <meshStandardMaterial color={holoColor} emissive={holoColor} emissiveIntensity={2} toneMapped={false} />
          </mesh>
          
          {/* Base details */}
          {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
            <mesh key={`detail-${i}`} position={[Math.cos(angle)*1.6, 0, Math.sin(angle)*1.6]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.3, 0.5, 0.2]} />
              <meshStandardMaterial {...darkMetalProps} />
            </mesh>
          ))}
        </group>

        {/* === PROJECTION CONE (Light beam) === */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[1.5, 0.8, 1.5, 32, 1, true]} />
          <meshBasicMaterial color={holoColor} transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* === THE HOLOGRAM === */}
        <mesh ref={hologramRef} position={[0, 1.5, 0]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={holoColor} wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </mesh>
        
        {/* Inner Hologram Core */}
        <mesh ref={innerHoloRef} position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial color={holoColor} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>

        <pointLight color={holoColor} intensity={3} distance={5} position={[0, 0.5, 0]} />
      </group>
    </group>
  );
}
