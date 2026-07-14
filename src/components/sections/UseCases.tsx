import type { SVGProps } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Bits";
import { CoinIcon, MailIcon, PackageIcon, HeartIcon } from "@/components/Icons";
import { USE_CASES, type UseCase } from "@/lib/site";

const USE_CASE_ICONS: Record<UseCase["key"], (props: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  revenue: CoinIcon,
  contacts: MailIcon,
  leads: PackageIcon,
  philanthropy: HeartIcon,
};

export function UseCases() {
  return (
    <section id="use-cases" className="section-x scroll-mt-24 bg-deep py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker tone="dark">Use cases</Kicker>
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.02] text-white sm:text-6xl">
            How creators use <span className="text-electric">Agave.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-white/60">
            One platform, four ways to win. Every campaign you run compounds into
            revenue, data, and relationships you actually own.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {USE_CASES.map((uc) => {
            const Icon = USE_CASE_ICONS[uc.key];
            return (
              <StaggerItem key={uc.key} className="h-full">
                <article className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-electric/40 hover:bg-white/[0.07]">
                  <span
                    aria-hidden
                    className="absolute right-6 top-6 font-display text-lg font-bold text-white/15 transition-colors duration-300 group-hover:text-electric/60"
                  >
                    {uc.no}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric/12 text-electric transition-all duration-300 group-hover:bg-electric group-hover:text-deep">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-white">
                    {uc.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                    {uc.body}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
