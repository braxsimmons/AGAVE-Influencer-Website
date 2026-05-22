"use client";

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

export function Hero() {
  return (
    <section
      id="top"
      className="section-x relative flex min-h-[88vh] items-center justify-center overflow-hidden pt-28 pb-20 text-center sm:pt-32"
    >
      {/* soft radial glow behind the headline */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-deep/30 blur-[120px]" />

      <div className="mx-auto max-w-4xl">
        <motion.div variants={up} custom={0} initial="hidden" animate="show" className="flex justify-center">
          <Kicker>For creators &amp; influencers</Kicker>
        </motion.div>

        <motion.h1
          variants={up}
          custom={1}
          initial="hidden"
          animate="show"
          className="mt-7 font-display text-balance text-5xl font-bold leading-[0.95] text-paper sm:text-7xl lg:text-[5.5rem]"
        >
          Your audience was never meant to{" "}
          <span className="text-electric">just watch.</span>
        </motion.h1>

        <motion.p
          variants={up}
          custom={2}
          initial="hidden"
          animate="show"
          className="mx-auto mt-7 max-w-2xl text-pretty text-lg text-sand/75 sm:text-xl"
        >
          Turn followers into players with interactive prize experiences powered by
          Agave. Stop posting ads your audience skips — build campaigns they
          actually want to engage with.
        </motion.p>

        <motion.div
          variants={up}
          custom={3}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button href="#apply" size="lg" withArrow className="w-full sm:w-auto">
            Apply to partner
          </Button>
          <Button href="#demo" variant="secondary" size="lg" className="w-full sm:w-auto">
            Play the demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
