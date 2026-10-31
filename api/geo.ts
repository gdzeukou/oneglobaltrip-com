/**
 * Where the visitor is, from the edge.
 *
 * Vercel puts a coarse, IP-derived location on every request header. Reading
 * it here means the globe can open over the traveler's own part of the world
 * without a browser permission prompt, which most people decline on arrival.
 *
 * The precise fix-up is `navigator.geolocation`, and that stays behind an
 * explicit tap. Nothing here is stored.
 */

export const config = { runtime: 'edge' };

type Geo = {
  lat: number | null;
  lng: number | null;
  city: string | null;
  /** ISO 3166-1 alpha-2, as the edge reports it. */
  countryCode: string | null;
  timezone: string | null;
  source: 'ip';
};

function header(req: Request, name: string): string | null {
  const raw = req.headers.get(name);
  if (!raw) return null;
  try {
    // City names arrive percent-encoded, e.g. "S%C3%A3o%20Paulo".
    return decodeURIComponent(raw) || null;
  } catch {
    return raw || null;
  }
}

function coord(req: Request, name: string): number | null {
  const value = Number(req.headers.get(name));
  return Number.isFinite(value) ? value : null;
}

export default function handler(req: Request): Response {
  const geo: Geo = {
    lat: coord(req, 'x-vercel-ip-latitude'),
    lng: coord(req, 'x-vercel-ip-longitude'),
    city: header(req, 'x-vercel-ip-city'),
    countryCode: header(req, 'x-vercel-ip-country'),
    timezone: header(req, 'x-vercel-ip-timezone'),
    source: 'ip',
  };

  return new Response(JSON.stringify(geo), {
    headers: {
      'Content-Type': 'application/json',
      // Personal to this visitor, so no shared cache may hold it.
      'Cache-Control': 'private, no-store',
    },
  });
}
