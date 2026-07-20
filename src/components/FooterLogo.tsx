"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import LogoMark from "./LogoMark";
import { useIsCoarsePointer } from "@/lib/useMotionTier";

/**
 * Large centered footer logo with a very subtle upward parallax drift
 * as it scrolls through the viewport, off for reduced motion and coarse
 * pointer visitors, matching the parallax treatment used on the video
 * sections elsewhere on the site.
 */
export default function FooterLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion || coarsePointer ? "0%" : "6%", prefersReducedMotion || coarsePointer ? "0%" : "-6%"]
  );

  return (
    <motion.div ref={ref} style={{ y }} className="flex justify-center">
      <LogoMark className="h-16 w-auto sm:h-20" />
    </motion.div>
  );
}
