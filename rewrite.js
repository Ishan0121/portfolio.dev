const fs = require('fs');

const fileContent = `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
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
  { id: "/dna-engine", name: "DNA Engine", icon: <Icon icon="lucide:dna" width={18} height={18} /> },
  { id: "/mecha-lotus", name: "Mecha Lotus", icon: <Icon icon="lucide:flower-2" width={18} height={18} /> },
  { id: "/quantum-lily", name: "Quantum Lily", icon: <Icon icon="lucide:droplet" width={18} height={18} /> },
  { id: "/neural-core", name: "Neural Core", icon: <Icon icon="lucide:cpu" width={18} height={18} /> },
  { id: "/memory-chip", name: "Memory Chip", icon: <Icon icon="lucide:hard-drive" width={18} height={18} /> },
  { id: "/ai-orb", name: "AI Orb", icon: <Icon icon="lucide:orbit" width={18} height={18} /> },
  { id: "/hologram-projector", name: "Hologram Projector", icon: <Icon icon="lucide:projector" width={18} height={18} /> },
  { id: "/data-vault", name: "Data Vault", icon: <Icon icon="lucide:lock" width={18} height={18} /> },
  { id: "/quantum-processor", name: "Quantum Processor", icon: <Icon icon="lucide:cpu" width={18} height={18} /> },
  { id: "/cyber-mask", name: "Cyber Mask", icon: <Icon icon="lucide:user" width={18} height={18} /> },
  { id: "/logic-cube", name: "Logic Cube", icon: <Icon icon="lucide:box" width={18} height={18} /> },
  { id: "/cyber-eye", name: "Cyber Eye", icon: <Icon icon="lucide:eye" width={18} height={18} /> },
  { id: "/cyber-arm", name: "Data Core", icon: <Icon icon="lucide:database" width={18} height={18} /> },
  { id: "/neural-network", name: "Neural Network", icon: <Icon icon="lucide:network" width={18} height={18} /> },
  { id: "/hover-drone", name: "Hover Drone", icon: <Icon icon="lucide:bot" width={18} height={18} /> },
  { id: "/bionic-heart", name: "Bionic Heart", icon: <Icon icon="lucide:heart" width={18} height={18} /> },
  { id: "/cyber-spine", name: "Cyber Spine", icon: <Icon icon="lucide:activity" width={18} height={18} /> },
  { id: "/mecha-arm", name: "Mecha Arm", icon: <Icon icon="lucide:hammer" width={18} height={18} /> },
  { id: "/android-head", name: "Android Head", icon: <Icon icon="lucide:smile" width={18} height={18} /> },
  { id: "/robot-core", name: "Robot Core", icon: <Icon icon="lucide:circle-dot" width={18} height={18} /> },
  { id: "/titan-gear", name: "Titan Gear", icon: <Icon icon="lucide:settings" width={18} height={18} /> },
  { id: "/cyber-planet", name: "Cyber Planet", icon: <Icon icon="lucide:globe" width={18} height={18} /> },
  { id: "/quantum-core", name: "Quantum Core", icon: <Icon icon="lucide:atom" width={18} height={18} /> },
  { id: "/nexus-gate", name: "Nexus Gate", icon: <Icon icon="lucide:aperture" width={18} height={18} /> },
  { id: "/plasma-thruster", name: "Plasma Thruster", icon: <Icon icon="lucide:rocket" width={18} height={18} /> },
  { id: "/energy-crystal", name: "Energy Crystal", icon: <Icon icon="lucide:gem" width={18} height={18} /> },
  { id: "/chronos-dial", name: "Chronos Dial", icon: <Icon icon="lucide:clock" width={18} height={18} /> },
  { id: "/void-cube", name: "Void Cube", icon: <Icon icon="lucide:box" width={18} height={18} /> },
  { id: "/sonic-rings", name: "Sonic Rings", icon: <Icon icon="lucide:disc-3" width={18} height={18} /> },
  { id: "/neon-rose", name: "Neon Rose", icon: <Icon icon="lucide:flower" width={18} height={18} /> },
  { id: "/cyber-orchid", name: "Cyber Orchid", icon: <Icon icon="lucide:flower-2" width={18} height={18} /> },
  { id: "/cyber-brain", name: "Cyber Brain", icon: <Icon icon="lucide:brain" width={18} height={18} /> }
];

export default function ThreeDLabClient() {
  const [activeModel, setActiveModel] = useState("/dna-engine");
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeModelData = models.find(m => m.id === activeModel) || models[0];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full h-[calc(100vh-theme(spacing.32))] overflow-hidden bg-[#050505] rounded-3xl border border-border/50 mx-auto max-w-[95%] mb-6"
      >
        <div className="absolute inset-0 cursor-move">
          <SceneWrapper route={activeModel} />
        </div>
        
        {/* Top Header */}
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-10 flex flex-row gap-3 justify-between items-start pointer-events-none">
          <div className="bg-background/80 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-border/50 pointer-events-auto flex flex-col justify-center shrink-0">
            <h1 className="text-sm sm:text-xl font-bold font-heading text-foreground m-0">3D Lab</h1>
            <p className="text-[8px] sm:text-xs text-muted-foreground font-mono uppercase tracking-widest hidden sm:block mt-1">Experimental Models</p>
          </div>
          
          {/* Custom Dropdown Selector */}
          <div className="relative pointer-events-auto w-full max-w-[200px] sm:max-w-none sm:w-auto">
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              variant="outline"
              className="w-full sm:w-auto rounded-xl gap-2 sm:gap-3 h-9 sm:h-12 px-3 sm:px-4 bg-background/80 backdrop-blur-md border-border/50 justify-between shadow-[0_0_15px_rgba(var(--color-primary),0.15)]"
            >
              <div className="flex items-center gap-2 truncate">
                <div className="shrink-0 text-primary">{activeModelData.icon}</div>
                <span className="inline font-medium text-xs sm:text-base truncate">{activeModelData.name}</span>
              </div>
              <Icon icon="lucide:chevron-down" className={\`shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground transition-transform duration-300 \${isDropdownOpen ? 'rotate-180' : ''}\`} />
            </Button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[calc(100%+0.5rem)] right-0 w-[240px] sm:w-[280px] bg-background/90 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col max-h-[55vh] overflow-y-auto custom-scrollbar"
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  <div className="p-1 flex flex-col gap-1">
                    {models.map(model => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setActiveModel(model.id);
                          setIsDropdownOpen(false);
                        }}
                        className={\`flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm transition-all duration-300 \${
                          activeModel === model.id 
                            ? 'bg-primary/15 text-primary font-bold border border-primary/30' 
                            : 'text-foreground/80 hover:bg-primary/10 border border-transparent hover:border-primary/20'
                        }\`}
                      >
                        <div className={\`shrink-0 p-1.5 sm:p-2 rounded-md \${activeModel === model.id ? 'bg-primary/20 text-primary' : 'bg-background/50'}\`}>
                          {model.icon}
                        </div>
                        <span className="text-left truncate">{model.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <AnimatePresence>
          {!isInteracting ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none"
            >
              <Button 
                onClick={() => setIsInteracting(true)}
                size="lg"
                className="rounded-full shadow-[0_0_30px_rgba(var(--color-primary),0.3)] gap-2 sm:gap-3 font-mono tracking-widest uppercase px-6 sm:px-8 h-12 sm:h-14 text-[10px] sm:text-sm pointer-events-auto"
              >
                <Icon icon="lucide:mouse-pointer-click" className="w-4 h-4 sm:w-5 sm:h-5" />
                Click to Interact
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-row items-center justify-between gap-3 sm:gap-4 bg-background/80 backdrop-blur-md p-1.5 sm:p-2 pl-4 sm:pl-6 rounded-full border border-border/50 pointer-events-auto shadow-xl w-max max-w-[90vw]"
            >
              <p className="text-[9px] sm:text-xs font-mono tracking-widest uppercase opacity-80 text-center leading-tight truncate">
                <span className="hidden sm:inline">Drag to rotate • Scroll to zoom</span>
                <span className="sm:hidden">1-finger rotate • 2-finger zoom</span>
              </p>
              <Button 
                variant="destructive" 
                size="sm" 
                className="rounded-full px-4 h-8 text-[10px] sm:text-xs font-mono uppercase tracking-wider shrink-0"
                onClick={() => setIsInteracting(false)}
              >
                Exit
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
`;

fs.writeFileSync('src/app/3d/ThreeDLabClient.tsx', fileContent);
