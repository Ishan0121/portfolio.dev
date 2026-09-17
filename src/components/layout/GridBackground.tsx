"use client";

import { useEffect, useRef, useState } from "react";

// ─── Change only this value to resize the grid ───────────────────────────
const GRID = 20;        // cell size in px (grid line spacing)
// ───────────────────────────────────────────────────────────────────────────
const MARGIN = 1;       // offset to skip the 1px grid line
const CELL = GRID - 1;  // perfect fit: 20px cell - 1px grid line = 19px

const DURATION = 1400;  // ripple duration in ms
const MAX_R = 14;       // max ripple radius in cells
const BAND = 2.5;       // ring thickness in cells

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blocks, setBlocks] = useState<
    { id: string; x: number; y: number; delay: number; duration: number }[]
  >([]);

  // Canvas ripple — demand-driven: the rAF loop only runs while ripples are active.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ripple origin stored as clicked pixel coords, startTime in ms (Date.now)
    const ripples: { x: number; y: number; t0: number }[] = [];
    let rafId = 0; // 0 = loop is stopped

    // Only schedule if the loop is not already running and the tab is visible
    const scheduleRaf = () => {
      if (!rafId && !document.hidden) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      // Use the actual DOM element dimensions (excluding scrollbars)
      // instead of window.inner* to prevent automatic browser scaling.
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onClick = (e: MouseEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, t0: Date.now() });
      scheduleRaf(); // start the loop only when there is work to do
    };
    window.addEventListener("click", onClick, true);

    // Pause when tab is hidden, resume when it becomes visible again
    const onVisibility = () => {
      if (document.hidden) {
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
      } else if (ripples.length > 0) {
        scheduleRaf();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const isDark = () => document.documentElement.classList.contains("dark");

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const dark = isDark();

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        const elapsed = now - rip.t0;
        if (elapsed > DURATION) { ripples.splice(i, 1); continue; }

        const t = elapsed / DURATION;          // 0 → 1
        const front = t * MAX_R;              // wave front in cell units

        // origin cell (integer col/row)
        const col0 = Math.floor(rip.x / GRID);
        const row0 = Math.floor(rip.y / GRID);
        // search radius: how many cells out we need to check
        const sweep = Math.ceil(front + BAND) + 1;

        for (let dr = -sweep; dr <= sweep; dr++) {
          for (let dc = -sweep; dc <= sweep; dc++) {
            // distance from origin cell in cell units
            const d = Math.hypot(dr, dc);
            // how far is this cell from the current wave front (in cells)
            const distFromFront = Math.abs(d - front);
            if (distFromFront > BAND) continue;

            // opacity: peaks at wave front, fades to 0 at band edge and at end of animation
            const alpha = (1 - distFromFront / BAND) * (1 - t) * 0.85;
            if (alpha <= 0) continue;

            // Matches Tailwind gray-400 for dark mode, gray-600 for light mode
            ctx.fillStyle = dark
              ? `rgba(156, 163, 175, ${alpha})`
              : `rgba(75, 85, 99, ${alpha})`;
            ctx.fillRect(
              (col0 + dc) * GRID + MARGIN,
              (row0 + dr) * GRID + MARGIN,
              CELL,
              CELL
            );
          }
        }
      }

      // Keep looping only while there are active ripples; otherwise stop entirely
      if (ripples.length > 0) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0; // nothing left to draw — let the CPU rest
      }
    };

    // Do NOT start rAF on mount — wait for the first click to spawn work

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Sparkle blocks — needs window, so run client-side only.
  // Disabled on mobile to avoid ~100 simultaneous CSS animations on low-end devices.
  useEffect(() => {
    const isMobileDevice = window.innerWidth < 768;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobileDevice || prefersReduced) return; // skip entirely on mobile / reduced-motion

    const cols = Math.floor(window.innerWidth / GRID);
    const rows = Math.floor(window.innerHeight / GRID);
    // Reduced cap: 40 max (was 100) and lower density (0.015 vs 0.02)
    const maxBlocks = Math.min(40, Math.floor(cols * rows * 0.015));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBlocks(
      Array.from({ length: maxBlocks }, () => ({
        id: Math.random().toString(36).substring(2, 9),
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* CSS grid lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(55 65 81 / 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(55 65 81 / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: `${GRID}px ${GRID}px`,
        }}
      />

      {/* SVG twinkle sparkles */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {blocks.map((block) => (
          <rect
            key={block.id}
            width={CELL}
            height={CELL}
            x={block.x * GRID + MARGIN}
            y={block.y * GRID + MARGIN}
            className="fill-gray-600 dark:fill-gray-400 animate-twinkle opacity-0"
            style={{
              animationDelay: `${block.delay}s`,
              "--twinkle-duration": `${block.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </svg>

      {/* Canvas ripple — single DOM node, no React re-renders */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
