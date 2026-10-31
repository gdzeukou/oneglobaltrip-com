/**
 * What is actually worth seeing in a place.
 *
 * The globe gets you over a city; this is what makes someone want to go.
 * Wikipedia's geosearch knows the museums, cathedrals, markets and ruins
 * around a point anywhere on Earth, with a photo and a line of description,
 * free and without an API key. We rank what comes back so the card deck
 * opens on the Louvre rather than on a tram stop.
 *
 * Every call is best-effort: on a timeout, a block or an empty answer the
 * caller gets an empty list and the UI falls back to what OGT already knows
 * about the city. Nothing here is ever load-bearing.
 */

export type Place = {
  id: string;
  title: string;
  blurb: string;
  photo: string | null;
  lat: number;
  lng: number;
  distanceKm: number;
  /** "Museum", "Cathedral" — Wikipedia's own short description. */
  kind: string | null;
  href: string;
};

const ENDPOINT = 'https://en.wikipedia.org/w/api.php';
const TIMEOUT_MS = 9000;

/** Things people travel to see. */
const WORTH_SEEING = [
  'museum', 'gallery', 'cathedral', 'basilica', 'church', 'chapel', 'abbey', 'monastery',
  'mosque', 'synagogue', 'temple', 'shrine', 'pagoda', 'palace', 'castle', 'fortress',
  'fort', 'citadel', 'monument', 'memorial', 'statue', 'tower', 'bridge', 'square',
  'plaza', 'park', 'garden', 'botanical', 'zoo', 'aquarium', 'opera', 'theatre',
  'theater', 'concert hall', 'stadium', 'arena', 'market', 'bazaar', 'library',
  'observatory', 'lighthouse', 'ruins', 'archaeological', 'historic', 'heritage',
  'landmark', 'beach', 'waterfall', 'viewpoint', 'old town', 'quarter', 'district',
  'island', 'lake', 'mountain', 'volcano', 'canyon', 'national park', 'cemetery',
];

/** Real places, but not why anyone books a flight. */
const NOT_A_SIGHT = [
  'railway station', 'train station', 'metro station', 'subway station', 'bus station',
  'airport', 'school', 'high school', 'university campus', 'hospital', 'clinic',
  'office building', 'company', 'shopping mall', 'hotel', 'apartment', 'residential',
  'power station', 'prison', 'courthouse', 'embassy', 'bank', 'parking',
  'neighbourhood in', 'neighborhood in', 'suburb of', 'street in', 'road in',
];

type WikiPage = {
  pageid: number;
  title: string;
  description?: string;
  extract?: string;
  thumbnail?: { source: string };
  coordinates?: { lat: number; lon: number }[];
};

const cache = new Map<string, Promise<Place[]>>();

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const r = Math.PI / 180;
  const h =
    Math.sin(((bLat - aLat) * r) / 2) ** 2 +
    Math.cos(aLat * r) * Math.cos(bLat * r) * Math.sin(((bLng - aLng) * r) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)));
}

function matches(text: string, words: string[]): boolean {
  const t = text.toLowerCase();
  return words.some((w) => t.includes(w));
}

function score(page: WikiPage, distanceKm: number, radiusKm: number): number {
  const text = `${page.title} ${page.description ?? ''}`;
  if (matches(page.description ?? '', NOT_A_SIGHT)) return -1;
  let s = 0;
  if (page.thumbnail) s += 4;
  if (matches(text, WORTH_SEEING)) s += 3;
  if (page.extract && page.extract.length > 60) s += 1;
  // Near the middle of town beats the edge of the search circle.
  s += 2 * (1 - Math.min(1, distanceKm / Math.max(radiusKm, 0.1)));
  return s;
}

async function query(lat: number, lng: number, radiusM: number): Promise<Place[]> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    origin: '*',
    generator: 'geosearch',
    ggscoord: `${lat.toFixed(5)}|${lng.toFixed(5)}`,
    ggsradius: String(Math.min(10000, Math.max(500, Math.round(radiusM)))),
    ggslimit: '20',
    prop: 'pageimages|description|coordinates|extracts',
    piprop: 'thumbnail',
    pithumbsize: '640',
    exintro: '1',
    explaintext: '1',
    exsentences: '2',
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${ENDPOINT}?${params}`, {
      signal: controller.signal,
      credentials: 'omit',
    });
    if (!res.ok) return [];
    const body = (await res.json()) as { query?: { pages?: WikiPage[] } };
    const pages = body.query?.pages ?? [];
    const radiusKm = radiusM / 1000;
    return pages
      .map((page) => {
        const coord = page.coordinates?.[0];
        if (!coord) return null;
        const distanceKm = haversineKm(lat, lng, coord.lat, coord.lon);
        const ranked = score(page, distanceKm, radiusKm);
        if (ranked < 0) return null;
        const place: Place & { score: number } = {
          id: String(page.pageid),
          title: page.title,
          blurb: (page.extract ?? page.description ?? '').trim(),
          photo: page.thumbnail?.source ?? null,
          lat: coord.lat,
          lng: coord.lon,
          distanceKm,
          kind: page.description ?? null,
          href: `https://en.wikipedia.org/?curid=${page.pageid}`,
          score: ranked,
        };
        return place;
      })
      .filter((p): p is Place & { score: number } => !!p)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(({ score: _score, ...rest }) => rest);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Sights around a point. Results are cached per rough location, so panning a
 * little or reopening a city costs nothing.
 */
export function fetchSights(lat: number, lng: number, radiusM = 6000): Promise<Place[]> {
  const key = `${lat.toFixed(2)}/${lng.toFixed(2)}/${Math.round(radiusM / 1000)}`;
  let task = cache.get(key);
  if (!task) {
    task = query(lat, lng, radiusM);
    cache.set(key, task);
  }
  return task;
}
