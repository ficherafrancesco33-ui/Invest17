/* KEYSTONE — Rendering: dalla planimetria alla pianta arredata 2D e al 3D leggero
   Flusso: carichi la planimetria → tocchi le stanze (l'app le riconosce) → scala (un muro o i m² totali)
   → arredo automatico (spostabile) → pianta 2D, vista 3D, PDF da solo o dentro la valutazione. */

/* ============ algoritmi (puri, su maschere di pixel) ============ */
const RN = {};
// soglia di Otsu sulla luminosità
RN.otsu = function (lum) {
  const h = new Array(256).fill(0); for (const v of lum) h[v]++;
  let sum = 0; for (let i = 0; i < 256; i++) sum += i * h[i];
  let sB = 0, wB = 0, best = 0, t = 128; const n = lum.length;
  for (let i = 0; i < 256; i++) { wB += h[i]; if (!wB) continue; const wF = n - wB; if (!wF) break; sB += i * h[i];
    const mB = sB / wB, mF = (sum - sB) / wF, v = wB * wF * (mB - mF) ** 2; if (v > best) { best = v; t = i; } }
  return t;
};
// componenti connesse di una maschera (4-vicini); restituisce etichette e info per componente
RN.componenti = function (m, w, h) {
  const lab = new Int32Array(w * h).fill(-1), info = [], st = new Int32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (!m[i] || lab[i] >= 0) continue;
    const id = info.length; let top = 0, n = 0, x0 = w, y0 = h, x1 = 0, y1 = 0; st[top++] = i; lab[i] = id;
    while (top) { const p = st[--top], x = p % w, y = (p / w) | 0; n++;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      if (x > 0 && m[p - 1] && lab[p - 1] < 0) { lab[p - 1] = id; st[top++] = p - 1; }
      if (x < w - 1 && m[p + 1] && lab[p + 1] < 0) { lab[p + 1] = id; st[top++] = p + 1; }
      if (y > 0 && m[p - w] && lab[p - w] < 0) { lab[p - w] = id; st[top++] = p - w; }
      if (y < h - 1 && m[p + w] && lab[p + w] < 0) { lab[p + w] = id; st[top++] = p + w; } }
    info.push({ n, x0, y0, x1, y1 });
  }
  return { lab, info };
};
// muri: pixel scuri, tolte scritte, quote e simboli piccoli (componenti piccole)
RN.muri = function (lum, w, h) {
  const t = Math.min(170, RN.otsu(lum)), m = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) m[i] = lum[i] <= t ? 1 : 0;
  const { lab, info } = RN.componenti(m, w, h), lato = Math.max(w, h);
  const tieni = info.map(c => Math.max(c.x1 - c.x0, c.y1 - c.y0) > lato * 0.06 || c.n > lato * lato * 0.0015);
  for (let i = 0; i < w * h; i++) if (m[i] && !tieni[lab[i]]) m[i] = 0;
  return m;
};
// dilatazione quadrata di raggio r (separabile, con somme mobili)
RN.dilata = function (m, w, h, r) {
  if (r < 1) return m.slice();
  const t = new Uint8Array(w * h), o = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) { let c = 0; const b = y * w;
    for (let x = 0; x < Math.min(w, r); x++) c += m[b + x];
    for (let x = 0; x < w; x++) { if (x + r < w) c += m[b + x + r]; if (x - r - 1 >= 0) c -= m[b + x - r - 1]; t[b + x] = c > 0 ? 1 : 0; } }
  for (let x = 0; x < w; x++) { let c = 0;
    for (let y = 0; y < Math.min(h, r); y++) c += t[y * w + x];
    for (let y = 0; y < h; y++) { if (y + r < h) c += t[(y + r) * w + x]; if (y - r - 1 >= 0) c -= t[(y - r - 1) * w + x]; o[y * w + x] = c > 0 ? 1 : 0; } }
  return o;
};
// stanza dal tocco: riempimento con le aperture (porte) chiuse, poi riallargata fino ai muri veri
RN.stanza = function (muri, w, h, px, py, r) {
  const chiusi = RN.dilata(muri, w, h, r), p0 = py * w + px;
  if (chiusi[p0]) return { errore: "muro" };
  const reg = new Uint8Array(w * h), st = new Int32Array(w * h); let top = 0, bordo = false; st[top++] = p0; reg[p0] = 1;
  while (top) { const p = st[--top], x = p % w, y = (p / w) | 0;
    if (x === 0 || y === 0 || x === w - 1 || y === h - 1) bordo = true;
    const v = [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, y > 0 ? p - w : -1, y < h - 1 ? p + w : -1];
    for (const q of v) if (q >= 0 && !reg[q] && !chiusi[q]) { reg[q] = 1; st[top++] = q; } }
  if (bordo) return { errore: "aperta" };
  const big = RN.dilata(reg, w, h, r);
  let n = 0; for (let i = 0; i < w * h; i++) { big[i] = big[i] && !muri[i] ? 1 : 0; n += big[i]; }
  return { reg: big, n };
};
// contorno esterno di una regione (Moore) e semplificazione (Douglas-Peucker)
RN.contorno = function (reg, w, h) {
  let s = -1; for (let i = 0; i < w * h; i++) if (reg[i]) { s = i; break; }
  if (s < 0) return [];
  const at = (x, y) => x >= 0 && y >= 0 && x < w && y < h && reg[y * w + x];
  const D = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  let x = s % w, y = (s / w) | 0; const sx = x, sy = y, pts = [[x, y]]; let dir = 6, k = 0;
  do { let ok = false;
    for (let i = 0; i < 8; i++) { const d = (dir + 6 + i) % 8, nx = x + D[d][0], ny = y + D[d][1];
      if (at(nx, ny)) { x = nx; y = ny; dir = d; pts.push([x, y]); ok = true; break; } }
    if (!ok) break; } while ((x !== sx || y !== sy) && ++k < 200000);
  // contorno chiuso: lo divido nel punto più lontano dall'inizio e semplifico le due metà
  if (pts.length > 2 && pts[pts.length - 1][0] === pts[0][0] && pts[pts.length - 1][1] === pts[0][1]) pts.pop();
  let f = 0, fd = -1; pts.forEach((q, i) => { const d = Math.hypot(q[0] - pts[0][0], q[1] - pts[0][1]); if (d > fd) { fd = d; f = i; } });
  const A = RN.dp(pts.slice(0, f + 1), 1.6), B = RN.dp([...pts.slice(f), pts[0]], 1.6);
  return [...A.slice(0, -1), ...B.slice(0, -1)];
};
RN.dp = function (P, eps) {
  if (P.length < 4) return P;
  const d = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / L; };
  const rec = (a, b) => { let m = -1, mi = 0; for (let i = a + 1; i < b; i++) { const v = d(P[i], P[a], P[b]); if (v > m) { m = v; mi = i; } }
    return m > eps ? [...rec(a, mi).slice(0, -1), ...rec(mi, b)] : [P[a], P[b]]; };
  return rec(0, P.length - 1);
};
RN.area = P => Math.abs(P.reduce((s, p, i) => { const q = P[(i + 1) % P.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
RN.dentro = (pt, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j];
  if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c; } return c; };
RN.bbox = P => { const xs = P.map(p => p[0]), ys = P.map(p => p[1]); return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) }; };
// distanza punto-poligono (bordo)
RN.distBordo = (p, P) => { let m = Infinity; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length], dx = b[0] - a[0], dy = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1))); m = Math.min(m, Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)); } return m; };

/* ============ ambienti e mobili ============ */
const RN_TIPI = {
  soggiorno: { n: "Soggiorno", pav: "legno" }, cucina: { n: "Cucina", pav: "piastrelle" }, cucsogg: { n: "Soggiorno con cucina", pav: "legno" },
  camera: { n: "Camera", pav: "legno" }, cameretta: { n: "Cameretta", pav: "legno" }, studio: { n: "Studio", pav: "legno" },
  bagno: { n: "Bagno", pav: "piastrelle" }, ingresso: { n: "Ingresso", pav: "legno" }, disimpegno: { n: "Disimpegno", pav: "legno" },
  ripostiglio: { n: "Ripostiglio", pav: "legno" }, balcone: { n: "Balcone", pav: "esterno" }, terrazzo: { n: "Terrazzo", pav: "esterno" }, altro: { n: "Altro", pav: "legno" } };
// mobili: larghezza × profondità in metri; "muro": schiena contro il muro
const RN_MOB = {
  divano: [2.2, 0.92, "Divano"], tavolino: [1.0, 0.55, "Tavolino"], tv: [1.6, 0.42, "Mobile TV"], poltrona: [0.82, 0.82, "Poltrona"],
  tavolo6: [1.7, 0.9, "Tavolo"], tavolo4: [1.2, 0.8, "Tavolo"], tappeto: [2.0, 1.4, "Tappeto"],
  cucinaL: [2.6, 0.62, "Cucina"], cucinaC: [1.8, 0.62, "Cucina"], frigo: [0.62, 0.65, "Frigo"],
  letto2: [1.65, 2.05, "Letto"], letto1: [0.95, 2.0, "Letto"], comodino: [0.46, 0.4, "Comodino"], armadio: [2.0, 0.62, "Armadio"], armadio1: [1.2, 0.62, "Armadio"],
  scrivania: [1.3, 0.65, "Scrivania"], libreria: [1.2, 0.36, "Libreria"],
  wc: [0.38, 0.6, "WC"], bidet: [0.38, 0.55, "Bidet"], lavabo: [0.62, 0.46, "Lavabo"], doccia: [0.85, 0.85, "Doccia"], vasca: [1.7, 0.72, "Vasca"],
  consolle: [1.0, 0.35, "Consolle"], esterno: [0.75, 0.75, "Tavolino"], pianta: [0.45, 0.45, "Pianta"] };
// varianti di forma per i mobili principali (dimensioni modificabili a mano)
const RN_VAR = {
  divano: [["lineare", "Lineare"], ["angolare", "Angolare"]], cucinaL: [["lineare", "Lineare"], ["angolare", "Ad angolo"], ["isola", "Con isola"]],
  cucinaC: [["lineare", "Lineare"], ["angolare", "Ad angolo"], ["isola", "Con isola"]],
  tavolo6: [["rett", "Rettangolare"], ["quadrato", "Quadrato"], ["tondo", "Tondo"]], tavolo4: [["rett", "Rettangolare"], ["quadrato", "Quadrato"], ["tondo", "Tondo"]],
  tavolino: [["rett", "Rettangolare"], ["tondo", "Tondo"]], tappeto: [["rett", "Rettangolare"], ["tondo", "Tondo"]], doccia: [["quadrato", "Quadrata"], ["rett", "Rettangolare"]] };
// dimensioni reali del mobile (ingombro totale): quelle scelte dall'utente o quelle standard
function rnDim(m) { const b = RN_MOB[m.tipo] || [1, 1]; let w = m.w ?? b[0], d = m.d ?? b[1];
  if (m.v === "angolare" && m.tipo === "divano" && m.d == null) d = 1.6;
  if (m.v === "angolare" && m.tipo.startsWith("cucina") && m.d == null) d = 1.8;
  if (m.v === "isola" && m.d == null) d = 2.3;
  if ((m.v === "tondo" || m.v === "quadrato") && m.d == null) d = w;
  return [w, d]; }
function rnProgramma(tipo, mq, lungo) {
  switch (tipo) {
    case "soggiorno": return mq > 24 ? ["divano", "tv", "tavolino", "tavolo6", "poltrona", "tappeto"] : mq > 16 ? ["divano", "tv", "tavolino", "tavolo4", "tappeto"] : ["divano", "tv", "tavolino"];
    case "cucsogg": return ["cucinaL", "frigo", "divano", "tv", "tavolino", mq > 26 ? "tavolo6" : "tavolo4", "tappeto"];
    case "cucina": return [mq > 9 ? "cucinaL" : "cucinaC", "frigo", ...(mq > 8 ? ["tavolo4"] : [])];
    case "camera": return mq >= 10.5 ? ["letto2", "comodino", "comodino", "armadio"] : ["letto1", "comodino", "armadio1"];
    case "cameretta": return ["letto1", "scrivania", "armadio1"];
    case "studio": return ["scrivania", "libreria", "poltrona"];
    case "bagno": return [lungo >= 2.3 && mq > 5 ? "vasca" : "doccia", "wc", ...(mq > 4.5 ? ["bidet"] : []), "lavabo"];
    case "ingresso": return mq > 4 ? ["consolle"] : [];
    case "balcone": case "terrazzo": return mq > 3.5 ? ["esterno", "pianta"] : ["pianta"];
    default: return [];
  }
}
// disposizione: per ogni mobile cerco una posizione dentro la stanza, senza sovrapposizioni, preferendo il muro
function rnArreda(stanza, s /* m per px */) {
  const P = stanza.poly, bb = RN.bbox(P), mqA = RN.area(P) * s * s, lungo = Math.max(bb.x1 - bb.x0, bb.y1 - bb.y0) * s;
  const lista = rnProgramma(stanza.tipo, mqA, lungo), messi = [];
  const passo = Math.max(0.08 / s, 1);
  const rett = (cx, cy, w, d, rot) => { const W = (rot % 180 ? d : w) / s / 2, D = (rot % 180 ? w : d) / s / 2; return [[cx - W, cy - D], [cx + W, cy - D], [cx + W, cy + D], [cx - W, cy + D]]; };
  const libero = (R, marg) => { const b = RN.bbox(R); for (const m of messi) { if (m.tipo === "tappeto") continue; const o = RN.bbox(m.R);
      if (b.x0 < o.x1 + marg && b.x1 > o.x0 - marg && b.y0 < o.y1 + marg && b.y1 > o.y0 - marg) return false; } return true; };
  const dentro = R => { const b = RN.bbox(R), pts = [...R, [(b.x0 + b.x1) / 2, b.y0], [(b.x0 + b.x1) / 2, b.y1], [b.x0, (b.y0 + b.y1) / 2], [b.x1, (b.y0 + b.y1) / 2], [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2]];
    return pts.every(p => RN.dentro(p, P)); };
  // lato "schiena" del mobile (rot 0: schiena in alto)
  const schiena = (cx, cy, w, d, rot) => { const r = ((rot % 360) + 360) % 360, W = (r % 180 ? d : w) / s / 2, D = (r % 180 ? w : d) / s / 2;
    return r === 0 ? [cx, cy - D] : r === 90 ? [cx + W, cy] : r === 180 ? [cx, cy + D] : [cx - W, cy]; };
  const cen = [(bb.x0 + bb.x1) / 2, (bb.y0 + bb.y1) / 2];
  for (const tipo of lista) {
    const [w, d] = rnDim({ tipo }); let best = null;
    const vicino = tipo === "tavolino" ? messi.find(m => m.tipo === "divano") : tipo === "comodino" ? messi.find(m => m.tipo === "letto2" || m.tipo === "letto1") : null;
    for (const rot of [0, 90, 180, 270]) {
      for (let cy = bb.y0; cy <= bb.y1; cy += passo) for (let cx = bb.x0; cx <= bb.x1; cx += passo) {
        const R = rett(cx, cy, w, d, rot); if (!dentro(R)) continue;
        const marg = tipo === "tappeto" ? 0 : (tipo === "tavolino" ? 0.35 : tipo === "comodino" ? 0.02 : 0.5) / s;
        if (tipo !== "tappeto" && !libero(R, marg)) continue;
        if (tipo.startsWith("tavolo") && Math.min(...R.map(q => RN.distBordo(q, P))) * s < 0.55) continue;   // spazio per le sedie
        const sb = schiena(cx, cy, w, d, rot), dm = RN.distBordo(sb, P) * s;
        let sc = 0;
        const trova = t => messi.find(m => m.tipo === t), dist = m => m ? Math.hypot(cx - m.cx, cy - m.cy) * s : 99;
        const dv = trova("divano"), tv = trova("tv"), tl = trova("tavolino");
        if (["tavolino", "tavolo4", "tavolo6", "tappeto", "esterno"].includes(tipo)) sc = -Math.hypot(cx - cen[0], cy - cen[1]) * s * 0.5 - (dm < 0.4 ? 2 : 0);
        else sc = -dm * 6 - Math.hypot(cx - cen[0], cy - cen[1]) * s * 0.05;
        if (vicino) { const dvv = Math.hypot(cx - vicino.cx, cy - vicino.cy) * s; sc = -dvv * 4 - (tipo === "comodino" ? dm * 6 : 0) - (tipo === "comodino" && rot !== vicino.rot ? 3 : 0); }
        // la TV di fronte al divano, sullo stesso asse
        if (tipo === "tv" && dv) { const lat = dv.rot % 180 ? Math.abs(cy - dv.cy) : Math.abs(cx - dv.cx); sc = -dm * 6 - lat * s * 2.5 + (rot === (dv.rot + 180) % 360 ? 3 : -4) + dist(dv) * 0.3; }
        // il tavolo da pranzo lontano dal salotto (divano, TV, tavolino) e staccato dai muri per le sedie
        if (tipo.startsWith("tavolo") && dv) sc = Math.min(dist(dv), dist(tv), dist(tl)) * 1.2 - (dm < 0.7 ? 4 : 0) - Math.hypot(cx - cen[0], cy - cen[1]) * s * 0.1;
        // poltrona a lato del tavolino, non tra divano e TV
        if (tipo === "poltrona" && tl) sc = -Math.abs(dist(tl) - 1.1) * 3 - dm * 1 - (dv && tv && dist(dv) + dist(tv) < Math.hypot(dv.cx - tv.cx, dv.cy - tv.cy) * s + 0.6 ? 6 : 0);
        if (tipo === "tappeto" && tl) sc = -dist(tl) * 5;
        if (!best || sc > best.sc) best = { cx, cy, rot, sc, R };
      }
    }
    if (best) messi.push({ tipo, cx: best.cx, cy: best.cy, rot: best.rot, R: best.R });
  }
  return messi.map(m => ({ tipo: m.tipo, x: m.cx, y: m.cy, rot: m.rot }));
}
function rnIndovina(stanze, s) {
  // ordine per area: la più grande è il soggiorno; bagni piccoli e quadrati; corridoi stretti e lunghi
  const A = stanze.map(st => { const bb = RN.bbox(st.poly), lw = [(bb.x1 - bb.x0), (bb.y1 - bb.y0)].sort((a, b) => a - b); return { st, mq: RN.area(st.poly) * (s ? s * s : 1), asp: lw[1] / Math.max(1, lw[0]) }; });
  const max = Math.max(...A.map(a => a.mq)), tot = A.reduce((x, a) => x + a.mq, 0);
  let sogg = false;
  A.sort((a, b) => b.mq - a.mq).forEach(a => {
    if (a.st.tipo && a.st.manuale) return;
    const rel = a.mq / tot;
    a.st.tipo = !sogg && a.mq === max ? (sogg = true, "soggiorno") : a.asp > 2.6 && rel < 0.12 ? "disimpegno" : rel < 0.045 ? "ripostiglio" : rel < 0.085 ? "bagno" : rel < 0.14 ? "cameretta" : "camera";
  });
}

/* ============ archivio progetti (IndexedDB) ============ */
const RNDB = {
  db: null,
  open() { return this.db ? Promise.resolve(this.db) : new Promise((ok, ko) => { const r = indexedDB.open("keystone_render", 1);
    r.onupgradeneeded = () => { r.result.createObjectStore("prog", { keyPath: "id" }); r.result.createObjectStore("kv"); };
    r.onsuccess = () => { this.db = r.result; ok(this.db); }; r.onerror = () => ko(r.error); }); },
  async tx(st, mode, fn) { const db = await this.open(); return new Promise((ok, ko) => { const t = db.transaction(st, mode), s = t.objectStore(st), r = fn(s); t.oncomplete = () => ok(r && r.result); t.onerror = () => ko(t.error); }); },
  tutti() { return this.tx("prog", "readonly", s => s.getAll()); },
  get(id) { return this.tx("prog", "readonly", s => s.get(id)); },
  put(p) { p.agg = Date.now(); return this.tx("prog", "readwrite", s => s.put(p)); },
  del(id) { return this.tx("prog", "readwrite", s => s.delete(id)); },
  kvGet(k) { return this.tx("kv", "readonly", s => s.get(k)); },
  kvSet(k, v) { return this.tx("kv", "readwrite", s => v == null ? s.delete(k) : s.put(v, k)); }
};
// allegato per il PDF delle valutazioni (caricato all'avvio)
window.__RENDER_ALL = null;
RNDB.kvGet("allegato").then(v => { window.__RENDER_ALL = v || null; }).catch(() => {});

/* ============ stato dell'editor ============ */
const RS = { p: null, img: null, lum: null, muri: null, W: 0, H: 0, fase: "stanze", sel: null, misura: null, modo: "tocca", manuale: [], drag: null, three: null };
const rnScala = p => p.scala || null;        // metri per pixel (nelle coordinate dell'immagine di lavoro)

async function rnCaricaFile(f) {
  let url;
  if (/pdf$/i.test(f.type) || /\.pdf$/i.test(f.name)) {
    const pdfjs = await import("https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.min.mjs");
    pdfjs.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs";
    const doc = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise, pg = await doc.getPage(1);
    const vp = pg.getViewport({ scale: 1 }), k = 2200 / Math.max(vp.width, vp.height), v2 = pg.getViewport({ scale: k });
    const c = document.createElement("canvas"); c.width = v2.width; c.height = v2.height; const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height);
    await pg.render({ canvasContext: g, viewport: v2 }).promise; url = c.toDataURL("image/png");
  } else url = await new Promise(ok => { const r = new FileReader(); r.onload = () => ok(r.result); r.readAsDataURL(f); });
  // immagine di lavoro: lato lungo 1400 px, sfondo bianco
  const im = await rnImg(url), k = Math.min(1, 1400 / Math.max(im.width, im.height)), c = document.createElement("canvas");
  c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
  return { img: c.toDataURL("image/jpeg", 0.9), W: c.width, H: c.height };
}
const rnImg = src => new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = src; });
async function rnPrepara(p) {
  RS.p = p; RS.img = await rnImg(p.img); RS.W = p.W; RS.H = p.H;
  const c = document.createElement("canvas"); c.width = p.W; c.height = p.H; const g = c.getContext("2d"); g.drawImage(RS.img, 0, 0);
  const d = g.getImageData(0, 0, p.W, p.H).data, lum = new Uint8Array(p.W * p.H);
  for (let i = 0; i < lum.length; i++) lum[i] = (d[i * 4] * 0.3 + d[i * 4 + 1] * 0.59 + d[i * 4 + 2] * 0.11) | 0;
  RS.lum = lum; RS.muri = RN.muri(lum, p.W, p.H);
}
const rnSalva = () => RS.p && RNDB.put(RS.p);
// raggio per chiudere le porte: ~45 cm se conosco la scala, altrimenti il 2,8% del lato lungo
const rnRaggio = p => Math.round(p.aperture != null ? p.aperture : (p.scala ? 0.45 / p.scala : Math.max(p.W, p.H) * 0.028));

/* ============ viste ============ */
function vRendering(id, fase) {
  return `<div class="hubhead"><h1>Rendering</h1><small>Dalla planimetria alla pianta arredata 2D e al 3D, nel nostro stile</small></div>
    <div id="rnapp"><div class="spin"></div></div>`;
}
async function afterRendering(id, fase) {
  const box = $("#rnapp");
  if (!id) return rnElenco(box);
  const p = await RNDB.get(id); if (!p) { location.hash = "#rendering"; return; }
  if (!RS.p || RS.p.id !== id || !RS.muri) await rnPrepara(p); else RS.p = p;
  RS.fase = fase || (p.stanze?.length ? (p.scala ? (p.mobili ? "risultato" : "arredo") : "scala") : "stanze");
  rnEditor(box);
}
async function rnElenco(box) {
  const L = (await RNDB.tutti()).sort((a, b) => b.agg - a.agg), all = window.__RENDER_ALL;
  box.innerHTML = `<label class="rnup"><input type="file" accept="image/*,application/pdf" id="rnfile" hidden>
      <b>+ Nuova planimetria</b><span>Foto, immagine o PDF. Poi tocchi le stanze e l'app fa il resto.</span></label>
    ${all ? `<p class="note">Nel PDF delle valutazioni c'è la planimetria di <b>${esc(all.nome)}</b>. <button class="lnk" data-rnstacca>Toglila</button></p>` : ""}
    ${L.length ? `<h2>I tuoi rendering</h2><div class="rnlist">${L.map(p => `<a class="rnit" href="#rendering/${p.id}"><img src="${p.thumb || p.img}" alt=""><div><b>${esc(p.nome)}</b><span>${p.stanze?.length || 0} stanze${p.mqTot ? " · " + num(p.mqTot, 0) + " m²" : ""} · ${new Date(p.agg).toLocaleDateString("it-IT")}</span></div></a>`).join("")}</div>` : ""}`;
  $("#rnfile").addEventListener("change", async e => { const f = e.target.files[0]; if (!f) return;
    box.innerHTML = `<div class="spin"></div><p class="note" style="text-align:center">Leggo la planimetria…</p>`;
    try { const r = await rnCaricaFile(f), id = "r" + Date.now().toString(36);
      const nome = (MM?.sel ? mmIndirizzo(MM.sel) : "") || f.name.replace(/\.[a-z]+$/i, "");
      await RNDB.put({ id, nome, img: r.img, W: r.W, H: r.H, stanze: [], scala: null, mobili: null, creato: Date.now() });
      location.hash = "#rendering/" + id;
    } catch (err) { box.innerHTML = `<p class="note">Non riesco a leggere il file (${esc(err.message || err)}). Prova con una foto o un'immagine.</p>`; } });
  box.querySelector("[data-rnstacca]")?.addEventListener("click", async () => { await RNDB.kvSet("allegato", null); window.__RENDER_ALL = null; rnElenco(box); });
}

const RN_FASI = [["stanze", "Stanze"], ["scala", "Misure"], ["arredo", "Arredo"], ["risultato", "Risultato"]];
function rnEditor(box) {
  const p = RS.p, f = RS.fase;
  box.innerHTML = `<div class="rnbar"><input class="rnnome" value="${esc(p.nome)}" aria-label="Nome del rendering">
      <button class="lnk" data-rndel>Elimina</button></div>
    <nav class="rnfasi">${RN_FASI.map(([k, t]) => `<a href="#rendering/${p.id}/${k}" class="${k === f ? "on" : ""}">${t}</a>`).join("")}</nav>
    <div id="rnguida" class="rnguida"></div>
    ${f === "risultato" ? `<div id="rnris"></div>` : `<div class="rnzoom"><button class="btn sec" data-rnz="-1" aria-label="Rimpicciolisci">−</button><button class="btn sec" data-rnz="1" aria-label="Ingrandisci">+</button><span class="note">due dita per spostarti</span></div>
      <div class="rnwrap" id="rnwrap"><canvas id="rncv" style="width:${(RS.zoom || 1) * 100}%"></canvas></div><div id="rnpan"></div>`}`;
  box.querySelectorAll("[data-rnz]").forEach(b => b.addEventListener("click", () => { const w = $("#rnwrap"), c = $("#rncv"), z0 = RS.zoom || 1; RS.zoom = Math.max(1, Math.min(4, z0 * (b.dataset.rnz === "1" ? 1.5 : 1 / 1.5)));
    const cx = (w.scrollLeft + w.clientWidth / 2) / z0, cy = (w.scrollTop + w.clientHeight / 2) / z0; c.style.width = RS.zoom * 100 + "%"; w.scrollLeft = cx * RS.zoom - w.clientWidth / 2; w.scrollTop = cy * RS.zoom - w.clientHeight / 2; }));
  box.querySelector(".rnnome").addEventListener("change", e => { p.nome = e.target.value.trim() || p.nome; rnSalva(); });
  box.querySelector("[data-rndel]").addEventListener("click", async () => { if (!confirm("Eliminare questo rendering?")) return; await RNDB.del(p.id); location.hash = "#rendering"; });
  if (f === "risultato") return rnRisultato();
  rnCanvasInit(); rnPannello();
}
function rnGuida(t) { const g = $("#rnguida"); if (g) g.innerHTML = t; }

/* ---- canvas: disegno e tocchi ---- */
function rnCanvasInit() {
  const cv = $("#rncv"), p = RS.p; cv.width = p.W; cv.height = p.H;
  const pt = e => { const r = cv.getBoundingClientRect(), t = e.touches ? e.touches[0] || e.changedTouches[0] : e; return [Math.round((t.clientX - r.left) * p.W / r.width), Math.round((t.clientY - r.top) * p.H / r.height)]; };
  let giu = null, due = null;
  const down = e => {
    if (e.touches && e.touches.length >= 2) { const w = $("#rnwrap"); due = { x: (e.touches[0].clientX + e.touches[1].clientX) / 2, y: (e.touches[0].clientY + e.touches[1].clientY) / 2, sl: w.scrollLeft, st: w.scrollTop }; giu = null; RS.drag = null; e.preventDefault(); return; }
    const q = pt(e); giu = q;
    if (RS.fase === "arredo" && RS.sel && p.mobili?.includes(RS.sel) && rnMobileA(q, true) !== RS.sel) { const h = rnManiglia(q, RS.sel); if (h) { RS.drag = { res: h, m: RS.sel, mosso: false }; e.preventDefault(); return; } }
    if (RS.fase === "arredo") { const m = rnMobileA(q); if (m) { RS.sel = m; RS.drag = { m, dx: q[0] - m.x, dy: q[1] - m.y, mosso: false }; e.preventDefault(); rnDisegna(); rnPannello(); } }
    if (RS.fase === "scala" && RS.misura && RS.misura.a) { const a = RS.misura.a, b = RS.misura.b; const near = (u, v) => Math.hypot(u[0] - v[0], u[1] - v[1]) < Math.max(p.W, p.H) * 0.03;
      if (near(q, a)) RS.drag = { maniglia: "a" }; else if (b && near(q, b)) RS.drag = { maniglia: "b" }; if (RS.drag) e.preventDefault(); } };
  const move = e => {
    if (due && e.touches && e.touches.length >= 2) { const w = $("#rnwrap"), x = (e.touches[0].clientX + e.touches[1].clientX) / 2, y = (e.touches[0].clientY + e.touches[1].clientY) / 2; w.scrollLeft = due.sl - (x - due.x); w.scrollTop = due.st - (y - due.y); e.preventDefault(); return; }
    if (!RS.drag) return; const q = pt(e); e.preventDefault();
    if (RS.drag.res) { rnRidimensiona(RS.drag, q); RS.drag.mosso = true; }
    else if (RS.drag.m) { RS.drag.m.x = q[0] - RS.drag.dx; RS.drag.m.y = q[1] - RS.drag.dy; RS.drag.mosso = true; }
    else if (RS.drag.maniglia) RS.misura[RS.drag.maniglia] = q;
    rnDisegna(); };
  const up = e => { if (due) { if (!e.touches || !e.touches.length) due = null; return; } const q = giu; giu = null; const d = RS.drag; RS.drag = null;
    if (d?.m) { if (d.mosso) { rnSalva(); rnPannello(); } return; }
    if (d?.maniglia) { rnPannello(); return; }
    if (d?.res) { if (d.mosso) { rnSalva(); rnPannello(); } return; }
    if (!q) return; rnTocco(q); };
  cv.addEventListener("mousedown", down); cv.addEventListener("mousemove", move); window.addEventListener("mouseup", up, { once: false });
  cv.addEventListener("touchstart", down, { passive: false }); cv.addEventListener("touchmove", move, { passive: false }); cv.addEventListener("touchend", e => { e.preventDefault(); up(e); }, { passive: false });
  // un solo gestore mouseup globale per volta
  if (window.__rnUp) window.removeEventListener("mouseup", window.__rnUp); window.__rnUp = up;
  rnDisegna();
}
const RN_COL = { soggiorno: "#d9b46a", cucsogg: "#d9b46a", cucina: "#c98b6b", camera: "#b06a78", cameretta: "#c58a95", studio: "#9b7aa0", bagno: "#7fa6b3", ingresso: "#b9a487", disimpegno: "#c7b79c", ripostiglio: "#a59a8a", balcone: "#8fa77a", terrazzo: "#8fa77a", altro: "#aaa" };
function rnDisegna() {
  const cv = $("#rncv"); if (!cv) return; const g = cv.getContext("2d"), p = RS.p, s = rnScala(p);
  g.clearRect(0, 0, p.W, p.H); g.drawImage(RS.img, 0, 0, p.W, p.H);
  const lw = Math.max(2, p.W / 400), fs = Math.max(14, p.W / 55);
  (p.stanze || []).forEach((st, i) => {
    g.beginPath(); st.poly.forEach(([x, y], j) => j ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath();
    g.fillStyle = (RN_COL[st.tipo] || "#aaa") + (RS.sel === st ? "88" : "55"); g.fill(); g.lineWidth = lw; g.strokeStyle = RS.sel === st ? "#6a1828" : "#6a182899"; g.stroke();
    const bb = RN.bbox(st.poly), cx = st.lx ?? (bb.x0 + bb.x1) / 2, cy = st.ly ?? (bb.y0 + bb.y1) / 2;
    g.font = `700 ${fs}px Barlow, sans-serif`; g.textAlign = "center"; g.fillStyle = "#3a1018";
    g.fillText(RN_TIPI[st.tipo]?.n || "?", cx, cy); if (s) { g.font = `500 ${fs * 0.85}px Barlow, sans-serif`; g.fillText(num(RN.area(st.poly) * s * s, 1) + " m²", cx, cy + fs); }
  });
  if (RS.manuale.length) { g.beginPath(); RS.manuale.forEach(([x, y], j) => j ? g.lineTo(x, y) : g.moveTo(x, y)); g.strokeStyle = "#6a1828"; g.lineWidth = lw * 1.5; g.stroke();
    RS.manuale.forEach(([x, y]) => { g.beginPath(); g.arc(x, y, lw * 3, 0, 7); g.fillStyle = "#c9a24b"; g.fill(); }); }
  if (RS.fase === "scala" && RS.misura?.a) { const { a, b } = RS.misura; g.strokeStyle = "#c9a24b"; g.lineWidth = lw * 2;
    if (b) { g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke(); }
    [a, b].filter(Boolean).forEach(q => { g.beginPath(); g.arc(q[0], q[1], lw * 5, 0, 7); g.fillStyle = "#6a1828"; g.fill(); g.lineWidth = lw; g.strokeStyle = "#fff"; g.stroke(); }); }
  if (RS.fase === "arredo" && s && p.mobili) p.mobili.forEach(m => rnMobileCanvas(g, m, s, RS.sel === m));
}
function rnMobileA(q, stretto) { const p = RS.p, s = rnScala(p); if (!s || !p.mobili) return null;
  return [...p.mobili].reverse().find(m => { const [w, d] = rnDim(m), a = -m.rot * Math.PI / 180, dx = q[0] - m.x, dy = q[1] - m.y, lx = dx * Math.cos(a) - dy * Math.sin(a), ly = dx * Math.sin(a) + dy * Math.cos(a);
    const marg = stretto ? 0 : 0.12 / s; return Math.abs(lx) <= w / s / 2 + marg && Math.abs(ly) <= d / s / 2 + marg; }); }
/* maniglie del mobile selezionato: lato destro (larghezza), lato basso (profondità), angolo (tutte e due), pallino sopra (rotazione) */
const rnUniforme = m => m.v === "tondo" || m.v === "quadrato";
function rnManiglie(m) {
  const s = RS.p.scala, [w, d] = rnDim(m), a = m.rot * Math.PI / 180, W = w / s / 2, D = d / s / 2, rot = ([x, y]) => [m.x + x * Math.cos(a) - y * Math.sin(a), m.y + x * Math.sin(a) + y * Math.cos(a)];
  // maniglie staccate dal mobile: così toccando il mobile lo sposti e basta
  const off = rnTocco1() * 1.25, L = { wd: rot([W + off, D + off]), r: rot([0, -D - off * 1.6]) };
  if (!rnUniforme(m)) { L.w = rot([W + off, 0]); L.d = rot([0, D + off]); }
  return L;
}
// raggio utile di un tocco, in pixel dell'immagine (circa 22 px sullo schermo)
const rnTocco1 = () => { const cv = $("#rncv"); return cv ? 22 * RS.p.W / cv.clientWidth : 30; };
function rnManiglia(q, m) { const L = rnManiglie(m), r = rnTocco1(); let best = null, bd = r * 0.9; for (const [k, h] of Object.entries(L)) { const d = Math.hypot(q[0] - h[0], q[1] - h[1]); if (d < bd) { bd = d; best = k; } } return best; }
function rnRidimensiona(D, q) {
  const m = D.m, s = RS.p.scala, a = -m.rot * Math.PI / 180, dx = q[0] - m.x, dy = q[1] - m.y, lx = dx * Math.cos(a) - dy * Math.sin(a), ly = dx * Math.sin(a) + dy * Math.cos(a);
  const arr = v => Math.round(Math.max(0.3, Math.min(6, v)) * 20) / 20;
  if (D.res === "r") { let g = Math.atan2(dx, -dy) * 180 / Math.PI; g = (Math.round(g / 15) * 15 + 360) % 360; m.rot = g; return; }
  const off = rnTocco1() * 1.25, ax = Math.max(0, Math.abs(lx) - off), ay = Math.max(0, Math.abs(ly) - off);
  if (rnUniforme(m)) { const v = arr(Math.max(ax, ay) * 2 * s); m.w = v; m.d = v; return; }
  if (D.res === "w" || D.res === "wd") m.w = arr(ax * 2 * s);
  if (D.res === "d" || D.res === "wd") m.d = arr(ay * 2 * s);
}
const RN_MCACHE = new Map();
function rnMobileCanvas(g, m, s, sel) {
  const [w, d] = rnDim(m), key = m.tipo + "|" + (m.v || "") + "|" + (m.lato || "") + "|" + w + "|" + d;
  let im = RN_MCACHE.get(key);
  if (!im) { im = new Image(); const pad = 0.5, sv = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-w / 2 - pad} ${-d / 2 - pad} ${w + 2 * pad} ${d + 2 * pad}" width="${(w + 2 * pad) * 100}" height="${(d + 2 * pad) * 100}">${rnMobSvg(m.tipo, w, d, m)}</svg>`;
    im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(sv); im.onload = () => rnDisegna(); RN_MCACHE.set(key, im); }
  g.save(); g.translate(m.x, m.y); g.rotate(m.rot * Math.PI / 180);
  if (im.complete && im.naturalWidth) g.drawImage(im, (-w / 2 - 0.5) / s, (-d / 2 - 0.5) / s, (w + 1) / s, (d + 1) / s);
  if (sel) { g.strokeStyle = "#c9a24b"; g.setLineDash([0.08 / s, 0.06 / s]); g.lineWidth = Math.max(2, 0.03 / s); g.strokeRect(-w / 2 / s - 0.06 / s, -d / 2 / s - 0.06 / s, w / s + 0.12 / s, d / s + 0.12 / s); g.setLineDash([]); }
  g.restore();
  if (sel) { const L = rnManiglie(m), r = rnTocco1() * 0.36;
    g.strokeStyle = "rgba(201,162,75,.7)"; g.lineWidth = Math.max(1.5, r * 0.12); g.setLineDash([r * 0.5, r * 0.4]);
    for (const h of Object.values(L)) { g.beginPath(); g.moveTo(m.x, m.y); g.lineTo(...h); g.stroke(); } g.setLineDash([]);
    for (const [k, h] of Object.entries(L)) { g.beginPath(); g.arc(h[0], h[1], r, 0, 7); g.fillStyle = k === "r" ? "rgba(201,162,75,.92)" : "rgba(106,24,40,.85)"; g.fill(); g.lineWidth = r * 0.22; g.strokeStyle = "#fff"; g.stroke();
      g.fillStyle = "#fff"; g.font = `700 ${r * 1.15}px Barlow, sans-serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(k === "r" ? "↻" : k === "wd" ? "⤡" : k === "w" ? "↔" : "↕", h[0], h[1] + 1); }
    g.textBaseline = "alphabetic"; }
}
/* ---- tocchi sul canvas a seconda della fase ---- */
// punto più interno di una stanza (lontano dai muri): da lì il riconoscimento chiude bene le porte
function rnSeme(poly) {
  const bb = RN.bbox(poly), m = RS.muri, W = RS.p.W; let best = null, bd = -1;
  for (let i = 1; i < 14; i++) for (let j = 1; j < 14; j++) { const q = [Math.round(bb.x0 + (bb.x1 - bb.x0) * i / 14), Math.round(bb.y0 + (bb.y1 - bb.y0) * j / 14)];
    if (!RN.dentro(q, poly) || m[q[1] * W + q[0]]) continue; const d = RN.distBordo(q, poly); if (d > bd) { bd = d; best = q; } }
  return best;
}
// stanza dal punto: provo da aperture larghe a strette, il raggio più grande che lascia libero il punto chiude meglio le porte
function rnStanzaAuto(p, q) {
  if (p.aperture != null) return RN.stanza(RS.muri, p.W, p.H, q[0], q[1], p.aperture);
  const max = p.scala ? 0.55 / p.scala : Math.max(p.W, p.H) * 0.055;
  for (let rr = max; rr >= 3; rr *= 0.85) { const t = RN.stanza(RS.muri, p.W, p.H, q[0], q[1], Math.round(rr)); if (t.errore === "muro") continue; return t; }
  return { errore: "muro" };
}
function rnTocco(q) {
  const p = RS.p;
  if (RS.fase === "stanze") {
    if (RS.modo === "mano") { RS.manuale.push(q); rnDisegna(); rnPannello(); return; }
    const gia = (p.stanze || []).find(st => RN.dentro(q, st.poly));
    if (gia) { RS.sel = gia; rnDisegna(); rnPannello(); return; }
    const r = rnStanzaAuto(p, q);
    if (r.errore === "muro") return rnGuida(`<b>Hai toccato un muro.</b> Tocca il pavimento al centro della stanza.`);
    if (r.errore === "aperta") return rnGuida(`<b>Questa stanza non risulta chiusa</b> (forse una porta molto larga o un'apertura). Alza <i>"Chiudi le aperture"</i> qui sotto e ritocca, oppure usa <i>"Disegna a mano"</i> e tocca gli angoli.`);
    const poly = RN.contorno(r.reg, p.W, p.H);
    if (poly.length < 3 || RN.area(poly) < p.W * p.H * 0.002) return rnGuida(`<b>Zona troppo piccola.</b> Tocca più al centro della stanza.`);
    const st = { id: "s" + Date.now().toString(36), poly, tipo: null, seed: rnSeme(poly) || q };
    p.stanze = [...(p.stanze || []), st]; rnIndovina(p.stanze, rnScala(p)); RS.sel = st; p.mobili = null; rnSalva(); rnDisegna(); rnPannello();
    return;
  }
  if (RS.fase === "scala") { if (!RS.misura || RS.misura.b) RS.misura = { a: q }; else RS.misura.b = q; rnDisegna(); rnPannello(); return; }
  if (RS.fase === "arredo") { RS.sel = null; RS.ultimaStanza = (p.stanze || []).find(st => RN.dentro(q, st.poly)) || RS.ultimaStanza; rnDisegna(); rnPannello(); }
}

/* ---- pannello sotto la planimetria ---- */
function rnPannello() {
  const pan = $("#rnpan"); if (!pan) return; const p = RS.p, s = rnScala(p);
  if (RS.fase === "stanze") {
    rnGuida(p.stanze?.length ? `<b>Tocca le altre stanze</b> (anche bagni, corridoi e balconi). Se il nome è sbagliato, tocca la stanza e scegli quello giusto.` : `<b>Tocca il pavimento di ogni stanza</b>: l'app trova da sola i muri e la superficie. Inizia dal soggiorno.`);
    const sel = RS.sel && p.stanze?.includes(RS.sel) ? RS.sel : null;
    pan.innerHTML = `${sel ? `<div class="rnsel"><b>Che stanza è?</b><div class="chips">${Object.entries(RN_TIPI).map(([k, t]) => `<button class="chip ${sel.tipo === k ? "on" : ""}" data-rntipo="${k}">${t.n}</button>`).join("")}</div>
        <button class="lnk" data-rntogli>Togli questa stanza</button></div>` : ""}
      <div class="rnctl"><label><span>Chiudi le aperture: a sinistra automatico, verso destra per porte molto larghe</span><input type="range" min="0" max="${Math.round(Math.max(p.W, p.H) * 0.07)}" value="${p.aperture ?? 0}" data-rnap></label>
        <button class="btn sec" data-rnmano>${RS.modo === "mano" ? (RS.manuale.length >= 3 ? "Chiudi la stanza" : "Annulla disegno") : "Disegna a mano"}</button></div>
      ${RS.modo === "mano" ? `<p class="note">Tocca gli angoli della stanza uno dopo l'altro, poi "Chiudi la stanza".</p>` : ""}
      ${p.stanze?.length ? `<div class="btns"><a class="btn pri" href="#rendering/${p.id}/scala">Avanti: misure</a></div>` : ""}`;
    pan.querySelectorAll("[data-rntipo]").forEach(b => b.addEventListener("click", () => { sel.tipo = b.dataset.rntipo; sel.manuale = true; p.mobili = null; rnSalva(); rnDisegna(); rnPannello(); }));
    pan.querySelector("[data-rntogli]")?.addEventListener("click", () => { p.stanze = p.stanze.filter(x => x !== sel); RS.sel = null; p.mobili = null; rnSalva(); rnDisegna(); rnPannello(); });
    pan.querySelector("[data-rnap]").addEventListener("change", e => { p.aperture = +e.target.value || null; rnSalva(); });
    pan.querySelector("[data-rnmano]").addEventListener("click", () => {
      if (RS.modo !== "mano") { RS.modo = "mano"; RS.manuale = []; }
      else { if (RS.manuale.length >= 3) { const st = { id: "s" + Date.now().toString(36), poly: RS.manuale.slice(), tipo: null }; p.stanze = [...(p.stanze || []), st]; rnIndovina(p.stanze, s); RS.sel = st; p.mobili = null; rnSalva(); }
        RS.modo = "tocca"; RS.manuale = []; }
      rnDisegna(); rnPannello(); });
    return;
  }
  if (RS.fase === "scala") {
    const pxTot = (p.stanze || []).reduce((x, st) => x + RN.area(st.poly), 0), L = RS.misura?.b ? Math.hypot(RS.misura.b[0] - RS.misura.a[0], RS.misura.b[1] - RS.misura.a[1]) : 0;
    rnGuida(`<b>Dammi una misura</b>, così i metri sono giusti. Il modo più preciso: <b>tocca i due capi di un muro</b> di cui conosci la lunghezza (anche una quota scritta sulla planimetria) e scrivi i metri. In alternativa scrivi la superficie calpestabile totale.`);
    pan.innerHTML = `<div class="vg">
        <label class="wide"><span>Lunghezza del tratto segnato${L ? "" : " (prima tocca i due capi)"}</span><input type="number" step="0.01" min="0.5" inputmode="decimal" data-rnlung value="${p.misMuro || ""}" ${L ? "" : "disabled"}><em>m</em></label>
        <label class="wide"><span>oppure: superficie calpestabile (somma delle stanze segnate)</span><input type="number" step="0.5" min="5" inputmode="decimal" data-rnmq value="${p.mqTot && !p.misMuro ? p.mqTot : ""}"><em>m²</em></label></div>
      ${s ? `<p class="note">Scala impostata: le stanze segnate sommano <b>${num(pxTot * s * s, 1)} m²</b> calpestabili. Controlla che le aree sulla planimetria ti tornino.</p>` : ""}
      <div class="btns"><button class="btn sec" data-rnscala>Applica</button>${s ? `<a class="btn pri" href="#rendering/${p.id}/arredo">Avanti: arredo</a>` : ""}</div>`;
    pan.querySelector("[data-rnscala]").addEventListener("click", () => {
      const lung = +pan.querySelector("[data-rnlung]").value, mq = +pan.querySelector("[data-rnmq]").value;
      if (lung > 0 && L) { p.scala = lung / L; p.misMuro = lung; }
      else if (mq > 0 && pxTot) { p.scala = Math.sqrt(mq / pxTot); p.misMuro = null; }
      else return rnGuida(`<b>Manca la misura.</b> Tocca i due capi di un muro e scrivi i metri, oppure scrivi la superficie totale.`);
      p.mqTot = Math.round(pxTot * p.scala * p.scala * 10) / 10; p.aperture = null; p.mobili = null; rnSalva(); rnDisegna(); rnPannello(); });
    return;
  }
  if (RS.fase === "arredo") {
    if (!s) { pan.innerHTML = `<p class="note">Prima serve la misura.</p><a class="btn pri" href="#rendering/${p.id}/scala">Vai alle misure</a>`; return; }
    if (!p.mobili) { p.mobili = []; for (const st of p.stanze) for (const m of rnArreda(st, s)) p.mobili.push({ ...m, st: st.id }); rnSalva(); rnDisegna(); }
    rnGuida(`<b>Ho arredato io le stanze.</b> Tocca un mobile e <b>trascinalo</b> per spostarlo. Le misure si cambiano con i pallini <b>staccati</b> dal mobile (↔ ↕ ⤡) o con i cursori qui sotto; il pallino oro lo <b>ruota</b>.`);
    const sel = RS.sel && p.mobili.includes(RS.sel) ? RS.sel : null;
    const [sw, sd] = sel ? rnDim(sel) : [0, 0], V = sel && RN_VAR[sel.tipo];
    pan.innerHTML = `${sel ? `<div class="rnsel"><b>${RN_MOB[sel.tipo][2]}</b> <span class="note">trascinalo con il dito per spostarlo</span>
        ${V ? `<div class="chips">${V.map(([k, t]) => `<button class="chip ${(sel.v || V[0][0]) === k ? "on" : ""}" data-rnvar="${k}">${t}</button>`).join("")}</div>` : ""}
        ${sel.v === "angolare" ? `<div class="chips"><button class="chip ${sel.lato !== "dx" ? "on" : ""}" data-rnlato="sx">Angolo a sinistra</button><button class="chip ${sel.lato === "dx" ? "on" : ""}" data-rnlato="dx">Angolo a destra</button></div>` : ""}
        <div class="rnsl"><label><span>${sel.v === "tondo" ? "Diametro" : "Larghezza"} <b data-o="w">${num(sw, 2)} m</b></span><input type="range" min="0.3" max="5" step="0.05" value="${sw}" data-rnw></label>
          ${sel.v === "tondo" || sel.v === "quadrato" ? "" : `<label><span>${sel.v === "angolare" ? "Lato corto (angolo)" : sel.v === "isola" ? "Profondità con l'isola" : "Profondità"} <b data-o="d">${num(sd, 2)} m</b></span><input type="range" min="0.3" max="4" step="0.05" value="${sd}" data-rnd></label>`}
          <label><span>Rotazione <b data-o="r">${sel.rot}°</b></span><input type="range" min="0" max="345" step="15" value="${sel.rot}" data-rnr></label></div>
        <div class="btns"><button class="btn sec" data-rnrot>Ruota 90°</button><button class="btn sec" data-rndup>Duplica</button><button class="btn sec" data-rnrm>Togli</button></div></div>` : `<p class="note">Tocca un mobile per spostarlo, cambiarne forma e misure.</p>`}
      <div class="rnctl"><label><span>Aggiungi un mobile</span><select data-rnadd><option value="">Scegli…</option>${Object.entries(RN_MOB).map(([k, v]) => `<option value="${k}">${v[2]} (${v[0]}×${v[1]} m)</option>`).join("")}</select></label>
        <button class="btn sec" data-rnrifai>Riarreda da capo</button></div>
      <div class="btns"><a class="btn pri" href="#rendering/${p.id}/risultato">Vedi il risultato</a></div>`;
    const agg = () => { rnSalva(); rnDisegna(); };
    pan.querySelectorAll("[data-rnvar]").forEach(b => b.addEventListener("click", () => { sel.v = b.dataset.rnvar; delete sel.d; if (sel.v === "tondo" || sel.v === "quadrato") sel.w = Math.min(rnDim(sel)[0], 1.4); agg(); rnPannello(); }));
    pan.querySelectorAll("[data-rnlato]").forEach(b => b.addEventListener("click", () => { sel.lato = b.dataset.rnlato; agg(); rnPannello(); }));
    pan.querySelector("[data-rnw]")?.addEventListener("input", e => { sel.w = +e.target.value; pan.querySelector('[data-o="w"]').textContent = num(sel.w, 2) + " m"; agg(); });
    pan.querySelector("[data-rnd]")?.addEventListener("input", e => { sel.d = +e.target.value; pan.querySelector('[data-o="d"]').textContent = num(sel.d, 2) + " m"; agg(); });
    pan.querySelector("[data-rnr]")?.addEventListener("input", e => { sel.rot = +e.target.value; pan.querySelector('[data-o="r"]').textContent = sel.rot + "°"; agg(); });
    pan.querySelector("[data-rndup]")?.addEventListener("click", () => { const c = { ...sel, x: sel.x + 0.4 / s, y: sel.y + 0.4 / s }; p.mobili.push(c); RS.sel = c; agg(); rnPannello(); });
    pan.querySelector("[data-rnrot]")?.addEventListener("click", () => { sel.rot = (sel.rot + 90) % 360; rnSalva(); rnDisegna(); rnPannello(); });
    pan.querySelector("[data-rnrm]")?.addEventListener("click", () => { p.mobili = p.mobili.filter(m => m !== sel); RS.sel = null; rnSalva(); rnDisegna(); rnPannello(); });
    pan.querySelector("[data-rnrifai]").addEventListener("click", () => { p.mobili = null; RS.sel = null; rnPannello(); });
    pan.querySelector("[data-rnadd]").addEventListener("change", e => { const t = e.target.value; if (!t) return; const bb = RN.bbox((RS.ultimaStanza || p.stanze[0]).poly);
      const m = { tipo: t, x: (bb.x0 + bb.x1) / 2, y: (bb.y0 + bb.y1) / 2, rot: 0 }; p.mobili.push(m); RS.sel = m; rnSalva(); rnDisegna(); rnPannello(); });
  }
}

/* ============ pianta 2D (SVG) ============ */
// maschera dei muri come immagine: bordeaux scuro su trasparente
// muri del risultato finale (il frazionamento ci aggiunge porte chiuse e aperte)
function rnMaschera(p) { return RS.muri; }
function rnMuriPng(p) {
  const c = document.createElement("canvas"); c.width = p.W; c.height = p.H; const g = c.getContext("2d"), d = g.createImageData(p.W, p.H);
  const m = rnMaschera(p); for (let i = 0; i < m.length; i++) if (m[i]) { d.data[i * 4] = 46; d.data[i * 4 + 1] = 22; d.data[i * 4 + 2] = 28; d.data[i * 4 + 3] = 255; }
  g.putImageData(d, 0, 0); return c.toDataURL("image/png");
}
// disegno vettoriale di ogni mobile, visto dall'alto (unità: metri, origine al centro, schiena in alto)
function rnMobSvg(t, w, d, m = {}) {
  const L = "#6a1828", C = "#fffaf2", O = "#c9a24b", S = 'stroke="' + L + '" stroke-width="0.025"';
  const r = (x, y, ww, hh, f = C, rr = 0.04, ex = "") => `<rect x="${x}" y="${y}" width="${ww}" height="${hh}" rx="${rr}" fill="${f}" ${S} ${ex}/>`;
  const W = w / 2, D = d / 2;
  const dx = m.lato === "dx";
  if (t === "divano" && m.v === "angolare") { const a = 0.92, xA = dx ? W - a : -W;
    return r(-W, -D, w, a, "#efe3cf") + r(xA, -D, a, d, "#efe3cf") + r(-W, -D, w, 0.22, "#e6d5ba") + r(dx ? W - 0.22 : -W, -D, 0.22, d, "#e6d5ba")
      + r(dx ? -W : W - 0.18, -D, 0.18, a, "#e6d5ba") + r(xA + (dx ? 0 : 0.24), D - 0.18, a - 0.24, 0.18, "#e6d5ba")
      + r(dx ? -W + 0.2 : -W + a, -D + 0.24, w - a - 0.2, a - 0.3, "#f6ecdc") + r(xA + (dx ? 0.02 : 0.24), -D + 0.24, a - 0.26, d - 0.44, "#f6ecdc"); }
  if (t.startsWith("cucina") && m.v === "angolare") { const a = 0.62, xA = dx ? W - a : -W;
    return r(-W, -D, w, a, "#f1e6d6", 0.02) + r(xA, -D, a, d, "#f1e6d6", 0.02) + `<circle cx="${dx ? -W + 0.4 : W - 0.4}" cy="${-D + 0.31}" r="0.11" fill="none" ${S}/><circle cx="${dx ? -W + 0.9 : W - 0.9}" cy="${-D + 0.31}" r="0.11" fill="none" ${S}/>`
      + `<rect x="${xA + 0.1}" y="${D - 0.75}" width="0.42" height="0.5" rx="0.06" fill="#dfe8ea" ${S}/>`; }
  if (t.startsWith("cucina") && m.v === "isola") { const a = 0.62, iw = Math.min(w * 0.7, 2.2), id = 0.9;
    return r(-W, -D, w, a, "#f1e6d6", 0.02) + `<circle cx="${-W + 0.4}" cy="${-D + 0.31}" r="0.11" fill="none" ${S}/><circle cx="${-W + 0.9}" cy="${-D + 0.31}" r="0.11" fill="none" ${S}/><rect x="${W - 0.9}" y="${-D + 0.1}" width="0.5" height="0.38" rx="0.06" fill="#dfe8ea" ${S}/>`
      + r(-iw / 2, D - id, iw, id, "#e8d9c2", 0.04) + [-1, 0, 1].map(i => `<circle cx="${i * iw / 3}" cy="${D + 0.18}" r="0.17" fill="${C}" ${S}/>`).join(""); }
  if ((t.startsWith("tavolo") || t === "tavolino") && m.v === "tondo") { const R = W, n = t === "tavolino" ? 0 : Math.max(3, Math.round(Math.PI * w / 0.6)), sd = [];
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; sd.push(`<circle cx="${Math.cos(a) * (R + 0.2)}" cy="${Math.sin(a) * (R + 0.2)}" r="0.2" fill="${C}" ${S}/>`); }
    return sd.join("") + `<circle cx="0" cy="0" r="${R}" fill="${t === "tavolino" ? "#d8c29a" : "#d8c29a"}" ${S}/>`; }
  if (t.startsWith("tavolo") && m.v === "quadrato") { const sd = []; for (const [x, y] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) sd.push(r(x * (W + 0.2) - 0.21, y * (D + 0.2) - 0.17, 0.42, 0.34, C, 0.06)); return sd.join("") + r(-W, -D, w, d, "#d8c29a", 0.05); }
  if (t === "tappeto" && m.v === "tondo") return `<circle cx="0" cy="0" r="${W}" fill="#c9a24b" fill-opacity=".18" stroke="${O}" stroke-width="0.02" stroke-dasharray="0.06 0.04"/>`;
  switch (t) {
    case "divano": return r(-W, -D, w, d, "#efe3cf") + r(-W, -D, w, 0.22, "#e6d5ba") + r(-W, -D, 0.18, d, "#e6d5ba") + r(W - 0.18, -D, 0.18, d, "#e6d5ba") + r(-W + 0.2, -D + 0.24, (w - 0.4) / 2 - 0.02, d - 0.3, "#f6ecdc") + r(0.01, -D + 0.24, (w - 0.4) / 2 - 0.02, d - 0.3, "#f6ecdc");
    case "poltrona": return r(-W, -D, w, d, "#efe3cf") + r(-W, -D, w, 0.2, "#e6d5ba") + r(-W + 0.14, -D + 0.22, w - 0.28, d - 0.3, "#f6ecdc");
    case "tavolino": return r(-W, -D, w, d, "#d8c29a", 0.06);
    case "tv": return r(-W, -D, w, d, "#e9dcc6") + `<rect x="${-W + 0.15}" y="${-D + 0.05}" width="${w - 0.3}" height="0.06" fill="#2e161c"/>`;
    case "tavolo6": case "tavolo4": { const n = t === "tavolo6" ? 3 : 2, sd = []; for (let i = 0; i < n; i++) { const x = -W + (i + 0.5) * w / n - 0.21; sd.push(r(x, -D - 0.38, 0.42, 0.34, C, 0.06), r(x, D + 0.04, 0.42, 0.34, C, 0.06)); }
      return sd.join("") + r(-W, -D, w, d, "#d8c29a", 0.05); }
    case "tappeto": return `<rect x="${-W}" y="${-D}" width="${w}" height="${d}" rx="0.05" fill="#c9a24b" fill-opacity=".18" stroke="${O}" stroke-width="0.02" stroke-dasharray="0.06 0.04"/>`;
    case "cucinaL": case "cucinaC": { const fu = [-W + 0.35, -W + 0.85].map(x => `<circle cx="${x}" cy="0" r="0.11" fill="none" ${S}/>`).join(""); return r(-W, -D, w, d, "#f1e6d6", 0.02) + fu + `<rect x="${W - 0.9}" y="${-D + 0.1}" width="0.5" height="0.38" rx="0.06" fill="#dfe8ea" ${S}/>`; }
    case "frigo": return r(-W, -D, w, d, "#f1e6d6", 0.03) + `<line x1="${-W + 0.06}" y1="${D - 0.08}" x2="${W - 0.06}" y2="${D - 0.08}" ${S}/>`;
    case "letto2": case "letto1": return r(-W, -D, w, d, "#fbf6ee", 0.05) + r(-W, -D, w, 0.1, "#b88a5e", 0.03) + (t === "letto2" ? r(-W + 0.12, -D + 0.16, w / 2 - 0.18, 0.32, C, 0.08) + r(0.06, -D + 0.16, w / 2 - 0.18, 0.32, C, 0.08) : r(-W + 0.12, -D + 0.16, w - 0.24, 0.32, C, 0.08)) + `<rect x="${-W}" y="${-D + d * 0.42}" width="${w}" height="${d * 0.58}" rx="0.05" fill="#6a1828" fill-opacity=".85"/>` + `<rect x="${-W}" y="${-D + d * 0.42}" width="${w}" height="0.08" fill="${O}" fill-opacity=".8"/>`;
    case "comodino": return r(-W, -D, w, d, "#d8c29a", 0.04) + `<circle cx="0" cy="0" r="0.1" fill="#fffaf2" ${S}/>`;
    case "armadio": case "armadio1": { const n = Math.round(w / 0.5), L2 = []; for (let i = 1; i < n; i++) L2.push(`<line x1="${-W + i * w / n}" y1="${-D}" x2="${-W + i * w / n}" y2="${D}" ${S}/>`); return r(-W, -D, w, d, "#efe3cf", 0.02) + L2.join(""); }
    case "scrivania": return r(-W, -D, w, d, "#d8c29a", 0.03) + r(-0.22, D + 0.05, 0.44, 0.4, C, 0.12);
    case "libreria": return r(-W, -D, w, d, "#e2d2b8", 0.02);
    case "wc": return r(-W, -D, w, 0.18, C, 0.04) + `<ellipse cx="0" cy="${-D + 0.36}" rx="${W - 0.02}" ry="0.22" fill="${C}" ${S}/>`;
    case "bidet": return r(-W, -D, w, 0.14, C, 0.04) + `<ellipse cx="0" cy="${-D + 0.32}" rx="${W - 0.02}" ry="0.2" fill="${C}" ${S}/>`;
    case "lavabo": return r(-W, -D, w, d, C, 0.06) + `<ellipse cx="0" cy="0.03" rx="${W - 0.1}" ry="${D - 0.1}" fill="#dfe8ea" ${S}/>`;
    case "doccia": return r(-W, -D, w, d, "#dfe8ea", 0.02) + `<line x1="${-W}" y1="${-D}" x2="${W}" y2="${D}" ${S}/><line x1="${W}" y1="${-D}" x2="${-W}" y2="${D}" ${S}/>`;
    case "vasca": return r(-W, -D, w, d, C, 0.12) + `<rect x="${-W + 0.08}" y="${-D + 0.08}" width="${w - 0.16}" height="${d - 0.16}" rx="0.25" fill="#dfe8ea" ${S}/>`;
    case "consolle": return r(-W, -D, w, d, "#d8c29a", 0.03);
    case "esterno": return `<circle cx="0" cy="0" r="${W * 0.6}" fill="#d8c29a" ${S}/>` + `<circle cx="${-W}" cy="0" r="0.2" fill="${C}" ${S}/><circle cx="${W}" cy="0" r="0.2" fill="${C}" ${S}/>`;
    case "pianta": return `<circle cx="0" cy="0" r="${W}" fill="#7f9a6a" fill-opacity=".8" ${S}/><circle cx="0" cy="0" r="${W * 0.5}" fill="#a7bf8f"/>`;
    default: return r(-W, -D, w, d);
  }
}
function rnSvg(p, opt = {}) {
  const s = p.scala || 0.01, k = 1 / s;   // px per metro
  const muri = opt.muri || rnMuriPng(p), F = rnInquadra(p), pad = 0;
  const vb = `${F.x} ${F.y} ${F.w} ${F.h}`;
  const defs = `<defs>
    <pattern id="pLegno" width="${0.12 * k}" height="${0.9 * k}" patternUnits="userSpaceOnUse"><rect width="${0.12 * k}" height="${0.9 * k}" fill="#ead8b8"/><rect width="${0.12 * k}" height="${0.9 * k}" fill="none" stroke="#d9c19a" stroke-width="${0.01 * k}"/></pattern>
    <pattern id="pPiast" width="${0.3 * k}" height="${0.3 * k}" patternUnits="userSpaceOnUse"><rect width="${0.3 * k}" height="${0.3 * k}" fill="#f4eee6"/><rect width="${0.3 * k}" height="${0.3 * k}" fill="none" stroke="#ddd2c4" stroke-width="${0.012 * k}"/></pattern>
    <pattern id="pEst" width="${0.15 * k}" height="${0.15 * k}" patternUnits="userSpaceOnUse"><rect width="${0.15 * k}" height="${0.15 * k}" fill="#e3dccd"/><line x1="0" y1="0" x2="${0.15 * k}" y2="0" stroke="#cfc4ae" stroke-width="${0.015 * k}"/></pattern></defs>`;
  const pav = { legno: "url(#pLegno)", piastrelle: "url(#pPiast)", esterno: "url(#pEst)" };
  const fs = Math.max(11, 0.3 * k);
  const stanze = (p.stanze || []).map(st => `<polygon points="${st.poly.map(q => q.join(",")).join(" ")}" fill="${pav[RN_TIPI[st.tipo]?.pav || "legno"]}"/>`).join("");
  const mob = (p.mobili || []).filter(m => m.tipo === "tappeto").concat((p.mobili || []).filter(m => m.tipo !== "tappeto")).map(m => {
    const [w, d] = rnDim(m); return `<g transform="translate(${m.x},${m.y}) rotate(${m.rot}) scale(${k})">${rnMobSvg(m.tipo, w, d, m)}</g>`; }).join("");
  const lab = (p.stanze || []).map(st => { const bb = RN.bbox(st.poly), cx = (bb.x0 + bb.x1) / 2, cy = (bb.y0 + bb.y1) / 2, mq = RN.area(st.poly) * s * s;
    // etichetta dove c'è spazio: il punto della stanza più lontano dai mobili, vicino al centro
    const serve = ((RN_TIPI[st.tipo]?.n || "").length * fs * 0.33) + fs * 0.3;
    let best = [cx, cy], bs = -1; for (let i = 0; i <= 8; i++) for (let j = 0; j <= 8; j++) { const q = [bb.x0 + (bb.x1 - bb.x0) * i / 8, bb.y0 + (bb.y1 - bb.y0) * j / 8]; if (!RN.dentro(q, st.poly) || RN.distBordo(q, st.poly) < Math.min(serve, (bb.x1 - bb.x0) / 2.2)) continue;
      const dm = Math.min(1e9, ...(p.mobili || []).filter(m => m.tipo !== "tappeto").map(m => Math.hypot(m.x - q[0], m.y - q[1]))), dc = Math.hypot(q[0] - cx, q[1] - cy), sc = Math.min(dm, 2.2 * k) - dc * 0.25 + Math.min(RN.distBordo(q, st.poly), 0.6 * k);
      if (sc > bs) { bs = sc; best = q; } }
    return `<g font-family="Barlow, Arial, sans-serif" text-anchor="middle"><text x="${best[0]}" y="${best[1]}" font-size="${fs}" font-weight="700" fill="#3a1018" letter-spacing="0.5">${esc((RN_TIPI[st.tipo]?.n || "").toUpperCase())}</text>
      <text x="${best[0]}" y="${best[1] + fs * 1.15}" font-size="${fs * 0.85}" fill="#8a6414">${num(mq, 1)} m²</text></g>`; }).join("");
  const apri = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${vb}" width="${F.w}" height="${F.h}">${defs}`;
  if (opt.solo === "sotto") return `${apri}<rect x="${F.x}" y="${F.y}" width="${F.w}" height="${F.h}" fill="#fffdf9"/>${stanze}</svg>`;
  if (opt.solo === "sopra") return `${apri}${mob}${lab}</svg>`;
  return `${apri}<rect x="${F.x}" y="${F.y}" width="${F.w}" height="${F.h}" fill="#fffdf9"/>
    ${stanze}<image href="${muri}" xlink:href="${muri}" x="0" y="0" width="${p.W}" height="${p.H}"/>${mob}${lab}</svg>`;
}
// pianta → PNG a tre strati: pavimenti, muri, mobili e scritte (funziona anche su iPhone)
// inquadratura: solo l'appartamento, con un metro di margine
function rnInquadra(p) { if (!(p.stanze || []).length) return { x: 0, y: 0, w: p.W, h: p.H }; const b = RN.bbox(p.stanze.flatMap(st => st.poly)), m = p.scala ? 1 / p.scala : 40;
  const x = Math.max(-40, b.x0 - m), y = Math.max(-40, b.y0 - m), x1 = Math.min(p.W + 40, b.x1 + m), y1 = Math.min(p.H + 40, b.y1 + m); return { x, y, w: x1 - x, h: y1 - y }; }
async function rnPng(p, larg = 1800, opt = {}) {
  const F = rnInquadra(p), k = larg / F.w, c = document.createElement("canvas"); c.width = larg; c.height = Math.round(F.h * k);
  const g = c.getContext("2d"), svgImg = sv => rnImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent(sv));
  g.drawImage(await svgImg(rnSvg(p, { ...opt, solo: "sotto", muri: 1 })), 0, 0, c.width, c.height);
  g.drawImage(await rnImg(rnMuriPng(p)), -F.x * k, -F.y * k, p.W * k, p.H * k);
  g.drawImage(await svgImg(rnSvg(p, { ...opt, solo: "sopra", muri: 1 })), 0, 0, c.width, c.height);
  return c.toDataURL("image/png");
}
/* ============ 3D (three.js) ============ */
const RN_STILI3D = { bambola: ["Casa di bambola", 1.3], realistico: ["Realistico", 2.7], pianta: ["Pianta in rilievo", 0.35] };
async function rn3D(host, p, stile = "bambola") {
  const THREE = await import("https://esm.sh/three@0.160.0");
  const { OrbitControls } = await import("https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js");
  const s = p.scala, bbA = RN.bbox((p.stanze || []).flatMap(st => st.poly)), pad = 0.6 / s;
  // inquadro solo l'appartamento (il guscio), non tutta la planimetria
  const X0 = (bbA.x0 - pad) * s, X1 = (bbA.x1 + pad) * s, Z0 = (bbA.y0 - pad) * s, Z1 = (bbA.y1 + pad) * s, Wm = X1 - X0, Hm = Z1 - Z0, cx = (X0 + X1) / 2, cz = (Z0 + Z1) / 2;
  const ren = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true }); ren.setPixelRatio(Math.min(2, devicePixelRatio)); ren.shadowMap.enabled = true; ren.shadowMap.type = THREE.PCFSoftShadowMap;
  const w = host.clientWidth, h = Math.round(w * 0.75); ren.setSize(w, h); host.innerHTML = ""; host.appendChild(ren.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color("#f6efe4");
  const cam = new THREE.PerspectiveCamera(38, w / h, 0.1, 200); const dist = Math.max(Wm, Hm) * (stile === "pianta" ? 1.25 : 1.15);
  if (stile === "pianta") cam.position.set(cx, dist * 1.25, cz + dist * 0.25); else if (stile === "realistico") cam.position.set(cx + dist * 0.45, dist * 0.7, cz + dist * 0.85); else cam.position.set(cx + dist * 0.3, dist * 0.9, cz + dist * 0.7);
  const ctl = new OrbitControls(cam, ren.domElement); ctl.target.set(cx, 0, cz); ctl.maxPolarAngle = Math.PI * 0.47; ctl.enableDamping = true; ctl.update();
  scene.add(new THREE.HemisphereLight(0xfff6e8, 0xb9a487, 0.9));
  const sun = new THREE.DirectionalLight(0xfff2dc, 1.6); sun.position.set(cx - Wm * 0.6, Math.max(Wm, Hm) * 1.3, cz - Hm * 0.4); sun.target.position.set(cx, 0, cz); sun.castShadow = true;
  const sc = Math.max(Wm, Hm) * 0.75; Object.assign(sun.shadow.camera, { left: -sc, right: sc, top: sc, bottom: -sc }); sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0005; scene.add(sun, sun.target);
  // pavimento esterno
  const base = new THREE.Mesh(new THREE.PlaneGeometry(Wm * 1.6, Hm * 1.6), new THREE.MeshStandardMaterial({ color: "#efe6d6" })); base.rotation.x = -Math.PI / 2; base.position.set(cx, -0.01, cz); base.receiveShadow = true; scene.add(base);
  // pavimenti delle stanze
  const tinte = { legno: "#d9bb8c", piastrelle: "#ece6dc", esterno: "#cfc6b4" };
  for (const st of p.stanze || []) { const sh = new THREE.Shape(st.poly.map(([x, y]) => new THREE.Vector2(x * s, y * s)));
    const m = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshStandardMaterial({ color: tinte[RN_TIPI[st.tipo]?.pav || "legno"], roughness: 0.8, side: THREE.DoubleSide }));
    m.rotation.x = Math.PI / 2; m.position.y = 0.002; m.receiveShadow = true; scene.add(m); }
  // muri: celle della maschera unite in rettangoli (greedy), estrusi a 2,7 m; testa dei muri bordeaux (sezione)
  const cell = Math.max(1, Math.round(0.05 / s)), gw = Math.ceil(p.W / cell), gh = Math.ceil(p.H / cell), G = new Uint8Array(gw * gh);
  const MM3 = rnMaschera(p); for (let y = 0; y < p.H; y++) for (let x = 0; x < p.W; x++) if (MM3[y * p.W + x]) G[((y / cell) | 0) * gw + ((x / cell) | 0)]++;
  const soglia = cell * cell * 0.35; for (let i = 0; i < G.length; i++) G[i] = G[i] > soglia ? 1 : 0;
  const rects = [], usato = new Uint8Array(gw * gh);
  for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) { if (!G[y * gw + x] || usato[y * gw + x]) continue;
    let x2 = x; while (x2 + 1 < gw && G[y * gw + x2 + 1] && !usato[y * gw + x2 + 1]) x2++;
    let y2 = y; outer: while (y2 + 1 < gh) { for (let i = x; i <= x2; i++) if (!G[(y2 + 1) * gw + i] || usato[(y2 + 1) * gw + i]) break outer; y2++; }
    for (let j = y; j <= y2; j++) for (let i = x; i <= x2; i++) usato[j * gw + i] = 1; rects.push([x, y, x2, y2]); }
  const HW = RN_STILI3D[stile]?.[1] || 1.3, mats = [0, 1, 2, 3, 4, 5].map(i => new THREE.MeshStandardMaterial({ color: i === 2 ? "#6a1828" : "#fbf7f0", roughness: 0.9 }));
  // finestre: nei tratti segnati il muro diventa davanzale (90 cm) + vetro + architrave
  const FIN = (p.finestre || []).map(f => f.seg), inFin = (x, y) => { const px = (x + 0.5) * cell, py = (y + 0.5) * cell;
    return FIN.some(([x0, y0, x1, y1]) => { const oriz = Math.abs(x1 - x0) >= Math.abs(y1 - y0), t = 0.45 / s;
      return oriz ? px >= Math.min(x0, x1) && px <= Math.max(x0, x1) && Math.abs(py - y0) <= t : py >= Math.min(y0, y1) && py <= Math.max(y0, y1) && Math.abs(px - x0) <= t; }); };
  const pieni = [], fin = []; rects.forEach(r => { const [x, y, x2, y2] = r, mx = (x + x2) >> 1, my = (y + y2) >> 1; (FIN.length && inFin(mx, my) ? fin : pieni).push(r); });
  const box = new THREE.BoxGeometry(1, 1, 1), M = new THREE.Matrix4(), a = cell * s;
  const blocchi = (L, y0, y1, mt) => { if (!L.length || y1 <= y0) return; const im = new THREE.InstancedMesh(box, mt, L.length);
    L.forEach(([x, y, x2, y2], i) => { M.compose(new THREE.Vector3((x + x2 + 1) / 2 * a, (y0 + y1) / 2, (y + y2 + 1) / 2 * a), new THREE.Quaternion(), new THREE.Vector3((x2 - x + 1) * a, y1 - y0, (y2 - y + 1) * a)); im.setMatrixAt(i, M); });
    im.castShadow = true; im.receiveShadow = true; scene.add(im); };
  blocchi(pieni, 0, HW, mats);
  if (fin.length) { const hDav = Math.min(0.9, HW * 0.45); blocchi(fin, 0, hDav, mats);
    if (HW > 2.2) blocchi(fin, 2.2, HW, mats);
    const vetro = new THREE.MeshStandardMaterial({ color: "#9fc3d1", transparent: true, opacity: 0.45, roughness: 0.1 });
    const im = new THREE.InstancedMesh(box, vetro, fin.length); fin.forEach(([x, y, x2, y2], i) => { const top = Math.min(HW, 2.2), wx = (x2 - x + 1) * a, wz = (y2 - y + 1) * a;
      M.compose(new THREE.Vector3((x + x2 + 1) / 2 * a, (hDav + top) / 2, (y + y2 + 1) / 2 * a), new THREE.Quaternion(), new THREE.Vector3(wx > wz ? wx : 0.03, top - hDav, wx > wz ? 0.03 : wz)); im.setMatrixAt(i, M); }); scene.add(im); }
  // mobili: volumi semplici
  const mat = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.75 });
  const MB = { divano: [0.42, "#e6d5ba"], poltrona: [0.42, "#e6d5ba"], tavolino: [0.4, "#c9a77a"], tv: [0.5, "#e9dcc6"], tavolo6: [0.75, "#c9a77a"], tavolo4: [0.75, "#c9a77a"], tappeto: [0.01, "#d8c08a"],
    cucinaL: [0.9, "#f1e6d6"], cucinaC: [0.9, "#f1e6d6"], frigo: [1.85, "#f4efe8"], letto2: [0.5, "#fbf6ee"], letto1: [0.5, "#fbf6ee"], comodino: [0.5, "#c9a77a"], armadio: [2.2, "#efe3cf"], armadio1: [2.2, "#efe3cf"],
    scrivania: [0.75, "#c9a77a"], libreria: [1.9, "#e2d2b8"], wc: [0.4, "#ffffff"], bidet: [0.4, "#ffffff"], lavabo: [0.85, "#ffffff"], doccia: [0.05, "#dfe8ea"], vasca: [0.55, "#ffffff"], consolle: [0.8, "#c9a77a"], esterno: [0.72, "#c9a77a"], pianta: [0.9, "#7f9a6a"] };
  for (const m of p.mobili || []) { const [w0, d0] = rnDim(m), [hh, col] = MB[m.tipo] || [0.5, "#eee"], dxL = m.lato === "dx";
    const g = new THREE.Group(); g.position.set(m.x * s, 0, m.y * s); g.rotation.y = -m.rot * Math.PI / 180;
    const add = (w, h, d, x, y, z, c) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c)); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; g.add(o); };
    if (m.tipo === "divano" && m.v === "angolare") { const a = 0.92, xa = dxL ? w0 / 2 - a / 2 : -w0 / 2 + a / 2; add(w0, 0.42, a, 0, 0.21, -d0 / 2 + a / 2, col); add(a, 0.42, d0, xa, 0.21, 0, col); add(w0, 0.38, 0.2, 0, 0.6, -d0 / 2 + 0.1, "#dccaa9"); add(0.2, 0.38, d0, dxL ? w0 / 2 - 0.1 : -w0 / 2 + 0.1, 0.6, 0, "#dccaa9"); }
    else if (m.tipo.startsWith("cucina") && m.v === "angolare") { const a = 0.62; add(w0, 0.9, a, 0, 0.45, -d0 / 2 + a / 2, col); add(a, 0.9, d0, dxL ? w0 / 2 - a / 2 : -w0 / 2 + a / 2, 0.45, 0, col); add(w0, 0.7, 0.35, 0, 1.85, -d0 / 2 + 0.18, "#efe3cf"); }
    else if (m.tipo.startsWith("cucina") && m.v === "isola") { const a = 0.62, iw = Math.min(w0 * 0.7, 2.2); add(w0, 0.9, a, 0, 0.45, -d0 / 2 + a / 2, col); add(iw, 0.92, 0.9, 0, 0.46, d0 / 2 - 0.45, "#e8d9c2"); add(w0, 0.7, 0.35, 0, 1.85, -d0 / 2 + 0.18, "#efe3cf"); }
    else if (m.v === "tondo" && (m.tipo.startsWith("tavolo") || m.tipo === "tavolino")) { const t = new THREE.Mesh(new THREE.CylinderGeometry(w0 / 2, w0 / 2, 0.05, 40), mat(col)); t.position.y = hh; t.castShadow = true; g.add(t); add(0.08, hh, 0.08, 0, hh / 2, 0, "#8a6a4a"); }
    else if (m.tipo === "divano" || m.tipo === "poltrona") { add(w0, 0.42, d0, 0, 0.21, 0, col); add(w0, 0.38, 0.2, 0, 0.6, -d0 / 2 + 0.1, "#dccaa9"); }
    else if (m.tipo.startsWith("letto")) { add(w0, 0.3, d0, 0, 0.15, 0, "#b88a5e"); add(w0 - 0.04, 0.2, d0 - 0.06, 0, 0.4, 0.02, "#fbf6ee"); add(w0, 0.08, d0 * 0.58, 0, 0.52, d0 * 0.21, "#6a1828"); add(w0, 0.9, 0.08, 0, 0.45, -d0 / 2, "#b88a5e"); }
    else if (m.tipo.startsWith("tavolo") || m.tipo === "scrivania" || m.tipo === "esterno") { add(w0, 0.05, d0, 0, hh, 0, col); for (const [a, b] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) add(0.05, hh, 0.05, a * (w0 / 2 - 0.06), hh / 2, b * (d0 / 2 - 0.06), "#8a6a4a"); }
    else if (m.tipo === "pianta") { add(0.3, 0.35, 0.3, 0, 0.17, 0, "#c9a24b"); const f = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), mat(col)); f.position.y = 0.7; f.castShadow = true; g.add(f); }
    else add(w0, hh, d0, 0, hh / 2, 0, col);
    scene.add(g); }
  let vivo = true; const loop = () => { if (!vivo || !document.body.contains(ren.domElement)) { ren.dispose(); return; } ctl.update(); ren.render(scene, cam); requestAnimationFrame(loop); }; loop();
  return { foto: () => { ren.render(scene, cam); return ren.domElement.toDataURL("image/png"); }, stop: () => { vivo = false; } };
}

/* ============ risultato: 2D, 3D, download, PDF ============ */
async function rnRisultato() {
  const p = RS.p, box = $("#rnris");
  if (!p.scala || !p.stanze?.length) { box.innerHTML = `<p class="note">Mancano le stanze o la misura.</p>`; return; }
  if (!p.mobili) { p.mobili = []; for (const st of p.stanze) for (const m of rnArreda(st, p.scala)) p.mobili.push({ ...m, st: st.id }); }
  const svg = rnSvg(p), mq = p.stanze.reduce((x, st) => x + RN.area(st.poly), 0) * p.scala * p.scala;
  rnGuida(`<b>Ecco la pianta arredata e il 3D.</b> Gira il 3D con il dito, poi scegli cosa farne.`);
  box.innerHTML = `<h2>Pianta arredata</h2><div class="rn2d">${svg}</div>
    ${(p.lavori || []).length ? `<h2>Lavori <small>in giallo si demolisce, in rosso si costruisce</small></h2><div class="rn2d">${rnSvg({ ...p, mobili: [] }, { lavori: true })}</div>` : ""}
    <h2>Vista 3D <small>trascina per girare, due dita per lo zoom</small></h2>
    <div class="chips">${Object.entries(RN_STILI3D).map(([k, v]) => `<button class="chip ${(RN_STILI3D[p.stile3d] ? p.stile3d : "maison") === k ? "on" : ""}" data-rn3s="${k}">${v[0]}</button>`).join("")}</div>
    <div class="rn3d" id="rn3d"><div class="spin"></div></div>
    <div class="rntab">${p.stanze.map(st => `<span>${esc(RN_TIPI[st.tipo]?.n || "")}<b>${num(RN.area(st.poly) * p.scala * p.scala, 1)} m²</b></span>`).join("")}<span class="tot">Totale calpestabile<b>${num(mq, 1)} m²</b></span></div>
    <div class="btns"><button class="btn pri" data-rnpdf>PDF del rendering</button><button class="btn sec" data-rnall>Metti nel PDF della valutazione</button></div>
    <div class="btns"><button class="btn sec" data-rnpng2>Scarica la pianta (PNG)</button><button class="btn sec" data-rnpng3>Scarica il 3D (PNG)</button></div>
    <p class="note" id="rnmsg"></p>`;
  let V3 = null;
  box.querySelectorAll("[data-rn3s]").forEach(b => b.addEventListener("click", async () => { p.stile3d = b.dataset.rn3s; rnSalva(); box.querySelectorAll("[data-rn3s]").forEach(c => c.classList.toggle("on", c === b)); V3?.stop(); V3 = await rn3D($("#rn3d"), p, p.stile3d); }));
  try { V3 = await rn3D($("#rn3d"), p, p.stile3d || "maison"); } catch (e) { $("#rn3d").innerHTML = `<p class="note">Il 3D non si è caricato (${esc(e.message || e)}). La pianta 2D funziona lo stesso.</p>`; }
  const scarica = (url, nome) => { const a = document.createElement("a"); a.href = url; a.download = nome; document.body.appendChild(a); a.click(); a.remove(); };
  const imgs = async () => ({ p2: await rnPng(p), p3: V3 ? V3.foto() : null, p4: (p.lavori || []).length ? await rnPng({ ...p, mobili: [] }, 1800, { lavori: true }) : null });
  // miniatura per l'elenco
  rnPng(p, 360).then(t => { p.thumb = t; rnSalva(); }).catch(() => {});
  box.querySelector("[data-rnpng2]").addEventListener("click", async () => scarica(await rnPng(p, 2400), `pianta-${p.nome}.png`));
  box.querySelector("[data-rnpng3]").addEventListener("click", () => V3 && scarica(V3.foto(), `3d-${p.nome}.png`));
  box.querySelector("[data-rnpdf]").addEventListener("click", async () => { const I = await imgs(); pdfApri(rnPdfHtml(p, I.p2, I.p3, I.p4)); });
  box.querySelector("[data-rnall]").addEventListener("click", async () => { const I = await imgs();
    const all = { id: p.id, nome: p.nome, p2: I.p2, p3: I.p3, p4: I.p4, fz: p.fzAss ? p.fzPiani : null, stanze: p.stanze.map(st => [RN_TIPI[st.tipo]?.n || "", Math.round(RN.area(st.poly) * p.scala * p.scala * 10) / 10]) };
    await RNDB.kvSet("allegato", all); window.__RENDER_ALL = all;
    $("#rnmsg").innerHTML = `Fatto: il prossimo PDF di valutazione avrà la pagina con la pianta arredata e il 3D di <b>${esc(p.nome)}</b>. Lo togli dalla pagina Rendering.`; });
}
// pagina (o pagine) per il PDF: usata da sola e dentro la valutazione
function rnPagina(all, C) {
  C = C || { bx: "#6a1828", oro: "#c9a24b" };
  const tab = (all.stanze || []).map(([n, m]) => `<tr><td>${esc(n)}</td><td style="text-align:right">${num(m, 1)} m²</td></tr>`).join("");
  const tot = (all.stanze || []).reduce((x, s) => x + s[1], 0);
  return `<section class="pg rnpg" style="page-break-before:always;padding:14mm 14mm 10mm">
    <div style="font-family:Georgia,serif;font-size:20pt;color:${C.bx};margin-bottom:2mm">Planimetria arredata</div>
    <div style="font-size:9pt;color:#7a6c66;margin-bottom:5mm">${esc(all.nome)} · proposta di arredo indicativa, misure dalla planimetria</div>
    <img src="${all.p2}" style="width:100%;max-height:150mm;object-fit:contain;border:0.3mm solid #ead9c2;border-radius:2mm;background:#fffdf9">
    <div style="display:flex;gap:6mm;margin-top:5mm;align-items:flex-start">
      ${all.p3 ? `<img src="${all.p3}" style="width:62%;border-radius:2mm;border:0.3mm solid #ead9c2">` : ""}
      <table style="flex:1;font-size:9pt;border-collapse:collapse;width:100%">${tab}<tr><td style="border-top:0.3mm solid ${C.oro};padding-top:1mm"><b>Totale calpestabile</b></td><td style="text-align:right;border-top:0.3mm solid ${C.oro};padding-top:1mm"><b>${num(tot, 1)} m²</b></td></tr></table></div>
  </section>${all.p4 ? `<section class="pg rnpg" style="page-break-before:always;padding:14mm 14mm 10mm">
    <div style="font-family:Georgia,serif;font-size:20pt;color:${C.bx};margin-bottom:2mm">Lavori previsti</div>
    <div style="font-size:9pt;color:#7a6c66;margin-bottom:5mm">In giallo le demolizioni, in rosso le nuove costruzioni. Schema indicativo, da sviluppare con un tecnico.</div>
    <img src="${all.p4}" style="width:100%;max-height:200mm;object-fit:contain;border:0.3mm solid #ead9c2;border-radius:2mm;background:#fffdf9"></section>` : ""}`;
}
function rnPdfHtml(p, p2, p3, p4) {
  const all = { nome: p.nome, p2, p3, p4, fz: p.fzAss ? p.fzPiani : null, stanze: p.stanze.map(st => [RN_TIPI[st.tipo]?.n || "", Math.round(RN.area(st.poly) * p.scala * p.scala * 10) / 10]) };
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><title>Rendering · ${esc(p.nome)} · Maison Collection</title>
  <style>@page{size:A4;margin:0}body{margin:0;font-family:Helvetica,Arial,sans-serif;color:#2a1418}.pg{width:210mm;min-height:297mm;box-sizing:border-box}
  .top{display:flex;justify-content:space-between;align-items:center;padding:10mm 14mm 0;color:#6a1828;font-family:Georgia,serif;letter-spacing:.15em;font-size:10pt}
  @media print{.noprint{display:none}}</style></head><body>
  <div class="top"><span>MAISON COLLECTION</span><span style="font-size:8pt;color:#8a6414">${new Date().toLocaleDateString("it-IT")}</span></div>
  ${rnPagina(all).replace("page-break-before:always;", "")}
  <div class="noprint" style="position:fixed;bottom:12px;right:12px"><button onclick="print()" style="padding:10px 16px;font-size:15px;background:#6a1828;color:#fff;border:0;border-radius:10px">Stampa / Salva PDF</button></div>
  </body></html>`;
}

/* registrazione della vista */
if (typeof TERR_VIEWS !== "undefined") TERR_VIEWS.rendering = [vRendering, afterRendering];
