import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

function BeadedChain({ curve, pointCount }) {
  const points = useMemo(() => curve.getSpacedPoints(pointCount), [curve, pointCount]);
  const meshRef = useRef();

  useLayoutEffect(() => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      points.forEach((p, i) => {
        dummy.position.copy(p);
        // Alternate bead sizes: some large, some small
        const scale = i % 5 === 0 ? 1.5 : (i % 2 === 0 ? 0.8 : 0.5);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [points]);

  // Connector at the base (P0)
  const basePos = points[0];
  const tangent = curve.getTangentAt(0);
  const baseRot = new THREE.Euler().setFromQuaternion(
    new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent)
  );

  return (
    <group>
      {/* The central wire */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.015, 8, false]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* The Beads */}
      <instancedMesh ref={meshRef} args={[null, null, pointCount]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.1} />
      </instancedMesh>

      {/* Base Connector (Shock absorber) */}
      <group position={basePos} rotation={baseRot}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.2} />
        </mesh>
        {/* Spring rings */}
        {[0.1, 0.3, 0.5, 0.7].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.18, 0.03, 8, 16]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

const DodecahedronJoints = ({ radius }) => {
  const geom = useMemo(() => new THREE.DodecahedronGeometry(radius, 0), [radius]);
  const vertices = useMemo(() => {
    const pos = geom.attributes.position.array;
    const v = [];
    for(let i=0; i<pos.length; i+=3) {
      v.push(new THREE.Vector3(pos[i], pos[i+1], pos[i+2]));
    }
    // Remove duplicates due to non-indexed geometry
    const unique = [];
    v.forEach(vec => {
      if(!unique.some(u => u.distanceTo(vec) < 0.1)) unique.push(vec);
    });
    return unique;
  }, [geom]);

  return (
    <group>
      {vertices.map((v, i) => (
        <mesh key={i} position={v}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#111" metalness={1} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
};

function BackgroundNode({ position, scale, opacity }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.1;
      ref.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]} ref={ref}>
      <mesh>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color="#111" metalness={1} roughness={0.2} transparent opacity={opacity} />
        <Edges scale={1.02} color="#00f0ff" transparent opacity={opacity * 0.5} />
      </mesh>
    </group>
  );
}

export function NeuralNetwork() {
  const groupRef = useRef();
  const coreRadius = 1.8;

  // Generate curved paths
  const curves = useMemo(() => {
    const arr = [];
    const numChains = 14;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < numChains; i++) {
      const y = 1 - (i / (numChains - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const dir = new THREE.Vector3(x, y, z).normalize();
      const p0 = dir.clone().multiplyScalar(coreRadius);
      
      // Generate sweeping curved path outward
      const p1 = p0.clone().add(dir.clone().multiplyScalar(3)).add(new THREE.Vector3((Math.random()-0.5)*2, (Math.random()-0.5)*2, (Math.random()-0.5)*2));
      const p2 = p1.clone().add(dir.clone().multiplyScalar(4)).add(new THREE.Vector3((Math.random()-0.5)*4, (Math.random()-0.5)*4, (Math.random()-0.5)*4));
      const p3 = p2.clone().add(dir.clone().multiplyScalar(6)).add(new THREE.Vector3((Math.random()-0.5)*6, (Math.random()-0.5)*6, (Math.random()-0.5)*6));
      
      const curve = new THREE.CatmullRomCurve3([p0, p1, p2, p3]);
      arr.push(curve);
    }
    return arr;
  }, [coreRadius]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05; // Very slow majestic spin
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      
      // Breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1) * 0.02;
      groupRef.current.scale.setScalar(scale);
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 1.0;

  return (
    <group position={[0, 0, -8]} scale={[baseScale, baseScale, baseScale]}>
      
      {/* Background Distant Nodes */}
      <BackgroundNode position={[-15, 8, -20]} scale={0.5} opacity={0.2} />
      <BackgroundNode position={[18, -5, -25]} scale={0.8} opacity={0.15} />
      <BackgroundNode position={[-8, -12, -15]} scale={0.4} opacity={0.3} />

      <group ref={groupRef}>
        
        {/* Soma Core (Dodecahedron) */}
        <mesh>
          <dodecahedronGeometry args={[coreRadius, 0]} />
          <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.1} transparent opacity={0.8} />
          {/* Subtle outer edge glow */}
          <Edges scale={1.01} threshold={15} color="#444" />
          <Edges scale={1.01} threshold={15} color="#00f0ff" opacity={0.3} transparent />
        </mesh>
        
        {/* Mechanical Vertices */}
        <DodecahedronJoints radius={coreRadius} />

        {/* Inner Glowing Energy Core */}
        <mesh>
          <dodecahedronGeometry args={[coreRadius - 0.3, 0]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} wireframe transparent opacity={0.5} />
        </mesh>
        <mesh>
          <sphereGeometry args={[coreRadius - 0.8, 16, 16]} />
          <meshStandardMaterial color="#fff" emissive="#00f0ff" emissiveIntensity={5} />
        </mesh>

        {/* Inner Core Light */}
        <pointLight color="#00f0ff" intensity={5} distance={15} />

        {/* Beaded Dendrite Chains */}
        {curves.map((curve, idx) => (
          <BeadedChain key={idx} curve={curve} pointCount={40} />
        ))}
        
        {/* Subtle particle dust cloud orbiting the core */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={200}
              array={new Float32Array(600).map(() => (Math.random() - 0.5) * 12)}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.08} color="#00f0ff" transparent opacity={0.6} />
        </points>

      </group>
    </group>
  );
}
