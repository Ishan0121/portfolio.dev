"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const [blocks, setBlocks] = useState<{ id: string; x: number; y: number }[]>([]);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const cols = Math.floor(dimensions.width / gridSize);
    const rows = Math.floor(dimensions.height / gridSize);
    const maxBlocks = Math.min(100, Math.floor(cols * rows * 0.02));

    const generateRandomBlock = () => ({
      id: Math.random().toString(36).substring(2, 9),
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    });

    const initialBlocks = Array.from({ length: maxBlocks }).map(generateRandomBlock);
    setBlocks(initialBlocks);

    const interval = setInterval(() => {
      setBlocks((prev) => {
        const newBlocks = [...prev];
        const numToChange = Math.floor(Math.random() * 3) + 1; // Change 1-3 blocks

        for (let i = 0; i < numToChange; i++) {
          newBlocks.shift();
          newBlocks.push(generateRandomBlock());
        }

        return newBlocks;
      });
    }, 400);

    return () => clearInterval(interval);
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
        <AnimatePresence>
          {blocks.map((block) => (
            <motion.rect
              key={block.id}
              width={gridSize - 1}
              height={gridSize - 1}
              x={block.x * gridSize + 1}
              y={block.y * gridSize + 1}
              className="fill-gray-600 dark:fill-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
}
