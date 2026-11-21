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
  ],
  "galleria": [
   "2053111031",
   "2053111631",
   "2053111635",
   "2053111643",
   "2053111647",
   "2053111651",
   "2053111657",
   "2053111663",
   "2053111665",
   "2053111673",
   "2053111675",
   "2053111681",
   "2053111687",
   "2053111693",
   "2053111697",
   "2053111703",
   "2053111709",
   "2053111713",
   "2053111715",
   "2053111721",
   "2053111723"
  ]
 },
 {
  "id": "oneta-b",
  "titolo": "Bilocale arredato con camino in pietra",
  "url": "https://www.immobiliare.it/annunci/131854850/",
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
  "foto": "https://pwm.im-cdn.it/image/1991159630/s-c.jpg",
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
  ],
  "url_origine": "https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
  "galleria": [
   "1991159630",
   "1991159652",
   "1991159620",
   "1991159614",
   "1991159638",
   "1991159646",
   "1991159658",
   "1991159654",
   "1991159648",
   "1991159674",
   "1991159632",
   "1991159622",
   "1991159660",
   "1991159664",
   "1991159668"
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
  ],
  "galleria": [
   "2022166854",
   "2022167048",
   "2022167056",
   "2022167060",
   "2022167066",
   "2022167074",
   "2022167078",
   "2022167086",
   "2022167092",
   "2022167096",
   "2022167102",
   "2022167108",
   "2022167112",
   "2022167118",
   "2022167124",
   "2022167130",
   "2022167136",
   "2022167142",
   "2022167148",
   "2022167154",
   "2022167158",
   "2022167160",
   "2022167168",
   "2022167178",
   "2022167186",
   "2022167190",
   "2022167194",
   "2022167196",
   "2022167204",
   "2022167210",
   "2022167216",
   "2022167226",
   "2022167228",
   "2022167242",
   "2022167250",
   "2022167262",
   "2022167268",
   "2022167276"
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
  ],
  "galleria": [
   "2055449301",
   "2055449091",
   "2055449129",
   "2055449363",
   "2055449407",
   "2055449321",
   "2055449215",
   "2055449199",
   "2055449185",
   "2055449153",
   "2055449233",
   "2055449469",
   "2055448937",
   "2055448981",
   "2055449021",
   "2055449057",
   "2055449279",
   "2055449345"
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
  ],
  "galleria": [
   "1677511719",
   "1677511729",
   "1677511739",
   "1677511747",
   "1677511755",
   "1677511761",
   "1677511769",
   "1677511777",
   "1592375837",
   "1677511785",
   "1677511791",
   "1677511799",
   "1677511803",
   "1677511807",
   "1677511811",
   "1677511817",
   "1677511825",
   "1677511833"
  ]
 },
 {
  "id": "oneta-f",
  "titolo": "Villetta a schiera con giardino e box doppio",
  "url": "https://www.immobiliare.it/annunci/132803220/",
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
  "foto": "https://pwm.im-cdn.it/image/2012122842/s-c.jpg",
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
  ],
  "url_origine": "https://www.nestoria.it/adclickdetail/nestoria-IT-2370005792231697747",
  "galleria": [
   "2012122842",
   "2012122732",
   "2012122714",
   "2012122746",
   "2012122760",
   "2012122676",
   "2012122184",
   "2012122688",
   "2012122782",
   "2012122806",
   "2012122822",
   "2012122832",
   "2012122850",
   "2012122862",
   "2012122876"
  ]
 },
 {
  "id": "oneta-g",
  "titolo": "Casa indipendente su quattro livelli, 220 m²",
  "url": "https://www.immobiliare.it/annunci/129341190/",
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
  "foto": "https://pwm.im-cdn.it/image/1930723120/s-c.jpg",
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
  ],
  "url_origine": "https://www.nestoria.it/adclickdetail/nestoria-IT-6490004780740514338",
  "galleria": [
   "1930723120",
   "1930723232",
   "1930723240",
   "1930723248",
   "1930723254",
   "1984936692",
   "1930723262",
   "1930723266",
   "1930723276",
   "1984936704",
   "1930723290",
   "1930723298",
   "1984936716",
   "1930723306",
   "1984936726",
   "1930723314",
   "1984936740",
   "1930723318",
   "1930723326",
   "1930723332",
   "1930723340",
   "1930723346",
   "1930723354",
   "1930723358",
   "1930723366",
   "1930723374",
   "1930723378",
   "1930723388",
   "1930723384"
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
  ],
  "galleria": [
   "1994960870",
   "1994960976",
   "1994960910",
   "1994960934",
   "1994961006",
   "1994960994",
   "1994961018",
   "1994960856",
   "1994960830",
   "1994960822",
   "1994960806",
   "1994960814",
   "1994960836",
   "1994961030",
   "1994961040",
   "1994960888",
   "1994960754",
   "1994960764",
   "1994960782",
   "1994960726"
  ]
 },
 {
  "id": "oneta-i",
  "titolo": "Trilocale in Residenza Borgo Antico, finiture di montagna",
  "url": "https://www.immobiliare.it/annunci/129237682/",
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
  "foto": "https://pwm.im-cdn.it/image/1928119284/s-c.jpg",
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
  ],
  "url_origine": "https://www.nestoria.it/adclickdetail/nestoria-IT-2960004780740522637",
  "galleria": [
   "1928119284",
   "1928119100",
   "1928119112",
   "1928119130",
   "1928119140",
   "1928119160",
   "1928119180",
   "1928119202",
   "1928119224",
   "1928119260",
   "1928119266",
   "1928119274",
   "1928119290",
   "1928119294",
   "1928119298",
   "1928119304",
   "1928119310",
   "1928119314",
   "1928119318",
   "1928119326",
   "1928119548",
   "1928119568",
   "1928119584",
   "1928119602",
   "1928119618",
   "1928119634",
   "1928119642",
   "1928119650",
   "1928119660",
   "1928119668",
   "1928119680",
   "1928119694",
   "1928119704",
   "1928119712",
   "1928119724",
   "1928119732",
   "1928119742",
   "1928119754",
   "1928119768",
   "1928119780",
   "1928119792",
   "1928119802",
   "1928119812",
   "1928119820",
   "1928119828",
   "1928119834",
   "1928119840",
   "1928119854",
   "1928119864",
   "1928119876",
   "1928119888",
   "1928119898",
   "1928119910",
   "1928119920",
   "1928119930",
   "1928119938",
   "1928119958",
   "1928119976",
   "1928119994",
   "1928120014",
   "1928120028",
   "1928120046",
   "1928120064",
   "1928120088",
   "1928120102",
   "1928120112",
   "1928120124",
   "1928120132",
   "1928120144",
   "1928120158",
   "1928120170",
   "1928120180",
   "1928120190",
   "1928120204",
   "1928120216",
   "1928120222",
   "1928120234",
   "1928120244",
   "1928120252",
   "1928120254",
   "1928120260",
   "1928120272",
   "1928120280",
   "1928120296",
   "1928120304",
   "1928120308",
   "1928120314",
   "1928120322",
   "1928120332",
   "1928120344"
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
  ],
  "galleria": [
   "1978472196",
   "1978472190",
   "1978472136",
   "1978472138",
   "1978472144",
   "1978472158",
   "1978472164",
   "1978472170",
   "1978472178",
   "1978472184",
   "1978472200",
   "1978472208",
   "1978472218",
   "1978472228",
   "1978472234",
   "1978472238",
   "1978472146",
   "1978472152"
  ]
 },
 {
  "id": "oneta-k",
  "titolo": "Bilocale in Borgo Alpino con giardino privato e portico",
  "url": "https://www.immobiliare.it/annunci/124430927/",
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
  "foto": "https://pwm.im-cdn.it/image/1941833822/s-c.jpg",
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
  ],
  "url_origine": "https://www.nestoria.it/adclickdetail/nestoria-IT-2340002779963069783",
  "galleria": [
   "1941833822",
   "1941833688",
   "1941833698",
   "1941833706",
   "1941833716",
   "1941833732",
   "1941833738",
   "1941833752",
   "1812480519",
   "1941833766",
   "1941833784",
   "1941833796"
  ]
 },
 {
  "id": "oneta-l",
  "titolo": "Trilocale all'ultimo piano con terrazzo panoramico",
  "url": "https://www.immobiliare.it/annunci/132378896/",
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
  "foto": "https://pwm.im-cdn.it/image/2003547880/s-c.jpg",
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
  ],
  "url_origine": "https://www.nestoria.it/adclickdetail/nestoria-IT-8470000789208371747",
  "galleria": [
   "2003547880",
   "2003547900",
   "2003547918",
   "2003547928",
   "2003547950",
   "2003547980",
   "2003548016",
   "2003548050",
   "2003548072",
   "2003548090",
   "2003548134",
   "2003548176",
   "2003548220",
   "2003548246",
   "2003548260",
   "2003548272",
   "2003548282",
   "2003548298",
   "2003548318",
   "2003548344",
   "2003548364",
   "2003548394",
   "2003548432"
  ]
 },
 {
  "id": "oneta-m",
  "titolo": "Trilocale verso il Passo di Zambla, libero su tre lati",
  "url": "https://www.immobiliare.it/annunci/129764172/",
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
  "foto": "https://pwm.im-cdn.it/image/1941179538/s-c.jpg",
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
  ],
  "url_origine": "https://www.nestoria.it/adclickdetail/nestoria-IT-8220000781086767286",
  "galleria": [
   "1941179538",
   "1941179800",
   "1941179806",
   "1941179810",
   "1941179814",
   "1941179818",
   "1941179824",
   "1941179828",
   "1941179834",
   "1941179836",
   "1941179838",
   "1941179842",
   "1941179844",
   "1941179850",
   "1941179852",
   "1941179856",
   "1941179860",
   "1941179862",
   "1941179866",
   "1941179872",
   "1941179876",
   "1941179880"
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
  ],
  "galleria": [
   "2057255161",
   "2057255165",
   "2057255173",
   "2057255177",
   "2057255181",
   "2057255185",
   "2057255189",
   "2057255193",
   "2057255197",
   "2057255201",
   "2057255205",
   "2057255213",
   "2057255217",
   "2057255221",
   "2057255227",
   "2057255229",
   "2057255235",
   "2057255241",
   "2057255245"
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
  ],
  "galleria": [
   "1792940193",
   "1792940475",
   "1792940523",
   "1792940579",
   "1792940303",
   "1792940259",
   "1792940283",
   "1792940173",
   "1792940145",
   "1792940545",
   "1792940615",
   "1792940233",
   "1792940337",
   "1792940211",
   "1792940357",
   "1792940465",
   "1792940389",
   "1792940415",
   "1792940441",
   "1792940505"
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
  ],
  "galleria": [
   "2040708787",
   "2040709313",
   "2040709323",
   "2040709327",
   "2040709333",
   "2040709339",
   "2040709347",
   "2040709351",
   "2040709355",
   "2040709359",
   "2040709365",
   "2040709371",
   "2040709377",
   "2040709385",
   "2040709389",
   "2040709395",
   "2040709401",
   "2040709407"
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
  ],
  "galleria": [
   "1743780844",
   "1743780954",
   "1743780960",
   "1743780966",
   "1743780972",
   "1743780978",
   "1743780984",
   "1743780986",
   "1743780992",
   "1743781002",
   "1743781004",
   "1743781008",
   "1743781014",
   "1743781020",
   "1743781022",
   "1743781026",
   "1743781030",
   "1743781034",
   "1743781036",
   "1743781040",
   "1743781044"
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
  ],
  "galleria": [
   "1941864402",
   "1941864424",
   "1941864436",
   "1941864328",
   "1941864334",
   "1941864348",
   "1941864364",
   "1941864384",
   "1941864448",
   "1941864454"
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
  ],
  "galleria": [
   "1888015842",
   "1888015878",
   "1888015914",
   "1888015944",
   "1888015984",
   "1888016014",
   "1888016058",
   "1888016106",
   "1888016176",
   "1888016274",
   "1888016326",
   "1888016366",
   "1888016400",
   "1888016416",
   "1888016444"
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
  ],
  "galleria": [
   "1764224088",
   "1764224136",
   "1764224102",
   "1764224122",
   "1764224010",
   "1764224050",
   "1764224060",
   "1764224070",
   "1764224028",
   "1764224152",
   "1764224150",
   "1764224162"
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
  ],
  "galleria": [
   "2019027930",
   "2019027972",
   "2019028002",
   "2019028038",
   "2019028066",
   "2019028104",
   "2019028144",
   "2019028170",
   "2019028212",
   "2019028246",
   "2019028286",
   "2019028328",
   "2019028366",
   "2019028408",
   "2019028438"
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
  ],
  "galleria": [
   "2054699591",
   "2054699813",
   "2054699897",
   "2054699893",
   "2054699921",
   "2054699885",
   "2054699903",
   "2054699587",
   "2054699867",
   "2054699605",
   "2054699617",
   "2054699871",
   "2054699631",
   "2054699853",
   "2054699671",
   "2054699683",
   "2054699693",
   "2054699651",
   "2054699731",
   "2054699747",
   "2054699941"
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
  ],
  "galleria": [
   "1921303464",
   "1921303480",
   "1921303484",
   "1921303488",
   "1921303492",
   "1921303496",
   "1921303500",
   "1921303506",
   "1921303516",
   "1921303520",
   "1921303530",
   "1921303534",
   "1921303540",
   "1921303544",
   "1921303550",
   "1921303558",
   "1921303560",
   "1921303564",
   "1921303568",
   "1921303570",
   "1951120304",
   "1951120310"
  ]
 }
];
