import json, math
C = "https://cdn.caasa.it/s3/s/3f14/"
NE = "https://images.nestoria.com/v1/"
IM = "https://www.immobiliare.it/annunci/"
# coordinate indicative (frazione, non indirizzo)
POS = {"Scullera": (45.8778, 9.8085), "Oneta": (45.8715, 9.8194), "Cantoni": (45.8752, 9.8150),
       "Zambla": (45.8790, 9.7975), "Via dei Pini": (45.8790, 9.8060), "Via Alben": (45.8768, 9.8100),
       "Santuario del Frassino": (45.8760, 9.8040)}
L = [
 # id, titolo, zona, posKey, prezzo, mq, locali, bagni, piano, stato, arredato, lavori, classe, foto, url, fonte, tipo, extra
 dict(id="oneta-a", titolo="Bilocale con terrazzo d'angolo e camino", zona="Scullera", pos="Scullera", prezzo=42000, mq=63, locali=2, bagni=1, piano="rialzato", stato="buono", arredato=True, lavori=0, classe="G",
      foto=C+"663feda3/0-1.jpg", url=IM+"134579621/", note_mq="nel testo dell'annuncio circa 55 m²",
      pro=["Arredato e pronto: tetto nuovo, doppi vetri, caldaia nuova", "Terrazzo d'angolo di circa 23 m² con vista su prati e pinete", "Prezzo al m² tra i più bassi della zona"],
      contro=["Classe energetica G: riscaldamento costoso d'inverno", "Metratura incerta (63 m² nei dati, circa 55 nel testo)"], premium=True),
 dict(id="oneta-b", titolo="Bilocale arredato con camino in pietra", zona="Via dei Pini", pos="Via dei Pini", prezzo=39000, mq=65, locali=2, bagni=1, piano="—", stato="buono", arredato=True, lavori=0, classe=None,
      foto=NE+"eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9kaV82NV9tX2luX3ZpYV9kZWlfcGluaV82XzMwNjAwMDU3ODc4MjU0MDA1MjguanBnIiwiYnJhbmQiOiJuZXN0b3JpYSIsImNvdW50cnkiOiJJVCIsIndpZHRoIjo2NDAsImhlaWdodCI6NDgwfQ==",
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-3060005787825449759",
      pro=["Arredato, con terrazzo", "Camino in pietra: piace molto agli ospiti in montagna", "Circa 600 €/m²: prezzo d'ingresso molto basso"],
      contro=["Online da più di un mese: c'è margine di trattativa ma va capito perché", "Classe energetica non indicata"], premium=True),
 dict(id="oneta-c", titolo="Monolocale in via Alben, abitabile", zona="Scullera", pos="Via Alben", prezzo=23000, mq=36, locali=1, bagni=1, piano="terra", stato="buono", arredato=False, lavori=1500, classe="F",
      foto=C+"662be4c9/0-1.jpg", url=IM+"133240732/",
      pro=["Il prezzo più basso del paese: investimento minimo", "Bagno finestrato con doccia, buone condizioni"],
      contro=["Non arredato: servono circa 7.000 € di arredo per affittarlo", "Piccolo: in montagna si affittano meglio le case per famiglie"]),
 dict(id="oneta-d", titolo="Trilocale arredato con grande terrazzo", zona="Scullera", pos="Scullera", prezzo=53000, mq=70, locali=3, bagni=1, piano="—", stato="buono", arredato=True, lavori=0, classe="E",
      foto=C+"66418329/0-1.jpg", url=IM+"134675479/", note_mq="nel testo dell'annuncio 80 m²",
      pro=["Arredato e pronto da abitare", "Grande terrazzo, circa 900 m di quota", "Classe E, migliore della media della zona"],
      contro=["Metratura da verificare (70 o 80 m²)"], premium=True),
 dict(id="oneta-e", titolo="Trilocale arredato con due balconi, ribassato", zona="Scullera", pos="Scullera", prezzo=35000, mq=50, locali=3, bagni=1, piano="2", stato="buono", arredato=True, lavori=0, classe="G",
      foto=C+"64e9e5ca/0-3.jpg", url=IM+"115437493/",
      pro=["Prezzo già ribassato", "Tetto e facciate rifatti: niente spese condominiali straordinarie in vista", "Arredato, due balconi soleggiati e camino"],
      contro=["Classe G", "Secondo piano: verificare se c'è l'ascensore"], premium=True),
 dict(id="oneta-f", titolo="Villetta a schiera con giardino e box doppio", zona="Via Alben", pos="Via Alben", prezzo=70000, mq=75, locali=2, bagni=1, piano="indipendente", stato="buono", arredato=True, lavori=0, classe=None,
      foto=NE+"eyJrZXkiOiJ2aWxsZXR0YV9hX3NjaGllcmFfaW5fdmVuZGl0YV9kaV83NV9tX2luX3ZpYV9hbGJlbl8xOV8yMzcwMDA1NzkyMjMxNjQ4NTE2LmpwZyIsImJyYW5kIjoibmVzdG9yaWEiLCJjb3VudHJ5IjoiSVQiLCJ3aWR0aCI6NjQwLCJoZWlnaHQiOjQ4MH0=",
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-2370005792231697747", casa=True, note_mq="su un altro portale compare con 48 m²",
      pro=["Casa indipendente con giardino e orto", "Box doppio con lavanderia", "Arredata, camino"],
      contro=["Metratura incerta (75 o 48 m²): cambia molto il prezzo al m²"], premium=True),
 dict(id="oneta-g", titolo="Casa indipendente su quattro livelli, 220 m²", zona="Cantoni d'Oneta", pos="Cantoni", prezzo=82000, mq=220, locali=6, bagni=2, piano="indipendente", stato="da rinfrescare", arredato=False, lavori=6000, classe=None,
      foto=NE+"eyJrZXkiOiJ2aWxsZXR0YV9pbmRpcGVuZGVudGVfaW5fdmVuZGl0YV9kaV8yMjBfbV9pbl92aWFfY2FudG9uaV8xNF82NDkwMDA0NzgwNzQwNDY1MTA3LmpwZyIsImJyYW5kIjoibmVzdG9yaWEiLCJjb3VudHJ5IjoiSVQiLCJ3aWR0aCI6NjQwLCJoZWlnaHQiOjQ4MH0=",
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-6490004780740514338", casa=True, big=True,
      pro=["372 €/m²: costo al metro bassissimo", "Libera su tre lati, tetto manutenuto ogni anno", "Spazio per gruppi o per ricavare due unità"],
      contro=["Molto grande: arredo, riscaldamento e pulizie costano di più", "Lavori probabilmente oltre i ritocchi leggeri: serve un sopralluogo"]),
 dict(id="oneta-h", titolo="Appartamento di 100 m² su un piano con terrazzo panoramico", zona="Via dei Pini", pos="Via dei Pini", prezzo=89000, mq=100, locali=3, bagni=2, piano="1", stato="buono", arredato=False, lavori=0, classe="F",
      foto=C+"660f5a8c/0-1.jpg", url=IM+"132018408/",
      pro=["Tutto su un piano, due bagni", "Terrazzo panoramico e camino"],
      contro=["Non arredato", "Prezzo complessivo alto per i ricavi del paese"]),
 dict(id="oneta-i", titolo="Trilocale in Residenza Borgo Antico, finiture di montagna", zona="Scullera", pos="Santuario del Frassino", prezzo=135000, mq=70, locali=3, bagni=2, piano="—", stato="ottimo", arredato=False, lavori=0, classe=None,
      foto=NE+"eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9kaV83MF9tX2luX3ZpYV9zYW50dWFyaW9fZGVsX2ZyYXNzaW5vXzFfMjk2MDAwNDc4MDc0MDQ3MzQwNi5qcGciLCJicmFuZCI6Im5lc3RvcmlhIiwiY291bnRyeSI6IklUIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODB9",
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-2960004780740522637", lux=True,
      pro=["Finiture curate, pronto da abitare", "Due bagni: adatto a famiglie"],
      contro=["Circa 1.930 €/m²: quasi il doppio della media del paese", "Ricavi del paese troppo bassi per ripagare questo prezzo"]),
 dict(id="oneta-j", titolo="Chalet in pietra e legno su due livelli, arredato", zona="Scullera", pos="Santuario del Frassino", prezzo=137000, mq=75, locali=3, bagni=2, piano="due livelli", stato="ottimo", arredato=True, lavori=0, classe="E",
      foto=C+"65f76dcb/0-2.jpg", url=IM+"131286868/", casa=True, lux=True, note_mq="su un altro portale 80 m²",
      pro=["Lo chalet è il tipo di casa che si affitta meglio in montagna", "Arredato, tre lati liberi, ingresso indipendente"],
      contro=["Prezzo alto per la zona: rendimento basso anche con prezzi a notte più alti"], premium=True),
 dict(id="oneta-k", titolo="Bilocale in Borgo Alpino con giardino privato e portico", zona="Scullera", pos="Santuario del Frassino", prezzo=87000, mq=45, locali=2, bagni=1, piano="terra", stato="ottimo", arredato=False, lavori=0, classe=None,
      foto=NE+"eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9kaV80NV9tX2luX3ZpYV9zYW50dWFyaW9fZGVsX2ZyYXNzaW5vXzQ2XzIzNDAwMDI3Nzk5NjMwMjA1NTIuanBnIiwiYnJhbmQiOiJuZXN0b3JpYSIsImNvdW50cnkiOiJJVCIsIndpZHRoIjo2NDAsImhlaWdodCI6NDgwfQ==",
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-2340002779963069783", lux=True,
      pro=["Giardino privato e portico coperto", "Borgo in pietra molto fotogenico per gli annunci"],
      contro=["Circa 1.930 €/m²", "Piccolo per il prezzo"]),
 dict(id="oneta-l", titolo="Trilocale all'ultimo piano con terrazzo panoramico", zona="Scullera", pos="Scullera", prezzo=43000, mq=75, locali=3, bagni=1, piano="ultimo", stato="buono", arredato=False, lavori=2000, classe=None,
      foto=NE+"eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9hX29uZXRhX2JnXzg0NzAwMDA3ODkyMDgzMjI1MTZpMy5qcGciLCJicmFuZCI6Im5lc3RvcmlhIiwiY291bnRyeSI6IklUIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODB9",
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-8470000789208371747",
      pro=["573 €/m²: grande per il prezzo", "Ultimo piano di una piccola palazzina, terrazzo panoramico"],
      contro=["Non risulta arredato", "Online da più di un mese"]),
 dict(id="oneta-m", titolo="Trilocale verso il Passo di Zambla, libero su tre lati", zona="Verso Zambla", pos="Zambla", prezzo=39000, mq=80, locali=3, bagni=1, piano="2", stato="da rinfrescare", arredato=False, lavori=4000, classe=None,
      foto=NE+"eyJrZXkiOiJhcHBhcnRhbWVudG9faW5fdmVuZGl0YV9hX29uZXRhX2JnXzgyMjAwMDA3ODEwODY3MTgwNTVpMy5qcGciLCJicmFuZCI6Im5lc3RvcmlhIiwiY291bnRyeSI6IklUIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODB9",
      url="https://www.nestoria.it/adclickdetail/nestoria-IT-8220000781086767286",
      pro=["487 €/m²: il più basso tra gli appartamenti", "Vicino ai sentieri del Passo di Zambla e del Monte Alben"],
      contro=["Stato non descritto: ho previsto 4.000 € di lavori", "Non arredato"]),
 dict(id="oneta-n", titolo="Trilocale con balcone, camino e cantina", zona="Scullera", pos="Scullera", prezzo=58000, mq=60, locali=3, bagni=1, piano="2", stato="buono", arredato=False, lavori=0, classe="G",
      foto=C+"664279bf/0-1.jpg", url=IM+"134750813/",
      pro=["Camino e cantina", "Vicino al Passo di Zambla"],
      contro=["Classe G", "Accesso con scala esterna", "Prezzo nella media senza essere arredato"]),
 dict(id="oneta-o", titolo="Trilocale con due bagni in residence con piscina", zona="Oneta", pos="Oneta", prezzo=70000, mq=100, locali=3, bagni=2, piano="2", stato="buono", arredato=True, lavori=0, classe="G",
      foto=C+"663de4e7/0-1.jpg", url=IM+"123606715/", note_mq="nel testo circa 85 m²",
      pro=["Piscina condominiale: rara in montagna e molto cercata d'estate", "Arredato, due bagni, costruzione recente"],
      contro=["Classe G nonostante la costruzione recente", "La piscina alza le spese condominiali (da chiedere)"], premium=True),
 dict(id="oneta-p", titolo="Trilocale all'ultimo piano, bagno rifatto, arredato", zona="Scullera", pos="Scullera", prezzo=47000, mq=55, locali=3, bagni=1, piano="ultimo (3°)", stato="buono", arredato=True, lavori=0, classe="G",
      foto=C+"66395a02/0-1.jpg", url=IM+"134056935/",
      pro=["Bagno già rifatto, arredato", "Due camere matrimoniali: 4-5 posti letto", "Camino e bella vista"],
      contro=["Classe G", "Terzo piano: chiedere se c'è l'ascensore"], premium=True),
 dict(id="oneta-q", titolo="Porzione di casa con ingresso indipendente, sottotetto e cantina", zona="Oneta", pos="Oneta", prezzo=68000, mq=75, locali=3, bagni=1, piano="indipendente", stato="buono", arredato=False, lavori=2000, classe=None,
      foto=C+"661f96e8/0-1.jpg", url=IM+"121747290/", casa=True,
      pro=["Ingresso indipendente, due balconi, sottotetto e cantina", "Prezzo già ribassato"],
      contro=["Non arredato", "In vendita da molto tempo"]),
 dict(id="oneta-r", titolo="Trilocale nuovo mai abitato con giardino privato", zona="Scullera", pos="Via Alben", prezzo=65000, mq=70, locali=3, bagni=1, piano="terra", stato="ottimo", arredato=False, lavori=0, classe="F",
      foto=C+"654da564/0-3.jpg", url=IM+"113695957/",
      pro=["Nuovo, mai abitato: niente lavori", "Giardino privato, camino, cantina, vista panoramica"],
      contro=["Non arredato", "Online da molto tempo: margine di trattativa"]),
 dict(id="oneta-s", titolo="Trivano con balcone tra le pinete", zona="Scullera", pos="Scullera", prezzo=68000, mq=50, locali=3, bagni=1, piano="—", stato="buono", arredato=False, lavori=0, classe=None,
      foto=C+"6582bebc/0-5.jpg", url=IM+"127593940/",
      pro=["Circa 870 m di quota, tra le pinete"],
      contro=["1.360 €/m²: caro rispetto agli appartamenti simili", "Descrizione generica, pochi dettagli"]),
 dict(id="oneta-t", titolo="Bilocale al piano terra in Residenza Borgo Antico", zona="Scullera", pos="Santuario del Frassino", prezzo=55000, mq=50, locali=2, bagni=1, piano="terra", stato="buono", arredato=False, lavori=0, classe="E",
      foto=C+"64b500f3/0-2.jpg", url=IM+"122483132/",
      pro=["Complesso curato in stile villa", "Vista sulla Valle Seriana"],
      contro=["Non arredato", "Online da molto tempo"]),
 dict(id="oneta-u", titolo="Monolocale su due livelli con soppalco e camino", zona="Scullera", pos="Via Alben", prezzo=64000, mq=60, locali=1, bagni=1, piano="due livelli", stato="buono", arredato=False, lavori=0, classe="D",
      foto=C+"662704a8/0-2.jpg", url=IM+"133100318/",
      pro=["Classe D, tra le migliori della zona", "Pensato come casa vacanze"],
      contro=["Un solo locale: meno posti letto separati", "Prezzo alto per un monolocale"]),
 dict(id="oneta-v", titolo="Villino su due livelli, tetto e serramenti nuovi", zona="Oneta paese", pos="Oneta", prezzo=49000, mq=100, locali=3, bagni=1, piano="due livelli", stato="buono", arredato=False, lavori=2000, classe="D",
      foto=C+"66416117/0-1.jpg", url=IM+"134643497/", casa=True,
      pro=["490 €/m² con tetto e serramenti nuovi", "Classe D, terrazzo e cantina"],
      contro=["Non arredato", "In paese, non nella zona turistica di Scullera"]),
 dict(id="oneta-w", titolo="Trilocale arredato con travi a vista (da privato)", zona="Scullera", pos="Scullera", prezzo=80000, mq=80, locali=3, bagni=1, piano="1", stato="buono", arredato=True, lavori=0, classe=None,
      foto=C+"66435288/0-1.jpg", url="https://www.casadaprivato.it/appartamenti/trilocale-arredato-oneta-bg-bergamo-221319", fonte="Casadaprivato.it",
      pro=["Venduto da privato: niente provvigione d'agenzia", "Arredato, travi a vista, camino, grande balcone"],
      contro=["Prezzo sopra la media per la zona"], premium=True),
 dict(id="oneta-x", titolo="Bivano con ingresso indipendente e cortile privato", zona="Scullera", pos="Scullera", prezzo=46000, mq=35, locali=2, bagni=1, piano="terra", stato="buono", arredato=False, lavori=0, classe=None,
      foto=C+"65b3b422/0-8.jpg", url=IM+"128957484/",
      pro=["Ingresso indipendente e cortile", "Adatto anche a chi ha difficoltà motorie", "Stufa a legna"],
      contro=["1.314 €/m²: caro per la metratura", "Non arredato"]),
]
# stagionalità: AirROI Oltre il Colle ago 2024 - lug 2025 (gen..dic)
SEAS = [.194, .19, .134, .30, .274, .157, .286, .503, .319, .156, .348, .23]
mean = sum(SEAS)/12
def mesi(occ): return [round(min(.95, v/mean*occ), 3) for v in SEAS]

out = []
for d in L:
    lat, lng = POS[d["pos"]]
    i = L.index(d); lat += ((i*37) % 11 - 5) * 0.0004; lng += ((i*53) % 13 - 6) * 0.0005
    mq = d["mq"]
    if d.get("big"): adr = 160
    elif d.get("lux") or (d.get("casa") and d.get("premium")): adr = 120
    elif d["locali"] >= 3: adr = 100
    elif d["locali"] == 2: adr = 90
    else: adr = 75
    occ = 0.30 if d.get("premium") else (0.22 if not d["arredato"] and d["stato"] == "da rinfrescare" else 0.25)
    canone = 600 if d.get("big") else 450 if d.get("casa") else {1: 280, 2: 350}.get(d["locali"], 400)
    if d.get("lux") and not d.get("casa"): canone += 50
    casa = d.get("casa")
    im = dict(id=d["id"], titolo=d["titolo"], url=d["url"], fonte=d.get("fonte", "Immobiliare.it / Idealista (via Caasa e Nestoria)"),
        aggiunto="2026-11-20", regione="Lombardia", provincia="BG", comune="Oneta", zona=d["zona"],
        lat=round(lat, 5), lng=round(lng, 5), pos_indicativa=True,
        prezzo=d["prezzo"], mq=mq, locali=d["locali"], bagni=d["bagni"], piano=d["piano"], arredato=d["arredato"],
        stato=d["stato"], lavori=d["lavori"], classe_energetica=d["classe"], foto=d["foto"],
        spese=dict(condominio_mese=0 if casa else 35, imu_anno=500 if casa else 300, stima=True),
        affitti=dict(
          breve=dict(adr=adr, occ=occ, mesi=mesi(occ), stima=True,
                     fonte=f"Stima su dati AirROI di Oltre il Colle (comune confinante, 18 annunci: occupazione 24%, 115 € a notte, ago 2024-lug 2025) e AirDNA (41% e 117 $ a giugno 2026). Prezzo a notte adattato a grandezza e qualità."),
          lungo=dict(canone=canone, stima=True, fonte="Stima prudente per un paese di montagna di circa 700 abitanti: nessun dato OMI di affitto trovato per Oneta. Domanda di affitto lungo limitata: da verificare con le agenzie della valle")),
        giudizio=dict(pro=d["pro"], contro=d["contro"]),
    )
    if d.get("note_mq"): im["note_mq"] = d["note_mq"]
    out.append(im)

# comparabili: stessi segmenti (lusso vs normale), metratura vicina
SEG = {d["id"]: ("lux" if d.get("lux") else "casa" if d.get("casa") else "app") for d in L}
for im in out:
    seg = SEG[im["id"]]
    others = [o for o in out if o["id"] != im["id"] and SEG[o["id"]] == seg and o["mq"] <= 150]
    others.sort(key=lambda o: abs(o["mq"] - im["mq"]))
    omi = dict(medio=848, fonte="zona R1 Oneta, case indipendenti (valore medio riportato da Caasa)") if seg == "casa" else dict(medio=1069, fonte="zona R1 Oneta, appartamenti (valore medio riportato da Caasa)")
    im["valutazione"] = dict(omi=omi,
        comparabili=[dict(titolo=o["titolo"], prezzo=o["prezzo"], mq=o["mq"], url=o["url"], lat=o["lat"], lng=o["lng"], stato=o["stato"]) for o in others[:5]],
        note="Comparabili: altri annunci di Oneta dello stesso tipo e metratura vicina. Prezzo medio richiesto in paese circa 980 €/m² (Caasa).")
ZONA_EVENTI = ["Passo di Zambla e Monte Alben (2.019 m): escursioni, scialpinismo e mountain bike a pochi minuti",
               "Parco Avventura Monte Alben nel bosco del Passo di Zambla: richiamo per famiglie d'estate",
               "Circa 41 km da Bergamo e dall'aeroporto di Orio al Serio",
               "Stagione: picco ad agosto, buoni aprile e novembre; ottobre e marzo i mesi più deboli (dati del comune confinante)"]
FONTI = [dict(titolo="Annunci di Oneta su Caasa (con valori OMI)", url="https://www.caasa.it/bergamo/oneta/appartamento/in-vendita.html"),
         dict(titolo="Annunci di Oneta su Nestoria", url="https://www.nestoria.it/immobiliare/vendita/oneta_bergamo"),
         dict(titolo="AirROI: affitti brevi a Oltre il Colle, mese per mese", url="https://www.airroi.com/airbnb-data/italy/lombardy/oltre-il-colle"),
         dict(titolo="AirDNA: affitti brevi a Oltre il Colle", url="https://www.airdna.co/vacation-rental-data/app/it/lombardia/oltre-il-colle/overview"),
         dict(titolo="AirDNA: affitti brevi a Serina", url="https://www.airdna.co/vacation-rental-data/app/it/lombardia/serina/overview")]
SINT = {"oneta-e": "Il più interessante: arredato, già ribassato, con tetto e facciate rifatti.",
 "oneta-c": "Investimento minimo: rende solo con l'affitto lungo e va arredato.",
 "oneta-l": "Tanto spazio a poco prezzo; servono qualche ritocco e l'arredo.",
 "oneta-b": "Arredato a circa 600 €/m²: ingresso economico, da trattare.",
 "oneta-a": "Arredato e pronto, con impianti rinnovati: scelta solida.",
 "oneta-p": "Pronto, arredato e con bagno nuovo: adatto a famiglie.",
 "oneta-g": "Costo al metro bassissimo, ma è una casa grande: non sono ritocchi leggeri.",
 "oneta-m": "Il più economico al metro, ma lo stato va visto di persona.",
 "oneta-v": "Villino con tetto e serramenti nuovi, in paese."}
for im in out:
    im["eventi"] = ZONA_EVENTI; im["fonti"] = FONTI
    if im["id"] in SINT: im["giudizio"]["sintesi"] = SINT[im["id"]]
json.dump(out, open("tools/oneta.json","w"), ensure_ascii=False)
js = None
pass
print(len(out))
