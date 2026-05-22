"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

const line = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const STATS = [
  { figure: "12.4M", label: "Audience reached" },
  { figure: "38K", label: "Prizes claimed" },
  { figure: "4.7×", label: "Engagement lift" },
];

export function Hero() {
  return (
    <section id="top" className="section-x relative overflow-hidden pt-24 pb-16 sm:pt-28">
      <div className="mx-auto max-w-7xl">
        {/* masthead */}
        <motion.div
          variants={line}
          custom={0}
          initial="hidden"
          animate="show"
          className="rule-t rule-b flex items-center justify-between gap-4 py-3"
        >
          <span className="kicker text-sand/60">AGAVE — Partner Program</span>
          <span className="kicker hidden text-sand/40 sm:block">
            For creators &amp; influencers
          </span>
          <span className="kicker text-electric">(2025)</span>
        </motion.div>

        {/* giant mixed-scale headline */}
        <h1 className="mt-12 font-display font-bold tracking-tight text-paper sm:mt-16">
          <motion.span
            variants={line}
            custom={1}
            initial="hidden"
            animate="show"
            className="block text-[15vw] leading-[0.86] sm:text-7xl lg:text-8xl"
          >
            Your audience
          </motion.span>
          <motion.span
            variants={line}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-1 block font-normal leading-[0.95] text-sand/75 text-[9vw] sm:text-4xl lg:text-[3.4rem]"
          >
            was never meant to
          </motion.span>
          <motion.span
            variants={line}
            custom={3}
            initial="hidden"
            animate="show"
            className="block text-electric text-[19vw] leading-[0.84] sm:text-8xl lg:text-[9rem]"
          >
            just watch.
          </motion.span>
        </h1>

        {/* asymmetric subrow */}
        <div className="rule-t mt-12 grid gap-8 pt-8 sm:mt-16 lg:grid-cols-12">
          <motion.div
            variants={line}
            custom={4}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
          >
            <p className="max-w-xl text-pretty text-xl font-medium text-paper/90 sm:text-2xl">
              Turn followers into players with interactive prize experiences powered
              by Agave.
            </p>
            <p className="mt-4 max-w-lg text-pretty text-base text-sand/65">
              Stop posting ads your audience skips. Build campaigns your audience
              actually wants to engage with.
            </p>
          </motion.div>

          <motion.div
            variants={line}
            custom={5}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end lg:justify-start"
          >
            <Button href="#apply" size="lg" withArrow className="w-full sm:w-auto">
              Apply to partner
            </Button>
            <Button href="#demo" variant="secondary" size="lg" className="w-full sm:w-auto">
              Play the demo
            </Button>
          </motion.div>
        </div>

        {/* ruled stat strip */}
        <motion.div
          variants={line}
          custom={6}
          initial="hidden"
          animate="show"
          className="rule-t mt-14 grid grid-cols-3"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className={`py-7 ${i > 0 ? "rule-l pl-5 sm:pl-8" : "pr-5"}`}>
              <div className="font-display text-3xl font-bold text-paper sm:text-5xl">
                {s.figure}
              </div>
              <div className="kicker mt-2 text-sand/55">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
