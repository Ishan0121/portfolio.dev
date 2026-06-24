"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  progress?: number;
  message?: string;
  detail?: string;
  isComplete?: boolean;
}

export default function LoadingScreen({ 
  progress = 0, 
  message = "System Initialization", 
  detail = "Loading resources...",
  isComplete = false 
}: LoadingScreenProps) {
  
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => setShow(false), 500); // give it half a sec to show 100%
      return () => clearTimeout(timer);
    } else {
      setShow(true);
    }
  }, [isComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md text-foreground font-mono"
        >
          <div className="w-full max-w-md p-8 flex flex-col gap-8">
            <div className="text-xl font-bold tracking-widest uppercase">
              {message}
            </div>

            <div className="flex flex-col gap-4 text-sm tracking-wider">
              <div className="flex items-center gap-4">
                <div className="w-4 flex justify-center">
                  {isComplete ? (
                    <span className="text-primary font-bold">✓</span>
                  ) : (
                    <span className="animate-spin inline-block text-muted-foreground">⟳</span>
                  )}
                </div>
                <span className={isComplete ? "opacity-100" : "opacity-70 line-clamp-1"}>
                  {isComplete ? "Initialization Complete" : detail}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <div className="text-xs uppercase tracking-widest opacity-50">
                Progress: {Math.round(progress)}%
              </div>
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
