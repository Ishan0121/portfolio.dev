"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";

export default function GlobalLoading() {
  const [progress, setProgress] = useState(10);
  
  const [currentStep] = useState(0);

  const loadingSteps = [
    "Fetching page resources...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p < 90 ? Math.min(99, p + Math.random() * 15) : p));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingScreen 
      progress={progress}
      message="Fetching Data"
      steps={loadingSteps}
      currentStep={currentStep}
    />
  );
}
