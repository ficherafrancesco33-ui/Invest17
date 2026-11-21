/* KEYSTONE — galleria foto nella scheda: scorri col dito, tocca per vederle a tutto schermo.
   Le foto restano sul server di Immobiliare (già compresse): in scheda si carica la misura 800 px, a tutto schermo 1200 px. */
(function () {
  const css = `
.gal{position:relative;height:260px;border-radius:24px;overflow:hidden;background:var(--deep)}
.gal .tr{display:flex;height:100%;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.gal .tr::-webkit-scrollbar{display:none}
.gal .tr img{flex:0 0 100%;width:100%;height:100%;object-fit:cover;scroll-snap-align:center;display:block;background:var(--card2)}
.gal .ct{position:absolute;right:10px;bottom:10px;padding:4px 10px;border-radius:999px;font:600 12px var(--body,sans-serif);color:#fff;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2)}
.gal .dots{position:absolute;left:0;right:0;bottom:12px;display:flex;justify-content:center;gap:5px;pointer-events:none}
.gal .dots i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.45);transition:all .25s}.gal .dots i.on{width:16px;border-radius:3px;background:#fff}
.gal .ar{position:absolute;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(0,0,0,.35);color:#fff;font-size:18px;display:none}
@media (hover:hover){.gal .ar{display:block}}.gal .ar.l{left:10px}.gal .ar.r{right:10px}
.galfs{position:fixed;inset:0;z-index:9999;background:rgba(8,3,6,.96);display:flex;flex-direction:column}
.galfs .tr{flex:1;display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.galfs .tr::-webkit-scrollbar{display:none}
.galfs .tr img{flex:0 0 100%;width:100%;height:100%;object-fit:contain;scroll-snap-align:center}
.galfs .x{position:absolute;top:max(14px,env(safe-area-inset-top));right:14px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.1);color:#fff;font-size:18px;z-index:2}
.galfs .ct{position:absolute;top:max(22px,env(safe-area-inset-top));left:18px;color:#fff;font:600 14px var(--body,sans-serif)}
@media (min-width:760px){.hero .gal{height:100%;min-height:300px}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const U = (id, s) => `https://pwm.im-cdn.it/image/${id}/${s}.jpg`;
  const ids = im => { const G = im.galleria && im.galleria.length ? im.galleria : [im.foto, ...(im.foto_extra || [])].filter(Boolean).map(u => (String(u).match(/image\/(\d+)/) || [])[1]).filter(Boolean); return [...new Set(G)]; };
  function monta(im) {
    const host = document.querySelector(".hero > .win"); if (!host) return; const G = ids(im); if (G.length < 2) return;
    const g = document.createElement("div"); g.className = "gal";
    g.innerHTML = `<div class="tr">${G.map((id, i) => `<img src="${U(id, "s-c")}" alt="" ${i > 1 ? 'loading="lazy"' : ""} referrerpolicy="no-referrer" data-i="${i}">`).join("")}</div>
      <span class="ct">1 / ${G.length}</span>${G.length <= 12 ? `<div class="dots">${G.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("")}</div>` : ""}
      <button class="ar l" aria-label="Precedente">‹</button><button class="ar r" aria-label="Successiva">›</button>`;
    host.replaceWith(g);
    const tr = g.querySelector(".tr"), ct = g.querySelector(".ct"), D = g.querySelectorAll(".dots i");
    const cur = () => Math.round(tr.scrollLeft / tr.clientWidth);
    tr.addEventListener("scroll", () => { const i = cur(); ct.textContent = `${i + 1} / ${G.length}`; D.forEach((d, j) => d.classList.toggle("on", j === i)); }, { passive: true });
    g.querySelector(".l").onclick = () => tr.scrollBy({ left: -tr.clientWidth, behavior: "smooth" });
    g.querySelector(".r").onclick = () => tr.scrollBy({ left: tr.clientWidth, behavior: "smooth" });
    tr.addEventListener("click", e => { const im0 = e.target.closest("img"); if (im0) schermo(G, +im0.dataset.i); });
  }
  function schermo(G, i0) {
    const f = document.createElement("div"); f.className = "galfs";
    f.innerHTML = `<span class="ct">${i0 + 1} / ${G.length}</span><button class="x" aria-label="Chiudi">✕</button><div class="tr">${G.map(id => `<img src="${U(id, "xl")}" alt="" loading="lazy" referrerpolicy="no-referrer">`).join("")}</div>`;
    document.body.appendChild(f); const tr = f.querySelector(".tr"); tr.scrollLeft = i0 * tr.clientWidth;
    tr.addEventListener("scroll", () => { f.querySelector(".ct").textContent = `${Math.round(tr.scrollLeft / tr.clientWidth) + 1} / ${G.length}`; }, { passive: true });
    const chiudi = () => { f.remove(); removeEventListener("keydown", k); }; const k = e => { if (e.key === "Escape") chiudi(); };
    f.querySelector(".x").onclick = chiudi; addEventListener("keydown", k);
  }
  const a0 = afterScheda; afterScheda = function (src, id) { a0(src, id); const im = findIm(src, id); if (im) try { monta(im); } catch (e) {} };
  if (/^#imm\//.test(location.hash)) render();
})();
