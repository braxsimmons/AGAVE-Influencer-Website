"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Desktop-only game preview. Renders (and therefore loads + auto-logs-in) the
 * embedded game eagerly as soon as the page mounts, so it's already on the
 * clicking screen by the time the visitor scrolls down. On mobile it renders
 * nothing; the demo section shows a button to the full demo instead, so we
 * never load the heavy game in the background on phones.
 */
export function GamePreview() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
  }, []);

  if (!isDesktop) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-center lg:justify-end"
    >
      <div className="relative w-full max-w-[360px]">
        <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-deep/10 blur-3xl" />
        <div className="relative aspect-[360/740] overflow-hidden rounded-[2.4rem] border-[7px] border-ink bg-ink shadow-[0_50px_120px_-45px_rgba(18,28,37,0.55)]">
          <iframe
            src="/demo-game/embed.html"
            title="AGAVE game preview"
            className="h-full w-full border-0"
            loading="eager"
            allow="autoplay; clipboard-write"
          />
        </div>
      </div>
    </motion.div>
  );
}
