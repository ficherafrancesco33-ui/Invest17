import json, statistics
MIT = "https://imganuncios.mitula.net/"
CA = "https://cdn.caasa.it/s3/s/86e/"
NE = "https://images.nestoria.com/v1/"
IM = "https://www.immobiliare.it/annunci/"
WK = "https://www.wikicasa.it/annuncio/"
TV = "https://case.trovit.it/detail/trovit-IT-"
MITPAGE = "https://immobiliare.mitula.it/appartamento-piste-sci-castione-presolana"

def norm(v):
    m = sum(v) / 12
    return [x / m for x in v]

ZONE = {
 "castione": dict(regione="Lombardia", provincia="BG", comune="Castione della Presolana",
   centro=(45.906, 10.035), omi=None,
   seas=norm([.304, .364, .148, .181, .209, .265, .474, .624, .331, .167, .182, .268]),
   breve_fonte="AirROI Castione della Presolana (31 annunci, nov 2025-ott 2026): occupazione 29%, 145 € a notte, 7.811 € l'anno per annuncio. Prezzo a notte adattato a grandezza.",
   lungo_mq=6.0, lungo_min=320, lungo_cap={1: 380, 2: 450, 3: 520}, gestione=0.15,
   lungo_fonte="Stima: circa 6 €/m² al mese per l'altopiano; nessun dato OMI di affitto trovato",
   eventi=["Stazione sciistica: Monte Pora e Passo della Presolana, con impianti a pochi minuti",
           "Montagna d'estate: luglio e agosto sono i mesi migliori dell'anno",
           "Stagione (AirROI): agosto 62% di occupazione, luglio 47%, febbraio 36%; marzo, ottobre e novembre i più deboli",
           "Circa 1 ora e 45 da Milano"],
   fonti=[dict(titolo="AirROI: affitti brevi a Castione della Presolana", url="https://airroi.com/report/world/italy/lombardy/castione-della-presolana"),
          dict(titolo="Annunci vicino alle piste (Mitula)", url=MITPAGE),
          dict(titolo="Annunci di Castione su Trovit", url="https://case.trovit.it/castione-presolana/6")],
   comps=[(98000,70),(110000,75),(135000,70),(99000,96),(110000,80),(99000,72),(80000,45),(100000,88),(90000,50),(129000,105),(148000,75),(170000,90),(125000,100),(102000,42),(185000,110),(110000,50),(184000,70),(195000,73),(190000,81),(99000,100),(88000,55),(75000,45),(98000,60),(114000,65),(75000,58),(139000,85),(139000,75),(89000,50),(89000,57),(155000,100),(155000,70),(135000,75),(170000,91),(70000,70),(73000,44),(70000,40),(77000,80),(69900,70),(125000,75),(165000,100),(160000,93)]),
 "pisogne": dict(regione="Lombardia", provincia="BS", comune="Pisogne", centro=(45.807, 10.107), omi=None,
   seas=norm([.304, .364, .148, .181, .209, .265, .474, .624, .331, .167, .182, .268]),
   breve_fonte="AirDNA Pisogne (80 annunci): occupazione 46%, 159 $ a notte; AirROI: 34%, 171 $. Valori del paese sul lago: per le frazioni di montagna ho ridotto prezzo e occupazione. Stagionalità indicativa (profilo di montagna).",
   lungo_mq=5.5, lungo_min=300, lungo_cap={1: 350, 2: 420, 3: 480, 4: 520}, gestione=0.15,
   lungo_fonte="Stima: circa 5,5 €/m² al mese per le frazioni di montagna; nessun dato OMI di affitto trovato",
   eventi=["Lago d'Iseo a valle: le frazioni di montagna (Grignaghe, Fraine, Pontasio) hanno vista lago",
           "Piccola area sci della Val Palot (citata negli annunci)",
           "Affitti brevi in paese: 80 annunci attivi, mercato vivo d'estate",
           "Circa 1 ora e 30 da Milano"],
   fonti=[dict(titolo="AirDNA: affitti brevi a Pisogne", url="https://www.airdna.co/vacation-rental-data/app/it/lombardia/pisogne/overview"),
          dict(titolo="AirROI: affitti brevi a Pisogne", url="https://airroi.com/airbnb-data/italy/lombardy/pisogne"),
          dict(titolo="Annunci di Pisogne su Nestoria", url="https://www.nestoria.it/appartamenti/vendita/pisogne")],
   comps=[(75000,90),(95000,105),(95000,110),(62000,147),(73000,60),(125000,120),(93000,90),(149000,110),(99000,95),(169000,127),(185000,87)]),
 "vercelli": dict(regione="Piemonte", provincia="VC", comune="Vercelli", centro=(45.3256, 8.4231), omi=1030,
   seas=None, breve_fonte=None,
   lungo_mq=7.5, lungo_min=330, lungo_cap={1: 420, 2: 480, 3: 560}, gestione=0,
   lungo_fonte="Circa 7,4-8,2 €/m² al mese a Vercelli (immobiliare.it, mercato-immobiliare.info); bilocali tra 393 e 590 € (RealAdvisor). Usato 7,5 €/m²",
   eventi=["Capoluogo con università e ospedale: domanda costante di affitti da studenti e lavoratori",
           "Treno diretto per Milano in circa un'ora",
           "Prezzi di vendita tra i più bassi delle città vicine a Milano (circa 1.000 €/m²)",
           "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"],
   fonti=[dict(titolo="Annunci di Vercelli su Caasa (con zone OMI)", url="https://www.caasa.it/vercelli/vercelli/appartamento/in-vendita.html"),
          dict(titolo="Prezzi e affitti a Vercelli (mercato-immobiliare.info)", url="https://www.mercato-immobiliare.info/piemonte/vercelli/collobiano.html"),
          dict(titolo="RealAdvisor: mercato di Vercelli", url="https://realadvisor.it/it/mercato-immobiliare/13100-vercelli")],
   comps=[(64000,73),(90000,110),(89000,90),(135000,113),(82500,96),(85000,98),(89000,93),(63000,60),(87000,95),(42000,47),(60000,75),(59900,80),(28000,40),(59900,77),(54900,54)]),
 "alessandria": dict(regione="Piemonte", provincia="AL", comune="Alessandria", centro=(44.9128, 8.6150), omi=1000,
   seas=None, breve_fonte=None,
   lungo_mq=7.0, lungo_min=300, lungo_cap={1: 400, 2: 450, 3: 520}, gestione=0,
   lungo_fonte="OMI Alessandria: 2,1-7,3 €/m² al mese; richieste per zona 7,2-7,9 €/m² (mercato-immobiliare.info). Usato 7 €/m²",
   eventi=["Capoluogo con università e ospedale: affitti richiesti da studenti e lavoratori",
           "Molti bilocali venduti già affittati, con rendimento lordo dichiarato intorno al 10%",
           "Prezzi tra i più bassi della zona: circa 880-950 €/m²",
           "Nei capoluoghi si può usare il canone concordato con cedolare al 10%: da verificare con il commercialista"],
   fonti=[dict(titolo="Prezzi e affitti ad Alessandria (OMI, mercato-immobiliare.info)", url="https://www.mercato-immobiliare.info/piemonte/alessandria/alessandria.html"),
          dict(titolo="RealAdvisor: mercato di Alessandria", url="https://realadvisor.it/it/mercato-immobiliare/comune-alessandria-it"),
          dict(titolo="Bilocali in vendita ad Alessandria (Caasa, zona Borgo Rovereto)", url="https://www.caasa.it/alessandria/alessandria-zona-bg-rovereto/bivano/in-vendita.html")],
   comps=[(45000,45),(49000,45),(33000,55),(55000,60),(37000,70),(35000,65),(52000,66),(37000,58),(48000,40),(60000,50),(28500,55),(69000,56)]),
}

LAKE = norm([.25, .28, .30, .40, .45, .55, .70, .80, .55, .38, .22, .32])
ZONE["intelvi"] = dict(regione="Lombardia", provincia="CO", comune="Alta Valle Intelvi", centro=(45.98, 9.04), omi=None, seas=LAKE,
   breve_fonte="AirDNA Pellio Intelvi: occupazione 54%, 173 $ a notte, 14,2 mila $ l'anno per annuncio; San Fedele Intelvi: 48%, 127 $. Prezzo a notte adattato a grandezza; stagionalità indicativa dei laghi (picco estivo).",
   lungo_mq=6.5, lungo_min=330, lungo_cap={1: 420, 2: 480, 3: 550}, gestione=0.15,
   lungo_fonte="Stima: circa 6,5 €/m² al mese (annunci di affitto in valle intorno ai 700 € per un duplex a Lanzo); nessun dato OMI",
   eventi=["Valle sopra il Lago di Como e il Lago di Lugano: lago a 10-20 minuti d'auto",
           "Golf Club di Lanzo e sentieri del Monte Generoso; confine svizzero vicinissimo",
           "Affitti brevi in forte crescita: a Pellio Intelvi ricavi +89% in un anno (AirDNA)",
           "Circa 1 ora e 15 da Milano"],
   fonti=[dict(titolo="AirDNA: affitti brevi a Pellio Intelvi", url="https://www.airdna.co/vacation-rental-data/app/it/lombardia/pellio-intelvi/overview"),
          dict(titolo="AirDNA: affitti brevi a San Fedele Intelvi", url="https://www.airdna.co/vacation-rental-data/app/it/lombardia/san-fedele-intelvi/revenue"),
          dict(titolo="Annunci in Valle Intelvi su Nestoria", url="https://www.nestoria.it/appartamenti/vendita/pellio-superiore"),
          dict(titolo="Annunci in Valle Intelvi su Immobiliare.it", url="https://www.immobiliare.it/vendita-appartamenti/alta-valle-intelvi/")],
   comps=[(75000,45),(45000,40),(39000,42),(85000,65),(45000,38),(38000,61),(75000,52),(75000,40),(160000,105),(134000,72),(179000,83),(35000,46),(70000,50),(79000,83),(56000,80),(57000,57),(128000,57),(109000,79),(113000,55),(58000,50),(85000,90),(185000,92)])
ZONE["maccagno"] = dict(regione="Lombardia", provincia="VA", comune="Maccagno con Pino e Veddasca", centro=(46.04, 8.735), omi=None, seas=LAKE,
   breve_fonte="AirDNA Maccagno con Pino e Veddasca (222 annunci): occupazione 58%, 222 $ a notte; AirROI: 36,8%, 210 $. Valori del paese sul lago: per la valle ho ridotto molto prezzo e occupazione.",
   lungo_mq=6.0, lungo_min=280, lungo_cap={1: 350, 2: 400}, gestione=0.15,
   lungo_fonte="Stima: circa 6 €/m² al mese in Val Veddasca; nessun dato OMI",
   eventi=["Val Veddasca sopra il Lago Maggiore: lago e spiagge di Maccagno a 10-20 minuti",
           "Forcora: piccola località di montagna con sentieri e vista lago",
           "Mercato degli affitti brevi molto attivo in paese: 222 annunci (AirDNA)",
           "Circa 1 ora e 30 da Milano"],
   fonti=[dict(titolo="AirDNA: affitti brevi a Maccagno", url="https://www.airdna.co/vacation-rental-data/app/it/lombardia/maccagno-con-pino-e-veddasca/overview"),
          dict(titolo="AirROI: affitti brevi a Maccagno", url="https://airroi.com/airbnb-data/italy/lombardy/maccagno-con-pino-e-veddasca"),
          dict(titolo="Annunci di Maccagno su Trovit", url="https://case.trovit.it/maccagno")],
   comps=[(80000,169),(95000,218),(85000,150),(130000,150),(80000,45),(26000,29),(37000,45)])

AIR = norm([.85, .85, .95, 1, 1.05, 1.05, 1.1, 1.0, 1.05, 1.0, .95, .95])
ZONE["somma"] = dict(regione="Lombardia", provincia="VA", comune="Somma Lombardo", centro=(45.684, 8.705), omi=None, seas=AIR,
   breve_fonte="AirDNA Somma Lombardo (153 annunci, vicino a Malpensa): occupazione 52%, 114 $ a notte, 12,7 mila $ l'anno; Cardano al Campo: 57% con domanda stabile tutto l'anno. Stagionalita quasi piatta (viaggiatori dell'aeroporto).",
   lungo_mq=8.0, lungo_min=380, lungo_cap={1: 480, 2: 560, 3: 650, 4: 700}, gestione=0.15, medio_k=1.3,
   lungo_fonte="Stima: circa 8 €/m² al mese (bilocali nella zona di Malpensa intorno ai 550-650 €); nessun dato OMI",
   eventi=["Aeroporto di Malpensa a 5-10 minuti: viaggiatori, equipaggi e lavoratori dell'aeroporto tutto l'anno",
           "AirDNA dà a Somma Lombardo 98 su 100 come mercato degli affitti brevi",
           "Domanda costante anche per il medio termine (personale aeroportuale e aziende della zona)",
           "Circa 45 minuti da Milano"],
   fonti=[dict(titolo="AirDNA: affitti brevi a Somma Lombardo", url="https://www.airdna.co/vacation-rental-data/app/it/lombardia/somma-lombardo/overview"),
          dict(titolo="AirDNA: affitti brevi a Cardano al Campo", url="https://www.airdna.co/vacation-rental-data/app/it/lombardia/cardano-al-campo/seasonality"),
          dict(titolo="Annunci di Somma Lombardo su Trovit", url="https://case.trovit.it/appartamento-somma-lombardo")],
   comps=[(69000,47),(68000,49),(79000,90),(80000,95),(83000,49),(95000,106),(97000,85),(98000,60),(99000,88),(99000,92),(39000,35),(48000,45),(59000,45),(55000,52),(34870,45)])
ZONE["vigevano"] = dict(regione="Lombardia", provincia="PV", comune="Vigevano", centro=(45.317, 8.858), omi=None, seas=None,
   lungo_mq=9.0, lungo_min=420, lungo_cap={2: 560, 3: 620}, gestione=0, medio_k=1.25,
   lungo_fonte="Bilocali in affitto a Vigevano tra 600 e 700 € al mese, arredati (Wikicasa, Nestoria, Mioaffitto). Usato circa 9 €/m² non arredato",
   eventi=["Ospedale Civile di Vigevano: richieste di affitto da personale sanitario e familiari (annunci 'adiacente ospedale')",
           "Affitti transitori arredati richiesti da professionisti in trasferta (fino a 1.000 € al mese con utenze)",
           "Piazza Ducale e centro storico attraggono anche turismo di giornata",
           "25 minuti da Badile, 45 da Milano"],
   fonti=[dict(titolo="Affitti di bilocali a Vigevano (Nestoria)", url="https://www.nestoria.it/appartamenti/affitto/via-verdi_vigevano"),
          dict(titolo="Annunci di Vigevano su Nestoria", url="https://www.nestoria.it/appartamenti/vendita/via-ceresio_vigevano")],
   comps=[(69000,60),(79000,90),(109000,72),(105000,88),(75000,64),(109000,75),(115000,85),(95000,82),(120000,80),(125000,110),(73000,75),(85000,85),(72000,68),(80000,57),(65000,83)])
ZONE["novara"] = dict(regione="Piemonte", provincia="NO", comune="Novara", centro=(45.446, 8.622), omi=None, seas=None,
   lungo_mq=9.25, lungo_min=430, lungo_cap={2: 560, 3: 650}, gestione=0, medio_k=1.25,
   lungo_fonte="RealAdvisor Novara: affitto medio 111 €/m² l'anno (circa 9,25 €/m² al mese); bilocali tra 455 e 682 €",
   eventi=["Ospedale Maggiore della Carità e Università del Piemonte Orientale: studenti, specializzandi e personale sanitario",
           "Stazione con treni frequenti per Milano (circa 35 minuti)",
           "Posti letto per studenti in centro a oltre 300 € al mese più spese",
           "Circa 50 minuti da Badile"],
   fonti=[dict(titolo="RealAdvisor: mercato e affitti a Novara", url="https://realadvisor.it/it/mercato-immobiliare/28100-novara/corso-vercelli")],
   comps=[(69000,65),(89000,57),(87000,60),(85000,61),(80000,70),(80000,61),(77000,69),(79000,73),(80000,70),(67000,48),(62000,46),(50000,50),(69000,70)])
ZONE["voghera"] = dict(regione="Lombardia", provincia="PV", comune="Voghera", centro=(44.993, 9.009), omi=None, seas=None,
   lungo_mq=6.5, lungo_min=330, lungo_cap={1: 380, 2: 450, 3: 520}, gestione=0, medio_k=1.25,
   lungo_fonte="Stima: circa 6,5 €/m² al mese (provincia di Pavia, città media); da verificare con agenzie locali",
   eventi=["Ospedale di Voghera: domanda di affitto da personale sanitario",
           "Stazione sulla linea Milano-Genova: Milano in circa un'ora",
           "Porta dell'Oltrepò Pavese (vini, colline): turismo enogastronomico",
           "Circa 50 minuti da Badile"],
   fonti=[dict(titolo="Annunci di Voghera su Nestoria", url="https://www.nestoria.it/appartamenti/vendita/voghera")],
   comps=[(68000,81),(120000,110),(68000,114),(99000,95),(69000,77),(63000,51),(55000,71),(35000,36),(59000,110),(89000,60),(109000,93),(59000,96),(60000,80),(58000,90),(50000,54),(55000,85),(60000,65),(59000,61),(65000,65),(54000,70),(38000,40),(48000,41),(65000,98),(59000,56)])

L = [
 # ---- Castione della Presolana ----
 dict(z="castione", id="castione-a", titolo="Monolocale sulle piste del Monte Pora con terrazzo", zona="Monte Pora", d=(45.879, 10.092), prezzo=43000, mq=38, locali=1, stato="buono", arredato=False, lavori=0,
      foto=MIT+"appartamento_in_vendita_di_38_m_in_via_pian_del_termen_29_5910002779962841256.jpg", url=MITPAGE, adr=85, occ=.30,
      pro=["Sulle piste da sci, vicino alla piazzetta del Monte Pora", "Terrazzo", "Prezzo d'ingresso basso per una località sciistica"],
      contro=["Monolocale: adatto a coppie, non a famiglie", "Non risulta arredato"]),
 dict(z="castione", id="castione-b", titolo="Monolocale direttamente sulle piste, Monte Pora", zona="Monte Pora", d=(45.878, 10.090), prezzo=58000, mq=38, locali=1, stato="buono", arredato=False, lavori=0,
      foto=MIT+"appartamento_in_vendita_a_castione_della_presolana_bg_3230000776420346459i2.jpg", url=TV+"3230000776420380693", adr=85, occ=.30,
      pro=["Sci ai piedi: la posizione che si affitta meglio d'inverno"], contro=["Stessa metratura di altri monolocali a 43.000 €: caro"]),
 dict(z="castione", id="castione-c", titolo="Monolocale nella pineta del Passo della Presolana", zona="Campelli - Passo della Presolana", d=(45.948, 10.080), prezzo=58000, mq=50, locali=1, stato="buono", arredato=False, lavori=0,
      foto=MIT+"appartamento_in_vendita_a_castione_della_presolana_bg_4690003754735954488i2.jpg", url=TV+"4690003754735988722", adr=90, occ=.28,
      pro=["Tra gli abeti, a pochi passi dalle piste del Passo", "50 m²: spazio per 3-4 persone"], contro=["Lontano dai servizi del paese", "Non risulta arredato"]),
 dict(z="castione", id="castione-d", titolo="Open space ristrutturato con terrazza panoramica", zona="Colle Vareno - Monte Pora", d=(45.884, 10.080), prezzo=55000, mq=50, locali=1, stato="ottimo", arredato=False, lavori=0,
      foto=MIT+"appartamento_in_vendita_di_50_m_in_via_monte_pora_12_6260005793787039539.jpg", url=MITPAGE, adr=95, occ=.30, premium=True,
      pro=["Già ristrutturato: niente lavori", "Terrazza panoramica, pensato come casa vacanze", "Zona Monte Pora, vicino alle piste"],
      contro=["Open space: un solo ambiente", "Da arredare"]),
 dict(z="castione", id="castione-e", titolo="Bilocale seminterrato in piazzetta al Monte Pora", zona="Monte Pora", d=(45.877, 10.093), prezzo=35000, mq=35, locali=2, stato="buono", arredato=False, lavori=0,
      foto=MIT+"appartamento_in_vendita_di_35_m_in_via_malga_alta_2750005790244486994.jpg", url=MITPAGE, adr=80, occ=.27,
      pro=["Il prezzo più basso della località", "Nel cuore del Monte Pora, zona piazzetta"],
      contro=["Seminterrato: meno luce, rischio umidità da verificare", "Le foto contano molto negli affitti brevi"]),
 dict(z="castione", id="castione-f", titolo="Trilocale con balcone panoramico, bagno da rifare", zona="Ronchi", d=(45.905, 10.028), prezzo=58000, mq=50, locali=3, stato="da rinfrescare", arredato=False, lavori=5000,
      foto=MIT+"appartamento_in_vendita_di_50_m_in_via_san_bernardo_23_3460002779962903157.jpg", url="https://case.trovit.it/bilocale-castione-presolana/2", adr=100, occ=.26,
      pro=["Soggiorno luminoso con balcone panoramico", "A due passi dal centro"], contro=["Bagno da rifare: ho previsto 5.000 €", "Non arredato"]),
 dict(z="castione", id="castione-g", titolo="Trilocale arredato a Lantana", zona="Lantana", d=(45.890, 10.070), prezzo=60000, mq=80, locali=3, stato="buono", arredato=True, lavori=0,
      foto=MIT+"appartamento_in_vendita_di_80_m_in_via_predusolo_2030003779358211830.jpg", url=MITPAGE, adr=115, occ=.30, premium=True,
      pro=["Arredamento compreso nel prezzo", "80 m² a 750 €/m²: grande per la cifra", "Lantana è sulla strada del Monte Pora"],
      contro=["Pochi dettagli nell'annuncio: stato da verificare"]),
 dict(z="castione", id="castione-h", titolo="Trilocale arredato con balcone e autorimessa", zona="Agro", d=(45.903, 10.024), prezzo=60000, mq=78, locali=3, stato="buono", arredato=True, lavori=0,
      foto=MIT+"appartamento_in_vendita_di_78_m_in_via_agro_7_1180003779358079277.jpg", url=MITPAGE, adr=110, occ=.28, premium=True,
      pro=["Completamente arredato", "Autorimessa compresa: utile d'inverno", "Balcone"],
      contro=["Nella stessa palazzina c'è un altro appartamento anni '70 da ristrutturare: verificare lo stato dello stabile"]),
 dict(z="castione", id="castione-i", titolo="Bilocale arredato con giardino, prezzo ribassato", zona="Sorte", d=(45.902, 10.030), prezzo=53000, mq=45, locali=2, stato="buono", arredato=True, lavori=0,
      foto=MIT+"appartamento_in_vendita_di_45_m_in_via_sorte_7_6540004780740562832.jpg", url=MITPAGE, adr=95, occ=.30, premium=True,
      pro=["Arredato, con giardino, balcone, cantina e parcheggio", "Prezzo già ridotto del 10%"], contro=["Bilocale: 4 posti letto al massimo"]),
 # ---- Pisogne ----
 dict(z="pisogne", id="pisogne-a", titolo="Casetta alpina con giardino recintato", zona="Fraine", d=(45.796, 10.128), prezzo=59900, mq=120, locali=4, stato="buono", arredato=False, lavori=0, casa=True,
      foto=NE+"eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9kaV8xMjBfbV9pbl92aWFfY2FudG9uZV82NzkwMDAzNzc2MDc1MDc3NzAwLmpwZyIsImJyYW5kIjoibmVzdG9yaWEiLCJjb3VudHJ5IjoiSVQiLCJ3aWR0aCI6NjQwLCJoZWlnaHQiOjQ4MH0=",
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-6790003776075126931", adr=110, occ=.30,
      pro=["120 m² con giardino recintato a 500 €/m²", "Mantenuta bene, subito disponibile", "Borgo a 600 m sopra il lago"],
      contro=["Da arredare", "In frazione: serve l'auto"]),
 dict(z="pisogne", id="pisogne-b", titolo="Casetta terra-cielo con giardino, barbecue e gazebo", zona="Grignaghe", d=(45.826, 10.131), prezzo=48000, mq=40, locali=2, stato="buono", arredato=False, lavori=0, casa=True,
      foto=NE+"eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9kaV80MF9tX2luX3ZpYV9mb3J0b25hXzhfMjEwMDAwMzc3NjA3NTA4NzIyOC5qcGciLCJicmFuZCI6Im5lc3RvcmlhIiwiY291bnRyeSI6IklUIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODB9",
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-2100003776075136459", adr=85, occ=.28,
      pro=["Indipendente, con giardino attrezzato", "Grignaghe a circa 900 m con vista sul lago"], contro=["Parcheggio a 200 metri", "Circa 30 minuti dal lago"]),
 dict(z="pisogne", id="pisogne-c", titolo="Casetta su due livelli vicino alle piste della Val Palot", zona="Pontasio", d=(45.832, 10.120), prezzo=35000, mq=40, locali=2, stato="buono", arredato=False, lavori=2000, casa=True,
      url=TV+"1000005788516489874", foto=None, adr=80, occ=.26,
      pro=["35.000 € per una casetta indipendente", "Vicino alla piccola area sci della Val Palot"], contro=["Pochi dettagli e nessuna foto nell'annuncio", "Ho previsto 2.000 € di ritocchi"]),
 # ---- Vercelli ----
 dict(z="vercelli", id="vercelli-a", titolo="Bilocale con cantina in via Marco Polo", zona="Via Marco Polo", d=(45.330, 8.418), prezzo=42000, mq=47, locali=2, stato="buono", arredato=False, lavori=0, omi=1055,
      foto=CA+"66415228/0-1.jpg", url=IM+"134642003/",
      pro=["Buono stato, soggiorno con cucina a vista", "Prezzo d'ingresso basso per un capoluogo"], contro=["Terzo piano senza ascensore"]),
 dict(z="vercelli", id="vercelli-b", titolo="Trilocale ristrutturato nel 2020 con ascensore", zona="Via Bezzecca", d=(45.324, 8.426), prezzo=60000, mq=75, locali=3, stato="ottimo", arredato=False, lavori=0, omi=1055,
      foto=CA+"663e9ff4/0-1.jpg", url=IM+"134509927/",
      pro=["Ristrutturato di recente, con ascensore", "Zona comoda ai servizi, vicino al centro"], contro=["Al limite del budget di 60.000 €"]),
 dict(z="vercelli", id="vercelli-c", titolo="Trilocale al 6° piano con ascensore, due camere", zona="Piazza Sardegna", d=(45.319, 8.410), prezzo=59900, mq=80, locali=3, stato="buono", arredato=False, lavori=0, omi=975,
      foto=CA+"664172ed/0-1.jpg", url=IM+"134717313/",
      pro=["Ristrutturato nel 2015, balcone e cantina", "Due camere: adatto a studenti o famiglie"], contro=["Veranda condonata: controllare i documenti"]),
 dict(z="vercelli", id="vercelli-d", titolo="Bilocale al piano terra con giardino condominiale", zona="Cappuccini", d=(45.334, 8.436), prezzo=28000, mq=40, locali=2, stato="buono", arredato=False, lavori=2000, omi=975,
      foto=CA+"6640e148/0-1.jpg", url="https://www.portaleagenzieimmobiliari.it/32587564-vendita-vercelli-appartamento-bilocale-28000-euro-40-mq-riscaldamento-autonomo",
      pro=["28.000 €: il più economico", "Riscaldamento autonomo", "Proposto dall'agenzia come investimento"], contro=["Piano terra", "Stato non descritto: ho previsto 2.000 € di ritocchi"]),
 dict(z="vercelli", id="vercelli-e", titolo="Trilocale ristrutturato con riscaldamento autonomo", zona="Via Monviso", d=(45.316, 8.420), prezzo=59900, mq=77, locali=3, stato="ottimo", arredato=False, lavori=0, omi=975,
      foto=CA+"66432ac4/0-1.jpg", url=IM+"134861505/",
      pro=["Ristrutturato, spese condominiali basse", "Balcone e cantina"], contro=["Zona periferica rispetto al centro"]),
 dict(z="vercelli", id="vercelli-f", titolo="Bilocale con ascensore e box auto", zona="Porta Torino", d=(45.322, 8.408), prezzo=54900, mq=54, locali=2, stato="buono", arredato=False, lavori=0, omi=975,
      foto=CA+"6643177d/0-1.jpg", url=IM+"134779905/",
      pro=["Box auto compreso", "Palazzina piccola con ascensore"], contro=["Riscaldamento a consumo: chiedere le spese"]),
 # ---- Alessandria ----
 dict(z="alessandria", id="alessandria-a", titolo="Bilocale già affittato, rendita dichiarata del 10%", zona="Borgo Rovereto", d=(44.916, 8.611), prezzo=45000, mq=45, locali=2, stato="buono", arredato=False, lavori=0, omi=1076, canone=375,
      url=WK+"27505333", foto=None,
      pro=["Già affittato: incassa da subito", "Centrale, primo piano con ascensore, riscaldamento autonomo"], contro=["Canone stimato dalla rendita dichiarata (circa 10%): chiedere il contratto"]),
 dict(z="alessandria", id="alessandria-b", titolo="Bilocale già affittato vicino a piazza Genova", zona="Piazza Genova", d=(44.906, 8.624), prezzo=49000, mq=45, locali=2, stato="buono", arredato=False, lavori=0, canone=408,
      url=WK+"27779362", foto=None, classe="F",
      pro=["Già affittato, rendita dichiarata intorno al 10%"], contro=["Classe energetica F", "Canone stimato dalla rendita dichiarata: chiedere il contratto"]),
 dict(z="alessandria", id="alessandria-c", titolo="Bilocale di 55 m² in piazza Valfrè, ribassato", zona="Piazza Valfrè", d=(44.910, 8.605), prezzo=33000, mq=55, locali=2, stato="da rinfrescare", arredato=False, lavori=3000,
      url=WK+"15468072", foto=None,
      pro=["Prezzo già ribassato da 35.000 €", "Servito da autobus, vicino alla stazione"], contro=["Edificio anni '60: ho previsto 3.000 € di ritocchi"]),
 dict(z="alessandria", id="alessandria-d", titolo="Bilocale con aria condizionata in via Parini", zona="Via Parini", d=(44.903, 8.612), prezzo=55000, mq=60, locali=2, stato="buono", arredato=False, lavori=0,
      url=WK+"30171712", foto=None, pro=["Palazzina del 1983, aria condizionata"], contro=["Prezzo al m² nella media: margine ridotto"]),
 dict(z="alessandria", id="alessandria-e", titolo="Bilocale di 70 m² con cantina, quartiere Cristo", zona="Cristo", d=(44.898, 8.618), prezzo=37000, mq=70, locali=2, stato="buono", arredato=False, lavori=1500, omi=972,
      url=WK+"26582014", foto=None, pro=["70 m² a 530 €/m²", "Riscaldamento autonomo e cantina"], contro=["Quartiere periferico"]),
 dict(z="alessandria", id="alessandria-f", titolo="Bilocale ristrutturato con riscaldamento autonomo, Cristo", zona="Cristo", d=(44.8985, 8.6185), prezzo=35000, mq=65, locali=2, stato="ottimo", arredato=False, lavori=0, omi=972,
      url=WK+"26321041", foto=None, pro=["Già ristrutturato", "Riscaldamento autonomo"], contro=["Quartiere periferico", "Stesso stabile di un altro bilocale in vendita: concorrenza sull'affitto"]),
 dict(z="alessandria", id="alessandria-g", titolo="Bilocale ristrutturato vicino alla stazione", zona="Via Fernandel", d=(44.904, 8.607), prezzo=52000, mq=66, locali=2, stato="ottimo", arredato=False, lavori=0,
      url=WK+"27990381", foto=None, pro=["Ristrutturato, a 500 m dalla stazione"], contro=["Riscaldamento centralizzato: spese da chiedere"]),
 dict(z="alessandria", id="alessandria-h", titolo="Bilocale ristrutturato in centro, zona Uffici Finanziari", zona="Piazza Carducci", d=(44.912, 8.613), prezzo=37000, mq=58, locali=2, stato="ottimo", arredato=False, lavori=0, omi=1076,
      url=WK+"14803568", foto=None, pro=["Centralissimo, ristrutturato, con ascensore", "Ribassato da 42.000 €", "Condizionatore e cantina"], contro=["Online da molto tempo: capire perché"]),
 dict(z="alessandria", id="alessandria-i", titolo="Bilocale di 40 m² in corso Lamarmora", zona="Corso Lamarmora", d=(44.909, 8.620), prezzo=48000, mq=40, locali=2, stato="buono", arredato=False, lavori=0,
      url=WK+"27570121", foto=None, pro=["Piccolo e facile da affittare"], contro=["1.200 €/m²: tra i più cari del gruppo", "Pochi dettagli nell'annuncio"]),
 dict(z="alessandria", id="alessandria-j", titolo="Bilocale al piano terra con box e giardino privato", zona="Via Casalbagliano", d=(44.900, 8.598), prezzo=60000, mq=50, locali=2, stato="buono", arredato=False, lavori=0,
      url=WK+"15503144", foto=None, pro=["Giardino privato e box auto"], contro=["Al limite del budget", "Zona periferica"]),
 dict(z="alessandria", id="alessandria-k", titolo="Bilocale già affittato in stabile senza lavori deliberati", zona="Via Carlo Marx", d=(44.893, 8.628), prezzo=28500, mq=55, locali=2, stato="buono", arredato=False, lavori=0,
      url=WK+"28255158", foto=None, pro=["28.500 €, già affittato", "Stabile ordinato senza lavori straordinari deliberati"], contro=["Canone non indicato: l'ho stimato", "Zona periferica"]),
]

L += [
 dict(z="intelvi", id="intelvi-a", titolo="Monolocale panoramico con balcone, ottime condizioni", zona="Pellio Superiore", d=(45.984, 9.052), prezzo=39000, mq=42, locali=1, stato="ottimo", arredato=False, lavori=0,
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-8450000794306034573", foto=None, adr=85, occ=.40, premium=True,
      pro=["Ottime condizioni, posizione panoramica con balcone e cantina", "Proposto come casa vacanza o investimento", "Complesso di poche unità"],
      contro=["Riscaldamento assente: da valutare per l'inverno", "Da arredare"]),
 dict(z="intelvi", id="intelvi-b", titolo="Monolocale con balcone vista e parco, complesso Il Tiglio", zona="Pellio Intelvi", d=(45.982, 9.049), prezzo=45000, mq=40, locali=1, stato="buono", arredato=False, lavori=0,
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-9100000779272186303", foto=None, adr=85, occ=.40,
      pro=["Luminoso, balcone con vista", "Ampio parco condominiale"], contro=["Da arredare"]),
 dict(z="intelvi", id="intelvi-c", titolo="Trilocale al piano terra con ingresso indipendente, senza spese condominiali", zona="Pellio Superiore", d=(45.9845, 9.0525), prezzo=45000, mq=38, locali=3, stato="da rinfrescare", arredato=False, lavori=4000, casa=True,
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-5750003763637005364", foto=None, adr=95, occ=.38,
      pro=["Ingresso indipendente, nessuna spesa condominiale", "Due camere in 38 m²: più posti letto"], contro=["Impianti da rivedere secondo l'annuncio: ho previsto 4.000 €"]),
 dict(z="intelvi", id="intelvi-d", titolo="Appartamento con ingresso indipendente in quadrifamiliare", zona="Pellio Superiore", d=(45.985, 9.054), prezzo=35000, mq=46, locali=3, stato="buono", arredato=False, lavori=2000, casa=True,
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-8830005782814071106", foto=None, adr=95, occ=.38,
      pro=["35.000 € con ingresso indipendente", "Zona tranquilla vicino al lago"], contro=["Stato non descritto: ho previsto 2.000 € di ritocchi"]),
 dict(z="intelvi", id="intelvi-e", titolo="Trilocale all'ultimo piano termoautonomo con giardino comune", zona="Ramponio Verna", d=(45.997, 9.066), prezzo=56000, mq=80, locali=3, stato="buono", arredato=False, lavori=0,
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-8320002766919552091", foto=None, adr=110, occ=.38, classe="E",
      pro=["80 m² a 700 €/m²: adatto a famiglie", "Riscaldamento autonomo, box e cantina disponibili"], contro=["Da arredare", "Ramponio è un po' più lontano dal lago"]),
 dict(z="intelvi", id="intelvi-f", titolo="Monolocale con ampio sottotetto e vista montagne", zona="Lanzo d'Intelvi", d=(45.972, 9.021), prezzo=57000, mq=57, locali=1, stato="buono", arredato=False, lavori=0,
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-8270002766919799029", foto=None, adr=95, occ=.40,
      pro=["Sottotetto ampio: spazio per più letti", "Due bagni, fermata del bus vicina", "Lanzo è il centro più vivo della valle"], contro=["Stesso palazzo ha altri monolocali in vendita: concorrenza"]),
 dict(z="intelvi", id="intelvi-g", titolo="Monolocale con angolo cottura e sottotetto utilizzabile", zona="Scaria", d=(45.988, 9.032), prezzo=58000, mq=50, locali=1, stato="buono", arredato=False, lavori=0,
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-7290003775297530056", foto=None, adr=90, occ=.38,
      pro=["Sottotetto utilizzabile", "Complesso residenziale tranquillo"], contro=["Prezzo al m² più alto degli altri monolocali della valle"]),
 dict(z="maccagno", id="maccagno-a", titolo="Bilocale di montagna alla Forcora", zona="Forcora", d=(46.064, 8.794), prezzo=26000, mq=29, locali=2, stato="buono", arredato=False, lavori=0,
      url="https://www.nestoria.it/appartamenti/vendita/forcora", foto=None, adr=75, occ=.30,
      pro=["26.000 €: l'ingresso più basso di tutta l'app", "Camera finestrata separata, bagno con doccia", "Natura e vista lago"],
      contro=["Località isolata: d'inverno pochi servizi", "Molto piccolo"]),
 dict(z="maccagno", id="maccagno-b", titolo="Rustico in sasso immerso nella natura", zona="Lago d'Elio", d=(46.054, 8.775), prezzo=37000, mq=45, locali=2, stato="da rinfrescare", arredato=False, lavori=8000, casa=True,
      url="https://case.trovit.it/detail/trovit-IT-3470005792231754175", foto=None, adr=95, occ=.32,
      pro=["Rustico in pietra: molto richiesto da chi cerca natura", "Zona del Lago d'Elio, panoramica"],
      contro=["Stato e abitabilità da verificare: ho previsto 8.000 € di lavori", "Probabilmente oltre i ritocchi leggeri"]),
]

L += [
 dict(z='somma', id='somma-a', titolo='Monolocale centrale ristrutturato in corte di 3 famiglie', zona='Centro', d=(45.684, 8.706), prezzo=39000, mq=35, locali=1, stato='buono', arredato=False, lavori=0, url='https://case.trovit.it/detail/trovit-IT-8740005790676634465', foto=None, adr=75, occ=0.5, pro=['A 4 km da Malpensa, libero subito', 'Corte di sole 3 famiglie: spese minime'], contro=['Ristrutturato nel 2005: da rinfrescare per gli ospiti', 'Monolocale piccolo']),
 dict(z='somma', id='somma-b', titolo='Monolocale con balcone in centro', zona='Centro', d=(45.685, 8.704), prezzo=48000, mq=45, locali=1, stato='buono', arredato=False, lavori=0, url='https://case.trovit.it/detail/trovit-IT-5720005794393276443', foto=None, adr=80, occ=0.5, pro=['45 m² con balcone, in centro'], contro=["Pochi dettagli nell'annuncio"]),
 dict(z='somma', id='somma-c', titolo='Monolocale ristrutturato con giardino nel centro storico', zona='Centro storico', d=(45.6835, 8.7065), prezzo=59000, mq=45, locali=1, stato='ottimo', arredato=False, lavori=0, url='https://case.trovit.it/detail/trovit-IT-5130005793182192651', foto=None, adr=85, occ=0.52, pro=['Ristrutturato, con giardino e spese minime', "Pronto per gli ospiti dell'aeroporto"], contro=['Piano terra in cortile']),
 dict(z='somma', id='somma-d', titolo='Porzione di casa su due piani nel centro storico', zona='Centro storico', d=(45.6838, 8.7055), prezzo=30000, mq=60, locali=2, stato='da rinfrescare', arredato=False, lavori=6000, casa=True, url='https://case.trovit.it/detail/trovit-IT-2690000792837012207', foto=None, adr=90, occ=0.5, pro=['30.000 € per 60 m² indipendenti', 'Nessuna spesa condominiale'], contro=['Stato non descritto: ho previsto 6.000 € di lavori']),
 dict(z='somma', id='somma-e', titolo='Appartamento nuovo nella frazione di Coarezza', zona='Coarezza', d=(45.668, 8.7), prezzo=34870, mq=45, locali=2, stato='ottimo', arredato=False, lavori=0, url='https://case.trovit.it/detail/trovit-IT-1740000794997066338', foto=None, adr=85, occ=0.48, pro=['Nuovo, molto richiesto sul portale', 'Prezzo bassissimo per un nuovo'], contro=["Coarezza è una frazione: serve l'auto"]),
 dict(z='somma', id='somma-f', titolo='Bilocale senza spese condominiali vicino al verde', zona='Coarezza', d=(45.669, 8.701), prezzo=26000, mq=46, locali=2, stato='buono', arredato=False, lavori=2000, casa=True, url='https://case.trovit.it/detail/trovit-IT-7450000791454729178', foto=None, adr=85, occ=0.48, pro=['26.000 €, indipendente e senza spese'], contro=['Stato non descritto: ho previsto 2.000 € di ritocchi']),
 dict(z='somma', id='somma-g', titolo='Bilocale in zona residenziale', zona='Coarezza', d=(45.6695, 8.699), prezzo=55000, mq=52, locali=2, stato='buono', arredato=False, lavori=0, url='https://case.trovit.it/detail/trovit-IT-5540002741699481402', foto=None, adr=90, occ=0.48, pro=['Bilocale vero, con camera separata'], contro=["Pochi dettagli nell'annuncio"]),
 dict(z='somma', id='lonate-a', titolo="Quadrilocale all'ultimo piano in corte di tre famiglie", comune='Lonate Pozzolo', zona="Sant'Antonino Ticino", d=(45.602, 8.734), prezzo=47000, mq=95, locali=4, stato='da rinfrescare', arredato=False, lavori=5000, url='https://case.trovit.it/appartamento-lonate-pozzolo', foto=None, adr=110, occ=0.45, pro=['95 m² a 495 €/m², a pochi minuti da Malpensa', 'Adatto a gruppi o a stanze per lavoratori'], contro=['Ho previsto 5.000 € di ritocchi', 'In corte: verificare il parcheggio']),
 dict(z='vigevano', id='vigevano-a', titolo='Trilocale al piano terra in zona tranquilla', zona='Via Ceresio', d=(45.322, 8.866), prezzo=48000, mq=60, locali=3, stato='buono', arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-8500000791454678818', foto='https://images.nestoria.com/v1/eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9hX3ZpZ2V2YW5vX3B2Xzg1MDAwMDA3OTE0NTQ2Mjk1ODdpMy5qcGciLCJicmFuZCI6Im5lc3RvcmlhIiwiY291bnRyeSI6IklUIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODB9', pro=['Due camere: adatto anche a stanze per personale ospedaliero'], contro=['Piano terra']),
 dict(z='vigevano', id='vigevano-b', titolo='Bilocale con terrazzo in via Pompei', zona='Via Pompei', d=(45.313, 8.853), prezzo=55000, mq=50, locali=2, stato='buono', arredato=False, lavori=0, url='https://www.nestoria.it/appartamenti/vendita/via-valeggio_vigevano?page=6', foto=None, pro=['Terrazzo'], contro=["Pochi dettagli nell'annuncio"]),
 dict(z='vigevano', id='vigevano-c', titolo='Trilocale di 67 m² a 877 €/m²', zona='Vigevano', d=(45.318, 8.85), prezzo=58800, mq=67, locali=3, stato='buono', arredato=False, lavori=0, url='https://www.nestoria.it/appartamenti/vendita/viale-della-liberta_vigevano', foto=None, pro=['Prezzo al m² tra i più bassi della città'], contro=["Indirizzo non indicato nell'annuncio"]),
 dict(z='vigevano', id='vigevano-d', titolo='Bilocale abitabile con riscaldamento autonomo', zona='Corso Pavia', d=(45.311, 8.866), prezzo=60000, mq=60, locali=2, stato='buono', arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-8020005793354953323', foto=None, pro=['Già abitabile, riscaldamento autonomo'], contro=['Primo piano senza ascensore']),
 dict(z='vigevano', id='vigevano-e', titolo='Bilocale con doppi vetri e bagno finestrato', zona='Via Giusti', d=(45.319, 8.861), prezzo=49000, mq=42, locali=2, stato='buono', arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-8910005792231891663', foto=None, pro=['Piccolo e facile da affittare', 'Infissi con doppi vetri'], contro=['Secondo piano']),
 dict(z='vigevano', id='vigevano-f', titolo='Bilocale con box auto vicino al centro', zona='Via Risorgimento', d=(45.316, 8.857), prezzo=48000, mq=52, locali=2, stato='buono', arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-2250005783591827673', foto=None, pro=['Box auto compreso', 'Vicino al centro'], contro=['Primo piano senza ascensore']),
 dict(z='vigevano', id='vigevano-g', titolo='Bilocale con cantina e posto auto, buone condizioni', zona='Strada San Marco', d=(45.306, 8.87), prezzo=45000, mq=57, locali=2, stato='buono', arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-6640005785838262914', foto=None, pro=['Posto auto e cantina', 'Buone condizioni'], contro=['Zona periferica, piano terra']),
 dict(z='novara', id='novara-a', titolo='Bilocale ristrutturato vicino alla facoltà di Farmacia', zona='Novara Est', d=(45.449, 8.64), prezzo=62000, mq=46, locali=2, stato='ottimo', arredato=False, lavori=0, url='https://www.wikicasa.it/annuncio/24911668', foto=None, pro=['Ristrutturato, ideale per studenti', 'Spese condominiali basse (69 €)'], contro=['Leggermente sopra i 60.000 €'], cond=69),
 dict(z='novara', id='novara-b', titolo='Bilocale al piano terra proposto come investimento', zona='Semicentro', d=(45.441, 8.617), prezzo=50000, mq=50, locali=2, stato='buono', arredato=False, lavori=0, url='https://www.wikicasa.it/annuncio/15193921', foto=None, pro=['Semicentro, vicino alle stazioni'], contro=['Stabile da ristrutturare: rischio spese straordinarie', 'Spese condominiali alte (167 €)'], cond=167),
 dict(z='novara', id='novara-c', titolo='Bilocale già arredato e affittato vicino alla stazione', zona='Corso della Vittoria', d=(45.444, 8.615), prezzo=67000, mq=48, locali=2, stato='buono', arredato=True, lavori=0, url='https://www.wikicasa.it/annuncio/26882512', foto=None, pro=['Già arredato e affittato: incassa da subito', 'Palazzo con ascensore vicino al centro'], contro=['Sopra il budget di 60.000 €', 'Canone attuale da verificare']),
 dict(z='novara', id='novara-d', titolo='Bilocale di 70 m² su corso Vercelli', zona='Corso Vercelli', d=(45.452, 8.605), prezzo=69000, mq=70, locali=2, stato='buono', arredato=False, lavori=0, url='https://www.wikicasa.it/annuncio/18060688', foto=None, pro=['70 m² a meno di 1.000 €/m²'], contro=['Terzo piano senza ascensore', 'Sopra il budget di 60.000 €'], cond=108),
 dict(z='voghera', id='voghera-a', titolo="Bilocale all'ultimo piano con terrazzo vicino al Duomo", zona='Via Cernaia', d=(44.993, 9.012), prezzo=55000, mq=71, locali=2, stato='buono', arredato=False, lavori=0, url='https://www.immobiliare.it/annunci/106646055/', foto=None, pro=['Terrazzo e balcone, libero subito', 'Vicino al Duomo'], contro=["Quinto piano: verificare l'ascensore"]),
 dict(z='voghera', id='voghera-b', titolo='Bilocale arredato con ampia terrazza vicino alla stazione', zona='Via Scarabelli', d=(44.995, 9.005), prezzo=63000, mq=51, locali=2, stato='ottimo', arredato=True, lavori=0, url='https://www.immobiliare.it/annunci/127748780/', foto=None, pro=['Ottimo stato, arredato, ascensore', 'A pochi passi dalla stazione'], contro=['Leggermente sopra i 60.000 €']),
 dict(z='voghera', id='voghera-c', titolo='Bilocale da personalizzare in via Lucania', zona='Rondò Carducci', d=(44.988, 9.016), prezzo=35000, mq=36, locali=2, stato='da rinfrescare', arredato=False, lavori=4000, url='https://www.casa.it/immobili/55121163/', foto=None, pro=['35.000 €: ingresso molto basso'], contro=['Da personalizzare: ho previsto 4.000 €']),
 dict(z='voghera', id='voghera-d', titolo='Trilocale di 110 m² con riscaldamento autonomo', zona='Voghera', d=(44.99, 9.0), prezzo=59000, mq=110, locali=3, stato='buono', arredato=False, lavori=0, url='https://www.nestoria.it/appartamenti/vendita/voghera', foto=None, pro=['110 m² a 536 €/m²', 'Adatto a stanze per lavoratori o studenti'], contro=["Pochi dettagli nell'annuncio"]),
 dict(z='castione', id='castione-j', titolo='Monolocale luminoso vicino al centro', zona='Castione', d=(45.907, 10.036), prezzo=39000, mq=41, locali=1, stato='buono', arredato=False, lavori=0, url='https://case.trovit.it/castione-presolana/5', foto=None, adr=85, occ=0.27, pro=['Luminoso, 41 m²'], contro=['Da arredare']),
 dict(z='castione', id='castione-k', titolo='Bilocale in via dei Mille', zona='Castione', d=(45.9065, 10.034), prezzo=42000, mq=46, locali=2, stato='buono', arredato=False, lavori=0, url='https://case.trovit.it/appartamento-castione-presolana', foto=None, adr=95, occ=0.27, pro=['Bilocale a 913 €/m² in centro'], contro=["Pochi dettagli nell'annuncio"]),
 dict(z='castione', id='castione-l', titolo='Monolocale in via Privata dei Mille', zona='Castione', d=(45.9068, 10.0345), prezzo=39000, mq=38, locali=1, stato='buono', arredato=False, lavori=0, url='https://case.trovit.it/castione-presolana/2', foto=None, adr=85, occ=0.27, pro=['Molto richiesto sul portale'], contro=['Piccolo']),
]

L += [
 dict(z="voghera", id="voghera-e", titolo='Trilocale con ascensore, due camere, balcone e cantina', zona='Via Dentici', d=(44.9882, 9.0026), prezzo=59000, mq=96, locali=3, stato="buono", arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-8180003781863653890', foto=None, pro=['96 m² a 615 €/m²', 'Due camere: adatto a famiglie o a stanze'], contro=['Primo piano: chiedere lo stato degli impianti']),
 dict(z="voghera", id="voghera-f", titolo='Trilocale al terzo piano con ascensore', zona='Via Amendola', d=(44.9966, 9.0106), prezzo=60000, mq=80, locali=3, stato="buono", arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-7790003782209310768', foto=None, pro=['Buono stato, ascensore'], contro=['Palazzo del 1968']),
 dict(z="voghera", id="voghera-g", titolo='Quadrilocale arredato, abitabile subito', zona='Viale Repubblica', d=(44.9942, 9.0042), prezzo=58000, mq=90, locali=4, stato="buono", arredato=True, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-7370002791627061219', foto=None, pro=['Arredato e ben tenuto: affittabile subito', 'Piano alto, luminoso, cantina e balcone'], contro=['Grande per un singolo inquilino: valutare affitto a stanze']),
 dict(z="voghera", id="voghera-h", titolo='Bilocale pronto da abitare con letto soppalcato', zona='Via Uberti, centro', d=(44.9918, 9.0122), prezzo=50000, mq=54, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-4030005790676550117', foto=None, pro=['Pronto da abitare, in centro'], contro=['Piano terra']),
 dict(z="voghera", id="voghera-i", titolo='Bilocale trasformabile in trilocale con ascensore', zona='Via Covini', d=(44.9894, 9.0058), prezzo=55000, mq=85, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-3620003781863824856', foto=None, pro=['85 m² ben tenuti, zona tranquilla', 'Si può ricavare una seconda camera'], contro=['Pochi dettagli sulle spese']),
 dict(z="voghera", id="voghera-j", titolo='Monolocale in via Scarabelli', zona='Via Emilia', d=(44.9978, 9.0138), prezzo=26000, mq=30, locali=1, stato="buono", arredato=False, lavori=2000, url='https://www.nestoria.it/adclickdetail/nestoria-IT-6850005786788587493', foto=None, pro=['26.000 €: il più economico della città'], contro=["Pochissime informazioni nell'annuncio: ho previsto 2.000 €"]),
 dict(z="voghera", id="voghera-k", titolo='Bilocale ampio ristrutturato con ascensore e cantina', zona='Inizio via Repubblica', d=(44.9954, 9.0074), prezzo=60000, mq=65, locali=2, stato="ottimo", arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-5720003782209489518', foto=None, pro=['Ristrutturato di recente', 'Quarto piano con ascensore'], contro=['Al limite del budget']),
 dict(z="voghera", id="voghera-l", titolo='Bilocale vicino alla stazione con balcone e cantina', zona='Via Garibaldi', d=(44.993, 9.0154), prezzo=59000, mq=61, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-5540005790244546491', foto=None, pro=['Vicino a stazione e servizi'], contro=['Primo piano senza ascensore']),
 dict(z="voghera", id="voghera-m", titolo='Bilocale già gestito come B&B, ottime condizioni', zona='Via Dentici, centro', d=(44.9906, 9.009), prezzo=65000, mq=65, locali=2, stato="ottimo", arredato=True, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-5290003781863871204', foto=None, pro=['Già attivo come B&B: si può subentrare', 'Ascensore, balcone e cantina'], contro=['Sopra il budget di 60.000 €', 'Chiedere i numeri reali del B&B al venditore']),
 dict(z="voghera", id="voghera-n", titolo='Bilocale con box auto in palazzina nel verde', zona='Via Alberti', d=(44.9882, 9.0026), prezzo=54000, mq=70, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-4950005794393221012', foto=None, pro=['Box auto e cantina compresi'], contro=['Pochi dettagli sullo stato']),
 dict(z="voghera", id="voghera-o", titolo='Attico su due piani con rooftop panoramico', zona='Centro storico', d=(44.9966, 9.0106), prezzo=59000, mq=108, locali=3, stato="buono", arredato=False, lavori=3000, url='https://www.nestoria.it/adclickdetail/nestoria-IT-4130005789640139188', foto=None, pro=['Rooftop panoramico a 360 gradi, stabile signorile', 'Molto fotogenico per gli annunci'], contro=['Quinto e sesto piano: verificare ascensore e tetto', 'Ho previsto 3.000 € di ritocchi']),
 dict(z="voghera", id="voghera-p", titolo='Casa di corte con ingresso indipendente e balcone', zona='Via Lomellina', d=(44.9942, 9.0042), prezzo=38000, mq=40, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-3410003783159958809', foto=None, pro=['Ingresso indipendente', 'Vicino a bus e supermercato'], contro=['Zona residenziale lontana dal centro']),
 dict(z="voghera", id="voghera-q", titolo='Monolocale arredato con terrazzino in palazzina recente', zona='Vicino al centro', d=(44.9918, 9.0122), prezzo=48000, mq=41, locali=1, stato="ottimo", arredato=True, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-3380003781863702365', foto=None, pro=['Arredato, ascensore, terrazzino e cantina', 'Palazzina recente'], contro=['Monolocale: adatto a una persona']),
 dict(z="voghera", id="voghera-r", titolo='Trilocale senza spese condominiali, termoautonomo', zona='Via Papa Giovanni XXIII', d=(44.9894, 9.0058), prezzo=65000, mq=98, locali=3, stato="buono", arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-3300003781863867179', foto=None, pro=['Nessuna spesa condominiale', 'Riscaldamento autonomo'], contro=['Sopra il budget di 60.000 €']),
 dict(z="voghera", id="voghera-s", titolo='Bilocale ristrutturato con impianti nuovi vicino alla stazione', zona='Largo Perosi', d=(44.9978, 9.0138), prezzo=59000, mq=56, locali=2, stato="ottimo", arredato=False, lavori=0, url='https://www.nestoria.it/adclickdetail/nestoria-IT-3540005793009473014', foto=None, pro=['Ristrutturato con impianti nuovi', 'Vicino alla stazione'], contro=['Piano rialzato']),
 dict(z="somma", id="lonate-b", titolo='Bilocale semiarredato con spese contenute', zona="Sant'Antonino Ticino", d=(45.606, 8.741), prezzo=44000, mq=48, locali=2, stato="buono", arredato=True, lavori=0, url='https://case.trovit.it/detail/trovit-IT-3190002737205206433', foto=None, comune="Lonate Pozzolo", adr=85, occ=.48, pro=['Parzialmente arredato', 'A pochi minuti da Malpensa'], contro=["Frazione: serve l'auto"]),
 dict(z="somma", id="lonate-c", titolo="Monolocale di 40 m² a Sant'Antonino Ticino", zona="Sant'Antonino Ticino", d=(45.6064, 8.741399999999999), prezzo=60000, mq=40, locali=1, stato="buono", arredato=False, lavori=0, url='https://case.trovit.it/detail/trovit-IT-7250005789294287868', foto=None, comune="Lonate Pozzolo", adr=80, occ=.48, pro=["Vicino all'aeroporto"], contro=['Caro rispetto agli altri monolocali della zona']),
]

L += [
 dict(z="alessandria", id="alessandria-l", titolo="Bilocale arredato al piano terra, pronto all'uso", zona='Borgo Rovereto', d=(44.9068, 8.607), prezzo=45000, mq=45, locali=2, stato="buono", arredato=True, lavori=0, url='https://www.immobiliare.it/annunci/134731673/', foto='https://cdn.caasa.it/s3/s/1773/66412e8e/0-1.jpg', omi=1144, pro=['Arredato e pronto da affittare', 'Borgo Rovereto, la zona più richiesta in affitto'], contro=['Piano terra']),
 dict(z="alessandria", id="alessandria-m", titolo='Bilocale ristrutturato e arredato con ascensore', zona='Via dei Guasco', d=(44.9173, 8.617), prezzo=58000, mq=54, locali=2, stato="ottimo", arredato=True, lavori=0, url='https://www.immobiliare.it/annunci/134676607/', foto='https://cdn.caasa.it/s3/s/1773/66418238/0-1.jpg', omi=1144, pro=['Ristrutturato, arredato, balcone e cantina', 'Ascensore'], contro=['Classe energetica E']),
 dict(z="alessandria", id="alessandria-n", titolo='Bivano al piano terra con cortile privato', zona='Borgo Rovereto', d=(44.9143, 8.609), prezzo=45000, mq=45, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.idealista.it/immobile/37497913/', foto='https://cdn.caasa.it/s3/s/1773/6642ec9e/0-1.jpg', omi=1144, pro=['Cortile privato, riscaldamento autonomo'], contro=['Stato non descritto']),
 dict(z="alessandria", id="alessandria-o", titolo='Bilocale al 5° piano con giardino condominiale', zona='Piazza Matteotti', d=(44.9113, 8.619), prezzo=42000, mq=57, locali=2, stato="buono", arredato=False, lavori=2000, url='https://www.immobiliare.it/annunci/134460669/', foto='https://cdn.caasa.it/s3/s/1773/663dc938/0-1.jpg', omi=1144, pro=['Camera separata, ascensore'], contro=["Condominio anni '60: ho previsto 2.000 € di ritocchi"]),
 dict(z="alessandria", id="alessandria-q", titolo='Bilocale libero con tre balconi e ascensore', zona='Corso Crimea', d=(44.9188, 8.621), prezzo=48000, mq=65, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.immobiliare.it/annunci/133410882/', foto='https://cdn.caasa.it/s3/s/1773/6636df10/0-1.jpg', omi=1144, pro=['Tre balconi, cantina, ascensore', 'Libero subito'], contro=['Riscaldamento centralizzato: chiedere le spese']),
 dict(z="alessandria", id="alessandria-r", titolo='Bilocale ristrutturato vicino al centro', zona='Borgo Rovereto - Piscina', d=(44.9158, 8.613), prezzo=45000, mq=40, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.immobiliare.it/annunci/129244486/', foto='https://cdn.caasa.it/s3/s/1773/65c20402/0-1.jpg', omi=1144, pro=['Centro a piedi in 10 minuti', 'Balcone e cantina'], contro=['Secondo piano senza ascensore, classe F']),
 dict(z="alessandria", id="alessandria-s", titolo="Bilocale all'ottavo piano vicino al centro", zona='Corso Virginia Marini', d=(44.9128, 8.623), prezzo=40000, mq=60, locali=2, stato="buono", arredato=False, lavori=2000, url='https://www.immobiliare.it/annunci/134048815/', foto='https://cdn.caasa.it/s3/s/1773/6636d535/0-1.jpg', omi=1144, pro=['60 m² a 667 €/m²', 'Ascensore, balcone e cantina'], contro=['Stato non descritto: ho previsto 2.000 €']),
 dict(z="alessandria", id="alessandria-t", titolo='Bilocale completamente ristrutturato in centro', zona='Centro', d=(44.9098, 8.615), prezzo=59000, mq=36, locali=2, stato="ottimo", arredato=False, lavori=0, url='https://www.immobiliare.it/annunci/134505959/', foto='https://cdn.caasa.it/s3/s/1773/663ce706/0-1.jpg', omi=1144, pro=['Completamente ristrutturato, riscaldamento autonomo'], contro=['Piccolo per il prezzo']),
 dict(z="alessandria", id="alessandria-u", titolo='Bilocale affittato fino a dicembre 2027', zona='Spalto Marengo', d=(44.9068, 8.607), prezzo=59000, mq=53, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.immobiliare.it/annunci/129515688/', foto='https://cdn.caasa.it/s3/s/1773/663d1769/0-1.jpg', omi=1144, pro=['Già affittato fino al 2027', 'Ottavo piano con ascensore'], contro=["Canone non indicato: l'ho stimato"]),
 dict(z="alessandria", id="alessandria-v", titolo='Bivano ristrutturato in stabile riqualificato', zona='Orti', d=(44.9173, 8.617), prezzo=50000, mq=50, locali=2, stato="ottimo", arredato=False, lavori=0, url='https://www.idealista.it/immobile/37322180/', foto='https://cdn.caasa.it/s3/s/1773/663b8c8d/0-2.jpg', omi=1040, pro=['Stabile appena riqualificato', 'Ascensore'], contro=["Zona Orti, un po' più periferica"]),
 dict(z="vercelli", id="vercelli-h", titolo='Bilocale con cucina abitabile e box in corte', zona='Corso Italia', d=(45.3301, 8.4251), prezzo=60000, mq=65, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.portaleagenzieimmobiliari.it/32186871-vendita-vercelli-appartamento-bilocale-60000-euro-65-mq-cucina-abitabile-box', foto='https://cdn.caasa.it/s3/s/86e/663e3e5b/0-1.jpg', omi=1074, pro=['Box compreso, cucina abitabile'], contro=['Al limite del budget']),
 dict(z="vercelli", id="vercelli-i", titolo='Bilocale di 71 m² con balcone e cantina', zona='Vicolo Cervetto', d=(45.3271, 8.4171), prezzo=60000, mq=71, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.immobiliare.it/annunci/130992298/', foto='https://cdn.caasa.it/s3/s/86e/65ed59e3/0-2.jpg', omi=1074, pro=['Ampio, cucina abitabile'], contro=['Classe energetica E']),
 dict(z="vercelli", id="vercelli-j", titolo='Bilocale arredato per investimento', zona='Corso Libertà', d=(45.3241, 8.4271), prezzo=39000, mq=38, locali=2, stato="buono", arredato=True, lavori=0, url='http://www.pcase.it/immobili/bilocale-vendita-corso-liberta-281-vercelli-sc9064802/', foto='https://cdn.caasa.it/s3/s/86e/65dd480b/0-1.jpg', omi=1089, pro=['Arredato, riscaldamento autonomo', 'Centro città'], contro=['Terzo piano senza ascensore']),
 dict(z="vercelli", id="vercelli-m", titolo="Bilocale all'ultimo piano vicino all'ospedale", zona='Zona Ospedale', d=(45.3286, 8.4211), prezzo=50000, mq=60, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.clickcase.it/bilocale-in-vercelli-vercelli-292893.html', foto='https://cdn.caasa.it/s3/s/86e/663980f0/0-1.jpg', omi=1074, pro=["Vicino all'ospedale: domanda di affitto costante", 'Ascensore e due balconi'], contro=['Cucinino piccolo']),
 dict(z="vercelli", id="vercelli-o", titolo='Bilocale in palazzina di quattro unità', zona='Via Monviso', d=(45.3226, 8.4231), prezzo=58000, mq=60, locali=2, stato="buono", arredato=False, lavori=0, url='https://www.immobiliare.it/annunci/132180416/', foto='https://cdn.caasa.it/s3/s/86e/6615d68e/0-1.jpg', omi=825, pro=['Palazzina piccola, balcone'], contro=['Classe F, primo piano senza ascensore']),
]

def mesi(seas, occ):
    return [round(min(.95, s * occ), 3) for s in seas]

out = []
for i, d in enumerate(L):
    Z = ZONE[d["z"]]
    lat, lng = d["d"]
    loc = d["locali"]
    canone = d.get("canone") or max(Z["lungo_min"], min(Z["lungo_cap"].get(loc, max(Z["lungo_cap"].values())), round(d["mq"] * Z["lungo_mq"] / 10) * 10))
    casa = d.get("casa")
    aff = dict(lungo=dict(canone=canone, stima=not d.get("canone"), fonte=Z["lungo_fonte"] + (" (canone ricavato dalla rendita dichiarata nell'annuncio)" if d.get("canone") else "")))
    if Z.get("medio_k"):
        aff["medio"] = dict(canone=round(canone * Z["medio_k"] / 10) * 10, mesi_occupati=10, stima=True,
                            fonte="Stima: canone arredato per contratti transitori (1-18 mesi) circa il " + str(round((Z["medio_k"] - 1) * 100)) + "% sopra l'affitto lungo, 10 mesi occupati l'anno")
    if Z["seas"] and d.get("adr"):
        aff["breve"] = dict(adr=d["adr"], occ=d["occ"], mesi=mesi(Z["seas"], d["occ"]), stima=True, fonte=Z["breve_fonte"])
    im = dict(id=d["id"], titolo=d["titolo"], url=d["url"], fonte="Immobiliare.it / Idealista / agenzie (via Caasa, Nestoria, Trovit, Mitula, Wikicasa)",
        aggiunto="2026-11-20", regione=Z["regione"], provincia=Z["provincia"], comune=d.get("comune", Z["comune"]), zona=d["zona"],
        lat=lat, lng=lng, pos_indicativa=True, prezzo=d["prezzo"], mq=d["mq"], locali=loc, bagni=1, piano=d.get("piano"),
        arredato=d["arredato"], stato=d["stato"], lavori=d["lavori"], classe_energetica=d.get("classe"), foto=d.get("foto"),
        spese=dict(condominio_mese=d.get("cond") or (0 if casa else (60 if not Z["seas"] else 40)), imu_anno=400 if not Z["seas"] else 350, stima=True),
        affitti=aff, giudizio=dict(pro=d["pro"], contro=d["contro"]), eventi=Z["eventi"], fonti=Z["fonti"])
    if d.get("premium"): im["parametri"] = {}
    omi = d.get("omi") or Z["omi"]
    comps = sorted([c for c in Z["comps"] if not (c[0] == d["prezzo"] and c[1] == d["mq"])], key=lambda c: abs(c[1] - d["mq"]))[:6]
    im["valutazione"] = dict(
        comparabili=[dict(titolo=f"Annuncio simile a {Z['comune']}, {c[1]} m²", prezzo=c[0], mq=c[1]) for c in comps],
        note=f"Comparabili: annunci in vendita a {Z['comune']} con metratura vicina (raccolti il 20/11/2026).")
    if omi: im["valutazione"]["omi"] = dict(medio=omi, fonte=f"zona OMI di {Z['comune']} (valore medio riportato da Caasa / mercato-immobiliare.info)")
    out.append(im)

oneta = json.load(open("tools/oneta.json"))
# 20/11/2026: Imma tiene solo gli annunci arrivati dai suoi link (Oneta). I caricamenti fatti in autonomia
# (Castione, Pisogne, Vercelli, Alessandria, Valle Intelvi, ecc.) restano qui sotto ma non vanno nell'app.
INCLUDI_AUTONOMI = False
allx = oneta + (out if INCLUDI_AUTONOMI else [])
js = ("// KEYSTONE — \"I miei immobili\": archivio fatto a mano (link mandati da Imma e caricamenti per zona).\n"
      "// Solo DATI: i conti li fa l'app. Schema in NOTE_SVILUPPO.md. Aggiornato il 20/11/2026.\n"
      "const MIEI = " + json.dumps(allx, ensure_ascii=False, indent=1) + ";\n")
open("data/immobili.js", "w").write(js)
print(len(oneta), len(out), len(allx))
