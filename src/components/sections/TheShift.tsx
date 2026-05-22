import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Bits";
import { CheckIcon } from "@/components/Icons";
import { OLD_WAY, AGAVE_WAY } from "@/lib/site";

export function TheShift() {
  return (
    <section className="section-x bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker>The shift</Kicker>
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.02] text-ink sm:text-6xl">
            Sponsored posts get scrolled.{" "}
            <span className="text-deep">Games get played.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-ink/60">
            Your audience didn&apos;t follow you to be sold to. Give them something
            to play — and watch engagement compound instead of fade.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-ink/10 bg-white/50 p-8 sm:p-10">
            <p className="kicker text-ink/40">The old playbook</p>
            <ul className="mt-7 space-y-4">
              {OLD_WAY.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[17px] text-ink/45">
                  <span className="mt-3 h-px w-5 shrink-0 bg-ink/25" />
                  <span className="line-through decoration-ink/20">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-deep/20 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(25,55,89,0.55)] sm:p-10">
            <p className="kicker text-deep">The Agave play</p>
            <ul className="mt-7 space-y-4">
              {AGAVE_WAY.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[17px] font-medium text-ink">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-deep/12 text-deep">
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
