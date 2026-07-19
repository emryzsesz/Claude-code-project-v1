import Button from "./Button";
import Section from "./Section";
import { HeroReveal, HeroRevealItem } from "./motion/HeroReveal";

export default function ServiceHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Section className="pb-12 pt-16 sm:pt-20">
      <HeroReveal>
        <div className="mx-auto max-w-3xl text-center">
          <HeroRevealItem>
            <p className="text-sm font-semibold uppercase tracking-widest text-green">
              {eyebrow}
            </p>
          </HeroRevealItem>
          <HeroRevealItem className="mt-4">
            <h1 className="text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              {title}
            </h1>
          </HeroRevealItem>
          <HeroRevealItem className="mt-6">
            <p className="text-lg leading-8 text-navy/70">{description}</p>
          </HeroRevealItem>
          <HeroRevealItem className="mt-8 flex justify-center">
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
          </HeroRevealItem>
        </div>
      </HeroReveal>
    </Section>
  );
}
