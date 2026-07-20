"use client";

import { useEffect, useRef, useState } from "react";
import { useIsCoarsePointer, useMotionTier } from "@/lib/useMotionTier";

const LERP = 0.15;

type CursorLabel = "view" | "open" | "play" | null;

/**
 * Small circle that trails the real pointer with a lerp of 0.15, driven
 * by its own requestAnimationFrame loop and direct style writes rather
 * than React state, so it stays smooth at sixty frames a second without
 * a re-render on every mouse move. Desktop and full motion only: touch
 * devices and reduced motion visitors never mount this at all, and keep
 * their native cursor.
 *
 * The label shown, if any, comes from the nearest ancestor carrying a
 * data-cursor-label attribute (view, open, or play), so a button sitting
 * on top of a video section naturally wins over the section's own play
 * label, since closest() checks the hovered element itself first.
 */
export default function CustomCursor() {
  const tier = useMotionTier();
  const coarsePointer = useIsCoarsePointer();
  const enabled = tier === "full" && !coarsePointer;

  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState<CursorLabel>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    function handleMove(e: PointerEvent) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setVisible(true);
    }

    function handleOver(e: PointerEvent) {
      const el = (e.target as Element)?.closest?.("[data-cursor-label]");
      setLabel((el?.getAttribute("data-cursor-label") as CursorLabel) ?? null);
    }

    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    let frameId: number;
    function raf() {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;
      const node = dotRef.current;
      if (node) {
        node.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frameId);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  const expanded = label !== null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full bg-green transition-[width,height,background-color] duration-200 ease-out"
      style={{
        width: expanded ? 64 : 14,
        height: expanded ? 64 : 14,
        opacity: visible ? 1 : 0,
      }}
    >
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white">
          {label}
        </span>
      )}
    </div>
  );
}
