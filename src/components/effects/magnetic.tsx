"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic — makes children softly follow the cursor when hovered.
 *
 * Performance improvements vs previous version:
 *  - Removed `useState({ x, y })` — no React re-render on every mousemove.
 *  - Removed the redundant `animate={{ x, y }}` prop (which was causing a
 *    second, conflicting Framer spring on top of the motion values).
 *  - Uses `style={{ x: springX, y: springY }}` — Framer drives the DOM
 *    transform directly via motion values, bypassing React reconciliation
 *    entirely. The component now renders exactly once.
 *  - `getBoundingClientRect()` is still called on mousemove (unavoidable for
 *    accurate cursor-relative positioning), but without triggering a re-render
 *    the overall cost is dramatically lower.
 */
export const Magnetic = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring smoothing — same stiffness/damping as before
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.2);
    y.set((e.clientY - (top + height / 2)) * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block relative"
    >
      {children}
    </motion.div>
  );
};
