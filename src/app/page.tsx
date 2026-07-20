import Button from "@/components/Button";
import Section from "@/components/Section";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";
import HeroBackground from "@/components/HeroBackground";
import ServiceVideoSection from "@/components/ServiceVideoSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import StatsStrip from "@/components/StatsStrip";
import { HeroReveal, HeroRevealItem } from "@/components/motion/HeroReveal";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import ScrollIndicator from "@/components/motion/ScrollIndicator";
import SectionReveal, {
  SectionTransitionStyle,
} from "@/components/motion/SectionReveal";
import PixelAccent from "@/components/PixelAccent";
import { CheckIcon } from "@/components/icons";

const services = [
  {
    href: "/services/web-design",
    icon: "globe" as const,
    eyebrow: "Web Design and Redesign",
    title: "Websites built on Wix and Squarespace",
    description:
      "We design new websites and rebuild tired ones on Wix and Squarespace. Clean layouts, clear messaging, and pages built to turn visitors into customers.",
    ctaLabel: "Explore Web Design",
    videoSrc: "/video/web-design.mp4",
    posterSrc: "/video/web-design-poster.jpg",
  },
  {
    href: "/services/pos-solutions",
    icon: "phone" as const,
    eyebrow: "POS Solutions",
    title: "Front counters that run on Toast and Square",
    description:
      "We set up and configure Toast and Square so your front counter runs smoothly. Menus, catalogs, staff training, and reporting, all handled for you.",
    ctaLabel: "Explore POS Solutions",
    videoSrc: "/video/pos-solutions.mp4",
    posterSrc: "/video/pos-solutions-poster.jpg",
  },
  {
    href: "/services/author-growth",
    icon: "book" as const,
    eyebrow: "Author Growth",
    title: "Readers found for authors who write books",
    description:
      "We help authors build an audience and sell more books. Author websites, launch campaigns, and a promotion plan built around your writing career.",
    ctaLabel: "Explore Author Growth",
    videoSrc: "/video/author-growth.mp4",
    posterSrc: "/video/author-growth-poster.jpg",
  },
];

const transitionStyles: SectionTransitionStyle[] = ["wipe", "radial", "curtain"];

const reasons = [
  "Platform specialists, not generalists. We focus on Wix, Squarespace, Toast, and Square, so we know every setting and every workaround.",
  "Real communication. You work directly with the person doing the work, not a support queue.",
  "Built to last. We set things up so your team can manage them once we hand off the keys.",
  "Clear pricing. You know the full cost before we start a single task.",
];

const steps = [
  {
    title: "Discovery Call",
    description:
      "We learn about your business, your goals, and what is not working today.",
  },
  {
    title: "Plan and Proposal",
    description:
      "You get a clear scope, timeline, and price before any work begins.",
  },
  {
    title: "Build",
    description:
      "We design, build, and test everything, with regular updates along the way.",
  },
  {
    title: "Launch and Support",
    description:
      "We launch your project and stay available for training and ongoing support.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[640px] items-center overflow-hidden py-28 sm:min-h-[720px]">
        <HeroBackground />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8">
          <HeroReveal>
            <div className="max-w-2xl">
              <HeroRevealItem>
                <p className="text-sm font-semibold uppercase tracking-widest text-lime">
                  Websites. POS Solutions. Growth.
                </p>
              </HeroRevealItem>
              <HeroRevealItem className="mt-4">
                <SplitText
                  as="h1"
                  text="Digital work that moves your business forward"
                  className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
                  delay={0.3}
                  stagger={0.012}
                />
              </HeroRevealItem>
              <HeroRevealItem className="mt-6">
                <p className="max-w-xl text-lg leading-8 text-white/75">
                  Emryz Digital builds fast websites on Wix and Squarespace, sets
                  up dependable POS solutions on Toast and Square, and helps
                  authors reach more readers. One team, three ways to grow.
                </p>
              </HeroRevealItem>
              <HeroRevealItem className="mt-9">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button href="/contact" variant="primary">
                    Start a Project
                  </Button>
                  <Button href="#services" variant="ghost-light">
                    See Our Services
                  </Button>
                </div>
              </HeroRevealItem>
            </div>
          </HeroReveal>
        </div>
        <ScrollIndicator />
      </section>

      <MarqueeStrip />

      <div id="services">
        {services.map((service, i) => (
          <SectionReveal key={service.href} style={transitionStyles[i % 3]}>
            <ServiceVideoSection
              eyebrow={service.eyebrow}
              title={service.title}
              description={service.description}
              href={service.href}
              ctaLabel={service.ctaLabel}
              icon={service.icon}
              videoSrc={service.videoSrc}
              posterSrc={service.posterSrc}
              align={i % 2 === 1 ? "right" : "left"}
            />
          </SectionReveal>
        ))}
      </div>

      <Section className="bg-navy">
        <StatsStrip />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Why businesses choose Emryz Digital
            </h2>
            <p className="mt-4 text-base leading-7 text-navy/70">
              We keep our focus narrow on purpose. That focus means we know
              our tools well and we do not spend your budget learning on the
              job.
            </p>
          </Reveal>
          <RevealGroup className="space-y-6" role="list">
            {reasons.map((reason) => (
              <RevealItem key={reason} className="flex gap-4" role="listitem">
                <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-green/10 text-green">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="text-base leading-7 text-navy/80">
                  {reason}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section className="overflow-hidden bg-mist">
        <PixelAccent corner="bottom-left" />
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            How we work
          </h2>
          <p className="mt-4 text-base leading-7 text-navy/70">
            A simple process, from the first call to the day your project
            goes live and beyond.
          </p>
        </Reveal>
        <div className="mt-14">
          <ProcessSteps steps={steps} />
        </div>
      </Section>

      <CTASection
        heading="Ready to get started?"
        body="Tell us about your business and we will show you exactly how we can help."
      />
    </>
  );
}
