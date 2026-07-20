import CountUp from "./motion/CountUp";
import ParticleField from "./motion/ParticleField";
import { RevealGroup, RevealItem } from "./motion/Reveal";
import Container from "./Container";

type Stat =
  | { kind: "count"; value: number; suffix: string; label: string }
  | { kind: "text"; text: string };

const STATS: Stat[] = [
  { kind: "count", value: 300, suffix: " Plus", label: "Sites Built" },
  { kind: "count", value: 6, suffix: " Plus", label: "Years" },
  { kind: "count", value: 3, suffix: "", label: "Service Areas" },
  { kind: "text", text: "Wix Marketplace Partner" },
];

/**
 * Full bleed, near black stats section. The particle field sits behind
 * the numbers on its own absolutely positioned canvas, the content grid
 * sits above it in a normal contained layout.
 */
export default function StatsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a1420] py-20 sm:py-28">
      <ParticleField />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-transparent to-[#0a1420]"
      />
      <Container className="relative z-10">
        <RevealGroup className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <RevealItem key={i} className="text-center">
              {stat.kind === "count" ? (
                <>
                  <div className="text-4xl font-semibold text-white sm:text-5xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/60">{stat.label}</p>
                </>
              ) : (
                <div className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {stat.text}
                </div>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
