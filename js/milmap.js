"use strict";
/* ==========================================================================
   INVEST17 — Mappa 3D di Milano e hinterland (MapLibre + OpenFreeMap)
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
const MM_RAMP = [[0, "#2f80ed"], [3000, "#1fb5b0"], [4000, "#5cc85a"], [5000, "#f2d22e"], [6000, "#f59e0b"], [7500, "#ef5a3c"], [9500, "#c2185b"], [12000, "#6a1b9a"]];
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
      { id: "bg", type: "background", paint: { "background-color": "#f4efe3" } },
      { id: "landuse", type: "fill", source: S, "source-layer": "landuse", paint: { "fill-color": ["match", ["get", "class"], ["residential", "suburb", "neighbourhood"], "#f1e8d8", ["commercial", "retail"], "#f6e0d2", ["industrial", "railway"], "#e9e3ee", ["school", "university", "college", "hospital"], "#f7e6c4", ["cemetery"], "#d6e8c6", ["stadium", "pitch", "playground"], "#c9ebb0", "#efe7d6"], "fill-opacity": 0.9 } },
      { id: "landcover", type: "fill", source: S, "source-layer": "landcover", paint: { "fill-color": ["match", ["get", "class"], ["wood", "forest"], "#a8d98a", ["farmland"], "#e8efc4", ["grass", "meadow", "park"], "#c8e8a8", ["sand"], "#f6e7b8", "#d5ecb8"], "fill-opacity": 0.85 } },
      { id: "park", type: "fill", source: S, "source-layer": "park", paint: { "fill-color": "#b7e29a", "fill-opacity": 0.95, "fill-outline-color": "#93c977" } },
      { id: "water", type: "fill", source: S, "source-layer": "water", paint: { "fill-color": "#8fd3f5" } },
      { id: "waterway", type: "line", source: S, "source-layer": "waterway", paint: { "line-color": "#79c6ee", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 16, 4] } },
      { id: "rail", type: "line", source: S, "source-layer": "transportation", filter: ["==", ["get", "class"], "rail"], paint: { "line-color": "#a99f92", "line-width": 1.4, "line-dasharray": [3, 2] } },
      { id: "road-minor-case", type: "line", source: S, "source-layer": "transportation", minzoom: 13,
        filter: ["match", ["get", "class"], ["minor", "service", "tertiary", "street"], true, false],
        paint: { "line-color": "#ddd3c3", "line-width": ["interpolate", ["linear"], ["zoom"], 13, 1.2, 16, 5, 18, 12] } },
      { id: "road-minor", type: "line", source: S, "source-layer": "transportation", minzoom: 12,
        filter: ["match", ["get", "class"], ["minor", "service", "tertiary", "street", "path"], true, false],
        paint: { "line-color": ["match", ["get", "class"], "path", "#e8dcc6", "#ffffff"], "line-width": ["interpolate", ["linear"], ["zoom"], 12, 0.5, 16, 3.5, 18, 10] } },
      { id: "road-major-case", type: "line", source: S, "source-layer": "transportation",
        filter: ["match", ["get", "class"], ["motorway", "trunk", "primary", "secondary"], true, false],
        paint: { "line-color": "#e2a63b", "line-width": ["interpolate", ["linear"], ["zoom"], 9, 1.2, 14, 4.5, 18, 16] } },
      { id: "road-major", type: "line", source: S, "source-layer": "transportation",
        filter: ["match", ["get", "class"], ["motorway", "trunk", "primary", "secondary"], true, false],
        paint: { "line-color": ["match", ["get", "class"], ["motorway", "trunk"], "#ffc768", "#ffe08a"], "line-width": ["interpolate", ["linear"], ["zoom"], 9, 0.8, 14, 3, 18, 12] } },
    ],
  };
}
function mmColorExpr(metric) {
  const key = metric === "a" ? "a" : metric === "rl" ? "rl" : "v";
  const ramp = metric === "a" ? MM_RAMP.map(([s, c]) => [s / 260, c]) : metric === "rl" ? [[0.025, "#ef5a3c"], [0.035, "#f59e0b"], [0.042, "#f2d22e"], [0.05, "#5cc85a"], [0.06, "#1f9d55"]] : MM_RAMP;
  return ["interpolate", ["linear"], ["to-number", ["get", key]], ...ramp.flat()];
}
function mmLegend() {
  const met = MM_MET[MM.metric], ramp = MM.metric === "a" ? MM_RAMP.map(([s, c]) => [s / 260, c]) : MM.metric === "rl" ? [[0.025, "#ef5a3c"], [0.035, "#f59e0b"], [0.042, "#f2d22e"], [0.05, "#5cc85a"], [0.06, "#1f9d55"]] : MM_RAMP;
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
    map.addLayer({ id: "hint-line", type: "line", source: "hint", paint: { "line-color": "#6b5f50", "line-opacity": 0.55, "line-width": 1.2, "line-dasharray": [3, 2] } });
    map.addLayer({ id: "cell-fill", type: "fill", source: "cells", paint: { "fill-color": mmColorExpr(MM.metric), "fill-opacity": ["interpolate", ["linear"], ["zoom"], 10, 0.45, 14, 0.2, 16, 0.08] } }, "road-minor-case");
    map.addLayer({ id: "cell-line", type: "line", source: "cells", paint: { "line-color": "#ffffff", "line-opacity": 0.8, "line-width": 1 } });
    // palazzi in 3D
    map.addLayer({ id: "bld", type: "fill-extrusion", source: "omt", "source-layer": "building", minzoom: 13,
      paint: { "fill-extrusion-color": ["interpolate", ["linear"], ["coalesce", ["get", "render_height"], 10], 0, "#f7dcc0", 15, "#f2cba3", 30, "#e8b48a", 60, "#d9a07c", 100, "#b9c8e2", 150, "#8fb0dd"],
        "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 13, 0, 14.5, ["coalesce", ["get", "render_height"], 10]],
        "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0], "fill-extrusion-opacity": 0.95, "fill-extrusion-vertical-gradient": true } });
    map.addSource("sel", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
    map.addLayer({ id: "sel-3d", type: "fill-extrusion", source: "sel", paint: { "fill-extrusion-color": "#ff3d7f", "fill-extrusion-height": ["+", ["coalesce", ["get", "h"], 12], 1.5], "fill-extrusion-base": 0, "fill-extrusion-opacity": 0.95 } });
    map.addLayer({ id: "sel-pin", type: "circle", source: "sel", filter: ["==", ["geometry-type"], "Point"], paint: { "circle-radius": 7, "circle-color": "#ff3d7f", "circle-stroke-color": "#ffffff", "circle-stroke-width": 2 } });
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
    try { map.setLight({ anchor: "viewport", color: "#fff6e0", intensity: 0.32, position: [1.4, 200, 35] }); } catch (e) {}
    map.addLayer({ id: "metro-glow", type: "line", source: "metro", paint: { "line-color": ["get", "col"], "line-width": 7, "line-opacity": 0.25, "line-blur": 4 } });
    map.addLayer({ id: "metro", type: "line", source: "metro", paint: { "line-color": ["get", "col"], "line-width": 2.4 } });
    map.addLayer({ id: "metros", type: "circle", source: "metros", minzoom: 11.5, paint: { "circle-radius": 3.5, "circle-color": "#ffffff", "circle-stroke-color": ["get", "col"], "circle-stroke-width": 2 } });
    // punti di interesse
    map.addSource("poi", { type: "geojson", data: { type: "FeatureCollection", features: M.poi.map(([c, n, la, lo]) => ({ type: "Feature", properties: { c, n, col: T_POI[c][1] }, geometry: { type: "Point", coordinates: [lo, la] } })) } });
    map.addLayer({ id: "poi", type: "circle", source: "poi", layout: { visibility: MM.lay.poi ? "visible" : "none" }, paint: { "circle-radius": 6, "circle-color": ["get", "col"], "circle-stroke-color": "#ffffff", "circle-stroke-width": 1.8 } });
    // etichette: vie, civici, microzone, comuni
    map.addLayer({ id: "street-lab", type: "symbol", source: "omt", "source-layer": "transportation_name", minzoom: 14,
      layout: { "symbol-placement": "line", "text-field": ["get", "name"], "text-font": ["Noto Sans Regular"], "text-size": ["interpolate", ["linear"], ["zoom"], 14, 10, 18, 14], "text-max-angle": 30 },
      paint: { "text-color": "#5a4e40", "text-halo-color": "#ffffff", "text-halo-width": 1.8 } });
    map.addLayer({ id: "housenum", type: "symbol", source: "omt", "source-layer": "housenumber", minzoom: 17,
      layout: { "text-field": ["get", "housenumber"], "text-font": ["Noto Sans Regular"], "text-size": 11 }, paint: { "text-color": "#8a5a2b", "text-halo-color": "#ffffff", "text-halo-width": 1.6 } });
    mmRelabel();
    map.addLayer({ id: "hint-lab", type: "symbol", source: "hintlab", minzoom: 9.5,
      layout: { "text-field": ["concat", ["get", "n"], ["case", ["!=", ["get", "v"], null], ["concat", "\n", ["to-string", ["get", "v"]], " €"], ""]], "text-font": ["Noto Sans Regular"], "text-size": 11 },
      paint: { "text-color": "#3a3128", "text-halo-color": "#ffffff", "text-halo-width": 2 } });
    // quartieri ufficiali (NIL): se il Comune risponde
    mmNil(map);
    mmAnnLayer(map); mmGeocodifica();
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
      map.addLayer({ id: "nil-line", type: "line", source: "nil", layout: { visibility: MM.lay.nil ? "visible" : "none" }, paint: { "line-color": "#7c3aed", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.8, 15, 2], "line-opacity": 0.7, "line-dasharray": [2, 1.2] } }, "bld");
      const lab = { type: "FeatureCollection", features: g.features.map(f => { const c = mmFeatCentro(f); return c ? { type: "Feature", properties: { n: f.properties.nil }, geometry: { type: "Point", coordinates: c } } : null; }).filter(Boolean) };
      map.addSource("nillab", { type: "geojson", data: lab });
      map.addLayer({ id: "nil-lab", type: "symbol", source: "nillab", minzoom: 12.2, maxzoom: 16, layout: { visibility: MM.lay.nil ? "visible" : "none", "text-field": ["upcase", ["get", "n"]], "text-font": ["Noto Sans Regular"], "text-size": 10.5, "text-letter-spacing": 0.12 },
        paint: { "text-color": "#6d28d9", "text-halo-color": "#ffffff", "text-halo-width": 2 } });
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
  vis(["poi"], MM.lay.poi); vis(["ann"], MM.lay.ann);
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
    ${c ? `<div class="btns" style="margin-top:8px"><button class="btn pri" data-valuta>${{ bnb: "Calcola il B&B qui", lungo: "Calcola la rendita qui", sub: "Business plan qui", privati: "Vai all'elenco", cliente: "Valuta per il cliente" }[MM.mode] || "Valuta un immobile qui"}</button></div>` : ""}`;
}

/* ---------- vista Milano ---------- */
function vMilano3D(zona, mode = "mappa") {
  MM.mode = mode; const MD = MI_MODI[mode] || MI_MODI.mappa;
  const f = store.get("f_mm", null); if (f) { MM.metric = f.metric || "v"; Object.assign(MM.lay, f.lay || {}); }
  MM.sel = store.get("mm_sel", null);
  const M = TERR.milano;
  if (mode === "privati") MM.lay.ann = true;
  return `${miBread(mode)}<h1>${esc(MD.t)}</h1><p class="sub">${MD.sub}</p>
  <div class="mmbar">
    <div class="mmsearch"><input type="search" id="mmq" placeholder="Cerca un indirizzo: via Tortona 27" autocomplete="off"><div id="mmres" class="mmres" hidden></div></div>
    <div class="chips" id="mmm">${Object.entries(MM_MET).map(([k, m]) => `<button class="chip ${k === MM.metric ? "on" : ""}" data-m="${k}">${m[0]}</button>`).join("")}</div>
    <div class="chips" id="mml">${[["prezzi", "Prezzi"], ["ann", "Annunci"], ["nil", "Quartieri"], ["metro", "Metro"], ["poi", "Servizi"], ["d3", "3D"]].map(([k, t]) => `<button class="chip lay ${MM.lay[k] ? "on" : ""}" data-l="${k}" style="--lc:${{ prezzi: "#c9a227", ann: "#f5d76e", nil: "#e9c46a", metro: "#e3242b", poi: "#facc15", d3: "#f2cf5b" }[k]}"><i></i>${t}</button>`).join("")}</div>
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
    paint: { "text-color": "#2b241c", "text-halo-color": "#ffffff", "text-halo-width": 2 } });
}
function mmToForm() {
  const s = MM.sel, form = $("#mvf"); if (!s || !form) return;
  form.querySelector("[data-c=addr]").value = mmIndirizzo(s);
  const sel = form.querySelector("[data-c=micro]");
  sel.value = s.micro ? s.micro : s.comune ? "@" + s.comune : "";
  if (s.piani) { const p = form.querySelector("[data-k=piano]"); if (p && +p.value > s.piani) p.value = Math.max(0, s.piani - 1); if (s.piani >= 4) form.querySelector("[data-k=ascensore]").checked = true; }
  sel.dispatchEvent(new Event("change", { bubbles: true }));
}

/* ---------- PDF della valutazione (pagina stampabile con il logo) ---------- */
function mmPdf({ r, q, ctx }) {
  const M = TERR.milano, s = ctx.sel || {}, oggi = new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  const logo = new URL("img/maison-collection.png", location.href).href;
  const near = s.lat != null ? mzVicini({ lat: s.lat, lon: s.lon }) : { staz: [], poi: [], score: null };
  const vicine = ctx.micro ? M.micro.filter(m => m.n !== ctx.micro.n).map(m => ({ ...m, d: hav(ctx.micro.lat, ctx.micro.lon, m.lat, m.lon) })).sort((a, b) => a.d - b.d).slice(0, 6) : [];
  const rank = ctx.micro ? [...M.micro].sort((a, b) => b.v - a.v).findIndex(m => m.n === ctx.micro.n) + 1 : null;
  const L = r.sc.list, riga = (k, t, sub) => L[k] ? `<tr><td>${t}</td><td>${sub}</td><td class="r">${eur(L[k].lordo)}</td><td class="r">${eur(L[k].netto)}</td><td class="r"><b>${pct(L[k].rendNetto)}</b></td></tr>` : "";
  const car = [["Tipologia", { appartamento: "Appartamento", attico: "Attico", loft: "Loft", villetta: "Villetta / casa" }[q.tipo]], ["Superficie interna", q.mq + " m²"], ["Superficie commerciale", num(r.sup, 1) + " m²"],
    ["Locali / bagni", `${q.locali} / ${q.bagni}`], ["Piano", q.piano <= 0 ? "Terra" : q.piano + "°" + (q.ascensore ? " con ascensore" : " senza ascensore")],
    ["Stato", V_STATO[q.stato][0]], ["Classe energetica", q.classe === "?" ? "Non indicata" : q.classe], ["Epoca del palazzo", V_EPOCA[q.epoca][0]],
    ["Spazi esterni", [q.balcone ? `balconi ${q.balcone} m²` : "", q.terrazzo ? `terrazzo ${q.terrazzo} m²` : "", q.giardino ? `giardino ${q.giardino} m²` : ""].filter(Boolean).join(", ") || "—"],
    ["Pertinenze", [q.cantina ? `cantina ${q.cantina} m²` : "", { no: "", posto: "posto auto", singolo: "box singolo", doppio: "box doppio" }[q.box]].filter(Boolean).join(", ") || "—"],
    ["Dotazioni", [q.risc === "autonomo" ? "riscaldamento autonomo" : "riscaldamento centralizzato", q.portineria ? "portineria" : "", q.arredato ? "arredato" : ""].filter(Boolean).join(", ")]];
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><title>Valutazione - ${esc(ctx.nome)}${ctx.cliente ? " - " + esc(ctx.cliente) : ""}</title>
<style>
@page{size:A4;margin:14mm 14mm 16mm}
*{box-sizing:border-box}body{margin:0;font-family:Georgia,"Times New Roman",serif;color:#2b2326;font-size:11pt;line-height:1.45}
.sans{font-family:"Helvetica Neue",Arial,sans-serif}
header{display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #a8865a;padding-bottom:10px;margin-bottom:16px}
header img{height:58px}header .d{text-align:right;font-size:9.5pt;color:#7a6a5c}
h1{font-weight:normal;font-size:22pt;letter-spacing:.06em;color:#6e1423;margin:0 0 2px;text-transform:uppercase}
h2{font-size:11pt;letter-spacing:.16em;text-transform:uppercase;color:#a8865a;border-bottom:1px solid #e6dccd;padding-bottom:4px;margin:20px 0 8px;font-weight:normal}
.addr{font-size:13pt;color:#4a3b40;margin:0 0 14px}
.hero{display:flex;gap:14px;align-items:stretch;margin:6px 0 4px}
.val{flex:1.2;border:1.5px solid #a8865a;border-radius:6px;padding:12px 16px;background:#fbf8f3}
.val small,.box small{display:block;font-size:8.5pt;letter-spacing:.14em;text-transform:uppercase;color:#8b7763}
.val b{display:block;font-size:26pt;color:#6e1423;font-weight:normal;margin:2px 0}
.val span{font-size:10pt;color:#5b4c45}
.box{flex:1;border:1px solid #e6dccd;border-radius:6px;padding:10px 12px}
.box b{display:block;font-size:15pt;color:#2b2326;font-weight:normal;margin-top:2px}
table{width:100%;border-collapse:collapse;font-size:10pt}td,th{padding:5px 6px;border-bottom:1px solid #eee5d8;text-align:left;vertical-align:top}
th{font-size:8.5pt;letter-spacing:.1em;text-transform:uppercase;color:#8b7763;font-weight:normal}td.r,th.r{text-align:right}
tr.tot td{border-top:1.5px solid #a8865a;font-weight:bold;color:#6e1423}
.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.k{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.k div{border:1px solid #e6dccd;border-radius:6px;padding:8px}.k small{display:block;font-size:8pt;letter-spacing:.1em;text-transform:uppercase;color:#8b7763}.k b{font-size:13pt;font-weight:normal}
.note{font-size:8.5pt;color:#7a6a5c}
footer{margin-top:22px;border-top:1px solid #e6dccd;padding-top:8px;font-size:8.5pt;color:#7a6a5c;display:flex;justify-content:space-between}
.pb{page-break-before:always}
@media screen{body{max-width:820px;margin:20px auto;padding:0 18px}.printbtn{position:fixed;right:16px;bottom:16px;background:#6e1423;color:#fff;border:0;border-radius:24px;padding:12px 18px;font-size:14px;font-family:Arial;box-shadow:0 4px 16px rgba(0,0,0,.25)}}
@media print{.printbtn{display:none}}
</style></head><body>
<button class="printbtn" onclick="window.print()">Salva PDF / Stampa</button>
<header><img src="${logo}" alt="Maison Collection"><div class="d sans">Valutazione immobiliare<br>${oggi}</div></header>
<h1>${ctx.mode === "bnb" ? "Analisi investimento B&amp;B" : ctx.mode === "lungo" ? "Analisi investimento a reddito" : "Stima del valore di mercato"}</h1>
${ctx.cliente ? `<p class="addr" style="margin-bottom:2px">Preparata per <b>${esc(ctx.cliente)}</b></p>` : ""}
<p class="addr">${esc(ctx.nome)}${s.nil ? ` · quartiere ${esc(s.nil)}` : ""}${ctx.micro ? ` · microzona ${esc(ctx.micro.n)}` : ""}</p>
<div class="hero">
  <div class="val"><small>Valore di mercato stimato</small><b>${eur(r.valore)}</b><span>Forbice ${eur(r.min)} – ${eur(r.max)} · ${eur(r.valore / r.sup)} al m² commerciale</span></div>
  <div class="box"><small>${r.prezzo ? "Prezzo richiesto" : "Prezzo di realizzo rapido"}</small><b>${eur(r.prezzo || r.offerta)}</b><span class="note">${r.prezzo ? (r.sconto >= 0 ? `${pct(r.sconto, 0)} sotto il valore stimato` : `${pct(-r.sconto, 0)} sopra il valore stimato`) : "circa il 3% sotto il valore"}</span></div>
  ${ctx.mode === "cliente" ? `<div class="box"><small>Prezzo consigliato di pubblicazione</small><b>${eur(Math.ceil(r.valore * 1.05 / 5000) * 5000)}</b><span class="note">con un margine di trattativa del 5% circa</span></div>` : ""}
  ${r.valDopo ? `<div class="box"><small>Valore dopo i lavori</small><b>${eur(r.valDopo)}</b><span class="note">lavori previsti ${eur(r.lavori)}</span></div>` : ""}
</div>
<h2>L'immobile</h2>
<table class="sans"><tbody>${car.map(([a, b]) => `<tr><td style="width:38%;color:#8b7763">${a}</td><td>${esc(b)}</td></tr>`).join("")}</tbody></table>
<h2>Indici di valore della zona</h2>
<div class="k sans">
  <div><small>Vendita</small><b>${eur(ctx.v)}/m²</b><br><span class="note">${ctx.micro ? "microzona" : "comune"}, prezzi richiesti</span></div>
  <div><small>Affitto</small><b>${num(ctx.a, 2)} €/m²</b><br><span class="note">al mese</span></div>
  <div><small>Rendita lorda</small><b>${pct(ctx.a * 12 / ctx.v, 1)}</b><br><span class="note">affitto lungo</span></div>
  <div><small>${ctx.zona ? "Andamento 12 mesi" : "Media Milano"}</small><b>${ctx.zona ? (ctx.zona.y >= 0 ? "+" : "") + num(ctx.zona.y, 1) + "%" : eur(M.media.vendita) + "/m²"}</b><br><span class="note">${ctx.zona ? esc(ctx.zona.n) : "per confronto"}</span></div>
</div>
${rank ? `<p class="note sans">La microzona ${esc(ctx.micro.n)} è al ${rank}° posto su ${M.micro.length} microzone di Milano per prezzo al m² (media cittadina ${eur(M.media.vendita)}/m²).</p>` : ""}
${vicine.length ? `<h2>Valori di confronto nelle microzone vicine</h2>
<table class="sans"><thead><tr><th>Microzona</th><th>Zona</th><th class="r">Distanza</th><th class="r">Vendita €/m²</th><th class="r">Affitto €/m²</th></tr></thead><tbody>
<tr style="color:#6e1423"><td><b>${esc(ctx.micro.n)}</b></td><td>${esc(ctx.micro.z)}</td><td class="r">—</td><td class="r"><b>${eur(ctx.micro.v)}</b></td><td class="r">${num(ctx.micro.a, 2)}</td></tr>
${vicine.map(m => `<tr><td>${esc(m.n)}</td><td>${esc(m.z)}</td><td class="r">${num(m.d / 1000, 1)} km</td><td class="r">${eur(m.v)}</td><td class="r">${num(m.a, 2)}</td></tr>`).join("")}</tbody></table>` : ""}
${(() => { const C = mmComps(ctx, q); return C ? `<h2>Annunci comparabili in vendita</h2>
<table class="sans"><thead><tr><th>Indirizzo</th><th class="r">m²</th><th class="r">Locali</th><th class="r">Prezzo</th><th class="r">€/m²</th><th class="r">Distanza</th></tr></thead><tbody>
${C.lista.map(a => `<tr><td>${esc(a.via || "Zona " + (a.micro || "Municipio " + a.mun))}<br><span class="note">${esc(a.d)} · ${a.fonte}</span></td><td class="r">${a.mq}</td><td class="r">${a.loc || "—"}</td><td class="r">${eur(a.p)}</td><td class="r">${eur(a.mq2)}</td><td class="r">${a.lat != null ? (a.appross ? "~" : "") + num(a.dist / 1000, 1) + " km" : "stesso municipio"}</td></tr>`).join("")}
</tbody></table><p class="note sans">Prezzi richiesti negli annunci (Immobiliare.it e Trovit, novembre 2026).${C.norm ? ` ${C.nNorm} annunci entro 1,5 km riportati allo stato "buono": ${eur(C.norm)}/m².` : ""} Mediana dei comparabili: ${eur(C.med)}/m²; il valore stimato considera il prezzo di chiusura, in genere più basso del prezzo richiesto.</p>` : ""; })()}
<h2>Come è stato calcolato il valore</h2>
<table class="sans"><tbody>
${r.wC ? `<tr><td>Prezzo medio richiesto nella zona</td><td class="r">${eur(ctx.v)}/m²</td></tr>
<tr><td>${r.cmp.nNorm} annunci simili entro 1,5 km, riportati a stato buono (peso ${pct(r.wC, 0)})</td><td class="r">${eur(r.cmp.norm)}/m²</td></tr>
<tr><td>Prezzo di partenza</td><td class="r">${eur(r.base)}/m²</td></tr>` : `<tr><td>Prezzo medio richiesto nella zona</td><td class="r">${eur(r.base)}/m²</td></tr>`}
<tr><td>Riduzione per trattativa (${pct(IMPOSTAZIONI.sconto_trattativa, 0)})</td><td class="r">${eur(r.mqReale)}/m²</td></tr>
<tr><td>Stato: ${esc(r.st[0])}</td><td class="r">× ${num(r.st[1], 2)}</td></tr>
${r.k.map(([t, f]) => `<tr><td>${esc(t)}</td><td class="r">× ${num(f, 2)}</td></tr>`).join("")}
<tr><td>Superficie commerciale (balconi 30%, terrazzi 35%, giardino 10%, cantina 25%)</td><td class="r">${num(r.sup, 1)} m²</td></tr>
${r.box ? `<tr><td>Box / posto auto, valutato a parte</td><td class="r">+ ${eur(r.box)}</td></tr>` : ""}
<tr class="tot"><td>Valore di mercato stimato</td><td class="r">${eur(r.valore)}</td></tr></tbody></table>
<div class="pb"></div>
<h2>Rendimento se messo a reddito</h2>
<table class="sans"><thead><tr><th>Uso</th><th>Ipotesi</th><th class="r">Incasso lordo</th><th class="r">Netto annuo</th><th class="r">Rendimento</th></tr></thead><tbody>
${riga("lungo", "Affitto lungo (4+4 / 3+2)", r.canone ? eur(r.canone) + " al mese" : "")}
${riga("medio", "Medio termine / transitorio", r.medio ? eur(r.medio) + " al mese, 10 mesi" : "")}
${riga("breve", "Affitto breve", r.breve ? eur(r.breve.adr) + " a notte, " + pct(r.breve.occ, 0) + " di occupazione" : "")}
</tbody></table>
<p class="note sans">Netto dopo spese di gestione, condominio, manutenzione e tasse (${TAX === "srl" ? "società" : "cedolare secca"}), su ${r.prezzo ? "prezzo richiesto" : "valore stimato"} più costi d'acquisto.</p>
${near.staz.length || near.poi.length ? `<h2>Servizi e collegamenti vicini</h2><div class="two sans">
  <div><b style="font-weight:normal;color:#8b7763;font-size:9pt;letter-spacing:.1em;text-transform:uppercase">Metropolitana</b><br>${near.staz.slice(0, 5).map(x => `${esc(x.n)} (${[...x.ln].join(", ")}) – ${num(Math.round(x.d / 10) * 10)} m`).join("<br>") || "Nessuna stazione entro 1 km"}</div>
  <div>${["uni", "osp", "lav", "neg", "scu", "par"].map(k => { const p = near.poi.filter(x => x.c === k).slice(0, 2); return p.length ? `<b style="font-weight:normal;color:#8b7763;font-size:9pt;letter-spacing:.1em;text-transform:uppercase">${T_POI[k][0]}</b><br>${p.map(x => `${esc(x.n)} – ${x.d < 1000 ? num(Math.round(x.d / 10) * 10) + " m" : num(x.d / 1000, 1) + " km"}`).join("<br>")}<br>` : ""; }).join("")}</div>
</div>` : ""}
<h2>Note</h2>
<p class="note sans">Stima indicativa elaborata con il metodo comparativo sui prezzi medi richiesti (immobiliare.it, ottobre 2026) e coefficienti di merito d'uso comune. Non sostituisce una perizia giurata né la verifica di conformità urbanistica e catastale. I prezzi medi della zona si riferiscono agli annunci: il prezzo di chiusura è in genere inferiore, come considerato nel calcolo.</p>
<footer class="sans"><span>Maison Collection · Agenzia immobiliare · Milano</span><span>Documento generato con Invest17 il ${oggi}</span></footer>
<script>window.onload=()=>setTimeout(()=>window.print(),700)<\/script>
</body></html>`;
  const w = window.open("", "_blank");
  if (!w) { alert("Il browser ha bloccato la finestra del PDF: consenti le finestre pop-up per questo sito e riprova."); return; }
  w.document.open(); w.document.write(html); w.document.close();
}

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
const MM_EX = { b: "balcone", t: "terrazzo", c: "cantina", a: "arredato", d: "doppia esposizione", i: "esposizione interna" };
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
    paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 3.5, 16, 8], "circle-color": "#e0218a", "circle-stroke-color": "#ffffff", "circle-stroke-width": 1.6, "circle-opacity": 0.95 } });
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
    .sort((a, b) => (a.dist + Math.abs(a.mq - mq) * 15) - (b.dist + Math.abs(b.mq - mq) * 15)).slice(0, 10);
  if (!c.length) return null;
  // prezzo "come se fosse in stato buono": tolgo l'effetto dello stato dichiarato nell'annuncio
  const norm = c.filter(a => a.st && a.dist < 1500).map(a => a.mq2 / MM_ST[a.st][1]);
  return { lista: c, med: median(c.map(a => a.mq2)), norm: norm.length >= 5 ? median(norm) : null, nNorm: norm.length };
}
