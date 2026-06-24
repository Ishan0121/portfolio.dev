import { create } from 'zustand';

interface InteractState {
  isInteractMode: boolean;
  resetTrigger: number;
  setIsInteractMode: (mode: boolean) => void;
  triggerReset: () => void;
}

export const useInteractStore = create<InteractState>((set) => ({
  isInteractMode: false,
  resetTrigger: 0,
  setIsInteractMode: (mode) => set({ isInteractMode: mode }),
  triggerReset: () => set((state) => ({ resetTrigger: state.resetTrigger + 1 })),
}));
