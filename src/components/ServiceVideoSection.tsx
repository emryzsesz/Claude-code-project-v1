"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "./Button";
import VideoBackdrop from "./motion/VideoBackdrop";
import SplitText from "./motion/SplitText";
import { GlobeIcon, PhoneIcon, BookIcon } from "./icons";

const ICONS = {
  globe: GlobeIcon,
  phone: PhoneIcon,
  book: BookIcon,
};

/**
 * One full viewport, video backed section for a single service. Three of
 * these replace the compact service card grid on the home page. Video,
 * a decorative floating square layer, and the text content each move at
 * a different scroll speed for depth: the video slowest, the squares in
 * between, the copy at native scroll speed.
 *
 * Icon takes a key rather than a component reference: this is a client
 * component, and the page that renders it is a server component, which
 * cannot pass a function prop like a component reference across that
 * boundary.
 */
export default function ServiceVideoSection({
  eyebrow,
  title,
  description,
  href,
  ctaLabel,
  icon,
  videoSrc,
  posterSrc,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  icon: keyof typeof ICONS;
  videoSrc: string;
  posterSrc: string;
  align?: "left" | "right";
}) {
  const Icon = ICONS[icon];
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const videoY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-6%", prefersReducedMotion ? "-6%" : "6%"]
  );
  const squaresY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-14%", prefersReducedMotion ? "-14%" : "14%"]
  );

  return (
    <div
      ref={containerRef}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-navy"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-navy-dark">
        <div className="absolute -left-1/4 top-1/4 h-[70%] w-[70%] rounded-full bg-green/25 blur-[120px]" />
        <div className="absolute -right-1/4 -top-1/4 h-[60%] w-[60%] rounded-full bg-navy blur-[100px]" />
      </div>

      <VideoBackdrop src={videoSrc} poster={posterSrc} parallaxY={videoY} breathe />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ y: squaresY }}
      >
        <span className="absolute right-[12%] top-[18%] h-8 w-8 rounded-[3px] bg-lime/30" />
        <span className="absolute right-[20%] top-[30%] h-5 w-5 rounded-[3px] bg-green/40" />
        <span className="absolute left-[10%] bottom-[22%] h-10 w-10 rounded-[3px] bg-green/20" />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-navy/60"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className={`max-w-xl ${align === "right" ? "ml-auto text-right" : ""}`}>
          <span
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-green/15 text-lime ${
              align === "right" ? "ml-auto" : ""
            }`}
          >
            <Icon className="h-6 w-6" />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-lime">
            {eyebrow}
          </p>
          <SplitText
            as="h2"
            text={title}
            trigger="inView"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          />
          <p className="mt-6 text-lg leading-8 text-white/75">{description}</p>
          <div className={`mt-9 flex ${align === "right" ? "justify-end" : ""}`}>
            <Button href={href} variant="primary">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
