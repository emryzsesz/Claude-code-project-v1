import Button from "./Button";
import Section from "./Section";

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
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-green">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-navy sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-navy/70">{description}</p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact" variant="primary">
            Start a Project
          </Button>
        </div>
      </div>
    </Section>
  );
}
