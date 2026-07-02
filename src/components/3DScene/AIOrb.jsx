import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const orbColor = "#0055ff"; 
const coreColor = "#ffffff"; 
const ringColor = "#00ffff";

export function AIOrb() {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const outerSphereRef = useRef();
  const ringsRefs = React.useMemo(() => Array(3).fill().map(() => React.createRef()), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Float the entire orb
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.3;
      groupRef.current.rotation.y = t * 0.1;
    }

    // Pulse inner core
    if (innerCoreRef.current) {
      const scale = 1 + Math.sin(t * 5) * 0.1;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }
    
    // Rotate outer sphere slowly
    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.x = t * 0.2;
      outerSphereRef.current.rotation.z = t * 0.15;
    }

    // Spin rings at different speeds and axes
    ringsRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.rotation.x += delta * (0.5 + i * 0.2);
        ref.current.rotation.y += delta * (0.3 + i * 0.4);
      }
    });
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* === INNER CORE === */}
        <mesh ref={innerCoreRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={3} toneMapped={false} />
        </mesh>

        {/* === OUTER TRANSLUCENT SHELL === */}
        <mesh ref={outerSphereRef}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshPhysicalMaterial 
            color={orbColor} 
            transmission={0.9} 
            opacity={1} 
            metalness={0.1} 
            roughness={0.1} 
            ior={1.2} 
            thickness={0.5} 
            transparent={true} 
            wireframe={true}
          />
        </mesh>
        
        {/* Glow Shell */}
        <mesh>
          <sphereGeometry args={[1.6, 32, 32]} />
          <meshBasicMaterial color={orbColor} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* === ORBITING DATA RINGS === */}
        {[1.8, 2.1, 2.4].map((radius, i) => (
          <group key={`ring-${i}`} ref={ringsRefs[i]}>
            {/* Ring path */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.01, 16, 64]} />
              <meshBasicMaterial color={ringColor} transparent opacity={0.3} />
            </mesh>
            {/* Data nodes on ring */}
            {[0, Math.PI, Math.PI / 2].map((angle, j) => (
              <mesh key={`node-${j}`} position={[Math.cos(angle)*radius, 0, Math.sin(angle)*radius]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color={ringColor} emissive={ringColor} emissiveIntensity={2} toneMapped={false} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Light Sources */}
        <pointLight color={coreColor} intensity={2} distance={8} position={[0, 0, 0]} />
        <pointLight color={ringColor} intensity={2} distance={10} position={[2, 2, 2]} />
        <pointLight color={ringColor} intensity={2} distance={10} position={[-2, -2, -2]} />

      </group>
    </group>
  );
}
