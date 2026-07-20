"use client";

import { motion } from "framer-motion";
import SplitText from "./motion/SplitText";
import ScrollIndicator from "./motion/ScrollIndicator";
import ConstellationCanvas from "./motion/ConstellationCanvas";
import { useIsCoarsePointer } from "@/lib/useMotionTier";

const EASE = [0.16, 1, 0.3, 1] as const;

const PILLS = ["300+ Sites", "6+ Years", "Wix Partner"];

const PLATFORMS = ["WIX", "SQUARESPACE", "TOAST", "SQUARE", "AMAZON", "GOODREADS"];

/**
 * Full viewport, dark, canvas backed hero for the Portfolio page. The
 * canvas network animation and the platform marquee are both desktop
 * only, gated on useIsCoarsePointer alongside every other motion heavy
 * treatment on the site, mobile visitors get the plain dark gradient
 * layer underneath instead, which is always rendered regardless.
 *
 * The headline uses the existing SplitText primitive per line rather
 * than a bespoke word by word animator, SplitText staggers by
 * character, not by word, so the per line delay and stagger values
 * below are tuned to read as a left to right cascade at roughly the
 * intended pace instead of a literal per word timer.
 */
export default function PortfolioHero() {
  const coarsePointer = useIsCoarsePointer();
  const showAmbient = !coarsePointer;

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-navy-dark py-28">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-navy-dark" />
        {showAmbient && <ConstellationCanvas />}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-navy-dark/70" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
            className="text-base font-bold uppercase tracking-[0.25em] text-green sm:text-lg"
          >
            Selected Work
          </motion.p>

          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <SplitText
              as="div"
              text="Websites. Systems."
              delay={0.35}
              stagger={0.026}
            />
            <SplitText
              as="div"
              text="Results."
              className="text-lime"
              delay={0.6}
              stagger={0.03}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.5, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-8 text-white/70"
          >
            300 plus sites built across Wix, Squarespace, POS, and Author
            Growth.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-3">
            {PILLS.map((pill, i) => (
              <motion.div
                key={pill}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.35 + i * 0.1, duration: 0.4, ease: EASE }}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-green" />
                <span className="text-sm font-semibold text-white">{pill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {showAmbient && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.5, ease: EASE }}
          className="absolute inset-x-0 bottom-24 z-10 overflow-hidden border-y border-white/10 py-3"
        >
          <div className="marquee-group overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
              {[...PLATFORMS, ...PLATFORMS].map((word, i) => (
                <span
                  key={i}
                  className="flex items-center gap-8 text-sm font-semibold uppercase tracking-wide sm:text-base"
                >
                  <span className={i % 2 === 0 ? "text-white/70" : "text-lime"}>
                    {word}
                  </span>
                  <span aria-hidden="true" className="text-green">
                    •
                  </span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <ScrollIndicator />
    </section>
  );
}
