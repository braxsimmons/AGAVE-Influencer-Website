export const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "The game", href: "#demo" },
  { label: "Apply", href: "#apply" },
];

export type Platform = {
  key: "instagram" | "tiktok" | "facebook" | "x" | "youtube";
  label: string;
  placeholder: string;
};

export const PLATFORMS: Platform[] = [
  { key: "instagram", label: "Instagram", placeholder: "@yourhandle" },
  { key: "tiktok", label: "TikTok", placeholder: "@yourhandle" },
  { key: "facebook", label: "Facebook", placeholder: "facebook.com/you" },
  { key: "x", label: "X", placeholder: "@yourhandle" },
  { key: "youtube", label: "YouTube", placeholder: "youtube.com/@you" },
];

/** Three steps — the influencer journey */
export const STEPS = [
  {
    no: "01",
    title: "Apply to partner",
    body: "Tell us where you create. Approved partners unlock a branded prize game and a personal share link — no production, no ad scripts.",
  },
  {
    no: "02",
    title: "Drop it to your audience",
    body: "Share one link. Your followers play a real game for real prizes instead of scrolling past another sponsored post.",
  },
  {
    no: "03",
    title: "Get paid & get noticed",
    body: "Earn on the plays and wins tied to your link, and get pulled into bigger brand activations as you grow with Agave.",
  },
];

/** Ghosted value marquee — on-brand value phrases */
export const VALUE_WORDS = [
  "Interactive Experiences",
  "Real Prizes",
  "Live Campaigns",
  "Real Engagement",
  "Branded Games",
  "Audience Rewards",
];
