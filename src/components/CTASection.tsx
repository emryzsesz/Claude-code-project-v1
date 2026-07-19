import Button from "./Button";
import Section from "./Section";
import Reveal from "./motion/Reveal";

export default function CTASection({
  heading,
  body,
  buttonLabel = "Contact Us",
  buttonHref = "/contact",
}: {
  heading: string;
  body: string;
  buttonLabel?: string;
  buttonHref?: string;
}) {
  return (
    <Section className="bg-navy">
      <Reveal className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {heading}
        </h2>
        <p className="max-w-xl text-base leading-7 text-white/75">{body}</p>
        <Button href={buttonHref} variant="primary" className="mt-2">
          {buttonLabel}
        </Button>
      </Reveal>
    </Section>
  );
}
