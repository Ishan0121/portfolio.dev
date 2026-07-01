"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Icon as IconifyIcon } from "@iconify/react";
import { portfolioInfo } from "@/lib/config";
import { Magnetic } from "@/components/effects/magnetic";

interface SocialLinksProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showName?: boolean;
  showTooltip?: boolean;
  magnetic?: boolean;
}

export default function SocialLinks({ size = "md", className, showName = false, showTooltip = false, magnetic = true }: SocialLinksProps) {
  const notify = useNotificationStore((state) => state.notify);

  return (
    <TooltipProvider>
      <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
        {portfolioInfo.socialLinks.map(({ id, label, url, icon }) => {
          const linkContent = (
            <Button 
              variant="outline" 
              size={showName ? "default" : "icon"} 
              asChild 
              className={cn(
                "rounded-full bg-transparent hover:bg-primary hover:text-primary-foreground border-border/50",
                "transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95",
                !showName && "w-10 h-10",
                showName && "px-4"
              )}
            >
              <a
                href={url}
                target={url.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                onClick={() => {
                  notify("external_link", { type: "info" });
                }}
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
              </a>
            </Button>
          );

          if (!showTooltip) {
            return (
              <React.Fragment key={id}>
                {magnetic ? (
                  <Magnetic>
                    {linkContent}
                  </Magnetic>
                ) : (
                  linkContent
                )}
              </React.Fragment>
            );
          }

          return (
            <Tooltip key={id} delayDuration={300}>
              <TooltipTrigger asChild>
                <div>
                  {magnetic ? (
                    <Magnetic>
                      {linkContent}
                    </Magnetic>
                  ) : (
                    linkContent
                  )}
                </div>
              </TooltipTrigger>
              {!showName && (
                <TooltipContent>
                  <p>{label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
