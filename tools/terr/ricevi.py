# KEYSTONE — ricompone gli annunci letti con tools/terr/lettore.js e passati con get_page_text (parti "P<k>:...:FINE")
# uso: python3 tools/terr/ricevi.py <file_uscita.json> [minuti]   (cerca le parti nei risultati degli strumenti degli ultimi N minuti, default 90)
import json, glob, re, base64, gzip, os, sys, time
out = sys.argv[1]; lim = time.time() - 60 * float(sys.argv[2] if len(sys.argv) > 2 else 90)
parti = {}; tutte = []
for f in glob.glob('/tmp/claude-tool-results/**/*.json', recursive=True) + glob.glob('/tmp/claude-tool-results/**/*.txt', recursive=True):
    if os.path.getmtime(f) < lim: continue
    try:
        t = open(f, encoding='utf-8').read()
        try: d = json.loads(t); t = '\n'.join(x.get('text', '') for x in d) if isinstance(d, list) else str(d)
        except Exception: pass
    except Exception: continue
    for m in re.finditer(r'P(\d+):([A-Za-z0-9+/=]+):FINE', t):
        k = int(m.group(1)); mt = os.path.getmtime(f)
        tutte.append((k, mt, m.group(2)))
# l'ultimo lotto comincia dall'ultima parte 0: tengo solo le parti lette da lì in poi
t0 = max((mt for k, mt, _ in tutte if k == 0), default=0)
for k, mt, d in sorted(tutte, key=lambda x: x[1]):
    if mt >= t0 - 1: parti[k] = (mt, d)
ks = sorted(parti); print('parti trovate:', ks)
if ks != list(range(len(ks))): sys.exit('manca qualche parte')
L = json.loads(gzip.decompress(base64.b64decode(''.join(parti[k][1] for k in ks))))
json.dump(L, open(out, 'w'), ensure_ascii=False); print(len(L), 'annunci in', out)
