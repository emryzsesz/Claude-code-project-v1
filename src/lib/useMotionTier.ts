"use client";

import { useSyncExternalStore } from "react";

export type MotionTier = "full" | "reduced";

function computeTier(): MotionTier {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "reduced";
  }
  return "full";
}

function subscribe(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot(): MotionTier {
  return computeTier();
}

function getServerSnapshot(): MotionTier {
  return "reduced";
}

/**
 * Single source of truth for the one motion decision that matters across
 * Lenis, the loading screen, video autoplay, and parallax: does this
 * visitor want reduced motion. Server snapshot is always "reduced" so
 * hydration never mismatches, the real value resolves right after mount.
 */
export function useMotionTier(): MotionTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function computeCoarsePointer(): boolean {
  return window.matchMedia("(pointer: coarse)").matches;
}

function subscribePointer(callback: () => void) {
  const query = window.matchMedia("(pointer: coarse)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getPointerServerSnapshot(): boolean {
  return true;
}

/**
 * True for touch and other coarse pointer devices. Used to decide the
 * video versus poster split and the Lenis lerp value. Server snapshot
 * defaults to true (the safer, lighter fallback) so hydration never
 * mismatches.
 */
export function useIsCoarsePointer(): boolean {
  return useSyncExternalStore(
    subscribePointer,
    computeCoarsePointer,
    getPointerServerSnapshot
  );
}
