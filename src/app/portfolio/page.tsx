import type { Metadata } from "next";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import PortfolioScroll from "@/components/PortfolioScroll";
import PortfolioHero from "@/components/PortfolioHero";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Emryz Digital work by category: Wix, Squarespace, POS solutions, and author growth.",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />

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
