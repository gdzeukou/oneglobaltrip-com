/**
 * GLSL for the country-checker Earth (WebGL2 / GLSL ES 3.00).
 *
 * Conventions shared with globe.ts:
 *   - Earth-fixed space: +y is the north pole, lat/lng (0, 0) is +z.
 *     point(lat, lng) = (cos lat · sin lng, sin lat, cos lat · cos lng)
 *   - View space: camera on +z at uDist earth radii, looking at the origin.
 *   - uRot maps earth-fixed → view; `v * uRot` is the inverse (transpose).
 *   - Equirectangular textures: u = lng / 2π + 0.5, v = 0.5 − lat / π.
 */

/** One triangle that covers the viewport. */
export const FULLSCREEN_VS = /* glsl */ `#version 300 es
in vec2 aPos;
out vec2 vNdc;
void main() {
  vNdc = aPos;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/**
 * The planet, ray-traced per pixel: surface, clouds on a slightly larger
 * shell, city lights, ocean glint, relief shading, the atmosphere on and
 * around the disc, and pulse rings at the origin and the destination.
 */
export const EARTH_FS = /* glsl */ `#version 300 es
precision highp float;

in vec2 vNdc;
out vec4 fragColor;

uniform sampler2D uDay;     // sRGB colour
uniform sampler2D uLights;  // city lights, linear grey
uniform sampler2D uClouds;  // cloud cover, linear grey
uniform sampler2D uRelief;  // elevation, linear grey
uniform sampler2D uWater;   // 1 = open water
uniform sampler2D uDetail;  // streamed satellite imagery, sRGB
uniform sampler2D uBorders; // country outlines, linear coverage

uniform mat3 uRot;
uniform float uDist;
uniform vec2 uTan;          // view-plane half extent at z = -1
uniform vec3 uSun;          // view space, unit
uniform float uCloudU;      // cloud drift in texture u
uniform float uTime;        // seconds, frozen under reduced motion
uniform vec2 uReliefTexel;
uniform vec3 uMarkA;        // origin, earth-fixed unit vector
uniform vec3 uMarkB;        // destination
uniform vec3 uColA;
uniform vec3 uColB;
uniform float uMarkBOn;
uniform vec4 uDetailRect;   // streamed window in Mercator units: x0, y0, x1, y1
uniform float uDetailMix;   // 0 = Blue Marble only, 1 = streamed imagery
uniform float uBorderMix;

const float PI = 3.141592653589793;
const float TAU = 6.283185307179586;
// Atmosphere scale height in earth radii, about 6x the real one so the
// limb reads at web sizes.
const float HS = 0.016;
const vec3 BETA = vec3(0.16, 0.40, 1.0);
const float CLOUD_R = 1.006;

vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}
vec3 encode(vec3 lin) {
  return pow(aces(lin), vec3(1.0 / 2.2));
}
vec2 lonLatUv(vec3 p) {
  return vec2(atan(p.x, p.z) / TAU + 0.5, 0.5 - asin(clamp(p.y, -1.0, 1.0)) / PI);
}
float pulseRings(float d, float w, float t, float reach) {
  float s = 0.0;
  for (int k = 0; k < 2; k++) {
    float ph = fract(t * 0.42 + float(k) * 0.5);
    float r = ph * reach;
    float x = (d - r) / w;
    s += exp(-x * x) * pow(1.0 - ph, 1.7);
  }
  return s;
}

void main() {
  vec3 ro = vec3(0.0, 0.0, uDist);
  vec3 rd = normalize(vec3(vNdc * uTan, -1.0));
  float b = dot(ro, rd);
  float h2 = max(dot(ro, ro) - b * b, 0.0);
  float h = sqrt(h2);

  // Analytic edge coverage: one pixel of anti-aliasing on the silhouette.
  float cov = clamp((1.0 - h) / max(fwidth(h), 1e-5) + 0.5, 0.0, 1.0);

  // Surface hit, or the silhouette point for rays that miss, so the
  // texture coordinates (and their derivatives) stay continuous.
  float t = -b - sqrt(max(1.0 - h2, 0.0));
  vec3 p = normalize(ro + rd * t);
  vec3 po = p * uRot;
  vec2 uv = lonLatUv(po);

  // Seam-safe gradients (Tarini): take the u derivative from whichever of
  // u and fract(u + 0.5) is continuous at this pixel.
  vec2 gx = dFdx(uv);
  vec2 gy = dFdy(uv);
  float ub = fract(uv.x + 0.5);
  float gxb = dFdx(ub);
  float gyb = dFdy(ub);
  if (abs(gxb) + abs(gyb) < abs(gx.x) + abs(gy.x)) {
    gx.x = gxb;
    gy.x = gyb;
  }

  // Streamed imagery lives in a Mercator window. Mercator is conformal, so
  // the window is an axis-aligned rectangle however deep the camera goes.
  // Both detail gradients come from the seam-safe equirectangular ones, by
  // the chain rule, so the seam and the poles stay well behaved.
  float cosLat = sqrt(max(1.0 - po.y * po.y, 1e-6));
  float latR = asin(clamp(po.y, -1.0, 1.0));
  float mercY = 0.5 - log(tan(PI * 0.25 + clamp(latR, -1.4844, 1.4844) * 0.5)) / TAU;
  float rectCx = (uDetailRect.x + uDetailRect.z) * 0.5;
  float mercX = uv.x + (uv.x < rectCx - 0.5 ? 1.0 : (uv.x > rectCx + 0.5 ? -1.0 : 0.0));
  vec2 rectSize = max(uDetailRect.zw - uDetailRect.xy, vec2(1e-7));
  vec2 duv = (vec2(mercX, mercY) - uDetailRect.xy) / rectSize;
  float dydv = 1.0 / (2.0 * cosLat);
  vec2 dgx = vec2(gx.x, gx.y * dydv) / rectSize;
  vec2 dgy = vec2(gy.x, gy.y * dydv) / rectSize;
  vec2 edge = min(duv, 1.0 - duv);
  float detail = smoothstep(0.0, 0.025, min(edge.x, edge.y)) * uDetailMix;

  float dA = length(po - uMarkA);
  float dB = length(po - uMarkB);
  float wA = max(0.0032, fwidth(dA) * 1.15);
  float wB = max(0.0032, fwidth(dB) * 1.15);

  if (h > 1.6) {
    fragColor = vec4(0.0);
    return;
  }

  vec3 v = -rd;
  float ndlS = dot(p, uSun);
  vec3 sunCol = mix(vec3(1.0, 0.52, 0.26), vec3(1.0, 0.96, 0.90), smoothstep(-0.02, 0.20, ndlS));
  vec3 skyLight = mix(vec3(1.0, 0.48, 0.24), vec3(1.0), smoothstep(-0.02, 0.22, ndlS));

  vec3 earth = vec3(0.0);
  if (cov > 0.0) {
    vec3 day = textureGrad(uDay, uv, gx, gy).rgb;
    day = mix(day, textureGrad(uDetail, duv, dgx, dgy).rgb, detail);
    // The small maps are for the view from space: a 2K water mask and city
    // lights are nonsense over a street, so they leave as the ground sharpens.
    float water = textureGrad(uWater, uv, gx, gy).r * (1.0 - detail);
    float lights = textureGrad(uLights, uv, gx, gy).r * (1.0 - detail);

    // Relief: bend the normal along the elevation gradient.
    vec2 du = vec2(uReliefTexel.x, 0.0);
    vec2 dv = vec2(0.0, uReliefTexel.y);
    float hE = textureGrad(uRelief, uv + du, gx, gy).r - textureGrad(uRelief, uv - du, gx, gy).r;
    float hN = textureGrad(uRelief, uv - dv, gx, gy).r - textureGrad(uRelief, uv + dv, gx, gy).r;
    float lat = asin(clamp(po.y, -1.0, 1.0));
    float lng = atan(po.x, po.z);
    vec3 east = vec3(cos(lng), 0.0, -sin(lng));
    vec3 north = vec3(-sin(lat) * sin(lng), cos(lat), -sin(lat) * cos(lng));
    vec3 nObj = normalize(po - 2.6 * (1.0 - detail) * (hE / max(cos(lat), 0.2) * east + hN * north) * (1.0 - water));
    vec3 n = uRot * nObj;
    float ndl = dot(n, uSun);
    float lit = smoothstep(-0.05, 0.12, ndlS);

    // Clouds sit on a shell above the ground, so they shift against the
    // coastlines toward the limb.
    float tc = -b - sqrt(max(CLOUD_R * CLOUD_R - h2, 0.0));
    vec3 pc = (ro + rd * tc) / CLOUD_R;
    vec2 cuv = lonLatUv(pc * uRot) + vec2(uCloudU, 0.0);
    float cloud = smoothstep(0.20, 0.92, textureGrad(uClouds, cuv, gx, gy).r) * (1.0 - detail);

    // Cloud shadow: the cloud between this ground point and the sun.
    vec3 sunObj = uSun * uRot;
    vec2 suv = lonLatUv(normalize(po + sunObj * 0.014)) + vec2(uCloudU, 0.0);
    float shade = smoothstep(0.20, 0.92, textureGrad(uClouds, suv, gx, gy).r);

    // Zoomed in, the point is to see the place. Ease the terminator out so a
    // city that happens to be in local night is still legible on the ground.
    float dif = mix(clamp(ndl, 0.0, 1.0) * lit, 0.62, detail);
    vec3 ground = day * mix(sunCol, vec3(1.0), detail) * dif * 1.75;
    ground *= 1.0 - shade * 0.5 * lit;

    // Ocean: Fresnel sky reflection plus a tight sun glint and broad sheen.
    float nv = max(dot(p, v), 0.0);
    vec3 hv = normalize(uSun + v);
    float nh = max(dot(p, hv), 0.0);
    float fres = 0.02 + 0.98 * pow(1.0 - nv, 5.0);
    float glint = pow(nh, 700.0) * 0.9 + pow(nh, 60.0) * 0.05;
    ground += water * lit * (1.0 - cloud) *
      (sunCol * vec3(1.0, 0.9, 0.76) * glint * (0.4 + fres) + vec3(0.16, 0.36, 0.85) * fres * 0.22);

    // Night: earthshine so the dark side keeps its shape, then city lights.
    float night = 1.0 - smoothstep(-0.14, 0.03, ndlS);
    vec3 nightBase = day * vec3(0.010, 0.016, 0.034) * (1.0 - lit);
    vec3 city = mix(vec3(1.0, 0.50, 0.18), vec3(1.0, 0.86, 0.60), lights) * pow(lights, 1.15) * 4.2;

    float cLit = clamp(ndlS * 1.1 + 0.08, 0.0, 1.0) * smoothstep(-0.14, 0.10, ndlS);
    vec3 cloudCol = sunCol * cLit * 1.3 + vec3(0.010, 0.013, 0.024) * (1.0 - lit);
    earth = mix(ground + nightBase, cloudCol, cloud * 0.94);
    earth += city * night * (1.0 - cloud * 0.82);

    // Country outlines. The baked world map is only sharp from a distance;
    // close in, the streamed window carries its own freshly inked lines.
    float line = textureGrad(uBorders, uv, gx, gy).r * uBorderMix * (1.0 - detail);
    earth = mix(earth, vec3(1.0, 0.90, 0.66) * (0.45 + 0.9 * lit), clamp(line * 0.85, 0.0, 1.0));

    // Atmosphere in front of the surface: extinction plus in-scatter,
    // with the column density thickening toward the limb.
    float G = sqrt(PI * HS * 0.5);
    float tau = HS / (nv + HS / G);
    vec3 ext = exp(-tau * BETA * 7.0);
    float litA = smoothstep(-0.08, 0.28, ndlS);
    earth = earth * ext + (1.0 - ext) * skyLight * litA * 0.95;

    // Origin and destination: a hot core and rings rippling outward
    // across the curved surface.
    earth += uColA * (exp(-pow(dA / 0.0095, 2.0)) * 3.0 + pulseRings(dA, wA, uTime, 0.085) * 1.5);
    earth += uMarkBOn * uColB *
      (exp(-pow(dB / 0.0105, 2.0)) * 3.4 + pulseRings(dB, wB, uTime + 0.37, 0.095) * 1.7);
  }

  // Atmosphere around the disc: column density along a grazing ray through
  // an exponential shell (Chapman approximation), lit by the sun at the
  // ray's closest point, plus a wide faint bloom.
  float ho = max(h, 1.0);
  vec3 pcN = normalize(ro + rd * (-b));
  float ndlC = dot(pcN, uSun);
  float tauO = exp(-(ho - 1.0) / HS) * sqrt(TAU * ho * HS);
  vec3 skyC = mix(vec3(1.0, 0.44, 0.18), vec3(1.0), smoothstep(-0.04, 0.26, ndlC));
  float litC = smoothstep(-0.20, 0.30, ndlC);
  vec3 glow = (1.0 - exp(-tauO * BETA * 22.0)) * skyC * litC * 1.35;
  glow += vec3(0.22, 0.45, 1.0) * exp(-(ho - 1.0) / 0.075) * 0.085 * (0.25 + litC);

  vec3 earthOut = encode(earth);
  vec3 glowOut = encode(glow);
  float glowA = clamp(max(glowOut.r, max(glowOut.g, glowOut.b)), 0.0, 1.0);
  fragColor = vec4(mix(glowOut, earthOut, cov), mix(glowA, 1.0, cov));
}`;

/**
 * Destinations: small glowing discs lying flat on the surface, one instance
 * per destination. Discs foreshorten toward the limb and fade before they
 * slip around the back.
 */
export const DOTS_VS = /* glsl */ `#version 300 es
in vec2 aCorner;
in vec3 aCenter;     // earth-fixed unit vector
in float aSeed;
in vec3 aColor;
uniform mat3 uRot;
uniform float uDist;
uniform vec2 uTan;
uniform float uSize;
uniform float uTime;
out vec2 vCorner;
out float vFade;
out float vTwinkle;
out vec3 vColor;
void main() {
  vec3 n = uRot * aCenter;
  vec3 e1 = normalize(cross(abs(n.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0), n));
  vec3 e2 = cross(n, e1);
  vec3 pos = n * 1.0015 + (e1 * aCorner.x + e2 * aCorner.y) * uSize;
  vec3 q = pos - vec3(0.0, 0.0, uDist);
  float w = -q.z;
  gl_Position = vec4(q.x / uTan.x, q.y / uTan.y, 0.0, w);
  vCorner = aCorner;
  vFade = smoothstep(1.0 / uDist, 1.0 / uDist + 0.22, n.z);
  vTwinkle = 0.78 + 0.22 * sin(uTime * 1.6 + aSeed * 6.2831);
  vColor = aColor;
}`;

export const DOTS_FS = /* glsl */ `#version 300 es
precision highp float;
in vec2 vCorner;
in float vFade;
in float vTwinkle;
in vec3 vColor;
out vec4 fragColor;
void main() {
  float r = length(vCorner);
  float aa = max(fwidth(r), 1e-4);
  float core = 1.0 - smoothstep(0.24 - aa, 0.24 + aa, r);
  float ring = 1.0 - smoothstep(0.07, 0.07 + aa * 1.5, abs(r - 0.62));
  float glow = exp(-r * r * 9.0) * 0.45;
  float a = clamp(core + ring * 0.42 + glow, 0.0, 1.0) * vFade * vTwinkle;
  vec3 c = mix(vColor, vec3(1.0, 0.96, 0.84), core * 0.5);
  fragColor = vec4(c * a, a * 0.9);
}`;

/**
 * The origin → destination flight path: a ribbon along a raised great
 * circle, widened in screen space, drawn up to uProgress, with light
 * pulses running along it once it lands. Vertices behind the planet fade.
 */
export const ARC_VS = /* glsl */ `#version 300 es
in float aT;
in float aSide;
uniform mat3 uRot;
uniform float uDist;
uniform vec2 uTan;
uniform vec3 uA;
uniform vec3 uB;
uniform float uOmega;
uniform float uHeight;
uniform vec2 uViewport;     // device pixels
uniform float uWidth;       // device pixels, full ribbon width
out float vT;
out float vSide;
out float vVis;

#define PI_ 3.141592653589793

vec3 arcPoint(float t) {
  vec3 p;
  if (uOmega < 1e-3) {
    p = normalize(mix(uA, uB, t));
  } else {
    float s = sin(uOmega);
    p = (sin((1.0 - t) * uOmega) * uA + sin(t * uOmega) * uB) / s;
  }
  float lift = uHeight * pow(sin(PI_ * t), 0.85);
  return uRot * (p * (1.0 + lift));
}

vec4 project(vec3 v) {
  vec3 q = v - vec3(0.0, 0.0, uDist);
  return vec4(q.x / uTan.x, q.y / uTan.y, 0.0, -q.z);
}

void main() {
  vec3 P = arcPoint(aT);
  vec3 P2 = arcPoint(min(aT + 0.004, 1.0));
  vec3 P1 = arcPoint(max(aT - 0.004, 0.0));
  vec4 c = project(P);
  vec4 c1 = project(P1);
  vec4 c2 = project(P2);
  vec2 s1 = c1.xy / c1.w * uViewport;
  vec2 s2 = c2.xy / c2.w * uViewport;
  vec2 dir = normalize(s2 - s1 + vec2(1e-6, 0.0));
  vec2 nrm = vec2(-dir.y, dir.x);
  vec2 off = nrm * aSide * uWidth / uViewport;   // NDC: 2 * (w/2) / viewport
  gl_Position = vec4(c.xy + off * c.w, 0.0, c.w);

  // Hidden when the line of sight hits the planet first.
  vec3 C = vec3(0.0, 0.0, uDist);
  vec3 d = P - C;
  float L = length(d);
  d /= L;
  float bb = dot(C, d);
  float hh = sqrt(max(dot(C, C) - bb * bb, 0.0));
  float tHit = -bb - sqrt(max(1.0 - hh * hh, 0.0));
  vVis = (hh >= 1.0 || tHit >= L - 1e-3) ? 1.0 : smoothstep(0.975, 1.0, hh);

  vT = aT;
  vSide = aSide;
}`;

export const ARC_FS = /* glsl */ `#version 300 es
precision highp float;
in float vT;
in float vSide;
in float vVis;
uniform float uProgress;
uniform float uTime;
uniform vec3 uColA;
uniform vec3 uColB;
uniform float uCore;        // core half-width as a fraction of the ribbon
out vec4 fragColor;
void main() {
  if (vT > uProgress) discard;
  float x = vSide;
  float core = exp(-pow(x / uCore, 2.0));
  float halo = exp(-x * x * 3.2) * 0.5;
  // Brighter toward the head while it draws.
  float trail = mix(0.30, 1.0, smoothstep(uProgress - 0.45, uProgress, vT));
  // Light pulses heading out once the arc has landed.
  float landed = smoothstep(0.98, 1.0, uProgress);
  float ph = fract(uTime * 0.36);
  float pulse = exp(-pow((vT - ph) * 9.0, 2.0)) * landed;
  float ends = smoothstep(0.0, 0.03, vT);
  vec3 col = mix(uColA, uColB, smoothstep(0.1, 0.9, vT));
  float inten = (core * (0.9 + pulse * 1.6) + halo * (1.0 + pulse * 1.2)) * trail * ends * vVis;
  vec3 c = mix(col, vec3(1.0, 0.98, 0.92), core * 0.45) * inten;
  fragColor = vec4(c, clamp(inten * 0.55, 0.0, 1.0));
}`;

/** Screen-facing glows: the beacon over each marker and the arc's head. */
export const SPRITE_VS = /* glsl */ `#version 300 es
in vec2 aCorner;
uniform vec3 uCenter;       // view space
uniform float uDist;
uniform vec2 uTan;
uniform vec2 uViewport;
uniform float uSizePx;      // radius, device pixels
out vec2 vCorner;
out float vVis;
void main() {
  vec3 q = uCenter - vec3(0.0, 0.0, uDist);
  vec4 c = vec4(q.x / uTan.x, q.y / uTan.y, 0.0, -q.z);
  vec2 off = aCorner * uSizePx * 2.0 / uViewport;
  gl_Position = vec4(c.xy + off * c.w, 0.0, c.w);

  vec3 C = vec3(0.0, 0.0, uDist);
  vec3 d = uCenter - C;
  float L = length(d);
  d /= L;
  float bb = dot(C, d);
  float hh = sqrt(max(dot(C, C) - bb * bb, 0.0));
  float tHit = -bb - sqrt(max(1.0 - hh * hh, 0.0));
  vVis = (hh >= 1.0 || tHit >= L - 2e-3) ? 1.0 : smoothstep(0.985, 1.0, hh);
  vCorner = aCorner;
}`;

export const SPRITE_FS = /* glsl */ `#version 300 es
precision highp float;
in vec2 vCorner;
in float vVis;
uniform vec3 uColor;
uniform float uIntensity;
out vec4 fragColor;
void main() {
  float r2 = dot(vCorner, vCorner);
  if (r2 > 1.0) discard;
  float g = exp(-r2 * 9.0) * 1.1 + exp(-r2 * 2.6) * 0.35;
  float hot = exp(-r2 * 60.0);
  float i = g * uIntensity * vVis * (1.0 - r2);
  vec3 c = mix(uColor, vec3(1.0), hot * 0.8) * i;
  fragColor = vec4(c, clamp(i * 0.5, 0.0, 1.0));
}`;
