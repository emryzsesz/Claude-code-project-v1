"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  role?: string;
  delay?: number;
  y?: number;
};

/**
 * Fades and rises a block into view the first time it crosses the
 * viewport. Transform and opacity only. Always renders the same motion
 * element regardless of the visitor's motion preference, since branching
 * element type on useReducedMotion causes a hydration mismatch (that
 * value can differ between the server render and the first client
 * render). The actual muting of the animation for reduced motion users
 * is handled once, globally, by MotionProvider.
 */
export default function Reveal({
  children,
  className = "",
  role,
  delay = 0,
  y = 28,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      role={role}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Wrap a grid or list in RevealGroup and each direct RevealItem child
 * arrives staggered, one after another, the first time the group enters
 * the viewport.
 */
export function RevealGroup({
  children,
  className = "",
  role,
}: {
  children: ReactNode;
  className?: string;
  role?: string;
}) {
  return (
    <motion.div
      className={className}
      role={role}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px 0px" }}
      variants={groupVariants}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  role,
}: {
  children: ReactNode;
  className?: string;
  role?: string;
}) {
  return (
    <motion.div className={className} role={role} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
