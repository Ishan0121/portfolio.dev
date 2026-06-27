"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { CommandMenu } from '@/components/core/CommandMenu';
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Apply styling changes when scrolled past 20px
    setScrolled(latest > 20);

    // Hide navbar when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navLinks = siteConfig.navLinks;

  const themeToggle = (
    <Button
      variant="ghost"
      size="icon"
      suppressHydrationWarning
      onClick={() => {
        if (theme === "system") setTheme("dark");
        else if (theme === "dark") setTheme("light");
        else setTheme("system");
      }}
    >
      {theme === "system" ? (
        <Icon icon="lucide:cpu" className="h-5 w-5" />
      ) : theme === "dark" || (theme === "system" && systemTheme === "dark") ? (
        <Icon icon="lucide:moon" className="h-5 w-5" />
      ) : (
        <Icon icon="lucide:sun-dim" className="h-5 w-5" />
      )}
    </Button>
  );

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" },
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-4 left-0 right-0 z-[100] mx-auto w-full px-4 sm:px-6 lg:px-8 transition-all duration-300",
          scrolled ? "w-[95%] sm:w-[90%] md:w-[95%] lg:w-[95%] px-0" : "w-full"
        )}
      >
        <div className="glass backdrop-blur-sm bg-background/60 shadow-lg transition-all duration-500 border border-border/50 rounded-full h-14 flex items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold">
            <code>चक्र</code>
          </Link>

          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium hover:opacity-80 transition-colors px-4 py-1 rounded-2xl ${
                  pathname === link.href ? "glass" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.title}
              </Link>
            ))}
            <div className="flex items-center ml-2 border-l border-white/10 pl-2 space-x-2">
              <Button
                variant="outline"
                className="hidden lg:flex w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 glass rounded-full relative"
                onClick={() => setCommandOpen(true)}
              >
                <span className="hidden lg:inline-flex">Search portfolio...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded-full border border-white/20 bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-foreground glass">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setCommandOpen(true)}
              >
                <Icon icon="lucide:search" className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              {themeToggle}
            </div>
          </div>

          <div className="flex md:hidden items-center gap-1">
            {themeToggle}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <Icon icon="lucide:x" className="h-5 w-5" />
              ) : (
                <Icon icon="lucide:menu" className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

      </motion.nav>

      <MobileMenu 
        open={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        pathname={pathname} 
      />
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </>
  );
}
