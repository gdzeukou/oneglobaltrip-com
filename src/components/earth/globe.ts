/**
 * EarthGlobe — the WebGL2 engine behind WorldGlobe.
 *
 * Ported from Houston Signing Pro's apostille globe, then extended for OGT:
 * a movable origin, per-destination dot colours, tap-to-pick and zoom.
 *
 * No 3D library: four small programs (shaders.ts) on one canvas.
 *   1. the planet, ray-traced per pixel in a single full-screen pass
 *   2. a glowing dot on the surface for every destination (instanced)
 *   3. the origin → destination flight path (screen-space ribbon)
 *   4. glows over the markers and the head of the arc
 *
 * The class owns the camera, drag with inertia, the frame loop, texture
 * streaming (2K first, the 4K day map only for large canvases), adaptive
 * resolution and WebGL context-loss recovery. It also moves the HTML
 * labels, since only it knows where the markers land on screen.
 */

import {
  ARC_FS,
  ARC_VS,
  DOTS_FS,
  DOTS_VS,
  EARTH_FS,
  FULLSCREEN_VS,
  SPRITE_FS,
  SPRITE_VS,
} from "./shaders";
import { TileStreamer, mercRadius, type DetailView } from "./tiles";
import { drawMercator, ensureBorders, peekBorders, rasterEquirect } from "./borders";

export type LatLng = { lat: number; lng: number };
/** "clear": no visa or visa on arrival. "visa": a visa is needed first. */
export type DestinationTone = "clear" | "visa";
/** Linear-light RGB, 0..1. */
export type RGB = [number, number, number];
export type GlobeDot = LatLng & { color?: RGB };

export interface GlobeTextureUrls {
  day: string;
  day4k: string;
  lights: string;
  clouds: string;
  relief: string;
  water: string;
}

/** What the camera is looking at, for the UI to label. */
export interface GlobeView {
  lat: number;
  lng: number;
  /** Web Mercator zoom of the imagery on screen, 1 (planet) to 19 (street). */
  zoom: number;
  /** Width of the patch in view, in kilometres. */
  spanKm: number;
  /** 0 = Blue Marble, 1 = streamed satellite imagery. */
  detail: number;
}

export interface GlobeOptions {
  canvas: HTMLCanvasElement;
  /** Element that receives drag input; usually the canvas's parent. */
  input: HTMLElement;
  textures: GlobeTextureUrls;
  home: LatLng;
  dots: GlobeDot[];
  reduced: boolean;
  /**
   * How much of the canvas the planet fills at rest. The canvas covers the
   * viewport so streamed imagery can too, which is larger than the framing
   * the globe wants from space, so the page sets this from its own size.
   */
  idleScale?: number;
  labels: { home: () => HTMLElement | null; dest: () => HTMLElement | null };
  onReady?: () => void;
  onFail?: () => void;
  onUserDrag?: () => void;
  /** A tap or click on the planet (not a drag), with the point under it. */
  onPick?: (at: LatLng) => void;
  /** Camera moved: where it is now, and how close. Throttled to ~6/s. */
  onView?: (view: GlobeView) => void;
  /** Stream satellite tiles as the camera drops. On by default. */
  streaming?: boolean;
  /**
   * The places worth flying down to. Streamed imagery, and the deep end of
   * the zoom, only switch on near one of these: a city is what someone is
   * deciding about, and the rest of the planet is not worth the bandwidth.
   */
  anchors?: LatLng[];
}

type Vec3 = [number, number, number];

const DEG = Math.PI / 180;
const CAM_DIST = 4.2;
const IDLE_LAT = 22;
const IDLE_SCALE = 0.8;
const SCALE_MIN = 0.3;
/** Street level: about 400 m across the viewport. */
const SCALE_MAX = 14000;
const EARTH_RADIUS_KM = 6371;
/**
 * Half-width of the ground in view, in radians. For a small field of view the
 * ray at the edge of the viewport lands (uDist - 1) times its own angle away
 * from the point under the camera.
 */
function angularHalfWidth(scale: number, aspect: number): number {
  const ty = Math.tan(Math.asin(1 / CAM_DIST)) / scale;
  return (CAM_DIST - 1) * ty * Math.max(1, aspect);
}
/** Streamed imagery starts fading in here and is alone by the time it ends. */
const DETAIL_FROM = 0.32; // radians, about 2000 km
const DETAIL_TO = 0.12; // about 760 km
/**
 * Away from any city the camera stops at about 4500 km across, which is
 * roughly where the built-in world map runs out of pixels.
 */
const SCALE_NO_ANCHOR = 2.2;

/** Angle between two points on the sphere, in radians. */
function angleBetween(a: LatLng, b: LatLng): number {
  const r = DEG;
  const h =
    Math.sin(((b.lat - a.lat) * r) / 2) ** 2 +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lng - a.lng) * r) / 2) ** 2;
  return 2 * Math.asin(Math.min(1, Math.sqrt(h)));
}
const LAT_MIN = -28;
// High enough that routes over the pole (US → India) cross the face
// of the disc instead of running along its edge.
const LAT_MAX = 62;
const SPIN_DEG_PER_S = 4.5;
const ARC_SEGMENTS = 160;
const ARC_DRAW_S = 1.35;
const SUN: Vec3 = normalize([0.7, 0.42, 0.58]);

// Linear-light colours (the shaders tone-map and encode).
const HOME_COL: RGB = [0.3, 0.72, 1.0];
const GOLD_COL: RGB = [1.0, 0.68, 0.18];
const AMBER_COL: RGB = [1.0, 0.36, 0.16];
const ARC_START_COL: RGB = [0.62, 0.84, 1.0];
export const DOT_COL: RGB = [1.0, 0.72, 0.26];
const DOT_STRIDE = 7; // centre xyz, seed, colour rgb

function normalize(v: Vec3): Vec3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

export function latLngToVec(lat: number, lng: number): Vec3 {
  const cl = Math.cos(lat * DEG);
  return [cl * Math.sin(lng * DEG), Math.sin(lat * DEG), cl * Math.cos(lng * DEG)];
}

/** Earth-fixed → view rotation that puts (lat0, lng0) at the disc centre. Column-major. */
function rotationFor(lat0: number, lng0: number): Float32Array {
  const cb = Math.cos(lat0 * DEG);
  const sb = Math.sin(lat0 * DEG);
  const cl = Math.cos(lng0 * DEG);
  const sl = Math.sin(lng0 * DEG);
  return new Float32Array([cl, -sb * sl, cb * sl, 0, cb, sb, -sl, -sb * cl, cb * cl]);
}

function rotate(m: Float32Array, v: Vec3): Vec3 {
  return [
    m[0] * v[0] + m[3] * v[1] + m[6] * v[2],
    m[1] * v[0] + m[4] * v[1] + m[7] * v[2],
    m[2] * v[0] + m[5] * v[1] + m[8] * v[2],
  ];
}

/** Great-circle midpoint, so both ends of the arc are in view. */
function viewCenter(a: LatLng, b: LatLng): LatLng {
  const va = latLngToVec(a.lat, a.lng);
  const vb = latLngToVec(b.lat, b.lng);
  const s: Vec3 = [va[0] + vb[0], va[1] + vb[1], va[2] + vb[2]];
  const len = Math.hypot(s[0], s[1], s[2]);
  if (len < 0.15) return b; // near-antipodal: face the destination
  return { lat: Math.asin(s[1] / len) / DEG, lng: Math.atan2(s[0], s[2]) / DEG };
}

function wrapDeg(d: number): number {
  return ((((d + 180) % 360) + 360) % 360) - 180;
}

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function dotInstances(dots: GlobeDot[]): Float32Array {
  const inst = new Float32Array(Math.max(1, dots.length) * DOT_STRIDE);
  dots.forEach((d, i) => {
    const v = latLngToVec(d.lat, d.lng);
    const col = d.color ?? DOT_COL;
    inst.set([v[0], v[1], v[2], (i * 0.618034) % 1, col[0], col[1], col[2]], i * DOT_STRIDE);
  });
  return inst;
}

async function loadImage(url: string): Promise<TexImageSource> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`texture ${url}: ${res.status}`);
  const blob = await res.blob();
  if (typeof createImageBitmap === "function") {
    try {
      // Decode off the main thread, with the raw values intact.
      return await createImageBitmap(blob, {
        premultiplyAlpha: "none",
        colorSpaceConversion: "none",
      });
    } catch {
      // Older Safari rejects the options bag; fall through.
    }
  }
  const img = new Image();
  img.decoding = "async";
  const src = URL.createObjectURL(blob);
  img.src = src;
  try {
    await img.decode();
  } finally {
    URL.revokeObjectURL(src);
  }
  return img;
}

function compile(gl: WebGL2RenderingContext, vs: string, fs: string): WebGLProgram {
  const make = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS) && !gl.isContextLost()) {
      throw new Error(gl.getShaderInfoLog(s) || "shader compile failed");
    }
    return s;
  };
  const p = gl.createProgram()!;
  const v = make(gl.VERTEX_SHADER, vs);
  const f = make(gl.FRAGMENT_SHADER, fs);
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS) && !gl.isContextLost()) {
    throw new Error(gl.getProgramInfoLog(p) || "program link failed");
  }
  gl.deleteShader(v);
  gl.deleteShader(f);
  return p;
}

type Uniforms = Record<string, WebGLUniformLocation | null>;

function uniforms(gl: WebGL2RenderingContext, p: WebGLProgram, names: string[]): Uniforms {
  const out: Uniforms = {};
  for (const n of names) out[n] = gl.getUniformLocation(p, n);
  return out;
}

interface GL {
  gl: WebGL2RenderingContext;
  earth: { p: WebGLProgram; u: Uniforms; vao: WebGLVertexArrayObject };
  dots: { p: WebGLProgram; u: Uniforms; vao: WebGLVertexArrayObject; buf: WebGLBuffer; count: number };
  arc: { p: WebGLProgram; u: Uniforms; vao: WebGLVertexArrayObject; verts: number };
  sprite: { p: WebGLProgram; u: Uniforms; vao: WebGLVertexArrayObject };
  tex: Partial<Record<"day" | "lights" | "clouds" | "relief" | "water" | "detail" | "borders", WebGLTexture>>;
  aniso: number;
  anisoExt: EXT_texture_filter_anisotropic | null;
}

export class EarthGlobe {
  private o: GlobeOptions;
  private g: GL | null = null;
  private raf = 0;
  private running = false;
  private disposed = false;
  private ready = false;
  private hiResDay = false;
  private loadToken = 0;

  // Camera, in degrees. lng/lat are the point at the centre of the disc.
  private lng: number;
  private lat = IDLE_LAT;
  private idle = IDLE_SCALE;
  private scale = IDLE_SCALE;
  private targetLng: number | null = null;
  private targetLat = IDLE_LAT;
  private targetScale = IDLE_SCALE;
  private velocity = 0; // deg/s, after a flick

  // Destination and arc.
  private settle = false;
  private dest: LatLng | null = null;
  private tone: DestinationTone | null = null;
  private arcStart = -1e9;
  private arcOmega = 0;
  private arcHeight = 0;

  // Clock.
  private last = 0;
  private time = 0;
  private cloudU = 0;

  // Pointer.
  private pointer: {
    id: number;
    x: number;
    y: number;
    lng: number;
    lat: number;
    dragging: boolean;
    mouse: boolean;
    lastX: number;
    lastT: number;
    vel: number;
  } | null = null;

  // Streamed imagery and outlines.
  private streamer: TileStreamer | null = null;
  private detailView: DetailView | null = null;
  private detailDirty = false;
  private detailUploadedAt = 0;
  private detailMix = 0;
  private bordersPending = false;
  private borders50Pending = false;
  private lastViewEmit = 0;
  private anchors: LatLng[] = [];

  // Sizing and adaptive quality.
  private cssW = 1;
  private cssH = 1;
  private quality = 1;
  private frameTimes: number[] = [];
  private resizeObserver: ResizeObserver | null = null;

  // Label state, to skip no-op style writes and layout reads.
  private labelCache = new WeakMap<HTMLElement, string>();
  private labelWidth = new WeakMap<HTMLElement, { text: string; w: number }>();

  constructor(o: GlobeOptions) {
    this.o = o;
    this.anchors = o.anchors ?? [];
    this.idle = o.idleScale ?? IDLE_SCALE;
    this.scale = this.idle;
    this.targetScale = this.idle;
    this.lng = o.home.lng + 40;
    this.init();
    this.bindInput();
    const c = o.canvas;
    c.addEventListener("webglcontextlost", this.onContextLost);
    c.addEventListener("webglcontextrestored", this.onContextRestored);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(c);
    if (o.streaming !== false) this.startStreaming();
    void this.loadBorderRaster();
  }

  // ------------------------------------------------- imagery and outlines

  private startStreaming() {
    this.streamer = new TileStreamer((view) => {
      this.detailView = view;
      this.detailDirty = true;
      if (!this.running) this.uploadDetail();
    });
    // Outlines are inked over each streamed window, where a baked world map
    // would be far too coarse to follow a border between two fields.
    this.streamer.overlay = (ctx, view) => {
      const lines = peekBorders(view.z >= 5 ? 50 : 110) ?? peekBorders(110);
      if (lines) drawMercator(ctx, lines, view.rect, view.z);
      else void this.ensureDetailBorders(view.z);
    };
  }

  private async ensureDetailBorders(z: number) {
    const want = z >= 5 ? 50 : 110;
    if (want === 50 ? this.borders50Pending : this.bordersPending) return;
    if (want === 50) this.borders50Pending = true;
    else this.bordersPending = true;
    try {
      await ensureBorders(want);
      if (!this.disposed) this.streamer?.refreshOverlay();
    } catch {
      /* no outlines is survivable; the imagery still reads */
    }
  }

  /** Bake the whole-world outline map the far view samples. */
  private async loadBorderRaster() {
    try {
      const lines = await ensureBorders(110);
      if (this.disposed) return;
      const canvas = rasterEquirect(lines, 4096);
      this.upload("borders", canvas, false);
      if (this.running) this.draw();
    } catch {
      /* ditto */
    }
  }

  // ---------------------------------------------------------------- public

  setDestination(dest: LatLng | null, tone: DestinationTone | null) {
    const same =
      dest && this.dest && dest.lat === this.dest.lat && dest.lng === this.dest.lng && tone === this.tone;
    if (same) return;
    this.dest = dest;
    this.tone = tone;
    this.velocity = 0;
    if (dest) {
      const a = latLngToVec(this.o.home.lat, this.o.home.lng);
      const b = latLngToVec(dest.lat, dest.lng);
      const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
      this.arcOmega = Math.acos(dot);
      // Aim a little south of the midpoint: an arc seen dead-on rises
      // straight at the camera and reads as a flat line.
      const c = viewCenter(this.o.home, dest);
      const below = 5 + 9 * (this.arcOmega / Math.PI);
      this.targetLng = c.lng;
      this.targetLat = Math.max(LAT_MIN, Math.min(LAT_MAX, c.lat - below));
      this.arcHeight = 0.05 + 0.27 * (this.arcOmega / Math.PI);
      // Lean in for short hops, pull back for the long ones.
      this.targetScale = this.idle * (1 + 0.15 * (1 - smoothstep(18 * DEG, 75 * DEG, this.arcOmega)));
      this.arcStart = this.o.reduced ? -1e9 : this.time;
      this.settle = true;
      if (this.o.reduced) this.snapCamera();
    } else {
      this.targetLng = null;
      this.targetLat = IDLE_LAT;
      this.targetScale = this.idle;
    }
  }

  /** Reframe the planet after the page resizes. Ignored once zoomed in. */
  setIdleScale(idle: number) {
    const next = Math.max(0.2, Math.min(1.4, idle));
    const resting = Math.abs(this.targetScale - this.idle) < 1e-3;
    this.idle = next;
    if (resting) {
      this.targetScale = next;
      if (this.o.reduced) this.scale = next;
    }
  }

  setReduced(reduced: boolean) {
    this.o.reduced = reduced;
  }

  /** Move the origin of the flight path. Redraws the arc if one is showing. */
  setHome(home: LatLng) {
    if (home.lat === this.o.home.lat && home.lng === this.o.home.lng) return;
    this.o.home = home;
    const dest = this.dest;
    const tone = this.tone;
    this.dest = null;
    this.setDestination(dest, tone);
  }

  /** The cities the deep zoom is allowed to visit. */
  setAnchors(anchors: LatLng[]) {
    this.anchors = anchors;
  }

  /** How far the nearest of those cities is from the middle of the view. */
  private anchorDistance(): number {
    let best = Infinity;
    const here = { lat: this.lat, lng: this.lng };
    for (const a of this.anchors) {
      const d = angleBetween(here, a);
      if (d < best) best = d;
    }
    return best;
  }

  /**
   * How close the camera may get right here. Over a city, all the way down.
   * Over open ocean or empty desert there is nothing to see and no imagery
   * worth fetching, so it stops where the built-in map still holds up.
   */
  private scaleCeiling(): number {
    if (!this.anchors.length) return SCALE_MAX;
    const aspect = this.cssW / Math.max(1, this.cssH);
    const angular = angularHalfWidth(this.scale, aspect);
    // Generous while far out, tight once the city should be filling the view.
    const reach = Math.max(angular * 2.5, 0.025);
    if (this.anchorDistance() < reach) return SCALE_MAX;
    // Hold, never haul back: being over empty ocean should stop you going
    // deeper, not yank the camera out of where you already are.
    return Math.max(this.scale, SCALE_NO_ANCHOR);
  }

  /** Replace the destination dots. */
  setDots(dots: GlobeDot[]) {
    this.o.dots = dots;
    const g = this.g;
    if (!g || g.gl.isContextLost()) return;
    g.gl.bindBuffer(g.gl.ARRAY_BUFFER, g.dots.buf);
    g.gl.bufferData(g.gl.ARRAY_BUFFER, dotInstances(dots), g.gl.STATIC_DRAW);
    g.dots.count = dots.length;
  }

  /** Zoom in (> 1) or out (< 1), within limits. */
  zoomBy(factor: number) {
    this.targetScale = Math.max(SCALE_MIN, Math.min(this.scaleCeiling(), this.targetScale * factor));
    if (this.o.reduced) this.scale = this.targetScale;
  }

  /** Turn to face a point, keeping the current distance. */
  lookAt(at: LatLng) {
    const [latMin, latMax] = this.latLimit();
    this.velocity = 0;
    this.settle = false;
    this.targetLng = at.lng;
    this.targetLat = Math.max(latMin, Math.min(latMax, at.lat));
    if (this.o.reduced) this.snapCamera();
  }

  /** Put a point under the middle of the view at a given span, in km. */
  flyTo(at: LatLng, spanKm = 40) {
    const angular = spanKm / 2 / EARTH_RADIUS_KM;
    const ty = angular / (CAM_DIST - 1) / Math.max(1, this.cssW / this.cssH);
    this.dest = null;
    this.tone = null;
    this.velocity = 0;
    this.targetLng = at.lng;
    this.targetLat = at.lat;
    this.targetScale = Math.max(
      SCALE_MIN,
      Math.min(SCALE_MAX, Math.tan(Math.asin(1 / CAM_DIST)) / ty),
    );
    this.settle = false;
    if (this.o.reduced) this.snapCamera();
  }

  /** How far the camera can swing north and south: the whole globe, once in. */
  private latLimit(): [number, number] {
    const t = smoothstep(1.1, 3.0, this.scale);
    return [LAT_MIN + t * (-84 - LAT_MIN), LAT_MAX + t * (84 - LAT_MAX)];
  }

  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.last = 0;
    this.raf = requestAnimationFrame(this.frame);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  destroy() {
    this.disposed = true;
    this.stop();
    this.loadToken++;
    this.streamer?.destroy();
    this.streamer = null;
    this.detailView = null;
    this.resizeObserver?.disconnect();
    this.unbindInput();
    const c = this.o.canvas;
    c.removeEventListener("webglcontextlost", this.onContextLost);
    c.removeEventListener("webglcontextrestored", this.onContextRestored);
    const g = this.g;
    if (g && !g.gl.isContextLost()) {
      for (const t of Object.values(g.tex)) if (t) g.gl.deleteTexture(t);
      g.gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
    this.g = null;
  }

  // ------------------------------------------------------------- GL setup

  private init() {
    const gl = this.o.canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      // Edges are anti-aliased in the shaders; MSAA would only cost fill rate.
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      this.o.onFail?.();
      return;
    }
    try {
      this.g = this.build(gl);
    } catch (err) {
      console.warn("[globe]", err);
      this.g = null;
      this.o.onFail?.();
      return;
    }
    this.resize();
    void this.loadTextures();
  }

  private build(gl: WebGL2RenderingContext): GL {
    const buffer = (data: Float32Array) => {
      const b = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return b;
    };
    const attrib = (p: WebGLProgram, name: string, size: number, stride = 0, offset = 0, divisor = 0) => {
      const loc = gl.getAttribLocation(p, name);
      if (loc < 0) return;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, offset);
      if (divisor) gl.vertexAttribDivisor(loc, divisor);
    };
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

    // Planet.
    const ep = compile(gl, FULLSCREEN_VS, EARTH_FS);
    const evao = gl.createVertexArray()!;
    gl.bindVertexArray(evao);
    buffer(new Float32Array([-1, -1, 3, -1, -1, 3]));
    attrib(ep, "aPos", 2);
    const eu = uniforms(gl, ep, [
      "uDay", "uLights", "uClouds", "uRelief", "uWater", "uDetail", "uBorders",
      "uRot", "uDist", "uTan", "uSun", "uCloudU", "uTime", "uReliefTexel",
      "uMarkA", "uMarkB", "uColA", "uColB", "uMarkBOn",
      "uDetailRect", "uDetailMix", "uBorderMix",
    ]);

    // Destination dots.
    const dp = compile(gl, DOTS_VS, DOTS_FS);
    const dvao = gl.createVertexArray()!;
    gl.bindVertexArray(dvao);
    buffer(quad);
    attrib(dp, "aCorner", 2);
    const dbuf = buffer(dotInstances(this.o.dots));
    const stride = DOT_STRIDE * 4;
    attrib(dp, "aCenter", 3, stride, 0, 1);
    attrib(dp, "aSeed", 1, stride, 12, 1);
    attrib(dp, "aColor", 3, stride, 16, 1);
    const du = uniforms(gl, dp, ["uRot", "uDist", "uTan", "uSize", "uTime"]);

    // Arc ribbon: (t, side) pairs along a triangle strip.
    const ap = compile(gl, ARC_VS, ARC_FS);
    const avao = gl.createVertexArray()!;
    gl.bindVertexArray(avao);
    const arc = new Float32Array((ARC_SEGMENTS + 1) * 4);
    for (let i = 0; i <= ARC_SEGMENTS; i++) {
      const t = i / ARC_SEGMENTS;
      arc.set([t, -1, t, 1], i * 4);
    }
    buffer(arc);
    attrib(ap, "aT", 1, 8, 0);
    attrib(ap, "aSide", 1, 8, 4);
    const au = uniforms(gl, ap, [
      "uRot", "uDist", "uTan", "uA", "uB", "uOmega", "uHeight", "uViewport", "uWidth",
      "uProgress", "uTime", "uColA", "uColB", "uCore",
    ]);

    // Glow sprites.
    const sp = compile(gl, SPRITE_VS, SPRITE_FS);
    const svao = gl.createVertexArray()!;
    gl.bindVertexArray(svao);
    buffer(quad);
    attrib(sp, "aCorner", 2);
    const su = uniforms(gl, sp, ["uCenter", "uDist", "uTan", "uViewport", "uSizePx", "uColor", "uIntensity"]);

    gl.bindVertexArray(null);

    const anisoExt = gl.getExtension("EXT_texture_filter_anisotropic");
    const aniso = anisoExt ? Math.min(8, gl.getParameter(anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT)) : 0;

    return {
      gl,
      earth: { p: ep, u: eu, vao: evao },
      dots: { p: dp, u: du, vao: dvao, buf: dbuf, count: this.o.dots.length },
      arc: { p: ap, u: au, vao: avao, verts: (ARC_SEGMENTS + 1) * 2 },
      sprite: { p: sp, u: su, vao: svao },
      tex: {},
      aniso,
      anisoExt,
    };
  }

  private upload(name: keyof GL["tex"], src: TexImageSource, srgb: boolean, clamp = false) {
    const g = this.g;
    if (!g || g.gl.isContextLost()) return;
    const { gl } = g;
    const old = g.tex[name];
    const t = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    if (srgb) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.SRGB8_ALPHA8, gl.RGBA, gl.UNSIGNED_BYTE, src);
    } else {
      // Grey data maps: keep one channel, a quarter of the memory.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, gl.RED, gl.UNSIGNED_BYTE, src);
    }
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, clamp ? gl.CLAMP_TO_EDGE : gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (g.anisoExt && g.aniso > 1 && name !== "relief" && name !== "water") {
      gl.texParameterf(gl.TEXTURE_2D, g.anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, g.aniso);
    }
    g.tex[name] = t;
    if (old) gl.deleteTexture(old);
    if ("close" in src && typeof src.close === "function") src.close();
  }

  private async loadTextures() {
    const token = ++this.loadToken;
    const u = this.o.textures;
    try {
      const [day, lights, clouds, relief, water] = await Promise.all(
        [u.day, u.lights, u.clouds, u.relief, u.water].map(loadImage),
      );
      if (token !== this.loadToken || this.disposed) return;
      this.upload("day", day, true);
      this.upload("lights", lights, false);
      this.upload("clouds", clouds, false);
      this.upload("relief", relief, false);
      this.upload("water", water, false);
      this.hiResDay = false;
      if (!this.ready) {
        this.ready = true;
        this.o.onReady?.();
      }
      if (this.running) this.draw();
      this.maybeLoadHiRes();
    } catch (err) {
      if (token !== this.loadToken || this.disposed) return;
      console.warn("[globe]", err);
      this.o.onFail?.();
    }
  }

  /** Swap in the 4K day map once the disc is big enough for 2K to look soft. */
  private maybeLoadHiRes() {
    if (this.hiResDay || !this.ready) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const discPx = this.o.canvas.width * this.scale;
    if (discPx * Math.PI < 2048) return;
    this.hiResDay = true;
    const token = this.loadToken;
    loadImage(this.o.textures.day4k)
      .then((img) => {
        if (token !== this.loadToken || this.disposed) return;
        this.upload("day", img, true);
      })
      .catch(() => {
        this.hiResDay = false;
      });
  }

  private onContextLost = (e: Event) => {
    e.preventDefault();
    this.stop();
    this.loadToken++;
    this.g = null;
  };

  private onContextRestored = () => {
    if (this.disposed) return;
    this.ready = false;
    this.hiResDay = false;
    const gl = this.o.canvas.getContext("webgl2");
    if (!gl) return;
    try {
      this.g = this.build(gl);
    } catch {
      return;
    }
    this.resize();
    void this.loadTextures();
    void this.loadBorderRaster();
    this.detailDirty = true;
    this.start();
  };

  // ------------------------------------------------------------- sizing

  private resize() {
    const c = this.o.canvas;
    const w = Math.max(1, c.clientWidth);
    const h = Math.max(1, c.clientHeight);
    this.cssW = w;
    this.cssH = h;
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * this.quality;
    const pw = Math.max(1, Math.round(w * dpr));
    const ph = Math.max(1, Math.round(h * dpr));
    if (c.width !== pw || c.height !== ph) {
      c.width = pw;
      c.height = ph;
    }
    if (this.ready && this.running) this.draw();
    this.maybeLoadHiRes();
  }

  /** Drop resolution if the GPU can't hold ~45 fps. Never goes back up. */
  private trackFrame(dt: number) {
    if (this.time < 1.5 || this.quality <= 0.55) return;
    this.frameTimes.push(dt);
    if (this.frameTimes.length < 50) return;
    const sorted = [...this.frameTimes].sort((a, b) => a - b);
    this.frameTimes = [];
    const median = sorted[sorted.length >> 1];
    if (median > 1 / 45) {
      this.quality = Math.max(0.55, this.quality * 0.8);
      this.resize();
    }
  }

  // ------------------------------------------------------------- input

  private bindInput() {
    const el = this.o.input;
    el.addEventListener("pointerdown", this.onDown);
    el.addEventListener("pointermove", this.onMove);
    el.addEventListener("pointerup", this.onUp);
    el.addEventListener("pointercancel", this.onUp);
    el.addEventListener("wheel", this.onWheel, { passive: false });
  }

  private unbindInput() {
    const el = this.o.input;
    el.removeEventListener("pointerdown", this.onDown);
    el.removeEventListener("pointermove", this.onMove);
    el.removeEventListener("pointerup", this.onUp);
    el.removeEventListener("pointercancel", this.onUp);
    el.removeEventListener("wheel", this.onWheel);
  }

  /**
   * Zoom about a point on the canvas: take the ground under it, change the
   * scale, then turn the globe so that same ground is back under it.
   */
  private zoomAt(factor: number, clientX: number, clientY: number) {
    const rect = this.o.canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const before = this.pick(x, y);
    const next = Math.max(SCALE_MIN, Math.min(this.scaleCeiling(), this.scale * factor));
    if (next === this.scale) return;
    this.scale = next;
    this.targetScale = next;
    this.velocity = 0;
    const after = before ? this.pick(x, y) : null;
    if (before && after) {
      const [latMin, latMax] = this.latLimit();
      this.lng = wrapDeg(this.lng + wrapDeg(before.lng - after.lng));
      this.lat = Math.max(latMin, Math.min(latMax, this.lat + (before.lat - after.lat)));
      this.targetLng = null;
      this.targetLat = this.lat;
    }
    this.onUserMoved();
  }

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    // Trackpad pinch arrives as ctrl+wheel, and lines/pages need scaling up.
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
    const delta = e.deltaY * unit * (e.ctrlKey ? 2.2 : 1);
    this.zoomAt(Math.exp(-delta * 0.0022), e.clientX, e.clientY);
  };

  /** Called whenever the visitor takes the camera off its scripted path. */
  private onUserMoved() {
    this.settle = false;
    this.o.onUserDrag?.();
  }

  private degPerPx() {
    return 57.3 / Math.max(40, this.cssW * 0.5 * this.scale);
  }

  private pointers = new Map<number, { x: number; y: number }>();
  private pinch: { dist: number; x: number; y: number } | null = null;

  private onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    this.settle = false;
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      this.pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      this.pointer = null;
      this.velocity = 0;
      return;
    }
    if (this.pointers.size > 2) return;
    this.pointer = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      lng: this.lng,
      lat: this.lat,
      dragging: false,
      mouse: e.pointerType === "mouse",
      lastX: e.clientX,
      lastT: performance.now(),
      vel: 0,
    };
    this.velocity = 0;
  };

  private onMove = (e: PointerEvent) => {
    if (this.pointers.has(e.pointerId)) {
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }
    if (this.pinch && this.pointers.size >= 2) {
      const [a, b] = [...this.pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      if (this.pinch.dist > 8 && dist > 8) {
        this.zoomAt(dist / this.pinch.dist, this.pinch.x, this.pinch.y);
      }
      this.pinch = { dist, x: mx, y: my };
      return;
    }
    const p = this.pointer;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (!p.dragging) {
      // Touch keeps vertical page scroll (touch-action: pan-y): only a
      // sideways move counts as a drag. Mouse can tilt too.
      const sideways = Math.abs(dx) >= 4;
      // Close in there is nowhere to scroll to, so a finger can pan north
      // and south the way a map does.
      const tilt = (p.mouse || this.scale > 1.3) && Math.abs(dy) >= 4;
      if (!sideways && !tilt) return;
      p.dragging = true;
      this.targetLng = null;
      try {
        this.o.input.setPointerCapture(e.pointerId);
      } catch {
        // pointer already gone
      }
      this.o.onUserDrag?.();
    }
    const k = this.degPerPx();
    this.lng = p.lng - dx * k;
    if (p.mouse || this.scale > 1.3) {
      const [latMin, latMax] = this.latLimit();
      this.lat = Math.max(latMin, Math.min(latMax, p.lat + dy * k));
      this.targetLat = this.lat;
    }
    const now = performance.now();
    const dt = Math.max(1, now - p.lastT) / 1000;
    const inst = (-(e.clientX - p.lastX) * k) / dt;
    p.vel = p.vel * 0.6 + inst * 0.4;
    p.lastX = e.clientX;
    p.lastT = now;
  };

  private onUp = (e: PointerEvent) => {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinch = null;
    const p = this.pointer;
    if (!p || p.id !== e.pointerId) return;
    if (p.dragging && performance.now() - p.lastT < 80) {
      this.velocity = Math.max(-240, Math.min(240, p.vel));
    }
    this.pointer = null;
    if (!p.dragging && e.type === "pointerup" && this.o.onPick) {
      const rect = this.o.canvas.getBoundingClientRect();
      const at = this.pick(e.clientX - rect.left, e.clientY - rect.top);
      if (at) this.o.onPick(at);
    }
  };

  /** Lat/lng under a CSS-pixel point on the canvas, or null off the planet. */
  pick(x: number, y: number): LatLng | null {
    const tan = this.viewTan();
    const nx = (x / this.cssW - 0.5) * 2;
    const ny = (0.5 - y / this.cssH) * 2;
    // Ray from the camera at (0, 0, CAM_DIST) through the pixel.
    const d = normalize([nx * tan[0], ny * tan[1], -1]);
    const b = CAM_DIST * d[2];
    const c = CAM_DIST * CAM_DIST - 1;
    const disc = b * b - c;
    if (disc < 0) return null;
    const t = -b - Math.sqrt(disc);
    const hit: Vec3 = [d[0] * t, d[1] * t, CAM_DIST + d[2] * t];
    // View → earth-fixed: the rotation is orthonormal, so invert by transpose.
    const m = rotationFor(this.lat, this.lng);
    const v: Vec3 = [
      m[0] * hit[0] + m[1] * hit[1] + m[2] * hit[2],
      m[3] * hit[0] + m[4] * hit[1] + m[5] * hit[2],
      m[6] * hit[0] + m[7] * hit[1] + m[8] * hit[2],
    ];
    return {
      lat: Math.asin(Math.max(-1, Math.min(1, v[1]))) / DEG,
      lng: Math.atan2(v[0], v[2]) / DEG,
    };
  }

  // ------------------------------------------------------------- frame

  private snapCamera() {
    if (this.targetLng !== null) this.lng = this.targetLng;
    this.lat = this.targetLat;
    this.scale = this.targetScale;
  }

  private frame = (now: number) => {
    if (!this.running || this.disposed) return;
    const dt = this.last ? Math.min(0.05, (now - this.last) / 1000) : 1 / 60;
    this.last = now;
    if (this.last && dt > 0) this.trackFrame(dt);
    this.step(dt);
    if (this.ready) this.draw();
    this.raf = requestAnimationFrame(this.frame);
  };

  private step(dt: number) {
    const reduced = this.o.reduced;
    if (!reduced) {
      this.time += dt;
      this.cloudU += dt * 0.0011;
    }
    // The arc frames both ends while it draws. Once it has landed, close in
    // on the destination: that is the place, and it is what a scroll should
    // dive into.
    if (this.settle && this.dest && this.arcProgress() >= 1) {
      this.settle = false;
      const [latMin, latMax] = this.latLimit();
      this.targetLng = this.dest.lng;
      this.targetLat = Math.max(latMin, Math.min(latMax, this.dest.lat));
      this.targetScale = Math.min(SCALE_MAX, this.idle * 2.6);
      if (reduced) this.snapCamera();
    }

    const dragging = !!this.pointer?.dragging;
    if (!dragging) {
      if (Math.abs(this.velocity) > 0.5) {
        this.lng += this.velocity * dt;
        this.velocity *= Math.exp(-dt * 2.6);
      } else if (this.targetLng !== null) {
        const d = wrapDeg(this.targetLng - this.lng);
        this.lng += reduced ? d : d * (1 - Math.exp(-dt * 3.2));
      } else if (!reduced && !this.dest && this.scale < 1.15) {
        // The drifting planet is for the view from space. Once you are over
        // a country, the ground holds still.
        this.lng -= SPIN_DEG_PER_S * dt;
      }
      const kl = reduced ? 1 : 1 - Math.exp(-dt * 3.2);
      this.lat += (this.targetLat - this.lat) * kl;
    }
    const ks = reduced ? 1 : 1 - Math.exp(-dt * 2.4);
    this.scale += (this.targetScale - this.scale) * ks;
    this.lng = wrapDeg(this.lng);
    this.syncDetail(dt);
  }

  // --------------------------------------------------------- streamed view

  /** Ask the tile layer for the ground in view, and ease the crossfade. */
  private syncDetail(dt: number) {
    const aspect = this.cssW / Math.max(1, this.cssH);
    const angular = angularHalfWidth(this.scale, aspect);
    let want = 1 - smoothstep(DETAIL_TO, DETAIL_FROM, angular);
    if (this.anchors.length && this.anchorDistance() > Math.max(angular * 3, 0.03)) want = 0;
    const k = this.o.reduced ? 1 : 1 - Math.exp(-dt * 2.2);
    this.detailMix += (want - this.detailMix) * k;

    // Tiles are only worth fetching over somewhere a traveler might go.
    const nearCity = !this.anchors.length || this.anchorDistance() < Math.max(angular * 3, 0.03);
    if (this.streamer && want > 0.001 && nearCity) {
      this.streamer.request(this.lat, this.lng, angular, this.cssW);
    }

    const now = this.time;
    if (this.o.onView && now - this.lastViewEmit > 0.16) {
      this.lastViewEmit = now;
      const view = this.detailView;
      this.o.onView({
        lat: this.lat,
        lng: wrapDeg(this.lng),
        zoom: view && this.detailMix > 0.02
          ? view.z
          : Math.max(1, Math.log2(Math.PI / Math.max(1e-6, angular))),
        spanKm: 2 * angular * EARTH_RADIUS_KM,
        detail: this.detailMix,
      });
    }
  }

  /** Push the composited window to the GPU, at most a few times a second. */
  private uploadDetail() {
    const view = this.detailView;
    const g = this.g;
    if (!view || !g || g.gl.isContextLost()) return;
    const now = performance.now();
    if (view.coverage < 1 && now - this.detailUploadedAt < 90) return;
    this.detailUploadedAt = now;
    this.detailDirty = false;
    this.upload("detail", view.canvas, true, true);
  }

  private arcProgress(): number {
    if (!this.dest || !this.tone) return 0;
    const t = (this.time - this.arcStart) / ARC_DRAW_S;
    return easeInOutCubic(Math.min(1, Math.max(0, t)));
  }

  private arcPoint(t: number, rot: Float32Array): Vec3 {
    const a = latLngToVec(this.o.home.lat, this.o.home.lng);
    const b = this.dest ? latLngToVec(this.dest.lat, this.dest.lng) : a;
    const om = this.arcOmega;
    let p: Vec3;
    if (om < 1e-3) {
      p = normalize([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
    } else {
      const s = Math.sin(om);
      const wa = Math.sin((1 - t) * om) / s;
      const wb = Math.sin(t * om) / s;
      p = [a[0] * wa + b[0] * wb, a[1] * wa + b[1] * wb, a[2] * wa + b[2] * wb];
    }
    const lift = 1 + this.arcHeight * Math.pow(Math.sin(Math.PI * t), 0.85);
    return rotate(rot, [p[0] * lift, p[1] * lift, p[2] * lift]);
  }

  private viewTan(): [number, number] {
    const ty = Math.tan(Math.asin(1 / CAM_DIST)) / this.scale;
    return [ty * (this.cssW / this.cssH), ty];
  }

  private draw() {
    const g = this.g;
    if (!g || !g.tex.day || g.gl.isContextLost()) return;
    if (this.detailDirty) this.uploadDetail();
    const { gl } = g;
    const c = this.o.canvas;
    const W = c.width;
    const H = c.height;
    const rot = rotationFor(this.lat, this.lng);
    const tan = this.viewTan();
    const dpr = W / this.cssW;
    const home = latLngToVec(this.o.home.lat, this.o.home.lng);
    const dest = this.dest && this.tone ? latLngToVec(this.dest.lat, this.dest.lng) : null;
    const destCol = this.tone === "visa" ? AMBER_COL : GOLD_COL;
    const pulseTime = this.o.reduced ? 0.55 : this.time;

    gl.viewport(0, 0, W, H);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 1. Planet
    gl.disable(gl.BLEND);
    const e = g.earth;
    gl.useProgram(e.p);
    gl.bindVertexArray(e.vao);
    const units: [keyof GL["tex"], string][] = [
      ["day", "uDay"],
      ["lights", "uLights"],
      ["clouds", "uClouds"],
      ["relief", "uRelief"],
      ["water", "uWater"],
      ["detail", "uDetail"],
      ["borders", "uBorders"],
    ];
    units.forEach(([name, uni], i) => {
      gl.activeTexture(gl.TEXTURE0 + i);
      // Stand the day map in for one that hasn't loaded: its mix is 0 either
      // way, and an unbound sampler is undefined behaviour on some drivers.
      gl.bindTexture(gl.TEXTURE_2D, g.tex[name] ?? g.tex.day ?? null);
      gl.uniform1i(e.u[uni], i);
    });
    const detail = this.detailView;
    const detailMix = detail && g.tex.detail ? this.detailMix : 0;
    gl.uniform4f(
      e.u.uDetailRect,
      detail ? detail.rect[0] : 0,
      detail ? detail.rect[1] : 0,
      detail ? detail.rect[2] : 1,
      detail ? detail.rect[3] : 1,
    );
    gl.uniform1f(e.u.uDetailMix, detailMix);
    gl.uniform1f(e.u.uBorderMix, g.tex.borders ? 0.9 : 0);
    gl.uniformMatrix3fv(e.u.uRot, false, rot);
    gl.uniform1f(e.u.uDist, CAM_DIST);
    gl.uniform2f(e.u.uTan, tan[0], tan[1]);
    gl.uniform3fv(e.u.uSun, SUN);
    gl.uniform1f(e.u.uCloudU, this.cloudU);
    gl.uniform1f(e.u.uTime, pulseTime);
    gl.uniform2f(e.u.uReliefTexel, 1 / 2048, 1 / 1024);
    gl.uniform3fv(e.u.uMarkA, home);
    gl.uniform3fv(e.u.uMarkB, dest ?? [0, -1, 0]);
    gl.uniform3fv(e.u.uColA, HOME_COL);
    gl.uniform3fv(e.u.uColB, destCol);
    gl.uniform1f(e.u.uMarkBOn, dest ? smoothstep(0.75, 1, this.arcProgress()) : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.enable(gl.BLEND);

    // 2. Destination dots
    const d = g.dots;
    if (d.count) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(d.p);
      gl.bindVertexArray(d.vao);
      gl.uniformMatrix3fv(d.u.uRot, false, rot);
      gl.uniform1f(d.u.uDist, CAM_DIST);
      gl.uniform2f(d.u.uTan, tan[0], tan[1]);
      // At least ~3.5 CSS px across, however small the globe.
      const minSize = (4.6 * dpr) / (H * 0.5 * this.scale);
      gl.uniform1f(d.u.uSize, Math.max(0.0125, minSize));
      gl.uniform1f(d.u.uTime, pulseTime);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, d.count);
    }

    // Light adds: colour sums, alpha composites.
    gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // 3. Arc
    const progress = this.arcProgress();
    if (dest && progress > 0) {
      const a = g.arc;
      gl.useProgram(a.p);
      gl.bindVertexArray(a.vao);
      gl.uniformMatrix3fv(a.u.uRot, false, rot);
      gl.uniform1f(a.u.uDist, CAM_DIST);
      gl.uniform2f(a.u.uTan, tan[0], tan[1]);
      gl.uniform3fv(a.u.uA, home);
      gl.uniform3fv(a.u.uB, dest);
      gl.uniform1f(a.u.uOmega, this.arcOmega);
      gl.uniform1f(a.u.uHeight, this.arcHeight);
      gl.uniform2f(a.u.uViewport, W, H);
      gl.uniform1f(a.u.uWidth, 16 * dpr);
      gl.uniform1f(a.u.uCore, 0.16);
      gl.uniform1f(a.u.uProgress, progress);
      gl.uniform1f(a.u.uTime, pulseTime);
      gl.uniform3fv(a.u.uColA, ARC_START_COL);
      gl.uniform3fv(a.u.uColB, destCol);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, a.verts);
    }

    // 4. Glows
    const s = g.sprite;
    gl.useProgram(s.p);
    gl.bindVertexArray(s.vao);
    gl.uniform1f(s.u.uDist, CAM_DIST);
    gl.uniform2f(s.u.uTan, tan[0], tan[1]);
    gl.uniform2f(s.u.uViewport, W, H);
    const sprite = (center: Vec3, sizeCss: number, color: RGB, intensity: number) => {
      gl.uniform3fv(s.u.uCenter, center);
      gl.uniform1f(s.u.uSizePx, sizeCss * dpr);
      gl.uniform3fv(s.u.uColor, color);
      gl.uniform1f(s.u.uIntensity, intensity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const breathe = this.o.reduced ? 1 : 0.85 + 0.15 * Math.sin(this.time * 2.4);
    sprite(rotate(rot, home.map((x) => x * 1.002) as Vec3), 22, HOME_COL, 0.55 * breathe);
    if (dest) {
      const landed = smoothstep(0.8, 1, progress);
      if (landed > 0) {
        sprite(rotate(rot, dest.map((x) => x * 1.002) as Vec3), 26, destCol, 0.7 * landed * breathe);
      }
      if (progress > 0 && progress < 1) {
        sprite(this.arcPoint(progress, rot), 15, [1, 0.92, 0.7], 1.1);
      }
    }

    gl.bindVertexArray(null);
    this.placeLabels(rot, tan);
  }

  // ------------------------------------------------------------- labels

  /** Label width in CSS px, read from layout only when its text changes. */
  private measure(el: HTMLElement): number {
    const text = el.textContent ?? "";
    let m = this.labelWidth.get(el);
    if (!m || m.text !== text) {
      m = { text, w: el.offsetWidth };
      this.labelWidth.set(el, m);
    }
    return m.w;
  }

  private placeLabels(rot: Float32Array, tan: [number, number]) {
    const screen = (v: Vec3) => {
      const q = rotate(rot, v);
      const z = q[2] - CAM_DIST;
      return {
        x: ((q[0] / -z / tan[0]) * 0.5 + 0.5) * this.cssW,
        y: (0.5 - (q[1] / -z / tan[1]) * 0.5) * this.cssH,
        vis: smoothstep(1 / CAM_DIST + 0.03, 1 / CAM_DIST + 0.2, q[2]),
      };
    };
    const homeV = latLngToVec(this.o.home.lat, this.o.home.lng);
    const destV = this.dest && this.tone ? latLngToVec(this.dest.lat, this.dest.lng) : null;
    const hs = screen(homeV);
    const ds = destV ? screen(destV) : null;
    // When one end sits above the other, the arc runs between them; put the
    // lower label underneath its marker so neither pill covers the arc.
    let homeBelow = false;
    let destBelow = false;
    if (ds) {
      const dx = ds.x - hs.x;
      const dy = ds.y - hs.y;
      const homeEl = this.o.labels.home();
      const destEl = this.o.labels.dest();
      // Pills both above their markers and close enough to collide.
      const crowded =
        !!homeEl &&
        !!destEl &&
        Math.abs(dx) < (this.measure(homeEl) + this.measure(destEl)) / 2 + 8 &&
        Math.abs(dy) < 30;
      if (Math.abs(dy) > 0.6 * Math.abs(dx) || crowded) {
        if (dy > 0) destBelow = true;
        else homeBelow = true;
      }
    }

    const put = (
      el: HTMLElement | null,
      p: { x: number; y: number; vis: number } | null,
      show: number,
      below: boolean,
    ) => {
      if (!el) return;
      let css = "opacity:0";
      const onScreen =
        !!p && p.x > -40 && p.x < this.cssW + 40 && p.y > -40 && p.y < this.cssH + 40;
      if (p && show > 0 && onScreen) {
        const { x, y } = p;
        const vis = p.vis * show;
        // Keep the pill inside the frame.
        const half = this.measure(el) / 2 + 4;
        const cx = Math.max(half, Math.min(this.cssW - half, x));
        const shift = below ? "14px" : "calc(-100% - 12px)";
        css = `opacity:${vis.toFixed(3)};transform:translate3d(${cx.toFixed(1)}px,${y.toFixed(
          1,
        )}px,0) translate(-50%,${shift})`;
      }
      if (this.labelCache.get(el) === css) return;
      this.labelCache.set(el, css);
      el.style.cssText = css;
    };
    put(this.o.labels.home(), hs, 1, homeBelow);
    put(this.o.labels.dest(), ds, smoothstep(0.85, 1, this.arcProgress()), destBelow);
  }
}
