"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Icon as IconifyIcon } from "@iconify/react";

const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/Ishan0121",
    icon: "mdi:github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ishan-maiti-785212297",
    icon: "mdi:linkedin",
  },
  {
    id: "email",
    label: "Email",
    url: "mailto:ishanmaiti1234@gmail.com",
    icon: "mdi:email",
  },
  {
    id: "twitter",
    label: "Twitter",
    url: "https://x.com/maiti_ishan",
    icon: "mdi:twitter",
  },
];

interface SocialLinksProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showName?: boolean;
}

export default function SocialLinks({ size = "md", className, showName = false }: SocialLinksProps) {
  return (
    <TooltipProvider>
      <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
        {socialLinks.map(({ id, label, url, icon }) => (
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
                    if (id === "email") {
                      toast.info("Opening email client...", { description: url.replace("mailto:", "") });
                    } else {
                      toast.info(`Opening ${label}...`);
                    }
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
