// KEYSTONE — Guida per investire. Testo con mini-formattazione:
// "## " titolo di paragrafo, "- " elenco, "**grassetto**". Riga vuota = nuovo paragrafo.
const GUIDA = [
{
  id: "come-valutare",
  categoria: "Come si valuta",
  titolo: "Il prezzo è giusto? Come leggere OMI e comparabili",
  intro: "Prima di parlare di rendimento bisogna capire se stai pagando la casa il giusto.",
  testo: `## Le due fonti
- **OMI (Agenzia delle Entrate)**: valori minimi e massimi al m² per ogni zona del comune, aggiornati ogni sei mesi. Sono valori di compravendite reali, ma medi: non vedono il singolo appartamento.
- **Comparabili**: annunci simili nella stessa zona (stessa tipologia, metratura vicina, stesso stato). Sono prezzi chiesti, non di vendita: di solito si chiude il 5-10% sotto.

## Come li usa Keystone
Il valore stimato unisce le due fonti: 60% comparabili (già scontati della trattativa tipica) e 40% centro della forbice OMI. Se i comparabili sono pochi pesa di più l'OMI.

## Segnali da guardare
- Prezzo al m² molto sotto la zona: chiedersi **perché** (piano terra, umidità, condominio con debiti, occupato, nuda proprietà).
- Annuncio online da molti mesi o già ribassato: c'è margine di trattativa.
- Spese condominiali alte: pesano su ogni anno di rendimento.

## Quanto offrire
La scheda indica una forbice: il tetto è il valore stimato (o il prezzo chiesto se più basso), la base circa l'8% sotto. Partire dalla base lascia spazio per salire.`
},
{
  id: "rendimenti",
  categoria: "Rendimenti",
  titolo: "Lordo, netto e costi nascosti",
  intro: "Il rendimento lordo che leggi negli annunci è quasi sempre troppo bello.",
  testo: `## Lordo e netto
- **Lordo** = incassi annui ÷ prezzo della casa.
- **Netto** = (incassi − costi − tasse) ÷ tutto quello che hai speso: prezzo, imposte e notaio, lavori, arredo.

## I costi che si dimenticano
- Commissioni Airbnb e Booking (15-18%) e co-host se la casa è lontana (15-20%).
- Pulizie e biancheria, utenze, internet, consumabili.
- Condominio, IMU (sulle seconde case si paga), assicurazione.
- Manutenzione: conta almeno il 3-4% degli incassi ogni anno.
- Mesi vuoti: nessun affitto è pieno 12 mesi su 12.

## Che numeri aspettarsi
Come ordine di grandezza: un netto del 4-5% è nella media, 6-7% è buono, sopra l'8% di solito c'è un rischio in più (zona debole, stagione corta, lavori sottovalutati). Keystone assegna il punteggio pieno all'8% netto.`
},
{
  id: "breve-medio-lungo",
  categoria: "Rendimenti",
  titolo: "Affitto breve, medio o lungo: quale scegliere",
  intro: "Ogni casa ha un uso in cui rende di più: la scheda calcola sempre tutti e tre.",
  testo: `## Affitto breve (B&B, Airbnb, Booking)
- Rende di più dove la domanda c'è tutto l'anno: città d'arte, fiere, località con due stagioni.
- Richiede gestione continua: check-in, pulizie, recensioni, prezzi che cambiano.
- Obblighi: CIN (codice identificativo nazionale) esposto, comunicazione degli ospiti alla Questura, imposta di soggiorno dove prevista, dotazioni di sicurezza.

## Medio termine e transitorio
- Contratti da 1 a 18 mesi con una motivazione (lavoro, studio, cure).
- Ideale vicino a università, ospedali, grandi aziende: canone più alto del lungo, molto meno lavoro del breve.

## Affitto lungo
- Rende meno ma è il più tranquillo. Con il canone concordato, nei comuni dove è previsto, la cedolare può scendere al 10%.
- Rischio principale: inquilino che smette di pagare. Conviene selezionare bene e assicurarsi.

## Regola pratica
Se il breve rende meno di 1,5 volte il lungo, spesso non vale il lavoro in più.`
},
{
  id: "zone-due-stagioni",
  categoria: "Zone",
  titolo: "Le zone con due stagioni (e perché contano)",
  intro: "Il nemico dell'affitto breve sono i mesi vuoti. Le zone con più motivi di visita li riducono.",
  testo: `## Cosa cercare
- **Laghi**: turismo d'estate, più weekend e eventi nel resto dell'anno. Il Lago di Garda ha in più le fiere di Verona.
- **Montagna con sci e estate**: stagione invernale forte, estate con escursioni. Contano gli impianti aperti e la quota.
- **Città con fiere e università**: domanda di lavoro e studio anche fuori stagione.
- **Terme**: clientela stabile, spesso in bassa stagione.

## Cosa evitare
- Località di solo mare con 2-3 mesi pieni e nove vuoti, a meno che il prezzo sia molto basso.
- Comuni che perdono abitanti: l'affitto lungo diventa difficile e la casa si rivende male.

## Come lo mostra Keystone
Nella scheda c'è il grafico dell'occupazione mese per mese e l'elenco di fiere, eventi e stagioni della zona.`
},
{
  id: "privata-o-srl",
  categoria: "Aspetti pratici",
  titolo: "Comprare come privata o con la società",
  intro: "La scelta cambia le tasse: Keystone mostra il netto in entrambi i casi.",
  testo: `## Come persona fisica
- Puoi scegliere la **cedolare secca**: 21% sugli affitti (per gli affitti brevi il 26% dalla seconda casa in poi; 10% con canone concordato dove previsto).
- Le spese però non si scaricano.
- Con più di 4 appartamenti in affitto breve l'attività si considera imprenditoriale.

## Con la società (SRL)
- Niente cedolare: si paga IRES (24%) e IRAP sull'utile, cioè dopo aver tolto i costi.
- Si possono dedurre costi, ammortamenti e interessi del mutuo.
- Più adatta se gli immobili sono tanti o se la società gestisce già affitti.

## Attenzione
I numeri di Keystone sono indicativi: imposte di acquisto, IMU e regime fiscale vanno verificati col commercialista prima dell'offerta.`
},
{
  id: "checklist",
  categoria: "Aspetti pratici",
  titolo: "Checklist prima di fare un'offerta",
  intro: "Le cose da controllare sempre, anche quando i numeri sono ottimi.",
  testo: `## Documenti
- Visura e planimetria catastale conformi allo stato reale.
- Conformità urbanistica e assenza di abusi.
- Ultimi verbali e bilancio del condominio: lavori deliberati e spese insolute.
- Regolamento condominiale: alcuni vietano l'affitto breve.

## Casa
- Impianti a norma, caldaia, umidità, infissi.
- Classe energetica: incide su bollette e appetibilità.
- Lavori stimati con un preventivo, non a occhio.

## Zona
- Regole del comune sugli affitti brevi.
- Chi pulirà, farà i check-in e le piccole riparazioni se la casa è lontana.
- Concorrenza: quanti annunci simili ci sono già su Airbnb.`
}
];
