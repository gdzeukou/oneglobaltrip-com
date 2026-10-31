/**
 * Satellite imagery streamed onto the globe.
 *
 * The far view uses the Blue Marble textures baked into the bundle. Once the
 * camera drops below a few thousand kilometres across, that is no longer
 * enough pixels, so we fetch Web Mercator tiles for the patch of ground in
 * view, composite them into one canvas and hand that to the renderer as a
 * single "detail" texture with its Mercator bounds.
 *
 * Mercator is conformal: a square patch of sphere is a square in Mercator,
 * so one axis-aligned rectangle covers the view at any zoom.
 *
 * Tiles are cached as ImageBitmaps and drawn as they land, so the picture
 * sharpens progressively instead of popping in all at once.
 */

export type TileSource = {
  id: string;
  /** Tile URL for a Web Mercator XYZ address. */
  url: (z: number, x: number, y: number) => string;
  /** Shown under the globe. Required by most imagery licences. */
  attribution: string;
  attributionUrl: string;
  minZoom: number;
  maxZoom: number;
};

/**
 * Esri World Imagery: global satellite and aerial photography, no API key.
 * Override with VITE_TILE_URL (an {z}/{x}/{y} template) to point at your own
 * basemap, and VITE_TILE_ATTRIBUTION to credit it.
 */
export const ESRI_WORLD_IMAGERY: TileSource = {
  id: 'esri-world-imagery',
  url: (z, x, y) =>
    `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,
  attribution: 'Imagery: Esri, Maxar, Earthstar Geographics',
  attributionUrl: 'https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9',
  minZoom: 1,
  maxZoom: 19,
};

function sourceFromEnv(): TileSource {
  const template = import.meta.env?.VITE_TILE_URL as string | undefined;
  if (!template) return ESRI_WORLD_IMAGERY;
  return {
    id: 'custom',
    url: (z, x, y) =>
      template.replace('{z}', String(z)).replace('{x}', String(x)).replace('{y}', String(y)),
    attribution: (import.meta.env?.VITE_TILE_ATTRIBUTION as string) || 'Imagery',
    attributionUrl: (import.meta.env?.VITE_TILE_ATTRIBUTION_URL as string) || '#',
    minZoom: 1,
    maxZoom: Number(import.meta.env?.VITE_TILE_MAX_ZOOM ?? 19),
  };
}

export const TILE_SOURCE: TileSource = sourceFromEnv();

export const TILE_PX = 256;
/** Mercator cannot show the poles; this is the usual cutoff. */
export const MERC_MAX_LAT = 85.0511287798;

export function lngToMercX(lngDeg: number): number {
  return lngDeg / 360 + 0.5;
}

export function latToMercY(latDeg: number): number {
  const lat = Math.max(-MERC_MAX_LAT, Math.min(MERC_MAX_LAT, latDeg)) * (Math.PI / 180);
  return 0.5 - Math.log(Math.tan(Math.PI / 4 + lat / 2)) / (2 * Math.PI);
}

export function mercXToLng(x: number): number {
  return (x - 0.5) * 360;
}

export function mercYToLat(y: number): number {
  return (Math.atan(Math.sinh((0.5 - y) * 2 * Math.PI)) * 180) / Math.PI;
}

/** Mercator units covered by an angular radius on the sphere, at this latitude. */
export function mercRadius(angularRad: number, latDeg: number): number {
  const cos = Math.max(0.02, Math.cos((latDeg * Math.PI) / 180));
  return angularRad / (2 * Math.PI * cos);
}

export type DetailView = {
  /** Mercator bounds of the composited canvas: x0, y0, x1, y1. */
  rect: [number, number, number, number];
  canvas: HTMLCanvasElement;
  z: number;
  /** 0..1 — how much of the canvas has actually been painted. */
  coverage: number;
};

type Pending = { generation: number; tiles: number; drawn: number };

const MAX_TILES_PER_AXIS = 8;
const CACHE_LIMIT = 500;

export class TileStreamer {
  private source: TileSource;
  private cache = new Map<string, ImageBitmap>();
  private inflight = new Map<string, Promise<ImageBitmap | null>>();
  private failed = new Set<string>();
  private generation = 0;
  private pending: Pending | null = null;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  /** The window we were showing, kept to stand in until fresh tiles land. */
  private prev: HTMLCanvasElement;
  private prevCtx: CanvasRenderingContext2D;
  private prevRect: [number, number, number, number] | null = null;
  private view: DetailView | null = null;
  private onUpdate: (view: DetailView) => void;
  /** Drawn over the imagery once a window is composited (borders, say). */
  overlay: ((ctx: CanvasRenderingContext2D, view: DetailView) => void) | null = null;

  constructor(onUpdate: (view: DetailView) => void, source: TileSource = TILE_SOURCE) {
    this.onUpdate = onUpdate;
    this.source = source;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1;
    this.canvas.height = 1;
    const ctx = this.canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('2d context unavailable');
    this.ctx = ctx;
    this.prev = document.createElement('canvas');
    this.prev.width = 1;
    this.prev.height = 1;
    const prevCtx = this.prev.getContext('2d', { alpha: false });
    if (!prevCtx) throw new Error('2d context unavailable');
    this.prevCtx = prevCtx;
  }

  get attribution() {
    return { text: this.source.attribution, href: this.source.attributionUrl };
  }

  /**
   * The zoom whose pixels match the screen across this patch, stepped down
   * if that would need more tiles than we are willing to fetch at once.
   */
  zoomFor(halfMerc: number, viewportPx: number): number {
    const worldPx = viewportPx / Math.max(1e-9, 2 * halfMerc);
    let z = Math.round(Math.log2(worldPx / TILE_PX));
    const affordable = Math.floor(Math.log2(MAX_TILES_PER_AXIS / Math.max(1e-9, 2 * halfMerc)));
    z = Math.min(z, affordable);
    return Math.max(this.source.minZoom, Math.min(this.source.maxZoom, z));
  }

  /**
   * Ask for the ground under the camera. Cheap to call every frame: it
   * returns early unless the needed tile window actually changed.
   */
  request(centerLat: number, centerLng: number, angularRad: number, viewportPx: number): void {
    if (Math.abs(centerLat) > MERC_MAX_LAT - 0.5) return;
    // A margin so small camera moves reuse the window instead of refetching.
    const half = mercRadius(angularRad, centerLat) * 1.15;
    const z = this.zoomFor(half, viewportPx);
    const n = 2 ** z;
    const cx = lngToMercX(centerLng);
    const cy = latToMercY(centerLat);
    let x0 = Math.floor((cx - half) * n);
    let x1 = Math.floor((cx + half) * n);
    let y0 = Math.max(0, Math.floor((cy - half) * n));
    let y1 = Math.min(n - 1, Math.floor((cy + half) * n));
    if (x1 - x0 + 1 > MAX_TILES_PER_AXIS) {
      const mid = Math.floor(cx * n);
      x0 = mid - (MAX_TILES_PER_AXIS >> 1);
      x1 = x0 + MAX_TILES_PER_AXIS - 1;
    }
    if (y1 - y0 + 1 > MAX_TILES_PER_AXIS) {
      const mid = Math.floor(cy * n);
      y0 = Math.max(0, mid - (MAX_TILES_PER_AXIS >> 1));
      y1 = Math.min(n - 1, y0 + MAX_TILES_PER_AXIS - 1);
    }

    const key = `${z}/${x0}-${x1}/${y0}-${y1}`;
    if (this.windowKey === key) return;
    this.windowKey = key;
    void this.compose(z, x0, x1, y0, y1);
  }

  private windowKey = '';

  private async compose(z: number, x0: number, x1: number, y0: number, y1: number) {
    const generation = ++this.generation;
    const n = 2 ** z;
    const cols = x1 - x0 + 1;
    const rows = y1 - y0 + 1;
    const w = cols * TILE_PX;
    const h = rows * TILE_PX;

    // Keep what is on screen, so the new window opens on a stretched copy of
    // the old one rather than on a blue hole while its tiles are in flight.
    const old = this.prevRect;
    if (old) {
      if (this.prev.width !== this.canvas.width || this.prev.height !== this.canvas.height) {
        this.prev.width = this.canvas.width;
        this.prev.height = this.canvas.height;
      }
      this.prevCtx.drawImage(this.canvas, 0, 0);
    }

    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    // Deep water, so a tile that never arrives reads as ocean, not as a hole.
    this.ctx.fillStyle = '#0a1b33';
    this.ctx.fillRect(0, 0, w, h);
    if (old) {
      const sx = w / ((x1 + 1 - x0) / n);
      const sy = h / ((y1 + 1 - y0) / n);
      this.ctx.imageSmoothingQuality = 'high';
      this.ctx.drawImage(
        this.prev,
        (old[0] - x0 / n) * sx,
        (old[1] - y0 / n) * sy,
        (old[2] - old[0]) * sx,
        (old[3] - old[1]) * sy,
      );
    }
    this.prevRect = [x0 / n, y0 / n, (x1 + 1) / n, (y1 + 1) / n];

    const view: DetailView = {
      rect: [x0 / n, y0 / n, (x1 + 1) / n, (y1 + 1) / n],
      canvas: this.canvas,
      z,
      coverage: 0,
    };
    this.view = view;
    this.pending = { generation, tiles: cols * rows, drawn: 0 };

    // Cached tiles first: one synchronous pass, so a revisit paints at once.
    const misses: Array<[number, number]> = [];
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const bmp = this.cache.get(tileKey(z, wrapX(tx, n), ty));
        if (bmp) this.drawTile(bmp, tx - x0, ty - y0);
        else misses.push([tx, ty]);
      }
    }
    this.paint(generation, view, (cols * rows - misses.length) / (cols * rows));

    await Promise.all(
      misses.map(async ([tx, ty]) => {
        const bmp = await this.load(z, wrapX(tx, n), ty);
        if (generation !== this.generation) return;
        if (bmp) this.drawTile(bmp, tx - x0, ty - y0);
        const p = this.pending;
        if (!p || p.generation !== generation) return;
        p.drawn++;
        this.paint(generation, view, (cols * rows - misses.length + p.drawn) / (cols * rows));
      }),
    );
  }

  private paint(generation: number, view: DetailView, coverage: number) {
    if (generation !== this.generation) return;
    view.coverage = Math.min(1, coverage);
    this.overlay?.(this.ctx, view);
    this.onUpdate(view);
  }

  private drawTile(bmp: ImageBitmap, col: number, row: number) {
    this.ctx.drawImage(bmp, col * TILE_PX, row * TILE_PX, TILE_PX, TILE_PX);
  }

  private load(z: number, x: number, y: number): Promise<ImageBitmap | null> {
    const key = tileKey(z, x, y);
    const hit = this.cache.get(key);
    if (hit) return Promise.resolve(hit);
    if (this.failed.has(key)) return Promise.resolve(null);
    const existing = this.inflight.get(key);
    if (existing) return existing;

    const task = (async () => {
      try {
        const res = await fetch(this.source.url(z, x, y), { mode: 'cors', credentials: 'omit' });
        if (!res.ok) throw new Error(`tile ${key}: ${res.status}`);
        const bmp = await createImageBitmap(await res.blob());
        this.cache.set(key, bmp);
        if (this.cache.size > CACHE_LIMIT) {
          // Oldest first — Map keeps insertion order.
          const oldest = this.cache.keys().next().value as string | undefined;
          if (oldest) {
            this.cache.get(oldest)?.close?.();
            this.cache.delete(oldest);
          }
        }
        return bmp;
      } catch {
        this.failed.add(key);
        return null;
      } finally {
        this.inflight.delete(key);
      }
    })();
    this.inflight.set(key, task);
    return task;
  }

  current(): DetailView | null {
    return this.view;
  }

  /** Re-run the overlay and republish, e.g. once border data finishes loading. */
  refreshOverlay() {
    const view = this.view;
    if (!view) return;
    this.overlay?.(this.ctx, view);
    this.onUpdate(view);
  }

  destroy() {
    this.generation++;
    this.pending = null;
    this.view = null;
    this.prevRect = null;
    for (const bmp of this.cache.values()) bmp.close?.();
    this.cache.clear();
    this.inflight.clear();
  }
}

function tileKey(z: number, x: number, y: number) {
  return `${z}/${x}/${y}`;
}

function wrapX(x: number, n: number) {
  return ((x % n) + n) % n;
}
