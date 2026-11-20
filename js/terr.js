"use strict";
/* ==========================================================================
   KEYSTONE — Analisi del territorio: Mappa B&B, Valutazione, Milano.
   Usa i dati di data/territorio.js e le funzioni dell'app (eur, pct, esc,
   store, scenari, IMPOSTAZIONI, maps). Caricato prima dello script principale.
   ========================================================================== */
const T_HOME = { badile: [45.3600, 9.1100, "Badile"], romana: [45.4520, 9.2030, "Porta Romana"] };
const T_TIPI = { lago: "Lago", mare: "Mare", montagna: "Montagna", citta: "Città", collina: "Collina", aeroporto: "Aeroporto" };
const T_POI = { metro: ["Metro", "#e3242b"], uni: ["Università", "#f2cf5b"], osp: ["Ospedali", "#ff6b8b"], lav: ["Lavoro e stazioni", "#facc15"],
  eve: ["Eventi", "#f5d76e"], neg: ["Negozi", "#a78bfa"], scu: ["Scuole", "#34d399"], par: ["Parchi", "#22c55e"] };
const T_GEO = {};
const T_BILO = 0.85;       // un bilocale incassa a notte circa l'85% della media del mercato (che include case più grandi)          // confini caricati per provincia (codice ISTAT -> FeatureCollection)
let T_IDX = null;

/* ---------- indice dei dati ---------- */
const tFname = p => p.name || p.com_name || p.COMUNE || "";
const tnorm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’'`\-]/g, " ").replace(/\s+/g, " ").trim();
function tIdx() {
  if (T_IDX) return T_IDX;
  const geo = store.get("geo", {}), rip = {};
  // un canone identico in 3+ comuni della stessa provincia è quasi sempre un valore di ripiego del portale (paesi senza annunci d'affitto)
  TERR.comuni.forEach(c => { if (c[4] != null) rip[c[1] + "|" + c[4]] = (rip[c[1] + "|" + c[4]] || 0) + 1; });
  const com = TERR.comuni.map(([n, p, v, y, a]) => {
    const aOk = a != null && rip[p + "|" + a] < 3;
    const c = TERR.coord[n] || geo[tnorm(n) + "|" + p];
    const pr = TERR.prov[p] || {};
    return { n, p, reg: pr.reg || "", v, y, a, aOk, princ: !!TERR.coord[n], lat: c ? c[0] : null, lon: c ? c[1] : null,
      rl: v >= 700 && aOk && a * 12 / v <= 0.12 ? a * 12 / v : null, m60: v ? 60000 / v : null };
  });
  const byN = new Map(com.map(c => [tnorm(c.n), c]));
  const br = TERR.brevi.map(s => {
    const c = byN.get(tnorm(s.n));
    const revpar = s.adr * s.occ;
    const lordo = s.adr * T_BILO * s.occ * 365;   // bilocale disponibile tutto l'anno
    const pz = c && c.v ? c.v * 50 : null;        // prezzo di un bilocale di 50 m² al prezzo medio del comune
    return { ...s, revpar, lordo, com: c || null, rb: pz ? lordo / (pz + IMPOSTAZIONI.arredo_se_non_arredato) : null,
      rlu: c && c.rl ? c.rl : null };
  });
  T_IDX = { com, byN, br };
  return T_IDX;
}
function tDist(lat, lon, from) {
  if (lat == null) return null;
  const [la, lo] = T_HOME[from] || T_HOME.badile, R = 6371, r = Math.PI / 180;
  const d = 2 * R * Math.asin(Math.sqrt(Math.sin((lat - la) * r / 2) ** 2 + Math.cos(la * r) * Math.cos(lat * r) * Math.sin((lon - lo) * r / 2) ** 2));
  return { km: d, min: Math.round(d * 1.32 / 72 * 60 + 8) };   // strada ≈ 1,32 × linea d'aria, 72 km/h di media, +8 min
}
const tOre = m => m == null ? "—" : m < 60 ? m + " min" : Math.floor(m / 60) + "h" + String(m % 60).padStart(2, "0");
const hav = (a, b, c, d) => { const r = Math.PI / 180; return 2 * 6371000 * Math.asin(Math.sqrt(Math.sin((c - a) * r / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin((d - b) * r / 2) ** 2)); };

/* ---------- scala colori (una tinta, dal buio al ciano acceso) ---------- */
const T_RAMP = ["#4a3a0e", "#8a6d16", "#c9a227", "#f2cf5b", "#fff1b8"];
function tBins(vals) {
  const s = vals.filter(v => v != null && isFinite(v)).sort((a, b) => a - b);
  if (!s.length) return [];
  return [0.2, 0.4, 0.6, 0.8].map(q => s[Math.min(s.length - 1, Math.floor(q * s.length))]);
}
const tCol = (v, bins) => v == null ? "#3a3530" : T_RAMP[bins.filter(b => v > b).length];
function tLegend(bins, fmt, title) {
  if (!bins.length) return "";
  const lab = [`fino a ${fmt(bins[0])}`, ...bins.slice(0, -1).map((b, i) => `${fmt(b)}–${fmt(bins[i + 1])}`), `oltre ${fmt(bins[bins.length - 1])}`];
  return `<div class="tleg"><b>${esc(title)}</b>${lab.map((l, i) => `<span><i style="background:${T_RAMP[i]}"></i>${esc(l)}</span>`).join("")}<span><i style="background:#2e2a22"></i>n.d.</span></div>`;
}

/* ---------- mappa base ---------- */
function tMap(el, view) {
  if (!window.L) { el.innerHTML = `<div class="mapfb">Mappa non disponibile senza connessione.</div>`; return null; }
  const m = L.map(el, { zoomControl: false, scrollWheelZoom: false, preferCanvas: true });
  L.control.zoom({ position: "bottomright" }).addTo(m);
  const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(m);
  if (window.plLeaflet) plLeaflet(m, osm);
  if (view) m.setView(view[0], view[1]);
  maps.push(m); setTimeout(() => m.invalidateSize(), 60);
  return m;
}
function tHomeMarkers(m) {
  for (const k in T_HOME) { const [la, lo, n] = T_HOME[k];
    L.circleMarker([la, lo], { radius: 6, color: "#ffffff", weight: 3, fillColor: "#7c3aed", fillOpacity: 1 }).bindTooltip(n, { direction: "top" }).addTo(m); }
}

/* ---------- confini dei comuni (openpolis, caricati quando serve) ---------- */
async function tGeo(istat) {
  if (T_GEO[istat]) return T_GEO[istat];
  const url = `https://cdn.jsdelivr.net/gh/openpolis/geojson-italy@master/geojson/limits_P_${istat}_municipalities.geojson`;
  const r = await fetch(url); if (!r.ok) throw new Error("confini non disponibili");
  const g = await r.json(); T_GEO[istat] = g;
  // salva i centri dei comuni, così la prossima volta compaiono subito sulla mappa
  const sig = Object.keys(TERR.prov).find(k => TERR.prov[k].istat === istat), geo = store.get("geo", {});
  for (const f of g.features) { const c = tCentro(f.geometry); if (c) geo[tnorm(tFname(f.properties)) + "|" + sig] = c; }
  store.set("geo", geo); T_IDX = null;
  return g;
}
function tCentro(geom) {
  if (!geom) return null;
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.type === "MultiPolygon" ? geom.coordinates : [];
  let best = null, area = -1;
  for (const p of polys) { const ring = p[0]; let a = 0, x = 0, y = 0;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const f = ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1]; a += f; x += (ring[j][0] + ring[i][0]) * f; y += (ring[j][1] + ring[i][1]) * f; }
    if (Math.abs(a) > area && a) { area = Math.abs(a); best = [+(y / (3 * a)).toFixed(4), +(x / (3 * a)).toFixed(4)]; } }
  return best;
}

/* ---------- motore di valutazione (unico per Milano e per gli altri comuni) ----------
   Principio: si stima il prezzo al m² dell'immobile in stato OTTIMO (riferimento), al piano di riferimento e senza accessori;
   poi si applicano piano/ascensore, lo stato (in euro al m²: per "da ristrutturare" il costo dei lavori che sceglie l'utente),
   gli accessori (balconi, terrazzo, giardino, cantina, box) e le poche rettifiche di merito che i comparabili non possono sapere. */
const V_STATO = { nuovo: ["Nuovo / mai abitato", 1.06, 1.08], ottimo: ["Ottimo / ristrutturato", 1, 1.04], buono: ["Buono / abitabile", 1, 1.00], ristrutturare: ["Da ristrutturare", 1, 0.85] };
const V_ALIAS = { ristrutturato: "ottimo", rinfrescare: "buono" };              // valutazioni salvate con i vecchi stati
const V_BUONO = 450;                                                              // €/m²: da buono/abitabile a ottimo (bagno, cucina, pavimenti, pittura)
const V_IMPREV = 0.10, V_DISAGIO = 0.03;                                         // da ristrutturare: +10% su lavori (progetto, pratiche, imprevisti) e 3% del valore per tempi e disagio
/* prezzo al m² nello stato dell'immobile, partendo dal prezzo "ottimo" */
function vStatoMq(vO, q) {
  const st = V_ALIAS[q.stato] || q.stato;
  if (st === "nuovo") return vO * V_STATO.nuovo[1];
  if (st === "buono") return vO - V_BUONO;
  if (st === "ristrutturare") return vO - (+q.costoLavori || 1000) * (1 + V_IMPREV) - vO * V_DISAGIO;
  return vO;
}
/* piano e ascensore, rispetto al riferimento (1°–2° piano con ascensore) */
function vPianoF(piano, asc, ultimo) {
  const p = String(piano).toUpperCase(), n = /^\d+/.test(p) ? parseInt(p) : p.startsWith("T") ? 0 : p.startsWith("R") ? 0.5 : p.startsWith("S") ? -1 : 1;
  let f = n < 0 ? 0.85 : n === 0 ? 0.93 : n === 0.5 ? 0.96 : n === 1 ? (asc ? 0.99 : 0.98) : n === 2 ? (asc ? 1 : 0.97) : asc ? (n >= 4 ? 1.03 : 1.01) : Math.max(0.82, 1 - 0.05 * (n - 1.6));
  if (ultimo && asc && n >= 3) f *= 1.015;
  return f;
}
/* accessori già compresi nel prezzo di un annuncio (dalle sue caratteristiche): quota da togliere per avere l'appartamento "nudo" */
const V_ACC = { b: ["balcone", 0.015], t: ["terrazzo", 0.04], j: ["giardino", 0.03], c: ["cantina", 0.01] };
const V_CLASSE = { A: 1.06, B: 1.04, C: 1.02, D: 1.00, E: 0.99, F: 0.97, G: 0.96, "?": 0.99 };
const V_EPOCA = { nuova: ["Dopo il 2015", 1.04], recente: ["1990–2015", 1.02], anni70: ["1970–1990", 0.98], anni50: ["1950–1970 (popolare)", 0.95],
  epoca: ["D'epoca signorile", 1.05], epocapop: ["D'epoca popolare", 0.97] };
const V_DEF = { tipo: "appartamento", mq: 60, locali: 2, bagni: 1, balcone: 0, terrazzo: 0, giardino: 0, cantina: 0, box: "no", piano: 2, ascensore: true,
  ultimo: false, stato: "buono", costoLavori: 1000, classe: "?", epoca: "anni70", espo: "singola", vista: "normale",
  risc: "centralizzato", portineria: false, condominio: "buono", posizione: "media", arredato: false, prezzo: 0, condo: 0, anno: 0, orient: "", note: "", fraz: 0 };

function vCalcola(inp, ctx) {
  const q = Object.assign({}, V_DEF, inp); q.stato = V_ALIAS[q.stato] || q.stato; if (!V_STATO[q.stato]) q.stato = "buono";
  const aff = ctx.a, mq = Math.max(10, +q.mq || 0);
  // 1. prezzo al m² in stato ottimo, piano di riferimento, senza accessori
  const cmp = ctx.milano && window.mmComps ? mmComps(ctx, q) : null;
  const Fm = ctx.milano && ctx.micro && TERR.milano.fasce?.micro?.[ctx.micro.n];
  const omi = ctx.milano && typeof omiMi === "function" ? omiMi(ctx.micro?.n) : null;
  const vOfascia = Fm && Fm.b ? Fm.b[1] + V_BUONO : null;                                       // fascia "buono" della microzona + lavori leggeri
  const vOomi = omi && omi.co ? (omi.co[0] + omi.co[1]) / 2 * 1.08 : null;                       // OMI ottimo (compravendite) + scarto tipico verso il prezzo richiesto
  // base OMI (o fascia della microzona) + comparabili pesati per somiglianza: 25% base, 75% comparabili
  const vObase = vOomi || vOfascia, fonteBase = vOomi ? "omi" : vOfascia ? "fascia" : null;
  let vO, fonteO;
  if (cmp) { vO = vObase ? cmp.vO * 0.75 + vObase * 0.25 : cmp.vO; fonteO = "comparabili"; }
  else if (vOomi) { vO = vOomi; fonteO = "omi"; }
  else if (vOfascia) { vO = vOfascia; fonteO = "fascia"; }
  else { vO = ctx.v + V_BUONO * (ctx.milano ? 1 : 0.6); fonteO = "media"; }
  const omiCheck = omi && omi.co ? { min: omi.co[0], max: omi.co[1], fuori: vO < omi.co[0] * 0.9 ? "sotto" : vO > omi.co[1] * 1.3 ? "sopra" : "" } : null;
  // 2. piano e ascensore
  const fP = q.tipo === "villetta" ? 1 : vPianoF(q.piano, q.ascensore, q.ultimo);
  // 3. stato: in euro al m² (da ristrutturare: costo dei lavori scelto, +10% imprevisti, −3% del valore per tempi)
  const vOp = vO * fP, vS = vStatoMq(vOp, q);
  // 4. rettifiche di merito che gli annunci non dicono (massimo ±10% con i comparabili)
  const k = [], add = (t, f) => { if (Math.abs(f - 1) > 0.001) k.push([t, f]); };
  if (!cmp) add("Taglio " + (mq < 40 ? "piccolo (molto richiesto)" : mq < 60 ? "medio-piccolo" : mq > 150 ? "molto grande" : mq > 110 ? "grande" : ""), mq < 40 ? 1.06 : mq < 60 ? 1.03 : mq > 150 ? 0.92 : mq > 110 ? 0.96 : 1);
  if (q.tipo === "attico") add("Attico", 1.08);
  if (q.tipo === "villetta") add("Villetta / casa indipendente", ctx.milano ? 1.05 : 1.0);
  if (q.tipo === "loft") add("Loft / open space", 0.95);
  add(q.classe === "?" ? "Classe energetica non indicata" : "Classe energetica " + q.classe, V_CLASSE[q.classe] ?? 1);
  if (!cmp) add("Epoca: " + (V_EPOCA[q.epoca] || ["", 1])[0], (V_EPOCA[q.epoca] || ["", 1])[1]);
  add(q.espo === "doppia" ? "Doppia esposizione" : q.espo === "buia" ? "Interno buio" : "", q.espo === "doppia" ? 1.02 : q.espo === "buia" ? 0.95 : 1);
  { const o = { S: 1.02, "S/E": 1.01, "S/O": 1.01, "E/O": 1.01, N: 0.97, "N/E": 0.98, "N/O": 0.98 }[q.orient]; if (o) add("Orientamento " + ({ S: "Sud", N: "Nord", "S/E": "Sud / Est", "S/O": "Sud / Ovest", "E/O": "Est / Ovest", "N/E": "Nord / Est", "N/O": "Nord / Ovest" }[q.orient]), o); }
  add(q.vista === "pregio" ? "Vista di pregio" : q.vista === "aperta" ? "Vista aperta" : "", q.vista === "pregio" ? 1.07 : q.vista === "aperta" ? 1.02 : 1);
  if (q.risc === "autonomo") add("Riscaldamento autonomo", 1.02);
  if (q.portineria) add("Portineria", 1.03);
  if (q.condominio === "dafare") add("Condominio con lavori in arrivo", 0.96);
  if (q.condominio === "rifatto") add("Facciata e parti comuni rifatte", 1.02);
  add(q.posizione === "pregio" ? "Via di pregio" : q.posizione === "rumorosa" ? "Via trafficata" : "", q.posizione === "pregio" ? 1.05 : q.posizione === "rumorosa" ? 0.96 : 1);
  if (!ctx.milano && ctx.zonaCom) add({ centro: "Centro del paese", periferia: "Periferia / frazione" }[ctx.zonaCom] || "", { centro: 1.08, periferia: 0.92 }[ctx.zonaCom] || 1);
  const kTot = (x => cmp ? Math.min(1.10, Math.max(0.90, x)) : x)(k.reduce((s, x) => s * x[1], 1));
  // 5. accessori del cliente: superfici esterne pesate al valore del m², cantina, box a parte
  const est = (x, lim, p1, p2) => Math.min(x, lim) * p1 + Math.max(0, x - lim) * p2;
  const supEst = est(+q.balcone || 0, 25, 0.30, 0.10) + est(+q.terrazzo || 0, 25, 0.35, 0.10) + est(+q.giardino || 0, mq, 0.10, 0.02) + (+q.cantina || 0) * 0.25;
  const sup = mq + supEst;
  const box = q.box === "no" ? 0 : vO * 15 * (ctx.milano ? 0.45 : 0.5) * ({ posto: 0.5, singolo: 1, doppio: 1.7 }[q.box] || 0);
  const mqVal = vS * kTot;
  const valCasa = sup * mqVal, valore = valCasa + box;
  const base = vO, mqReale = vS, st = [V_STATO[q.stato][0], 1, V_STATO[q.stato][2]];
  // lavori e valore a lavori finiti (sempre al massimo: ottimo)
  const lavori = q.stato === "ristrutturare" ? (+q.costoLavori || 1000) * mq : 0;
  const valDopo = lavori ? sup * vOp * kTot + box : null;
  // frazionamento: chi lo divide in N unità ristrutturate (prezzi dei tagli piccoli vicini), meno lavori, pratiche e margine dell'investitore
  let fraz = null;
  const nF = +q.fraz || 0;
  if (nF >= 2 && ctx.milano && window.mmComps) {
    const mqU = sup / nF, cu = mmComps(ctx, { ...q, mq: mqU, locali: mqU < 38 ? 1 : 2, stato: "ottimo" });
    if (cu) {
      const eurU = cu.vO * fP * kTot, ricavo = sup * eurU, lav = sup * Math.max(800, q.stato === "ristrutturare" ? +q.costoLavori || 1000 : 600) + nF * 6000, marg = ricavo * 0.12;
      fraz = { n: nF, mqU, eurMq: eurU, nCmp: cu.nNorm, ricavo, lavori: lav, margine: marg, valore: ricavo - lav - marg + box };
    }
  }
  const incer = (cmp ? 0.05 : ctx.v ? 0.07 : 0.12) + (q.classe === "?" ? 0.01 : 0);
  // affitti
  const kAff = (mq < 45 ? 1.08 : mq > 110 ? 0.94 : 1) * (q.arredato ? 1.07 : 1) * (lavori ? V_STATO.ottimo[2] : st[2]) * (q.box !== "no" ? 1.04 : 1)
    * (q.posizione === "pregio" ? 1.04 : q.posizione === "rumorosa" ? 0.96 : 1) * (!ctx.milano && ctx.zonaCom === "centro" ? 1.05 : !ctx.milano && ctx.zonaCom === "periferia" ? 0.95 : 1);
  const canone = aff ? Math.round(aff * Math.min(sup, mq * 1.15) * kAff / 10) * 10 : null;
  const medio = canone ? Math.round(canone * 1.18 / 10) * 10 : null;
  let breve = null;
  if (ctx.str) {
    const extra = Math.max(0, (+q.locali || 2) - 2) * 0.15 + (mq < 40 ? -0.1 : 0);
    breve = { adr: Math.round(ctx.str.adr * T_BILO * (1 + extra) * (lavori ? 1.03 : q.stato === "nuovo" ? 1.03 : 1)), occ: ctx.str.occ, fonte: ctx.str.fonte, stima: true };
  }
  const acquisto = +q.prezzo > 0 ? +q.prezzo : valore;
  const im = { prezzo: acquisto, mq, lavori, arredato: q.arredato, spese: { condominio_mese: +q.condo || Math.round(mq * (ctx.milano ? 2.2 : 1.4)), imu_anno: 0 },
    affitti: { lungo: canone ? { canone } : null, medio: medio ? { canone: medio, mesi_occupati: 10, stima: true } : null, breve } };
  const sc = scenari(im, { offMax: acquisto });
  return { cmp, wC: cmp ? 1 : 0, sup, supEst, k, kTot, st, fP, vO, vOp, vS, fonteO, vOfascia, vOomi, omiCheck, mqReale, base, box, valCasa, valore, fraz,
    m1: cmp ? sup * (cmp.vO * fP) * kTot : null, m2: cmp && vObase ? sup * vObase * fP * kTot : null, vObase, fonteBase,
    min: valore * (1 - incer), max: Math.max(valore * (1 + incer), fraz ? fraz.valore : 0), valDopo, lavori,
    canone, medio, breve, sc, acquisto, prezzo: +q.prezzo || 0, sconto: +q.prezzo > 0 ? (valore - q.prezzo) / valore : null,
    offerta: +q.prezzo > 0 ? Math.min(+q.prezzo, valore) : valore * 0.97,
    margine: valDopo ? valDopo - (acquisto * (1 + IMPOSTAZIONI.costi_acquisto_pct) + lavori) : null };
}

/* ---------- modulo di valutazione ---------- */
function vForm(id, ctxHtml, q) {
  const o = (k, opts) => Object.entries(opts).map(([v, t]) => `<option value="${v}" ${String(q[k]) === String(v) ? "selected" : ""}>${esc(Array.isArray(t) ? t[0] : t)}</option>`).join("");
  const n = (k, lab, step = 1, unit = "") => `<label><span>${lab}</span><input type="number" inputmode="decimal" min="0" step="${step}" data-k="${k}" value="${q[k] ?? ""}">${unit ? `<em>${unit}</em>` : ""}</label>`;
  const s = (k, lab, opts) => `<label><span>${lab}</span><select data-k="${k}">${o(k, opts)}</select></label>`;
  const c = (k, lab) => `<label class="ck"><input type="checkbox" data-k="${k}" ${q[k] ? "checked" : ""}><span>${lab}</span></label>`;
  return `<form class="vform" id="${id}" autocomplete="off" onsubmit="return false">
    ${ctxHtml}
    <fieldset><legend>Immobile</legend><div class="vg">
      ${s("tipo", "Tipologia", { appartamento: "Appartamento", attico: "Attico", loft: "Loft / open space", villetta: "Villetta / casa" })}
      ${n("mq", "Superficie interna", 1, "m²")}${n("locali", "Locali")}${n("bagni", "Bagni")}
      ${n("piano", "Piano (0 = terra)")}${c("ascensore", "Ascensore")}${c("ultimo", "Ultimo piano")}
    </div></fieldset>
    <fieldset><legend>Spazi in più</legend><div class="vg">
      ${n("balcone", "Balconi", 1, "m²")}${n("terrazzo", "Terrazzo", 1, "m²")}${n("giardino", "Giardino", 1, "m²")}${n("cantina", "Cantina / soffitta", 1, "m²")}
      ${s("box", "Box / posto auto", { no: "Nessuno", posto: "Posto auto", singolo: "Box singolo", doppio: "Box doppio" })}
      ${s("fraz", "Frazionabile", { 0: "No", 2: "Sì, in 2 unità", 3: "Sì, in 3 unità" })}
    </div></fieldset>
    <fieldset><legend>Stato e lavori</legend><div class="vg">
      ${s("stato", "Stato attuale", V_STATO)}
      <label class="wide vlav" ${q.stato === "ristrutturare" ? "" : "hidden"}><span>Costo dei lavori: <b data-out="costoLavori">${num(q.costoLavori || 1000)} €/m²</b> <small>(leggeri 400 · medi 1.000 · completi 1.500 · di lusso 2.000+)</small></span>
        <input type="range" data-k="costoLavori" min="200" max="4000" step="10" value="${q.costoLavori || 1000}"></label>
      <label class="vlav" ${q.stato === "ristrutturare" ? "" : "hidden"}><span>Totale lavori (preventivo)</span><input type="number" data-x="lavTot" step="1000" min="0" value="${Math.round((q.costoLavori || 1000) * (q.mq || 0))}"><em>€</em></label>
      ${s("classe", "Classe energetica", { "?": "Non so", A: "A", B: "B", C: "C", D: "D", E: "E", F: "F", G: "G" })}
      ${s("epoca", "Palazzo", V_EPOCA)}${n("anno", "Anno di costruzione")}${s("condominio", "Condominio", { buono: "Normale", rifatto: "Facciata rifatta", dafare: "Lavori in arrivo" })}
    </div></fieldset>
    <fieldset><legend>Posizione e comfort</legend><div class="vg">
      ${s("posizione", "Via", { media: "Normale", pregio: "Di pregio", rumorosa: "Trafficata" })}
      ${s("espo", "Esposizione", { singola: "Singola", doppia: "Doppia / angolo", buia: "Interna, buia" })}
      ${s("orient", "Orientamento", { "": "Non indicato", N: "Nord", S: "Sud", E: "Est", O: "Ovest", "S/O": "Sud / Ovest", "S/E": "Sud / Est", "N/O": "Nord / Ovest", "N/E": "Nord / Est", "E/O": "Est / Ovest", "N/S": "Nord / Sud" })}
      ${s("vista", "Vista", { normale: "Normale", aperta: "Aperta", pregio: "Di pregio" })}
      ${s("risc", "Riscaldamento", { centralizzato: "Centralizzato", autonomo: "Autonomo" })}
      ${c("portineria", "Portineria")}${c("arredato", "Arredato")}
    </div></fieldset>
    <fieldset><legend>Se è in vendita</legend><div class="vg">
      ${n("prezzo", "Prezzo chiesto", 1000, "€")}${n("condo", "Spese condominio", 10, "€/mese")}
      <label class="wide"><span>Note particolari (compaiono sul PDF)</span><input type="text" data-k="note" value="${esc(q.note || "")}" placeholder="es. due balconi, portineria mezza giornata, vista libera"></label>
    </div></fieldset>
  </form>`;
}
function vRead(form) {
  const q = {};
  form.querySelectorAll("[data-k]").forEach(i => { q[i.dataset.k] = i.type === "checkbox" ? i.checked : i.type === "number" || i.type === "range" ? (i.value === "" ? 0 : +i.value) : i.value; });
  form.querySelectorAll(".vlav").forEach(lv => lv.hidden = q.stato !== "ristrutturare");
  { const o = form.querySelector('[data-out="costoLavori"]'), mq = +q.mq || 0; if (o) o.textContent = num(q.costoLavori) + " €/m²" + (mq ? ` · ${eur(q.costoLavori * mq)} in tutto su ${num(mq)} m²` : "");
    const t = form.querySelector("[data-x=lavTot]"); if (t && document.activeElement !== t) t.value = Math.round(q.costoLavori * mq); }
  return q;
}
function vRisultato(r, ctx) {
  const q2 = Object.assign({}, V_DEF, vRisultato._q || {});
  const L = r.sc.list, best = Object.keys(L).sort((a, b) => L[b].rendNetto - L[a].rendNetto)[0];
  const card = (key, t, sub) => L[key] ? `<div class="sc ${key === best ? "best" : ""}"><small>${t}</small><b class="${L[key].rendNetto >= .05 ? "s-good" : L[key].rendNetto >= .03 ? "s-warn" : "s-bad"}">${pct(L[key].rendNetto)}</b><span>${sub}<br>netto ${eur(L[key].netto)}/anno</span></div>`
    : `<div class="sc na"><small>${t}</small><b>—</b><span>dati non disponibili qui</span></div>`;
  return `<div class="vres">
    <div class="vhead"><small>Valore di mercato stimato</small><b>${eur(r.valore)}</b><span>tra ${keur(r.min)} e ${keur(r.max)} · ${eur(r.valore / r.sup)}/m² commerciale</span></div>
    ${ctx.mode && window.miModeBlock ? miModeBlock(r, ctx) : ""}
    <div class="offer" style="margin-top:10px">
      <div><small>Superficie commerciale</small><b>${num(r.sup, 1)} m²</b><em>con balconi, giardino, cantina</em></div>
      <div><small>${r.prezzo ? "Offerta consigliata" : "Prezzo per vendere in fretta"}</small><b class="cy">${eur(r.offerta)}</b><em>${r.prezzo ? (r.sconto >= 0 ? `prezzo ${pct(r.sconto, 0)} sotto il valore` : `prezzo ${pct(-r.sconto, 0)} sopra il valore`) : "circa il 3% sotto il valore"}</em></div>
      <div><small>${r.valDopo ? "Valore dopo i lavori" : "Box / posto auto"}</small><b>${r.valDopo ? eur(r.valDopo) : r.box ? eur(r.box) : "—"}</b><em>${r.valDopo ? (r.margine >= 0 ? `margine +${keur(r.margine)} dopo costi` : `perdita ${keur(-r.margine)} dopo costi`) : "valore separato"}</em></div>
    </div>
    <h3 class="vh3">Quanto può rendere</h3>
    <div class="scen" ${ctx.mode === "inv" ? "hidden" : ""}>
      ${card("lungo", "Affitto lungo", r.canone ? `${eur(r.canone)}/mese` : "")}
      ${card("medio", "Medio termine", r.medio ? `${eur(r.medio)}/mese × 10` : "")}
      ${card("breve", "B&B / Airbnb", r.breve ? `${eur(r.breve.adr)}/notte · ${pct(r.breve.occ, 0)}` : "")}
    </div>
    <p class="note">Rendimento netto sul ${r.prezzo ? "prezzo chiesto" : "valore stimato"} + ${pct(IMPOSTAZIONI.costi_acquisto_pct, 0)} di costi d'acquisto${r.lavori ? " + lavori" : ""}, tasse ${TAX === "srl" ? "SRL" : "da privata (cedolare)"}. ${r.breve ? `Affitto breve: ${esc(r.breve.fonte)}.` : ""}</p>
    ${(() => { const C = r.cmp || (window.mmComps ? mmComps(ctx, vRisultato._q || {}) : null); return C ? `<h3 class="vh3">Annunci comparabili <small style="color:var(--muted);letter-spacing:0;text-transform:none;font-style:normal">media pesata ${eur(C.vO)}/m² in stato ottimo · i primi contano di più</small></h3>
      <div class="vsav">${C.lista.map(a => `<a class="vs" href="${esc(a.url)}" target="_blank" rel="noopener"><div><b>${esc(a.via || (a.micro || "Municipio " + a.mun))}</b><span>${a.mq} m² · ${a.loc || "?"} locali · ${esc(a.d)} · ${a.fonte}</span></div><b class="cy">${eur(a.mq2)}${a.peso != null ? `<small style="display:block;font-size:11px;font-style:normal;color:var(--muted)">peso ${Math.round(a.peso * 100)}%</small>` : ""}</b><span style="text-align:right">${eur(a.p)}<br>${a.lat != null ? (a.appross ? "~" : "") + num(a.dist / 1000, 1) + " km" : "municipio"}</span></a>`).join("")}</div>` : ""; })()}
    <details class="vdet"><summary>Come ho calcolato il valore</summary>
      <table><tbody>
        <tr><td>Prezzo al m² in stato ottimo, 1°–2° piano con ascensore, senza accessori (${r.fonteO === "comparabili" ? `${r.cmp.nNorm} comparabili entro ${num(r.cmp.raggio)} m riportati a questo standard, media pesata per somiglianza (nessuno oltre il 30%): 75% · ${r.fonteBase === "omi" ? "OMI ottimo della zona" : "fascia della microzona"}: 25%` : r.fonteO === "fascia" ? "fascia buono della microzona + 450 €/m²" : r.fonteO === "omi" ? "OMI ottimo della zona" : "media della zona"})</td><td class="r">${eur(r.vO)}/m²</td></tr>
        ${Math.abs(r.fP - 1) > 0.001 ? `<tr><td>Piano e ascensore</td><td class="r">× ${num(r.fP, 3)}</td></tr>` : ""}
        <tr><td>Stato: ${esc(r.st[0])}${q2.stato === "ristrutturare" ? ` (lavori ${eur(q2.costoLavori)}/m² +10% imprevisti, −3% per tempi)` : q2.stato === "buono" ? " (−450 €/m² per portarlo a ottimo)" : q2.stato === "nuovo" ? " (+6%)" : ""}</td><td class="r">${eur(r.vS)}/m²</td></tr>
        ${r.k.map(([t, f]) => `<tr><td>${esc(t)}</td><td class="r">× ${num(f, 2)}</td></tr>`).join("")}
        <tr><td>Superficie commerciale</td><td class="r">${num(r.sup, 1)} m²</td></tr>
        ${r.box ? `<tr><td>Box / posto auto</td><td class="r">+ ${eur(r.box)}</td></tr>` : ""}
        ${r.lavori ? `<tr><td>A lavori finiti (stato ottimo)</td><td class="r">${eur(r.valDopo)}</td></tr>` : ""}
        ${r.omiCheck ? `<tr><td>Controllo OMI ottimo della zona: ${eur(r.omiCheck.min)}–${eur(r.omiCheck.max)}/m²${r.omiCheck.fuori ? ` (stima ${r.omiCheck.fuori === "sotto" ? "sotto" : "molto sopra"}: da verificare)` : " (coerente)"}</td><td class="r"></td></tr>` : ""}
        <tr class="tot"><td>Prezzo di richiesta in linea con il mercato</td><td class="r">${eur(r.valore)}</td></tr>
        ${r.fraz ? `<tr><td>Se frazionato in ${r.fraz.n} unità da ${num(r.fraz.mqU)} m²: ${eur(r.fraz.eurMq)}/m² ristrutturate (${r.fraz.nCmp} annunci vicini) = ${eur(r.fraz.ricavo)}, meno lavori e pratiche ${eur(r.fraz.lavori)} e margine dell'investitore ${eur(r.fraz.margine)}</td><td class="r"><b>${eur(r.fraz.valore)}</b></td></tr>` : ""}
      </tbody></table>
      <p class="note">Coefficienti di merito usati comunemente nelle stime (piano, stato, classe energetica, epoca); superfici secondarie al 30% (balconi), 35% (terrazzi), 10% (giardino), 25% (cantina). È una stima indicativa, non una perizia.</p>
    </details>
    <div class="btns"><button class="btn pri" data-pdf>Scarica il PDF</button><button class="btn sec" data-save>Salva</button></div>
  </div>`;
}
function vSalvate(dove) {
  const L = store.get("valutazioni", []).filter(x => !dove || x.dove === dove);
  if (!L.length) return "";
  return `<h2>Valutazioni salvate</h2><div class="vsav">${L.map(x => `<div class="vsw"><div class="vs"><button type="button" class="vsopen" data-vapri="${x.id}"><b>${esc(x.nome)}</b><span>${esc(x.sub)}</span></button><b class="cy">${eur(x.valore)}</b><button data-del="${x.id}" aria-label="Elimina">✕</button></div><div class="vsdet" data-vdet="${x.id}" hidden></div></div>`).join("")}</div>`;
}
/* contesto di una valutazione salvata (anche di quelle salvate prima che lo ricordassi) */
function vCtxSalvata(x) {
  const M = TERR.milano, I = tIdx(), k = x.ck || {};
  let micro = k.micro ? M.micro.find(m => m.n === k.micro) : null, com = k.comune ? I.byN.get(tnorm(k.comune)) : null, zona = null;
  if (!micro && !com) {
    const parti = String(x.nome || "").split(",").map(t => t.trim()).filter(Boolean);
    for (const t of parti.slice().reverse()) { micro = M.micro.find(m => m.n === t); if (micro) break; zona = M.zone.find(z => z.n === t); if (zona) break;
      const c = I.byN.get(tnorm(t)); if (c && c.v && tnorm(t) !== "milano") { com = c; break; } }
    if (!micro && !com && !zona && x.dove !== "valuta") { const nm = tnorm(x.nome); micro = M.micro.find(m => nm.includes(tnorm(m.n))) || null; }
  }
  const base = { nome: x.nome, cliente: k.cliente || "", mode: k.mode || "cliente", zonaCom: k.zonaCom || "" };
  if (micro) { const z = M.zone.find(q => q.n === micro.z); return { ...base, v: micro.v, a: micro.a, milano: true, str: MZ_STR({ ...z, v: micro.v }), micro, zona: z, sel: k.sel || { lat: micro.lat, lon: micro.lon, micro: micro.n, zona: micro.z, comune: "Milano" } }; }
  if (zona) return { ...base, v: zona.v, a: zona.a, milano: true, str: MZ_STR(zona), sel: k.sel || { lat: zona.lat, lon: zona.lon, zona: zona.n, comune: "Milano" } };
  if (com) return { ...base, v: com.v, a: com.a, milano: com.n === "Milano", str: com.lat != null ? tStrVicino(com) : null, com, sel: k.sel || (com.lat != null ? { lat: com.lat, lon: com.lon, comune: com.n } : null) };
  return null;
}
function vDettaglio(x, ctx) {
  const q = Object.assign({}, V_DEF, x.q), r = ctx ? vCalcola(q, ctx) : null, si = b => b ? "sì" : "no";
  const box = { no: "nessuno", posto: "posto auto", singolo: "box singolo", doppio: "box doppio" }[q.box] || q.box;
  const righe = [
    ["Tipologia", q.tipo], ["Superficie", `${num(q.mq)} m²`], ["Locali / bagni", `${q.locali} / ${q.bagni}`],
    ["Piano", `${q.piano == 0 ? "terra" : q.piano + "°"}${q.ultimo ? " (ultimo)" : ""} · ascensore ${si(q.ascensore)}`],
    ["Stato", (V_STATO[q.stato] || [q.stato])[0] + (q.stato === "ristrutturare" ? ` · lavori ${eur(q.costoLavori)}/m² (${eur(q.costoLavori * q.mq)})` : "")],
    ["Spazi in più", [q.balcone && `balconi ${q.balcone} m²`, q.terrazzo && `terrazzo ${q.terrazzo} m²`, q.giardino && `giardino ${q.giardino} m²`, q.cantina && `cantina ${q.cantina} m²`, `box: ${box}`].filter(Boolean).join(" · ")],
    ["Classe / epoca", `${q.classe === "?" ? "non indicata" : q.classe} · ${(V_EPOCA[q.epoca] || [q.epoca])[0]}`],
    ["Esposizione / vista", `${q.espo}${q.orient ? " " + q.orient : ""} · ${q.vista}`],
    ["Riscaldamento", q.risc + (q.portineria ? " · portineria" : "") + (q.arredato ? " · arredato" : "")],
    +q.fraz ? ["Frazionabile", `in ${q.fraz} unità`] : null,
    +q.prezzo ? ["Prezzo chiesto", eur(q.prezzo)] : null,
    q.note ? ["Note", q.note] : null].filter(Boolean);
  return `<table class="vt"><tbody>${righe.map(([a, b]) => `<tr><td>${esc(a)}</td><td class="r">${esc(String(b))}</td></tr>`).join("")}
    <tr class="tot"><td>Valore salvato</td><td class="r">${eur(x.valore)}</td></tr>
    ${r && Math.abs(r.valore - x.valore) > 500 ? `<tr><td>Valore con i dati di oggi</td><td class="r">${eur(Math.round(r.valore))}</td></tr>` : ""}</tbody></table>
    <div class="btns">${r ? `<button class="btn pri" data-vpdf="${x.id}">Scarica il PDF</button>` : ""}<button class="btn sec" data-vriapri="${x.id}">Riapri nel valutatore</button></div>
    ${r ? "" : `<p class="note">Non ritrovo la zona di questa valutazione: riaprila nel valutatore e scegli la zona.</p>`}`;
}
document.addEventListener("click", e => {
  const L = store.get("valutazioni", []), trova = id => L.find(x => x.id === id);
  const ap = e.target.closest("[data-vapri]");
  if (ap) { const x = trova(ap.dataset.vapri), d = document.querySelector(`[data-vdet="${ap.dataset.vapri}"]`); if (!x || !d) return;
    if (!d.hidden) { d.hidden = true; return; } d.innerHTML = vDettaglio(x, vCtxSalvata(x)); d.hidden = false; return; }
  const pd = e.target.closest("[data-vpdf]");
  if (pd) { const x = trova(pd.dataset.vpdf), ctx = x && vCtxSalvata(x); if (!ctx || !window.mmPdf) return; const q = Object.assign({}, V_DEF, x.q); mmPdf({ r: vCalcola(q, ctx), q, ctx }); return; }
  const ri = e.target.closest("[data-vriapri]");
  if (ri) { const x = trova(ri.dataset.vriapri); if (!x) return; const ctx = vCtxSalvata(x);
    store.set("vform_" + x.dove, Object.assign({}, V_DEF, x.q));
    if (x.dove === "valuta") { if (ctx?.com) store.set("v_com", ctx.com.n); store.set("v_zona", ctx?.zonaCom || ""); }
    else { if (ctx?.sel) { if (typeof MM !== "undefined") MM.sel = ctx.sel; store.set("mm_sel", { ...ctx.sel, geom: null }); }
      if (ctx?.cliente) store.set("mi_cliente", ctx.cliente); }
    // vado sempre alla pagina del valutatore (dall'elenco di Milano non c'era il modulo)
    const dest = x.dove === "valuta" ? "#valuta" : "#milano/" + ((x.ck?.mode && x.ck.mode !== "sub") ? x.ck.mode : "cliente");
    window.__vRiapri = { id: x.id, cercare: !ctx?.sel && x.dove !== "valuta" ? x.nome : null };
    if (location.hash === dest) render(true); else location.hash = dest;
    const vai = (n = 0) => { const f = $("#mvf") || $("#vf"); if (!f) { if (n < 40) setTimeout(() => vai(n + 1), 150); return; }
      f.scrollIntoView({ behavior: "smooth", block: "start" });
      // valutazione salvata senza zona: cerco l'indirizzo e seleziono il palazzo
      const R = window.__vRiapri; window.__vRiapri = null;
      if (R?.cercare && typeof mmGeocode === "function") setTimeout(async () => { const L = await mmGeocode(R.cercare); if (L[0]) mmVaiA({ ...L[0], modulo: true }); }, 900); };
    setTimeout(vai, 200); }
});
function vBind(form, out, getCtx, dove) {
  const go = () => { const ctx = getCtx(), q = vRead(form); store.set("vform_" + dove, q);
    if (!ctx) { out.innerHTML = `<p class="sub">Scegli prima ${dove === "milano" ? "la zona" : "il comune"}.</p>`; return; }
    const r = vCalcola(q, ctx); vRisultato._q = q; out.innerHTML = vRisultato(r, ctx); out._r = { r, q, ctx }; };
  // totale del preventivo → costo al m² (il cursore si sposta da solo)
  form.addEventListener("input", e => { const t = e.target; if (t.dataset?.x !== "lavTot") return; const mq = +form.querySelector("[data-k=mq]")?.value || 0, r = form.querySelector("[data-k=costoLavori]");
    if (mq && r && +t.value > 0) r.value = Math.max(+r.min, Math.min(+r.max, Math.round(+t.value / mq))); }, true);
  form.addEventListener("input", go); form.addEventListener("change", go); go();
  out.addEventListener("click", e => {
    if (!e.target.closest("[data-save]") || !out._r) return;
    const { r, q, ctx } = out._r, L = store.get("valutazioni", []);
    const ck = { micro: ctx.micro?.n || null, comune: ctx.com?.n || (dove === "valuta" ? ctx.nome : null), sel: ctx.sel ? { ...ctx.sel, geom: null } : null, cliente: ctx.cliente || "", mode: ctx.mode || "", zonaCom: ctx.zonaCom || "" };
    L.unshift({ id: Date.now().toString(36), dove, ck, nome: ctx.nome, sub: `${q.mq} m² · ${V_STATO[q.stato][0]}${q.box !== "no" ? " · box" : ""} · ${new Date().toLocaleDateString("it-IT")}`, valore: Math.round(r.valore), q });
    store.set("valutazioni", L.slice(0, 40)); render(true);
  });
}
document.addEventListener("click", e => { const b = e.target.closest("[data-del]"); if (!b) return;
  store.set("valutazioni", store.get("valutazioni", []).filter(x => x.id !== b.dataset.del)); render(true); });

/* ==========================================================================
   1) MAPPA B&B
   ========================================================================== */
const B_MET = {
  revpar: ["Ricavo per notte", s => s.revpar, v => eur(v), "prezzo a notte × occupazione: quanto rende ogni notte disponibile"],
  occ: ["Occupazione", s => s.occ, v => pct(v, 0), "quota di notti prenotate in un anno"],
  adr: ["Prezzo a notte", s => s.adr, v => eur(v), "prezzo medio di una notte prenotata"],
  ric: ["Ricavo annuo", s => s.ric, v => keur(v), "incasso medio di un annuncio in 12 mesi"],
  rb: ["Rendita lorda", s => s.rb, v => pct(v, 1), "incasso lordo di un bilocale di 50 m² (85% del prezzo a notte medio) diviso il suo prezzo al valore medio del comune più l'arredo"],
};
function bFilt() { return store.get("f_brevi", { m: "revpar", tipo: "", reg: "", da: "badile", ore: 0, occ: 0, ann: 0 }); }
function bRows(f) {
  const I = tIdx();
  return I.br.map(s => ({ s, d: tDist(s.lat, s.lon, f.da) })).filter(({ s, d }) =>
    (!f.tipo || s.tipo === f.tipo) && (!f.reg || (TERR.prov[s.p]?.reg || tRegSigla(s.p)) === f.reg) && (!f.ore || (d && d.min <= f.ore)) &&
    s.occ >= (f.occ || 0) && (!f.ann || (s.ann || 0) >= f.ann));
}
const tRegSigla = p => ({ TO: "Piemonte", CN: "Piemonte", AT: "Piemonte", BI: "Piemonte", IM: "Liguria", PD: "Veneto", VI: "Veneto" })[p] || "";
function vBrevi(nome) {
  if (nome) return vBreveScheda(nome);
  const f = bFilt(), M = B_MET[f.m] || B_MET.revpar, rows = bRows(f), I = tIdx();
  rows.sort((a, b) => (M[1](b.s) ?? -1) - (M[1](a.s) ?? -1));
  const top = rows[0], bestRb = [...rows].filter(x => x.s.rb).sort((a, b) => b.s.rb - a.s.rb)[0];
  const regs = [...new Set(I.br.map(s => TERR.prov[s.p]?.reg || tRegSigla(s.p)).filter(Boolean))].sort();
  const max = Math.max(...rows.map(x => M[1](x.s) || 0), 1e-9);
  return `<h1>Mappa B&B</h1><p class="sub">Dove gli affitti brevi rendono di più: prezzo a notte, occupazione e ricavi di ${I.br.length} località entro circa 3 ore, con il prezzo delle case del posto.</p>
  <div class="filters" id="bf">
    <div class="chips">${Object.entries(B_MET).map(([k, m]) => `<button class="chip ${k === f.m ? "on" : ""}" data-m="${k}">${m[0]}</button>`).join("")}</div>
    <div class="chips"><button class="chip ${!f.tipo ? "on" : ""}" data-tipo="">Tutte</button>${Object.entries(T_TIPI).map(([k, t]) => `<button class="chip ${f.tipo === k ? "on" : ""}" data-tipo="${k}">${t}</button>`).join("")}</div>
    <div class="selrow">
      <select data-f="reg"><option value="">Tutte le regioni</option>${regs.map(r => `<option ${r === f.reg ? "selected" : ""}>${r}</option>`).join("")}</select>
      <select data-f="ore">${[[0, "Qualsiasi distanza"], [60, "Entro 1 ora"], [90, "Entro 1h30"], [120, "Entro 2 ore"], [150, "Entro 2h30"], [180, "Entro 3 ore"]].map(([v, t]) => `<option value="${v}" ${+f.ore === v ? "selected" : ""}>${t}</option>`).join("")}</select>
      <select data-f="da">${Object.entries(T_HOME).map(([k, v]) => `<option value="${k}" ${f.da === k ? "selected" : ""}>da ${v[2]}</option>`).join("")}</select>
    </div>
    <div class="selrow">
      <select data-f="occ">${[[0, "Ogni occupazione"], [0.35, "Occupazione 35%+"], [0.4, "Occupazione 40%+"], [0.45, "Occupazione 45%+"]].map(([v, t]) => `<option value="${v}" ${+f.occ === v ? "selected" : ""}>${t}</option>`).join("")}</select>
      <select data-f="ann">${[[0, "Ogni mercato"], [100, "100+ annunci"], [300, "300+ annunci"], [1000, "1.000+ annunci"]].map(([v, t]) => `<option value="${v}" ${+f.ann === v ? "selected" : ""}>${t}</option>`).join("")}</select>
      <span></span>
    </div>
  </div>
  <div class="kpis">
    <div class="kpi"><small>Località</small><b>${rows.length}</b><span>con questi filtri</span></div>
    <div class="kpi"><small>Prima per ${esc(M[0].toLowerCase())}</small><b class="cy">${top ? M[2](M[1](top.s)) : "—"}</b><span>${top ? esc(top.s.n) : "—"}</span></div>
    <div class="kpi"><small>Miglior rendita</small><b>${bestRb ? pct(bestRb.s.rb, 1) : "—"}</b><span>${bestRb ? esc(bestRb.s.n) : "serve il prezzo"}</span></div>
  </div>
  <p class="howto"><b>Come si legge:</b> ogni cerchio è una località con affitti brevi. Il <b>colore</b> indica ${esc(M[0].toLowerCase())} (dall'oro scuro all'oro chiaro = da poco a molto), la <b>grandezza</b> quanti annunci ci sono. Tocca un cerchio per i numeri e l'analisi.</p>
  <div class="map" id="bmap"></div>
  <div id="bleg"></div>
  <p class="note">${esc(M[3])}. Cerchi più grandi = più annunci (mercato più profondo e dati più affidabili). In viola casa tua e Porta Romana.</p>
  <h2>Classifica <small>${esc(M[0])}</small></h2>
  <div class="tbars">${rows.slice(0, 40).map((x, i) => { const v = M[1](x.s);
    return `<a class="tbar" href="#brevi/${encodeURIComponent(x.s.n)}"><span class="tn"><i>${i + 1}</i>${esc(x.s.n)}<em>${T_TIPI[x.s.tipo] || ""} · ${x.d ? tOre(x.d.min) : "—"}</em></span>
      <span class="tv"><span class="tb"><span style="width:${v == null ? 0 : Math.max(3, v / max * 100)}%"></span></span><b>${v == null ? "n.d." : M[2](v)}</b></span></a>`; }).join("") || `<p class="sub">Nessuna località con questi filtri.</p>`}</div>
  <p class="src">Fonti: ${esc(TERR.fonti.brevi)}. Cifre in dollari convertite a ${num(TERR.cambio_usd, 2)} $ per €. Prezzi delle case: ${esc(TERR.fonti.prezzi)}.</p>`;
}
function afterBrevi(nome) {
  if (nome) return afterBreveScheda(nome);
  const f = bFilt(), box = $("#bf");
  box.addEventListener("click", e => { const c = e.target.closest("[data-m],[data-tipo]"); if (!c) return;
    if (c.dataset.m) f.m = c.dataset.m; if (c.dataset.tipo != null) f.tipo = c.dataset.tipo; store.set("f_brevi", f); render(true); });
  box.addEventListener("change", e => { const k = e.target.dataset.f; f[k] = ["ore", "occ", "ann"].includes(k) ? +e.target.value : e.target.value; store.set("f_brevi", f); render(true); });
  const m = tMap($("#bmap"), [[45.6, 9.3], 7]); if (!m) return;
  const M = B_MET[f.m] || B_MET.revpar, rows = bRows(f), bins = tBins(rows.map(x => M[1](x.s)));
  const b = [];
  for (const { s, d } of rows) {
    const v = M[1](s), r = 5 + Math.min(13, Math.sqrt(s.ann || 40) / 3.2);
    L.circleMarker([s.lat, s.lon], { radius: r, color: "#000000", weight: 1.2, fillColor: tCol(v, bins), fillOpacity: .9 })
      .bindPopup(`<b>${esc(s.n)}</b><br>${eur(s.adr)} a notte · ${pct(s.occ, 0)} occupazione<br>Ricavo annuo ${keur(s.ric)}${s.ann ? ` · ${num(s.ann)} annunci` : ""}<br>${s.rb ? `Rendita lorda bilocale ${pct(s.rb, 1)}<br>` : ""}${d ? `${tOre(d.min)} da ${T_HOME[f.da][2]}` : ""}<br><a class="go" href="#brevi/${encodeURIComponent(s.n)}">Apri l'analisi →</a>`)
      .bindTooltip(`${s.n}: ${v == null ? "n.d." : M[2](v)}`, { direction: "top" }).addTo(m);
    b.push([s.lat, s.lon]);
  }
  tHomeMarkers(m);
  if (b.length) m.fitBounds(b, { padding: [30, 30], maxZoom: 10 });
  $("#bleg").innerHTML = tLegend(bins, M[2], M[0]);
}
function vBreveScheda(nome) {
  const s = tIdx().br.find(x => x.n === nome);
  if (!s) return `<a class="back" href="#brevi">← Mappa B&B</a>${emptyBox("Località non trovata", "")}`;
  const c = s.com, dB = tDist(s.lat, s.lon, "badile"), dR = tDist(s.lat, s.lon, "romana");
  return `<a class="back" href="#brevi">← Mappa B&B</a>
  <div class="loc">${esc(T_TIPI[s.tipo] || "")} · ${esc(TERR.prov[s.p]?.nome || s.p)}</div><h1 style="margin-top:4px">${esc(s.n)}</h1>
  <p class="sub">${tOre(dB?.min)} da Badile · ${tOre(dR?.min)} da Porta Romana (tempi indicativi in auto)</p>
  <div class="kpis">
    <div class="kpi"><small>Prezzo a notte</small><b class="cy">${eur(s.adr)}</b><span>media notti prenotate</span></div>
    <div class="kpi"><small>Occupazione</small><b>${pct(s.occ, 0)}</b><span>${num(Math.round(s.occ * 365))} notti l'anno</span></div>
    <div class="kpi"><small>Ricavo annuo</small><b>${keur(s.ric)}</b><span>${s.ann ? num(s.ann) + " annunci" : "per annuncio"}</span></div>
  </div>
  ${c ? `<h2>Case a ${esc(s.n)}</h2>
  <div class="offer">
    <div><small>Vendita</small><b>${eur(c.v)}/m²</b><em>${c.y != null ? `${c.y >= 0 ? "+" : ""}${num(c.y, 1)}% in un anno` : "prezzo medio annunci"}</em></div>
    <div><small>Affitto lungo</small><b>${c.a ? num(c.a, 2) + " €/m²" : "—"}</b><em>al mese</em></div>
    <div><small>Rendita lorda</small><b class="cy">${s.rb ? pct(s.rb, 1) : "—"}</b><em>B&B, bilocale 50 m²</em></div>
  </div>
  <h2>Prova con un bilocale di 50 m²</h2><div id="bsim"></div>` : `<p class="note">Per ${esc(s.n)} non ho ancora i prezzi delle case per comune: lo aggiungo alla prossima raccolta.</p>`}
  <p class="src">Fonte: ${esc(s.fonte)} (12 mesi). I dati sono medie del mercato: un appartamento curato e ben gestito può fare meglio, uno anonimo peggio.</p>`;
}
function afterBreveScheda(nome) {
  const s = tIdx().br.find(x => x.n === nome), el = $("#bsim"); if (!s || !el || !s.com) return;
  const r = vCalcola({ mq: 50, locali: 2, stato: "buono", arredato: false }, { v: s.com.v, a: s.com.a, str: s, nome: s.n, milano: false });
  const L = r.sc.list, lungo = L.lungo?.netto, br = L.breve;
  let be = null;   // occupazione da cui il B&B batte l'affitto lungo
  if (lungo != null && br) { for (let o = 0.05; o <= 0.95; o += 0.01) { const t = vCalcola({ mq: 50, locali: 2 }, { v: s.com.v, a: s.com.a, str: { ...s, occ: o }, nome: s.n }); if (t.sc.list.breve.netto >= lungo) { be = o; break; } } }
  el.innerHTML = `<div class="scen">
      <div class="sc ${br && lungo != null && br.netto > lungo ? "" : "best"}"><small>Affitto lungo</small><b>${L.lungo ? pct(L.lungo.rendNetto) : "—"}</b><span>${r.canone ? eur(r.canone) + "/mese" : ""}<br>netto ${eur(lungo)}/anno</span></div>
      <div class="sc"><small>Medio termine</small><b>${L.medio ? pct(L.medio.rendNetto) : "—"}</b><span>${r.medio ? eur(r.medio) + "/mese × 10" : ""}<br>netto ${eur(L.medio?.netto)}/anno</span></div>
      <div class="sc ${br && lungo != null && br.netto > lungo ? "best" : ""}"><small>B&B</small><b>${br ? pct(br.rendNetto) : "—"}</b><span>${eur(r.breve.adr)} × ${pct(s.occ, 0)}<br>netto ${eur(br?.netto)}/anno</span></div>
    </div>
    <p class="note">Prezzo del bilocale: ${eur(r.acquisto)} (prezzo medio meno trattativa) + costi d'acquisto e arredo. ${be ? `<b>Il B&B conviene sopra il ${pct(be, 0)} di occupazione</b> (oggi la media è ${pct(s.occ, 0)}).` : ""}</p>
`;
}

/* ==========================================================================
   2) VALUTAZIONE (tutti i comuni)
   ========================================================================== */
const C_MET = {
  v: ["Vendita €/m²", c => c.v, v => eur(v), "prezzo medio chiesto negli annunci"],
  a: ["Affitto €/m²", c => c.a, v => num(v, 1) + " €", "canone medio al mese per m²"],
  rl: ["Rendita lunga", c => c.rl, v => pct(v, 1), "affitto annuo diviso prezzo di vendita (lordo)"],
  y: ["Crescita 1 anno", c => c.y, v => (v >= 0 ? "+" : "") + num(v, 1) + "%", "variazione dei prezzi di vendita in 12 mesi"],
  m60: ["m² con 60.000 €", c => c.m60, v => num(v) + " m²", "quanti metri quadri compri con 60.000 € al prezzo medio"],
};
function cFilt() { return Object.assign({ m: "rl", reg: "", prov: "", da: "badile", ore: 0, vmax: 0, q: "", princ: true }, store.get("f_valuta", {})); }
function cRows(f) {
  return tIdx().com.map(c => ({ c, d: tDist(c.lat, c.lon, f.da) })).filter(({ c, d }) =>
    (!f.reg || c.reg === f.reg) && (!f.prov || c.p === f.prov) && (!f.princ || f.prov || f.q || c.princ) && (!f.ore || (d && d.min <= f.ore)) && (!f.vmax || (c.v && c.v <= f.vmax)) &&
    (!f.q || tnorm(c.n).includes(tnorm(f.q))));
}
function vValuta(nome) {
  const f = cFilt(), M = C_MET[f.m] || C_MET.rl, I = tIdx(), rows = cRows(f);
  rows.sort((a, b) => (M[1](b.c) ?? -1e9) - (M[1](a.c) ?? -1e9));
  const regs = [...new Set(I.com.map(c => c.reg))].filter(Boolean).sort();
  const provs = Object.entries(TERR.prov).filter(([k, p]) => !f.reg || p.reg === f.reg).sort((a, b) => a[1].nome.localeCompare(b[1].nome));
  const vals = rows.map(x => M[1](x.c)).filter(v => v != null), med = median(vals);
  const max = Math.max(...vals.map(Math.abs), 1e-9);
  const qv = store.get("vform_valuta", V_DEF), sel = nome || store.get("v_com", "");
  return `<h1>Valutazione</h1><p class="sub">Prezzi di vendita e d'affitto di ${num(I.com.length)} comuni in ${Object.keys(TERR.prov).length} province, la rendita che danno e un valutatore per qualsiasi immobile.</p>
  <div class="filters" id="cf">
    <div class="chips">${Object.entries(C_MET).map(([k, m]) => `<button class="chip ${k === f.m ? "on" : ""}" data-m="${k}">${m[0]}</button>`).join("")}</div>
    <div class="selrow">
      <select data-f="reg"><option value="">Tutte le regioni</option>${regs.map(r => `<option ${r === f.reg ? "selected" : ""}>${r}</option>`).join("")}</select>
      <select data-f="prov"><option value="">Tutte le province</option>${provs.map(([k, p]) => `<option value="${k}" ${k === f.prov ? "selected" : ""}>${esc(p.nome)}</option>`).join("")}</select>
      <select data-f="ore">${[[0, "Qualsiasi distanza"], [60, "Entro 1 ora"], [90, "Entro 1h30"], [120, "Entro 2 ore"], [150, "Entro 2h30"], [180, "Entro 3 ore"]].map(([v, t]) => `<option value="${v}" ${+f.ore === v ? "selected" : ""}>${t}</option>`).join("")}</select>
    </div>
    <div class="selrow">
      <select data-f="vmax">${[[0, "Ogni prezzo"], [800, "Fino a 800 €/m²"], [1000, "Fino a 1.000 €/m²"], [1200, "Fino a 1.200 €/m²"], [1500, "Fino a 1.500 €/m²"], [2000, "Fino a 2.000 €/m²"]].map(([v, t]) => `<option value="${v}" ${+f.vmax === v ? "selected" : ""}>${t}</option>`).join("")}</select>
      <select data-f="da">${Object.entries(T_HOME).map(([k, v]) => `<option value="${k}" ${f.da === k ? "selected" : ""}>distanza da ${v[2]}</option>`).join("")}</select>
      <input type="search" data-f="q" placeholder="Cerca comune" value="${esc(f.q)}">
    </div>
    <label class="tog"><input type="checkbox" data-f="princ" ${f.princ ? "checked" : ""}> Solo città e paesi principali (scegliendo una provincia vedi tutti i comuni)</label>
  </div>
  <div class="kpis">
    <div class="kpi"><small>Comuni</small><b>${num(rows.length)}</b><span>con questi filtri</span></div>
    <div class="kpi"><small>Mediana</small><b class="cy">${med == null ? "—" : M[2](med)}</b><span>${esc(M[0])}</span></div>
    <div class="kpi"><small>Primo</small><b>${rows[0] && M[1](rows[0].c) != null ? M[2](M[1](rows[0].c)) : "—"}</b><span>${rows[0] ? esc(rows[0].c.n) : "—"}</span></div>
  </div>
  <p class="howto"><b>Come si legge:</b> ogni comune è colorato per ${esc(M[0].toLowerCase())}, dall'oro scuro (basso) all'oro chiaro (alto). Scegli una provincia per vedere i confini di tutti i suoi comuni; tocca un comune per i prezzi e per valutarci una casa.</p>
  <div class="map" id="cmap"></div>
  <div id="cleg"></div>
  <p class="note" id="cnote">${esc(M[3])}. ${f.prov ? "Carico i confini di tutti i comuni della provincia…" : "Scegli una provincia per vedere tutti i suoi comuni colorati sulla mappa; senza provincia vedi i comuni principali."}</p>
  <h2>Classifica <small>${esc(M[0])}</small></h2>
  <div class="tw"><table><thead><tr><th>#</th><th>Comune</th><th class="r">Vendita</th><th class="r">Affitto</th><th class="r">Rendita</th><th class="r">1 anno</th><th class="r">Distanza</th></tr></thead><tbody>
  ${rows.slice(0, 60).map((x, i) => `<tr data-go="${esc(x.c.n)}"><td>${i + 1}</td><td><b>${esc(x.c.n)}</b> <span class="muted">${x.c.p}</span></td><td class="r">${x.c.v ? eur(x.c.v) : "—"}</td><td class="r">${x.c.a ? num(x.c.a, 1) + (x.c.aOk ? "" : "*") : "—"}</td><td class="r">${x.c.rl ? pct(x.c.rl, 1) : "—"}</td><td class="r ${x.c.y > 0 ? "s-good" : x.c.y < 0 ? "s-bad" : ""}">${x.c.y == null ? "—" : (x.c.y >= 0 ? "+" : "") + num(x.c.y, 1) + "%"}</td><td class="r">${x.d ? tOre(x.d.min) : "—"}</td></tr>`).join("")}
  </tbody></table></div>
  <h2 id="vform-h">Valuta un immobile</h2>
  <div class="card">${vForm("vf", `<fieldset><legend>Dove</legend><div class="vg">
      <label class="wide"><span>Comune</span><input list="vcl" data-c="com" value="${esc(sel)}" placeholder="Scrivi il comune…"><datalist id="vcl">${I.com.filter(c => c.v).map(c => `<option value="${esc(c.n)}">${esc(TERR.prov[c.p]?.nome || c.p)}</option>`).join("")}</datalist></label>
      <label><span>Zona del paese</span><select data-c="zona"><option value="">Media</option><option value="centro" ${store.get("v_zona", "") === "centro" ? "selected" : ""}>Centro</option><option value="periferia" ${store.get("v_zona", "") === "periferia" ? "selected" : ""}>Periferia / frazione</option></select></label>
    </div></fieldset>`, qv)}<div id="vout"></div></div>
  ${vSalvate("valuta")}

  <p class="note">Tocca una riga per valutarci un immobile. Rendita lunga = affitto di un anno diviso il prezzo, prima di tasse e spese: sopra il 7% è alta, sotto il 4% bassa. Nei paesi con case sotto 700 €/m² o con affitti fuori scala gli annunci d'affitto sono troppo pochi: lì non calcolo la rendita (* = affitto di ripiego del portale, poco affidabile).</p>
  <p class="src">Fonti: ${esc(TERR.fonti.prezzi)}. Confini: ${esc(TERR.fonti.confini)}. Distanze: stima in auto dalla linea d'aria.</p>`;
}
function afterValuta(nome) {
  const f = cFilt(), I = tIdx(), M = C_MET[f.m] || C_MET.rl;
  const form = $("#vf"), out = $("#vout"), inCom = form.querySelector("[data-c=com]"), inZona = form.querySelector("[data-c=zona]");
  if (nome) store.set("v_com", nome);
  const getCtx = () => { const c = I.byN.get(tnorm(inCom.value)); if (!c || !c.v) return null; store.set("v_com", c.n); store.set("v_zona", inZona.value);
    return { v: c.v, a: c.a, nome: c.n, milano: c.n === "Milano", zonaCom: inZona.value, str: tStrVicino(c) }; };
  vBind(form, out, getCtx, "valuta");
  out.addEventListener("click", e => { if (e.target.closest("[data-pdf]") && out._r && window.mmPdf) mmPdf(out._r); });
  if (nome) setTimeout(() => form.scrollIntoView({ block: "start" }), 50);
  const box = $("#cf");
  box.addEventListener("click", e => { const c = e.target.closest("[data-m]"); if (!c) return; f.m = c.dataset.m; store.set("f_valuta", f); render(true); });
  box.addEventListener("change", e => { const k = e.target.dataset.f; if (!k || k === "q") return; f[k] = k === "princ" ? e.target.checked : ["ore", "vmax"].includes(k) ? +e.target.value : e.target.value; if (k === "reg") f.prov = ""; store.set("f_valuta", f); render(true); });
  let tq; box.querySelector("[data-f=q]").addEventListener("input", e => { clearTimeout(tq); tq = setTimeout(() => { f.q = e.target.value; store.set("f_valuta", f); render(true); }, 450); });
  document.querySelectorAll("tr[data-go]").forEach(tr => tr.addEventListener("click", () => { inCom.value = tr.dataset.go; inCom.dispatchEvent(new Event("input", { bubbles: true })); form.scrollIntoView({ behavior: "smooth", block: "start" }); }));
  const m = tMap($("#cmap"), [[45.55, 9.3], 7]); if (!m) return;
  const rows = cRows(f), bins = tBins(rows.map(x => M[1](x.c)));
  $("#cleg").innerHTML = tLegend(bins, M[2], M[0]);
  const pop = c => `<b>${esc(c.n)}</b> (${c.p})<br>Vendita ${c.v ? eur(c.v) + "/m²" : "—"}${c.y != null ? ` (${c.y >= 0 ? "+" : ""}${num(c.y, 1)}%)` : ""}<br>Affitto ${c.a ? num(c.a, 2) + " €/m²" : "—"}${c.rl ? ` · rendita ${pct(c.rl, 1)}` : ""}<br><a class="go" href="#valuta/${encodeURIComponent(c.n)}">Valuta qui →</a>`;
  const pts = [], lay = L.layerGroup().addTo(m);
  const drawPts = () => { lay.clearLayers(); pts.length = 0;
    for (const { c } of cRows(f)) { const cc = c.lat != null ? c : I.byN.get(tnorm(c.n)); if (!cc || cc.lat == null) continue;
      L.circleMarker([cc.lat, cc.lon], { radius: 6, color: "#3a2f22", weight: 1, fillColor: tCol(M[1](c), bins), fillOpacity: .9 }).bindPopup(pop(c)).bindTooltip(c.n, { direction: "top" }).addTo(lay);
      pts.push([cc.lat, cc.lon]); }
    if (pts.length) m.fitBounds(pts, { padding: [24, 24], maxZoom: 11 }); };
  drawPts(); tHomeMarkers(m);
  if (f.prov) {
    const istat = TERR.prov[f.prov].istat, note = $("#cnote");
    tGeo(istat).then(g => {
      if (!document.body.contains(m.getContainer())) return;
      const byName = new Map(rows.filter(x => x.c.p === f.prov).map(x => [tnorm(x.c.n), x.c]));
      lay.clearLayers();
      const gl = L.geoJSON(g, { style: ft => { const c = byName.get(tnorm(tFname(ft.properties))); return { color: "#070707", weight: .6, fillColor: tCol(c ? M[1](c) : null, bins), fillOpacity: c ? .85 : .25 }; },
        onEachFeature: (ft, ly) => { const c = byName.get(tnorm(tFname(ft.properties))); ly.bindTooltip(tFname(ft.properties) + (c && M[1](c) != null ? ": " + M[2](M[1](c)) : ""), { sticky: true }); if (c) ly.bindPopup(pop(c)); } }).addTo(lay);
      m.fitBounds(gl.getBounds(), { padding: [10, 10] });
      note.textContent = `${M[3]}. Comuni della provincia di ${TERR.prov[f.prov].nome}: in grigio quelli senza dati.`;
    }).catch(() => { note.textContent = "Non riesco a caricare i confini dei comuni ora: vedi i comuni principali."; });
  }
}
function tStrVicino(c) {
  const I = tIdx(); if (c.lat == null) return null;
  let best = null, dm = 1e9;
  for (const s of I.br) { const d = hav(c.lat, c.lon, s.lat, s.lon); if (d < dm) { dm = d; best = s; } }
  if (!best || dm > 15000) return null;
  const same = tnorm(best.n) === tnorm(c.n);
  return { adr: best.adr * (same ? 1 : 0.85), occ: best.occ * (same ? 1 : 0.85), fonte: same ? `dati di ${best.n} (${best.fonte})` : `stima da ${best.n} a ${num(dm / 1000, 0)} km, ridotta del 15%` };
}

/* ==========================================================================
   3) MILANO zona per zona
   ========================================================================== */
const MZ_STR = z => {   // stima affitti brevi per zona: media di Milano (AirROI) adattata al prezzo e al tipo di domanda
  const c = TERR.brevi.find(s => s.n === "Milano"), rel = z.v / TERR.milano.media.vendita;
  const t = z.tag, occ = clamp(c.occ + (t.includes("turisti") ? .05 : 0) + (t.some(x => ["business", "fiere", "eventi", "viaggiatori"].includes(x)) ? .02 : 0) - (z.v < 4300 ? .05 : 0), .28, .6);
  return { adr: Math.round(c.adr * Math.pow(rel, 0.5)), occ, fonte: "stima di zona dalla media di Milano (AirROI: " + eur(c.adr) + " a notte, " + pct(c.occ, 0) + ")" };
};
function mzVicini(z) {
  const M = TERR.milano, st = [];
  for (const [ln, arr] of Object.entries(M.metro)) for (const [n, la, lo] of arr) { const d = hav(z.lat, z.lon, la, lo); if (d < 1100) st.push({ n, ln, d }); }
  const staz = {}; st.sort((a, b) => a.d - b.d).forEach(s => { (staz[s.n] = staz[s.n] || { n: s.n, d: s.d, ln: new Set() }).ln.add(s.ln); });
  const poi = M.poi.map(([c, n, la, lo]) => ({ c, n, d: hav(z.lat, z.lon, la, lo) })).filter(p => p.d < 1800).sort((a, b) => a.d - b.d);
  const S = Object.values(staz).sort((a, b) => a.d - b.d), lines = new Set(S.filter(s => s.d < 800).flatMap(s => [...s.ln]));
  const has = (c, r) => poi.filter(p => p.c === c && p.d <= r).length;
  const sc = (S[0] ? (S[0].d <= 400 ? 30 : S[0].d <= 700 ? 22 : 12) : 0) + Math.min(10, Math.max(0, lines.size - 1) * 5)
    + Math.min(20, has("uni", 1500) * 10) + Math.min(10, has("osp", 1500) * 10) + Math.min(15, has("lav", 1500) * 8)
    + Math.min(10, (has("eve", 1500) + has("neg", 1200)) * 5) + Math.min(5, has("par", 1000) * 5);
  return { staz: S.slice(0, 6), lines: [...lines].sort(), poi, score: Math.min(100, sc) };
}
const MZ_MET = {
  v: ["Vendita €/m²", z => z.v, v => eur(v)], a: ["Affitto €/m²", z => z.a, v => num(v, 1) + " €"], rl: ["Rendita lunga", z => z.a * 12 / z.v, v => pct(v, 1)],
  br: ["B&B (stima)", z => { const s = MZ_STR(z); return s.adr * s.occ; }, v => eur(v) + "/notte"], y: ["Crescita 1 anno", z => z.y, v => (v >= 0 ? "+" : "") + num(v, 1) + "%"],
  at: ["Attrattività", z => mzVicini(z).score, v => num(v) + "/100"],
};
function vMilano(zona) {
  const M = TERR.milano, f = store.get("f_milano", { m: "rl", lay: ["metro", "uni", "osp"] }), MT = MZ_MET[f.m] || MZ_MET.rl;
  const rows = [...M.zone].sort((a, b) => MT[1](b) - MT[1](a)), max = Math.max(...rows.map(MT[1]).map(Math.abs));
  const sel = zona || store.get("mz_sel", "");
  const z = M.zone.find(x => x.n === sel);
  return `<h1>Milano</h1><p class="sub">Le ${M.zone.length} zone della città con prezzi, affitti, rendita e cosa c'è intorno: metro, università, ospedali, uffici, eventi. In fondo il valutatore.</p>
  <div class="kpis">
    <div class="kpi"><small>Vendita media</small><b>${eur(M.media.vendita)}</b><span>al m² · ${esc(M.media.periodo)}</span></div>
    <div class="kpi"><small>Affitto medio</small><b class="cy">${num(M.media.affitto, 2)} €</b><span>al m² al mese</span></div>
    <div class="kpi"><small>Rendita media</small><b>${pct(M.media.affitto * 12 / M.media.vendita, 1)}</b><span>lorda, affitto lungo</span></div>
  </div>
  <div class="filters" id="mf">
    <div class="chips">${Object.entries(MZ_MET).map(([k, m]) => `<button class="chip ${k === f.m ? "on" : ""}" data-m="${k}">${m[0]}</button>`).join("")}</div>
    <div class="chips">${Object.entries(T_POI).map(([k, p]) => `<button class="chip lay ${f.lay.includes(k) ? "on" : ""}" data-l="${k}" style="--lc:${p[1]}"><i></i>${p[0]}</button>`).join("")}</div>
  </div>
  <div class="map tall" id="mmap"></div>
  <div id="mleg"></div>
  <div id="mzona">${z ? mzScheda(z) : `<p class="note">Tocca una zona sulla mappa o nella classifica per vedere cosa c'è intorno e valutarci un immobile.</p>`}</div>
  <h2>Valuta un immobile a Milano</h2>
  <div class="card">${vForm("mvf", `<fieldset><legend>Dove</legend><div class="vg"><label class="wide"><span>Zona</span><select data-c="zona"><option value="">Scegli la zona…</option>${M.zone.map(x => `<option ${x.n === sel ? "selected" : ""}>${esc(x.n)}</option>`).join("")}</select></label></div></fieldset>`, store.get("vform_milano", V_DEF))}<div id="mvout"></div></div>
  ${vSalvate("milano")}
  <h2>Classifica delle zone <small>${esc(MT[0])}</small></h2>
  <div class="tbars">${rows.map((x, i) => { const v = MT[1](x); return `<a class="tbar" href="#milano/${encodeURIComponent(x.n)}"><span class="tn"><i>${i + 1}</i>${esc(x.n)}<em>${eur(x.v)}/m² · ${num(x.a, 1)} €/m²</em></span><span class="tv"><span class="tb"><span style="width:${Math.max(3, Math.abs(v) / max * 100)}%"></span></span><b>${MT[2](v)}</b></span></a>`; }).join("")}</div>
  <p class="src">Prezzi: immobiliare.it, zone di Milano (${esc(M.media.periodo)}). Affitti brevi: stima per zona dalla media cittadina AirROI. Posizioni di metro e luoghi: indicative.</p>`;
}
function mzScheda(z) {
  const V = mzVicini(z), s = MZ_STR(z), grp = {};
  V.poi.forEach(p => (grp[p.c] = grp[p.c] || []).push(p));
  const lbl = { studenti: "Studenti", turisti: "Turisti", business: "Trasferte di lavoro", famiglie: "Famiglie", lusso: "Alto di gamma", giovani: "Giovani professionisti",
    sanita: "Personale sanitario e pazienti", fiere: "Fiere e congressi", eventi: "Eventi e concerti", lavoro: "Lavoratori", nuovo: "Quartiere nuovo", viaggiatori: "Viaggiatori (treni/aerei)", design: "Design e moda" };
  return `<div class="card neon mz">
    <div class="loc">Zona di Milano</div><h3 class="mzt">${esc(z.n)}</h3><p class="sub" style="margin-top:4px">${esc(z.nota)}</p>
    <div class="offer" style="margin-top:10px">
      <div><small>Vendita</small><b>${eur(z.v)}</b><em>al m² · ${z.y >= 0 ? "+" : ""}${num(z.y, 1)}% in un anno</em></div>
      <div><small>Affitto</small><b>${num(z.a, 2)} €</b><em>al m² al mese · rendita ${pct(z.a * 12 / z.v, 1)}</em></div>
      <div><small>B&B (stima)</small><b class="cy">${eur(s.adr)}</b><em>a notte · ${pct(s.occ, 0)} occupazione</em></div>
    </div>
    <div class="mzrow"><div class="ring" style="--p:${V.score}"><b>${V.score}</b><small>attrattività</small></div>
      <div><div class="tags">${z.tag.map(t => `<span class="tag cat">${esc(lbl[t] || t)}</span>`).join("")}</div>
      <p class="note" style="margin-top:6px">Metro vicine: ${V.staz.length ? V.staz.slice(0, 4).map(x => `${esc(x.n)} ${[...x.ln].map(l => `<span class="ml" style="--mc:${TERR.milano.metro_col[l]}">${l}</span>`).join("")} <em>${num(Math.round(x.d / 10) * 10)} m</em>`).join(" · ") : "nessuna entro 1 km"}</p></div></div>
    <div class="mzp">${["uni", "osp", "lav", "eve", "neg", "scu", "par"].filter(k => grp[k]).map(k => `<div><b style="color:${T_POI[k][1]}">${T_POI[k][0]}</b>${grp[k].slice(0, 4).map(p => `<span>${esc(p.n)} <em>${p.d < 1000 ? num(Math.round(p.d / 10) * 10) + " m" : num(p.d / 1000, 1) + " km"}</em></span>`).join("")}</div>`).join("") || `<p class="note">Nessun luogo della mia lista entro 1,8 km.</p>`}</div>
    <div class="btns"><a class="btn pri" href="#milano/${encodeURIComponent(z.n)}" data-val>Valuta un immobile qui</a></div>
  </div>`;
}
function afterMilano(zona) {
  const M = TERR.milano, f = store.get("f_milano", { m: "rl", lay: ["metro", "uni", "osp"] }), MT = MZ_MET[f.m] || MZ_MET.rl;
  if (zona) store.set("mz_sel", zona);
  $("#mf").addEventListener("click", e => { const c = e.target.closest("[data-m],[data-l]"); if (!c) return;
    if (c.dataset.m) f.m = c.dataset.m; if (c.dataset.l) { const l = c.dataset.l; f.lay = f.lay.includes(l) ? f.lay.filter(x => x !== l) : [...f.lay, l]; }
    store.set("f_milano", f); render(true); });
  const form = $("#mvf"), out = $("#mvout"), sel = form.querySelector("[data-c=zona]");
  vBind(form, out, () => { const z = M.zone.find(x => x.n === sel.value); if (!z) return null; store.set("mz_sel", z.n); return { v: z.v, a: z.a, nome: "Milano, " + z.n, milano: true, str: MZ_STR(z) }; }, "milano");
  $("#mzona").addEventListener("click", e => { if (e.target.closest("[data-val]")) { e.preventDefault(); sel.value = store.get("mz_sel", ""); sel.dispatchEvent(new Event("change", { bubbles: true })); form.scrollIntoView({ behavior: "smooth", block: "start" }); } });
  if (zona) setTimeout(() => $("#mzona").scrollIntoView({ block: "start" }), 50);
  const m = tMap($("#mmap"), [[45.468, 9.19], 12]); if (!m) return;
  const bins = tBins(M.zone.map(MT[1]));
  $("#mleg").innerHTML = tLegend(bins, MT[2], MT[0]) + `<div class="legend">${f.lay.map(k => `<span><i style="color:${T_POI[k][1]};background:${T_POI[k][1]}"></i>${T_POI[k][0]}</span>`).join("")}</div>`;
  for (const z of M.zone) {
    const v = MT[1](z), on = z.n === store.get("mz_sel", "");
    L.circle([z.lat, z.lon], { radius: 620, color: on ? "#7c3aed" : "#3a2f22", weight: on ? 3 : 1, fillColor: tCol(v, bins), fillOpacity: .55 })
      .bindTooltip(`${z.n}: ${MT[2](v)}`, { direction: "top" })
      .on("click", () => { store.set("mz_sel", z.n); $("#mzona").innerHTML = mzScheda(z); sel.value = z.n; sel.dispatchEvent(new Event("change", { bubbles: true })); $("#mzona").scrollIntoView({ behavior: "smooth", block: "start" }); })
      .addTo(m);
  }
  if (f.lay.includes("metro")) for (const [ln, arr] of Object.entries(M.metro)) {
    const col = M.metro_col[ln];
    if (ln === "M1") { const i = arr.findIndex(s => s[0] === "Wagner"); L.polyline(arr.slice(0, i).map(s => [s[1], s[2]]), { color: col, weight: 3, opacity: .85 }).addTo(m);
      const pag = arr.find(s => s[0] === "Pagano"); L.polyline([[pag[1], pag[2]], ...arr.slice(i).map(s => [s[1], s[2]])], { color: col, weight: 3, opacity: .85 }).addTo(m); }
    else L.polyline(arr.map(s => [s[1], s[2]]), { color: col, weight: 3, opacity: .85 }).addTo(m);
    arr.forEach(([n, la, lo]) => L.circleMarker([la, lo], { radius: 3, color: col, weight: 2, fillColor: "#ffffff", fillOpacity: 1 }).bindTooltip(`${ln} ${n}`, { direction: "top" }).addTo(m));
  }
  for (const [c, n, la, lo] of M.poi) if (f.lay.includes(c))
    L.circleMarker([la, lo], { radius: 6, color: "#ffffff", weight: 1.5, fillColor: T_POI[c][1], fillOpacity: 1 }).bindTooltip(`${T_POI[c][0]}: ${n}`, { direction: "top" }).addTo(m);
}

/* ---------- registrazione delle viste nel router dell'app ---------- */
const TERR_VIEWS = {
  brevi: [vBrevi, afterBrevi],
  valuta: [vValuta, afterValuta],
  milano: [vMilano, afterMilano],
};
