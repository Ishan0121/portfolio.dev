"use client";

import { useEffect, useRef } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export function SystemMonitor() {
  const notify = useNotificationStore((state) => state.notify);
  const isDndEnabled = useNotificationStore((state) => state.isDndEnabled);
  const toggleDnd = useNotificationStore((state) => state.toggleDnd);
  const prevEffectiveType = useRef<string | null>(null);

  useEffect(() => {
    // Online / Offline tracking
    const handleOnline = () => notify("network_online", { force: true, type: "success" });
    const handleOffline = () => notify("network_offline", { force: true, type: "error" });

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Network connection quality tracking (if supported)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      prevEffectiveType.current = connection.effectiveType;
    }

    const handleConnectionChange = () => {
      if (connection) {
        const currentType = connection.effectiveType;
        const prevType = prevEffectiveType.current;
        
        // Only notify if there is an actual downgrade/upgrade
        if (prevType && currentType !== prevType) {
          if (currentType === 'slow-2g' || currentType === '2g' || currentType === '3g') {
            notify("network_slow", { type: "warning", cooldownMs: 60000 }); 
          } else if (currentType === '4g' && (prevType === 'slow-2g' || prevType === '2g' || prevType === '3g')) {
            notify("network_fast", { type: "success", cooldownMs: 60000 });
          }
        }
        
        prevEffectiveType.current = currentType;
      }
    };

    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, [notify]);

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDnd}
        className={`glass flex items-center gap-2 px-3 py-2 rounded-full border shadow-lg transition-all group cursor-pointer ${
          isDndEnabled ? 'border-primary/50 bg-primary/10' : 'border-border/50 hover:bg-secondary/50'
        }`}
        title={isDndEnabled ? "Disable Do Not Disturb" : "Enable Do Not Disturb"}
      >
        <Icon 
          icon={isDndEnabled ? "lucide:bell-off" : "lucide:bell"} 
          className={`w-4 h-4 transition-colors ${
            isDndEnabled ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
          }`} 
        />
        {isDndEnabled && (
          <span className="text-primary text-xs font-medium hidden sm:inline-block pr-1">Silent Mode</span>
        )}
      </motion.button>
    </div>
  );
}
