import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import dynamic from 'next/dynamic';
const DNAEngine = dynamic(() => import('./DNAEngine').then(mod => mod.DNAEngine), { ssr: false });
const NeuralNetwork = dynamic(() => import('./NeuralNetwork').then(mod => mod.NeuralNetwork), { ssr: false });
const DataCore = dynamic(() => import('./DataCore').then(mod => mod.DataCore), { ssr: false });
const CyberEye = dynamic(() => import('./CyberEye').then(mod => mod.CyberEye), { ssr: false });
const BionicHeart = dynamic(() => import('./BionicHeart').then(mod => mod.BionicHeart), { ssr: false });
const QuantumCore = dynamic(() => import('./QuantumCore').then(mod => mod.QuantumCore), { ssr: false });
const BioSpine = dynamic(() => import('./BioSpine').then(mod => mod.BioSpine), { ssr: false });
const NexusGate = dynamic(() => import('./NexusGate').then(mod => mod.NexusGate), { ssr: false });
const ChronosDial = dynamic(() => import('./ChronosDial').then(mod => mod.ChronosDial), { ssr: false });
const MechaLotus = dynamic(() => import('./MechaLotus').then(mod => mod.MechaLotus), { ssr: false });
const PlasmaThruster = dynamic(() => import('./PlasmaThruster').then(mod => mod.PlasmaThruster), { ssr: false });
const VoidCube = dynamic(() => import('./VoidCube').then(mod => mod.VoidCube), { ssr: false });
const HoverDrone = dynamic(() => import('./HoverDrone').then(mod => mod.HoverDrone), { ssr: false });
const EnergyCrystal = dynamic(() => import('./EnergyCrystal').then(mod => mod.EnergyCrystal), { ssr: false });
const CyberPlanet = dynamic(() => import('./CyberPlanet').then(mod => mod.CyberPlanet), { ssr: false });
const SonicRings = dynamic(() => import('./SonicRings').then(mod => mod.SonicRings), { ssr: false });
import { useInteractStore } from '../../store/useInteractStore';
import LoadingScreen from '@/components/core/LoadingScreen';

function CanvasLoader() {
  const { active, progress, item, loaded, total } = useProgress();
  const itemName = item ? item.split('/').pop() : 'assets';

  return (
    <Html center zIndexRange={[100, 100]} wrapperClass="w-full h-full flex items-center justify-center">
      <div className="w-[100vw] h-[100vh] sm:w-[95vw] sm:h-[calc(100vh-theme(spacing.24))] flex items-center justify-center">
        <LoadingScreen 
          progress={progress} 
          isComplete={!active} 
          message="Loading 3D Environment"
          detail={`Loading ${itemName} (${loaded}/${total})`}
          fullScreen={false}
        />
      </div>
    </Html>
  );
}

export function SceneWrapper({ route }) {
  const { isInteractMode, resetTrigger } = useInteractStore();
  const controlsRef = useRef();

  // Reset camera when the reset button is clicked
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetTrigger]);

  // Dynamically set the Orbit target to the exact center of the currently rendered model
  let target = [0, 0, 0];
  if (!route || route === '/') target = [0, 0, -8]; // DNAEngine
  else if (route === '/about') target = [0, 0, -8]; // NeuralNetwork
  else if (route === '/skills') target = [0, 1, -6]; // DataCore
  else if (route === '/projects') target = [0, 0, -6]; // CyberEye
  else if (route === '/contact') target = [0, 0, -6]; // BionicHeart
  else if (route === '/quantum') target = [0, 0, -6]; // QuantumCore
  else if (route === '/spine') target = [0, 0, -6]; // BioSpine
  else if (route === '/nexus') target = [0, 0, -6]; // NexusGate
  else if (route === '/dial') target = [0, 0, -6]; // ChronosDial
  else if (route === '/lotus') target = [0, -1, -6]; // MechaLotus
  else if (route === '/thruster') target = [0, 0, -6]; // PlasmaThruster
  else if (route === '/void') target = [0, 0, -6]; // VoidCube
  else if (route === '/drone') target = [0, 0, -6]; // HoverDrone
  else if (route === '/crystal') target = [0, 0, -6]; // EnergyCrystal
  else if (route === '/planet') target = [0, 0, -6]; // CyberPlanet
  else if (route === '/sonic') target = [0, 0, -6]; // SonicRings

  return (
    <div className="w-full h-full" data-lenis-prevent="true">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]} gl={{ antialias: false }}>
        <color attach="background" args={['#050505']} />
        
        {/* Custom lighting to replace the fetched HDR environment map */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, 10, -10]} intensity={1.5} color="#00f0ff" />
        <directionalLight position={[0, -10, 5]} intensity={1} color="#222222" />
        <pointLight position={[-5, 0, 5]} color="#00f0ff" intensity={2} />
        
        <Suspense fallback={<CanvasLoader />}>
          {/* Environment map ensures highly metallic materials have something to reflect, making their base colors visible */}
          <Environment preset="city" />
          
          {(!route || route === '/') && <DNAEngine />}
          {route === '/about' && <NeuralNetwork />}
          {route === '/skills' && <DataCore />}
          {route === '/projects' && <CyberEye />}
          {route === '/contact' && <BionicHeart />}
          {route === '/quantum' && <QuantumCore />}
          {route === '/spine' && <BioSpine />}
          {route === '/nexus' && <NexusGate />}
          {route === '/dial' && <ChronosDial />}
          {route === '/lotus' && <MechaLotus />}
          {route === '/thruster' && <PlasmaThruster />}
          {route === '/void' && <VoidCube />}
          {route === '/drone' && <HoverDrone />}
          {route === '/crystal' && <EnergyCrystal />}
          {route === '/planet' && <CyberPlanet />}
          {route === '/sonic' && <SonicRings />}
        </Suspense>

        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
            height={300} 
            intensity={1.5} 
          />
        </EffectComposer>

        <OrbitControls 
          ref={controlsRef}
          target={target}
          enableZoom={true} 
          enablePan={true}
          enableRotate={true}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
}
