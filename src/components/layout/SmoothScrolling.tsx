"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1.2, touchMultiplier: 2 }}>
      {children}
    </ReactLenis>
  );
}
