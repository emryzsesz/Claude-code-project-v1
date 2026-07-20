"use client";

import { useEffect, useRef } from "react";
import { useMotionTier } from "@/lib/useMotionTier";

const COLORS = ["#547e26", "#769a38", "#2c5583"];
const DOT_COUNT = 60;
const MAX_LINK_DISTANCE = 140;

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
};

/**
 * Lightweight canvas 2D network background for the portfolio hero: dots
 * drift slowly and wrap the edges, pulsing in size and opacity, with a
 * faint line drawn between any two dots close enough together, its own
 * opacity flickering independently so the network feels alive rather
 * than static. No WebGL, same pause on scroll out and reduced motion
 * skip as ParticleField.
 */
export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tier = useMotionTier();

  useEffect(() => {
    if (tier !== "full") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let frameId = 0;
    let running = true;
    const startTime = performance.now();

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function buildDots() {
      dots = Array.from({ length: DOT_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.3 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulseSpeed: Math.random() * 0.6 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(now: number) {
      const elapsed = (now - startTime) / 1000;
      ctx!.clearRect(0, 0, width, height);

      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_LINK_DISTANCE) continue;
          const proximity = 1 - dist / MAX_LINK_DISTANCE;
          const flicker = 0.5 + 0.5 * Math.sin(elapsed * 0.6 + i * 0.7 + j * 0.3);
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.strokeStyle = "#547e26";
          ctx!.globalAlpha = proximity * flicker * 0.35;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }

      for (const dot of dots) {
        const pulse = 0.5 + 0.5 * Math.sin(elapsed * dot.pulseSpeed + dot.pulsePhase);
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dot.radius + pulse * 1.2, 0, Math.PI * 2);
        ctx!.fillStyle = dot.color;
        ctx!.globalAlpha = 0.35 + pulse * 0.5;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      if (running) frameId = requestAnimationFrame(draw);
    }

    resize();
    buildDots();
    frameId = requestAnimationFrame(draw);

    function handleResize() {
      resize();
    }
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          frameId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [tier]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
