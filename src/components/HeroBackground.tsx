"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useIsCoarsePointer, useMotionTier } from "@/lib/useMotionTier";

const HERO_VIDEO_SRC = "/video/hero.mp4";
const HERO_POSTER_SRC = "/video/hero-poster.jpg";

/**
 * Full bleed hero backdrop. The navy base and blurred gradient blobs are
 * the permanent layer: always rendered, content first, and what every
 * visitor sees if the video is unavailable for any reason (still loading,
 * missing, a failed request, a coarse pointer device, or reduced motion).
 *
 * On top of that, full tier desktop visitors get a looping muted video,
 * played and paused manually through an IntersectionObserver rather than
 * the autoplay attribute so it never starts loading until this section is
 * actually near the viewport. It cross fades in once the browser reports
 * it can play, so there is never a flash of an unstyled video element.
 */
export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tier = useMotionTier();
  const coarsePointer = useIsCoarsePointer();
  const prefersReducedMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const wantsVideo = tier === "full" && !coarsePointer;
  const showVideo = wantsVideo && !videoFailed;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", prefersReducedMotion ? "0%" : "18%"]
  );

  useEffect(() => {
    if (!wantsVideo) return;
    const node = containerRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [wantsVideo]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: videoReady ? 0 : 1 }}
      >
        <div className="absolute -left-1/4 -top-1/3 h-[70%] w-[70%] rounded-full bg-green/30 blur-[110px]" />
        <div className="absolute -right-1/4 top-1/4 h-[60%] w-[60%] rounded-full bg-navy-dark blur-[100px]" />
        <div className="absolute -bottom-1/3 left-1/3 h-[65%] w-[65%] rounded-full bg-lime/20 blur-[120px]" />
      </div>

      {showVideo && (
        <motion.video
          ref={videoRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 1 : 0, y: parallaxY }}
          muted
          loop
          playsInline
          preload="none"
          poster={HERO_POSTER_SRC}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </motion.video>
      )}

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
