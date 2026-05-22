/**
 * Best-effort in-memory rate limiting + outbound throttling.
 *
 * On serverless these caches live per warm instance (not globally shared), which
 * is intentional and sufficient here: the inbound limiter blocks obvious spam
 * bursts, while the real protection against GHL's API limits is the outbound
 * spacing + exponential backoff in `lib/ghl.ts`. For multi-region global limits
 * you'd swap the Map for Vercel KV / Upstash - the interface stays the same.
 */

type Hit = { count: number; resetAt: number };

const buckets = new Map<string, Hit>();

export type RateResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
};

/** Sliding fixed-window limiter, keyed (e.g. by IP). */
export function rateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {},
): RateResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSec: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }
  return { ok: true, remaining: limit - existing.count, retryAfterSec: 0 };
}

/** Opportunistically drop expired buckets so the Map can't grow unbounded. */
export function sweepRateLimits() {
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (v.resetAt <= now) buckets.delete(k);
  }
}

/* ------------------------------------------------------------------ */
/* Outbound throttle: enforce a minimum spacing between API calls so   */
/* we never burst past a provider's per-second limit from one instance.*/
/* ------------------------------------------------------------------ */

let chain: Promise<void> = Promise.resolve();

export function throttle(minSpacingMs = 120): Promise<void> {
  const run = chain.then(
    () => new Promise<void>((resolve) => setTimeout(resolve, minSpacingMs)),
  );
  // keep the chain alive even if a link rejects
  chain = run.catch(() => undefined);
  return run;
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
