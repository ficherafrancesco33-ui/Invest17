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

### 20/11/2026 (5) — Entroterra dei laghi
- Valle Intelvi (7, 10-20 minuti dal Lago di Como e di Lugano): migliore zona per affitti brevi trovata finora (AirDNA Pellio Intelvi 54% e 173 $ a notte).
- Val Veddasca sopra Maccagno, Lago Maggiore (2): Forcora e Lago d'Elio.
- Stagionalità dei laghi: profilo indicativo `LAKE` in `tools/zone.py` (nessun dato mensile pubblico).
- Pavia esclusa: in città quasi nulla sotto 60.000 € (2.300-3.300 €/m² in centro).
- Archivio: 62 immobili.

### 20/11/2026 (6) — Aeroporti, ospedali, città vicine: 105 immobili
- Logica: prima i motori di domanda tutto l'anno (Malpensa, ospedali, università), poi le case economiche vicino.
- Somma Lombardo e Lonate Pozzolo (Malpensa, 10): affitti brevi con domanda quasi piatta (AirDNA Somma 52%, Cardano 57%); profilo `AIR`.
- Vigevano (7, ospedale, 25 min da Badile), Novara (4, ospedale + università), Voghera (19, ospedale + stazione): affitto lungo + scenario MEDIO TERMINE (`medio_k`: canone arredato transitorio +25-30%, 10 mesi).
- Castione +3. Escluse: Pavia (San Matteo) e Rozzano (Humanitas): quasi nulla sotto 60.000 €; Oggebbio/Ghiffa: niente sotto 65.000 €.
- In `zone.py`: campi `medio_k`, `cond` (condominio reale), `comune` per immobile.

## 7. Carico affitto lungo (20/11/2026)
- Aggiunti 15 bilocali ≤60k ad Alessandria (università UPO, ospedale) e Vercelli (UPO, ospedale), fonte caasa.it.
- Scartati quelli sopra 60k. Cremona, Piacenza, Lodi: nessun annuncio ≤60k con dati completi leggibile; da rifare con link filtrati dell'utente.

## 8. Analisi del territorio (20/11/2026)
Tre nuove sezioni, codice in `js/terr.js`, dati in `data/territorio.js` (generato da `tools/terr/gen.py`):
- **Mappa B&B** (`#brevi`): 85 località entro ~3 ore (AirROI/AirDNA): prezzo a notte, occupazione, ricavo annuo, ricavo per notte, rendita lorda di un bilocale al prezzo medio del comune. Filtri per tipo, regione, distanza da Badile o Porta Romana, occupazione, profondità del mercato. Scheda per località con prova su bilocale 50 m² e occupazione di pareggio contro l'affitto lungo.
- **Valutazione** (`#valuta`): 2.104 comuni di 20 province (immobiliare.it / mercato-immobiliare.info): vendita, affitto, rendita lunga, crescita 1 anno, m² con 60k. Mappa: comuni principali; scegliendo una provincia carica i confini openpolis (jsDelivr) e colora tutti i comuni; i centri vengono salvati in localStorage. Rendita calcolata solo se vendita ≥ 700 €/m², affitto non di ripiego (stesso valore in 3+ comuni della provincia) e ≤ 12%.
- **Milano** (`#milano`): 32 zone immobiliare.it con metro M1-M5, 60 punti di interesse (università, ospedali, lavoro/stazioni, eventi, negozi, scuole, parchi), punteggio di attrattività, stima B&B per zona dalla media AirROI.
- **Valutatore** unico (`vCalcola`): superficie commerciale (balconi 30%, terrazzi 35%, giardino 10%, cantina 25%), coefficienti di merito (piano/ascensore, stato, classe energetica, epoca, esposizione, vista, riscaldamento, portineria, condominio, via), box a parte, lavori con valore dopo lavori e margine, rendimenti con la stessa funzione `scenari` delle schede. Valutazioni salvabili.
- Fonti da aggiornare ogni 3-6 mesi: rilanciare le pagine provinciali e regionali, aggiornare `tools/terr/raw_*.txt`, poi `python3 tools/terr/gen.py`.

## 9. Milano 3D per l'agenzia (20/11/2026)
- `js/milmap.js`: mappa MapLibre GL 4 con tessere OpenFreeMap (stile cyber scritto a mano), palazzi in 3D (layer `building`), nomi delle vie e civici (`transportation_name`, `housenumber`), metro, servizi.
- Prezzi: 145 microzone immobiliare.it (ott 2026) in `tools/terr/milano.py` → celle di Voronoi (d3-delaunay) ritagliate sul comune di Milano (polygon-clipping, confini openpolis); hinterland: comuni di Milano e Monza-Brianza colorati col prezzo del comune.
- Quartieri ufficiali NIL dal portale open data del Comune (se il server consente l'accesso dal browser; altrimenti restano le microzone).
- Tocco su un palazzo: civico e via più vicini dalle tessere caricate, quartiere, microzona, altezza → scheda → valutatore precompilato. Ricerca indirizzi con Nominatim (OpenStreetMap).
- PDF: pagina stampabile con logo `img/maison-collection.png` (si salva come PDF dal menu Stampa), con caratteristiche, indici di zona, microzone vicine, metodo, rendimenti, servizi vicini.
- Da fare: annunci comparabili (archivio da email di avviso), dati residenti per quartiere, andamento dei prezzi nel tempo.
- Annunci di Milano (`tools/terr/raw_annunci_milano.txt`, 269 dopo pulizia): microzona dal testo, municipio; la posizione esatta viene cercata nel browser con Nominatim (1 al secondo) e salvata in localStorage (`geo_ann`). Layer "Annunci" sulla mappa; comparabili (±40% di m², più vicini) nel valutatore e nel PDF.
- Correzioni: selezione del singolo palazzo (le tessere uniscono più edifici), trackpad = spostamento, pizzico/rotellina = zoom.
- Immobiliare.it (`tools/terr/raw_immobiliare_milano.txt`): 1.017 annunci di Milano letti dal Chrome dell'utente il 20/11/2026 (fasce fino a 196.000 €), poi il sito ha risposto 403 (blocco anti-robot): raccolta interrotta e non forzata. Dopo il filtro (progetti e aste esclusi) restano 728, con coordinate esatte, stato, piano, ascensore. Nei comparabili il prezzo €/m² viene riportato a "stato buono" (N 1,10, O 1,06, B 1, R 0,78); se ci sono ≥5 annunci entro 1,5 km e la mediana è entro ±25% della zona, entra nel prezzo di partenza con peso fino al 35%.
- Prossimi passi per avere più dati: quotazioni OMI (file dall'Agenzia delle Entrate), avvisi email quotidiani su Gmail dedicata + GitHub Action, dati di mercato dell'abbonamento agenzia, vendite concluse dell'agenzia.

## 10. Keystone (20/11/2026)
- Nome: **Keystone** (la chiave di volta dell'arco: tiene insieme tutto; "key" = chiavi di casa, "stone" = mattone). Logo: arco con chiave di volta e serratura. Il logo ricarica la pagina restando nello stesso punto.
- Stile Carbone e oro di Dreamers (bg #070707, pannelli #141414/#1e1e1e, oro #c9a227/#f2cf5b/#f5d76e, linee #3a3320). Barra in alto a tinta unita, schede a larghezza fissa come Dreamers, tasto indietro (storia dell'app, altrimenti livello superiore).
- Navigazione: Home · Investimenti · Milano · Seguiti · Notizie (Guida dentro Notizie e Home).
- `js/hub.js`: pagine di scelta. Milano: cliente / bnb / lungo / sub / privati / mappa (`#milano/<modo>`, `#milano/mappa/<zona>`). Investimenti: `#inv/classifica`, `#inv/zona/<regione>/<comune>`, più #brevi #valuta #miei #auto con la barra dei percorsi in cima. Seguiti in localStorage `seguiti` (stella su schede e annunci). Illustrazioni generate (`artSvg`) per gli immobili senza foto.
- `js/home.js`: banner novità (AUTO del giorno, notizie, archivio), mappa d'Italia 3D leggera (MapLibre, stile minimo) con i seguiti, accessi rapidi.
- Filtri sempre sopra a numeri, mappa e classifica, e fissi in alto mentre scorri.
- 20/11/2026: archivio Investimenti ridotto ai soli 24 annunci di Oneta (link di Imma). I 96 presi in autonomia da aggregatori (foto singole, annunci scaduti o case disastrate) sono esclusi: restano in `tools/zone.py` con `INCLUDI_AUTONOMI = False`. D'ora in poi si caricano solo zone/annunci dai link che manda Imma.

### Milano Sud (20/11/2026)
- Letti da Immobiliare.it (Chrome, 6–9 s a pagina) 3.859 annunci di 21 microzone sud: Porta Romana, Bocconi, Quadronno, Vigentino, Ripamonti, Lodi, Corvetto, Cadore, Montenero, Guastalla, Porta Vittoria, Martini, Molise, Bologna, Pezzotti, Chiesa Rossa, Cermenate, Navigli, San Gottardo, Ascanio Sforza (parziale), Ticinese (parziale). Bloccato (403) a Ticinese p.7: mancano Corso Genova, Rogoredo, Quintosole, Gratosoglio.
- Uniti in tools/terr/raw_immobiliare_milano.txt (dedup per id) → 4.351 annunci Immobiliare validi in TERR.annunci.imm.
- Comparabili: peso nella stima fino al 60% (nNorm/15) se la media normalizzata è entro ±30% della base. Extra nuovi: g box, j giardino, p portineria.

### PDF valutazione Maison Collection (20/11/2026)
- js/pdf.js sostituisce il vecchio mmPdf: copertina (logo, mappa OSM con segnaposto, banda bordeaux con il range), riepilogo, 10 sezioni come le relazioni di stima di riferimento (immobile, comparabili con mappa numerata e ★, fasce di zona con grafico, rettifiche +/−, range con due metodi, servizi a piedi, profilo zona, forza/attenzione, investimento, nota metodologica).
- Nuovi dati: TERR.milano.fasce (gen.py: percentili per stato dagli annunci, solo microzone lette per intero) e data/zone_profili.js (32 zone: carattere, edilizia, domanda, pro/contro, municipio).
- Modulo: aggiunti anno di costruzione, orientamento (coefficiente S +2%, N −3%), note particolari. Ultimo piano +1,5% se già piano alto.
- data/nil_demo.js: dati socio-demografici degli 88 NIL (Comune di Milano, schede NIL PGT 2030, anagrafe 2017): residenti, famiglie, % stranieri, densità, % 0-18, % over 65, indice di vecchiaia. Nel PDF il quartiere si trova dai confini NIL (MM.nil) o dal nome; barre confrontate con la media di Milano.
- Corretto: ZONE_PROFILI non veniva letto nel PDF (const non è su window).
