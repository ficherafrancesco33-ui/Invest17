/* KEYSTONE — Guscio e finestre
   - Guscio: nel risultato (2D e 3D) restano solo i muri dell'appartamento su cui si lavora; scale, vani scala e vicini spariscono.
   - Finestre: riconosciute da sole sui muri esterni (il simbolo della finestra ha più linee sottili del muro pieno),
     poi si correggono toccando il muro. Servono alle regole (luce 1/8) e al 3D (davanzale, vetro, architrave). */

// stanze disegnate in una maschera di pixel
function gsStanzeMaschera(p) {
  const c = document.createElement("canvas"); c.width = p.W; c.height = p.H; const g = c.getContext("2d"); g.fillStyle = "#000";
  for (const st of p.stanze || []) { g.beginPath(); st.poly.forEach(([x, y], j) => j ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill(); }
  const d = g.getImageData(0, 0, p.W, p.H).data, m = new Uint8Array(p.W * p.H); for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] > 0 ? 1 : 0; return m;
}
// guscio: i muri a meno di ~45 cm dalle stanze
{ const prev = rnMaschera; rnMaschera = function (p) { const m = prev(p); if (!p.scala || !(p.stanze || []).length) return m;
  const k = (p.stanze || []).map(st => st.id + st.poly.length + RN.area(st.poly).toFixed(0)).join("|") + (p.lavori || []).length + (p.fzChiudi || []).length + (p.fzApri || []).length + "s" + (p.spMuro || 0).toFixed(2) + "f" + (p.finestre || []).map(f => f.seg.map(Math.round).join(",")).join(";") + "m" + (p.muriPieni || []).length;
  if (RS.gsK === k && RS.gsM && RS.gsM.length === m.length) return RS.gsM;
  const T = Math.min(0.55, Math.max(0.15, p.spMuro || 0.35)), vic = RN.dilata(gsStanzeMaschera(p), p.W, p.H, Math.round((T + 0.06) / p.scala)), out = new Uint8Array(m.length);
  for (let i = 0; i < m.length; i++) out[i] = m[i] && vic[i] ? 1 : 0;
  // muri disegnati a doppia linea: riempio lo spazio tra le due linee (chiusura morfologica, fino a ~35 cm di spessore)
  const r = Math.max(2, Math.round(Math.min(0.33, Math.max(0.17, (p.spMuro || 0.3) / 2 + 0.03)) / p.scala)), dil = RN.dilata(out, p.W, p.H, r), inv = new Uint8Array(m.length);
  for (let i = 0; i < m.length; i++) inv[i] = dil[i] ? 0 : 1;
  const er = RN.dilata(inv, p.W, p.H, r), stanze = gsStanzeMaschera(p);
  for (let i = 0; i < m.length; i++) if (!er[i] && !stanze[i]) out[i] = 1;     // mai dentro le stanze
  // muri esterni disegnati vuoti (filo interno e filo esterno con il bianco in mezzo): li riempio fino al filo esterno misurato
  for (const [ax, ay, bx, by, nx, ny, dp] of p.muriPieni || []) { const L = Math.hypot(bx - ax, by - ay) || 1, tx = (bx - ax) / L, ty = (by - ay) / L;
    for (let a = -1; a <= L + 1; a += 0.7) for (let b = 0; b <= dp; b += 0.7) { const x = Math.round(ax + tx * a + nx * b), y = Math.round(ay + ty * a + ny * b); if (x >= 0 && y >= 0 && x < p.W && y < p.H && !stanze[y * p.W + x]) out[y * p.W + x] = 1; } }
  // angoli: chiudo le tacche rimaste tra muri pieni (solo fuori dalle stanze)
  if ((p.muriPieni || []).length) { const r = Math.round(0.26 / p.scala), d1 = RN.dilata(out, p.W, p.H, r), iv = new Uint8Array(out.length); for (let i = 0; i < out.length; i++) iv[i] = d1[i] ? 0 : 1;
    const e1 = RN.dilata(iv, p.W, p.H, r); for (let i = 0; i < out.length; i++) if (!e1[i] && !stanze[i]) out[i] = 1; }
  // dove ci sono finestre il muro si apre: la finestra la disegno io (niente blocchi pieni)
  for (const f of p.finestre || []) { const [x0, y0, x1, y1] = f.seg, L = Math.hypot(x1 - x0, y1 - y0) || 1, tx = (x1 - x0) / L, ty = (y1 - y0) / L, [nx, ny] = f.n || [-ty, tx], prof = 0.7 / p.scala;
    for (let a = 0; a <= L; a += 0.7) for (let b = -2; b <= prof; b += 0.7) { const x = Math.round(x0 + tx * a + nx * b), y = Math.round(y0 + ty * a + ny * b); if (x >= 0 && y >= 0 && x < p.W && y < p.H && !stanze[y * p.W + x]) out[y * p.W + x] = 0; } }
  RS.gsK = k; RS.gsM = out; return out; }; }

/* ---- riconoscimento delle finestre ---- */
function gsFinestre(p) {
  const s = p.scala; if (!s) return [];
  const M = RS.muri, W = p.W, H = p.H, dentroStanza = gsStanzeMaschera(p), passo = Math.max(1, 0.03 / s), Lmax = 1.3 / s, out = [], spessori = [], LATI = [], PIENI = []; let conTacche = false;
  for (const st of p.stanze || []) {
    if (["balcone", "terrazzo"].includes(st.tipo)) continue;
    const P = st.poly, cen = (() => { const b = RN.bbox(P); return [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2]; })();
    for (let e = 0; e < P.length; e++) {
      const a = P[e], b = P[(e + 1) % P.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L * s < 0.6) continue;
      const tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L; let nx = -ty, ny = tx;
      const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; if (RN.dentro([mid[0] + nx * 4, mid[1] + ny * 4], P)) { nx = -nx; ny = -ny; }
      const camp = [];
      for (let d = passo; d < L - passo; d += passo) {
        const q = [a[0] + tx * d, a[1] + ty * d]; let runs = 0, buio = false, bianco = 0, est = false, scuri = 0, ultimo = 0, k;
        for (k = 1; k < Lmax; k++) { const x = Math.round(q[0] + nx * k), y = Math.round(q[1] + ny * k); if (x < 0 || y < 0 || x >= W || y >= H) { est = true; break; }
          const i = y * W + x; if (dentroStanza[i] && runs > 0) { est = false; break; }      // dall'altra parte c'è un'altra stanza: muro interno
          if (M[i]) { if (!buio) runs++; buio = true; bianco = 0; scuri++; ultimo = k; } else { buio = false; if (runs) bianco++; if (runs && bianco * s > 0.55) { est = true; break; } } }
        if (k >= Lmax) est = !dentroStanza[Math.round(q[1] + ny * Lmax) * W + Math.round(q[0] + nx * Lmax)];
        camp.push({ q, runs, est, scuri, ultimo: ultimo * s });
      }
      const ext = camp.filter(c => c.est && c.runs); if (ext.length < 4) continue;
      // il muro "normale" di questo lato: numero di linee e spessore più frequenti
      const freq = {}; ext.forEach(c => { freq[c.runs] = (freq[c.runs] || 0) + 1; }); const moda = +Object.entries(freq).sort((x, y) => y[1] - x[1])[0][0];
      const medScuri = ext.map(c => c.scuri).sort((x, y) => x - y)[ext.length >> 1];
      const norm = ext.filter(c => c.runs === moda).map(c => c.ultimo).sort((x, y) => x - y), Tm = norm[norm.length >> 1] || 0.3;
      spessori.push(Tm);
      let run = [];
      const chiudi = () => { if (run.length) { const l = (run.length) * passo * s; if (l >= 0.5 && l <= 3.6) out.push({ st: st.id, seg: [run[0].q[0], run[0].q[1], run[run.length - 1].q[0], run[run.length - 1].q[1]], n: [nx, ny], l: Math.round(l * 10) / 10, sp: Math.min(0.66, Math.max(0.12, Tm)), prof: Math.max(...run.map(c => c.ultimo)), auto: true }); } run = []; };
      // segno distintivo della finestra: il trattino perpendicolare che esce dal filo esterno del muro (asse della finestra),
      // con ai lati le spallette più corte (l'incavo). Misuro per ogni punto quanto "sporge" una linea sottile oltre il muro.
      const sporge = c => { let st0 = -1, len = 0; for (let k = Math.round((Tm - 0.04) / s); k < Math.round((Tm + 1.0) / s); k++) { const x = Math.round(c.q[0] + nx * k), y = Math.round(c.q[1] + ny * k);
          if (x < 0 || y < 0 || x >= W || y >= H || dentroStanza[y * W + x]) break; if (M[y * W + x]) { if (st0 < 0) { if ((k * s) > Tm + 0.12) break; if (k * s < Tm - 0.03) continue; st0 = k; } len = k - st0 + 1; } else if (st0 >= 0) break; }
        return st0 < 0 ? 0 : len * s; };
      const fuori = c => { const k = Math.round((Tm + 0.6) / s), x = Math.round(c.q[0] + nx * k), y = Math.round(c.q[1] + ny * k); return x < 0 || y < 0 || x >= W || y >= H || !dentroStanza[y * W + x]; };
      camp.forEach(c => { c.sp = c.est && fuori(c) ? sporge(c) : 0; });
      const vic = Math.max(1, Math.round(0.07 / (passo * s))), sottile = i => { const v = camp[i].sp; if (v < 0.04) return false; const l = camp[i - vic]?.sp ?? 0, r = camp[i + vic]?.sp ?? 0; return l < v * 0.45 && r < v * 0.45; };
      const tacche = []; camp.forEach((c, i) => { if (c.sp > 0 && c.sp < 0.95 && sottile(i)) { const u = tacche[tacche.length - 1]; if (u && i - u.i <= vic) { if (c.sp > u.sp) Object.assign(u, { i, sp: c.sp }); } else tacche.push({ i, sp: c.sp }); } });
      // asse = il trattino più lungo; spallette = trattini vicini molto più corti
      const dm = Math.round(1.6 / (passo * s)), spalla = t => tacche.some(u => u !== t && Math.abs(u.i - t.i) <= dm && u.sp * 0.6 >= t.sp);
      const esterno = ext.length >= camp.length * 0.5, assi = esterno ? tacche.filter(t => t.sp >= 0.12 && !spalla(t)) : [], spall = tacche.filter(t => spalla(t));
      // tratti dove il muro ha 3 o più linee (filo interno, vetro, filo esterno): lì c'è la finestra; unisco i buchi piccoli (l'asse della finestra che taglia le linee)
      const blocchi = []; { let i0 = -1, last = -1, mx = 0; const gap = Math.max(1, Math.round(0.12 / (passo * s)));
        const fine = () => { if (i0 >= 0) { const l = (last - i0) * passo * s; if (l >= 0.4 && l <= 3.6) blocchi.push({ i0, i1: last, l, mx }); } i0 = -1; mx = 0; };
        camp.forEach((c, i) => { const ok = c.est && c.runs >= 3; if (ok) { if (i0 >= 0 && i - last > gap) fine(); if (i0 < 0) i0 = i; last = i; mx = Math.max(mx, c.runs); } });
        fine(); }
      { let g = []; const chiudiM = () => { if (g.length >= 3) { const d = g.map(c => c.ultimo).sort((x, y) => x - y)[g.length >> 1] / s;
            PIENI.push([g[0].q[0], g[0].q[1], g[g.length - 1].q[0], g[g.length - 1].q[1], nx, ny, d]); } g = []; };
        camp.forEach(c => { const ok = c.est && c.runs === 2 && c.ultimo >= 0.12 && c.ultimo <= 0.8; if (ok && g.length && Math.abs(c.ultimo - g[0].ultimo) > 0.06) chiudiM(); if (ok) g.push(c); else chiudiM(); }); chiudiM(); }
      const tol = Math.round(0.15 / (passo * s));
      if (window.__gsDbg) console.log(JSON.stringify({st: st.tipo, e, a: a.map(Math.round), b: b.map(Math.round), moda, assi: assi.map(t => t.i), tacche: tacche.map(t => [t.i, +t.sp.toFixed(2)]), blocchi, runs: camp.map(c => c.est ? c.runs : 0).join("")}));
      LATI.push({ st, camp, assi, blocchi, nx, ny, Tm, moda, tol, conAsse: blocchi.filter(bl => assi.some(t => t.i >= bl.i0 - tol && t.i <= bl.i1 + tol)) });
      if (assi.length) { conTacche = true;
        for (const t of assi) { const dmax = Math.round(1.6 / (passo * s));
          const sx = spall.filter(u => u.i < t.i && t.i - u.i <= dmax).pop(), dx = spall.find(u => u.i > t.i && u.i - t.i <= dmax);
          let i0 = sx ? sx.i : t.i - Math.round(0.6 / (passo * s)), i1 = dx ? dx.i : t.i + Math.round(0.6 / (passo * s));
          if (sx && !dx) i1 = t.i + (t.i - sx.i); if (dx && !sx) i0 = t.i - (dx.i - t.i);
          i0 = Math.max(0, i0); i1 = Math.min(camp.length - 1, i1); const l = (i1 - i0) * passo * s; if (l < 0.4) continue;
          out.push({ st: st.id, seg: [camp[i0].q[0], camp[i0].q[1], camp[i1].q[0], camp[i1].q[1]], n: [nx, ny], l: Math.round(l * 10) / 10, sp: Math.min(0.66, Math.max(0.12, Tm)), prof: Tm + t.sp, auto: true, asse: true }); }
        continue; }
      // planimetrie senza trattino: finestra dove il muro ha più linee del solito (telaio e vetro)
      for (const c of camp) { const fin = c.est && c.runs && (c.runs > moda || (moda === 1 && c.scuri < medScuri * 0.6 && c.runs >= 2)); if (fin) run.push(c); else chiudi(); }
      chiudi();
    }
  }
  p.muriPieni = PIENI;
  p.spMuro = spessori.length ? spessori.sort((x, y) => x - y)[spessori.length >> 1] : 0.3;
  // planimetrie con il simbolo a più linee E il trattino dell'asse: la finestra è il tratto a più linee, non una misura a occhio.
  // Così due finestre vicine restano due, e i trattini che non sono finestre (linee tratteggiate, quote) non contano.
  if (LATI.some(L => L.conAsse.length)) {
    const fin = [];
    for (const L of LATI) for (const bl of L.blocchi) {
      const a = L.camp[bl.i0].q, b = L.camp[bl.i1].q, l = Math.round(bl.l * 10) / 10;
      fin.push({ st: L.st.id, seg: [a[0], a[1], b[0], b[1]], n: [L.nx, L.ny], l, sp: Math.min(0.66, Math.max(0.12, L.Tm)), prof: L.Tm + 0.1, auto: true, asse: true }); }
    return fin; }
  if (conTacche) return out.filter(f => f.asse);
  return out;
}
function gsAggiornaFin(p) { const per = {}; (p.finestre || []).forEach(f => { per[f.st] = (per[f.st] || 0) + f.l; }); (p.stanze || []).forEach(st => { st.fin = Math.round((per[st.id] || 0) * 10) / 10; }); }
function gsRiconosci(p) { const man = (p.finestre || []).filter(f => !f.auto); p.finestre = [...gsFinestre(p), ...man]; gsAggiornaFin(p); p.finAuto = true; p.finV = 3; }
// tocco su un muro: tolgo la finestra che c'è lì, oppure ne aggiungo una da 1,2 m
function gsToccaFinestra(p, q) {
  const s = p.scala, L = p.finestre || [], vic = L.findIndex(f => { const [x0, y0, x1, y1] = f.seg; return RN.distBordo(q, [[x0, y0], [x1, y1]]) < 0.4 / s; });
  if (vic >= 0) { L.splice(vic, 1); p.finestre = L; gsAggiornaFin(p); return "tolta"; }
  const i = fzStanzaDi(q, p.stanze), st = p.stanze[i]; if (!st) return null;
  // lato della stanza più vicino al tocco
  let best = null, bd = Infinity; st.poly.forEach((a, e) => { const b = st.poly[(e + 1) % st.poly.length], d = RN.distBordo(q, [a, b]); if (d < bd) { bd = d; best = [a, b]; } });
  if (!best || bd > 0.8 / s) return null;
  const [a, b] = best, mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], Lt = Math.hypot(b[0] - a[0], b[1] - a[1]), tx = (b[0] - a[0]) / Lt, ty = (b[1] - a[1]) / Lt, t = Math.max(0.6 / s, Math.min(Lt - 0.6 / s, (q[0] - a[0]) * tx + (q[1] - a[1]) * ty)), h = 0.6 / s;
  let nx = -ty, ny = tx; if (RN.dentro([mid[0] + nx * 4, mid[1] + ny * 4], st.poly)) { nx = -nx; ny = -ny; }
  const c = [a[0] + tx * t, a[1] + ty * t]; L.push({ st: st.id, seg: [c[0] - tx * h, c[1] - ty * h, c[0] + tx * h, c[1] + ty * h], n: [nx, ny], l: 1.2 }); p.finestre = L; gsAggiornaFin(p); return "aggiunta";
}

/* ---- aggancio: riconosco le finestre appena c'è la misura; nel frazionamento le correggi toccando il muro ---- */
{ const pan = rnPannello; rnPannello = function () { const p = RS.p; if (p && p.scala && (p.stanze || []).length && (!p.finAuto || p.finV !== 3)) { try { gsRiconosci(p); rnSalva(); } catch (e) { } } return pan(); }; }
{ const toc = rnTocco; rnTocco = function (q) { const p = RS.p; if (RS.fase === "fraz" && RS.fzModo === "finestre" && p.scala) { const r = gsToccaFinestra(p, q); if (r) { rnSalva(); rnDisegna(); rnPannello(); rnGuida(r === "tolta" ? "<b>Finestra tolta.</b>" : "<b>Finestra aggiunta</b> (1,2 m): se è diversa scrivi la misura nella stanza."); return; } } return toc(q); }; }
{ const dis = rnDisegna; rnDisegna = function () { dis(); const cv = $("#rncv"), p = RS.p; if (!cv || !p || !["fraz", "stanze", "scala"].includes(RS.fase) || !(p.finestre || []).length) return; const g = cv.getContext("2d"), lw = Math.max(3, p.W / 220);
  g.lineCap = "round"; for (const f of p.finestre) { const [x0, y0, x1, y1] = f.seg; g.strokeStyle = "rgba(47,111,115,.9)"; g.lineWidth = lw * 2; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); } }; }
// pannello del frazionamento: nella modalità Finestre spiego il tocco e offro il riconoscimento
{ const pan = rnPannello; rnPannello = function () { pan(); if (RS.fase !== "fraz" || RS.fzModo !== "finestre") return; const el = $("#rnpan"), p = RS.p; if (!el) return;
  const n = (p.finestre || []).length, box = document.createElement("div"); box.className = "rnsel";
  box.innerHTML = `<b>Finestre: ${n} ${n === 1 ? "trovata" : "trovate"}</b> <span class="note">(in verde petrolio sulla planimetria)</span><p class="note">Le ho cercate io sui muri esterni. Tocca un muro per <b>aggiungere</b> una finestra o tocca una finestra per <b>toglierla</b>; tocca dentro una stanza per scriverne la misura.</p><button class="btn sec" data-gsric>Riconosci di nuovo</button>`;
  el.prepend(box); box.querySelector("[data-gsric]").addEventListener("click", () => { gsRiconosci(p); rnSalva(); rnDisegna(); rnPannello(); }); }; }
// tocco dentro la stanza in modalità finestre: se non sono vicino a un muro, seleziono la stanza (comportamento di prima)
{ const prev = gsToccaFinestra; gsToccaFinestra = function (p, q) { const i = fzStanzaDi(q, p.stanze), st = p.stanze[i]; if (st && RN.dentro(q, st.poly) && RN.distBordo(q, st.poly) > 0.8 / p.scala) return null; return prev(p, q); }; }
// le stanze cambiano (lavori, nuovi muri): le finestre si riconoscono di nuovo
{ const r = rzRifai; rzRifai = async function (p) { p.finAuto = false; return r(p); }; }

/* ---- 2D: finestre col simbolo architettonico (spallette, due fili del muro, vetro al centro) ---- */
{ const sv = rnSvg; rnSvg = function (p, opt = {}) { const out = sv(p, opt); if (opt.solo === "sotto" || !(p.finestre || []).length || !p.scala) return out;
  const k = 1 / p.scala, f = p.finestre.map(({ seg: [x0, y0, x1, y1], n, sp: spm }) => { const sp = Math.min(0.66, Math.max(0.12, spm || p.spMuro || 0.3)) * k; const L = Math.hypot(x1 - x0, y1 - y0) || 1, [nx, ny] = n || [-(y1 - y0) / L, (x1 - x0) / L];
    const lin = (o, col, w) => `<line x1="${x0 + nx * o}" y1="${y0 + ny * o}" x2="${x1 + nx * o}" y2="${y1 + ny * o}" stroke="${col}" stroke-width="${w}"/>`;
    const spal = (x, y) => `<line x1="${x}" y1="${y}" x2="${x + nx * sp}" y2="${y + ny * sp}" stroke="#2e161c" stroke-width="${0.05 * k}"/>`;
    return `<g><polygon points="${x0},${y0} ${x1},${y1} ${x1 + nx * sp},${y1 + ny * sp} ${x0 + nx * sp},${y0 + ny * sp}" fill="#fbf7f0"/>${lin(sp * 0.44, "#8fbccc", 0.018 * k)}${lin(sp * 0.56, "#8fbccc", 0.018 * k)}</g>`; }).join("");
  return out.replace(/<\/svg>$/, `${f}</svg>`); }; }
// nel risultato riconosco le finestre se non l'ho ancora fatto (rendering fatti prima)
{ const ris = rnRisultato; rnRisultato = async function () { const p = RS.p; if (p && p.scala && (p.stanze || []).length && (!p.finAuto || p.finV !== 3)) { try { gsRiconosci(p); rnSalva(); } catch (e) { } } return ris(); }; }
