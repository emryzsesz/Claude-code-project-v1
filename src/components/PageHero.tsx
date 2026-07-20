"use client";

import { useRef } from "react";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";
import VideoBackdrop from "./motion/VideoBackdrop";
import SplitText from "./motion/SplitText";
import Button from "./Button";
import { HeroReveal, HeroRevealItem } from "./motion/HeroReveal";
import { useIsCoarsePointer } from "@/lib/useMotionTier";

/**
 * Full viewport, video backed page hero shared by About, Contact, and
 * the three service detail pages. Video is optional: pages that do not
 * name a matching clip simply get the permanent navy gradient layer on
 * its own, which was always designed to stand alone.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  videoSrc,
  posterSrc,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  videoSrc?: string;
  posterSrc?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", prefersReducedMotion || coarsePointer ? "0%" : "18%"]
  );

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-[560px] items-center overflow-hidden py-28 sm:min-h-[680px]"
      data-cursor-label={videoSrc ? "play" : undefined}
    >
      <div className="absolute inset-0 overflow-hidden bg-navy">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute -left-1/4 -top-1/3 h-[70%] w-[70%] rounded-full bg-green/30 blur-[110px]" />
          <div className="absolute -right-1/4 top-1/4 h-[60%] w-[60%] rounded-full bg-navy-dark blur-[100px]" />
          <div className="absolute -bottom-1/3 left-1/3 h-[65%] w-[65%] rounded-full bg-lime/20 blur-[120px]" />
        </div>

        {videoSrc && (
          <VideoBackdrop src={videoSrc} poster={posterSrc} parallaxY={parallaxY} />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-navy/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 10%, transparent 40%, rgba(8,27,46,0.6) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8">
        <HeroReveal>
          <div className="max-w-2xl">
            <HeroRevealItem>
              <p className="text-sm font-semibold uppercase tracking-widest text-lime">
                {eyebrow}
              </p>
            </HeroRevealItem>
            <HeroRevealItem className="mt-4">
              <SplitText
                as="h1"
                text={title}
                className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
                delay={0.2}
                stagger={0.012}
              />
            </HeroRevealItem>
            <HeroRevealItem className="mt-6">
              <p className="max-w-xl text-lg leading-8 text-white/75">{description}</p>
            </HeroRevealItem>
            {ctaLabel && ctaHref && (
              <HeroRevealItem className="mt-9">
                <Button href={ctaHref} variant="primary">
                  {ctaLabel}
                </Button>
              </HeroRevealItem>
            )}
          </div>
        </HeroReveal>
      </div>
    </section>
  );
}
