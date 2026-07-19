"use client";

import { useState, useMemo, ComponentType, SVGProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_PROJECTS,
  PortfolioCategory,
} from "@/lib/portfolio";
import { GlobeIcon, PhoneIcon, BookIcon } from "./icons";

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

export default function PortfolioGrid() {
  const [active, setActive] = useState<PortfolioCategory>("All");

  const projects = useMemo(
    () =>
      active === "All"
        ? PORTFOLIO_PROJECTS
        : PORTFOLIO_PROJECTS.filter((p) => p.category === active),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {PORTFOLIO_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              active === category ? "text-white" : "text-navy hover:text-green"
            }`}
          >
            {active === category && (
              <motion.span
                layoutId="portfolio-pill"
                className="absolute inset-0 rounded-full bg-green"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{category}</span>
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project) => {
            const Icon = categoryIcon[project.category];
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group overflow-hidden rounded-2xl border border-border-soft bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-16px_rgba(15,45,76,0.22)]"
              >
                <div
                  className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${categoryTint[project.category]}`}
                >
                  <Icon className="h-10 w-10 text-white/70 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                    Placeholder
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-green">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-navy">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-navy/70">
                    {project.summary}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
