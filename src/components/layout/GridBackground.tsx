"use client";

import { useEffect, useState } from "react";

export function GridBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const gridSize = 20;

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const [blocks, setBlocks] = useState<{ id: string; x: number; y: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const cols = Math.floor(dimensions.width / gridSize);
    const rows = Math.floor(dimensions.height / gridSize);
    const maxBlocks = Math.min(100, Math.floor(cols * rows * 0.02));

    const generateRandomBlock = () => ({
      id: Math.random().toString(36).substring(2, 9),
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    });

    const initialBlocks = Array.from({ length: maxBlocks }).map(generateRandomBlock);
    setBlocks(initialBlocks);
  }, [dimensions]);

  return (
    <div
      className="fixed inset-0 -z-10 opacity-30 transition-opacity duration-300 hover:opacity-100 pointer-events-none overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgb(55 65 81 / 0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(55 65 81 / 0.5) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundPosition: "0 0",
      }}
    >
      <svg className="absolute inset-0 w-full h-full">
        {blocks.map((block) => (
          <rect
            key={block.id}
            width={gridSize - 1}
            height={gridSize - 1}
            x={block.x * gridSize + 1}
            y={block.y * gridSize + 1}
            className="fill-gray-600 dark:fill-gray-400 animate-twinkle opacity-0"
            style={{
              animationDelay: `${block.delay}s`,
              '--twinkle-duration': `${block.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}
