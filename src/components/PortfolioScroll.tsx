"use client";

import { ComponentType, SVGProps, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_PROJECTS, PortfolioProject } from "@/lib/portfolio";
import { GlobeIcon, PhoneIcon, BookIcon } from "./icons";
import { useIsCoarsePointer, useMotionTier } from "@/lib/useMotionTier";

const categoryIcon: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Wix: GlobeIcon,
  Squarespace: GlobeIcon,
  POS: PhoneIcon,
  "Author Growth": BookIcon,
};

const categoryTint: Record<string, string> = {
  Wix: "from-navy to-navy-dark",
  Squarespace: "from-navy-dark to-navy",
  POS: "from-green to-green-dark",
  "Author Growth": "from-green-dark to-navy",
};

function ProjectCard({ project }: { project: PortfolioProject }) {
  const Icon = categoryIcon[project.category];
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-border-soft bg-white">
      <div
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${categoryTint[project.category]}`}
      >
        <Icon className="h-10 w-10 text-white/70" />
        <span className="absolute left-3 top-3 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
          Placeholder
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-green">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-navy">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-navy/70">{project.summary}</p>
      </div>
    </div>
  );
}

/**
 * Pinned horizontal scroll track for full tier, fine pointer visitors:
 * the section holds scroll for an extended vertical range while the card
 * track translates sideways to match. Everyone else, touch devices and
 * reduced motion alike, gets a plain horizontally scrollable snap row
 * instead, since scroll jacking on a phone or for a motion sensitive
 * visitor is a worse experience than just letting them swipe.
 */
export default function PortfolioScroll() {
  const tier = useMotionTier();
  const coarsePointer = useIsCoarsePointer();
  const wantsPin = tier === "full" && !coarsePointer;

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    if (!wantsPin) return;
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      setShift(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [wantsPin]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  if (!wantsPin) {
    return (
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-8">
        {PORTFOLIO_PROJECTS.map((project) => (
          <div key={project.id} className="w-[80vw] shrink-0 snap-start sm:w-[380px]">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${Math.max(220, PORTFOLIO_PROJECTS.length * 45)}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 px-6 sm:px-8">
          {PORTFOLIO_PROJECTS.map((project) => (
            <div key={project.id} className="w-[80vw] shrink-0 sm:w-[420px]">
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
