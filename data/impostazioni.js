// INVEST17 — parametri di calcolo usati da tutte le schede.
// Cambiare qui un valore aggiorna i conti di tutti gli immobili.
// Ogni immobile può sovrascrivere un parametro nel proprio campo "parametri".
const IMPOSTAZIONI = {
  // Acquisto
  costi_acquisto_pct: 0.10,      // imposte, notaio, agenzia (stima prudente sul prezzo)
  arredo_se_non_arredato: 7000,  // € per arredare (breve e medio termine)
  sconto_trattativa: 0.08,       // differenza tipica tra prezzo chiesto e prezzo di vendita
  peso_comparabili: 0.6,         // peso dei comparabili rispetto all'OMI nel valore stimato

  // Affitto breve (B&B / Airbnb / Booking)
  breve: {
    commissioni_pct: 0.17,       // Airbnb/Booking
    gestione_pct: 0.15,          // co-host locale (0 se gestito da noi)
    soggiorno_medio_notti: 2.5,
    pulizia_per_soggiorno: 30,   // pulizie e biancheria non coperte dal guest
    utenze_anno: 1800,
    manutenzione_pct: 0.04,
    assicurazione_anno: 250
  },
  // Medio termine / transitorio
  medio: {
    commissioni_pct: 0.08,       // portali tipo Spotahome/HousingAnywhere o agenzia
    utenze_anno: 1500,           // incluse nel canone
    manutenzione_pct: 0.03,
    assicurazione_anno: 200
  },
  // Affitto lungo (4+4, 3+2)
  lungo: {
    mesi_incassati: 11.5,        // un mezzo mese di sfitto/morosità all'anno
    condominio_proprietario_pct: 0.2,
    manutenzione_pct: 0.03,
    assicurazione_anno: 150
  },
  // Tasse (indicative: da verificare col commercialista)
  tasse: {
    cedolare: 0.21,              // privata: 21% (26% dalla seconda unità in affitto breve)
    societa: 0.279               // SRL: IRES 24% + IRAP 3,9% sull'utile
  },
  // Punteggio 0-100
  punteggio: {
    rend_zero: 0.0, rend_top: 0.08,     // rendimento netto: 0% → 0 punti, 8% → 100
    sconto_zero: -0.10, sconto_top: 0.15, // prezzo rispetto al valore stimato
    pesi: { rendimento: 0.55, prezzo: 0.30, affidabilita: 0.15 }
  }
};
