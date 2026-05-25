import type { ReactNode } from "react";

/**
 * Clean uppercase section label. `tone` adapts to light vs dark backgrounds.
 */
export function Kicker({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const color = tone === "dark" ? "text-electric" : "text-deep";
  const dot = tone === "dark" ? "bg-electric" : "bg-ember";
  return (
    <span className={`kicker inline-flex items-center gap-2.5 ${color} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}
