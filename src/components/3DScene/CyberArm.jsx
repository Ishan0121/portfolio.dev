/* eslint-disable react-hooks/purity */
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── MATERIAL LIBRARY ───────────────────────────────────────────────────────
const MAT = {
  // Structural metal
  darkFrame:   { color: '#0a0a0a', metalness: 0.98, roughness: 0.45 },
  charcoal:    { color: '#111418', metalness: 0.95, roughness: 0.40 },
  gunmetal:    { color: '#1c2128', metalness: 0.90, roughness: 0.38 },
  steel:       { color: '#2e3440', metalness: 0.88, roughness: 0.35 },
  // Bright metals
  silver:      { color: '#b0b8c4', metalness: 1.00, roughness: 0.10 },
  chrome:      { color: '#d8dfe8', metalness: 1.00, roughness: 0.04 },
  titanium:    { color: '#7a8899', metalness: 0.95, roughness: 0.20 },
  // Neon emissives
  neonCyan:    { color: '#00e8ff', emissive: '#00e8ff', emissiveIntensity: 12, metalness: 0, roughness: 1 },
  neonCyanMid: { color: '#00c8e8', emissive: '#00c8e8', emissiveIntensity:  6, metalness: 0, roughness: 1 },
  neonCyanSoft:{ color: '#00a0c0', emissive: '#00a0c0', emissiveIntensity:  3, metalness: 0, roughness: 1 },
  neonBlue:    { color: '#0050ff', emissive: '#0050ff', emissiveIntensity:  5, metalness: 0, roughness: 1 },
  // Cables
  rubber:      { color: '#050508', metalness: 0.05, roughness: 0.95 },
  rubberDark:  { color: '#08080d', metalness: 0.05, roughness: 0.98 },
};

// ─── HELPERS ────────────────────────────────────────────────────────────────
const M = (props) => <meshStandardMaterial {...props} />;

// ─── RIVETS / BOLTS ─────────────────────────────────────────────────────────
// Small cylindrical bolt heads along a segment
const RivetRow = ({ count = 3, width, height, side = 1 }) => (
  <group>
    {Array.from({ length: count }).map((_, i) => {
      const y = (height / (count + 1)) * (i + 1);
      return (
        <mesh key={i} position={[side * width * 0.82, y, 0]}>
          <cylinderGeometry args={[width * 0.065, width * 0.065, width * 0.07, 8]} />
          <M {...MAT.chrome} />
        </mesh>
      );
    })}
  </group>
);

// ─── CROSS-HATCH VENT GRILLE ─────────────────────────────────────────────────
const VentSlats = ({ width, startY, count = 3, spacing = 0.07 }) => (
  <group>
    {Array.from({ length: count }).map((_, i) => (
      <mesh key={i} position={[0, startY + i * spacing, -width * 0.68]}>
        <boxGeometry args={[width * 1.1, width * 0.025, width * 0.04]} />
        <M {...MAT.steel} />
      </mesh>
    ))}
  </group>
);

// ─── PHALANX SEGMENT ─────────────────────────────────────────────────────────
// A single finger bone segment with full layered armor detail
const Segment = ({ length: L, width: W, isTip = false }) => {
  const panelH = L * 0.80;
  const panelY = L / 2;

  return (
    <group>
      {/* ── Central piston rod (structural core) ── */}
      <mesh position={[0, L / 2, 0]}>
        <cylinderGeometry args={[W * 0.28, W * 0.28, L * 0.96, 10]} />
        <M {...MAT.charcoal} />
      </mesh>

      {/* ── Side rail beams (left / right I-beams) ── */}
      {[-1, 1].map((s) => (
        <group key={s}>
          {/* Outer face */}
          <mesh position={[s * W * 0.72, L / 2, 0]}>
            <boxGeometry args={[W * 0.18, panelH, W * 0.72]} />
            <M {...MAT.gunmetal} />
          </mesh>
          {/* Inner face strip */}
          <mesh position={[s * W * 0.62, L / 2, 0]}>
            <boxGeometry args={[W * 0.06, panelH * 0.9, W * 0.55]} />
            <M {...MAT.steel} />
          </mesh>
          {/* Chrome edge highlight */}
          <mesh position={[s * W * 0.81, L / 2, 0]}>
            <boxGeometry args={[W * 0.04, panelH * 0.85, W * 0.08]} />
            <M {...MAT.chrome} />
          </mesh>
        </group>
      ))}

      {/* ── Back-of-finger armor shell (−Z, dorsal side) ── */}
      {/* Main backing plate */}
      <mesh position={[0, panelY, -W * 0.50]}>
        <boxGeometry args={[W * 1.35, panelH, W * 0.28]} />
        <M {...MAT.darkFrame} />
      </mesh>
      {/* Raised center rib on back plate */}
      <mesh position={[0, panelY, -W * 0.66]}>
        <boxGeometry args={[W * 0.55, panelH * 0.90, W * 0.06]} />
        <M {...MAT.titanium} />
      </mesh>
      {/* Slim chrome accent strips on back */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[x * W, panelY, -W * 0.66]}>
          <boxGeometry args={[W * 0.08, panelH * 0.75, W * 0.04]} />
          <M {...MAT.chrome} />
        </mesh>
      ))}

      {/* ── Vent slats on back plate ── */}
      <VentSlats width={W} startY={L * 0.22} count={3} spacing={L * 0.14} />

      {/* ── PALM-SIDE NEON WINDOW (the signature cyan capsule, +Z) ── */}
      {/* Dark recessed channel / housing */}
      <mesh position={[0, panelY, W * 0.44]}>
        <boxGeometry args={[W * 1.05, panelH * 0.72, W * 0.20]} />
        <M {...MAT.darkFrame} />
      </mesh>
      {/* Glowing inner panel */}
      <mesh position={[0, panelY, W * 0.52]}>
        <boxGeometry args={[W * 0.80, panelH * 0.58, W * 0.06]} />
        <M {...MAT.neonCyan} />
      </mesh>
      {/* Outer bezel frame */}
      <mesh position={[0, panelY, W * 0.56]}>
        <boxGeometry args={[W * 0.92, panelH * 0.66, W * 0.04]} />
        <M {...MAT.steel} />
      </mesh>
      {/* Neon window point-light */}
      <pointLight
        color="#00e8ff"
        intensity={0.55}
        distance={2.2}
        position={[0, panelY, W * 1.0]}
      />

      {/* ── Thin side neon accent strips (left/right edges) ── */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * W * 0.88, panelY, W * 0.12]}>
          <boxGeometry args={[W * 0.05, panelH * 0.55, W * 0.10]} />
          <M {...MAT.neonCyanSoft} />
        </mesh>
      ))}

      {/* ── Cross-strut rings (segment top and bottom) ── */}
      {[L * 0.07, L * 0.93].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[W * 1.55, W * 0.10, W * 0.88]} />
          <M {...MAT.steel} />
        </mesh>
      ))}

      {/* ── Rivets on side rails ── */}
      <RivetRow count={2} width={W} height={panelH} side={-1} />
      <RivetRow count={2} width={W} height={panelH} side={1} />

      {/* ── FINGERTIP CAP ── */}
      {isTip && (
        <group position={[0, L, 0]}>
          {/* Rounded sensor dome */}
          <mesh>
            <sphereGeometry args={[W * 0.70, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <M {...MAT.silver} />
          </mesh>
          {/* Ridged tip collar */}
          <mesh position={[0, -W * 0.05, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[W * 0.72, W * 0.72, W * 0.14, 20]} />
            <M {...MAT.chrome} />
          </mesh>
          {/* Sensor node dot (glowing) */}
          <mesh position={[0, W * 0.35, W * 0.38]}>
            <sphereGeometry args={[W * 0.18, 14, 14]} />
            <M {...MAT.neonCyan} />
          </mesh>
          {/* Tiny tip point-light */}
          <pointLight color="#00e8ff" intensity={0.25} distance={1.0} position={[0, W * 0.4, W * 0.5]} />
        </group>
      )}
    </group>
  );
};

// ─── DYNAMIC HYDRAULIC PISTON ──────────────────────────────────────────────────
const PistonHinge = ({ width, phaseOffset, curlMax, factor = 1.0 }) => {
  const rodRef = useRef();
  const housingRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 1.1 + phaseOffset;
    let curl = Math.sin(t);
    curl = Math.max(0, curl);
    curl = Math.pow(curl, 2.0);
    const a = curl * curlMax * factor;
    
    if (rodRef.current) {
      rodRef.current.position.y = a * width * 0.45;
      rodRef.current.rotation.x = a * 0.5; 
    }
    if (housingRef.current) {
      housingRef.current.rotation.x = a * 0.5;
    }
  });

  return (
    <group position={[0, 0, -width * 0.65]}>
      <group ref={housingRef}>
        <mesh position={[0, -width * 0.3, 0]}>
          <cylinderGeometry args={[width * 0.15, width * 0.15, width * 0.7, 12]} />
          <M {...MAT.gunmetal} />
        </mesh>
        <mesh position={[0, -width * 0.65, 0]}>
          <boxGeometry args={[width * 0.4, width * 0.2, width * 0.3]} />
          <M {...MAT.steel} />
        </mesh>
      </group>
      <group ref={rodRef}>
        <mesh position={[0, width * 0.2, 0]}>
          <cylinderGeometry args={[width * 0.08, width * 0.08, width * 0.8, 12]} />
          <M {...MAT.chrome} />
        </mesh>
        {/* Rod connector ring */}
        <mesh position={[0, width * 0.6, 0]} rotation={[0, Math.PI/2, 0]}>
          <torusGeometry args={[width*0.12, width*0.04, 8, 16]} />
          <M {...MAT.titanium} />
        </mesh>
      </group>
    </group>
  );
};

// ─── DYNAMIC KNUCKLE CABLE ───────────────────────────────────────────────────
const KnuckleCable = ({ width, phaseOffset, curlMax, factor = 1.0, side = 1 }) => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 1.1 + phaseOffset;
    let curl = Math.sin(t);
    curl = Math.max(0, curl);
    curl = Math.pow(curl, 2.0);
    const a = curl * curlMax * factor;
    
    if (meshRef.current) {
      const p0 = new THREE.Vector3(side * width * 0.4, -width * 0.7, -width * 0.5);
      const p1 = new THREE.Vector3(side * width * 0.5, 0, -width * (0.6 + a * 0.6));
      
      const endY = Math.cos(a) * width * 0.7;
      const endZ = -Math.sin(a) * width * 0.7 - width * 0.5;
      const p2 = new THREE.Vector3(side * width * 0.4, endY, endZ);
      
      const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2);
      meshRef.current.geometry.dispose();
      meshRef.current.geometry = new THREE.TubeGeometry(curve, 12, width * 0.04, 8, false);
    }
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[new THREE.QuadraticBezierCurve3(new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,2,0)), 12, width*0.04, 8, false]} />
      <M {...MAT.rubberDark} />
    </mesh>
  );
};

// ─── KNUCKLE JOINT ────────────────────────────────────────────────────────────
const Knuckle = ({ width: W }) => (
  <group>
    {/* Main hinge drum - slimmed down */}
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[W * 0.85, W * 0.85, W * 1.80, 28]} />
      <M {...MAT.darkFrame} />
    </mesh>

    {/* Ridges on drum surface */}
    {[-0.3, 0, 0.3].map((offset, i) => (
      <mesh key={i} rotation={[0, 0, Math.PI / 2]} position={[offset * W * 0.7, 0, 0]}>
        <torusGeometry args={[W * 0.87, W * 0.05, 12, 28]} />
        <M {...MAT.steel} />
      </mesh>
    ))}

    {/* Heavy titanium clevis brackets holding the drum */}
    {[-1, 1].map((s) => (
      <group key={s}>
        {/* Bracket outer plate */}
        <mesh position={[s * W * 1.05, -W * 0.1, 0]}>
          <boxGeometry args={[W * 0.2, W * 1.2, W * 1.2]} />
          <M {...MAT.titanium} />
        </mesh>
        {/* Chrome hinge pin shafts */}
        <mesh position={[s * W * 1.20, 0, 0]}>
          <cylinderGeometry args={[W * 0.30, W * 0.30, W * 0.25, 16]} />
          <M {...MAT.chrome} />
        </mesh>
        {/* Hex bolt face */}
        <mesh position={[s * W * 1.35, 0, 0]}>
          <cylinderGeometry args={[W * 0.18, W * 0.18, W * 0.06, 6]} />
          <M {...MAT.darkFrame} />
        </mesh>
      </group>
    ))}

    {/* Inner neon ring pulse */}
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <torusGeometry args={[W * 0.60, W * 0.04, 12, 28]} />
      <M {...MAT.neonCyanSoft} />
    </mesh>
  </group>
);

// ─── ARTICULATED FINGER ───────────────────────────────────────────────────────
const Finger = ({
  basePosition,
  baseRotation,
  lengths,
  widths,
  phaseOffset,
  curlMax = Math.PI / 2.4,
}) => {
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 1.1 + phaseOffset;
    let curl = Math.sin(t);
    curl = Math.max(0, curl);
    curl = Math.pow(curl, 2.0); // sharper ease in
    const a = curl * curlMax;
    if (j1.current) j1.current.rotation.x = a * 0.65;
    if (j2.current) j2.current.rotation.x = a;
    if (j3.current) j3.current.rotation.x = a * 0.80;
  });

  const hasDistal = lengths.length >= 3 && lengths[2] > 0;

  return (
    <group position={basePosition} rotation={baseRotation}>
      <Knuckle width={widths[0]} />
      <PistonHinge width={widths[0]} phaseOffset={phaseOffset} curlMax={curlMax} factor={0.65} />
      <KnuckleCable width={widths[0]} phaseOffset={phaseOffset} curlMax={curlMax} factor={0.65} side={1} />
      <KnuckleCable width={widths[0]} phaseOffset={phaseOffset} curlMax={curlMax} factor={0.65} side={-1} />

      <group ref={j1}>
        <Segment length={lengths[0]} width={widths[0]} />

        <group position={[0, lengths[0], 0]}>
          <Knuckle width={widths[1]} />
          <PistonHinge width={widths[1]} phaseOffset={phaseOffset} curlMax={curlMax} factor={1.0} />
          <KnuckleCable width={widths[1]} phaseOffset={phaseOffset} curlMax={curlMax} factor={1.0} side={1} />
          <KnuckleCable width={widths[1]} phaseOffset={phaseOffset} curlMax={curlMax} factor={1.0} side={-1} />

          <group ref={j2}>
            <Segment length={lengths[1]} width={widths[1]} isTip={!hasDistal} />

            {hasDistal && (
              <group position={[0, lengths[1], 0]}>
                <Knuckle width={widths[2]} />
                <PistonHinge width={widths[2]} phaseOffset={phaseOffset} curlMax={curlMax} factor={0.80} />
                <KnuckleCable width={widths[2]} phaseOffset={phaseOffset} curlMax={curlMax} factor={0.80} side={1} />
                <KnuckleCable width={widths[2]} phaseOffset={phaseOffset} curlMax={curlMax} factor={0.80} side={-1} />

                <group ref={j3}>
                  <Segment length={lengths[2]} width={widths[2]} isTip />
                </group>
              </group>
            )}
          </group>
        </group>
      </group>
    </group>
  );
};

// ─── WRIST JOINT ─────────────────────────────────────────────────────────────
const WristJoint = () => (
  <group>
    {/* Main wrist drum */}
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.68, 0.68, 2.00, 32]} />
      <M {...MAT.darkFrame} />
    </mesh>
    {/* Multi-layer rings */}
    {[0.74, 0.82].map((r, i) => (
      <mesh key={i} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[r, 0.045, 16, 32]} />
        <M {...(i === 0 ? MAT.neonCyan : MAT.chrome)} />
      </mesh>
    ))}
    {/* Side anchor spheres */}
    {[-1, 1].map((s) => (
      <mesh key={s} position={[s * 1.02, 0, 0]}>
        <sphereGeometry args={[0.22, 18, 18]} />
        <M {...MAT.chrome} />
      </mesh>
    ))}
    {/* Front stability node */}
    <mesh position={[0, 0, 0.70]}>
      <sphereGeometry args={[0.20, 16, 16]} />
      <M {...MAT.neonCyan} />
    </mesh>
    <pointLight color="#00e8ff" intensity={2.5} distance={3.5} position={[0, 0, 0.9]} />
  </group>
);

// ─── MAIN EXPORT: BIONIC HAND ─────────────────────────────────────────────────
export function CyberArm() {
  const groupRef  = useRef();
  const coreRef   = useRef();
  const coreLight = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.15) * 0.14;
      groupRef.current.rotation.y = Math.sin(t * 0.38) * 0.32;
      groupRef.current.rotation.z = Math.sin(t * 0.22) * 0.04;
    }
    if (coreRef.current) {
      coreRef.current.emissiveIntensity = 10 + Math.sin(t * 3.2) * 5;
    }
    if (coreLight.current) {
      coreLight.current.intensity = 8 + Math.sin(t * 3.2) * 5;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const s = isMobile ? 0.52 : 0.72;

  // Random cables — memoised so they don't re-generate
  const cables = useMemo(() => {
    const c = [];
    for (let i = 0; i < 28; i++) {
      const x     = (Math.random() - 0.5) * 1.6;
      const z     = (Math.random() - 0.5) * 0.9;
      const len   = 1.8 + Math.random() * 3.5;
      const thick = 0.018 + Math.random() * 0.038;
      const mat   = Math.random() > 0.5 ? MAT.rubber : MAT.rubberDark;
      c.push(
        <mesh key={`cab-${i}`} position={[x, -4.6 - len / 2, z]}>
          <cylinderGeometry args={[thick, thick * 0.85, len, 8]} />
          <M {...mat} />
        </mesh>
      );
    }
    return c;
  }, []);

  const cableTips = useMemo(() => {
    const tips = [];
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 1.3;
      const z = (Math.random() - 0.5) * 0.7;
      const y = -5.8 - Math.random() * 2.2;
      tips.push(
        <mesh key={`tip-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[0.052, 10, 10]} />
          <M {...MAT.neonCyanSoft} />
        </mesh>
      );
    }
    return tips;
  }, []);

  return (
    <group position={[0, -1.4, -7]} scale={[s, s, s]}>
      <group ref={groupRef}>

        {/* ══════════════════════════════════════════
            FOREARM
        ══════════════════════════════════════════ */}
        <group position={[0, -1.5, 0]}>

          {/* Dual outer armor shells */}
          <mesh position={[0, -2.0, -0.38]}>
            <boxGeometry args={[1.30, 4.20, 0.16]} />
            <M {...MAT.silver} />
          </mesh>
          <mesh position={[0, -2.0, 0.38]}>
            <boxGeometry args={[0.90, 4.20, 0.12]} />
            <M {...MAT.gunmetal} />
          </mesh>

          {/* Left / right structural I-beams */}
          {[-0.42, 0.42].map((x, i) => (
            <mesh key={i} position={[x, -2.0, 0]}>
              <boxGeometry args={[0.18, 4.50, 0.30]} />
              <M {...MAT.gunmetal} />
            </mesh>
          ))}

          {/* Central hydraulic piston */}
          <mesh position={[0, -2.0, 0]}>
            <cylinderGeometry args={[0.175, 0.175, 4.55, 18]} />
            <M {...MAT.darkFrame} />
          </mesh>
          {/* Glowing data channel inside piston */}
          <mesh position={[0, -2.0, 0]}>
            <cylinderGeometry args={[0.058, 0.058, 4.60, 8]} />
            <M {...MAT.neonCyanSoft} />
          </mesh>

          {/* Cross-bracing struts */}
          {[-0.4, -1.2, -2.0, -2.8, -3.6].map((y) => (
            <group key={`brace-${y}`}>
              <mesh position={[0, y, 0]}>
                <boxGeometry args={[1.05, 0.10, 0.34]} />
                <M {...MAT.steel} />
              </mesh>
              {/* Rivet at each end */}
              {[-0.46, 0.46].map((rx, j) => (
                <mesh key={j} position={[rx, y, 0]}>
                  <sphereGeometry args={[0.04, 8, 8]} />
                  <M {...MAT.chrome} />
                </mesh>
              ))}
            </group>
          ))}

          {/* Side neon energy conduits */}
          {[-0.63, 0.63].map((x, i) => (
            <mesh key={i} position={[x, -2.0, 0]}>
              <cylinderGeometry args={[0.028, 0.028, 4.55, 8]} />
              <M {...MAT.neonCyan} />
            </mesh>
          ))}
          {/* Back conduit (blue, different wavelength) */}
          <mesh position={[0, -2.0, -0.48]}>
            <cylinderGeometry args={[0.022, 0.022, 4.55, 8]} />
            <M {...MAT.neonBlue} />
          </mesh>

          {/* Segmented vent panels on back */}
          {[-1.0, -2.4, -3.2].map((y, i) => (
            <mesh key={i} position={[0, y, -0.47]}>
              <boxGeometry args={[0.85, 0.38, 0.05]} />
              <M {...MAT.darkFrame} />
            </mesh>
          ))}
          {/* Vent slat details */}
          {[-1.0, -2.4, -3.2].map((y, i) =>
            [0, 1, 2].map((j) => (
              <mesh key={`vs-${i}-${j}`} position={[0, y + j * 0.10, -0.51]}>
                <boxGeometry args={[0.72, 0.022, 0.04]} />
                <M {...MAT.steel} />
              </mesh>
            ))
          )}

          {/* Wrist stability joint */}
          <group position={[0, 0, 0]}>
            <WristJoint />
          </group>

          {/* Trailing neural cables */}
          {cables}
          {cableTips}
        </group>

        {/* ══════════════════════════════════════════
            PALM CHASSIS
        ══════════════════════════════════════════ */}
        <group position={[0, 0.85, 0]}>

          {/* Main palm body */}
          <mesh>
            <boxGeometry args={[2.05, 2.25, 0.52]} />
            <M {...MAT.darkFrame} />
          </mesh>

          {/* Back-of-hand layered armor */}
          <mesh position={[0, 0, -0.34]}>
            <boxGeometry args={[1.90, 2.05, 0.13]} />
            <M {...MAT.silver} />
          </mesh>
          {/* Three segmented strips */}
          {[-0.58, 0, 0.58].map((x, i) => (
            <mesh key={i} position={[x, 0.05, -0.43]}>
              <boxGeometry args={[0.46, 1.82, 0.07]} />
              <M {...MAT.gunmetal} />
            </mesh>
          ))}
          {/* Chrome accent lines between strips */}
          {[-0.32, 0.32].map((x, i) => (
            <mesh key={i} position={[x, 0, -0.42]}>
              <boxGeometry args={[0.04, 1.90, 0.07]} />
              <M {...MAT.chrome} />
            </mesh>
          ))}

          {/* Palm side circuit-trace grooves */}
          {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
            <mesh key={`trace-${i}`}
              position={[
                Math.cos(angle + Math.PI / 4) * 0.55,
                0.15 + Math.sin(angle + Math.PI / 4) * 0.55,
                0.32,
              ]}
              rotation={[0, 0, angle + Math.PI / 4]}
            >
              <boxGeometry args={[0.022, 0.75, 0.022]} />
              <M {...MAT.neonCyanSoft} />
            </mesh>
          ))}

          {/* ── POWER CORE REACTOR ── */}
          <group position={[0, 0.12, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
            {/* Outer containment ring (heavy) */}
            <mesh>
              <torusGeometry args={[0.75, 0.12, 18, 52]} />
              <M {...MAT.darkFrame} />
            </mesh>
            {/* Mid chrome ring */}
            <mesh>
              <torusGeometry args={[0.58, 0.07, 16, 52]} />
              <M {...MAT.chrome} />
            </mesh>
            {/* Inner glowing ring */}
            <mesh>
              <torusGeometry args={[0.40, 0.05, 14, 52]} />
              <M {...MAT.neonCyanMid} />
            </mesh>
            {/* Core energy sphere */}
            <mesh>
              <sphereGeometry args={[0.28, 36, 36]} />
              <meshStandardMaterial
                ref={coreRef}
                color="#00e8ff"
                emissive="#00e8ff"
                emissiveIntensity={10}
              />
            </mesh>
            {/* Bright lens cap */}
            <mesh position={[0, -0.06, 0]}>
              <sphereGeometry args={[0.14, 20, 20]} />
              <M color="#ffffff" emissive="#c8ffff" emissiveIntensity={6} transparent opacity={0.80} />
            </mesh>
            {/* Four spoke connectors from core to outer ring */}
            {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((a, i) => (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.50, Math.sin(a) * 0.50, 0]}
                rotation={[0, 0, a + Math.PI / 2]}
              >
                <boxGeometry args={[0.04, 0.30, 0.04]} />
                <M {...MAT.neonCyanSoft} />
              </mesh>
            ))}
            {/* Pulsing core light */}
            <pointLight ref={coreLight} color="#00e8ff" intensity={8} distance={7} />
          </group>

          {/* Thenar eminence (thumb-base muscle block) */}
          <mesh position={[-0.88, -0.28, 0.12]} rotation={[0, 0, 0.18]}>
            <boxGeometry args={[0.62, 1.45, 0.52]} />
            <M {...MAT.gunmetal} />
          </mesh>
          <mesh position={[-0.88, -0.12, 0.38]}>
            <boxGeometry args={[0.42, 0.52, 0.09]} />
            <M {...MAT.neonCyanSoft} />
          </mesh>

          {/* Hypothenar (pinky-side block) */}
          <mesh position={[0.88, -0.28, 0.06]}>
            <boxGeometry args={[0.38, 1.25, 0.48]} />
            <M {...MAT.gunmetal} />
          </mesh>

          {/* Metacarpal knuckle ridge */}
          <mesh position={[0, 1.08, -0.16]}>
            <boxGeometry args={[2.12, 0.28, 0.62]} />
            <M {...MAT.darkFrame} />
          </mesh>
          {/* Chrome metacarpal bumps */}
          {[-0.76, -0.25, 0.25, 0.76].map((x, i) => (
            <mesh key={i} position={[x, 1.15, -0.20]}>
              <sphereGeometry args={[0.13, 18, 18]} />
              <M {...MAT.chrome} />
            </mesh>
          ))}
          {/* Neon line between knuckle bumps */}
          <mesh position={[0, 1.15, -0.14]}>
            <boxGeometry args={[1.80, 0.035, 0.035]} />
            <M {...MAT.neonCyanSoft} />
          </mesh>
        </group>

        {/* ══════════════════════════════════════════
            FINGERS
        ══════════════════════════════════════════ */}
        <group position={[0, 1.95, 0]}>
          {/* Index */}
          <Finger
            basePosition={[-0.76, 0.12, 0]}
            baseRotation={[0, 0, 0.065]}
            lengths={[1.05, 0.68, 0.46]}
            widths={[0.225, 0.195, 0.165]}
            phaseOffset={0.65}
          />
          {/* Middle */}
          <Finger
            basePosition={[-0.25, 0.22, 0]}
            baseRotation={[0, 0, 0.02]}
            lengths={[1.20, 0.78, 0.52]}
            widths={[0.235, 0.205, 0.172]}
            phaseOffset={0.40}
          />
          {/* Ring */}
          <Finger
            basePosition={[0.26, 0.16, 0]}
            baseRotation={[0, 0, -0.022]}
            lengths={[1.08, 0.72, 0.47]}
            widths={[0.225, 0.195, 0.165]}
            phaseOffset={0.22}
          />
          {/* Pinky */}
          <Finger
            basePosition={[0.74, -0.04, 0]}
            baseRotation={[0, 0, -0.085]}
            lengths={[0.78, 0.52, 0.36]}
            widths={[0.185, 0.162, 0.135]}
            phaseOffset={0}
          />
        </group>

        {/* ══════════════════════════════════════════
            THUMB
        ══════════════════════════════════════════ */}
        <group position={[-1.18, 0.02, 0.18]} rotation={[0.32, -0.42, Math.PI / 3]}>
          <Finger
            basePosition={[0, 0, 0]}
            baseRotation={[0, 0, 0]}
            lengths={[0.88, 0.62]}
            widths={[0.255, 0.225]}
            phaseOffset={1.05}
            curlMax={Math.PI / 3.2}
          />
        </group>

        {/* ══════════════════════════════════════════
            SCENE LIGHTING
        ══════════════════════════════════════════ */}
        {/* Strong cyan fill from front (makes neon panels pop) */}
        <pointLight color="#00e8ff" intensity={7}  distance={12} position={[0,  1,  5]} />
        {/* Cool white key from upper-left */}
        <pointLight color="#ddeeff" intensity={4}  distance={22} position={[-6, 9,  6]} />
        {/* Deep blue rim from behind (edges the chrome) */}
        <pointLight color="#0033cc" intensity={5}  distance={18} position={[5, -3, -7]} />
        {/* Warm teal underlight for cables */}
        <pointLight color="#003344" intensity={2}  distance={9}  position={[0, -7,  2]} />
        {/* Right-side accent */}
        <pointLight color="#00aacc" intensity={2}  distance={10} position={[5,  2,  3]} />
      </group>
    </group>
  );
}