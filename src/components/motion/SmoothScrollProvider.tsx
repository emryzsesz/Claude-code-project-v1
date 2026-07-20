"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useIsCoarsePointer, useMotionTier } from "@/lib/useMotionTier";
import { PAGE_TRANSITION_MS } from "./PageTransition";

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
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const hasNavigatedOnce = useRef(false);

  useEffect(() => {
    if (tier === "reduced") return;

    const lenis = new Lenis({
      lerp: coarsePointer ? 0.12 : 0.08,
      smoothWheel: true,
      autoRaf: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [tier, coarsePointer]);

  useEffect(() => {
    // Skip the very first run, this effect exists to recover from a
    // route change, not to do anything on the page the app booted on.
    if (!hasNavigatedOnce.current) {
      hasNavigatedOnce.current = true;
      return;
    }

    // Stopped immediately so wheel or touch input during the panel
    // transition cannot hand Lenis a scroll target computed against the
    // page that is on its way out.
    lenisRef.current?.stop();

    // PageTransition's cover phase finishes at PAGE_TRANSITION_MS / 2,
    // at which point the navy panel fully hides the viewport, the exact
    // moment an instant scroll reset is invisible to the visitor rather
    // than a visible jump on the outgoing page.
    const resetTimer = window.setTimeout(() => {
      const lenis = lenisRef.current;
      if (lenis) {
        // Lenis silently no ops scrollTo while stopped unless told to
        // force it, which is exactly the state this is called in.
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, PAGE_TRANSITION_MS / 2);

    // The new page only actually mounts once PageTransition's mode wait
    // lets the outgoing page finish exiting, and the reveal phase is
    // still running after that. Waiting past the full transition, plus
    // a hundred millisecond margin, means resize measures the new
    // page's real, settled layout instead of a mid transition one, so
    // Lenis stops trusting the old page's scroll limit once it takes
    // scroll back over.
    const restartTimer = window.setTimeout(() => {
      const lenis = lenisRef.current;
      lenis?.resize();
      lenis?.start();
    }, PAGE_TRANSITION_MS + 100);

    return () => {
      window.clearTimeout(resetTimer);
      window.clearTimeout(restartTimer);
    };
  }, [pathname]);

  return <>{children}</>;
}
