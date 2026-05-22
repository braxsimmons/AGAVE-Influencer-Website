import { NextResponse } from "next/server";
import { rateLimit, sweepRateLimits } from "@/lib/ratelimit";
import { submitInfluencer, type FieldKey, type InfluencerApplication } from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOCIAL_KEYS: FieldKey[] = ["instagram", "tiktok", "facebook", "x", "youtube"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function clean(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  sweepRateLimits();

  // 1) Inbound rate limit (per IP) — blocks spam bursts before we touch GHL.
  const ip = clientIp(req);
  const rl = rateLimit(`apply:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  // 2) Parse
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // 3) Honeypot — bots fill hidden fields. Pretend success, skip GHL.
  if (clean(payload.company)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  // 4) Validate
  const name = clean(payload.name, 80);
  const email = clean(payload.email, 120).toLowerCase();
  const phone = clean(payload.phone, 40);
  const website = clean(payload.website, 200);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";

  const rawSocials = (payload.socials ?? {}) as Record<string, unknown>;
  const socials: Partial<Record<FieldKey, string>> = {};
  for (const k of [...SOCIAL_KEYS, "followers" as FieldKey]) {
    const val = clean(rawSocials[k], 120);
    if (val) socials[k] = val;
  }

  const hasHandle = SOCIAL_KEYS.some((k) => socials[k]);
  if (!hasHandle) {
    errors.socials = "Add at least one social handle so we can review your audience.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // 5) Push to GHL
  const application: InfluencerApplication = { name, email, phone, website, socials };
  try {
    const result = await submitInfluencer(application);
    return NextResponse.json({ ok: true, contactId: result.contactId });
  } catch (err) {
    const status = (err as { status?: number })?.status;
    if (status === 401 || status === 403) {
      console.error("GHL auth/scope error", err);
      return NextResponse.json(
        { ok: false, error: "We hit a connection issue. Please try again shortly." },
        { status: 502 },
      );
    }
    if (status === 429) {
      return NextResponse.json(
        { ok: false, error: "We're processing a lot of applications right now — try again in a moment." },
        { status: 429, headers: { "Retry-After": "20" } },
      );
    }
    console.error("GHL submit failed", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong submitting your application." },
      { status: 500 },
    );
  }
}
