import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── Palette ────────────────────────────────────────────────────────────────
const PETAL_BASE   = '#f2a05a';   // warm apricot-orange at base
const PETAL_VEIN   = '#e06030';   // deep burnt-orange vein stripe
const STAMEN_STEM  = '#b8d96e';   // chartreuse filament
const ANTHER_COL   = '#4a2800';   // dark brown anther head
const STIGMA_COL   = '#2d5a1b';   // deep green stigma
const LEAF_COL     = '#3a7a2a';   // rich botanical green
const STEM_COL     = '#2e6622';   // darker stem green
const SOIL_DARK    = '#2a1a0e';
const SOIL_MID     = '#3d2510';

// ── Helpers ────────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }

// A single lily petal — carved using a lathe/shape approach via
// a custom BufferGeometry so it curves realistically
function LilyPetal({ angle, tilt, length = 3.2, width = 0.9, isSeptal = false }) {
  const geo = useMemo(() => {
    // Build petal as a tapered, curved strip with a gentle midrib crease
    const SEG_U = 12; // along the petal length
    const SEG_V = 8;  // across the petal width
    const positions = [];
    const normals   = [];
    const uvs       = [];
    const indices   = [];

    for (let iu = 0; iu <= SEG_U; iu++) {
      const t = iu / SEG_U;
      // Width profile: starts narrow at base, widens, then tapers to tip
      const widthFactor = Math.sin(t * Math.PI) * (isSeptal ? 0.6 : 1.0);
      const halfW = width * widthFactor * 0.5;

      // Length along petal in local Y
      const py = t * length;

      // Curve: petal reflexes backward (trumpet-lily style) after midpoint
      const curvature = t < 0.4
        ? t * 0.3                          // straighten near base
        : 0.12 + (t - 0.4) * 1.1;         // reflex outward toward tip
      const pz = -Math.pow(t, 1.6) * curvature * length * 0.55;

      for (let iv = 0; iv <= SEG_V; iv++) {
        const s = iv / SEG_V;           // 0 → 1 across width
        const px = lerp(-halfW, halfW, s);

        // Midrib crease: edges curl slightly back
        const edgeCurl = Math.pow(Math.abs(s - 0.5) * 2, 2.2) * 0.18 * t;
        const pzFinal  = pz - edgeCurl;

        positions.push(px, py, pzFinal);

        // Approximate normal (pointing mostly outward from flower)
        const nx = 0;
        const ny = Math.sin(curvature * 0.5);
        const nz = 1 - Math.abs(edgeCurl);
        const nl = Math.sqrt(nx*nx + ny*ny + nz*nz);
        normals.push(nx/nl, ny/nl, nz/nl);

        uvs.push(s, t);
      }
    }

    for (let iu = 0; iu < SEG_U; iu++) {
      for (let iv = 0; iv < SEG_V; iv++) {
        const a = iu * (SEG_V + 1) + iv;
        const b = a + SEG_V + 1;
        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('normal',   new THREE.Float32BufferAttribute(normals, 3));
    g.setAttribute('uv',       new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(indices);
    g.computeVertexNormals();
    return g;
  }, [length, width, isSeptal]);

  // Gradient color via vertex color would need a shader; we use a single
  // physically-based material with slight emissive warmth instead
  return (
    <group rotation={[0, angle, 0]}>
      {/* Tilt outward and back */}
      <group rotation={[tilt, 0, 0]}>
        <mesh geometry={geo} castShadow>
          <meshPhysicalMaterial
            color={isSeptal ? '#d4885a' : PETAL_BASE}
            roughness={0.55}
            metalness={0.0}
            clearcoat={0.3}
            clearcoatRoughness={0.4}
            side={THREE.DoubleSide}
            emissive={PETAL_BASE}
            emissiveIntensity={0.04}
          />
        </mesh>
        {/* Central vein stripe — thin box along the midrib */}
        <mesh position={[0, length * 0.5, 0.01]} castShadow>
          <boxGeometry args={[0.045, length * 0.88, 0.01]} />
          <meshStandardMaterial color={PETAL_VEIN} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// A stamen: filament + anther
function Stamen({ angle, radius = 0.22, height = 1.65 }) {
  return (
    <group rotation={[0, angle, 0]}>
      {/* Filament — slightly curved cylinder */}
      <mesh position={[radius * 0.5, height * 0.5, 0]} rotation={[0, 0, -radius * 0.35]} castShadow>
        <cylinderGeometry args={[0.018, 0.024, height, 6]} />
        <meshStandardMaterial color={STAMEN_STEM} roughness={0.6} />
      </mesh>
      {/* Anther */}
      <mesh position={[radius * 0.9, height, 0]} rotation={[Math.PI * 0.15, 0, -radius * 0.35]} castShadow>
        <capsuleGeometry args={[0.058, 0.22, 4, 8]} />
        <meshStandardMaterial color={ANTHER_COL} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Central pistil (style + stigma)
function Pistil() {
  return (
    <group>
      {/* Style */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 1.95, 8]} />
        <meshStandardMaterial color={STIGMA_COL} roughness={0.55} />
      </mesh>
      {/* Stigma — three-lobed knob */}
      {[0, Math.PI * 2/3, Math.PI * 4/3].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.055, 2.1, Math.sin(a) * 0.055]}>
          <sphereGeometry args={[0.072, 8, 8]} />
          <meshStandardMaterial color='#3a8a22' roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// A simple leaf shape
function Leaf({ angle, height, lean }) {
  const geo = useMemo(() => {
    const pts = [];
    const N = 10;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const w = Math.sin(t * Math.PI) * 0.28;
      const y = t * 1.8;
      const z = -Math.pow(t, 1.5) * 0.4;
      pts.push(new THREE.Vector3(w, y, z));
    }
    // Mirror
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const w =  Math.sin(t * Math.PI) * 0.28;
      shape.lineTo(w, t * 1.8);
    }
    for (let i = N; i >= 0; i--) {
      const t = i / N;
      const w = -Math.sin(t * Math.PI) * 0.28;
      shape.lineTo(w, t * 1.8);
    }
    const g = new THREE.ShapeGeometry(shape, 12);
    return g;
  }, []);

  return (
    <group rotation={[0, angle, 0]} position={[0, height, 0]}>
      <group rotation={[lean, 0, 0.3]}>
        <mesh geometry={geo} castShadow>
          <meshStandardMaterial color={LEAF_COL} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
        {/* Leaf midrib */}
        <mesh position={[0, 0.9, 0.005]}>
          <boxGeometry args={[0.022, 1.6, 0.005]} />
          <meshStandardMaterial color='#2a5a1a' roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export function QuantumLily() {
  const groupRef      = useRef();
  const flowerRef     = useRef();
  const petalsRef     = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Gentle sway — like a breeze
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.028 + Math.sin(t * 1.1) * 0.012;
      groupRef.current.rotation.x = Math.sin(t * 0.45 + 1) * 0.018;
    }

    // Petals breathe very softly
    if (petalsRef.current) {
      const breath = 1 + Math.sin(t * 1.2) * 0.012;
      petalsRef.current.scale.set(breath, 1 + Math.sin(t * 1.2) * 0.006, breath);
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.55 : 0.72;

  // 6 outer tepals + 6 inner tepals (lilies have 3+3 in two whorls)
  const outerAngles = Array.from({ length: 3 }, (_, i) => (i / 3) * Math.PI * 2);
  const innerAngles = Array.from({ length: 3 }, (_, i) => ((i / 3) + 1/6) * Math.PI * 2);

  // 6 stamens
  const stamenAngles = Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2);

  return (
    <group scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef} position={[0, -1.2, -5]}>

        {/* Soil / base */}
        <mesh position={[0, -0.55, 0]} receiveShadow>
          <cylinderGeometry args={[1.4, 1.6, 0.22, 24]} />
          <meshStandardMaterial color={SOIL_DARK} roughness={1} />
        </mesh>
        <mesh position={[0, -0.46, 0]} receiveShadow>
          <cylinderGeometry args={[1.35, 1.35, 0.08, 24]} />
          <meshStandardMaterial color={SOIL_MID} roughness={1} />
        </mesh>
        {/* Soil texture pebbles */}
        {Array.from({ length: 18 }).map((_, i) => {
          const a = (i / 18) * Math.PI * 2;
          const r = 0.4 + Math.sin(i * 7.3) * 0.5;
          return (
            <mesh key={i} position={[Math.cos(a) * r, -0.44, Math.sin(a) * r]}>
              <sphereGeometry args={[0.04 + Math.sin(i * 3.7) * 0.02, 4, 4]} />
              <meshStandardMaterial color='#3a2010' roughness={1} />
            </mesh>
          );
        })}

        {/* Main stem */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.055, 0.075, 3.4, 10]} />
          <meshStandardMaterial color={STEM_COL} roughness={0.7} />
        </mesh>

        {/* Leaves on stem */}
        <Leaf angle={0.4}          height={0.2}  lean={-0.5} />
        <Leaf angle={0.4 + Math.PI} height={0.8}  lean={-0.45} />
        <Leaf angle={1.2}           height={1.6}  lean={-0.4} />

        {/* Flower head */}
        <group ref={flowerRef} position={[0, 2.8, 0]}>

          {/* Ovary / receptacle bump */}
          <mesh position={[0, -0.18, 0]}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial color='#4a7a30' roughness={0.6} />
          </mesh>

          {/* Petals group */}
          <group ref={petalsRef} position={[0, 0, 0]}>
            {/* Outer whorl (sepals) — slightly narrower, lower */}
            {outerAngles.map((angle, i) => (
              <LilyPetal
                key={`outer-${i}`}
                angle={angle}
                tilt={-Math.PI * 0.32}
                length={3.0}
                width={0.82}
                isSeptal={true}
              />
            ))}
            {/* Inner whorl (petals proper) — wider, slightly higher tilt */}
            {innerAngles.map((angle, i) => (
              <LilyPetal
                key={`inner-${i}`}
                angle={angle}
                tilt={-Math.PI * 0.28}
                length={3.3}
                width={0.94}
                isSeptal={false}
              />
            ))}
          </group>

          {/* Stamens */}
          {stamenAngles.map((angle, i) => (
            <Stamen key={i} angle={angle} radius={0.2} height={1.7} />
          ))}

          {/* Pistil */}
          <Pistil />

          {/* Warm natural lighting from bloom centre */}
          <pointLight color='#ffe0a0' intensity={2.2} distance={7} position={[0, 0.5, 0]} />
        </group>

        {/* Ambient fill from below (simulates ground bounce) */}
        <pointLight color='#b8d96e' intensity={0.6} distance={5} position={[0, -0.3, 0]} />

      </group>
    </group>
  );
}
