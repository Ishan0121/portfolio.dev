/* eslint-disable react-hooks/purity */
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const glassProps = { 
  color: "#ffffff", 
  transmission: 0.95, 
  opacity: 1, 
  metalness: 0, 
  roughness: 0.1, 
  ior: 1.5, 
  thickness: 1.0, 
  specularIntensity: 1, 
  clearcoat: 1, 
  transparent: true 
};
const silverMatProps = { color: "#e8e8e8", metalness: 1, roughness: 0.15 };
const nodeColor = "#00ffcc"; // AI glowing cyan/green
const coreColor = "#ff00ff"; // AI glowing magenta

export function NeuralCore() {
  const groupRef = useRef();
  const brainRef = useRef();
  const particlesRef = useRef();

  // Create random nodes for the neural net
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      const radius = 1.0 + Math.random() * 0.8;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Float the entire chamber
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.2;
      groupRef.current.rotation.y = t * 0.2;
    }

    // Pulse the brain core
    if (brainRef.current) {
      const scale = 1 + Math.sin(t * 8) * 0.05;
      brainRef.current.scale.set(scale, scale, scale);
    }

    // Swirl the data particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.5;
      particlesRef.current.rotation.x += delta * 0.2;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.7 : 0.9;

  return (
    <group position={[0, -0.5, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* === THE CHAMBER === */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 5, 32]} />
          <meshPhysicalMaterial {...glassProps} />
        </mesh>

        {/* Top & Bottom Caps */}
        <mesh position={[0, 2.6, 0]}>
          <cylinderGeometry args={[2.6, 2.6, 0.2, 32]} />
          <meshStandardMaterial {...silverMatProps} />
        </mesh>
        <mesh position={[0, -2.6, 0]}>
          <cylinderGeometry args={[2.6, 2.6, 0.2, 32]} />
          <meshStandardMaterial {...silverMatProps} />
        </mesh>
        
        {/* Support Pillars */}
        {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle)*2.6, 0, Math.sin(angle)*2.6]} rotation={[0, -angle, 0]}>
             <boxGeometry args={[0.2, 5.2, 0.2]} />
             <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.4} />
          </mesh>
        ))}

        {/* === THE NEURAL CORE (BRAIN) === */}
        <group ref={brainRef}>
          {/* Center glowing core */}
          <mesh>
            <icosahedronGeometry args={[0.7, 3]} />
            <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={4} toneMapped={false} />
          </mesh>

          {/* Neural Nodes & Connections */}
          {nodes.map((pos, i) => (
            <group key={`node-${i}`}>
              <mesh position={pos}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color={nodeColor} emissive={nodeColor} emissiveIntensity={3} toneMapped={false} />
              </mesh>
              {/* Connect node to center */}
              <mesh>
                <tubeGeometry args={[new THREE.LineCurve3(new THREE.Vector3(0,0,0), pos), 20, 0.015, 8, false]} />
                <meshStandardMaterial color={nodeColor} emissive={nodeColor} emissiveIntensity={1} toneMapped={false} />
              </mesh>
            </group>
          ))}
        </group>

        {/* === FLOATING DATA PARTICLES === */}
        <points ref={particlesRef}>
          <icosahedronGeometry args={[2.2, 2]} />
          <pointsMaterial size={0.05} color={coreColor} transparent opacity={0.8} sizeAttenuation toneMapped={false} />
        </points>

        {/* Lights */}
        <pointLight color={coreColor} intensity={3} distance={10} position={[0, 0, 0]} />
        <pointLight color={nodeColor} intensity={2} distance={8} position={[0, 2, 0]} />
        <pointLight color={nodeColor} intensity={2} distance={8} position={[0, -2, 0]} />

      </group>
    </group>
  );
}
