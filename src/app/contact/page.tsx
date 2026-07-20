import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import ParticleField from "@/components/motion/ParticleField";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Emryz Digital about your website, POS, or author growth project. We will get back to you within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        description="Tell us a little about your business or your book, and what you need. We will get back to you within one business day."
      />

      <section className="relative isolate overflow-hidden bg-[#0a1420] py-20 sm:py-28">
        <ParticleField />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-transparent to-[#0a1420]"
        />
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <ContactForm />
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-sm font-semibold uppercase tracking-widest text-lime">
                Direct contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Prefer to reach out directly
              </h2>
              <div className="mt-8 space-y-6 text-base leading-7 text-white/70">
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a
                    href="mailto:emryzdigital@gmail.com"
                    className="text-lime hover:text-green"
                    data-cursor-label="open"
                  >
                    emryzdigital@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <a
                    href="tel:+2348165993286"
                    className="text-lime hover:text-green"
                    data-cursor-label="open"
                  >
                    +234 816 599 3286
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-white">Response time</p>
                  <p>One business day, most days sooner.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
