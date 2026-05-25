import type { ReactNode } from "react";

/**
 * Clean uppercase section label in ember, threading the brand accent through
 * every section header. Reads well on both light and the navy bands.
 */
export function Kicker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`kicker inline-flex items-center gap-2.5 text-ember ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-ember" />
      {children}
    </span>
  );
}
