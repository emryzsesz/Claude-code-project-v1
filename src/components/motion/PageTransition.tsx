"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const PHASE_DURATION = 0.3;
const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * Total time the cover and reveal phases take together, in milliseconds.
 * Exported so SmoothScrollProvider can time its post navigation scroll
 * reset to land after the new page has actually mounted and finished
 * revealing, rather than guessing a delay independently of this value.
 */
export const PAGE_TRANSITION_MS = PHASE_DURATION * 2 * 1000;

const panelVariants = {
  covering: { y: "0%" },
  hidden: { y: "100%" },
};

/**
 * A navy panel rides along with each keyed page instance rather than
 * being a separate always mounted layer. The outgoing page's exit
 * animates its panel from hidden to covering, sliding up over the page
 * before it is removed. Once mode wait lets the new instance mount, its
 * panel starts already covering and animates to hidden, sliding back
 * down to reveal content that finished rendering underneath while
 * hidden. Six hundred milliseconds total, split evenly. MotionProvider
 * mutes both phases for reduced motion users globally, so there is no
 * separate branch to reason about here.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname} className="relative">
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[95] bg-navy"
          variants={panelVariants}
          initial="covering"
          animate="hidden"
          exit="covering"
          transition={{ duration: PHASE_DURATION, ease: EASE }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
