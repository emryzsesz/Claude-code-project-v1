"use client";

import { ElementType } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Splits text into per character motion spans for a staggered reveal.
 * The visible characters are aria-hidden and sit inside a wrapper carrying
 * the real text as an aria-label, so screen readers get the plain string
 * once, not one announcement per letter. Reserved for headline scale text
 * only, per the site wide rule that body copy stays block-fade.
 */
export default function SplitText({
  text,
  as: Component = "span",
  className = "",
  delay = 0,
  stagger = 0.02,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
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

  return (
    <Component className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map(({ word, start: startIndex }, wordI) => {
          const characters = Array.from(word);
          return (
            <span key={wordI} className="inline-block whitespace-nowrap">
              {characters.map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: "0.6em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: delay + (startIndex + i) * stagger,
                  }}
                >
                  {char}
                </motion.span>
              ))}
              {wordI < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    </Component>
  );
}
