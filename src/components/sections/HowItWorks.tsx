import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Bits";
import { STEPS } from "@/lib/site";

export function HowItWorks() {
  return (
    <section id="how" className="section-x scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker>How it works</Kicker>
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.02] text-ink sm:text-6xl">
            From follower to <span className="text-electric">payout.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-ink/60">
            No agencies to chase, no guesswork. Agave turns the audience you already
            have into a live experience that pays, in three simple moves.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <StaggerItem key={step.no}>
              <article className="group h-full rounded-3xl border border-ink/10 bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_70px_-50px_rgba(18,28,37,0.45)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-electric font-display text-lg font-bold text-ink">
                  {step.no}
                </span>
                <h3 className="mt-7 font-display text-2xl font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
                  {step.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
