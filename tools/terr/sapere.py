# KEYSTONE — "osservatorio": quello che si impara dagli annunci, zona per zona (Milano per microzona, fuori Milano per comune).
# uso: python3 tools/terr/sapere.py     (dopo archivio.py / archivio_affitti.py; lo lanciano già i caricamenti)
# Legge  tools/terr/archivio_milano.json.gz (vendite) + esclusi.txt, tools/terr/archivio_affitti.json.gz (affitti) + affitti_esclusi.txt
# Scrive data/sapere.js (per l'app) e tools/terr/SAPERE.md (da leggere prima di valutare un investimento).
# Ogni giro aggiunge una riga a tools/terr/sapere_storia.jsonl (mediane per zona e data): così si vedono i prezzi che si muovono.
import gzip, json, math, os, re
from collections import Counter, defaultdict
from datetime import date
from statistics import median
H = os.path.dirname(os.path.abspath(__file__)); R = os.path.dirname(os.path.dirname(H))
def carica(f): return json.load(gzip.open(os.path.join(H, f), "rt", encoding="utf-8")) if os.path.exists(os.path.join(H, f)) else []
def esclusi(f):
    p = os.path.join(H, f)
    return {l.split(";")[0] for l in open(p, encoding="utf-8") if l.strip() and not l.startswith("#")} if os.path.exists(p) else set()
EV, EA = esclusi("esclusi.txt"), esclusi("affitti_esclusi.txt")
V = [a for a in carica("archivio_milano.json.gz") if str(a["id"]) not in EV and a.get("prezzo") and a.get("mq") and 15 <= a["mq"] <= 600]
A = [a for a in carica("archivio_affitti.json.gz") if str(a["id"]) not in EA and a.get("prezzo") and a.get("mq")]
V = [a for a in V if 300 <= a["prezzo"] / a["mq"] <= 25000]

def zona(a): return ("Milano · " + (a.get("micro") or "?")) if (a.get("comune") or "Milano") == "Milano" else (a.get("comune") or "?")
def q(v, p):
    v = sorted(v); i = (len(v) - 1) * p; f = int(i); return v[f] + (v[min(f + 1, len(v) - 1)] - v[f]) * (i - f)
def med(v, k=3): return round(median(v)) if len(v) >= k else None
def emq(L): return [a["prezzo"] / a["mq"] for a in L]
def taglia(a): return "s" if a["mq"] < 50 else "m" if a["mq"] < 85 else "l"
ST = {"Da ristrutturare": "R", "Buono": "B", "Ottimo": "O", "Nuovo": "N"}
def st(a): return next((v for k, v in ST.items() if (a.get("stato") or "").startswith(k)), "")
def txt(a): return " ".join((a.get("feat") or []) + [a.get("titolo") or "", a.get("caption") or "", a.get("desc") or ""]).lower()
def pianoN(a):
    m = re.match(r"\d+", str(a.get("pianoA") or "")); return int(m.group()) if m else (0 if re.match(r"[TR]", str(a.get("pianoA") or "")) else None)
def gg(d):
    try: return date.fromisoformat(str(d)[:10])
    except Exception: return None

ZV, ZA = defaultdict(list), defaultdict(list)
for a in V: ZV[zona(a)].append(a)
for a in A: ZA[zona(a)].append(a)
oggi = max([gg(a.get("letto")) for a in V + A if gg(a.get("letto"))] or [date.today()])

def scheda(z):
    v, f = ZV.get(z, []), ZA.get(z, [])
    s = {"z": z, "nv": len(v), "na": len(f)}
    pts = [(a["lat"], a["lon"]) for a in v + f if a.get("lat")]
    if pts: s["c"] = [round(sum(p[0] for p in pts) / len(pts), 4), round(sum(p[1] for p in pts) / len(pts), 4)]
    if len(v) >= 5:
        e = emq(v); s["v"] = [round(q(e, .25)), round(median(e)), round(q(e, .75))]
        s["vt"] = {t: med(emq([a for a in v if taglia(a) == t])) for t in "sml"}
        s["vs"] = {k: med(emq([a for a in v if st(a) == k])) for k in "RBON"}
        b2 = [a["prezzo"] for a in v if str(a.get("locali")) == "2"]; s["bilo"] = med(b2)
        s["mq"] = round(median(a["mq"] for a in v))
        s["priv"] = round(100 * sum(1 for a in v if a.get("priv")) / len(v))
        s["nuovo"] = round(100 * sum(1 for a in v if st(a) == "N" or a.get("progetto")) / len(v))
        s["tip"] = Counter(a.get("tip") or "?" for a in v).most_common(3)
        # premi: ascensore ai piani alti, terrazzo, box, giardino (rispetto a chi non li ha, stessa zona)
        def premio(cond):
            si, no = emq([a for a in v if cond(a)]), emq([a for a in v if not cond(a)])
            return round(100 * (median(si) / median(no) - 1)) if len(si) >= 5 and len(no) >= 5 else None
        s["premi"] = {"terrazzo": premio(lambda a: "terrazz" in txt(a)), "box": premio(lambda a: re.search(r"\bbox\b|garage|autorimessa", txt(a)) is not None),
                      "giardino": premio(lambda a: "giardino" in txt(a)),
                      "alto_asc": premio(lambda a: (pianoN(a) or 0) >= 4 and a.get("asc")), "terra": premio(lambda a: pianoN(a) == 0)}
        # mercato: giorni online, ribassi, venduti/ritirati (spariti alla rilettura)
        gi = [(gg(a.get("letto")) - gg(a.get("primo"))).days for a in v if gg(a.get("primo")) and gg(a.get("letto"))]
        s["giorni"] = med(gi, 10)
        rib = [a for a in v if a.get("storico") and a["storico"][-1][1] < a["storico"][0][1]]
        s["ribassi"] = round(100 * len(rib) / len(v), 1) if any(a.get("storico") for a in v) else None
    if len(f) >= 5:
        e = emq(f); s["a"] = [round(q(e, .25), 1), round(median(e), 1), round(q(e, .75), 1)]
        s["at"] = {t: (round(median(x), 1) if len(x := emq([a for a in f if taglia(a) == t])) >= 3 else None) for t in "sml"}
        arr = emq([a for a in f if re.search(r"arredat", txt(a)) and not re.search(r"non arredat", txt(a))]); vuo = emq([a for a in f if not re.search(r"arredat", txt(a)) or re.search(r"non arredat", txt(a))])
        s["arredo"] = round(100 * (median(arr) / median(vuo) - 1)) if len(arr) >= 5 and len(vuo) >= 5 else None
        b2 = [a["prezzo"] for a in f if str(a.get("locali")) == "2"]; s["bilo_aff"] = med(b2)
    if s.get("v") and s.get("a"):
        s["resa"] = round(1200 * s["a"][1] / s["v"][1], 1)                                       # rendita lorda % (mediane della zona)
        s["resa_t"] = {t: round(1200 * s["at"][t] / s["vt"][t], 1) for t in "sml" if s["at"].get(t) and s["vt"].get(t)}
        s["anni"] = round(s["v"][1] / (12 * s["a"][1]), 1)                                       # anni di affitto per ripagare il prezzo
        s["tensione"] = round(len(f) / len(v), 2)                                                  # affitti offerti per ogni casa in vendita
    if s.get("vs") and s["vs"].get("R") and (s["vs"].get("O") or s["vs"].get("B")):
        ok = s["vs"].get("O") or s["vs"]["B"]; lav = 1100 if z.startswith("Milano") else 800  # costo lavori indicativo €/m²
        s["valore_lavori"] = round(ok - s["vs"]["R"] - lav)                                          # margine €/m² comprando da ristrutturare e rifacendo
    return s

Z = sorted(set(ZV) | set(ZA))
S = {z: scheda(z) for z in Z}
# vicini: zone entro 2 km (Milano) o 12 km (comuni); sconto della zona sui vicini a parità di affitto
def km(a, b): return 6371 * math.hypot(math.radians(b[0] - a[0]), math.radians(b[1] - a[1]) * math.cos(math.radians(a[0])))
for z, s in S.items():
    if not s.get("c") or not s.get("v"): continue
    r = 2 if z.startswith("Milano") else 12
    vic = [w for w, t in S.items() if w != z and t.get("c") and t.get("v") and km(s["c"], t["c"]) <= r and w.startswith("Milano") == z.startswith("Milano")]
    if len(vic) >= 2:
        mv = median(S[w]["v"][1] for w in vic); s["vs_vicini"] = round(100 * (s["v"][1] / mv - 1)); s["vicini"] = vic[:8]
        ra = [S[w]["a"][1] for w in vic if S[w].get("a")]
        if s.get("a") and len(ra) >= 2: s["as_vicini"] = round(100 * (s["a"][1] / median(ra) - 1))

json.dump({k: v for k, v in S.items()}, open(os.path.join(R, "data", "sapere.json.tmp"), "w"), ensure_ascii=False)
os.replace(os.path.join(R, "data", "sapere.json.tmp"), os.path.join(H, "sapere.json"))
open(os.path.join(R, "data", "sapere.js"), "w", encoding="utf-8").write("// KEYSTONE — osservatorio per zona (generato da tools/terr/sapere.py)\nconst SAPERE = " +
    json.dumps({"agg": str(oggi), "zone": S}, ensure_ascii=False, separators=(",", ":")) + ";\n")
with open(os.path.join(H, "sapere_storia.jsonl"), "a", encoding="utf-8") as fo:
    fo.write(json.dumps({"d": str(oggi), "z": {z: [s.get("v", [0, 0])[1], s.get("a", [0, 0, 0])[1], s["nv"], s["na"]] for z, s in S.items()}}, ensure_ascii=False) + "\n")

# ---------- SAPERE.md: cose imparate, scritte per esteso ----------
def eur(x): return f"{x:,.0f}".replace(",", ".") + " €" if x is not None else "—"
def pc(x): return (f"+{x}%" if x > 0 else f"{x}%") if x is not None else "—"
L = [f"# Osservatorio Keystone — aggiornato al {oggi.strftime('%d/%m/%Y')}", "",
     f"Dagli annunci letti su Immobiliare.it: {len(V):,} in vendita e {len(A):,} in affitto".replace(",", ".") + ", affidabili (aste, quote, stanze, truffe e doppioni già tolti).",
     "Prezzi e canoni sono quelli CHIESTI: si tratta di solito un 5–10% sotto la vendita e un 5–10% sotto l'affitto.", "",
     "Legenda: €/m² vendita (25°–mediana–75°), affitto €/m² al mese, resa = rendita lorda delle mediane, anni = prezzo/affitto annuo,",
     "tensione = affitti offerti ogni 100 case in vendita (bassa = pochi affitti sul mercato, domanda forte), lavori = margine €/m² comprando da ristrutturare e rifacendo.", ""]
con = [s for s in S.values() if s.get("resa") and s["nv"] >= 15 and s["na"] >= 8]
def tabella(titolo, righe, n=15):
    L.extend([f"## {titolo}", "", "| zona | vendita €/m² | affitto €/m² | resa | bilocale | anni |", "|---|---|---|---|---|---|"])
    for s in righe[:n]: L.append(f"| {s['z']} | {s['v'][1]:,} | {s['a'][1]} | {s['resa']}% | {eur(s.get('bilo'))} | {s.get('anni')} |".replace(",", "."))
    L.append("")
tabella("Rese lorde più alte (zone con abbastanza annunci)", sorted(con, key=lambda s: -s["resa"]))
tabella("Rese più basse (si compra per patrimonio, non per reddito)", sorted(con, key=lambda s: s["resa"]), 10)
sv = [s for s in S.values() if s.get("vs_vicini") is not None and s["nv"] >= 15 and s.get("as_vicini") is not None]
op = sorted([s for s in sv if s["vs_vicini"] <= -8 and s["as_vicini"] >= -5], key=lambda s: s["vs_vicini"] - s["as_vicini"])
if op:
    L.extend(["## Zone che costano meno delle vicine ma si affittano quasi uguale", "Possibili occasioni: verificare il perché (strada, palazzi, servizi) prima di fidarsi.", ""])
    for s in op[:15]: L.append(f"- **{s['z']}**: vendita {pc(s['vs_vicini'])} rispetto a {', '.join(x.replace('Milano · ', '') for x in s['vicini'][:4])}; affitto {pc(s['as_vicini'])}.")
    L.append("")
va = sorted([s for s in S.values() if s.get("valore_lavori") is not None and s["nv"] >= 20], key=lambda s: -s["valore_lavori"])
if va:
    L.extend(["## Dove conviene comprare da ristrutturare", "Differenza tra ristrutturato e da ristrutturare, meno i lavori (1.100 €/m² a Milano, 800 fuori).", ""])
    for s in va[:12]: L.append(f"- {s['z']}: da ristrutturare {eur(s['vs']['R'])}/m², finito {eur(s['vs'].get('O') or s['vs']['B'])}/m² → margine {eur(s['valore_lavori'])}/m²")
    L.append("")
# regole generali imparate (mediane delle differenze zona per zona, così non pesa la zona)
def regola(chiave, sotto=None):
    x = [s[chiave][sotto] if sotto else s[chiave] for s in S.values() if (s.get(chiave) if not sotto else (s.get(chiave) or {}).get(sotto)) is not None]
    return (round(median(x)), len(x)) if len(x) >= 5 else (None, 0)
L.extend(["## Regole imparate (mediana delle zone)", ""])
for nome, (k, sk) in {"Arredato, affitto in più": ("arredo", None), "Terrazzo, prezzo in più": ("premi", "terrazzo"), "Box, prezzo in più": ("premi", "box"),
                      "Giardino, prezzo in più": ("premi", "giardino"), "Piano alto (4°+) con ascensore": ("premi", "alto_asc"), "Piano terra": ("premi", "terra")}.items():
    m, n = regola(k, sk)
    if m is not None: L.append(f"- {nome}: {pc(m)} (su {n} zone)")
rt = [s["resa_t"] for s in S.values() if s.get("resa_t") and "s" in s["resa_t"] and "m" in s["resa_t"]]
if len(rt) >= 5: L.append(f"- Resa dei piccoli (<50 m²) rispetto ai medi (50–85): {pc(round(median(100 * (r['s'] / r['m'] - 1) for r in rt)))} (su {len(rt)} zone)")
rl = [s["resa_t"] for s in S.values() if s.get("resa_t") and "l" in s["resa_t"] and "m" in s["resa_t"]]
if len(rl) >= 5: L.append(f"- Resa dei grandi (≥85 m²) rispetto ai medi: {pc(round(median(100 * (r['l'] / r['m'] - 1) for r in rl)))} (su {len(rl)} zone)")
L.append("")
L.extend(["## Tutte le zone", "", "| zona | vendite | affitti | vendita €/m² (25–50–75) | affitto €/m² | resa | tensione | priv. | nuovo | lavori |", "|---|---|---|---|---|---|---|---|---|---|"])
for z in sorted(S, key=lambda z: (not z.startswith("Milano"), z)):
    s = S[z]
    if s["nv"] < 5 and s["na"] < 5: continue
    L.append(f"| {z} | {s['nv']} | {s['na']} | {'–'.join(f'{x:,}' for x in s['v']).replace(',', '.') if s.get('v') else '—'} | {s['a'][1] if s.get('a') else '—'} | {str(s['resa']) + '%' if s.get('resa') else '—'} | {round(100 * s['tensione']) if s.get('tensione') is not None else '—'} | {str(s['priv']) + '%' if s.get('priv') is not None else '—'} | {str(s['nuovo']) + '%' if s.get('nuovo') is not None else '—'} | {eur(s.get('valore_lavori')) if s.get('valore_lavori') is not None else '—'} |")
open(os.path.join(H, "SAPERE.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")

# ---------- regole generali: ogni annuncio confrontato con la mediana della SUA zona (così conta il tipo di casa, non il quartiere) ----------
def indici(L, Zmap, min_z=8):
    mz = {z: median(emq(x)) for z, x in Zmap.items() if len(x) >= min_z}
    return [(a, a["prezzo"] / a["mq"] / mz[zona(a)]) for a in L if zona(a) in mz]
def piano_cl(a):
    n = pianoN(a)
    if n is None: return None
    if n == 0: return "terra / rialzato"
    if n <= 2: return "1°–2°"
    return ("3° e oltre con ascensore" if a.get("asc") else "3° e oltre SENZA ascensore")
CRIT = {"tipologia": lambda a: a.get("tip") or None, "locali": lambda a: (str(a.get("locali")) + " locali") if a.get("locali") else None,
        "taglia": lambda a: {"s": "sotto 50 m²", "m": "50–85 m²", "l": "85 m² e oltre"}[taglia(a)], "stato": lambda a: a.get("stato") or None,
        "piano": piano_cl, "riscaldamento": lambda a: a.get("risc") or None, "bagni": lambda a: ("2+ bagni" if str(a.get("bagni")).startswith(("2", "3")) else "1 bagno") if a.get("bagni") else None,
        "venditore": lambda a: "privato" if a.get("priv") else "agenzia"}
EXTRA = {"terrazzo": r"terrazz", "balcone": r"balcon", "box / garage": r"\bbox\b|garage|autorimessa", "posto auto": r"posto auto", "giardino": r"giardino",
         "cantina": r"cantin", "portineria": r"portier|portineria|custode", "arredato": r"\barredat", "aria condizionata": r"condizionat|climatizzat",
         "doppia esposizione": r"doppia esposizione|esposizione doppia|doppio affaccio", "esposizione interna": r"esposizione interna", "fibra": r"fibra ottica",
         "piscina": r"piscina", "domotica": r"domotic", "classe A": r"classe a\b|classe energetica a"}
def blocco(titolo, I, L_out):
    if len(I) < 200: return
    L_out.extend([f"### {titolo} ({len(I):,} annunci)".replace(",", "."), ""])
    for nome, f in CRIT.items():
        g = defaultdict(list)
        for a, i in I:
            k = f(a)
            if k: g[k].append(i)
        righe = sorted([(k, median(v), len(v)) for k, v in g.items() if len(v) >= 30], key=lambda x: -x[1])
        if len(righe) >= 2: L_out.append(f"- **{nome}**: " + " · ".join(f"{k} {pc(round(100 * (m - 1)))} ({n})" for k, m, n in righe[:7]))
    ex = []
    for nome, rx in EXTRA.items():
        si = [i for a, i in I if re.search(rx, txt(a))]; no = [i for a, i in I if not re.search(rx, txt(a))]
        if len(si) >= 30 and len(no) >= 30: ex.append((nome, round(100 * (median(si) / median(no) - 1)), len(si)))
    if ex: L_out.append("- **dotazioni** (chi ce l'ha rispetto a chi no): " + " · ".join(f"{k} {pc(m)} ({n})" for k, m, n in sorted(ex, key=lambda x: -x[1])))
    L_out.append("")
G = ["## Cosa vale di più, in generale", "Ogni annuncio è confrontato con la mediana €/m² della sua zona: +10% vuol dire che quel tipo di casa chiede il 10% in più delle altre nello stesso quartiere. Tra parentesi quanti annunci.", ""]
for etichetta, filtro in (("Milano", lambda a: (a.get("comune") or "Milano") == "Milano"), ("fuori Milano", lambda a: (a.get("comune") or "Milano") != "Milano")):
    blocco(f"Vendita · {etichetta}", [x for x in indici(V, ZV) if filtro(x[0])], G)
    blocco(f"Affitto · {etichetta}", [x for x in indici(A, ZA, 5) if filtro(x[0])], G)
# cosa va: annunci spariti alla rilettura della zona (venduti, affittati o ritirati) e giorni online, per tipo di casa
def va_di_piu(L, titolo):
    ult = {}
    for a in L:
        z, l = (a.get("zonaLetta") or "").split("#")[0], gg(a.get("letto"))
        if z and l and (z not in ult or l > ult[z]): ult[z] = l
    zl = lambda a: (a.get("zonaLetta") or "").split("#")[0]
    riletti = [a for a in L if gg(a.get("primo")) and ult.get(zl(a)) and ult[zl(a)] > gg(a["primo"])]
    if len(riletti) < 300: G.extend([f"### Cosa va di più · {titolo}", "Serve almeno una rilettura delle zone: si capirà quali annunci spariscono prima (venduti o affittati) dai prossimi giri.", ""]); return
    G.extend([f"### Cosa va di più · {titolo} ({len(riletti):,} annunci riletti)".replace(",", "."), ""])
    for nome in ("tipologia", "taglia", "stato", "piano", "locali"):
        g = defaultdict(list)
        for a in riletti:
            k = CRIT[nome](a)
            if k: g[k].append(1 if gg(a.get("letto")) < ult[zl(a)] else 0)
        r = sorted([(k, sum(v) / len(v), len(v)) for k, v in g.items() if len(v) >= 30], key=lambda x: -x[1])
        if r: G.append(f"- **{nome}** (spariti tra una lettura e l'altra): " + " · ".join(f"{k} {round(100 * p)}%" for k, p, n in r[:7]))
    G.append("")
va_di_piu(V, "vendita"); va_di_piu(A, "affitto")
i = L.index("## Tutte le zone"); L[i:i] = G
open(os.path.join(H, "SAPERE.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")

print(len(S), "zone nell'osservatorio;", len(con), "con resa calcolabile;", len(op), "possibili occasioni;", len(va), "zone con dati sul da ristrutturare")
