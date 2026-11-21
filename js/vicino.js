/* KEYSTONE — "Vicino a": minuti in auto da ospedale, università e lago sulle schede degli investimenti,
   e un filtro per vedere solo quelli entro 15 minuti. I tempi vengono da data/dintorni.js (già calcolati). */
(function () {
  const css = `.vic{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
.vic span{display:inline-flex;align-items:center;gap:4px;height:22px;padding:0 8px;border-radius:999px;font:600 11px/1 var(--body,sans-serif);border:1px solid var(--line2);color:var(--tx2,var(--tx));background:rgba(255,255,255,.04)}
.vic span i{font-style:normal;color:var(--cy2,var(--cy))}
.vic span.ok{border-color:rgba(var(--accrgb),.55);background:rgba(var(--accrgb),.12)}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const MAX = 15;
  window.vicMin = function (im) {
    const P = window.DT_PRE && DT_PRE[String(im.id).replace(/^auto-/, "")]; if (!P) return null;
    const g = {}; P.forEach(p => { if (g[p[0]] == null || p[4] < g[p[0]]) g[p[0]] = p[4]; }); return g;
  };
  const chip = (ico, t, m) => m == null ? "" : `<span class="${m <= MAX ? "ok" : ""}"><i>${ico}</i>${t} ${m < 1 ? 1 : m}′</span>`;
  window.vicChips = function (im) {
    const g = vicMin(im); if (!g) return "";
    return `<div class="vic">${chip("H", "Ospedale", g.ospedale)}${chip("U", "Università", g.uni)}${g.lago != null && g.lago <= 25 ? chip("≈", "Lago", g.lago) : ""}${g.stazione != null && g.stazione <= 10 ? chip("▣", "Stazione", g.stazione) : ""}</div>`;
  };
  // schede nelle liste
  const c0 = cardIm; cardIm = function (A, src, rank) { const h = c0(A, src, rank); const v = vicChips(A.im); return v ? h.replace(/<div class="tags">/, v + '<div class="tags">') : h; };
  // filtro
  const VIC = [["", "Ovunque"], ["osp", "Ospedale ≤ 15′"], ["uni", "Università ≤ 15′"], ["ou", "Ospedale e università"], ["lago", "Lago ≤ 25′"]];
  const ok = (im, k) => { if (!k) return true; const g = vicMin(im); if (!g) return false;
    return k === "osp" ? g.ospedale <= MAX : k === "uni" ? g.uni <= MAX : k === "ou" ? g.ospedale <= MAX && g.uni <= MAX : k === "lago" ? g.lago <= 25 : true; };
  const r0 = invRows; invRows = function (f, z) { return r0(f, z).filter(x => ok(x.im, f.vic)); };
  const f0 = invFiltri; invFiltri = function (f, regs, noReg) {
    return f0(f, regs, noReg).replace('<div class="selrow">', `<div class="chips" data-vicrow>${VIC.map(([k, t]) => `<button class="chip ${(f.vic || "") === k ? "on" : ""}" data-vic="${k}">${t}</button>`).join("")}</div><div class="selrow">`);
  };
  const b0 = bindInvFiltri; bindInvFiltri = function (key, f) { b0(key, f); const box = $("#invf"); if (!box) return;
    box.addEventListener("click", e => { const c = e.target.closest("[data-vic]"); if (!c) return; f.vic = c.dataset.vic; store.set(key, f); render(true); }); };
  // scheda: riga sotto il prezzo
  const v0 = vScheda; vScheda = function (src, id) { const h = v0(src, id), im = findIm(src, id); if (!im) return h; const v = vicChips(im); return v ? h.replace('<div class="verdict">', v + '<div class="verdict">') : h; };
  if (/^#(inv|imm)/.test(location.hash)) render();
})();
