"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useInteractStore } from "@/store/useInteractStore";
import { useSettingsStore } from "@/store/useSettingsStore";

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
  { id: "/neural-network", name: "Neural Network", icon: <Icon icon="lucide:network" width={18} height={18} /> },
  { id: "/quantum-lily", name: "Quantum Lily", icon: <Icon icon="lucide:droplet" width={18} height={18} /> },
  { id: "/chronos-dial", name: "Chronos Dial", icon: <Icon icon="lucide:clock" width={18} height={18} /> },
  { id: "/void-cube", name: "Void Cube", icon: <Icon icon="lucide:box" width={18} height={18} /> },
  { id: "/logic-cube", name: "Logic Cube", icon: <Icon icon="lucide:box" width={18} height={18} /> },
  { id: "/data-vault", name: "Data Vault", icon: <Icon icon="lucide:lock" width={18} height={18} /> },
  { id: "/robot-core", name: "Robot Core", icon: <Icon icon="lucide:circle-dot" width={18} height={18} /> },
  { id: "/quantum-core", name: "Quantum Core", icon: <Icon icon="lucide:atom" width={18} height={18} /> },
  { id: "/nexus-gate", name: "Nexus Gate", icon: <Icon icon="lucide:aperture" width={18} height={18} /> },
  { id: "/memory-chip", name: "Memory Chip", icon: <Icon icon="lucide:hard-drive" width={18} height={18} /> },
  { id: "/quantum-processor", name: "Quantum Processor", icon: <Icon icon="lucide:cpu" width={18} height={18} /> },
  { id: "/cyber-planet", name: "Cyber Planet", icon: <Icon icon="lucide:globe" width={18} height={18} /> },
  { id: "/cyber-orchid", name: "Cyber Orchid", icon: <Icon icon="lucide:flower-2" width={18} height={18} /> },
  { id: "/cyber-eye", name: "Cyber Eye", icon: <Icon icon="lucide:eye" width={18} height={18} /> },
  { id: "/cyber-arm", name: "Cyber Arm", icon: <Icon icon="lucide:hand" width={18} height={18} /> },
  { id: "/hover-drone", name: "Hover Drone", icon: <Icon icon="lucide:bot" width={18} height={18} /> },
  { id: "/ai-orb", name: "AI Orb", icon: <Icon icon="lucide:orbit" width={18} height={18} /> },
  { id: "/cyber-spine", name: "Cyber Spine", icon: <Icon icon="lucide:activity" width={18} height={18} /> },
  { id: "/neural-core", name: "Neural Core", icon: <Icon icon="lucide:cpu" width={18} height={18} /> },
  { id: "/plasma-thruster", name: "Plasma Thruster", icon: <Icon icon="lucide:rocket" width={18} height={18} /> },
  { id: "/hologram-projector", name: "Hologram Projector", icon: <Icon icon="lucide:projector" width={18} height={18} /> },
  { id: "/cyber-mask", name: "Cyber Mask", icon: <Icon icon="lucide:user" width={18} height={18} /> },
  { id: "/bionic-heart", name: "Bionic Heart", icon: <Icon icon="lucide:heart" width={18} height={18} /> },
  { id: "/mecha-arm", name: "Mecha Arm", icon: <Icon icon="lucide:hammer" width={18} height={18} /> },
  { id: "/android-head", name: "Android Head", icon: <Icon icon="lucide:smile" width={18} height={18} /> },
  { id: "/titan-gear", name: "Titan Gear", icon: <Icon icon="lucide:settings" width={18} height={18} /> },
  { id: "/energy-crystal", name: "Energy Crystal", icon: <Icon icon="lucide:gem" width={18} height={18} /> },
  { id: "/sonic-rings", name: "Sonic Rings", icon: <Icon icon="lucide:disc-3" width={18} height={18} /> },
  // { id: "/neon-rose", name: "Neon Rose", icon: <Icon icon="lucide:flower" width={18} height={18} /> },
  { id: "/cyber-brain", name: "Cyber Brain", icon: <Icon icon="lucide:brain" width={18} height={18} /> }
];

export default function ThreeDLabClient() {
  const [activeModel, setActiveModel] = useState("/dna-engine");
  const { isInteractMode: isInteracting, setIsInteractMode: setIsInteracting } = useInteractStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const { brightness, setBrightness, reflection, setReflection, bloom, setBloom, zoomSpeed, setZoomSpeed, rotateSpeed, setRotateSpeed, resetSettings } = useSettingsStore();
  const activeModelData = models.find(m => m.id === activeModel) || models[0];

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen pb-12 px-3 sm:px-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full h-[calc(100vh-theme(spacing.28))] overflow-hidden bg-[#050505] rounded-3xl border border-border/50 mx-auto mb-6"
      >
        <div className={`absolute inset-0 z-0 transition-all duration-700 ${!isInteracting ? 'pointer-events-none opacity-60 blur-[2px]' : 'opacity-100 blur-0 cursor-move'}`}>
          <SceneWrapper route={activeModel} />
        </div>
        
        {/* Top Header */}
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-10 flex flex-row gap-3 justify-between items-start pointer-events-none">
          <div className="bg-background/80 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-border/50 pointer-events-auto flex justify-center shrink-0">
            <h1 className="text-sm sm:text-xl font-bold font-heading text-foreground m-0">3D Lab</h1>
            <p className="text-[8px] sm:text-xs text-muted-foreground font-mono uppercase tracking-widest hidden sm:block m-2 pl-4">Experimental Models</p>
          </div>
          
          {/* Right Controls */}
          <div className="relative flex items-center gap-2 pointer-events-auto w-full max-w-[240px] sm:max-w-none sm:w-auto justify-end">
            {/* Custom Dropdown Selector */}
            <div className="w-full sm:w-auto flex-1 sm:flex-none">
              <Button
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  setIsSettingsOpen(false);
                }}
                variant="outline"
                className="w-full sm:w-auto rounded-xl gap-2 sm:gap-3 h-9 sm:h-12 px-3 sm:px-4 bg-background/80 backdrop-blur-md border-border/50 justify-between shadow-[0_0_15px_rgba(var(--color-primary),0.15)]"
              >
                <div className="flex items-center gap-4 truncate">
                  <div className="shrink-0 text-primary">{activeModelData.icon}</div>
                  <span className="inline font-medium text-xs sm:text-base truncate">{activeModelData.name}</span>
                </div>
                <Icon icon="lucide:chevron-down" className={`shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+0.5rem)] left-0 right-0 w-auto bg-background/90 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col max-h-[55vh] overflow-y-auto custom-scrollbar overscroll-contain"
                    data-lenis-prevent="true"
                  >
                    <div className="p-1 flex flex-col gap-1">
                      {models.map(model => (
                        <button
                          key={model.id}
                          onClick={() => {
                            setActiveModel(model.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`flex items-center gap-3 px-3 py-1 sm:px-4 rounded-lg text-xs sm:text-sm transition-all duration-300 ${
                            activeModel === model.id 
                              ? 'bg-primary/15 text-primary font-bold border border-primary/30' 
                              : 'text-foreground/80 hover:bg-primary/10 border border-transparent hover:border-primary/20'
                          }`}
                        >
                          <div className={`shrink-0 p-1.5 sm:p-2 rounded-md ${activeModel === model.id ? 'bg-primary/20 text-primary' : 'bg-background/50'}`}>
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

            {/* Settings Button */}
            <div className="shrink-0">
              <Button
                onClick={() => {
                  setIsSettingsOpen(!isSettingsOpen);
                  setIsDropdownOpen(false);
                }}
                variant="outline"
                size="icon"
                className="rounded-xl h-9 w-9 sm:h-12 sm:w-12 bg-background/80 backdrop-blur-md border-border/50 shadow-[0_0_15px_rgba(var(--color-primary),0.15)]"
              >
                <Icon icon="lucide:settings" className={`w-4 h-4 sm:w-5 sm:h-5 text-primary transition-transform duration-300 ${isSettingsOpen ? 'rotate-90' : ''}`} />
              </Button>

              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+0.5rem)] right-0 w-[240px] sm:w-[280px] bg-background/90 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl z-50 p-4"
                    data-lenis-prevent="true"
                  >
                    <h3 className="text-sm font-semibold mb-4 text-foreground/90">Scene Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs text-muted-foreground flex items-center gap-2"><Icon icon="lucide:sun" /> Brightness</label>
                          <span className="text-xs text-primary">{brightness.toFixed(1)}</span>
                        </div>
                        <input type="range" min="0" max="3" step="0.1" value={brightness} onChange={(e) => setBrightness(parseFloat(e.target.value))} className="w-full accent-primary" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs text-muted-foreground flex items-center gap-2"><Icon icon="lucide:sparkles" /> Reflection</label>
                          <span className="text-xs text-primary">{reflection.toFixed(1)}</span>
                        </div>
                        <input type="range" min="0" max="3" step="0.1" value={reflection} onChange={(e) => setReflection(parseFloat(e.target.value))} className="w-full accent-primary" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs text-muted-foreground flex items-center gap-2"><Icon icon="lucide:zap" /> Bloom</label>
                          <span className="text-xs text-primary">{bloom.toFixed(1)}</span>
                        </div>
                        <input type="range" min="0" max="5" step="0.1" value={bloom} onChange={(e) => setBloom(parseFloat(e.target.value))} className="w-full accent-primary" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs text-muted-foreground flex items-center gap-2"><Icon icon="lucide:zoom-in" /> Zoom Speed</label>
                          <span className="text-xs text-primary">{zoomSpeed.toFixed(1)}x</span>
                        </div>
                        <input type="range" min="0.1" max="3" step="0.1" value={zoomSpeed} onChange={(e) => setZoomSpeed(parseFloat(e.target.value))} className="w-full accent-primary" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs text-muted-foreground flex items-center gap-2"><Icon icon="lucide:rotate-3d" /> Rotate Speed</label>
                          <span className="text-xs text-primary">{rotateSpeed.toFixed(1)}x</span>
                        </div>
                        <input type="range" min="0.1" max="3" step="0.1" value={rotateSpeed} onChange={(e) => setRotateSpeed(parseFloat(e.target.value))} className="w-full accent-primary" />
                      </div>

                      <div className="pt-2">
                        <Button 
                          onClick={resetSettings} 
                          variant="outline" 
                          className="w-full text-xs h-8 border-destructive/50 text-destructive hover:bg-destructive hover:text-secondary transition-colors"
                        >
                          <Icon icon="lucide:rotate-ccw" className="w-3 h-3 mr-2" /> Reset Defaults
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
