set -e
cd /home/claude/invest17
N=$1
python3 tools/terr/ricevi.py /tmp/kx/lotto$N.json 20
python3 tools/terr/archivio.py /tmp/kx/lotto$N.json | tail -1
(cd tools/terr && python3 gen.py | tail -1)
python3 - <<PY
import json,glob
Z=set()
for f in glob.glob('/tmp/kx/lotto*.json'):
    for a in json.load(open(f)): Z.add(a['zonaLetta'])
p='tools/terr/coda_milano.json'; d=json.load(open(p)); n=0
for c in d['coda']:
    slug='C:'+c['path'].strip('/').split('/')[-1]
    if c['stato']!='fatto' and (c['n'] in Z or slug in Z): c['stato']='fatto'; c['data']='2026-11-22'; n+=1
json.dump(d,open(p,'w'),ensure_ascii=False,indent=1)
print('zone segnate',n,'restano',sum(c['stato']!='fatto' for c in d['coda']))
PY
node -e "const fs=require('fs');var TERR;eval(fs.readFileSync('data/territorio.js','utf8').replace(/^const TERR/m,'TERR'));console.log('micro complete',Object.keys(TERR.milano.fasce.micro).length)"
python3 tools/terr/sapere.py | tail -1
V=$(date +%y%m%d%H%M); sed -i -E "s#<script src=\"((js|data)/[a-z_0-9]+\.js)(\?v=[0-9]+)?\"#<script src=\"\1?v=$V\"#g" index.html
git add -A; git commit -qm "$2

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01THeJG22e4oER9c2t8GAaho"; git pull -q --rebase; git push -q 2>&1 | grep -v "^remote" || true
