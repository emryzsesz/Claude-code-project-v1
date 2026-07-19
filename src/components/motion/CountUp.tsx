"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({
  value,
  duration = 1.4,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useSafeReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Reduced motion still lands on the same rAF path, just with a
    // duration short enough that it resolves within a single frame
    // instead of easing, so there is no separate setState-in-effect
    // branch to reason about.
    const effectiveDuration = reduce ? 0.001 : duration;
    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / effectiveDuration, 1);
      setDisplay(Math.round(value * EASE_OUT(progress)));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
