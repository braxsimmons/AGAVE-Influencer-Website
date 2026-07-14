import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { figure: "12.4M", label: "Audience reached across live drops" },
  { figure: "38K", label: "Real prizes claimed by players" },
  { figure: "4.7×", label: "Engagement vs. a standard post" },
];

export function StatsBand() {
  return (
    <section className="section-x bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold leading-[1.02] text-ink sm:text-5xl">
            Engagement you can actually measure.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-55px_rgba(18,28,37,0.5)] ring-1 ring-ink/5 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`p-8 text-center sm:p-10 ${i > 0 ? "border-t border-ink/8 sm:border-l sm:border-t-0" : ""}`}
              >
                <div className="font-display text-5xl font-bold text-deep sm:text-6xl">
                  {s.figure}
                </div>
                <p className="mx-auto mt-3 max-w-[14rem] text-[15px] text-ink/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
