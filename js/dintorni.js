/* KEYSTONE — "Dove si trova": mappa nella scheda di ogni immobile, con i punti di interesse vicini
   e il tempo in auto per raggiungerli (OpenStreetMap: luoghi da Overpass, tempi di guida da OSRM).
   I risultati restano salvati sul telefono: la seconda volta la scheda si apre subito. */
const DT_FISSI = [
  { k: "casa", n: "Casa (Badile)", ico: "⌂", lat: T_HOME.badile[0], lon: T_HOME.badile[1], col: "#c9a24b" },
  { k: "milano", n: "Milano Duomo", ico: "◆", lat: 45.4642, lon: 9.19, col: "#c9a24b" }
];
const DT_AEROPORTI = [["Malpensa", 45.6301, 8.7255], ["Linate", 45.4495, 9.2783], ["Orio al Serio", 45.6689, 9.7004], ["Torino Caselle", 45.2008, 7.6496], ["Genova", 44.4133, 8.8375], ["Verona", 45.3957, 10.8885]];
const DT_CAT = [
  { k: "centro", n: "Centro del paese", ico: "●", col: "#e8d9b8" },
  { k: "lago", n: "Lago / imbarcadero", ico: "≈", col: "#5fa8c8", q: (r, a) => `nwr(around:${r},${a})[amenity=ferry_terminal];nwr(around:${r},${a})[natural=beach];nwr(around:${r},${a})[leisure=beach_resort];`, r: 15000 },
  { k: "stazione", n: "Stazione", ico: "▣", col: "#9aa7c7", q: (r, a) => `node(around:${r},${a})[railway=station];`, r: 15000 },
  { k: "supermercato", n: "Supermercato", ico: "◼", col: "#8fbf7a", q: (r, a) => `nwr(around:${r},${a})[shop=supermarket];`, r: 5000 },
  { k: "farmacia", n: "Farmacia", ico: "+", col: "#7fc8a9", q: (r, a) => `node(around:${r},${a})[amenity=pharmacy];`, r: 5000 },
  { k: "ospedale", n: "Ospedale", ico: "H", col: "#d9686b", q: (r, a) => `nwr(around:${r},${a})[amenity=hospital];`, r: 30000 },
  { k: "sci", n: "Impianti da sci", ico: "▲", col: "#d8e4ef", q: (r, a) => `nwr(around:${r},${a})[landuse=winter_sports];node(around:${r},${a})[aerialway=station];`, r: 25000 },
  { k: "uni", n: "Università", ico: "U", col: "#b28ad1", q: (r, a) => `nwr(around:${r},${a})[amenity=university];`, r: 30000 },
  { k: "autostrada", n: "Casello autostradale", ico: "A", col: "#7fa0d8", q: (r, a) => `node(around:${r},${a})[highway=motorway_junction];`, r: 25000 },
  { k: "aeroporto", n: "Aeroporto", ico: "✈", col: "#c9a24b" }
];
const dtKm = (a, b, c, d) => { const r = Math.PI / 180, x = Math.sin((c - a) * r / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin((d - b) * r / 2) ** 2; return 12742 * Math.asin(Math.sqrt(x)); };
const dtMin = m => m == null ? "—" : m < 60 ? `${Math.round(m)} min` : `${Math.floor(m / 60)} h ${String(Math.round(m % 60)).padStart(2, "0")}`;

async function dtCerca(im) {
  const lat = +im.lat, lon = +im.lng, a = `${lat},${lon}`, punti = [];
  // centro del paese
  const cc = (typeof TERR !== "undefined" && (TERR.coord[im.comune] || (typeof AUTO_COORD !== "undefined" && AUTO_COORD[im.comune]))) || null;
  if (cc && dtKm(lat, lon, cc[0], cc[1]) > 0.25) punti.push({ k: "centro", n: im.comune, lat: cc[0], lon: cc[1] });
  // luoghi vicini da OpenStreetMap
  try {
    const q = `[out:json][timeout:25];(${DT_CAT.filter(c => c.q).map(c => c.q(c.r, a)).join("")});out center tags 400;`;
    // due server: il primo che risponde vince (quello principale spesso è sovraccarico)
    const ask = u => { const ac = new AbortController(); setTimeout(() => ac.abort(), 25000);
      return fetch(u, { method: "POST", body: "data=" + encodeURIComponent(q), signal: ac.signal }).then(r => r.ok ? r.json() : Promise.reject(r.status)); };
    const j = await Promise.any(["https://overpass.kumi.systems/api/interpreter", "https://overpass-api.de/api/interpreter"].map(ask));
    const tipo = t => t.amenity === "ferry_terminal" || t.natural === "beach" || t.leisure === "beach_resort" ? "lago" : t.railway === "station" ? "stazione" : t.shop === "supermarket" ? "supermercato"
      : t.amenity === "pharmacy" ? "farmacia" : t.amenity === "hospital" ? "ospedale" : t.landuse === "winter_sports" || t.aerialway === "station" ? "sci" : t.amenity === "university" ? "uni" : t.highway === "motorway_junction" ? "autostrada" : null;
    const best = {};
    for (const e of j.elements || []) { const t = e.tags || {}, k = tipo(t), la = e.lat ?? e.center?.lat, lo = e.lon ?? e.center?.lon; if (!k || la == null) continue;
      if (k === "ospedale" && /veterin|clinica privata|rsa|casa di riposo/i.test(t.name || "")) continue;
      const d = dtKm(lat, lon, la, lo); if (!best[k] || d < best[k].d) best[k] = { k, d, lat: la, lon: lo, n: t.name || (k === "autostrada" ? (t.ref ? "Uscita " + t.ref : "Uscita autostrada") : DT_CAT.find(c => c.k === k).n) }; }
    Object.values(best).forEach(p => punti.push(p));
  } catch (e) { console.warn("overpass", e); }
  // aeroporto più vicino, Milano e casa
  const ae = DT_AEROPORTI.map(([n, la, lo]) => ({ k: "aeroporto", n: "Aeroporto di " + n, lat: la, lon: lo, d: dtKm(lat, lon, la, lo) })).sort((x, y) => x.d - y.d)[0]; punti.push(ae);
  DT_FISSI.forEach(f => punti.push({ ...f }));
  // tempi in auto (una sola richiesta)
  try {
    const coords = [[lon, lat], ...punti.map(p => [p.lon, p.lat])].map(c => c.map(v => (+v).toFixed(5)).join(",")).join(";");
    const r = await fetch(`https://router.project-osrm.org/table/v1/driving/${coords}?sources=0&annotations=duration,distance`);
    const j = await r.json();
    punti.forEach((p, i) => { const s = j.durations?.[0]?.[i + 1], m = j.distances?.[0]?.[i + 1]; if (s != null) p.min = s / 60; if (m != null) p.km = m / 1000; });
  } catch (e) { console.warn("osrm", e); }
  punti.forEach(p => { if (p.min == null) { p.km = p.km ?? (p.d ?? dtKm(lat, lon, p.lat, p.lon)) * 1.3; p.min = p.km / 55 * 60; p.stima = true; } });
  return { punti, quando: Date.now() };
}

function dtSezione(im) {
  if (im.lat == null || im.lng == null) return "";
  return `<h2>Dove si trova <small>tempi in auto</small></h2>
  <div class="card dtcard"><div class="dtmap" id="dtmap"><div class="spin"></div></div><p class="note" style="margin-top:6px">Trascina per spostarti, due dita per ingrandire e inclinare, ⛶ per vederla a tutto schermo.</p>
    <div class="dtlist" id="dtlist"><div class="spin"></div><p class="note">Cerco stazione, supermercato, ospedale, lago, impianti e caselli vicini…</p></div>
    <p class="note">Luoghi da OpenStreetMap, tempi di guida senza traffico. ${im.pos_indicativa ? "La posizione dell'immobile è indicativa." : ""}</p></div>`;
}
async function dtDisegna(im) {
  const el = $("#dtmap"), box = $("#dtlist"); if (!el || !box) return;
  const chiave = "dint_" + im.id, pre = window.DT_PRE && DT_PRE[String(im.id).replace(/^auto-/, "")];
  let D = pre ? { punti: pre.map(([k, n, lat, lon, min, km, stima]) => ({ k, n: n || (DT_FISSI.find(f => f.k === k) || {}).n || "", lat, lon, min, km, stima: !!stima })), quando: Date.now() } : store.get(chiave, null);
  if (!D || !D.punti || Date.now() - D.quando > 30 * 864e5) { D = await dtCerca(im); if (D.punti.some(p => !p.stima)) store.set(chiave, D); }
  if (!document.body.contains(box)) return;
  const ord = ["centro", "lago", "supermercato", "farmacia", "stazione", "ospedale", "sci", "uni", "autostrada", "aeroporto", "milano", "casa"];
  const P = D.punti.filter(p => p.min != null).sort((a, b) => ord.indexOf(a.k) - ord.indexOf(b.k));
  const cat = k => DT_CAT.find(c => c.k === k) || DT_FISSI.find(c => c.k === k) || { ico: "•", col: "#ccc", n: "" };
  box.innerHTML = P.map(p => { const c = cat(p.k); return `<div class="dtrow"><i style="--dc:${c.col}">${c.ico}</i><span><b>${esc(c.n || p.n)}</b><small>${esc(p.n !== c.n ? p.n : "")}</small></span><em>${p.stima ? "~" : ""}${dtMin(p.min)}<small>${num(p.km, p.km < 10 ? 1 : 0)} km</small></em></div>`; }).join("")
    || `<p class="note">Non sono riuscito a calcolare le distanze: riprova più tardi.</p>`;
  const vicini = P.filter(p => !["casa", "milano", "aeroporto"].includes(p.k));
  dtMappa(el, im, vicini.map(p => { const c = cat(p.k); return { lat: p.lat, lon: p.lon, col: c.col, ico: c.ico, t: c.n || p.n, s: (p.n !== c.n ? p.n + " · " : "") + dtMin(p.min) + " in auto" }; }));
}
// la mappa classica di Keystone (rilievo 3D, colori notte): si allarga, si gira e si ingrandisce con le dita
function dtMappa(el, im, P) {
  mmLoad().then(() => {
    if (!document.body.contains(el)) return; el.innerHTML = "";
    const map = new maplibregl.Map({ container: el, style: itStile(), center: [+im.lng, +im.lat], zoom: 12.5, pitch: 50, bearing: -10, maxPitch: 75, attributionControl: { compact: true } });
    try { attrChiusa(map); } catch (e) {}
    map.scrollZoom.disable(); el.addEventListener("wheel", e => { if (e.ctrlKey || document.fullscreenElement) map.scrollZoom.enable(); }, { passive: true });
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
    map.addControl(new maplibregl.FullscreenControl(), "top-right");
    map.on("load", () => {
      try { map.setTerrain({ source: "dem", exaggeration: 1.3 }); } catch (e) {}
      const F = [{ type: "Feature", properties: { i: -1, c: "#7a1f33", ico: "★", me: 1 }, geometry: { type: "Point", coordinates: [+im.lng, +im.lat] } },
        ...P.map((p, i) => ({ type: "Feature", properties: { i, c: p.col, ico: p.ico, me: 0 }, geometry: { type: "Point", coordinates: [p.lon, p.lat] } }))];
      map.addSource("dt", { type: "geojson", data: { type: "FeatureCollection", features: F } });
      map.addLayer({ id: "dtglow", type: "circle", source: "dt", filter: ["==", ["get", "me"], 1], paint: { "circle-radius": 26, "circle-color": "#c9a227", "circle-opacity": 0.22, "circle-blur": 0.9 } });
      map.addLayer({ id: "dtdot", type: "circle", source: "dt", paint: { "circle-radius": ["case", ["==", ["get", "me"], 1], 13, 10], "circle-color": ["get", "c"], "circle-stroke-color": ["case", ["==", ["get", "me"], 1], "#f2cf5b", "#14100a"], "circle-stroke-width": 2 } });
      map.addLayer({ id: "dtico", type: "symbol", source: "dt", layout: { "text-field": ["get", "ico"], "text-font": ["Noto Sans Regular"], "text-size": 11, "text-allow-overlap": true }, paint: { "text-color": ["case", ["==", ["get", "me"], 1], "#f2cf5b", "#1d0d10"] } });
      const b = new maplibregl.LngLatBounds(); b.extend([+im.lng, +im.lat]); P.filter(p => dtKm(+im.lat, +im.lng, p.lat, p.lon) < 25).forEach(p => b.extend([p.lon, p.lat]));
      map.fitBounds(b, { padding: 46, maxZoom: 14, pitch: 50, bearing: -10, duration: 1200 });
      map.on("click", "dtdot", e => { const i = e.features[0].properties.i, p = P[i]; new maplibregl.Popup({ closeButton: false, offset: 12 }).setLngLat(e.features[0].geometry.coordinates)
        .setHTML(i < 0 ? `<b>${esc(im.titolo || "L'immobile")}</b><br>${esc(im.comune || "")}` : `<b>${esc(p.t)}</b><br>${esc(p.s)}`).addTo(map); });
      map.on("mouseenter", "dtdot", () => map.getCanvas().style.cursor = "pointer"); map.on("mouseleave", "dtdot", () => map.getCanvas().style.cursor = "");
    });
  }).catch(() => { el.innerHTML = `<div class="mapfb">Mappa non disponibile senza connessione.</div>`; });
}
{ const v0 = vScheda; vScheda = function (src, id) { const h = v0(src, id), im = findIm(src, id); if (!im) return h; return h.replace("<h2>Il prezzo è giusto?</h2>", dtSezione(im) + "<h2>Il prezzo è giusto?</h2>"); }; }
{ const a0 = afterScheda; afterScheda = function (src, id) { a0(src, id); const im = findIm(src, id); if (im) dtDisegna(im).catch(e => { const b = $("#dtlist"); if (b) b.innerHTML = `<p class="note">Distanze non disponibili ora.</p>`; }); }; }
// carico in anticipo la libreria della mappa, così la scheda la mostra subito
setTimeout(() => { try { mmLoad(); } catch (e) {} }, 1500);
if (/^#imm\//.test(location.hash)) render();
