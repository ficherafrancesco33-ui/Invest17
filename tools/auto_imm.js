// KEYSTONE — genera data/auto.js (Investimenti, caricamenti automatici) da tools/auto_raw.json
// uso: node tools/auto_imm.js
const fs = require("fs"), path = require("path");
const R = p => path.join(__dirname, "..", p);
eval(fs.readFileSync(R("data/territorio.js"), "utf8") + ";globalThis.TERR=TERR");
eval(fs.readFileSync(R("data/omi.js"), "utf8") + ";globalThis.OMI=OMI;globalThis.OMI_SEM=OMI_SEM");
// zona OMI dell'annuncio: parola della via trovata nella descrizione della zona, altrimenti il centro se l'annuncio è in centro, altrimenti la zona tipica (semicentro/periferia)
const nz = x => (x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
function omiZona(a) {
  const Z = OMI[a.comune + "|" + a.p]; if (!Z) return null;
  const L = Object.entries(Z).filter(([, z]) => z.cn || z.en);
  const nomeCom = nz(a.comune).split(/[^A-Z]+/);
  const parole = nz(a.indirizzo).split(/[^A-Z]+/).filter(w => w.length >= 5 && !nomeCom.includes(w) && !["PIAZZA", "VIALE", "CORSO", "STRADA", "LOCALITA", "FRAZIONE", "CENTRO", "SPALTO"].includes(w));
  let z = a.omi_zona ? L.find(([k]) => k === a.omi_zona) : null;   // zona scelta a mano quando la via non basta
  if (!z) z = L.find(([, x]) => parole.some(w => new RegExp("\\b" + w + "\\b").test(nz(x.d))));
  const centro = /CENTRO|CENTRALE|STORICO/.test(nz(a.indirizzo + " " + a.titolo));
  if (!z && centro) z = L.find(([, x]) => x.f === "B");
  if (!z) z = L.find(([, x]) => x.f === "C") || L.find(([, x]) => x.f === "B") || L.find(([, x]) => x.f === "D") || L[0];
  if (!z) return null;
  const [cod, x] = z, buono = !["ottimo", "ristrutturato", "nuovo"].includes(a.stato);
  const v = (buono ? x.cn : x.co || x.cn) || x.en;
  const aff = x.cn || x.en;
  return { zona: cod, fascia: x.f, descr: x.d, min: v[0], max: v[1], medio: Math.round((v[0] + v[1]) / 2), loc: aff && aff[2] ? [aff[2], aff[3]] : null,
    tip: v === x.en ? "abitazioni economiche" : "abitazioni civili", stato: buono || !x.co ? "normale" : "ottimo" };
}
const raw = JSON.parse(fs.readFileSync(R("tools/auto_raw.json"), "utf8"));
const hav = (a, b, c, d) => { const r = Math.PI / 180, x = Math.sin((c - a) * r / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin((d - b) * r / 2) ** 2; return 12742000 * Math.asin(Math.sqrt(x)); };
const REG = { SO: "Lombardia", LC: "Lombardia", CO: "Lombardia", BS: "Lombardia", BG: "Lombardia", VA: "Lombardia", VB: "Piemonte", NO: "Piemonte", SP: "Liguria", GE: "Liguria", VR: "Veneto", AL: "Piemonte", PV: "Lombardia", LO: "Lombardia", MI: "Lombardia", PC: "Emilia-Romagna" };
// regola di Imma: niente appartamenti dal 3° piano in su senza ascensore
const pianoN = a => { const m = String(a.piano || "").match(/\d+/); return m ? +m[0] : 0; };
raw.annunci = raw.annunci.filter(a => !(pianoN(a) >= 3 && a.ascensore !== true && !/terratetto|casa|villa/i.test(a.titolo)));
const out = raw.annunci.map(a => {
  const c = TERR.comuni.find(x => x[0] === a.comune && x[1] === a.p) || [a.comune, a.p, null, 0, null];
  const [, , vMq, , aff] = c, co = TERR.coord[a.comune] || raw.coord[a.comune];
  // affitto breve: dati AirROI del comune o del più vicino entro 30 km
  const br = TERR.brevi.map(b => ({ b, d: co ? hav(co[0], co[1], b.lat, b.lon) : 1e9 })).sort((x, y) => x.d - y.d)[0];
  const L = Math.min(4, a.locali || 2), k = { 1: 0.55, 2: 0.65, 3: 0.75, 4: 0.85 }[L], cap = { 1: 80, 2: 100, 3: 120, 4: 140 }[L], lontano = br.d > 3000;
  const breve = br.d < 30000 ? { adr: Math.round(Math.min(cap, br.b.adr * k) * (lontano ? 0.85 : 1)), occ: +(br.b.occ * (lontano ? 0.7 : 0.8)).toFixed(2), stima: true,
    fonte: `Stima su AirROI di ${br.b.n} (${br.b.ann} annunci: ${Math.round(br.b.occ * 100)}% di occupazione, ${br.b.adr} € a notte)${lontano ? `, a ${Math.round(br.d / 1000)} km: ridotti prezzo e occupazione` : ""}; prezzo a notte adattato alla grandezza (tetto prudente) e occupazione ridotta del 20% per un annuncio nuovo.` } : null;
  const eurMq = aff && aff < 20 ? aff : 7, om = omiZona(a);
  // affitto normale: canone OMI della zona (valore medio) se c'è, altrimenti la media degli annunci del comune ridotta del 30%
  const locOmi = om && om.loc ? (om.loc[0] + om.loc[1]) / 2 : null;
  const canone = Math.round(Math.min(a.mq, 90) * (locOmi ? locOmi : eurMq * 0.7) / 10) * 10;
  const comps = raw.annunci.filter(x => x.comune === a.comune && x.id !== a.id).map(x => ({ titolo: x.titolo, prezzo: x.prezzo, mq: x.mq, url: `https://www.immobiliare.it/annunci/${x.id}/`, stato: x.stato })).concat(a.comparabili || []);   // + annunci in vendita vicini (cercati a parte)
  return {
    id: "auto-" + a.id, titolo: a.titolo, url: `https://www.immobiliare.it/annunci/${a.id}/`, fonte: "Immobiliare.it (ricerca automatica di Claude)",
    aggiunto: a.trovato || raw.data, trovato: a.trovato || raw.data, regione: REG[a.p] || "", provincia: a.p, comune: a.comune, zona: a.indirizzo,
    lat: a.lat ?? (co ? co[0] : null), lng: a.lon ?? (co ? co[1] : null), pos_indicativa: a.lat == null,
    prezzo: a.prezzo, mq: a.mq, locali: a.locali, bagni: a.bagni, piano: a.piano, arredato: !!a.arredato, stato: a.stato || "buono", lavori: a.lavori || 0,
    classe_energetica: a.classe || "", foto: a.galleria ? `https://pwm.im-cdn.it/image/${a.galleria[0]}/s-c.jpg` : a.foto[0], foto_extra: a.foto.slice(1), galleria: a.galleria || null, agenzia: a.agenzia, aggiornato_annuncio: a.aggiornato,
    spese: { condominio_mese: a.spese_mese || 0, imu_anno: Math.max(250, Math.round(a.prezzo * 0.008 / 10) * 10), stima: true },
    affitti: { breve, lungo: a.canone ? { canone: a.canone, stima: false, fonte: a.canone_fonte } : { canone, stima: true, fonte: locOmi ? `Stima OMI ${OMI_SEM}, zona ${om.zona} (${om.descr.toLowerCase()}): affitto ${om.loc[0].toLocaleString("it-IT")}–${om.loc[1].toLocaleString("it-IT")} €/m² al mese, preso il valore medio.` : `Stima: ${eurMq.toLocaleString("it-IT")} €/m² al mese (media degli annunci d'affitto del comune, Immobiliare.it), ridotta del 30% per prudenza.` } },
    giudizio: { pro: a.pro, contro: a.contro, sintesi: `${a.titolo} a ${Math.round(a.prezzo / a.mq)} €/m², in ${a.stato || "buono"} stato.` },
    valutazione: { omi: om ? { min: om.min, max: om.max, medio: om.medio, zona: om.zona, fascia: om.fascia, descr: om.descr, loc: om.loc,
      fonte: `OMI Agenzia delle Entrate ${OMI_SEM}, zona ${om.zona} ${om.descr.toLowerCase()}: ${om.tip}, stato ${om.stato}` }
      : vMq ? { medio: vMq, fonte: `media degli annunci di vendita a ${a.comune} (Immobiliare.it)` } : null, comparabili: comps },
  };
});
const s = "// KEYSTONE — \"Ricerca automatica\": immobili trovati da Claude su Immobiliare.it (non caricati a mano).\n// Stesso schema di data/immobili.js, più \"trovato\" (data AAAA-MM-GG).\n// Generato da tools/auto_imm.js con tools/auto_raw.json: non modificare a mano.\n"
  + "const AUTO = " + JSON.stringify(out, null, 0) + ";\n"
  + "// comuni già controllati (comune|provincia → annunci buoni trovati) e data del controllo\n"
  + "const AUTO_CONTROLLATI = " + JSON.stringify(raw.controllati) + ";\nconst AUTO_CONTROLLO_DATA = \"" + raw.data + "\";\n";
fs.writeFileSync(R("data/auto.js"), s);
console.log(out.length, "annunci automatici;", Object.keys(raw.controllati).length, "comuni controllati");
