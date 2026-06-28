import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import dynamic from 'next/dynamic';

const DNAEngine = dynamic(() => import('./DNAEngine').then(mod => mod.DNAEngine), { ssr: false });
const NeuralNetwork = dynamic(() => import('./NeuralNetwork').then(mod => mod.NeuralNetwork), { ssr: false });
const CyberArm = dynamic(() => import('./CyberArm').then(mod => mod.CyberArm), { ssr: false });
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

const NeuralCore = dynamic(() => import('./NeuralCore').then(mod => mod.NeuralCore), { ssr: false });
const MemoryChip = dynamic(() => import('./MemoryChip').then(mod => mod.MemoryChip), { ssr: false });
const AIOrb = dynamic(() => import('./AIOrb').then(mod => mod.AIOrb), { ssr: false });
const HologramProjector = dynamic(() => import('./HologramProjector').then(mod => mod.HologramProjector), { ssr: false });
const CyberBrain = dynamic(() => import('./CyberBrain').then(mod => mod.CyberBrain), { ssr: false });
const DataVault = dynamic(() => import('./DataVault').then(mod => mod.DataVault), { ssr: false });
const QuantumProcessor = dynamic(() => import('./QuantumProcessor').then(mod => mod.QuantumProcessor), { ssr: false });
const CyberMask = dynamic(() => import('./CyberMask').then(mod => mod.CyberMask), { ssr: false });
const LogicCube = dynamic(() => import('./LogicCube').then(mod => mod.LogicCube), { ssr: false });

const MechaArm = dynamic(() => import('./MechaArm').then(mod => mod.MechaArm), { ssr: false });
const AndroidHead = dynamic(() => import('./AndroidHead').then(mod => mod.AndroidHead), { ssr: false });
const RobotCore = dynamic(() => import('./RobotCore').then(mod => mod.RobotCore), { ssr: false });
const TitanGear = dynamic(() => import('./TitanGear').then(mod => mod.TitanGear), { ssr: false });

const NeonRose = dynamic(() => import('./NeonRose').then(mod => mod.NeonRose), { ssr: false });
const CyberOrchid = dynamic(() => import('./CyberOrchid').then(mod => mod.CyberOrchid), { ssr: false });
const QuantumLily = dynamic(() => import('./QuantumLily').then(mod => mod.QuantumLily), { ssr: false });

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

function GlobalClockController() {
  const { isInteractMode } = useInteractStore();
  const clock = useThree((s) => s.clock);

  useEffect(() => {
    if (isInteractMode) {
      clock.start();
    } else {
      clock.stop();
    }
  }, [isInteractMode, clock]);

  return null;
}

export function SceneWrapper({ route }) {
  const { isInteractMode, resetTrigger } = useInteractStore();
  const controlsRef = useRef();

  // Reset camera when the reset button is clicked or route changes
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetTrigger, route]);

  // Dynamically set the Orbit target to the exact center of the currently rendered model
    let target = [0, 0, 0];
  if (!route || route === '/dna-engine') target = [0, 0, -8];
  else if (route === '/neural-network') target = [0, 0, -8];
  else if (route === '/cyber-arm') target = [0, 1, -6];
  else if (route === '/cyber-eye') target = [0, 0, -6];
  else if (route === '/bionic-heart') target = [0, 0, -6];
  else if (route === '/quantum-core') target = [0, 0, -6];
  else if (route === '/cyber-spine') target = [0, 0, -6];
  else if (route === '/nexus-gate') target = [0, 0, -6];
  else if (route === '/chronos-dial') target = [0, 0, -6];
  else if (route === '/mecha-lotus') target = [0, -1, -6];
  else if (route === '/plasma-thruster') target = [0, 0, -6];
  else if (route === '/void-cube') target = [0, 0, -6];
  else if (route === '/hover-drone') target = [0, 0, -6];
  else if (route === '/energy-crystal') target = [0, 0, -6];
  else if (route === '/cyber-planet') target = [0, 0, -6];
  else if (route === '/sonic-rings') target = [0, 0, -6];
  else if (route === '/neural-core') target = [0, 0, -6];
  else if (route === '/memory-chip') target = [0, 0, -6];
  else if (route === '/ai-orb') target = [0, 0, -6];
  else if (route === '/hologram-projector') target = [0, 0, -6];
  else if (route === '/cyber-brain') target = [0, 0, -6];
  else if (route === '/data-vault') target = [0, 0, -6];
  else if (route === '/quantum-processor') target = [0, 0, -6];
  else if (route === '/cyber-mask') target = [0, 0, -6];
  else if (route === '/logic-cube') target = [0, 0, -6];
  else if (route === '/mecha-arm') target = [0, 0, -6];
  else if (route === '/android-head') target = [0, 0, -6];
  else if (route === '/robot-core') target = [0, 0, -6];
  else if (route === '/titan-gear') target = [0, 0, -6];
  else if (route === '/neon-rose') target = [0, 0, -6];
  else if (route === '/cyber-orchid') target = [0, 0, -6];
  else if (route === '/quantum-lily') target = [0, 0, -6];

  return (
    <div className="w-full h-full" {...(isInteractMode ? { "data-lenis-prevent": "true" } : {})}>
      <Canvas frameloop={isInteractMode ? 'always' : 'demand'} style={{ pointerEvents: isInteractMode ? 'auto' : 'none' }} camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]} gl={{ antialias: false }}>
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
          
          {/* Environment map ensures highly metallic materials have something to reflect, making their base colors visible */}
          <Environment preset="city" />
          
          {(!route || route === '/dna-engine') && <DNAEngine />}
          {route === '/neural-network' && <NeuralNetwork />}
          {route === '/cyber-arm' && <CyberArm />}
          {route === '/cyber-eye' && <CyberEye />}
          {route === '/bionic-heart' && <BionicHeart />}
          {route === '/quantum-core' && <QuantumCore />}
          {route === '/cyber-spine' && <BioSpine />}
          {route === '/nexus-gate' && <NexusGate />}
          {route === '/chronos-dial' && <ChronosDial />}
          {route === '/mecha-lotus' && <MechaLotus />}
          {route === '/plasma-thruster' && <PlasmaThruster />}
          {route === '/void-cube' && <VoidCube />}
          {route === '/hover-drone' && <HoverDrone />}
          {route === '/energy-crystal' && <EnergyCrystal />}
          {route === '/cyber-planet' && <CyberPlanet />}
          {route === '/sonic-rings' && <SonicRings />}
          {route === '/neural-core' && <NeuralCore />}
          {route === '/memory-chip' && <MemoryChip />}
          {route === '/ai-orb' && <AIOrb />}
          {route === '/hologram-projector' && <HologramProjector />}
          {route === '/cyber-brain' && <CyberBrain />}
          {route === '/data-vault' && <DataVault />}
          {route === '/quantum-processor' && <QuantumProcessor />}
          {route === '/cyber-mask' && <CyberMask />}
          {route === '/logic-cube' && <LogicCube />}
          {route === '/mecha-arm' && <MechaArm />}
          {route === '/android-head' && <AndroidHead />}
          {route === '/robot-core' && <RobotCore />}
          {route === '/titan-gear' && <TitanGear />}
          {route === '/neon-rose' && <NeonRose />}
          {route === '/cyber-orchid' && <CyberOrchid />}
          {route === '/quantum-lily' && <QuantumLily />}
        </Suspense>

        <GlobalClockController />

        {isInteractMode && (
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              height={300} 
              intensity={1.5} 
            />
          </EffectComposer>
        )}

        <OrbitControls 
          ref={controlsRef}
          target={target}
          enabled={isInteractMode}
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
