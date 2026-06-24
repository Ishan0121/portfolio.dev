import React, { createContext, useState, useContext, useCallback } from 'react';

const InteractContext = createContext();

export function InteractProvider({ children }) {
  const [isInteractMode, setIsInteractMode] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const triggerReset = useCallback(() => {
    setResetTrigger(prev => prev + 1);
  }, []);

  return (
    <InteractContext.Provider value={{ isInteractMode, setIsInteractMode, resetTrigger, triggerReset }}>
      {children}
    </InteractContext.Provider>
  );
}

export function useInteract() {
  return useContext(InteractContext);
}
