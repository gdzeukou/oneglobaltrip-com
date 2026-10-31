/**
 * Where the traveler is leaving from.
 *
 * Two steps, in the order that respects the visitor:
 *   1. The edge reads a coarse location off the request IP. No prompt, no
 *      dialog, good enough to open the globe over their own continent.
 *   2. If they tap "use my location", the browser asks and we upgrade to a
 *      real fix.
 *
 * Both are best effort. If nothing resolves, the caller keeps its default and
 * the app behaves exactly as it did before.
 */

export type Fix = {
  lat: number;
  lng: number;
  /** City name when the edge supplied one. */
  city: string | null;
  countryCode: string | null;
  source: 'ip' | 'device';
};

const CACHE_KEY = 'ogt:fix';
const EDGE_TIMEOUT_MS = 4000;

function readCache(): Fix | null {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Fix;
    return Number.isFinite(parsed?.lat) && Number.isFinite(parsed?.lng) ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(fix: Fix) {
  try {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(fix));
  } catch {
    /* private mode: we just resolve again next load */
  }
}

/**
 * The quiet one. Asks the edge, never the browser, so it raises no dialog and
 * can run on load. A device fix already in hand wins.
 */
export async function coarseFix(): Promise<Fix | null> {
  const cached = readCache();
  if (cached) return cached;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), EDGE_TIMEOUT_MS);
  try {
    const res = await fetch('/api/geo', { signal: controller.signal, credentials: 'omit' });
    if (!res.ok) return null;
    const body = (await res.json()) as Partial<Fix> & { lat?: number; lng?: number };
    if (!Number.isFinite(body.lat) || !Number.isFinite(body.lng)) return null;
    const fix: Fix = {
      lat: body.lat as number,
      lng: body.lng as number,
      city: body.city ?? null,
      countryCode: body.countryCode ?? null,
      source: 'ip',
    };
    writeCache(fix);
    return fix;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export type PreciseOutcome =
  | { ok: true; fix: Fix }
  | { ok: false; reason: 'unsupported' | 'denied' | 'unavailable' | 'timeout' };

/**
 * The precise one. This raises the browser's permission dialog, so only call
 * it from something the visitor actually tapped.
 */
export function preciseFix(): Promise<PreciseOutcome> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    return Promise.resolve({ ok: false, reason: 'unsupported' });
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const cached = readCache();
        const fix: Fix = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          // The device knows where, not what it is called; keep the edge's name.
          city: cached?.city ?? null,
          countryCode: cached?.countryCode ?? null,
          source: 'device',
        };
        writeCache(fix);
        resolve({ ok: true, fix });
      },
      (err) => {
        const reason =
          err.code === err.PERMISSION_DENIED
            ? 'denied'
            : err.code === err.TIMEOUT
              ? 'timeout'
              : 'unavailable';
        resolve({ ok: false, reason });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  });
}

/** Has the visitor already granted location, so we can use it without asking? */
export async function alreadyGranted(): Promise<boolean> {
  try {
    const status = await navigator.permissions?.query({ name: 'geolocation' as PermissionName });
    return status?.state === 'granted';
  } catch {
    return false;
  }
}
