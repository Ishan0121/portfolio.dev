"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";

export default function GlobalLoading() {
  const [progress, setProgress] = useState(10);
  
  // A pseudo-progress just to show something is happening during server fetch
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p < 85 ? p + Math.random() * 15 : p));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingScreen 
      progress={progress}
      message="Fetching Data"
      detail="Loading page content..."
    />
  );
}
