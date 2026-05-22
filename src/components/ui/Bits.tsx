import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
  tone = "electric",
}: {
  children: ReactNode;
  className?: string;
  tone?: "electric" | "sand";
}) {
  const dot = tone === "sand" ? "bg-sand" : "bg-electric";
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-sand/70 ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}
