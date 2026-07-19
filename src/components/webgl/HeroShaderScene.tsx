"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Vignette, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import "./heroFlowMaterial";

const smoothedMouse = new THREE.Vector2(0.5, 0.5);
const targetMouse = new THREE.Vector2(0.5, 0.5);

function FlowPlane() {
  const materialRef = useRef<THREE.ShaderMaterial & { u_time: number }>(null);
  const { viewport, size } = useThree();

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    material.u_time += delta;
    smoothedMouse.lerp(targetMouse, Math.min(delta * 3, 1));
    (material.uniforms.u_mouse.value as THREE.Vector2).copy(smoothedMouse);
    (material.uniforms.u_resolution.value as THREE.Vector2).set(
      size.width,
      size.height
    );
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-expect-error custom shader material registered via extend */}
      <heroFlowMaterial ref={materialRef} depthTest={false} depthWrite={false} />
    </mesh>
  );
}

function PointerTracker() {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    function handlePointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      targetMouse.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height
      );
    }

    canvas.addEventListener("pointermove", handlePointerMove);
    return () => canvas.removeEventListener("pointermove", handlePointerMove);
  }, [gl]);

  return null;
}

export default function HeroShaderScene() {
  return (
    <>
      <FlowPlane />
      <PointerTracker />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.35} luminanceThreshold={0.55} mipmapBlur radius={0.6} />
        <Vignette eskil={false} offset={0.15} darkness={0.65} />
      </EffectComposer>
    </>
  );
}
