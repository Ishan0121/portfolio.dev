"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/Ishan0121",
    icon: FaGithub,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ishan-maiti-785212297",
    icon: FaLinkedin,
  },
  {
    id: "email",
    label: "Email",
    url: "mailto:ishanmaiti1234@gmail.com",
    icon: FaEnvelope,
  },
  {
    id: "twitter",
    label: "Twitter",
    url: "https://x.com/maiti_ishan",
    icon: FaTwitter,
  },
];

export default function SocialLinks({ size = "md", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map(({ id, label, url, icon: Icon }) => {
        const iconSize = size === "sm" ? 14 : size === "md" ? 18 : 24;
        const containerSize = size === "sm" ? "w-8 h-8" : size === "md" ? "w-10 h-10" : "w-12 h-12";
        
        return (
          <motion.a
            key={id}
            href={url}
            title={label}
            target={url.startsWith("mailto") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            className={`rounded-full glass glass-hover flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors ${containerSize}`}
            whileHover={{ scale: 1.18, y: -3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 450, damping: 15 }}
          >
            <Icon size={iconSize} />
          </motion.a>
        );
      })}
    </div>
  );
}
