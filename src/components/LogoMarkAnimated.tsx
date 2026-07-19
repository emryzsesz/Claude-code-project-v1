"use client";

import { motion, Variants } from "framer-motion";
import {
  LOGO_VIEWBOX,
  LOGO_NAVY_POLYGONS,
  LOGO_SWOOSH_PATH,
  LOGO_SQUARES,
} from "./LogoMark";

const NAVY = "#0f2d4c";
const GREEN = "#547e26";
const LIME = "#769a38";

const squareFill = { green: GREEN, lime: LIME } as const;

const EASE = [0.16, 1, 0.3, 1] as const;

const markVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

const squareVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: EASE, delay: 0.4 + i * 0.09 },
  }),
};

/**
 * The header logo. On mount, the navy and green mark settles in first,
 * then the four pixel squares fade in one after another. MotionProvider
 * mutes that entrance globally for reduced motion users, so this
 * component always renders the same motion.svg structure rather than
 * branching on useReducedMotion itself, which would otherwise risk a
 * hydration mismatch. On hover, the green shape brightens through a
 * layered opacity overlay driven by a plain CSS transition, not framer
 * motion, so it is unaffected either way.
 */
export default function LogoMarkAnimated({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label="Emryz Digital"
      className={`group/logo ${className ?? ""}`}
      initial="hidden"
      animate="show"
      variants={markVariants}
    >
      <g>
        {LOGO_NAVY_POLYGONS.map((points) => (
          <polygon key={points} points={points} fill={NAVY} />
        ))}
        <path d={LOGO_SWOOSH_PATH} fill={GREEN} />
        <path
          d={LOGO_SWOOSH_PATH}
          fill="#ffffff"
          className="opacity-0 transition-opacity duration-300 ease-out group-hover/logo:opacity-25"
        />
      </g>
      {LOGO_SQUARES.map((square, i) => (
        <motion.rect
          key={square.id}
          x={square.x}
          y={square.y}
          width={square.size}
          height={square.size}
          fill={squareFill[square.color]}
          custom={i}
          variants={squareVariants}
          style={{ transformOrigin: "center" }}
        />
      ))}
    </motion.svg>
  );
}
