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

  // Canvas ripple — runs once after the canvas element is in the DOM.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ripple origin stored as clicked pixel coords, startTime in ms (Date.now)
    const ripples: { x: number; y: number; t0: number }[] = [];

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
    };
    window.addEventListener("click", onClick, true);

    const isDark = () => document.documentElement.classList.contains("dark");

    let rafId: number;
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

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick, true);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sparkle blocks — needs window, so run client-side only
  useEffect(() => {
    const cols = Math.floor(window.innerWidth / GRID);
    const rows = Math.floor(window.innerHeight / GRID);
    const maxBlocks = Math.min(100, Math.floor(cols * rows * 0.02));

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
