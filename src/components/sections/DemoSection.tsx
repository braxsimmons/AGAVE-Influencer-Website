import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Bits";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/Icons";

const POINTS = [
  "Real tap-to-win mechanics — the exact flow your followers get",
  "Live winning numbers and a tiered prize vault",
  "Skill & participation based — premium, brand-safe, no gambling",
];

export function DemoSection() {
  return (
    <section id="demo" className="section-x scroll-mt-24 bg-cream py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* copy */}
        <div>
          <Kicker tone="onLight">The game</Kicker>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[0.98] text-ink sm:text-6xl">
            Don&apos;t take our word.{" "}
            <span className="text-deep">Play it.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg text-ink/65">
            This is the real Agave game, running right here. Then picture your
            followers playing your branded version.
          </p>

          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3.5 text-[15px] text-ink/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-deep/12 text-deep">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#apply" size="lg" withArrow>
              Apply to partner
            </Button>
            <a
              href="/demo-game/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-ink/55 transition-colors hover:text-ink"
            >
              Open full screen ↗
            </a>
          </div>
        </div>

        {/* device */}
        <Reveal className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[360px]">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-deep/15 blur-3xl" />
            <div className="relative aspect-[360/740] overflow-hidden rounded-[2.4rem] border-[7px] border-ink-900 bg-ink-900 shadow-[0_50px_120px_-40px_rgba(18,28,37,0.6)]">
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
