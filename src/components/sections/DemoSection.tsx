import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Bits";
import { Button } from "@/components/ui/Button";

const POINTS = [
  "Real tap-to-win mechanics — the exact flow your followers get",
  "Live winning numbers and a tiered prize vault",
  "Skill & participation based — premium, brand-safe, no gambling",
];

export function DemoSection() {
  return (
    <section id="demo" className="section-x scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        {/* copy */}
        <div className="lg:col-span-6">
          <Kicker index="03">The game</Kicker>
          <h2 className="mt-7 font-display text-4xl font-bold leading-[0.95] text-paper sm:text-6xl">
            Don&apos;t take our word.
            <br />
            <span className="text-electric">Play it.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg text-sand/70">
            This is the real Agave game, running right here. Then picture your
            followers playing your branded version.
          </p>

          <ul className="mt-10">
            {POINTS.map((p, i) => (
              <li key={p} className="rule-t flex items-baseline gap-5 py-4">
                <span className="font-mono text-xs text-electric">
                  0{i + 1}
                </span>
                <span className="text-[15px] text-paper/90">{p}</span>
              </li>
            ))}
            <li className="rule-t" />
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#apply" size="lg" withArrow>
              Apply to partner
            </Button>
            <a
              href="/demo-game/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-sand/65 transition-colors hover:text-paper"
            >
              Open full screen ↗
            </a>
          </div>
        </div>

        {/* device */}
        <Reveal className="flex justify-center lg:col-span-6 lg:justify-end">
          <div className="relative w-full max-w-[360px]">
            <div className="relative aspect-[360/740] overflow-hidden rounded-[2.4rem] border-[7px] border-ink-900 bg-ink-900 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)]">
              <iframe
                src="/demo-game/index.html"
                title="AGAVE live game demo"
                className="h-full w-full border-0"
                loading="lazy"
                allow="autoplay; clipboard-write"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
