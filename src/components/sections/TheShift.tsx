import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Bits";
import { CheckIcon } from "@/components/Icons";
import { OLD_WAY, AGAVE_WAY } from "@/lib/site";

export function TheShift() {
  return (
    <section className="section-x py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Kicker index="01">The shift</Kicker>
          <h2 className="mt-7 max-w-4xl font-display text-4xl font-bold leading-[0.95] text-paper sm:text-6xl">
            Sponsored posts get scrolled.{" "}
            <span className="text-electric">Games get played.</span>
          </h2>
        </Reveal>

        <div className="rule-t mt-14 grid sm:mt-16 md:grid-cols-2">
          {/* old way */}
          <Reveal className="py-10 md:pr-12">
            <p className="kicker text-sand/45">[ The old playbook ]</p>
            <ul className="mt-7 space-y-5">
              {OLD_WAY.map((item) => (
                <li key={item} className="flex items-start gap-4 text-lg text-sand/45">
                  <span className="mt-3 h-px w-5 shrink-0 bg-sand/30" />
                  <span className="line-through decoration-sand/25">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* agave way */}
          <Reveal delay={0.1} className="border-t border-white/10 py-10 md:border-t-0 md:border-l md:pl-12">
            <p className="kicker text-electric">[ The Agave play ]</p>
            <ul className="mt-7 space-y-5">
              {AGAVE_WAY.map((item) => (
                <li key={item} className="flex items-start gap-4 text-lg text-paper">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/15 text-electric">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
