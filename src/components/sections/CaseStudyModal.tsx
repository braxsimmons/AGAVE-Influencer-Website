"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { CaseStudy, Campaign } from "@/lib/caseStudies";

interface Props {
  study: CaseStudy;
  onClose: () => void;
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden {...props}>
      <path d="M5 20V12M12 20V4M19 20v-6" />
    </svg>
  );
}

export function CaseStudyModal({ study, onClose }: Props) {
  const [activeCampaign, setActiveCampaign] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  // Lock body scroll + close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const goToApply = () => {
    onClose();
    // Wait a beat for the scroll lock to release before jumping to #apply
    setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const multi = study.campaigns.length > 1;
  const campaign = study.campaigns[activeCampaign];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[88vh] sm:max-w-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header (fixed) ── */}
        <div className="flex-shrink-0 border-b border-ink/10">
          <div className="flex items-center gap-3.5 p-4 sm:p-5">
            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-cream sm:h-14 sm:w-14">
              <Image
                src={study.image}
                alt={study.name}
                width={56}
                height={56}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="kicker text-[10px] text-deep">{study.type}</p>
              <h2 className="font-display truncate text-lg font-bold tracking-tight text-ink sm:text-xl">
                {study.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 rounded-lg p-2 transition-colors hover:bg-cream"
              aria-label="Close"
            >
              <CloseIcon className="h-5 w-5 text-ink/70" />
            </button>
          </div>

          {/* Campaign tabs (multi-campaign only) */}
          {multi && (
            <div className="flex gap-1.5 overflow-x-auto px-4 pb-3 sm:px-5">
              {study.campaigns.map((c, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveCampaign(i);
                    setShowSummary(false);
                  }}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                    !showSummary && activeCampaign === i
                      ? "bg-ember text-white"
                      : "bg-cream text-ink/60 hover:text-ink"
                  }`}
                >
                  {c.label || `Campaign ${i + 1}`}
                </button>
              ))}
              {study.summary && (
                <button
                  onClick={() => setShowSummary(true)}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                    showSummary
                      ? "bg-deep text-white"
                      : "bg-cream text-deep hover:text-ink"
                  }`}
                >
                  Summary
                </button>
              )}
            </div>
          )}
        </div>

        {/* ── Body (scrolls) ── */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-5">
          {showSummary && study.summary ? (
            <SummaryView study={study} />
          ) : (
            <CampaignView campaign={campaign} />
          )}
        </div>

        {/* ── Footer CTA (fixed) ── */}
        <div className="flex flex-shrink-0 items-center justify-between gap-3 border-t border-ink/10 bg-cream/60 p-4 sm:p-5">
          <p className="truncate text-sm font-semibold text-ink/80">
            Want results like {study.ctaName}?
          </p>
          <button
            onClick={goToApply}
            className="flex-shrink-0 rounded-full bg-ember px-6 py-3 text-[15px] font-semibold tracking-tight text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-ember-600"
          >
            Join the network
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="kicker mb-3 text-[11px] text-deep">{children}</h3>
  );
}

function MetricGrid({ metrics }: { metrics: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="rounded-xl bg-cream px-3 py-4 text-center ring-1 ring-ink/5"
        >
          <p className="font-display text-xl font-bold leading-none tracking-tight text-deep sm:text-2xl">
            {m.value}
          </p>
          <p className="mt-1.5 text-[9px] font-bold uppercase tracking-wider text-ink/45">
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function CampaignView({ campaign }: { campaign: Campaign }) {
  return (
    <>
      <section>
        <SectionLabel>Key Statistics</SectionLabel>
        <MetricGrid metrics={campaign.metrics} />
      </section>

      <section>
        <SectionLabel>Campaign Overview</SectionLabel>
        <p className="text-sm leading-relaxed text-ink/70 sm:text-[15px]">
          {campaign.overview}
        </p>
      </section>

      {campaign.keyResults && (
        <section className="rounded-xl bg-deep p-4 sm:p-5">
          <h3 className="kicker mb-2 text-[11px] text-electric">Key Results</h3>
          <p className="text-sm leading-relaxed text-white sm:text-[15px]">
            {campaign.keyResults}
          </p>
        </section>
      )}

      {campaign.keyStats && campaign.keyStats.length > 0 && (
        <section>
          <SectionLabel>By the Numbers</SectionLabel>
          <div className="grid grid-cols-3 gap-2.5">
            {campaign.keyStats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg px-2 py-3 text-center ring-1 ring-ink/10"
              >
                <p className="font-display text-base font-bold leading-none text-deep sm:text-lg">
                  {s.value}
                </p>
                <p className="mt-1.5 text-[9px] font-bold uppercase tracking-wider text-ink/45">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionLabel>Campaign Funnel</SectionLabel>
        <div className="space-y-4">
          {campaign.funnel.map((q, i) => (
            <div key={i} className="overflow-hidden rounded-xl ring-1 ring-ink/10">
              {/* Question */}
              <div className="flex items-start gap-2.5 border-b border-ink/10 bg-cream/60 p-3.5">
                <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold uppercase tracking-wider text-deep">
                  Q{i + 1}
                </span>
                <p className="text-sm font-semibold leading-snug text-ink">
                  {q.prompt}
                </p>
              </div>
              {/* Answer options */}
              <ul className="divide-y divide-ink/5">
                {q.options.map((opt, oi) => (
                  <li
                    key={opt}
                    className="flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-cream/40"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-deep ring-1 ring-ink/15">
                      {OPTION_LETTERS[oi] || oi + 1}
                    </span>
                    <span className="text-sm leading-snug text-ink/70">{opt}</span>
                  </li>
                ))}
              </ul>
              {q.responsesLabel && (
                <div className="border-t border-ink/5 bg-cream/40 px-3.5 py-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-deep">
                    <BarChartIcon className="h-3.5 w-3.5" />
                    {q.responsesLabel}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function SummaryView({ study }: { study: CaseStudy }) {
  return (
    <>
      {study.summaryStats && study.summaryStats.length > 0 && (
        <section>
          <SectionLabel>Performance Over Time</SectionLabel>
          <div
            className={`grid gap-2.5 ${
              study.summaryStats.length > 3 ? "grid-cols-3 sm:grid-cols-6" : "grid-cols-2"
            }`}
          >
            {study.summaryStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-cream px-2 py-3 text-center ring-1 ring-ink/5"
              >
                <p className="font-display text-base font-bold leading-none text-deep sm:text-lg">
                  {s.value}
                </p>
                <p className="mt-1.5 text-[9px] font-bold uppercase tracking-wider text-ink/45">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionLabel>Overall Summary</SectionLabel>
        <p className="text-sm leading-relaxed text-ink/70 sm:text-[15px]">
          {study.summary}
        </p>
      </section>
    </>
  );
}
