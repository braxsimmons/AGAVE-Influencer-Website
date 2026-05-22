/**
 * GoHighLevel (LeadConnector) API v2 client.
 *
 * - Auto-creates the influencer custom fields the first time (cached per warm
 *   instance + in-flight de-duped so concurrent submits don't double-create).
 * - Maps the application to standard contact fields + those custom fields.
 * - Protects the provider's rate limits with outbound spacing + exponential
 *   backoff that honours `Retry-After` on 429s.
 * - Degrades gracefully: if the token lacks custom-field scopes, the contact is
 *   still created and the social data is preserved as a contact Note.
 */

import { throttle, sleep } from "./ratelimit";

const API_BASE =
  process.env.GHL_API_BASE?.replace(/\/$/, "") ||
  "https://services.leadconnectorhq.com";
const API_VERSION = process.env.GHL_API_VERSION || "2021-07-28";

function getCreds() {
  const locationId = process.env.GHL_LOCATION_ID;
  const token = process.env.GHL_PIT_KEY;
  if (!locationId || !token) {
    throw new Error("GHL credentials missing (GHL_LOCATION_ID / GHL_PIT_KEY).");
  }
  return { locationId, token };
}

type GhlError = { status: number; body: string };

async function ghlRequest<T>(
  path: string,
  init: RequestInit & { retries?: number } = {},
): Promise<T> {
  const { token } = getCreds();
  const { retries = 3, ...rest } = init;
  const url = `${API_BASE}${path}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    await throttle(120); // space outbound calls so we never burst the limit

    let res: Response;
    try {
      res = await fetch(url, {
        ...rest,
        headers: {
          Authorization: `Bearer ${token}`,
          Version: API_VERSION,
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(rest.headers || {}),
        },
        // never let a hung upstream hold a serverless function open forever
        signal: AbortSignal.timeout(12_000),
      });
    } catch (err) {
      if (attempt < retries) {
        await sleep(400 * 2 ** attempt);
        continue;
      }
      throw err;
    }

    if (res.status === 429 || res.status >= 500) {
      if (attempt < retries) {
        const retryAfter = Number(res.headers.get("retry-after"));
        const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : 500 * 2 ** attempt + Math.random() * 250;
        await sleep(waitMs);
        continue;
      }
    }

    const text = await res.text();
    if (!res.ok) {
      const error: GhlError = { status: res.status, body: text };
      throw error;
    }
    return (text ? JSON.parse(text) : {}) as T;
  }

  throw { status: 0, body: "exhausted retries" } as GhlError;
}

/* ----------------------------- custom fields ----------------------------- */

const FIELD_DEFS = [
  { key: "instagram", name: "Instagram Handle", dataType: "TEXT" },
  { key: "tiktok", name: "TikTok Handle", dataType: "TEXT" },
  { key: "facebook", name: "Facebook Profile", dataType: "TEXT" },
  { key: "x", name: "X (Twitter) Handle", dataType: "TEXT" },
  { key: "youtube", name: "YouTube Channel", dataType: "TEXT" },
  { key: "followers", name: "Estimated Audience Size", dataType: "TEXT" },
] as const;

export type FieldKey = (typeof FIELD_DEFS)[number]["key"];

type CustomField = { id: string; name: string; fieldKey?: string; dataType?: string };

let fieldCache: Record<string, string> | null = null;
let fieldCachePromise: Promise<Record<string, string>> | null = null;

const norm = (s: string) => s.trim().toLowerCase();

async function listCustomFields(): Promise<CustomField[]> {
  const { locationId } = getCreds();
  const data = await ghlRequest<{ customFields?: CustomField[] }>(
    `/locations/${locationId}/customFields?model=contact`,
    { method: "GET" },
  );
  return data.customFields || [];
}

async function createCustomField(name: string, dataType: string): Promise<CustomField | null> {
  const { locationId } = getCreds();
  try {
    const data = await ghlRequest<{ customField?: CustomField; id?: string }>(
      `/locations/${locationId}/customFields`,
      {
        method: "POST",
        body: JSON.stringify({ name, dataType, model: "contact" }),
      },
    );
    if (data.customField) return data.customField;
    if (data.id) return { id: data.id, name };
    return null;
  } catch {
    return null;
  }
}

/**
 * Returns a map of { fieldKey -> custom field id }, creating any missing fields.
 * Result is cached for the life of the warm instance.
 */
export async function ensureCustomFields(): Promise<Record<string, string>> {
  if (fieldCache) return fieldCache;
  if (fieldCachePromise) return fieldCachePromise;

  fieldCachePromise = (async () => {
    const map: Record<string, string> = {};
    let existing: CustomField[] = [];
    try {
      existing = await listCustomFields();
    } catch {
      // no read scope - we'll just try to create, and fall back to a note if needed
    }

    const byName = new Map(existing.map((f) => [norm(f.name), f]));

    for (const def of FIELD_DEFS) {
      const match = byName.get(norm(def.name));
      if (match?.id) {
        map[def.key] = match.id;
        continue;
      }
      const created = await createCustomField(def.name, def.dataType);
      if (created?.id) map[def.key] = created.id;
    }

    fieldCache = map;
    return map;
  })();

  try {
    return await fieldCachePromise;
  } finally {
    fieldCachePromise = null;
  }
}

/* ------------------------------- contacts -------------------------------- */

export type InfluencerApplication = {
  name: string;
  email: string;
  phone: string;
  website?: string;
  socials: Partial<Record<FieldKey, string>>; // instagram/tiktok/.../followers
};

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  const firstName = parts.shift() || full.trim();
  const lastName = parts.join(" ");
  return { firstName, lastName };
}

async function addNote(contactId: string, body: string) {
  try {
    await ghlRequest(`/contacts/${contactId}/notes`, {
      method: "POST",
      body: JSON.stringify({ body }),
      retries: 1,
    });
  } catch {
    /* note is best-effort */
  }
}

function buildSummaryNote(app: InfluencerApplication) {
  const lines = [
    "📣 New Agave creator application",
    app.website ? `Website: ${app.website}` : null,
    app.socials.instagram ? `Instagram: ${app.socials.instagram}` : null,
    app.socials.tiktok ? `TikTok: ${app.socials.tiktok}` : null,
    app.socials.facebook ? `Facebook: ${app.socials.facebook}` : null,
    app.socials.x ? `X: ${app.socials.x}` : null,
    app.socials.youtube ? `YouTube: ${app.socials.youtube}` : null,
    app.socials.followers ? `Estimated audience: ${app.socials.followers}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

export async function submitInfluencer(app: InfluencerApplication) {
  const { locationId } = getCreds();
  const fieldMap = await ensureCustomFields();

  const customFields = (Object.keys(app.socials) as FieldKey[])
    .filter((k) => app.socials[k] && fieldMap[k])
    .map((k) => ({ id: fieldMap[k], value: String(app.socials[k]) }));

  // True if at least one social value couldn't be mapped to a custom field.
  const unmapped = (Object.keys(app.socials) as FieldKey[]).some(
    (k) => app.socials[k] && !fieldMap[k],
  );

  const { firstName, lastName } = splitName(app.name);

  const body = {
    locationId,
    firstName,
    lastName,
    name: app.name.trim(),
    email: app.email.trim(),
    phone: app.phone.trim() || undefined,
    website: app.website?.trim() || undefined,
    source: "Agave Influencer Site",
    tags: ["Influencer Application", "Agave Creator Site"],
    customFields,
  };

  const data = await ghlRequest<{
    contact?: { id: string };
    new?: boolean;
    succeded?: boolean;
  }>("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const contactId = data.contact?.id;

  // If some fields couldn't be mapped (e.g. token lacks custom-field scope),
  // preserve the data as a human-readable note so nothing is lost.
  if (contactId && (unmapped || customFields.length === 0)) {
    await addNote(contactId, buildSummaryNote(app));
  }

  return { contactId, isNew: data.new ?? true };
}
