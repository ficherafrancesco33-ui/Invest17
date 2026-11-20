# Note di sviluppo — Invest17

App per trovare e analizzare immobili da mettere a reddito (affitto breve, medio, lungo).
Prima di lavorare leggere questo file; alla fine di ogni sessione aggiungere cosa è cambiato.

## Struttura
- `index.html` — tutta l'app (HTML, CSS, JS). Nessuna compilazione: si apre così com'è.
- `data/impostazioni.js` — parametri di calcolo (commissioni, tasse, pesi del punteggio). **Unica fonte** per i conti.
- `data/immobili.js` — `MIEI`: archivio fatto a mano (link mandati da Imma).
- `data/auto.js` — `AUTO`: immobili trovati dalle notifiche email (fase 3, generato in automatico).
- `data/notizie.js` — `NOTIZIE`: notizie utili per investire (fase 3, ogni mattina alle 10).
- `data/guida.js` — `GUIDA`: articoli della sezione Guida.
- Mappe: Leaflet (CDN unpkg) con mappa scura CARTO/OpenStreetMap.

## Regole
1. **Nei file dati vanno solo i DATI.** Valore stimato, offerta, scenari, rendimenti e punteggio li calcola l'app (`valuta`, `scenari`, `analizza` in index.html). Non scrivere numeri calcolati nei file dati.
2. Dati stimati (non misurati) → `stima: true` e sempre `fonte`.
3. Le cifre sono indicative: le tasse vanno verificate col commercialista; l'app lo dice in ogni scheda.

## Schema di un immobile (`MIEI` / `AUTO`)
```js
{
  id: "bardolino-001",              // unico, minuscole e trattini
  titolo: "Bilocale arredato vista lago",
  url: "https://www.immobiliare.it/annunci/...",
  fonte: "Immobiliare.it",
  aggiunto: "2026-11-20",           // AUTO usa anche trovato: "AAAA-MM-GG"
  regione: "Veneto", provincia: "VR", comune: "Bardolino", zona: "Centro",
  lat: 45.548, lng: 10.72,
  prezzo: 189000, mq: 55, locali: 2, bagni: 1, piano: "1", ascensore: false,
  arredato: true,
  stato: "buono",                   // "buono" | "da rinfrescare" | "da ristrutturare"
  lavori: 3000,                     // € di lavori leggeri stimati
  arredo: 0,                        // facoltativo: se manca e arredato=false usa il parametro
  classe_energetica: "E",
  foto: "https://...jpg",           // facoltativo
  spese: { condominio_mese: 70, imu_anno: 950 },
  valutazione: {
    omi: { min: 3000, max: 4200, fonte: "OMI 1° sem. 2026, zona B1" },
    comparabili: [ { titolo, prezzo, mq, url, lat, lng, stato } ],
    note: "",
    valore_mq_manuale: null         // facoltativo: forza il valore al m²
  },
  affitti: {
    breve: { adr: 115, occ: 0.58, mesi: [12 occupazioni 0-1], fonte: "...", stima: true },
    medio: { canone: 1100, mesi_occupati: 9, fonte: "..." },
    lungo: { canone: 750, concordato: false, fonte: "..." }
  },
  eventi: ["Fiere di Verona (Vinitaly, aprile)", "..."],
  giudizio: { sintesi: "...", pro: ["..."], contro: ["..."], consigli: "..." },
  fonti: [ { titolo, url } ],
  parametri: { breve: { gestione_pct: 0 } }   // facoltativo: sovrascrive impostazioni
}
```

## Come calcola l'app
- **Valore al m²**: mediana €/m² dei comparabili × (1 − sconto trattativa 8%), unita al centro della forbice OMI (60/40 con 3+ comparabili, 40/60 con meno). Valore stimato = valore al m² × m².
- **Offerta consigliata**: da −8% fino al minore tra prezzo chiesto e valore stimato. Gli scenari usano come prezzo d'acquisto il tetto dell'offerta.
- **Scenari**: incassi − costi (vedi impostazioni) − tasse (cedolare sugli incassi, oppure IRES+IRAP sull'utile per la SRL; selettore in alto). Rendimento netto = netto ÷ investimento totale (acquisto + spese + lavori + arredo; nel lungo senza arredo).
- **Punteggio 0-100**: 55% rendimento netto (0% → 0, 8% → 100), 30% prezzo rispetto al valore (−10% → 0, +15% → 100), 15% affidabilità (stato della casa, dati stimati, valutazione mancante). 70+ Affare, 50-69 Da valutare, sotto 50 Debole.

## Fasi
1. ✅ Struttura dell'app (20/11/2026).
2. Archivio a mano: Claude analizza i link mandati da Imma e li aggiunge a `data/immobili.js`.
3. Automazione: Gmail dedicata con le notifiche → GitHub Actions ogni mattina → `data/auto.js`; notizie alle 10 → `data/notizie.js`.

## Diario
### 20/11/2026 — Nascita
- App con 5 sezioni nella barra in basso: Home, I miei, Automatica, Notizie, Guida.
- Home: classifica generale, migliori per uso (breve/medio/lungo), ultime notizie, guida.
- I miei / Automatica: mappa con punti colorati per punteggio, filtri (uso, regione, comune, ordinamento), classifica per zona.
- Scheda: valore stimato e offerta, grafico prezzo/valore/OMI/comparabili, tabella e mappa dei comparabili, tre scenari con business plan, stagionalità, eventi, pro e contro.
- Selettore tasse Privata/SRL in alto (ricorda la scelta).
- Guida: 6 articoli iniziali.

### 20/11/2026 (2) — Stile Cyber come Dreamers
- Colori dello stile Cyber di Dreamers: fondo #04070d, pannelli #0a1220/#101c33, bordi #1c3a63, ciano #00c8e0/#7df3ff, magenta #ff2bd6, giallo #facc15.
- Intestazione a vetro con riflesso e riga ciano luminosa; logo "17" ciano lucido; schede di navigazione inclinate in alto (come Dreamers), non più barra in basso.
- Titoli di sezione magenta spaziati; pannelli con riflesso; chip ciano; caselle dei dati con bordo viola come le statistiche di Dreamers.
- "Finestre" degli immobili (funzione `win`): foto con vetro, riflesso in alto, bordo e alone nel colore del punteggio, pillola del punteggio nell'angolo. Senza foto mostra l'iniziale del comune.
- Foto: campo `foto` con il link diretto all'immagine dell'annuncio (caricata con referrerpolicy no-referrer; se non si carica resta l'iniziale).
- Grafici: prezzo chiesto giallo, valore stimato ciano, comparabili magenta, stagionalità in scala di ciano.

### 20/11/2026 (3) — Primo archivio: Oneta (BG)
- Link di Imma: idealista.it/vendita-case/oneta-bergamo/. Idealista e Immobiliare bloccano la lettura diretta: annunci presi dagli aggregatori pubblici Caasa e Nestoria (stessi annunci di Immobiliare/Idealista, con foto e link). 24 immobili distinti (doppioni tolti).
- OMI: valore medio zona R1 da Caasa (appartamenti 1.069 €/m², case indipendenti 848 €/m²); supporto nuovo in `valuta` per `omi.medio` (valore unico, senza forbice).
- Comparabili: altri annunci di Oneta dello stesso segmento (appartamenti / case / alto livello), metratura più vicina; esclusa la casa di 220 m².
- Affitto breve: stima da AirROI Oltre il Colle (comune confinante, stagionalità mese per mese) e AirDNA Oltre il Colle/Serina. Affitto lungo: stima prudente per fasce di locali (nessun OMI locazione). Medio termine non inserito (nessun dato).
- Posizioni sulla mappa indicative per frazione (`pos_indicativa`), condominio e IMU stimati (`spese.stima`). Generatore dei dati: script nella sessione (non nel repo).

### 20/11/2026 (4) — Caricamento grande: zone entro 2 ore da Milano, fino a 60.000 €
- Nuove zone: Castione della Presolana (9, sci + estate), Pisogne frazioni di montagna sul Lago d'Iseo (3), Vercelli (6, affitto lungo), Alessandria (11, affitto lungo). Totale archivio: 53 immobili.
- Fonti annunci: Trovit, Mitula, Nestoria, Caasa, Wikicasa (gli unici leggibili da Claude; Immobiliare e Idealista solo se il link lo manda Imma).
- Escluse per ora: Lago di Como (Gravedona), Lago Maggiore (Luino), Valsassina (Barzio): quasi nulla sotto 60.000 € (circa 1.600-2.300 €/m²).
- Affitto breve: Castione da AirROI (stagionalità reale mese per mese), Pisogne da AirDNA/AirROI ridotti per le frazioni. Affitto lungo: Vercelli 7,5 €/m², Alessandria 7 €/m² (fonti in scheda), montagna stimato.
- Parametri affitto breve rivisti in `impostazioni.js`: commissioni 12% (media Airbnb/Booking), pulizie 10 € a soggiorno (oltre la tariffa pulizie pagata dall'ospite), utenze 1.500 €/anno.
- Generatori dei dati in `tools/oneta.py` e `tools/zone.py` (Python, rigenerano `data/immobili.js`).
