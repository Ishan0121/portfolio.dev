/**
 * Centralized Framer Motion animation variants.
 * Import from here rather than defining locally per-file.
 */
import type { Variants } from "framer-motion";

// ─── Page-level containers ───────────────────────────────────────────────────

/** Stagger children with a short delay */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

/** Stagger children with a slightly longer delay (section-level) */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

// ─── Child item animations ────────────────────────────────────────────────────

/** Fade + slide up — primary entrance animation */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Fade + slide up — lighter, used for smaller sections */
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/** Fade in with slight upward shift and built-in delay */
export const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
};

/** Child variant with short delay */
export const childVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } },
};

/** Generic item variant */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ─── Card animations ──────────────────────────────────────────────────────────

/** Scale + fade for cards */
export const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};
