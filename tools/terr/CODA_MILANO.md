# Coda di lettura Milano e province (Immobiliare, vendita)

Obiettivo di Imma: avere nell'archivio tutti gli annunci in vendita di Milano (microzona per microzona) e poi dei comuni
delle province, allargandosi a macchia d'olio dalla zona Sud (Porta Romana, Vigentino, Rozzano, San Donato).
Servono alle valutazioni (comparabili e fasce di prezzo) e agli annunci dei privati.

## Dove sta lo stato
`tools/terr/coda_milano.json`: `coda` = zone in ordine (`stato`: `da` | `fatto` | `bloccato`), `fatti` = zone già lette.
Prima le microzone di Milano città (per distanza da Porta Romana), poi i comuni MI ad anelli (1 = confinanti), poi MB.

## Un giro (circa 40 minuti di lettura)
0. La scheda Immobiliare può avere già in memoria letture di un giro precedente (`window.__ARC`, `__PROG`, `__INVIATI`):
   incollando lettore.js non si perdono. Controlla `__PROG` (zone già lette) e porta fuori prima quello che non è stato consegnato.
1. Chrome (Claude in Chrome): `tabs_context_mcp`, poi una scheda su `https://www.immobiliare.it/` (o una già aperta su immobiliare.it).
   Se compare un captcha o una pagina di blocco: fermati subito e chiudi il giro (niente tentativi per aggirarlo).
2. Incolla `tools/terr/lettore.js` nella scheda (javascript_tool), poi
   `await __giro(<le prime zone "da" della coda, come [{n, path}]>, 40)` — si può lanciare senza await e controllare `__PROG` ogni 40 s.
   Si ferma da solo a 403/429/captcha (`__BLOCCO`).
3. Portare fuori i dati (le chiamate a get_page_text con più di 49 KB finiscono in un file e non riempiono la conversazione):
   - `await __prepara()` → `{annunci, parti}`
   - apri una seconda scheda su `https://www.immobiliare.it/robots.txt`, incolla il blocco `__PARTI` (in fondo a lettore.js),
     poi per k = 0 … parti-1: `__show(k)` e `get_page_text` sulla seconda scheda. Più veloce: `browser_batch` con 8 coppie
     (javascript_tool `__show(k)` + get_page_text) per chiamata: l'output finisce in un file e ricevi.py lo legge.
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

## Affitti (dal 22/11/2026, hanno la precedenza sulle vendite che mancano in Brianza)
Coda: `tools/terr/coda_affitti.json` (prima i 27 comuni degli investimenti, poi le 103 microzone di Milano, poi i 65 comuni già letti in vendita).
Stesso giro: incolla `lettore.js` e `coda_affitti.js` (crea `window.__CODAA`), poi `__giro(__CODAA, 90)` senza await e `__stato()` ogni 40 s.
Le zone d'affitto si chiamano `A:<microzona>` o `A:C:<slug comune>`: `__giro` salta quelle già finite.
Portare fuori come per le vendite (`__prepTr()`, `__show(k)` nella scheda robots.txt) e poi `bash tools/terr/carica_affitti.sh N "msg"`:
`archivio_affitti.py` tiene solo gli annunci seri (niente stanze, affitti brevi, subentri, uffici, richieste; privati con almeno 4 foto,
descrizione vera, senza segni di truffa e non sotto il 60% della zona; doppioni tolti) e scrive `data/affitti.js` (mediane €/m² per zona);
`auto_imm.js` usa quei canoni (−10%) per gli investimenti quando il comune ha almeno 6 annunci affidabili, al posto della stima OMI.
Quando la coda affitti è finita si torna a `coda_milano.json` (Brianza, vendite).

## Osservatorio (si impara da ogni annuncio)
Ogni caricamento (carica_affitti.sh, carica_vendite.sh) lancia `tools/terr/sapere.py`, che riscrive `tools/terr/SAPERE.md` e `data/sapere.js`
e aggiunge una riga a `sapere_storia.jsonl` (mediane per zona e data, per vedere i prezzi che si muovono). Contiene:
- per zona: vendita €/m² (25°–50°–75°) per taglia e per stato, affitto €/m² per taglia, resa lorda, anni per ripagare, tensione
  (affitti offerti per casa in vendita), quota privati e nuove costruzioni, premi (terrazzo, box, giardino, piano alto), margine del da ristrutturare,
  confronto con le zone vicine (zone che costano meno ma si affittano uguale);
- regole generali (ogni annuncio confrontato con la mediana della sua zona): quanto valgono tipologia, taglia, stato, piano, bagni, dotazioni,
  in vendita e in affitto, Milano e fuori; con le riletture: cosa sparisce prima (si vende o si affitta più in fretta).
Prima di valutare un investimento o rispondere a Imma su prezzi e rendite, leggere SAPERE.md.
