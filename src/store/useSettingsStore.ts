import { create } from 'zustand';

interface SettingsState {
  brightness: number;
  reflection: number;
  bloom: number;
  zoomSpeed: number;
  rotateSpeed: number;
  setBrightness: (value: number) => void;
  setReflection: (value: number) => void;
  setBloom: (value: number) => void;
  setZoomSpeed: (value: number) => void;
  setRotateSpeed: (value: number) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  brightness: 1.0,
  reflection: 1.0,
  bloom: 1.0,
  zoomSpeed: 1.0,
  rotateSpeed: 1.0,
  setBrightness: (value) => set({ brightness: value }),
  setReflection: (value) => set({ reflection: value }),
  setBloom: (value) => set({ bloom: value }),
  setZoomSpeed: (value) => set({ zoomSpeed: value }),
  setRotateSpeed: (value) => set({ rotateSpeed: value }),
  resetSettings: () => set({ brightness: 1.0, reflection: 1.0, bloom: 1.5, zoomSpeed: 1.0, rotateSpeed: 1.0 }),
}));
