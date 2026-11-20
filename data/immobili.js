// INVEST17 — "I miei immobili": archivio fatto a mano (link mandati da Imma e caricamenti per zona).
// Solo DATI: i conti li fa l'app. Schema in NOTE_SVILUPPO.md. Aggiornato il 20/11/2026.
const MIEI = [
 {
  "id": "oneta-a",
  "titolo": "Bilocale con terrazzo d'angolo e camino",
  "url": "https://www.immobiliare.it/annunci/134579621/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8758,
  "lng": 9.8055,
  "pos_indicativa": true,
  "prezzo": 42000,
  "mq": 63,
  "locali": 2,
  "bagni": 1,
  "piano": "rialzato",
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "G",
  "foto": "https://cdn.caasa.it/s3/s/3f14/663feda3/0-1.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 90,
    "occ": 0.3,
    "mesi": [
     0.226,
     0.221,
     0.156,
     0.349,
     0.319,
     0.183,
     0.333,
     0.586,
     0.372,
     0.182,
     0.405,
     0.268
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 350,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Arredato e pronto: tetto nuovo, doppi vetri, caldaia nuova",
    "Terrazzo d'angolo di circa 23 m² con vista su prati e pinete",
    "Prezzo al m² tra i più bassi della zona"
   ],
   "contro": [
    "Classe energetica G: riscaldamento costoso d'inverno",
    "Metratura incerta (63 m² nei dati, circa 55 nel testo)"
   ],
   "sintesi": "Arredato e pronto, con impianti rinnovati: scelta solida."
  },
  "note_mq": "nel testo dell'annuncio circa 55 m²",
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Bilocale arredato con camino in pietra",
     "prezzo": 39000,
     "mq": 65,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
     "lat": 45.8786,
     "lng": 9.8035,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale con balcone, camino e cantina",
     "prezzo": 58000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/134750813/",
     "lat": 45.879,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Monolocale su due livelli con soppalco e camino",
     "prezzo": 64000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/133100318/",
     "lat": 45.876,
     "lng": 9.8105,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale arredato con grande terrazzo",
     "prezzo": 53000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/134675479/",
     "lat": 45.8762,
     "lng": 9.807,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale nuovo mai abitato con giardino privato",
     "prezzo": 65000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/113695957/",
     "lat": 45.8756,
     "lng": 9.809,
     "stato": "ottimo"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-b",
  "titolo": "Bilocale arredato con camino in pietra",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Via dei Pini",
  "lat": 45.8786,
  "lng": 9.8035,
  "pos_indicativa": true,
  "prezzo": 39000,
  "mq": 65,
  "locali": 2,
  "bagni": 1,
  "piano": "—",
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://images.nestoria.com/v1/eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9kaV82NV9tX2luX3ZpYV9kZWlfcGluaV82XzMwNjAwMDU3ODc4MjU0MDA1MjguanBnIiwiYnJhbmQiOiJuZXN0b3JpYSIsImNvdW50cnkiOiJJVCIsIndpZHRoIjo2NDAsImhlaWdodCI6NDgwfQ==",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 90,
    "occ": 0.3,
    "mesi": [
     0.226,
     0.221,
     0.156,
     0.349,
     0.319,
     0.183,
     0.333,
     0.586,
     0.372,
     0.182,
     0.405,
     0.268
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 350,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Arredato, con terrazzo",
    "Camino in pietra: piace molto agli ospiti in montagna",
    "Circa 600 €/m²: prezzo d'ingresso molto basso"
   ],
   "contro": [
    "Online da più di un mese: c'è margine di trattativa ma va capito perché",
    "Classe energetica non indicata"
   ],
   "sintesi": "Arredato a circa 600 €/m²: ingresso economico, da trattare."
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Bilocale con terrazzo d'angolo e camino",
     "prezzo": 42000,
     "mq": 63,
     "url": "https://www.immobiliare.it/annunci/134579621/",
     "lat": 45.8758,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale arredato con grande terrazzo",
     "prezzo": 53000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/134675479/",
     "lat": 45.8762,
     "lng": 9.807,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale con balcone, camino e cantina",
     "prezzo": 58000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/134750813/",
     "lat": 45.879,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale nuovo mai abitato con giardino privato",
     "prezzo": 65000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/113695957/",
     "lat": 45.8756,
     "lng": 9.809,
     "stato": "ottimo"
    },
    {
     "titolo": "Monolocale su due livelli con soppalco e camino",
     "prezzo": 64000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/133100318/",
     "lat": 45.876,
     "lng": 9.8105,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-c",
  "titolo": "Monolocale in via Alben, abitabile",
  "url": "https://www.immobiliare.it/annunci/133240732/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.878,
  "lng": 9.808,
  "pos_indicativa": true,
  "prezzo": 23000,
  "mq": 36,
  "locali": 1,
  "bagni": 1,
  "piano": "terra",
  "arredato": false,
  "stato": "buono",
  "lavori": 1500,
  "classe_energetica": "F",
  "foto": "https://cdn.caasa.it/s3/s/3f14/662be4c9/0-1.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 75,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 280,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Il prezzo più basso del paese: investimento minimo",
    "Bagno finestrato con doccia, buone condizioni"
   ],
   "contro": [
    "Non arredato: servono circa 7.000 € di arredo per affittarlo",
    "Piccolo: in montagna si affittano meglio le case per famiglie"
   ],
   "sintesi": "Investimento minimo: rende solo con l'affitto lungo e va arredato."
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Bivano con ingresso indipendente e cortile privato",
     "prezzo": 46000,
     "mq": 35,
     "url": "https://www.immobiliare.it/annunci/128957484/",
     "lat": 45.8774,
     "lng": 9.8105,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale arredato con due balconi, ribassato",
     "prezzo": 35000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/115437493/",
     "lat": 45.8778,
     "lng": 9.8075,
     "stato": "buono"
    },
    {
     "titolo": "Trivano con balcone tra le pinete",
     "prezzo": 68000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/127593940/",
     "lat": 45.8782,
     "lng": 9.808,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale al piano terra in Residenza Borgo Antico",
     "prezzo": 55000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/122483132/",
     "lat": 45.878,
     "lng": 9.804,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano, bagno rifatto, arredato",
     "prezzo": 47000,
     "mq": 55,
     "url": "https://www.immobiliare.it/annunci/134056935/",
     "lat": 45.8778,
     "lng": 9.8065,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-d",
  "titolo": "Trilocale arredato con grande terrazzo",
  "url": "https://www.immobiliare.it/annunci/134675479/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8762,
  "lng": 9.807,
  "pos_indicativa": true,
  "prezzo": 53000,
  "mq": 70,
  "locali": 3,
  "bagni": 1,
  "piano": "—",
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "E",
  "foto": "https://cdn.caasa.it/s3/s/3f14/66418329/0-1.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.3,
    "mesi": [
     0.226,
     0.221,
     0.156,
     0.349,
     0.319,
     0.183,
     0.333,
     0.586,
     0.372,
     0.182,
     0.405,
     0.268
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Arredato e pronto da abitare",
    "Grande terrazzo, circa 900 m di quota",
    "Classe E, migliore della media della zona"
   ],
   "contro": [
    "Metratura da verificare (70 o 80 m²)"
   ]
  },
  "note_mq": "nel testo dell'annuncio 80 m²",
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale nuovo mai abitato con giardino privato",
     "prezzo": 65000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/113695957/",
     "lat": 45.8756,
     "lng": 9.809,
     "stato": "ottimo"
    },
    {
     "titolo": "Bilocale arredato con camino in pietra",
     "prezzo": 39000,
     "mq": 65,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
     "lat": 45.8786,
     "lng": 9.8035,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano con terrazzo panoramico",
     "prezzo": 43000,
     "mq": 75,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8470000789208371747",
     "lat": 45.8758,
     "lng": 9.811,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale con terrazzo d'angolo e camino",
     "prezzo": 42000,
     "mq": 63,
     "url": "https://www.immobiliare.it/annunci/134579621/",
     "lat": 45.8758,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale verso il Passo di Zambla, libero su tre lati",
     "prezzo": 39000,
     "mq": 80,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8220000781086767286",
     "lat": 45.8786,
     "lng": 9.8005,
     "stato": "da rinfrescare"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-e",
  "titolo": "Trilocale arredato con due balconi, ribassato",
  "url": "https://www.immobiliare.it/annunci/115437493/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8778,
  "lng": 9.8075,
  "pos_indicativa": true,
  "prezzo": 35000,
  "mq": 50,
  "locali": 3,
  "bagni": 1,
  "piano": "2",
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "G",
  "foto": "https://cdn.caasa.it/s3/s/3f14/64e9e5ca/0-3.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.3,
    "mesi": [
     0.226,
     0.221,
     0.156,
     0.349,
     0.319,
     0.183,
     0.333,
     0.586,
     0.372,
     0.182,
     0.405,
     0.268
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Prezzo già ribassato",
    "Tetto e facciate rifatti: niente spese condominiali straordinarie in vista",
    "Arredato, due balconi soleggiati e camino"
   ],
   "contro": [
    "Classe G",
    "Secondo piano: verificare se c'è l'ascensore"
   ],
   "sintesi": "Il più interessante: arredato, già ribassato, con tetto e facciate rifatti."
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trivano con balcone tra le pinete",
     "prezzo": 68000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/127593940/",
     "lat": 45.8782,
     "lng": 9.808,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale al piano terra in Residenza Borgo Antico",
     "prezzo": 55000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/122483132/",
     "lat": 45.878,
     "lng": 9.804,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano, bagno rifatto, arredato",
     "prezzo": 47000,
     "mq": 55,
     "url": "https://www.immobiliare.it/annunci/134056935/",
     "lat": 45.8778,
     "lng": 9.8065,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale con balcone, camino e cantina",
     "prezzo": 58000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/134750813/",
     "lat": 45.879,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Monolocale su due livelli con soppalco e camino",
     "prezzo": 64000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/133100318/",
     "lat": 45.876,
     "lng": 9.8105,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-f",
  "titolo": "Villetta a schiera con giardino e box doppio",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2370005792231697747",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Via Alben",
  "lat": 45.8784,
  "lng": 9.8095,
  "pos_indicativa": true,
  "prezzo": 70000,
  "mq": 75,
  "locali": 2,
  "bagni": 1,
  "piano": "indipendente",
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://images.nestoria.com/v1/eyJrZXkiOiJ2aWxsZXR0YV9hX3NjaGllcmFfaW5fdmVuZGl0YV9kaV83NV9tX2luX3ZpYV9hbGJlbl8xOV8yMzcwMDA1NzkyMjMxNjQ4NTE2LmpwZyIsImJyYW5kIjoibmVzdG9yaWEiLCJjb3VudHJ5IjoiSVQiLCJ3aWR0aCI6NjQwLCJoZWlnaHQiOjQ4MH0=",
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 500,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 120,
    "occ": 0.3,
    "mesi": [
     0.226,
     0.221,
     0.156,
     0.349,
     0.319,
     0.183,
     0.333,
     0.586,
     0.372,
     0.182,
     0.405,
     0.268
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Casa indipendente con giardino e orto",
    "Box doppio con lavanderia",
    "Arredata, camino"
   ],
   "contro": [
    "Metratura incerta (75 o 48 m²): cambia molto il prezzo al m²"
   ]
  },
  "note_mq": "su un altro portale compare con 48 m²",
  "valutazione": {
   "omi": {
    "medio": 848,
    "fonte": "zona R1 Oneta, case indipendenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Porzione di casa con ingresso indipendente, sottotetto e cantina",
     "prezzo": 68000,
     "mq": 75,
     "url": "https://www.immobiliare.it/annunci/121747290/",
     "lat": 45.8731,
     "lng": 9.8179,
     "stato": "buono"
    },
    {
     "titolo": "Villino su due livelli, tetto e serramenti nuovi",
     "prezzo": 49000,
     "mq": 100,
     "url": "https://www.immobiliare.it/annunci/134643497/",
     "lat": 45.8723,
     "lng": 9.8204,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-g",
  "titolo": "Casa indipendente su quattro livelli, 220 m²",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-6490004780740514338",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Cantoni d'Oneta",
  "lat": 45.874,
  "lng": 9.815,
  "pos_indicativa": true,
  "prezzo": 82000,
  "mq": 220,
  "locali": 6,
  "bagni": 2,
  "piano": "indipendente",
  "arredato": false,
  "stato": "da rinfrescare",
  "lavori": 6000,
  "classe_energetica": null,
  "foto": "https://images.nestoria.com/v1/eyJrZXkiOiJ2aWxsZXR0YV9pbmRpcGVuZGVudGVfaW5fdmVuZGl0YV9kaV8yMjBfbV9pbl92aWFfY2FudG9uaV8xNF82NDkwMDA0NzgwNzQwNDY1MTA3LmpwZyIsImJyYW5kIjoibmVzdG9yaWEiLCJjb3VudHJ5IjoiSVQiLCJ3aWR0aCI6NjQwLCJoZWlnaHQiOjQ4MH0=",
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 500,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 160,
    "occ": 0.22,
    "mesi": [
     0.166,
     0.162,
     0.114,
     0.256,
     0.234,
     0.134,
     0.244,
     0.43,
     0.272,
     0.133,
     0.297,
     0.196
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 600,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "372 €/m²: costo al metro bassissimo",
    "Libera su tre lati, tetto manutenuto ogni anno",
    "Spazio per gruppi o per ricavare due unità"
   ],
   "contro": [
    "Molto grande: arredo, riscaldamento e pulizie costano di più",
    "Lavori probabilmente oltre i ritocchi leggeri: serve un sopralluogo"
   ],
   "sintesi": "Costo al metro bassissimo, ma è una casa grande: non sono ritocchi leggeri."
  },
  "valutazione": {
   "omi": {
    "medio": 848,
    "fonte": "zona R1 Oneta, case indipendenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Villino su due livelli, tetto e serramenti nuovi",
     "prezzo": 49000,
     "mq": 100,
     "url": "https://www.immobiliare.it/annunci/134643497/",
     "lat": 45.8723,
     "lng": 9.8204,
     "stato": "buono"
    },
    {
     "titolo": "Villetta a schiera con giardino e box doppio",
     "prezzo": 70000,
     "mq": 75,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2370005792231697747",
     "lat": 45.8784,
     "lng": 9.8095,
     "stato": "buono"
    },
    {
     "titolo": "Porzione di casa con ingresso indipendente, sottotetto e cantina",
     "prezzo": 68000,
     "mq": 75,
     "url": "https://www.immobiliare.it/annunci/121747290/",
     "lat": 45.8731,
     "lng": 9.8179,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-h",
  "titolo": "Appartamento di 100 m² su un piano con terrazzo panoramico",
  "url": "https://www.immobiliare.it/annunci/132018408/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Via dei Pini",
  "lat": 45.8794,
  "lng": 9.8065,
  "pos_indicativa": true,
  "prezzo": 89000,
  "mq": 100,
  "locali": 3,
  "bagni": 2,
  "piano": "1",
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "F",
  "foto": "https://cdn.caasa.it/s3/s/3f14/660f5a8c/0-1.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Tutto su un piano, due bagni",
    "Terrazzo panoramico e camino"
   ],
   "contro": [
    "Non arredato",
    "Prezzo complessivo alto per i ricavi del paese"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale con due bagni in residence con piscina",
     "prezzo": 70000,
     "mq": 100,
     "url": "https://www.immobiliare.it/annunci/123606715/",
     "lat": 45.8699,
     "lng": 9.8169,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale verso il Passo di Zambla, libero su tre lati",
     "prezzo": 39000,
     "mq": 80,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8220000781086767286",
     "lat": 45.8786,
     "lng": 9.8005,
     "stato": "da rinfrescare"
    },
    {
     "titolo": "Trilocale arredato con travi a vista (da privato)",
     "prezzo": 80000,
     "mq": 80,
     "url": "https://www.casadaprivato.it/appartamenti/trilocale-arredato-oneta-bg-bergamo-221319",
     "lat": 45.8758,
     "lng": 9.81,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano con terrazzo panoramico",
     "prezzo": 43000,
     "mq": 75,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8470000789208371747",
     "lat": 45.8758,
     "lng": 9.811,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale arredato con grande terrazzo",
     "prezzo": 53000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/134675479/",
     "lat": 45.8762,
     "lng": 9.807,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-i",
  "titolo": "Trilocale in Residenza Borgo Antico, finiture di montagna",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2960004780740522637",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.878,
  "lng": 9.805,
  "pos_indicativa": true,
  "prezzo": 135000,
  "mq": 70,
  "locali": 3,
  "bagni": 2,
  "piano": "—",
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://images.nestoria.com/v1/eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9kaV83MF9tX2luX3ZpYV9zYW50dWFyaW9fZGVsX2ZyYXNzaW5vXzFfMjk2MDAwNDc4MDc0MDQ3MzQwNi5qcGciLCJicmFuZCI6Im5lc3RvcmlhIiwiY291bnRyeSI6IklUIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODB9",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 120,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Finiture curate, pronto da abitare",
    "Due bagni: adatto a famiglie"
   ],
   "contro": [
    "Circa 1.930 €/m²: quasi il doppio della media del paese",
    "Ricavi del paese troppo bassi per ripagare questo prezzo"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Chalet in pietra e legno su due livelli, arredato",
     "prezzo": 137000,
     "mq": 75,
     "url": "https://www.immobiliare.it/annunci/131286868/",
     "lat": 45.8752,
     "lng": 9.8055,
     "stato": "ottimo"
    },
    {
     "titolo": "Bilocale in Borgo Alpino con giardino privato e portico",
     "prezzo": 87000,
     "mq": 45,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2340002779963069783",
     "lat": 45.8768,
     "lng": 9.806,
     "stato": "ottimo"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-j",
  "titolo": "Chalet in pietra e legno su due livelli, arredato",
  "url": "https://www.immobiliare.it/annunci/131286868/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8752,
  "lng": 9.8055,
  "pos_indicativa": true,
  "prezzo": 137000,
  "mq": 75,
  "locali": 3,
  "bagni": 2,
  "piano": "due livelli",
  "arredato": true,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": "E",
  "foto": "https://cdn.caasa.it/s3/s/3f14/65f76dcb/0-2.jpg",
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 500,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 120,
    "occ": 0.3,
    "mesi": [
     0.226,
     0.221,
     0.156,
     0.349,
     0.319,
     0.183,
     0.333,
     0.586,
     0.372,
     0.182,
     0.405,
     0.268
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Lo chalet è il tipo di casa che si affitta meglio in montagna",
    "Arredato, tre lati liberi, ingresso indipendente"
   ],
   "contro": [
    "Prezzo alto per la zona: rendimento basso anche con prezzi a notte più alti"
   ]
  },
  "note_mq": "su un altro portale 80 m²",
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale in Residenza Borgo Antico, finiture di montagna",
     "prezzo": 135000,
     "mq": 70,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2960004780740522637",
     "lat": 45.878,
     "lng": 9.805,
     "stato": "ottimo"
    },
    {
     "titolo": "Bilocale in Borgo Alpino con giardino privato e portico",
     "prezzo": 87000,
     "mq": 45,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2340002779963069783",
     "lat": 45.8768,
     "lng": 9.806,
     "stato": "ottimo"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-k",
  "titolo": "Bilocale in Borgo Alpino con giardino privato e portico",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2340002779963069783",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8768,
  "lng": 9.806,
  "pos_indicativa": true,
  "prezzo": 87000,
  "mq": 45,
  "locali": 2,
  "bagni": 1,
  "piano": "terra",
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://images.nestoria.com/v1/eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9kaV80NV9tX2luX3ZpYV9zYW50dWFyaW9fZGVsX2ZyYXNzaW5vXzQ2XzIzNDAwMDI3Nzk5NjMwMjA1NTIuanBnIiwiYnJhbmQiOiJuZXN0b3JpYSIsImNvdW50cnkiOiJJVCIsIndpZHRoIjo2NDAsImhlaWdodCI6NDgwfQ==",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 120,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Giardino privato e portico coperto",
    "Borgo in pietra molto fotogenico per gli annunci"
   ],
   "contro": [
    "Circa 1.930 €/m²",
    "Piccolo per il prezzo"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale in Residenza Borgo Antico, finiture di montagna",
     "prezzo": 135000,
     "mq": 70,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2960004780740522637",
     "lat": 45.878,
     "lng": 9.805,
     "stato": "ottimo"
    },
    {
     "titolo": "Chalet in pietra e legno su due livelli, arredato",
     "prezzo": 137000,
     "mq": 75,
     "url": "https://www.immobiliare.it/annunci/131286868/",
     "lat": 45.8752,
     "lng": 9.8055,
     "stato": "ottimo"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-l",
  "titolo": "Trilocale all'ultimo piano con terrazzo panoramico",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8470000789208371747",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8758,
  "lng": 9.811,
  "pos_indicativa": true,
  "prezzo": 43000,
  "mq": 75,
  "locali": 3,
  "bagni": 1,
  "piano": "ultimo",
  "arredato": false,
  "stato": "buono",
  "lavori": 2000,
  "classe_energetica": null,
  "foto": "https://images.nestoria.com/v1/eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9hX29uZXRhX2JnXzg0NzAwMDA3ODkyMDgzMjI1MTZpMy5qcGciLCJicmFuZCI6Im5lc3RvcmlhIiwiY291bnRyeSI6IklUIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODB9",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "573 €/m²: grande per il prezzo",
    "Ultimo piano di una piccola palazzina, terrazzo panoramico"
   ],
   "contro": [
    "Non risulta arredato",
    "Online da più di un mese"
   ],
   "sintesi": "Tanto spazio a poco prezzo; servono qualche ritocco e l'arredo."
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale arredato con grande terrazzo",
     "prezzo": 53000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/134675479/",
     "lat": 45.8762,
     "lng": 9.807,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale verso il Passo di Zambla, libero su tre lati",
     "prezzo": 39000,
     "mq": 80,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8220000781086767286",
     "lat": 45.8786,
     "lng": 9.8005,
     "stato": "da rinfrescare"
    },
    {
     "titolo": "Trilocale nuovo mai abitato con giardino privato",
     "prezzo": 65000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/113695957/",
     "lat": 45.8756,
     "lng": 9.809,
     "stato": "ottimo"
    },
    {
     "titolo": "Trilocale arredato con travi a vista (da privato)",
     "prezzo": 80000,
     "mq": 80,
     "url": "https://www.casadaprivato.it/appartamenti/trilocale-arredato-oneta-bg-bergamo-221319",
     "lat": 45.8758,
     "lng": 9.81,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale arredato con camino in pietra",
     "prezzo": 39000,
     "mq": 65,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
     "lat": 45.8786,
     "lng": 9.8035,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-m",
  "titolo": "Trilocale verso il Passo di Zambla, libero su tre lati",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8220000781086767286",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Verso Zambla",
  "lat": 45.8786,
  "lng": 9.8005,
  "pos_indicativa": true,
  "prezzo": 39000,
  "mq": 80,
  "locali": 3,
  "bagni": 1,
  "piano": "2",
  "arredato": false,
  "stato": "da rinfrescare",
  "lavori": 4000,
  "classe_energetica": null,
  "foto": "https://images.nestoria.com/v1/eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9hX29uZXRhX2JnXzgyMjAwMDA3ODEwODY3MTgwNTVpMy5qcGciLCJicmFuZCI6Im5lc3RvcmlhIiwiY291bnRyeSI6IklUIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODB9",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.22,
    "mesi": [
     0.166,
     0.162,
     0.114,
     0.256,
     0.234,
     0.134,
     0.244,
     0.43,
     0.272,
     0.133,
     0.297,
     0.196
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "487 €/m²: il più basso tra gli appartamenti",
    "Vicino ai sentieri del Passo di Zambla e del Monte Alben"
   ],
   "contro": [
    "Stato non descritto: ho previsto 4.000 € di lavori",
    "Non arredato"
   ],
   "sintesi": "Il più economico al metro, ma lo stato va visto di persona."
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale arredato con travi a vista (da privato)",
     "prezzo": 80000,
     "mq": 80,
     "url": "https://www.casadaprivato.it/appartamenti/trilocale-arredato-oneta-bg-bergamo-221319",
     "lat": 45.8758,
     "lng": 9.81,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano con terrazzo panoramico",
     "prezzo": 43000,
     "mq": 75,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8470000789208371747",
     "lat": 45.8758,
     "lng": 9.811,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale arredato con grande terrazzo",
     "prezzo": 53000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/134675479/",
     "lat": 45.8762,
     "lng": 9.807,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale nuovo mai abitato con giardino privato",
     "prezzo": 65000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/113695957/",
     "lat": 45.8756,
     "lng": 9.809,
     "stato": "ottimo"
    },
    {
     "titolo": "Bilocale arredato con camino in pietra",
     "prezzo": 39000,
     "mq": 65,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
     "lat": 45.8786,
     "lng": 9.8035,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-n",
  "titolo": "Trilocale con balcone, camino e cantina",
  "url": "https://www.immobiliare.it/annunci/134750813/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.879,
  "lng": 9.8055,
  "pos_indicativa": true,
  "prezzo": 58000,
  "mq": 60,
  "locali": 3,
  "bagni": 1,
  "piano": "2",
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "G",
  "foto": "https://cdn.caasa.it/s3/s/3f14/664279bf/0-1.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Camino e cantina",
    "Vicino al Passo di Zambla"
   ],
   "contro": [
    "Classe G",
    "Accesso con scala esterna",
    "Prezzo nella media senza essere arredato"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Monolocale su due livelli con soppalco e camino",
     "prezzo": 64000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/133100318/",
     "lat": 45.876,
     "lng": 9.8105,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale con terrazzo d'angolo e camino",
     "prezzo": 42000,
     "mq": 63,
     "url": "https://www.immobiliare.it/annunci/134579621/",
     "lat": 45.8758,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale arredato con camino in pietra",
     "prezzo": 39000,
     "mq": 65,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
     "lat": 45.8786,
     "lng": 9.8035,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano, bagno rifatto, arredato",
     "prezzo": 47000,
     "mq": 55,
     "url": "https://www.immobiliare.it/annunci/134056935/",
     "lat": 45.8778,
     "lng": 9.8065,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale arredato con grande terrazzo",
     "prezzo": 53000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/134675479/",
     "lat": 45.8762,
     "lng": 9.807,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-o",
  "titolo": "Trilocale con due bagni in residence con piscina",
  "url": "https://www.immobiliare.it/annunci/123606715/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Oneta",
  "lat": 45.8699,
  "lng": 9.8169,
  "pos_indicativa": true,
  "prezzo": 70000,
  "mq": 100,
  "locali": 3,
  "bagni": 2,
  "piano": "2",
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "G",
  "foto": "https://cdn.caasa.it/s3/s/3f14/663de4e7/0-1.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.3,
    "mesi": [
     0.226,
     0.221,
     0.156,
     0.349,
     0.319,
     0.183,
     0.333,
     0.586,
     0.372,
     0.182,
     0.405,
     0.268
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Piscina condominiale: rara in montagna e molto cercata d'estate",
    "Arredato, due bagni, costruzione recente"
   ],
   "contro": [
    "Classe G nonostante la costruzione recente",
    "La piscina alza le spese condominiali (da chiedere)"
   ]
  },
  "note_mq": "nel testo circa 85 m²",
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Appartamento di 100 m² su un piano con terrazzo panoramico",
     "prezzo": 89000,
     "mq": 100,
     "url": "https://www.immobiliare.it/annunci/132018408/",
     "lat": 45.8794,
     "lng": 9.8065,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale verso il Passo di Zambla, libero su tre lati",
     "prezzo": 39000,
     "mq": 80,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8220000781086767286",
     "lat": 45.8786,
     "lng": 9.8005,
     "stato": "da rinfrescare"
    },
    {
     "titolo": "Trilocale arredato con travi a vista (da privato)",
     "prezzo": 80000,
     "mq": 80,
     "url": "https://www.casadaprivato.it/appartamenti/trilocale-arredato-oneta-bg-bergamo-221319",
     "lat": 45.8758,
     "lng": 9.81,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano con terrazzo panoramico",
     "prezzo": 43000,
     "mq": 75,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8470000789208371747",
     "lat": 45.8758,
     "lng": 9.811,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale arredato con grande terrazzo",
     "prezzo": 53000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/134675479/",
     "lat": 45.8762,
     "lng": 9.807,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-p",
  "titolo": "Trilocale all'ultimo piano, bagno rifatto, arredato",
  "url": "https://www.immobiliare.it/annunci/134056935/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8778,
  "lng": 9.8065,
  "pos_indicativa": true,
  "prezzo": 47000,
  "mq": 55,
  "locali": 3,
  "bagni": 1,
  "piano": "ultimo (3°)",
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "G",
  "foto": "https://cdn.caasa.it/s3/s/3f14/66395a02/0-1.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.3,
    "mesi": [
     0.226,
     0.221,
     0.156,
     0.349,
     0.319,
     0.183,
     0.333,
     0.586,
     0.372,
     0.182,
     0.405,
     0.268
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Bagno già rifatto, arredato",
    "Due camere matrimoniali: 4-5 posti letto",
    "Camino e bella vista"
   ],
   "contro": [
    "Classe G",
    "Terzo piano: chiedere se c'è l'ascensore"
   ],
   "sintesi": "Pronto, arredato e con bagno nuovo: adatto a famiglie."
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale arredato con due balconi, ribassato",
     "prezzo": 35000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/115437493/",
     "lat": 45.8778,
     "lng": 9.8075,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale con balcone, camino e cantina",
     "prezzo": 58000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/134750813/",
     "lat": 45.879,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Trivano con balcone tra le pinete",
     "prezzo": 68000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/127593940/",
     "lat": 45.8782,
     "lng": 9.808,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale al piano terra in Residenza Borgo Antico",
     "prezzo": 55000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/122483132/",
     "lat": 45.878,
     "lng": 9.804,
     "stato": "buono"
    },
    {
     "titolo": "Monolocale su due livelli con soppalco e camino",
     "prezzo": 64000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/133100318/",
     "lat": 45.876,
     "lng": 9.8105,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-q",
  "titolo": "Porzione di casa con ingresso indipendente, sottotetto e cantina",
  "url": "https://www.immobiliare.it/annunci/121747290/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Oneta",
  "lat": 45.8731,
  "lng": 9.8179,
  "pos_indicativa": true,
  "prezzo": 68000,
  "mq": 75,
  "locali": 3,
  "bagni": 1,
  "piano": "indipendente",
  "arredato": false,
  "stato": "buono",
  "lavori": 2000,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/3f14/661f96e8/0-1.jpg",
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 500,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Ingresso indipendente, due balconi, sottotetto e cantina",
    "Prezzo già ribassato"
   ],
   "contro": [
    "Non arredato",
    "In vendita da molto tempo"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 848,
    "fonte": "zona R1 Oneta, case indipendenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Villetta a schiera con giardino e box doppio",
     "prezzo": 70000,
     "mq": 75,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2370005792231697747",
     "lat": 45.8784,
     "lng": 9.8095,
     "stato": "buono"
    },
    {
     "titolo": "Villino su due livelli, tetto e serramenti nuovi",
     "prezzo": 49000,
     "mq": 100,
     "url": "https://www.immobiliare.it/annunci/134643497/",
     "lat": 45.8723,
     "lng": 9.8204,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-r",
  "titolo": "Trilocale nuovo mai abitato con giardino privato",
  "url": "https://www.immobiliare.it/annunci/113695957/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8756,
  "lng": 9.809,
  "pos_indicativa": true,
  "prezzo": 65000,
  "mq": 70,
  "locali": 3,
  "bagni": 1,
  "piano": "terra",
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": "F",
  "foto": "https://cdn.caasa.it/s3/s/3f14/654da564/0-3.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Nuovo, mai abitato: niente lavori",
    "Giardino privato, camino, cantina, vista panoramica"
   ],
   "contro": [
    "Non arredato",
    "Online da molto tempo: margine di trattativa"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale arredato con grande terrazzo",
     "prezzo": 53000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/134675479/",
     "lat": 45.8762,
     "lng": 9.807,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale arredato con camino in pietra",
     "prezzo": 39000,
     "mq": 65,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
     "lat": 45.8786,
     "lng": 9.8035,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano con terrazzo panoramico",
     "prezzo": 43000,
     "mq": 75,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8470000789208371747",
     "lat": 45.8758,
     "lng": 9.811,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale con terrazzo d'angolo e camino",
     "prezzo": 42000,
     "mq": 63,
     "url": "https://www.immobiliare.it/annunci/134579621/",
     "lat": 45.8758,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale verso il Passo di Zambla, libero su tre lati",
     "prezzo": 39000,
     "mq": 80,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8220000781086767286",
     "lat": 45.8786,
     "lng": 9.8005,
     "stato": "da rinfrescare"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-s",
  "titolo": "Trivano con balcone tra le pinete",
  "url": "https://www.immobiliare.it/annunci/127593940/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8782,
  "lng": 9.808,
  "pos_indicativa": true,
  "prezzo": 68000,
  "mq": 50,
  "locali": 3,
  "bagni": 1,
  "piano": "—",
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/3f14/6582bebc/0-5.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Circa 870 m di quota, tra le pinete"
   ],
   "contro": [
    "1.360 €/m²: caro rispetto agli appartamenti simili",
    "Descrizione generica, pochi dettagli"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale arredato con due balconi, ribassato",
     "prezzo": 35000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/115437493/",
     "lat": 45.8778,
     "lng": 9.8075,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale al piano terra in Residenza Borgo Antico",
     "prezzo": 55000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/122483132/",
     "lat": 45.878,
     "lng": 9.804,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano, bagno rifatto, arredato",
     "prezzo": 47000,
     "mq": 55,
     "url": "https://www.immobiliare.it/annunci/134056935/",
     "lat": 45.8778,
     "lng": 9.8065,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale con balcone, camino e cantina",
     "prezzo": 58000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/134750813/",
     "lat": 45.879,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Monolocale su due livelli con soppalco e camino",
     "prezzo": 64000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/133100318/",
     "lat": 45.876,
     "lng": 9.8105,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-t",
  "titolo": "Bilocale al piano terra in Residenza Borgo Antico",
  "url": "https://www.immobiliare.it/annunci/122483132/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.878,
  "lng": 9.804,
  "pos_indicativa": true,
  "prezzo": 55000,
  "mq": 50,
  "locali": 2,
  "bagni": 1,
  "piano": "terra",
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "E",
  "foto": "https://cdn.caasa.it/s3/s/3f14/64b500f3/0-2.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 90,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 350,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Complesso curato in stile villa",
    "Vista sulla Valle Seriana"
   ],
   "contro": [
    "Non arredato",
    "Online da molto tempo"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale arredato con due balconi, ribassato",
     "prezzo": 35000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/115437493/",
     "lat": 45.8778,
     "lng": 9.8075,
     "stato": "buono"
    },
    {
     "titolo": "Trivano con balcone tra le pinete",
     "prezzo": 68000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/127593940/",
     "lat": 45.8782,
     "lng": 9.808,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano, bagno rifatto, arredato",
     "prezzo": 47000,
     "mq": 55,
     "url": "https://www.immobiliare.it/annunci/134056935/",
     "lat": 45.8778,
     "lng": 9.8065,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale con balcone, camino e cantina",
     "prezzo": 58000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/134750813/",
     "lat": 45.879,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Monolocale su due livelli con soppalco e camino",
     "prezzo": 64000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/133100318/",
     "lat": 45.876,
     "lng": 9.8105,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-u",
  "titolo": "Monolocale su due livelli con soppalco e camino",
  "url": "https://www.immobiliare.it/annunci/133100318/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.876,
  "lng": 9.8105,
  "pos_indicativa": true,
  "prezzo": 64000,
  "mq": 60,
  "locali": 1,
  "bagni": 1,
  "piano": "due livelli",
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "D",
  "foto": "https://cdn.caasa.it/s3/s/3f14/662704a8/0-2.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 75,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 280,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Classe D, tra le migliori della zona",
    "Pensato come casa vacanze"
   ],
   "contro": [
    "Un solo locale: meno posti letto separati",
    "Prezzo alto per un monolocale"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale con balcone, camino e cantina",
     "prezzo": 58000,
     "mq": 60,
     "url": "https://www.immobiliare.it/annunci/134750813/",
     "lat": 45.879,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale con terrazzo d'angolo e camino",
     "prezzo": 42000,
     "mq": 63,
     "url": "https://www.immobiliare.it/annunci/134579621/",
     "lat": 45.8758,
     "lng": 9.8055,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale arredato con camino in pietra",
     "prezzo": 39000,
     "mq": 65,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
     "lat": 45.8786,
     "lng": 9.8035,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano, bagno rifatto, arredato",
     "prezzo": 47000,
     "mq": 55,
     "url": "https://www.immobiliare.it/annunci/134056935/",
     "lat": 45.8778,
     "lng": 9.8065,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale arredato con grande terrazzo",
     "prezzo": 53000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/134675479/",
     "lat": 45.8762,
     "lng": 9.807,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-v",
  "titolo": "Villino su due livelli, tetto e serramenti nuovi",
  "url": "https://www.immobiliare.it/annunci/134643497/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Oneta paese",
  "lat": 45.8723,
  "lng": 9.8204,
  "pos_indicativa": true,
  "prezzo": 49000,
  "mq": 100,
  "locali": 3,
  "bagni": 1,
  "piano": "due livelli",
  "arredato": false,
  "stato": "buono",
  "lavori": 2000,
  "classe_energetica": "D",
  "foto": "https://cdn.caasa.it/s3/s/3f14/66416117/0-1.jpg",
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 500,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "490 €/m² con tetto e serramenti nuovi",
    "Classe D, terrazzo e cantina"
   ],
   "contro": [
    "Non arredato",
    "In paese, non nella zona turistica di Scullera"
   ],
   "sintesi": "Villino con tetto e serramenti nuovi, in paese."
  },
  "valutazione": {
   "omi": {
    "medio": 848,
    "fonte": "zona R1 Oneta, case indipendenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Villetta a schiera con giardino e box doppio",
     "prezzo": 70000,
     "mq": 75,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2370005792231697747",
     "lat": 45.8784,
     "lng": 9.8095,
     "stato": "buono"
    },
    {
     "titolo": "Porzione di casa con ingresso indipendente, sottotetto e cantina",
     "prezzo": 68000,
     "mq": 75,
     "url": "https://www.immobiliare.it/annunci/121747290/",
     "lat": 45.8731,
     "lng": 9.8179,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-w",
  "titolo": "Trilocale arredato con travi a vista (da privato)",
  "url": "https://www.casadaprivato.it/appartamenti/trilocale-arredato-oneta-bg-bergamo-221319",
  "fonte": "Casadaprivato.it",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8758,
  "lng": 9.81,
  "pos_indicativa": true,
  "prezzo": 80000,
  "mq": 80,
  "locali": 3,
  "bagni": 1,
  "piano": "1",
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/3f14/66435288/0-1.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 100,
    "occ": 0.3,
    "mesi": [
     0.226,
     0.221,
     0.156,
     0.349,
     0.319,
     0.183,
     0.333,
     0.586,
     0.372,
     0.182,
     0.405,
     0.268
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Venduto da privato: niente provvigione d'agenzia",
    "Arredato, travi a vista, camino, grande balcone"
   ],
   "contro": [
    "Prezzo sopra la media per la zona"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Trilocale verso il Passo di Zambla, libero su tre lati",
     "prezzo": 39000,
     "mq": 80,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8220000781086767286",
     "lat": 45.8786,
     "lng": 9.8005,
     "stato": "da rinfrescare"
    },
    {
     "titolo": "Trilocale all'ultimo piano con terrazzo panoramico",
     "prezzo": 43000,
     "mq": 75,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8470000789208371747",
     "lat": 45.8758,
     "lng": 9.811,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale arredato con grande terrazzo",
     "prezzo": 53000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/134675479/",
     "lat": 45.8762,
     "lng": 9.807,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale nuovo mai abitato con giardino privato",
     "prezzo": 65000,
     "mq": 70,
     "url": "https://www.immobiliare.it/annunci/113695957/",
     "lat": 45.8756,
     "lng": 9.809,
     "stato": "ottimo"
    },
    {
     "titolo": "Bilocale arredato con camino in pietra",
     "prezzo": 39000,
     "mq": 65,
     "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
     "lat": 45.8786,
     "lng": 9.8035,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "oneta-x",
  "titolo": "Bivano con ingresso indipendente e cortile privato",
  "url": "https://www.immobiliare.it/annunci/128957484/",
  "fonte": "Immobiliare.it / Idealista (via Caasa e Nestoria)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Oneta",
  "zona": "Scullera",
  "lat": 45.8774,
  "lng": 9.8105,
  "pos_indicativa": true,
  "prezzo": 46000,
  "mq": 35,
  "locali": 2,
  "bagni": 1,
  "piano": "terra",
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/3f14/65b3b422/0-8.jpg",
  "spese": {
   "condominio_mese": 35,
   "imu_anno": 300,
   "stima": true
  },
  "affitti": {
   "breve": {
    "adr": 90,
    "occ": 0.25,
    "mesi": [
     0.188,
     0.184,
     0.13,
     0.291,
     0.266,
     0.152,
     0.278,
     0.488,
     0.31,
     0.151,
     0.338,
     0.223
    ],
    "stima": true,
    "fonte": "Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."
   },
   "lungo": {
    "canone": 350,
    "stima": true,
    "fonte": "Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle"
   }
  },
  "giudizio": {
   "pro": [
    "Ingresso indipendente e cortile",
    "Adatto anche a chi ha difficoltà motorie",
    "Stufa a legna"
   ],
   "contro": [
    "1.314 €/m²: caro per la metratura",
    "Non arredato"
   ]
  },
  "valutazione": {
   "omi": {
    "medio": 1069,
    "fonte": "zona R1 Oneta, appartamenti (valore medio riportato da Caasa)"
   },
   "comparabili": [
    {
     "titolo": "Monolocale in via Alben, abitabile",
     "prezzo": 23000,
     "mq": 36,
     "url": "https://www.immobiliare.it/annunci/133240732/",
     "lat": 45.878,
     "lng": 9.808,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale arredato con due balconi, ribassato",
     "prezzo": 35000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/115437493/",
     "lat": 45.8778,
     "lng": 9.8075,
     "stato": "buono"
    },
    {
     "titolo": "Trivano con balcone tra le pinete",
     "prezzo": 68000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/127593940/",
     "lat": 45.8782,
     "lng": 9.808,
     "stato": "buono"
    },
    {
     "titolo": "Bilocale al piano terra in Residenza Borgo Antico",
     "prezzo": 55000,
     "mq": 50,
     "url": "https://www.immobiliare.it/annunci/122483132/",
     "lat": 45.878,
     "lng": 9.804,
     "stato": "buono"
    },
    {
     "titolo": "Trilocale all'ultimo piano, bagno rifatto, arredato",
     "prezzo": 47000,
     "mq": 55,
     "url": "https://www.immobiliare.it/annunci/134056935/",
     "lat": 45.8778,
     "lng": 9.8065,
     "stato": "buono"
    }
   ],
   "note": "Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa)."
  },
  "eventi": [
   "Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
   "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
   "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
   "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Oneta su Caasa (con valori OMI)",
    "url": "https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"
   },
   {
    "titolo": "Annunci di Oneta su Nestoria",
    "url": "https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"
   },
   {
    "titolo": "AirROI: affitti brevi a Oltre il Colle, mese per mese",
    "url": "https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"
   },
   {
    "titolo": "AirDNA: affitti brevi a Oltre il Colle",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Serina",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview"
   }
  ]
 },
 {
  "id": "castione-a",
  "titolo": "Monolocale sulle piste del Monte Pora con terrazzo",
  "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Monte Pora",
  "lat": 45.879,
  "lng": 10.092,
  "pos_indicativa": true,
  "prezzo": 43000,
  "mq": 38,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://imganuncios.mitula.net/appartamento_in_vendita_di_38_m_in_via_pian_del_termen_29_5910002779962841256.jpg",
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 85,
    "occ": 0.3,
    "mesi": [
     0.311,
     0.373,
     0.151,
     0.185,
     0.214,
     0.271,
     0.485,
     0.639,
     0.339,
     0.171,
     0.186,
     0.274
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Sulle piste da sci, vicino alla piazzetta del Monte Pora",
    "Terrazzo",
    "Prezzo d'ingresso basso per una località sciistica"
   ],
   "contro": [
    "Monolocale: adatto a coppie, non a famiglie",
    "Non risulta arredato"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 40 m²",
     "prezzo": 70000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 42 m²",
     "prezzo": 102000,
     "mq": 42
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 44 m²",
     "prezzo": 73000,
     "mq": 44
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 90000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-b",
  "titolo": "Monolocale direttamente sulle piste, Monte Pora",
  "url": "https://case.trovit.it/detail/trovit-IT-3230000776420380693",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Monte Pora",
  "lat": 45.878,
  "lng": 10.09,
  "pos_indicativa": true,
  "prezzo": 58000,
  "mq": 38,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://imganuncios.mitula.net/appartamento_in_vendita_a_castione_della_presolana_bg_3230000776420346459i2.jpg",
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 85,
    "occ": 0.3,
    "mesi": [
     0.311,
     0.373,
     0.151,
     0.185,
     0.214,
     0.271,
     0.485,
     0.639,
     0.339,
     0.171,
     0.186,
     0.274
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Sci ai piedi: la posizione che si affitta meglio d'inverno"
   ],
   "contro": [
    "Stessa metratura di altri monolocali a 43.000 €: caro"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 40 m²",
     "prezzo": 70000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 42 m²",
     "prezzo": 102000,
     "mq": 42
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 44 m²",
     "prezzo": 73000,
     "mq": 44
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 90000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-c",
  "titolo": "Monolocale nella pineta del Passo della Presolana",
  "url": "https://case.trovit.it/detail/trovit-IT-4690003754735988722",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Campelli - Passo della Presolana",
  "lat": 45.948,
  "lng": 10.08,
  "pos_indicativa": true,
  "prezzo": 58000,
  "mq": 50,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://imganuncios.mitula.net/appartamento_in_vendita_a_castione_della_presolana_bg_4690003754735954488i2.jpg",
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 90,
    "occ": 0.28,
    "mesi": [
     0.29,
     0.348,
     0.141,
     0.173,
     0.2,
     0.253,
     0.453,
     0.596,
     0.316,
     0.16,
     0.174,
     0.256
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Tra gli abeti, a pochi passi dalle piste del Passo",
    "50 m²: spazio per 3-4 persone"
   ],
   "contro": [
    "Lontano dai servizi del paese",
    "Non risulta arredato"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 90000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 110000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 89000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 55 m²",
     "prezzo": 88000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 75000,
     "mq": 45
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-d",
  "titolo": "Open space ristrutturato con terrazza panoramica",
  "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Colle Vareno - Monte Pora",
  "lat": 45.884,
  "lng": 10.08,
  "pos_indicativa": true,
  "prezzo": 55000,
  "mq": 50,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://imganuncios.mitula.net/appartamento_in_vendita_di_50_m_in_via_monte_pora_12_6260005793787039539.jpg",
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 95,
    "occ": 0.3,
    "mesi": [
     0.311,
     0.373,
     0.151,
     0.185,
     0.214,
     0.271,
     0.485,
     0.639,
     0.339,
     0.171,
     0.186,
     0.274
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Già ristrutturato: niente lavori",
    "Terrazza panoramica, pensato come casa vacanze",
    "Zona Monte Pora, vicino alle piste"
   ],
   "contro": [
    "Open space: un solo ambiente",
    "Da arredare"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "parametri": {},
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 90000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 110000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 89000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 55 m²",
     "prezzo": 88000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 75000,
     "mq": 45
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-e",
  "titolo": "Bilocale seminterrato in piazzetta al Monte Pora",
  "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Monte Pora",
  "lat": 45.877,
  "lng": 10.093,
  "pos_indicativa": true,
  "prezzo": 35000,
  "mq": 35,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://imganuncios.mitula.net/appartamento_in_vendita_di_35_m_in_via_malga_alta_2750005790244486994.jpg",
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 80,
    "occ": 0.27,
    "mesi": [
     0.28,
     0.335,
     0.136,
     0.167,
     0.193,
     0.244,
     0.437,
     0.575,
     0.305,
     0.154,
     0.168,
     0.247
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Il prezzo più basso della località",
    "Nel cuore del Monte Pora, zona piazzetta"
   ],
   "contro": [
    "Seminterrato: meno luce, rischio umidità da verificare",
    "Le foto contano molto negli affitti brevi"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 40 m²",
     "prezzo": 70000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 42 m²",
     "prezzo": 102000,
     "mq": 42
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 44 m²",
     "prezzo": 73000,
     "mq": 44
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 90000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-f",
  "titolo": "Trilocale con balcone panoramico, bagno da rifare",
  "url": "https://case.trovit.it/bilocale-castione-presolana/2",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Ronchi",
  "lat": 45.905,
  "lng": 10.028,
  "pos_indicativa": true,
  "prezzo": 58000,
  "mq": 50,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "da rinfrescare",
  "lavori": 5000,
  "classe_energetica": null,
  "foto": "https://imganuncios.mitula.net/appartamento_in_vendita_di_50_m_in_via_san_bernardo_23_3460002779962903157.jpg",
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 100,
    "occ": 0.26,
    "mesi": [
     0.27,
     0.323,
     0.131,
     0.161,
     0.185,
     0.235,
     0.42,
     0.554,
     0.294,
     0.148,
     0.161,
     0.238
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Soggiorno luminoso con balcone panoramico",
    "A due passi dal centro"
   ],
   "contro": [
    "Bagno da rifare: ho previsto 5.000 €",
    "Non arredato"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 90000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 110000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 89000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 55 m²",
     "prezzo": 88000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 75000,
     "mq": 45
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-g",
  "titolo": "Trilocale arredato a Lantana",
  "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Lantana",
  "lat": 45.89,
  "lng": 10.07,
  "pos_indicativa": true,
  "prezzo": 60000,
  "mq": 80,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://imganuncios.mitula.net/appartamento_in_vendita_di_80_m_in_via_predusolo_2030003779358211830.jpg",
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 480,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 115,
    "occ": 0.3,
    "mesi": [
     0.311,
     0.373,
     0.151,
     0.185,
     0.214,
     0.271,
     0.485,
     0.639,
     0.339,
     0.171,
     0.186,
     0.274
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Arredamento compreso nel prezzo",
    "80 m² a 750 €/m²: grande per la cifra",
    "Lantana è sulla strada del Monte Pora"
   ],
   "contro": [
    "Pochi dettagli nell'annuncio: stato da verificare"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "parametri": {},
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 80 m²",
     "prezzo": 110000,
     "mq": 80
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 80 m²",
     "prezzo": 77000,
     "mq": 80
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 81 m²",
     "prezzo": 190000,
     "mq": 81
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 75 m²",
     "prezzo": 110000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 75 m²",
     "prezzo": 148000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 85 m²",
     "prezzo": 139000,
     "mq": 85
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-h",
  "titolo": "Trilocale arredato con balcone e autorimessa",
  "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Agro",
  "lat": 45.903,
  "lng": 10.024,
  "pos_indicativa": true,
  "prezzo": 60000,
  "mq": 78,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://imganuncios.mitula.net/appartamento_in_vendita_di_78_m_in_via_agro_7_1180003779358079277.jpg",
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 470,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 110,
    "occ": 0.28,
    "mesi": [
     0.29,
     0.348,
     0.141,
     0.173,
     0.2,
     0.253,
     0.453,
     0.596,
     0.316,
     0.16,
     0.174,
     0.256
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Completamente arredato",
    "Autorimessa compresa: utile d'inverno",
    "Balcone"
   ],
   "contro": [
    "Nella stessa palazzina c'è un altro appartamento anni '70 da ristrutturare: verificare lo stato dello stabile"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "parametri": {},
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 80 m²",
     "prezzo": 110000,
     "mq": 80
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 80 m²",
     "prezzo": 77000,
     "mq": 80
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 75 m²",
     "prezzo": 110000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 75 m²",
     "prezzo": 148000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 81 m²",
     "prezzo": 190000,
     "mq": 81
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 75 m²",
     "prezzo": 139000,
     "mq": 75
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-i",
  "titolo": "Bilocale arredato con giardino, prezzo ribassato",
  "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Sorte",
  "lat": 45.902,
  "lng": 10.03,
  "pos_indicativa": true,
  "prezzo": 53000,
  "mq": 45,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://imganuncios.mitula.net/appartamento_in_vendita_di_45_m_in_via_sorte_7_6540004780740562832.jpg",
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 95,
    "occ": 0.3,
    "mesi": [
     0.311,
     0.373,
     0.151,
     0.185,
     0.214,
     0.271,
     0.485,
     0.639,
     0.339,
     0.171,
     0.186,
     0.274
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Arredato, con giardino, balcone, cantina e parcheggio",
    "Prezzo già ridotto del 10%"
   ],
   "contro": [
    "Bilocale: 4 posti letto al massimo"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "parametri": {},
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 44 m²",
     "prezzo": 73000,
     "mq": 44
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 42 m²",
     "prezzo": 102000,
     "mq": 42
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 90000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 110000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "pisogne-a",
  "titolo": "Casetta alpina con giardino recintato",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-6790003776075126931",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BS",
  "comune": "Pisogne",
  "zona": "Fraine",
  "lat": 45.796,
  "lng": 10.128,
  "pos_indicativa": true,
  "prezzo": 59900,
  "mq": 120,
  "locali": 4,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://images.nestoria.com/v1/eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9kaV8xMjBfbV9pbl92aWFfY2FudG9uZV82NzkwMDAzNzc2MDc1MDc3NzAwLmpwZyIsImJyYW5kIjoibmVzdG9yaWEiLCJjb3VudHJ5IjoiSVQiLCJ3aWR0aCI6NjQwLCJoZWlnaHQiOjQ4MH0=",
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 520,
    "stima": true,
    "fonte": "Stima: circa 5,5 €/m² al mese per le frazioni di montagna; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 110,
    "occ": 0.3,
    "mesi": [
     0.311,
     0.373,
     0.151,
     0.185,
     0.214,
     0.271,
     0.485,
     0.639,
     0.339,
     0.171,
     0.186,
     0.274
    ],
    "stima": true,
    "fonte": "AirDNA Pisogne (80 annunci): occupazione 46%, 159 $ a notte; AirROI: 34%, 171 $. Valori del paese sul lago: per le frazioni di montagna ho ridotto prezzo e occupazione. Stagionalità indicativa (profilo di montagna)."
   }
  },
  "giudizio": {
   "pro": [
    "120 m² con giardino recintato a 500 €/m²",
    "Mantenuta bene, subito disponibile",
    "Borgo a 600 m sopra il lago"
   ],
   "contro": [
    "Da arredare",
    "In frazione: serve l'auto"
   ]
  },
  "eventi": [
   "Lago d'Iseo a valle: le frazioni di montagna (Grignaghe, Fraine, Pontasio) hanno vista lago",
   "Piccola area sci della Val Palot (citata negli annunci)",
   "Affitti brevi in paese: 80 annunci attivi, mercato vivo d'estate",
   "Circa 1 ora e 30 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Pisogne",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/pisogne/overview"
   },
   {
    "titolo": "AirROI: affitti brevi a Pisogne",
    "url": "https://airroi.com/airbnb-data/italy/lombardy/pisogne"
   },
   {
    "titolo": "Annunci di Pisogne su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/pisogne"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Pisogne, 120 m²",
     "prezzo": 125000,
     "mq": 120
    },
    {
     "titolo": "Annuncio simile a Pisogne, 127 m²",
     "prezzo": 169000,
     "mq": 127
    },
    {
     "titolo": "Annuncio simile a Pisogne, 110 m²",
     "prezzo": 95000,
     "mq": 110
    },
    {
     "titolo": "Annuncio simile a Pisogne, 110 m²",
     "prezzo": 149000,
     "mq": 110
    },
    {
     "titolo": "Annuncio simile a Pisogne, 105 m²",
     "prezzo": 95000,
     "mq": 105
    },
    {
     "titolo": "Annuncio simile a Pisogne, 95 m²",
     "prezzo": 99000,
     "mq": 95
    }
   ],
   "note": "Comparabili: annunci in vendita a Pisogne con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "pisogne-b",
  "titolo": "Casetta terra-cielo con giardino, barbecue e gazebo",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2100003776075136459",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BS",
  "comune": "Pisogne",
  "zona": "Grignaghe",
  "lat": 45.826,
  "lng": 10.131,
  "pos_indicativa": true,
  "prezzo": 48000,
  "mq": 40,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://images.nestoria.com/v1/eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9kaV80MF9tX2luX3ZpYV9mb3J0b25hXzhfMjEwMDAwMzc3NjA3NTA4NzIyOC5qcGciLCJicmFuZCI6Im5lc3RvcmlhIiwiY291bnRyeSI6IklUIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODB9",
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 300,
    "stima": true,
    "fonte": "Stima: circa 5,5 €/m² al mese per le frazioni di montagna; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 85,
    "occ": 0.28,
    "mesi": [
     0.29,
     0.348,
     0.141,
     0.173,
     0.2,
     0.253,
     0.453,
     0.596,
     0.316,
     0.16,
     0.174,
     0.256
    ],
    "stima": true,
    "fonte": "AirDNA Pisogne (80 annunci): occupazione 46%, 159 $ a notte; AirROI: 34%, 171 $. Valori del paese sul lago: per le frazioni di montagna ho ridotto prezzo e occupazione. Stagionalità indicativa (profilo di montagna)."
   }
  },
  "giudizio": {
   "pro": [
    "Indipendente, con giardino attrezzato",
    "Grignaghe a circa 900 m con vista sul lago"
   ],
   "contro": [
    "Parcheggio a 200 metri",
    "Circa 30 minuti dal lago"
   ]
  },
  "eventi": [
   "Lago d'Iseo a valle: le frazioni di montagna (Grignaghe, Fraine, Pontasio) hanno vista lago",
   "Piccola area sci della Val Palot (citata negli annunci)",
   "Affitti brevi in paese: 80 annunci attivi, mercato vivo d'estate",
   "Circa 1 ora e 30 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Pisogne",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/pisogne/overview"
   },
   {
    "titolo": "AirROI: affitti brevi a Pisogne",
    "url": "https://airroi.com/airbnb-data/italy/lombardy/pisogne"
   },
   {
    "titolo": "Annunci di Pisogne su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/pisogne"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Pisogne, 60 m²",
     "prezzo": 73000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Pisogne, 87 m²",
     "prezzo": 185000,
     "mq": 87
    },
    {
     "titolo": "Annuncio simile a Pisogne, 90 m²",
     "prezzo": 75000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Pisogne, 90 m²",
     "prezzo": 93000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Pisogne, 95 m²",
     "prezzo": 99000,
     "mq": 95
    },
    {
     "titolo": "Annuncio simile a Pisogne, 105 m²",
     "prezzo": 95000,
     "mq": 105
    }
   ],
   "note": "Comparabili: annunci in vendita a Pisogne con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "pisogne-c",
  "titolo": "Casetta su due livelli vicino alle piste della Val Palot",
  "url": "https://case.trovit.it/detail/trovit-IT-1000005788516489874",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BS",
  "comune": "Pisogne",
  "zona": "Pontasio",
  "lat": 45.832,
  "lng": 10.12,
  "pos_indicativa": true,
  "prezzo": 35000,
  "mq": 40,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 2000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 300,
    "stima": true,
    "fonte": "Stima: circa 5,5 €/m² al mese per le frazioni di montagna; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 80,
    "occ": 0.26,
    "mesi": [
     0.27,
     0.323,
     0.131,
     0.161,
     0.185,
     0.235,
     0.42,
     0.554,
     0.294,
     0.148,
     0.161,
     0.238
    ],
    "stima": true,
    "fonte": "AirDNA Pisogne (80 annunci): occupazione 46%, 159 $ a notte; AirROI: 34%, 171 $. Valori del paese sul lago: per le frazioni di montagna ho ridotto prezzo e occupazione. Stagionalità indicativa (profilo di montagna)."
   }
  },
  "giudizio": {
   "pro": [
    "35.000 € per una casetta indipendente",
    "Vicino alla piccola area sci della Val Palot"
   ],
   "contro": [
    "Pochi dettagli e nessuna foto nell'annuncio",
    "Ho previsto 2.000 € di ritocchi"
   ]
  },
  "eventi": [
   "Lago d'Iseo a valle: le frazioni di montagna (Grignaghe, Fraine, Pontasio) hanno vista lago",
   "Piccola area sci della Val Palot (citata negli annunci)",
   "Affitti brevi in paese: 80 annunci attivi, mercato vivo d'estate",
   "Circa 1 ora e 30 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Pisogne",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/pisogne/overview"
   },
   {
    "titolo": "AirROI: affitti brevi a Pisogne",
    "url": "https://airroi.com/airbnb-data/italy/lombardy/pisogne"
   },
   {
    "titolo": "Annunci di Pisogne su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/pisogne"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Pisogne, 60 m²",
     "prezzo": 73000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Pisogne, 87 m²",
     "prezzo": 185000,
     "mq": 87
    },
    {
     "titolo": "Annuncio simile a Pisogne, 90 m²",
     "prezzo": 75000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Pisogne, 90 m²",
     "prezzo": 93000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Pisogne, 95 m²",
     "prezzo": 99000,
     "mq": 95
    },
    {
     "titolo": "Annuncio simile a Pisogne, 105 m²",
     "prezzo": 95000,
     "mq": 105
    }
   ],
   "note": "Comparabili: annunci in vendita a Pisogne con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "vercelli-a",
  "titolo": "Bilocale con cantina in via Marco Polo",
  "url": "https://www.immobiliare.it/annunci/134642003/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Via Marco Polo",
  "lat": 45.33,
  "lng": 8.418,
  "pos_indicativa": true,
  "prezzo": 42000,
  "mq": 47,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/66415228/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 350,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Buono stato, soggiorno con cucina a vista",
    "Prezzo d'ingresso basso per un capoluogo"
   ],
   "contro": [
    "Terzo piano senza ascensore"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 40 m²",
     "prezzo": 28000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Vercelli, 54 m²",
     "prezzo": 54900,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Vercelli, 60 m²",
     "prezzo": 63000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 75 m²",
     "prezzo": 60000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Vercelli, 77 m²",
     "prezzo": 59900,
     "mq": 77
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1055,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "vercelli-b",
  "titolo": "Trilocale ristrutturato nel 2020 con ascensore",
  "url": "https://www.immobiliare.it/annunci/134509927/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Via Bezzecca",
  "lat": 45.324,
  "lng": 8.426,
  "pos_indicativa": true,
  "prezzo": 60000,
  "mq": 75,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/663e9ff4/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 560,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Ristrutturato di recente, con ascensore",
    "Zona comoda ai servizi, vicino al centro"
   ],
   "contro": [
    "Al limite del budget di 60.000 €"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 77 m²",
     "prezzo": 59900,
     "mq": 77
    },
    {
     "titolo": "Annuncio simile a Vercelli, 80 m²",
     "prezzo": 59900,
     "mq": 80
    },
    {
     "titolo": "Annuncio simile a Vercelli, 90 m²",
     "prezzo": 89000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Vercelli, 60 m²",
     "prezzo": 63000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vercelli, 93 m²",
     "prezzo": 89000,
     "mq": 93
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1055,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "vercelli-c",
  "titolo": "Trilocale al 6° piano con ascensore, due camere",
  "url": "https://www.immobiliare.it/annunci/134717313/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Piazza Sardegna",
  "lat": 45.319,
  "lng": 8.41,
  "pos_indicativa": true,
  "prezzo": 59900,
  "mq": 80,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/664172ed/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 560,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Ristrutturato nel 2015, balcone e cantina",
    "Due camere: adatto a studenti o famiglie"
   ],
   "contro": [
    "Veranda condonata: controllare i documenti"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 77 m²",
     "prezzo": 59900,
     "mq": 77
    },
    {
     "titolo": "Annuncio simile a Vercelli, 75 m²",
     "prezzo": 60000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 90 m²",
     "prezzo": 89000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Vercelli, 93 m²",
     "prezzo": 89000,
     "mq": 93
    },
    {
     "titolo": "Annuncio simile a Vercelli, 95 m²",
     "prezzo": 87000,
     "mq": 95
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 975,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "vercelli-d",
  "titolo": "Bilocale al piano terra con giardino condominiale",
  "url": "https://www.portaleagenzieimmobiliari.it/32587564-vendita-vercelli-appartamento-bilocale-28000-euro-40-mq-riscaldamento-autonomo",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Cappuccini",
  "lat": 45.334,
  "lng": 8.436,
  "pos_indicativa": true,
  "prezzo": 28000,
  "mq": 40,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 2000,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/6640e148/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "28.000 €: il più economico",
    "Riscaldamento autonomo",
    "Proposto dall'agenzia come investimento"
   ],
   "contro": [
    "Piano terra",
    "Stato non descritto: ho previsto 2.000 € di ritocchi"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 47 m²",
     "prezzo": 42000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Vercelli, 54 m²",
     "prezzo": 54900,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Vercelli, 60 m²",
     "prezzo": 63000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 75 m²",
     "prezzo": 60000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Vercelli, 77 m²",
     "prezzo": 59900,
     "mq": 77
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 975,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "vercelli-e",
  "titolo": "Trilocale ristrutturato con riscaldamento autonomo",
  "url": "https://www.immobiliare.it/annunci/134861505/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Via Monviso",
  "lat": 45.316,
  "lng": 8.42,
  "pos_indicativa": true,
  "prezzo": 59900,
  "mq": 77,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/66432ac4/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 560,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Ristrutturato, spese condominiali basse",
    "Balcone e cantina"
   ],
   "contro": [
    "Zona periferica rispetto al centro"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 75 m²",
     "prezzo": 60000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Vercelli, 80 m²",
     "prezzo": 59900,
     "mq": 80
    },
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 90 m²",
     "prezzo": 89000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Vercelli, 93 m²",
     "prezzo": 89000,
     "mq": 93
    },
    {
     "titolo": "Annuncio simile a Vercelli, 60 m²",
     "prezzo": 63000,
     "mq": 60
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 975,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "vercelli-f",
  "titolo": "Bilocale con ascensore e box auto",
  "url": "https://www.immobiliare.it/annunci/134779905/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Porta Torino",
  "lat": 45.322,
  "lng": 8.408,
  "pos_indicativa": true,
  "prezzo": 54900,
  "mq": 54,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/6643177d/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Box auto compreso",
    "Palazzina piccola con ascensore"
   ],
   "contro": [
    "Riscaldamento a consumo: chiedere le spese"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 60 m²",
     "prezzo": 63000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vercelli, 47 m²",
     "prezzo": 42000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Vercelli, 40 m²",
     "prezzo": 28000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 75 m²",
     "prezzo": 60000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Vercelli, 77 m²",
     "prezzo": 59900,
     "mq": 77
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 975,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-a",
  "titolo": "Bilocale già affittato, rendita dichiarata del 10%",
  "url": "https://www.wikicasa.it/annuncio/27505333",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Borgo Rovereto",
  "lat": 44.916,
  "lng": 8.611,
  "pos_indicativa": true,
  "prezzo": 45000,
  "mq": 45,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 375,
    "stima": false,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m² (canone ricavato dalla rendita dichiarata nell'annuncio)"
   }
  },
  "giudizio": {
   "pro": [
    "Già affittato: incassa da subito",
    "Centrale, primo piano con ascensore, riscaldamento autonomo"
   ],
   "contro": [
    "Canone stimato dalla rendita dichiarata (circa 10%): chiedere il contratto"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 49000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 40 m²",
     "prezzo": 48000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1076,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-b",
  "titolo": "Bilocale già affittato vicino a piazza Genova",
  "url": "https://www.wikicasa.it/annuncio/27779362",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Piazza Genova",
  "lat": 44.906,
  "lng": 8.624,
  "pos_indicativa": true,
  "prezzo": 49000,
  "mq": 45,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "F",
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 408,
    "stima": false,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m² (canone ricavato dalla rendita dichiarata nell'annuncio)"
   }
  },
  "giudizio": {
   "pro": [
    "Già affittato, rendita dichiarata intorno al 10%"
   ],
   "contro": [
    "Classe energetica F",
    "Canone stimato dalla rendita dichiarata: chiedere il contratto"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 45000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 40 m²",
     "prezzo": 48000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1000,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-c",
  "titolo": "Bilocale di 55 m² in piazza Valfrè, ribassato",
  "url": "https://www.wikicasa.it/annuncio/15468072",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Piazza Valfrè",
  "lat": 44.91,
  "lng": 8.605,
  "pos_indicativa": true,
  "prezzo": 33000,
  "mq": 55,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "da rinfrescare",
  "lavori": 3000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 380,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Prezzo già ribassato da 35.000 €",
    "Servito da autobus, vicino alla stazione"
   ],
   "contro": [
    "Edificio anni '60: ho previsto 3.000 € di ritocchi"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 45000,
     "mq": 45
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1000,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-d",
  "titolo": "Bilocale con aria condizionata in via Parini",
  "url": "https://www.wikicasa.it/annuncio/30171712",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Via Parini",
  "lat": 44.903,
  "lng": 8.612,
  "pos_indicativa": true,
  "prezzo": 55000,
  "mq": 60,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 420,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Palazzina del 1983, aria condizionata"
   ],
   "contro": [
    "Prezzo al m² nella media: margine ridotto"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 65 m²",
     "prezzo": 35000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 66 m²",
     "prezzo": 52000,
     "mq": 66
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1000,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-e",
  "titolo": "Bilocale di 70 m² con cantina, quartiere Cristo",
  "url": "https://www.wikicasa.it/annuncio/26582014",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Cristo",
  "lat": 44.898,
  "lng": 8.618,
  "pos_indicativa": true,
  "prezzo": 37000,
  "mq": 70,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 1500,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "70 m² a 530 €/m²",
    "Riscaldamento autonomo e cantina"
   ],
   "contro": [
    "Quartiere periferico"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 66 m²",
     "prezzo": 52000,
     "mq": 66
    },
    {
     "titolo": "Annuncio simile a Alessandria, 65 m²",
     "prezzo": 35000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 972,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-f",
  "titolo": "Bilocale ristrutturato con riscaldamento autonomo, Cristo",
  "url": "https://www.wikicasa.it/annuncio/26321041",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Cristo",
  "lat": 44.8985,
  "lng": 8.6185,
  "pos_indicativa": true,
  "prezzo": 35000,
  "mq": 65,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Già ristrutturato",
    "Riscaldamento autonomo"
   ],
   "contro": [
    "Quartiere periferico",
    "Stesso stabile di un altro bilocale in vendita: concorrenza sull'affitto"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 66 m²",
     "prezzo": 52000,
     "mq": 66
    },
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Alessandria, 70 m²",
     "prezzo": 37000,
     "mq": 70
    },
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 972,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-g",
  "titolo": "Bilocale ristrutturato vicino alla stazione",
  "url": "https://www.wikicasa.it/annuncio/27990381",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Via Fernandel",
  "lat": 44.904,
  "lng": 8.607,
  "pos_indicativa": true,
  "prezzo": 52000,
  "mq": 66,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Ristrutturato, a 500 m dalla stazione"
   ],
   "contro": [
    "Riscaldamento centralizzato: spese da chiedere"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 65 m²",
     "prezzo": 35000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Alessandria, 70 m²",
     "prezzo": 37000,
     "mq": 70
    },
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1000,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-h",
  "titolo": "Bilocale ristrutturato in centro, zona Uffici Finanziari",
  "url": "https://www.wikicasa.it/annuncio/14803568",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Piazza Carducci",
  "lat": 44.912,
  "lng": 8.613,
  "pos_indicativa": true,
  "prezzo": 37000,
  "mq": 58,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 410,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Centralissimo, ristrutturato, con ascensore",
    "Ribassato da 42.000 €",
    "Condizionatore e cantina"
   ],
   "contro": [
    "Online da molto tempo: capire perché"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 65 m²",
     "prezzo": 35000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Alessandria, 66 m²",
     "prezzo": 52000,
     "mq": 66
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1076,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-i",
  "titolo": "Bilocale di 40 m² in corso Lamarmora",
  "url": "https://www.wikicasa.it/annuncio/27570121",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Corso Lamarmora",
  "lat": 44.909,
  "lng": 8.62,
  "pos_indicativa": true,
  "prezzo": 48000,
  "mq": 40,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 300,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Piccolo e facile da affittare"
   ],
   "contro": [
    "1.200 €/m²: tra i più cari del gruppo",
    "Pochi dettagli nell'annuncio"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 45000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 49000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1000,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-j",
  "titolo": "Bilocale al piano terra con box e giardino privato",
  "url": "https://www.wikicasa.it/annuncio/15503144",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Via Casalbagliano",
  "lat": 44.9,
  "lng": 8.598,
  "pos_indicativa": true,
  "prezzo": 60000,
  "mq": 50,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 350,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Giardino privato e box auto"
   ],
   "contro": [
    "Al limite del budget",
    "Zona periferica"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 45000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 49000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1000,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-k",
  "titolo": "Bilocale già affittato in stabile senza lavori deliberati",
  "url": "https://www.wikicasa.it/annuncio/28255158",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Via Carlo Marx",
  "lat": 44.893,
  "lng": 8.628,
  "pos_indicativa": true,
  "prezzo": 28500,
  "mq": 55,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 380,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "28.500 €, già affittato",
    "Stabile ordinato senza lavori straordinari deliberati"
   ],
   "contro": [
    "Canone non indicato: l'ho stimato",
    "Zona periferica"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 45000,
     "mq": 45
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1000,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "intelvi-a",
  "titolo": "Monolocale panoramico con balcone, ottime condizioni",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8450000794306034573",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "CO",
  "comune": "Alta Valle Intelvi",
  "zona": "Pellio Superiore",
  "lat": 45.984,
  "lng": 9.052,
  "pos_indicativa": true,
  "prezzo": 39000,
  "mq": 42,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (annunci di affitto in valle intorno ai 700 € per un duplex a Lanzo); nessun dato OMI"
   },
   "breve": {
    "adr": 85,
    "occ": 0.4,
    "mesi": [
     0.231,
     0.258,
     0.277,
     0.369,
     0.415,
     0.508,
     0.646,
     0.738,
     0.508,
     0.351,
     0.203,
     0.295
    ],
    "stima": true,
    "fonte": "AirDNA Pellio Intelvi: occupazione 54%, 173 $ a notte, 14,2 mila $ l'anno per annuncio; San Fedele Intelvi: 48%, 127 $. Prezzo a notte adattato a grandezza; stagionalità indicativa dei laghi (picco estivo)."
   }
  },
  "giudizio": {
   "pro": [
    "Ottime condizioni, posizione panoramica con balcone e cantina",
    "Proposto come casa vacanza o investimento",
    "Complesso di poche unità"
   ],
   "contro": [
    "Riscaldamento assente: da valutare per l'inverno",
    "Da arredare"
   ]
  },
  "eventi": [
   "Valle sopra il Lago di Como e il Lago di Lugano: lago a 10-20 minuti d'auto",
   "Golf Club di Lanzo e sentieri del Monte Generoso; confine svizzero vicinissimo",
   "Affitti brevi in forte crescita: a Pellio Intelvi ricavi +89% in un anno (AirDNA)",
   "Circa 1 ora e 15 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Pellio Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/pellio-intelvi/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a San Fedele Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/san-fedele-intelvi/revenue"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/pellio-superiore"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Immobiliare.it",
    "url": "https://www.immobiliare.it/vendita-appartamenti/alta-valle-intelvi/"
   }
  ],
  "parametri": {},
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 40 m²",
     "prezzo": 45000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 40 m²",
     "prezzo": 75000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 38 m²",
     "prezzo": 45000,
     "mq": 38
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 46 m²",
     "prezzo": 35000,
     "mq": 46
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 50 m²",
     "prezzo": 70000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Alta Valle Intelvi con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "intelvi-b",
  "titolo": "Monolocale con balcone vista e parco, complesso Il Tiglio",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-9100000779272186303",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "CO",
  "comune": "Alta Valle Intelvi",
  "zona": "Pellio Intelvi",
  "lat": 45.982,
  "lng": 9.049,
  "pos_indicativa": true,
  "prezzo": 45000,
  "mq": 40,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (annunci di affitto in valle intorno ai 700 € per un duplex a Lanzo); nessun dato OMI"
   },
   "breve": {
    "adr": 85,
    "occ": 0.4,
    "mesi": [
     0.231,
     0.258,
     0.277,
     0.369,
     0.415,
     0.508,
     0.646,
     0.738,
     0.508,
     0.351,
     0.203,
     0.295
    ],
    "stima": true,
    "fonte": "AirDNA Pellio Intelvi: occupazione 54%, 173 $ a notte, 14,2 mila $ l'anno per annuncio; San Fedele Intelvi: 48%, 127 $. Prezzo a notte adattato a grandezza; stagionalità indicativa dei laghi (picco estivo)."
   }
  },
  "giudizio": {
   "pro": [
    "Luminoso, balcone con vista",
    "Ampio parco condominiale"
   ],
   "contro": [
    "Da arredare"
   ]
  },
  "eventi": [
   "Valle sopra il Lago di Como e il Lago di Lugano: lago a 10-20 minuti d'auto",
   "Golf Club di Lanzo e sentieri del Monte Generoso; confine svizzero vicinissimo",
   "Affitti brevi in forte crescita: a Pellio Intelvi ricavi +89% in un anno (AirDNA)",
   "Circa 1 ora e 15 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Pellio Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/pellio-intelvi/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a San Fedele Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/san-fedele-intelvi/revenue"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/pellio-superiore"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Immobiliare.it",
    "url": "https://www.immobiliare.it/vendita-appartamenti/alta-valle-intelvi/"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 40 m²",
     "prezzo": 75000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 42 m²",
     "prezzo": 39000,
     "mq": 42
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 38 m²",
     "prezzo": 45000,
     "mq": 38
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 46 m²",
     "prezzo": 35000,
     "mq": 46
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 50 m²",
     "prezzo": 70000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Alta Valle Intelvi con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "intelvi-c",
  "titolo": "Trilocale al piano terra con ingresso indipendente, senza spese condominiali",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-5750003763637005364",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "CO",
  "comune": "Alta Valle Intelvi",
  "zona": "Pellio Superiore",
  "lat": 45.9845,
  "lng": 9.0525,
  "pos_indicativa": true,
  "prezzo": 45000,
  "mq": 38,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "da rinfrescare",
  "lavori": 4000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (annunci di affitto in valle intorno ai 700 € per un duplex a Lanzo); nessun dato OMI"
   },
   "breve": {
    "adr": 95,
    "occ": 0.38,
    "mesi": [
     0.219,
     0.246,
     0.263,
     0.351,
     0.395,
     0.482,
     0.614,
     0.702,
     0.482,
     0.333,
     0.193,
     0.281
    ],
    "stima": true,
    "fonte": "AirDNA Pellio Intelvi: occupazione 54%, 173 $ a notte, 14,2 mila $ l'anno per annuncio; San Fedele Intelvi: 48%, 127 $. Prezzo a notte adattato a grandezza; stagionalità indicativa dei laghi (picco estivo)."
   }
  },
  "giudizio": {
   "pro": [
    "Ingresso indipendente, nessuna spesa condominiale",
    "Due camere in 38 m²: più posti letto"
   ],
   "contro": [
    "Impianti da rivedere secondo l'annuncio: ho previsto 4.000 €"
   ]
  },
  "eventi": [
   "Valle sopra il Lago di Como e il Lago di Lugano: lago a 10-20 minuti d'auto",
   "Golf Club di Lanzo e sentieri del Monte Generoso; confine svizzero vicinissimo",
   "Affitti brevi in forte crescita: a Pellio Intelvi ricavi +89% in un anno (AirDNA)",
   "Circa 1 ora e 15 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Pellio Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/pellio-intelvi/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a San Fedele Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/san-fedele-intelvi/revenue"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/pellio-superiore"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Immobiliare.it",
    "url": "https://www.immobiliare.it/vendita-appartamenti/alta-valle-intelvi/"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 40 m²",
     "prezzo": 45000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 40 m²",
     "prezzo": 75000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 42 m²",
     "prezzo": 39000,
     "mq": 42
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 46 m²",
     "prezzo": 35000,
     "mq": 46
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 50 m²",
     "prezzo": 70000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Alta Valle Intelvi con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "intelvi-d",
  "titolo": "Appartamento con ingresso indipendente in quadrifamiliare",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8830005782814071106",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "CO",
  "comune": "Alta Valle Intelvi",
  "zona": "Pellio Superiore",
  "lat": 45.985,
  "lng": 9.054,
  "pos_indicativa": true,
  "prezzo": 35000,
  "mq": 46,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 2000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (annunci di affitto in valle intorno ai 700 € per un duplex a Lanzo); nessun dato OMI"
   },
   "breve": {
    "adr": 95,
    "occ": 0.38,
    "mesi": [
     0.219,
     0.246,
     0.263,
     0.351,
     0.395,
     0.482,
     0.614,
     0.702,
     0.482,
     0.333,
     0.193,
     0.281
    ],
    "stima": true,
    "fonte": "AirDNA Pellio Intelvi: occupazione 54%, 173 $ a notte, 14,2 mila $ l'anno per annuncio; San Fedele Intelvi: 48%, 127 $. Prezzo a notte adattato a grandezza; stagionalità indicativa dei laghi (picco estivo)."
   }
  },
  "giudizio": {
   "pro": [
    "35.000 € con ingresso indipendente",
    "Zona tranquilla vicino al lago"
   ],
   "contro": [
    "Stato non descritto: ho previsto 2.000 € di ritocchi"
   ]
  },
  "eventi": [
   "Valle sopra il Lago di Como e il Lago di Lugano: lago a 10-20 minuti d'auto",
   "Golf Club di Lanzo e sentieri del Monte Generoso; confine svizzero vicinissimo",
   "Affitti brevi in forte crescita: a Pellio Intelvi ricavi +89% in un anno (AirDNA)",
   "Circa 1 ora e 15 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Pellio Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/pellio-intelvi/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a San Fedele Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/san-fedele-intelvi/revenue"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/pellio-superiore"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Immobiliare.it",
    "url": "https://www.immobiliare.it/vendita-appartamenti/alta-valle-intelvi/"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 42 m²",
     "prezzo": 39000,
     "mq": 42
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 50 m²",
     "prezzo": 70000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 50 m²",
     "prezzo": 58000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 40 m²",
     "prezzo": 45000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 52 m²",
     "prezzo": 75000,
     "mq": 52
    }
   ],
   "note": "Comparabili: annunci in vendita a Alta Valle Intelvi con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "intelvi-e",
  "titolo": "Trilocale all'ultimo piano termoautonomo con giardino comune",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8320002766919552091",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "CO",
  "comune": "Alta Valle Intelvi",
  "zona": "Ramponio Verna",
  "lat": 45.997,
  "lng": 9.066,
  "pos_indicativa": true,
  "prezzo": 56000,
  "mq": 80,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": "E",
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 520,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (annunci di affitto in valle intorno ai 700 € per un duplex a Lanzo); nessun dato OMI"
   },
   "breve": {
    "adr": 110,
    "occ": 0.38,
    "mesi": [
     0.219,
     0.246,
     0.263,
     0.351,
     0.395,
     0.482,
     0.614,
     0.702,
     0.482,
     0.333,
     0.193,
     0.281
    ],
    "stima": true,
    "fonte": "AirDNA Pellio Intelvi: occupazione 54%, 173 $ a notte, 14,2 mila $ l'anno per annuncio; San Fedele Intelvi: 48%, 127 $. Prezzo a notte adattato a grandezza; stagionalità indicativa dei laghi (picco estivo)."
   }
  },
  "giudizio": {
   "pro": [
    "80 m² a 700 €/m²: adatto a famiglie",
    "Riscaldamento autonomo, box e cantina disponibili"
   ],
   "contro": [
    "Da arredare",
    "Ramponio è un po' più lontano dal lago"
   ]
  },
  "eventi": [
   "Valle sopra il Lago di Como e il Lago di Lugano: lago a 10-20 minuti d'auto",
   "Golf Club di Lanzo e sentieri del Monte Generoso; confine svizzero vicinissimo",
   "Affitti brevi in forte crescita: a Pellio Intelvi ricavi +89% in un anno (AirDNA)",
   "Circa 1 ora e 15 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Pellio Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/pellio-intelvi/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a San Fedele Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/san-fedele-intelvi/revenue"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/pellio-superiore"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Immobiliare.it",
    "url": "https://www.immobiliare.it/vendita-appartamenti/alta-valle-intelvi/"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 79 m²",
     "prezzo": 109000,
     "mq": 79
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 83 m²",
     "prezzo": 179000,
     "mq": 83
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 83 m²",
     "prezzo": 79000,
     "mq": 83
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 72 m²",
     "prezzo": 134000,
     "mq": 72
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 90 m²",
     "prezzo": 85000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 92 m²",
     "prezzo": 185000,
     "mq": 92
    }
   ],
   "note": "Comparabili: annunci in vendita a Alta Valle Intelvi con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "intelvi-f",
  "titolo": "Monolocale con ampio sottotetto e vista montagne",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8270002766919799029",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "CO",
  "comune": "Alta Valle Intelvi",
  "zona": "Lanzo d'Intelvi",
  "lat": 45.972,
  "lng": 9.021,
  "pos_indicativa": true,
  "prezzo": 57000,
  "mq": 57,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 370,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (annunci di affitto in valle intorno ai 700 € per un duplex a Lanzo); nessun dato OMI"
   },
   "breve": {
    "adr": 95,
    "occ": 0.4,
    "mesi": [
     0.231,
     0.258,
     0.277,
     0.369,
     0.415,
     0.508,
     0.646,
     0.738,
     0.508,
     0.351,
     0.203,
     0.295
    ],
    "stima": true,
    "fonte": "AirDNA Pellio Intelvi: occupazione 54%, 173 $ a notte, 14,2 mila $ l'anno per annuncio; San Fedele Intelvi: 48%, 127 $. Prezzo a notte adattato a grandezza; stagionalità indicativa dei laghi (picco estivo)."
   }
  },
  "giudizio": {
   "pro": [
    "Sottotetto ampio: spazio per più letti",
    "Due bagni, fermata del bus vicina",
    "Lanzo è il centro più vivo della valle"
   ],
   "contro": [
    "Stesso palazzo ha altri monolocali in vendita: concorrenza"
   ]
  },
  "eventi": [
   "Valle sopra il Lago di Como e il Lago di Lugano: lago a 10-20 minuti d'auto",
   "Golf Club di Lanzo e sentieri del Monte Generoso; confine svizzero vicinissimo",
   "Affitti brevi in forte crescita: a Pellio Intelvi ricavi +89% in un anno (AirDNA)",
   "Circa 1 ora e 15 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Pellio Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/pellio-intelvi/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a San Fedele Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/san-fedele-intelvi/revenue"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/pellio-superiore"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Immobiliare.it",
    "url": "https://www.immobiliare.it/vendita-appartamenti/alta-valle-intelvi/"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 57 m²",
     "prezzo": 128000,
     "mq": 57
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 55 m²",
     "prezzo": 113000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 61 m²",
     "prezzo": 38000,
     "mq": 61
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 52 m²",
     "prezzo": 75000,
     "mq": 52
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 50 m²",
     "prezzo": 70000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 50 m²",
     "prezzo": 58000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Alta Valle Intelvi con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "intelvi-g",
  "titolo": "Monolocale con angolo cottura e sottotetto utilizzabile",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-7290003775297530056",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "CO",
  "comune": "Alta Valle Intelvi",
  "zona": "Scaria",
  "lat": 45.988,
  "lng": 9.032,
  "pos_indicativa": true,
  "prezzo": 58000,
  "mq": 50,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (annunci di affitto in valle intorno ai 700 € per un duplex a Lanzo); nessun dato OMI"
   },
   "breve": {
    "adr": 90,
    "occ": 0.38,
    "mesi": [
     0.219,
     0.246,
     0.263,
     0.351,
     0.395,
     0.482,
     0.614,
     0.702,
     0.482,
     0.333,
     0.193,
     0.281
    ],
    "stima": true,
    "fonte": "AirDNA Pellio Intelvi: occupazione 54%, 173 $ a notte, 14,2 mila $ l'anno per annuncio; San Fedele Intelvi: 48%, 127 $. Prezzo a notte adattato a grandezza; stagionalità indicativa dei laghi (picco estivo)."
   }
  },
  "giudizio": {
   "pro": [
    "Sottotetto utilizzabile",
    "Complesso residenziale tranquillo"
   ],
   "contro": [
    "Prezzo al m² più alto degli altri monolocali della valle"
   ]
  },
  "eventi": [
   "Valle sopra il Lago di Como e il Lago di Lugano: lago a 10-20 minuti d'auto",
   "Golf Club di Lanzo e sentieri del Monte Generoso; confine svizzero vicinissimo",
   "Affitti brevi in forte crescita: a Pellio Intelvi ricavi +89% in un anno (AirDNA)",
   "Circa 1 ora e 15 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Pellio Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/pellio-intelvi/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a San Fedele Intelvi",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/san-fedele-intelvi/revenue"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/pellio-superiore"
   },
   {
    "titolo": "Annunci in Valle Intelvi su Immobiliare.it",
    "url": "https://www.immobiliare.it/vendita-appartamenti/alta-valle-intelvi/"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 50 m²",
     "prezzo": 70000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 52 m²",
     "prezzo": 75000,
     "mq": 52
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 46 m²",
     "prezzo": 35000,
     "mq": 46
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 55 m²",
     "prezzo": 113000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alta Valle Intelvi, 57 m²",
     "prezzo": 57000,
     "mq": 57
    }
   ],
   "note": "Comparabili: annunci in vendita a Alta Valle Intelvi con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "maccagno-a",
  "titolo": "Bilocale di montagna alla Forcora",
  "url": "https://www.nestoria.it/appartamenti/vendita/forcora",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Maccagno con Pino e Veddasca",
  "zona": "Forcora",
  "lat": 46.064,
  "lng": 8.794,
  "pos_indicativa": true,
  "prezzo": 26000,
  "mq": 29,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 280,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese in Val Veddasca; nessun dato OMI"
   },
   "breve": {
    "adr": 75,
    "occ": 0.3,
    "mesi": [
     0.173,
     0.194,
     0.208,
     0.277,
     0.312,
     0.381,
     0.485,
     0.554,
     0.381,
     0.263,
     0.152,
     0.222
    ],
    "stima": true,
    "fonte": "AirDNA Maccagno con Pino e Veddasca (222 annunci): occupazione 58%, 222 $ a notte; AirROI: 36,8%, 210 $. Valori del paese sul lago: per la valle ho ridotto molto prezzo e occupazione."
   }
  },
  "giudizio": {
   "pro": [
    "26.000 €: l'ingresso più basso di tutta l'app",
    "Camera finestrata separata, bagno con doccia",
    "Natura e vista lago"
   ],
   "contro": [
    "Località isolata: d'inverno pochi servizi",
    "Molto piccolo"
   ]
  },
  "eventi": [
   "Val Veddasca sopra il Lago Maggiore: lago e spiagge di Maccagno a 10-20 minuti",
   "Forcora: piccola località di montagna con sentieri e vista lago",
   "Mercato degli affitti brevi molto attivo in paese: 222 annunci (AirDNA)",
   "Circa 1 ora e 30 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Maccagno",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/maccagno-con-pino-e-veddasca/overview"
   },
   {
    "titolo": "AirROI: affitti brevi a Maccagno",
    "url": "https://airroi.com/airbnb-data/italy/lombardy/maccagno-con-pino-e-veddasca"
   },
   {
    "titolo": "Annunci di Maccagno su Trovit",
    "url": "https://case.trovit.it/maccagno"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 45 m²",
     "prezzo": 37000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 150 m²",
     "prezzo": 85000,
     "mq": 150
    },
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 150 m²",
     "prezzo": 130000,
     "mq": 150
    },
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 169 m²",
     "prezzo": 80000,
     "mq": 169
    },
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 218 m²",
     "prezzo": 95000,
     "mq": 218
    }
   ],
   "note": "Comparabili: annunci in vendita a Maccagno con Pino e Veddasca con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "maccagno-b",
  "titolo": "Rustico in sasso immerso nella natura",
  "url": "https://case.trovit.it/detail/trovit-IT-3470005792231754175",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Maccagno con Pino e Veddasca",
  "zona": "Lago d'Elio",
  "lat": 46.054,
  "lng": 8.775,
  "pos_indicativa": true,
  "prezzo": 37000,
  "mq": 45,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "da rinfrescare",
  "lavori": 8000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 280,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese in Val Veddasca; nessun dato OMI"
   },
   "breve": {
    "adr": 95,
    "occ": 0.32,
    "mesi": [
     0.185,
     0.207,
     0.222,
     0.295,
     0.332,
     0.406,
     0.517,
     0.591,
     0.406,
     0.281,
     0.162,
     0.236
    ],
    "stima": true,
    "fonte": "AirDNA Maccagno con Pino e Veddasca (222 annunci): occupazione 58%, 222 $ a notte; AirROI: 36,8%, 210 $. Valori del paese sul lago: per la valle ho ridotto molto prezzo e occupazione."
   }
  },
  "giudizio": {
   "pro": [
    "Rustico in pietra: molto richiesto da chi cerca natura",
    "Zona del Lago d'Elio, panoramica"
   ],
   "contro": [
    "Stato e abitabilità da verificare: ho previsto 8.000 € di lavori",
    "Probabilmente oltre i ritocchi leggeri"
   ]
  },
  "eventi": [
   "Val Veddasca sopra il Lago Maggiore: lago e spiagge di Maccagno a 10-20 minuti",
   "Forcora: piccola località di montagna con sentieri e vista lago",
   "Mercato degli affitti brevi molto attivo in paese: 222 annunci (AirDNA)",
   "Circa 1 ora e 30 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Maccagno",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/maccagno-con-pino-e-veddasca/overview"
   },
   {
    "titolo": "AirROI: affitti brevi a Maccagno",
    "url": "https://airroi.com/airbnb-data/italy/lombardy/maccagno-con-pino-e-veddasca"
   },
   {
    "titolo": "Annunci di Maccagno su Trovit",
    "url": "https://case.trovit.it/maccagno"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 29 m²",
     "prezzo": 26000,
     "mq": 29
    },
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 150 m²",
     "prezzo": 85000,
     "mq": 150
    },
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 150 m²",
     "prezzo": 130000,
     "mq": 150
    },
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 169 m²",
     "prezzo": 80000,
     "mq": 169
    },
    {
     "titolo": "Annuncio simile a Maccagno con Pino e Veddasca, 218 m²",
     "prezzo": 95000,
     "mq": 218
    }
   ],
   "note": "Comparabili: annunci in vendita a Maccagno con Pino e Veddasca con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "somma-a",
  "titolo": "Monolocale centrale ristrutturato in corte di 3 famiglie",
  "url": "https://case.trovit.it/detail/trovit-IT-8740005790676634465",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Somma Lombardo",
  "zona": "Centro",
  "lat": 45.684,
  "lng": 8.706,
  "pos_indicativa": true,
  "prezzo": 39000,
  "mq": 35,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 380,
    "stima": true,
    "fonte": "Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI"
   },
   "medio": {
    "canone": 490,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 30% sopra l'affitto lungo, 10 mesi occupati l'anno"
   },
   "breve": {
    "adr": 75,
    "occ": 0.5,
    "mesi": [
     0.432,
     0.432,
     0.483,
     0.508,
     0.534,
     0.534,
     0.559,
     0.508,
     0.534,
     0.508,
     0.483,
     0.483
    ],
    "stima": true,
    "fonte": "AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto)."
   }
  },
  "giudizio": {
   "pro": [
    "A 4 km da Malpensa, libero subito",
    "Corte di sole 3 famiglie: spese minime"
   ],
   "contro": [
    "Ristrutturato nel 2005: da rinfrescare per gli ospiti",
    "Monolocale piccolo"
   ]
  },
  "eventi": [
   "Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
   "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
   "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
   "Circa 45 minuti da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Somma Lombardo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Cardano al Campo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"
   },
   {
    "titolo": "Annunci di Somma Lombardo su Trovit",
    "url": "https://case.trovit.it/appartamento-somma-lombardo"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 48000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 59000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 34870,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 47 m²",
     "prezzo": 69000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 68000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 83000,
     "mq": 49
    }
   ],
   "note": "Comparabili: annunci in vendita a Somma Lombardo con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "somma-b",
  "titolo": "Monolocale con balcone in centro",
  "url": "https://case.trovit.it/detail/trovit-IT-5720005794393276443",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Somma Lombardo",
  "zona": "Centro",
  "lat": 45.685,
  "lng": 8.704,
  "pos_indicativa": true,
  "prezzo": 48000,
  "mq": 45,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 380,
    "stima": true,
    "fonte": "Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI"
   },
   "medio": {
    "canone": 490,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 30% sopra l'affitto lungo, 10 mesi occupati l'anno"
   },
   "breve": {
    "adr": 80,
    "occ": 0.5,
    "mesi": [
     0.432,
     0.432,
     0.483,
     0.508,
     0.534,
     0.534,
     0.559,
     0.508,
     0.534,
     0.508,
     0.483,
     0.483
    ],
    "stima": true,
    "fonte": "AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto)."
   }
  },
  "giudizio": {
   "pro": [
    "45 m² con balcone, in centro"
   ],
   "contro": [
    "Pochi dettagli nell'annuncio"
   ]
  },
  "eventi": [
   "Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
   "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
   "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
   "Circa 45 minuti da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Somma Lombardo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Cardano al Campo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"
   },
   {
    "titolo": "Annunci di Somma Lombardo su Trovit",
    "url": "https://case.trovit.it/appartamento-somma-lombardo"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 59000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 34870,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 47 m²",
     "prezzo": 69000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 68000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 83000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 52 m²",
     "prezzo": 55000,
     "mq": 52
    }
   ],
   "note": "Comparabili: annunci in vendita a Somma Lombardo con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "somma-c",
  "titolo": "Monolocale ristrutturato con giardino nel centro storico",
  "url": "https://case.trovit.it/detail/trovit-IT-5130005793182192651",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Somma Lombardo",
  "zona": "Centro storico",
  "lat": 45.6835,
  "lng": 8.7065,
  "pos_indicativa": true,
  "prezzo": 59000,
  "mq": 45,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 380,
    "stima": true,
    "fonte": "Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI"
   },
   "medio": {
    "canone": 490,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 30% sopra l'affitto lungo, 10 mesi occupati l'anno"
   },
   "breve": {
    "adr": 85,
    "occ": 0.52,
    "mesi": [
     0.449,
     0.449,
     0.502,
     0.529,
     0.555,
     0.555,
     0.582,
     0.529,
     0.555,
     0.529,
     0.502,
     0.502
    ],
    "stima": true,
    "fonte": "AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto)."
   }
  },
  "giudizio": {
   "pro": [
    "Ristrutturato, con giardino e spese minime",
    "Pronto per gli ospiti dell'aeroporto"
   ],
   "contro": [
    "Piano terra in cortile"
   ]
  },
  "eventi": [
   "Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
   "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
   "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
   "Circa 45 minuti da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Somma Lombardo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Cardano al Campo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"
   },
   {
    "titolo": "Annunci di Somma Lombardo su Trovit",
    "url": "https://case.trovit.it/appartamento-somma-lombardo"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 48000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 34870,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 47 m²",
     "prezzo": 69000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 68000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 83000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 52 m²",
     "prezzo": 55000,
     "mq": 52
    }
   ],
   "note": "Comparabili: annunci in vendita a Somma Lombardo con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "somma-d",
  "titolo": "Porzione di casa su due piani nel centro storico",
  "url": "https://case.trovit.it/detail/trovit-IT-2690000792837012207",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Somma Lombardo",
  "zona": "Centro storico",
  "lat": 45.6838,
  "lng": 8.7055,
  "pos_indicativa": true,
  "prezzo": 30000,
  "mq": 60,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "da rinfrescare",
  "lavori": 6000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 480,
    "stima": true,
    "fonte": "Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI"
   },
   "medio": {
    "canone": 620,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 30% sopra l'affitto lungo, 10 mesi occupati l'anno"
   },
   "breve": {
    "adr": 90,
    "occ": 0.5,
    "mesi": [
     0.432,
     0.432,
     0.483,
     0.508,
     0.534,
     0.534,
     0.559,
     0.508,
     0.534,
     0.508,
     0.483,
     0.483
    ],
    "stima": true,
    "fonte": "AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto)."
   }
  },
  "giudizio": {
   "pro": [
    "30.000 € per 60 m² indipendenti",
    "Nessuna spesa condominiale"
   ],
   "contro": [
    "Stato non descritto: ho previsto 6.000 € di lavori"
   ]
  },
  "eventi": [
   "Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
   "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
   "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
   "Circa 45 minuti da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Somma Lombardo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Cardano al Campo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"
   },
   {
    "titolo": "Annunci di Somma Lombardo su Trovit",
    "url": "https://case.trovit.it/appartamento-somma-lombardo"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Somma Lombardo, 60 m²",
     "prezzo": 98000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 52 m²",
     "prezzo": 55000,
     "mq": 52
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 68000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 83000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 47 m²",
     "prezzo": 69000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 48000,
     "mq": 45
    }
   ],
   "note": "Comparabili: annunci in vendita a Somma Lombardo con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "somma-e",
  "titolo": "Appartamento nuovo nella frazione di Coarezza",
  "url": "https://case.trovit.it/detail/trovit-IT-1740000794997066338",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Somma Lombardo",
  "zona": "Coarezza",
  "lat": 45.668,
  "lng": 8.7,
  "pos_indicativa": true,
  "prezzo": 34870,
  "mq": 45,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 380,
    "stima": true,
    "fonte": "Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI"
   },
   "medio": {
    "canone": 490,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 30% sopra l'affitto lungo, 10 mesi occupati l'anno"
   },
   "breve": {
    "adr": 85,
    "occ": 0.48,
    "mesi": [
     0.415,
     0.415,
     0.464,
     0.488,
     0.513,
     0.513,
     0.537,
     0.488,
     0.513,
     0.488,
     0.464,
     0.464
    ],
    "stima": true,
    "fonte": "AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto)."
   }
  },
  "giudizio": {
   "pro": [
    "Nuovo, molto richiesto sul portale",
    "Prezzo bassissimo per un nuovo"
   ],
   "contro": [
    "Coarezza è una frazione: serve l'auto"
   ]
  },
  "eventi": [
   "Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
   "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
   "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
   "Circa 45 minuti da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Somma Lombardo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Cardano al Campo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"
   },
   {
    "titolo": "Annunci di Somma Lombardo su Trovit",
    "url": "https://case.trovit.it/appartamento-somma-lombardo"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 48000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 59000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 47 m²",
     "prezzo": 69000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 68000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 83000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 52 m²",
     "prezzo": 55000,
     "mq": 52
    }
   ],
   "note": "Comparabili: annunci in vendita a Somma Lombardo con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "somma-f",
  "titolo": "Bilocale senza spese condominiali vicino al verde",
  "url": "https://case.trovit.it/detail/trovit-IT-7450000791454729178",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Somma Lombardo",
  "zona": "Coarezza",
  "lat": 45.669,
  "lng": 8.701,
  "pos_indicativa": true,
  "prezzo": 26000,
  "mq": 46,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 2000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 0,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 380,
    "stima": true,
    "fonte": "Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI"
   },
   "medio": {
    "canone": 490,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 30% sopra l'affitto lungo, 10 mesi occupati l'anno"
   },
   "breve": {
    "adr": 85,
    "occ": 0.48,
    "mesi": [
     0.415,
     0.415,
     0.464,
     0.488,
     0.513,
     0.513,
     0.537,
     0.488,
     0.513,
     0.488,
     0.464,
     0.464
    ],
    "stima": true,
    "fonte": "AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto)."
   }
  },
  "giudizio": {
   "pro": [
    "26.000 €, indipendente e senza spese"
   ],
   "contro": [
    "Stato non descritto: ho previsto 2.000 € di ritocchi"
   ]
  },
  "eventi": [
   "Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
   "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
   "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
   "Circa 45 minuti da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Somma Lombardo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Cardano al Campo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"
   },
   {
    "titolo": "Annunci di Somma Lombardo su Trovit",
    "url": "https://case.trovit.it/appartamento-somma-lombardo"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Somma Lombardo, 47 m²",
     "prezzo": 69000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 48000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 59000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 34870,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 68000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 83000,
     "mq": 49
    }
   ],
   "note": "Comparabili: annunci in vendita a Somma Lombardo con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "somma-g",
  "titolo": "Bilocale in zona residenziale",
  "url": "https://case.trovit.it/detail/trovit-IT-5540002741699481402",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Somma Lombardo",
  "zona": "Coarezza",
  "lat": 45.6695,
  "lng": 8.699,
  "pos_indicativa": true,
  "prezzo": 55000,
  "mq": 52,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 420,
    "stima": true,
    "fonte": "Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI"
   },
   "medio": {
    "canone": 550,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 30% sopra l'affitto lungo, 10 mesi occupati l'anno"
   },
   "breve": {
    "adr": 90,
    "occ": 0.48,
    "mesi": [
     0.415,
     0.415,
     0.464,
     0.488,
     0.513,
     0.513,
     0.537,
     0.488,
     0.513,
     0.488,
     0.464,
     0.464
    ],
    "stima": true,
    "fonte": "AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto)."
   }
  },
  "giudizio": {
   "pro": [
    "Bilocale vero, con camera separata"
   ],
   "contro": [
    "Pochi dettagli nell'annuncio"
   ]
  },
  "eventi": [
   "Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
   "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
   "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
   "Circa 45 minuti da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Somma Lombardo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Cardano al Campo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"
   },
   {
    "titolo": "Annunci di Somma Lombardo su Trovit",
    "url": "https://case.trovit.it/appartamento-somma-lombardo"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 68000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 83000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 47 m²",
     "prezzo": 69000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 48000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 59000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 34870,
     "mq": 45
    }
   ],
   "note": "Comparabili: annunci in vendita a Somma Lombardo con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "lonate-a",
  "titolo": "Quadrilocale all'ultimo piano in corte di tre famiglie",
  "url": "https://case.trovit.it/appartamento-lonate-pozzolo",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Lonate Pozzolo",
  "zona": "Sant'Antonino Ticino",
  "lat": 45.602,
  "lng": 8.734,
  "pos_indicativa": true,
  "prezzo": 47000,
  "mq": 95,
  "locali": 4,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "da rinfrescare",
  "lavori": 5000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 700,
    "stima": true,
    "fonte": "Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI"
   },
   "medio": {
    "canone": 910,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 30% sopra l'affitto lungo, 10 mesi occupati l'anno"
   },
   "breve": {
    "adr": 110,
    "occ": 0.45,
    "mesi": [
     0.389,
     0.389,
     0.435,
     0.458,
     0.481,
     0.481,
     0.503,
     0.458,
     0.481,
     0.458,
     0.435,
     0.435
    ],
    "stima": true,
    "fonte": "AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto)."
   }
  },
  "giudizio": {
   "pro": [
    "95 m² a 495 €/m², a pochi minuti da Malpensa",
    "Adatto a gruppi o a stanze per lavoratori"
   ],
   "contro": [
    "Ho previsto 5.000 € di ritocchi",
    "In corte: verificare il parcheggio"
   ]
  },
  "eventi": [
   "Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
   "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
   "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
   "Circa 45 minuti da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Somma Lombardo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Cardano al Campo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"
   },
   {
    "titolo": "Annunci di Somma Lombardo su Trovit",
    "url": "https://case.trovit.it/appartamento-somma-lombardo"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Somma Lombardo, 95 m²",
     "prezzo": 80000,
     "mq": 95
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 92 m²",
     "prezzo": 99000,
     "mq": 92
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 90 m²",
     "prezzo": 79000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 88 m²",
     "prezzo": 99000,
     "mq": 88
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 85 m²",
     "prezzo": 97000,
     "mq": 85
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 106 m²",
     "prezzo": 95000,
     "mq": 106
    }
   ],
   "note": "Comparabili: annunci in vendita a Somma Lombardo con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "vigevano-a",
  "titolo": "Trilocale al piano terra in zona tranquilla",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8500000791454678818",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Vigevano",
  "zona": "Via Ceresio",
  "lat": 45.322,
  "lng": 8.866,
  "pos_indicativa": true,
  "prezzo": 48000,
  "mq": 60,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://images.nestoria.com/v1/eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9hX3ZpZ2V2YW5vX3B2Xzg1MDAwMDA3OTE0NTQ2Mjk1ODdpMy5qcGciLCJicmFuZCI6Im5lc3RvcmlhIiwiY291bnRyeSI6IklUIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODB9",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 540,
    "stima": true,
    "fonte": "Bilocali in affitto a Vigevano tra 600 e 700 € al mese, arredati (Wikicasa, Nestoria, Mioaffitto). Usato circa 9 €/m² non arredato"
   },
   "medio": {
    "canone": 680,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Due camere: adatto anche a stanze per personale ospedaliero"
   ],
   "contro": [
    "Piano terra"
   ]
  },
  "eventi": [
   "Ospedale Civile di Vigevano: richieste di affitto da personale sanitario e familiari (annunci 'adiacente ospedale')",
   "Affitti transitori arredati richiesti da professionisti in trasferta (fino a 1.000 € al mese con utenze)",
   "Piazza Ducale e centro storico attraggono anche turismo di giornata",
   "25 minuti da Badile, 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "Affitti di bilocali a Vigevano (Nestoria)",
    "url": "https://www.nestoria.it/appartamenti/affitto/via-verdi_vigevano"
   },
   {
    "titolo": "Annunci di Vigevano su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/via-ceresio_vigevano"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vigevano, 60 m²",
     "prezzo": 69000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vigevano, 57 m²",
     "prezzo": 80000,
     "mq": 57
    },
    {
     "titolo": "Annuncio simile a Vigevano, 64 m²",
     "prezzo": 75000,
     "mq": 64
    },
    {
     "titolo": "Annuncio simile a Vigevano, 68 m²",
     "prezzo": 72000,
     "mq": 68
    },
    {
     "titolo": "Annuncio simile a Vigevano, 72 m²",
     "prezzo": 109000,
     "mq": 72
    },
    {
     "titolo": "Annuncio simile a Vigevano, 75 m²",
     "prezzo": 109000,
     "mq": 75
    }
   ],
   "note": "Comparabili: annunci in vendita a Vigevano con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "vigevano-b",
  "titolo": "Bilocale con terrazzo in via Pompei",
  "url": "https://www.nestoria.it/appartamenti/vendita/via-valeggio_vigevano?page=6",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Vigevano",
  "zona": "Via Pompei",
  "lat": 45.313,
  "lng": 8.853,
  "pos_indicativa": true,
  "prezzo": 55000,
  "mq": 50,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Bilocali in affitto a Vigevano tra 600 e 700 € al mese, arredati (Wikicasa, Nestoria, Mioaffitto). Usato circa 9 €/m² non arredato"
   },
   "medio": {
    "canone": 560,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Terrazzo"
   ],
   "contro": [
    "Pochi dettagli nell'annuncio"
   ]
  },
  "eventi": [
   "Ospedale Civile di Vigevano: richieste di affitto da personale sanitario e familiari (annunci 'adiacente ospedale')",
   "Affitti transitori arredati richiesti da professionisti in trasferta (fino a 1.000 € al mese con utenze)",
   "Piazza Ducale e centro storico attraggono anche turismo di giornata",
   "25 minuti da Badile, 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "Affitti di bilocali a Vigevano (Nestoria)",
    "url": "https://www.nestoria.it/appartamenti/affitto/via-verdi_vigevano"
   },
   {
    "titolo": "Annunci di Vigevano su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/via-ceresio_vigevano"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vigevano, 57 m²",
     "prezzo": 80000,
     "mq": 57
    },
    {
     "titolo": "Annuncio simile a Vigevano, 60 m²",
     "prezzo": 69000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vigevano, 64 m²",
     "prezzo": 75000,
     "mq": 64
    },
    {
     "titolo": "Annuncio simile a Vigevano, 68 m²",
     "prezzo": 72000,
     "mq": 68
    },
    {
     "titolo": "Annuncio simile a Vigevano, 72 m²",
     "prezzo": 109000,
     "mq": 72
    },
    {
     "titolo": "Annuncio simile a Vigevano, 75 m²",
     "prezzo": 109000,
     "mq": 75
    }
   ],
   "note": "Comparabili: annunci in vendita a Vigevano con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "vigevano-c",
  "titolo": "Trilocale di 67 m² a 877 €/m²",
  "url": "https://www.nestoria.it/appartamenti/vendita/viale-della-liberta_vigevano",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Vigevano",
  "zona": "Vigevano",
  "lat": 45.318,
  "lng": 8.85,
  "pos_indicativa": true,
  "prezzo": 58800,
  "mq": 67,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 600,
    "stima": true,
    "fonte": "Bilocali in affitto a Vigevano tra 600 e 700 € al mese, arredati (Wikicasa, Nestoria, Mioaffitto). Usato circa 9 €/m² non arredato"
   },
   "medio": {
    "canone": 750,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Prezzo al m² tra i più bassi della città"
   ],
   "contro": [
    "Indirizzo non indicato nell'annuncio"
   ]
  },
  "eventi": [
   "Ospedale Civile di Vigevano: richieste di affitto da personale sanitario e familiari (annunci 'adiacente ospedale')",
   "Affitti transitori arredati richiesti da professionisti in trasferta (fino a 1.000 € al mese con utenze)",
   "Piazza Ducale e centro storico attraggono anche turismo di giornata",
   "25 minuti da Badile, 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "Affitti di bilocali a Vigevano (Nestoria)",
    "url": "https://www.nestoria.it/appartamenti/affitto/via-verdi_vigevano"
   },
   {
    "titolo": "Annunci di Vigevano su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/via-ceresio_vigevano"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vigevano, 68 m²",
     "prezzo": 72000,
     "mq": 68
    },
    {
     "titolo": "Annuncio simile a Vigevano, 64 m²",
     "prezzo": 75000,
     "mq": 64
    },
    {
     "titolo": "Annuncio simile a Vigevano, 72 m²",
     "prezzo": 109000,
     "mq": 72
    },
    {
     "titolo": "Annuncio simile a Vigevano, 60 m²",
     "prezzo": 69000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vigevano, 75 m²",
     "prezzo": 109000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Vigevano, 75 m²",
     "prezzo": 73000,
     "mq": 75
    }
   ],
   "note": "Comparabili: annunci in vendita a Vigevano con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "vigevano-d",
  "titolo": "Bilocale abitabile con riscaldamento autonomo",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8020005793354953323",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Vigevano",
  "zona": "Corso Pavia",
  "lat": 45.311,
  "lng": 8.866,
  "pos_indicativa": true,
  "prezzo": 60000,
  "mq": 60,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 540,
    "stima": true,
    "fonte": "Bilocali in affitto a Vigevano tra 600 e 700 € al mese, arredati (Wikicasa, Nestoria, Mioaffitto). Usato circa 9 €/m² non arredato"
   },
   "medio": {
    "canone": 680,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Già abitabile, riscaldamento autonomo"
   ],
   "contro": [
    "Primo piano senza ascensore"
   ]
  },
  "eventi": [
   "Ospedale Civile di Vigevano: richieste di affitto da personale sanitario e familiari (annunci 'adiacente ospedale')",
   "Affitti transitori arredati richiesti da professionisti in trasferta (fino a 1.000 € al mese con utenze)",
   "Piazza Ducale e centro storico attraggono anche turismo di giornata",
   "25 minuti da Badile, 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "Affitti di bilocali a Vigevano (Nestoria)",
    "url": "https://www.nestoria.it/appartamenti/affitto/via-verdi_vigevano"
   },
   {
    "titolo": "Annunci di Vigevano su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/via-ceresio_vigevano"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vigevano, 60 m²",
     "prezzo": 69000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vigevano, 57 m²",
     "prezzo": 80000,
     "mq": 57
    },
    {
     "titolo": "Annuncio simile a Vigevano, 64 m²",
     "prezzo": 75000,
     "mq": 64
    },
    {
     "titolo": "Annuncio simile a Vigevano, 68 m²",
     "prezzo": 72000,
     "mq": 68
    },
    {
     "titolo": "Annuncio simile a Vigevano, 72 m²",
     "prezzo": 109000,
     "mq": 72
    },
    {
     "titolo": "Annuncio simile a Vigevano, 75 m²",
     "prezzo": 109000,
     "mq": 75
    }
   ],
   "note": "Comparabili: annunci in vendita a Vigevano con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "vigevano-e",
  "titolo": "Bilocale con doppi vetri e bagno finestrato",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8910005792231891663",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Vigevano",
  "zona": "Via Giusti",
  "lat": 45.319,
  "lng": 8.861,
  "pos_indicativa": true,
  "prezzo": 49000,
  "mq": 42,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 420,
    "stima": true,
    "fonte": "Bilocali in affitto a Vigevano tra 600 e 700 € al mese, arredati (Wikicasa, Nestoria, Mioaffitto). Usato circa 9 €/m² non arredato"
   },
   "medio": {
    "canone": 520,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Piccolo e facile da affittare",
    "Infissi con doppi vetri"
   ],
   "contro": [
    "Secondo piano"
   ]
  },
  "eventi": [
   "Ospedale Civile di Vigevano: richieste di affitto da personale sanitario e familiari (annunci 'adiacente ospedale')",
   "Affitti transitori arredati richiesti da professionisti in trasferta (fino a 1.000 € al mese con utenze)",
   "Piazza Ducale e centro storico attraggono anche turismo di giornata",
   "25 minuti da Badile, 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "Affitti di bilocali a Vigevano (Nestoria)",
    "url": "https://www.nestoria.it/appartamenti/affitto/via-verdi_vigevano"
   },
   {
    "titolo": "Annunci di Vigevano su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/via-ceresio_vigevano"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vigevano, 57 m²",
     "prezzo": 80000,
     "mq": 57
    },
    {
     "titolo": "Annuncio simile a Vigevano, 60 m²",
     "prezzo": 69000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vigevano, 64 m²",
     "prezzo": 75000,
     "mq": 64
    },
    {
     "titolo": "Annuncio simile a Vigevano, 68 m²",
     "prezzo": 72000,
     "mq": 68
    },
    {
     "titolo": "Annuncio simile a Vigevano, 72 m²",
     "prezzo": 109000,
     "mq": 72
    },
    {
     "titolo": "Annuncio simile a Vigevano, 75 m²",
     "prezzo": 109000,
     "mq": 75
    }
   ],
   "note": "Comparabili: annunci in vendita a Vigevano con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "vigevano-f",
  "titolo": "Bilocale con box auto vicino al centro",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-2250005783591827673",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Vigevano",
  "zona": "Via Risorgimento",
  "lat": 45.316,
  "lng": 8.857,
  "pos_indicativa": true,
  "prezzo": 48000,
  "mq": 52,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 470,
    "stima": true,
    "fonte": "Bilocali in affitto a Vigevano tra 600 e 700 € al mese, arredati (Wikicasa, Nestoria, Mioaffitto). Usato circa 9 €/m² non arredato"
   },
   "medio": {
    "canone": 590,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Box auto compreso",
    "Vicino al centro"
   ],
   "contro": [
    "Primo piano senza ascensore"
   ]
  },
  "eventi": [
   "Ospedale Civile di Vigevano: richieste di affitto da personale sanitario e familiari (annunci 'adiacente ospedale')",
   "Affitti transitori arredati richiesti da professionisti in trasferta (fino a 1.000 € al mese con utenze)",
   "Piazza Ducale e centro storico attraggono anche turismo di giornata",
   "25 minuti da Badile, 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "Affitti di bilocali a Vigevano (Nestoria)",
    "url": "https://www.nestoria.it/appartamenti/affitto/via-verdi_vigevano"
   },
   {
    "titolo": "Annunci di Vigevano su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/via-ceresio_vigevano"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vigevano, 57 m²",
     "prezzo": 80000,
     "mq": 57
    },
    {
     "titolo": "Annuncio simile a Vigevano, 60 m²",
     "prezzo": 69000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vigevano, 64 m²",
     "prezzo": 75000,
     "mq": 64
    },
    {
     "titolo": "Annuncio simile a Vigevano, 68 m²",
     "prezzo": 72000,
     "mq": 68
    },
    {
     "titolo": "Annuncio simile a Vigevano, 72 m²",
     "prezzo": 109000,
     "mq": 72
    },
    {
     "titolo": "Annuncio simile a Vigevano, 75 m²",
     "prezzo": 109000,
     "mq": 75
    }
   ],
   "note": "Comparabili: annunci in vendita a Vigevano con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "vigevano-g",
  "titolo": "Bilocale con cantina e posto auto, buone condizioni",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-6640005785838262914",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Vigevano",
  "zona": "Strada San Marco",
  "lat": 45.306,
  "lng": 8.87,
  "pos_indicativa": true,
  "prezzo": 45000,
  "mq": 57,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 510,
    "stima": true,
    "fonte": "Bilocali in affitto a Vigevano tra 600 e 700 € al mese, arredati (Wikicasa, Nestoria, Mioaffitto). Usato circa 9 €/m² non arredato"
   },
   "medio": {
    "canone": 640,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Posto auto e cantina",
    "Buone condizioni"
   ],
   "contro": [
    "Zona periferica, piano terra"
   ]
  },
  "eventi": [
   "Ospedale Civile di Vigevano: richieste di affitto da personale sanitario e familiari (annunci 'adiacente ospedale')",
   "Affitti transitori arredati richiesti da professionisti in trasferta (fino a 1.000 € al mese con utenze)",
   "Piazza Ducale e centro storico attraggono anche turismo di giornata",
   "25 minuti da Badile, 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "Affitti di bilocali a Vigevano (Nestoria)",
    "url": "https://www.nestoria.it/appartamenti/affitto/via-verdi_vigevano"
   },
   {
    "titolo": "Annunci di Vigevano su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/via-ceresio_vigevano"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vigevano, 57 m²",
     "prezzo": 80000,
     "mq": 57
    },
    {
     "titolo": "Annuncio simile a Vigevano, 60 m²",
     "prezzo": 69000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vigevano, 64 m²",
     "prezzo": 75000,
     "mq": 64
    },
    {
     "titolo": "Annuncio simile a Vigevano, 68 m²",
     "prezzo": 72000,
     "mq": 68
    },
    {
     "titolo": "Annuncio simile a Vigevano, 72 m²",
     "prezzo": 109000,
     "mq": 72
    },
    {
     "titolo": "Annuncio simile a Vigevano, 75 m²",
     "prezzo": 109000,
     "mq": 75
    }
   ],
   "note": "Comparabili: annunci in vendita a Vigevano con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "novara-a",
  "titolo": "Bilocale ristrutturato vicino alla facoltà di Farmacia",
  "url": "https://www.wikicasa.it/annuncio/24911668",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "NO",
  "comune": "Novara",
  "zona": "Novara Est",
  "lat": 45.449,
  "lng": 8.64,
  "pos_indicativa": true,
  "prezzo": 62000,
  "mq": 46,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 69,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 430,
    "stima": true,
    "fonte": "RealAdvisor Novara: affitto medio 111 €/m² l'anno (circa 9,25 €/m² al mese); bilocali tra 455 e 682 €"
   },
   "medio": {
    "canone": 540,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Ristrutturato, ideale per studenti",
    "Spese condominiali basse (69 €)"
   ],
   "contro": [
    "Leggermente sopra i 60.000 €"
   ]
  },
  "eventi": [
   "Ospedale Maggiore della Carità e Università del Piemonte Orientale: studenti, specializzandi e personale sanitario",
   "Stazione con treni frequenti per Milano (circa 35 minuti)",
   "Posti letto per studenti in centro a oltre 300 € al mese più spese",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "RealAdvisor: mercato e affitti a Novara",
    "url": "https://realadvisor.it/it/mercato-immobiliare/28100-novara/corso-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Novara, 48 m²",
     "prezzo": 67000,
     "mq": 48
    },
    {
     "titolo": "Annuncio simile a Novara, 50 m²",
     "prezzo": 50000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Novara, 57 m²",
     "prezzo": 89000,
     "mq": 57
    },
    {
     "titolo": "Annuncio simile a Novara, 60 m²",
     "prezzo": 87000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Novara, 61 m²",
     "prezzo": 85000,
     "mq": 61
    },
    {
     "titolo": "Annuncio simile a Novara, 61 m²",
     "prezzo": 80000,
     "mq": 61
    }
   ],
   "note": "Comparabili: annunci in vendita a Novara con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "novara-b",
  "titolo": "Bilocale al piano terra proposto come investimento",
  "url": "https://www.wikicasa.it/annuncio/15193921",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "NO",
  "comune": "Novara",
  "zona": "Semicentro",
  "lat": 45.441,
  "lng": 8.617,
  "pos_indicativa": true,
  "prezzo": 50000,
  "mq": 50,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 167,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 460,
    "stima": true,
    "fonte": "RealAdvisor Novara: affitto medio 111 €/m² l'anno (circa 9,25 €/m² al mese); bilocali tra 455 e 682 €"
   },
   "medio": {
    "canone": 580,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Semicentro, vicino alle stazioni"
   ],
   "contro": [
    "Stabile da ristrutturare: rischio spese straordinarie",
    "Spese condominiali alte (167 €)"
   ]
  },
  "eventi": [
   "Ospedale Maggiore della Carità e Università del Piemonte Orientale: studenti, specializzandi e personale sanitario",
   "Stazione con treni frequenti per Milano (circa 35 minuti)",
   "Posti letto per studenti in centro a oltre 300 € al mese più spese",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "RealAdvisor: mercato e affitti a Novara",
    "url": "https://realadvisor.it/it/mercato-immobiliare/28100-novara/corso-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Novara, 48 m²",
     "prezzo": 67000,
     "mq": 48
    },
    {
     "titolo": "Annuncio simile a Novara, 46 m²",
     "prezzo": 62000,
     "mq": 46
    },
    {
     "titolo": "Annuncio simile a Novara, 57 m²",
     "prezzo": 89000,
     "mq": 57
    },
    {
     "titolo": "Annuncio simile a Novara, 60 m²",
     "prezzo": 87000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Novara, 61 m²",
     "prezzo": 85000,
     "mq": 61
    },
    {
     "titolo": "Annuncio simile a Novara, 61 m²",
     "prezzo": 80000,
     "mq": 61
    }
   ],
   "note": "Comparabili: annunci in vendita a Novara con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "novara-c",
  "titolo": "Bilocale già arredato e affittato vicino alla stazione",
  "url": "https://www.wikicasa.it/annuncio/26882512",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "NO",
  "comune": "Novara",
  "zona": "Corso della Vittoria",
  "lat": 45.444,
  "lng": 8.615,
  "pos_indicativa": true,
  "prezzo": 67000,
  "mq": 48,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 440,
    "stima": true,
    "fonte": "RealAdvisor Novara: affitto medio 111 €/m² l'anno (circa 9,25 €/m² al mese); bilocali tra 455 e 682 €"
   },
   "medio": {
    "canone": 550,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Già arredato e affittato: incassa da subito",
    "Palazzo con ascensore vicino al centro"
   ],
   "contro": [
    "Sopra il budget di 60.000 €",
    "Canone attuale da verificare"
   ]
  },
  "eventi": [
   "Ospedale Maggiore della Carità e Università del Piemonte Orientale: studenti, specializzandi e personale sanitario",
   "Stazione con treni frequenti per Milano (circa 35 minuti)",
   "Posti letto per studenti in centro a oltre 300 € al mese più spese",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "RealAdvisor: mercato e affitti a Novara",
    "url": "https://realadvisor.it/it/mercato-immobiliare/28100-novara/corso-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Novara, 46 m²",
     "prezzo": 62000,
     "mq": 46
    },
    {
     "titolo": "Annuncio simile a Novara, 50 m²",
     "prezzo": 50000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Novara, 57 m²",
     "prezzo": 89000,
     "mq": 57
    },
    {
     "titolo": "Annuncio simile a Novara, 60 m²",
     "prezzo": 87000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Novara, 61 m²",
     "prezzo": 85000,
     "mq": 61
    },
    {
     "titolo": "Annuncio simile a Novara, 61 m²",
     "prezzo": 80000,
     "mq": 61
    }
   ],
   "note": "Comparabili: annunci in vendita a Novara con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "novara-d",
  "titolo": "Bilocale di 70 m² su corso Vercelli",
  "url": "https://www.wikicasa.it/annuncio/18060688",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "NO",
  "comune": "Novara",
  "zona": "Corso Vercelli",
  "lat": 45.452,
  "lng": 8.605,
  "pos_indicativa": true,
  "prezzo": 69000,
  "mq": 70,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 108,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 560,
    "stima": true,
    "fonte": "RealAdvisor Novara: affitto medio 111 €/m² l'anno (circa 9,25 €/m² al mese); bilocali tra 455 e 682 €"
   },
   "medio": {
    "canone": 700,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "70 m² a meno di 1.000 €/m²"
   ],
   "contro": [
    "Terzo piano senza ascensore",
    "Sopra il budget di 60.000 €"
   ]
  },
  "eventi": [
   "Ospedale Maggiore della Carità e Università del Piemonte Orientale: studenti, specializzandi e personale sanitario",
   "Stazione con treni frequenti per Milano (circa 35 minuti)",
   "Posti letto per studenti in centro a oltre 300 € al mese più spese",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "RealAdvisor: mercato e affitti a Novara",
    "url": "https://realadvisor.it/it/mercato-immobiliare/28100-novara/corso-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Novara, 70 m²",
     "prezzo": 80000,
     "mq": 70
    },
    {
     "titolo": "Annuncio simile a Novara, 70 m²",
     "prezzo": 80000,
     "mq": 70
    },
    {
     "titolo": "Annuncio simile a Novara, 69 m²",
     "prezzo": 77000,
     "mq": 69
    },
    {
     "titolo": "Annuncio simile a Novara, 73 m²",
     "prezzo": 79000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Novara, 65 m²",
     "prezzo": 69000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Novara, 61 m²",
     "prezzo": 85000,
     "mq": 61
    }
   ],
   "note": "Comparabili: annunci in vendita a Novara con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-a",
  "titolo": "Bilocale all'ultimo piano con terrazzo vicino al Duomo",
  "url": "https://www.immobiliare.it/annunci/106646055/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Cernaia",
  "lat": 44.993,
  "lng": 9.012,
  "pos_indicativa": true,
  "prezzo": 55000,
  "mq": 71,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 560,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Terrazzo e balcone, libero subito",
    "Vicino al Duomo"
   ],
   "contro": [
    "Quinto piano: verificare l'ascensore"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 70 m²",
     "prezzo": 54000,
     "mq": 70
    },
    {
     "titolo": "Annuncio simile a Voghera, 77 m²",
     "prezzo": 69000,
     "mq": 77
    },
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 60000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 65000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Voghera, 80 m²",
     "prezzo": 60000,
     "mq": 80
    },
    {
     "titolo": "Annuncio simile a Voghera, 81 m²",
     "prezzo": 68000,
     "mq": 81
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-b",
  "titolo": "Bilocale arredato con ampia terrazza vicino alla stazione",
  "url": "https://www.immobiliare.it/annunci/127748780/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Scarabelli",
  "lat": 44.995,
  "lng": 9.005,
  "pos_indicativa": true,
  "prezzo": 63000,
  "mq": 51,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 410,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Ottimo stato, arredato, ascensore",
    "A pochi passi dalla stazione"
   ],
   "contro": [
    "Leggermente sopra i 60.000 €"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 54 m²",
     "prezzo": 50000,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Voghera, 56 m²",
     "prezzo": 59000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Voghera, 60 m²",
     "prezzo": 89000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Voghera, 61 m²",
     "prezzo": 59000,
     "mq": 61
    },
    {
     "titolo": "Annuncio simile a Voghera, 41 m²",
     "prezzo": 48000,
     "mq": 41
    },
    {
     "titolo": "Annuncio simile a Voghera, 40 m²",
     "prezzo": 38000,
     "mq": 40
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-c",
  "titolo": "Bilocale da personalizzare in via Lucania",
  "url": "https://www.casa.it/immobili/55121163/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Rondò Carducci",
  "lat": 44.988,
  "lng": 9.016,
  "pos_indicativa": true,
  "prezzo": 35000,
  "mq": 36,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "da rinfrescare",
  "lavori": 4000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 410,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "35.000 €: ingresso molto basso"
   ],
   "contro": [
    "Da personalizzare: ho previsto 4.000 €"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 40 m²",
     "prezzo": 38000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Voghera, 41 m²",
     "prezzo": 48000,
     "mq": 41
    },
    {
     "titolo": "Annuncio simile a Voghera, 51 m²",
     "prezzo": 63000,
     "mq": 51
    },
    {
     "titolo": "Annuncio simile a Voghera, 54 m²",
     "prezzo": 50000,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Voghera, 56 m²",
     "prezzo": 59000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Voghera, 60 m²",
     "prezzo": 89000,
     "mq": 60
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-d",
  "titolo": "Trilocale di 110 m² con riscaldamento autonomo",
  "url": "https://www.nestoria.it/appartamenti/vendita/voghera",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Voghera",
  "lat": 44.99,
  "lng": 9.0,
  "pos_indicativa": true,
  "prezzo": 59000,
  "mq": 110,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 520,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 650,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "110 m² a 536 €/m²",
    "Adatto a stanze per lavoratori o studenti"
   ],
   "contro": [
    "Pochi dettagli nell'annuncio"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 110 m²",
     "prezzo": 120000,
     "mq": 110
    },
    {
     "titolo": "Annuncio simile a Voghera, 114 m²",
     "prezzo": 68000,
     "mq": 114
    },
    {
     "titolo": "Annuncio simile a Voghera, 98 m²",
     "prezzo": 65000,
     "mq": 98
    },
    {
     "titolo": "Annuncio simile a Voghera, 96 m²",
     "prezzo": 59000,
     "mq": 96
    },
    {
     "titolo": "Annuncio simile a Voghera, 95 m²",
     "prezzo": 99000,
     "mq": 95
    },
    {
     "titolo": "Annuncio simile a Voghera, 93 m²",
     "prezzo": 109000,
     "mq": 93
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-j",
  "titolo": "Monolocale luminoso vicino al centro",
  "url": "https://case.trovit.it/castione-presolana/5",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Castione",
  "lat": 45.907,
  "lng": 10.036,
  "pos_indicativa": true,
  "prezzo": 39000,
  "mq": 41,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 85,
    "occ": 0.27,
    "mesi": [
     0.28,
     0.335,
     0.136,
     0.167,
     0.193,
     0.244,
     0.437,
     0.575,
     0.305,
     0.154,
     0.168,
     0.247
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Luminoso, 41 m²"
   ],
   "contro": [
    "Da arredare"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 42 m²",
     "prezzo": 102000,
     "mq": 42
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 40 m²",
     "prezzo": 70000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 44 m²",
     "prezzo": 73000,
     "mq": 44
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 90000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-k",
  "titolo": "Bilocale in via dei Mille",
  "url": "https://case.trovit.it/appartamento-castione-presolana",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Castione",
  "lat": 45.9065,
  "lng": 10.034,
  "pos_indicativa": true,
  "prezzo": 42000,
  "mq": 46,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 95,
    "occ": 0.27,
    "mesi": [
     0.28,
     0.335,
     0.136,
     0.167,
     0.193,
     0.244,
     0.437,
     0.575,
     0.305,
     0.154,
     0.168,
     0.247
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Bilocale a 913 €/m² in centro"
   ],
   "contro": [
    "Pochi dettagli nell'annuncio"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 44 m²",
     "prezzo": 73000,
     "mq": 44
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 90000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 42 m²",
     "prezzo": 102000,
     "mq": 42
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 110000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "castione-l",
  "titolo": "Monolocale in via Privata dei Mille",
  "url": "https://case.trovit.it/castione-presolana/2",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "BG",
  "comune": "Castione della Presolana",
  "zona": "Castione",
  "lat": 45.9068,
  "lng": 10.0345,
  "pos_indicativa": true,
  "prezzo": 39000,
  "mq": 38,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato"
   },
   "breve": {
    "adr": 85,
    "occ": 0.27,
    "mesi": [
     0.28,
     0.335,
     0.136,
     0.167,
     0.193,
     0.244,
     0.437,
     0.575,
     0.305,
     0.154,
     0.168,
     0.247
    ],
    "stima": true,
    "fonte": "AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza."
   }
  },
  "giudizio": {
   "pro": [
    "Molto richiesto sul portale"
   ],
   "contro": [
    "Piccolo"
   ]
  },
  "eventi": [
   "Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
   "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
   "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
   "Circa 1 ora e 45 da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirROI: affitti brevi a Castione della Presolana",
    "url": "https://airroi.com/report/world/italy/lombardy/castione-della-presolana"
   },
   {
    "titolo": "Annunci vicino alle piste (Mitula)",
    "url": "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"
   },
   {
    "titolo": "Annunci di Castione su Trovit",
    "url": "https://case.trovit.it/castione-presolana/6"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Castione della Presolana, 40 m²",
     "prezzo": 70000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 42 m²",
     "prezzo": 102000,
     "mq": 42
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 44 m²",
     "prezzo": 73000,
     "mq": 44
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 80000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 45 m²",
     "prezzo": 75000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Castione della Presolana, 50 m²",
     "prezzo": 90000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Castione della Presolana con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-e",
  "titolo": "Trilocale con ascensore, due camere, balcone e cantina",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-8180003781863653890",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Dentici",
  "lat": 44.9882,
  "lng": 9.0026,
  "pos_indicativa": true,
  "prezzo": 59000,
  "mq": 96,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 520,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 650,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "96 m² a 615 €/m²",
    "Due camere: adatto a famiglie o a stanze"
   ],
   "contro": [
    "Primo piano: chiedere lo stato degli impianti"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 95 m²",
     "prezzo": 99000,
     "mq": 95
    },
    {
     "titolo": "Annuncio simile a Voghera, 98 m²",
     "prezzo": 65000,
     "mq": 98
    },
    {
     "titolo": "Annuncio simile a Voghera, 93 m²",
     "prezzo": 109000,
     "mq": 93
    },
    {
     "titolo": "Annuncio simile a Voghera, 90 m²",
     "prezzo": 58000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Voghera, 85 m²",
     "prezzo": 55000,
     "mq": 85
    },
    {
     "titolo": "Annuncio simile a Voghera, 110 m²",
     "prezzo": 120000,
     "mq": 110
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-f",
  "titolo": "Trilocale al terzo piano con ascensore",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-7790003782209310768",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Amendola",
  "lat": 44.9966,
  "lng": 9.0106,
  "pos_indicativa": true,
  "prezzo": 60000,
  "mq": 80,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 520,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 650,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Buono stato, ascensore"
   ],
   "contro": [
    "Palazzo del 1968"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 81 m²",
     "prezzo": 68000,
     "mq": 81
    },
    {
     "titolo": "Annuncio simile a Voghera, 77 m²",
     "prezzo": 69000,
     "mq": 77
    },
    {
     "titolo": "Annuncio simile a Voghera, 85 m²",
     "prezzo": 55000,
     "mq": 85
    },
    {
     "titolo": "Annuncio simile a Voghera, 71 m²",
     "prezzo": 55000,
     "mq": 71
    },
    {
     "titolo": "Annuncio simile a Voghera, 90 m²",
     "prezzo": 58000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Voghera, 70 m²",
     "prezzo": 54000,
     "mq": 70
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-g",
  "titolo": "Quadrilocale arredato, abitabile subito",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-7370002791627061219",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Viale Repubblica",
  "lat": 44.9942,
  "lng": 9.0042,
  "pos_indicativa": true,
  "prezzo": 58000,
  "mq": 90,
  "locali": 4,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 520,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 650,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Arredato e ben tenuto: affittabile subito",
    "Piano alto, luminoso, cantina e balcone"
   ],
   "contro": [
    "Grande per un singolo inquilino: valutare affitto a stanze"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 93 m²",
     "prezzo": 109000,
     "mq": 93
    },
    {
     "titolo": "Annuncio simile a Voghera, 95 m²",
     "prezzo": 99000,
     "mq": 95
    },
    {
     "titolo": "Annuncio simile a Voghera, 85 m²",
     "prezzo": 55000,
     "mq": 85
    },
    {
     "titolo": "Annuncio simile a Voghera, 96 m²",
     "prezzo": 59000,
     "mq": 96
    },
    {
     "titolo": "Annuncio simile a Voghera, 98 m²",
     "prezzo": 65000,
     "mq": 98
    },
    {
     "titolo": "Annuncio simile a Voghera, 81 m²",
     "prezzo": 68000,
     "mq": 81
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-h",
  "titolo": "Bilocale pronto da abitare con letto soppalcato",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-4030005790676550117",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Uberti, centro",
  "lat": 44.9918,
  "lng": 9.0122,
  "pos_indicativa": true,
  "prezzo": 50000,
  "mq": 54,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 350,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 440,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Pronto da abitare, in centro"
   ],
   "contro": [
    "Piano terra"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 56 m²",
     "prezzo": 59000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Voghera, 51 m²",
     "prezzo": 63000,
     "mq": 51
    },
    {
     "titolo": "Annuncio simile a Voghera, 60 m²",
     "prezzo": 89000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Voghera, 61 m²",
     "prezzo": 59000,
     "mq": 61
    },
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 60000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 65000,
     "mq": 65
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-i",
  "titolo": "Bilocale trasformabile in trilocale con ascensore",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3620003781863824856",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Covini",
  "lat": 44.9894,
  "lng": 9.0058,
  "pos_indicativa": true,
  "prezzo": 55000,
  "mq": 85,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 560,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "85 m² ben tenuti, zona tranquilla",
    "Si può ricavare una seconda camera"
   ],
   "contro": [
    "Pochi dettagli sulle spese"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 81 m²",
     "prezzo": 68000,
     "mq": 81
    },
    {
     "titolo": "Annuncio simile a Voghera, 80 m²",
     "prezzo": 60000,
     "mq": 80
    },
    {
     "titolo": "Annuncio simile a Voghera, 90 m²",
     "prezzo": 58000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Voghera, 77 m²",
     "prezzo": 69000,
     "mq": 77
    },
    {
     "titolo": "Annuncio simile a Voghera, 93 m²",
     "prezzo": 109000,
     "mq": 93
    },
    {
     "titolo": "Annuncio simile a Voghera, 95 m²",
     "prezzo": 99000,
     "mq": 95
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-j",
  "titolo": "Monolocale in via Scarabelli",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-6850005786788587493",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Emilia",
  "lat": 44.9978,
  "lng": 9.0138,
  "pos_indicativa": true,
  "prezzo": 26000,
  "mq": 30,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 2000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 410,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "26.000 €: il più economico della città"
   ],
   "contro": [
    "Pochissime informazioni nell'annuncio: ho previsto 2.000 €"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 36 m²",
     "prezzo": 35000,
     "mq": 36
    },
    {
     "titolo": "Annuncio simile a Voghera, 40 m²",
     "prezzo": 38000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Voghera, 41 m²",
     "prezzo": 48000,
     "mq": 41
    },
    {
     "titolo": "Annuncio simile a Voghera, 51 m²",
     "prezzo": 63000,
     "mq": 51
    },
    {
     "titolo": "Annuncio simile a Voghera, 54 m²",
     "prezzo": 50000,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Voghera, 56 m²",
     "prezzo": 59000,
     "mq": 56
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-k",
  "titolo": "Bilocale ampio ristrutturato con ascensore e cantina",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-5720003782209489518",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Inizio via Repubblica",
  "lat": 44.9954,
  "lng": 9.0074,
  "pos_indicativa": true,
  "prezzo": 60000,
  "mq": 65,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 420,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 520,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Ristrutturato di recente",
    "Quarto piano con ascensore"
   ],
   "contro": [
    "Al limite del budget"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 65000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Voghera, 61 m²",
     "prezzo": 59000,
     "mq": 61
    },
    {
     "titolo": "Annuncio simile a Voghera, 60 m²",
     "prezzo": 89000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Voghera, 70 m²",
     "prezzo": 54000,
     "mq": 70
    },
    {
     "titolo": "Annuncio simile a Voghera, 71 m²",
     "prezzo": 55000,
     "mq": 71
    },
    {
     "titolo": "Annuncio simile a Voghera, 56 m²",
     "prezzo": 59000,
     "mq": 56
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-l",
  "titolo": "Bilocale vicino alla stazione con balcone e cantina",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-5540005790244546491",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Garibaldi",
  "lat": 44.993,
  "lng": 9.0154,
  "pos_indicativa": true,
  "prezzo": 59000,
  "mq": 61,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 500,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Vicino a stazione e servizi"
   ],
   "contro": [
    "Primo piano senza ascensore"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 60 m²",
     "prezzo": 89000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 60000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 65000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Voghera, 56 m²",
     "prezzo": 59000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Voghera, 54 m²",
     "prezzo": 50000,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Voghera, 70 m²",
     "prezzo": 54000,
     "mq": 70
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-m",
  "titolo": "Bilocale già gestito come B&B, ottime condizioni",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-5290003781863871204",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Dentici, centro",
  "lat": 44.9906,
  "lng": 9.009,
  "pos_indicativa": true,
  "prezzo": 65000,
  "mq": 65,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 420,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 520,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Già attivo come B&B: si può subentrare",
    "Ascensore, balcone e cantina"
   ],
   "contro": [
    "Sopra il budget di 60.000 €",
    "Chiedere i numeri reali del B&B al venditore"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 60000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Voghera, 61 m²",
     "prezzo": 59000,
     "mq": 61
    },
    {
     "titolo": "Annuncio simile a Voghera, 60 m²",
     "prezzo": 89000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Voghera, 70 m²",
     "prezzo": 54000,
     "mq": 70
    },
    {
     "titolo": "Annuncio simile a Voghera, 71 m²",
     "prezzo": 55000,
     "mq": 71
    },
    {
     "titolo": "Annuncio simile a Voghera, 56 m²",
     "prezzo": 59000,
     "mq": 56
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-n",
  "titolo": "Bilocale con box auto in palazzina nel verde",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-4950005794393221012",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Alberti",
  "lat": 44.9882,
  "lng": 9.0026,
  "pos_indicativa": true,
  "prezzo": 54000,
  "mq": 70,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 560,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Box auto e cantina compresi"
   ],
   "contro": [
    "Pochi dettagli sullo stato"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 71 m²",
     "prezzo": 55000,
     "mq": 71
    },
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 60000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 65000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Voghera, 77 m²",
     "prezzo": 69000,
     "mq": 77
    },
    {
     "titolo": "Annuncio simile a Voghera, 61 m²",
     "prezzo": 59000,
     "mq": 61
    },
    {
     "titolo": "Annuncio simile a Voghera, 60 m²",
     "prezzo": 89000,
     "mq": 60
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-o",
  "titolo": "Attico su due piani con rooftop panoramico",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-4130005789640139188",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Centro storico",
  "lat": 44.9966,
  "lng": 9.0106,
  "pos_indicativa": true,
  "prezzo": 59000,
  "mq": 108,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 3000,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 520,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 650,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Rooftop panoramico a 360 gradi, stabile signorile",
    "Molto fotogenico per gli annunci"
   ],
   "contro": [
    "Quinto e sesto piano: verificare ascensore e tetto",
    "Ho previsto 3.000 € di ritocchi"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 110 m²",
     "prezzo": 120000,
     "mq": 110
    },
    {
     "titolo": "Annuncio simile a Voghera, 110 m²",
     "prezzo": 59000,
     "mq": 110
    },
    {
     "titolo": "Annuncio simile a Voghera, 114 m²",
     "prezzo": 68000,
     "mq": 114
    },
    {
     "titolo": "Annuncio simile a Voghera, 98 m²",
     "prezzo": 65000,
     "mq": 98
    },
    {
     "titolo": "Annuncio simile a Voghera, 96 m²",
     "prezzo": 59000,
     "mq": 96
    },
    {
     "titolo": "Annuncio simile a Voghera, 95 m²",
     "prezzo": 99000,
     "mq": 95
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-p",
  "titolo": "Casa di corte con ingresso indipendente e balcone",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3410003783159958809",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Lomellina",
  "lat": 44.9942,
  "lng": 9.0042,
  "pos_indicativa": true,
  "prezzo": 38000,
  "mq": 40,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 410,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Ingresso indipendente",
    "Vicino a bus e supermercato"
   ],
   "contro": [
    "Zona residenziale lontana dal centro"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 41 m²",
     "prezzo": 48000,
     "mq": 41
    },
    {
     "titolo": "Annuncio simile a Voghera, 36 m²",
     "prezzo": 35000,
     "mq": 36
    },
    {
     "titolo": "Annuncio simile a Voghera, 51 m²",
     "prezzo": 63000,
     "mq": 51
    },
    {
     "titolo": "Annuncio simile a Voghera, 54 m²",
     "prezzo": 50000,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Voghera, 56 m²",
     "prezzo": 59000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Voghera, 60 m²",
     "prezzo": 89000,
     "mq": 60
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-q",
  "titolo": "Monolocale arredato con terrazzino in palazzina recente",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3380003781863702365",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Vicino al centro",
  "lat": 44.9918,
  "lng": 9.0122,
  "pos_indicativa": true,
  "prezzo": 48000,
  "mq": 41,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 410,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Arredato, ascensore, terrazzino e cantina",
    "Palazzina recente"
   ],
   "contro": [
    "Monolocale: adatto a una persona"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 40 m²",
     "prezzo": 38000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Voghera, 36 m²",
     "prezzo": 35000,
     "mq": 36
    },
    {
     "titolo": "Annuncio simile a Voghera, 51 m²",
     "prezzo": 63000,
     "mq": 51
    },
    {
     "titolo": "Annuncio simile a Voghera, 54 m²",
     "prezzo": 50000,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Voghera, 56 m²",
     "prezzo": 59000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Voghera, 60 m²",
     "prezzo": 89000,
     "mq": 60
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-r",
  "titolo": "Trilocale senza spese condominiali, termoautonomo",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3300003781863867179",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Via Papa Giovanni XXIII",
  "lat": 44.9894,
  "lng": 9.0058,
  "pos_indicativa": true,
  "prezzo": 65000,
  "mq": 98,
  "locali": 3,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 520,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 650,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Nessuna spesa condominiale",
    "Riscaldamento autonomo"
   ],
   "contro": [
    "Sopra il budget di 60.000 €"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 96 m²",
     "prezzo": 59000,
     "mq": 96
    },
    {
     "titolo": "Annuncio simile a Voghera, 95 m²",
     "prezzo": 99000,
     "mq": 95
    },
    {
     "titolo": "Annuncio simile a Voghera, 93 m²",
     "prezzo": 109000,
     "mq": 93
    },
    {
     "titolo": "Annuncio simile a Voghera, 90 m²",
     "prezzo": 58000,
     "mq": 90
    },
    {
     "titolo": "Annuncio simile a Voghera, 110 m²",
     "prezzo": 120000,
     "mq": 110
    },
    {
     "titolo": "Annuncio simile a Voghera, 110 m²",
     "prezzo": 59000,
     "mq": 110
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "voghera-s",
  "titolo": "Bilocale ristrutturato con impianti nuovi vicino alla stazione",
  "url": "https://www.nestoria.it/adclickdetail/nestoria-IT-3540005793009473014",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "PV",
  "comune": "Voghera",
  "zona": "Largo Perosi",
  "lat": 44.9978,
  "lng": 9.0138,
  "pos_indicativa": true,
  "prezzo": 59000,
  "mq": 56,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 360,
    "stima": true,
    "fonte": "Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali"
   },
   "medio": {
    "canone": 450,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 25% sopra l'affitto lungo, 10 mesi occupati l'anno"
   }
  },
  "giudizio": {
   "pro": [
    "Ristrutturato con impianti nuovi",
    "Vicino alla stazione"
   ],
   "contro": [
    "Piano rialzato"
   ]
  },
  "eventi": [
   "Ospedale di Voghera: domanda di affitto da personale sanitario",
   "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
   "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
   "Circa 50 minuti da Badile"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Voghera su Nestoria",
    "url": "https://www.nestoria.it/appartamenti/vendita/voghera"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Voghera, 54 m²",
     "prezzo": 50000,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Voghera, 60 m²",
     "prezzo": 89000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Voghera, 51 m²",
     "prezzo": 63000,
     "mq": 51
    },
    {
     "titolo": "Annuncio simile a Voghera, 61 m²",
     "prezzo": 59000,
     "mq": 61
    },
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 60000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Voghera, 65 m²",
     "prezzo": 65000,
     "mq": 65
    }
   ],
   "note": "Comparabili: annunci in vendita a Voghera con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "lonate-b",
  "titolo": "Bilocale semiarredato con spese contenute",
  "url": "https://case.trovit.it/detail/trovit-IT-3190002737205206433",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Lonate Pozzolo",
  "zona": "Sant'Antonino Ticino",
  "lat": 45.606,
  "lng": 8.741,
  "pos_indicativa": true,
  "prezzo": 44000,
  "mq": 48,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 380,
    "stima": true,
    "fonte": "Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI"
   },
   "medio": {
    "canone": 490,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 30% sopra l'affitto lungo, 10 mesi occupati l'anno"
   },
   "breve": {
    "adr": 85,
    "occ": 0.48,
    "mesi": [
     0.415,
     0.415,
     0.464,
     0.488,
     0.513,
     0.513,
     0.537,
     0.488,
     0.513,
     0.488,
     0.464,
     0.464
    ],
    "stima": true,
    "fonte": "AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto)."
   }
  },
  "giudizio": {
   "pro": [
    "Parzialmente arredato",
    "A pochi minuti da Malpensa"
   ],
   "contro": [
    "Frazione: serve l'auto"
   ]
  },
  "eventi": [
   "Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
   "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
   "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
   "Circa 45 minuti da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Somma Lombardo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Cardano al Campo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"
   },
   {
    "titolo": "Annunci di Somma Lombardo su Trovit",
    "url": "https://case.trovit.it/appartamento-somma-lombardo"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Somma Lombardo, 47 m²",
     "prezzo": 69000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 68000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 83000,
     "mq": 49
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 48000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 59000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 34870,
     "mq": 45
    }
   ],
   "note": "Comparabili: annunci in vendita a Somma Lombardo con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "lonate-c",
  "titolo": "Monolocale di 40 m² a Sant'Antonino Ticino",
  "url": "https://case.trovit.it/detail/trovit-IT-7250005789294287868",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Lombardia",
  "provincia": "VA",
  "comune": "Lonate Pozzolo",
  "zona": "Sant'Antonino Ticino",
  "lat": 45.6064,
  "lng": 8.741399999999999,
  "pos_indicativa": true,
  "prezzo": 60000,
  "mq": 40,
  "locali": 1,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": null,
  "spese": {
   "condominio_mese": 40,
   "imu_anno": 350,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 380,
    "stima": true,
    "fonte": "Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI"
   },
   "medio": {
    "canone": 490,
    "mesi_occupati": 10,
    "stima": true,
    "fonte": "Stima: canone arredato per contratti transitori (1-18 mesi) circa il 30% sopra l'affitto lungo, 10 mesi occupati l'anno"
   },
   "breve": {
    "adr": 80,
    "occ": 0.48,
    "mesi": [
     0.415,
     0.415,
     0.464,
     0.488,
     0.513,
     0.513,
     0.537,
     0.488,
     0.513,
     0.488,
     0.464,
     0.464
    ],
    "stima": true,
    "fonte": "AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto)."
   }
  },
  "giudizio": {
   "pro": [
    "Vicino all'aeroporto"
   ],
   "contro": [
    "Caro rispetto agli altri monolocali della zona"
   ]
  },
  "eventi": [
   "Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
   "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
   "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
   "Circa 45 minuti da Milano"
  ],
  "fonti": [
   {
    "titolo": "AirDNA: affitti brevi a Somma Lombardo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"
   },
   {
    "titolo": "AirDNA: affitti brevi a Cardano al Campo",
    "url": "https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"
   },
   {
    "titolo": "Annunci di Somma Lombardo su Trovit",
    "url": "https://case.trovit.it/appartamento-somma-lombardo"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Somma Lombardo, 35 m²",
     "prezzo": 39000,
     "mq": 35
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 48000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 59000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 45 m²",
     "prezzo": 34870,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 47 m²",
     "prezzo": 69000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Somma Lombardo, 49 m²",
     "prezzo": 68000,
     "mq": 49
    }
   ],
   "note": "Comparabili: annunci in vendita a Somma Lombardo con metratura vicina (raccolti il 20/11/2026)."
  }
 },
 {
  "id": "alessandria-l",
  "titolo": "Bilocale arredato al piano terra, pronto all'uso",
  "url": "https://www.immobiliare.it/annunci/134731673/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Borgo Rovereto",
  "lat": 44.9068,
  "lng": 8.607,
  "pos_indicativa": true,
  "prezzo": 45000,
  "mq": 45,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/1773/66412e8e/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Arredato e pronto da affittare",
    "Borgo Rovereto, la zona più richiesta in affitto"
   ],
   "contro": [
    "Piano terra"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 49000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 40 m²",
     "prezzo": 48000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1144,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-m",
  "titolo": "Bilocale ristrutturato e arredato con ascensore",
  "url": "https://www.immobiliare.it/annunci/134676607/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Via dei Guasco",
  "lat": 44.9173,
  "lng": 8.617,
  "pos_indicativa": true,
  "prezzo": 58000,
  "mq": 54,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/1773/66418238/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 380,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Ristrutturato, arredato, balcone e cantina",
    "Ascensore"
   ],
   "contro": [
    "Classe energetica E"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1144,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-n",
  "titolo": "Bivano al piano terra con cortile privato",
  "url": "https://www.idealista.it/immobile/37497913/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Borgo Rovereto",
  "lat": 44.9143,
  "lng": 8.609,
  "pos_indicativa": true,
  "prezzo": 45000,
  "mq": 45,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/1773/6642ec9e/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 320,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Cortile privato, riscaldamento autonomo"
   ],
   "contro": [
    "Stato non descritto"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 49000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 40 m²",
     "prezzo": 48000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1144,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-o",
  "titolo": "Bilocale al 5° piano con giardino condominiale",
  "url": "https://www.immobiliare.it/annunci/134460669/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Piazza Matteotti",
  "lat": 44.9113,
  "lng": 8.619,
  "pos_indicativa": true,
  "prezzo": 42000,
  "mq": 57,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 2000,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/1773/663dc938/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 400,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Camera separata, ascensore"
   ],
   "contro": [
    "Condominio anni '60: ho previsto 2.000 € di ritocchi"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1144,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-q",
  "titolo": "Bilocale libero con tre balconi e ascensore",
  "url": "https://www.immobiliare.it/annunci/133410882/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Corso Crimea",
  "lat": 44.9188,
  "lng": 8.621,
  "pos_indicativa": true,
  "prezzo": 48000,
  "mq": 65,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/1773/6636df10/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Tre balconi, cantina, ascensore",
    "Libero subito"
   ],
   "contro": [
    "Riscaldamento centralizzato: chiedere le spese"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 65 m²",
     "prezzo": 35000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Alessandria, 66 m²",
     "prezzo": 52000,
     "mq": 66
    },
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Alessandria, 70 m²",
     "prezzo": 37000,
     "mq": 70
    },
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1144,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-r",
  "titolo": "Bilocale ristrutturato vicino al centro",
  "url": "https://www.immobiliare.it/annunci/129244486/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Borgo Rovereto - Piscina",
  "lat": 44.9158,
  "lng": 8.613,
  "pos_indicativa": true,
  "prezzo": 45000,
  "mq": 40,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/1773/65c20402/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 300,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Centro a piedi in 10 minuti",
    "Balcone e cantina"
   ],
   "contro": [
    "Secondo piano senza ascensore, classe F"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 40 m²",
     "prezzo": 48000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 45000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 49000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1144,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-s",
  "titolo": "Bilocale all'ottavo piano vicino al centro",
  "url": "https://www.immobiliare.it/annunci/134048815/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Corso Virginia Marini",
  "lat": 44.9128,
  "lng": 8.623,
  "pos_indicativa": true,
  "prezzo": 40000,
  "mq": 60,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 2000,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/1773/6636d535/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 420,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "60 m² a 667 €/m²",
    "Ascensore, balcone e cantina"
   ],
   "contro": [
    "Stato non descritto: ho previsto 2.000 €"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 65 m²",
     "prezzo": 35000,
     "mq": 65
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1144,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-t",
  "titolo": "Bilocale completamente ristrutturato in centro",
  "url": "https://www.immobiliare.it/annunci/134505959/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Centro",
  "lat": 44.9098,
  "lng": 8.615,
  "pos_indicativa": true,
  "prezzo": 59000,
  "mq": 36,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/1773/663ce706/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 300,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Completamente ristrutturato, riscaldamento autonomo"
   ],
   "contro": [
    "Piccolo per il prezzo"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 40 m²",
     "prezzo": 48000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 45000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 49000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1144,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-u",
  "titolo": "Bilocale affittato fino a dicembre 2027",
  "url": "https://www.immobiliare.it/annunci/129515688/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Spalto Marengo",
  "lat": 44.9068,
  "lng": 8.607,
  "pos_indicativa": true,
  "prezzo": 59000,
  "mq": 53,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/1773/663d1769/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 370,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Già affittato fino al 2027",
    "Ottavo piano con ascensore"
   ],
   "contro": [
    "Canone non indicato: l'ho stimato"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    },
    {
     "titolo": "Annuncio simile a Alessandria, 58 m²",
     "prezzo": 37000,
     "mq": 58
    },
    {
     "titolo": "Annuncio simile a Alessandria, 60 m²",
     "prezzo": 55000,
     "mq": 60
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1144,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "alessandria-v",
  "titolo": "Bivano ristrutturato in stabile riqualificato",
  "url": "https://www.idealista.it/immobile/37322180/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "AL",
  "comune": "Alessandria",
  "zona": "Orti",
  "lat": 44.9173,
  "lng": 8.617,
  "pos_indicativa": true,
  "prezzo": 50000,
  "mq": 50,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "ottimo",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/1773/663b8c8d/0-2.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 350,
    "stima": true,
    "fonte": "OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Stabile appena riqualificato",
    "Ascensore"
   ],
   "contro": [
    "Zona Orti, un po' più periferica"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
   "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
   "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Alessandria",
    "url": "https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"
   },
   {
    "titolo": "Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)",
    "url": "https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Alessandria, 50 m²",
     "prezzo": 60000,
     "mq": 50
    },
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 45000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 45 m²",
     "prezzo": 49000,
     "mq": 45
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 33000,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 55 m²",
     "prezzo": 28500,
     "mq": 55
    },
    {
     "titolo": "Annuncio simile a Alessandria, 56 m²",
     "prezzo": 69000,
     "mq": 56
    }
   ],
   "note": "Comparabili: annunci in vendita a Alessandria con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1040,
    "fonte": "zona OMI di Alessandria (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "vercelli-h",
  "titolo": "Bilocale con cucina abitabile e box in corte",
  "url": "https://www.portaleagenzieimmobiliari.it/32186871-vendita-vercelli-appartamento-bilocale-60000-euro-65-mq-cucina-abitabile-box",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Corso Italia",
  "lat": 45.3301,
  "lng": 8.4251,
  "pos_indicativa": true,
  "prezzo": 60000,
  "mq": 65,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/663e3e5b/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 480,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Box compreso, cucina abitabile"
   ],
   "contro": [
    "Al limite del budget"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 60 m²",
     "prezzo": 63000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 75 m²",
     "prezzo": 60000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Vercelli, 54 m²",
     "prezzo": 54900,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Vercelli, 77 m²",
     "prezzo": 59900,
     "mq": 77
    },
    {
     "titolo": "Annuncio simile a Vercelli, 80 m²",
     "prezzo": 59900,
     "mq": 80
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1074,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "vercelli-i",
  "titolo": "Bilocale di 71 m² con balcone e cantina",
  "url": "https://www.immobiliare.it/annunci/130992298/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Vicolo Cervetto",
  "lat": 45.3271,
  "lng": 8.4171,
  "pos_indicativa": true,
  "prezzo": 60000,
  "mq": 71,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/65ed59e3/0-2.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 480,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Ampio, cucina abitabile"
   ],
   "contro": [
    "Classe energetica E"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 75 m²",
     "prezzo": 60000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Vercelli, 77 m²",
     "prezzo": 59900,
     "mq": 77
    },
    {
     "titolo": "Annuncio simile a Vercelli, 80 m²",
     "prezzo": 59900,
     "mq": 80
    },
    {
     "titolo": "Annuncio simile a Vercelli, 60 m²",
     "prezzo": 63000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vercelli, 54 m²",
     "prezzo": 54900,
     "mq": 54
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1074,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "vercelli-j",
  "titolo": "Bilocale arredato per investimento",
  "url": "http://www.pcase.it/immobili/bilocale-vendita-corso-liberta-281-vercelli-sc9064802/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Corso Libertà",
  "lat": 45.3241,
  "lng": 8.4271,
  "pos_indicativa": true,
  "prezzo": 39000,
  "mq": 38,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": true,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/65dd480b/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 330,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Arredato, riscaldamento autonomo",
    "Centro città"
   ],
   "contro": [
    "Terzo piano senza ascensore"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 40 m²",
     "prezzo": 28000,
     "mq": 40
    },
    {
     "titolo": "Annuncio simile a Vercelli, 47 m²",
     "prezzo": 42000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Vercelli, 54 m²",
     "prezzo": 54900,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Vercelli, 60 m²",
     "prezzo": 63000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 75 m²",
     "prezzo": 60000,
     "mq": 75
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1089,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "vercelli-m",
  "titolo": "Bilocale all'ultimo piano vicino all'ospedale",
  "url": "https://www.clickcase.it/bilocale-in-vercelli-vercelli-292893.html",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Zona Ospedale",
  "lat": 45.3286,
  "lng": 8.4211,
  "pos_indicativa": true,
  "prezzo": 50000,
  "mq": 60,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/663980f0/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Vicino all'ospedale: domanda di affitto costante",
    "Ascensore e due balconi"
   ],
   "contro": [
    "Cucinino piccolo"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 60 m²",
     "prezzo": 63000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vercelli, 54 m²",
     "prezzo": 54900,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 47 m²",
     "prezzo": 42000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Vercelli, 75 m²",
     "prezzo": 60000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Vercelli, 77 m²",
     "prezzo": 59900,
     "mq": 77
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 1074,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 },
 {
  "id": "vercelli-o",
  "titolo": "Bilocale in palazzina di quattro unità",
  "url": "https://www.immobiliare.it/annunci/132180416/",
  "fonte": "Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
  "aggiunto": "2026-11-20",
  "regione": "Piemonte",
  "provincia": "VC",
  "comune": "Vercelli",
  "zona": "Via Monviso",
  "lat": 45.3226,
  "lng": 8.4231,
  "pos_indicativa": true,
  "prezzo": 58000,
  "mq": 60,
  "locali": 2,
  "bagni": 1,
  "piano": null,
  "arredato": false,
  "stato": "buono",
  "lavori": 0,
  "classe_energetica": null,
  "foto": "https://cdn.caasa.it/s3/s/86e/6615d68e/0-1.jpg",
  "spese": {
   "condominio_mese": 60,
   "imu_anno": 400,
   "stima": true
  },
  "affitti": {
   "lungo": {
    "canone": 450,
    "stima": true,
    "fonte": "Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²"
   }
  },
  "giudizio": {
   "pro": [
    "Palazzina piccola, balcone"
   ],
   "contro": [
    "Classe F, primo piano senza ascensore"
   ]
  },
  "eventi": [
   "Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
   "Treno diretto per Milano in circa un'ora",
   "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
   "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"
  ],
  "fonti": [
   {
    "titolo": "Annunci di Vercelli su Caasa (con zone OMI)",
    "url": "https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"
   },
   {
    "titolo": "Prezzi e affitti a Vercelli (mercato-immobiliare.info)",
    "url": "https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"
   },
   {
    "titolo": "RealAdvisor: mercato di Vercelli",
    "url": "https://realadvisor.it/it/mercato-immobiliare/13100-vercelli"
   }
  ],
  "valutazione": {
   "comparabili": [
    {
     "titolo": "Annuncio simile a Vercelli, 60 m²",
     "prezzo": 63000,
     "mq": 60
    },
    {
     "titolo": "Annuncio simile a Vercelli, 54 m²",
     "prezzo": 54900,
     "mq": 54
    },
    {
     "titolo": "Annuncio simile a Vercelli, 73 m²",
     "prezzo": 64000,
     "mq": 73
    },
    {
     "titolo": "Annuncio simile a Vercelli, 47 m²",
     "prezzo": 42000,
     "mq": 47
    },
    {
     "titolo": "Annuncio simile a Vercelli, 75 m²",
     "prezzo": 60000,
     "mq": 75
    },
    {
     "titolo": "Annuncio simile a Vercelli, 77 m²",
     "prezzo": 59900,
     "mq": 77
    }
   ],
   "note": "Comparabili: annunci in vendita a Vercelli con metratura vicina (raccolti il 20/11/2026).",
   "omi": {
    "medio": 825,
    "fonte": "zona OMI di Vercelli (valore medio riportato da Caasa / mercato-immobiliare.info)"
   }
  }
 }
];
