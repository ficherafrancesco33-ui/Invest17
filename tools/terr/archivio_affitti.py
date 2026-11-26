# KEYSTONE — archivio degli annunci d'AFFITTO (Immobiliare.it) di Milano, hinterland e comuni degli investimenti.
# uso: python3 tools/terr/archivio_affitti.py <lotto.json>   (senza file: ricalcola solo le statistiche)
# Tiene solo gli annunci "seri" per calcolare i canoni di affitto lungo:
#   - scarta stanze/posti letto, affitti brevi o turistici, rent to buy, subentri, uso ufficio/negozio, richieste ("cerco casa")
#   - scarta canoni o metrature fuori scala e i €/m² al mese impossibili
#   - privati: servono almeno 4 foto e una descrizione vera (>= 150 caratteri), niente segni di truffa
#     (proprietario all'estero, chiavi per posta, pagamento anticipato…) e niente canoni sotto il 60% della mediana della zona
#   - doppioni (stesso indirizzo, m² e canone): resta quello dell'agenzia
# Scrive tools/terr/archivio_affitti.json.gz, tools/terr/affitti_esclusi.txt e data/affitti.js (mediane €/m² per zona).
import gzip, json, os, re, sys
from collections import Counter, defaultdict
from statistics import median
H = os.path.dirname(os.path.abspath(__file__)); R = os.path.dirname(os.path.dirname(H))
ARC = os.path.join(H, "archivio_affitti.json.gz")

arc = {}
if os.path.exists(ARC):
    for a in json.load(gzip.open(ARC, "rt", encoding="utf-8")): arc[str(a["id"])] = a
nuovi = json.load(open(sys.argv[1], encoding="utf-8")) if len(sys.argv) > 1 else []
for a in nuovi:
    if a.get("contr") != "A" and not str(a.get("zonaLetta", "")).startswith("A:"): continue
    a["zonaLetta"] = str(a.get("zonaLetta", "")).split("#")[0]
    k = str(a["id"]); old = arc.get(k)
    if old and old.get("prezzo") and a.get("prezzo") and old["prezzo"] != a["prezzo"]:
        a["storico"] = (old.get("storico") or [[old.get("letto"), old["prezzo"]]]) + [[a.get("letto"), a["prezzo"]]]
    elif old and old.get("storico"): a["storico"] = old["storico"]
    a["primo"] = (old or {}).get("primo") or a.get("letto")
    arc[k] = a
json.dump(list(arc.values()), gzip.open(ARC, "wt", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))

NO = [(r"posto letto|posti letto|stanza (singola|doppia)|camera (singola|doppia)|affittasi (stanza|camera)|camere? in (appartamento|condivisione)|\bcoliving\b|co-living", "stanza / posto letto"),
      (r"affitt[oi] brev|per notte|a notte|settimanal|uso turistic|casa vacanz|airbnb|booking\.com|\bcin\b", "affitto breve / turistico"),
      (r"rent to buy|riscatto", "rent to buy"),
      (r"subentr|cessione (del )?contratto", "subentro"),
      (r"\bcerco\b|\bcerchiamo\b|cercasi", "richiesta, non offerta"),
      (r"\bnegozio\b|\bufficio\b|uso ufficio|studio professionale|laboratorio|\bmagazzino\b|locale commerciale|uso commerciale", "uso non abitativo"),
      (r"\basta\b|tribunale", "asta")]
TRUFFA = r"sono all'estero|vivo all'estero|mi trovo all'estero|trasferit[oa] all'estero|chiavi (per|tramite) (posta|corriere)|spedi(sco|re) (le )?chiavi|pagamento anticipato|anticip(o|are) (il )?(deposito|canone) (prima|senza)|western union|moneygram|ricarica postepay|scrivetemi (solo )?(su|via) (whatsapp|e-?mail)|airbnb (pay|garantisce)"
def testo(a): return " ".join([a.get("titolo") or "", a.get("caption") or "", a.get("desc") or ""]).lower()
def milano(a): return (a.get("comune") or "") == "Milano"
def motivo(a):
    t = testo(a); testa = (" ".join([a.get("titolo") or "", a.get("caption") or ""]) + " " + (a.get("desc") or "")[:160]).lower()
    if a.get("cat") and a["cat"] not in ("Residenziale", "Nuove costruzioni"): return "non residenziale"
    for rx, m in NO:
        if re.search(rx, testa if m in ("uso non abitativo", "affitto breve / turistico") else t): return m
    p, mq = a.get("prezzo"), a.get("mq")
    if not p or not mq: return "senza canone o m²"
    if p < 200 or p > 20000: return "canone fuori scala"
    if mq < 18 or mq > 400: return "m² fuori scala"
    e = p / mq; lo, hi = (8, 60) if milano(a) else (2.5, 40)
    if e < lo or e > hi: return "€/m² impossibile"
    if a.get("priv"):
        if re.search(TRUFFA, t): return "privato: segni di truffa"
        d = a.get("desc") or ""
        if d and len(d) < 150: return "privato: descrizione troppo corta"
        if (a.get("nfoto") or 0) < (4 if d else 5): return "privato: troppe poche foto"   # nella lista degli affitti la descrizione spesso manca: servono più foto
    return None

def zona(a): return ("M:" + (a.get("micro") or "")) if milano(a) else ("C:" + (a.get("comune") or ""))
esc, buoni = {}, {}
for k, a in arc.items():
    m = motivo(a)
    if m: esc[k] = m
    else: buoni[k] = a
# doppioni: stesso indirizzo + m² + canone → tengo l'agenzia (o il primo)
vis = {}
for k, a in sorted(buoni.items(), key=lambda x: x[1].get("priv") or 0):
    chiave = ((a.get("via") or "").lower().strip(), a.get("mq"), a.get("prezzo"))
    if chiave[0] and chiave in vis: esc[k] = "doppione"; continue
    vis[chiave] = k
buoni = {k: a for k, a in buoni.items() if k not in esc}
# privati troppo sotto la zona (spesso truffe): sotto il 60% della mediana €/m² degli annunci d'agenzia della stessa zona
zag = defaultdict(list)
for a in buoni.values():
    if not a.get("priv"): zag[zona(a)].append(a["prezzo"] / a["mq"])
for k, a in list(buoni.items()):
    v = zag.get(zona(a))
    if a.get("priv") and v and len(v) >= 5 and a["prezzo"] / a["mq"] < 0.6 * median(v): esc[k] = "privato: canone troppo basso per la zona"; del buoni[k]

def tag(a):
    t = testo(a) + " " + " ".join(a.get("feat") or []).lower(); s = ""
    if re.search(r"\barredat|ammobiliat", t) and not re.search(r"non arredat|vuoto", t): s += "a"
    if re.search(r"transitori", t): s += "t"
    if re.search(r"4 ?\+ ?4", t): s += "4"
    if re.search(r"3 ?\+ ?2|concordat", t): s += "3"
    if re.search(r"student", t): s += "s"
    if re.search(r"cedolare", t): s += "c"
    if re.search(r"spese (condominiali )?incluse|tutto incluso|comprensiv[oi] (di|delle) spese", t): s += "i"
    return s
def q(v, p):
    v = sorted(v); i = (len(v) - 1) * p; f = int(i); return v[f] + (v[min(f + 1, len(v) - 1)] - v[f]) * (i - f)
def stat(L):
    e = [a["prezzo"] / a["mq"] for a in L]
    o = {"n": len(L), "med": round(median(e), 1), "p25": round(q(e, .25), 1), "p75": round(q(e, .75), 1), "canone": int(median(a["prezzo"] for a in L))}
    for nome, f in (("s", lambda a: a["mq"] < 50), ("m", lambda a: 50 <= a["mq"] < 85), ("l", lambda a: a["mq"] >= 85), ("arr", lambda a: "a" in a["_t"]), ("vuoto", lambda a: "a" not in a["_t"])):
        x = [a["prezzo"] / a["mq"] for a in L if f(a)]
        if len(x) >= 3: o[nome] = [round(median(x), 1), len(x)]
    return o
Z = defaultdict(list)
for a in buoni.values(): a["_t"] = tag(a); Z[zona(a)].append(a)
out = {"agg": max([a.get("letto") or "" for a in arc.values()] or [""]), "nota": "Affitti lunghi da Immobiliare.it: €/m² al mese (mediana, 25° e 75° percentile), canone mediano; s <50 m², m 50–85, l ≥85; arr arredati",
       "milano": {k[2:]: stat(v) for k, v in sorted(Z.items()) if k.startswith("M:") and len(v) >= 3},
       "comuni": {k[2:]: stat(v) for k, v in sorted(Z.items()) if k.startswith("C:") and len(v) >= 3}}
mi = [a for a in buoni.values() if milano(a)]
if len(mi) >= 3: out["milano_tutta"] = stat(mi)
open(os.path.join(R, "data", "affitti.js"), "w", encoding="utf-8").write("const AFF = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n")
open(os.path.join(H, "affitti_esclusi.txt"), "w", encoding="utf-8").write("# affitti esclusi: id;motivo\n" + "\n".join(f"{k};{m}" for k, m in esc.items()) + "\n")
print(len(arc), "affitti in archivio;", len(buoni), "affidabili;", len(esc), "esclusi:", dict(Counter(esc.values()).most_common()), ";",
      len(out["milano"]), "zone di Milano,", len(out["comuni"]), "comuni con almeno 3 annunci")

# canone vicino a ogni investimento: affitti affidabili entro 1 km (poi 2, 4) di taglia simile (0,6–1,6 volte i m²), almeno 6
import math
def dist(a, b, c, d): return 6371000 * math.hypot(math.radians(c - a), math.radians(d - b) * math.cos(math.radians(a)))
INV = os.path.join(os.path.dirname(H), "auto_raw.json"); vic = {}
if os.path.exists(INV):
    for x in json.load(open(INV, encoding="utf-8"))["annunci"]:
        if x.get("lat") is None or not x.get("mq"): continue
        sim = [a for a in buoni.values() if a.get("lat") and 0.6 * x["mq"] <= a["mq"] <= 1.6 * x["mq"]]
        for r in (1000, 2000, 4000):
            L = [a for a in sim if dist(x["lat"], x["lon"], a["lat"], a["lon"]) <= r]
            if len(L) >= 6:
                e = [a["prezzo"] / a["mq"] for a in L]
                vic[str(x["id"])] = {"e": round(median(e), 1), "n": len(L), "r": r, "p25": round(q(e, .25), 1), "p75": round(q(e, .75), 1), "agg": out["agg"]}
                break
json.dump(vic, open(os.path.join(H, "affitti_vicini.json"), "w"), ensure_ascii=False, indent=0)
print(len(vic), "investimenti con affitti vicini")
