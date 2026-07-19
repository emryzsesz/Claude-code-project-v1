"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useDeviceTier } from "@/lib/useDeviceTier";

const HeroShaderCanvas = dynamic(() => import("./webgl/HeroShaderCanvas"), {
  ssr: false,
});

type Square = {
  id: number;
  top: number;
  left: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
};

const COLORS = ["#547e26", "#769a38", "#8fb84f"];

function buildSquares(): Square[] {
  const squares: Square[] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 16; i++) {
    squares.push({
      id: i,
      top: rand() * 92 + 4,
      left: rand() * 92 + 4,
      size: rand() * 30 + 10,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      opacity: rand() * 0.35 + 0.15,
      duration: rand() * 5 + 6,
      delay: rand() * 3,
      drift: rand() * 14 + 8,
    });
  }
  return squares;
}

/**
 * Full bleed hero backdrop. The navy base, blurred gradient blobs, pixel
 * square scatter, and contrast overlay are the checkpoint one layer:
 * always rendered, content first. On top of that, once useDeviceTier
 * resolves to "full" and this section has scrolled near the viewport, a
 * WebGL shader canvas fades in and takes over the flowing gradient look,
 * dynamic imported with ssr false so none of three.js reaches anyone who
 * never actually sees it, gated by an IntersectionObserver so it never
 * runs offscreen. Every visitor who is on reduced motion, a touch
 * device, a weak desktop, or has JavaScript off at all simply keeps the
 * CSS version, which was designed to stand on its own, not as an empty
 * placeholder.
 */
export default function HeroBackground() {
  const squares = useMemo(() => buildSquares(), []);
  const tier = useDeviceTier();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [shaderReady, setShaderReady] = useState(false);

  const wantsShader = tier === "full";

  useEffect(() => {
    if (!wantsShader) return;
    const node = containerRef.current;
    if (!node) return;

    let observer: IntersectionObserver | undefined;
    const setup = () => {
      observer = new IntersectionObserver(
        ([entry]) => setIsNearViewport(entry.isIntersecting),
        { rootMargin: "200px 0px" }
      );
      observer.observe(node);
    };

    // The hero sits above the fold, so an IntersectionObserver alone
    // would fire almost immediately and race three.js's setup against
    // the rest of hydration, which is exactly what drove desktop TBT up
    // in testing. Waiting for the browser to report idle time (with a
    // capped fallback for browsers without requestIdleCallback) pushes
    // that work out of the critical loading path instead.
    const hasIdleCallback = "requestIdleCallback" in window;
    const idleId = hasIdleCallback
      ? window.requestIdleCallback(setup, { timeout: 2000 })
      : window.setTimeout(setup, 300);

    return () => {
      if (hasIdleCallback) {
        window.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId as number);
      }
      observer?.disconnect();
    };
  }, [wantsShader]);

  const showShader = wantsShader && isNearViewport;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: shaderReady ? 0 : 1 }}
      >
        <div className="absolute -left-1/4 -top-1/3 h-[70%] w-[70%] rounded-full bg-green/30 blur-[110px]" />
        <div className="absolute -right-1/4 top-1/4 h-[60%] w-[60%] rounded-full bg-navy-dark blur-[100px]" />
        <div className="absolute -bottom-1/3 left-1/3 h-[65%] w-[65%] rounded-full bg-lime/20 blur-[120px]" />
      </div>

      {showShader && (
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: shaderReady ? 1 : 0 }}
        >
          <HeroShaderCanvas onReady={() => setShaderReady(true)} />
        </div>
      )}

      <div aria-hidden="true" className="absolute inset-0">
        {squares.map((sq) => (
          <motion.div
            key={sq.id}
            className="absolute rounded-[3px]"
            style={{
              top: `${sq.top}%`,
              left: `${sq.left}%`,
              width: sq.size,
              height: sq.size,
              backgroundColor: sq.color,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: sq.opacity,
              y: [0, -sq.drift, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: sq.delay },
              y: {
                duration: sq.duration,
                delay: sq.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>

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
