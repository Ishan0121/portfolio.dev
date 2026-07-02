import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const darkArmorProps = { color: "#222222", metalness: 0.8, roughness: 0.4 };
const whiteArmorProps = { color: "#f0f0f0", metalness: 0.4, roughness: 0.3 };
const eyeColor = "#ff0033"; // Terminator red
const propColor = "#111111";

export function HoverDrone() {
  const groupRef = useRef();
  const eyeRef = useRef();
  
  const propsRefs = React.useMemo(() => Array(4).fill().map(() => React.createRef()), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Drone hovering organically
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2.5) * 0.15;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2; // Gentle yaw
      groupRef.current.rotation.z = Math.sin(t * 1.2) * 0.05; // Gentle roll
      groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.05; // Gentle pitch
    }

    // Scanning eye
    if (eyeRef.current) {
      eyeRef.current.position.x = Math.sin(t * 4) * 0.35; // Eye moves left to right
    }

    // Spin props
    propsRefs.forEach((ref, index) => {
      if (ref.current) {
        // Alternate spin direction
        const dir = index % 2 === 0 ? 1 : -1;
        ref.current.rotation.y += delta * 40 * dir;
      }
    });
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.8;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* === MAIN BODY === */}
        <mesh>
          <sphereGeometry args={[0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
          <meshStandardMaterial {...whiteArmorProps} />
        </mesh>
        {/* Bottom half */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.75, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
          <meshStandardMaterial {...darkArmorProps} />
        </mesh>
        
        {/* Eye Visor */}
        <mesh position={[0, 0, 0.65]} scale={[1, 0.25, 0.4]}>
           <boxGeometry args={[1.2, 1, 1]} />
           <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
        </mesh>
        
        {/* Glowing Scanning Eye */}
        <group position={[0, 0, 0.82]}>
           <mesh ref={eyeRef}>
             <sphereGeometry args={[0.08, 16, 16]} />
             <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={4} toneMapped={false} />
           </mesh>
        </group>

        {/* Antenna */}
        <mesh position={[0, 1.0, -0.4]}>
           <cylinderGeometry args={[0.02, 0.05, 0.6, 8]} />
           <meshStandardMaterial {...darkArmorProps} />
        </mesh>
        <mesh position={[0, 1.35, -0.4]}>
           <sphereGeometry args={[0.08, 8, 8]} />
           <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={2} toneMapped={false}/>
        </mesh>

        {/* === ARMS & PROPS === */}
        {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((angle, i) => {
          return (
            <group key={`arm-${i}`} rotation={[0, angle + Math.PI/4, 0]}>
              {/* Arm extension */}
              <mesh position={[1.1, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                 <cylinderGeometry args={[0.08, 0.15, 1.4, 8]} />
                 <meshStandardMaterial {...whiteArmorProps} />
              </mesh>
              {/* Motor Pod */}
              <mesh position={[1.8, 0, 0]}>
                 <cylinderGeometry args={[0.2, 0.25, 0.3, 16]} />
                 <meshStandardMaterial {...darkArmorProps} />
              </mesh>
              {/* Propeller */}
              <group position={[1.8, 0.2, 0]} ref={propsRefs[i]}>
                 <mesh>
                   <boxGeometry args={[1.4, 0.02, 0.15]} />
                   <meshStandardMaterial color={propColor} />
                 </mesh>
                 <mesh rotation={[0, Math.PI/2, 0]}>
                   <boxGeometry args={[1.4, 0.02, 0.15]} />
                   <meshStandardMaterial color={propColor} />
                 </mesh>
                 {/* Top pin */}
                 <mesh position={[0, 0.05, 0]}>
                   <sphereGeometry args={[0.05, 8, 8]} />
                   <meshStandardMaterial {...whiteArmorProps} />
                 </mesh>
              </group>
            </group>
          )
        })}

        {/* Lighting */}
        <pointLight color={eyeColor} intensity={3} distance={5} position={[0, 0, 1]} />
        <pointLight color="#ffffff" intensity={2} distance={10} position={[0, 3, 0]} />

      </group>
    </group>
  );
}
