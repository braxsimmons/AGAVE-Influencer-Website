import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Bits";

const STATS = [
  { figure: "12.4M", label: "Audience reached across live drops" },
  { figure: "38K", label: "Real prizes claimed by players" },
  { figure: "4.7×", label: "Engagement vs. a standard post" },
];

export function StatsBand() {
  return (
    <section className="section-x relative overflow-hidden bg-ink-900 py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-[10%] top-1/2 -z-0 h-[40vh] w-[40vh] -translate-y-1/2 rounded-full bg-deep/40 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Kicker>By the numbers</Kicker>
          <h2 className="mt-6 font-display text-3xl font-bold leading-[1] text-paper sm:text-5xl">
            Engagement you can actually measure.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className={`py-6 sm:py-2 ${i > 0 ? "sm:border-l sm:border-white/10 sm:pl-8" : "sm:pr-8"}`}
            >
              <div className="font-display text-5xl font-bold text-paper sm:text-6xl">
                {s.figure}
              </div>
              <p className="mt-3 max-w-[15rem] text-[15px] text-sand/65">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
