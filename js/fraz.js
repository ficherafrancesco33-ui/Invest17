/* KEYSTONE — Frazionamento sulla planimetria del Rendering, con le regole del Regolamento Edilizio di Milano (2014)
   Tu segni gli ingressi (esistente e nuovi), le finestre e, se serve, i nuovi muri; l'app propone come dividere,
   assegna gli usi alle stanze e controlla le regole. Tutto si può correggere a mano. */

/* ---- regole (RE Milano 2014 + DM 5/7/1975): valori usati nei controlli ---- */
const FZ_REG = {
  alloggioMin: 28,          // m² di superficie utile, servizi compresi
  cameraSingola: 8, cameraDoppia: 12, studio: 7,
  soggiorno: 14, soggiornoCottura: 17, cucina: 5,
  bagnoLato: 1.2,            // lato minimo indicativo del bagno
  rai: 1 / 8,                // finestra ≥ 1/8 del pavimento nei locali abitabili
  bagnoCiecoMax: 70,         // bagno senza finestra (con aspirazione) ammesso fino a 70 m² senza VMC
  hFin: 1.4                  // altezza tipica di una finestra, per stimare la superficie finestrata
};
const FZ_COL = ["#6a1828", "#b8862a", "#2f6f73", "#6b4f9a"], FZ_LET = ["A", "B", "C", "D"];

/* ---- utilità ---- */
const fzMq = (st, s) => RN.area(st.poly) * s * s;
const fzUtile = st => !["balcone", "terrazzo"].includes(st.tipo);
// stanze confinanti: bordi a meno di ~45 cm (lo spessore di un muro)
function fzAdiacenze(stanze, s) {
  const soglia = 0.45 / s, A = stanze.map(() => new Set());
  const vicini = (P, Q) => { for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length], n = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / (0.25 / s)));
      for (let k = 0; k <= n; k++) { const p = [a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]; if (RN.distBordo(p, Q) < soglia) return true; } } return false; };
  for (let i = 0; i < stanze.length; i++) for (let j = i + 1; j < stanze.length; j++) if (vicini(stanze[i].poly, stanze[j].poly)) { A[i].add(j); A[j].add(i); }
  return A;
}
function fzPorte(stanze, A, s) {
  const P = new Set(), m = RS.muri, W = RS.p.W;
  for (let i = 0; i < stanze.length; i++) for (const j of A[i]) { if (j < i) continue; const Pi = stanze[i].poly, Pj = stanze[j].poly; let varco = 0, run = 0;
    for (let e = 0; e < Pi.length && varco < 3; e++) { const a = Pi[e], b = Pi[(e + 1) % Pi.length], n = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / (0.1 / s)));
      for (let k = 0; k <= n; k++) { const q = [a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]; if (RN.distBordo(q, Pj) > 0.45 / s) continue;
        // punto di mezzo tra le due stanze: se non è muro, lì c'è un'apertura
        let best = null, bd = Infinity; for (let f = 0; f < Pj.length; f++) { const c = Pj[f], d2 = Pj[(f + 1) % Pj.length], dx = d2[0] - c[0], dy = d2[1] - c[1], t = Math.max(0, Math.min(1, ((q[0] - c[0]) * dx + (q[1] - c[1]) * dy) / (dx * dx + dy * dy || 1))), r = [c[0] + t * dx, c[1] + t * dy], dd = Math.hypot(r[0] - q[0], r[1] - q[1]); if (dd < bd) { bd = dd; best = r; } }
        const mx = Math.round((q[0] + best[0]) / 2), my = Math.round((q[1] + best[1]) / 2); if (!m[my * W + mx]) { run++; if (run >= 3) varco = 3; } else run = 0; } }
    if (varco >= 3) P.add(i + "-" + j); }
  return P;
}
const fzHaPorta = (P, i, j) => P.has(Math.min(i, j) + "-" + Math.max(i, j));
const fzConnessa = (idx, A) => { if (!idx.length) return false; const S = new Set(idx), vis = new Set([idx[0]]), st = [idx[0]];
  while (st.length) { const i = st.pop(); for (const j of A[i]) if (S.has(j) && !vis.has(j)) { vis.add(j); st.push(j); } } return vis.size === idx.length; };
// stanza in cui (o accanto a cui) sta un punto
const fzStanzaDi = (q, stanze) => { let b = -1, bd = Infinity; stanze.forEach((st, i) => { const d = RN.dentro(q, st.poly) ? 0 : RN.distBordo(q, st.poly); if (d < bd) { bd = d; b = i; } }); return b; };

// porte da aprire perché tutte le stanze di un'unità siano raggiungibili (prima le porte che ci sono già)
function fzDaAprire(g, A, PT) {
  const S = new Set(g), vis = new Set([g[0]]), aperte = [];
  const espandi = () => { let cambiato = true; while (cambiato) { cambiato = false; for (const i of [...vis]) for (const j of A[i]) if (S.has(j) && !vis.has(j) && fzHaPorta(PT, i, j)) { vis.add(j); cambiato = true; } } };
  espandi();
  while (vis.size < S.size) { let arco = null; for (const i of vis) { for (const j of A[i]) if (S.has(j) && !vis.has(j)) { arco = [i, j]; break; } if (arco) break; }
    if (!arco) break; aperte.push(arco); vis.add(arco[1]); espandi(); }
  return aperte;
}
/* ---- piano di un'unità: usi delle stanze e controllo delle regole ---- */
function fzPiano(idx, stanze, A, s, PT) {
  const R = idx.map(i => ({ i, st: stanze[i], mq: fzMq(stanze[i], s), fin: +stanze[i].fin || 0, orig: stanze[i].tipo0 || stanze[i].tipo }));
  const utili = R.filter(r => fzUtile(r.st)), sup = utili.reduce((x, r) => x + r.mq, 0), uso = {}, note = [], err = [];
  const conFin = utili.filter(r => r.fin > 0).sort((a, b) => b.mq - a.mq);
  // zona giorno: la stanza finestrata più grande
  const giorno = conFin[0] || utili.slice().sort((a, b) => b.mq - a.mq)[0];
  const cucina = utili.find(r => r !== giorno && r.orig === "cucina" && r.mq >= FZ_REG.cucina && r.fin > 0);
  if (giorno) uso[giorno.i] = cucina ? "soggiorno" : "cucsogg";
  if (cucina) uso[cucina.i] = "cucina";
  // bagno: quello esistente, altrimenti la stanza piccola più adatta da trasformare
  let bagni = utili.filter(r => r.orig === "bagno");
  if (!bagni.length) { const cand = utili.filter(r => !uso[r.i] && r.mq >= 2.4 && r.mq <= 7).sort((a, b) => a.mq - b.mq)[0] || utili.filter(r => !uso[r.i] && r.mq >= 2.4).sort((a, b) => a.mq - b.mq)[0];
    if (cand) { uso[cand.i] = "bagno"; bagni = [cand]; note.push(`Nuovo bagno da ricavare in ${RN_TIPI[cand.orig]?.n.toLowerCase() || "una stanza"} (${num(cand.mq, 1)} m²)${cand.fin ? "" : ", cieco con aspirazione meccanica"}.`); }
    else err.push("Manca il bagno e non c'è una stanza adatta per ricavarlo."); }
  bagni.forEach(b => { uso[b.i] = "bagno"; });
  // altre stanze: camere se finestrate e abbastanza grandi, altrimenti studio / ripostiglio / disimpegno
  for (const r of utili) { if (uso[r.i]) continue;
    if (["ingresso", "disimpegno"].includes(r.orig)) { uso[r.i] = r.orig; continue; }
    if (r.fin > 0 && r.mq >= FZ_REG.cameraDoppia) uso[r.i] = "camera";
    else if (r.fin > 0 && r.mq >= FZ_REG.cameraSingola) uso[r.i] = "cameretta";
    else if (r.fin > 0 && r.mq >= FZ_REG.studio) uso[r.i] = "studio";
    else uso[r.i] = r.mq < 4 ? "ripostiglio" : r.fin > 0 ? "ripostiglio" : "disimpegno"; }
  R.filter(r => !fzUtile(r.st)).forEach(r => { uso[r.i] = r.orig; });
  // controlli
  const ok = [];
  if (sup < FZ_REG.alloggioMin) err.push(`Superficie utile ${num(sup, 1)} m²: sotto il minimo di ${FZ_REG.alloggioMin} m².`); else ok.push(`Superficie utile ${num(sup, 1)} m² (minimo ${FZ_REG.alloggioMin}).`);
  if (giorno) { const g = giorno, min = uso[g.i] === "cucsogg" ? FZ_REG.soggiornoCottura : FZ_REG.soggiorno;
    if (g.mq < min) err.push(`${uso[g.i] === "cucsogg" ? "Soggiorno con angolo cottura" : "Soggiorno"} di ${num(g.mq, 1)} m²: servono almeno ${min} m².`); else ok.push(`${uso[g.i] === "cucsogg" ? "Soggiorno con angolo cottura" : "Soggiorno"} ${num(g.mq, 1)} m² (minimo ${min}).`);
    if (!g.fin) err.push("La zona giorno non ha finestre segnate."); }
  else err.push("Nessuna stanza per la zona giorno.");
  // rapporto aeroilluminante (1/8) nei locali abitabili
  for (const r of utili) { const u = uso[r.i]; if (!["soggiorno", "cucsogg", "cucina", "camera", "cameretta", "studio"].includes(u)) continue;
    const serve = r.mq * FZ_REG.rai, ha = r.fin * FZ_REG.hFin;
    if (!r.fin) err.push(`${RN_TIPI[u].n} (${num(r.mq, 1)} m²) senza finestra: non ammesso.`);
    else if (ha < serve - 0.01) err.push(`${RN_TIPI[u].n}: finestre ${num(ha, 2)} m², servono ${num(serve, 2)} m² (1/8 del pavimento).`); }
  // bagno: cieco ammesso con aspirazione fino a 70 m²; antibagno tra bagno e zona giorno
  for (const b of bagni) {
    if (!b.fin && sup > FZ_REG.bagnoCiecoMax) note.push(`Bagno senza finestra in un alloggio oltre ${FZ_REG.bagnoCiecoMax} m²: serve la VMC (ventilazione meccanica).`);
    else if (!b.fin) note.push("Bagno senza finestra: serve l'aspirazione meccanica.");
    const vic = [...A[b.i]].filter(j => idx.includes(j)).map(j => uso[j]);
    if (vic.length && vic.every(u => ["soggiorno", "cucsogg", "cucina"].includes(u))) err.push("Il bagno si apre sulla zona giorno: serve un antibagno o un disimpegno con porta.");
    const bb = RN.bbox(b.st.poly), lato = Math.min(bb.x1 - bb.x0, bb.y1 - bb.y0) * s; if (lato < FZ_REG.bagnoLato) note.push(`Bagno largo ${num(lato, 2)} m: verifica il lato minimo (${FZ_REG.bagnoLato} m).`);
  }
  // camere
  for (const r of utili) { if (uso[r.i] === "camera") ok.push(`Camera doppia ${num(r.mq, 1)} m² (minimo ${FZ_REG.cameraDoppia}).`); if (uso[r.i] === "cameretta") ok.push(`Camera singola ${num(r.mq, 1)} m² (minimo ${FZ_REG.cameraSingola}).`);
    if (r.orig === "camera" || r.orig === "cameretta") { if (["soggiorno", "cucsogg", "cucina"].includes(uso[r.i])) note.push(`${RN_TIPI[r.orig].n} di ${num(r.mq, 1)} m² diventa ${RN_TIPI[uso[r.i]].n.toLowerCase()}: servono gli attacchi per la cucina.`);
      else if (!["camera", "cameretta"].includes(uso[r.i])) note.push(`${RN_TIPI[r.orig].n} di ${num(r.mq, 1)} m² diventa ${RN_TIPI[uso[r.i]].n.toLowerCase()}: ${r.fin ? "troppo piccola" : "non ha finestre"}.`); } }
  if (PT) for (const [i, j] of fzDaAprire(idx, A, PT)) note.push(`Aprire una porta tra ${RN_TIPI[uso[i]]?.n.toLowerCase() || "stanza"} e ${RN_TIPI[uso[j]]?.n.toLowerCase() || "stanza"}.`);
  if (utili.filter(r => r.fin > 0).length < 2) note.push("Riscontro d'aria: servono finestre su due pareti diverse (opposte o ad angolo), oppure la VMC.");
  return { sup, uso, ok, err, note, camere: utili.filter(r => ["camera", "cameretta"].includes(uso[r.i])).length };
}

/* ---- proposta automatica: tutte le divisioni possibili, scelgo quella che rispetta le regole e le quote ---- */
function fzProponi(p) {
  const s = p.scala, st = p.stanze, N = p.fzN || 2, A = fzAdiacenze(st, s), PT = fzPorte(st, A, s);
  const ing = (p.fzIng || []).map(e => ({ ...e, r: fzStanzaDi([e.x, e.y], st) }));
  if (ing.length < N) return { errore: `Segna ${N} ingressi (quello che c'è e ${N === 2 ? "quello nuovo" : "i nuovi"}): ne hai segnati ${ing.length}.` };
  const fissi = {}; ing.slice(0, N).forEach((e, u) => { fissi[e.r] = u; });
  if (Object.keys(fissi).length < N) return { errore: "Due ingressi cadono nella stessa stanza: spostane uno nella stanza da cui entrerà l'altra unità." };
  const blocc = p.fzBlocca || {};   // stanze assegnate a mano
  const tot = st.filter(fzUtile).reduce((x, r) => x + fzMq(r, s), 0), quote = p.fzQuote || Array(N).fill(1 / N);
  const n = st.length; if (Math.pow(N, n) > 600000) return { errore: "Troppe stanze per provare tutte le combinazioni: assegnane qualcuna a mano." };
  let best = null; const cur = new Array(n).fill(0);
  const valuta = () => {
    const gruppi = Array.from({ length: N }, () => []); cur.forEach((u, i) => gruppi[u].push(i));
    if (gruppi.some(g => !g.length)) return;
    for (const g of gruppi) if (!fzConnessa(g, A)) return;
    const piani = gruppi.map(g => fzPiano(g, st, A, s, PT));
    let pen = 0; piani.forEach((pl, u) => { pen += pl.err.length * 40 + pl.note.length * 4 + Math.abs(pl.sup - tot * quote[u]) * 1.5; });
    // lavori: porte da chiudere tra unità diverse, porte da aprire perché ogni unità sia percorribile
    for (let i = 0; i < n; i++) for (const j of A[i]) if (j > i && cur[i] !== cur[j]) pen += fzHaPorta(PT, i, j) ? 3 : 0.5;
    gruppi.forEach(g => { pen += fzDaAprire(g, A, PT).length * 6; });
    if (!best || pen < best.pen) best = { pen, gruppi, piani, ass: cur.slice() };
  };
  const rec = i => { if (i === n) return valuta();
    if (fissi[i] != null) { cur[i] = fissi[i]; return rec(i + 1); }
    if (blocc[st[i].id] != null) { cur[i] = blocc[st[i].id]; return rec(i + 1); }
    for (let u = 0; u < N; u++) { cur[i] = u; rec(i + 1); } };
  rec(0);
  if (!best) return { errore: "Non trovo una divisione in cui ogni unità sia collegata al proprio ingresso. Aggiungi un nuovo muro o sposta un ingresso." };
  return best;
}
// applica la proposta: unità e usi delle stanze (gli usi originali restano in tipo0)
function fzApplica(p, best) {
  p.fzAss = {}; best.ass.forEach((u, i) => { p.fzAss[p.stanze[i].id] = u; });
  best.piani.forEach(pl => Object.entries(pl.uso).forEach(([i, u]) => { const st = p.stanze[+i]; if (!st.tipo0) st.tipo0 = st.tipo; st.tipo = u; }));
  p.fzPiani = best.piani.map(pl => ({ sup: pl.sup, ok: pl.ok, err: pl.err, note: pl.note, camere: pl.camere }));
  p.mobili = null;
}
// controllo di una divisione fatta a mano
function fzControlla(p) {
  const s = p.scala, st = p.stanze, N = p.fzN || 2, A = fzAdiacenze(st, s), gruppi = Array.from({ length: N }, () => []);
  st.forEach((r, i) => { const u = p.fzAss?.[r.id]; if (u != null && u < N) gruppi[u].push(i); });
  const PT = fzPorte(st, A, s), piani = gruppi.map(g => g.length ? fzPiano(g, st, A, s, PT) : { sup: 0, ok: [], err: ["Nessuna stanza assegnata."], note: [], uso: {} });
  for (let i = 0; i < st.length; i++) for (const j of A[i]) { const ui = p.fzAss?.[st[i].id], uj = p.fzAss?.[st[j].id];
    if (j > i && ui != null && uj != null && ui !== uj && fzHaPorta(PT, i, j)) piani[Math.min(ui, uj)].note.push(`Chiudere la porta tra ${RN_TIPI[st[i].tipo]?.n.toLowerCase()} (${FZ_LET[ui]}) e ${RN_TIPI[st[j].tipo]?.n.toLowerCase()} (${FZ_LET[uj]}).`); }
  gruppi.forEach((g, u) => { if (g.length && !fzConnessa(g, A)) piani[u].err.unshift("Le stanze non sono tutte collegate tra loro."); });
  return { gruppi, piani };
}

/* ---- nuovi muri: disegnati nella maschera dei muri, e le stanze tagliate vengono rifatte ---- */
function fzMuroInMaschera(m, W, H, seg, sp) {
  const [x0, y0, x1, y1] = seg, L = Math.hypot(x1 - x0, y1 - y0), n = Math.ceil(L), r = Math.max(2, Math.round(sp / 2));
  for (let k = 0; k <= n; k++) { const cx = Math.round(x0 + (x1 - x0) * k / n), cy = Math.round(y0 + (y1 - y0) * k / n);
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const x = cx + dx, y = cy + dy; if (x >= 0 && y >= 0 && x < W && y < H) m[y * W + x] = 1; } }
}
function fzApplicaMuri(p) { (p.fzMuri || []).forEach(seg => fzMuroInMaschera(RS.muri, p.W, p.H, seg, p.scala ? 0.1 / p.scala : 6)); }
function fzTagliaStanze(p, seg) {
  const nuove = [];
  for (const st of p.stanze || []) {
    const [x0, y0, x1, y1] = seg, bb = RN.bbox(st.poly), passa = [0.25, 0.5, 0.75].some(t => RN.dentro([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t], st.poly));
    if (!passa) { nuove.push(st); continue; }
    // un punto per lato del nuovo muro, dentro la stanza
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, nx = -(y1 - y0), ny = x1 - x0, L = Math.hypot(nx, ny) || 1, parti = [];
    for (const sgn of [1, -1]) for (let d = 8; d < Math.max(bb.x1 - bb.x0, bb.y1 - bb.y0); d += 6) { const q = [Math.round(mx + sgn * nx / L * d), Math.round(my + sgn * ny / L * d)];
      if (!RN.dentro(q, st.poly) || RS.muri[q[1] * p.W + q[0]]) continue; const r = RN.stanza(RS.muri, p.W, p.H, q[0], q[1], Math.max(3, Math.round((p.scala ? 0.12 / p.scala : 6))));
      if (!r.errore) { const poly = RN.contorno(r.reg, p.W, p.H); if (poly.length >= 3) parti.push(poly); } break; }
    if (parti.length === 2) { const [a, b] = parti.sort((u, v) => RN.area(v) - RN.area(u)); nuove.push({ ...st, poly: a }, { id: st.id + "b", poly: b, tipo: "altro", fin: 0 }); }
    else nuove.push(st);
  }
  p.stanze = nuove;
}

/* ---- aggancio all'editor del Rendering ---- */
RN_FASI.splice(3, 0, ["fraz", "Frazionamento"]);
{ const prep = rnPrepara; rnPrepara = async function (p) { await prep(p); fzApplicaMuri(p); }; }
{ const dis = rnDisegna; rnDisegna = function () { dis(); if (RS.fase !== "fraz") return; const cv = $("#rncv"); if (!cv) return; const g = cv.getContext("2d"), p = RS.p, lw = Math.max(2, p.W / 350), fs = Math.max(14, p.W / 50);
  (p.stanze || []).forEach(st => { const u = p.fzAss?.[st.id]; if (u == null) return; g.beginPath(); st.poly.forEach(([x, y], j) => j ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath();
    g.fillStyle = FZ_COL[u] + "40"; g.fill(); g.lineWidth = lw * 1.6; g.strokeStyle = FZ_COL[u]; g.stroke(); });
  (p.fzMuri || []).forEach(([x0, y0, x1, y1]) => { g.strokeStyle = "#c9a24b"; g.lineWidth = lw * 2.5; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); });
  if (RS.fzA) { g.beginPath(); g.arc(RS.fzA[0], RS.fzA[1], lw * 4, 0, 7); g.fillStyle = "#c9a24b"; g.fill(); }
  (p.fzIng || []).forEach((e, k) => { g.beginPath(); g.arc(e.x, e.y, fs * 0.9, 0, 7); g.fillStyle = FZ_COL[k] || "#333"; g.fill(); g.lineWidth = lw; g.strokeStyle = "#fff"; g.stroke();
    g.fillStyle = "#fff"; g.font = `800 ${fs}px Barlow, sans-serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(FZ_LET[k] || "?", e.x, e.y + 1); g.textBaseline = "alphabetic"; });
  if (p.scala) (p.stanze || []).forEach(st => { if (!st.fin) return; const bb = RN.bbox(st.poly); g.font = `600 ${fs * 0.75}px Barlow, sans-serif`; g.fillStyle = "#2f6f73"; g.textAlign = "center"; g.fillText(`finestre ${num(st.fin, 1)} m`, (bb.x0 + bb.x1) / 2, bb.y1 - fs * 0.6); });
}; }
{ const toc = rnTocco; rnTocco = function (q) { if (RS.fase !== "fraz") return toc(q); const p = RS.p, mode = RS.fzModo || "ingresso";
  if (mode === "ingresso") { const L = p.fzIng || [], k = L.findIndex(e => Math.hypot(e.x - q[0], e.y - q[1]) < Math.max(p.W, p.H) * 0.03);
    if (k >= 0) L.splice(k, 1); else L.push({ x: q[0], y: q[1] }); p.fzIng = L; }
  else if (mode === "muro") { if (!RS.fzA) RS.fzA = q; else { const seg = [RS.fzA[0], RS.fzA[1], q[0], q[1]]; RS.fzA = null;
      // muro dritto: lo allineo all'asse più vicino
      if (Math.abs(seg[2] - seg[0]) > Math.abs(seg[3] - seg[1])) seg[3] = seg[1]; else seg[2] = seg[0];
      p.fzMuri = [...(p.fzMuri || []), seg]; fzMuroInMaschera(RS.muri, p.W, p.H, seg, p.scala ? 0.1 / p.scala : 6); fzTagliaStanze(p, seg); p.mobili = null; } }
  else if (mode === "assegna") { const i = fzStanzaDi(q, p.stanze), st = p.stanze[i]; if (st && RN.dentro(q, st.poly)) { const N = p.fzN || 2; p.fzAss = p.fzAss || {}; p.fzAss[st.id] = ((p.fzAss[st.id] ?? -1) + 1) % N; p.fzBlocca = { ...(p.fzBlocca || {}), [st.id]: p.fzAss[st.id] }; } }
  else if (mode === "finestre") { const i = fzStanzaDi(q, p.stanze), st = p.stanze[i]; if (st && RN.dentro(q, st.poly)) RS.fzSelSt = st; }
  rnSalva(); rnDisegna(); rnPannello(); }; }
{ const pan = rnPannello; rnPannello = function () { if (RS.fase !== "fraz") return pan(); const el = $("#rnpan"), p = RS.p; if (!el) return;
  if (!p.scala) { el.innerHTML = `<p class="note">Prima servono le misure.</p><a class="btn pri" href="#rendering/${p.id}/scala">Vai alle misure</a>`; return; }
  const N = p.fzN || 2, mode = RS.fzModo || "ingresso", nIng = (p.fzIng || []).length, senzaFin = p.stanze.filter(st => fzUtile(st) && !st.fin).length;
  const passo = nIng < N ? `<b>1. Segna gli ingressi</b>: tocca dove si entra oggi (sarà l'unità A) e dove vuoi aprire ${N === 2 ? "il nuovo ingresso (B)" : "i nuovi ingressi"}. Si tocca di nuovo un cerchio per toglierlo.`
    : senzaFin === p.stanze.filter(fzUtile).length ? `<b>2. Segna le finestre</b>: tocca una stanza e scrivi quanti metri di finestre ha (servono per le regole su luce e aria).`
    : `<b>3. Premi "Proponi il frazionamento"</b>: divido io rispettando le regole di Milano. Poi puoi correggere a mano.`;
  rnGuida(passo);
  const sel = RS.fzSelSt && p.stanze.includes(RS.fzSelSt) ? RS.fzSelSt : null, C = p.fzAss ? fzControlla(p) : null;
  if (C) p.fzPiani = C.piani.map(pl => ({ sup: pl.sup, ok: pl.ok, err: pl.err, note: pl.note }));
  el.innerHTML = `<div class="chips"><span class="note" style="align-self:center">Unità:</span>${[2, 3].map(n => `<button class="chip ${N === n ? "on" : ""}" data-fzn="${n}">${n}</button>`).join("")}</div>
    ${N === 2 ? `<label class="rnsl"><span>Quota dell'unità A <b>${Math.round((p.fzQuote?.[0] ?? 0.5) * 100)}%</b> della superficie</span><input type="range" min="25" max="75" step="5" value="${Math.round((p.fzQuote?.[0] ?? 0.5) * 100)}" data-fzq></label>` : ""}
    <div class="chips">${[["ingresso", "Ingressi"], ["finestre", "Finestre"], ["muro", "Nuovo muro"], ["assegna", "Assegna a mano"]].map(([k, t]) => `<button class="chip ${mode === k ? "on" : ""}" data-fzm="${k}">${t}</button>`).join("")}</div>
    ${mode === "muro" ? `<p class="note">Tocca i due capi del nuovo muro (diventa dritto da solo). Le stanze tagliate si dividono in due.${(p.fzMuri || []).length ? ` <button class="lnk" data-fzmu>Togli l'ultimo muro</button>` : ""}</p>` : ""}
    ${mode === "assegna" ? `<p class="note">Tocca una stanza per passarla all'unità successiva (A → B${N > 2 ? " → C" : ""}). Le stanze che assegni tu restano ferme quando chiedi una nuova proposta.</p>` : ""}
    ${mode === "finestre" ? (sel ? `<div class="rnsel"><b>${RN_TIPI[sel.tipo]?.n || "Stanza"} · ${num(fzMq(sel, p.scala), 1)} m²</b><label class="rnsl"><span>Larghezza totale delle finestre (porte finestre comprese)</span><input type="number" min="0" step="0.1" inputmode="decimal" value="${sel.fin || ""}" data-fzfin placeholder="0 = nessuna finestra"></label>
        <p class="note">Per la luce serve almeno ${num(fzMq(sel, p.scala) * FZ_REG.rai / FZ_REG.hFin, 2)} m di finestra (1/8 del pavimento, finestre alte ${num(FZ_REG.hFin, 2)} m).</p></div>` : `<p class="note">Tocca una stanza per scrivere le sue finestre.</p>`) : ""}
    <div class="btns"><button class="btn pri" data-fzgo>Proponi il frazionamento</button>${p.fzAss ? `<button class="btn sec" data-fzreset>Ricomincia</button>` : ""}</div>
    <p class="note" id="fzmsg"></p>
    ${C ? fzReport(p, C) : ""}
    ${C ? `<div class="btns"><a class="btn pri" href="#rendering/${p.id}/arredo">Arreda le unità</a><a class="btn sec" href="#rendering/${p.id}/risultato">Vedi il risultato</a></div>` : ""}`;
  el.querySelectorAll("[data-fzn]").forEach(b => b.addEventListener("click", () => { p.fzN = +b.dataset.fzn; p.fzQuote = null; rnSalva(); rnPannello(); rnDisegna(); }));
  el.querySelector("[data-fzq]")?.addEventListener("change", e => { const a = +e.target.value / 100; p.fzQuote = [a, 1 - a]; rnSalva(); rnPannello(); });
  el.querySelectorAll("[data-fzm]").forEach(b => b.addEventListener("click", () => { RS.fzModo = b.dataset.fzm; RS.fzA = null; rnPannello(); rnDisegna(); }));
  el.querySelector("[data-fzfin]")?.addEventListener("change", e => { sel.fin = +e.target.value || 0; rnSalva(); rnDisegna(); rnPannello(); });
  el.querySelector("[data-fzmu]")?.addEventListener("click", async () => { p.fzMuri.pop(); await rnPrepara(p); rnSalva(); rnDisegna(); rnPannello(); rnGuida("<b>Muro tolto.</b> Se una stanza era stata divisa, toglila e ritoccala nella fase Stanze."); });
  el.querySelector("[data-fzreset]")?.addEventListener("click", () => { p.stanze.forEach(st => { if (st.tipo0) { st.tipo = st.tipo0; delete st.tipo0; } }); p.fzAss = null; p.fzBlocca = null; p.fzPiani = null; p.mobili = null; rnSalva(); rnDisegna(); rnPannello(); });
  el.querySelector("[data-fzgo]").addEventListener("click", () => { p.stanze.forEach(st => { if (st.tipo0) st.tipo = st.tipo0; });
    const t = Date.now(), best = fzProponi(p);
    if (best.errore) { $("#fzmsg").innerHTML = `<b>${esc(best.errore)}</b>`; return; }
    fzApplica(p, best); rnSalva(); rnDisegna(); rnPannello();
    const nErr = best.piani.reduce((x, pl) => x + pl.err.length, 0);
    rnGuida(nErr ? `<b>Ecco la proposta migliore, ma ci sono ${nErr} problemi</b> da risolvere (in rosso qui sotto): puoi aggiungere un muro, spostare un ingresso, segnare le finestre o assegnare le stanze a mano.` : `<b>Proposta fatta: rispetta le regole che posso controllare.</b> Controlla le unità qui sotto, poi arreda.`); });
}; }
function fzReport(p, C) {
  return `<div class="fzrep">${C.piani.map((pl, u) => `<div class="fzu" style="border-color:${FZ_COL[u]}"><b style="color:${FZ_COL[u]}">Unità ${FZ_LET[u]} · ${num(pl.sup, 1)} m²</b>
    ${pl.err.map(t => `<div class="fzx">✕ ${esc(t)}</div>`).join("")}${pl.note.map(t => `<div class="fzn">! ${esc(t)}</div>`).join("")}${pl.ok.map(t => `<div class="fzok">✓ ${esc(t)}</div>`).join("")}</div>`).join("")}
    <p class="note">Controlli secondo il Regolamento Edilizio di Milano e il DM 5/7/1975 sui dati che hai segnato (superfici, finestre, collegamenti). Altezze, impianti, scarichi, distanze e vincoli condominiali vanno verificati da un tecnico prima dei lavori.</p></div>`;
}

/* ---- risultato: unità e nuovi ingressi sulla pianta e nel PDF ---- */
{ const sv = rnSvg; rnSvg = function (p, opt = {}) { const out = sv(p, opt); if (!p.fzAss || opt.solo === "sotto") return out;
  const k = 1 / (p.scala || 0.01), fs = Math.max(12, 0.34 * k);
  const bordi = (p.stanze || []).map(st => { const u = p.fzAss[st.id]; return u == null ? "" : `<polygon points="${st.poly.map(q => q.join(",")).join(" ")}" fill="none" stroke="${FZ_COL[u]}" stroke-width="${0.07 * k}" stroke-opacity=".85"/>`; }).join("");
  const nuovi = (p.fzMuri || []).map(([x0, y0, x1, y1]) => `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#c9a24b" stroke-width="${0.12 * k}" stroke-linecap="round"/>`).join("");
  const ing = (p.fzIng || []).map((e, i) => `<g><circle cx="${e.x}" cy="${e.y}" r="${fs * 0.9}" fill="${FZ_COL[i]}" stroke="#fff" stroke-width="${fs * 0.12}"/><text x="${e.x}" y="${e.y + fs * 0.36}" font-size="${fs}" font-weight="800" fill="#fff" text-anchor="middle" font-family="Barlow, Arial, sans-serif">${FZ_LET[i]}</text></g>`).join("");
  return out.replace(/<\/svg>$/, `${bordi}${nuovi}${ing}</svg>`); }; }
{ const pg = rnPagina; rnPagina = function (all, C) { let h = pg(all, C); if (!all.fz) return h;
  const t = all.fz.map((u, i) => `<div style="border-left:1.2mm solid ${FZ_COL[i]};padding:1mm 3mm;margin:2mm 0"><b>Unità ${FZ_LET[i]} · ${num(u.sup, 1)} m²</b>${u.err.length ? `<div style="color:#9a2a2a">${u.err.map(esc).join("<br>")}</div>` : `<div style="color:#2f6f3a">Rispetta i requisiti controllati</div>`}</div>`).join("");
  return h.replace(/<\/section>$/, `<div style="font-size:8.5pt;margin-top:4mm"><b>Frazionamento proposto</b>${t}<div style="color:#7a6c66;font-size:7.5pt">Verifica indicativa su Regolamento Edilizio di Milano e DM 5/7/1975: da confermare con un tecnico abilitato.</div></div></section>`); }; }
