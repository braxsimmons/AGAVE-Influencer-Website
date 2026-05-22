import type { ReactNode } from "react";

/**
 * Editorial kicker — mono meta-label with an optional index number and a short
 * rule. Replaces the goagave-style dot eyebrow.
 */
export function Kicker({
  children,
  index,
  className = "",
  tone = "default",
}: {
  children: ReactNode;
  index?: string;
  className?: string;
  tone?: "default" | "onLight";
}) {
  const text = tone === "onLight" ? "text-ink/55" : "text-sand/65";
  const line = tone === "onLight" ? "bg-ink/25" : "bg-white/25";
  return (
    <span className={`kicker inline-flex items-center gap-3 ${text} ${className}`}>
      {index && <span className="text-electric">{index}</span>}
      <span className={`h-px w-7 ${line}`} />
      {children}
    </span>
  );
}
