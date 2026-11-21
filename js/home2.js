/* KEYSTONE — Home "vetro": solo informazioni utili.
   Numeri in alto, il migliore dei seguiti, le sezioni a tessere (Seguiti, Rendering, Valutazioni, Investimenti, Milano),
   la classifica dei seguiti per rendita netta e gli ultimi arrivi da Immobiliare. */
(function () {
  const css = `
.kh{position:relative;padding-bottom:10px}
.kh .orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:.55;pointer-events:none;z-index:0}
.kh .o1{width:260px;height:260px;left:-90px;top:-40px;background:rgba(var(--accrgb),.35)}
.kh .o2{width:300px;height:300px;right:-120px;top:280px;background:rgba(170,40,80,.35)}
.kh .o3{width:220px;height:220px;left:20%;top:760px;background:rgba(var(--accrgb),.22)}
.kh>*:not(.orb){position:relative;z-index:1}
.gl{background:linear-gradient(145deg,rgba(255,255,255,.11),rgba(255,255,255,.035));border:1px solid rgba(255,255,255,.13);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 10px 30px rgba(0,0,0,.28);backdrop-filter:blur(18px) saturate(140%);-webkit-backdrop-filter:blur(18px) saturate(140%);border-radius:22px}
:root[data-th=sabbia] .gl{background:linear-gradient(145deg,rgba(255,255,255,.85),rgba(255,255,255,.55));border-color:rgba(0,0,0,.06)}
.kh-date{display:flex;justify-content:space-between;align-items:baseline;margin:4px 2px 12px;color:var(--muted);font-size:12.5px;letter-spacing:.12em;text-transform:uppercase}
.kh-date b{color:var(--cy2,var(--cy));font-weight:600;letter-spacing:.14em}
.kh-stats{display:flex;gap:9px;overflow-x:auto;scrollbar-width:none;margin:0 -2px 14px;padding:2px}
.kh-stats::-webkit-scrollbar{display:none}
.kh-stat{flex:0 0 auto;min-width:104px;padding:11px 14px;text-decoration:none;color:var(--tx)}
.kh-stat strong{display:block;font:600 24px/1.1 var(--serif,Georgia,serif);color:var(--cy2,var(--cy))}
.kh-stat span{font-size:11.5px;color:var(--muted)}
.kh-hero{display:block;position:relative;height:230px;border-radius:26px;overflow:hidden;text-decoration:none;color:#fff;margin-bottom:14px;box-shadow:0 18px 40px rgba(0,0,0,.4)}
.kh-hero .bg{position:absolute;inset:0}.kh-hero .bg .win{position:absolute;inset:0;width:100%;height:100%;border-radius:0}
.kh-hero .bg img{width:100%;height:100%;object-fit:cover;transform:scale(1.04);animation:khzoom 18s ease-in-out infinite alternate}
.kh-hero::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(10,4,8,.78));z-index:1}
.kh-hero::after{content:"";position:absolute;top:-60%;left:-60%;width:45%;height:220%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.22),transparent);transform:rotate(18deg);animation:khsheen 7s ease-in-out infinite;z-index:2}
.kh-hero .cap{position:absolute;left:12px;right:12px;bottom:12px;z-index:3;padding:12px 14px;display:flex;justify-content:space-between;align-items:flex-end;gap:10px;border-radius:18px;
  background:linear-gradient(145deg,rgba(255,255,255,.18),rgba(255,255,255,.06));border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.kh-hero small{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#f3d9a0}
.kh-hero b{display:block;font:600 17px/1.2 var(--serif,Georgia,serif);margin-top:2px}
.kh-hero .cap span{font-size:12px;opacity:.85}
.kh-hero .big{font:600 30px/1 var(--serif,Georgia,serif);color:#f3d9a0;white-space:nowrap;text-shadow:0 2px 12px rgba(0,0,0,.4)}
.kh-hero .big em{display:block;font:500 10.5px var(--body,sans-serif);letter-spacing:.12em;text-transform:uppercase;text-align:right;color:#fff;opacity:.75;font-style:normal}
.kh-bento{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:6px}
.kh-t{position:relative;overflow:hidden;padding:14px;min-height:118px;display:flex;flex-direction:column;justify-content:space-between;text-decoration:none;color:var(--tx);transition:transform .25s}
.kh-t:active{transform:scale(.97)}
.kh-t::after{content:"";position:absolute;inset:0;background:radial-gradient(160px 80px at 90% -10%,rgba(var(--accrgb),.22),transparent 70%);pointer-events:none}
.kh-t.w{grid-column:span 2;min-height:0;flex-direction:row;align-items:center;gap:12px}
.kh-ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(145deg,rgba(var(--accrgb),.35),rgba(var(--accrgb),.1));border:1px solid rgba(var(--accrgb),.35);color:var(--cy2,var(--cy))}
.kh-ic svg{width:19px;height:19px}
.kh-t b{font-size:15px;display:block}.kh-t span{font-size:12px;color:var(--muted);display:block;margin-top:2px;line-height:1.3}
.kh-t .n{font:600 26px/1 var(--serif,Georgia,serif);color:var(--cy2,var(--cy));position:absolute;right:14px;top:14px}
.kh-t.w .n{position:static;margin-left:auto;text-align:right}.kh-t.w .n em{display:block;font:500 11px var(--body,sans-serif);color:var(--muted);font-style:normal}
.kh-av{display:flex;margin-left:4px}.kh-av .win{width:30px;height:30px;border-radius:50%;margin-left:-8px;border:2px solid var(--bg);overflow:hidden;flex:0 0 auto}
.kh h2.kh-h{display:flex;justify-content:space-between;align-items:baseline;margin:20px 2px 10px;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--cy)}
.kh h2.kh-h a{font-size:12px;letter-spacing:0;text-transform:none;color:var(--muted);text-decoration:none}
.kh-rk{display:grid;grid-template-columns:22px 52px 1fr auto;gap:11px;align-items:center;padding:9px 12px 9px 10px;margin-bottom:8px;text-decoration:none;color:var(--tx);border-radius:18px}
.kh-rk>b{font:600 16px var(--serif,Georgia,serif);color:var(--cy);text-align:center}
.kh-rk .win{width:52px;height:52px;border-radius:13px;overflow:hidden}
.kh-rk .tt{min-width:0;display:flex;flex-direction:column}
.kh-rk small{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--cy)}
.kh-rk em{font-style:normal;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kh-rk i{font-style:normal;font-size:11.5px;color:var(--muted)}
.kh-rk strong{font:600 18px var(--serif,Georgia,serif);color:var(--cy2,var(--cy))}
.kh-rk:first-of-type strong{background:linear-gradient(90deg,var(--cy),#fff3cf,var(--cy));-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200% 100%;animation:khgold 4s linear infinite}
.kh-empty{padding:16px;font-size:13px;color:var(--muted);line-height:1.45}
.kh-row{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin:0 -14px;padding:2px 14px 6px}
.kh-row::-webkit-scrollbar{display:none}
.kh-c{flex:0 0 148px;scroll-snap-align:start;overflow:hidden;text-decoration:none;color:var(--tx);padding:0;border-radius:18px;position:relative}
.kh-c .win{width:100%;height:104px;border-radius:0}
.kh-c b{display:block;padding:8px 10px 0;font-size:13px}.kh-c span{display:block;padding:0 10px 10px;font-size:11.5px;color:var(--muted)}
.kh-c .p{position:absolute;top:8px;right:8px;z-index:2;padding:3px 9px;border-radius:999px;font:600 12px var(--body,sans-serif);color:#f3d9a0;background:rgba(10,4,8,.55);border:1px solid rgba(243,217,160,.4);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.kh-c .nw{position:absolute;top:8px;left:8px;z-index:2;padding:3px 8px;border-radius:999px;font:700 10px var(--body,sans-serif);letter-spacing:.08em;text-transform:uppercase;background:var(--cy);color:var(--on,#24101a)}
.kh .novb{background:linear-gradient(145deg,rgba(var(--accrgb),.22),rgba(255,255,255,.05));border:1px solid rgba(var(--accrgb),.45);border-radius:20px;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);margin-bottom:14px}
.kh .fu{opacity:0;transform:translateY(14px);animation:khup .6s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes khup{to{opacity:1;transform:none}}
@keyframes khsheen{0%,55%{left:-60%}100%{left:130%}}
@keyframes khzoom{to{transform:scale(1.12)}}
@keyframes khgold{to{background-position:-200% 0}}
@media (prefers-reduced-motion:reduce){.kh *{animation:none!important}.kh .fu{opacity:1;transform:none}}
@media (min-width:760px){.kh-top{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:12px;align-items:stretch;margin-bottom:6px}.kh-top .kh-hero{height:auto;min-height:280px;margin:0}.kh-top .kh-bento{margin:0}.kh-rkl{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}.kh-rkl .kh-empty{grid-column:1/-1}.kh-stats{flex-wrap:wrap}.kh-stat{flex:1 1 140px}}
@media (min-width:1200px){.kh-top .kh-hero{min-height:340px}.kh-rkl{grid-template-columns:1fr 1fr 1fr}.kh-c{flex-basis:180px}.kh-c .win{height:124px}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const IC = {
    seg: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    ren: '<path d="M3 3h18v18H3z"/><path d="M3 12h9v9"/><path d="M12 3v5"/><path d="M16 12h5"/>',
    val: '<path d="M4 20h16"/><path d="M6 16l4-5 3 3 5-7"/><circle cx="18" cy="7" r="1.5"/>',
    inv: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    mil: '<path d="M4 21V9l5-3v15"/><path d="M9 21V4l6 3v14"/><path d="M15 21v-9l5 2v7"/>'
  };
  const ico = k => `<i class="kh-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg></i>`;
  const p1 = v => v == null ? "—" : pct(v);
  const mesi = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"], gg = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];

  function seguitiRank() {
    return segAll().filter(x => x.k.startsWith("i:")).map(x => { const [, src, ...r] = x.k.split(":"), id = r.join(":"), im = findIm(src, id); return im ? { im, src, A: analizza(im) } : null; })
      .filter(Boolean).sort((a, b) => (b.A.rend || 0) - (a.A.rend || 0));
  }
  function miliPriv() {
    try { const OK = new Set((TERR.milano.priv_ok || []).map(String)), M = TERR.milano.micro;
      return mmAnnunci().filter(a => a.priv && a.micro && OK.has(String(a.id).replace(/^i/, ""))).filter(a => { const mi = M.find(m => m.n === a.micro); return mi && mi.v && a.mq2 < mi.v * 0.95; }).length; } catch (e) { return 0; }
  }

  vHomeK = function () {
    const S = seguitiRank(), segN = segAll().length, d = new Date();
    const auto = AUTO.map(im => ({ im, src: "auto", A: analizza(im) })), nuovi = auto.filter(x => isNuovoInv(x.im));
    const arr = auto.slice().sort((a, b) => (b.im.trovato || "").localeCompare(a.im.trovato || "") || (b.A.rend || 0) - (a.A.rend || 0)).slice(0, 12);
    const best = S[0] || auto.slice().sort((a, b) => (b.A.rend || 0) - (a.A.rend || 0))[0];
    const media = S.length ? S.reduce((s, x) => s + (x.A.rend || 0), 0) / S.length : null;
    const val = store.get("valutazioni", []), v0 = val[0], np = miliPriv();
    let k = 0; const fu = () => `fu" style="animation-delay:${(k++) * 60}ms`;
    const hero = best ? `<a class="kh-hero ${fu()}" href="#imm/${best.src}/${encodeURIComponent(best.im.id)}"><div class="bg">${win(best.im, stato(best.A.score).col)}</div>
      <div class="cap"><div><small>${S.length ? "Il migliore dei tuoi seguiti" : "Il più redditizio trovato"}</small><b>${esc(best.im.titolo || best.im.comune)}</b><span>${esc(best.im.comune)} · ${eur(best.im.prezzo)} · ${num(best.im.mq)} m²</span></div>
      <div class="big">${p1(best.A.rend)}<em>netto</em></div></div></a>` : "";
    const rank = S.length ? S.slice(0, 6).map((x, i) => `<a class="kh-rk gl ${fu()}" href="#imm/${x.src}/${encodeURIComponent(x.im.id)}"><b>${i + 1}</b>${win(x.im, stato(x.A.score).col)}
      <span class="tt"><small>${esc(x.im.comune)}</small><em>${esc(x.im.titolo || "Immobile")}</em><i>${eur(x.im.prezzo)} · ${num(x.im.mq)} m²${x.im.canone ? "" : ""}</i></span><strong>${p1(x.A.rend)}</strong></a>`).join("")
      : `<div class="gl kh-empty ${fu()}">Non segui ancora nessun immobile. Apri una scheda e tocca <b>☆ Segui</b>: qui vedrai i tuoi preferiti in ordine di rendita netta.</div>`;
    return `<div class="kh"><i class="orb o1"></i><i class="orb o2"></i><i class="orb o3"></i>
      <div class="kh-date ${fu()}"><span>${gg[d.getDay()]} ${d.getDate()} ${mesi[d.getMonth()]}</span><b>${(() => { const u = novUltimo(); return u ? "Aggiornato il " + novData(u.data) : ""; })()}</b></div>
      ${typeof novBanner === "function" ? novBanner() : ""}
      <div class="kh-stats ${fu()}">
        <a class="kh-stat gl" href="#inv/classifica" data-src="auto"><strong>${AUTO.length}</strong><span>investimenti ≤ 60.000 €</span></a>
        <a class="kh-stat gl" href="#inv/classifica" data-nov="inv"><strong>${nuovi.length}</strong><span>nuovi nell'ultima ricerca</span></a>
        <a class="kh-stat gl" href="#seguiti"><strong>${segN}</strong><span>seguiti</span></a>
        <a class="kh-stat gl" href="#seguiti"><strong>${media != null ? pct(media) : "—"}</strong><span>netto medio seguiti</span></a>
      </div>
      <div class="kh-top">${hero}
      <div class="kh-bento">
        <a class="kh-t gl w ${fu()}" href="#seguiti">${ico("seg")}<div><b>Seguiti</b><span>${segN ? `${segN} immobil${segN === 1 ? "e" : "i"} che tieni d'occhio` : "Tocca ☆ Segui in una scheda"}</span></div>
          <div class="kh-av">${S.slice(0, 4).map(x => win(x.im, stato(x.A.score).col)).join("")}</div></a>
        <a class="kh-t gl ${fu()}" href="#rendering">${ico("ren")}<span class="n" id="khRenN">·</span><div><b>Rendering</b><span id="khRenS">I tuoi progetti</span></div></a>
        <a class="kh-t gl ${fu()}" href="#milano/cliente">${ico("val")}<span class="n">${val.length}</span><div><b>Valutazioni</b><span>${v0 ? `${esc(v0.nome)} · ${eur(v0.valore)}` : "Nessuna salvata"}</span></div></a>
        <a class="kh-t gl ${fu()}" href="#inv/classifica" data-src="auto">${ico("inv")}<span class="n">${AUTO.length}</span><div><b>Investimenti</b><span>Nord Italia, finiti e arredati</span></div></a>
        <a class="kh-t gl ${fu()}" href="#milano/privati">${ico("mil")}<span class="n">${np || ""}</span><div><b>Milano</b><span>${np ? "privati sotto la media di zona" : "Mappa, zone e privati"}</span></div></a>
      </div></div>
      <h2 class="kh-h">Classifica dei seguiti <a href="#seguiti">Tutti</a></h2><div class="kh-rkl">${rank}</div>
      ${arr.length ? `<h2 class="kh-h">Ultimi arrivi da Immobiliare <a href="#inv/classifica" data-src="auto">Tutti</a></h2>
      <div class="kh-row">${arr.map(x => `<a class="kh-c gl" href="#imm/auto/${encodeURIComponent(x.im.id)}">${isNuovoInv(x.im) ? '<span class="nw">Nuovo</span>' : ""}<span class="p">${p1(x.A.rend)}</span>${win(x.im, stato(x.A.score).col)}
        <b>${esc(x.im.comune)}</b><span>${eur(x.im.prezzo)} · ${num(x.im.mq)} m²</span></a>`).join("")}</div>` : ""}
    </div>`;
  };
  afterHomeK = function () {
    const nb = document.getElementById("novb"); if (nb) nb.addEventListener("click", e => { const u = novUltimo();
      if (e.target.closest("[data-nov]") && e.target.closest("[data-nov]").dataset.nov === "inv") store.set("f_inv", { ...store.get("f_inv", INV_F0), src: "oggi" });
      if (e.target.closest("[data-nov],[data-novx]") && u) { store.set("nov_visto", u.data); if (e.target.closest("[data-novx]")) nb.remove(); } });
    document.querySelectorAll(".kh [data-src=auto]").forEach(a => a.addEventListener("click", () => store.set("f_inv", { ...store.get("f_inv", INV_F0), src: "auto" })));
    document.querySelectorAll(".kh [data-nov=inv]").forEach(a => a.addEventListener("click", () => store.set("f_inv", { ...store.get("f_inv", INV_F0), src: "oggi" })));
    if (window.RNDB) RNDB.tutti().then(L => { L = (L || []).sort((a, b) => (b.agg || 0) - (a.agg || 0)); const n = document.getElementById("khRenN"), s = document.getElementById("khRenS");
      if (n) n.textContent = L.length || ""; if (s) s.textContent = L.length ? `Ultimo: ${L[0].nome || "progetto"}` : "Nessun progetto"; }).catch(() => { const n = document.getElementById("khRenN"); if (n) n.textContent = ""; });
  };
  if (!location.hash || /^#home/.test(location.hash)) render();
})();
