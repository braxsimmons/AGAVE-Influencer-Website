import { Kicker } from "@/components/ui/Bits";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/Icons";
import { GamePreview } from "@/components/GamePreview";

const POINTS = [
  "Real tap-to-win mechanics, the exact flow your followers get",
  "Live winning numbers and a tiered prize vault",
  "Skill & participation based: premium, brand-safe, no gambling",
];

export function DemoSection() {
  return (
    <section id="demo" className="section-x scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* copy */}
        <div>
          <Kicker>The game</Kicker>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.02] text-ink sm:text-6xl">
            Don&apos;t take our word.{" "}
            <span className="text-ember">Play it.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg text-ink/60">
            This is the real Agave game. Tap to play, chase the winning number, then
            picture your followers doing it with your branded version.
          </p>

          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3.5 text-[15px] text-ink/75">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember/15 text-ember">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#apply" size="lg" withArrow>
              Join the network
            </Button>
            {/* desktop: full-screen link (live preview is shown) */}
            <a
              href="/demo-game/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-semibold text-ink/55 transition-colors hover:text-ink lg:inline"
            >
              Open full demo ↗
            </a>
            {/* mobile: no preview - button straight to the demo */}
            <Button
              href="/demo-game/index.html"
              target="_blank"
              variant="secondary"
              size="lg"
              className="lg:hidden"
            >
              Play the demo
            </Button>
          </div>
        </div>

        {/* device preview - desktop only; loads + auto-logs-in at page load */}
        <GamePreview />
      </div>
    </section>
  );
}
