"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

const EASE = [0.65, 0, 0.35, 1] as const;

export type SectionTransitionStyle = "wipe" | "radial" | "curtain";

const clipVariants: Record<SectionTransitionStyle, { hidden: string; show: string }> = {
  wipe: {
    hidden: "inset(0 100% 0 0)",
    show: "inset(0 0% 0 0)",
  },
  radial: {
    hidden: "circle(0% at 50% 50%)",
    show: "circle(75% at 50% 50%)",
  },
  curtain: {
    hidden: "inset(0 50% 0 50%)",
    show: "inset(0 0% 0 0%)",
  },
};

/**
 * Wraps a full viewport section in one of three clip path reveals,
 * triggered once when the section scrolls into view. Callers cycle
 * through the three styles so the same transition never plays twice in a
 * row. Reduced motion visitors get the section at full clip immediately,
 * handled by MotionConfig muting the transition duration globally rather
 * than branching structure here.
 *
 * viewport uses amount "some" rather than a numeric threshold like 0.2
 * on purpose. Verified against a real reproduction: a numeric amount
 * here reliably failed to ever fire again after a client side route
 * change under AnimatePresence, leaving the section clipped to nothing
 * permanently, while "some" fires correctly every time.
 */
export default function SectionReveal({
  children,
  style,
}: {
  children: ReactNode;
  style: SectionTransitionStyle;
}) {
  const { hidden, show } = clipVariants[style];

  return (
    <motion.div
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: show }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 1.1, ease: EASE }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}
