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
function vHomeK() {
  const all = invAll().map(x => ({ ...x, A: analizza(x.im) })), ok = all.filter(x => x.A.score != null).sort((a, b) => b.A.score - a.A.score);
  const seg = segAll(), nov = homeNovita(), h = new Date().getHours();
  const saluto = h < 13 ? "Buongiorno" : h < 18 ? "Buon pomeriggio" : "Buonasera";
  const giorno = new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
  const tick = nov.map(n => `<a class="tk" href="${n.h}"><i>${esc(n.tag)}</i><b>${esc(n.t)}</b>${n.s ? `<span>${esc(n.s)}</span>` : ""}</a>`).join("");
  return `<div class="ticker" aria-label="Novità"><div class="tkt">${tick}${tick}</div></div>
  <div class="hello"><small>${esc(giorno)}</small><h1>${saluto}</h1><p class="sub">${AUTO.length ? `${AUTO.filter(x => x.trovato === oggi).length} immobili nuovi oggi · ` : "Nuovi annunci ogni mattina alle 10 · "}${seg.length} seguiti · ${ok.filter(x => x.A.score >= 70).length} affari in classifica</p></div>
  <div class="secs">
    <a class="sec" href="#inv"><small>Nord Italia entro 3 ore</small><b>Investimenti</b><span>Classifica generale, ricerca per zona, mappa B&amp;B, comuni</span><em>${all.length} immobili</em></a>
    <a class="sec" href="#milano"><small>Agenzia e investimenti</small><b>Milano</b><span>Valutazioni ai clienti, B&amp;B, reddito, subaffitto, privati</span><em>${num(mmAnnunci().length)} annunci</em></a>
  </div>
  <div class="quick">${[["#milano/cliente", "cliente", "Valuta per un cliente"], ["#milano/bnb", "bnb", "B&B a Milano"], ["#milano/sub", "sub", "Subaffitto"], ["#milano/privati", "privati", "Privati"], ["#inv/classifica", "classifica", "Classifica"], ["#inv/zona", "zona", "Cerca per zona"]]
    .map(([h, i, t]) => `<a href="${h}">${ico(i)}<span>${t}</span></a>`).join("")}</div>
  <h2>Osservatorio <small><a href="#seguiti">${seg.length ? "Tutti i seguiti" : "Come funziona"}</a></small></h2>
  <div class="itmap" id="itmap"><div class="mmload"><div class="spin"></div>Carico la mappa</div></div>
  <p class="note">${seg.length ? "I puntini rossi sono gli immobili e gli annunci che segui. Tocca un puntino per aprirlo." : "Non segui ancora niente: tocca ☆ Segui nella scheda di un immobile o sotto un annuncio di Milano. Intanto vedi i 12 migliori della classifica."}</p>
  <h2>Podio <small><a href="#inv/classifica">Classifica completa</a></small></h2>
  ${ok.length ? `<div class="list">${ok.slice(0, 3).map((x, i) => cardIm(x.A, x.src, i + 1)).join("")}</div>` : `<p class="sub">Nessun immobile analizzato.</p>`}
  ${NOTIZIE.length ? `<h2>Ultime notizie <small><a href="#notizie">Tutte</a></small></h2><div class="list">${[...NOTIZIE].sort((a, b) => (b.data || "").localeCompare(a.data || "")).slice(0, 3).map(cardNews).join("")}</div>` : ""}
  <h2>Dalla guida <small><a href="#guida">Tutta la guida</a></small></h2>
  <div class="list">${GUIDA.slice(0, 2).map(cardGuida).join("")}</div>`;
}
function homePunti() {
  const seg = segAll().filter(x => x.lat != null);
  if (seg.length) return seg.map(x => ({ lon: x.lon, lat: x.lat, t: x.t, s: x.s, h: x.href || x.url, ext: !!x.url, tipo: x.tipo }));
  return invAll().map(x => ({ ...x, A: analizza(x.im) })).filter(x => x.A.score != null && x.im.lat != null).sort((a, b) => b.A.score - a.A.score).slice(0, 12)
    .map(x => ({ lon: x.im.lng, lat: x.im.lat, t: `${x.im.comune} · ${x.A.score} punti`, s: eur(x.im.prezzo), h: `#imm/${x.src}/${encodeURIComponent(x.im.id)}` }));
}
/* stile leggero: solo terra, acqua, confini e nomi delle città */
function itStile() {
  const S = "ofm";
  return { version: 8, glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
    sources: { [S]: { type: "vector", url: "https://tiles.openfreemap.org/planet" } },
    layers: plBase(S, { flat: true }) };
}
let HOME_MAP = null;
function afterHomeK() {
  const el = $("#itmap"); if (!el) return;
  mmLoad().then(() => {
    if (!document.body.contains(el)) return;
    el.innerHTML = "";
    const P = homePunti();
    const map = new maplibregl.Map({ container: el, style: itStile(), center: [10.6, 45.25], zoom: 5.9, pitch: 48, bearing: -12, attributionControl: { compact: true }, maxPitch: 70 });
    HOME_MAP = map; map.scrollZoom.disable();
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
    map.on("load", () => {
      map.addSource("p", { type: "geojson", data: { type: "FeatureCollection", features: P.map((p, i) => ({ type: "Feature", properties: { i }, geometry: { type: "Point", coordinates: [p.lon, p.lat] } })) } });
      map.addLayer({ id: "glow", type: "circle", source: "p", paint: { "circle-radius": 16, "circle-color": "#ff2d55", "circle-opacity": 0.25, "circle-blur": 0.8 } });
      map.addLayer({ id: "dot", type: "circle", source: "p", paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 5, 12, 9], "circle-color": "#ff2d55", "circle-stroke-color": "#ffffff", "circle-stroke-width": 2.5 } });
      if (P.length) { const b = new maplibregl.LngLatBounds(); P.forEach(p => b.extend([p.lon, p.lat])); map.fitBounds(b, { padding: 60, maxZoom: 11, pitch: 48, bearing: -12, duration: 1800 }); }
      map.on("click", "dot", e => { const p = P[e.features[0].properties.i];
        new maplibregl.Popup({ closeButton: false, offset: 12 }).setLngLat(e.lngLat).setHTML(`<b>${esc(p.t)}</b><br>${esc(p.s || "")}<br><a class="go" href="${esc(p.h)}" ${p.ext ? 'target="_blank" rel="noopener"' : ""}>Apri →</a>`).addTo(map); });
      map.on("mouseenter", "dot", () => map.getCanvas().style.cursor = "pointer"); map.on("mouseleave", "dot", () => map.getCanvas().style.cursor = "");
      // lenta rotazione finché non la tocchi
      let spin = true; const stop = () => spin = false; ["mousedown", "touchstart", "wheel"].forEach(ev => map.on(ev, stop));
      const turn = () => { if (!spin || !document.body.contains(el)) return; map.easeTo({ bearing: map.getBearing() + 4, duration: 4000, easing: t => t }); };
      map.on("moveend", () => spin && setTimeout(turn, 50)); setTimeout(turn, 2000);
    });
  }).catch(() => { el.innerHTML = `<div class="mapfb">Mappa non disponibile senza connessione.</div>`; });
}
function vSeguiti() {
  const L = segAll();
  return `<div class="hubhead"><small>Osservatorio</small><h1>Seguiti</h1><p class="sub">Gli immobili e gli annunci che tieni d'occhio. Aggiungili con ☆ Segui dalla scheda di un immobile o da un annuncio di Milano.</p></div>
  ${L.length ? `<div class="itmap" id="itmap"><div class="mmload"><div class="spin"></div>Carico la mappa</div></div>
  <div class="vsav" style="margin-top:12px">${L.map(x => `<div class="vs"><div><b><a href="${esc(x.href || x.url)}" ${x.url ? 'target="_blank" rel="noopener"' : ""}>${esc(x.t)}</a></b><span>${esc(x.tipo)} · ${esc(x.s)} · dal ${esc(new Date(x.dal).toLocaleDateString("it-IT"))}</span></div><span></span><button data-unseg="${esc(x.k)}" aria-label="Smetti di seguire">✕</button></div>`).join("")}</div>`
    : `<div class="empty"><b>Ancora niente</b><p>Apri un immobile in <a href="#inv/classifica">Investimenti</a> o un annuncio in <a href="#milano/privati">Milano</a> e tocca ☆ Segui.</p></div>`}`;
}
function afterSeguiti() {
  if ($("#itmap")) afterHomeK();
}
document.addEventListener("click", e => { const b = e.target.closest("[data-unseg]"); if (!b) return; store.set("seguiti", segAll().filter(x => x.k !== b.dataset.unseg)); render(true); });
