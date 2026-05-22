"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Bits";

const up = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const COL_A = [
  "/influencers/influencer-1.jpg",
  "/influencers/bodybybree.jpg",
  "/influencers/braiden.jpg",
];
const COL_B = [
  "/influencers/kelseynixon.jpg",
  "/influencers/cami.jpg",
  "/influencers/russ.jpg",
];

function Frame({ src, priority }: { src: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/10">
      <Image
        src={src}
        alt="AGAVE creator"
        fill
        sizes="(max-width: 1024px) 42vw, 20vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}

function Strip({ images, reverse, dur }: { images: string[]; reverse?: boolean; dur: number }) {
  const loop = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <div
        className={`vmarquee flex flex-col gap-3 ${reverse ? "reverse" : ""}`}
        style={{ ["--vdur" as string]: `${dur}s` }}
      >
        {loop.map((src, i) => (
          <Frame key={`${src}-${i}`} src={src} priority={!reverse && i === 0} />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="section-x relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-12">
        {/* copy */}
        <div>
          <motion.div variants={up} custom={0} initial="hidden" animate="show">
            <Kicker>For creators &amp; influencers</Kicker>
          </motion.div>

          <motion.h1
            variants={up}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-5xl font-bold leading-[0.98] text-ink sm:text-6xl lg:text-7xl"
          >
            Your audience was never meant to{" "}
            <span className="text-ember">just watch.</span>
          </motion.h1>

          <motion.p
            variants={up}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-pretty text-lg text-ink/65"
          >
            Turn followers into players with interactive prize experiences powered by
            Agave. Stop posting ads your audience skips. Build campaigns they
            actually want to engage with.
          </motion.p>

          <motion.div
            variants={up}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#apply" size="lg" withArrow>
              Join the network
            </Button>
            <Button href="#demo" variant="secondary" size="lg">
              Play the demo
            </Button>
          </motion.div>

          <motion.p
            variants={up}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-7 text-sm text-ink/45"
          >
            Free to join · Reviewed weekly · Creators of every size welcome
          </motion.p>
        </div>

        {/* film strip credibility wall */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md lg:mr-0 lg:max-w-none"
        >
          <div className="grid h-[440px] grid-cols-2 gap-3 [mask-image:linear-gradient(to_bottom,transparent,#000_9%,#000_91%,transparent)] sm:h-[520px]">
            <Strip images={COL_A} dur={34} />
            <div className="-mt-10">
              <Strip images={COL_B} reverse dur={42} />
            </div>
          </div>

          {/* floating stat chip */}
          <div className="absolute -bottom-4 -left-3 z-10 flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-[0_20px_50px_-20px_rgba(18,28,37,0.5)] ring-1 ring-ink/5 sm:-left-6">
            <span className="font-display text-2xl font-bold text-deep">4.7×</span>
            <span className="text-xs leading-tight text-ink/60">
              more engagement
              <br />
              than a standard post
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
