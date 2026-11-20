"use strict";
/* ==========================================================================
   KEYSTONE — Home e Seguiti
   Banner delle novità (si riempie da solo con la raccolta delle 10),
   osservatorio: mappa d'Italia 3D leggera con gli immobili seguiti,
   accesso rapido alle due sezioni, classifica, notizie.
   ========================================================================== */
function homeNovita() {
  const nov = [];
  [...AUTO].sort((a, b) => (b.trovato || "").localeCompare(a.trovato || "")).slice(0, 10).forEach(im => {
    const A = analizza(im); nov.push({ h: `#imm/auto/${encodeURIComponent(im.id)}`, tag: im.trovato === oggi ? "Nuovo oggi" : "Nuovo", t: `${im.comune} · ${eur(im.prezzo)}`, s: A.score != null ? `${A.score} punti · netto ${pct(A.rend)}` : "" });
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
  <p class="note">Rendimento netto di un bilocale di 50 m² comprato al prezzo medio del comune (più costi d'acquisto e arredo) e ${k === "breve" ? "affittato a notte" : "affittato con contratto normale"}, dopo spese e tasse. Tempo di viaggio da casa tua. Tocca il nome per aprire la ricerca su Immobiliare: scegli gli annunci che ti piacciono e mandami il link.</p>`;
}
function homeTop() {
  return invAll().map(x => ({ ...x, A: analizza(x.im) })).filter(x => x.A.score != null).sort((a, b) => b.A.score - a.A.score);
}
function vHomeK() {
  const nov = homeNovita(), top = homeTop(), seg = segAll();
  const A = mmAnnunci(), visti = new Set(store.get("ann_visti", [])), nuoviPriv = A.filter(a => a.priv && !visti.has(a.id)).length;
  const tick = nov.map(n => `<a class="tk" href="${n.h}"><i>${esc(n.tag)}</i><b>${esc(n.t)}</b>${n.s ? `<span>${esc(n.s)}</span>` : ""}</a>`).join("");
  return `<div class="ticker" aria-label="Novità"><div class="tkt">${tick}${tick}</div></div>
  <h2>I migliori 10 <small><a href="#inv/classifica">Classifica completa</a></small></h2>
  <div class="t10">${top.slice(0, 10).map((x, i) => { const st = stato(x.A.score), im = x.im;
    return `<a class="t10r" href="#imm/${x.src}/${encodeURIComponent(im.id)}"><b class="t10n">${i + 1}</b>${win(im, st.col)}
      <span class="t10t"><small>${esc([im.comune, im.zona].filter(Boolean).join(" · "))}</small><em>${esc(im.titolo || "Immobile")}</em>
      <span>${eur(im.prezzo)} · ${num(im.mq)} m² · netto <strong>${pct(x.A.rend)}</strong>${x.A.best ? ` come ${CATS[x.A.best]}` : ""}</span></span>
      <i class="t10s" style="--pc:${st.col}">${x.A.score}</i></a>`; }).join("") || `<p class="note">Mandami un link per iniziare la classifica.</p>`}</div>
  <a class="homecm" href="#completa"><span><b>Completa Milano</b>Tocca le zone sulla mappa e raccogli i link di Immobiliare</span><em>${TERR.milano.micro.filter(m => cmLinks()[m.n]).length}/${TERR.milano.micro.length}</em></a>
  <h2>Dove cercare <small><a href="#inv/dove">Tutti i comuni</a></small></h2>
  <div class="chips" id="dovek">${[["breve", "B&B"], ["lungo", "Affitto normale"]].map(([k, t]) => `<button class="chip ${k === store.get("dove_k", "breve") ? "on" : ""}" data-k="${k}">${t}</button>`).join("")}</div>
  <div id="dove">${homeDove()}</div>
  ${seg.length ? `<h2>Seguiti <small><a href="#seguiti">Tutti</a></small></h2><div class="segrow">${seg.slice(0, 12).map(x => `<a href="${esc(x.href || x.url)}" ${x.url ? 'target="_blank" rel="noopener"' : ""}>★ ${esc(x.t)}</a>`).join("")}</div>` : ""}
  ${NOTIZIE.length ? `<h2>Notizie <small><a href="#notizie">Tutte</a></small></h2><div class="list">${[...NOTIZIE].sort((a, b) => (b.data || "").localeCompare(a.data || "")).slice(0, 3).map(cardNews).join("")}</div>` : ""}
  <h2>Guida <small><a href="#guida">Tutta la guida</a></small></h2>
  <div class="list">${GUIDA.slice(0, 2).map(cardGuida).join("")}</div>`;
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
    HOME_MAP = map; map.scrollZoom.disable(); map.touchZoomRotate.enable();
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
  const el = $("#itmap"); if (!el) return;
  const top = homeTop();
  const P = top.filter(x => x.im.lat != null).map((x, i) => ({ lon: x.im.lng, lat: x.im.lat, rank: i < 10 ? i + 1 : 0, col: stato(x.A.score).col,
    t: x.im.titolo || x.im.comune, s: `${x.im.comune} · ${eur(x.im.prezzo)} · ${x.A.score} punti · netto ${pct(x.A.rend)}`, h: `#imm/${x.src}/${encodeURIComponent(x.im.id)}` }));
  homeMappa(el, P);
  $("#dovek")?.addEventListener("click", e => { const c = e.target.closest("[data-k]"); if (!c) return; store.set("dove_k", c.dataset.k);
    document.querySelectorAll("#dovek .chip").forEach(x => x.classList.toggle("on", x === c)); $("#dove").innerHTML = homeDove(); });
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
