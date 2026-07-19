"use client";

import { ElementType } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const charVariants = (delay: number) => ({
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay } },
});

/**
 * Splits text into per character motion spans for a staggered reveal.
 * The visible characters are aria-hidden and sit inside a wrapper carrying
 * the real text as an aria-label, so screen readers get the plain string
 * once, not one announcement per letter. Reserved for headline scale text
 * only, per the site wide rule that body copy stays block-fade.
 *
 * trigger "mount" fires as soon as the component mounts, for hero copy
 * that should already be running the moment the page loads. trigger
 * "inView" waits until the text scrolls into view, for headlines further
 * down the page, and only fires once.
 */
export default function SplitText({
  text,
  as: Component = "span",
  className = "",
  delay = 0,
  stagger = 0.02,
  trigger = "mount",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "inView";
}) {
  const words = text.split(" ").reduce<{ word: string; start: number }[]>(
    (acc, word) => {
      const previous = acc[acc.length - 1];
      const start = previous
        ? previous.start + Array.from(previous.word).length
        : 0;
      return [...acc, { word, start }];
    },
    []
  );

  const triggerProps =
    trigger === "inView"
      ? { whileInView: "show", viewport: { once: true, amount: 0.4 } }
      : { animate: "show" };

  return (
    <Component className={className} aria-label={text}>
      <motion.span aria-hidden="true" initial="hidden" {...triggerProps}>
        {words.flatMap(({ word, start: startIndex }, wordI) => {
          const characters = Array.from(word);
          const wordSpan = (
            <span key={`word-${wordI}`} className="inline-block whitespace-nowrap">
              {characters.map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={charVariants(delay + (startIndex + i) * stagger)}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          );
          return wordI < words.length - 1
            ? [wordSpan, " "]
            : [wordSpan];
        })}
      </motion.span>
    </Component>
  );
}
