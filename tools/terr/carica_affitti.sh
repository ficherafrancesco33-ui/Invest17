#!/bin/bash
# KEYSTONE — carica un lotto di AFFITTI portato fuori da Chrome: uso  bash tools/terr/carica_affitti.sh N "messaggio"
set -e
cd "$(dirname "$0")/../.."
N=$1; mkdir -p /tmp/kx
python3 tools/terr/ricevi.py /tmp/kx/aff$N.json 20
python3 tools/terr/archivio_affitti.py /tmp/kx/aff$N.json | tail -1
node tools/auto_imm.js | tail -1
python3 - <<PY
import json,glob
Z=set()
for f in glob.glob('/tmp/kx/aff*.json'):
    for a in json.load(open(f)): Z.add(a['zonaLetta'])
p='tools/terr/coda_affitti.json'; d=json.load(open(p)); n=0
for c in d['coda']:
    if c['stato']!='fatto' and c['n'] in Z: c['stato']='fatto'; c['data']='$(date +%F)'; n+=1
json.dump(d,open(p,'w'),ensure_ascii=False,indent=1)
print('zone segnate',n,'restano',sum(c['stato']!='fatto' for c in d['coda']))
PY
python3 tools/terr/sapere.py | tail -1
V=$(date +%y%m%d%H%M); sed -i -E "s#<script src=\"((js|data)/[a-z_0-9]+\.js)(\?v=[0-9]+)?\"#<script src=\"\1?v=$V\"#g" index.html
git add -A; git commit -qm "$2

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01THeJG22e4oER9c2t8GAaho"; git pull -q --rebase; git push -q 2>&1 | grep -v "^remote" || true
