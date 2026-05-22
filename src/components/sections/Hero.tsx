"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";

const fade = {
  hidden: { opacity: 0, y: 18 },
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
      className="relative flex min-h-[92svh] items-center overflow-hidden px-0 pt-28 pb-20"
    >
      {/* subtle ambient light — restrained, no loud glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 0%, rgba(157,197,222,0.10), transparent 60%), radial-gradient(40% 40% at 0% 100%, rgba(25,55,89,0.35), transparent 70%)",
        }}
      />

      <div className="section-x mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <motion.div variants={fade} custom={0} initial="hidden" animate="show">
            <Eyebrow>For creators &amp; influencers</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fade}
            custom={1}
            initial="hidden"
            animate="show"
            className="font-display mt-6 text-balance text-5xl font-bold leading-[0.98] text-paper sm:text-7xl lg:text-[5.2rem]"
          >
            Turn your audience
            <br />
            into <span className="text-electric">real prizes.</span>
          </motion.h1>

          <motion.p
            variants={fade}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-xl text-pretty text-lg text-sand/80 sm:text-xl"
          >
            Partner with Agave to run branded prize games your audience actually
            plays — and earn from the engagement you already create. No ad scripts,
            no gimmicks.
          </motion.p>

          <motion.div
            variants={fade}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#apply" size="lg" withArrow>
              Apply to partner
            </Button>
            <Button href="#demo" variant="secondary" size="lg">
              Play the demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
