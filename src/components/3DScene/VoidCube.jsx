import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const darkGlassProps = { color: "#000000", metalness: 1, roughness: 0.1, transparent: true, opacity: 0.4 };
const frameProps = { color: "#222222", metalness: 0.9, roughness: 0.2 };
const voidColor = "#b829ff"; // Deep purple void

export function VoidCube() {
  const groupRef = useRef();
  const outerCubeRef = useRef();
  const innerCubeRef = useRef();
  const coreRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1) * 0.2;
    }
    
    // Smooth geometric rotations
    if (outerCubeRef.current) {
      outerCubeRef.current.rotation.x += delta * 0.3;
      outerCubeRef.current.rotation.y += delta * 0.4;
    }
    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.x -= delta * 0.5;
      innerCubeRef.current.rotation.z += delta * 0.6;
      
      const scale = 1 + Math.sin(t * 4) * 0.08;
      innerCubeRef.current.scale.set(scale, scale, scale);
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 2;
      coreRef.current.rotation.z += delta * 1.5;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Outer Tesseract Frame */}
        <group ref={outerCubeRef}>
          {/* Glass Panels */}
          <mesh>
            <boxGeometry args={[3, 3, 3]} />
            <meshStandardMaterial {...darkGlassProps} />
          </mesh>
          {/* Outer wireframe */}
          <mesh>
            <boxGeometry args={[3.02, 3.02, 3.02]} />
            <meshStandardMaterial {...frameProps} wireframe wireframeLinewidth={3} />
          </mesh>
          {/* Glowing nodes on the vertices */}
          <points>
            <boxGeometry args={[3.05, 3.05, 3.05]} />
            <pointsMaterial size={0.15} color={voidColor} transparent opacity={0.8} sizeAttenuation toneMapped={false} />
          </points>
        </group>

        {/* Inner Tesseract Box */}
        <group ref={innerCubeRef}>
          {/* Energy outline */}
          <mesh>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color={voidColor} wireframe transparent opacity={0.6} emissive={voidColor} emissiveIntensity={3} toneMapped={false} />
          </mesh>
          <points>
            <boxGeometry args={[1.55, 1.55, 1.55]} />
            <pointsMaterial size={0.1} color="#ffffff" transparent opacity={1} sizeAttenuation toneMapped={false} />
          </points>
        </group>

        {/* Void Core Singularity */}
        <group ref={coreRef}>
          <mesh>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color={voidColor} emissive={voidColor} emissiveIntensity={5} toneMapped={false} />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial color="#ffffff" wireframe emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
          </mesh>
        </group>

        {/* Lighting */}
        <pointLight color={voidColor} intensity={5} distance={15} />
        <pointLight color="#ffffff" intensity={2} distance={5} />

      </group>
    </group>
  );
}
