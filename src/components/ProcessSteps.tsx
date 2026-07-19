"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type Step = {
  title: string;
  description: string;
};

function StepNumber({
  index,
  total,
  progress,
  reduce,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
  reduce: boolean;
}) {
  const threshold = total > 1 ? index / (total - 1) : 0;
  const scale = useTransform(progress, [Math.max(threshold - 0.16, 0), threshold], [0.55, 1]);
  const bg = useTransform(
    progress,
    [Math.max(threshold - 0.05, 0), threshold],
    ["#0f2d4c", "#547e26"]
  );

  return (
    <motion.span
      style={{ scale: reduce ? 1 : scale, backgroundColor: reduce ? "#547e26" : bg }}
      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
    >
      {index + 1}
    </motion.span>
  );
}

export default function ProcessSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.15"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 34 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div
        aria-hidden="true"
        className="absolute inset-x-5 top-5 hidden h-[2px] bg-border-soft lg:block"
      >
        <motion.div
          className="h-full origin-left bg-green"
          style={{ scaleX: reduce ? 1 : lineScale }}
        />
      </div>
      {steps.map((step, index) => (
        <li key={step.title} className="relative pl-14">
          <div className="absolute left-0 top-0">
            <StepNumber index={index} total={steps.length} progress={progress} reduce={!!reduce} />
          </div>
          <h3 className="text-lg font-semibold text-navy">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-navy/70">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
