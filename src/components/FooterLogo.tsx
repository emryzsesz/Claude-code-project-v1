"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  LOGO_VIEWBOX,
  LOGO_NAVY_POLYGONS,
  LOGO_SWOOSH_PATH,
  LOGO_SQUARES,
} from "./LogoMark";
import { useIsCoarsePointer } from "@/lib/useMotionTier";

const GREEN = "#547e26";
const LIME = "#769a38";
const squareFill = { green: GREEN, lime: LIME } as const;

/**
 * Footer only recolor of the traced mark: the navy shape becomes white
 * so it reads against the dark footer background, the header logo is
 * untouched since LogoMark and LogoMarkAnimated are not used here at
 * all. Shape and proportions are the exact same geometry LogoMark
 * exports, only the fill changes.
 */
function FooterLogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} role="img" aria-label="Emryz Digital mark" className={className}>
      {LOGO_NAVY_POLYGONS.map((points) => (
        <polygon key={points} points={points} fill="#ffffff" />
      ))}
      <path d={LOGO_SWOOSH_PATH} fill={GREEN} />
      {LOGO_SQUARES.map((square) => (
        <rect
          key={square.id}
          x={square.x}
          y={square.y}
          width={square.size}
          height={square.size}
          fill={squareFill[square.color]}
        />
      ))}
    </svg>
  );
}

/**
 * Compact footer lockup, sized and laid out to match the header logo:
 * icon beside the Emryz Digital wordmark rather than a large standalone
 * mark. Carries a very subtle upward parallax drift as it scrolls
 * through the viewport, off for reduced motion and coarse pointer
 * visitors, matching the parallax treatment used on the video sections
 * elsewhere on the site.
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
    <motion.div ref={ref} style={{ y }} className="flex items-center justify-center gap-3">
      <FooterLogoMark className="h-11 w-auto" />
      <span className="text-lg font-semibold text-white">Emryz Digital</span>
    </motion.div>
  );
}
