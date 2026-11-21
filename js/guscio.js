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
  const k = (p.stanze || []).map(st => st.id + st.poly.length + RN.area(st.poly).toFixed(0)).join("|") + (p.lavori || []).length + (p.fzChiudi || []).length + (p.fzApri || []).length;
  if (RS.gsK === k && RS.gsM && RS.gsM.length === m.length) return RS.gsM;
  const vic = RN.dilata(gsStanzeMaschera(p), p.W, p.H, Math.round(0.42 / p.scala)), out = new Uint8Array(m.length);
  for (let i = 0; i < m.length; i++) out[i] = m[i] && vic[i] ? 1 : 0;
  // muri disegnati a doppia linea: riempio lo spazio tra le due linee (chiusura morfologica, fino a ~35 cm di spessore)
  const r = Math.max(2, Math.round(0.17 / p.scala)), dil = RN.dilata(out, p.W, p.H, r), inv = new Uint8Array(m.length);
  for (let i = 0; i < m.length; i++) inv[i] = dil[i] ? 0 : 1;
  const er = RN.dilata(inv, p.W, p.H, r), stanze = gsStanzeMaschera(p);
  for (let i = 0; i < m.length; i++) if (!er[i] && !stanze[i]) out[i] = 1;     // mai dentro le stanze
  RS.gsK = k; RS.gsM = out; return out; }; }

/* ---- riconoscimento delle finestre ---- */
function gsFinestre(p) {
  const s = p.scala; if (!s) return [];
  const M = RS.muri, W = p.W, H = p.H, dentroStanza = gsStanzeMaschera(p), passo = Math.max(2, 0.08 / s), Lmax = 0.75 / s, out = [];
  for (const st of p.stanze || []) {
    if (["balcone", "terrazzo"].includes(st.tipo)) continue;
    const P = st.poly, cen = (() => { const b = RN.bbox(P); return [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2]; })();
    for (let e = 0; e < P.length; e++) {
      const a = P[e], b = P[(e + 1) % P.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L * s < 0.6) continue;
      const tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L; let nx = -ty, ny = tx;
      const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; if (RN.dentro([mid[0] + nx * 4, mid[1] + ny * 4], P)) { nx = -nx; ny = -ny; }
      const camp = [];
      for (let d = passo; d < L - passo; d += passo) {
        const q = [a[0] + tx * d, a[1] + ty * d]; let runs = 0, buio = false, bianco = 0, est = false, scuri = 0, k;
        for (k = 1; k < Lmax; k++) { const x = Math.round(q[0] + nx * k), y = Math.round(q[1] + ny * k); if (x < 0 || y < 0 || x >= W || y >= H) { est = true; break; }
          const i = y * W + x; if (dentroStanza[i] && runs > 0) { est = false; break; }      // dall'altra parte c'è un'altra stanza: muro interno
          if (M[i]) { if (!buio) runs++; buio = true; bianco = 0; scuri++; } else { buio = false; if (runs) bianco++; if (runs && bianco * s > 0.25) { est = true; break; } } }
        if (k >= Lmax && runs) est = !dentroStanza[Math.round(q[1] + ny * Lmax) * W + Math.round(q[0] + nx * Lmax)];
        camp.push({ q, runs, est, scuri });
      }
      const ext = camp.filter(c => c.est && c.runs); if (ext.length < 4) continue;
      // il muro "normale" di questo lato: numero di linee più frequente; la finestra ne ha di più (telaio e vetro)
      const freq = {}; ext.forEach(c => { freq[c.runs] = (freq[c.runs] || 0) + 1; }); const moda = +Object.entries(freq).sort((x, y) => y[1] - x[1])[0][0];
      const medScuri = ext.map(c => c.scuri).sort((x, y) => x - y)[ext.length >> 1];
      let run = [];
      const chiudi = () => { if (run.length) { const l = (run.length) * passo * s; if (l >= 0.5 && l <= 3.6) out.push({ st: st.id, seg: [run[0].q[0], run[0].q[1], run[run.length - 1].q[0], run[run.length - 1].q[1]], n: [nx, ny], l: Math.round(l * 10) / 10, auto: true }); } run = []; };
      for (const c of camp) { const fin = c.est && c.runs && (c.runs > moda || (moda === 1 && c.scuri < medScuri * 0.6 && c.runs >= 2)); if (fin) run.push(c); else chiudi(); }
      chiudi();
    }
  }
  return out;
}
function gsAggiornaFin(p) { const per = {}; (p.finestre || []).forEach(f => { per[f.st] = (per[f.st] || 0) + f.l; }); (p.stanze || []).forEach(st => { st.fin = Math.round((per[st.id] || 0) * 10) / 10; }); }
function gsRiconosci(p) { const man = (p.finestre || []).filter(f => !f.auto); p.finestre = [...gsFinestre(p), ...man]; gsAggiornaFin(p); p.finAuto = true; }
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
{ const pan = rnPannello; rnPannello = function () { const p = RS.p; if (p && p.scala && (p.stanze || []).length && !p.finAuto) { try { gsRiconosci(p); rnSalva(); } catch (e) { } } return pan(); }; }
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

/* ---- 2D: finestre col simbolo classico (tre linee sottili nel muro) ---- */
{ const sv = rnSvg; rnSvg = function (p, opt = {}) { const out = sv(p, opt); if (opt.solo === "sotto" || !(p.finestre || []).length || !p.scala) return out;
  const k = 1 / p.scala, f = p.finestre.map(({ seg: [x0, y0, x1, y1], n }) => { const L = Math.hypot(x1 - x0, y1 - y0) || 1, [nx, ny] = n || [-(y1 - y0) / L, (x1 - x0) / L];
    // la finestra sta nello spessore del muro: sposto il simbolo verso l'esterno di ~12 cm
    const o = 0.13 * k, X0 = x0 + nx * o, Y0 = y0 + ny * o, X1 = x1 + nx * o, Y1 = y1 + ny * o, sg = n => `<line x1="${X0 + nx * n}" y1="${Y0 + ny * n}" x2="${X1 + nx * n}" y2="${Y1 + ny * n}" stroke="#2f6f73" stroke-width="${0.025 * k}"/>`;
    return `<g><line x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y1}" stroke="#fffdf9" stroke-width="${0.26 * k}"/>${sg(-0.1 * k)}${sg(0)}${sg(0.1 * k)}</g>`; }).join("");
  return out.replace(/<\/svg>$/, `${f}</svg>`); }; }
