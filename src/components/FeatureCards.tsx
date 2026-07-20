import { CheckIcon } from "./icons";
import { RevealGroup, RevealItem } from "./motion/Reveal";

/**
 * Animated grid of feature cards for a service page's what you get
 * section, each staggering in via the shared Reveal primitives used
 * everywhere else on the site.
 */
export default function FeatureCards({ items }: { items: string[] }) {
  return (
    <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
      {items.map((item) => (
        <RevealItem
          key={item}
          role="listitem"
          className="group rounded-2xl border border-border-soft bg-white p-6 transition-shadow duration-300 hover:shadow-[0_24px_48px_-16px_rgba(15,45,76,0.16)]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green/10 text-green transition-colors duration-300 group-hover:bg-green group-hover:text-white">
            <CheckIcon className="h-5 w-5" />
          </span>
          <p className="mt-4 text-base leading-7 text-navy/80">{item}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
