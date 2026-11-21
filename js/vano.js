/* KEYSTONE — Frazionamento con ingresso unico: il vano comune lo ricavo io, il più piccolo possibile.
   Dall'ingresso di casa traccio un corridoio largo 1,10 m che costeggia i muri fino alla stanza dell'altra unità
   (meglio dove c'è già una porta). Il corridoio viene chiuso da muri nuovi: da una parte si entra in un'unità, dall'altra nell'altra.
   La stanza intera come vano comune resta solo se la scegli tu ("Vano comune") o se non c'è altro modo. */
const FZ_CORR = 1.1;   // larghezza netta del corridoio comune (m)

function fzRaster(poly, W, H) {
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#000";
  g.beginPath(); poly.forEach(([x, y], j) => j ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill();
  const d = g.getImageData(0, 0, W, H).data, m = new Uint8Array(W * H); for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] > 127 ? 1 : 0; return m;
}
function fzPuntoBordo(q, P) { let best = null, bd = Infinity;
  for (let e = 0; e < P.length; e++) { const a = P[e], b = P[(e + 1) % P.length], dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / (dx * dx + dy * dy || 1))), x = a[0] + dx * t, y = a[1] + dy * t, d = Math.hypot(q[0] - x, q[1] - y);
    if (d < bd) { const L = Math.hypot(dx, dy) || 1; bd = d; best = [x, y, dx / L, dy / L]; } } return best; }

// corridoi possibili dentro la stanza dell'ingresso, uno per ogni stanza confinante da raggiungere
function fzCorridoi(p, st, vi, E) {
  const s = p.scala, R = st[vi], W = p.W, H = p.H, hw = FZ_CORR / 2 / s, g = Math.max(1, 0.1 / s), A = fzAdiacenze(st, s), PT = fzPorte(st, A, s);
  const bb = RN.bbox(R.poly), nx = Math.floor((bb.x1 - bb.x0) / g) + 1, ny = Math.floor((bb.y1 - bb.y0) / g) + 1, N = nx * ny;
  const X = i => bb.x0 + (i % nx) * g, Y = i => bb.y0 + Math.floor(i / nx) * g, dB = new Float32Array(N).fill(-1);
  for (let i = 0; i < N; i++) { const q = [X(i), Y(i)]; if (RN.dentro(q, R.poly)) dB[i] = RN.distBordo(q, R.poly); }
  const ok = i => dB[i] >= hw * 0.97;
  let start = -1, sd = Infinity; for (let i = 0; i < N; i++) if (ok(i)) { const d = Math.hypot(X(i) - E[0], Y(i) - E[1]); if (d < sd) { sd = d; start = i; } }
  if (start < 0) return [];
  const Rm = fzRaster(R.poly, W, H), out = [], DIR = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (const j of A[vi]) { if (j === vi) continue; const T = st[j];
    const dove = PT.dove[Math.min(vi, j) + "-" + Math.max(vi, j)] || [], Dp = dove.length ? [dove.reduce((a, d) => a + d[0], 0) / dove.length, dove.reduce((a, d) => a + d[1], 0) / dove.length] : null;
    const meta = (i, conPorta) => { if (!ok(i) || dB[i] > hw + 1.6 * g) return false; const nb = fzPuntoBordo([X(i), Y(i)], R.poly), lp = 0.45 / s;
      // il muro in comune con l'altra stanza deve essere lungo almeno una porta (90 cm) davanti al corridoio
      if ([0, -1, 1].some(k => RN.distBordo([nb[0] + nb[2] * lp * k, nb[1] + nb[3] * lp * k], T.poly) > 0.5 / s)) return false;
      return !conPorta || Math.hypot(nb[0] - conPorta[0], nb[1] - conPorta[1]) < 0.3 / s; };
    let goals = new Set(), allaPorta = !!Dp; for (let i = 0; i < N; i++) if (meta(i, Dp)) goals.add(i);
    if (!goals.size && Dp) { allaPorta = false; for (let i = 0; i < N; i++) if (meta(i, null)) goals.add(i); }
    if (!goals.size) continue;
    // cammino più corto che costeggia i muri, con poche curve
    const dist = new Float64Array(N * 4).fill(Infinity), prev = new Int32Array(N * 4).fill(-1), coda = [];
    for (let d = 0; d < 4; d++) { dist[start * 4 + d] = 0; coda.push([0, start * 4 + d]); }
    let fine = -1;
    while (coda.length) { let bi = 0; for (let k = 1; k < coda.length; k++) if (coda[k][0] < coda[bi][0]) bi = k; const [c, sid] = coda[bi]; coda[bi] = coda[coda.length - 1]; coda.pop();
      if (c > dist[sid]) continue; const i = sid >> 2, d0 = sid & 3; if (goals.has(i)) { fine = sid; break; }
      const ix = i % nx, iy = Math.floor(i / nx);
      for (let d = 0; d < 4; d++) { const jx = ix + DIR[d][0], jy = iy + DIR[d][1]; if (jx < 0 || jy < 0 || jx >= nx || jy >= ny) continue; const k = jy * nx + jx; if (!ok(k)) continue;
        const costo = 1 + 1.2 * Math.min(1, (dB[k] - hw) / (0.6 / s)) + (d !== d0 && i !== start ? 5 : 0), nk = k * 4 + d;
        if (c + costo < dist[nk]) { dist[nk] = c + costo; prev[nk] = sid; coda.push([c + costo, nk]); } } }
    if (fine < 0) continue;
    const path = []; for (let sid = fine; sid >= 0; sid = prev[sid]) path.push(sid >> 2);
    // corridoio: quadrati lungo il cammino, e alle due estremità fino al muro
    const Cm = new Uint8Array(W * H), quadro = (x0, y0, x1, y1) => { for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(H - 1, Math.ceil(y1)); y++) for (let x = Math.max(0, Math.floor(x0)); x <= Math.min(W - 1, Math.ceil(x1)); x++) if (Rm[y * W + x]) Cm[y * W + x] = 1; };
    for (const i of path) quadro(X(i) - hw, Y(i) - hw, X(i) + hw, Y(i) + hw);
    for (const i of [path[0], path[path.length - 1]]) { const c = [X(i), Y(i)], nb = fzPuntoBordo(c, R.poly), ex = 0.06 / s;
      if (Math.abs(nb[0] - c[0]) > Math.abs(nb[1] - c[1])) quadro(Math.min(c[0], nb[0]) - ex, c[1] - hw, Math.max(c[0], nb[0]) + ex, c[1] + hw); else quadro(c[0] - hw, Math.min(c[1], nb[1]) - ex, c[0] + hw, Math.max(c[1], nb[1]) + ex); }
    // la porta che c'è già verso l'altra unità resta tutta nel corridoio
    if (allaPorta) { const xs = dove.map(d => d[0]), ys = dove.map(d => d[1]), ex = 0.12 / s, dd = 2 * hw;
      if (Math.max(...ys) - Math.min(...ys) >= Math.max(...xs) - Math.min(...xs)) { const x = (Math.min(...xs) + Math.max(...xs)) / 2, lato = X(path[0]) < x ? -1 : 1, gi = path[0]; quadro(Math.min(x, x + lato * dd), Math.min(...ys) - ex, Math.max(x, x + lato * dd), Math.max(...ys) + ex); }
      else { const y = (Math.min(...ys) + Math.max(...ys)) / 2, lato = Y(path[0]) < y ? -1 : 1; quadro(Math.min(...xs) - ex, Math.min(y, y + lato * dd), Math.max(...xs) + ex, Math.max(y, y + lato * dd)); } }
    // muri nuovi tra corridoio e resto della stanza (10 cm), resto della stanza diviso in parti
    const wt = Math.max(1, Math.round(0.1 / s)), dil = RN.dilata(Cm, W, H, wt), resto = new Uint8Array(W * H);
    for (let i = 0; i < resto.length; i++) resto[i] = Rm[i] && !dil[i] ? 1 : 0;
    const parti = [], vis = new Uint8Array(W * H), minPx = 0.6 / (s * s);
    for (let y = Math.floor(bb.y0); y <= Math.ceil(bb.y1); y++) for (let x = Math.floor(bb.x0); x <= Math.ceil(bb.x1); x++) { const i0 = y * W + x; if (x < 0 || y < 0 || x >= W || y >= H || !resto[i0] || vis[i0]) continue;
      const reg = new Uint8Array(W * H), stk = [i0]; vis[i0] = 1; let n = 0;
      while (stk.length) { const i = stk.pop(); reg[i] = 1; n++; const x1 = i % W; for (const k of [i - 1, i + 1, i - W, i + W]) { if (k < 0 || k >= W * H || vis[k] || !resto[k] || (k === i - 1 && x1 === 0) || (k === i + 1 && x1 === W - 1)) continue; vis[k] = 1; stk.push(k); } }
      if (n >= minPx) parti.push({ reg, n }); }
    if (!parti.length) continue;
    const cPoly = RN.contorno(Cm, W, H); if (cPoly.length < 4) continue;
    // muri nuovi come rettangoli: la fascia di 10 cm tra il corridoio e il resto della stanza
    const muri = [], aperti = new Map();
    for (let y = Math.max(0, Math.floor(bb.y0)); y <= Math.min(H - 1, Math.ceil(bb.y1)); y++) { const runs = []; let x0 = -1;
      for (let x = Math.max(0, Math.floor(bb.x0) - 1); x <= Math.min(W - 1, Math.ceil(bb.x1) + 1); x++) { const i = y * W + x, w = dil[i] && Rm[i] && !Cm[i]; if (w && x0 < 0) x0 = x; if (!w && x0 >= 0) { runs.push(x0 + ":" + (x - 1)); x0 = -1; } }
      if (x0 >= 0) runs.push(x0 + ":" + Math.min(W - 1, Math.ceil(bb.x1) + 1));
      const nuovi = new Map(); for (const k of runs) { const r = aperti.get(k); if (r) { r[3] = y; nuovi.set(k, r); } else { const [u, v] = k.split(":").map(Number), q = [u, y, v, y]; muri.push(q); nuovi.set(k, q); } }
      aperti.clear(); nuovi.forEach((v, k) => aperti.set(k, v)); }
    if (!muri.length) continue;
    parti.sort((u, v) => v.n - u.n);
    const nuove = parti.map((pt, k) => { const poly = RN.contorno(pt.reg, W, H), mq = pt.n * s * s;
      return k === 0 ? { ...R, poly, seed: rnSeme(poly) || R.seed } : { id: R.id + "r" + k, poly, tipo: mq < 4 ? "ripostiglio" : "altro", fin: 0, seed: rnSeme(poly) }; }).filter(r => r.poly.length >= 3);
    const corr = { id: R.id + "v", poly: cPoly, tipo: "ingresso", fin: 0, seed: rnSeme(cPoly) }, mq = Cm.reduce((a, v) => a + v, 0) * s * s;
    if (out.some(c => Math.abs(c.mq - mq) < 0.3 && c.verso !== j && c.firma === path[path.length - 1])) continue;
    out.push({ stanze: st.flatMap((r, i) => i === vi ? [corr, ...nuove] : [r]), muri, vanoId: corr.id, mq, verso: j, firma: path[path.length - 1] });
  }
  return out;
}

/* ---- muri del vano: separati dai muri disegnati a mano, così si possono rifare ---- */
fzApplicaMuri = function (p) { const sp = p.scala ? 0.1 / p.scala : 6;
  (p.fzMuri || []).forEach(seg => fzMuroInMaschera(RS.muri, p.W, p.H, seg, sp)); RS.muriNoV = RS.muri.slice();
  (p.fzMuriV || []).forEach(r => fzRettInMaschera(RS.muri, p.W, p.H, r)); };
function fzRettInMaschera(m, W, H, [x0, y0, x1, y1]) { for (let y = Math.max(0, y0); y <= Math.min(H - 1, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(W - 1, x1); x++) m[y * W + x] = 1; }
function fzVanoReset(p) {
  if (p.fzStanzeBase) { p.stanze = p.fzStanzeBase; delete p.fzStanzeBase; }
  p.stanze.forEach(st => { if (st.tipo0) st.tipo = st.tipo0; });
  if ((p.fzMuriV || []).length && RS.muriNoV) RS.muri = RS.muriNoV.slice();
  p.fzMuriV = []; RS.fzMuriPng = null;
}
{ const prop0 = fzProponi; fzProponi = function (p) {
  fzVanoReset(p);
  if (p.fzTipoIng !== "comune" || !(p.fzIng || []).length || !p.scala) return prop0(p);
  const s = p.scala, st = p.stanze, E = [p.fzIng[0].x, p.fzIng[0].y], vi = p.fzVano ? st.findIndex(r => r.id === p.fzVano) : fzStanzaDi(E, st);
  if (vi < 0 || p.fzVanoScelto || fzMq(st[vi], s) < 6) return prop0(p);
  if (!RS.muriNoV) RS.muriNoV = RS.muri.slice();
  let cands = []; try { cands = fzCorridoi(p, st, vi, E); } catch (e) { console.warn(e); }
  const tutte = [];
  for (const c of cands) { const mu = RS.muri, ss = p.stanze, vv = p.fzVano; RS.muri = mu.slice(); c.muri.forEach(r => fzRettInMaschera(RS.muri, p.W, p.H, r)); p.stanze = c.stanze; p.fzVano = c.vanoId;
    try { const r = prop0(p); (r.sol || []).forEach(x => { x.geo = c; x.pen += c.mq * 2; tutte.push(x); }); } catch (e) { console.warn(e); } finally { RS.muri = mu; p.stanze = ss; p.fzVano = vv; } }
  const intera = prop0(p); (intera.sol || []).forEach(x => { x.pen += 30; tutte.push(x); });
  if (!tutte.length) return intera.errore ? intera : { errore: "Non trovo un modo di dividere: aggiungi un muro o segna l'ingresso in un'altra stanza." };
  tutte.sort((a, b) => a.pen - b.pen);
  const viste = new Set(), out = []; for (const x of tutte) { const k = (x.geo ? x.geo.verso + ":" + x.geo.mq.toFixed(1) : "intera") + "|" + x.ass.join(","); if (viste.has(k)) continue; viste.add(k); out.push(x); if (out.length >= 4) break; }
  return { sol: out };
}; }
{ const ap0 = fzApplica; fzApplica = function (p, best) {
  fzVanoReset(p);
  if (best.geo) { p.fzStanzeBase = p.stanze; p.stanze = best.geo.stanze.map(r => ({ ...r })); p.fzMuriV = best.geo.muri.slice(); p.fzMuriV.forEach(r => fzRettInMaschera(RS.muri, p.W, p.H, r)); }
  return ap0(p, best); }; }
// miniatura: con la geometria del corridoio e i suoi muri
{ const mini0 = fzMini; fzMini = function (p, x) { if (!x.geo) { if ((p.fzMuriV || []).length) { const q = { ...p, stanze: p.fzStanzeBase || p.stanze }; return mini0(q, x); } return mini0(p, x); }
  const q = { ...p, stanze: x.geo.stanze }, sv = mini0(q, x);
  return sv.replace(/<\/svg>$/, x.geo.muri.map(([a, b, c, d]) => `<rect x="${a}" y="${b}" width="${c - a + 1}" height="${d - b + 1}" fill="#2e161c"/>`).join("") + "</svg>"); }; }
// la stanza intera come vano solo se la scegli tu; il muro disegnato a mano vale anche per i calcoli senza vano
{ const toc = rnTocco; rnTocco = function (q) { const p = RS.p; if (!p || RS.fase !== "fraz") return toc(q); const mode = RS.fzModo || "ingresso", nm = (p.fzMuri || []).length;
  const r = toc(q);
  if (mode === "vano") { p.fzVanoScelto = true; rnSalva(); }
  if (mode === "ingresso" && p.fzTipoIng === "comune") { p.fzVanoScelto = false; if (RS.fzModo === "vano") { RS.fzModo = "ingresso"; rnPannello(); } rnSalva(); }
  if ((p.fzMuri || []).length > nm && RS.muriNoV) fzMuroInMaschera(RS.muriNoV, p.W, p.H, p.fzMuri[p.fzMuri.length - 1], 0.1 / p.scala);
  return r; }; }
{ const pan = rnPannello; rnPannello = function () { const r = pan(); const p = RS.p, el = $("#rnpan"); if (RS.fase !== "fraz" || !el || !p || p.fzTipoIng !== "comune") return r;
  const msg = el.querySelector("#fzmsg"); if (msg && !msg.innerHTML) msg.innerHTML = p.fzVanoScelto ? `Vano comune: <b>la stanza che hai scelto</b>. Per farlo ricavare a me più piccolo possibile, ritocca l'ingresso.` : `Il vano comune lo ricavo io: un corridoio di ${num(FZ_CORR, 2)} m, il più piccolo possibile, con i muri nuovi. Se vuoi usare una stanza intera, scegli "Vano comune" e toccala.`;
  el.querySelector("[data-fzreset]")?.addEventListener("click", () => { fzVanoReset(RS.p); rnSalva(); rnDisegna(); rnPannello(); });
  return r; }; }
// porte tra stanze: c'è una porta solo dove tra le due stanze il passaggio è libero per tutto lo spessore del muro.
// I muri disegnati a doppia linea (vuoti dentro) non sono porte: chiudo i vuoti fino a ~40 cm, le porte (70 cm e più) restano aperte.
fzPorte = function (stanze, A, s) {
  const p = RS.p, W = p.W, H = p.H, m0 = RS.muri, P = new Set(); P.dove = {};
  const r = Math.max(2, Math.round(0.2 / s)), dil = RN.dilata(m0, W, H, r), inv = new Uint8Array(m0.length); for (let i = 0; i < m0.length; i++) inv[i] = dil[i] ? 0 : 1;
  const er = RN.dilata(inv, W, H, r), m = new Uint8Array(m0.length); for (let i = 0; i < m0.length; i++) m[i] = m0[i] || !er[i] ? 1 : 0;
  const libero = (a, b) => { for (const t of [0.2, 0.35, 0.5, 0.65, 0.8]) { const x = Math.round(a[0] + (b[0] - a[0]) * t), y = Math.round(a[1] + (b[1] - a[1]) * t); if (x < 0 || y < 0 || x >= W || y >= H || m[y * W + x]) return false; } return true; };
  for (let i = 0; i < stanze.length; i++) for (const j of A[i]) { if (j < i) continue; const Pi = stanze[i].poly, Pj = stanze[j].poly; let run = 0, varco = false;
    for (let e = 0; e < Pi.length && !varco; e++) { const a = Pi[e], b = Pi[(e + 1) % Pi.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(2, Math.ceil(L / (0.1 / s))), tx = (b[0] - a[0]) / (L || 1), ty = (b[1] - a[1]) / (L || 1);
      run = 0;
      for (let k = 0; k <= n; k++) { const q = [a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], nb = fzPuntoBordo(q, Pj), d = Math.hypot(nb[0] - q[0], nb[1] - q[1]);
        // passaggio quasi perpendicolare al muro, non in diagonale su un angolo
        const perp = d < 1 || Math.abs(((nb[0] - q[0]) * tx + (nb[1] - q[1]) * ty) / d) < 0.35;
        if (d <= 0.45 / s && perp && libero(q, nb)) { run++; (P.dove[i + "-" + j] = P.dove[i + "-" + j] || []).push([Math.round((q[0] + nb[0]) / 2), Math.round((q[1] + nb[1]) / 2), q, nb]); if (run >= 3) varco = true; } else run = 0; } }
    if (varco) P.add(i + "-" + j); }
  return P;
};
