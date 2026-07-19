"use client";

import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Puts framer motion in charge of respecting prefers-reduced-motion
 * everywhere in the tree. This is deliberately the only place that reads
 * the user's motion preference for structural purposes. Individual
 * components should never branch their own JSX between a motion element
 * and a plain element based on useReducedMotion, since that value can
 * differ between the server render and the first client render and
 * produces a hydration mismatch. Components can still call
 * useReducedMotion to choose animation values, as long as the element
 * type stays the same either way.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
