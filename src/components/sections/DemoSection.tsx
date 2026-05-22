import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";
import { Button } from "@/components/ui/Button";

const POINTS = [
  "Real tap-to-win mechanics — the exact flow your followers experience",
  "Live winning numbers and a tiered prize vault",
  "Skill & participation based. Premium, brand-safe, no gambling",
];

export function DemoSection() {
  return (
    <section
      id="demo"
      className="scroll-mt-24 border-y border-white/[0.06] bg-gradient-to-b from-panel to-deep/40 py-28 sm:py-36"
    >
      <div className="section-x mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
        {/* copy */}
        <div>
          <Eyebrow>The game</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold text-paper sm:text-5xl">
            This is what your audience plays.
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-lg text-sand/75">
            Don&apos;t take our word for it — play the real Agave game right here. Then
            imagine your followers playing your branded version.
          </p>

          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sand/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                <span className="text-[15px]">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#apply" size="lg" withArrow>
              Apply to partner
            </Button>
            <a
              href="/demo-game/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sand/70 underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              Open the game full screen ↗
            </a>
          </div>
        </div>

        {/* device */}
        <Reveal className="flex justify-center lg:justify-end">
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
