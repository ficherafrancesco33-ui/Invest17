# Milano: zone immobiliari (prezzi immobiliare.it, ottobre 2026) e punti di interesse.
# Coordinate indicative (centro della zona / posizione del luogo), messe a mano: errore di qualche centinaio di metri.

MEDIA = dict(vendita=5667, affitto=22.52, periodo="ottobre 2026")

# nome, vendita €/m², variazione % 1 anno, affitto €/m² mese, lat, lon, tipo di domanda, nota
ZONE = [
 ("Centro", 11094, -0.8, 31.11, 45.4641, 9.1900, "turisti,lusso,business", "Duomo, Brera, Quadrilatero: il massimo per affitti brevi, prezzi da lusso."),
 ("Arco della Pace, Arena, Pagano", 10150, 10.3, 27.00, 45.4730, 9.1680, "turisti,famiglie", "Signorile, vicino al Parco Sempione; cresce forte (+10% in un anno)."),
 ("Genova, Ticinese", 8356, 3.5, 25.46, 45.4555, 9.1800, "turisti,giovani,studenti", "Colonne di San Lorenzo e Darsena: movida, Cattolica e Statale vicine."),
 ("Quadronno, Palestro, Guastalla", 9450, 5.4, 27.52, 45.4625, 9.2020, "famiglie,lusso,sanita", "Elegante e tranquilla; Policlinico e Statale a piedi."),
 ("Garibaldi, Moscova, Porta Nuova", 10283, 2.4, 30.35, 45.4800, 9.1880, "business,turisti,lusso", "Grattacieli e uffici: domanda di manager e trasferte tutto l'anno."),
 ("Fiera, Sempione, City Life, Portello", 6951, 1.3, 22.98, 45.4780, 9.1560, "business,fiere,famiglie", "CityLife e MiCo: congressi e fiere spingono il medio termine."),
 ("Navigli", 6425, -0.9, 23.61, 45.4465, 9.1710, "turisti,giovani", "Naviglio Grande e Pavese: tra i quartieri più forti su Airbnb."),
 ("Porta Romana, Cadore, Montenero", 7308, 0.5, 23.83, 45.4530, 9.2080, "studenti,giovani,famiglie", "Bocconi vicina, Villaggio olimpico e Fondazione Prada: zona in trasformazione."),
 ("Porta Venezia, Indipendenza", 7988, 1.5, 25.49, 45.4750, 9.2100, "turisti,giovani", "Corso Buenos Aires e Lazzaretto: domanda turistica e di giovani professionisti."),
 ("Centrale, Repubblica", 6950, 3.7, 23.74, 45.4840, 9.2020, "turisti,business", "Stazione Centrale: tantissimi viaggiatori, ma zona da scegliere via per via."),
 ("Cenisio, Sarpi, Isola", 6489, -1.4, 22.71, 45.4880, 9.1760, "giovani,business", "Isola e Chinatown: vicine a Porta Nuova, molto richieste da under 35."),
 ("Uptown, Cascina Merlata, Viale Certosa", 4416, 2.5, 19.57, 45.5080, 9.1250, "nuovo,lavoro", "Quartieri nuovi vicino a MIND (ex Expo) e al centro commerciale Merlata Bloom."),
 ("Bande Nere, Inganni", 4810, 1.1, 19.22, 45.4560, 9.1320, "famiglie", "Residenziale con M1 e M4: affitto lungo a famiglie."),
 ("Famagosta, Barona", 4574, 2.5, 19.85, 45.4380, 9.1530, "studenti,sanita", "IULM e Ospedale San Paolo: studenti e personale sanitario."),
 ("Abbiategrasso, Chiesa Rossa", 4508, 3.7, 20.25, 45.4290, 9.1800, "studenti,famiglie", "M2 e verso Humanitas/Rozzano: buon rapporto prezzo-affitto."),
 ("Porta Vittoria, Lodi", 5124, -2.8, 20.52, 45.4500, 9.2220, "studenti,giovani", "M3 Lodi e Porta Romana FS: Bocconi e Prada a pochi minuti."),
 ("Cimiano, Crescenzago, Adriano", 3845, 3.2, 17.73, 45.5050, 9.2470, "famiglie,sanita", "M2 Martesana; San Raffaele vicino; tra le zone più economiche."),
 ("Bicocca, Niguarda", 4083, 4.0, 17.86, 45.5150, 9.2000, "studenti,sanita,lavoro", "Università Bicocca e Ospedale Niguarda: domanda costante di stanze e bilocali."),
 ("Solari, Washington", 7298, 1.2, 23.70, 45.4610, 9.1580, "famiglie,design", "Tortona e Solari: design week, Sant'Ambrogio vicino."),
 ("Affori, Bovisa", 3985, 2.6, 19.54, 45.5100, 9.1660, "studenti", "Politecnico Bovisa e M3: affitto a studenti a prezzi d'ingresso bassi."),
 ("San Siro, Trenno", 4229, 2.0, 18.37, 45.4800, 9.1150, "eventi,famiglie", "Stadio, Ippodromo e concerti: picchi di domanda per affitti brevi."),
 ("Bisceglie, Baggio, Olmi", 3306, 5.2, 15.88, 45.4610, 9.0950, "famiglie", "Periferia ovest con M1 Bisceglie: prezzi tra i più bassi di Milano."),
 ("Ripamonti, Vigentino", 4749, 3.6, 19.85, 45.4330, 9.2050, "sanita,lavoro", "IEO e Symbiosis: personale sanitario e uffici nuovi."),
 ("Forlanini", 3932, 3.1, 17.96, 45.4600, 9.2550, "viaggiatori,lavoro", "M4 per Linate in pochi minuti: trasferte e voli."),
 ("Città Studi, Susa", 5777, 0.6, 20.64, 45.4750, 9.2300, "studenti,sanita", "Politecnico, Statale e Istituto Tumori: il quartiere degli studenti."),
 ("Maggiolina, Istria", 5432, 1.6, 20.14, 45.4960, 9.2020, "famiglie", "Villette e M5: residenziale tranquilla."),
 ("Precotto, Turro", 4549, 0.6, 19.44, 45.5050, 9.2260, "famiglie,giovani", "M1 verso Sesto; Martesana: in crescita lenta."),
 ("Udine, Lambrate", 4575, 3.7, 18.46, 45.4920, 9.2400, "studenti,giovani", "Stazione Lambrate e Politecnico vicino: studenti e design district."),
 ("Pasteur, Rovereto", 4880, 0.9, 20.99, 45.4930, 9.2190, "giovani", "NoLo: quartiere di moda tra i giovani, M1."),
 ("Ponte Lambro, Santa Giulia", 3512, 4.8, 17.14, 45.4370, 9.2500, "nuovo,eventi", "Arena olimpica di Santa Giulia e nuovi quartieri: potenziale di crescita."),
 ("Corvetto, Rogoredo", 4295, -2.3, 19.42, 45.4400, 9.2300, "viaggiatori,studenti", "Stazione dell'alta velocità a Rogoredo e M3."),
 ("Napoli, Soderini", 5677, 1.7, 21.94, 45.4500, 9.1400, "famiglie", "M4 nuova (Frattini, Gelsomini): collegamento diretto con il centro."),
]

# Linee e stazioni della metropolitana (selezione), coordinate indicative
METRO = {
 "M1": [("Sesto FS",45.5410,9.2390),("Precotto",45.5110,9.2240),("Gorla",45.5050,9.2230),("Turro",45.4990,9.2200),("Rovereto",45.4940,9.2170),("Pasteur",45.4910,9.2150),("Loreto",45.4860,9.2160),("Lima",45.4800,9.2110),("Porta Venezia",45.4740,9.2050),("Palestro",45.4720,9.2000),("San Babila",45.4665,9.1975),("Duomo",45.4642,9.1900),("Cordusio",45.4655,9.1860),("Cairoli",45.4680,9.1820),("Cadorna",45.4680,9.1760),("Conciliazione",45.4660,9.1700),("Pagano",45.4680,9.1625),("Buonarroti",45.4700,9.1560),("Amendola",45.4740,9.1510),("Lotto",45.4790,9.1440),("QT8",45.4860,9.1370),("Lampugnano",45.4890,9.1270),("Uruguay",45.4935,9.1200),("Bonola",45.4970,9.1110),("San Leonardo",45.5000,9.1020),("Molino Dorino",45.5040,9.0930),("Rho Fiera",45.5210,9.0880),("Wagner",45.4680,9.1580),("De Angeli",45.4675,9.1500),("Gambara",45.4660,9.1430),("Bande Nere",45.4620,9.1350),("Primaticcio",45.4590,9.1280),("Inganni",45.4550,9.1240),("Bisceglie",45.4540,9.1130)],
 "M2": [("Abbiategrasso",45.4310,9.1780),("Famagosta",45.4370,9.1680),("Romolo",45.4440,9.1680),("Porta Genova",45.4530,9.1710),("Sant'Agostino",45.4580,9.1720),("Sant'Ambrogio",45.4620,9.1760),("Cadorna",45.4680,9.1760),("Lanza",45.4720,9.1820),("Moscova",45.4775,9.1850),("Garibaldi",45.4840,9.1870),("Gioia",45.4840,9.1960),("Centrale",45.4860,9.2040),("Caiazzo",45.4850,9.2100),("Loreto",45.4860,9.2160),("Piola",45.4800,9.2260),("Lambrate",45.4840,9.2370),("Udine",45.4920,9.2380),("Cimiano",45.5000,9.2380),("Crescenzago",45.5040,9.2450),("Cascina Gobba",45.5100,9.2600)],
 "M3": [("Comasina",45.5280,9.1640),("Affori FN",45.5150,9.1730),("Dergano",45.5060,9.1800),("Maciachini",45.4980,9.1850),("Zara",45.4930,9.1920),("Sondrio",45.4890,9.2010),("Centrale",45.4860,9.2040),("Repubblica",45.4790,9.1980),("Turati",45.4750,9.1950),("Montenapoleone",45.4690,9.1950),("Duomo",45.4642,9.1900),("Missori",45.4600,9.1880),("Crocetta",45.4560,9.1960),("Porta Romana",45.4520,9.2030),("Lodi TIBB",45.4450,9.2120),("Brenta",45.4400,9.2190),("Corvetto",45.4380,9.2250),("Porto di Mare",45.4300,9.2370),("Rogoredo",45.4340,9.2390),("San Donato",45.4290,9.2550)],
 "M4": [("Linate",45.4600,9.2780),("Repetti",45.4580,9.2620),("Forlanini FS",45.4630,9.2380),("Argonne",45.4640,9.2250),("Susa",45.4660,9.2160),("Dateo",45.4680,9.2120),("Tricolore",45.4670,9.2050),("San Babila",45.4665,9.1975),("Sforza-Policlinico",45.4590,9.1950),("Santa Sofia",45.4570,9.1890),("Vetra",45.4580,9.1830),("De Amicis",45.4590,9.1780),("Sant'Ambrogio",45.4620,9.1760),("Coni Zugna",45.4570,9.1700),("California",45.4570,9.1640),("Bolivar",45.4560,9.1580),("Tolstoj",45.4540,9.1530),("Frattini",45.4520,9.1450),("Gelsomini",45.4480,9.1380),("Segneri",45.4460,9.1310),("San Cristoforo",45.4430,9.1250)],
 "M5": [("Bignami",45.5280,9.2120),("Ponale",45.5220,9.2120),("Bicocca",45.5150,9.2120),("Ca' Granda",45.5080,9.2050),("Istria",45.5010,9.2010),("Marche",45.4960,9.1950),("Zara",45.4930,9.1920),("Isola",45.4880,9.1910),("Garibaldi",45.4840,9.1870),("Monumentale",45.4850,9.1780),("Cenisio",45.4860,9.1680),("Gerusalemme",45.4800,9.1610),("Domodossola",45.4810,9.1590),("Tre Torri",45.4775,9.1540),("Portello",45.4830,9.1490),("Lotto",45.4790,9.1440),("Segesta",45.4790,9.1330),("San Siro Ippodromo",45.4790,9.1250),("San Siro Stadio",45.4780,9.1210)],
}
METRO_COL = {"M1": "#e3242b", "M2": "#2d9e46", "M3": "#f2b705", "M4": "#1a63c4", "M5": "#9b5fc0"}

# Punti di interesse: categoria, nome, lat, lon
POI = [
 ("uni","Università Statale (sede centrale)",45.4600,9.1940),("uni","Statale Città Studi",45.4750,9.2310),("uni","Politecnico Leonardo",45.4780,9.2270),
 ("uni","Politecnico Bovisa",45.5030,9.1560),("uni","Università Bocconi",45.4500,9.1890),("uni","Università Cattolica",45.4620,9.1770),
 ("uni","Università Bicocca",45.5140,9.2110),("uni","IULM",45.4480,9.1610),("uni","Vita-Salute San Raffaele",45.5050,9.2640),
 ("uni","Accademia di Brera",45.4720,9.1880),("uni","Statale al MIND (Rho)",45.5190,9.0990),("uni","NABA",45.4480,9.1660),
 ("osp","Policlinico",45.4590,9.1960),("osp","Ospedale Niguarda",45.5110,9.1870),("osp","Ospedale San Raffaele",45.5050,9.2640),
 ("osp","Ospedale Sacco",45.5180,9.1190),("osp","Ospedale San Paolo",45.4410,9.1580),("osp","Ospedale San Carlo",45.4610,9.1110),
 ("osp","Fatebenefratelli",45.4780,9.1940),("osp","Istituto Tumori e Besta",45.4740,9.2300),("osp","IEO",45.4180,9.2220),
 ("osp","Galeazzi (MIND)",45.5180,9.0990),("osp","Buzzi (pediatrico)",45.4840,9.1640),("osp","Humanitas (Rozzano)",45.3870,9.1600),
 ("osp","Monzino",45.4310,9.2200),
 ("lav","Porta Nuova (uffici)",45.4835,9.1910),("lav","CityLife (uffici)",45.4780,9.1550),("lav","Bicocca - Pirelli",45.5180,9.2130),
 ("lav","MIND - ex Expo",45.5180,9.0990),("lav","Fiera Rho",45.5220,9.0850),("lav","MiCo - Fiera City",45.4800,9.1530),
 ("lav","Symbiosis - Fondazione Prada",45.4460,9.2050),("lav","Villaggio olimpico Porta Romana",45.4470,9.2110),("lav","Aeroporto di Linate",45.4500,9.2780),
 ("lav","Stazione Centrale",45.4860,9.2040),("lav","Stazione Garibaldi",45.4840,9.1870),("lav","Stazione Rogoredo (AV)",45.4340,9.2390),
 ("eve","Stadio San Siro",45.4781,9.1240),("eve","Arena Santa Giulia",45.4410,9.2440),("eve","Ippodromo San Siro",45.4800,9.1300),("eve","Darsena e Navigli",45.4520,9.1780),
 ("neg","Corso Buenos Aires",45.4800,9.2110),("neg","Corso Vittorio Emanuele",45.4650,9.1940),("neg","Quadrilatero della moda",45.4690,9.1960),
 ("neg","CityLife Shopping District",45.4775,9.1555),("neg","Merlata Bloom",45.5140,9.1050),("neg","Il Centro (Arese)",45.5560,9.0570),
 ("scu","Liceo Berchet",45.4560,9.1990),("scu","Liceo Parini",45.4750,9.1880),("scu","Liceo Volta",45.4790,9.2110),("scu","Liceo Einstein",45.4730,9.2470),
 ("scu","International School of Milan",45.4780,9.1340),("scu","Sir James Henderson",45.4620,9.1440),("scu","Scuola Svizzera",45.4790,9.1960),
 ("par","Parco Sempione",45.4730,9.1750),("par","Biblioteca degli Alberi",45.4830,9.1920),("par","Giardini Montanelli",45.4740,9.2000),
 ("par","Parco Forlanini",45.4650,9.2600),("par","Parco Nord",45.5250,9.1900),("par","Parco di Trenno",45.4900,9.1000),
]
