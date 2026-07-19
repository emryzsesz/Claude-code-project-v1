import type { Metadata } from "next";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Emryz Digital about your website, POS, or author growth project. We will get back to you within one business day.",
};

export default function ContactPage() {
  return (
    <Section className="pb-24 pt-16 sm:pt-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-green">
            Get in touch
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-navy sm:text-5xl">
            Let us talk about your project
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-navy/70">
            Tell us a little about your business or your book, and what you
            need. We will get back to you within one business day.
          </p>

          <div className="mt-10 space-y-6 text-base leading-7 text-navy/70">
            <div>
              <p className="font-semibold text-navy">Email</p>
              <a
                href="mailto:hello@emryzdigital.com"
                className="text-green hover:text-green-dark"
              >
                hello@emryzdigital.com
              </a>
            </div>
            <div>
              <p className="font-semibold text-navy">Response time</p>
              <p>One business day, most days sooner.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border-soft bg-mist p-8 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
