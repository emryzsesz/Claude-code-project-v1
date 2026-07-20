import type { Metadata } from "next";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import PortfolioScroll from "@/components/PortfolioScroll";
import PixelAccent from "@/components/PixelAccent";
import { HeroReveal, HeroRevealItem } from "@/components/motion/HeroReveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Emryz Digital work by category: Wix, Squarespace, POS solutions, and author growth.",
};

export default function PortfolioPage() {
  return (
    <>
      <Section className="overflow-hidden pb-10 pt-16 sm:pt-20">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/3 h-[60%] w-[60%] animate-breathe rounded-full bg-green/15 blur-[100px]" />
          <div
            className="absolute -right-1/4 top-0 h-[55%] w-[55%] animate-breathe rounded-full bg-navy/10 blur-[110px]"
            style={{ animationDelay: "-5s" }}
          />
          <div
            className="absolute -bottom-1/4 left-1/3 h-[50%] w-[50%] animate-breathe rounded-full bg-lime/20 blur-[120px]"
            style={{ animationDelay: "-9s" }}
          />
        </div>
        <PixelAccent corner="top-right" />
        <HeroReveal>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <HeroRevealItem>
              <p className="text-sm font-semibold uppercase tracking-widest text-green">
                Portfolio
              </p>
            </HeroRevealItem>
            <HeroRevealItem className="mt-4">
              <h1 className="text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                Work across websites, POS solutions, and author growth
              </h1>
            </HeroRevealItem>
            <HeroRevealItem className="mt-6">
              <p className="text-lg leading-8 text-navy/70">
                Scroll to move through real projects across Wix, Squarespace,
                and POS work, with a couple of author growth spots still
                being filled in.
              </p>
            </HeroRevealItem>
          </div>
        </HeroReveal>
      </Section>

      <Section containerClassName="max-w-none px-0 sm:px-0">
        <PortfolioScroll />
      </Section>

      <CTASection
        heading="Want your project on this page?"
        body="Tell us what you are building and we will show you exactly how we can help."
      />
    </>
  );
}
