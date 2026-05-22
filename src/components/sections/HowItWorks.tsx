import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Bits";
import { STEPS } from "@/lib/site";

export function HowItWorks() {
  return (
    <section id="how" className="section-x scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker index="02">How it works</Kicker>
            <h2 className="mt-7 font-display text-4xl font-bold leading-[0.95] text-paper sm:text-6xl">
              From follower
              <br />
              to payout.
            </h2>
          </div>
          <p className="max-w-md self-end text-pretty text-lg text-sand/70 lg:col-span-6 lg:col-start-7">
            No agencies, no guesswork. Agave turns the audience you already have into
            a live experience that pays — in three moves.
          </p>
        </Reveal>

        <div className="mt-14 sm:mt-20">
          {STEPS.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.08}>
              <div className="rule-t grid grid-cols-1 gap-4 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10">
                <div className="font-mono text-sm text-electric sm:col-span-2">
                  {step.no} / 03
                </div>
                <h3 className="font-display text-3xl font-bold text-paper sm:col-span-4 sm:text-4xl">
                  {step.title}
                </h3>
                <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-sand/70 sm:col-span-6">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="rule-t" />
        </div>
      </div>
    </section>
  );
}
