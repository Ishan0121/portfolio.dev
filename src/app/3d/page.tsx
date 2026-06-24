"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractProvider } from "@/context/InteractContext";
import { SceneWrapper } from "@/components/3DScene/Scene";
import { Database, Eye, Heart, Network, Dna } from "lucide-react";

const models = [
  { id: "/", name: "DNA Engine", icon: <Dna size={18} /> },
  { id: "/about", name: "Neural Network", icon: <Network size={18} /> },
  { id: "/skills", name: "Data Core", icon: <Database size={18} /> },
  { id: "/projects", name: "Cyber Eye", icon: <Eye size={18} /> },
  { id: "/contact", name: "Bionic Heart", icon: <Heart size={18} /> },
];

export default function ThreeDLabPage() {
  const [activeModel, setActiveModel] = useState("/");

  return (
    <InteractProvider>
      <div className="relative w-full h-[calc(100vh-theme(spacing.24))] overflow-hidden bg-[#050505] rounded-3xl border border-border/50 mx-auto max-w-[95%]">
        <div className="absolute inset-0 z-0">
          <SceneWrapper route={activeModel} />
        </div>
        
        <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start pointer-events-none">
          <div className="bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border/50 pointer-events-auto">
            <h1 className="text-xl font-bold font-heading text-foreground mb-1">3D Lab</h1>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Experimental Models</p>
          </div>
          
          <div className="flex flex-col gap-2 pointer-events-auto">
            {models.map(model => (
              <button
                key={model.id}
                onClick={() => setActiveModel(model.id)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  activeModel === model.id 
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--color-primary),0.3)]" 
                    : "bg-background/60 backdrop-blur-md text-muted-foreground border-border/50 hover:bg-accent hover:text-foreground"
                }`}
              >
                {model.icon}
                <span className="hidden sm:inline">{model.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-border/50 pointer-events-auto">
          <p className="text-xs font-mono tracking-widest uppercase opacity-70">
            Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>
    </InteractProvider>
  );
}
