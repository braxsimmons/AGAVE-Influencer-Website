import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/Icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-ember text-white hover:bg-ember/90 hover:-translate-y-px",
  secondary:
    "border border-white/15 bg-white/0 text-paper hover:bg-white/[0.06] hover:border-white/25",
  ghost: "text-sand/80 hover:text-paper",
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
