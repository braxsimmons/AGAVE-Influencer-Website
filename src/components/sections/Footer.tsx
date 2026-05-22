import Link from "next/link";
import { Logo } from "@/components/Logo";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "The game", href: "#demo" },
  { label: "Apply", href: "#apply" },
];

export function Footer() {
  return (
    <footer className="section-x border-t border-white/[0.07] py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <Logo className="h-5 w-auto text-paper" />

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-wider text-sand/70 transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/[0.06] pt-6 font-mono text-[11px] text-sand/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} AGAVE™. All rights reserved.</p>
        <p>Skill &amp; participation based. Premium, brand-safe — not gambling.</p>
      </div>
    </footer>
  );
}
