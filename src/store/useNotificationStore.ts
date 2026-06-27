import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import { NotificationCategory, getRandomMessage } from '@/data/notification-messages';
import React from 'react';
import { Icon } from '@iconify/react';

interface NotificationState {
  isDndEnabled: boolean;
  setDnd: (enabled: boolean) => void;
  toggleDnd: () => void;
  
  // Memory state (not persisted)
  lastShownIndexes: Record<string, number>;
  cooldowns: Record<string, number>;
  
  // Actions
  notify: (
    category: NotificationCategory, 
    options?: { 
      force?: boolean; 
      cooldownMs?: number; 
      type?: 'info' | 'success' | 'warning' | 'error';
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
          get().notify('dnd_enabled', { force: true, type: 'info' });
        } else {
          get().notify('dnd_disabled', { force: true, type: 'info' });
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
        const { force = false, cooldownMs = DEFAULT_COOLDOWN_MS, type = 'info' } = options;
        
        const now = Date.now();
        
        // Check DND
        if (isDndEnabled && !force) {
          return;
        }
        
        // Check cooldown
        if (!force && cooldowns[category] && now - cooldowns[category] < cooldownMs) {
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
        
        const toastOptions = {
          icon: message.icon ? React.createElement(Icon, { icon: message.icon, className: "w-5 h-5 text-primary" }) : undefined,
          description: message.description,
          duration: 7000,
          className: "glass border-primary/20 ",
        };

        switch (type) {
          case 'success':
            toast.success(message.title, toastOptions);
            break;
          case 'warning':
            toast.warning(message.title, toastOptions);
            break;
          case 'error':
            toast.error(message.title, toastOptions);
            break;
          case 'info':
          default:
            toast(message.title, toastOptions);
            break;
        }
      },
    }),
    {
      name: 'aetheris-notifications',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ isDndEnabled: state.isDndEnabled }), // Only persist DND state
    }
  )
);
