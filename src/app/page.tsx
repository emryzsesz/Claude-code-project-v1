import Image from "next/image";
import Button from "@/components/Button";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";
import { GlobeIcon, PhoneIcon, BookIcon, CheckIcon } from "@/components/icons";

const services = [
  {
    href: "/services/web-design",
    icon: GlobeIcon,
    title: "Web Design and Redesign",
    description:
      "We design new websites and rebuild tired ones on Wix and Squarespace. Clean layouts, clear messaging, and pages built to turn visitors into customers.",
  },
  {
    href: "/services/pos-solutions",
    icon: PhoneIcon,
    title: "POS Solutions",
    description:
      "We set up and configure Toast and Square so your front counter runs smoothly. Menus, catalogs, staff training, and reporting, all handled for you.",
  },
  {
    href: "/services/author-growth",
    icon: BookIcon,
    title: "Author Growth",
    description:
      "We help authors build an audience and sell more books. Author websites, launch campaigns, and a promotion plan built around your writing career.",
  },
];

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
      <Section className="pb-12 pt-16 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-green">
              Websites. POS Solutions. Growth.
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              Digital work that moves your business forward
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-navy/70">
              Emryz Digital builds fast websites on Wix and Squarespace, sets
              up dependable POS solutions on Toast and Square, and helps
              authors reach more readers. One team, three ways to grow.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                Start a Project
              </Button>
              <Button href="#services" variant="ghost">
                See Our Services
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="/brand/emryz-digital-logo-lockup.webp"
              alt="Emryz Digital logo, websites, POS solutions, growth"
              width={1536}
              height={1024}
              priority
              className="w-full max-w-lg rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </Section>

      <Section id="services" className="bg-mist">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
            Three ways we help you grow
          </h2>
          <p className="mt-4 text-base leading-7 text-navy/70">
            Every business is different, so we focus on a short list of
            platforms we know inside and out, instead of trying to do
            everything for everyone.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
              Why businesses choose Emryz Digital
            </h2>
            <p className="mt-4 text-base leading-7 text-navy/70">
              We keep our focus narrow on purpose. That focus means we know
              our tools well and we do not spend your budget learning on the
              job.
            </p>
          </div>
          <ul className="space-y-6">
            {reasons.map((reason) => (
              <li key={reason} className="flex gap-4">
                <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-green/10 text-green">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="text-base leading-7 text-navy/80">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-mist">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
            How we work
          </h2>
          <p className="mt-4 text-base leading-7 text-navy/70">
            A simple process, from the first call to the day your project
            goes live and beyond.
          </p>
        </div>
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
