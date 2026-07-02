"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    icon?: string;
    name: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    function getDirection() {
      if (containerRef.current) {
        if (direction === "left") {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "forwards"
          );
        } else {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "reverse"
          );
        }
      }
    }

    function getSpeed() {
      if (containerRef.current) {
        if (speed === "fast") {
          containerRef.current.style.setProperty("--animation-duration", "20s");
        } else if (speed === "normal") {
          containerRef.current.style.setProperty("--animation-duration", "40s");
        } else {
          containerRef.current.style.setProperty("--animation-duration", "80s");
        }
      }
    }

    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        getDirection();
        getSpeed();
        setStart(true);
      }
    }

    addAnimation();
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {/* Duplicate the items once for seamless infinite scroll — CSS animation loops at 50% */}
        {[...items, ...items].map((item, idx) => (
          <li
            className="flex items-center gap-2 px-4 py-2 bg-secondary/40 rounded-xl text-sm font-medium border border-border/30 shadow-sm shrink-0 hover:bg-secondary/60 transition-colors"
            key={item.name + idx}
          >
            {item.icon && (
              item.icon.startsWith('/') 
                ? <Image src={item.icon} alt={item.name} width={16} height={16} className="w-4 h-4 object-contain" /> 
                : <Icon icon={item.icon} className="w-4 h-4" />
            )}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
