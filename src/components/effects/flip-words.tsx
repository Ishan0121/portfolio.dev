"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isAnimating) {
      timeout = setTimeout(() => {
        startAnimation();
      }, duration);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      {/* Animate at word-level only — avoids per-letter motion nodes and costly blur filters.
          opacity + translateY are GPU-compositable and do not trigger layout or paint. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, position: "absolute" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "z-10 inline-block relative text-center text-neutral-900 dark:text-neutral-100",
          className
        )}
        key={currentWord}
      >
        <span className="inline-block">&nbsp;</span>
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: wordIndex * 0.08,
              duration: 0.2,
              ease: "easeOut",
            }}
            className="inline-block whitespace-nowrap"
          >
            {word}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
