"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import SocialLinks from "@/components/shared/SocialLinks";
import { siteConfig, portfolioInfo } from "@/lib/config";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants = {
  hidden: { x: "100%", opacity: 0 },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visible: { x: 0, opacity: 1, transition: { type: "spring" as any, stiffness: 320, damping: 32 } },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exit: { x: "100%", opacity: 0, transition: { duration: 0.25, ease: "easeIn" as any } },
};

const itemVariants = {
  hidden: { x: 30, opacity: 0, filter: "blur(6px)" },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

export default function MobileMenu({ open, onClose, pathname }: { open: boolean, onClose: () => void, pathname: string }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-md md:hidden"
            onClick={onClose}
          />

          {/* Slide-in panel */}
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col md:hidden overflow-hidden"
            style={{
              background: "hsl(var(--background)/0.85)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderLeft: "1px solid hsl(var(--border)/0.3)",
            }}
          >
            {/* Top accent line */}
            <div className="h-0.5 w-full bg-linear-to-r from-primary via-primary/60 to-transparent" />

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close menu"
              className="absolute top-4 right-4 z-20 w-6 h-6 rounded-full flex items-center justify-center bg-secondary/60 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors duration-200 backdrop-blur-md border border-border/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </motion.button>
            {/* Avatar + name header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="px-5 pt-6 pb-4 border-b border-white/5 mb-2"
            >
              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-2 py-1.5 -mx-2 hover:bg-white/5 active:bg-white/10 transition-colors group"
              >
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-md group-hover:opacity-80 transition-opacity" />
                  <Image
                    unoptimized
                    src={portfolioInfo.person.avatar}
                    width={44}
                    height={44}
                    alt="Avatar"
                    className="relative w-11 h-11 rounded-full border border-border/50 object-cover select-none pointer-events-none group-hover:ring-2 group-hover:ring-primary/40 transition-all"
                    draggable={false}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-tight truncate">{portfolioInfo.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{portfolioInfo.person.role}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 flex-1 px-5 pt-2 pb-8">
              {siteConfig.navLinks.map(({ title, href }, i) => {
                const isActive = pathname === href;
                return (
                  <motion.div
                    key={title}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary/15 text-primary shadow-[0_0_16px_hsl(var(--primary)/0.15)]"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          isActive ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                      />
                      {title}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                custom={siteConfig.navLinks.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="mt-4"
              >
                <Button
                  variant="outline"
                  onClick={() => {
                    document.dispatchEvent(
                      new CustomEvent("toggle-command-menu"),
                    );
                    onClose();
                  }}
                  className="flex items-center justify-between w-full rounded-2xl h-12 text-muted-foreground hover:text-foreground border-border/50 bg-background/40 backdrop-blur-md px-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    Search Portfolio
                  </div>
                  <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded-full border border-white/20 bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 text-foreground glass">
                    <span>⌘</span>K
                  </kbd>
                </Button>
              </motion.div>
            </nav>

            {/* Social + divider */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="px-5 pb-8 border-t border-white/5 pt-6 space-y-3"
            >
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Connect
              </p>
              <div className="flex gap-4">
                <SocialLinks size="lg" />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
