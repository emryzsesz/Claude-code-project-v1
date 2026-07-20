import type { Metadata } from "next";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import StatsSection from "@/components/StatsSection";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionReveal, {
  SectionTransitionStyle,
} from "@/components/motion/SectionReveal";
import PixelAccent from "@/components/PixelAccent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Emryz Digital is a small team focused on websites, POS solutions, and author growth. Learn about our approach and the platforms we work in.",
};

const platforms = ["Wix", "Squarespace", "Toast", "Square", "Amazon", "Goodreads"];

const values = [
  {
    title: "Depth over breadth",
    description:
      "We chose three focus areas on purpose. That focus lets us go deep on Wix, Squarespace, Toast, and Square instead of spreading thin across dozens of tools.",
  },
  {
    title: "Plain language",
    description:
      "We explain what we are doing and why, in terms that make sense even if you have never touched a website builder or a POS dashboard before.",
  },
  {
    title: "Ownership at handoff",
    description:
      "Everything we build is set up so you own it fully. You get the logins, the training, and the ability to run things without us if you ever choose to.",
  },
  {
    title: "Steady follow through",
    description:
      "A launch date is a milestone, not a finish line. We stay available after go live, because that is when most of the real questions show up.",
  },
];

const transitionStyles: SectionTransitionStyle[] = ["wipe", "radial", "curtain"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Emryz Digital"
        title="Websites. POS solutions. Growth."
        description="A small team built around one idea. Small businesses and independent authors deserve the same level of digital support that large companies take for granted."
        videoSrc="/video/author-growth.mp4"
        posterSrc="/video/author-growth-poster.jpg"
      />

      <SectionReveal style={transitionStyles[0]}>
        <Section className="overflow-hidden bg-mist">
          <PixelAccent corner="top-right" />
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-green">
              Who we are
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-navy sm:text-4xl">
              What drives the work
            </h2>
            <p className="mt-4 text-base leading-7 text-navy/70">
              We focus on three areas where we can make the biggest
              difference: websites, point of sale systems, and book
              promotion. That focus means we know our tools well and we do
              not waste your time or your budget learning on the job.
            </p>
          </Reveal>
          <RevealGroup className="mt-14 grid gap-10 sm:grid-cols-2">
            {values.map((value) => (
              <RevealItem key={value.title}>
                <h3 className="text-xl font-semibold text-navy">{value.title}</h3>
                <p className="mt-3 text-base leading-7 text-navy/70">
                  {value.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      </SectionReveal>

      <SectionReveal style={transitionStyles[1]}>
        <StatsSection />
      </SectionReveal>

      <SectionReveal style={transitionStyles[2]}>
        <Section>
          <Reveal>
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
              Platforms we work in every week
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-navy/70">
              We keep this list short so we can stay genuinely good at each
              one, rather than spreading our attention across every platform
              on the market.
            </p>
          </Reveal>
          <RevealGroup className="mt-10 flex flex-wrap gap-3" role="list">
            {platforms.map((platform) => (
              <RevealItem
                key={platform}
                role="listitem"
                className="rounded-full border border-border-soft bg-white px-6 py-3 text-sm font-semibold text-navy"
              >
                {platform}
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      </SectionReveal>

      <CTASection
        heading="Want to work with us?"
        body="Reach out and tell us what you are working on. We will let you know honestly whether we are the right fit."
      />
    </>
  );
}
