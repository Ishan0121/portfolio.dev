import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';

const silverMatProps = { color: "#e8e8e8", metalness: 1, roughness: 0.15 };
const darkSteelProps = { color: "#222222", metalness: 0.9, roughness: 0.6 };
const boneAlloyProps = { color: "#cccccc", metalness: 0.7, roughness: 0.3 };
const nerveColor = "#00ff88"; // Toxic/Bio Green
const fluidColor = "#0088ff"; // Deep blue for cooling fluid

export function BioSpine() {
  const groupRef = useRef();
  
  const numVertebrae = 12;
  const spacing = 0.55;
  
  // Array of refs for each vertebra
  const vertebraeRefs = useRef([]);
  if (vertebraeRefs.current.length !== numVertebrae) {
    vertebraeRefs.current = Array(numVertebrae).fill().map((_, i) => vertebraeRefs.current[i] || React.createRef());
  }
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Overall bobbing
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.2 - (numVertebrae * spacing) / 2 + 1;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.4;
    }
    
    // Undulate each vertebra like a cyber-snake
    vertebraeRefs.current.forEach((ref, index) => {
      if (ref.current) {
        // Snake-like sine wave delay based on height (index)
        const offset = index * 0.4;
        const flexX = Math.sin(t * 2.5 + offset) * 0.2;
        const flexZ = Math.cos(t * 2.0 + offset) * 0.15;
        
        // Apply position displacement
        ref.current.position.x = flexX;
        ref.current.position.z = flexZ;
        
        // Tilt slightly towards the curve to bend the spine naturally
        ref.current.rotation.z = -flexX * 0.5;
        ref.current.rotation.x = flexZ * 0.5;
      }
    });
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.85;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {Array.from({ length: numVertebrae }).map((_, i) => (
          <group key={i} position={[0, i * spacing, 0]} ref={vertebraeRefs.current[i]}>
            
            {/* Main Bone Block */}
            <RoundedBox args={[1.2, 0.35, 1.2]} radius={0.1} smoothness={4}>
              <meshStandardMaterial {...boneAlloyProps} />
            </RoundedBox>
            
            {/* Spinal Cord Segment (Moves with vertebra) */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, spacing, 16]} />
              <meshStandardMaterial color={nerveColor} emissive={nerveColor} emissiveIntensity={3} toneMapped={false} />
            </mesh>

            {/* Cooling pipes on sides */}
            <mesh position={[0.3, 0, 0.3]}>
              <cylinderGeometry args={[0.05, 0.05, spacing + 0.1, 8]} />
              <meshStandardMaterial color={fluidColor} emissive={fluidColor} emissiveIntensity={2} toneMapped={false} />
            </mesh>
            <mesh position={[-0.3, 0, 0.3]}>
              <cylinderGeometry args={[0.05, 0.05, spacing + 0.1, 8]} />
              <meshStandardMaterial color={fluidColor} emissive={fluidColor} emissiveIntensity={2} toneMapped={false} />
            </mesh>

            {/* Mechanical Core Insert (Front) */}
            <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
              <meshStandardMaterial {...darkSteelProps} />
            </mesh>

            {/* Glowing Disc Cushion (Between Vertebrae) */}
            {i < numVertebrae - 1 && (
              <mesh position={[0, spacing / 2, 0]}>
                <cylinderGeometry args={[0.45, 0.45, 0.15, 16]} />
                <meshStandardMaterial color={nerveColor} emissive={nerveColor} emissiveIntensity={1.5} transparent opacity={0.8} toneMapped={false} />
              </mesh>
            )}

            {/* Cybernetic Ribs / Transverse Processes */}
            {/* Left Rib */}
            <group position={[-0.6, 0, -0.2]} rotation={[0, -Math.PI / 6, 0]}>
              <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.04, 0.8, 8]} />
                <meshStandardMaterial {...silverMatProps} />
              </mesh>
              {/* Joint at the tip */}
              <mesh position={[-0.8, 0, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial {...darkSteelProps} />
              </mesh>
              <mesh position={[-0.8, 0.12, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color={nerveColor} emissive={nerveColor} emissiveIntensity={2.5} toneMapped={false} />
              </mesh>
            </group>
            
            {/* Right Rib */}
            <group position={[0.6, 0, -0.2]} rotation={[0, Math.PI / 6, 0]}>
              <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.04, 0.8, 8]} />
                <meshStandardMaterial {...silverMatProps} />
              </mesh>
              <mesh position={[0.8, 0, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial {...darkSteelProps} />
              </mesh>
              <mesh position={[0.8, 0.12, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color={nerveColor} emissive={nerveColor} emissiveIntensity={2.5} toneMapped={false} />
              </mesh>
            </group>
            
            {/* Spinous Process (Back Spike) */}
            <group position={[0, 0, -0.6]}>
              <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.03, 0.6, 8]} />
                <meshStandardMaterial {...silverMatProps} />
              </mesh>
              {/* Data Node on the spike */}
              <mesh position={[0, 0, -0.6]}>
                <boxGeometry args={[0.15, 0.15, 0.15]} />
                <meshStandardMaterial color={fluidColor} emissive={fluidColor} emissiveIntensity={2} toneMapped={false} />
              </mesh>
            </group>

          </group>
        ))}

        {/* Global Lights for the Spine */}
        <pointLight color={nerveColor} intensity={3} distance={15} position={[0, 3, 3]} />
        <pointLight color={fluidColor} intensity={3} distance={15} position={[0, -2, -4]} />

      </group>
    </group>
  );
}
