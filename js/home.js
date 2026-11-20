"use strict";
/* ==========================================================================
   KEYSTONE — Home e Seguiti
   Banner delle novità (si riempie da solo con la raccolta delle 10),
   osservatorio: mappa d'Italia 3D leggera con gli immobili seguiti,
   accesso rapido alle due sezioni, classifica, notizie.
   ========================================================================== */
/* ---- novità dagli avvisi giornalieri di Immobiliare (data/novita.js) ---- */
const novDati = () => (typeof NOVITA !== "undefined" ? NOVITA : { giorni: [], dal: {} });
const novUltimo = () => [...novDati().giorni].reverse().find(g => g.inv.length || g.mil.length) || null;
const novData = d => d ? d.split("-").reverse().slice(0, 2).join("/") : "";
/* un immobile d'investimento è "nuovo" se è arrivato con l'ultimo avviso (o oggi) */
function isNuovoInv(im) { const u = novUltimo(); return !!im.trovato && (im.trovato === oggi || (u && im.trovato >= u.data)); }
function novBanner() {
  const u = novUltimo(); if (!u || store.get("nov_visto", "") >= u.data) return "";
  const ni = u.inv.length, nm = u.mil.length, np = u.priv.length;
  return `<div class="novb" id="novb"><div><small>Novità del ${novData(u.data)}</small>
    <b>${[ni ? `${ni} immobil${ni === 1 ? "e" : "i"} per investire` : "", nm ? `${nm} annunci${nm === 1 ? "o" : ""} a Milano${np ? ` (${np} di privati)` : ""}` : ""].filter(Boolean).join(" · ")}</b>
    <span>${ni ? `<a href="#inv/classifica" data-nov="inv">Vedi gli investimenti</a>` : ""}${np ? `<a href="#milano/privati" data-nov="priv">Vedi i privati</a>` : ""}${nm && !np ? `<span>Aggiunti al database delle valutazioni</span>` : ""}</span></div>
    <button aria-label="Chiudi" data-novx>✕</button></div>`;
}
function homeNovita() {
  const nov = [];
  [...AUTO].sort((a, b) => (b.trovato || "").localeCompare(a.trovato || "")).slice(0, 10).forEach(im => {
    const A = analizza(im); nov.push({ h: `#imm/auto/${encodeURIComponent(im.id)}`, tag: im.trovato === oggi ? "Nuovo oggi" : isNuovoInv(im) ? "Nuovo" : "In archivio", t: `${im.comune} · ${eur(im.prezzo)}`, s: A.score != null ? `${A.score} punti · netto ${pct(A.rend)}` : "" });
  });
  [...NOTIZIE].sort((a, b) => (b.data || "").localeCompare(a.data || "")).slice(0, 4).forEach(n => nov.push({ h: "#notizie", tag: "Notizia", t: n.titolo, s: n.comune || n.regione || "" }));
  if (nov.length < 6) {
    [...MIEI].sort((a, b) => (b.aggiunto || "").localeCompare(a.aggiunto || "")).slice(0, 6).forEach(im => { const A = analizza(im);
      nov.push({ h: `#imm/miei/${encodeURIComponent(im.id)}`, tag: "In archivio", t: `${im.comune} · ${eur(im.prezzo)}`, s: A.score != null ? `${A.score} punti` : "" }); });
    const A = mmAnnunci(), pv = A.filter(a => a.priv);
    nov.push({ h: "#milano/privati", tag: "Milano", t: `${num(A.length)} annunci in vendita sulla mappa`, s: `${pv.length} di privati` });
  }
  return nov;
}
/* classifica dei comuni dove conviene cercare: spunto per le ricerche da mandare con i link */
const immSlug = n => tnorm(n).replace(/[^a-z0-9 ]/g, "").trim().replace(/\s+/g, "-");
function homeDove() {
  const k = store.get("dove_k", "breve"), I = tIdx();
  let R;
  const net = (ctx, uso) => { try { const r = vCalcola({ mq: 50, locali: 2, stato: "buono", arredato: false }, ctx).sc.list[uso]; return r ? r.rendNetto : null; } catch (e) { return null; } };
  if (k === "breve") R = I.br.map(s => ({ s, d: tDist(s.lat, s.lon) })).filter(x => x.s.com?.v && x.d && x.d.min <= 180)
    .map(({ s, d }) => ({ n: s.n, p: s.p, val: net({ v: s.com.v, a: s.com.a, str: s, nome: s.n, milano: false }, "breve"), sub: `${eur(s.adr * T_BILO)} a notte · ${pct(s.occ, 0)} · ${eur(s.com.v)}/m²`, d, an: `#brevi/${encodeURIComponent(s.n)}` }));
  else R = I.com.filter(c => c.rl && c.princ && c.lat != null).map(c => ({ c, d: tDist(c.lat, c.lon) })).filter(x => x.d && x.d.min <= 180)
    .map(({ c, d }) => ({ n: c.n, p: c.p, val: net({ v: c.v, a: c.a, nome: c.n, milano: false }, "lungo"), sub: `${eur(c.v)}/m² · affitto ${num(c.a, 1)} €/m² al mese`, d }));
  R = R.filter(x => x.val != null).sort((a, b) => b.val - a.val).slice(0, 10);
  const max = Math.max(...R.map(x => x.val), 1e-9);
  return `<div class="dove">${R.map((x, i) => `<div class="dv"><b>${i + 1}</b><span><a href="${esc(immUrl(x.n))}" target="_blank" rel="noopener">${esc(x.n)} <i>(${esc(x.p)})</i> ↗</a><small>${x.sub} · ${tOre(x.d.min)}</small>
    <span class="tb"><span style="width:${Math.max(4, x.val / max * 100)}%"></span></span></span><em>${pct(x.val, 1)}${x.an ? `<a href="${x.an}">analisi</a>` : ""}</em></div>`).join("")}</div>
  <p class="note">Rendimento netto di un bilocale di 50 m² comprato al prezzo medio del comune (più costi d'acquisto e arredo) e ${k === "breve" ? "affittato a notte" : "affittato con contratto normale"}, dopo spese e tasse. Tempo di viaggio da casa tua. Tocca il nome per guardare gli annunci su Immobiliare.</p>`;
}
function homeTop() {
  return invAll().map(x => ({ ...x, A: analizza(x.im) })).filter(x => x.A.score != null).sort((a, b) => b.A.score - a.A.score);
}
function vHomeK() {
  const top = homeTop(), seg = segAll(), dal = novDati().dal || {};
  // 1. arrivati da Immobiliare (fino a 60.000 €), i più recenti prima
  const arr = top.filter(x => x.src === "auto").sort((a, b) => (b.im.trovato || "").localeCompare(a.im.trovato || "") || b.A.score - a.A.score).slice(0, 12);
  // 2. affare del giorno: il punteggio più alto tra gli arrivi recenti
  const rec = arr.filter(x => isNuovoInv(x.im)), aff = (rec.length ? rec : arr).slice().sort((a, b) => b.A.score - a.A.score)[0];
  const perche = x => [x.im.mq ? `${eur(x.im.prezzo / x.im.mq)}/m²` : "", x.A.best ? `rende meglio come ${CATS[x.A.best].toLowerCase()}` : "", x.A.val?.sconto > 0.05 ? `${pct(x.A.val.sconto, 0)} sotto il mercato` : "", x.im.affitti?.lungo?.stima === false ? "già affittato" : ""].filter(Boolean).join(" · ");
  // 3. privati di Milano sotto la media della microzona (solo quelli con la descrizione già letta), i più recenti prima
  const OK = new Set((TERR.milano.priv_ok || []).map(String)), M = TERR.milano.micro, priv = mmAnnunci().filter(a => a.priv && a.micro && OK.has(String(a.id).replace(/^i/, ""))).map(a => { const mi = M.find(m => m.n === a.micro); return { ...a, dlt: mi ? a.mq2 / mi.v - 1 : 0, dal: dal[String(a.id).replace(/^i/, "")] || "" }; })
    .filter(a => a.dlt < -0.05).sort((a, b) => b.dal.localeCompare(a.dal) || a.dlt - b.dlt).slice(0, 4);
  return `${novBanner()}
  ${arr.length ? `<h2>Da Immobiliare <small><a href="#inv/classifica" data-src="auto">fino a 60.000 €</a></small></h2>
  <div class="hrow">${arr.map(x => { const st = stato(x.A.score); return `<a class="hcard" href="#imm/auto/${encodeURIComponent(x.im.id)}">${win(x.im, st.col, isNuovoInv(x.im) ? `<span class="tag new hnew">nuovo</span>` : "")}
    <b>${esc(x.im.comune)}</b><span>${eur(x.im.prezzo)} · ${num(x.im.mq)} m²</span><i style="--pc:${st.col}">${x.A.score}</i></a>`; }).join("")}</div>` : ""}
  ${aff ? `<h2>L'affare del giorno</h2>
  <a class="affare" href="#imm/${aff.src}/${encodeURIComponent(aff.im.id)}">${win(aff.im, stato(aff.A.score).col)}
    <div><small>${esc(aff.im.comune)}${aff.im.provincia ? ` (${esc(aff.im.provincia)})` : ""}</small><b>${esc(aff.im.titolo || "Immobile")}</b>
    <span>${eur(aff.im.prezzo)} · ${num(aff.im.mq)} m² · netto <strong>${pct(aff.A.rend)}</strong></span><em>${esc(perche(aff))}</em></div><i class="t10s" style="--pc:${stato(aff.A.score).col}">${aff.A.score}</i></a>` : ""}
  <h2>Classifica generale <small><a href="#inv/classifica">Tutta</a></small></h2>
  <div class="t10">${top.slice(0, 10).map((x, i) => { const st = stato(x.A.score), im = x.im;
    return `<a class="t10r" href="#imm/${x.src}/${encodeURIComponent(im.id)}"><b class="t10n">${i + 1}</b>${win(im, st.col)}
      <span class="t10t"><small>${esc([im.comune, im.zona].filter(Boolean).join(" · "))}</small><em>${esc(im.titolo || "Immobile")}</em>
      <span>${eur(im.prezzo)} · ${num(im.mq)} m² · netto <strong>${pct(x.A.rend)}</strong>${x.A.best ? ` come ${CATS[x.A.best]}` : ""}</span></span>
      <i class="t10s" style="--pc:${st.col}">${x.A.score}</i></a>`; }).join("") || `<p class="note">Ancora nessun immobile in classifica.</p>`}</div>
  ${priv.length ? `<h2>Milano · privati sotto la media <small><a href="#milano/privati">Tutti</a></small></h2>
  <div class="plist">${priv.map(a => `<a class="pcard" href="#milano/privati/${encodeURIComponent(a.id)}"><div class="pc1"><b>${esc(a.via || a.micro)}</b><span>${esc(a.micro)} · ${a.mq} m²${a.dal ? ` · dal ${novData(a.dal)}` : ""}</span></div>
    <div class="pc3"><b>${eur(a.p)}</b><em><i class="s-good">−${pct(-a.dlt, 0)} zona</i></em></div></a>`).join("")}</div>` : ""}
  ${seg.length ? `<h2>Seguiti <small><a href="#seguiti">Tutti</a></small></h2><div class="segrow">${seg.slice(0, 12).map(x => `<a href="${esc(x.href || x.url)}" ${x.url ? 'target="_blank" rel="noopener"' : ""}>★ ${esc(x.t)}</a>`).join("")}</div>` : ""}
  ${NOTIZIE.length ? `<h2>Notizie <small><a href="#notizie">Tutte</a></small></h2><div class="list">${[...NOTIZIE].sort((a, b) => (b.data || "").localeCompare(a.data || "")).slice(0, 3).map(cardNews).join("")}</div>` : ""}`;
}
/* mappa d'Italia: stile Carbone e oro con rilievi (ombreggiatura delle montagne) e nomi di città, laghi e regioni */
function itStile() {
  const S = "ofm"; plSet();
  return { version: 8, glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
    sources: { [S]: { type: "vector", url: "https://tiles.openfreemap.org/planet" },
      dem: { type: "raster-dem", tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"], encoding: "terrarium", tileSize: 256, maxzoom: 12, attribution: "Rilievi: Mapzen / AWS Terrain Tiles" } },
    layers: [...plBase(S, { flat: true }).filter(l => l.id !== "place"),
      { id: "hill", type: "hillshade", source: "dem", paint: { "hillshade-shadow-color": "#000000", "hillshade-highlight-color": "#6b5a2e", "hillshade-accent-color": "#2a2418", "hillshade-exaggeration": 0.55, "hillshade-illumination-direction": 315 } },
      { id: "lake-lab", type: "symbol", source: S, "source-layer": "water_name", minzoom: 6,
        layout: { "text-field": ["get", "name"], "text-font": ["Noto Sans Regular"], "text-size": 10.5, "text-letter-spacing": 0.08 }, paint: { "text-color": PL.lake, "text-halo-color": PL.halo, "text-halo-width": 1.2 } },
      { id: "town", type: "symbol", source: S, "source-layer": "place", minzoom: 8, filter: ["match", ["get", "class"], ["town", "village"], true, false],
        layout: { "text-field": ["get", "name"], "text-font": ["Noto Sans Regular"], "text-size": ["match", ["get", "class"], "town", 11, 9.5] }, paint: { "text-color": PL.town, "text-halo-color": PL.halo, "text-halo-width": 1.4 } },
      { id: "city", type: "symbol", source: S, "source-layer": "place", filter: ["match", ["get", "class"], ["city"], true, false],
        layout: { "text-field": ["get", "name"], "text-font": ["Noto Sans Regular"], "text-size": ["interpolate", ["linear"], ["zoom"], 5, 10, 9, 14], "text-transform": "uppercase", "text-letter-spacing": 0.12 },
        paint: { "text-color": PL.city, "text-halo-color": PL.halo, "text-halo-width": 1.6 } },
    ] };
}
let HOME_MAP = null;
function homeMappa(el, P, opt = {}) {
  mmLoad().then(() => {
    if (!document.body.contains(el)) return;
    el.innerHTML = "";
    const map = new maplibregl.Map({ container: el, style: itStile(), center: [9.8, 45.75], zoom: 6.3, pitch: 40, bearing: -8, maxPitch: 70, attributionControl: { compact: true }, cooperativeGestures: false });
    HOME_MAP = map; attrChiusa(map); map.scrollZoom.disable(); map.touchZoomRotate.enable();
    el.addEventListener("wheel", e => { if (e.ctrlKey) return; }, { passive: true });
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true, showCompass: false }), "bottom-right");
    map.on("load", () => {
      try { map.setTerrain({ source: "dem", exaggeration: 1.25 }); } catch (e) {}
      map.addSource("p", { type: "geojson", data: { type: "FeatureCollection", features: P.map((p, i) => ({ type: "Feature", properties: { i, r: p.rank || 0, c: p.col || "#f2cf5b" }, geometry: { type: "Point", coordinates: [p.lon, p.lat] } })) } });
      map.addLayer({ id: "glow", type: "circle", source: "p", paint: { "circle-radius": ["case", [">", ["get", "r"], 0], ["case", ["<=", ["get", "r"], 3], 22, 14], 10], "circle-color": "#c9a227", "circle-opacity": 0.18, "circle-blur": 0.9 } });
      map.addLayer({ id: "dot", type: "circle", source: "p", paint: { "circle-radius": ["case", ["all", [">", ["get", "r"], 0], ["<=", ["get", "r"], 3]], 11, [">", ["get", "r"], 0], 8, 5],
        "circle-color": ["case", ["all", [">", ["get", "r"], 0], ["<=", ["get", "r"], 3]], "#facc15", ["get", "c"]], "circle-stroke-color": "#14100a", "circle-stroke-width": 2 } });
      map.addLayer({ id: "rank", type: "symbol", source: "p", filter: [">", ["get", "r"], 0], layout: { "text-field": ["to-string", ["get", "r"]], "text-font": ["Noto Sans Regular"], "text-size": ["case", ["<=", ["get", "r"], 3], 12, 10], "text-allow-overlap": true }, paint: { "text-color": "#14100a" } });
      if (P.length) { const b = new maplibregl.LngLatBounds(); P.forEach(p => b.extend([p.lon, p.lat])); map.fitBounds(b, { padding: 50, maxZoom: opt.maxZoom || 11, pitch: 45, bearing: -8, duration: 1600 }); }
      const pop = (p, ll) => new maplibregl.Popup({ closeButton: false, offset: 14 }).setLngLat(ll).setHTML(`${p.rank ? `<small style="color:#c9a227">N. ${p.rank} in classifica</small><br>` : ""}<b>${esc(p.t)}</b><br>${esc(p.s || "")}<br><a class="go" href="${esc(p.h)}" ${p.ext ? 'target="_blank" rel="noopener"' : ""}>Apri la scheda →</a>`).addTo(map);
      map.on("click", "dot", e => { const p = P[e.features[0].properties.i]; pop(p, e.features[0].geometry.coordinates); });
      map.on("mouseenter", "dot", () => map.getCanvas().style.cursor = "pointer"); map.on("mouseleave", "dot", () => map.getCanvas().style.cursor = "");
      HOME_MAP._fly = i => { const p = P[i]; if (!p) return; map.flyTo({ center: [p.lon, p.lat], zoom: 13, pitch: 55, duration: 1400 }); map.once("moveend", () => pop(p, [p.lon, p.lat])); };
    });
  }).catch(() => { el.innerHTML = `<div class="mapfb">Mappa non disponibile senza connessione.</div>`; });
}
function afterHomeK() {
  const nb = $("#novb"); if (nb) nb.addEventListener("click", e => {
    const u = novUltimo(); if (e.target.closest("[data-nov]")) { if (e.target.closest("[data-nov]").dataset.nov === "inv") store.set("f_inv", { ...store.get("f_inv", INV_F0), src: "oggi" }); }
    if (e.target.closest("[data-nov],[data-novx]") && u) { store.set("nov_visto", u.data); if (e.target.closest("[data-novx]")) nb.remove(); } });
  $("[data-src=auto]")?.addEventListener("click", () => store.set("f_inv", { ...store.get("f_inv", INV_F0), src: "auto" }));
  const el = $("#itmap"); if (!el) return;
  const top = homeTop();
  const P = top.filter(x => x.im.lat != null).map((x, i) => ({ lon: x.im.lng, lat: x.im.lat, rank: i < 10 ? i + 1 : 0, col: stato(x.A.score).col,
    t: x.im.titolo || x.im.comune, s: `${x.im.comune} · ${eur(x.im.prezzo)} · ${x.A.score} punti · netto ${pct(x.A.rend)}`, h: `#imm/${x.src}/${encodeURIComponent(x.im.id)}` }));
  homeMappa(el, P);
  $("#plexp")?.addEventListener("click", () => { const w = $(".plancia"); w.classList.toggle("big"); setTimeout(() => HOME_MAP && HOME_MAP.resize(), 320); });
}
function vSeguiti() {
  const L = segAll();
  return `<div class="hubhead"><small>Osservatorio</small><h1>Seguiti</h1><p class="sub">Gli immobili e gli annunci che tieni d'occhio. Aggiungili con ☆ Segui dalla scheda di un immobile o da un annuncio di Milano.</p></div>
  ${L.length ? `<div class="itmap" id="itmap"><div class="mmload"><div class="spin"></div>Carico la mappa</div></div>
  <div class="vsav" style="margin-top:12px">${L.map(x => `<div class="vs"><div><b><a href="${esc(x.href || x.url)}" ${x.url ? 'target="_blank" rel="noopener"' : ""}>${esc(x.t)}</a></b><span>${esc(x.tipo)} · ${esc(x.s)} · dal ${esc(new Date(x.dal).toLocaleDateString("it-IT"))}</span></div><span></span><button data-unseg="${esc(x.k)}" aria-label="Smetti di seguire">✕</button></div>`).join("")}</div>`
    : `<div class="empty"><b>Ancora niente</b><p>Apri un immobile in <a href="#inv/classifica">Investimenti</a> o un annuncio in <a href="#milano/privati">Milano</a> e tocca ☆ Segui.</p></div>`}`;
}
function afterSeguiti() {
  const el = $("#itmap"); if (!el) return;
  homeMappa(el, segAll().filter(x => x.lat != null).map(x => ({ lon: x.lon, lat: x.lat, t: x.t, s: x.s, h: x.href || x.url, ext: !!x.url })), { maxZoom: 13 });
}
document.addEventListener("click", e => { const b = e.target.closest("[data-unseg]"); if (!b) return; store.set("seguiti", segAll().filter(x => x.k !== b.dataset.unseg)); render(true); });
