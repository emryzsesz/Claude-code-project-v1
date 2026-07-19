"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Always renders the same element. MotionProvider's reducedMotion="user"
 * setting makes framer motion apply the spring target instantly instead
 * of easing, for reduced motion users, without this component needing to
 * branch its own structure.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-green"
      style={{ scaleX }}
    />
  );
}
