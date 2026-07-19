import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import Section from "@/components/Section";
import IncludedList from "@/components/IncludedList";
import ComparePanel from "@/components/ComparePanel";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "POS Solutions on Toast and Square",
  description:
    "Emryz Digital sets up and configures POS solutions on Toast and Square, including menus, staff training, online ordering, and reporting.",
};

const included = [
  "Full system setup and configuration on Toast or Square",
  "Menu and catalog building, including modifiers, categories, and pricing",
  "Staff account setup and training so your team is ready on day one",
  "Online ordering and delivery integration",
  "Reporting setup so you can see sales, labor, and trends clearly",
  "Ongoing support whenever your settings need to change",
];

const steps = [
  {
    title: "Discovery Call",
    description:
      "We learn how your business runs day to day, from order flow to staffing to reporting needs.",
  },
  {
    title: "Plan and Proposal",
    description:
      "You receive a setup plan and a fixed price before we touch your account.",
  },
  {
    title: "Build and Configure",
    description:
      "We build your menu or catalog, set up staff accounts, and connect the tools you already use.",
  },
  {
    title: "Training and Support",
    description:
      "We train your team on the system and stay available as your business changes.",
  },
];

export default function PosSolutionsPage() {
  return (
    <>
      <ServiceHero
        eyebrow="POS Solutions"
        title="POS solutions on Toast and Square"
        description="Restaurants, cafes, retail shops, and service businesses trust Toast and Square to run their front counter. We set the system up right the first time, so you spend less time fighting technology and more time serving customers."
      />

      <Section className="bg-mist">
        <Reveal>
          <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
            What is included
          </h2>
        </Reveal>
        <div className="mt-10">
          <IncludedList items={included} />
        </div>
      </Section>

      <Section>
        <Reveal>
          <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
            Who this is for
          </h2>
        </Reveal>
        <RevealGroup className="mt-8 grid gap-6 text-base leading-7 text-navy/70 sm:grid-cols-3">
          <RevealItem>
            <p>
              New restaurants, cafes, and shops that need a POS system set up
              before opening day.
            </p>
          </RevealItem>
          <RevealItem>
            <p>
              Businesses switching providers and looking for a smoother setup
              than they had before.
            </p>
          </RevealItem>
          <RevealItem>
            <p>
              Businesses already using Toast or Square that are not getting
              the full value from their current setup.
            </p>
          </RevealItem>
        </RevealGroup>
      </Section>

      <Section className="bg-mist">
        <Reveal>
          <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
            Toast or Square
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-navy/70">
            Both are strong systems, and we set up each one regularly. Here is
            how we help you choose.
          </p>
        </Reveal>
        <div className="mt-10">
          <ComparePanel
            columns={[
              {
                name: "Toast",
                description:
                  "Built specifically for restaurants. It handles complex menus, kitchen printing, and full table service with ease.",
              },
              {
                name: "Square",
                description:
                  "Works well across restaurants, retail, and service businesses that want a simpler, flexible system.",
              },
            ]}
            note="We will walk through how your business actually operates and recommend the platform that fits, not the one that is easiest to sell."
          />
        </div>
      </Section>

      <Section>
        <Reveal>
          <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
            Our process
          </h2>
        </Reveal>
        <div className="mt-12">
          <ProcessSteps steps={steps} />
        </div>
      </Section>

      <CTASection
        heading="Ready to fix your front counter for good?"
        body="Tell us about your business and how you operate, and we will show you exactly what a properly configured system looks like."
      />
    </>
  );
}
