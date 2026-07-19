"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import HeroShaderScene from "./HeroShaderScene";

/**
 * Only ever mounted client side, after useDeviceTier has resolved to
 * "full" and the hero has scrolled near the viewport, via a dynamic
 * import with ssr false in HeroBackground. Everything three.js related
 * lives behind that dynamic import boundary, so none of it is part of
 * the initial bundle for anyone who never sees this canvas.
 */
export default function HeroShaderCanvas({
  onReady,
}: {
  onReady?: () => void;
}) {
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    function handleVisibility() {
      setTabVisible(document.visibilityState === "visible");
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      frameloop={tabVisible ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
      onCreated={() => onReady?.()}
    >
      <Suspense fallback={null}>
        <HeroShaderScene />
      </Suspense>
    </Canvas>
  );
}
