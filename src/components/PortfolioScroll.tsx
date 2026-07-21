"use client";

import {
  ComponentType,
  SVGProps,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_PROJECTS, PortfolioProject } from "@/lib/portfolio";
import { GlobeIcon, PhoneIcon, BookIcon, PlayIcon, ExternalLinkIcon } from "./icons";
import { useIsCoarsePointer, useMotionTier } from "@/lib/useMotionTier";

const CARD_GLOW =
  "transition-all duration-200 hover:border-green/60 hover:shadow-[0_0_24px_-4px_rgba(84,126,38,0.45)]";
const CARD_GLOW_NESTED_LINK =
  "transition-all duration-200 has-[a:hover]:border-green/60 has-[a:hover]:shadow-[0_0_24px_-4px_rgba(84,126,38,0.45)]";

function ExternalLinkBadge() {
  return (
    <span
      aria-hidden="true"
      className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-navy/70 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    >
      <ExternalLinkIcon className="h-3.5 w-3.5" />
    </span>
  );
}

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

/**
 * YouTube thumbnails are not guaranteed to exist at maxresdefault, some
 * videos only ever get the lower resolutions generated, so this steps
 * down to hqdefault, which YouTube always generates, before finally
 * falling back to the plain category icon.
 */
function VideoThumb({ project }: { project: PortfolioProject }) {
  const [tier, setTier] = useState<"maxres" | "hq" | "failed">("maxres");
  const Icon = categoryIcon[project.category];

  return (
    <a
      href={`https://youtu.be/${project.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch the ${project.title} video ad on YouTube`}
      data-cursor-label="play"
      className="group absolute inset-0"
    >
      {tier !== "failed" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://img.youtube.com/vi/${project.youtubeId}/${tier === "maxres" ? "maxresdefault" : "hqdefault"}.jpg`}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={() => setTier(tier === "maxres" ? "hq" : "failed")}
        />
      ) : (
        <Icon className="absolute inset-0 m-auto h-10 w-10 text-white/70" />
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors duration-200 group-hover:bg-navy/60">
        <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
          <PlayIcon className="ml-0.5 h-5 w-5" />
        </span>
      </div>
      <ExternalLinkBadge />
    </a>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const Icon = categoryIcon[project.category];
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image) && !imageFailed;
  const showVideo = Boolean(project.youtubeId);

  const cardBody = (
    <>
      <div
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${categoryTint[project.category]}`}
      >
        {showVideo ? (
          <VideoThumb project={project} />
        ) : showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Icon className="h-10 w-10 text-white/70" />
        )}
        {project.url && <ExternalLinkBadge />}
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-green">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-navy">{project.title}</h3>
        {project.client && (
          <p className="mt-1 text-sm font-medium text-navy/50">{project.client}</p>
        )}
        <p className="mt-2 text-sm leading-6 text-navy/70">{project.summary}</p>
      </div>
    </>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit the live ${project.title} website`}
        data-cursor-label="view"
        className={`group block h-full overflow-hidden rounded-2xl border border-border-soft bg-white ${CARD_GLOW}`}
      >
        {cardBody}
      </a>
    );
  }

  return (
    <div
      className={`h-full overflow-hidden rounded-2xl border border-border-soft bg-white ${showVideo ? CARD_GLOW_NESTED_LINK : ""}`}
    >
      {cardBody}
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
