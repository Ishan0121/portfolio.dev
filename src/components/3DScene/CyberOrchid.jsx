/* eslint-disable react-hooks/purity */
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ORCHID_DARK = "#0a001a"; // deep void purple
const ORCHID_GLOW = "#7000cc"; // neon purple
const ORCHID_EDGE = "#00f0ff"; // cyber cyan
const CORE_GOLD = "#ffaa00";
const STEM_COLOR = "#001a1a";
const STEM_GLOW = "#00ff88"; // neon green-cyan

function OrchidParametricPetal({ 
  type = 'sepal', 
  angle = 0, 
  tilt = 0, 
  scale = 1,
  color = ORCHID_DARK,
  emissive = ORCHID_GLOW,
  wireframeColor = ORCHID_EDGE
}) {
  const geo = useMemo(() => {
    const SEG_U = 30; // Length
    const SEG_V = 20; // Width
    const pos = [];
    const uv = [];
    const ind = [];

    for (let iu = 0; iu <= SEG_U; iu++) {
      const t = iu / SEG_U; 
      
      let widthFactor = 0;
      let curve = 0;
      let length = 2.5;

      if (type === 'dorsal_sepal') {
        widthFactor = Math.sin(t * Math.PI) * 0.55;
        curve = t * 0.6; 
      } else if (type === 'lateral_sepal') {
        widthFactor = Math.sin(t * Math.PI) * 0.5;
        curve = t * 0.5; 
        length = 2.3;
      } else if (type === 'petal') {
        // Wide, rounder, narrow at base
        widthFactor = Math.pow(Math.sin(t * Math.PI), 0.6) * 1.4;
        curve = t * 0.4; 
        length = 2.2;
      } else if (type === 'lip') {
        // Complex labellum
        if (t < 0.4) {
          // side lobes
          widthFactor = (t / 0.4) * 0.8;
        } else {
          // mid lobe
          widthFactor = Math.sin(((t - 0.4) / 0.6) * Math.PI) * 0.6;
        }
        curve = -t * 1.2; // Bends forward
        length = 1.6;
      }

      const py = t * length;
      const pzBase = -Math.pow(t, 2) * curve * length;

      for (let iv = 0; iv <= SEG_V; iv++) {
        const s = iv / SEG_V; 
        const nx = s - 0.5; 
        
        let px = nx * 2 * widthFactor;
        
        const dist = Math.abs(nx * 2); 
        let crease = 0;
        
        if (type === 'lip') {
           crease = -Math.pow(dist, 2) * 0.4;
        } else {
           crease = Math.pow(dist, 1.5) * 0.2 * t; 
        }

        const pz = pzBase + crease;

        pos.push(px, py, pz);
        uv.push(s, t);
      }
    }

    for (let iu = 0; iu < SEG_U; iu++) {
      for (let iv = 0; iv < SEG_V; iv++) {
        const a = iu * (SEG_V + 1) + iv;
        const b = a + SEG_V + 1;
        ind.push(a, b, a + 1);
        ind.push(b, b + 1, a + 1);
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(ind);
    g.computeVertexNormals();
    return g;
  }, [type]);

  return (
    <group rotation={[0, 0, angle]}>
      <group rotation={[tilt, 0, 0]}>
        <mesh geometry={geo} scale={scale} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color={color}
            emissive={emissive}
            emissiveIntensity={0.8}
            roughness={0.15}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh geometry={geo} scale={scale * 1.005}>
          <meshBasicMaterial 
            color={wireframeColor} 
            wireframe 
            transparent 
            opacity={0.2} 
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

function OrchidColumn({ scale = 1, color = CORE_GOLD, emissive = "#ff5500" }) {
  const geo = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0.4, 0.4),
      new THREE.Vector3(0, 0.8, 0.6)
    );
    return new THREE.TubeGeometry(curve, 20, 0.15, 8, false);
  }, []);

  return (
    <group scale={scale}>
      <mesh geometry={geo}>
        <meshPhysicalMaterial 
          color={color} 
          emissive={emissive} 
          emissiveIntensity={1}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      {/* Glowing Pollinia */}
      <mesh position={[0, 0.82, 0.62]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight color="#ffffff" intensity={2} distance={2} />
      </mesh>
    </group>
  );
}

function CyberStem() {
  const curve = useMemo(() => new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0.5, 0),
    new THREE.Vector3(0.5, -2, -0.5),
    new THREE.Vector3(-0.5, -4, -1.0),
    new THREE.Vector3(0, -6, -1.5)
  ), []);

  const geo = useMemo(() => new THREE.TubeGeometry(curve, 32, 0.08, 8, false), [curve]);

  return (
    <group>
      <mesh geometry={geo} castShadow>
        <meshPhysicalMaterial 
          color={STEM_COLOR} 
          emissive={STEM_GLOW} 
          emissiveIntensity={0.2} 
          metalness={0.8}
          roughness={0.2}
        />
        <mesh geometry={geo} scale={1.05}>
          <meshBasicMaterial color={STEM_GLOW} wireframe transparent opacity={0.1} />
        </mesh>
      </mesh>
      {[0.3, 0.6, 0.9].map((t, i) => {
        const pt = curve.getPointAt(t);
        return (
          <mesh key={i} position={pt}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color={STEM_GLOW} />
            <pointLight color={STEM_GLOW} intensity={0.5} distance={2} />
          </mesh>
        );
      })}
    </group>
  );
}

function DataParticles() {
  const count = 50;
  const meshRef = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 8 - 2,
        z: (Math.random() - 0.5) * 4,
        speed: 0.5 + Math.random() * 1.5,
        scale: 0.02 + Math.random() * 0.04
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      const y = ((p.y + t * p.speed + 6) % 12) - 6; 
      dummy.position.set(
        p.x + Math.sin(t * 2 + i) * 0.1, 
        y, 
        p.z + Math.cos(t * 1.5 + i) * 0.1
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={ORCHID_EDGE} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

function CyberRings() {
  const ringsRef = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = t * (0.5 + i * 0.2); 
        ring.rotation.x = Math.PI / 2 + 0.2 + Math.sin(t * 0.5 + i) * 0.1;
      }
    });
  });

  return (
    <group>
      {[0, 1, 2].map((i) => (
        <group key={`ring-${i}`} position={[0, -1.5 - i * 1.5, -0.5 - i * 0.3]}>
           <group ref={el => ringsRef.current[i] = el}>
             <mesh>
                <torusGeometry args={[1.2 + i * 0.3, 0.015, 16, 64]} />
                <meshBasicMaterial color={ORCHID_EDGE} transparent opacity={0.3 + i * 0.1} blending={THREE.AdditiveBlending} />
             </mesh>
             <mesh position={[1.2 + i * 0.3, 0, 0]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
                <pointLight color={ORCHID_EDGE} intensity={1} distance={2} />
             </mesh>
           </group>
        </group>
      ))}
    </group>
  );
}

export function CyberOrchid() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.1 + 0.2;
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
      groupRef.current.rotation.z = Math.sin(t * 0.7) * 0.05;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.8;

  return (
    <group position={[0, -0.5, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* Flower Head */}
        <group position={[0, 0.5, 0]} rotation={[0.2, 0, 0]}>
          
          <OrchidParametricPetal type="dorsal_sepal" angle={0} tilt={0.15} />
          
          <OrchidParametricPetal type="lateral_sepal" angle={Math.PI * 0.68} tilt={0.1} />
          <OrchidParametricPetal type="lateral_sepal" angle={-Math.PI * 0.68} tilt={0.1} />
          
          <OrchidParametricPetal type="petal" angle={Math.PI * 0.38} tilt={-0.1} emissive="#a200ff" />
          <OrchidParametricPetal type="petal" angle={-Math.PI * 0.38} tilt={-0.1} emissive="#a200ff" />
          
          <OrchidParametricPetal type="lip" angle={Math.PI} tilt={0.2} color="#1a0033" emissive="#cc00ff" wireframeColor="#ff00aa" />
          
          <OrchidColumn scale={1} />
          
          {/* Inner Core Glow */}
          <pointLight color={ORCHID_EDGE} intensity={1.5} distance={4} position={[0, 0.2, 0.5]} />
          <pointLight color="#ff00a0" intensity={2} distance={3} position={[0, -0.5, 0.5]} />
        </group>

        {/* Stem */}
        <CyberStem />
        
        {/* Environment particles */}
        <DataParticles />

        {/* Floating cyber-rings around the stem */}
        <CyberRings />

      </group>
    </group>
  );
}
