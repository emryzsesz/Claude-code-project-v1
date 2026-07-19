"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/**
 * On load stagger for the hero, not scroll triggered. Wrap the eyebrow,
 * headline, subheadline, and button row each in HeroRevealItem inside one
 * HeroReveal parent, and they ease up and fade in one after another as
 * soon as the page mounts. Always renders the same motion element
 * regardless of the visitor's motion preference, MotionProvider mutes the
 * actual animation globally for reduced motion users.
 */
export function HeroReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div initial="hidden" animate="show" variants={groupVariants}>
      {children}
    </motion.div>
  );
}

export function HeroRevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
