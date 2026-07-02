"use client";

import LoadingScreen from '@/components/core/LoadingScreen';
import { useEffect, useState } from "react";

const LOADING_STEPS = [
  "Loading interface...",
  "Fetching page resources...",
  "Preparing components...",
  "Rendering experience...",
];

export default function GlobalLoading() {
  const [progress, setProgress] = useState(10);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const currentProg = 10;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(currentProg);

    const updateProgress = (target: number, stepIndex: number) => {
      setProgress(target);
      setCurrentStep(stepIndex);
    };

    const handleLoad = () => {
      updateProgress(100, LOADING_STEPS.length - 1);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      updateProgress(40, 1);
      
      // Simulate resource fetching until load event
      const loadingInterval = setInterval(() => {
        setProgress(p => Math.min(85, p + (Math.random() * 5)));
      }, 500);

      window.addEventListener("load", handleLoad);
      
      document.fonts?.ready.then(() => {
        updateProgress(60, 2);
      });

      return () => {
        clearInterval(loadingInterval);
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  return (
    <LoadingScreen
      progress={progress}
      message="System Initialization"
      steps={LOADING_STEPS}
      currentStep={currentStep}
    />
  );
}
