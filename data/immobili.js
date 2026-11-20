// KEYSTONE — "I miei immobili": archivio fatto a mano (link mandati da Imma e caricamenti per zona).
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
  "escluso": "3° piano, ascensore non indicato (regola: niente 3° piano e oltre senza ascensore)",
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
 }
];
