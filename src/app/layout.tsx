import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Mono for editorial meta-labels / index numbers
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://agaveinfluencer.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AGAVE — Turn Your Audience Into Real Prizes",
    template: "%s · AGAVE",
  },
  description:
    "Partner with AGAVE to run branded prize games your audience actually plays — and earn from the engagement you already create. Apply to partner.",
  keywords: [
    "AGAVE",
    "influencer network",
    "creator platform",
    "brand deals",
    "live campaigns",
    "gamified engagement",
    "prize platform",
  ],
  authors: [{ name: "AGAVE" }],
  openGraph: {
    title: "AGAVE — Turn Your Audience Into Real Prizes",
    description:
      "Partner with AGAVE to run branded prize games your audience actually plays. Apply to partner.",
    url: SITE_URL,
    siteName: "AGAVE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGAVE — Turn Your Audience Into Real Prizes",
    description:
      "Partner with AGAVE to run branded prize games your audience actually plays. Apply to partner.",
  },
  icons: {
    icon: "/brand/favicon.png",
    apple: "/brand/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#121c25",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${hanken.variable} ${mono.variable}`}>
      <body className="bg-ink text-cream antialiased">
        {/* Proxima Nova via Adobe Fonts (Typekit). React 19 hoists this into <head>. */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/jtf0jhh.css"
          precedence="default"
        />
        {children}
      </body>
    </html>
  );
}
