# KEYSTONE — archivio completo degli annunci di Milano (con descrizione) → righe per gen.py + esclusioni
# uso: python3 tools/terr/archivio.py <file json scaricato dal Chrome>
# Il json è una lista di annunci (campi: id, prezzo, mq, locali, bagni, piano, pianoA, asc, stato, tip, cat, lat, lon, via, micro,
# macro, priv, ag, titolo, caption, desc, feat, risc, foto, nfoto, nuovo, lusso, progetto, zonaLetta, letto).
# Scrive:
#   tools/terr/archivio_milano.json.gz   archivio permanente (unito a quello esistente: per id vince la lettura più recente)
#   tools/terr/raw_immobiliare_milano.txt   righe aggiornate (sostituisce quelle con lo stesso id, aggiunge le nuove)
#   tools/terr/esclusi.txt               annunci da non usare (quote, aste, nude proprietà… lette nella descrizione)
#   tools/terr/privati_ok.txt            privati con descrizione letta e pulita
import gzip, json, os, re, sys
H = os.path.dirname(os.path.abspath(__file__))
ARC = os.path.join(H, "archivio_milano.json.gz")

nuovi = json.load(open(sys.argv[1], encoding="utf-8"))
arc = {}
if os.path.exists(ARC):
    for a in json.load(gzip.open(ARC, "rt", encoding="utf-8")): arc[str(a["id"])] = a
for a in nuovi:
    k = str(a["id"]); old = arc.get(k)
    if old and old.get("prezzo") and a.get("prezzo") and old["prezzo"] != a["prezzo"]:
        a["storico"] = (old.get("storico") or [[old.get("letto"), old["prezzo"]]]) + [[a.get("letto"), a["prezzo"]]]   # ribassi e rialzi
    elif old and old.get("storico"): a["storico"] = old["storico"]
    a["primo"] = (old or {}).get("primo") or a.get("letto")
    arc[k] = a
json.dump(list(arc.values()), gzip.open(ARC, "wt", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))

# parole che rendono un annuncio inutilizzabile come comparabile o come privato da proporre
NO = [(r"\bquot[ae] (del|di|pari|indivisa)|\b(il|al) 50 ?% (della|di|dell)|comproprietà|in comproprieta|metà (dell'immobile|indivisa)", "quota / comproprietà"),
      (r"nuda propriet", "nuda proprietà"), (r"usufrutt", "usufrutto"),
      (r"\basta\b|aste giudiziarie|tribunale|procedura esecutiva|offerta minima", "asta"),
      (r"rent to buy|affitto con riscatto|riscatto", "affitto con riscatto"),
      (r"cessione (del )?contratto|cessione di compromesso", "cessione di contratto"),
      (r"rendita vitalizia|vitalizio", "rendita vitalizia"),
      (r"posto letto|stanza singola|camera singola in", "stanza / posto letto"),
      (r"\bnegozio\b|\bufficio\b|laboratorio|\bmagazzino\b|locale commerciale|uso commerciale", "uso non abitativo"),
      (r"già venduto|immobile venduto|in trattativa avanzata|sotto offerta", "venduto / in trattativa")]
def motivo(a):
    t = " ".join([a.get("titolo", ""), a.get("caption", ""), a.get("desc", "")]).lower()
    if a.get("progetto"): return "progetto / nuova costruzione"
    if a.get("cat") and a["cat"] not in ("Residenziale", "Nuove costruzioni"): return "non residenziale"
    for rx, m in NO:
        if m == "uso non abitativo":   # solo se è l'oggetto della vendita (titolo o inizio della descrizione), non se è citato nei dintorni
            if re.search(rx, (a.get("titolo", "") + " " + a.get("caption", "") + " " + a.get("desc", "")[:120]).lower()): return m
        elif re.search(rx, t): return m
    return None

ST = {"Nuovo": "N", "Ottimo": "O", "Buono": "B", "Da ristrutturare": "R"}
EX = [("balcon", "b"), ("terrazz", "t"), ("cantina", "c"), ("arredat", "a"), ("box", "g"), ("giardino", "j"), ("portier", "p")]
righe, esc, pok = {}, {}, []
for k, a in arc.items():
    m = motivo(a)
    if m: esc[k] = m; continue
    if not (a.get("prezzo") and a.get("mq") and a.get("lat")): continue
    st = next((v for kk, v in ST.items() if (a.get("stato") or "").startswith(kk)), "")
    g = " ".join(a.get("feat") or []).lower()
    ex = "".join(c for w, c in EX if w in g)
    piano = (a.get("pianoA") or "").replace(",", "/")
    righe[k] = ";".join(str(x) for x in [k, a["prezzo"], a["mq"], a.get("locali") or "", a.get("bagni") or "", piano, a.get("asc") or 0, st, a.get("tip") or "",
                                         f'{a["lat"]:.5f}', f'{a["lon"]:.5f}', (a.get("via") or "").replace(";", ","), a.get("micro") or "", "Milano", a.get("priv") or 0, ex])
    if a.get("priv"): pok.append(k)

# raw: sostituisco le righe con id presente nell'archivio, tengo le altre (zone non rilette)
F = os.path.join(H, "raw_immobiliare_milano.txt")
L = open(F, encoding="utf-8").read().split("\n")
testa = [l for l in L if l.startswith("#")]
resto = [l for l in L if l and not l.startswith("#") and l.split(";")[0] not in arc]
open(F, "w", encoding="utf-8").write("\n".join(testa + resto + list(righe.values())) + "\n")
E = os.path.join(H, "esclusi.txt")
vecchi = [l for l in open(E, encoding="utf-8").read().split("\n") if l and not l.startswith("#") and l.split(";")[0] not in esc]
open(E, "w", encoding="utf-8").write("# annunci di Milano esclusi dopo aver letto la descrizione: id;motivo\n" + "\n".join(vecchi + [f"{k};{m}" for k, m in esc.items()]) + "\n")
open(os.path.join(H, "privati_ok.txt"), "w", encoding="utf-8").write("# privati di Milano con descrizione letta e pulita: id\n" + "\n".join(pok) + "\n")
from collections import Counter
print(len(arc), "annunci in archivio;", len(righe), "usabili;", len(esc), "esclusi:", dict(Counter(esc.values())), ";", len(pok), "privati puliti;", len(resto), "righe vecchie tenute")
