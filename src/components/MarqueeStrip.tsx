const KEYWORDS = [
  "WEBSITES",
  "POS SOLUTIONS",
  "AUTHOR GROWTH",
  "WIX",
  "SQUARESPACE",
  "TOAST",
  "SQUARE",
];

/**
 * A continuous strip of brand keywords in alternating navy and green,
 * looping via a plain CSS animation and reversing direction on hover.
 * Duplicated once so the loop point is seamless at exactly fifty percent.
 */
export default function MarqueeStrip() {
  const items = [...KEYWORDS, ...KEYWORDS];

  return (
    <div className="marquee-group overflow-hidden border-y border-border-soft bg-white py-6">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-2xl font-semibold uppercase tracking-tight sm:text-3xl"
          >
            <span className={i % 2 === 0 ? "text-navy" : "text-green"}>
              {word}
            </span>
            <span aria-hidden="true" className="text-lime">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
