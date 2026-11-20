// KEYSTONE — genera data/auto.js (Investimenti, caricamenti automatici) da tools/auto_raw.json
// uso: node tools/auto_imm.js
const fs = require("fs"), path = require("path");
const R = p => path.join(__dirname, "..", p);
eval(fs.readFileSync(R("data/territorio.js"), "utf8") + ";globalThis.TERR=TERR");
const raw = JSON.parse(fs.readFileSync(R("tools/auto_raw.json"), "utf8"));
const hav = (a, b, c, d) => { const r = Math.PI / 180, x = Math.sin((c - a) * r / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin((d - b) * r / 2) ** 2; return 12742000 * Math.asin(Math.sqrt(x)); };
const REG = { SO: "Lombardia", LC: "Lombardia", CO: "Lombardia", BS: "Lombardia", BG: "Lombardia", VA: "Lombardia", VB: "Piemonte", NO: "Piemonte", SP: "Liguria", GE: "Liguria", VR: "Veneto" };
const out = raw.annunci.map(a => {
  const c = TERR.comuni.find(x => x[0] === a.comune && x[1] === a.p) || [a.comune, a.p, null, 0, null];
  const [, , vMq, , aff] = c, co = TERR.coord[a.comune] || raw.coord[a.comune];
  // affitto breve: dati AirROI del comune o del più vicino entro 30 km
  const br = TERR.brevi.map(b => ({ b, d: co ? hav(co[0], co[1], b.lat, b.lon) : 1e9 })).sort((x, y) => x.d - y.d)[0];
  const L = Math.min(4, a.locali || 2), k = { 1: 0.55, 2: 0.65, 3: 0.75, 4: 0.85 }[L], cap = { 1: 80, 2: 100, 3: 120, 4: 140 }[L], lontano = br.d > 3000;
  const breve = br.d < 30000 ? { adr: Math.round(Math.min(cap, br.b.adr * k) * (lontano ? 0.85 : 1)), occ: +(br.b.occ * (lontano ? 0.7 : 0.8)).toFixed(2), stima: true,
    fonte: `Stima su AirROI di ${br.b.n} (${br.b.ann} annunci: ${Math.round(br.b.occ * 100)}% di occupazione, ${br.b.adr} € a notte)${lontano ? `, a ${Math.round(br.d / 1000)} km: ridotti prezzo e occupazione` : ""}; prezzo a notte adattato alla grandezza (tetto prudente) e occupazione ridotta del 20% per un annuncio nuovo.` } : null;
  const eurMq = aff && aff < 20 ? aff : 7;
  const canone = Math.round(Math.min(a.mq, 90) * eurMq * 0.7 / 10) * 10;   // prudenza: nei paesi la media degli annunci d'affitto è spinta in su dai tagli piccoli
  const comps = raw.annunci.filter(x => x.comune === a.comune && x.id !== a.id).map(x => ({ titolo: x.titolo, prezzo: x.prezzo, mq: x.mq, url: `https://www.immobiliare.it/annunci/${x.id}/`, stato: x.stato }));
  return {
    id: "auto-" + a.id, titolo: a.titolo, url: `https://www.immobiliare.it/annunci/${a.id}/`, fonte: "Immobiliare.it (ricerca automatica di Claude)",
    aggiunto: a.trovato || raw.data, trovato: a.trovato || raw.data, regione: REG[a.p] || "", provincia: a.p, comune: a.comune, zona: a.indirizzo,
    lat: co ? co[0] : null, lng: co ? co[1] : null, pos_indicativa: true,
    prezzo: a.prezzo, mq: a.mq, locali: a.locali, bagni: a.bagni, piano: a.piano, arredato: !!a.arredato, stato: a.stato || "buono", lavori: 0,
    classe_energetica: a.classe || "", foto: a.foto[0], foto_extra: a.foto.slice(1), agenzia: a.agenzia, aggiornato_annuncio: a.aggiornato,
    spese: { condominio_mese: a.spese_mese || 0, imu_anno: Math.max(250, Math.round(a.prezzo * 0.008 / 10) * 10), stima: true },
    affitti: { breve, lungo: a.canone ? { canone: a.canone, stima: false, fonte: a.canone_fonte } : { canone, stima: true, fonte: `Stima: ${eurMq.toLocaleString("it-IT")} €/m² al mese (media degli annunci d'affitto del comune, Immobiliare.it), ridotta del 30% per prudenza.` } },
    giudizio: { pro: a.pro, contro: a.contro, sintesi: `${a.titolo} a ${Math.round(a.prezzo / a.mq)} €/m², in ${a.stato || "buono"} stato.` },
    valutazione: { omi: vMq ? { medio: vMq, fonte: `media degli annunci di vendita a ${a.comune} (Immobiliare.it)` } : null, comparabili: comps },
  };
});
const s = "// INVEST17 — \"Ricerca automatica\": immobili trovati da Claude su Immobiliare.it (non caricati a mano).\n// Stesso schema di data/immobili.js, più \"trovato\" (data AAAA-MM-GG).\n// Generato da tools/auto_imm.js con tools/auto_raw.json: non modificare a mano.\n"
  + "const AUTO = " + JSON.stringify(out, null, 0) + ";\n"
  + "// comuni già controllati (comune|provincia → annunci buoni trovati) e data del controllo\n"
  + "const AUTO_CONTROLLATI = " + JSON.stringify(raw.controllati) + ";\nconst AUTO_CONTROLLO_DATA = \"" + raw.data + "\";\n";
fs.writeFileSync(R("data/auto.js"), s);
console.log(out.length, "annunci automatici;", Object.keys(raw.controllati).length, "comuni controllati");
