import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import { NotificationCategory, getRandomMessage } from '@/data/notifications';
import React from 'react';
import { CustomToast } from '@/components/core/CustomToast';

interface NotificationState {
  isDndEnabled: boolean;
  setDnd: (enabled: boolean) => void;
  toggleDnd: () => void;
  
  // Memory state (not persisted)
  lastShownIndexes: Record<string, number>;
  cooldowns: Record<string, number>;
  
  notify: (
    category: NotificationCategory, 
    options?: { 
      force?: boolean; 
      cooldownMs?: number; 
      type?: 'info' | 'success' | 'warning' | 'error';
      duration?: number;
      priority?: 'normal' | 'high' | 'critical';
    }
  ) => void;
}

const DEFAULT_COOLDOWN_MS = 5000;

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      isDndEnabled: false,
      setDnd: (enabled) => {
        set({ isDndEnabled: enabled });
        if (enabled) {
          get().notify('dnd_enabled', { force: true, type: 'info', priority: 'high' });
        } else {
          get().notify('dnd_disabled', { force: true, type: 'info', priority: 'high' });
        }
      },
      toggleDnd: () => {
        const { isDndEnabled, setDnd } = get();
        setDnd(!isDndEnabled);
      },
      
      lastShownIndexes: {},
      cooldowns: {},
      
      notify: (category, options = {}) => {
        const { isDndEnabled, lastShownIndexes, cooldowns } = get();
        const { 
          force = false, 
          cooldownMs = DEFAULT_COOLDOWN_MS, 
          type = 'info', 
          duration = 3000,
          priority = 'normal'
        } = options;
        
        const now = Date.now();
        
        // Check DND (critical overrides DND)
        if (isDndEnabled && !force && priority !== 'critical') {
          return;
        }
        
        // Check cooldown (high and critical override cooldown)
        if (!force && priority !== 'high' && priority !== 'critical' && cooldowns[category] && now - cooldowns[category] < cooldownMs) {
          return; // Still in cooldown
        }
        
        // Get message
        const lastIndex = lastShownIndexes[category];
        const { message, index } = getRandomMessage(category, lastIndex);
        
        // Update state
        set((state) => ({
          lastShownIndexes: { ...state.lastShownIndexes, [category]: index },
          cooldowns: { ...state.cooldowns, [category]: now },
        }));
        
        // If critical, dismiss all existing toasts to overwrite order
        if (priority === 'critical') {
          toast.dismiss();
        }

        // Render custom toast to enable progress bar, hover reset, and accurate alert styles
        toast.custom((t) => React.createElement(CustomToast, {
          t,
          title: message.title,
          description: message.description,
          icon: message.icon,
          type,
          duration
        }), {
          duration: Number.POSITIVE_INFINITY, // the CustomToast handles its own dismissal
        });
      },
    }),
    {
      name: 'aetheris-notifications',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ isDndEnabled: state.isDndEnabled }), // Only persist DND state
    }
  )
);

