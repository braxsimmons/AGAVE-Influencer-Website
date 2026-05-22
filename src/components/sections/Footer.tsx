import Link from "next/link";
import { Logo } from "@/components/Logo";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "How it works", href: "#how" },
      { label: "The game", href: "#demo" },
      { label: "Our partners", href: "#top" },
    ],
  },
  {
    title: "Creators",
    links: [
      { label: "Join the network", href: "#apply" },
      { label: "Play the demo", href: "/demo-game/index.html" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "goagave.io", href: "https://goagave.io" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="section-x border-t border-white/[0.07] bg-deep pt-16 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo className="h-6 w-auto text-paper" />
            <p className="mt-5 text-sm leading-relaxed text-sand/55">
              The gamified engagement platform turning audiences into players with
              real games, real prizes, and real reach.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} className="flex flex-col gap-3.5">
              <p className="kicker text-sand/40">{col.title}</p>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm text-sand/70 transition-colors hover:text-paper"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-14 border-t border-white/[0.06] pt-6 text-[11px] text-sand/40">
          <p>© {new Date().getFullYear()} AGAVE™. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
