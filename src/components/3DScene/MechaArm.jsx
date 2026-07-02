import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const darkMetal = { color: "#222222", metalness: 0.9, roughness: 0.4 };
const jointMetal = { color: "#555555", metalness: 0.8, roughness: 0.3 };
const accentColor = "#ff3300"; // Orange/red warning color

export function MechaArm() {
  const groupRef = useRef();
  const shoulderRef = useRef();
  const elbowRef = useRef();
  const wristRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.5;
      groupRef.current.position.y = -1;
    }

    if (shoulderRef.current) {
       shoulderRef.current.rotation.z = Math.sin(t * 1.2) * 0.3 + 0.5;
    }
    
    if (elbowRef.current) {
       elbowRef.current.rotation.z = Math.cos(t * 1.5) * 0.4 - 0.5;
    }

    if (wristRef.current) {
       wristRef.current.rotation.x = Math.sin(t * 2) * 0.5;
       // Pincers open and close
       wristRef.current.children[1].rotation.z = Math.sin(t * 3) * 0.2 + 0.2;
       wristRef.current.children[2].rotation.z = -(Math.sin(t * 3) * 0.2 + 0.2);
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.8;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1.2, 0.4, 32]} />
          <meshStandardMaterial {...darkMetal} />
        </mesh>
        
        {/* Shoulder Joint */}
        <group position={[0, 0.5, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 1, 32]} />
            <meshStandardMaterial {...jointMetal} />
          </mesh>
          
          <group ref={shoulderRef}>
            {/* Upper Arm */}
            <mesh position={[0, 1.2, 0]}>
               <boxGeometry args={[0.8, 2, 0.6]} />
               <meshStandardMaterial {...darkMetal} />
            </mesh>
            
            {/* Hydraulic Pistons (fake) */}
            <mesh position={[0.5, 1.2, 0]} rotation={[0, 0, 0.1]}>
               <cylinderGeometry args={[0.1, 0.1, 1.8, 16]} />
               <meshStandardMaterial color="#eeeeee" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[-0.5, 1.2, 0]} rotation={[0, 0, -0.1]}>
               <cylinderGeometry args={[0.1, 0.1, 1.8, 16]} />
               <meshStandardMaterial color="#eeeeee" metalness={1} roughness={0.1} />
            </mesh>

            {/* Elbow Joint */}
            <group position={[0, 2.4, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
                <meshStandardMaterial {...jointMetal} />
              </mesh>
              
              <group ref={elbowRef}>
                {/* Forearm */}
                <mesh position={[0, 1, 0]}>
                   <cylinderGeometry args={[0.3, 0.5, 2, 16]} />
                   <meshStandardMaterial {...darkMetal} />
                </mesh>
                
                {/* Warning Strips */}
                <mesh position={[0, 1, 0.26]}>
                   <boxGeometry args={[0.2, 0.8, 0.1]} />
                   <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1} toneMapped={false} />
                </mesh>
                
                {/* Wrist Joint */}
                <group position={[0, 2, 0]} ref={wristRef}>
                   <mesh>
                     <sphereGeometry args={[0.4, 32, 32]} />
                     <meshStandardMaterial {...jointMetal} />
                   </mesh>
                   
                   {/* Claw / Pincers */}
                   {/* Left Pincer */}
                   <group position={[-0.2, 0.4, 0]}>
                     <mesh position={[-0.2, 0.4, 0]} rotation={[0, 0, -Math.PI / 8]}>
                        <boxGeometry args={[0.15, 1, 0.3]} />
                        <meshStandardMaterial {...darkMetal} />
                     </mesh>
                   </group>
                   {/* Right Pincer */}
                   <group position={[0.2, 0.4, 0]}>
                     <mesh position={[0.2, 0.4, 0]} rotation={[0, 0, Math.PI / 8]}>
                        <boxGeometry args={[0.15, 1, 0.3]} />
                        <meshStandardMaterial {...darkMetal} />
                     </mesh>
                   </group>
                </group>
              </group>
            </group>
          </group>
        </group>

        <pointLight color="#ffffff" intensity={2} distance={10} position={[2, 4, 3]} />
        <pointLight color={accentColor} intensity={2} distance={5} position={[-2, 1, 2]} />

      </group>
    </group>
  );
}
