"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { containerVariants } from "@/lib/animations";

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
  { id: "/quantum", name: "Quantum Core", icon: <Icon icon="lucide:atom" width={18} height={18} /> },
  { id: "/spine", name: "Cyber Spine", icon: <Icon icon="lucide:activity" width={18} height={18} /> },
  { id: "/nexus", name: "Nexus Gate", icon: <Icon icon="lucide:aperture" width={18} height={18} /> },
  { id: "/dial", name: "Chronos Dial", icon: <Icon icon="lucide:clock" width={18} height={18} /> },
  { id: "/lotus", name: "Mecha Lotus", icon: <Icon icon="lucide:flower-2" width={18} height={18} /> },
  { id: "/thruster", name: "Plasma Thruster", icon: <Icon icon="lucide:rocket" width={18} height={18} /> },
  { id: "/void", name: "Void Cube", icon: <Icon icon="lucide:box" width={18} height={18} /> },
  { id: "/drone", name: "Hover Drone", icon: <Icon icon="lucide:bot" width={18} height={18} /> },
  { id: "/crystal", name: "Energy Crystal", icon: <Icon icon="lucide:gem" width={18} height={18} /> },
  { id: "/planet", name: "Cyber Planet", icon: <Icon icon="lucide:globe" width={18} height={18} /> },
  { id: "/sonic", name: "Sonic Rings", icon: <Icon icon="lucide:disc-3" width={18} height={18} /> },
];

export default function ThreeDLabClient() {
  const [activeModel, setActiveModel] = useState("/");
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeModelData = models.find(m => m.id === activeModel) || models[0];

  return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full h-[calc(100vh-theme(spacing.24))] overflow-hidden bg-[#050505] rounded-3xl border border-border/50 mx-auto max-w-[95%]"
      >
        <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${!isInteracting ? 'pointer-events-none opacity-60 blur-[1px]' : 'opacity-100 blur-0'}`}>
          <SceneWrapper route={activeModel} />
        </div>
        
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-start pointer-events-none">
          <div className="bg-background/80 backdrop-blur-md px-4 py-3 sm:p-4 rounded-xl border border-border/50 pointer-events-auto flex items-center justify-between sm:block">
            <h1 className="text-lg sm:text-xl font-bold font-heading text-foreground mb-0 sm:mb-1">3D Lab</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono uppercase tracking-widest">Experimental<span className="hidden sm:inline"> Models</span></p>
          </div>
          
          {/* Custom Dropdown Selector */}
          <div className="relative pointer-events-auto w-full sm:w-auto">
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              variant="outline"
              className="w-full sm:w-auto rounded-xl gap-3 h-11 sm:h-12 bg-background/80 backdrop-blur-md border-border/50 min-w-full sm:min-w-[200px] justify-between shadow-[0_0_15px_rgba(var(--color-primary),0.15)]"
            >
              <div className="flex items-center gap-3">
                {activeModelData.icon}
                <span className="inline font-medium">{activeModelData.name}</span>
              </div>
              <Icon icon="lucide:chevron-down" className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[calc(100%+0.5rem)] left-0 right-0 sm:left-auto sm:right-0 w-full sm:w-[220px] bg-background/90 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col max-h-[50vh] sm:max-h-[60vh] overflow-y-auto custom-scrollbar"
                >
                  {models.map(model => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setActiveModel(model.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-primary/20 ${
                        activeModel === model.id ? 'bg-primary/15 text-primary font-bold border-l-2 border-primary' : 'text-foreground/80 border-l-2 border-transparent'
                      }`}
                    >
                      {model.icon}
                      {model.name}
                    </button>
                  ))}
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
              className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-10 flex flex-row items-center justify-between sm:justify-center gap-2 sm:gap-4 bg-background/80 backdrop-blur-md p-2 rounded-xl sm:rounded-full border border-border/50 pointer-events-auto"
            >
              <p className="text-[10px] sm:text-xs font-mono tracking-widest uppercase opacity-70 px-2 sm:px-4 text-left sm:text-center leading-tight">
                <span className="hidden sm:inline">Drag to rotate • Scroll to zoom</span>
                <span className="sm:hidden">1-finger rotate<br/>2-finger zoom</span>
              </p>
              <Button 
                variant="destructive" 
                size="sm" 
                className="rounded-lg sm:rounded-full px-4 h-9 sm:h-8 text-xs font-mono uppercase tracking-wider shrink-0"
                onClick={() => setIsInteracting(false)}
              >
                Exit
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  );
}
