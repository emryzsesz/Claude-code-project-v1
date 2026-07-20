"use client";

import { useRef } from "react";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";
import VideoBackdrop from "./motion/VideoBackdrop";
import { useIsCoarsePointer } from "@/lib/useMotionTier";

const HERO_VIDEO_SRC = "/video/hero.mp4";
const HERO_POSTER_SRC = "/video/hero-poster.jpg";

/**
 * Full bleed hero backdrop. The navy base and blurred gradient blobs are
 * the permanent layer: always rendered, content first, and what every
 * visitor sees if the video is unavailable for any reason. VideoBackdrop
 * handles the tier gating, IntersectionObserver play and pause, and cross
 * fade in on top of that.
 */
export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", prefersReducedMotion || coarsePointer ? "0%" : "18%"]
  );

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-navy">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -left-1/4 -top-1/3 h-[70%] w-[70%] rounded-full bg-green/30 blur-[110px]" />
        <div className="absolute -right-1/4 top-1/4 h-[60%] w-[60%] rounded-full bg-navy-dark blur-[100px]" />
        <div className="absolute -bottom-1/3 left-1/3 h-[65%] w-[65%] rounded-full bg-lime/20 blur-[120px]" />
      </div>

      <VideoBackdrop src={HERO_VIDEO_SRC} poster={HERO_POSTER_SRC} parallaxY={parallaxY} />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-navy/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 10%, transparent 40%, rgba(8,27,46,0.55) 100%)",
        }}
      />
    </div>
  );
}
