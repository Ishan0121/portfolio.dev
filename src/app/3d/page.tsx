"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const SceneWrapper = dynamic(
  () => import("@/components/3DScene/Scene").then((mod) => mod.SceneWrapper),
  { 
    ssr: false, 
    loading: () => (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] text-primary">
        <Icon icon="lucide:loader-2" className="w-12 h-12 animate-spin mb-4" />
        <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground">Initializing WebGL Engine...</p>
      </div>
    ) 
  }
);

const models = [
  { id: "/", name: "DNA Engine", icon: <Icon icon="lucide:dna" width={18} height={18} /> },
  { id: "/about", name: "Neural Network", icon: <Icon icon="lucide:network" width={18} height={18} /> },
  { id: "/skills", name: "Data Core", icon: <Icon icon="lucide:database" width={18} height={18} /> },
  { id: "/projects", name: "Cyber Eye", icon: <Icon icon="lucide:eye" width={18} height={18} /> },
  { id: "/contact", name: "Bionic Heart", icon: <Icon icon="lucide:heart" width={18} height={18} /> },
];

export default function ThreeDLabPage() {
  const [activeModel, setActiveModel] = useState("/");
  const [isInteracting, setIsInteracting] = useState(false);

  return (
      <div className="relative w-full h-[calc(100vh-theme(spacing.24))] overflow-hidden bg-[#050505] rounded-3xl border border-border/50 mx-auto max-w-[95%]">
        <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${!isInteracting ? 'pointer-events-none opacity-60 blur-[1px]' : 'opacity-100 blur-0'}`}>
          <SceneWrapper route={activeModel} />
        </div>
        
        <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start pointer-events-none">
          <div className="bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border/50 pointer-events-auto">
            <h1 className="text-xl font-bold font-heading text-foreground mb-1">3D Lab</h1>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Experimental Models</p>
          </div>
          
          <div className="flex flex-col gap-2 pointer-events-auto">
            {models.map(model => (
              <Button
                key={model.id}
                onClick={() => setActiveModel(model.id)}
                variant={activeModel === model.id ? "default" : "outline"}
                className={`rounded-xl gap-3 h-10 ${activeModel === model.id ? 'shadow-[0_0_15px_rgba(var(--color-primary),0.3)]' : 'bg-background/60 backdrop-blur-md border-border/50'}`}
              >
                {model.icon}
                <span className="hidden sm:inline">{model.name}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <AnimatePresence>
          {!isInteracting ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-[5] flex items-center justify-center"
            >
              <Button 
                onClick={() => setIsInteracting(true)}
                size="lg"
                className="rounded-full shadow-[0_0_30px_rgba(var(--color-primary),0.3)] gap-3 font-mono tracking-widest uppercase px-8 h-14"
              >
                <Icon icon="lucide:mouse-pointer-click" className="w-5 h-5" />
                Click to Interact
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 bg-background/80 backdrop-blur-md px-2 py-2 rounded-full border border-border/50 pointer-events-auto"
            >
              <p className="text-xs font-mono tracking-widest uppercase opacity-70 px-4">
                Drag to rotate • Scroll to zoom
              </p>
              <Button 
                variant="destructive" 
                size="sm" 
                className="rounded-full px-4 h-8 text-xs font-mono uppercase tracking-wider"
                onClick={() => setIsInteracting(false)}
              >
                Exit
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
