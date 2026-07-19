import type { Metadata } from "next";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import PortfolioGrid from "@/components/PortfolioGrid";
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
        <PixelAccent corner="top-right" />
        <HeroReveal>
          <div className="mx-auto max-w-3xl text-center">
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
                Filter by category to see the kind of work we do in each
                area. The entries below are placeholders, marked clearly,
                ready to be swapped for real projects as they launch.
              </p>
            </HeroRevealItem>
          </div>
        </HeroReveal>
      </Section>

      <Section>
        <PortfolioGrid />
      </Section>

      <CTASection
        heading="Want your project on this page?"
        body="Tell us what you are building and we will show you exactly how we can help."
      />
    </>
  );
}
