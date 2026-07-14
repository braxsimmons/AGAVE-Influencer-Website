"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon, ChevronIcon } from "@/components/Icons";
import { caseStudies, type CaseStudy } from "@/lib/caseStudies";
import { CaseStudyModal } from "./CaseStudyModal";

const ROTATE_MS = 5000;

function ExpandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
    </svg>
  );
}

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />
    </svg>
  );
}

export function CaseStudies() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = caseStudies.length;

  const go = useCallback(
    (dir: 1 | -1) => setCurrent((c) => (c + dir + count) % count),
    [count]
  );

  // Auto-rotate (pauses on hover or when modal is open)
  useEffect(() => {
    if (paused || selected) return;
    timer.current = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, ROTATE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, selected, count]);

  const active = caseStudies[current];

  return (
    <>
      {/* ── Featured carousel ── */}
      <section id="case-studies" className="section-x scroll-mt-24 bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl font-bold leading-[1.02] text-ink sm:text-5xl">
              Real creators. Real revenue.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] text-ink/60 sm:text-base">
              See how creators across every niche turned their audiences into
              owned databases and predictable revenue with AGAVE.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <div
              className="relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl bg-white p-5 shadow-[0_30px_80px_-55px_rgba(18,28,37,0.5)] ring-1 ring-ink/5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
                {/* Image */}
                <button
                  onClick={() => setSelected(active)}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-mist shadow-xl lg:aspect-[5/4]"
                  aria-label={`View ${active.name} case study`}
                >
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={active.image}
                        alt={active.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className={`${
                          active.imageFit === "contain"
                            ? "object-contain p-8"
                            : "object-cover group-hover:scale-105"
                        } transition-transform duration-500`}
                        style={
                          active.imageFit === "contain"
                            ? undefined
                            : { objectPosition: active.imagePosition ?? "center top" }
                        }
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded-full bg-ink/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {active.highlight}
                    </span>
                    <span className="rounded-full bg-ink/60 p-2 text-white backdrop-blur-sm transition-colors group-hover:bg-ember">
                      <ExpandIcon className="h-4 w-4" />
                    </span>
                  </div>
                </button>

                {/* Text */}
                <motion.div
                  key={`${active.id}-text`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="kicker text-[11px] text-deep">{active.type}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                    {active.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base lg:text-lg">
                    {active.blurb}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelected(active)}
                      className="group/cta inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-[15px] font-semibold tracking-tight text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-ember-600"
                    >
                      Learn more
                      <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Controls */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => go(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-ink/10 transition-all hover:shadow-md hover:ring-ink/25"
                  aria-label="Previous"
                >
                  <ChevronIcon className="h-4 w-4 rotate-90 text-ink/70" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {caseStudies.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to ${s.name}`}
                      className={`h-2 rounded-full transition-all ${
                        i === current
                          ? "w-7 bg-ink"
                          : "w-2 bg-ink/15 hover:bg-ink/35"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => go(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-ink/10 transition-all hover:shadow-md hover:ring-ink/25"
                  aria-label="Next"
                >
                  <ChevronIcon className="h-4 w-4 -rotate-90 text-ink/70" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="section-x bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl font-bold leading-[1.02] text-ink sm:text-5xl">
              Explore Some of Our Campaigns
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] text-ink/60 sm:text-base">
              Tap any creator to see their full campaign breakdown: metrics,
              results, and the exact funnel we ran.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {caseStudies.map((study, index) => (
              <Reveal key={study.id} delay={(index % 3) * 0.1}>
                <button
                  onClick={() => setSelected(study)}
                  className="group w-full overflow-hidden rounded-2xl bg-white text-left ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-45px_rgba(18,28,37,0.5)] hover:ring-ink/20"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                    <Image
                      src={study.image}
                      alt={study.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className={`${
                        (study.galleryFit ?? study.imageFit) === "contain"
                          ? "object-contain p-3"
                          : "object-cover group-hover:scale-105"
                      } transition-transform duration-500`}
                      style={
                        (study.galleryFit ?? study.imageFit) === "contain"
                          ? { objectPosition: "center" }
                          : { objectPosition: study.imagePosition ?? "center top" }
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="absolute right-3 top-3 rounded-full bg-ink/50 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      <ExpandIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="truncate text-[10px] font-bold uppercase tracking-wider text-deep">
                      {study.type}
                    </p>
                    <h3 className="mt-1 font-display text-base font-bold tracking-tight text-ink transition-colors group-hover:text-deep sm:text-lg">
                      {study.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-ink/50">
                      <TrendingUpIcon className="h-3.5 w-3.5 flex-shrink-0 text-ember" />
                      <span className="truncate font-medium">{study.highlight}</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <CaseStudyModal
            key={selected.id}
            study={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
