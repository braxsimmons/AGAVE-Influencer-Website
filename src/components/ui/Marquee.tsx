import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
};

/**
 * Seamless CSS marquee. Children are rendered twice so the -50% translate loops
 * without a visible seam. Wrap each "item set" you pass in.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 38,
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={`marquee-group mask-fade-x overflow-hidden ${pauseOnHover ? "" : "[&:hover_.marquee-track]:[animation-play-state:running]"} ${className}`}
    >
      <div
        className={`marquee-track ${reverse ? "reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
