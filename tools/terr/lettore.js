/* KEYSTONE — lettore degli annunci in vendita di Immobiliare.it, da eseguire nella scheda di Chrome aperta su www.immobiliare.it
   (javascript_tool). Usa la stessa API della pagina dei risultati, una pagina alla volta con 1,5–2,5 s di pausa.
   Si ferma da solo al primo blocco (http 403/429, captcha): non insistere, riprova al giro dopo.

   Uso:
     1. incolla tutto questo file nella scheda Immobiliare
     2. await __giro([{n:"Barona", path:"/vendita-case/milano/barona/"}, ...], 40)   // 40 = minuti massimi
     3. __PROG mostra zona per zona letti/totale ed eventuale stop; __ARC contiene gli annunci
     4. per portarli fuori: await __prepara()  → salva in localStorage '__keyout' (gzip+base64) e dice in quante parti;
        poi in una seconda scheda su https://www.immobiliare.it/robots.txt incolla __PARTI (sotto) e per ogni parte k:
        __show(k) e subito get_page_text: l'output finisce in un file (è > 49 KB) e si decodifica con tools/terr/ricevi.py */
// fetch con tempo massimo (una richiesta appesa bloccava tutto il giro)
window.__f = (u, ms = 25000) => { const ac = new AbortController(); const t = setTimeout(() => ac.abort(), ms); return fetch(u, { signal: ac.signal }).finally(() => clearTimeout(t)); };
window.__ARC = window.__ARC || {}; window.__PROG = window.__PROG || {}; window.__INVIATI = window.__INVIATI || new Set();
window.__parametri = async path => { let r; try { r = await __f(path + '?noAste=1'); } catch (e) { return { st: 'rete' }; } if (r.status !== 200) return { st: r.status };
  const h = await r.text(); const i = h.indexOf('"real-estate-list\\",{'); if (i < 0) return { st: 'nokey' };
  let s = h.slice(i + 20); s = s.slice(0, s.indexOf('}') + 1).replace(/\\"/g, '"'); return { q: JSON.parse(s) }; };
window.__mappa = (x, label) => { const re = x.realEstate, p = (re.properties || [])[0] || {}, L = p.location || {},
    ph = (p.multimedia?.photos || []).map(f => +(JSON.stringify(f).match(/image\\?\/(\d+)/) || [])[1]).filter(Boolean);
  return { id: re.id, prezzo: re.price?.value || null, mq: parseInt(p.surface) || null, locali: p.rooms || '', bagni: p.bathrooms || '', piano: p.floor?.value || '',
    pianoA: p.floor?.abbreviation || '', asc: p.elevator ? 1 : 0, stato: p.ga4Condition || '', tip: p.typology?.name || re.typology?.name || '', cat: p.category?.name || '',
    lat: L.latitude ?? null, lon: L.longitude ?? null, via: L.address || '', micro: L.microzone || L.city || '', macro: L.macrozone || '', comune: L.city || '',
    priv: re.advertiser?.agency ? 0 : 1, ag: re.advertiser?.agency?.displayName || '', titolo: re.title || '', caption: p.caption || '', desc: p.description || '',
    feat: p.ga4features || [], risc: p.ga4Heating || '', foto: ph.slice(0, 4), nfoto: ph.length, nuovo: re.isNew ? 1 : 0, lusso: re.luxury ? 1 : 0,
    progetto: re.isProjectLike ? 1 : 0, zonaLetta: label, letto: new Date().toISOString().slice(0, 10) }; };
window.__leggi = async (path, label, maxPag = 60) => { const P = __PROG[label] = { pag: 0, n: 0, fine: false, stop: null };
  const z = await __parametri(path);
  if (!z.q) { P.stop = 'param ' + z.st; P.fine = true; return; } const q = { ...z.q, path, criterio: 'data', ordine: 'desc' };
  for (let pag = 1; pag <= maxPag; pag++) { let r;
    try { r = await __f('/api-next/search-list/listings/?' + new URLSearchParams({ ...q, pag }).toString().replace(/idMZona=/, 'idMZona%5B%5D=').replace(/idQuartiere=/, 'idQuartiere%5B%5D=')); } catch (e) { P.stop = 'rete'; break; }
    if (r.status !== 200) { P.stop = 'http ' + r.status; break; } let j; try { j = await r.json(); } catch (e) { P.stop = 'captcha?'; break; }
    P.max = j.maxPages; P.count = j.count; for (const x of j.results || []) { const a = __mappa(x, label); if (a.id) { __ARC[a.id] = a; P.n++; } } P.pag = pag;
    if (!j.results?.length || pag >= j.maxPages) break; await new Promise(ok => setTimeout(ok, 1500 + Math.random() * 1000)); }
  P.fine = true; };
// legge le zone in ordine finché non scade il tempo o arriva un blocco; restituisce lo stato zona per zona
window.__giro = async (zone, minuti = 40) => { const t0 = Date.now(); window.__BLOCCO = null;
  for (const z of zone) { if (Date.now() - t0 > minuti * 60000) break; if (__PROG[z.n]?.fine && !__PROG[z.n].stop) continue;
    await __leggi(z.path, z.n); const s = __PROG[z.n].stop; if (s && /403|429|captcha/.test(s)) { window.__BLOCCO = z.n + ': ' + s; break; }
    await new Promise(ok => setTimeout(ok, 2500)); }
  return Object.fromEntries(Object.entries(__PROG).map(([k, v]) => [k, v.n + '/' + (v.count ?? '?') + (v.stop ? ' ' + v.stop : '')])); };
window.__prepara = async () => { const ids = Object.keys(__ARC).filter(i => !__INVIATI.has(i)); window.__ULTIMI = ids;
  const L = ids.map(i => ({ ...__ARC[i], desc: (__ARC[i].desc || '').slice(0, 400) }));
  const b = new Uint8Array(await new Response(new Blob([JSON.stringify(L)]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer());
  let s = ''; for (let i = 0; i < b.length; i += 8192) s += String.fromCharCode(...b.subarray(i, i + 8192)); s = btoa(s);
  localStorage.setItem('__keyout', s); return { annunci: ids.length, parti: Math.ceil(s.length / 49700) }; };
window.__consegnati = () => { (window.__ULTIMI || []).forEach(i => __INVIATI.add(i)); return __INVIATI.size; };
/* __PARTI: da incollare nella scheda robots.txt
document.documentElement.innerHTML = '<body><article><p id="x"></p></article></body>';
window.__show = (k, n = 49700) => { const s = localStorage.getItem('__keyout'); let t = 'P' + k + ':' + s.slice(k * n, (k + 1) * n) + ':FINE';
  if (t.length < 49600) t += ' ' + '~'.repeat(49600 - t.length); document.getElementById('x').textContent = t; return Math.ceil(s.length / n); };
*/
