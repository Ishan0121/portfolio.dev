import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const darkSteelProps = { color: "#1a1a1a", metalness: 0.9, roughness: 0.5 };
const goldMatProps = { color: "#ffd700", metalness: 1, roughness: 0.2 };
const pcbMatProps = { color: "#001200", metalness: 0.6, roughness: 0.8 };
const dataColor = "#00ffcc"; 
const powerColor = "#ff3300";

export function MemoryChip() {
  const groupRef = useRef();
  const dataLinesRefs = React.useMemo(() => Array(5).fill().map(() => React.createRef()), []);
  const holoLayerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Float the memory chip
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2) * 0.15;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
      groupRef.current.rotation.x = Math.cos(t * 0.8) * 0.1;
    }
    
    // Pulse the data lines randomly
    dataLinesRefs.forEach((ref, i) => {
      if (ref.current) {
        const pulse = Math.max(0, Math.sin(t * (3 + i) + i * 1.5));
        ref.current.material.emissiveIntensity = pulse * 4;
      }
    });

    // Animate the holographic UI above the chip
    if (holoLayerRef.current) {
      holoLayerRef.current.position.y = 0.6 + Math.sin(t * 4) * 0.05;
      holoLayerRef.current.material.opacity = 0.15 + Math.sin(t * 8) * 0.05;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.8 : 1.0;

  return (
    <group position={[0, 0, -5]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Main PCB Board */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 0.15, 2]} />
          <meshStandardMaterial {...pcbMatProps} />
        </mesh>
        
        {/* Gold Connectors (Pins) */}
        <group position={[0, 0, 1.05]}>
          {Array.from({ length: 19 }).map((_, i) => (
            <mesh key={`pin-${i}`} position={[-1.8 + i * 0.2, 0, 0]}>
              <boxGeometry args={[0.1, 0.16, 0.2]} />
              <meshStandardMaterial {...goldMatProps} />
            </mesh>
          ))}
        </group>

        {/* Central Processor Unit */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.5, 0.2, 1.2]} />
          <meshStandardMaterial {...darkSteelProps} />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[1.2, 0.05, 0.9]} />
          <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Glowing core indicator */}
        <mesh position={[0, 0.29, 0]} rotation={[-Math.PI / 2, 0, 0]}>
           <planeGeometry args={[0.4, 0.4]} />
           <meshStandardMaterial color={powerColor} emissive={powerColor} emissiveIntensity={2} toneMapped={false} />
        </mesh>

        {/* Memory Banks (Heat sinks) */}
        {[-1.2, 1.2].map((x, idx) => (
          <group key={`bank-${idx}`} position={[x, 0.1, -0.2]}>
            {[-0.3, 0, 0.3].map((z, i) => (
              <mesh key={`sink-${idx}-${i}`} position={[0, 0.1, z]}>
                <boxGeometry args={[0.6, 0.2, 0.15]} />
                <meshStandardMaterial {...darkSteelProps} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Data lines (glowing paths) */}
        <group position={[0, 0.08, 0]}>
          {[
            { pos: [-0.8, 0, 0.5], args: [0.6, 0.02, 0.02] },
            { pos: [0.8, 0, 0.5], args: [0.6, 0.02, 0.02] },
            { pos: [-0.5, 0, 0.7], args: [0.02, 0.02, 0.4] },
            { pos: [0.5, 0, 0.7], args: [0.02, 0.02, 0.4] },
            { pos: [0, 0, -0.7], args: [1.5, 0.02, 0.02] },
          ].map((line, i) => (
            <mesh key={`line-${i}`} position={line.pos} ref={dataLinesRefs[i]}>
              <boxGeometry args={line.args} />
              <meshStandardMaterial color={dataColor} emissive={dataColor} emissiveIntensity={0} toneMapped={false} />
            </mesh>
          ))}
        </group>
        
        {/* Holographic Projection Layer above CPU */}
        <mesh ref={holoLayerRef} position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 0.9]} />
          <meshBasicMaterial color={dataColor} transparent opacity={0.15} wireframe />
        </mesh>
        <mesh position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.0, 0.7]} />
          <meshBasicMaterial color={dataColor} transparent opacity={0.3} wireframe />
        </mesh>

        {/* Lighting */}
        <pointLight color={dataColor} intensity={2} distance={5} position={[0, 1, 0]} />
        <pointLight color={powerColor} intensity={1.5} distance={3} position={[0, 0.5, 0]} />
      </group>
    </group>
  );
}
