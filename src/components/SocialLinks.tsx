"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Icon as IconifyIcon } from "@iconify/react";
import { siteConfig } from "@/lib/config";

interface SocialLinksProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showName?: boolean;
}

export default function SocialLinks({ size = "md", className, showName = false }: SocialLinksProps) {
  const notify = useNotificationStore((state) => state.notify);

  return (
    <TooltipProvider>
      <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
        {siteConfig.socialLinks.map(({ id, label, url, icon }) => (
          <Tooltip key={id} delayDuration={300}>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size={showName ? "default" : "icon"} 
                asChild 
                className={cn(
                  "rounded-full bg-transparent hover:bg-primary hover:text-primary-foreground border-border/50",
                  !showName && "w-10 h-10",
                  showName && "px-4"
                )}
              >
                <motion.a
                  href={url}
                  target={url.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() => {
                    notify("external_link", { type: "info" });
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex items-center"
                >
                  <IconifyIcon
                    icon={icon}
                    className={cn(
                      size === "sm"
                        ? "w-3.5 h-3.5"
                        : size === "md"
                        ? "w-4 h-4"
                        : "w-5 h-5",
                      showName && "mr-2"
                    )}
                  />
                  {showName && <span className="font-medium">{label}</span>}
                </motion.a>
              </Button>
            </TooltipTrigger>
            {!showName && (
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
