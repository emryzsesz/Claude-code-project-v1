import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PixelAccent from "@/components/PixelAccent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Emryz Digital is a small team focused on websites, POS solutions, and author growth. Learn about our approach and the platforms we work in.",
};

const platforms = [
  "Wix",
  "Squarespace",
  "Toast",
  "Square",
  "Amazon",
  "Goodreads",
];

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

export default function AboutPage() {
  return (
    <>
      <Section className="pb-12 pt-16 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-green">
              About Emryz Digital
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              Websites. POS solutions. Growth.
            </h1>
            <p className="mt-6 text-lg leading-8 text-navy/70">
              Emryz Digital is a small team built around one idea. Small
              businesses and independent authors deserve the same level of
              digital support that large companies take for granted.
            </p>
            <p className="mt-4 text-base leading-7 text-navy/70">
              We focus on three areas where we can make the biggest
              difference: websites, point of sale systems, and book
              promotion. That focus means we know our tools well and we do
              not waste your time or your budget learning on the job.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex justify-center lg:justify-end">
            <Image
              src="/brand/emryz-digital-icon-mark.webp"
              alt="Emryz Digital icon mark"
              width={1536}
              height={1024}
              className="w-full max-w-sm rounded-2xl shadow-xl"
            />
          </Reveal>
        </div>
      </Section>

      <Section className="overflow-hidden bg-mist">
        <PixelAccent corner="top-right" />
        <Reveal>
          <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
            How we approach the work
          </h2>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-10 sm:grid-cols-2">
          {values.map((value) => (
            <RevealItem key={value.title}>
              <h3 className="text-xl font-semibold text-navy">
                {value.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-navy/70">
                {value.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <Reveal>
          <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
            Platforms we work in every week
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-navy/70">
            We keep this list short so we can stay genuinely good at each one,
            rather than spreading our attention across every platform on the
            market.
          </p>
        </Reveal>
        <RevealGroup
          className="mt-10 flex flex-wrap gap-3"
          role="list"
        >
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

      <CTASection
        heading="Want to work with us?"
        body="Reach out and tell us what you are working on. We will let you know honestly whether we are the right fit."
      />
    </>
  );
}
