import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const shellMat = { color: "#333333", metalness: 0.9, roughness: 0.3 };
const coreColor = "#ff5500"; // Intense orange/red

export function RobotCore() {
  const groupRef = useRef();
  const ringsRefs = React.useMemo(() => Array(3).fill().map(() => React.createRef()), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2 + 0.2;
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.1;
    }
    
    ringsRefs.forEach((ref, i) => {
       if (ref.current) {
          const speed = (i + 1) * 0.5;
          ref.current.rotation.x += delta * speed * (i % 2 === 0 ? 1 : -1);
          ref.current.rotation.y += delta * speed * (i % 2 === 0 ? -1 : 1);
       }
    });
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Core Energy */}
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={4} toneMapped={false} />
        </mesh>
        
        {/* Core Containment Glass */}
        <mesh>
          <sphereGeometry args={[1.0, 32, 32]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} />
        </mesh>

        {/* Mechanical Rings */}
        {ringsRefs.map((ref, i) => (
          <group key={i} ref={ref}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
               <torusGeometry args={[1.3 + (i * 0.3), 0.1, 16, 64]} />
               <meshStandardMaterial {...shellMat} />
            </mesh>
            {/* Nodes on rings */}
            {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((angle, j) => (
              <mesh key={`node-${j}`} position={[Math.cos(angle) * (1.3 + i * 0.3), 0, Math.sin(angle) * (1.3 + i * 0.3)]}>
                 <boxGeometry args={[0.25, 0.25, 0.25]} />
                 <meshStandardMaterial {...shellMat} />
              </mesh>
            ))}
          </group>
        ))}

        <pointLight color={coreColor} intensity={5} distance={10} position={[0, 0, 0]} />

      </group>
    </group>
  );
}
