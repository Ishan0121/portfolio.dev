import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { DNAEngine } from './DNAEngine';
import { NeuralNetwork } from './NeuralNetwork';
import { DataCore } from './DataCore';
import { CyberEye } from './CyberEye';
import { BionicHeart } from './BionicHeart';
import { useInteract } from '../../context/InteractContext';
import LoadingScreen from '../LoadingScreen';

function CanvasLoader() {
  return null; // Empty fallback, actual loading screen is outside Canvas
}

function LoadingOverlay() {
  const { active, progress, item, loaded, total } = useProgress();
  
  // Format the item name so it's not a huge path
  const itemName = item ? item.split('/').pop() : 'assets';
  
  return (
    <LoadingScreen 
      progress={progress} 
      isComplete={!active} 
      message="Loading 3D Environment"
      detail={`Loading ${itemName} (${loaded}/${total})`}
    />
  );
}

export function SceneWrapper({ route }) {
  const { isInteractMode, resetTrigger } = useInteract();
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

  return (
    <>
      <LoadingOverlay />
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]} gl={{ antialias: false }}>
        <color attach="background" args={['#050505']} />
        
        {/* Custom lighting to replace the fetched HDR environment map */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, 10, -10]} intensity={1.5} color="#00f0ff" />
        <directionalLight position={[0, -10, 5]} intensity={1} color="#222222" />
        <pointLight position={[-5, 0, 5]} color="#00f0ff" intensity={2} />
        
        {/* Environment map ensures highly metallic materials have something to reflect, making their base colors visible */}
        <Environment preset="city" />
        
        
        <Suspense fallback={<CanvasLoader />}>
          {(!route || route === '/') && <DNAEngine />}
          {route === '/about' && <NeuralNetwork />}
          {route === '/skills' && <DataCore />}
          {route === '/projects' && <CyberEye />}
          {route === '/contact' && <BionicHeart />}
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
          enableZoom={isInteractMode} 
          enablePan={isInteractMode}
          enableRotate={isInteractMode}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </>
  );
}
