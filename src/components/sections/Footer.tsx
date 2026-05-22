import Link from "next/link";
import { Logo } from "@/components/Logo";
import { InstagramIcon, TikTokIcon, YouTubeIcon, XIcon } from "@/components/Icons";

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

const SOCIALS = [
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: TikTokIcon, href: "#", label: "TikTok" },
  { Icon: YouTubeIcon, href: "#", label: "YouTube" },
  { Icon: XIcon, href: "#", label: "X" },
];

export function Footer() {
  return (
    <footer className="section-x border-t border-white/[0.07] bg-ink-900 pt-16 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo className="h-6 w-auto text-paper" />
            <p className="mt-5 text-sm leading-relaxed text-sand/55">
              The gamified engagement platform turning audiences into players — real
              games, real prizes, real reach.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-sand/60 transition-colors hover:border-white/25 hover:text-paper"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
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

        <div className="mt-14 flex flex-col gap-2 border-t border-white/[0.06] pt-6 font-mono text-[11px] text-sand/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AGAVE™. All rights reserved.</p>
          <p>Skill &amp; participation based. Premium, brand-safe — not gambling.</p>
        </div>
      </div>
    </footer>
  );
}
