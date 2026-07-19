import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import Section from "@/components/Section";
import IncludedList from "@/components/IncludedList";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Author Growth and Book Promotion",
  description:
    "Emryz Digital helps authors build a readership with author websites, launch campaigns, email list building, and book promotion support.",
};

const included = [
  "Author websites that showcase your books and make it easy to buy or borrow them",
  "Launch campaign planning for new releases",
  "Email list building so you can reach readers directly",
  "Social content and promotion calendars",
  "Amazon and Goodreads page optimization",
  "Advance reader copy and review campaign coordination",
];

const channels = [
  "Amazon author pages and book listings",
  "Goodreads profile and book pages",
  "Email newsletters sent directly to your readers",
  "Social platforms where your readers already spend time",
];

const steps = [
  {
    title: "Discovery Call",
    description:
      "We learn about your book, your genre, your current audience, and your goals for this release.",
  },
  {
    title: "Plan and Proposal",
    description:
      "You receive a promotion plan and a fixed price built around your timeline and budget.",
  },
  {
    title: "Build and Launch",
    description:
      "We build your author website, prepare your campaign materials, and coordinate your launch window.",
  },
  {
    title: "Grow and Support",
    description:
      "We keep working after launch day, since most books sell steadily over time, not only in the first week.",
  },
];

export default function AuthorGrowthPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Author Growth"
        title="Author growth and book promotion"
        description="Writing the book is only half the job. We help authors build a readership, plan a launch, and keep selling long after release day."
      />

      <Section className="bg-mist">
        <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
          What is included
        </h2>
        <div className="mt-10">
          <IncludedList items={included} />
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
          Who this is for
        </h2>
        <div className="mt-8 grid gap-6 text-base leading-7 text-navy/70 sm:grid-cols-3">
          <p>
            First time authors preparing for a launch and building an online
            presence from scratch.
          </p>
          <p>
            Authors with several books already out who want a stronger
            website and a clearer promotion plan.
          </p>
          <p>
            Independently published and traditionally published authors
            alike. Our approach adjusts to how you publish.
          </p>
        </div>
      </Section>

      <Section className="bg-mist">
        <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
          Where we promote your book
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-navy/70">
          We meet readers where they already are, and we build systems you
          can keep using long after our work together ends.
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {channels.map((channel) => (
            <li
              key={channel}
              className="rounded-2xl border border-border-soft bg-white p-6 text-base leading-7 text-navy/80"
            >
              {channel}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
          Our process
        </h2>
        <div className="mt-12">
          <ProcessSteps steps={steps} />
        </div>
      </Section>

      <CTASection
        heading="Ready to reach more readers?"
        body="Tell us about your book and your timeline, and we will show you exactly how we can help you launch and grow."
      />
    </>
  );
}
