"use client";

import { RefObject, useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useIsCoarsePointer, useMotionTier } from "@/lib/useMotionTier";

/**
 * Pulls an element toward the cursor whenever the pointer is within
 * radius pixels of its center, and springs back with a slight overshoot
 * once the pointer leaves that zone. The measuring ref stays on an
 * untransformed wrapper so the center point used for the distance check
 * never drifts as the inner element itself moves. Desktop and full
 * motion only, radius zero on touch or reduced motion effectively turns
 * this into a no op without a second code path.
 */
export function useMagnetic(radius = 80, strength = 0.35) {
  const triggerRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const tier = useMotionTier();
  const coarsePointer = useIsCoarsePointer();
  const enabled = tier === "full" && !coarsePointer && radius > 0;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 10, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 10, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: PointerEvent) {
      const node = triggerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    }

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      x.set(0);
      y.set(0);
    };
  }, [enabled, radius, strength, x, y]);

  return { triggerRef, springX, springY };
}
