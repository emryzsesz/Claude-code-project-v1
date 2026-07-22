"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LOGO_VIEWBOX,
  LOGO_NAVY_POLYGONS,
  LOGO_SWOOSH_PATH,
  LOGO_SQUARES,
} from "./LogoMark";

const WHITE = "#ffffff";
const GREEN = "#547e26";
const LIME = "#769a38";
const squareFill: Record<string, string> = { green: GREEN, lime: LIME };

const EASE = [0.16, 1, 0.3, 1] as const;
const MAX_DURATION_MS = 1800;
const FULL_MOTION_HOLD_MS = 1440;
const REDUCED_MOTION_HOLD_MS = 150;

const shapeVariants = {
  hidden: { pathLength: 0, fillOpacity: 0 },
  show: (delay: number) => ({
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      pathLength: { duration: 0.65, delay, ease: EASE },
      fillOpacity: { duration: 0.35, delay: delay + 0.4 },
    },
  }),
};

const squareVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, delay, ease: EASE },
  }),
};

/**
 * Shown once per browser session, gated by sessionStorage. Renders nothing
 * on the server and on the very first client render, deciding synchronously
 * in a layout effect (before the browser paints) whether this is a first
 * visit this session. That keeps server and client markup identical, so
 * there is nothing to hydrate around, and it means no JavaScript at all
 * simply means no loading screen, which is the correct fallback.
 *
 * The draw in sequence has a fixed, deterministic timeline built from real
 * animation durations, not an arbitrary hold. It exits the moment that
 * timeline finishes rather than padding out to the maximum, and the
 * maximum itself is a hard cap, never a target.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const decided = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (decided.current) return;
    decided.current = true;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("emryz-loaded") === "1";
      sessionStorage.setItem("emryz-loaded", "1");
    } catch {
      // Storage unavailable (private mode, etc). Show it once and move on.
    }
    if (alreadySeen) return;

    setVisible(true);

    const holdMs = Math.min(
      prefersReducedMotion ? REDUCED_MOTION_HOLD_MS : FULL_MOTION_HOLD_MS,
      MAX_DURATION_MS
    );
    const timer = window.setTimeout(() => setVisible(false), holdMs);
    return () => window.clearTimeout(timer);
    // Deliberately runs once on mount only, prefersReducedMotion is read
    // at that moment and the hold time is fixed for this showing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <motion.svg
            viewBox={LOGO_VIEWBOX}
            className="h-auto w-36 sm:w-48"
            initial="hidden"
            animate="show"
          >
            {/*
              Loading screen only recolor: the navy polygons render white so
              the E reads against this same navy background, same fix as the
              footer instance. Same traced geometry as LogoMark either way,
              header and footer are untouched since they do not import from
              here.
            */}
            {LOGO_NAVY_POLYGONS.map((points) => (
              <motion.polygon
                key={points}
                points={points}
                fill={WHITE}
                stroke={WHITE}
                strokeWidth={3}
                variants={shapeVariants}
                custom={0}
              />
            ))}
            <motion.path
              d={LOGO_SWOOSH_PATH}
              fill={GREEN}
              stroke={GREEN}
              strokeWidth={3}
              variants={shapeVariants}
              custom={0.15}
            />
            {LOGO_SQUARES.map((square, i) => (
              <motion.rect
                key={square.id}
                x={square.x}
                y={square.y}
                width={square.size}
                height={square.size}
                fill={squareFill[square.color]}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                variants={squareVariants}
                custom={0.8 + i * 0.09}
              />
            ))}
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
