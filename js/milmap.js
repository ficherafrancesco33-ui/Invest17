"use strict";
/* ==========================================================================
   KEYSTONE — Mappa 3D di Milano e hinterland (MapLibre + OpenFreeMap)
   Palazzi in 3D, vie e civici da OpenStreetMap; prezzi per microzona
   (immobiliare.it); confini dei quartieri (NIL, Comune di Milano) e dei comuni
   dell'hinterland (openpolis). Tocchi un palazzo → scheda → valutazione → PDF.
   ========================================================================== */
const MM = { map: null, sel: null, metric: "v", cells: null, nil: null, hint: null, ready: false, lay: { prezzi: true, nil: true, metro: true, poi: false, ann: true, d3: true } };
const MM_LIBS = [
  ["css", "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css"],
  ["js", "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js", () => window.maplibregl],
  ["js", "https://cdn.jsdelivr.net/npm/d3-delaunay@6.0.4/dist/d3-delaunay.min.js", () => window.d3 && window.d3.Delaunay],
  ["js", "https://cdn.jsdelivr.net/npm/polygon-clipping@0.15.7/dist/polygon-clipping.umd.min.js", () => window.polygonClipping],
];
const MM_NIL_URLS = [
  "https://dati.comune.milano.it/dataset/e8e765fc-d882-40b8-95d8-16ff3d39eb7c/resource/9c4e0776-56fc-4f3d-8a90-f4992a3be426/download/ds964_nil_wm.geojson",
  "https://dati.comune.milano.it/dataset/e74f6267-a6b5-4e61-8de6-c11f50f7990f/resource/d57873db-49e5-41d9-b044-65e12960bd02/download/ds2811_spotted-milan-urbanheatexposure-nil-01072024_31072024.geojson",
];
const MM_RAMP = [[0, "#1f1a0c"], [3000, "#3d3112"], [4000, "#6b5412"], [5000, "#9a7a1c"], [6000, "#c9a227"], [7500, "#e8c04a"], [9500, "#f8e7a8"], [12000, "#ffffff"]];
const MM_MET = { v: ["Vendita €/m²", f => f.v, v => eur(v)], a: ["Affitto €/m²", f => f.a, v => num(v, 1) + " €"], rl: ["Rendita lunga", f => f.a * 12 / f.v, v => pct(v, 1)] };

function mmLoad() {
  return Promise.all(MM_LIBS.map(([t, u, ok]) => new Promise((res, rej) => {
    if (ok && ok()) return res();
    if (document.querySelector(`[data-lib="${u}"]`)) { const iv = setInterval(() => { if (!ok || ok()) { clearInterval(iv); res(); } }, 60); setTimeout(() => { clearInterval(iv); rej(new Error(u)); }, 20000); return; }
    const el = document.createElement(t === "css" ? "link" : "script");
    el.dataset.lib = u;
    if (t === "css") { el.rel = "stylesheet"; el.href = u; document.head.appendChild(el); return res(); }
    el.src = u; el.onload = () => res(); el.onerror = () => rej(new Error(u)); document.head.appendChild(el);
  })));
}


/* ---------- stile "Plastico" (mini città): erba, asfalto, tetti colorati ---------- */
const PL_T = {
  oro: { grass: "#141414", res: "#171717", ind: "#1b1b1d", wood: "#1f2c18", park: "#1d2a17", water: "#0f2230", road: "#2a2620", roadCase: "#1a1814", major: "#8a6d16", majorCase: "#4a3a0e", dash: "#f2cf5b",
    school: "#1e1b14", farm: "#181a14", sand: "#211d14", rock: "#1c1c1c", grassy: "#1a2116", path: "#221f19", rail: "#3a3326", bnd: "#8a6d16", out: "#3a3320",
    roofs: ["#2e2a22", "#2a261f", "#332e25", "#2c2822", "#36302a", "#28241e"], lab: "#d9cfae", halo: "#141414", num: "#f2cf5b", accent: "#f2cf5b", city: "#f2cf5b", town: "#bdb39a", lake: "#7fb3d1" },
  sabbia: { grass: "#f1e6d4", res: "#efe2cd", ind: "#e4e0dc", wood: "#b9cf9a", park: "#c7dba8", water: "#8fc3cf", road: "#fffaf2", roadCase: "#e3d2bd", major: "#f0c38f", majorCase: "#c98f55", dash: "#ffffff",
    school: "#f3e1c4", farm: "#ece3c4", sand: "#f2e2b8", rock: "#ece8e2", grassy: "#d9e3bd", path: "#e9dcc7", rail: "#b9a892", bnd: "#c0582c", out: "#c9b39a",
    roofs: ["#e6d3bb", "#dcc3a3", "#e9c9a8", "#d6b894", "#efd9c0", "#cfae8c"], lab: "#4a3d33", halo: "#fffaf2", num: "#a8471f", accent: "#c0582c", city: "#2d4a53", town: "#5b4c40", lake: "#2f6f80" },
  notte: { grass: "#222c3b", res: "#263243", ind: "#2a3140", wood: "#22362d", park: "#24392f", water: "#163a55", road: "#3a4860", roadCase: "#1b2433", major: "#8a6a2a", majorCase: "#4a3a18", dash: "#f2b84b",
    school: "#2c3142", farm: "#253042", sand: "#323244", rock: "#2b3343", grassy: "#25352f", path: "#2f3a4d", rail: "#4a5670", bnd: "#f2b84b", out: "#33415a",
    roofs: ["#3a475c", "#36435a", "#404e66", "#344157", "#3d4a61", "#323e53"], lab: "#e6ebf2", halo: "#18202c", num: "#f2b84b", accent: "#f2b84b", city: "#f2b84b", town: "#c9d3e0", lake: "#8cc4e6" },
  dream: { grass: "#170e40", res: "#1b1249", ind: "#1d1650", wood: "#1c1f4f", park: "#1e2350", water: "#0b1a52", road: "#2e2466", roadCase: "#120a33", major: "#7c3aed", majorCase: "#3b1d80", dash: "#e9ddff",
    school: "#22185a", farm: "#1a1246", sand: "#251a5a", rock: "#211a52", grassy: "#1b1c4d", path: "#261c5e", rail: "#4c3a99", bnd: "#c084fc", out: "#3b2d7a",
    roofs: ["#2a1f5c", "#30246a", "#261b56", "#352a75", "#2d2263", "#3a2e80"], lab: "#e9ddff", halo: "#120a33", num: "#d8b4fe", accent: "#d8b4fe", city: "#d8b4fe", town: "#b9a8e6", lake: "#7aa8ff" },
};
let PL = PL_T.oro;
function plSet() { PL = PL_T[document.documentElement.dataset.th] || PL_T.oro; }
const plRoof = () => ["match", ["%", ["round", ["*", ["coalesce", ["get", "render_height"], 9], 7.3]], 6], 0, PL.roofs[0], 1, PL.roofs[1], 2, PL.roofs[2], 3, PL.roofs[3], 4, PL.roofs[4], PL.roofs[5]];
function plBase(S, opts = {}) {
  plSet();
  const L = [
    { id: "bg", type: "background", paint: { "background-color": PL.grass } },
    { id: "landuse", type: "fill", source: S, "source-layer": "landuse", paint: { "fill-color": ["match", ["get", "class"], ["residential", "suburb", "neighbourhood"], PL.res, ["commercial", "retail", "industrial", "railway"], PL.ind, ["school", "university", "college", "hospital"], PL.school, ["cemetery"], PL.park, PL.res], "fill-opacity": 0.9 } },
    { id: "landcover", type: "fill", source: S, "source-layer": "landcover", paint: { "fill-color": ["match", ["get", "class"], ["wood", "forest"], PL.wood, ["farmland"], PL.farm, ["sand"], PL.sand, ["ice", "rock"], PL.rock, PL.grassy], "fill-opacity": 0.9 } },
    { id: "park", type: "fill", source: S, "source-layer": "park", paint: { "fill-color": PL.park, "fill-outline-color": PL.wood } },
    { id: "water", type: "fill", source: S, "source-layer": "water", paint: { "fill-color": PL.water } },
    { id: "waterway", type: "line", source: S, "source-layer": "waterway", paint: { "line-color": PL.water, "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.8, 16, 5] } },
    { id: "rail", type: "line", source: S, "source-layer": "transportation", filter: ["==", ["get", "class"], "rail"], paint: { "line-color": PL.rail, "line-width": 1.4, "line-dasharray": [3, 2] } },
    { id: "road-minor-case", type: "line", source: S, "source-layer": "transportation", minzoom: 13, filter: ["match", ["get", "class"], ["minor", "service", "tertiary", "street"], true, false],
      paint: { "line-color": PL.roadCase, "line-width": ["interpolate", ["linear"], ["zoom"], 13, 1.4, 16, 6, 18, 14] } },
    { id: "road-minor", type: "line", source: S, "source-layer": "transportation", minzoom: 12, filter: ["match", ["get", "class"], ["minor", "service", "tertiary", "street", "path"], true, false],
      paint: { "line-color": ["match", ["get", "class"], "path", PL.path, PL.road], "line-width": ["interpolate", ["linear"], ["zoom"], 12, 0.6, 16, 4, 18, 11] } },
    { id: "road-major-case", type: "line", source: S, "source-layer": "transportation", filter: ["match", ["get", "class"], ["motorway", "trunk", "primary", "secondary"], true, false],
      paint: { "line-color": PL.majorCase, "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.8, 14, 5.5, 18, 18] } },
    { id: "road-major", type: "line", source: S, "source-layer": "transportation", filter: ["match", ["get", "class"], ["motorway", "trunk", "primary", "secondary"], true, false],
      paint: { "line-color": PL.major, "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.5, 14, 4, 18, 14] } },
    { id: "road-dash", type: "line", source: S, "source-layer": "transportation", minzoom: 13, filter: ["match", ["get", "class"], ["motorway", "trunk", "primary", "secondary"], true, false],
      paint: { "line-color": PL.dash, "line-opacity": 0.35, "line-width": ["interpolate", ["linear"], ["zoom"], 13, 0.5, 18, 1.2], "line-dasharray": [4, 4] } },
  ];
  if (opts.flat) L.push(
    { id: "bld-flat", type: "fill", source: S, "source-layer": "building", minzoom: 13, paint: { "fill-color": plRoof(), "fill-outline-color": PL.out } },
    { id: "bnd", type: "line", source: S, "source-layer": "boundary", filter: ["<=", ["get", "admin_level"], 6], paint: { "line-color": PL.bnd, "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0.8, 10, 1.8], "line-dasharray": [2, 1.5], "line-opacity": 0.8 } },
    { id: "place", type: "symbol", source: S, "source-layer": "place", filter: ["match", ["get", "class"], ["city", "town", "village"], true, false],
      layout: { "text-field": ["get", "name"], "text-font": ["Noto Sans Regular"], "text-size": ["match", ["get", "class"], "city", 13, "town", 11.5, 10.5] },
      paint: { "text-color": PL.lab, "text-halo-color": PL.halo, "text-halo-width": 1.8 } });
  return L;
}
/* mappe 2D (Leaflet): sfondo Plastico vettoriale sopra la mappa OpenStreetMap di riserva */
const PL_PLUGIN = "https://unpkg.com/@maplibre/maplibre-gl-leaflet@0.0.22/leaflet-maplibre-gl.js";
function plLeaflet(m, osm) {
  mmLoad().then(() => new Promise((res, rej) => { if (L.maplibreGL) return res(); const e = document.createElement("script"); e.src = PL_PLUGIN; e.onload = res; e.onerror = rej; document.head.appendChild(e); }))
    .then(() => { if (!m._container || !document.body.contains(m._container)) return;
      L.maplibreGL({ style: { version: 8, glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf", sources: { omt: { type: "vector", url: "https://tiles.openfreemap.org/planet" } }, layers: plBase("omt", { flat: true }) },
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · OpenFreeMap' }).addTo(m);
      setTimeout(() => osm && m.removeLayer(osm), 1500); })
    .catch(() => {});
}

/* ---------- geometria ---------- */
function mmInRing(pt, ring) { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, yi] = ring[i], [xj, yj] = ring[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c; } return c; }
function mmInGeom(pt, g) {
  if (!g) return false;
  const polys = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
  return polys.some(p => mmInRing(pt, p[0]) && !p.slice(1).some(h => mmInRing(pt, h)));
}
function mmSegDist(p, a, b) {   // metri, approssimazione piana
  const k = Math.cos(p[1] * Math.PI / 180), ax = (a[0] - p[0]) * k, ay = a[1] - p[1], bx = (b[0] - p[0]) * k, by = b[1] - p[1];
  const dx = bx - ax, dy = by - ay, t = clamp(-(ax * dx + ay * dy) / (dx * dx + dy * dy || 1), 0, 1);
  return Math.hypot(ax + t * dx, ay + t * dy) * 111320;
}
function mmUnPalazzo(g, ll) {   // dalla forma (anche multipla) tiene solo il poligono toccato
  if (!g) return null;
  const polys = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
  let best = polys.find(p => mmInRing(ll, p[0]));
  if (!best) { let dm = 1e18; for (const p of polys) { for (const c of p[0]) { const d = (c[0] - ll[0]) ** 2 + (c[1] - ll[1]) ** 2; if (d < dm) { dm = d; best = p; } } } }
  return best ? { type: "Polygon", coordinates: best } : null;
}
function mmLines(g) { return g.type === "LineString" ? [g.coordinates] : g.type === "MultiLineString" ? g.coordinates : []; }
function mmFeatCentro(f) { const c = tCentro(f.geometry); return c ? [c[1], c[0]] : null; }

/* ---------- celle di prezzo (Voronoi delle microzone, ritagliate sul comune di Milano) ---------- */
function mmCelle(milano) {
  const M = TERR.milano.micro, pts = M.map(m => [m.lon, m.lat]);
  const vor = d3.Delaunay.from(pts).voronoi([9.0, 45.35, 9.32, 45.56]);
  const clipGeom = milano ? (milano.geometry.type === "Polygon" ? [milano.geometry.coordinates] : milano.geometry.coordinates) : null;
  const feats = [];
  M.forEach((m, i) => {
    const ring = vor.cellPolygon(i); if (!ring) return;
    let geom = { type: "Polygon", coordinates: [ring] };
    if (clipGeom) { try { const r = polygonClipping.intersection([ring], clipGeom); if (!r.length) return; geom = { type: "MultiPolygon", coordinates: r }; } catch (e) { /* lascio la cella intera */ } }
    feats.push({ type: "Feature", id: i, properties: { i, n: m.n, z: m.z, v: m.v, a: m.a, rl: m.a * 12 / m.v }, geometry: geom });
  });
  return { type: "FeatureCollection", features: feats };
}
function mmMicroAt(lon, lat) {
  if (MM.cells) { const f = MM.cells.features.find(f => mmInGeom([lon, lat], f.geometry)); if (f) return TERR.milano.micro[f.properties.i]; }
  return null;
}

/* ---------- stile cyber ---------- */
function mmStile() {
  const S = "omt";
  return {
    version: 8, glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
    sources: { [S]: { type: "vector", url: "https://tiles.openfreemap.org/planet" } },
    layers: [
      ...plBase(S),
    ],
  };
}
function mmColorExpr(metric) {
  const key = metric === "a" ? "a" : metric === "rl" ? "rl" : "v";
  const ramp = metric === "a" ? MM_RAMP.map(([s, c]) => [s / 260, c]) : metric === "rl" ? [[0.025, "#2a220a"], [0.035, "#6b5412"], [0.042, "#c9a227"], [0.05, "#e8c04a"], [0.06, "#ffffff"]] : MM_RAMP;
  return ["interpolate", ["linear"], ["to-number", ["get", key]], ...ramp.flat()];
}
function mmLegend() {
  const met = MM_MET[MM.metric], ramp = MM.metric === "a" ? MM_RAMP.map(([s, c]) => [s / 260, c]) : MM.metric === "rl" ? [[0.025, "#2a220a"], [0.035, "#6b5412"], [0.042, "#c9a227"], [0.05, "#e8c04a"], [0.06, "#ffffff"]] : MM_RAMP;
  return `<div class="mmleg"><b>${met[0]}</b><span class="bar" style="background:linear-gradient(90deg,${ramp.map(r => r[1]).join(",")})"></span><span class="ends"><i>${met[2](ramp[0][0] || ramp[1][0])}</i><i>${met[2](ramp[ramp.length - 1][0])}+</i></span></div>`;
}

/* ---------- costruzione della mappa ---------- */
async function mmInit(el) {
  el.innerHTML = `<div class="mmload"><div class="spin"></div><span>Carico Milano in 3D…</span></div>`;
  try { await mmLoad(); } catch (e) { el.innerHTML = `<div class="mapfb">Non riesco a caricare la mappa 3D (serve la connessione). Riprova tra poco.</div>`; return; }
  if (!document.body.contains(el)) return;
  el.innerHTML = "";
  const map = new maplibregl.Map({ container: el, style: mmStile(), center: [9.19, 45.4642], zoom: 12.4, pitch: 52, bearing: -18, maxPitch: 75,
    attributionControl: { compact: true, customAttribution: "Dati: OpenStreetMap, OpenFreeMap, immobiliare.it, Comune di Milano, openpolis" }, antialias: true, fadeDuration: 0 });
  MM.map = map; maps.push(map);
  map.scrollZoom.disable();
  map.getCanvasContainer().addEventListener("wheel", ev => {
    ev.preventDefault();
    const rotella = ev.deltaMode === 1 || (ev.deltaX === 0 && Math.abs(ev.deltaY) >= 50 && Number.isInteger(ev.deltaY));
    if (ev.ctrlKey || rotella) {           // pizzico sul trackpad o rotellina: zoom verso il cursore
      const r = map.getCanvas().getBoundingClientRect(), p = [ev.clientX - r.left, ev.clientY - r.top];
      const dz = clamp(-ev.deltaY * (ev.ctrlKey ? 0.012 : 0.0025), -0.8, 0.8);
      map.easeTo({ zoom: map.getZoom() + dz, around: map.unproject(p), duration: ev.ctrlKey ? 0 : 160 });
    } else map.panBy([ev.deltaX, ev.deltaY], { duration: 0 });   // due dita sul trackpad: spostamento
  }, { passive: false });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
  map.addControl(new maplibregl.GeolocateControl({ positionOptions: { enableHighAccuracy: true } }), "bottom-right");
  map.on("load", async () => {
    // confini: comuni di Milano e Monza-Brianza
    let milano = null, comuni = [];
    try {
      const [g15, g108] = await Promise.all([tGeo(15), tGeo(108).catch(() => ({ features: [] }))]);
      comuni = [...g15.features, ...g108.features];
      milano = comuni.find(f => tnorm(tFname(f.properties)) === "milano");
    } catch (e) { /* senza confini dei comuni */ }
    MM.cells = mmCelle(milano);
    const I = tIdx();
    MM.hint = { type: "FeatureCollection", features: comuni.filter(f => f !== milano).map(f => { const c = I.byN.get(tnorm(tFname(f.properties)));
      return { type: "Feature", properties: { n: tFname(f.properties), v: c?.v ?? null, a: c?.a ?? null, rl: c?.rl ?? null }, geometry: f.geometry }; }) };
    const hintLab = { type: "FeatureCollection", features: MM.hint.features.map(f => { const c = mmFeatCentro(f); return c ? { type: "Feature", properties: { n: f.properties.n, v: f.properties.v }, geometry: { type: "Point", coordinates: c } } : null; }).filter(Boolean) };
    const cellLab = { type: "FeatureCollection", features: TERR.milano.micro.map(m => ({ type: "Feature", properties: { n: m.n, v: m.v, a: m.a, rl: m.a * 12 / m.v }, geometry: { type: "Point", coordinates: [m.lon, m.lat] } })) };
    map.addSource("cells", { type: "geojson", data: MM.cells });
    map.addSource("hint", { type: "geojson", data: MM.hint });
    map.addSource("hintlab", { type: "geojson", data: hintLab });
    map.addSource("celllab", { type: "geojson", data: cellLab });
    map.addLayer({ id: "hint-fill", type: "fill", source: "hint", filter: ["!=", ["get", "v"], null], paint: { "fill-color": mmColorExpr(MM.metric), "fill-opacity": ["interpolate", ["linear"], ["zoom"], 9, 0.4, 14, 0.16] } }, "road-minor-case");
    map.addLayer({ id: "hint-line", type: "line", source: "hint", paint: { "line-color": "#f2cf5b", "line-opacity": 0.45, "line-width": 1, "line-dasharray": [3, 2] } });
    map.addLayer({ id: "cell-fill", type: "fill", source: "cells", paint: { "fill-color": mmColorExpr(MM.metric), "fill-opacity": ["interpolate", ["linear"], ["zoom"], 10, 0.5, 14, 0.22, 16, 0.06] } }, "road-minor-case");
    map.addLayer({ id: "cell-line", type: "line", source: "cells", paint: { "line-color": "#c9a227", "line-opacity": 0.4, "line-width": 0.9 } });
    // palazzi in 3D
    map.addLayer({ id: "bld", type: "fill-extrusion", source: "omt", "source-layer": "building", minzoom: 13,
      paint: { "fill-extrusion-color": plRoof(),
        "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 13, 0, 14.5, ["coalesce", ["get", "render_height"], 10]],
        "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0], "fill-extrusion-opacity": 0.95, "fill-extrusion-vertical-gradient": true } });
    map.addSource("sel", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
    map.addLayer({ id: "sel-3d", type: "fill-extrusion", source: "sel", paint: { "fill-extrusion-color": "#f2cf5b", "fill-extrusion-height": ["+", ["coalesce", ["get", "h"], 12], 1.5], "fill-extrusion-base": 0, "fill-extrusion-opacity": 0.95 } });
    map.addLayer({ id: "sel-pin", type: "circle", source: "sel", filter: ["==", ["geometry-type"], "Point"], paint: { "circle-radius": 7, "circle-color": "#f2cf5b", "circle-stroke-color": "#141414", "circle-stroke-width": 2 } });
    // metro
    const M = TERR.milano, metroL = [], metroS = [];
    for (const [ln, arr] of Object.entries(M.metro)) {
      if (ln === "M1") { const i = arr.findIndex(s => s[0] === "Wagner"), pag = arr.find(s => s[0] === "Pagano");
        metroL.push({ ln, c: arr.slice(0, i).map(s => [s[2], s[1]]) }, { ln, c: [[pag[2], pag[1]], ...arr.slice(i).map(s => [s[2], s[1]])] }); }
      else metroL.push({ ln, c: arr.map(s => [s[2], s[1]]) });
      arr.forEach(s => metroS.push({ type: "Feature", properties: { n: s[0], ln, col: M.metro_col[ln] }, geometry: { type: "Point", coordinates: [s[2], s[1]] } }));
    }
    map.addSource("metro", { type: "geojson", data: { type: "FeatureCollection", features: metroL.map(l => ({ type: "Feature", properties: { col: M.metro_col[l.ln] }, geometry: { type: "LineString", coordinates: l.c } })) } });
    map.addSource("metros", { type: "geojson", data: { type: "FeatureCollection", features: metroS } });
    try { map.setLight({ anchor: "viewport", color: "#fff3d0", intensity: 0.35, position: [1.5, 210, 40] }); } catch (e) {}
    map.addLayer({ id: "metro-glow", type: "line", source: "metro", paint: { "line-color": ["get", "col"], "line-width": 7, "line-opacity": 0.25, "line-blur": 4 } });
    map.addLayer({ id: "metro", type: "line", source: "metro", paint: { "line-color": ["get", "col"], "line-width": 2.4 } });
    map.addLayer({ id: "metros", type: "circle", source: "metros", minzoom: 11.5, paint: { "circle-radius": 3.5, "circle-color": "#141414", "circle-stroke-color": ["get", "col"], "circle-stroke-width": 2 } });
    // punti di interesse
    map.addSource("poi", { type: "geojson", data: { type: "FeatureCollection", features: M.poi.map(([c, n, la, lo]) => ({ type: "Feature", properties: { c, n, col: T_POI[c][1] }, geometry: { type: "Point", coordinates: [lo, la] } })) } });
    map.addLayer({ id: "poi", type: "circle", source: "poi", layout: { visibility: MM.lay.poi ? "visible" : "none" }, paint: { "circle-radius": 6, "circle-color": ["get", "col"], "circle-stroke-color": "#141414", "circle-stroke-width": 1.5 } });
    // etichette: vie, civici, microzone, comuni
    map.addLayer({ id: "street-lab", type: "symbol", source: "omt", "source-layer": "transportation_name", minzoom: 14,
      layout: { "symbol-placement": "line", "text-field": ["get", "name"], "text-font": ["Noto Sans Regular"], "text-size": ["interpolate", ["linear"], ["zoom"], 14, 10, 18, 14], "text-max-angle": 30 },
      paint: { "text-color": PL.lab, "text-halo-color": PL.halo, "text-halo-width": 1.8 } });
    map.addLayer({ id: "housenum", type: "symbol", source: "omt", "source-layer": "housenumber", minzoom: 17,
      layout: { "text-field": ["get", "housenumber"], "text-font": ["Noto Sans Regular"], "text-size": 11 }, paint: { "text-color": PL.num, "text-halo-color": PL.halo, "text-halo-width": 1.6 } });
    mmRelabel();
    map.addLayer({ id: "hint-lab", type: "symbol", source: "hintlab", minzoom: 9.5,
      layout: { "text-field": ["concat", ["get", "n"], ["case", ["!=", ["get", "v"], null], ["concat", "\n", ["to-string", ["get", "v"]], " €"], ""]], "text-font": ["Noto Sans Regular"], "text-size": 11 },
      paint: { "text-color": PL.lab, "text-halo-color": PL.halo, "text-halo-width": 1.8 } });
    // quartieri ufficiali (NIL): se il Comune risponde
    mmNil(map);
    mmGeocodifica();   // pallini degli annunci tolti dalla mappa: restano come comparabili e nell'elenco dei privati
    map.on("click", e => { if (!e.originalEvent.__ann) mmTap(e); });
    map.on("mousemove", e => { map.getCanvas().style.cursor = map.queryRenderedFeatures(e.point, { layers: ["bld"] }).length ? "pointer" : ""; });
    MM.ready = true; mmApplyLayers();
    const s = MM.sel; if (s) mmShowSel(s, false);
    if (MM.fly) { map.flyTo({ center: MM.fly, zoom: 14.6, duration: 1200 }); MM.fly = null; }
  });
}
async function mmNil(map) {
  for (const u of MM_NIL_URLS) {
    try {
      const r = await fetch(u); if (!r.ok) continue; const g = await r.json(); if (!g.features?.length) continue;
      const nameOf = p => p.NIL || p.nil || p.Nil || p.NOME_NIL || p.nome || "";
      g.features.forEach(f => { f.properties = { nil: nameOf(f.properties), id: f.properties.ID_NIL ?? f.properties.id_nil ?? "" }; });
      MM.nil = g;
      if (!map.getStyle()) return;
      map.addSource("nil", { type: "geojson", data: g });
      map.addLayer({ id: "nil-line", type: "line", source: "nil", layout: { visibility: MM.lay.nil ? "visible" : "none" }, paint: { "line-color": "#f5d76e", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.8, 15, 2], "line-opacity": 0.6, "line-dasharray": [2, 1.2] } }, "bld");
      const lab = { type: "FeatureCollection", features: g.features.map(f => { const c = mmFeatCentro(f); return c ? { type: "Feature", properties: { n: f.properties.nil }, geometry: { type: "Point", coordinates: c } } : null; }).filter(Boolean) };
      map.addSource("nillab", { type: "geojson", data: lab });
      map.addLayer({ id: "nil-lab", type: "symbol", source: "nillab", minzoom: 12.2, maxzoom: 16, layout: { visibility: MM.lay.nil ? "visible" : "none", "text-field": ["upcase", ["get", "n"]], "text-font": ["Noto Sans Regular"], "text-size": 10.5, "text-letter-spacing": 0.12 },
        paint: { "text-color": PL.accent, "text-halo-color": PL.halo, "text-halo-width": 1.6 } });
      const b = $("#mmnilnote"); if (b) b.hidden = true;
      return;
    } catch (e) { /* provo la fonte successiva */ }
  }
  const b = $("#mmnilnote"); if (b) b.hidden = false;
}
function mmApplyLayers() {
  const map = MM.map; if (!map || !MM.ready) return;
  const vis = (ids, on) => ids.forEach(id => map.getLayer(id) && map.setLayoutProperty(id, "visibility", on ? "visible" : "none"));
  vis(["cell-fill", "cell-line", "cell-lab", "hint-fill"], MM.lay.prezzi);
  vis(["nil-line", "nil-lab"], MM.lay.nil);
  vis(["metro", "metro-glow", "metros"], MM.lay.metro);
  vis(["poi"], MM.lay.poi);
  map.setPaintProperty("bld", "fill-extrusion-height", MM.lay.d3 ? ["interpolate", ["linear"], ["zoom"], 13, 0, 14.5, ["coalesce", ["get", "render_height"], 10]] : 0);
  ["cell-fill", "hint-fill"].forEach(id => map.getLayer(id) && map.setPaintProperty(id, "fill-color", mmColorExpr(MM.metric)));
  if (MM.lay.d3 && map.getPitch() < 20) map.easeTo({ pitch: 52, duration: 600 }); if (!MM.lay.d3 && map.getPitch() > 0) map.easeTo({ pitch: 0, bearing: 0, duration: 600 });
  const lg = $("#mmleg"); if (lg) lg.innerHTML = mmLegend();
}

/* ---------- tocco su un palazzo / punto ---------- */
function mmTap(e) {
  const map = MM.map, ll = [e.lngLat.lng, e.lngLat.lat];
  const b = map.queryRenderedFeatures(e.point, { layers: ["bld"] })[0];
  const geomB = b ? mmUnPalazzo(b.geometry, ll) : null;
  const centro = geomB ? (mmFeatCentro({ geometry: geomB }) || ll) : ll;
  // civico più vicino e via più vicina (dalle tessere già caricate)
  let civ = null, dc = 1e9, via = null, dv = 1e9;
  for (const f of map.querySourceFeatures("omt", { sourceLayer: "housenumber" })) {
    const c = f.geometry.coordinates, d = mmSegDist(centro, c, c);
    if (d < dc) { dc = d; civ = f.properties.housenumber; }
  }
  for (const f of map.querySourceFeatures("omt", { sourceLayer: "transportation_name" })) {
    if (!f.properties.name) continue;
    for (const ln of mmLines(f.geometry)) for (let i = 1; i < ln.length; i++) { const d = mmSegDist(centro, ln[i - 1], ln[i]); if (d < dv) { dv = d; via = f.properties.name; } }
  }
  const micro = mmMicroAt(centro[0], centro[1]);
  const nil = MM.nil ? MM.nil.features.find(f => mmInGeom(centro, f.geometry))?.properties.nil : null;
  const com = !micro && MM.hint ? MM.hint.features.find(f => mmInGeom(centro, f.geometry))?.properties : null;
  const h = b ? (b.properties.render_height || null) : null;
  const sel = { lon: centro[0], lat: centro[1], via: dv < 120 ? via : null, civ: dc < 35 ? civ : null, micro: micro ? micro.n : null, zona: micro ? micro.z : null, nil, comune: micro ? "Milano" : com?.n || null,
    h, piani: h ? Math.max(1, Math.round(h / 3.1)) : null, geom: geomB };
  MM.sel = sel; store.set("mm_sel", { ...sel, geom: null });
  mmShowSel(sel, true);
}
function mmShowSel(sel, fly) {
  const map = MM.map;
  if (map && map.getSource("sel")) map.getSource("sel").setData({ type: "FeatureCollection", features: [sel.geom ? { type: "Feature", properties: { h: sel.h || 12 }, geometry: sel.geom } : { type: "Feature", properties: {}, geometry: { type: "Point", coordinates: [sel.lon, sel.lat] } }] });
  if (MM.onSel) MM.onSel(sel);
  const box = $("#mmsheet"); if (!box) return;
  box.innerHTML = mmScheda(sel); box.hidden = false;
  if (fly && map && map.getZoom() < 15) map.easeTo({ center: [sel.lon, sel.lat], zoom: 16, duration: 700 });
}
function mmCtx(sel) {
  if (!sel) return null;
  const mi = sel.micro ? TERR.milano.micro.find(m => m.n === sel.micro) : null;
  if (mi) { const z = TERR.milano.zone.find(x => x.n === mi.z); return { v: mi.v, a: mi.a, nome: mmIndirizzo(sel), milano: true, str: MZ_STR({ ...z, v: mi.v }), micro: mi, zona: z, sel }; }
  if (sel.comune) { const c = tIdx().byN.get(tnorm(sel.comune)); if (c && c.v) return { v: c.v, a: c.a, nome: mmIndirizzo(sel), milano: false, str: tStrVicino({ ...c, lat: sel.lat, lon: sel.lon }), sel, com: c }; }
  return null;
}
const mmIndirizzo = s => [s.via ? s.via + (s.civ ? " " + s.civ : "") : "Punto sulla mappa", s.comune || ""].filter(Boolean).join(", ");
function mmScheda(s) {
  const c = mmCtx(s);
  const near = mzVicini({ lat: s.lat, lon: s.lon });
  return `<button class="mmx" data-close aria-label="Chiudi">✕</button>
    <div class="loc">${esc([s.nil, s.micro || s.comune].filter(Boolean).join(" · ") || "Fuori dalle zone con prezzi")}</div>
    <h3 class="mmt">${esc(mmIndirizzo(s))}</h3>
    ${s.piani ? `<p class="note" style="margin:2px 0 0">Palazzo di circa ${s.piani} piani (${num(s.h)} m)</p>` : ""}
    ${c ? `<div class="offer" style="margin-top:8px">
      <div><small>Vendita</small><b>${eur(c.v)}</b><em>al m² · ${esc(c.micro ? "microzona" : "comune")}</em></div>
      <div><small>Affitto</small><b>${num(c.a, 1)} €</b><em>al m² al mese</em></div>
      <div><small>Rendita</small><b class="cy">${pct(c.a * 12 / c.v, 1)}</b><em>lorda, lungo</em></div></div>` : `<p class="note">Qui non ho prezzi: tocca un punto dentro Milano o in un comune colorato.</p>`}
    ${near.staz.length ? `<p class="note">Metro: ${near.staz.slice(0, 3).map(x => `${esc(x.n)} ${[...x.ln].map(l => `<span class="ml" style="--mc:${TERR.milano.metro_col[l]}">${l}</span>`).join("")} <em>${num(Math.round(x.d / 10) * 10)} m</em>`).join(" · ")}</p>` : ""}
    ${c ? `<div class="btns" style="margin-top:8px"><button class="btn pri" data-valuta>${{ inv: "Calcola l'investimento qui", sub: "Business plan qui", privati: "Vai all'elenco", cliente: "Valuta per il cliente" }[MM.mode] || "Valuta un immobile qui"}</button></div>` : ""}`;
}

/* ---------- vista Milano ---------- */
function vMilano3D(zona, mode = "mappa") {
  MM.mode = mode; const MD = MI_MODI[mode] || MI_MODI.cliente;
  const f = store.get("f_mm", null); if (f) { MM.metric = f.metric || "v"; Object.assign(MM.lay, f.lay || {}); }
  MM.sel = store.get("mm_sel", null);
  const M = TERR.milano;
  if (mode === "privati") return `${miBread(mode)}<h1>${esc(MD.t)}</h1><p class="sub">${MD.sub}</p>${miPrivatiHtml()}
    <p class="src">Annunci: Immobiliare.it e Trovit, letti il 20/11/2026. Mappa: © OpenStreetMap.</p>`;
  return `${miBread(mode)}<h1>${esc(MD.t)}</h1><p class="sub">${MD.sub}</p>
  <div class="mmbar">
    <div class="mmsearch"><input type="search" id="mmq" placeholder="Cerca un indirizzo: via Tortona 27" autocomplete="off"><div id="mmres" class="mmres" hidden></div></div>
    <div class="chips" id="mmm">${Object.entries(MM_MET).map(([k, m]) => `<button class="chip ${k === MM.metric ? "on" : ""}" data-m="${k}">${m[0]}</button>`).join("")}</div>
    <div class="chips" id="mml">${[["prezzi", "Prezzi"], ["nil", "Quartieri"], ["metro", "Metro"], ["poi", "Servizi"], ["d3", "3D"]].map(([k, t]) => `<button class="chip lay ${MM.lay[k] ? "on" : ""}" data-l="${k}" style="--lc:${{ prezzi: "#c9a227", ann: "#f5d76e", nil: "#e9c46a", metro: "#e3242b", poi: "#facc15", d3: "#f2cf5b" }[k]}"><i></i>${t}</button>`).join("")}</div>
  </div>
  <div class="mmwrap"><div class="mm3d" id="mm3d"></div><div class="mmsheet" id="mmsheet" hidden></div></div>
  <div id="mmleg">${mmLegend()}</div>
  <p class="note">Da computer: due dita sul trackpad per spostarti, pizzico o rotellina per lo zoom, tasto destro (o Ctrl + trascina) per ruotare e inclinare. Da telefono: un dito sposta, due dita zoomano e ruotano.</p>
  <p class="note" id="mmnilnote" hidden>I confini ufficiali dei quartieri del Comune non si sono caricati: vedi le microzone di prezzo (linee azzurre).</p>
  ${mode === "privati" ? miPrivatiHtml() : mode === "sub" ? miSubHtml() : `<h2>${esc(MD.form)}</h2>
  <div class="card">${vForm("mvf", `<fieldset><legend>Dove</legend><div class="vg">
      ${mode === "cliente" ? `<label class="wide"><span>Cliente (proprietario)</span><input type="text" data-c="cliente" value="${esc(store.get("mi_cliente", ""))}" placeholder="Nome e cognome, compare sul PDF"></label>` : ""}
      <label class="wide"><span>Indirizzo</span><input type="text" data-c="addr" value="${esc(MM.sel ? mmIndirizzo(MM.sel) : "")}" placeholder="Tocca un palazzo sulla mappa o scrivi"></label>
      <label class="wide"><span>Microzona di prezzo</span><select data-c="micro"><option value="">Scegli…</option>
        ${M.zone.map(z => `<optgroup label="${esc(z.n)}">${M.micro.filter(m => m.z === z.n).map(m => `<option ${MM.sel?.micro === m.n ? "selected" : ""}>${esc(m.n)}</option>`).join("")}</optgroup>`).join("")}
        <optgroup label="Hinterland">${tIdx().com.filter(c => ["MI", "MB"].includes(c.p) && c.n !== "Milano").sort((a, b) => a.n.localeCompare(b.n)).map(c => `<option value="@${esc(c.n)}" ${!MM.sel?.micro && MM.sel?.comune === c.n ? "selected" : ""}>${esc(c.n)}</option>`).join("")}</optgroup>
      </select></label></div></fieldset>`, store.get("vform_milano", V_DEF))}<div id="mvout"></div></div>
  ${vSalvate("milano")}`}
  ${mode === "cliente" || mode === "privati" ? "" : `<h2>Classifica delle zone <small>${esc(MZ_MET.rl[0])}</small></h2>
  <div class="tbars">${[...M.zone].sort((a, b) => b.a / b.v - a.a / a.v).map((x, i) => `<a class="tbar" href="#milano/mappa/${encodeURIComponent(x.n)}"><span class="tn"><i>${i + 1}</i>${esc(x.n)}<em>${eur(x.v)}/m² · ${num(x.a, 1)} €/m²</em></span><span class="tv"><span class="tb"><span style="width:${Math.max(3, (x.a * 12 / x.v) / 0.06 * 100)}%"></span></span><b>${pct(x.a * 12 / x.v, 1)}</b></span></a>`).join("")}</div>`}
  <p class="src">Prezzi: immobiliare.it, zone e microzone di Milano (ottobre 2026) e comuni dell'hinterland. Mappa: © OpenStreetMap, OpenFreeMap. Confini: Comune di Milano (NIL), openpolis. Le microzone sono disegnate attorno al loro centro: i confini tra una e l'altra sono indicativi.</p>`;
}
function afterMilano3D(zona) {
  const M = TERR.milano, mode = MM.mode;
  if (mode === "privati") { miPrivatiBind(); return; }
  const saveF = () => store.set("f_mm", { metric: MM.metric, lay: MM.lay });
  $("#mmm").addEventListener("click", e => { const c = e.target.closest("[data-m]"); if (!c) return; MM.metric = c.dataset.m; saveF();
    document.querySelectorAll("#mmm .chip").forEach(x => x.classList.toggle("on", x === c)); mmApplyLayers();
    if (MM.map && MM.ready) { if (MM.map.getLayer("cell-lab")) MM.map.removeLayer("cell-lab"); mmRelabel(); } });
  $("#mml").addEventListener("click", e => { const c = e.target.closest("[data-l]"); if (!c) return; const k = c.dataset.l; MM.lay[k] = !MM.lay[k]; c.classList.toggle("on", MM.lay[k]); saveF(); mmApplyLayers(); });
  // ricerca indirizzi (OpenStreetMap Nominatim)
  const q = $("#mmq"), res = $("#mmres"); let tq;
  q.addEventListener("input", () => { clearTimeout(tq); const t = q.value.trim(); if (t.length < 4) { res.hidden = true; return; }
    tq = setTimeout(async () => { try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&countrycodes=it&viewbox=8.95,45.62,9.45,45.33&bounded=1&q=${encodeURIComponent(t)}`, { headers: { "Accept-Language": "it" } });
      const L = await r.json();
      res.innerHTML = L.length ? L.map(x => `<button data-ll="${x.lon},${x.lat}">${esc(x.display_name.split(",").slice(0, 4).join(","))}</button>`).join("") : `<span>Nessun risultato</span>`; res.hidden = false;
    } catch (e) { res.innerHTML = `<span>Ricerca non disponibile ora</span>`; res.hidden = false; } }, 600); });
  res.addEventListener("click", e => { const b = e.target.closest("[data-ll]"); if (!b || !MM.map) return; const [lo, la] = b.dataset.ll.split(",").map(Number); res.hidden = true;
    MM.map.flyTo({ center: [lo, la], zoom: 17.3, pitch: 58, duration: 1600 });
    MM.map.once("idle", () => mmTap({ lngLat: { lng: lo, lat: la }, point: MM.map.project([lo, la]) })); });
  // scheda del palazzo
  const sheet = $("#mmsheet");
  sheet.addEventListener("click", e => {
    const sg = e.target.closest("[data-segann]"); if (sg) { const a = mmAnnunci().find(x => x.id === sg.dataset.segann); if (a) sg.textContent = segToggle(segAnn(a)) ? "★ Seguito" : "☆ Segui"; return; }
    const vi = e.target.closest("[data-visto]"); if (vi) { const v = store.get("ann_visti", []); if (!v.includes(vi.dataset.visto)) { v.push(vi.dataset.visto); store.set("ann_visti", v.slice(-3000)); } }
    if (e.target.closest("[data-close]")) { sheet.hidden = true; if (MM.map?.getSource("sel")) MM.map.getSource("sel").setData({ type: "FeatureCollection", features: [] }); return; }
    if (e.target.closest("[data-valuta]")) { mmToForm(); ($("#mvf") || $("#msf") || $("#plist"))?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
  if (mode === "privati") { miPrivatiBind(); } else if (mode === "sub") { miSubBind(); } else {
  // valutatore collegato
  const form = $("#mvf"), out = $("#mvout"), selM = form.querySelector("[data-c=micro]"), addr = form.querySelector("[data-c=addr]"), cli = form.querySelector("[data-c=cliente]");
  if (cli) cli.addEventListener("input", () => store.set("mi_cliente", cli.value));
  vBind(form, out, () => { const c = miCtxForm(); return c ? { ...c, mode, cliente: cli ? cli.value.trim() : "" } : null; }, "milano");
  out.addEventListener("click", e => { if (e.target.closest("[data-pdf]") && out._r) mmPdf(out._r); });
  }
  if (zona) { const z = M.zone.find(x => x.n === zona); if (z) MM.sel = { lat: z.lat, lon: z.lon, micro: M.micro.filter(m => m.z === z.n).sort((a, b) => hav(z.lat, z.lon, a.lat, a.lon) - hav(z.lat, z.lon, b.lat, b.lon))[0]?.n, zona: z.n, comune: "Milano" }; }
  if (zona && MM.sel) MM.fly = [MM.sel.lon, MM.sel.lat];
  MM.ready = false; mmInit($("#mm3d"));
}
/* contesto della valutazione dal modulo (microzona o comune dell'hinterland) */
function miCtxForm() {
  const M = TERR.milano, form = $("#mvf") || $("#msf"); if (!form) return null;
  const selM = form.querySelector("[data-c=micro]"), addr = form.querySelector("[data-c=addr]");
  {
    const v = selM.value; if (!v) return null;
    if (v[0] === "@") { const c = tIdx().byN.get(tnorm(v.slice(1))); if (!c?.v) return null;
      const s = MM.sel && MM.sel.comune === c.n ? MM.sel : { lat: c.lat, lon: c.lon, comune: c.n };
      return { v: c.v, a: c.a, nome: (addr && addr.value) || c.n, milano: false, str: c.lat != null ? tStrVicino(c) : null, sel: s, com: c }; }
    const mi = M.micro.find(m => m.n === v), z = M.zone.find(x => x.n === mi.z);
    const s = MM.sel && MM.sel.micro === mi.n ? MM.sel : { lat: mi.lat, lon: mi.lon, micro: mi.n, zona: mi.z, comune: "Milano" };
    return { v: mi.v, a: mi.a, nome: (addr && addr.value) || ("Milano, " + mi.n), milano: true, str: MZ_STR({ ...z, v: mi.v }), micro: mi, zona: z, sel: s };
  }
}
function mmRelabel() {
  const map = MM.map; if (!map || !map.getSource("celllab")) return;
  const fld = MM.metric === "a" ? ["concat", ["to-string", ["/", ["round", ["*", ["get", "a"], 10]], 10]], " €"] : MM.metric === "rl" ? ["concat", ["to-string", ["/", ["round", ["*", ["get", "rl"], 1000]], 10]], "%"] : ["concat", ["to-string", ["get", "v"]], " €"];
  map.addLayer({ id: "cell-lab", type: "symbol", source: "celllab", minzoom: 11.3, maxzoom: 15.5, layout: { visibility: MM.lay.prezzi ? "visible" : "none", "text-field": ["concat", ["get", "n"], "\n", fld], "text-font": ["Noto Sans Regular"], "text-size": ["interpolate", ["linear"], ["zoom"], 11.3, 9, 14, 12], "text-padding": 4 },
    paint: { "text-color": PL.lab, "text-halo-color": PL.halo, "text-halo-width": 1.8 } });
}
function mmToForm() {
  const s = MM.sel, form = $("#mvf"); if (!s || !form) return;
  form.querySelector("[data-c=addr]").value = mmIndirizzo(s);
  const sel = form.querySelector("[data-c=micro]");
  sel.value = s.micro ? s.micro : s.comune ? "@" + s.comune : "";
  if (s.piani) { const p = form.querySelector("[data-k=piano]"); if (p && +p.value > s.piani) p.value = Math.max(0, s.piani - 1); if (s.piani >= 4) form.querySelector("[data-k=ascensore]").checked = true; }
  sel.dispatchEvent(new Event("change", { bubbles: true }));
}

/* PDF della valutazione: vedi js/pdf.js */

/* sostituisce la vista Milano precedente */
TERR_VIEWS.milano = [vMilano3D, afterMilano3D];

/* ==========================================================================
   Annunci di Milano: posizione (cercata una volta e ricordata), mappa e comparabili
   ========================================================================== */
const MM_MUN = { "Centro": 1, "Arco della Pace, Arena, Pagano": 1, "Genova, Ticinese": 1, "Quadronno, Palestro, Guastalla": 1, "Garibaldi, Moscova, Porta Nuova": 9,
  "Fiera, Sempione, City Life, Portello": 8, "Navigli": 6, "Porta Romana, Cadore, Montenero": 4, "Porta Venezia, Indipendenza": 3, "Centrale, Repubblica": 2,
  "Cenisio, Sarpi, Isola": 8, "Uptown, Cascina Merlata, Viale Certosa": 8, "Bande Nere, Inganni": 7, "Famagosta, Barona": 6, "Abbiategrasso, Chiesa Rossa": 5,
  "Porta Vittoria, Lodi": 4, "Cimiano, Crescenzago, Adriano": 2, "Bicocca, Niguarda": 9, "Solari, Washington": 6, "Affori, Bovisa": 9, "San Siro, Trenno": 7,
  "Bisceglie, Baggio, Olmi": 7, "Ripamonti, Vigentino": 5, "Forlanini": 4, "Città Studi, Susa": 3, "Maggiolina, Istria": 9, "Precotto, Turro": 2,
  "Udine, Lambrate": 3, "Pasteur, Rovereto": 2, "Ponte Lambro, Santa Giulia": 4, "Corvetto, Rogoredo": 4, "Napoli, Soderini": 6 };
const mmAnnGeo = () => store.get("geo_ann", {});
const MM_ST = { N: ["Nuovo", 1.10], O: ["Ottimo / ristrutturato", 1.06], B: ["Buono / abitabile", 1.00], R: ["Da ristrutturare", 0.78] };
const MM_EX = { b: "balcone", t: "terrazzo", c: "cantina", a: "arredato", d: "doppia esposizione", i: "esposizione interna", g: "box / posto auto", j: "giardino", p: "portineria" };
let MM_ANN = null;
function mmAnnunci() {
  if (MM_ANN) return MM_ANN;
  const G = mmAnnGeo(), M = TERR.milano.micro, I = TERR.annunci.imm;
  const imm = I.lista.map(([id, p, mq, loc, piano, asc, st, tip, lat, lon, via, mic, priv, ex]) => ({ id: "i" + id, p, mq, loc: +loc || null, piano, asc, st, tip, lat, lon, via, micro: mic,
    priv, mq2: p / mq, url: I.url + id + "/", fonte: "Immobiliare.it",
    d: [tip, MM_ST[st]?.[0], piano ? (piano === "T" ? "piano terra" : piano === "R" ? "rialzato" : piano === "S" ? "seminterrato" : piano + "° piano") : "", asc ? "ascensore" : "", ...[...ex].map(x => MM_EX[x]), priv ? "privato" : ""].filter(Boolean).join(", ") }));
  const tro = TERR.annunci.lista.map(a => {
    const g = G[a.id] || (a.micro ? (m => [m.lon, m.lat, 1])(M.find(m => m.n === a.micro)) : null);
    return { ...a, lon: g ? g[0] : null, lat: g ? g[1] : null, appross: g ? !!g[2] : true, mq2: a.p / a.mq, url: TERR.annunci.url + a.id, fonte: "Trovit" };
  });
  const out = [...imm, ...tro];
  if (!MM_GEO_RUN) MM_ANN = out;
  return out;
}
let MM_GEO_RUN = false;
async function mmGeocodifica() {   // 1 richiesta al secondo, come chiede OpenStreetMap; i risultati restano salvati nel telefono
  if (MM_GEO_RUN) return; MM_GEO_RUN = true;
  try {
    const G = mmAnnGeo(), todo = TERR.annunci.lista.filter(a => a.via && !G[a.id] && G[a.id] !== 0).slice(0, 400);
    for (const a of todo) {
      if (!document.getElementById("mm3d")) break;
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=it&q=${encodeURIComponent(a.via + ", Milano")}`, { headers: { "Accept-Language": "it" } });
        const L = await r.json(), g = mmAnnGeo();
        g[a.id] = L[0] ? [+(+L[0].lon).toFixed(5), +(+L[0].lat).toFixed(5)] : 0;
        store.set("geo_ann", g); MM_ANN = null;
        if (MM.map && MM.map.getSource("ann")) MM.map.getSource("ann").setData(mmAnnFC());
      } catch (e) { break; }
      await new Promise(r => setTimeout(r, 1100));
    }
  } finally { MM_GEO_RUN = false; }
}
function mmAnnFC() {
  const fp = MM.mode === "privati" ? store.get("f_priv", { solo: true }) : null;
  return { type: "FeatureCollection", features: mmAnnunci().filter(a => a.lon != null && !a.appross && (!fp || ((!fp.solo || a.priv) && (!+fp.max || a.p <= +fp.max) && (!+fp.mq || a.mq >= +fp.mq)))).map(a => ({ type: "Feature", properties: { id: a.id, p: a.p, mq: a.mq, m2: Math.round(a.mq2) },
    geometry: { type: "Point", coordinates: [a.lon, a.lat] } })) };
}
function mmAnnLayer(map) {
  map.addSource("ann", { type: "geojson", data: mmAnnFC() });
  map.addLayer({ id: "ann", type: "circle", source: "ann", layout: { visibility: MM.lay.ann ? "visible" : "none" },
    paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 3.5, 16, 8], "circle-color": "#f5d76e", "circle-stroke-color": "#141414", "circle-stroke-width": 1.8, "circle-opacity": 0.95 } });
  map.on("click", "ann", e => { const f = e.features[0]; if (!f) return; const a = mmAnnunci().find(x => x.id === f.properties.id); if (!a) return;
    e.originalEvent.__ann = true;
    const box = $("#mmsheet"); box.innerHTML = `<button class="mmx" data-close aria-label="Chiudi">✕</button><div class="loc">Annuncio in vendita · ${a.fonte}</div>
      <h3 class="mmt">${esc(a.via || "Milano")}</h3><div class="offer" style="margin-top:8px"><div><small>Prezzo</small><b>${eur(a.p)}</b><em>${a.mq} m² · ${a.loc || "?"} locali</em></div>
      <div><small>Al m²</small><b class="cy">${eur(a.mq2)}</b><em>prezzo richiesto</em></div><div><small>Microzona</small><b style="font-size:15px">${esc(mmMicroAt(a.lon, a.lat)?.n || "—")}</b><em>${eur(mmMicroAt(a.lon, a.lat)?.v)}/m²</em></div></div>
      <p class="note">${esc(a.d)}</p><div class="btns"><a class="btn pri" href="${esc(a.url)}" target="_blank" rel="noopener" data-visto="${a.id}">Apri l'annuncio</a><button class="btn sec" data-segann="${a.id}">${segIds().has("a:" + a.id) ? "★ Seguito" : "☆ Segui"}</button></div>`; box.hidden = false; });
}
/* comparabili per la valutazione: stessi m² circa, più vicini prima */
function mmComps(ctx, q) {
  if (!ctx || !ctx.milano || !ctx.micro) return null;
  const mq = +q.mq || 60, mun = MM_MUN[ctx.micro.z], s = ctx.sel || ctx.micro;
  const c = mmAnnunci().filter(a => a.mq >= mq * 0.6 && a.mq <= mq * 1.6).map(a => {
    let d = null;
    if (a.lat != null) d = hav(s.lat, s.lon, a.lat, a.lon) + (a.appross ? 400 : 0);
    else if (a.mun && a.mun === mun) d = 2500;
    return { ...a, dist: d };
  }).filter(a => a.dist != null && a.dist < 3000)
    .sort((a, b) => (a.dist + Math.abs(a.mq - mq) * 15) - (b.dist + Math.abs(b.mq - mq) * 15))
    .filter(function (a) {   // al massimo 2 annunci dallo stesso palazzo / cantiere: comparabili più vari
      const k = (a.lat != null ? a.lat.toFixed(4) + "," + a.lon.toFixed(4) : "") + "|" + (a.via || "").toLowerCase(); this[k] = (this[k] || 0) + 1; return this[k] <= 2; }, {})
    .slice(0, 10);
  if (!c.length) return null;
  // prezzo "come se fosse in stato buono": tolgo l'effetto dello stato dichiarato nell'annuncio
  const norm = c.filter(a => a.st && a.dist < 1500).map(a => a.mq2 / MM_ST[a.st][1]);
  return { lista: c, med: median(c.map(a => a.mq2)), norm: norm.length >= 5 ? median(norm) : null, nNorm: norm.length };
}
