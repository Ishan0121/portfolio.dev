/* eslint-disable react-hooks/purity */
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const crystalColor = "#00ffa6"; // Mint / Cyan green
const frameColor = "#444444";

export function EnergyCrystal() {
  const groupRef = useRef();
  const shardsRef = useRef();
  const frameRef = useRef();

  // Generate shard positions and rotations
  const numShards = 25;
  const shardsData = useMemo(() => {
    return Array(numShards).fill().map(() => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 6
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.4 + 0.1
    }));
  }, [numShards]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1) * 0.3;
      groupRef.current.rotation.y += delta * 0.2;
    }

    if (frameRef.current) {
      frameRef.current.rotation.y -= delta * 0.1;
      frameRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }

    if (shardsRef.current) {
      shardsRef.current.children.forEach((shard, i) => {
        shard.rotation.x += delta * shardsData[i].speed;
        shard.rotation.y += delta * shardsData[i].speed;
        
        // Orbit around the center
        const angle = t * shardsData[i].speed * 0.5 + i;
        const radius = Math.sqrt(shardsData[i].position[0]**2 + shardsData[i].position[2]**2);
        
        shard.position.x = Math.cos(angle) * radius;
        shard.position.z = Math.sin(angle) * radius;
      });
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.8;

  return (
    <group position={[0, 0, -6]} scale={[baseScale, baseScale, baseScale]}>
      
      {/* Containment Frame */}
      <mesh ref={frameRef}>
        <octahedronGeometry args={[3.2, 0]} />
        <meshStandardMaterial color={frameColor} wireframe wireframeLinewidth={2} />
      </mesh>
      
      <group ref={groupRef}>
        
        {/* Main Crystal */}
        <mesh>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color={crystalColor} transparent opacity={0.7} metalness={0.6} roughness={0.1} />
        </mesh>
        
        {/* Inner Glowing Core */}
        <mesh scale={[0.5, 2.0, 0.5]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color={crystalColor} emissive={crystalColor} emissiveIntensity={4} toneMapped={false} />
        </mesh>
        
        {/* Floating Shards */}
        <group ref={shardsRef}>
          {shardsData.map((data, i) => (
            <mesh key={`shard-${i}`} position={data.position} rotation={data.rotation} scale={[data.scale, data.scale*2, data.scale]}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color={crystalColor} emissive={crystalColor} emissiveIntensity={1} transparent opacity={0.9} toneMapped={false}/>
            </mesh>
          ))}
        </group>

        {/* Lighting */}
        <pointLight color={crystalColor} intensity={8} distance={15} position={[0, 0, 0]} />
        <pointLight color="#ffffff" intensity={2} distance={10} position={[0, 3, 0]} />
      </group>
    </group>
  );
}
