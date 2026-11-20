// KEYSTONE — registro delle novità di ogni giorno (avvisi email di Immobiliare letti da Claude)
// uso: node tools/novita.js --data 2026-11-21 --inv 134830179,129636810 --mil 135001234,135004321 --priv 135004321 --scartati 3 --nota "testo breve"
//   --inv   id Immobiliare degli immobili d'investimento caricati in tools/auto_raw.json
//   --mil   id Immobiliare degli annunci di Milano aggiunti a tools/terr/raw_immobiliare_milano.txt
//   --priv  quelli di Milano che sono di privati (sottoinsieme di --mil)
//   --scartati  quanti annunci dell'avviso sono stati scartati (ruderi, aste, doppioni…)
// Unisce alla giornata se esiste già, poi riscrive data/novita.js.
const fs = require("fs"), path = require("path");
const R = p => path.join(__dirname, "..", p), F = R("tools/novita.json");
const arg = k => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : null; };
const ids = k => (arg(k) || "").split(",").map(s => s.trim()).filter(Boolean);
const db = fs.existsSync(F) ? JSON.parse(fs.readFileSync(F, "utf8")) : { giorni: [], dal: {} };
const data = arg("data");
if (data) {
  let g = db.giorni.find(x => x.data === data);
  if (!g) { g = { data, inv: [], mil: [], priv: [], scartati: 0, nota: "" }; db.giorni.push(g); }
  const add = (k, v) => v.forEach(id => { if (!g[k].includes(id)) g[k].push(id); });
  add("inv", ids("inv")); add("mil", ids("mil")); add("priv", ids("priv"));
  g.scartati += +(arg("scartati") || 0); if (arg("nota")) g.nota = arg("nota");
  [...g.inv, ...g.mil].forEach(id => { if (!db.dal[id]) db.dal[id] = data; });
  db.giorni.sort((a, b) => a.data.localeCompare(b.data));
  fs.writeFileSync(F, JSON.stringify(db, null, 1));
}
const out = { giorni: db.giorni.slice(-30), dal: db.dal };
fs.writeFileSync(R("data/novita.js"), "// KEYSTONE — novità dagli avvisi giornalieri di Immobiliare. Generato da tools/novita.js: non modificare a mano.\nconst NOVITA = " + JSON.stringify(out) + ";\n");
const u = db.giorni[db.giorni.length - 1];
console.log(u ? `${u.data}: ${u.inv.length} investimenti, ${u.mil.length} Milano (${u.priv.length} privati), ${u.scartati} scartati` : "nessuna giornata");
