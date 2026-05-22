import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Bits";

export function Partners() {
  return (
    <section className="section-x bg-deep py-20 text-white sm:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="flex justify-center">
            <Kicker tone="dark">Strategic partner</Kicker>
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] text-white sm:text-5xl">
            Our leading influencer
            <br className="hidden sm:block" /> agency partner.
          </h2>

          <div className="mt-12 flex justify-center">
            <Image
              src="/brand/freddy-light.png"
              alt="Freddy"
              width={300}
              height={136}
              className="h-16 w-auto sm:h-20"
              priority
            />
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-pretty text-lg text-white/70">
            Agave works hand-in-hand with Freddy, a leading influencer agency, to
            connect creators with premium brand campaigns and unforgettable prize
            experiences — so the partnerships you join are backed by people who
            already know the industry inside out.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
