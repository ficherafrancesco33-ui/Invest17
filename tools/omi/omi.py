# KEYSTONE — quotazioni OMI (Agenzia delle Entrate) → data/omi.js
# Fonte: forniture OMI scaricate da Imma (area riservata), file VALORI e ZONE del semestre.
# uso: python3 tools/omi/omi.py   (aggiornare SEM e i nomi dei file a ogni semestre)
import csv, json, os, re, unicodedata, subprocess
H = os.path.dirname(os.path.abspath(__file__)); R = lambda p: os.path.join(H, "..", "..", p)
SEM, FV, FZ = "2026/1", "VALORI_20261.csv", "ZONE_20261.csv"
REGIONI = {"LOMBARDIA", "PIEMONTE", "LIGURIA", "VENETO", "EMILIA-ROMAGNA", "VALLE D'AOSTA", "TRENTINO-ALTO ADIGE", "FRIULI-VENEZIA GIULIA"}
VUOTE = {"D", "DI", "DEL", "DELLA", "DELLE", "DEI", "DEGLI", "DE", "LA", "LO", "IL", "LE", "SUL", "SULLA", "SUI", "AL", "ALLA", "NEL", "NELLA", "IN", "E", "ED"}
SANTI = {"SAN": "S", "SANTO": "S", "SANTA": "S", "STA": "S", "SANT": "S"}
def nz(x):
    w = re.split(r"[^A-Z0-9]+", unicodedata.normalize("NFD", x.upper()).encode("ascii", "ignore").decode())
    return "".join(SANTI.get(t, t) for t in w if t and t not in VUOTE)
num = lambda x: float(x.replace(",", ".")) if x.strip() else None

rows = list(csv.reader(open(os.path.join(H, FV), encoding="latin-1"), delimiter=";"))[2:]
zone = list(csv.reader(open(os.path.join(H, FZ), encoding="latin-1"), delimiter=";"))[2:]
descr = {(r[7], r[10]): r[9].strip("'").strip() for r in zone if len(r) > 10}

# comuni dell'app (nome|provincia)
terr = json.loads(subprocess.check_output(["node", "-e", 'eval(require("fs").readFileSync("' + R("data/territorio.js") + '","utf8")+";globalThis.T=TERR");console.log(JSON.stringify(T.comuni.map(c=>[c[0],c[1]])))']))
PROV_OMI = {"MB": "MI"}   # l'OMI tiene i comuni della Brianza sotto Milano
voglio = {(nz(n), PROV_OMI.get(p, p)): f"{n}|{p}" for n, p in terr}

out = {}
for r in rows:
    if len(r) < 21 or r[1].split("/")[0] not in REGIONI or r[11] not in ("20", "21", "19"): continue
    k = voglio.get((nz(r[7]), r[2]))
    if not k: continue
    z = out.setdefault(k, {}).setdefault(r[9], {"f": r[8], "d": descr.get((r[7], r[9]), "")})
    tip = {"20": "c", "21": "e", "19": "s"}[r[11]] + ("o" if r[13] == "OTTIMO" else "n" if r[13] == "NORMALE" else "x")
    z[tip] = [int(num(r[15]) or 0), int(num(r[16]) or 0), num(r[18]), num(r[19])]

# microzone di Milano (Immobiliare) → zona OMI (scelta a mano sui confini delle zone OMI 2026/1)
MI = {
 "B12": "Duomo|San Babila|Missori|Borgogna - Largo Augusto|Scala - Manzoni|Quadrilatero della Moda",
 "B13": "Carrobbio|Guastalla",
 "B15": "Brera|Lanza",
 "B16": "Sant'Ambrogio|Cadorna - Castello",
 "B17": "Arco della Pace|Arena|Vincenzo Monti",
 "B18": "Turati|Moscova|Porta Venezia|Palestro|Garibaldi - Corso Como",
 "B19": "Porta Vittoria|Piave - Tricolore",
 "B20": "Porta Romana - Medaglie d'Oro|Quadronno - Crocetta",
 "B21": "Ticinese|Corso Genova|San Vittore",
 "C12": "Buenos Aires|Morgagni|Repubblica",
 "C13": "City Life|Portello - Parco Vittoria|Monte Rosa - Lotto",
 "C14": "Porta Nuova|Isola",
 "C15": "Centrale|Melchiorre Gioia|Zara",
 "C16": "Cenisio|Farini|Paolo Sarpi|Ghisolfa - Mac Mahon",
 "C17": "Sempione|Pagano|Washington|Vercelli - Wagner|Amendola - Buonarroti|De Angeli|Frua|Dezza",
 "C18": "Solari|Ascanio Sforza|Navigli - Darsena|Corso San Gottardo",
 "C19": "Bocconi|Pezzotti - Meda|Lodi - Brenta",
 "C20": "Indipendenza|Cadore|Montenero|Plebisciti - Susa",
 "D10": "Udine|Quartiere Feltre|Parco Lambro",
 "D12": "Argonne - Corsica|Città Studi|Casoretto|Martini - Insubria",
 "D13": "Lambrate|Rubattino|Ortica",
 "D16": "Corvetto|Bologna - Sulmona|Molise - Cuoco",
 "D18": "Vigentino - Fatima|Chiesa Rossa|Cermenate - Abbiategrasso",
 "D20": "Ripamonti - Fondazione Prada",
 "D21": "Barona|Famagosta|Tre Castelli - Faenza|Cantalupa - San Paolo",
 "D24": "Bande Nere|Gambara|Piazzale Siena|Piazza Napoli|Tripoli - Soderini",
 "D25": "Lorenteggio|Inganni|Bisceglie|Giambellino|Primaticcio|Quarto Cagnino",
 "D28": "San Siro|QT8|Monte Stella|San Carlo",
 "D31": "Bovisa|Dergano",
 "D32": "Affori|Bovisasca|Comasina",
 "D33": "Niguarda|Bignami - Ponale|Bruzzano|Ca' Granda|Prato Centenaro",
 "D34": "Bicocca|Greco - Segnano",
 "D35": "Crescenzago|Gorla|Quartiere Adriano|Precotto|Villa San Giovanni|Cimiano|Cascina Gobba|Ponte Nuovo",
 "D36": "Maggiolina|Parco Trotter|Pasteur|Rovereto|Turro|Istria|Cascina dei Pomi",
 "D37": "Quartiere Forlanini|Viale Ungheria - Mecenate|Ponte Lambro|Monluè",
 "D38": "Santa Giulia|Rogoredo|Quintosole - Chiaravalle",   # R2 (Chiaravalle) non ha quotazioni residenziali: si usa la zona vicina
 "D39": "Uptown - MIND - Cascina Merlata",
 "D40": "Certosa|Musocco",
 "E5": "Baggio|Quinto Romano|Muggiano|Quartiere Olmi",
 "E6": "Gallaratese|Trenno|Figino",
 "E7": "Gratosoglio",
 "E8": "Quarto Oggiaro|Roserio|Vialba",
}
mi = {m: z for z, s in MI.items() for m in s.split("|")}
micro = json.loads(subprocess.check_output(["node", "-e", 'eval(require("fs").readFileSync("' + R("data/territorio.js") + '","utf8")+";globalThis.T=TERR");console.log(JSON.stringify(T.milano.micro.map(m=>m.n)))']))
manca = [m for m in micro if m not in mi]
if manca: print("microzone senza zona OMI:", manca)
zm = out.get("Milano|MI", {})
assert all(z in zm for z in MI), [z for z in MI if z not in zm]

s = ("// KEYSTONE — quotazioni OMI dell'Agenzia delle Entrate, semestre " + SEM + ". Generato da tools/omi/omi.py: non modificare a mano.\n"
     "// OMI[\"Comune|PR\"][zona] = { f: fascia (B centro, C semicentro, D periferia, E suburbio, R rurale), d: descrizione,\n"
     "//   cn/co: abitazioni civili normale/ottimo, en/eo: economiche, sn/so: signorili = [vendita min, max €/m², affitto min, max €/m² al mese] }\n"
     "const OMI_SEM = " + json.dumps(SEM) + ";\nconst OMI = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n"
     "const OMI_MI = " + json.dumps(mi, ensure_ascii=False, separators=(",", ":")) + ";\n")
open(R("data/omi.js"), "w", encoding="utf-8").write(s)
nord = [k for k in voglio.values() if k not in out]
print("comuni dell'app senza OMI:", len(nord), nord[:15])
print(len(out), "comuni con OMI;", sum(len(v) for v in out.values()), "zone;", len(s) // 1024, "KB")
