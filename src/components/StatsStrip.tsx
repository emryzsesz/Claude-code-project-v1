import CountUp from "./motion/CountUp";
import { RevealGroup, RevealItem } from "./motion/Reveal";

const STATS = [
  { value: 3, suffix: "", label: "Services under one roof" },
  { value: 6, suffix: "", label: "Platforms we work in every week" },
  { value: 4, suffix: "", label: "Step process from call to launch" },
  { value: 1, suffix: "", label: "Business day average response" },
];

export default function StatsStrip() {
  return (
    <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
      {STATS.map((stat) => (
        <RevealItem key={stat.label} className="text-center lg:text-left">
          <div className="text-4xl font-semibold text-white sm:text-5xl">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </div>
          <p className="mt-2 text-sm leading-6 text-white/70">{stat.label}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
