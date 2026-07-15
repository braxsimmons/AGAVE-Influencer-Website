export const NAV_LINKS = [
  { label: "Home", href: "https://goagave.io/" },
  { label: "How It Works", href: "#how" },
  { label: "The Game", href: "#demo" },
  { label: "Case Studies", href: "#case-studies" },
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

/** Use cases - how creators use Agave */
export type UseCase = {
  key: "revenue" | "contacts" | "leads" | "philanthropy";
  title: string;
  body: string;
};

export const USE_CASES: UseCase[] = [
  {
    key: "revenue",
    title: "Revenue generation",
    body: "Monetize your audience through interactive giveaways that generate direct revenue from engaged participants.",
  },
  {
    key: "contacts",
    title: "Owned contact databases",
    body: "Collect email addresses, phone numbers, and demographic data independent of social media platforms.",
  },
  {
    key: "leads",
    title: "Sponsor-ready lead packages",
    body: "Deliver actionable data to brand partners including verified contact information and audience preferences.",
  },
  {
    key: "philanthropy",
    title: "Crowdsourced philanthropy",
    body: "Build goodwill through integrated charitable components that engage audiences while supporting causes.",
  },
];

/** Three steps - the influencer journey */
export const STEPS = [
  {
    no: "01",
    title: "Apply to partner",
    body: "Tell us where you create. Approved partners unlock a branded prize game and a personal share link, with no production and no ad scripts.",
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

/** The shift - old way vs the Agave play */
export const OLD_WAY = [
  "Ads your audience scrolls right past",
  "Reach that quietly keeps dropping",
  "One-and-done posts, then silence",
  "You chasing brands for the next deal",
];

export const AGAVE_WAY = [
  "Games your audience chooses to play",
  "Reach that compounds as they share",
  "Campaigns they come back and replay",
  "Brands coming to find you instead",
];
