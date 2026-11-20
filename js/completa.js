"use strict";
/* ==========================================================================
   KEYSTONE — Completamento
   Quadro di cosa manca, in due parti:
   - Milano: 145 microzone. Verde = annunci letti per intero (fasce di prezzo
     complete), giallo = solo una parte degli annunci, grigio = da fare.
   - Investimenti: i comuni migliori di "Dove cercare". Verde = annunci caricati,
     giallo = ricerca nella cartella dei link, grigio = da fare.
   Si aggiorna da solo quando carico nuovi annunci (anche quelli letti con Chrome).
   ========================================================================== */
const CM_COL = { ok: "#22c55e", parz: "#f2b84b", da: "#6b7a93", fatto: "#3b82f6" };
function cmUrl(n) { return `https://www.immobiliare.it/vendita-case/milano/${immSlug(n)}/?noAste=1&criterio=data&ordine=desc`; }
let CM_N = null;
function cmConta() {
  if (CM_N) return CM_N; CM_N = {};
  for (const r of TERR.annunci.imm.lista) CM_N[r[11]] = (CM_N[r[11]] || 0) + 1;
  return CM_N;
}
function cmStato(n) { const F = TERR.milano.fasce?.micro || {}; return F[n] ? "ok" : cmConta()[n] ? "parz" : "da"; }
function cmMilano() {
  const M = TERR.milano.micro, st = M.map(m => ({ m, s: cmStato(m.n), n: cmConta()[m.n] || 0 }));
  return { st, ok: st.filter(x => x.s === "ok").length, parz: st.filter(x => x.s === "parz").length, tot: M.length };
}
/* investimenti: comuni con dati veri di affitto (B&B misurati da AirROI, affitto normale con prezzi credibili),
   meno quelli già controllati da Claude o con annunci già caricati */
const ciCtrl = () => (typeof AUTO_CONTROLLATI !== "undefined" ? AUTO_CONTROLLATI : {});
function ciInv() {
  const f = Object.assign({}, DV_F0, store.get("f_dove", {})), base = { ...f, tags: [], prov: "", max: 0 };
  const br = dvRows({ ...base, uso: "breve" }).filter(o => !o.stima).slice(0, 45);
  const lu = dvRows({ ...base, uso: "lungo" }).filter(o => o.c.v >= 600 && o.lungo != null).slice(0, 35);
  const seen = new Map(); [...br, ...lu].forEach(o => { const k = o.c.n + "|" + o.c.p; if (!seen.has(k)) seen.set(k, o); });
  const caricati = {}; [...MIEI, ...(typeof AUTO !== "undefined" ? AUTO : [])].forEach(m => { caricati[tnorm(m.comune)] = (caricati[tnorm(m.comune)] || 0) + 1; });
  const link = new Set(lbAll().map(x => tnorm(x.com))), C = ciCtrl();
  const st = [...seen.values()].map(o => { const k = o.c.n + "|" + o.c.p, n = caricati[tnorm(o.c.n)] || 0, ctrl = k in C;
    return { o, n, ctrl, s: n ? "ok" : ctrl ? "fatto" : link.has(tnorm(o.c.n)) ? "parz" : "da" }; });
  const ord = { da: 0, parz: 1, ok: 2, fatto: 3 }; st.sort((a, b) => ord[a.s] - ord[b.s]);
  return { st, f, ok: st.filter(x => x.s === "ok" || x.s === "fatto").length, parz: st.filter(x => x.s === "parz").length, tot: st.length };
}
function ciPrompt(tab) {
  if (tab === "milano") {
    const L = cmMilano().st.filter(x => x.s !== "ok");
    return `Completa Milano su Keystone: con Chrome leggi gli annunci in vendita di Immobiliare (tutte le pagine, con calma per non farti bloccare) di queste microzone ancora incomplete e caricali come comparabili. Niente telefoni.\n\n` +
      L.map(x => `- ${x.m.n} (${x.m.z})${x.n ? `, ora ${x.n} annunci` : ""}: ${cmUrl(x.m.n)}`).join("\n");
  }
  const L = ciInv().st.filter(x => x.s === "da" || x.s === "parz").slice(0, 15);
  return `Completa Investimenti su Keystone: cerca su Immobiliare gli annunci fino a 60.000 € in buono stato (niente aste, rustici, baite, ruderi) in questi comuni e carica i migliori come automatici: ${L.map(x => `${x.o.c.n} (${x.o.c.p})`).join(", ")}.`;
}
function vCompleta(tab) {
  tab = tab === "inv" ? "inv" : "milano";
  const T = tab === "milano" ? cmMilano() : ciInv();
  const head = `<div class="hubhead"><small>Raccolta dati</small><h1>Completamento</h1><p class="sub">Cosa abbiamo già e cosa manca. Si aggiorna da solo ogni volta che carico nuovi annunci, anche quelli letti con Chrome.</p></div>
  <nav class="bread nob" style="margin-top:16px;margin-bottom:16px"><a href="#completa/milano" class="${tab === "milano" ? "on" : ""}">${ico("mappa")}<span>Milano</span></a><a href="#completa/inv" class="${tab === "inv" ? "on" : ""}">${ico("comuni")}<span>Investimenti</span></a></nav>
  <div class="cmprog"><div class="cmbar"><span style="width:${T.ok / T.tot * 100}%"></span><span class="ap" style="width:${T.parz / T.tot * 100}%"></span></div>
    <b>${T.ok} su ${T.tot} ${tab === "milano" ? "microzone complete" : "comuni fatti"}</b><span>${T.parz ? `${T.parz} ${tab === "milano" ? "parziali" : "con il link in cartella"}` : ""}</span></div>
  <div class="cmleg"><span><i style="background:${CM_COL.ok}"></i>${tab === "milano" ? "Completa" : "Annunci caricati"}</span><span><i style="background:${CM_COL.parz}"></i>${tab === "milano" ? "Parziale" : "Link in cartella"}</span>${tab === "inv" ? `<span><i style="background:${CM_COL.fatto}"></i>Controllato, niente di buono</span>` : ""}<span><i style="background:${CM_COL.da}"></i>Da fare</span></div>
  <div class="clmapw"><div class="map clmap" id="cmmap"></div></div>
  <div class="lbox"><div class="lbh"><b>Chiedi a Claude di completare</b><span>${T.tot - T.ok} da fare</span></div>
    <div class="btns"><button class="btn pri" id="cmcopy">Copia la richiesta per Claude</button></div>
    <p class="note">Incollala in chat: cerco io gli annunci, zona per zona, e qui i pallini si colorano da soli. Non serve raccogliere link a mano.</p></div>`;
  if (tab === "milano") {
    return head + `<h2>Tutte le microzone</h2>
    ${TERR.milano.zone.map(z => { const mm = T.st.filter(x => x.m.z === z.n); const ok = mm.filter(x => x.s === "ok").length;
      return `<details class="cmz" ${ok < mm.length && ok ? "open" : ""}><summary><b>${esc(z.n)}</b><span>${ok}/${mm.length}</span></summary>
        ${mm.map(x => `<div class="cmr"><i style="background:${CM_COL[x.s]}"></i><span>${esc(x.m.n)}<em class="mut"> · ${x.n ? num(x.n) + " annunci" : "nessun annuncio"}</em></span>
          <a class="btn sec" href="${esc(cmUrl(x.m.n))}" target="_blank" rel="noopener">Apri ↗</a></div>`).join("")}</details>`; }).join("")}`;
  }
  return head + `<p class="note">I comuni di <a href="#inv/dove">Dove cercare</a> con dati veri di affitto (B&B misurati e affitto normale), entro ${tOre(+T.f.ore)}. La richiesta per Claude prende i primi 15 ancora da fare, così resta un messaggio corto.${typeof AUTO_CONTROLLO_DATA !== "undefined" ? ` Ultimo controllo: ${AUTO_CONTROLLO_DATA.split("-").reverse().join("/")}.` : ""}</p>
  <div class="cmz" style="padding:4px 0">${T.st.map(x => `<div class="cmr"><i style="background:${CM_COL[x.s]}"></i><span>${esc(x.o.c.n)} <em class="mut">(${esc(x.o.c.p)}) · ${x.n ? x.n + " annunci caricati" : x.s === "fatto" ? "controllato: niente di buono sotto 60.000 €" : x.s === "parz" ? "link in cartella" : "da fare"} · ${pct(x.o[T.f.uso], 1)} netto</em></span>
    <a class="btn sec" href="${esc(immUrl(x.o.c.n))}" target="_blank" rel="noopener">Apri ↗</a></div>`).join("")}</div>`;
}
function afterCompleta(tab) {
  tab = tab === "inv" ? "inv" : "milano";
  const m = tMap($("#cmmap"), [[45.4642, 9.19], tab === "milano" ? 12 : 8]);
  if (m) {
    const pts = tab === "milano" ? cmMilano().st.map(x => ({ la: x.m.lat, lo: x.m.lon, s: x.s, t: `<b>${esc(x.m.n)}</b><br><span style="color:#9aa8bb">${esc(x.m.z)} · ${x.n} annunci</span><br><a class="go" href="${esc(cmUrl(x.m.n))}" target="_blank" rel="noopener">Apri su Immobiliare ↗</a>` }))
      : ciInv().st.map(x => ({ la: x.o.c.lat, lo: x.o.c.lon, s: x.s, t: `<b>${esc(x.o.c.n)}</b> (${esc(x.o.c.p)})<br><span style="color:#9aa8bb">${x.n} annunci caricati</span><br><a class="go" href="${esc(immUrl(x.o.c.n))}" target="_blank" rel="noopener">Apri su Immobiliare ↗</a>` }));
    pts.forEach(p => L.circleMarker([p.la, p.lo], { radius: 9, color: "#0d1320", weight: 2, fillColor: CM_COL[p.s], fillOpacity: .95 }).addTo(m).bindPopup(p.t));
    if (pts.length) m.fitBounds(pts.map(p => [p.la, p.lo]), { padding: [20, 20] });
  }
  $("#cmcopy")?.addEventListener("click", async e => { const ok = await lbCopy(ciPrompt(tab)); e.target.textContent = ok ? "✓ Copiata: incollala in chat" : "Copia non riuscita"; });
}
