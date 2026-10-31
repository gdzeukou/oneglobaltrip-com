/**
 * Country outlines, drawn from real vector data rather than baked into the
 * imagery, so the lines stay one pixel wide at every zoom.
 *
 * Source: Natural Earth via the `world-atlas` package. 110m (about 100 KB)
 * for the view from space; 50m is fetched the first time the camera drops
 * low enough for the coarse outline to show its corners.
 *
 * Two consumers:
 *   - `rasterEquirect` bakes a whole-world alpha map the shader samples on
 *     the far view, matching the equirectangular Blue Marble textures.
 *   - `drawMercator` inks the same lines straight into the streamed tile
 *     window, where a baked texture would be far too coarse.
 */

type Line = number[][]; // [[lng, lat], …]

export type BorderLines = {
  /** Shared boundaries between two countries. */
  borders: Line[];
  /** Where a country meets the sea. */
  coast: Line[];
};

type Topology = {
  objects: Record<string, unknown>;
  arcs: unknown[];
  transform?: unknown;
};

const SPLIT_DEG = 170; // a longitude jump this big means the line wrapped

/** Break polylines where they cross the antimeridian, so nothing streaks. */
function split(lines: Line[]): Line[] {
  const out: Line[] = [];
  for (const line of lines) {
    let run: Line = [];
    for (let i = 0; i < line.length; i++) {
      if (i > 0 && Math.abs(line[i][0] - line[i - 1][0]) > SPLIT_DEG) {
        if (run.length > 1) out.push(run);
        run = [];
      }
      run.push(line[i]);
    }
    if (run.length > 1) out.push(run);
  }
  return out;
}

async function build(resolution: 110 | 50): Promise<BorderLines> {
  const [topo, topojson] = await Promise.all([
    resolution === 110
      ? import('world-atlas/countries-110m.json')
      : import('world-atlas/countries-50m.json'),
    import('topojson-client'),
  ]);
  const data = ((topo as { default?: Topology }).default ?? topo) as Topology;
  const countries = data.objects.countries as Parameters<typeof topojson.mesh>[1];
  const inner = topojson.mesh(data as never, countries, (a, b) => a !== b);
  const outer = topojson.mesh(data as never, countries, (a, b) => a === b);
  return {
    borders: split((inner.coordinates ?? []) as Line[]),
    coast: split((outer.coordinates ?? []) as Line[]),
  };
}

const cache = new Map<number, Promise<BorderLines>>();

export function loadBorders(resolution: 110 | 50 = 110): Promise<BorderLines> {
  let task = cache.get(resolution);
  if (!task) {
    task = build(resolution).catch((err) => {
      cache.delete(resolution);
      throw err;
    });
    cache.set(resolution, task);
  }
  return task;
}

/** Already-resolved data, for drawing inside a synchronous paint. */
export function peekBorders(resolution: 110 | 50): BorderLines | null {
  return resolved.get(resolution) ?? null;
}

const resolved = new Map<number, BorderLines>();

export async function ensureBorders(resolution: 110 | 50): Promise<BorderLines> {
  const lines = await loadBorders(resolution);
  resolved.set(resolution, lines);
  return lines;
}

function stroke(ctx: CanvasRenderingContext2D, lines: Line[], project: (lng: number, lat: number) => [number, number] | null) {
  ctx.beginPath();
  for (const line of lines) {
    let moved = false;
    for (const [lng, lat] of line) {
      const p = project(lng, lat);
      if (!p) {
        moved = false;
        continue;
      }
      if (moved) ctx.lineTo(p[0], p[1]);
      else ctx.moveTo(p[0], p[1]);
      moved = true;
    }
  }
  ctx.stroke();
}

/**
 * Bake the whole world into an equirectangular alpha map. White is a line;
 * country borders are drawn brighter than coastlines so the shader can tell
 * them apart by intensity alone.
 */
export function rasterEquirect(lines: BorderLines, width = 4096): HTMLCanvasElement {
  const height = width / 2;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const project = (lng: number, lat: number): [number, number] => [
    (lng / 360 + 0.5) * width,
    (0.5 - lat / 180) * height,
  ];

  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = width / 3600;
  stroke(ctx, lines.coast, project);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = width / 2600;
  stroke(ctx, lines.borders, project);
  return canvas;
}

/**
 * Ink the outlines over a streamed tile window. `rect` is the window in
 * Mercator units (x0, y0, x1, y1), matching the canvas.
 */
export function drawMercator(
  ctx: CanvasRenderingContext2D,
  lines: BorderLines,
  rect: [number, number, number, number],
  zoom: number,
) {
  const [x0, y0, x1, y1] = rect;
  const sx = ctx.canvas.width / (x1 - x0);
  const sy = ctx.canvas.height / (y1 - y0);
  const clampLat = 85.0511287798;

  // The window can straddle the seam; draw the world again one turn over.
  const shifts = x0 < 0 ? [0, -1] : x1 > 1 ? [0, 1] : [0];

  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 1.5;

  for (const shift of shifts) {
    const project = (lng: number, lat: number): [number, number] | null => {
      if (lat > clampLat || lat < -clampLat) return null;
      const mx = lng / 360 + 0.5 + shift;
      const rad = (lat * Math.PI) / 180;
      const my = 0.5 - Math.log(Math.tan(Math.PI / 4 + rad / 2)) / (2 * Math.PI);
      return [(mx - x0) * sx, (my - y0) * sy];
    };
    // A hairline. Over a coast the imagery already says where the water is;
    // the line is there to name the edge, not to redraw it.
    ctx.strokeStyle = 'rgba(255,238,205,0.20)';
    ctx.lineWidth = 0.75;
    stroke(ctx, lines.coast, project);

    ctx.strokeStyle = 'rgba(255,226,160,0.58)';
    ctx.lineWidth = zoom >= 9 ? 0.9 : 1.1;
    stroke(ctx, lines.borders, project);
  }
  ctx.restore();
}
