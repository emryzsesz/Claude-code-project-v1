"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Small looping cue at the bottom of the hero suggesting there is more
 * below. Fades out over the first bit of scroll rather than disappearing
 * abruptly, tracked against window scroll so it works whether or not
 * Lenis is active for this visitor.
 */
export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center"
    >
      <motion.div
        className="flex h-10 w-6 items-start justify-center rounded-full border border-white/35 p-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-white/70"
          animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
