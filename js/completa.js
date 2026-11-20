"use strict";
/* ==========================================================================
   KEYSTONE — Completa Milano
   Mappa delle 145 microzone: tocchi un pallino, si apre Immobiliare su quella
   zona; copi il link e lo salvi; alla fine copi un unico messaggio per Claude
   che carica gli annunci sulla mappa di Milano.
   Pallino grigio = da fare, giallo = aperto, verde = link salvato.
   ========================================================================== */
const CM_KEY = "cm_links", CM_OPEN = "cm_aperti";
const cmLinks = () => store.get(CM_KEY, {});            // { microzona: url }
const cmAperti = () => new Set(store.get(CM_OPEN, []));
function cmUrl(n) { return `https://www.immobiliare.it/vendita-case/milano/${immSlug(n)}/?noAste=1&criterio=data&ordine=desc`; }
function cmStato(n) { return cmLinks()[n] ? "ok" : cmAperti().has(n) ? "aperto" : "da"; }
const CM_COL = { da: "#6b7a93", aperto: "#f2b84b", ok: "#22c55e" };
function cmPrompt() {
  const L = cmLinks(), M = TERR.milano.micro, rows = M.filter(m => L[m.n]);
  if (!rows.length) return "";
  return `Carica sulla mappa di Milano di Keystone gli annunci in vendita di queste ricerche di Immobiliare (tutte le pagine), come comparabili per le valutazioni: prezzo, m², locali, piano, stato, posizione e link. Niente telefoni.\n\n` +
    rows.map(m => `- ${m.n} (${m.z}): ${L[m.n]}`).join("\n");
}
function vCompleta() {
  const M = TERR.milano.micro, L = cmLinks(), fatte = M.filter(m => L[m.n]).length, ap = M.filter(m => !L[m.n] && cmAperti().has(m.n)).length;
  const zone = TERR.milano.zone;
  return `<div class="hubhead"><small>Raccolta dati</small><h1>Completa Milano</h1><p class="sub">Il modo più veloce: "Salva link" mette subito nella cartella la ricerca di Immobiliare di quella zona, senza aprire niente. Se vuoi, prima la apri e la sistemi tu: copiato il link, "Salva link" prende quello. Pallino grigio da fare, giallo aperto, verde fatto.</p></div>
  <div class="cmprog"><div class="cmbar"><span style="width:${fatte / M.length * 100}%"></span><span class="ap" style="width:${ap / M.length * 100}%"></span></div>
    <b>${fatte} su ${M.length} zone</b><span>${ap ? `${ap} aperte da salvare` : ""}</span></div>
  <div class="clmapw"><div class="map clmap" id="cmmap"></div></div>
  <div class="lbox"><div class="lbh"><b>📁 Link raccolti</b><span>${fatte} zone</span></div>
    ${fatte ? `<div class="btns"><button class="btn pri" id="cmcopy">Copia il messaggio per Claude</button><button class="btn sec" id="cmclear">Svuota</button></div>
    <p class="note">Incolla il messaggio in chat con Claude: carico gli annunci di tutte le zone sulla mappa di Milano.</p>` : `<p class="note">Quando avrai salvato i primi link, qui potrai copiare un unico messaggio con tutte le zone.</p>`}</div>
  <h2>Tutte le zone</h2>
  ${zone.map(z => { const mm = M.filter(m => m.z === z.n); const ok = mm.filter(m => L[m.n]).length;
    return `<details class="cmz" ${ok && ok < mm.length ? "open" : ""}><summary><b>${esc(z.n)}</b><span>${ok}/${mm.length}</span></summary>
      ${mm.map(m => { const st = cmStato(m.n); return `<div class="cmr"><i style="background:${CM_COL[st]}"></i><span>${esc(m.n)}</span>
        <a class="btn sec" href="${esc(cmUrl(m.n))}" target="_blank" rel="noopener" data-cmopen="${esc(m.n)}">Apri ↗</a>
        <button class="btn ${st === "ok" ? "sec" : "pri"}" data-cmsave="${esc(m.n)}">${st === "ok" ? "✓" : "Salva link"}</button></div>`; }).join("")}</details>`; }).join("")}`;
}
async function cmSave(n) {
  let t = ""; try { t = await navigator.clipboard.readText(); } catch (e) {}
  if (!/^https?:\/\/(www\.)?immobiliare\.it\//.test(t || "")) t = cmUrl(n);   // niente copiato: salva direttamente la ricerca della zona
  t = t.trim(); if (!/^https?:\/\//.test(t)) { if (t) alert("Non sembra un link valido."); return false; }
  const L = cmLinks(); L[n] = t; store.set(CM_KEY, L); return true;
}
function afterCompleta() {
  const M = TERR.milano.micro, m = tMap($("#cmmap"), [[45.4642, 9.19], 12]);
  const open = n => { const s = store.get(CM_OPEN, []); if (!s.includes(n)) { s.push(n); store.set(CM_OPEN, s); } };
  if (m) {
    M.forEach(z => { const st = cmStato(z.n);
      const mk = L.circleMarker([z.lat, z.lon], { radius: 9, color: "#0d1320", weight: 2, fillColor: CM_COL[st], fillOpacity: .95 }).addTo(m);
      mk.bindPopup(() => `<b>${esc(z.n)}</b><br><span style="color:#9aa8bb">${esc(z.z)}</span><br>
        <a class="go" href="${esc(cmUrl(z.n))}" target="_blank" rel="noopener" data-cmopen="${esc(z.n)}">1. Apri su Immobiliare ↗</a><br>
        <a class="go" href="#" data-cmsave="${esc(z.n)}">2. ${cmLinks()[z.n] ? "✓ Link salvato (sostituisci)" : "Salva il link copiato"}</a>`);
      mk._cm = z.n;
    });
    m.fitBounds(M.map(z => [z.lat, z.lon]), { padding: [20, 20] });
  }
  if (afterCompleta.bound) return; afterCompleta.bound = true;
  $("#app").addEventListener("click", async e => {
    if (!location.hash.startsWith("#completa")) return;
    const o = e.target.closest("[data-cmopen]"); if (o) { open(o.dataset.cmopen); setTimeout(() => render(true), 400); return; }
    const s = e.target.closest("[data-cmsave]"); if (s) { e.preventDefault(); if (await cmSave(s.dataset.cmsave)) render(true); return; }
    if (e.target.closest("#cmcopy")) { const ok = await lbCopy(cmPrompt()); e.target.textContent = ok ? "✓ Copiato: incollalo in chat" : "Copia non riuscita"; return; }
    if (e.target.closest("#cmclear") && confirm("Svuotare i link raccolti per Milano?")) { store.set(CM_KEY, {}); store.set(CM_OPEN, []); render(true); }
  });
}
