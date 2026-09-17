"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReduced) {
      // Skip meteors entirely on mobile / reduced-motion — saves all animation overhead
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(false);
    } else {
      // Cap at 10 on desktop (was up to 20) to ease GPU load
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(Math.min(number || 10, 10));
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, [number]);

  const meteors = new Array(count).fill(true);

  if (!mounted || !shouldRender) return null;

  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            // eslint-disable-next-line react-hooks/purity
            left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
            // eslint-disable-next-line react-hooks/purity
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            // eslint-disable-next-line react-hooks/purity
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
          }}
        ></span>
      ))}
    </>
  );
};
