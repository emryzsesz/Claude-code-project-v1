"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Like framer motion's useReducedMotion, but safe to use for values that
 * feed directly into a style prop on a scroll linked animation (useTransform
 * chains that MotionConfig's reducedMotion setting does not reach, since
 * that setting only governs framer's own animate and whileInView
 * controls, not manually derived MotionValues).
 *
 * Built on useSyncExternalStore, which is the mechanism React provides
 * specifically for reading external state that can differ between the
 * server render and the client, without producing a hydration mismatch.
 * The server snapshot is always false, matching what the server renders,
 * and React reconciles the real value in right after hydration.
 */
export function useSafeReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
