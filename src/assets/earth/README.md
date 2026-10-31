# Earth textures

Used by the country-checker globe (`client/src/components/home/earth/`).

Source: [Solar System Scope](https://www.solarsystemscope.com/textures/),
licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), built on
NASA Blue Marble and Black Marble imagery. We take the resized copies that
three.js ships in `examples/textures/planets/`.

Changes from the source: the ocean is regraded from flat blue to deep navy
with a lighter continental shelf, city lights are separated from the night
map's base layer, the packed elevation / land / cloud map is split into
single-channel files, and everything is re-encoded as WebP.
`script/earth-textures.py` does all of it.

The globe shows the required credit link under the canvas. Keep it if you
replace or move the component.

| File | Size | Content |
| --- | --- | --- |
| `day-2k.webp` | 2048×1024 | colour, phones and small screens |
| `day-4k.webp` | 4096×2048 | colour, loaded only when the disc is large enough |
| `lights-2k.webp` | 2048×1024 | city lights |
| `clouds-2k.webp` | 2048×1024 | cloud cover |
| `relief-2k.webp` | 2048×1024 | elevation, for relief shading |
| `water-1k.webp` | 1024×512 | open-water mask, for sun glint |
