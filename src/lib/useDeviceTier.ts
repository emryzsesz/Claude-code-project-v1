"use client";

import { useSyncExternalStore } from "react";

export type DeviceTier = "full" | "lite" | "off";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

function computeTier(): DeviceTier {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "off";
  }
  if (!hasWebGL()) {
    return "off";
  }

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as NavigatorWithMemory).deviceMemory;

  if (coarsePointer) return "lite";
  if (cores <= 2) return "lite";
  if (typeof memory === "number" && memory <= 2) return "lite";

  return "full";
}

function subscribe(callback: () => void) {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerQuery = window.matchMedia("(pointer: coarse)");

  reducedMotionQuery.addEventListener("change", callback);
  pointerQuery.addEventListener("change", callback);

  return () => {
    reducedMotionQuery.removeEventListener("change", callback);
    pointerQuery.removeEventListener("change", callback);
  };
}

function getSnapshot(): DeviceTier {
  return computeTier();
}

function getServerSnapshot(): DeviceTier {
  return "off";
}

/**
 * Decides how much WebGL, if any, a visitor should get. Reduced motion
 * or no WebGL support always means off, full stop. A touch device
 * (essentially every phone and tablet, which is most of this site's
 * traffic) or a clearly underpowered desktop gets the lite tier: no
 * canvas, just the static CSS fallback that already exists for every
 * WebGL section. Everyone else gets the full experience.
 *
 * Built on useSyncExternalStore so the server snapshot ("off", which the
 * server cannot look past anyway) and the first client render always
 * agree, and React reconciles the real tier in right after hydration
 * with no mismatch. Consuming components should always render their CSS
 * fallback as the base layer and only mount a canvas on top once this
 * reports "full", never branch their own JSX structure on it directly.
 */
export function useDeviceTier(): DeviceTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
