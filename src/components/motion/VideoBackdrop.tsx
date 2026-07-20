"use client";

import { useState } from "react";
import { motion, MotionValue } from "framer-motion";
import { useMotionTier } from "@/lib/useMotionTier";

/**
 * Shared video-with-fallback layer used by the hero and every full
 * viewport service section. Mounts on every device, touch included, for
 * every visitor except reduced motion. Autoplay, muted, loop, and
 * playsinline are plain HTML attributes, the same on mobile and desktop:
 * muted is what lets autoplay run on iOS, so no JavaScript play call is
 * needed anywhere. If a browser declines to autoplay regardless, the
 * poster image is what shows, which is the correct native fallback, not
 * something this component needs to detect or work around.
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
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const showVideo = tier === "full" && !failed;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {showVideo && (
        <motion.video
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${breathe ? "animate-breathe" : ""}`}
          style={{ opacity: ready ? 1 : 0, y: parallaxY }}
          autoPlay
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
          <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
        </motion.video>
      )}
    </div>
  );
}
