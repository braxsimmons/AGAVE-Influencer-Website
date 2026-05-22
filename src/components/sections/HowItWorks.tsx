import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";
import { STEPS } from "@/lib/site";

export function HowItWorks() {
  return (
    <section id="how" className="section-x scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold text-paper sm:text-5xl">
            Three steps from follower to{" "}
            <span className="text-electric">payout.</span>
          </h2>
          <p className="mt-5 text-pretty text-lg text-sand/75">
            No agencies, no guesswork. Agave turns the audience you already have into
            a live experience that pays.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.1} className="bg-ink p-8 sm:p-10">
              <span className="font-display text-sm font-semibold text-electric">
                {step.no}
              </span>
              <h3 className="font-display mt-6 text-2xl font-bold text-paper">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sand/70">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
