"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { useIsCoarsePointer, useMotionTier } from "@/lib/useMotionTier";

/**
 * Drives smooth scroll for the whole app. Reduced motion visitors get no
 * Lenis instance at all and fall back to native scroll, checked once on
 * mount rather than through state so there is nothing to hydrate around.
 * Lerp is lighter on touch devices, where a heavy trailing scroll reads as
 * laggy rather than smooth.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const tier = useMotionTier();
  const coarsePointer = useIsCoarsePointer();

  useEffect(() => {
    if (tier === "reduced") return;

    const lenis = new Lenis({
      lerp: coarsePointer ? 0.12 : 0.08,
      smoothWheel: true,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, [tier, coarsePointer]);

  return <>{children}</>;
}
