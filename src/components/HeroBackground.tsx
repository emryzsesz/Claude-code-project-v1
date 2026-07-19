"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Square = {
  id: number;
  top: number;
  left: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
};

const COLORS = ["#547e26", "#769a38", "#8fb84f"];

function buildSquares(): Square[] {
  const squares: Square[] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 16; i++) {
    squares.push({
      id: i,
      top: rand() * 92 + 4,
      left: rand() * 92 + 4,
      size: rand() * 30 + 10,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      opacity: rand() * 0.35 + 0.15,
      duration: rand() * 5 + 6,
      delay: rand() * 3,
      drift: rand() * 14 + 8,
    });
  }
  return squares;
}

/**
 * Full bleed hero backdrop. A static, checkpoint one navy and green
 * gradient mesh plus a scatter of the logo's pixel square motif, used
 * abstractly here and never assembled back into the actual mark. This
 * same layer is also the lite tier and reduced motion fallback once the
 * WebGL shader version lands in a later checkpoint. Every square always
 * renders as the same motion.div regardless of motion preference,
 * MotionProvider mutes the float globally for reduced motion users.
 */
export default function HeroBackground() {
  const squares = useMemo(() => buildSquares(), []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute -left-1/4 -top-1/3 h-[70%] w-[70%] rounded-full bg-green/30 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-1/4 top-1/4 h-[60%] w-[60%] rounded-full bg-navy-dark blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-1/3 left-1/3 h-[65%] w-[65%] rounded-full bg-lime/20 blur-[120px]"
      />

      <div aria-hidden="true" className="absolute inset-0">
        {squares.map((sq) => (
          <motion.div
            key={sq.id}
            className="absolute rounded-[3px]"
            style={{
              top: `${sq.top}%`,
              left: `${sq.left}%`,
              width: sq.size,
              height: sq.size,
              backgroundColor: sq.color,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: sq.opacity,
              y: [0, -sq.drift, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: sq.delay },
              y: {
                duration: sq.duration,
                delay: sq.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-navy/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 10%, transparent 40%, rgba(8,27,46,0.55) 100%)",
        }}
      />
    </div>
  );
}
