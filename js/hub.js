"use strict";
/* ==========================================================================
   KEYSTONE — sezioni con scelta iniziale
   · Milano: valutazione per il cliente, investimento B&B, affitto lungo,
     subaffitto (rent to rent), annunci dei privati, mappa libera
   · Investimenti (Nord Italia): classifica generale, ricerca per zona,
     mappa B&B, valuta un comune, archivio, trovati in automatico
   · Seguiti (osservatorio): immobili e annunci con la stella
   ========================================================================== */
const ICO = {
  inv: '<path d="M4 20h16"/><path d="M6 20V10l6-5 6 5v10"/><path d="M10 14h4M12 12v4"/>',
  cliente: '<path d="M4 20h16"/><path d="M6 20V9l6-5 6 5v11"/><path d="M10 20v-5h4v5"/><path d="M15.5 8.5l3-3"/>',
  bnb: '<path d="M3 18h18"/><path d="M5 18V9l7-5 7 5v9"/><path d="M9 18v-4h6v4"/><circle cx="18.5" cy="5.5" r="2"/>',
  lungo: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9h16M9 3v4M15 3v4"/><path d="M8 14h3"/>',
  sub: '<path d="M7 7h11l-3-3"/><path d="M17 17H6l3 3"/><circle cx="12" cy="12" r="2.5"/>',
  privati: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/><path d="M18 4l2 2-4 4"/>',
  mappa: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  classifica: '<path d="M7 21V11M12 21V5M17 21v-7"/><path d="M4 21h16"/>',
  zona: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/><path d="M11 8v6M8 11h6"/>',
  comuni: '<path d="M4 20h16"/><path d="M6 16l4-5 3 3 5-7"/><circle cx="18" cy="7" r="1.5"/>',
  archivio: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  auto: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="5"/><path d="M12 9.5V12l1.8 1.2"/>',
  star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.8z"/>',
};
const ico = (k, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICO[k] || ""}</svg>`;

/* ---------------- MILANO ---------------- */
const MI_MODI = {
  cliente: { t: "Valutazione per il cliente", c: "Per chi vende", d: "Stima professionale con comparabili e PDF Maison Collection da consegnare al proprietario.",
    sub: "Tocca il palazzo sulla mappa (o cerca l'indirizzo), inserisci le caratteristiche: ottieni valore, prezzo consigliato di pubblicazione e PDF con il logo.", form: "Dati dell'immobile del cliente" },
  privati: { t: "Annunci dei privati", c: "Vendite senza agenzia", d: "L'elenco degli immobili messi in vendita da privati: apri la scheda per dettagli, posizione e confronto con la zona.",
    sub: "Tocca un annuncio per aprire la scheda con tutti i dettagli, la posizione sulla mappa e il confronto con i prezzi della zona. Quelli che non hai ancora visto sono segnati come nuovi.", form: "" },
};
function miBread(mode) {
  return `<nav class="bread nob">${Object.entries(MI_MODI).map(([k, m]) => `<a href="#milano/${k}" class="${k === mode ? "on" : ""}">${ico(k)}<span>${esc(m.t.replace("Valutazione per il ", "Valuta ").replace("Annunci dei privati", "Privati").replace("Mappa di Milano", "Mappa"))}</span></a>`).join("")}</nav>`;
}
function vMilanoHub() {
  const A = mmAnnunci(), np = A.filter(a => a.priv).length, visti = new Set(store.get("ann_visti", []));
  const nuovi = A.filter(a => a.priv && !visti.has(a.id)).length;
  return `<div class="hubhead"><small>Sezione</small><h1>Milano</h1><p class="sub">Cosa vuoi fare oggi? Ogni percorso parte dalla stessa mappa 3D con ${TERR.milano.micro.length} microzone di prezzo e ${num(A.length)} annunci.</p></div>
  <div class="hub">
    ${Object.entries(MI_MODI).map(([k, m]) => `<a class="hubc ${k === "cliente" ? "big" : ""}" href="#milano/${k}">${ico(k, "hi")}<small>${esc(m.c)}</small><b>${esc(m.t)}</b><span>${esc(m.d)}</span>
      ${k === "privati" && nuovi ? `<em class="hubn">${nuovi} nuov${nuovi === 1 ? "o" : "i"}</em>` : ""}${k === "privati" ? `<i class="hubf">${np} annunci di privati</i>` : ""}</a>`).join("")}
  </div>
  ${vSalvate("milano")}`;
}
function afterMilanoHub() {}

/* blocco in cima al risultato, diverso per ogni percorso */
function miModeBlock(r, ctx) {
  const L = r.sc.list, costi = 1 + IMPOSTAZIONI.costi_acquisto_pct, lav = r.lavori || 0;
  const maxPer = (net, y) => net > 0 ? Math.max(0, net / y / costi - lav / costi) : null;
  if (ctx.mode === "cliente") {
    const Z = vScontoZona(ctx), pub = Math.round(r.valore / 5000) * 5000, chiusura = Math.round(r.valore * (1 - Z.sconto) / 1000) * 1000;
    return `<div class="mblock"><div><small>Prezzo consigliato di pubblicazione</small><b>${eur(pub)}</b><em>in linea con le richieste di oggi · tra ${keur(r.min)} e ${keur(r.max)}</em></div>
      <div><small>Prezzo di chiusura atteso</small><b>${eur(chiusura)}</b><em>${Z.n ? `trattativa ${num(Z.sconto * 100, 0)}%: ${Z.n} esit${Z.n === 1 ? "o reale" : "i reali"} in zona` : "trattativa 5% circa (stima generica: salva gli esiti reali per calcolarla)"}</em></div>
      <div><small>Al m² commerciale</small><b>${eur(r.valore / r.sup)}</b><em>${num(r.sup, 1)} m² commerciali</em></div></div>`;
  }
  if (ctx.mode === "inv") {
    const T = +store.get("inv_target", 0.055), USI = [["breve", "B&B", "affitto a notte", "Rende di più, ma va gestito ogni giorno: check-in, pulizie, recensioni. Serve il CIN."],
      ["medio", "Medio termine", "1-18 mesi, transitorio", "Via di mezzo: studenti e lavoratori in trasferta, meno gestione del B&B."],
      ["lungo", "Affitto lungo", "4+4 o 3+2", "Il più tranquillo: un inquilino, poca gestione, ma rende meno e c'è il rischio morosità."]];
    const ok = USI.filter(([k]) => L[k]), best = ok.sort((a, b) => L[b[0]].rendNetto - L[a[0]].rendNetto)[0]?.[0];
    const det = { breve: r.breve ? `${eur(r.breve.adr)} a notte · ${pct(r.breve.occ, 0)} occupazione` : "", medio: r.medio ? `${eur(r.medio)} al mese · 10 mesi l'anno` : "", lungo: r.canone ? `${eur(r.canone)} al mese` : "" };
    return `<div class="invtgt"><span>Rendimento netto che vuoi</span><select data-target>${[0.04, 0.045, 0.05, 0.055, 0.06, 0.07, 0.08].map(v => `<option value="${v}" ${Math.abs(v - T) < 1e-9 ? "selected" : ""}>${pct(v, 1)}</option>`).join("")}</select></div>
    <div class="usi">${USI.map(([k, t, c, nota]) => { const x = L[k]; if (!x) return `<div class="uso na"><small>${t}</small><b>—</b><em>dati non disponibili in questa zona</em></div>`;
      const mx = maxPer(x.netto, T);
      return `<div class="uso ${k === best ? "best" : ""}">${k === best ? `<i class="ubest">Il migliore</i>` : ""}<small>${t} · ${c}</small>
        <b class="${x.rendNetto >= .05 ? "s-good" : x.rendNetto >= .035 ? "s-warn" : "s-bad"}">${pct(x.rendNetto)}</b>
        <span>netto ${eur(x.netto)} all'anno · ${eur(x.netto / 12)} al mese</span><span>${det[k]}</span>
        <div class="umax"><small>Offri al massimo</small><b>${eur(mx)}</b><em>per avere il ${pct(T, 1)} netto${lav ? ", lavori inclusi" : ""}${r.prezzo ? ` · chiesto ${eur(r.prezzo)} ${r.prezzo <= mx ? "✓" : "✗"}` : ""}</em></div>
        <p>${nota}</p></div>`; }).join("")}</div>`;
  }
  return "";
}

/* ---- annunci dei privati ---- */
function miPrivatiHtml() {
  const f = store.get("f_priv", { solo: true, max: 0, mq: 0, ord: "nuovi" });
  return `<h2>Elenco annunci</h2>
  <div class="filters" id="pf">
    <div class="chips"><button class="chip ${f.solo ? "on" : ""}" data-solo="1">Solo privati</button><button class="chip ${!f.solo ? "on" : ""}" data-solo="0">Tutti gli annunci</button></div>
    <div class="selrow">
      <select data-f="max"><option value="0">Qualsiasi prezzo</option>${[150000, 200000, 300000, 400000, 600000, 1000000].map(v => `<option value="${v}" ${+f.max === v ? "selected" : ""}>Fino a ${keur(v)}</option>`).join("")}</select>
      <select data-f="mq"><option value="0">Qualsiasi metratura</option>${[30, 50, 70, 90, 120].map(v => `<option value="${v}" ${+f.mq === v ? "selected" : ""}>Da ${v} m²</option>`).join("")}</select>
      <select data-f="ord">${[["nuovi", "Nuovi prima"], ["m2", "€/m² più basso"], ["prezzo", "Prezzo più basso"]].map(([k, t]) => `<option value="${k}" ${f.ord === k ? "selected" : ""}>${t}</option>`).join("")}</select>
    </div>
  </div>
  <div id="plist"></div>`;
}
function miPrivatiRows() {
  const f = store.get("f_priv", { solo: true, max: 0, mq: 0, ord: "nuovi" }), visti = new Set(store.get("ann_visti", []));
  let L = mmAnnunci().filter(a => (!f.solo || a.priv) && (!+f.max || a.p <= +f.max) && (!+f.mq || a.mq >= +f.mq)).map(a => ({ ...a, nuovo: !visti.has(a.id) }));
  const ord = { nuovi: (a, b) => b.nuovo - a.nuovo || a.mq2 - b.mq2, m2: (a, b) => a.mq2 - b.mq2, prezzo: (a, b) => a.p - b.p };
  return L.sort(ord[f.ord] || ord.nuovi);
}
function miPrivatiBind() {
  const box = $("#pf"), list = $("#plist"), f = store.get("f_priv", { solo: true, max: 0, mq: 0, ord: "nuovi" });
  const draw = () => {
    const L = miPrivatiRows(), seg = segIds();
    list.innerHTML = L.length ? `<p class="note">${L.length} annunci${f.solo ? " di privati" : ""}. Tocca un annuncio per aprire la scheda. Attenzione: un prezzo molto sotto la zona spesso nasconde una quota, una nuda proprietà o un'asta. Prima di chiamare leggi la descrizione su Immobiliare.</p>
      <div class="plist">${L.slice(0, 200).map(a => { const mi = a.micro ? TERR.milano.micro.find(m => m.n === a.micro) : null, dlt = mi ? a.mq2 / mi.v - 1 : null;
        return `<a class="pcard" href="#milano/privati/${encodeURIComponent(a.id)}">
        <div class="pc1"><b>${a.nuovo ? `<span class="tag new">nuovo</span> ` : ""}${esc(a.via || a.micro || "Milano")}</b><span>${esc(a.micro || (a.mun ? "Municipio " + a.mun : "Milano"))}</span></div>
        <div class="pc2"><span>${a.mq} m²</span><span>${a.loc || "?"} locali</span>${a.piano ? `<span>${a.piano === "T" ? "piano terra" : a.piano === "R" ? "rialzato" : a.piano === "S" ? "seminterrato" : a.piano + "° piano"}</span>` : ""}${a.st ? `<span>${esc(MM_ST[a.st][0].split(" /")[0])}</span>` : ""}</div>
        <div class="pc3"><b>${eur(a.p)}</b><em>${eur(a.mq2)}/m²${dlt != null ? ` · <i class="${dlt < 0 ? "s-good" : "s-bad"}">${dlt < 0 ? "−" : "+"}${pct(Math.abs(dlt), 0)} zona</i>` : ""}</em></div>
        <button class="star ${seg.has("a:" + a.id) ? "on" : ""}" data-seg="${a.id}" aria-label="Segui">${ico("star")}</button></a>`; }).join("")}</div>`
      : `<div class="empty"><b>Nessun privato con questi filtri</b><p>Prova "Tutti gli annunci" oppure togli i limiti di prezzo e metratura.</p></div>`;
  };
  box.addEventListener("click", e => { const c = e.target.closest("[data-solo]"); if (!c) return; f.solo = c.dataset.solo === "1"; store.set("f_priv", f);
    box.querySelectorAll("[data-solo]").forEach(x => x.classList.toggle("on", x === c)); draw(); });
  box.addEventListener("change", e => { const k = e.target.dataset.f; if (!k) return; f[k] = e.target.value; store.set("f_priv", f); draw(); });
  list.addEventListener("click", e => {
    const st = e.target.closest("[data-seg]"); if (st) { e.preventDefault(); const a = mmAnnunci().find(x => x.id === st.dataset.seg); if (a) segToggle(segAnn(a)); draw(); }
  });
  draw();
}

/* ---- scheda di un annuncio di privato: dettagli, posizione, confronto con la zona ---- */
function vPrivato(id) {
  const a = mmAnnunci().find(x => x.id === id);
  if (!a) return `${miBread("privati")}<div class="empty"><b>Annuncio non più disponibile</b><p><a href="#milano/privati">Torna all'elenco</a></p></div>`;
  const v = store.get("ann_visti", []); if (!v.includes(a.id)) { v.push(a.id); store.set("ann_visti", v.slice(-3000)); }
  const mi = a.micro ? TERR.milano.micro.find(m => m.n === a.micro) : (a.lat != null ? mmMicroAt(a.lon, a.lat) : null);
  const F = mi && TERR.milano.fasce?.micro[mi.n], dlt = mi ? a.mq2 / mi.v - 1 : null;
  const near = a.lat != null && !a.appross ? mzVicini({ lat: a.lat, lon: a.lon }) : null;
  const pianoT = !a.piano ? "—" : a.piano === "T" ? "Piano terra" : a.piano === "R" ? "Rialzato" : a.piano === "S" ? "Seminterrato" : a.piano + "° piano";
  const simili = mmAnnunci().filter(x => x.id !== a.id && x.micro && x.micro === a.micro && Math.abs(x.mq - a.mq) <= a.mq * 0.25).sort((x, y) => Math.abs(x.mq - a.mq) - Math.abs(y.mq - a.mq)).slice(0, 5);
  const W = Math.min(innerWidth - 32, 760);
  return `${miBread("privati")}
  <div class="loc" style="margin-top:6px">${esc([mi?.z, mi?.n].filter(Boolean).join(" · ") || "Milano")}${a.priv ? " · <b>privato</b>" : ""}</div>
  <h1 style="margin-top:2px">${esc(a.via || "Milano")}</h1>
  <div class="offer" style="margin:10px 0">
    <div><small>Prezzo</small><b>${eur(a.p)}</b><em>prezzo richiesto</em></div>
    <div><small>Al m²</small><b class="cy">${eur(a.mq2)}</b><em>${dlt != null ? `${dlt < 0 ? "−" : "+"}${pct(Math.abs(dlt), 0)} sulla media della zona` : "—"}</em></div>
    <div><small>Media zona</small><b>${mi ? eur(mi.v) : "—"}</b><em>${mi ? esc(mi.n) : ""}</em></div>
  </div>
  ${a.lat != null ? `<div class="pvmap">${pdfMappa(a.lat, a.lon, a.appross ? 15 : 16, W, 230, [{ lat: a.lat, lon: a.lon, k: "me", t: "" }])}</div>${a.appross ? `<p class="note">Posizione indicativa (centro della microzona).</p>` : ""}` : ""}
  <h2>Dettagli</h2>
  <table class="pvtab"><tbody>
    <tr><td>Tipologia</td><td>${esc(a.tip || "Appartamento")}</td></tr>
    <tr><td>Superficie</td><td>${a.mq} m²</td></tr>
    <tr><td>Locali</td><td>${a.loc || "—"}</td></tr>
    <tr><td>Piano</td><td>${pianoT}${a.asc ? ", con ascensore" : a.piano && a.piano !== "T" ? ", senza ascensore" : ""}</td></tr>
    <tr><td>Stato</td><td>${a.st ? esc(MM_ST[a.st][0]) : "Non indicato"}</td></tr>
    <tr><td>Caratteristiche</td><td>${esc(a.d || "—")}</td></tr>
    <tr><td>Venditore</td><td>${a.priv ? "Privato" : "Agenzia"} · ${esc(a.fonte)}</td></tr>
    <tr><td>Online da</td><td>Nell'app dal ${(d => d.split("-").reverse().join("/"))(novDati().dal[String(a.id).replace(/^i/, "")] || "2026-11-20")}</td></tr>
  </tbody></table>
  ${(o => o && o.cn ? `<p class="note">OMI Agenzia delle Entrate (${OMI_SEM}), zona ${esc(o.cod)}: abitazioni civili ${eur(o.cn[0])}–${eur(o.cn[1])}/m²${o.co ? `, ottimo ${eur(o.co[0])}–${eur(o.co[1])}/m²` : ""}. Questo è a <b>${eur(a.mq2)}/m²</b>.</p>` : "")(typeof omiMi === "function" ? omiMi(a.micro) : null)}
  ${F ? `<h2>Com'è messo rispetto alla zona</h2><p class="note">Prezzi richiesti nella microzona ${esc(mi.n)} (${num(F.n)} annunci): da ristrutturare ${F.r ? eur(F.r[1]) : "—"}/m², buono ${F.b ? eur(F.b[1]) : "—"}/m², ottimo o nuovo ${F.o ? eur(F.o[1]) : "—"}/m². Questo è a <b>${eur(a.mq2)}/m²</b>.</p>` : ""}
  ${near && near.staz.length ? `<p class="note">Metro: ${near.staz.slice(0, 3).map(x => `${esc(x.n)} (${[...x.ln].join(", ")}) ${num(Math.round(x.d / 10) * 10)} m`).join(" · ")}</p>` : ""}
  <div class="btns" style="margin:14px 0"><a class="btn pri" href="${esc(a.url)}" target="_blank" rel="noopener">Apri l'annuncio ↗</a><button class="btn sec" data-segp="${a.id}">${segIds().has("a:" + a.id) ? "★ Seguito" : "☆ Segui"}</button></div>
  ${simili.length ? `<h2>Simili nella stessa zona</h2><div class="plist">${simili.map(x => `<a class="pcard" href="#milano/privati/${encodeURIComponent(x.id)}"><div class="pc1"><b>${esc(x.via || x.micro)}</b><span>${x.mq} m² · ${x.loc || "?"} locali${x.priv ? " · privato" : ""}</span></div><div class="pc3"><b>${eur(x.p)}</b><em>${eur(x.mq2)}/m²</em></div></a>`).join("")}</div>` : ""}`;
}
function afterPrivato() {
  $("#app").querySelector("[data-segp]")?.addEventListener("click", e => { const a = mmAnnunci().find(x => x.id === e.target.dataset.segp); if (a) e.target.textContent = segToggle(segAnn(a)) ? "★ Seguito" : "☆ Segui"; });
}

/* ---- subaffitto (rent to rent) ---- */
const SUB_DEF = { micro: "", mq: 55, locali: 2, canone: 0, deposito: 3, arredo: 9000, pulizia: 45, soggiorno: 3.2, piattaforma: 0.17, utenze: 220, gestione: 0, tasse: 0.26, anni: 4, occ: 0, adr: 0 };
function miSubHtml() {
  const q = Object.assign({}, SUB_DEF, store.get("sub_q", {})), M = TERR.milano;
  const n = (k, lab, step = 1, unit = "") => `<label><span>${lab}</span><input type="number" inputmode="decimal" min="0" step="${step}" data-s="${k}" value="${q[k] || ""}" placeholder="${k === "canone" || k === "adr" || k === "occ" ? "auto" : ""}">${unit ? `<em>${unit}</em>` : ""}</label>`;
  return `<h2>Business plan del subaffitto</h2>
  <div class="card"><form class="vform" id="msf" autocomplete="off" onsubmit="return false">
    <fieldset><legend>Dove e cosa</legend><div class="vg">
      <label class="wide"><span>Indirizzo</span><input type="text" data-c="addr" value="${esc(MM.sel ? mmIndirizzo(MM.sel) : "")}" placeholder="Tocca un palazzo sulla mappa"></label>
      <label class="wide"><span>Microzona</span><select data-c="micro"><option value="">Scegli…</option>${M.zone.map(z => `<optgroup label="${esc(z.n)}">${M.micro.filter(m => m.z === z.n).map(m => `<option ${(MM.sel?.micro || q.micro || "Porta Romana - Medaglie d'Oro") === m.n ? "selected" : ""}>${esc(m.n)}</option>`).join("")}</optgroup>`).join("")}</select></label>
      ${n("mq", "Superficie", 1, "m²")}${n("locali", "Locali")}
    </div></fieldset>
    <fieldset><legend>Contratto con il proprietario</legend><div class="vg">
      ${n("canone", "Canone mensile", 10, "€")}${n("deposito", "Mesi di deposito", 1)}${n("anni", "Durata (anni)", 1)}${n("arredo", "Arredo e allestimento", 500, "€")}
    </div></fieldset>
    <fieldset><legend>Gestione B&B</legend><div class="vg">
      ${n("adr", "Prezzo a notte", 1, "€")}${n("occ", "Occupazione", 1, "%")}${n("soggiorno", "Notti per soggiorno", 0.1)}${n("pulizia", "Pulizia per soggiorno", 5, "€")}
      ${n("utenze", "Utenze, wifi, consumabili", 10, "€/mese")}<label><span>Commissioni piattaforma</span><input type="number" step="1" data-s="piattaforma" value="${Math.round(q.piattaforma * 100)}"><em>%</em></label>
      <label><span>Gestore esterno</span><input type="number" step="1" data-s="gestione" value="${Math.round(q.gestione * 100)}"><em>% incasso</em></label>
      <label><span>Tasse sull'utile</span><input type="number" step="1" data-s="tasse" value="${Math.round(q.tasse * 100)}"><em>%</em></label>
    </div></fieldset>
  </form><div id="msout"></div></div>
  <p class="note">Il subaffitto turistico è possibile solo con il consenso scritto del proprietario nel contratto (clausola di sublocazione o contratto ad uso foresteria) e con CIN e comunicazioni alla Questura. Come società si opera con partita IVA: le tasse indicate sono una stima sull'utile.</p>`;
}
function miSubCalc(q, ctx) {
  const z = ctx.zona, mi = ctx.micro, str = MZ_STR({ ...z, v: mi.v });
  const extra = Math.max(0, (+q.locali || 2) - 2) * 0.15 + (q.mq < 40 ? -0.1 : 0);
  const adr = +q.adr || Math.round(str.adr * T_BILO * (1 + extra)), occ = +q.occ ? q.occ / 100 : str.occ;
  const canoneMkt = Math.round(mi.a * q.mq / 10) * 10, canone = +q.canone || canoneMkt;
  const notti = occ * 365, sogg = notti / Math.max(1, +q.soggiorno || 3);
  const lordo = adr * notti, comm = lordo * (+q.piattaforma), gest = lordo * (+q.gestione);
  const pul = sogg * (+q.pulizia), affitto = canone * 12, ut = (+q.utenze) * 12, manut = lordo * 0.03;
  const costi = comm + gest + pul + affitto + ut + manut, utileL = lordo - costi, tasse = Math.max(0, utileL) * (+q.tasse), utile = utileL - tasse;
  const invest = canone * (+q.deposito) + (+q.arredo), rientro = utile > 0 ? invest / (utile / 12) : null;
  // occupazione di pareggio
  const fissi = affitto + ut, varN = adr * (1 - q.piattaforma - q.gestione - 0.03) - (+q.pulizia) / Math.max(1, +q.soggiorno);
  const be = varN > 0 ? fissi / varN / 365 : null;
  const canoneMax = Math.max(0, (lordo - (comm + gest + pul + ut + manut) - (+q.arredo) / Math.max(1, q.anni) * 1.3) / 12 / 1.25);
  const anni = Array.from({ length: Math.max(1, Math.min(8, +q.anni || 4)) }, (_, i) => { const k = i === 0 ? 0.85 : 1 + 0.02 * (i - 1); const lo = lordo * k, ul = lo - (comm + gest + manut) * k - pul * k - affitto * Math.pow(1.01, i) - ut;
    const net = ul - Math.max(0, ul) * q.tasse - (i === 0 ? +q.arredo : 0); return { anno: i + 1, lordo: lo, netto: net }; });
  let cum = -canone * q.deposito; anni.forEach(a => { cum += a.netto; a.cum = cum; }); cum += canone * q.deposito;
  return { adr, occ, canone, canoneMkt, notti, sogg, lordo, comm, gest, pul, affitto, ut, manut, utileL, tasse, utile, invest, rientro, be, canoneMax, anni, fonteStr: str.fonte, totale: cum };
}
function miSubBind() {
  const form = $("#msf"), out = $("#msout");
  const go = () => {
    const q = Object.assign({}, SUB_DEF);
    form.querySelectorAll("[data-s]").forEach(i => { const v = i.value === "" ? 0 : +i.value; q[i.dataset.s] = ["piattaforma", "gestione", "tasse"].includes(i.dataset.s) ? v / 100 : v; });
    q.micro = form.querySelector("[data-c=micro]").value; store.set("sub_q", q);
    const ctx = miCtxForm(); if (!ctx || !ctx.milano) { out.innerHTML = `<p class="sub">Scegli la microzona (o tocca un palazzo sulla mappa).</p>`; return; }
    const r = miSubCalc(q, ctx), ko = !(r.utile > 0) || !r.rientro || r.rientro > (q.anni || 4) * 12, good = !ko && r.rientro <= 24;
    out.innerHTML = `<div class="vres">
      <div class="vhead"><small>Guadagno netto stimato</small><b class="${r.utile > 0 ? "" : "s-bad"}">${eur(r.utile / 12)} al mese</b><span>${eur(r.utile)} all'anno · rientri dell'investimento in ${r.rientro ? num(r.rientro, 0) + " mesi" : "—"}</span></div>
      <div class="mblock">
        <div><small>Canone che paghi</small><b>${eur(r.canone)}</b><em>${+q.canone ? "inserito da te" : "canone di mercato della zona"} · massimo sostenibile ${eur(r.canoneMax)}</em></div>
        <div><small>Incasso B&B</small><b>${keur(r.lordo)}</b><em>${eur(r.adr)} a notte · ${pct(r.occ, 0)} · ${num(Math.round(r.notti))} notti</em></div>
        <div><small>Pareggio</small><b class="${r.be != null && r.be < r.occ * 0.8 ? "s-good" : r.be != null && r.be < r.occ ? "s-warn" : "s-bad"}">${r.be != null ? pct(r.be, 0) : "—"}</b><em>occupazione minima per coprire i costi</em></div>
      </div>
      <p class="verdict2 ${good ? "ok" : !ko ? "mid" : "ko"}">${good ? "Funziona: margine buono e investimento che rientra entro due anni." : !ko ? "Margine sottile: rientri prima della fine del contratto, ma tratta il canone o riduci l'arredo." : `Non conviene a queste condizioni: non rientri entro i ${q.anni || 4} anni del contratto. Il canone massimo sostenibile qui è circa ${eur(r.canoneMax)}.`}</p>
      <table class="bp"><tbody>
        <tr><td>Incasso lordo (${num(Math.round(r.sogg))} soggiorni)</td><td class="r">${eur(r.lordo)}</td></tr>
        <tr><td>Commissioni piattaforma (${pct(q.piattaforma, 0)})</td><td class="r">− ${eur(r.comm)}</td></tr>
        ${r.gest ? `<tr><td>Gestore esterno (${pct(q.gestione, 0)})</td><td class="r">− ${eur(r.gest)}</td></tr>` : ""}
        <tr><td>Pulizie e biancheria</td><td class="r">− ${eur(r.pul)}</td></tr>
        <tr><td>Canone al proprietario (12 mesi)</td><td class="r">− ${eur(r.affitto)}</td></tr>
        <tr><td>Utenze, wifi, consumabili</td><td class="r">− ${eur(r.ut)}</td></tr>
        <tr><td>Piccola manutenzione (3%)</td><td class="r">− ${eur(r.manut)}</td></tr>
        <tr><td>Tasse sull'utile (${pct(q.tasse, 0)})</td><td class="r">− ${eur(r.tasse)}</td></tr>
        <tr class="tot"><td>Utile netto annuo</td><td class="r">${eur(r.utile)}</td></tr>
        <tr><td>Investimento iniziale (deposito ${q.deposito} mesi + arredo)</td><td class="r">${eur(r.invest)}</td></tr>
      </tbody></table>
      <h3 class="vh3">Business plan anno per anno</h3>
      <table class="bp"><thead><tr><th>Anno</th><th class="r">Incasso</th><th class="r">Netto (dopo arredo)</th><th class="r">Cassa cumulata</th></tr></thead><tbody>
        ${r.anni.map(a => `<tr><td>${a.anno}°${a.anno === 1 ? " (avvio, -15%)" : ""}</td><td class="r">${eur(a.lordo)}</td><td class="r">${eur(a.netto)}</td><td class="r ${a.cum >= 0 ? "s-good" : "s-bad"}">${eur(a.cum)}</td></tr>`).join("")}
        <tr class="tot"><td>Totale a fine contratto (deposito restituito)</td><td></td><td></td><td class="r">${eur(r.totale)}</td></tr>
      </tbody></table>
      <p class="note">Prezzo a notte e occupazione: ${esc(r.fonteStr)}, bilocale all'85% della media. Canone di mercato della microzona: ${eur(r.canoneMkt)} al mese. Anno 1 con il 15% di incasso in meno per l'avvio e le recensioni; poi +2% l'anno, canone +1% (ISTAT).</p>
    </div>`;
  };
  form.addEventListener("input", go); form.addEventListener("change", go); go();
  MM.onSel = () => { const s = MM.sel; if (!s) return; form.querySelector("[data-c=addr]").value = mmIndirizzo(s); if (s.micro) { form.querySelector("[data-c=micro]").value = s.micro; go(); } };
}

/* ---------------- SEGUITI (osservatorio) ---------------- */
const segAll = () => store.get("seguiti", []);
const segIds = () => new Set(segAll().map(x => x.k));
function segToggle(it) { const L = segAll(), i = L.findIndex(x => x.k === it.k); if (i >= 0) L.splice(i, 1); else L.unshift({ ...it, dal: new Date().toISOString().slice(0, 10) }); store.set("seguiti", L); return i < 0; }
const segAnn = a => ({ k: "a:" + a.id, t: a.via || a.micro || "Annuncio a Milano", s: `${eur(a.p)} · ${a.mq} m² · ${eur(a.mq2)}/m²`, lat: a.lat, lon: a.lon, url: a.url, tipo: "Milano" });
const segIm = (im, src) => ({ k: "i:" + src + ":" + im.id, t: im.titolo || im.comune, s: `${eur(im.prezzo)} · ${im.comune || ""}`, lat: im.lat, lon: im.lng, href: `#imm/${src}/${encodeURIComponent(im.id)}`, tipo: "Investimento" });
document.addEventListener("click", e => {
  const b = e.target.closest("[data-segim]"); if (!b) return; e.preventDefault();
  const [src, id] = b.dataset.segim.split("|"), im = findIm(src, id); if (!im) return;
  const on = segToggle(segIm(im, src)); b.classList.toggle("on", on); b.querySelector("span") && (b.querySelector("span").textContent = on ? "Seguito" : "Segui");
});

/* ---------------- INVESTIMENTI (Nord Italia) ---------------- */
const INV_MODI = {
  classifica: { t: "Classifiche", c: "Generale o per zona", d: "La classifica di tutti gli immobili, oppure di una zona: scrivi un posto o disegnala col dito sulla mappa.", href: "#inv/classifica" },
  dove: { t: "Dove cercare", c: "Tutti i comuni", d: "Rendimento netto di B&B e affitto normale comune per comune, con filtri lago, sci, ospedali, università e aziende.", href: "#inv/dove", i: "zona" },
};
function invBread(k) {
  return `<nav class="bread tabs">${Object.entries(INV_MODI).map(([x, m]) => `<a href="${m.href}" class="${x === k ? "on" : ""}">${ico(m.i || x)}<span>${esc(m.t.replace("Trovati in automatico", "Automatici").replace("I miei immobili", "Archivio"))}</span></a>`).join("")}</nav>`;
}
const invAll = () => [...MIEI.filter(im => !im.escluso).map(im => ({ im, src: "miei" })), ...AUTO.map(im => ({ im, src: "auto" }))];
function vInvHub() {
  const all = invAll().map(x => ({ ...x, A: analizza(x.im) })), ok = all.filter(x => x.A.score != null);
  const top = ok.sort((a, b) => b.A.score - a.A.score)[0], reg = new Set(all.map(x => x.im.regione)).size;
  return `<div class="hubhead"><small>Sezione</small><h1>Investimenti</h1><p class="sub">Nord Italia entro 3 ore da casa: ${all.length} immobili analizzati in ${reg} regioni${top ? `, il migliore è a ${esc(top.im.comune)} (${top.A.score} punti)` : ""}.</p></div>
  <div class="hub">${Object.entries(INV_MODI).map(([k, m]) => `<a class="hubc ${k === "classifica" ? "big" : ""}" href="${m.href}">${ico(m.i || k, "hi")}<small>${esc(m.c)}</small><b>${esc(m.t)}</b><span>${esc(m.d)}</span></a>`).join("")}</div>`;
}
const INV_F0 = { cat: "tutte", reg: "", ore: 0, max: 0, min: 0, sort: "score", src: "" };
function invRows(f, filtroZona) {
  return invAll().filter(({ im, src }) => (!f.src || (f.src === "oggi" ? src === "auto" && isNuovoInv(im) : src === f.src)) && (!f.reg || im.regione === f.reg) && (!+f.max || im.prezzo <= +f.max) && (!filtroZona || filtroZona(im)))
    .map(x => ({ ...x, A: analizza(x.im, f.cat), d: tDist(x.im.lat, x.im.lng) }))
    .filter(x => (f.cat === "tutte" || x.A.use) && (!+f.ore || (x.d && x.d.min <= +f.ore)) && (!+f.min || (x.A.score ?? 0) >= +f.min))
    .sort({ score: (a, b) => (b.A.score ?? -1) - (a.A.score ?? -1), rend: (a, b) => (b.A.rend ?? -9) - (a.A.rend ?? -9), prezzo: (a, b) => a.im.prezzo - b.im.prezzo,
      vicini: (a, b) => (a.d?.min ?? 999) - (b.d?.min ?? 999), sconto: (a, b) => (b.A.val.sconto ?? -9) - (a.A.val.sconto ?? -9) }[f.sort] || ((a, b) => (b.A.score ?? -1) - (a.A.score ?? -1)));
}
function invFiltri(f, regs, noReg) {
  return `<div class="filters" id="invf">
    <div class="chips">${[["", "Tutti"], ["miei", "Mandati da me"], ["auto", "Trovati in automatico"], ["oggi", "Novità"]].map(([k, t]) => `<button class="chip ${(f.src || "") === k ? "on" : ""}" data-src="${k}">${t}</button>`).join("")}</div>
    <div class="chips">${[["tutte", "Tutti gli usi"], ...Object.entries(CAT)].map(([k, t]) => `<button class="chip ${f.cat === k ? "on" : ""}" data-cat="${k}">${t}</button>`).join("")}</div>
    <div class="selrow">
      ${noReg ? "" : `<select data-f="reg"><option value="">Tutte le regioni</option>${regs.map(r => `<option ${r === f.reg ? "selected" : ""}>${esc(r)}</option>`).join("")}</select>`}
      <select data-f="ore"><option value="0">Qualsiasi distanza</option>${[60, 90, 120, 150, 180].map(v => `<option value="${v}" ${+f.ore === v ? "selected" : ""}>Entro ${tOre(v)}</option>`).join("")}</select>
      <select data-f="max"><option value="0">Qualsiasi prezzo</option>${[40000, 60000, 80000, 120000, 200000].map(v => `<option value="${v}" ${+f.max === v ? "selected" : ""}>Fino a ${keur(v)}</option>`).join("")}</select>
      <select data-f="min"><option value="0">Ogni punteggio</option>${[50, 60, 70, 80].map(v => `<option value="${v}" ${+f.min === v ? "selected" : ""}>${v}+ punti</option>`).join("")}</select>
      <select data-f="sort">${[["score", "Punteggio"], ["rend", "Rendimento"], ["sconto", "Sotto mercato"], ["prezzo", "Prezzo più basso"], ["vicini", "Più vicini"]].map(([k, t]) => `<option value="${k}" ${f.sort === k ? "selected" : ""}>${t}</option>`).join("")}</select>
    </div></div>`;
}
function bindInvFiltri(key, f) {
  const box = $("#invf"); if (!box) return;
  box.addEventListener("click", e => { const c = e.target.closest("[data-cat]"), r = e.target.closest("[data-src]");
    if (c) { f.cat = c.dataset.cat; store.set(key, f); render(true); } if (r) { f.src = r.dataset.src; store.set(key, f); render(true); } });
  box.addEventListener("change", e => { const k = e.target.dataset.f; if (!k) return; f[k] = e.target.value; store.set(key, f); render(true); });
}
const invPts = rows => rows.filter(x => x.im.lat != null).map(x => ({ lat: x.im.lat, lng: x.im.lng, col: stato(x.A.score).col,
  html: `<b>${esc(x.im.comune || "")}</b><br>${esc(x.im.titolo || "")}<br>${eur(x.im.prezzo)} · netto ${pct(x.A.rend)} · <b>${x.A.score ?? "—"}</b>${x.d ? `<br>${tOre(x.d.min)} da casa` : ""}<br><a class="go" href="#imm/${x.src}/${encodeURIComponent(x.im.id)}">Apri la scheda →</a>` }));
/* CLASSIFICHE: generale, oppure per la zona cercata (testo) o disegnata col dito sulla mappa */
function clInPoly(lat, lng, P) { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [yi, xi] = P[i], [yj, xj] = P[j]; if ((yi > lat) !== (yj > lat) && lng < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c; } return c; }
function clRows() {
  const f = Object.assign({}, INV_F0, store.get("f_inv", {})), q = store.get("cl_q", ""), P = store.get("cl_poly", null);
  const t = tnorm(q).trim(), parole = t ? t.split(/\s+/) : [];
  return invRows(f).filter(({ im }) => (!parole.length || parole.every(w => tnorm([im.comune, im.zona, im.provincia, im.regione, im.titolo].join(" ")).includes(w)))
    && (!P || (im.lat != null && clInPoly(im.lat, im.lng, P))));
}
function clList() {
  const f = Object.assign({}, INV_F0, store.get("f_inv", {})), rows = clRows(), q = store.get("cl_q", ""), P = store.get("cl_poly", null);
  const ok = rows.filter(x => x.A.score != null), med = median(ok.map(x => x.A.rend).filter(v => v != null));
  const tit = P && q ? `Zona disegnata · "${esc(q)}"` : P ? "Zona disegnata" : q ? `"${esc(q)}"` : "Classifica generale";
  return `<div class="kpis"><div class="kpi"><small>Immobili</small><b>${rows.length}</b><span>${P || q ? "in questa zona" : "con questi filtri"}</span></div>
    <div class="kpi"><small>Affari</small><b class="cy">${ok.filter(x => x.A.score >= 70).length}</b><span>punteggio 70+</span></div>
    <div class="kpi"><small>Netto medio</small><b>${pct(med)}</b><span>rendimento</span></div></div>
  <h2>${tit} <small>${rows.length} immobili</small></h2>
  ${rows.length ? `<div class="list grid2">${rows.slice(0, 80).map((x, i) => cardIm(x.A, x.src, f.sort === "score" || f.sort === "rend" ? i + 1 : 0)).join("")}</div>` : `<div class="empty"><b>Nessun immobile qui</b><p>${P ? "Disegna una zona più ampia o togli quella disegnata." : "Cambia la ricerca o i filtri."} Se ti interessa questa zona, mandami il link di una ricerca e la carico.</p></div>`}`;
}
function vInvClassifica() {
  const f = Object.assign({}, INV_F0, store.get("f_inv", {})), regs = [...new Set(invAll().map(x => x.im.regione).filter(Boolean))].sort(), P = store.get("cl_poly", null);
  return `${invBread("classifica")}<h1>Classifiche</h1><p class="sub">Classifica generale, oppure scrivi un posto o disegna col dito la zona che ti interessa: la classifica si aggiorna su quella zona.</p>
  <div class="zsearch"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>
    <input type="search" id="clq" value="${esc(store.get("cl_q", ""))}" placeholder="Comune, zona, via, trilocale…" autocomplete="off" enterkeyhint="search"></div>
  <div class="clmapw"><div class="map clmap" id="clmap"></div>
    <div class="cltools"><button class="btn pri" id="cldraw">✏️ Disegna la zona</button><button class="btn sec" id="clclear" ${P ? "" : "hidden"}>✕ Togli la zona</button></div>
    <div class="clhint" id="clhint" hidden>Tieni il dito premuto e disegna il contorno della zona</div></div>
  ${invFiltri(f, regs)}
  <div id="cllist">${clList()}</div>`;
}
function afterInvClassifica() {
  const f = Object.assign({}, INV_F0, store.get("f_inv", {})), el = $("#clmap"), m = tMap(el, [[45.7, 9.6], 8]);
  const lay = m ? L.layerGroup().addTo(m) : null; let polyLay = null;
  const drawPts = () => { if (!lay) return; lay.clearLayers(); const rows = clRows(), b = [];
    invPts(rows).forEach(p => { L.circleMarker([p.lat, p.lng], { radius: 8, color: "#000", weight: 1.5, fillColor: p.col, fillOpacity: .95 }).bindPopup(p.html).addTo(lay); b.push([p.lat, p.lng]); });
    const P = store.get("cl_poly", null);
    if (P) m.fitBounds(P, { padding: [20, 20] }); else if (b.length) m.fitBounds(b, { padding: [40, 40], maxZoom: 13 }); };
  const showPoly = () => { if (!m) return; if (polyLay) { m.removeLayer(polyLay); polyLay = null; } const P = store.get("cl_poly", null);
    if (P) polyLay = L.polygon(P, { color: getComputedStyle(document.documentElement).getPropertyValue("--cy").trim() || "#c9a227", weight: 3, fillOpacity: .12, dashArray: "6 4" }).addTo(m);
    $("#clclear").hidden = !P; };
  const refresh = () => { $("#cllist").innerHTML = clList(); drawPts(); };
  showPoly(); drawPts();
  // disegno a mano libera
  let drawing = false, pts = [], line = null;
  const btn = $("#cldraw"), hint = $("#clhint");
  const stop = () => { drawing = false; el.classList.remove("drawing"); btn.textContent = "✏️ Disegna la zona"; hint.hidden = true; if (m) { m.dragging.enable(); m.touchZoom && m.touchZoom.enable(); } };
  btn.addEventListener("click", () => { if (!m) return; if (drawing) return stop(); drawing = true; pts = []; el.classList.add("drawing"); btn.textContent = "Annulla"; hint.hidden = false;
    m.dragging.disable(); m.touchZoom && m.touchZoom.disable(); });
  const ll = e => { const r = el.getBoundingClientRect(), t = e.touches ? e.touches[0] : e; return m.containerPointToLatLng([t.clientX - r.left, t.clientY - r.top]); };
  const down = e => { if (!drawing) return; e.preventDefault(); pts = [ll(e)]; if (line) m.removeLayer(line); line = L.polyline(pts, { color: getComputedStyle(document.documentElement).getPropertyValue("--cy").trim(), weight: 3 }).addTo(m); };
  const move = e => { if (!drawing || !pts.length) return; e.preventDefault(); pts.push(ll(e)); line.setLatLngs(pts); };
  const up = () => { if (!document.body.contains(el) || !drawing || !pts.length) return; if (line) { m.removeLayer(line); line = null; }
    if (pts.length > 5) { const step = Math.max(1, Math.floor(pts.length / 120)); store.set("cl_poly", pts.filter((_, i) => i % step === 0).map(p => [+p.lat.toFixed(5), +p.lng.toFixed(5)])); }
    pts = []; stop(); showPoly(); refresh(); };
  if (m) { el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move); window.addEventListener("pointerup", up, { once: false });
    el.addEventListener("touchstart", down, { passive: false }); el.addEventListener("touchmove", move, { passive: false }); el.addEventListener("touchend", up); }
  $("#clclear").addEventListener("click", () => { store.set("cl_poly", null); showPoly(); refresh(); if (m && !clRows().length) m.setView([45.7, 9.6], 8); });
  let tq; $("#clq").addEventListener("input", e => { clearTimeout(tq); tq = setTimeout(() => { store.set("cl_q", e.target.value); refresh(); }, 220); });
  bindInvFiltri("f_inv", f);
}
/* ---------------- DOVE CERCARE: tutti i comuni con rendimento netto B&B e affitto normale ---------------- */
const DV_TAG = { lago: ["Lago", "🏞"], sci: ["Montagna e sci", "⛷"], ospedale: ["Ospedale", "🏥"], uni: ["Università", "🎓"], aziende: ["Aziende", "🏭"] };
const DV_F0 = { uso: "breve", tags: [], ore: 180, prov: "", max: 0 };
const IMM_F0 = { prezzo: 60000, mq: 0, locali: 0, aste: true, ordine: "prezzo" };
/* link alla ricerca di Immobiliare con i filtri già impostati */
function immUrl(n) {
  const q = Object.assign({}, IMM_F0, store.get("imm_f", {})), p = [];
  if (+q.prezzo) p.push("prezzoMassimo=" + q.prezzo); if (+q.mq) p.push("superficieMinima=" + q.mq); if (+q.locali) p.push("localiMinimo=" + q.locali);
  if (q.aste) p.push("noAste=1"); if (q.ordine === "prezzo") p.push("criterio=prezzo&ordine=asc"); else if (q.ordine === "recenti") p.push("criterio=data&ordine=desc");
  return `https://www.immobiliare.it/vendita-case/${immSlug(n)}/${p.length ? "?" + p.join("&") : ""}`;
}
/* cartella dei link: li raccogli comune per comune e poi copi un unico messaggio per Claude */
const lbAll = () => store.get("linkbox", []);
function lbAdd(url, com, prov) {
  url = String(url || "").trim(); if (!/^https?:\/\//.test(url)) return false;
  if (!com) { const m = url.match(/vendita-case\/([^/?#]+)/), c = m && tIdx().com.find(x => immSlug(x.n) === m[1]);
    com = c ? c.n : m ? m[1].replace(/-/g, " ").replace(/\b\w/g, ch => ch.toUpperCase()) : "Link"; if (c && !prov) prov = c.p; }
  const L = lbAll().filter(x => x.url !== url); L.unshift({ url, com, prov: prov || "", dal: new Date().toISOString().slice(0, 10) }); store.set("linkbox", L.slice(0, 200)); return true;
}
function lbPrompt() {
  const L = lbAll(); if (!L.length) return "";
  return `Carica in Keystone gli annunci di queste ricerche (Investimenti), con scheda completa, comparabili, valore e business plan. Escludi aste, case da ristrutturare completamente e annunci senza foto.\n\n` +
    L.map(x => `- ${x.com}${x.prov ? " (" + x.prov + ")" : ""}: ${x.url}`).join("\n");
}
async function lbCopy(t) { try { await navigator.clipboard.writeText(t); return true; } catch (e) { const a = document.createElement("textarea"); a.value = t; document.body.appendChild(a); a.select(); let ok = false; try { ok = document.execCommand("copy"); } catch (x) {} a.remove(); return ok; } }
const DV_CACHE = new Map();
function dvTags(c) {
  const out = [];
  for (const k in DV_TAG) { const r = SERVIZI.raggio[k] * 1000; if (SERVIZI[k].some(([, la, lo]) => hav(c.lat, c.lon, la, lo) <= r)) out.push(k); }
  return out;
}
function dvCalc(c) {
  const key = c.n + "|" + c.p; if (DV_CACHE.has(key)) return DV_CACHE.get(key);
  const I = tIdx(), br = I.br.find(s => tnorm(s.n) === tnorm(c.n)), str = br ? { adr: br.adr, occ: br.occ, fonte: br.fonte } : tStrVicino(c);
  const q = { mq: 50, locali: 2, stato: "buono", arredato: false };
  let r = null; try { r = vCalcola(q, { v: c.v, a: c.aOk ? c.a : null, str, nome: c.n, milano: false }); } catch (e) {}
  const o = { c, tags: dvTags(c), br, str, breve: r?.sc.list.breve?.rendNetto ?? null, lungo: c.rl && r?.sc.list.lungo ? r.sc.list.lungo.rendNetto : null,
    prezzo: c.v * 50 * (1 - IMPOSTAZIONI.sconto_trattativa), adr: r?.breve?.adr, occ: r?.breve?.occ, canone: r?.canone, stima: !br };
  DV_CACHE.set(key, o); return o;
}
function dvRows(f) {
  const I = tIdx();
  return I.com.filter(c => c.v && c.lat != null && (!f.prov || c.p === f.prov) && (!+f.max || c.v * 50 <= +f.max))
    .map(c => ({ c, d: tDist(c.lat, c.lon) })).filter(x => x.d && x.d.min <= +f.ore)
    .map(x => ({ ...dvCalc(x.c), d: x.d })).filter(o => o[f.uso] != null && f.tags.every(t => o.tags.includes(t)))
    .sort((a, b) => b[f.uso] - a[f.uso]);
}
/* zona allargata: paesi vicini dove con il budget di Immobiliare si trova davvero qualcosa */
const DV_RAGGIO = 12000;
function dvVicini(c) {
  const bud = +(Object.assign({}, IMM_F0, store.get("imm_f", {})).prezzo) || 1e12;
  return tIdx().com.filter(x => x !== c && x.v && x.lat != null && hav(c.lat, c.lon, x.lat, x.lon) <= DV_RAGGIO && x.v * 50 * (1 - IMPOSTAZIONI.sconto_trattativa) <= bud * 1.1)
    .map(x => ({ x, d: hav(c.lat, c.lon, x.lat, x.lon) })).sort((a, b) => a.x.v - b.x.v).slice(0, 6);
}
const dvSopra = c => { const bud = +(Object.assign({}, IMM_F0, store.get("imm_f", {})).prezzo); return bud && c.v * 50 * (1 - IMPOSTAZIONI.sconto_trattativa) > bud * 1.1; };
let DV_GEO_LOADING = false;
async function dvCaricaVicini(rows) {   // carica una volta i paesi delle province dei primi comuni (poi restano salvati sul telefono)
  if (DV_GEO_LOADING) return; const fatte = store.get("geo_prov", []), da = [...new Set(rows.slice(0, 25).map(o => o.c.p))].filter(p => !fatte.includes(p) && TERR.prov[p]);
  if (!da.length) return; DV_GEO_LOADING = true; const note = $("#dvnote"); if (note) note.textContent = "Carico i paesi vicini per allargare le zone…";
  for (const p of da) { try { await tGeo(TERR.prov[p].istat); store.set("geo_prov", [...store.get("geo_prov", []), p]); } catch (e) {} }
  DV_GEO_LOADING = false; DV_CACHE.clear(); if (location.hash.startsWith("#inv/dove")) render(true);
}
function vDove() {
  const f = Object.assign({}, DV_F0, store.get("f_dove", {})), rows = dvRows(f), provs = Object.entries(TERR.prov).sort((a, b) => a[1].nome.localeCompare(b[1].nome));
  const geoN = Object.keys(store.get("geo", {})).length;
  return `${invBread("dove")}<h1>Dove cercare</h1><p class="sub">Tutti i comuni entro ${tOre(+f.ore)} da casa, dal più redditizio. Scegli tu cosa ti serve vicino; tocca un comune per aprire la ricerca su Immobiliare e mandami i link degli annunci che ti piacciono.</p>
  <div class="filters" id="dvf">
    <div class="chips">${[["breve", "B&B"], ["lungo", "Affitto normale"]].map(([k, t]) => `<button class="chip ${f.uso === k ? "on" : ""}" data-uso="${k}">${t}</button>`).join("")}</div>
    <div class="chips dvtags">${Object.entries(DV_TAG).map(([k, [t, e]]) => `<button class="chip ${f.tags.includes(k) ? "on" : ""}" data-tag="${k}">${e} ${t}</button>`).join("")}</div>
    <div class="selrow">
      <select data-f="ore">${[60, 90, 120, 150, 180].map(v => `<option value="${v}" ${+f.ore === v ? "selected" : ""}>Entro ${tOre(v)}</option>`).join("")}</select>
      <select data-f="prov"><option value="">Tutte le province</option>${provs.map(([k, p]) => `<option value="${k}" ${f.prov === k ? "selected" : ""}>${esc(p.nome)}</option>`).join("")}</select>
      <select data-f="max"><option value="0">Ogni prezzo</option>${[60000, 100000, 150000, 250000].map(v => `<option value="${v}" ${+f.max === v ? "selected" : ""}>Bilocale fino a ${keur(v)}</option>`).join("")}</select>
    </div>
  </div>
  ${dvImmHtml()}
  <a class="homecm" href="#completa/inv"><span><b>Completamento investimenti</b>Cosa ho già controllato e cosa manca: niente link da mandare</span><em>›</em></a>
  <p class="note" id="dvnote">${rows.length} comuni${f.prov ? "" : ` · scegli una provincia per vedere anche i paesi più piccoli`}${f.tags.length ? ` · con ${f.tags.map(t => DV_TAG[t][0].toLowerCase()).join(" e ")} vicino` : ""}.</p>
  <div class="map" id="dvmap"></div>
  <div class="dove">${rows.slice(0, 80).map((o, i) => `<div class="dv"><b>${i + 1}</b><span><a href="${esc(immUrl(o.c.n))}" target="_blank" rel="noopener">${esc(o.c.n)} <i>(${esc(o.c.p)})</i> ↗</a>
      <small>${f.uso === "breve" ? `${eur(o.adr)} a notte · ${pct(o.occ, 0)}${o.stima ? " (stima vicina)" : ""}` : `affitto ${eur(o.canone)}/mese`} · bilocale ~${keur(o.prezzo)} · ${tOre(o.d.min)}</small>
      ${o.tags.length ? `<small class="dvt">${o.tags.map(t => `<span title="${DV_TAG[t][0]}">${DV_TAG[t][1]} ${DV_TAG[t][0]}</span>`).join("")}</small>` : ""}
      ${(() => { const V = dvVicini(o.c), sopra = dvSopra(o.c); return V.length || sopra ? `<small class="dvv">${sopra ? `<b>Di solito sopra budget:</b> ` : ""}${V.length ? `${sopra ? "cerca nei vicini" : "Zona allargata"}: ${V.map(({ x, d }) => `<a href="${esc(immUrl(x.n))}" target="_blank" rel="noopener">${esc(x.n)} <i>${num(d / 1000, 0)} km</i></a><button class="lbadd mini ${lbAll().some(l => l.com === x.n) ? "on" : ""}" data-lb="${esc(x.n)}|${esc(x.p)}">${lbAll().some(l => l.com === x.n) ? "✓" : "+"}</button>`).join("")}` : "nessun paese vicino più economico in elenco"}</small>` : ""; })()}</span>
      <em>${pct(o[f.uso], 1)}</em></div>`).join("") || `<div class="empty"><b>Nessun comune</b><p>Togli un filtro o allarga il tempo di viaggio.</p></div>`}</div>
  ${rows.length > 80 ? `<p class="note">Mostro i primi 80 su ${rows.length}.</p>` : ""}
  <p class="note">Rendimento netto di un bilocale di 50 m² comprato al prezzo medio del comune (meno la trattativa, più costi d'acquisto e arredo), dopo spese e tasse da privata. B&amp;B: dati della località o, se non ci sono, della località turistica più vicina ridotti del 15%. Affitto normale solo dove i canoni del portale sono affidabili. Lago, sci, ospedali, università e aziende: distanza dai punti principali, indicativa.</p>`;
}
function dvImmHtml() {
  const q = Object.assign({}, IMM_F0, store.get("imm_f", {}));
  return `<details class="immf" ${store.get("immf_open", true) ? "open" : ""}><summary>Filtri della ricerca su Immobiliare <small>${+q.prezzo ? "fino a " + keur(q.prezzo) : "ogni prezzo"}${q.aste ? " · senza aste" : ""}</small></summary>
    <div class="selrow" id="immf">
      <select data-i="prezzo">${[[0, "Ogni prezzo"], [40000, "Fino a 40k"], [60000, "Fino a 60k"], [80000, "Fino a 80k"], [100000, "Fino a 100k"], [150000, "Fino a 150k"], [200000, "Fino a 200k"]].map(([v, t]) => `<option value="${v}" ${+q.prezzo === v ? "selected" : ""}>${t}</option>`).join("")}</select>
      <select data-i="mq"><option value="0">Ogni metratura</option>${[30, 40, 50, 60, 80].map(v => `<option value="${v}" ${+q.mq === v ? "selected" : ""}>Da ${v} m²</option>`).join("")}</select>
      <select data-i="locali"><option value="0">Ogni taglio</option>${[[2, "Da bilocale"], [3, "Da trilocale"]].map(([v, t]) => `<option value="${v}" ${+q.locali === v ? "selected" : ""}>${t}</option>`).join("")}</select>
      <select data-i="ordine">${[["prezzo", "Prima i più economici"], ["recenti", "Prima i più recenti"], ["rilevanza", "Ordine di Immobiliare"]].map(([v, t]) => `<option value="${v}" ${q.ordine === v ? "selected" : ""}>${t}</option>`).join("")}</select>
      <label class="tog"><input type="checkbox" data-i="aste" ${q.aste ? "checked" : ""}> Senza aste</label>
    </div>
    <p class="note">Tocca il nome di un comune per guardare tu gli annunci su Immobiliare con questi filtri. Sotto ogni comune trovi la "zona allargata": i paesi entro 12 km dove con il tuo budget si trova davvero qualcosa. Non serve mandarmi link: gli annunci li cerco e li carico io dal Completamento.</p></details>`;
}
function dvBoxHtml() {
  const L = lbAll();
  return `<div class="lbox"><div class="lbh"><b>📁 Cartella link</b><span>${L.length} ${L.length === 1 ? "ricerca" : "ricerche"}</span></div>
    <div class="lbin"><input type="url" id="lburl" placeholder="Incolla qui un link di Immobiliare" autocomplete="off"><button class="btn sec" id="lbpaste">Incolla</button></div>
    ${L.length ? `<div class="lblist">${L.map((x, i) => `<div><span>${esc(x.com)}${x.prov ? ` <i>(${esc(x.prov)})</i>` : ""}<small>${esc(x.url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 70))}</small></span><button data-lbdel="${i}" aria-label="Togli">✕</button></div>`).join("")}</div>
    <div class="btns"><button class="btn pri" id="lbcopy">Copia il messaggio per Claude</button><button class="btn sec" id="lbclear">Svuota</button></div>
    <p class="note">Copia il messaggio e incollalo in chat con Claude: carico tutte le ricerche in una volta.</p>` : `<p class="note">Qui raccogli i link delle ricerche, comune per comune. Quando hai finito, un tocco copia un unico messaggio con tutti i link da mandarmi.</p>`}</div>`;
}
function afterDove() {
  const f = Object.assign({}, DV_F0, store.get("f_dove", {})), save = () => { store.set("f_dove", f); render(true); };
  dvCaricaVicini(dvRows(f));
  const m = tMap($("#dvmap"), [[45.6, 9.4], 7]);
  if (m) { const rows = dvRows(f), vals = rows.map(o => o[f.uso]), b = [];
    const bins = [0.03, 0.045, 0.06, 0.08];
    rows.slice(0, 300).forEach((o, i) => { L.circleMarker([o.c.lat, o.c.lon], { radius: i < 10 ? 8 : 5, color: "#000", weight: 1, fillColor: tCol(o[f.uso], bins), fillOpacity: .95 })
      .bindPopup(`<b>${esc(o.c.n)}</b> (${o.c.p})<br>Netto ${f.uso === "breve" ? "B&B" : "affitto"}: <b>${pct(o[f.uso], 1)}</b><br>${tOre(o.d.min)} da casa${o.tags.length ? "<br>" + o.tags.map(t => DV_TAG[t][1] + " " + DV_TAG[t][0]).join(" · ") : ""}<br><a class="go" href="${esc(immUrl(o.c.n))}" target="_blank" rel="noopener">Cerca su Immobiliare ↗</a>`).addTo(m); b.push([o.c.lat, o.c.lon]); });
    if (b.length) m.fitBounds(b, { padding: [20, 20], maxZoom: 11 });
    tHomeMarkers && tHomeMarkers(m); }
  // filtri di Immobiliare
  $("#immf")?.addEventListener("change", e => { const k = e.target.dataset.i; if (!k) return; const q = Object.assign({}, IMM_F0, store.get("imm_f", {}));
    q[k] = e.target.type === "checkbox" ? e.target.checked : e.target.value; store.set("imm_f", q); render(true); });
  $(".immf")?.addEventListener("toggle", e => store.set("immf_open", e.target.open));
  // cartella link
  const addFrom = async (com, prov) => { let t = "";
    try { t = await navigator.clipboard.readText(); } catch (e) {}
    if (!/^https?:\/\//.test(t || "")) t = window.prompt(`Incolla il link della ricerca${com ? " di " + com : ""}:`, "") || "";
    if (lbAdd(t, com, prov)) render(true); else if (t) alert("Non sembra un link valido."); };
  $("#lbpaste")?.addEventListener("click", () => { const v = $("#lburl").value; if (v) { if (lbAdd(v)) render(true); } else addFrom(); });
  $("#lburl")?.addEventListener("keydown", e => { if (e.key === "Enter" && lbAdd(e.target.value)) render(true); });
  $("#lbcopy")?.addEventListener("click", async e => { const ok = await lbCopy(lbPrompt()); e.target.textContent = ok ? "✓ Copiato: incollalo in chat" : "Copia non riuscita"; });
  $("#lbclear")?.addEventListener("click", () => { if (confirm("Svuotare la cartella dei link?")) { store.set("linkbox", []); render(true); } });
  $(".lbox")?.addEventListener("click", e => { const d = e.target.closest("[data-lbdel]"); if (!d) return; const L = lbAll(); L.splice(+d.dataset.lbdel, 1); store.set("linkbox", L); render(true); });
  document.querySelector(".dove")?.addEventListener("click", e => { const b = e.target.closest("[data-lb]"); if (!b) return; const [com, prov] = b.dataset.lb.split("|");
    if (lbAll().some(x => x.com === com)) { if (confirm(`Togliere il link di ${com} dalla cartella?`)) { store.set("linkbox", lbAll().filter(x => x.com !== com)); render(true); } }
    else { lbAdd(immUrl(com), com, prov); render(true); } });   // un tocco: salva direttamente la ricerca con i filtri, senza aprire Immobiliare
  const box = $("#dvf");
  box.addEventListener("click", e => { const u = e.target.closest("[data-uso]"), t = e.target.closest("[data-tag]");
    if (u) { f.uso = u.dataset.uso; save(); }
    if (t) { const k = t.dataset.tag; f.tags = f.tags.includes(k) ? f.tags.filter(x => x !== k) : [...f.tags, k]; save(); } });
  box.addEventListener("change", e => { const k = e.target.dataset.f; if (!k) return; f[k] = e.target.value; store.set("f_dove", f);
    if (k === "prov" && f.prov && TERR.prov[f.prov]) { $("#dvnote").textContent = "Carico tutti i comuni della provincia…"; tGeo(TERR.prov[f.prov].istat).then(() => { DV_CACHE.clear(); render(true); }).catch(() => render(true)); }
    else render(true); });
}

function vInv(a, b, c) { if (!a || a === "zona") a = "classifica"; return a === "classifica" ? vInvClassifica() : a === "zona" ? vInvZona() : a === "dove" ? vDove() : vInvHub(); }
function afterInv(a, b, c) { if (!a || a === "zona") a = "classifica"; if (a === "classifica") afterInvClassifica(); else if (a === "zona") afterInvZona(); else if (a === "dove") afterDove(); }

/* ---------------- collegamento al router ---------------- */
const MI_ALIAS = { bnb: "cliente", lungo: "cliente", inv: "cliente", sub: "cliente", mappa: "cliente" };
document.addEventListener("change", e => { const t = e.target.closest("[data-target]"); if (!t) return; store.set("inv_target", +t.value); $("#mvf")?.dispatchEvent(new Event("change", { bubbles: true })); });
TERR_VIEWS.milano = [(a, b) => { a = MI_ALIAS[a] || a; if (a === "privati" && b) return vPrivato(b); return !a ? vMilanoHub() : MI_MODI[a] ? vMilano3D(null, a) : vMilano3D(a, "cliente"); },
  (a, b) => { a = MI_ALIAS[a] || a; if (!a) return afterMilanoHub(); if (a === "privati" && b) return afterPrivato(); MM.onSel = null; afterMilano3D(MI_MODI[a] ? (a === "mappa" ? b : null) : a); }];

/* ---------------- illustrazioni per gli annunci senza foto ----------------
   Ogni immobile ha un disegno suo, sempre uguale (dipende dal suo id): tipo di casa,
   paesaggio (mare, montagna, colline, città), ora del giorno e finestre accese cambiano. */
function artHash(s) { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function artSvg(im) {
  let seed = artHash(im.id || im.titolo || "x"); const R = () => { seed = (Math.imul(seed ^ (seed >>> 15), 2246822507) + 0x9e3779b9) >>> 0; return seed / 4294967296; };
  const t = (im.titolo || "").toLowerCase(), reg = (im.regione || "").toLowerCase(), com = (im.comune || "").toLowerCase();
  const tipo = /chalet|baita/.test(t) ? "chalet" : /rustic|casale|cascina/.test(t) ? "rustico" : /villett|villa|villino|casetta|casa |porzione|schiera|indipendent/.test(t + " ") ? "casa" : "palazzo";
  const mare = /liguria/.test(reg) || /mare|lido|marina|riviera/.test(com + t), monti = tipo === "chalet" || /valle d'aosta|trentino|alto adige/.test(reg) || /\b(val|monte|passo)\b/.test(com) || R() < 0.18;
  const lago = !mare && /lago|como|lecco|garda|maggiore|orta|iseo|varenna|bellagio|stresa|verbania/.test(com + t);
  const ore = [["#1b1430", "#c96b3a", "#f2cf5b"], ["#0e1a2b", "#3d5a80", "#e0b25a"], ["#120d08", "#6b3d1a", "#f5d76e"], ["#0a0f1e", "#202b4a", "#c9a227"], ["#2a1810", "#b8622c", "#ffd98a"]][Math.floor(R() * 5)];
  const sun = 60 + R() * 200, sunY = 70 + R() * 40;
  let g = `<defs><linearGradient id="k${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ore[0]}"/><stop offset=".75" stop-color="${ore[1]}"/></linearGradient></defs>
  <rect width="320" height="200" fill="url(#k${seed})"/><circle cx="${sun}" cy="${sunY}" r="${16 + R() * 10}" fill="${ore[2]}" opacity=".9"/>`;
  if (monti) { const p = []; for (let x = -20; x <= 340; x += 40 + R() * 40) p.push(`${x},${60 + R() * 60}`); g += `<polygon points="-20,200 ${p.join(" ")} 340,200" fill="#1a1612" opacity=".85"/>`;
    g += `<polygon points="-20,200 ${p.map(q => { const [x, y] = q.split(","); return `${+x + 20},${+y + 30}`; }).join(" ")} 340,200" fill="#100e0b"/>`; }
  else if (!mare) g += `<path d="M0 150 Q 80 ${110 + R() * 30} 160 140 T 320 ${125 + R() * 20} V200 H0z" fill="#17140f"/>`;
  if (mare || lago) { g += `<rect y="158" width="320" height="42" fill="${lago ? "#13202a" : "#0f2230"}"/>`; for (let i = 0; i < 6; i++) g += `<rect x="${R() * 300}" y="${164 + R() * 30}" width="${12 + R() * 30}" height="1.5" fill="${ore[2]}" opacity=".35"/>`; }
  const base = mare || lago ? 160 : 175, win = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="${R() < 0.55 ? ore[2] : "#2a251c"}" opacity="${R() < 0.55 ? 0.95 : 0.8}"/>`;
  if (tipo === "palazzo") {
    for (let i = 0; i < 4; i++) { const w = 30 + R() * 30, h = 40 + R() * 60, x = R() * 290 - 10; g += `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#0c0b09" opacity=".9"/>`; }
    const w = 90 + R() * 40, h = 90 + R() * 30, x = 160 - w / 2 + (R() - 0.5) * 60, piani = Math.floor(h / 18), col = Math.floor(w / 20);
    g += `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#1f1b15" stroke="#5a4818" stroke-width="1.5"/>`;
    for (let r = 0; r < piani; r++) for (let c = 0; c < col; c++) g += win(x + 8 + c * 20, base - h + 8 + r * 18, 10, 11);
    g += `<rect x="${x - 4}" y="${base - h - 5}" width="${w + 8}" height="6" fill="#c9a227"/>`;
  } else {
    const w = tipo === "rustico" ? 130 : 100 + R() * 30, h = tipo === "chalet" ? 50 : 45 + R() * 20, x = 160 - w / 2 + (R() - 0.5) * 70, roof = tipo === "chalet" ? 45 : 28 + R() * 10;
    g += `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${tipo === "rustico" ? "#3a2a1a" : "#2a241b"}" stroke="#5a4818" stroke-width="1.5"/>`;
    g += `<polygon points="${x - 10},${base - h} ${x + w / 2},${base - h - roof} ${x + w + 10},${base - h}" fill="${tipo === "chalet" ? "#4a3218" : "#6b3d1a"}" stroke="#c9a227" stroke-width="1.5"/>`;
    g += win(x + 14, base - h + 12, 16, 16) + win(x + w - 30, base - h + 12, 16, 16) + `<rect x="${x + w / 2 - 9}" y="${base - 26}" width="18" height="26" fill="#14100a" stroke="#c9a227"/>`;
    if (tipo === "casa" && R() < 0.6) g += `<circle cx="${x - 22}" cy="${base - 18}" r="16" fill="#12170f"/><rect x="${x - 24}" y="${base - 8}" width="4" height="8" fill="#14100a"/>`;
    if (tipo === "rustico") g += `<rect x="${x + w + 6}" y="${base - 70}" width="14" height="70" fill="#3a2a1a" stroke="#5a4818"/>`;
  }
  g += `<rect y="${base}" width="320" height="${200 - base}" fill="${mare || lago ? "none" : "#0d0c0a"}"/>`;
  return `<svg class="art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${g}</svg>`;
}
