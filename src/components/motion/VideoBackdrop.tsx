"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionValue } from "framer-motion";
import { useIsCoarsePointer, useMotionTier } from "@/lib/useMotionTier";

/**
 * Shared video-with-fallback layer used by the hero and every full
 * viewport service section. Only mounts a video element for full tier,
 * fine pointer visitors, and only plays it while the section is actually
 * near the viewport, driven manually through IntersectionObserver rather
 * than the autoplay attribute so preload stays "none" until it matters.
 * Every other visitor, and anyone this fails for, simply sees whatever
 * fallback the caller renders behind this layer, since this renders
 * nothing at all in that case.
 */
export default function VideoBackdrop({
  src,
  poster,
  parallaxY,
  breathe = false,
  onReady,
}: {
  src: string;
  poster?: string;
  parallaxY?: MotionValue<string>;
  breathe?: boolean;
  onReady?: (ready: boolean) => void;
}) {
  const tier = useMotionTier();
  const coarsePointer = useIsCoarsePointer();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const wantsVideo = tier === "full" && !coarsePointer;
  const showVideo = wantsVideo && !failed;

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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {showVideo && (
        <motion.video
          ref={videoRef}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${breathe ? "animate-breathe" : ""}`}
          style={{ opacity: ready ? 1 : 0, y: parallaxY }}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          onCanPlay={() => {
            setReady(true);
            onReady?.(true);
          }}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </motion.video>
      )}
    </div>
  );
}
