import { ApplyForm } from "@/components/ApplyForm";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/Icons";

const PERKS = [
  "A branded prize game + your personal share link",
  "First access to upcoming live campaigns",
  "Earn on the plays and wins tied to you",
  "Brand activations as you grow with Agave",
];

export function ApplySection() {
  return (
    <section id="apply" className="section-x scroll-mt-24 bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <h2 className="font-display text-balance text-4xl font-bold leading-[1.02] text-ink sm:text-6xl">
            Bring the game to your audience.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg text-ink/60">
            We partner with a limited number of creators per cycle so every drop stays
            premium. Tell us where you create, and if it&apos;s a fit, we&apos;ll match you
            to your first live campaign.
          </p>

          <ul className="mt-8 space-y-3.5">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-ink/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-deep/12 text-deep">
                  <CheckIcon className="h-3 w-3" />
                </span>
                <span className="text-[15px]">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <ApplyForm />
        </Reveal>
      </div>
    </section>
  );
}
