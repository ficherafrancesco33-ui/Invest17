#!/usr/bin/env python3
"""Genera data/territorio.js: prezzi per comune, affitti brevi per località, Milano zona per zona.
Uso: python3 tools/terr/gen.py   (dalla cartella del progetto)"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from milano import MEDIA, ZONE, METRO, METRO_COL, POI, MICRO

H = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(H, "..", ".."))
USD = 1.10  # dollari per euro (cambio di metà novembre 2026)

PROV = {  # sigla: nome, codice ISTAT (per i confini openpolis)
 "MI": ("Milano", 15), "MB": ("Monza e Brianza", 108), "CO": ("Como", 13), "LC": ("Lecco", 97), "VA": ("Varese", 12),
 "BG": ("Bergamo", 16), "BS": ("Brescia", 17), "PV": ("Pavia", 18), "LO": ("Lodi", 98), "CR": ("Cremona", 19),
 "SO": ("Sondrio", 14), "NO": ("Novara", 3), "VB": ("Verbano-Cusio-Ossola", 103), "VC": ("Vercelli", 2), "AL": ("Alessandria", 6),
 "GE": ("Genova", 10), "SV": ("Savona", 9), "SP": ("La Spezia", 11), "PC": ("Piacenza", 33), "VR": ("Verona", 23),
}

# coordinate indicative di capoluoghi e paesi principali (le altre arrivano dai confini openpolis caricati nell'app)
COORD = {
 "Milano": (45.4642, 9.19), "Monza": (45.5845, 9.2744), "Como": (45.8081, 9.0852), "Lecco": (45.8566, 9.3977), "Varese": (45.8206, 8.8251),
 "Bergamo": (45.6983, 9.6773), "Brescia": (45.5416, 10.2118), "Pavia": (45.1847, 9.1582), "Lodi": (45.3144, 9.5034), "Cremona": (45.1332, 10.0227),
 "Sondrio": (46.1699, 9.8715), "Novara": (45.4469, 8.6222), "Verbania": (45.9214, 8.5519), "Vercelli": (45.3256, 8.4231), "Alessandria": (44.9128, 8.615),
 "Genova": (44.4056, 8.9463), "Savona": (44.3081, 8.4811), "La Spezia": (44.1025, 9.8241), "Piacenza": (45.0526, 9.693), "Verona": (45.4384, 10.9916),
 "Vigevano": (45.3167, 8.8586), "Voghera": (44.9919, 9.0094), "Mortara": (45.2507, 8.7376), "Crema": (45.3633, 9.6858), "Gallarate": (45.6603, 8.7917),
 "Busto Arsizio": (45.6119, 8.85), "Legnano": (45.5953, 8.9172), "Saronno": (45.6253, 9.0333), "Rho": (45.5297, 9.0408), "Treviglio": (45.5214, 9.5928),
 "Tortona": (44.8942, 8.8656), "Novi Ligure": (44.7611, 8.7869), "Casale Monferrato": (45.1336, 8.4528), "Abbiategrasso": (45.3986, 8.9183),
 "Binasco": (45.3311, 9.0989), "Rozzano": (45.3803, 9.1569), "Zibido San Giacomo": (45.3600, 9.1100), "Cardano al Campo": (45.6497, 8.7697),
 "Lonate Pozzolo": (45.5986, 8.7522), "Ferno": (45.6158, 8.7558), "Luino": (46.0019, 8.7442), "Sesto Calende": (45.7264, 8.6331),
 "Laveno-Mombello": (45.9097, 8.6194), "Codogno": (45.1608, 9.7044), "Casalpusterlengo": (45.1778, 9.6503), "Stradella": (45.0767, 9.3011),
 "Broni": (45.0619, 9.2614), "Borgomanero": (45.6989, 8.4633), "Sarzana": (44.1133, 9.9606), "Albenga": (44.0497, 8.2139),
 "Fiorenzuola d'Arda": (44.9264, 9.9097), "Castel San Giovanni": (45.0597, 9.4369), "Chiavenna": (46.3214, 9.4), "Morbegno": (46.1356, 9.5664),
 "Sesto San Giovanni": (45.5338, 9.2336), "Cinisello Balsamo": (45.5581, 9.2147), "San Donato Milanese": (45.4103, 9.2681), "Segrate": (45.4908, 9.2953),
 "Desio": (45.6186, 9.2075), "Seregno": (45.6503, 9.2047), "Vimercate": (45.6156, 9.3681), "Cantù": (45.7383, 9.1294), "Erba": (45.8111, 9.2272),
 "Dalmine": (45.6497, 9.6036), "Seriate": (45.685, 9.7233), "Lovere": (45.8128, 10.0697), "Iseo": (45.6594, 10.0497), "Montichiari": (45.4158, 10.3917),
 "Lonato del Garda": (45.4611, 10.4842), "Garlasco": (45.1964, 8.9247), "Melegnano": (45.3586, 9.3247), "Magenta": (45.4647, 8.8836),
}


def num(x):
    x = x.strip()
    return None if x in ("-", "") else float(x)


def prezzi():
    out, prov, reg, fonte = [], None, None, None
    fonti, regioni = {}, {}
    for line in open(os.path.join(H, "raw_prezzi.txt"), encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("@"):
            prov, reg, fonte = line[1:].split("|")
            fonti[prov] = fonte
            regioni[prov] = reg
            continue
        n, v, y, a = line.rsplit(",", 3)
        out.append([n, prov, num(v), num(y), num(a)])
    return out, (fonti, regioni)


def brevi():
    out = []
    for line in open(os.path.join(H, "raw_str.txt"), encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        n, p, ann, ric, occ, adr, val, tipo, lat, lon, fonte = line.split("|")
        occ, adr, ann = float(occ) / 100, float(adr), (None if ann == "-" else int(ann))
        ric = None if ric == "-" else float(ric)
        if val == "USDm":
            adr, ric = adr / USD, ric * 12 / USD
        elif val == "USDa":
            adr, ric = adr / USD, ric / USD
        stima = ric is None
        if stima:  # ricavo medio per annuncio ≈ 76% di prezzo × occupazione × 365 (rapporto medio dei dati AirROI lombardi)
            ric = adr * occ * 365 * 0.76
        out.append(dict(n=n, p=p, ann=ann, ric=round(ric), occ=round(occ, 3), adr=round(adr), tipo=tipo,
                        lat=float(lat), lon=float(lon), fonte=fonte + (" · ricavo stimato" if stima else "")))
    return out


def coord_miei():
    f = os.path.join(ROOT, "data", "immobili.js").replace("\\", "/")
    r = subprocess.run(["node", "-e", "eval(require('fs').readFileSync('" + f + "','utf8')+';globalThis.M=MIEI');"
                        "console.log(JSON.stringify(M.map(m=>[m.comune,m.lat,m.lng])))"], capture_output=True, text=True)
    d = {}
    if r.returncode == 0:
        for c, la, lo in json.loads(r.stdout):
            if c and la and lo:
                d.setdefault(c, []).append((la, lo))
    return {c: (round(sum(p[0] for p in v) / len(v), 4), round(sum(p[1] for p in v) / len(v), 4)) for c, v in d.items()}


def main():
    com, (fonti, regioni) = prezzi()
    st = brevi()
    co = dict(COORD)
    for s in st:
        co.setdefault(s["n"], (s["lat"], s["lon"]))
    for c, p in coord_miei().items():
        co.setdefault(c, p)
    nomi = {c[0] for c in com}
    coord = {k: v for k, v in co.items() if k in nomi}
    data = dict(
        aggiornato="2026-11-20", cambio_usd=USD,
        fonti=dict(prezzi="immobiliare.it, pagine provinciali 'mercato immobiliare' (prezzi medi richiesti negli annunci); VCO e Vercelli: mercato-immobiliare.info",
                   brevi="AirROI (pagine regionali, 12 mesi a ott 2026); Somma Lombardo e Pellio Intelvi: AirDNA",
                   confini="openpolis/geojson-italy (confini ISTAT dei comuni)"),
        prov={k: dict(nome=v[0], istat=v[1], reg=regioni.get(k, ""), fonte=fonti.get(k, "")) for k, v in PROV.items()},
        comuni=com, coord=coord, brevi=st,
        milano=dict(media=MEDIA,
                    zone=[dict(n=z[0], v=z[1], y=z[2], a=z[3], lat=z[4], lon=z[5], tag=z[6].split(","), nota=z[7]) for z in ZONE],
                    metro={k: [[s[0], s[1], s[2]] for s in v] for k, v in METRO.items()}, metro_col=METRO_COL,
                    poi=[list(p) for p in POI],
                    micro=[dict(z=m[0], n=m[1], v=m[2], a=m[3], lat=m[4], lon=m[5]) for m in MICRO]))
    s = "// INVEST17 — analisi del territorio. File generato da tools/terr/gen.py: non modificare a mano.\n"
    s += "const TERR = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
    open(os.path.join(ROOT, "data", "territorio.js"), "w", encoding="utf-8").write(s)
    print(len(com), "comuni,", len(coord), "con coordinate,", len(st), "località affitti brevi,", len(ZONE), "zone di Milano")


if __name__ == "__main__":
    main()
