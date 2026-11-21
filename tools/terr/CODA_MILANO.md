# Coda di lettura Milano e province (Immobiliare, vendita)

Obiettivo di Imma: avere nell'archivio tutti gli annunci in vendita di Milano (microzona per microzona) e poi dei comuni
delle province, allargandosi a macchia d'olio dalla zona Sud (Porta Romana, Vigentino, Rozzano, San Donato).
Servono alle valutazioni (comparabili e fasce di prezzo) e agli annunci dei privati.

## Dove sta lo stato
`tools/terr/coda_milano.json`: `coda` = zone in ordine (`stato`: `da` | `fatto` | `bloccato`), `fatti` = zone già lette.
Prima le microzone di Milano città (per distanza da Porta Romana), poi i comuni MI ad anelli (1 = confinanti), poi MB.

## Un giro (circa 40 minuti di lettura)
1. Chrome (Claude in Chrome): `tabs_context_mcp`, poi una scheda su `https://www.immobiliare.it/` (o una già aperta su immobiliare.it).
   Se compare un captcha o una pagina di blocco: fermati subito e chiudi il giro (niente tentativi per aggirarlo).
2. Incolla `tools/terr/lettore.js` nella scheda (javascript_tool), poi
   `await __giro(<le prime zone "da" della coda, come [{n, path}]>, 40)` — si può lanciare senza await e controllare `__PROG` ogni 40 s.
   Si ferma da solo a 403/429/captcha (`__BLOCCO`).
3. Portare fuori i dati (le chiamate a get_page_text con più di 49 KB finiscono in un file e non riempiono la conversazione):
   - `await __prepara()` → `{annunci, parti}`
   - apri una seconda scheda su `https://www.immobiliare.it/robots.txt`, incolla il blocco `__PARTI` (in fondo a lettore.js),
     poi per k = 0 … parti-1: `__show(k)` e `get_page_text` sulla seconda scheda.
   - `python3 tools/terr/ricevi.py /tmp/lotto.json 90` ricompone e controlla che non manchi nessuna parte;
     poi nella prima scheda `__consegnati()`.
   - Se il collegamento al Mac funziona (cartella Download collegata) si può anche scaricare il json e usare device_stage_files.
4. `python3 tools/terr/archivio.py /tmp/lotto.json` (unisce all'archivio, esclude aste, quote, nude proprietà, non residenziali…)
   e `cd tools/terr && python3 gen.py`.
5. In `coda_milano.json` segna `fatto` (con `data` e numero letti) le zone finite; `bloccato` e la data se si è fermato a metà
   (al giro dopo si riparte da quella).
6. Aggiorna la versione degli script in index.html, commit e push su main (messaggio in italiano: zone lette, annunci, archivio).
7. Notifica breve a Imma solo a fine giro: "Keystone Milano: lette N zone (…), +X annunci; archivio a Y. Prossime: …".
   Se Immobiliare ha bloccato, dillo in una riga ("riparto al prossimo giro").

## Regole
- Una pagina ogni 1,5–2,5 s, una zona alla volta; mai più di un giro in parallelo.
- Mai aggirare blocchi o captcha. Mai idealista.
- Le descrizioni si leggono (archivio.py scarta aste, quote, nude proprietà, usufrutto, rent to buy, posti letto, locali commerciali).
