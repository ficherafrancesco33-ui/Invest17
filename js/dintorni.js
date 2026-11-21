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
  { k: "lago", n: "Lago / imbarcadero", ico: "≈", col: "#5fa8c8", q: (r, a) => `nwr(around:${r},${a})[amenity=ferry_terminal];nwr(around:${r},${a})[natural=beach];nwr(around:${r},${a})[leisure=beach_resort];`, r: 20000 },
  { k: "stazione", n: "Stazione", ico: "▣", col: "#9aa7c7", q: (r, a) => `node(around:${r},${a})[railway=station];`, r: 20000 },
  { k: "supermercato", n: "Supermercato", ico: "◼", col: "#8fbf7a", q: (r, a) => `nwr(around:${r},${a})[shop=supermarket];`, r: 12000 },
  { k: "farmacia", n: "Farmacia", ico: "+", col: "#7fc8a9", q: (r, a) => `node(around:${r},${a})[amenity=pharmacy];`, r: 12000 },
  { k: "ospedale", n: "Ospedale", ico: "H", col: "#d9686b", q: (r, a) => `nwr(around:${r},${a})[amenity=hospital];`, r: 40000 },
  { k: "sci", n: "Impianti da sci", ico: "▲", col: "#d8e4ef", q: (r, a) => `nwr(around:${r},${a})[landuse=winter_sports];node(around:${r},${a})[aerialway=station];`, r: 30000 },
  { k: "uni", n: "Università", ico: "U", col: "#b28ad1", q: (r, a) => `nwr(around:${r},${a})[amenity=university];`, r: 35000 },
  { k: "autostrada", n: "Casello autostradale", ico: "A", col: "#7fa0d8", q: (r, a) => `node(around:${r},${a})[highway=motorway_junction];`, r: 35000 },
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
    const r = await fetch("https://overpass-api.de/api/interpreter", { method: "POST", body: "data=" + encodeURIComponent(q) });
    const j = await r.json();
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
  <div class="card dtcard"><div class="map small" id="dtmap"></div>
    <div class="dtlist" id="dtlist"><div class="spin"></div><p class="note">Cerco stazione, supermercato, ospedale, lago, impianti e caselli vicini…</p></div>
    <p class="note">Luoghi da OpenStreetMap, tempi di guida senza traffico. ${im.pos_indicativa ? "La posizione dell'immobile è indicativa." : ""}</p></div>`;
}
async function dtDisegna(im) {
  const el = $("#dtmap"), box = $("#dtlist"); if (!el || !box) return;
  const chiave = "dint_" + im.id; let D = store.get(chiave, null);
  if (!D || !D.punti || Date.now() - D.quando > 30 * 864e5) { D = await dtCerca(im); if (D.punti.some(p => !p.stima)) store.set(chiave, D); }
  if (!document.body.contains(box)) return;
  const ord = ["centro", "lago", "supermercato", "farmacia", "stazione", "ospedale", "sci", "uni", "autostrada", "aeroporto", "milano", "casa"];
  const P = D.punti.filter(p => p.min != null).sort((a, b) => ord.indexOf(a.k) - ord.indexOf(b.k));
  const cat = k => DT_CAT.find(c => c.k === k) || DT_FISSI.find(c => c.k === k) || { ico: "•", col: "#ccc", n: "" };
  box.innerHTML = P.map(p => { const c = cat(p.k); return `<div class="dtrow"><i style="--dc:${c.col}">${c.ico}</i><span><b>${esc(c.n || p.n)}</b><small>${esc(p.n !== c.n ? p.n : "")}</small></span><em>${p.stima ? "~" : ""}${dtMin(p.min)}<small>${num(p.km, p.km < 10 ? 1 : 0)} km</small></em></div>`; }).join("")
    || `<p class="note">Non sono riuscito a calcolare le distanze: riprova più tardi.</p>`;
  const vicini = P.filter(p => !["casa", "milano", "aeroporto"].includes(p.k));
  drawMap(el, [...vicini.map(p => { const c = cat(p.k); return { lat: p.lat, lng: p.lon, col: c.col, r: 7, tip: `${c.n || p.n}: ${dtMin(p.min)}` }; }),
    { lat: +im.lat, lng: +im.lng, col: "#7a1f33", r: 11, tip: "L'immobile" }], { maxZoom: 14 });
}
{ const v0 = vScheda; vScheda = function (src, id) { const h = v0(src, id), im = findIm(src, id); if (!im) return h; return h.replace("<h2>Il prezzo è giusto?</h2>", dtSezione(im) + "<h2>Il prezzo è giusto?</h2>"); }; }
{ const a0 = afterScheda; afterScheda = function (src, id) { a0(src, id); const im = findIm(src, id); if (im) dtDisegna(im).catch(e => { const b = $("#dtlist"); if (b) b.innerHTML = `<p class="note">Distanze non disponibili ora.</p>`; }); }; }
if (/^#imm\//.test(location.hash)) render();
