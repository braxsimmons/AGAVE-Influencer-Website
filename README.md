# AGAVE — Influencer / Creator Partner Site

A single-page, professional landing experience to recruit influencers into the
AGAVE network — separate from (and distinct from) the client portal. Modeled on
the restrained aesthetic of goagave.io. Built with **Next.js 16 (App Router) ·
React 19 · Tailwind v4 · Motion**.

🔗 **Live:** https://agaveinfluencer.vercel.app

## Page (one scroll)

1. **Hero** — "Turn your audience into real prizes." One primary CTA.
2. **Value marquee** — ghosted prize categories.
3. **How it works** — three steps: Apply → Drop it → Get paid.
4. **The game** — the real AGAVE "Agave Live" tap-to-win game embedded inline in a
   device frame (served untouched from `public/demo-game/`), with an "open full
   screen" link to the raw game.
5. **Apply to partner** — the influencer application form → GoHighLevel.
6. **Footer.**

## Brand

- Warm charcoal base (`#1a1918`), white type, **electric blue** (`#9dc5de`) as the
  single accent, **orange** (`#e9714c`) reserved for primary CTAs only. Deep blue
  (`#193759`) for the demo band. Tokens live in `src/app/globals.css` `@theme`.
- Type: **Proxima Nova** via Adobe Fonts (Typekit `jtf0jhh`), with Bricolage
  Grotesque / Hanken Grotesk (next/font) as instant fallbacks.

## GoHighLevel integration

The form posts to `POST /api/apply` (`src/app/api/apply/route.ts`), which:

1. Rate-limits per IP and screens a honeypot field before doing anything.
2. Validates name / email / phone / at least one social handle.
3. Calls `src/lib/ghl.ts`, which **auto-creates** these contact custom fields the
   first time (then caches): Instagram Handle, TikTok Handle, Facebook Profile,
   X (Twitter) Handle, YouTube Channel, Estimated Audience Size.
4. Upserts the contact (standard fields + custom fields + tags
   `Influencer Application`, `Agave Creator Site` + source `Agave Influencer Site`).

**Rate-limit protection:** outbound calls are spaced + retried with exponential
backoff honoring `Retry-After` on 429s; inbound spam is throttled per IP. If the
token ever lacks custom-field scopes, the contact is still created and the social
data is preserved as a note so nothing is lost.

### Environment variables

Copy `.env.example` → `.env.local` (and set the same in Vercel → Project Settings →
Environment Variables):

| Var | Notes |
| --- | --- |
| `GHL_LOCATION_ID` | Sub-account / location ID |
| `GHL_PIT_KEY` | Private Integration Token (`pit-…`) — server only, never exposed |
| `GHL_API_BASE` | Defaults to `https://services.leadconnectorhq.com` |
| `GHL_API_VERSION` | Defaults to `2021-07-28` |

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy

Hosted on Vercel. Environment variables are configured in the Vercel project
(never committed). Pushing to `main` triggers a production deploy.
