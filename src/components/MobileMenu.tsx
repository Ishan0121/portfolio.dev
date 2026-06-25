"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import { siteConfig } from "@/lib/config";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring" as any, stiffness: 320, damping: 32 } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.25, ease: "easeIn" as any } },
};

const itemVariants = {
  hidden: { x: 30, opacity: 0, filter: "blur(6px)" },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
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
            <div className="h-[2px] w-full bg-gradient-to-r from-primary via-primary/60 to-transparent" />

            {/* Nav links */}
            <nav className="flex flex-col gap-1 flex-1 px-5 pt-24 pb-8">
              {siteConfig.navLinks.map(({ title, href }, i) => {
                const isActive = pathname === href;
                return (
                  <motion.div key={title} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    <Link
                      href={href}
                      onClick={onClose}
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

              <motion.div custom={siteConfig.navLinks.length} variants={itemVariants} initial="hidden" animate="visible" className="mt-4">
                <button
                  onClick={() => {
                    document.dispatchEvent(new CustomEvent("toggle-command-menu"));
                    onClose();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-white/5 border border-border/50 glass"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  Search Portfolio
                </button>
              </motion.div>
            </nav>

            {/* Social + divider */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="px-5 pb-8 border-t border-white/5 pt-6 space-y-3"
            >
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Connect</p>
              <div className="flex gap-4">
                <SocialLinks size="sm" />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
