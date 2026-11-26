# KEYSTONE — riletture: quando le code sono finite si rileggono le zone lette da più tempo (vendite e affitti alternati),
# così l'osservatorio vede cosa sparisce (venduto/affittato), i ribassi di prezzo e i giorni online.
# uso: python3 tools/terr/riletture.py [N]   → scrive tools/terr/coda_riletture.js (window.__CODAR, le N zone più vecchie, default 60)
#      python3 tools/terr/riletture.py --segna lotto.json  → aggiorna la data di rilettura delle zone presenti nel lotto
import json, os, sys
from datetime import date
H = os.path.dirname(os.path.abspath(__file__))
def carica(f): return json.load(open(os.path.join(H, f), encoding="utf-8"))
def salva(f, d): json.dump(d, open(os.path.join(H, f), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
V, A = carica("coda_milano.json"), carica("coda_affitti.json")
def nome(c, aff):
    if aff: return c["n"]
    return c["n"] if c.get("tipo") == "micro" else "C:" + c["path"].strip("/").split("/")[-1]
if len(sys.argv) > 2 and sys.argv[1] == "--segna":
    Z = {a.get("zonaLetta", "").split("#")[0] for a in json.load(open(sys.argv[2], encoding="utf-8"))}
    n = 0
    for d, aff in ((V, False), (A, True)):
        for c in d["coda"]:
            if nome(c, aff) in Z or (not aff and c["n"] in Z): c["riletta"] = str(date.today()); n += 1
    salva("coda_milano.json", V); salva("coda_affitti.json", A); print("riletture segnate", n); sys.exit()
N = int(sys.argv[1]) if len(sys.argv) > 1 else 60
L = [(c.get("riletta") or c.get("data") or "2026-11-01", nome(c, False), c["path"]) for c in V["coda"]] + \
    [(c.get("riletta") or c.get("data") or "2026-11-01", c["n"], c["path"]) for c in A["coda"]]
L.sort()
open(os.path.join(H, "coda_riletture.js"), "w", encoding="utf-8").write("window.__CODAR = " + json.dumps([{"n": n + "#R", "path": p} for _, n, p in L[:N]], ensure_ascii=False) + ";\n")
print(len(L[:N]), "zone da rileggere, la più vecchia letta il", L[0][0])
