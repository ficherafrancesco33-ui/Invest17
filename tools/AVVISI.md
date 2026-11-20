# Avvisi giornalieri Immobiliare → Keystone

Procedura che Claude segue ogni mattina (attività programmata). Repo: `ficherafrancesco33-ui/Keystone`.
Scopo: leggere gli avvisi email di Immobiliare.it che arrivano nella Gmail collegata (ricerche salvate da Imma), aprire ogni annuncio e caricarlo nell'app.

## Regole che non si toccano
- Si aprono **solo** gli annunci arrivati negli avvisi, **uno alla volta**, con WebFetch. Niente pagine di ricerca, niente scorrimento di elenchi.
- Se Immobiliare blocca (403, "accesso temporaneamente limitato", captcha): **ci si ferma subito**. Non si cambia strada (niente proxy, cache, mirror, Chrome, altre connessioni). Gli annunci non aperti vanno in `pendenti` e si riprovano il giorno dopo.
- Niente idealista: non si usa per riempire l'app.
- Niente numeri di telefono dei privati, niente nomi di privati.
- Non si cancellano né si modificano le email (niente etichette, niente "letto"): gli id delle email già lette stanno in `tools/novita.json` → `email`.

## 1. Trovare gli avvisi
Gmail: `from:noreply@immobiliare.it newer_than:3d -subject:"ricerca è stata salvata" -subject:Benvenuto`.
Salta i messaggi il cui id è già in `tools/novita.json` → `email`.
Per ogni avviso leggi il corpo (`get_thread`): titolo della ricerca (es. "Residenziale in vendita nell'area disegnata" = **Investimenti**; una ricerca su Milano = **Milano**), e per ogni annuncio il link, prezzo, m², locali, indirizzo.
L'id dell'annuncio è il numero in `/annunci/NNNNNNNNN/`. Se il link è un redirect di tracciamento, aprilo con WebFetch e segui il redirect fino a `www.immobiliare.it/annunci/ID/`.
Scarta subito gli id già presenti: `tools/auto_raw.json` (annunci + scartati) e `tools/terr/raw_immobiliare_milano.txt` (prima colonna).

## 2. Investimenti (avviso con l'area disegnata, 20.000–60.000 €)
Apri la scheda `https://www.immobiliare.it/annunci/ID/` e leggi: prezzo, m², locali, bagni, piano, stato, classe energetica, spese condominiali, agenzia, data "aggiornato il", indirizzo, descrizione, elenco foto (`pwm.im-cdn.it/image/NNN/...`).

Tieni **solo** se tutte vere (ci investe soldi veri, meglio scartare un dubbio che caricare un rudere):
- stato buono/abitabile, ottimo/ristrutturato o nuovo, e la descrizione lo conferma (scarta: "da ristrutturare", "da rivedere", "rustico", "allo stato grezzo", "fienile", "rudere", "ex", "da sistemare", "impianti da rifare");
- non asta, non nuda proprietà, non quota, non "affittato con riscatto", non venduto/in trattativa;
- almeno 4 foto e **almeno una degli interni** (cucina/bagno/camera citate nelle didascalie o nella descrizione). Se puoi, guarda le prime foto (WebFetch sull'URL della foto chiedendo di descriverla); se non riesci a vederle, scrivi in `contro`: "Foto da guardare prima di contattare".
- 25 m² o più, prezzo ≤ 60.000 €, €/m² non assurdo (sotto 250 €/m² è quasi sempre un rudere).
- comune entro 3 ore da Milano (Lombardia, Piemonte, Liguria, Veneto, Emilia occ.).

Se tieni: aggiungi a `tools/auto_raw.json` → `annunci` un oggetto con lo stesso schema degli altri:
`id, comune, p (sigla prov.), prezzo, mq, locali, bagni, piano, stato (buono|ottimo|ristrutturato|nuovo), classe, arredato, indirizzo, titolo (breve, in italiano, senza maiuscole urlate), foto[ ] (4–6 URL pwm.im-cdn.it in formato m-c.jpg), aggiornato (gg/mm/aaaa), agenzia, pro[2-3], contro[1-3], trovato (AAAA-MM-GG di oggi)`; opzionali `spese_mese`, `canone` + `canone_fonte` se già affittato.
Se il comune non ha coordinate in `data/territorio.js` (TERR.coord), aggiungile in `auto_raw.json` → `coord` (lat, lon del centro del comune).
Se scarti: aggiungi a `scartati` `{id, comune, motivo}`. Aggiorna `controllati["Comune|PR"]`.

## 3. Milano (avviso di una ricerca su Milano)
Tutti gli annunci di Milano entrano nel database (valutazioni, fasce, comparabili); i privati compaiono anche in "Annunci dei privati".
Per ciascuno apri la scheda e scrivi una riga in fondo a `tools/terr/raw_immobiliare_milano.txt` (formato nell'intestazione del file, separatore `;`):
`id;prezzo;mq;locali;bagni;piano(T/R/S/numero);ascensore(0/1);stato(N/O/B/R);tipologia;lat;lon;indirizzo;microzona;Milano;privato(0/1);extra`
- privato = 1 se l'annuncio è di un privato (nessuna agenzia).
- lat/lon: dalla scheda se c'è; altrimenti quelli della microzona (TERR.milano.micro, campo `n`) con 4 decimali.
- microzona: il nome di Immobiliare (es. "Vigentino - Fatima"), che deve esistere in TERR.milano.micro.
- **Leggi sempre la descrizione** (anche per Milano): scarta e scrivi in `tools/terr/esclusi.txt` (`id;motivo`) quote o comproprietà ("vendo quota", "50%"), nude proprietà, usufrutto, aste, rent to buy, cessioni di contratto, posti letto o stanze singole, locali commerciali. Scarta anche "Progetto"/nuove costruzioni senza prezzo.
- Per i **privati** che superano il controllo aggiungi l'id a `tools/terr/privati_ok.txt`: solo quelli compaiono in home.

## 4. Generare, registrare, pubblicare
```
node tools/auto_imm.js
cd tools/terr && python3 gen.py && cd ../..
node tools/novita.js --data AAAA-MM-GG --inv id1,id2 --mil id3,id4 --priv id4 --scartati N --nota "breve"
```
Aggiungi in `tools/novita.json` gli id delle email lette (`email`) e gli annunci non aperti (`pendenti`), poi rilancia `node tools/novita.js` (senza argomenti) per riscrivere `data/novita.js`.
Controlla che l'app si apra senza errori (server locale + Playwright, home e `#inv/classifica`), poi commit e push su `main` con messaggio in italiano.

## 5. Avvisare Imma
Solo se c'è qualcosa: notifica breve, in italiano, es. "Keystone: 2 nuovi immobili per investire (Tirano 59.000 €, 90 punti) e 14 annunci a Milano, 2 di privati. 5 scartati (ruderi/aste)." Se Immobiliare ha bloccato, dillo in una riga.
Se nessun avviso nuovo: nessuna notifica.
