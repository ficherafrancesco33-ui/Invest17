/* KEYSTONE — Segui ed Elimina dalla scheda di un immobile, rubrica Seguiti in Home.
   Eliminare nasconde l'annuncio su questo telefono (si può ripristinare dalla pagina Seguiti). */
const nascAll = () => store.get("nascosti", []);
function nascApplica() { const H = new Set(nascAll());
  for (const [arr, src] of [[MIEI, "miei"], [AUTO, "auto"]]) for (let i = arr.length - 1; i >= 0; i--) if (H.has(src + ":" + arr[i].id)) arr.splice(i, 1); }
window.__TUTTI = { miei: MIEI.slice(), auto: AUTO.slice() };
nascApplica();
// scheda: bottone Elimina accanto a Segui
{ const v0 = vScheda; vScheda = function (src, id) { const h = v0(src, id); if (!findIm(src, id)) return h;
  return h.replace('<div class="schtop"><span></span>', `<div class="schtop"><button class="delbtn" data-delim="${src}|${esc(id)}">✕ Elimina</button>`); }; }
document.addEventListener("click", e => {
  const b = e.target.closest("[data-delim]"); if (!b) return; e.preventDefault();
  if (!b.classList.contains("conf")) { b.classList.add("conf"); b.textContent = "Tocca di nuovo per eliminare"; setTimeout(() => { if (document.body.contains(b)) { b.classList.remove("conf"); b.textContent = "✕ Elimina"; } }, 3500); return; }
  const [src, id] = b.dataset.delim.split("|"); store.set("nascosti", [...new Set([...nascAll(), src + ":" + id])]);
  store.set("seguiti", segAll().filter(x => x.k !== "i:" + src + ":" + id)); nascApplica(); location.hash = "#inv/classifica";
});
document.addEventListener("click", e => { const b = e.target.closest("[data-ripristina]"); if (!b) return; store.set("nascosti", []);
  for (const src of ["miei", "auto"]) { const arr = src === "miei" ? MIEI : AUTO; arr.splice(0, arr.length, ...window.__TUTTI[src]); } render(true); });
// pagina Seguiti di nuovo attiva, con la classifica dei seguiti
{ const v0 = vSeguiti; vSeguiti = function () { let h = v0(); const L = segAll().filter(x => x.k.startsWith("i:")).map(x => { const [, src, id] = x.k.split(":"); const im = findIm(src, id); return im ? { im, src, A: analizza(im) } : null; }).filter(Boolean).sort((a, b) => (b.A.rend || 0) - (a.A.rend || 0));
  const cl = L.length ? `<h2>Classifica dei tuoi seguiti <small>per rendita netta</small></h2><div class="t10">${L.map((x, i) => { const st = stato(x.A.score), im = x.im;
    return `<a class="t10r" href="#imm/${x.src}/${encodeURIComponent(im.id)}"><b class="t10n">${i + 1}</b>${win(im, st.col)}<span class="t10t"><small>${esc(im.comune || "")}</small><em>${esc(im.titolo || "Immobile")}</em><span>${eur(im.prezzo)} · ${num(im.mq)} m² · netto <strong>${pct(x.A.rend)}</strong></span></span><i class="t10s" style="--pc:${st.col}">${x.A.score}</i></a>`; }).join("")}</div>` : "";
  const n = nascAll().length;
  return h.replace('<div class="vsav"', cl + '<h2>Tutti i seguiti</h2><div class="vsav"') + (n ? `<p class="note" style="margin-top:14px">Hai eliminato ${n} annunci${n === 1 ? "o" : ""}. <button class="lnk" data-ripristina>Ripristinali tutti</button></p>` : ""); }; }
