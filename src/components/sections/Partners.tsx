import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Partners() {
  return (
    <section className="section-x border-y border-white/[0.07] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="kicker text-sand/50">Our partners</p>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sand/70">
            Proud to power real prize experiences alongside the brands creating
            unforgettable moments for fans.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-14 gap-y-8 opacity-90">
            <Image
              src="/brand/freddy-light.png"
              alt="Freddy"
              width={240}
              height={109}
              className="h-12 w-auto opacity-90 transition-opacity duration-300 hover:opacity-100 sm:h-14"
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
