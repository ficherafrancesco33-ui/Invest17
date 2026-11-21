/* KEYSTONE — Ristrutturazione sulla planimetria: abbatti, costruisci, sposta muri, apri o chiudi porte.
   Ogni intervento è salvato in un elenco (si annulla con un tocco); dopo ogni intervento le stanze si ricalcolano da sole.
   Nella tavola di confronto: demolizioni in giallo, costruzioni in rosso, come nelle pratiche edilizie. */

const RZ_SP = p => p.scala ? 0.1 / p.scala : 6;                       // spessore di un nuovo tramezzo (10 cm)
const rzDritto = seg => { const s = seg.slice(); if (Math.abs(s[2] - s[0]) > Math.abs(s[3] - s[1])) s[3] = s[1]; else s[2] = s[0]; return s; };

// demolizione: tolgo i pixel di muro in una fascia attorno al tratto segnato (larghezza del muro trovato)
function rzDemolisci(m, W, H, seg, p) {
  const [x0, y0, x1, y1] = seg, oriz = Math.abs(x1 - x0) >= Math.abs(y1 - y0), maxSp = p.scala ? 0.6 / p.scala : 40;
  const a = oriz ? Math.min(x0, x1) : Math.min(y0, y1), b = oriz ? Math.max(x0, x1) : Math.max(y0, y1), c = oriz ? y0 : x0;
  for (let t = Math.round(a); t <= b; t++) {
    // a ogni passo cerco lo spessore del muro attorno alla linea e lo svuoto
    for (const dir of [1, -1]) { let trovato = false;
      for (let k = dir === 1 ? 0 : -1; Math.abs(k) <= maxSp; k += dir) {
        const x = Math.round(oriz ? t : c + k), y = Math.round(oriz ? c + k : t); if (x < 0 || y < 0 || x >= W || y >= H) break; const i = y * W + x;
        if (m[i]) { trovato = true; m[i] = 0; } else if (trovato || Math.abs(k) > maxSp / 2) break; } }
  }
}
// apertura di una porta larga 80 cm, centrata dove tocchi, nel verso del muro
function rzPortaSeg(m, W, H, q, p) {
  const r = Math.round((p.scala ? 0.5 / p.scala : 30)); let nx = 0, ny = 0;
  for (let k = -r; k <= r; k++) { if (m[q[1] * W + q[0] + k]) nx++; if (m[(q[1] + k) * W + q[0]]) ny++; }
  const half = (p.scala ? 0.4 / p.scala : 25), oriz = nx >= ny;
  return oriz ? [q[0] - half, q[1], q[0] + half, q[1]] : [q[0], q[1] - half, q[0], q[1] + half];
}
function rzApplica(p) {
  for (const e of p.lavori || []) {
    if (e.t === "demol" || e.t === "porta") rzDemolisci(RS.muri, p.W, p.H, e.seg, p);
    else if (e.t === "muro") fzMuroInMaschera(RS.muri, p.W, p.H, e.seg, RZ_SP(p));
  }
}
// stanze ricalcolate dai punti toccati; se due stanze diventano una sola, resta quella più grande
function rzRicalcola(p) {
  const out = [], visti = [];
  for (const st of p.stanze || []) {
    if (!st.seed) { out.push(st); continue; }
    const seme = rnSeme(st.poly) || st.seed; st.seed = seme;
    if (visti.some(v => v.reg[seme[1] * p.W + seme[0]])) continue;           // già dentro una stanza unita
    const r = rnStanzaAuto(p, seme);
    if (!r || r.errore) { out.push(st); continue; }
    // se la regione "scappa" (molto più grande delle stanze che contiene) tengo la stanza com'era
    const cont = (p.stanze || []).filter(o => r.reg[(rnSeme(o.poly) || o.seed || [0, 0])[1] * p.W + (rnSeme(o.poly) || o.seed || [0, 0])[0]]).reduce((x, o) => x + RN.area(o.poly), 0);
    if (r.n > Math.max(cont, RN.area(st.poly)) * 1.5) { out.push(st); continue; }
    const poly = RN.contorno(r.reg, p.W, p.H); visti.push({ reg: r.reg });
    // stanze unite: tengo il tipo di quella più grande tra quelle finite qui dentro
    const dentro = (p.stanze || []).filter(o => o.seed && r.reg[o.seed[1] * p.W + o.seed[0]]), grande = dentro.sort((a, b) => RN.area(b.poly) - RN.area(a.poly))[0] || st;
    out.push({ ...grande, poly, fin: dentro.reduce((x, o) => x + (+o.fin || 0), 0) || grande.fin });
  }
  p.stanze = out;
}
async function rzRifai(p) { await rnPrepara(p); rzRicalcola(p); p.mobili = null; rnSalva(); rnDisegna(); rnPannello(); }

/* ---- fase Ristrutturazione nell'editor ---- */
RN_FASI.splice(RN_FASI.findIndex(f => f[0] === "fraz") >= 0 ? RN_FASI.findIndex(f => f[0] === "fraz") : RN_FASI.findIndex(f => f[0] === "risultato"), 0, ["ristr", "Ristrutturazione"]);
{ const prep = rnPrepara; rnPrepara = async function (p) { await prep(p); rzApplica(p); }; }
{ const dis = rnDisegna; rnDisegna = function () { dis(); if (RS.fase !== "ristr") return; const cv = $("#rncv"); if (!cv) return; const g = cv.getContext("2d"), p = RS.p, lw = Math.max(3, p.W / 300);
  // stato di progetto sopra la planimetria: demolizioni gialle, costruzioni rosse
  for (const e of p.lavori || []) { const [x0, y0, x1, y1] = e.seg;
    g.lineCap = "round"; g.lineWidth = e.t === "muro" ? Math.max(lw, RZ_SP(p)) : lw * 3; g.strokeStyle = e.t === "muro" ? "#c0392b" : "#f1c40f"; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
  if (RS.rzA) { g.beginPath(); g.arc(RS.rzA[0], RS.rzA[1], rnTocco1() * 0.5, 0, 7); g.fillStyle = "#6a1828"; g.fill(); }
  if (RS.rzSposta) { const [x0, y0, x1, y1] = RS.rzSposta; g.setLineDash([lw * 3, lw * 2]); g.lineWidth = lw * 2; g.strokeStyle = "#6a1828"; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.setLineDash([]); }
}; }
{ const toc = rnTocco; rnTocco = function (q) { if (RS.fase !== "ristr") return toc(q); const p = RS.p, mode = RS.rzModo || "demol";
  if (mode === "porta") { const seg = rzPortaSeg(RS.muri, p.W, p.H, q, p); p.lavori = [...(p.lavori || []), { t: "porta", seg }]; return rzRifai(p); }
  if (mode === "sposta") {
    if (!RS.rzA) { RS.rzA = q; return rnDisegna(); }
    if (!RS.rzSposta) { RS.rzSposta = rzDritto([RS.rzA[0], RS.rzA[1], q[0], q[1]]); RS.rzA = null; rnDisegna(); return rnGuida("<b>Ora tocca dove vuoi il muro</b>: lo sposto parallelo fino a lì."); }
    const v = RS.rzSposta, oriz = v[1] === v[3], d = oriz ? q[1] - v[1] : q[0] - v[0], nuovo = oriz ? [v[0], v[1] + d, v[2], v[3] + d] : [v[0] + d, v[1], v[2] + d, v[3]];
    p.lavori = [...(p.lavori || []), { t: "demol", seg: v, g: "sposta" }, { t: "muro", seg: nuovo, g: "sposta" }]; RS.rzSposta = null; return rzRifai(p);
  }
  if (!RS.rzA) { RS.rzA = q; rnDisegna(); return; }
  const seg = rzDritto([RS.rzA[0], RS.rzA[1], q[0], q[1]]); RS.rzA = null;
  p.lavori = [...(p.lavori || []), { t: mode === "muro" ? "muro" : "demol", seg }];
  if (mode === "muro") { fzMuroInMaschera(RS.muri, p.W, p.H, seg, RZ_SP(p)); fzTagliaStanze(p, seg); (p.stanze || []).forEach(st => { st.seed = rnSeme(st.poly) || st.seed; });
    p.mobili = null; rnSalva(); rnDisegna(); rnPannello(); return; }
  return rzRifai(p);
}; }
{ const pan = rnPannello; rnPannello = function () { if (RS.fase !== "ristr") return pan(); const el = $("#rnpan"), p = RS.p; if (!el) return;
  const mode = RS.rzModo || "demol", L = p.lavori || [];
  const guida = { demol: "<b>Abbatti un muro</b>: tocca un capo e poi l'altro del tratto da togliere. Le stanze si uniscono da sole.",
    muro: "<b>Nuovo muro</b>: tocca i due capi (diventa dritto da solo). La stanza attraversata si divide in due: poi scegli cosa diventano.",
    sposta: "<b>Sposta un muro</b>: tocca i due capi del muro, poi il punto dove lo vuoi.", porta: "<b>Apri una porta</b>: tocca il muro dove la vuoi (80 cm). Per <b>chiudere una porta</b> usa \"Nuovo muro\" sul varco." };
  rnGuida(guida[mode]);
  const mq = st => p.scala ? num(RN.area(st.poly) * p.scala * p.scala, 1) + " m²" : "";
  el.innerHTML = `<div class="chips">${[["demol", "Abbatti"], ["muro", "Nuovo muro"], ["sposta", "Sposta muro"], ["porta", "Apri porta"]].map(([k, t]) => `<button class="chip ${mode === k ? "on" : ""}" data-rzm="${k}">${t}</button>`).join("")}</div>
    ${L.length ? `<div class="btns"><button class="btn sec" data-rzundo>Annulla l'ultimo</button><button class="btn sec" data-rzall>Togli tutti i lavori</button></div>
      <p class="note">${L.filter(e => e.t === "demol").length} demolizioni, ${L.filter(e => e.t === "muro").length} muri nuovi, ${L.filter(e => e.t === "porta").length} porte aperte. In giallo si demolisce, in rosso si costruisce.</p>` : ""}
    <div class="rnsel"><b>Stanze dopo i lavori</b><div class="chips">${(p.stanze || []).map(st => `<button class="chip" data-rzst="${st.id}">${esc(RN_TIPI[st.tipo]?.n || "?")} ${mq(st)}</button>`).join("")}</div>
      <p class="note">Tocca una stanza qui sopra per cambiarle nome (nella fase Stanze).</p></div>
    <div class="btns"><a class="btn pri" href="#rendering/${p.id}/arredo">Arreda</a><a class="btn sec" href="#rendering/${p.id}/risultato">Risultato</a></div>`;
  el.querySelectorAll("[data-rzm]").forEach(b => b.addEventListener("click", () => { RS.rzModo = b.dataset.rzm; RS.rzA = null; RS.rzSposta = null; rnPannello(); rnDisegna(); }));
  el.querySelector("[data-rzundo]")?.addEventListener("click", () => { const u = L[L.length - 1]; p.lavori = L.slice(0, u?.g ? -2 : -1); rzRifai(p); });
  el.querySelector("[data-rzall]")?.addEventListener("click", () => { if (confirm("Togliere tutti i lavori?")) { p.lavori = []; rzRifai(p); } });
  el.querySelectorAll("[data-rzst]").forEach(b => b.addEventListener("click", () => { RS.sel = p.stanze.find(x => x.id === b.dataset.rzst); location.hash = `#rendering/${p.id}/stanze`; }));
}; }

/* ---- tavola di confronto (stato di fatto / progetto) nel risultato ---- */
{ const sv = rnSvg; rnSvg = function (p, opt = {}) { const out = sv(p, opt); if (!opt.lavori || opt.solo === "sotto" || !(p.lavori || []).length) return out;
  const k = 1 / (p.scala || 0.01), x = (p.lavori || []).map(e => { const [x0, y0, x1, y1] = e.seg;
    return `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="${e.t === "muro" ? "#c0392b" : "#f1c40f"}" stroke-width="${(e.t === "muro" ? 0.14 : 0.3) * k}" stroke-linecap="round" stroke-opacity=".9"/>`; }).join("");
  return out.replace(/<\/svg>$/, `${x}</svg>`); }; }
