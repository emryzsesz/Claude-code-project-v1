import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import FeatureCards from "@/components/FeatureCards";
import ComparePanel from "@/components/ComparePanel";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionReveal, {
  SectionTransitionStyle,
} from "@/components/motion/SectionReveal";

export const metadata: Metadata = {
  title: "Web Design and Redesign on Wix and Squarespace",
  description:
    "Emryz Digital designs new websites and rebuilds existing ones on Wix and Squarespace, with clean layouts and pages built to convert.",
};

const included = [
  "Full site design and build on Wix or Squarespace",
  "Redesign of an existing site without losing your search rankings",
  "Copywriting support so your pages say the right thing",
  "A mobile layout for every page, not just the homepage",
  "Contact forms, booking tools, and online store setup where needed",
  "Training so your team can make simple updates without calling us",
];

const steps = [
  {
    title: "Discovery Call",
    description:
      "We review your current site, if you have one, and talk through your goals and audience.",
  },
  {
    title: "Plan and Proposal",
    description:
      "You receive a sitemap, a design direction, and a fixed price before work begins.",
  },
  {
    title: "Design and Build",
    description:
      "We design every page, build it on your platform, and test it across phones, tablets, and desktops.",
  },
  {
    title: "Launch and Training",
    description:
      "We publish the site and walk your team through how to make simple edits on your own.",
  },
];

const transitionStyles: SectionTransitionStyle[] = ["wipe", "radial", "curtain"];

export default function WebDesignPage() {
  return (
    <>
      <PageHero
        eyebrow="Web Solutions"
        title="Web design and redesign on Wix and Squarespace"
        description="A new website or a full refresh of the one you already have. Built on the platform that fits your business, with a design that looks as good on a phone as it does on a desktop monitor."
        videoSrc="/video/web-design.mp4"
        posterSrc="/video/web-design-poster.jpg"
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />

      <SectionReveal style={transitionStyles[0]}>
        <Section className="bg-mist">
          <Reveal>
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
              What you get
            </h2>
          </Reveal>
          <div className="mt-10">
            <FeatureCards items={included} />
          </div>
        </Section>
      </SectionReveal>

      <SectionReveal style={transitionStyles[1]}>
        <Section>
          <Reveal>
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
              Who this is for
            </h2>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-6 text-base leading-7 text-navy/70 sm:grid-cols-3">
            <RevealItem>
              <p>
                New businesses that need a first website and want it done
                right from the start.
              </p>
            </RevealItem>
            <RevealItem>
              <p>
                Established businesses whose site looks outdated, loads
                slowly, or no longer matches the brand.
              </p>
            </RevealItem>
            <RevealItem>
              <p>
                Businesses moving from another platform to Wix or
                Squarespace for better tools or lower costs.
              </p>
            </RevealItem>
          </RevealGroup>
        </Section>
      </SectionReveal>

      <SectionReveal style={transitionStyles[2]}>
        <Section className="bg-mist">
          <Reveal>
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
              Platforms
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-navy/70">
              Both platforms build fast, reliable websites, and we work in
              each one every week. Here is how we help you choose.
            </p>
          </Reveal>
          <div className="mt-10">
            <ComparePanel
              columns={[
                {
                  name: "Wix",
                  description:
                    "A strong fit for businesses that want more built in apps, booking systems, and flexibility as the site grows over time.",
                },
                {
                  name: "Squarespace",
                  description:
                    "A strong fit for businesses that want a clean, editorial look with a simpler setup and fewer moving parts to manage.",
                },
              ]}
              note="During your discovery call we will tell you which platform fits your goals and budget. We recommend the one that is right for you, not the one that is easier for us."
            />
          </div>
        </Section>
      </SectionReveal>

      <Section>
        <Reveal>
          <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
            How it works
          </h2>
        </Reveal>
        <div className="mt-12">
          <ProcessSteps steps={steps} />
        </div>
      </Section>

      <CTASection
        heading="Ready for a website that works as hard as you do?"
        body="Tell us about your business and current site, and we will show you exactly what a new or refreshed site could look like."
      />
    </>
  );
}
