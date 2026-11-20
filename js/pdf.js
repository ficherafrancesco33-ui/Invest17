/* ==========================================================================
   KEYSTONE — PDF della valutazione Maison Collection (oro, bordeaux, bianco)
   Copertina con mappa, 10 sezioni come una relazione di stima professionale:
   immobile, comparabili (mappa + tabella), fasce di prezzo della zona,
   rettifiche, range, servizi, profilo della zona, punti di forza e attenzione,
   investimento, nota metodologica.
   ========================================================================== */
const PDF_C = { bx: "#6e1423", bx2: "#4a0d17", oro: "#b08d57", oro2: "#d9bd84", oro3: "#f4ead8", ink: "#2a2124", mut: "#7d6f68", line: "#eadfcd", ok: "#2f7d55", ko: "#a3253a" };

/* mosaico di tessere OpenStreetMap con segnaposti (in pixel, niente librerie) */
function pdfMappa(lat, lon, z, W, H, pins = [], cls = "", hd = true) {
  const zt = hd ? z + 1 : z, ts = hd ? 128 : 256, n = 2 ** zt, S = n * ts;   // hd: tessere del livello dopo, disegnate a metà (nitide in stampa)
  const wx = (lon + 180) / 360 * S, sn = Math.sin(lat * Math.PI / 180), wy = (0.5 - Math.log((1 + sn) / (1 - sn)) / (4 * Math.PI)) * S;
  const x0 = wx - W / 2, y0 = wy - H / 2, tx0 = Math.floor(x0 / ts), ty0 = Math.floor(y0 / ts), tx1 = Math.floor((x0 + W) / ts), ty1 = Math.floor((y0 + H) / ts);
  let t = "";
  for (let x = tx0; x <= tx1; x++) for (let y = ty0; y <= ty1; y++)
    t += `<img src="https://tile.openstreetmap.org/${zt}/${((x % n) + n) % n}/${y}.png" style="left:${Math.round(x * ts - x0)}px;top:${Math.round(y * ts - y0)}px;width:${ts}px;height:${ts}px" alt="">`;
  const px = (la, lo) => { const ss = Math.sin(la * Math.PI / 180); return [(lo + 180) / 360 * S - x0, (0.5 - Math.log((1 + ss) / (1 - ss)) / (4 * Math.PI)) * S - y0]; };
  const pp = pins.map(p => { const [x, y] = px(p.lat, p.lon); return { ...p, x, y }; });
  // segnaposti sovrapposti (stesso palazzo): li apro a raggiera attorno al punto, con una lineetta
  const gruppi = [];
  pp.filter(p => p.k !== "me").forEach(p => { const g = gruppi.find(g => Math.hypot(g[0].x - p.x, g[0].y - p.y) < 16); g ? g.push(p) : gruppi.push([p]); });
  let linee = "";
  gruppi.forEach(g => { if (g.length < 2) return; const cx = g[0].x, cy = g[0].y, R = 14 + g.length * 2.2;
    g.forEach((p, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / g.length; p.x = cx + R * Math.cos(a); p.y = cy + R * Math.sin(a);
      linee += `<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="#6b5f58" stroke-width="1"/>`; }); });
  const P = pp.map(p => p.x < 6 || p.y < 6 || p.x > W - 6 || p.y > H - 6 ? "" :
    `<span class="pin ${p.k || ""}" style="left:${p.x.toFixed(1)}px;top:${p.y.toFixed(1)}px${p.c ? `;background:${p.c};border-color:#fff;color:#fff` : ""}">${p.t ?? ""}</span>`).join("");
  return `<div class="mapw ${cls}" style="width:${W}px;height:${H}px"><div class="tiles">${t}</div>${linee ? `<svg width="${W}" height="${H}" style="position:absolute;left:0;top:0">${linee}</svg>` : ""}${P}<span class="osm">© OpenStreetMap</span></div>`;
}

/* quotazione OMI (Agenzia delle Entrate) della zona OMI che contiene la microzona di Milano */
function omiMi(micro) {
  if (typeof OMI === "undefined" || !micro) return null;
  const cod = OMI_MI[micro], z = cod && OMI["Milano|MI"]?.[cod];
  return z ? { cod, ...z } : null;
}
/* fasce di prezzo della zona: microzona letta per intero, altrimenti zona, altrimenti stima dalla media */
function pdfFasce(ctx) {
  const F = TERR.milano.fasce || { micro: {}, zone: {} };
  if (ctx.micro && F.micro[ctx.micro.n]) return { ...F.micro[ctx.micro.n], dove: "microzona " + ctx.micro.n, vero: true };
  if (ctx.zona && F.zone[ctx.zona.n]) return { ...F.zone[ctx.zona.n], dove: "zona " + ctx.zona.n, vero: true };
  const v = ctx.v, R = x => Math.round(x / 10) * 10;
  return { n: 0, p10: R(v * .66), med: R(v), p90: R(v * 1.3), r: [R(v * .68), R(v * .75), R(v * .82), 0], b: [R(v * .88), R(v * .95), R(v * 1.02), 0], o: [R(v * 1.0), R(v * 1.08), R(v * 1.18), 0],
    dove: ctx.micro ? "microzona " + ctx.micro.n : ctx.nome, vero: false };
}

/* spiegazione delle rettifiche */
function pdfSpiega(t, f) {
  const has = x => t.startsWith(x), up = f > 1;
  if (has("Taglio")) return up ? "I tagli piccoli sono i più richiesti, anche in affitto: spuntano un prezzo al m² più alto" : "Le metrature grandi hanno un mercato più ristretto: prezzo al m² inferiore ai tagli medi";
  if (has("Attico")) return "Terrazzi, luce e privacy: premio tipico degli attici";
  if (has("Villetta")) return "Indipendenza e spazi privati, rari in città";
  if (has("Loft")) return "Spazi aperti apprezzati da una nicchia: mercato più stretto";
  if (has("Piano terra")) return "Meno luce e privacy, più rumore dalla strada: sconto tipico dei piani bassi";
  if (has("Primo piano")) return "Piano basso senza ascensore: lieve sconto";
  if (t.includes("senza ascensore")) return "Accessibilità ridotta: lo sconto cresce con il piano";
  if (has("Piano alto")) return "Piano alto servito da ascensore: più luce, vista e silenzio";
  if (has("Ultimo piano")) return "Nessun vicino sopra, maggiore luminosità e riservatezza";
  if (has("Classe energetica non")) return "Classe non indicata: si applica una lieve prudenza";
  if (has("Classe energetica")) return up ? "Bassi consumi: costi di gestione ridotti, molto apprezzata dal mercato" : f < 0.99 ? "Consumi elevati e futuri obblighi di efficientamento (direttiva europea case green)" : "Classe nella media del patrimonio milanese";
  if (has("Epoca")) return up ? "Edificio recente o d'epoca signorile: qualità costruttiva riconosciuta" : "Edificio di quell'epoca: impianti e isolamento spesso da aggiornare";
  if (has("Orientamento")) return up ? "Esposizione luminosa, apprezzata in vendita e in affitto" : "Esposizione meno soleggiata";
  if (has("Doppia")) return "Luce da due lati e ricambio d'aria";
  if (has("Interno")) return "Affaccio interno poco luminoso";
  if (has("Vista")) return "Affaccio libero: fattore premiante esplicito";
  if (has("Riscaldamento")) return "Consumi gestiti in autonomia, molto richiesto";
  if (has("Portineria")) return "Servizio che sostiene decoro, sicurezza e valore dello stabile";
  if (has("Condominio con")) return "Spese straordinarie in arrivo: da considerare in trattativa";
  if (has("Facciata")) return "Parti comuni rinnovate: nessuna spesa straordinaria a breve";
  if (has("Via di pregio")) return "Indirizzo ricercato all'interno della zona";
  if (has("Via trafficata")) return "Traffico e rumore: sconto rispetto alle vie interne";
  if (has("Centro del paese")) return "Posizione centrale nel comune";
  if (has("Periferia")) return "Posizione decentrata nel comune";
  return "Coefficiente di merito d'uso comune nelle stime";
}


PL_T.mc = { grass: "#f4eee3", res: "#f2ebdf", ind: "#ece3d4", wood: "#dfe2cc", park: "#e1e5cf", water: "#c6d6dc", road: "#ffffff", roadCase: "#e0d1b5", major: "#e2c88f", majorCase: "#b08d57", dash: "#ffffff",
  school: "#eee3cf", farm: "#ede6d4", sand: "#eee2c8", rock: "#e9e3d9", grassy: "#e2e6d2", path: "#e8dcc5", rail: "#bfae95", bnd: "#6e1423", out: "#d8c8ae",
  roofs: ["#fbf8f2", "#f5eee3", "#f8f2e8", "#f1e9dc", "#fdfaf5", "#eee5d6"], lab: "#4a0d17", halo: "#ffffff", num: "#6e1423", accent: "#6e1423", city: "#6e1423", town: "#5b4c40", lake: "#2f6f80" };
const PDF_TEMI = { piantina: ["Piantina dall'alto", "vista dall'alto stile pianta, color seppia, con il segnaposto bordeaux", "#7a1628"], notte: ["Notte morbida", "lo stile dell'app: blu notte, palazzi in 3D, il tuo in oro", "#f2cf5b"],
  mc: ["Avorio e bordeaux", "chiara ed elegante, nei colori Maison Collection: il palazzo in bordeaux", "#7a1628"],
  oro: ["Carbone e oro", "nera e oro, molto scenografica", "#f2cf5b"],
  sat: ["Satellite", "foto aerea reale con il palazzo evidenziato in oro", "#f2cf5b"] };

/* fotografia della mappa Keystone (stile Notte morbida, palazzi in 3D) da mettere nel PDF */
let PDF_NOLIB = false;
async function pdfSnap(o) {
  if (PDF_NOLIB) return null;
  try { await Promise.race([mmLoad(), new Promise((_, j) => setTimeout(() => j(new Error("lib")), 12000))]); } catch (e) { PDF_NOLIB = true; return null; }
  if (!window.maplibregl) return null;
  const el = document.createElement("div");
  el.style.cssText = `position:fixed;left:-${o.w + 80}px;top:0;width:${o.w}px;height:${o.h}px;pointer-events:none`;
  document.body.appendChild(el);
  let map;
  const fine = () => { try { map && map.remove(); } catch (e) {} el.remove(); };
  const idle = () => new Promise(r => { if (map.loaded() && !map.isMoving()) map.once("idle", r); else map.once("idle", r); setTimeout(r, 6000); });
  try {
    const th0 = document.documentElement.dataset.th, tema = o.tema || "notte";
    let stile;
    if (tema === "sat") stile = { version: 8, glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
      sources: { sat: { type: "raster", tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"], tileSize: 256, maxzoom: 19 },
        omt: { type: "vector", url: "https://tiles.openfreemap.org/planet" } },
      layers: [{ id: "sat", type: "raster", source: "sat", paint: { "raster-saturation": -0.15, "raster-contrast": 0.05 } }] };
    else { document.documentElement.dataset.th = tema; stile = mmStile(); document.documentElement.dataset.th = th0; plSet(); }
    map = new maplibregl.Map({ container: el, style: stile, center: [o.lon, o.lat], zoom: o.zoom, pitch: o.pitch || 0, bearing: o.bearing || 0,
      interactive: false, preserveDrawingBuffer: true, pixelRatio: 2, attributionControl: false, fadeDuration: 0, antialias: true });
    await new Promise((r, j) => { map.once("load", r); setTimeout(() => j(new Error("timeout")), 9000); });
    if (tema !== "sat") { document.documentElement.dataset.th = tema; plSet(); }
    const roof = plRoof(); document.documentElement.dataset.th = th0; plSet();
    map.addLayer({ id: "bld", type: "fill-extrusion", source: "omt", "source-layer": "building", minzoom: 13,
      paint: { "fill-extrusion-color": tema === "sat" ? "#ffffff" : roof, "fill-extrusion-height": o.pitch ? ["coalesce", ["get", "render_height"], 10] : 0,
        "fill-extrusion-base": o.pitch ? ["coalesce", ["get", "render_min_height"], 0] : 0, "fill-extrusion-opacity": tema === "sat" ? 0.01 : 0.95, "fill-extrusion-vertical-gradient": true } });
    map.addSource("sel", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
    map.addLayer({ id: "sel-3d", type: "fill-extrusion", source: "sel", paint: { "fill-extrusion-color": o.selCol || "#f2cf5b", "fill-extrusion-height": o.pitch ? ["+", ["coalesce", ["get", "h"], 12], 1.5] : 0.5, "fill-extrusion-base": 0, "fill-extrusion-opacity": tema === "sat" ? 0.85 : 1 } });
    try { map.setLight({ anchor: "viewport", color: "#fff3d0", intensity: 0.4, position: [1.5, 210, 40] }); } catch (e) {}
    await idle();
    if (o.evidenzia) {
      let g = o.geom ? { type: "Feature", properties: { h: o.hb || 12 }, geometry: o.geom } : null;
      if (!g) { const f = map.queryRenderedFeatures(map.project([o.lon, o.lat]), { layers: ["bld"] })[0];
        if (f) g = { type: "Feature", properties: { h: f.properties.render_height || 12 }, geometry: f.geometry }; }
      if (g) { map.getSource("sel").setData({ type: "FeatureCollection", features: [g] }); await idle(); }
      else (o.pins = o.pins || []).push({ lat: o.lat, lon: o.lon, k: "me", t: "" });
    }
    const pins = (o.pins || []).map(p => { const q = map.project([p.lon, p.lat]); return { ...p, x: q.x, y: q.y }; });
    const url = map.getCanvas().toDataURL("image/jpeg", 0.88);
    fine();
    return url && url.length > 5000 ? { url, pins } : null;
  } catch (e) { fine(); return null; }
}
function pdfFoto(sn, W, H, cls = "") {
  const P = sn.pins.map(p => p.x < 6 || p.y < 6 || p.x > W - 6 || p.y > H - 6 ? "" : `<span class="pin ${p.k || ""}" style="left:${p.x.toFixed(1)}px;top:${p.y.toFixed(1)}px">${p.t ?? ""}</span>`).join("");
  return `<div class="mapw foto ${cls}" style="width:${W}px;height:${H}px"><img class="snap" src="${sn.url}" alt="">${P}<span class="osm">© OpenStreetMap · OpenFreeMap</span></div>`;
}

/* Il PDF si prepara dentro l'app (così su iPhone la mappa satellite si disegna davvero),
   poi si apre con un secondo tocco su "Apri il PDF" (Safari blocca le finestre aperte dopo un'attesa). */
async function mmPdfFoto(arg) {
  const { ctx, q } = arg, s = ctx.sel || {};
  const lat = s.lat ?? ctx.micro?.lat ?? ctx.com?.lat, lon = s.lon ?? ctx.micro?.lon ?? ctx.com?.lon;
  const foto = {}, tema = store.get("pdf_mappa", "piantina"), selCol = (PDF_TEMI[tema] || PDF_TEMI.piantina)[2];
  if (lat == null || tema === "piantina") return foto;
  const tm = (p, ms) => Promise.race([p, new Promise(r => setTimeout(() => r(null), ms))]);
  foto.cov = await tm(pdfSnap({ lat, lon, zoom: 17, pitch: 58, bearing: -28, w: 600, h: 300, evidenzia: true, geom: s.geom, hb: s.h, tema, selCol }), 25000);
  const C = arg.r.cmp || (window.mmComps ? mmComps(ctx, q) : null);
  const pts = C ? C.lista.map((a, i) => ({ lat: a.lat, lon: a.lon, t: i + 1, k: i < 3 ? "st" : "", ok: a.lat != null && !a.appross })).filter(a => a.ok) : [];
  if (pts.length) {
    const maxD = Math.max(400, ...C.lista.filter(a => a.lat != null && !a.appross).map(a => a.dist || 0));
    foto.cmp = await tm(pdfSnap({ lat, lon, zoom: maxD > 1400 ? 14 : maxD > 700 ? 15 : 15.8, w: 690, h: 270, pins: [...pts, { lat, lon, k: "me", t: "" }], evidenzia: true, geom: s.geom, tema: tema === "sat" ? "mc" : tema, selCol: tema === "sat" ? "#7a1628" : selCol }), 25000);
  }
  return foto;
}
function pdfApri(html) {
  const w = window.open("", "_blank");
  if (!w) { alert("Il browser ha bloccato la finestra del PDF: consenti le finestre pop-up per questo sito e riprova."); return false; }
  w.document.open(); w.document.write(html); w.document.close(); return true;
}
async function mmPdf(arg) {
  if (window.__pdfHtml) return mmPdfHtml(arg, {});
  if (store.get("pdf_mappa", "piantina") === "piantina") { pdfApri(mmPdfHtml(arg, {})); return; }   // piantina: niente da disegnare, si apre subito
  document.getElementById("pdfov")?.remove();
  const ov = document.createElement("div"); ov.id = "pdfov";
  ov.innerHTML = `<div class="pdfbox"><div class="spin"></div><b>Preparo il PDF</b><span>Disegno la mappa satellite e le pagine della valutazione…</span><button class="btn sec" data-pdfx>Annulla</button></div>`;
  document.body.appendChild(ov);
  let annullato = false;
  ov.addEventListener("click", e => { if (e.target.closest("[data-pdfx]")) { annullato = true; ov.remove(); } });
  const foto = await mmPdfFoto(arg);
  if (annullato) return;
  const html = mmPdfHtml(arg, foto);
  ov.querySelector(".pdfbox").innerHTML = `<b style="font-size:20px">Il PDF è pronto</b><span>${foto.cov ? "Con la mappa in copertina." : "La mappa non si è caricata: il PDF ha la cartina semplice."} Si apre in una nuova scheda: da lì "Salva PDF" e "Torna all'app".</span>
    <button class="btn pri" data-pdfgo>Apri il PDF</button><button class="btn sec" data-pdfx>Chiudi</button>`;
  ov.querySelector("[data-pdfgo]").addEventListener("click", () => { if (pdfApri(html)) ov.remove(); });
}


/* quartiere (NIL) dell'immobile: dal palazzo toccato, dai confini del Comune o dal nome */
const nilNorm = t => String(t || "").toLowerCase().replace(/p\.?ta\b/g, "porta").replace(/q\.?re\b/g, "quartiere").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
function pdfInPoly(pt, geom) {
  const ring = (r) => { let c = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c; } return c; };
  const poly = P => ring(P[0]) && !P.slice(1).some(ring);
  return geom.type === "Polygon" ? poly(geom.coordinates) : geom.type === "MultiPolygon" ? geom.coordinates.some(poly) : false;
}
function pdfNil(lat, lon, nome) {
  if (typeof NIL_DEMO === "undefined") return null;
  const F = window.MM && MM.nil ? MM.nil.features : [];
  let f = lat != null ? F.find(x => x.geometry && pdfInPoly([lon, lat], x.geometry)) : null;
  if (!f && nome) f = F.find(x => nilNorm(x.properties.nil) === nilNorm(nome));
  let id = f && +f.properties.id;
  if (!id || !NIL_DEMO[id]) { const n = nilNorm(f ? f.properties.nil : nome); if (n) id = +Object.keys(NIL_DEMO).find(k => nilNorm(NIL_DEMO[k][0]) === n || nilNorm(NIL_DEMO[k][0]).startsWith(n) || n.startsWith(nilNorm(NIL_DEMO[k][0]))); }
  return id && NIL_DEMO[id] ? { id, d: NIL_DEMO[id] } : null;
}

function mmPdfHtml({ r, q, ctx }, foto = {}) {
  const M = TERR.milano, s = ctx.sel || {}, C = PDF_C;
  const oggi = new Date().toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
  const oggiL = new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  const logo = new URL("img/maison-collection.png", location.href).href;
  const lat = s.lat ?? ctx.micro?.lat ?? ctx.com?.lat, lon = s.lon ?? ctx.micro?.lon ?? ctx.com?.lon;
  const near = lat != null && ctx.milano ? mzVicini({ lat, lon }) : { staz: [], poi: [] };
  const R5 = x => Math.round(x / 5000) * 5000, mmin = d => Math.max(1, Math.round(d / 75));
  const tipo = { appartamento: "Appartamento", attico: "Attico", loft: "Loft", villetta: "Villetta / casa" }[q.tipo] || "Appartamento";
  const pianoT = q.tipo === "villetta" ? "Indipendente" : (q.piano <= 0 ? "Piano terra" : q.piano + "° piano") + (q.ultimo ? " (ultimo)" : "") + (q.piano > 0 ? (q.ascensore ? ", con ascensore" : ", senza ascensore") : "");
  const boxT = { no: "", posto: "posto auto", singolo: "box", doppio: "box doppio" }[q.box];
  const statoT = V_STATO[q.stato][0];
  const zonaN = ctx.micro ? `${ctx.micro.n}${ctx.zona ? " / " + ctx.zona.n : ""}` : (ctx.com ? "comune di " + ctx.com.n : "");
  const sottot = `${tipo} ${q.mq} m²${q.piano > 0 && q.tipo !== "villetta" ? ", " + (q.piano + "° piano") + (q.ultimo ? " (ultimo)" : "") : ""}${boxT ? " con " + boxT : ""}, ${statoT.toLowerCase()}`;

  /* --- valori --- */
  const vMin = R5(r.min), vMax = R5(r.max), vMid = R5(r.valore);
  const mqCasa = r.valCasa / r.sup, mqMin = (r.min - r.box) / r.sup, mqMax = (r.max - r.box) / r.sup;
  // il valore è già il prezzo di richiesta di mercato; se il frazionamento vale di più, la pubblicazione sale a metà strada
  const pubbl = Math.round((r.fraz && r.fraz.valore > r.valore ? (r.valore + r.fraz.valore) / 2 : r.valore) / 5000) * 5000;

  /* --- comparabili --- */
  const Cm = r.cmp || (window.mmComps ? mmComps(ctx, q) : null);
  const comps = Cm ? Cm.lista.map((a, i) => ({ ...a, i: i + 1, star: i < 3 })) : [];
  const avg = v => v.length ? v.reduce((x, y) => x + y, 0) / v.length : null;
  const mediaC = avg(comps.map(a => a.mq2)), buoni = comps.filter(a => a.st === "O" || a.st === "N"), mediaO = avg(buoni.map(a => a.mq2));
  const stK = { nuovo: "N", ristrutturato: "O", ottimo: "O", buono: "B", rinfrescare: "B", ristrutturare: "R" }[q.stato];
  // secondo metodo, indipendente dai comparabili: fascia degli annunci della microzona per lo stato dell'immobile (prezzo mediano)
  const Fz = TERR.milano.fasce?.micro?.[ctx.micro?.n], gF = { nuovo: "o", ristrutturato: "o", ottimo: "o", buono: "b", rinfrescare: "b", ristrutturare: "r" }[q.stato] || "b";
  const mDir = r.cmp && Fz && Fz.b ? Fz.b[1] + 450 - (V_COSTO[q.stato] ?? 450) : null;
  const dir = mDir ? [mDir] : [];
  const valDir = mDir ? mDir * r.sup * r.kTot + r.box : null;

  /* --- fasce --- */
  const F = pdfFasce(ctx), gk = { R: "r", B: "b", O: "o", N: "o" }[stK];
  const righeF = [["r", "Da ristrutturare"], ["b", "Buono / abitabile"], ["o", "Ottimo, ristrutturato o nuovo"]].filter(([k]) => F[k]);
  const lo = Math.min(F.p10, mqMin, ...comps.map(a => a.mq2)) * 0.95, hi = Math.max(F.p90, mqMax, ...comps.map(a => a.mq2)) * 1.04;
  const X = v => ((v - lo) / (hi - lo) * 100).toFixed(2);
  const fCol = { r: "#d8c3a5", b: "#c39b62", o: C.bx };
  const gauge = `<div class="gauge">
    ${righeF.map(([k, t], i) => `<div class="gb" style="left:${X(F[k][0])}%;width:${X(F[k][2]) - X(F[k][0])}%;top:${4 + i * 22}px;background:${fCol[k]}${k === "r" ? ";--tc:#5b4a3a" : ""}${k === gk ? ";box-shadow:0 0 0 2px " + C.oro2 : ""}"><span>${t.split(",")[0]}</span></div>`).join("")}
    ${comps.map(a => `<i class="gd" style="left:${X(a.mq2)}%" title="${a.i}"></i>`).join("")}
    <div class="gm" style="left:${X(mqMin)}%;width:${X(mqMax) - X(mqMin)}%"><b>Questo immobile<br>${eur(mqMin)} – ${eur(mqMax)}/m²</b></div>
    <div class="gx">${[0, .25, .5, .75, 1].map(f => `<span style="left:${f * 100}%">${eur(lo + (hi - lo) * f)}</span>`).join("")}</div>
  </div>`;

  /* --- rettifiche --- */
  const baseT = r.cmp ? `Mediana pesata di ${r.cmp.nNorm} comparabili entro ${num(r.cmp.raggio)} m, scelti per vicinanza, caratteristiche, metratura e stato, e riportati allo stato di questo immobile`
    : `Prezzo richiesto negli annunci della ${ctx.micro ? "microzona " + esc(ctx.micro.n) : esc(ctx.nome)}`;
  const imp = f => f > 1.004 ? `<span class="imp p">+${num((f - 1) * 100, 0)}%</span>` : f < 0.996 ? `<span class="imp m">−${num((1 - f) * 100, 0)}%</span>` : `<span class="imp n">neutro</span>`;
  const rett = [
    [`Base di zona → ${eur(r.base)}/m²`, baseT, `<span class="imp b">base</span>`],
    [`Stato: ${esc(statoT)}`, r.cmp ? "Già compreso: i comparabili sono stati riportati a questo stato" : "Rispetto allo stato «buono» che fa da riferimento", imp(r.st[1])],
    ...r.k.map(([t, f]) => [esc(t), pdfSpiega(t, f), imp(f)]),
    ...(r.box ? [[`${esc(boxT[0].toUpperCase() + boxT.slice(1))} incluso`, "Valutato a parte e sommato al valore dell'appartamento", `<span class="imp p">+${keur(r.box)}</span>`]] : []),
  ];

  /* --- punti di forza e di attenzione --- */
  const PZ = ctx.zona && typeof ZONE_PROFILI !== "undefined" ? ZONE_PROFILI[ctx.zona.n] : null;
  const NI = ctx.milano ? pdfNil(lat, lon, s.nil) : null;
  const pro = [], con = [];
  const spazi = [q.terrazzo ? "terrazzo" : "", q.balcone ? "balconi" : "", q.giardino ? "giardino" : "", q.cantina ? "cantina" : "", boxT].filter(Boolean);
  pro.push(`${q.mq} m² con ${q.locali} locali e ${q.bagni} bagn${q.bagni == 1 ? "o" : "i"}${["nuovo", "ristrutturato", "ottimo"].includes(q.stato) ? ", in " + statoT.toLowerCase() + " stato" : ""}`);
  if (r.fraz) pro.push(`Frazionabile in ${r.fraz.n} unità da circa ${num(r.fraz.mqU)} m²: interessa anche agli investitori`);
  if (spazi.length) pro.push(spazi.join(", ").replace(/^./, c => c.toUpperCase()) + (spazi.length > 1 ? " inclusi" : " incluso"));
  if (q.piano >= 3 && q.ascensore) pro.push(`${q.ultimo ? "Ultimo piano" : "Piano alto"} con ascensore${q.orient ? ", esposizione " + q.orient.replace("/", " / ").replace("S", "Sud").replace("O", "Ovest").replace("N", "Nord").replace("E", "Est") : ""}`);
  if (q.portineria) pro.push("Portineria nello stabile");
  if ("ABC".includes(q.classe) && q.classe !== "?") pro.push(`Classe energetica ${q.classe}: costi di gestione contenuti`);
  if (near.staz[0] && near.staz[0].d < 700) pro.push(`Metro ${near.staz[0].n} a ${mmin(near.staz[0].d)} minuti a piedi`);
  if (ctx.zona && ctx.zona.y > 0) pro.push(`Mercato della zona in crescita (+${num(ctx.zona.y, 1)}% annuo)`);
  if ("EFG".includes(q.classe) && q.classe !== "?") con.push(`Classe energetica ${q.classe}: consumi e futuri lavori di efficientamento da considerare`);
  if (["anni50", "anni70"].includes(q.epoca) || (q.anno && q.anno < 1975)) con.push(`Edificio ${q.anno ? "del " + q.anno : "degli anni " + (q.epoca === "anni50" ? "'50-'60" : "'70-'80")}: impianti e parti comuni da verificare`);
  if (q.condo && q.condo * 12 / q.mq > 30) con.push(`Spese condominiali elevate (${eur(q.condo * 12)}/anno): incidono su gestione e trattativa`);
  if (q.stato === "ristrutturare" || q.stato === "rinfrescare") con.push("Lavori da preventivare: incidono su prezzo e tempi di vendita");
  if (q.piano <= 0 && q.tipo !== "villetta") con.push("Piano terra: minore luce e privacy");
  if (q.piano >= 3 && !q.ascensore) con.push("Piano alto senza ascensore: platea di acquirenti ridotta");
  if (ctx.milano && (!near.staz[0] || near.staz[0].d > 900)) con.push(`Metropolitana non vicina${near.staz[0] ? ` (${near.staz[0].n} a ~${num(near.staz[0].d / 1000, 1)} km)` : ""}: collegamento con tram, bus o bici`);
  if (comps.length < 6) con.push("Pochi comparabili molto simili: stima da confermare con un sopralluogo");
  if (PZ) { for (const x of PZ.pro) if (pro.length < 5) pro.push(x); for (const x of PZ.con) if (con.length < 5) con.push(x); }

  /* --- investimento --- */
  const canMin = r.canone ? Math.round(r.canone * 0.93 / 25) * 25 : null, canMax = r.canone ? Math.round(r.canone * 1.07 / 25) * 25 : null;
  const boxAff = { no: null, posto: [60, 90], singolo: [100, 150], doppio: [150, 220] }[q.box];
  const totMin = canMin ? canMin + (boxAff ? boxAff[0] : 0) : null, totMax = canMax ? canMax + (boxAff ? boxAff[1] : 0) : null;
  const L = r.sc.list;

  /* --- servizi --- */
  const serv = [...near.staz.slice(0, 3).map(x => ({ ic: "M", t: `Metro ${x.n}`, d: `Linea ${[...x.ln].join(", ")}`, m: x.d })),
    ...["scu", "neg", "osp", "uni", "par", "lav"].flatMap(k => near.poi.filter(p => p.c === k).slice(0, k === "neg" || k === "scu" ? 2 : 1).map(p => ({ ic: { scu: "S", neg: "N", osp: "H", uni: "U", par: "P", lav: "L" }[k], t: p.n, d: T_POI[k][0], m: p.d })))]
    .sort((a, b) => a.m - b.m).slice(0, 9);

  /* --- mappe --- */
  const COLS = ["#7a1628", "#b08d57", "#2f5d8a", "#2f7d55", "#6b4c9a", "#1f7a7a", "#c46a1b", "#b5476b", "#4a5568", "#6b7a2a"];
  comps.forEach((a, i) => a.col = COLS[i % COLS.length]);
  const pins = comps.filter(a => a.lat != null && !a.appross).map(a => ({ lat: a.lat, lon: a.lon, t: a.i, c: a.col }));
  const mapCover = foto.cov ? pdfFoto(foto.cov, 600, 300, "cov") : lat != null ? pdfMappa(lat, lon, 16, 600, 300, [{ lat, lon, k: "me", t: "" }], "cov") : "";
  // la mappa si adatta: centrata e con lo zoom che fa stare dentro immobile e comparabili
  let mapComp = "";
  if (foto.cmp) mapComp = pdfFoto(foto.cmp, 690, 290);
  else if (lat != null && pins.length) {
    const all = [...pins, { lat, lon }], mx = lo => (lo + 180) / 360, my = la => { const q = Math.sin(la * Math.PI / 180); return 0.5 - Math.log((1 + q) / (1 - q)) / (4 * Math.PI); };
    const xs = all.map(p => mx(p.lon)), ys = all.map(p => my(p.lat)), dx = Math.max(...xs) - Math.min(...xs), dy = Math.max(...ys) - Math.min(...ys);
    let z = 17; while (z > 11 && (dx * 2 ** z * 256 > 690 - 90 || dy * 2 ** z * 256 > 290 - 70)) z--;
    const cLon = (Math.min(...all.map(p => p.lon)) + Math.max(...all.map(p => p.lon))) / 2, cLat = (Math.min(...all.map(p => p.lat)) + Math.max(...all.map(p => p.lat))) / 2;
    mapComp = pdfMappa(cLat, cLon, z, 690, 290, [...pins, { lat, lon, k: "me", t: "" }]);
  }
  const legenda = comps.length ? `<div class="leg"><span><i class="me"></i>Immobile valutato</span>${comps.map(a => `<span><i style="background:${a.col}">${a.i}</i>${esc((a.via || a.micro || "").replace(/^(Via|Viale|Piazza|Corso|Piazzale) /, ""))} · ${eur(a.mq2)}/m²${a.lat == null || a.appross ? " (posizione n.d.)" : ""}</span>`).join("")}</div>` : "";

  const sec = (n, t, body, cls = "") => `<section class="${cls}"><h2><i>${n}</i>${t}</h2>${body}</section>`;
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=840"><script>(function(){var w=Math.min(screen.width,innerWidth||screen.width);if(w<840)document.querySelector("meta[name=viewport]").setAttribute("content","width=840,initial-scale="+(w/840).toFixed(3))})()<\/script><title>Valutazione ${esc(ctx.nome)}${ctx.cliente ? " – " + esc(ctx.cliente) : ""} – Maison Collection</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
@page{size:A4;margin:13mm 13mm 14mm}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:Montserrat,"Helvetica Neue",Arial,sans-serif;font-weight:400;color:${C.ink};font-size:8.6pt;line-height:1.5;background:#fff}
.serif,h1,h2,.big{font-family:"Cormorant Garamond",Georgia,serif}
/* copertina */
.cover{height:268mm;position:relative;display:flex;flex-direction:column;border:1px solid ${C.oro};padding:9mm 10mm 8mm;page-break-after:always;overflow:hidden}
.cover:before{content:"";position:absolute;inset:3mm;border:.6pt solid ${C.oro2};pointer-events:none}
.cover .logo{display:block;width:62mm;margin:2mm auto 0}
.cover .kick{text-align:center;letter-spacing:.42em;font-size:7.5pt;color:${C.oro};margin:7mm 0 1mm;text-transform:uppercase}
.cover h1{text-align:center;font-weight:500;font-size:30pt;letter-spacing:.08em;color:${C.bx};margin:0;text-transform:uppercase;line-height:1.05}
.cover .orn{display:flex;align-items:center;gap:8px;justify-content:center;margin:4mm 0 4mm;color:${C.oro}}
.cover .orn:before,.cover .orn:after{content:"";width:28mm;height:.6pt;background:${C.oro}}
.cover .addr{text-align:center;font-family:"Cormorant Garamond",serif;font-size:19pt;color:${C.ink};margin:0;font-style:italic}
.cover .subt{text-align:center;color:${C.mut};font-size:8.5pt;margin:1.5mm 0 6mm;letter-spacing:.04em}
.cover .mapw{margin:0 auto;border-radius:3px}
.cover .band{margin:6mm -10mm 0;background:linear-gradient(120deg,${C.bx2},${C.bx} 55%,#8a1e31);color:#fff;padding:7mm 12mm;display:grid;grid-template-columns:1.25fr 1fr;gap:8mm;align-items:center;position:relative}
.cover .band:after{content:"";position:absolute;left:0;right:0;bottom:-1.2mm;height:1.2mm;background:linear-gradient(90deg,${C.oro},${C.oro2},${C.oro})}
.cover .band small{display:block;letter-spacing:.3em;font-size:6.8pt;text-transform:uppercase;color:${C.oro2}}
.cover .band .big{font-size:27pt;line-height:1.05;margin-top:1mm;color:#fff;white-space:nowrap}
.cover .band .kv{border-left:.6pt solid rgba(217,189,132,.55);padding-left:7mm}
.cover .band .kv div{display:flex;justify-content:space-between;font-size:8pt;padding:1mm 0;border-bottom:.4pt solid rgba(255,255,255,.14)}
.cover .band .kv b{font-weight:500;color:${C.oro2}}
.cover .foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;font-size:7.5pt;color:${C.mut};padding-top:5mm}
.cover .foot .for{font-family:"Cormorant Garamond",serif;font-size:13pt;color:${C.ink}}
.cover .foot .for small{display:block;font-family:Montserrat;font-size:6.5pt;letter-spacing:.3em;text-transform:uppercase;color:${C.oro}}
/* mappe */
.mapw{position:relative;overflow:hidden;break-inside:avoid;border:.6pt solid ${C.oro2};background:#efe8dc}
.mapw .tiles{position:absolute;inset:0;filter:grayscale(1) sepia(.28) contrast(.92) brightness(1.06)}
.mapw .tiles img{position:absolute}
.mapw img.snap{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.mapw.foto{border-color:${C.oro};box-shadow:0 2px 10px rgba(0,0,0,.18)}
.mapw .osm{position:absolute;right:3px;bottom:2px;font-size:5.5pt;color:#6b5f58;background:rgba(255,255,255,.7);padding:0 3px}
.pin{position:absolute;transform:translate(-50%,-50%);width:15px;height:15px;border-radius:50%;background:#fff;border:1.4px solid ${C.oro};color:${C.bx};font-size:6.5pt;font-weight:600;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.leg{display:flex;flex-wrap:wrap;gap:1.2mm 4mm;margin:2mm 0 0;font-size:6.6pt;color:${C.mut}}.leg span{display:inline-flex;align-items:center;gap:1.4mm}.leg i,.cn{display:inline-flex;align-items:center;justify-content:center;width:4.2mm;height:4.2mm;border-radius:50%;color:#fff;font-style:normal;font-size:6pt;font-weight:600}.leg i.me{background:${C.bx};box-shadow:0 0 0 1.2pt ${C.oro}}
.demo{border:.8pt solid ${C.oro};padding:3mm 4mm;margin:0 0 2mm;break-inside:avoid;background:#fffdf9}
.dh{display:flex;align-items:baseline;gap:3mm;border-bottom:.6pt solid ${C.line};padding-bottom:1.5mm;margin-bottom:2.5mm}.dh small{letter-spacing:.2em;font-size:6pt;text-transform:uppercase;color:${C.oro}}.dh b{font-family:"Cormorant Garamond",serif;font-size:15pt;font-weight:500;color:${C.bx}}.dh span{margin-left:auto;font-size:6.5pt;color:${C.mut}}
.dk{display:grid;grid-template-columns:repeat(4,1fr);gap:2mm;margin-bottom:3mm}.dk div{border-top:2pt solid ${C.oro};background:${C.oro3};padding:1.8mm 2mm}.dk small{display:block;font-size:6pt;letter-spacing:.14em;text-transform:uppercase;color:${C.mut}}.dk b{font-family:"Cormorant Garamond",serif;font-size:15pt;font-weight:500;color:${C.bx};line-height:1.1}.dk span{display:block;font-size:6.3pt;color:${C.mut}}
.db{display:grid;grid-template-columns:32mm 1fr 14mm 18mm;align-items:center;gap:3mm;margin:1.4mm 0;font-size:7.6pt}.db b{color:${C.bx};font-weight:600;text-align:right}.db em{font-style:normal;font-size:6.6pt;color:${C.mut}}
.dbt{position:relative;height:3.2mm;background:#f1e9dc;border-radius:2mm}.dbt i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,${C.oro},${C.bx});border-radius:2mm}.dbt u{position:absolute;top:-1mm;bottom:-1mm;width:.9pt;background:${C.ink};text-decoration:none}
.pin.st{background:${C.oro};color:#fff;border-color:#fff}
.pin.me{width:22px;height:22px;background:${C.bx};border:3px solid #fff;box-shadow:0 0 0 2px ${C.oro},0 0 0 9px rgba(110,20,35,.18),0 2px 6px rgba(0,0,0,.4);z-index:2}
/* pagine interne */
.top{display:flex;justify-content:space-between;align-items:center;border-bottom:.8pt solid ${C.oro};padding-bottom:2.5mm;margin-bottom:4mm}
.top img{height:9mm}.top div{text-align:right;font-size:7pt;color:${C.mut};letter-spacing:.06em}
.top b{display:block;font-family:"Cormorant Garamond",serif;font-size:11pt;color:${C.bx};font-weight:500;letter-spacing:0}
section{margin:0 0 5.5mm;break-inside:auto}
h2{font-weight:500;font-size:16pt;color:${C.bx};margin:0 0 2.5mm;display:flex;align-items:center;gap:3mm;break-after:avoid;border-bottom:.6pt solid ${C.line};padding-bottom:1.5mm}
h2 i{font-style:normal;font-family:Montserrat;font-size:7.5pt;font-weight:600;width:7mm;height:7mm;border-radius:50%;background:${C.bx};color:${C.oro2};display:inline-flex;align-items:center;justify-content:center;box-shadow:0 0 0 1.2pt ${C.oro}}
p{margin:0 0 2mm}.lead{color:#4d4246}
.mut{color:${C.mut}}.small{font-size:7pt;color:${C.mut}}
table{width:100%;border-collapse:collapse}td,th{padding:1.6mm 2mm;text-align:left;vertical-align:top;border-bottom:.4pt solid ${C.line}}
th{font-size:6.5pt;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:${C.bx};font-weight:500}
th:first-child{border-top-left-radius:2px}th:last-child{border-top-right-radius:2px}
.r{text-align:right}tr{break-inside:avoid}
.kv td:first-child{width:36%;color:${C.bx};font-weight:500;background:${C.oro3}}
tr.hl td{background:#fbf5ea}tr.hl td:first-child{box-shadow:inset 2.5pt 0 0 ${C.oro}}
.star{color:${C.oro};font-size:9pt}
.tiles6{display:grid;grid-template-columns:repeat(6,1fr);gap:2mm;margin-bottom:3mm}
.tiles6 div{border:.6pt solid ${C.line};border-top:2pt solid ${C.oro};padding:2mm 2mm 1.6mm;background:#fff}
.tiles6 small{display:block;font-size:6pt;letter-spacing:.16em;text-transform:uppercase;color:${C.mut}}
.tiles6 b{font-family:"Cormorant Garamond",serif;font-size:15pt;font-weight:500;color:${C.bx};line-height:1.15}
.sum{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:0;margin:0 0 5mm;border:.8pt solid ${C.oro};break-inside:avoid}
.sum div{padding:3mm 3.5mm;border-left:.6pt solid ${C.line}}.sum div:first-child{border:0;background:${C.bx};color:#fff}
.sum small{display:block;font-size:6pt;letter-spacing:.18em;text-transform:uppercase;color:${C.mut}}.sum div:first-child small{color:${C.oro2}}
.sum b{display:block;font-family:"Cormorant Garamond",serif;font-weight:500;font-size:17pt;line-height:1.1;color:${C.bx};margin-top:.6mm}.sum div:first-child b{color:#fff;font-size:19pt}
.sum span{font-size:6.8pt;color:${C.mut}}.sum div:first-child span{color:rgba(255,255,255,.75)}
.note{font-size:7pt;color:${C.mut};font-style:italic;margin-top:1.5mm}
.imp{display:inline-block;white-space:nowrap;min-width:13mm;text-align:center;border-radius:20px;padding:.5mm 2mm;font-size:7pt;font-weight:600}
.imp.p{background:#e6f2ea;color:${C.ok}}.imp.m{background:#f7e3e6;color:${C.ko}}.imp.n{background:#f1ece4;color:${C.mut}}.imp.b{background:${C.bx};color:${C.oro2}}
/* gauge */
.gauge{position:relative;height:122px;margin:3mm 3mm 3mm;break-inside:avoid;border-bottom:.6pt solid ${C.line}}
.gb{position:absolute;height:18px;border-radius:9px;opacity:.95}.gb span{position:absolute;left:6px;top:2.5px;font-size:6.4pt;color:var(--tc,#fff);white-space:nowrap;letter-spacing:.04em;font-weight:500;text-shadow:0 0 2px rgba(0,0,0,.35)}
.gd{position:absolute;top:78px;width:7px;height:7px;margin-left:-3.5px;border-radius:50%;background:#fff;border:1.3px solid ${C.oro}}
.gm{position:absolute;top:70px;height:24px;border:1.4pt solid ${C.bx};border-radius:4px;background:rgba(110,20,35,.12);min-width:4px}
.gm b{position:absolute;top:27px;left:50%;transform:translateX(-50%);text-align:center;font-size:6.6pt;color:${C.bx};font-weight:600;white-space:nowrap;line-height:1.25}
.gx{position:absolute;left:0;right:0;bottom:-13px;height:12px}.gx span{position:absolute;transform:translateX(-50%);font-size:6pt;color:${C.mut};white-space:nowrap}
.gx span:first-child{transform:none}.gx span:last-child{transform:translateX(-100%)}
/* range */
.range{border:1pt solid ${C.oro};background:linear-gradient(180deg,#fff,#fbf6ee);padding:4mm 5mm;break-inside:avoid}
.range .hd{display:flex;justify-content:space-between;align-items:baseline;border-bottom:.6pt solid ${C.oro2};padding-bottom:2mm;margin-bottom:3mm}
.range .hd small{letter-spacing:.3em;font-size:7pt;text-transform:uppercase;color:${C.oro}}
.range .hd .big{font-size:26pt;color:${C.bx};font-weight:500}
.bar{position:relative;height:10px;border-radius:6px;background:linear-gradient(90deg,#efe6d6,${C.oro2} 35%,${C.oro} 50%,${C.oro2} 65%,#efe6d6);margin:7mm 0 7mm}
.bar i{position:absolute;top:-5px;width:2px;height:20px;background:${C.bx}}
.bar em{position:absolute;top:-17px;transform:translateX(-50%);font-style:normal;font-size:6.6pt;color:${C.bx};font-weight:600;white-space:nowrap}
.bar u{position:absolute;top:15px;transform:translateX(-50%);text-decoration:none;font-size:6.3pt;color:${C.mut};white-space:nowrap}
.meth{display:grid;grid-template-columns:1fr 1fr;gap:3mm}.meth div{border:.6pt solid ${C.line};padding:2.5mm 3mm;background:#fff}
.meth small{display:block;letter-spacing:.14em;font-size:6pt;text-transform:uppercase;color:${C.oro}}.meth b{font-family:"Cormorant Garamond",serif;font-size:14pt;color:${C.bx};font-weight:500}
/* servizi */
.serv{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2mm}.serv div{display:flex;gap:2.5mm;align-items:center;border:.6pt solid ${C.line};padding:2mm;break-inside:avoid}
.serv i{flex:0 0 7mm;height:7mm;border-radius:50%;background:${C.oro3};color:${C.bx};font-style:normal;font-weight:600;display:flex;align-items:center;justify-content:center;font-size:8pt;border:.8pt solid ${C.oro}}
.serv i.M{background:${C.bx};color:#fff;border-color:${C.bx}}
.serv b{display:block;font-weight:500;font-size:7.6pt;line-height:1.25}.serv span{font-size:6.6pt;color:${C.mut}}.serv em{margin-left:auto;font-style:normal;font-family:"Cormorant Garamond",serif;font-size:12pt;color:${C.bx};white-space:nowrap}
/* forza / attenzione */
.pc{display:grid;grid-template-columns:1fr 1fr;gap:3mm;break-inside:avoid}.pc>div{border:.6pt solid ${C.line}}
.pc h3{margin:0;padding:2mm 3mm;font-size:7pt;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:#fff}
.pc .f h3{background:${C.ok}}.pc .a h3{background:${C.bx}}
.pc ul{list-style:none;margin:0;padding:1mm 3mm 2mm}.pc li{padding:1.4mm 0 1.4mm 5mm;border-bottom:.4pt solid ${C.line};position:relative}.pc li:last-child{border:0}
.pc .f li:before{content:"✓";position:absolute;left:0;color:${C.ok};font-weight:700}.pc .a li:before{content:"!";position:absolute;left:1mm;color:${C.bx};font-weight:700}
.two{display:grid;grid-template-columns:1fr 1fr;gap:4mm;break-inside:avoid}
.pb{break-before:page}
.endf{margin-top:6mm;padding-top:3mm;border-top:.8pt solid ${C.oro};display:flex;justify-content:space-between;align-items:center;font-size:7pt;color:${C.mut}}.endf img{height:10mm}
@media screen{body{background:#e9e4dc;min-width:840px;padding:64px 0 30px}.wrap{width:210mm;margin:0 auto;background:#fff;padding:12mm;box-shadow:0 6px 30px rgba(0,0,0,.18)}
.appbar{position:fixed;left:0;right:0;top:0;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;background:rgba(251,247,240,.96);border-bottom:1px solid ${C.oro2};z-index:9;backdrop-filter:blur(6px)}
.appbar button{border-radius:24px;padding:10px 18px;font:600 15px Montserrat,Arial;cursor:pointer}
.appbar .back{background:#fff;color:${C.bx};border:1.5px solid ${C.oro}}.appbar .go{background:${C.bx};color:#fff;border:1.5px solid ${C.oro2}}
}
@media print{.appbar{display:none}.wrap{padding:0}}
</style></head><body>
<div class="appbar"><button class="back" onclick="try{window.opener&&window.opener.focus()}catch(e){};window.close();setTimeout(function(){location.href='${esc(location.href.split("#")[0] + "#milano/cliente")}'},250)">‹ Torna all'app</button><button class="go" onclick="window.print()">Salva PDF / Stampa</button></div>
<div class="wrap">

<div class="cover">
  <img class="logo" src="${logo}" alt="Maison Collection">
  <div class="kick">Relazione di stima · ${oggi}</div>
  <h1>Valutazione<br>immobiliare</h1>
  <div class="orn">◆</div>
  <p class="addr">${esc(ctx.nome)}</p>
  <p class="subt">${esc(sottot)}${zonaN ? " · " + esc(zonaN) : ""}</p>
  ${mapCover}
  <div class="band">
    <div><small>Range di valore consigliato</small><div class="big">€ ${num(vMin)} – ${num(vMax)}</div>
      <span style="font-size:7.5pt;color:rgba(255,255,255,.75)">valore centrale ${eur(vMid)} · ${eur(mqCasa)}/m² commerciale</span></div>
    <div class="kv">
      ${ctx.mode === "cliente" ? `<div><span>Prezzo di pubblicazione</span><b>${eur(pubbl)}</b></div>` : ""}
      <div><span>Superficie commerciale</span><b>${num(r.sup, 0)} m²</b></div>
      <div><span>Comparabili analizzati</span><b>${comps.length}</b></div>
      ${r.canone ? `<div><span>Canone di mercato</span><b>${eur(canMin)}–${num(canMax)}/mese</b></div>` : ""}
    </div>
  </div>
  <div class="foot">
    <div class="for">${ctx.cliente ? `<small>Preparata per</small>${esc(ctx.cliente)}` : `<small>Maison Collection</small>Agenzia immobiliare · Milano`}</div>
    <div style="text-align:right">Maison Collection · Milano<br>${oggiL}</div>
  </div>
</div>

<div class="top"><img src="${logo}" alt=""><div><b>${esc(ctx.nome)}</b>Valutazione immobiliare · ${oggi}</div></div>

<div class="sum">
  <div><small>Range consigliato</small><b>${keur(vMin)} – ${keur(vMax)}</b><span>${eur(mqMin)} – ${eur(mqMax)}/m²${r.box ? " + " + boxT : ""}</span></div>
  <div><small>${ctx.mode === "cliente" ? "Pubblicazione" : "Realizzo rapido"}</small><b>${keur(ctx.mode === "cliente" ? pubbl : r.offerta)}</b><span>${ctx.mode === "cliente" ? "in linea con le richieste di oggi" : "circa il 3% sotto il valore"}</span></div>
  <div><small>Media zona</small><b>${eur(ctx.v)}</b><span>al m², prezzi richiesti</span></div>
  <div><small>${r.canone ? "Canone stimato" : "Andamento"}</small><b>${r.canone ? eur(r.canone) : ctx.zona ? (ctx.zona.y >= 0 ? "+" : "") + num(ctx.zona.y, 1) + "%" : "—"}</b><span>${r.canone ? "al mese, affitto lungo" : "ultimi 12 mesi"}</span></div>
</div>

${sec(1, "Immobile oggetto di valutazione", `
<div class="tiles6">
  <div><small>Superficie</small><b>${q.mq} m²</b></div><div><small>Locali</small><b>${q.locali}</b></div><div><small>Bagni</small><b>${q.bagni}</b></div>
  <div><small>Piano</small><b>${q.tipo === "villetta" ? "—" : q.piano <= 0 ? "T" : q.piano + "°"}</b></div><div><small>Classe</small><b>${q.classe === "?" ? "n.d." : q.classe}</b></div><div><small>Anno</small><b>${q.anno || "—"}</b></div>
</div>
<table class="kv"><tbody>
  <tr><td>Indirizzo</td><td>${esc(ctx.nome)}${zonaN ? ` — zona ${esc(zonaN)}` : ""}${s.nil ? ` (quartiere ${esc(s.nil)})` : ""}</td></tr>
  <tr><td>Tipologia</td><td>${tipo}</td></tr>
  <tr><td>Superficie</td><td>${q.mq} m² interni · <b>${num(r.sup, 1)} m² commerciali</b> (balconi 30%, terrazzi 35%, giardino 10%, cantina 25%)</td></tr>
  <tr><td>Piano</td><td>${pianoT}</td></tr>
  <tr><td>Locali / bagni</td><td>${q.locali} locali, ${q.bagni} bagn${q.bagni == 1 ? "o" : "i"}</td></tr>
  <tr><td>Stato</td><td>${esc(statoT)}${r.lavori ? ` · lavori previsti ${eur(r.lavori)} (dopo: ${esc(V_STATO[q.statoDopo][0].toLowerCase())})` : ""}</td></tr>
  <tr><td>Edificio</td><td>${q.anno ? "Costruito nel " + q.anno + " · " : ""}${esc(V_EPOCA[q.epoca][0])} · condominio ${({ buono: "in condizioni normali", rifatto: "con facciata e parti comuni rifatte", dafare: "con lavori in arrivo" })[q.condominio]}</td></tr>
  <tr><td>Classe energetica</td><td>${q.classe === "?" ? "Non indicata" : q.classe}</td></tr>
  <tr><td>Esposizione</td><td>${q.orient ? q.orient.split("/").map(x => ({ N: "Nord", S: "Sud", E: "Est", O: "Ovest" })[x]).join(" / ") + " · " : ""}${({ singola: "affaccio singolo", doppia: "doppia esposizione", buia: "affaccio interno" })[q.espo]}${q.vista !== "normale" ? " · vista " + q.vista : ""}</td></tr>
  <tr><td>Spazi esterni</td><td>${[q.balcone ? `balconi ${q.balcone} m²` : "", q.terrazzo ? `terrazzo ${q.terrazzo} m²` : "", q.giardino ? `giardino ${q.giardino} m²` : ""].filter(Boolean).join(" · ") || "—"}</td></tr>
  <tr><td>Box / cantina</td><td>${[boxT ? boxT[0].toUpperCase() + boxT.slice(1) + " incluso nella vendita" : "", q.cantina ? `cantina ${q.cantina} m²` : ""].filter(Boolean).join(" · ") || "—"}</td></tr>
  <tr><td>Dotazioni</td><td>${[q.risc === "autonomo" ? "Riscaldamento autonomo" : "Riscaldamento centralizzato", q.portineria ? "portineria" : "", q.arredato ? "arredato" : ""].filter(Boolean).join(" · ")}</td></tr>
  <tr><td>Spese condominiali</td><td>${q.condo ? `${eur(q.condo)}/mese (~${eur(q.condo * 12)}/anno, ${eur(q.condo * 12 / q.mq)}/m² l'anno)` : "Non indicate"}</td></tr>
  ${q.note ? `<tr><td>Note particolari</td><td>${esc(q.note)}</td></tr>` : ""}
</tbody></table>`)}

${comps.length ? sec(2, "Comparabili di mercato analizzati", `
<p class="lead">Analizzati ${comps.length} annunci in vendita con metratura simile (${Math.round(q.mq * 0.6)}–${Math.round(q.mq * 1.6)} m²), ordinati per vicinanza e somiglianza. Le ★ indicano i tre più affini. Media dei comparabili: <b>${eur(mediaC)}/m²</b>${mediaO ? `; media dei ${buoni.length} in ottimo stato o ristrutturati: <b>${eur(mediaO)}/m²</b>` : ""}.</p>
${mapComp}${legenda}
<table style="margin-top:3mm"><thead><tr><th>#</th><th>Indirizzo</th><th class="r">Prezzo</th><th class="r">m²</th><th class="r">€/m²</th><th>Piano</th><th>Note</th><th class="r">Dist.</th></tr></thead><tbody>
${comps.map(a => `<tr class="${a.star ? "hl" : ""}"><td style="white-space:nowrap"><i class="cn" style="background:${a.col}">${a.i}</i>${a.star ? ' <span class="star">★</span>' : ""}</td><td style="width:30%"><b style="font-weight:500">${esc(a.via || "Zona " + (a.micro || ""))}</b>${a.micro ? ` <span class="small">· ${esc(a.micro)}</span>` : ""}</td>
<td class="r">${eur(a.p)}</td><td class="r">${a.mq}</td><td class="r"><b style="color:${C.bx}">${eur(a.mq2)}</b></td><td>${a.piano ? (a.piano === "T" ? "Terra" : a.piano === "R" ? "Rialzato" : a.piano === "S" ? "Semint." : a.piano + "°") : "—"}${a.asc ? ", asc." : a.piano && a.piano !== "T" ? ", no asc." : ""}</td>
<td class="small">${esc((a.d || "").split(", ").filter(x => !/piano|rialzato|seminterrato|^ascensore$/.test(x)).join(", "))}${a.loc ? `, ${a.loc} locali` : ""}</td><td class="r">${a.dist != null ? (a.appross ? "~" : "") + num(a.dist / 1000, 1) + " km" : "—"}</td></tr>`).join("")}
</tbody></table>
<p class="note">Prezzi richiesti negli annunci di ${[...new Set(comps.map(a => a.fonte))].join(" e ")} (novembre 2026). La valutazione è espressa come prezzo di richiesta in linea con questi annunci.</p>`) : ""}

${sec(comps.length ? 3 : 2, "Fasce di prezzo della zona (cross-check)", `
<div style="break-inside:avoid"><p class="lead">Le fasce mostrano dove si collocano i prezzi richiesti nella ${esc(F.dove)}${F.vero ? ` (${num(F.n)} annunci letti)` : ""}, divisi per stato dell'immobile. La stima dell'appartamento, <b>${eur(mqMin)}–${eur(mqMax)}/m²</b>, è un prezzo di richiesta: va confrontata con la fascia del suo stato.</p>
${gauge}</div>
<table style="margin-top:6mm"><thead><tr><th>Fascia</th><th class="r">Min €/m²</th><th class="r">Max €/m²</th><th class="r">Media €/m²</th><th class="r">Annunci</th></tr></thead><tbody>
${righeF.map(([k, t]) => `<tr class="${k === gk ? "hl" : ""}"><td>${t}${k === gk ? ' <span class="star">★</span>' : ""}</td><td class="r">${eur(F[k][0])}</td><td class="r">${eur(F[k][2])}</td><td class="r"><b>${eur(F[k][1])}</b></td><td class="r">${F[k][3] || "—"}</td></tr>`).join("")}
${ctx.micro ? `<tr><td>Media microzona ${esc(ctx.micro.n)} (Immobiliare.it)</td><td class="r">—</td><td class="r">—</td><td class="r"><b>${eur(ctx.micro.v)}</b></td><td class="r">—</td></tr>` : ""}
${ctx.zona ? `<tr><td>Media zona ${esc(ctx.zona.n)} (Immobiliare.it, ${ctx.zona.y >= 0 ? "+" : ""}${num(ctx.zona.y, 1)}% annuo)</td><td class="r">—</td><td class="r">—</td><td class="r"><b>${eur(ctx.zona.v)}</b></td><td class="r">—</td></tr>` : ""}
${(o => o ? [["cn", "normale"], ["co", "ottimo"], ["sn", "signorili, normale"]].filter(([k]) => o[k]).map(([k, t]) => `<tr><td>OMI zona ${esc(o.cod)}, abitazioni ${k === "sn" ? "" : "civili, "}${t}</td><td class="r">${eur(o[k][0])}</td><td class="r">${eur(o[k][1])}</td><td class="r"><b>${eur((o[k][0] + o[k][1]) / 2)}</b></td><td class="r">—</td></tr>`).join("") : "")(omiMi(ctx.micro?.n))}
</tbody></table>
${(o => o ? `<p class="note">Quotazioni OMI dell'Agenzia delle Entrate, ${OMI_SEM.split("/")[1]}° semestre ${OMI_SEM.split("/")[0]}: zona ${esc(o.cod)} – ${esc(o.d.toLowerCase())}. Sono quotazioni ufficiali basate sulle compravendite della zona: di solito più prudenti dei prezzi richiesti negli annunci.${o.cn && o.cn[2] ? ` Affitto OMI: ${num(o.cn[2], 1)}–${num(o.cn[3], 1)} €/m² al mese.` : ""}</p>` : "")(omiMi(ctx.micro?.n))}
<p class="note">${F.vero ? `Fonte: annunci Immobiliare.it letti il 20/11/2026 nella ${esc(F.dove)}; min e max sono il 25° e il 75° percentile di ogni fascia.` : "Fasce stimate dalla media della zona con gli scarti tipici tra stati di conservazione (per questa zona non è ancora stata fatta una lettura completa degli annunci)."} ★ Fascia dello stato attuale dell'immobile. I pallini sono i comparabili della sezione precedente.</p>`)}

${sec(comps.length ? 4 : 3, "Rettifiche applicate", `
<table><thead><tr><th style="width:30%">Fattore</th><th>Effetto sul valore</th><th class="r" style="width:20mm">Impatto</th></tr></thead><tbody>
${rett.map(([a, b, c]) => `<tr><td><b style="font-weight:500">${a}</b></td><td>${b}</td><td class="r">${c}</td></tr>`).join("")}
</tbody></table>`)}

${sec(comps.length ? 5 : 4, "Range di valore stimato", `
<div class="range">
  <div class="hd"><small>Range di valore consigliato</small><span class="big">€ ${num(vMin)} – € ${num(vMax)}</span></div>
  ${(() => { const a = Math.min(vMin, valDir || vMin, pubbl) * 0.96, b = Math.max(vMax, valDir || vMax, pubbl) * 1.03, P = v => ((v - a) / (b - a) * 100).toFixed(1);
    return `<div class="bar"><i style="left:${P(vMin)}%"></i><i style="left:${P(vMax)}%"></i><em style="left:${P(vMid)}%">▼ ${eur(vMid)}</em>
      <u style="left:${P(vMin)}%">min ${keur(vMin)}</u><u style="left:${P(vMax)}%">max ${keur(vMax)}</u>
      ${ctx.mode === "cliente" ? `<u style="left:${P(pubbl)}%;top:-17px;color:${C.oro}">pubblicazione ${keur(pubbl)}</u>` : ""}</div>`; })()}
  <div class="meth">
    <div><small>Metodo 1 · comparabili (peso ${r.m2 ? "75" : "100"}%)</small><b>${eur(Math.round(((r.m1 ?? r.valCasa) + r.box) / 1000) * 1000)}</b><br><span class="small">${eur(r.base)}/m² ${r.cmp ? `da ${r.cmp.nNorm} annunci simili entro ${num(r.cmp.raggio)} m` : "di base"}, rettifiche × ${num(r.kTot * r.st[1], 2)}, su ${num(r.sup, 1)} m²${r.box ? ", + " + boxT : ""}</span></div>
    <div><small>Metodo 2 · fascia di microzona${r.m2 ? " (peso 25%)" : ""}</small><b>${valDir ? eur(Math.round(valDir / 1000) * 1000) : "—"}</b><br><span class="small">${valDir ? `prezzo mediano degli annunci in stato buono della microzona, corretto per lo stato «${esc(statoT.toLowerCase())}» col costo dei lavori: ${eur(mDir)}/m²` : "Fascia di microzona non disponibile per un secondo metodo indipendente"}</span></div>
  </div>
</div>
<p style="margin-top:3mm"><b style="color:${C.bx};font-weight:600">Motivazione.</b> ${valDir ? (Math.abs(valDir - r.valore) / r.valore < 0.08 ? "I due metodi indipendenti convergono" : valDir > r.valore ? "La fascia della microzona dà un valore più alto: gli annunci più simili e vicini sono un po' più economici della media della microzona" : "La fascia della microzona dà un valore più prudente: gli annunci più simili e vicini all'immobile chiedono di più della media della microzona") + ` (${eur((r.m1 ?? r.valCasa) + r.box)} e ${eur(valDir)}). ` : ""}Il range tiene conto dell'incertezza tipica della stima (±${pct((r.max - r.valore) / r.valore, 0)})${r.box ? `; il ${boxT} (${eur(r.box)}) è valutato a parte e già incluso` : ""}.${r.m2 ? ` Il valore centrale pesa per il 75% il metodo dei comparabili e per il 25% la fascia della microzona.` : ""}${r.fraz ? ` L'appartamento è frazionabile in ${r.fraz.n} unità da circa ${num(r.fraz.mqU)} m²: per un investitore vale fino a <b>${eur(r.fraz.valore)}</b> (tagli piccoli ristrutturati a ${eur(r.fraz.eurMq)}/m², meno ${eur(r.fraz.lavori)} di lavori e pratiche e il suo margine), e questo sostiene la parte alta del range.` : ""}${ctx.mode === "cliente" ? ` Per la pubblicazione consigliamo <b>${eur(pubbl)}</b>, in linea con le richieste di oggi.` : ""} Un sopralluogo è consigliato per confermare stato, dotazioni e spese.</p>`)}

${serv.length ? sec(comps.length ? 6 : 5, "Servizi e vita di quartiere", `
<p class="lead">${near.staz[0] ? `La metropolitana più vicina è ${esc(near.staz[0].n)} (linea ${[...near.staz[0].ln].join(", ")}), a circa ${mmin(near.staz[0].d)} minuti a piedi.` : "La metropolitana non è raggiungibile a piedi: i collegamenti sono con tram e bus."} Tempi a piedi stimati in linea d'aria a 4,5 km/h dalle posizioni delle attività.</p>
<div class="serv">${serv.map(x => `<div><i class="${x.ic}">${x.ic}</i><span style="flex:1"><b>${esc(x.t)}</b><span>${esc(x.d)}</span></span><em>${mmin(x.m)}′</em></div>`).join("")}</div>`) : ""}

${PZ || NI ? sec(comps.length ? 7 : 6, "Profilo della zona", `
${PZ ? `<p class="lead">${esc(PZ.car)}</p>` : ""}
${NI ? (() => { const [n, res, fam, st, den, gio, anz, iv] = NI.d, Mi = NIL_MILANO, comp = res / fam;
  const bar = (t, v, m, max, fmt) => `<div class="db"><span>${t}</span><div class="dbt"><i style="width:${Math.min(100, v / max * 100)}%"></i><u style="left:${Math.min(100, m / max * 100)}%"></u></div><b>${fmt(v)}</b><em>Milano ${fmt(m)}</em></div>`;
  const p1 = v => num(v, 1).replace(".", ",") + "%";
  const lett = [anz > Mi.anz + 2 ? "più anziano della media cittadina" : gio > Mi.gio + 1 ? "più giovane della media, con molti ragazzi" : "con un'età in linea con la media di Milano",
    st > Mi.str + 5 ? "una presenza di stranieri sopra la media" : st < Mi.str - 5 ? "pochi residenti stranieri" : "una quota di stranieri nella media",
    comp > Mi.comp + 0.1 ? "famiglie un po' più numerose" : comp < Mi.comp - 0.1 ? "molti nuclei piccoli (single e coppie)" : "famiglie di dimensione tipica"];
  return `<div class="demo"><div class="dh"><small>Il quartiere</small><b>${esc(n)}</b><span>NIL ${NI.id} · Comune di Milano</span></div>
  <div class="dk"><div><small>Residenti</small><b>${num(res)}</b></div><div><small>Famiglie</small><b>${num(fam)}</b><span>${num(comp, 2).replace(".", ",")} persone in media</span></div><div><small>Densità</small><b>${num(den)}</b><span>abitanti / km²</span></div><div><small>Indice di vecchiaia</small><b>${num(iv)}</b><span>over 65 ogni 100 under 15</span></div></div>
  ${bar("Residenti stranieri", st, Mi.str, 50, p1)}${bar("Giovani 0–18 anni", gio, Mi.gio, 30, p1)}${bar("Over 65", anz, Mi.anz, 40, p1)}
  <p style="margin:2mm 0 0">Un quartiere ${lett[0]}, con ${lett[1]} e ${lett[2]}.</p></div>`; })() : ""}
<table class="kv" style="margin-top:3mm"><tbody>
  ${PZ ? `<tr><td>Municipio</td><td>Municipio ${PZ.mun} · ${ZP_MUN[PZ.mun]} abitanti</td></tr>` : ""}
  <tr><td>Comune di Milano</td><td>${ZP_CITTA.pop} · residenti stranieri ${ZP_CITTA.stranieri} · età media ~45 anni</td></tr>
  ${PZ ? `<tr><td>Edilizia prevalente</td><td>${esc(PZ.edi)}</td></tr><tr><td>Domanda abitativa</td><td>${esc(PZ.dom)}</td></tr>` : ""}
  ${ctx.zona ? `<tr><td>Mercato</td><td>Vendita: ${eur(ctx.zona.v)}/m² medio (${ctx.zona.y >= 0 ? "+" : ""}${num(ctx.zona.y, 1)}% in 12 mesi) · affitto ${num(ctx.zona.a, 2)} €/m² al mese · rendita lorda ${pct(ctx.zona.a * 12 / ctx.zona.v, 1)}</td></tr>` : ""}
</tbody></table>
<p class="note">${NI ? "Dati del quartiere: Comune di Milano, schede NIL del PGT Milano 2030 (anagrafe 2017); la barra sottile indica la media di Milano. " : ""}Carattere e domanda sono descritti a livello di zona.</p>`) : ""}

${sec(comps.length ? (PZ || NI ? 8 : 7) : 7, "Punti di forza e di attenzione", `<div class="pc">
  <div class="f"><h3>Punti di forza</h3><ul>${pro.slice(0, 5).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="a"><h3>Punti di attenzione</h3><ul>${(con.length ? con : ["Nessuna criticità rilevante dai dati inseriti"]).slice(0, 5).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
</div>`)}

${r.canone ? sec(comps.length ? (PZ || NI ? 9 : 8) : 8, "Potenziale come investimento", `
<p class="lead">Se messo a reddito, il canone è posizionato in modo prudente rispetto alla media della zona (${num(ctx.a, 2)} €/m² al mese)${q.mq > 110 ? ", perché i tagli grandi spuntano un canone al m² più basso delle unità piccole" : ""}.${boxAff ? ` Il ${boxT} può essere locato anche a parte.` : ""}</p>
<div class="two"><table class="kv"><tbody>
  <tr><td>Canone medio di zona</td><td>${num(ctx.a, 2)} €/m² al mese</td></tr>
  <tr><td>Canone appartamento</td><td><b>${eur(canMin)} – ${eur(canMax)}</b> al mese</td></tr>
  ${boxAff ? `<tr><td>Canone ${boxT}</td><td>~${eur(boxAff[0])}–${eur(boxAff[1])} al mese</td></tr><tr><td>Canone totale</td><td><b>${eur(totMin)} – ${eur(totMax)}</b> al mese</td></tr>` : ""}
  <tr><td>Rendimento lordo</td><td><b>${pct(totMin * 12 / vMax, 1)} – ${pct(totMax * 12 / vMin, 1)}</b> sul range di valore</td></tr>
</tbody></table>
<table><thead><tr><th>Uso</th><th class="r">Netto annuo</th><th class="r">Rend. netto</th></tr></thead><tbody>
  ${[["lungo", "Affitto lungo 4+4 / 3+2"], ["medio", "Medio termine (10 mesi)"], ["breve", "Affitto breve"]].filter(([k]) => L[k]).map(([k, t]) => `<tr><td>${t}${k === "breve" && r.breve ? `<br><span class="small">${eur(r.breve.adr)}/notte, ${pct(r.breve.occ, 0)} occupazione</span>` : ""}</td><td class="r">${eur(L[k].netto)}</td><td class="r"><b style="color:${C.bx}">${pct(L[k].rendNetto)}</b></td></tr>`).join("")}
</tbody></table></div>
<p class="note">Stime indicative. Il netto è dopo spese di gestione, condominio, manutenzione e cedolare secca, sul valore stimato più i costi d'acquisto${r.lavori ? " e i lavori" : ""}. Periodi di sfitto e spese straordinarie possono ridurre il rendimento.</p>`) : ""}

${sec(comps.length ? (PZ || NI ? 10 : 9) : 9, "Nota metodologica", `
<p class="small" style="font-size:7.4pt">Valutazione con metodo comparativo di mercato, espressa come prezzo di richiesta in linea con il mercato di oggi: ${r.cmp ? `mediana pesata di ${r.cmp.nNorm} annunci Immobiliare.it entro ${num(r.cmp.raggio)} m, scelti nell'ordine per vicinanza, caratteristiche (tipologia e locali), metratura e stato, esclusi i prezzi anomali (quote, aste, errori) e riportati allo stato dell'immobile togliendo o aggiungendo il costo dei lavori in €/m² (da ristrutturare 1.250, da rinfrescare 700, buono 450 rispetto a un ristrutturato)` : `prezzo richiesto negli annunci della ${ctx.micro ? "microzona" : "zona"} (Immobiliare.it)`}, corretta con coefficienti di merito per piano, taglio, classe energetica, epoca, esposizione e dotazioni (al massimo ±12% quando ci sono i comparabili). ${valDir ? `Verifica indipendente con la fascia di prezzo della microzona. ` : ""}Fasce di zona ${F.vero ? "ricavate dagli annunci letti per intero il 20/11/2026" : "stimate dalla media di zona"}. Superfici secondarie: balconi 30%, terrazzi 35%, giardino 10%, cantina 25%; box valutato a parte. Stima orientativa a supporto della strategia di prezzo: non è una perizia giurata e non sostituisce le verifiche di conformità urbanistica e catastale.</p>`)}

<div class="endf"><img src="${logo}" alt=""><span>Maison Collection · Agenzia immobiliare · Milano<br>Relazione generata con Keystone il ${oggiL}</span></div>
</div>
<script>
(async()=>{try{await document.fonts.ready}catch(e){}
 await Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,4000)})));
 })();
<\/script>
</body></html>`;
  if (window.__pdfHtml) window.__pdfHtml(html);   // per i test
  return html;
}

/* ---------- anteprima delle copertine con le diverse mappe (pagina nascosta: #anteprima) ---------- */
function pdfEsempio() {
  const mi = TERR.milano.micro.find(m => m.n === "Vigentino - Fatima"), z = TERR.milano.zone.find(x => x.n === mi.z);
  const sel = { lat: 45.4366, lon: 9.2041, micro: mi.n, zona: z.n, comune: "Milano", via: "Via Giuseppe Ripamonti", civ: "166" };
  const ctx = { v: mi.v, a: mi.a, nome: "Via Giuseppe Ripamonti 166, Milano", milano: true, str: MZ_STR({ ...z, v: mi.v }), micro: mi, zona: z, sel, mode: "cliente", cliente: "Famiglia Rossi" };
  const q = { ...V_DEF, mq: 107, locali: 4, bagni: 2, piano: 6, ascensore: true, ultimo: true, stato: "ottimo", classe: "D", epoca: "anni50", anno: 1960, orient: "S/O", balcone: 12, cantina: 6, box: "singolo", portineria: true, condo: 350, note: "Due balconi, portineria a mezza giornata" };
  return { r: vCalcola(q, ctx), q, ctx };
}
function vAnteprima() {
  const scelto = store.get("pdf_mappa", "piantina");
  return `<div class="hubhead"><small>Rendering</small><h1>Copertina del PDF</h1><p class="sub">Quattro versioni della mappa sulla stessa valutazione di esempio (Via Ripamonti 166). Le mappe si generano adesso, ci vogliono una decina di secondi. Tocca "Apri il PDF completo" per vederlo tutto.</p></div>
  ${Object.entries(PDF_TEMI).map(([k, [t, d]]) => `<div class="card" style="margin:0 0 18px;padding:14px">
    <h2 style="margin:0 0 2px">${esc(t)} ${k === scelto ? '<small style="color:var(--cy)">· in uso ora</small>' : ""}</h2><p class="note" style="margin:0 0 10px">${esc(d)}</p>
    <div class="antw" data-ant="${k}"><div class="mmload"><div class="spin"></div><span>Disegno la mappa…</span></div></div>
    <div class="btns"><button class="btn sec" data-antpdf="${k}">Apri il PDF completo</button><button class="btn ${k === scelto ? "sec" : "pri"}" data-antuse="${k}">${k === scelto ? "✓ In uso" : "Usa questa"}</button></div></div>`).join("")}`;
}
async function afterAnteprima() {
  const E = pdfEsempio(), s = E.ctx.sel, C = E.r.cmp, H = {};
  const pts = C ? C.lista.map((a, i) => ({ lat: a.lat, lon: a.lon, t: i + 1, k: i < 3 ? "st" : "", ok: a.lat != null && !a.appross })).filter(a => a.ok) : [];
  $("#app").addEventListener("click", e => { const u = e.target.closest("[data-antuse]"); if (u) { store.set("pdf_mappa", u.dataset.antuse); document.querySelectorAll("[data-antuse]").forEach(x => { const on = x === u; x.textContent = on ? "✓ In uso" : "Usa questa"; x.className = "btn " + (on ? "sec" : "pri"); }); return; }
    const b = e.target.closest("[data-antpdf]"); if (!b || !H[b.dataset.antpdf]) return;
    pdfApri(H[b.dataset.antpdf]); });
  for (const k of Object.keys(PDF_TEMI)) {
    const box = document.querySelector(`[data-ant="${k}"]`); if (!box) return;
    const selCol = PDF_TEMI[k][2];
    const foto = k === "piantina" ? {} : { cov: await pdfSnap({ lat: s.lat, lon: s.lon, zoom: 17, pitch: 58, bearing: -28, w: 600, h: 300, evidenzia: true, tema: k, selCol }) };
    if (pts.length && k !== "piantina") foto.cmp = await pdfSnap({ lat: s.lat, lon: s.lon, zoom: 15, w: 690, h: 270, pins: [...pts, { lat: s.lat, lon: s.lon, k: "me", t: "" }], evidenzia: true, tema: k === "sat" ? "mc" : k, selCol: k === "sat" ? "#7a1628" : selCol });
    const html = mmPdfHtml(E, foto); H[k] = html;
    const fr = document.createElement("iframe"); fr.className = "antf"; fr.srcdoc = html.replace(/<script>\(async\(\)=>[\s\S]*?<\/script>/, "");
    box.innerHTML = ""; box.appendChild(fr);
    const fit = () => { const sc = box.clientWidth / 794; fr.style.transform = `scale(${sc})`; box.style.height = (1123 * sc) + "px"; };
    fit(); addEventListener("resize", fit);
  }
}
TERR_VIEWS.anteprima = [vAnteprima, afterAnteprima];
