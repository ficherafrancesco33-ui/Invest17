# KEYSTONE — coefficienti delle valutazioni ricavati dagli annunci di Milano (regressione edonica)
# log(€/m²) = effetto microzona + stato + piano/ascensore + accessori + taglio + bagni
# uso: python3 tools/terr/coeff.py   →   data/coeff.js
import json, math, os, re
import numpy as np

H = os.path.dirname(os.path.abspath(__file__))
esc = {l.split(";")[0] for l in open(os.path.join(H, "esclusi.txt"), encoding="utf-8") if l and not l.startswith("#")}
CASA = re.compile(r"villa|terratetto|casale|rustico|palazzo|edificio|capannone|negozio|ufficio|box|loft|attico|mansarda", re.I)

def piano(p):
    t = [x.strip() for x in re.split(r"[/,]", p or "") if x.strip()]
    if not t: return None
    v = []
    for x in t:
        if x in ("T",): v.append(0)
        elif x == "R": v.append(0.5)
        elif x == "S": v.append(-0.5)
        elif x.isdigit(): v.append(int(x))
    return max(v) if v else None

rows = []
seen = set()
for l in open(os.path.join(H, "raw_immobiliare_milano.txt"), encoding="utf-8"):
    if not l.strip() or l.startswith("#"): continue
    f = l.rstrip("\n").split(";")
    if len(f) < 16: continue
    i, p, mq, loc, bag, pi, asc, st, tip, lat, lon, via, mic, com, priv, ex = f[:16]
    if i in esc or i in seen or not mic or st not in "NOBR" or not st: continue
    try: p, mq = float(p), float(mq)
    except ValueError: continue
    if not (25 <= mq <= 250) or CASA.search(tip): continue
    e = p / mq
    if not (1500 <= e <= 20000): continue
    n = piano(pi)
    if n is None: continue
    seen.add(i)
    rows.append(dict(e=e, mq=mq, mic=mic, st=st, n=n, asc=asc == "1", ex=ex, bag=int(bag) if bag.strip().isdigit() else None, loc=loc))

# variabili
mics = sorted({r["mic"] for r in rows if sum(1 for x in rows if x["mic"] == r["mic"]) >= 8})
rows = [r for r in rows if r["mic"] in mics]
FEAT = ["N", "B", "R",                                # stato rispetto a ottimo
        "pT", "pR", "p1", "p3a", "p4a", "p6a", "p2n", "p3n", "p4n",   # piano (rif. 2° con ascensore)
        "b", "t", "c", "g", "j", "p", "d", "i",       # accessori
        "lmq", "bag2"]
def x(r):
    n, a = r["n"], r["asc"]
    v = {"N": r["st"] == "N", "B": r["st"] == "B", "R": r["st"] == "R",
         "pT": n <= 0, "pR": n == 0.5, "p1": n == 1,
         "p3a": a and n == 3, "p4a": a and 4 <= n <= 5, "p6a": a and n >= 6,
         "p2n": (not a) and n == 2, "p3n": (not a) and n == 3, "p4n": (not a) and n >= 4,
         "lmq": math.log(r["mq"] / 70), "bag2": (r["bag"] or 1) >= 2}
    for c in "btcgjpdi": v[c] = c in r["ex"]
    return [float(v[k]) for k in FEAT]
X = np.array([x(r) + [1.0 if r["mic"] == m else 0.0 for m in mics] for r in rows])
y = np.log(np.array([r["e"] for r in rows]))
# ridge leggero sulle caratteristiche (non sulle microzone), poi stima robusta (2 passaggi: tolgo i residui oltre 2,5 sigma)
lam = np.diag([3.0] * len(FEAT) + [0.0] * len(mics))
keep = np.ones(len(y), bool)
for _ in range(2):
    A, b = X[keep], y[keep]
    beta = np.linalg.solve(A.T @ A + lam, A.T @ b)
    res = y - X @ beta; s = res[keep].std()
    keep = np.abs(res) < 2.5 * s
coef = {k: round(float(beta[j]), 4) for j, k in enumerate(FEAT)}
# errore standard approssimato
A = X[keep]; s2 = float(((y - X @ beta)[keep] ** 2).mean())
cov = s2 * np.linalg.inv(A.T @ A + lam)
se = {k: round(float(math.sqrt(cov[j, j])), 4) for j, k in enumerate(FEAT)}
ott = float(np.median(np.exp(beta[len(FEAT):])))      # €/m² tipico in ottimo, 2° piano con ascensore, 70 m²
out = {"n": int(keep.sum()), "sigma": round(math.sqrt(s2), 4), "coef": coef, "se": se,
       "buonoEur": round(ott * (1 - math.exp(coef["B"]))), "ottimoTipico": round(ott)}
open(os.path.join(H, "..", "..", "data", "coeff.js"), "w", encoding="utf-8").write(
    "/* coefficienti ricavati dagli annunci di Milano (tools/terr/coeff.py) */\nconst COEFF = " + json.dumps(out, ensure_ascii=False) + ";\n")
print(json.dumps(out, indent=1, ensure_ascii=False))
