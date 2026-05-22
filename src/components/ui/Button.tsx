import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/Icons";

type Variant = "primary" | "secondary" | "secondary-dark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

// Default variants target LIGHT backgrounds. Use the *-dark variants on dark bands.
const variants: Record<Variant, string> = {
  primary: "bg-ember text-white shadow-sm hover:bg-ember-600 hover:-translate-y-px",
  secondary:
    "border border-ink/15 bg-transparent text-ink hover:bg-ink/[0.04] hover:border-ink/30",
  "secondary-dark":
    "border border-white/20 bg-transparent text-white hover:bg-white/[0.08] hover:border-white/35",
  ghost: "text-ink/70 hover:text-ink",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
};

type AsLink = CommonProps & { href: string; type?: never; target?: string; rel?: string };
type AsButton = CommonProps & { href?: never; type?: "button" | "submit" };

export function Button(props: AsLink | AsButton) {
  const { children, variant = "primary", size = "md", className = "", withArrow = false } = props;
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if ("href" in props && props.href) {
    const isExternal = props.href.startsWith("http");
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        className={classes}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} className={classes}>
      {inner}
    </button>
  );
}
