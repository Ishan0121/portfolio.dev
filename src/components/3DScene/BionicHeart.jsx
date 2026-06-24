import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Material presets for an aggressive, shiny mechanical/silver aesthetic
const silverMatProps = { color: "#e8e8e8", metalness: 1, roughness: 0.15 };
const darkSteelProps = { color: "#444444", metalness: 0.9, roughness: 0.5 };
const brushedAlloyProps = { color: "#aaaaaa", metalness: 0.8, roughness: 0.3 };

// A flexible ribbed pipe using TubeGeometry for the Aorta
function RibbedPipe({ curve, radius = 0.4, tubularSegments = 64 }) {
  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, tubularSegments, radius, 16, false), [curve, radius, tubularSegments]);
  
  return (
    <group>
      {/* Base smooth inner pipe */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial {...darkSteelProps} />
      </mesh>
      {/* Heavy hexagonal industrial clamps along the tube */}
      {Array.from({length: 24}).map((_, i) => {
        const t = (i + 1) / 25;
        const pos = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
        return (
          <mesh key={i} position={pos} quaternion={quaternion}>
            {/* Hexagonal ring */}
            <cylinderGeometry args={[radius * 1.2, radius * 1.2, 0.08, 6]} />
            <meshStandardMaterial {...silverMatProps} />
          </mesh>
        )
      })}
    </group>
  );
}

// Glowing coronary arteries that hug the surface
function CoronaryArtery({ start, end, control }) {
  const curve = useMemo(() => new THREE.QuadraticBezierCurve3(start, control, end), [start, end, control]);
  return (
    <mesh>
      <tubeGeometry args={[curve, 32, 0.06, 8, false]} />
      <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} />
    </mesh>
  );
}

export function BionicHeart() {
  const groupRef = useRef();
  const ventricleRef = useRef();
  const atriaRef = useRef();
  const lightRef = useRef();

  // Aorta curve (Arching over the top)
  const aortaCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.5, 0),
      new THREE.Vector3(0, 4.5, 0.5),
      new THREE.Vector3(-1.5, 5, -0.5),
      new THREE.Vector3(-2.5, 3.5, -1.5),
      new THREE.Vector3(-2.5, 1, -1.5),
    ]);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Heartbeat logic
    const phase = t % 1;
    let ventricleScale = 1;
    let atriaScale = 1;
    let pulseIntensity = 1;

    if (phase < 0.15) {
      // "Lub": Atria contract
      const lubPhase = phase / 0.15;
      atriaScale = 1 - Math.sin(lubPhase * Math.PI) * 0.15;
      ventricleScale = 1 + Math.sin(lubPhase * Math.PI) * 0.05;
    } else if (phase > 0.25 && phase < 0.5) {
      // "Dub": Ventricles contract violently
      const dubPhase = (phase - 0.25) / 0.25; 
      ventricleScale = 1 - Math.sin(dubPhase * Math.PI) * 0.2;
      pulseIntensity = 1 + Math.sin(dubPhase * Math.PI) * 8; 
    }

    if (ventricleRef.current) {
      ventricleRef.current.scale.lerp(new THREE.Vector3(ventricleScale, ventricleScale, ventricleScale), 0.3);
    }
    if (atriaRef.current) {
      atriaRef.current.scale.lerp(new THREE.Vector3(atriaScale, atriaScale, atriaScale), 0.3);
    }
    if (lightRef.current) {
      lightRef.current.intensity += (pulseIntensity - lightRef.current.intensity) * 0.3;
    }

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.1 - 0.5;
      groupRef.current.rotation.y = t * 0.2;
    }
  });

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const baseScale = isMobile ? 0.6 : 0.8;

  return (
    <group position={[0, -0.5, -6]} scale={[baseScale, baseScale, baseScale]}>
      <group ref={groupRef}>
        
        {/* === THE VENTRICLES (Heart Muscle Base) === */}
        {/* We use intersecting stretched spheres to create an organic heart shape while maintaining the shiny silver mechanical material */}
        <group ref={ventricleRef} position={[0, -0.5, 0]}>
          
          {/* Left Ventricle (The main long pumping muscle, points down and right) */}
          <mesh position={[0.5, -0.5, -0.2]} rotation={[0, 0, 0.4]} scale={[1.7, 2.8, 1.7]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial {...silverMatProps} />
          </mesh>
          
          {/* Right Ventricle (Slightly smaller, sits on the front/left) */}
          <mesh position={[-0.8, 0.2, 0.5]} rotation={[0, 0, -0.2]} scale={[1.5, 2.2, 1.4]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial {...silverMatProps} />
          </mesh>

          {/* Mechanical Septum Plating (Dark metal groove where the ventricles meet) */}
          <mesh position={[-0.1, 0, 1.4]} rotation={[0.2, 0, -0.2]} scale={[0.4, 2.5, 0.6]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial {...darkSteelProps} />
          </mesh>

          {/* Glowing Ventricle Core (Visible from the bottom tip) */}
          <mesh position={[0.8, -3.2, -0.2]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} />
          </mesh>

          {/* Coronary Arteries (Cyan power lines following the organic grooves) */}
          <CoronaryArtery start={new THREE.Vector3(-0.3, 1.8, 1.7)} end={new THREE.Vector3(0.5, -2.5, 0.8)} control={new THREE.Vector3(0, -0.5, 2.5)} />
          <CoronaryArtery start={new THREE.Vector3(1.5, 1.5, 1)} end={new THREE.Vector3(1.8, -1.5, 0)} control={new THREE.Vector3(2.5, 0, 1.5)} />
          <CoronaryArtery start={new THREE.Vector3(-1.8, 1.5, 0)} end={new THREE.Vector3(-1.5, -1.0, -0.5)} control={new THREE.Vector3(-2.5, 0, 0)} />
        </group>

        {/* === THE ATRIA (Upper Fluid Reservoirs) === */}
        <group ref={atriaRef} position={[0, 1.5, 0]}>
          {/* Right Atrium (Bulging on the left) */}
          <group position={[-1.2, 0.8, 0.2]}>
            <mesh scale={[1.2, 1.4, 1.2]}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial {...silverMatProps} />
            </mesh>
            {/* Wireframe cage for industrial look */}
            <mesh scale={[1.22, 1.42, 1.22]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial {...darkSteelProps} wireframe />
            </mesh>
            <mesh position={[0, 1.4, 0]}>
              <cylinderGeometry args={[0.4, 0.5, 0.5, 8]} />
              <meshStandardMaterial {...silverMatProps} />
            </mesh>
          </group>
          
          {/* Left Atrium (Bulging on the right/back) */}
          <group position={[1.2, 1.0, -0.5]}>
            <mesh scale={[1.0, 1.2, 1.0]}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial {...silverMatProps} />
            </mesh>
            <mesh scale={[1.02, 1.22, 1.02]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial {...darkSteelProps} wireframe />
            </mesh>
            <mesh position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.3, 0.4, 0.5, 8]} />
              <meshStandardMaterial {...silverMatProps} />
            </mesh>
          </group>
        </group>

        {/* === THE GREAT VESSELS (Major Piping) === */}
        {/* The Aorta (Massive Arching Main Exhaust with Hexagonal Nuts) */}
        <RibbedPipe curve={aortaCurve} radius={0.55} />
        
        {/* Superior Vena Cava (Top Left Intake Pipe) */}
        <group position={[-1.2, 3.5, 0.2]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 1.5, 8]} />
            <meshStandardMaterial {...darkSteelProps} />
          </mesh>
          {[0, 0.5, 1].map((y) => (
            <mesh key={`flange-${y}`} position={[0, y, 0]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.1, 8]} />
              <meshStandardMaterial {...silverMatProps} />
            </mesh>
          ))}
        </group>

        {/* Pulmonary Artery (Front Center Splitting Pipe) */}
        <group position={[0, 2.8, 1.0]} rotation={[0.4, 0, 0]}>
          <mesh position={[0, 0.8, 0]}>
             <cylinderGeometry args={[0.45, 0.45, 1.6, 8]} />
             <meshStandardMaterial {...darkSteelProps} />
          </mesh>
          <mesh position={[-0.8, 1.5, 0]} rotation={[0, 0, Math.PI/2]}>
             <cylinderGeometry args={[0.35, 0.35, 1.6, 8]} />
             <meshStandardMaterial {...darkSteelProps} />
          </mesh>
          <mesh position={[0.8, 1.5, 0]} rotation={[0, 0, Math.PI/2]}>
             <cylinderGeometry args={[0.35, 0.35, 1.6, 8]} />
             <meshStandardMaterial {...darkSteelProps} />
          </mesh>
          {/* Heavy Silver Joint Block */}
          <mesh position={[0, 1.5, 0]}>
             <boxGeometry args={[0.8, 0.8, 0.8]} />
             <meshStandardMaterial {...silverMatProps} />
          </mesh>
        </group>

        {/* Internal Core Energy Light */}
        <pointLight ref={lightRef} color="#00f0ff" intensity={1} distance={15} position={[0, 1, 0]} />

      </group>
    </group>
  );
}
