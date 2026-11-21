/* KEYSTONE — Pianta 2D in stile Illustrato, vista dall'alto.
   Stessi colori e dettagli del 3D Illustrato: cucina con piano cottura, lavello e pensili (tratteggiati), letto con cuscini e plaid,
   comodini con lampada, divano con cuscini, tavolo con tovagliette e centrotavola, bagno completo, tende alle finestre e piante.
   Muri bordeaux pieni: le finestre restano sottili, dentro lo spessore del muro. */
const P2 = { o: "#3a1a20", tess: "#f0dcc0", tess2: "#e4c9a4", cusc: "#f8ead6", acc: "#9b2c42", oro: "#d9b25a", plaid: "#c98b4a", legno: "#c08a5a",
  mob: "#f6ecdc", sedia: "#f0dfc4", tap: "#e3c07e", tap2: "#cf9d55", cuc: "#fbf3e6", top: "#c9bcae", testiera: "#e8d2b0", piumone: "#fff7ea",
  arm: "#f7eddc", verde: "#7fa86a", verde2: "#9cc07f", vaso: "#d9b25a", bianco: "#fffdf8", acqua: "#d6e8ee", acciaio: "#b9c2c5", nero: "#2a2526", tenda: "#fffaf0" };

function rnMobSvg(t, w, d, m = {}) {
  const O = P2.o, S = `stroke="${O}" stroke-width="0.018" stroke-linejoin="round"`, W = w / 2, D = d / 2, dx = m.lato === "dx";
  const R = (x, y, ww, hh, f, rr = 0.03, ex = "") => `<rect x="${x}" y="${y}" width="${Math.max(0.001, ww)}" height="${Math.max(0.001, hh)}" rx="${rr}" fill="${f}" ${S} ${ex}/>`;
  const Ci = (x, y, r, f, ex = "") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${S} ${ex}/>`;
  const E = (x, y, rx, ry, f, ex = "") => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${S} ${ex}/>`;
  const G = (tr, s) => `<g transform="${tr}">${s}</g>`;
  const ombra = (x, y, ww, hh, rr = 0.05) => `<rect x="${x + 0.035}" y="${y + 0.045}" width="${ww}" height="${hh}" rx="${rr}" fill="${O}" fill-opacity=".12"/>`;
  const ombraC = (x, y, r) => `<circle cx="${x + 0.035}" cy="${y + 0.045}" r="${r}" fill="${O}" fill-opacity=".12"/>`;
  const pianta = (x, y, r) => { let s = ombraC(x, y, r * 0.95) + Ci(x, y, r * 0.5, P2.vaso);
    for (let i = 0; i < 7; i++) { const a = i / 7 * 360 + 15, ar = a * Math.PI / 180; s += `<ellipse cx="${x + Math.cos(ar) * r * 0.5}" cy="${y + Math.sin(ar) * r * 0.5}" rx="${r * 0.48}" ry="${r * 0.22}" transform="rotate(${a} ${x + Math.cos(ar) * r * 0.5} ${y + Math.sin(ar) * r * 0.5})" fill="${i % 2 ? P2.verde2 : P2.verde}" stroke="${O}" stroke-width="0.012"/>`; }
    return s + `<circle cx="${x}" cy="${y}" r="${r * 0.18}" fill="${P2.verde}"/>`; };
  const fiori = (x, y, r) => Ci(x, y, r * 0.55, P2.bianco) + [[0, 0, P2.verde], [-0.35, -0.3, P2.acc], [0.35, -0.25, P2.oro], [0.3, 0.35, P2.acc], [-0.3, 0.3, P2.bianco], [0, -0.45, P2.verde2], [0.05, 0.5, P2.verde2]]
    .map(([a, b, c]) => `<circle cx="${x + a * r}" cy="${y + b * r}" r="${r * 0.28}" fill="${c}" stroke="${O}" stroke-width="0.01"/>`).join("");
  const sedia = (x, y, rot) => G(`translate(${x},${y}) rotate(${rot})`, ombra(-0.21, -0.2, 0.42, 0.42, 0.06) + R(-0.21, -0.2, 0.42, 0.4, P2.sedia, 0.06) + R(-0.21, 0.14, 0.42, 0.07, P2.legno, 0.03));
  const cuscini = (x0, y0, ww, hh, n) => { let s = ""; const cw = ww / n; for (let i = 0; i < n; i++) s += R(x0 + i * cw + 0.01, y0, cw - 0.02, hh, P2.cusc, 0.05); return s; };
  // una linea di cucina: schiena in y=0, fronte in y=0.62, centrata in x
  const linea = (L, fuochi, lavello) => { const L2 = L / 2; let s = R(-L2, 0, L, 0.62, P2.top, 0.02) + `<line x1="${-L2}" y1="0.6" x2="${L2}" y2="0.6" stroke="#e6ddd2" stroke-width="0.02"/>`;
    // pensili sopra (tratteggiati)
    const hx = L2 - 0.45; s += `<rect x="${-L2 + 0.02}" y="0.02" width="${L - 0.04}" height="0.33" fill="none" stroke="${O}" stroke-width="0.012" stroke-dasharray="0.05 0.035" opacity=".55"/>`;
    if (lavello && L > 1) { const sx = -L2 + Math.max(0.35, L * 0.3); s += R(sx - 0.25, 0.12, 0.5, 0.4, P2.acciaio, 0.05) + R(sx - 0.21, 0.16, 0.42, 0.32, "#9ea9ad", 0.05) + Ci(sx, 0.44, 0.025, "#6f7a7e") + Ci(sx, 0.07, 0.03, "#c9ccce") + `<line x1="${sx}" y1="0.07" x2="${sx}" y2="0.22" stroke="#8a9295" stroke-width="0.025" stroke-linecap="round"/>`
      + pianta(-L2 + 0.14, 0.15, 0.1) + R(sx + 0.32, 0.18, 0.3, 0.2, P2.legno, 0.03); }
    if (fuochi && L > 0.7) { s += R(hx - 0.3, 0.06, 0.6, 0.5, P2.nero, 0.03); for (const [a, b, r] of [[-0.14, 0.18, 0.08], [0.14, 0.18, 0.06], [-0.14, 0.43, 0.06], [0.14, 0.43, 0.08]]) s += `<circle cx="${hx + a}" cy="${b}" r="${r}" fill="none" stroke="#77777d" stroke-width="0.014"/><circle cx="${hx + a}" cy="${b}" r="${r * 0.45}" fill="none" stroke="#5a5a60" stroke-width="0.01"/>`;
      s += `<rect x="${hx - 0.31}" y="0.02" width="0.62" height="0.42" fill="none" stroke="${O}" stroke-width="0.012" stroke-dasharray="0.03 0.03" opacity=".6"/>`; }
    return s; };
  if (t.startsWith("cucina")) {
    if (m.v === "angolare") { const lato = d - 0.62, cy = -D + 0.62 + lato / 2;
      return ombra(-W, -D, w, 0.62, 0.02) + G(`translate(0,${-D})`, linea(w, true, false)) + G(dx ? `translate(${W},${cy}) rotate(90)` : `translate(${-W},${cy}) rotate(-90)`, linea(lato, false, true)); }
    if (m.v === "isola") { const iw = Math.min(w * 0.7, 2.2);
      return G(`translate(0,${-D})`, linea(w, true, true)) + ombra(-iw / 2, D - 0.9, iw, 0.9) + R(-iw / 2, D - 0.9, iw, 0.9, P2.top, 0.03) + fiori(iw / 4, D - 0.45, 0.1) + R(-iw / 4 - 0.17, D - 0.6, 0.34, 0.24, P2.legno, 0.03)
        + [-1, 0, 1].map(i => ombraC(i * iw / 3, D + 0.25, 0.17) + Ci(i * iw / 3, D + 0.25, 0.17, P2.sedia) + Ci(i * iw / 3, D + 0.25, 0.1, P2.cusc)).join(""); }
    return G(`translate(0,${-D})`, linea(w, true, true));
  }
  if (t === "divano" && m.v === "angolare") { const a = 0.92, xA = dx ? W - a : -W, xs = dx ? -W + 0.18 : -W + a, ws = w - a - 0.18;
    return ombra(-W, -D, w, a) + ombra(xA, -D, a, d) + R(-W, -D, w, a, P2.tess2, 0.06) + R(xA, -D, a, d, P2.tess2, 0.06)
      + R(-W, -D, w, 0.22, P2.tess2, 0.05) + R(dx ? W - 0.22 : -W, -D, 0.22, d, P2.tess2, 0.05) + R(dx ? -W : W - 0.18, -D, 0.18, a, P2.tess2, 0.05)
      + cuscini(xs, -D + 0.22, ws, a - 0.28, ws > 1.6 ? 2 : 1) + R(xA + (dx ? 0.02 : 0.22), -D + 0.22, a - 0.24, d - 0.26, P2.cusc, 0.05)
      + G(`translate(${dx ? W - 0.4 : -W + 0.4},${-D + 0.4}) rotate(45)`, R(-0.2, -0.07, 0.4, 0.14, P2.acc, 0.05))
      + G(`translate(${dx ? -W + 0.45 : W - 0.45},${-D + 0.32}) rotate(8)`, R(-0.2, -0.07, 0.4, 0.14, P2.oro, 0.05))
      + R(xA + (dx ? 0.06 : 0.26), D - 0.55, a - 0.32, 0.38, P2.plaid, 0.03, 'fill-opacity=".92"'); }
  switch (t) {
    case "divano": { const n = w > 2 ? 3 : 2;
      return ombra(-W, -D, w, d) + R(-W, -D, w, d, P2.tess2, 0.08) + R(-W, -D, w, 0.22, P2.tess2, 0.06) + R(-W, -D, 0.18, d, P2.tess2, 0.06) + R(W - 0.18, -D, 0.18, d, P2.tess2, 0.06)
        + cuscini(-W + 0.18, -D + 0.22, w - 0.36, d - 0.28, n)
        + G(`translate(${-W + 0.45},${-D + 0.32}) rotate(-10)`, R(-0.2, -0.07, 0.4, 0.14, P2.acc, 0.05)) + G(`translate(${W - 0.45},${-D + 0.32}) rotate(9)`, R(-0.2, -0.07, 0.4, 0.14, P2.oro, 0.05))
        + R(W - 0.72, -D + 0.18, 0.4, d - 0.14, P2.plaid, 0.03, 'fill-opacity=".92"'); }
    case "poltrona": return ombra(-W, -D, w, d) + R(-W, -D, w, d, P2.tess2, 0.08) + R(-W, -D, w, 0.2, P2.tess2, 0.06) + R(-W + 0.14, -D + 0.2, w - 0.28, d - 0.26, P2.cusc, 0.05) + G(`translate(0,${-D + 0.3}) rotate(-6)`, R(-0.17, -0.06, 0.34, 0.12, P2.acc, 0.05));
    case "tavolino": if (m.v === "tondo") return ombraC(0, 0, W) + Ci(0, 0, W, P2.legno) + Ci(-W * 0.3, 0, W * 0.3, P2.acc) + pianta(W * 0.4, -W * 0.1, Math.min(0.12, W * 0.3));
      return ombra(-W, -D, w, d, 0.04) + R(-W, -D, w, d, P2.legno, 0.04) + R(-W * 0.75, -0.11, 0.3, 0.22, P2.acc, 0.03) + R(-W * 0.75 + 0.03, -0.09, 0.24, 0.17, P2.cusc, 0.02) + pianta(W * 0.5, 0, Math.min(0.12, D * 0.5));
    case "tv": { const tw = Math.min(1.2, w - 0.6); return ombra(-W, -D, w, d, 0.03) + R(-W, -D, w, d, P2.mob, 0.03) + R(-tw / 2, -D + 0.04, tw, 0.07, P2.nero, 0.02) + pianta(W - 0.16, 0, Math.min(0.13, D * 0.7)) + R(-W + 0.06, -0.04, 0.18, 0.13, P2.acc, 0.02); }
    case "tavolo6": case "tavolo4": {
      if (m.v === "tondo") { const n = Math.max(3, Math.round(Math.PI * w / 0.65)); let s = "";
        for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; s += sedia(Math.cos(a) * (W + 0.18), Math.sin(a) * (W + 0.18), a * 180 / Math.PI + 90); }
        s += ombraC(0, 0, W) + Ci(0, 0, W, P2.legno);
        for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; s += `<ellipse cx="${Math.cos(a) * (W - 0.18)}" cy="${Math.sin(a) * (W - 0.18)}" rx="0.15" ry="0.11" transform="rotate(${a * 180 / Math.PI + 90} ${Math.cos(a) * (W - 0.18)} ${Math.sin(a) * (W - 0.18)})" fill="${P2.bianco}" stroke="${O}" stroke-width="0.01"/>`; }
        return s + fiori(0, 0, 0.13); }
      let s = "", posti = [];
      if (m.v === "quadrato") posti = [[0, -1], [0, 1], [-1, 0], [1, 0]].map(([a, b]) => [a * (W + 0.18), b * (D + 0.18), a ? (a > 0 ? 90 : -90) : (b > 0 ? 0 : 180), a * (W - 0.2), b * (D - 0.16)]);
      else { const n = t === "tavolo6" || w > 1.5 ? 3 : 2; for (let i = 0; i < n; i++) { const x = -W + (i + 0.5) * w / n; posti.push([x, -D - 0.18, 180, x, -D + 0.16], [x, D + 0.18, 0, x, D - 0.16]); } }
      for (const [x, y, r] of posti) s += sedia(x, y, r);
      s += ombra(-W, -D, w, d) + R(-W, -D, w, d, P2.legno, 0.05);
      for (const [, , r, x, y] of posti) s += G(`translate(${x},${y}) rotate(${r})`, R(-0.17, -0.12, 0.34, 0.24, P2.bianco, 0.02) + `<circle cx="0" cy="0" r="0.07" fill="none" stroke="${O}" stroke-width="0.01" opacity=".5"/>`);
      return s + fiori(0, 0, 0.13); }
    case "tappeto": if (m.v === "tondo") return Ci(0, 0, W, P2.tap, 'stroke-opacity=".4"') + `<circle cx="0" cy="0" r="${W - 0.12}" fill="none" stroke="${P2.tap2}" stroke-width="0.05"/><circle cx="0" cy="0" r="${W * 0.35}" fill="none" stroke="${P2.tap2}" stroke-width="0.03"/>`;
      return R(-W, -D, w, d, P2.tap, 0.02, 'stroke-opacity=".4"') + `<rect x="${-W + 0.1}" y="${-D + 0.1}" width="${w - 0.2}" height="${d - 0.2}" fill="none" stroke="${P2.tap2}" stroke-width="0.05"/><rect x="${-W + 0.22}" y="${-D + 0.22}" width="${w - 0.44}" height="${d - 0.44}" fill="none" stroke="${P2.tap2}" stroke-width="0.015"/>`
        + Array.from({ length: Math.max(2, Math.round(d / 0.06)) }, (_, i) => { const y = -D + 0.03 + i * (d - 0.06) / Math.max(1, Math.round(d / 0.06) - 1); return `<line x1="${-W - 0.05}" y1="${y}" x2="${-W}" y2="${y}" stroke="${P2.tap2}" stroke-width="0.012"/><line x1="${W}" y1="${y}" x2="${W + 0.05}" y2="${y}" stroke="${P2.tap2}" stroke-width="0.012"/>`; }).join("");
    case "frigo": return ombra(-W, -D, w, d, 0.03) + R(-W, -D, w, d, P2.cuc, 0.03) + `<line x1="${-W + 0.04}" y1="${D - 0.06}" x2="${W - 0.04}" y2="${D - 0.06}" stroke="${O}" stroke-width="0.012"/>` + R(W - 0.14, D - 0.05, 0.08, 0.025, P2.oro, 0.01);
    case "letto2": case "letto1": { const np = t === "letto2" ? 2 : 1; let s = ombra(-W - 0.03, -D, w + 0.06, d + 0.02) + R(-W - 0.03, -D, w + 0.06, d + 0.02, P2.legno, 0.05) + R(-W - 0.03, -D, w + 0.06, 0.1, P2.testiera, 0.04)
        + R(-W, -D + 0.1, w, d - 0.12, P2.bianco, 0.05);
      for (let i = 0; i < np; i++) { const cx = -W + (i + 0.5) * w / np; s += R(cx - (w / np - 0.14) / 2, -D + 0.16, w / np - 0.14, 0.34, P2.bianco, 0.08) + G(`translate(${cx},${-D + 0.55}) rotate(${i ? 6 : -6})`, R(-(w / np - 0.32) / 2, -0.065, w / np - 0.32, 0.13, i ? P2.oro : P2.acc, 0.05)); }
      s += R(-W, -D + d * 0.36, w, d * 0.64 - 0.02, P2.piumone, 0.05) + R(-W, -D + d * 0.36, w, 0.14, "#f3e6d0", 0.05)
        + `<line x1="${-W + 0.1}" y1="${-D + d * 0.62}" x2="${W - 0.1}" y2="${-D + d * 0.62}" stroke="#eadcc4" stroke-width="0.012"/>`
        + R(-W - 0.04, D - 0.52, w + 0.08, 0.36, P2.plaid, 0.03) + [0.08, 0.18, 0.28].map(y => `<line x1="${-W - 0.04}" y1="${D - 0.52 + y}" x2="${W + 0.04}" y2="${D - 0.52 + y}" stroke="#b07a40" stroke-width="0.01"/>`).join("");
      return s; }
    case "comodino": return ombra(-W, -D, w, d, 0.04) + R(-W, -D, w, d, P2.legno, 0.04) + Ci(-0.04, -0.03, Math.min(0.13, W * 0.6), "#f6eee0") + Ci(-0.04, -0.03, 0.035, P2.oro) + G(`translate(${W - 0.1},${D - 0.09}) rotate(-12)`, R(-0.07, -0.05, 0.14, 0.1, P2.acc, 0.01));
    case "armadio": case "armadio1": { const n = Math.max(2, Math.round(w / 0.5)); let s = ombra(-W, -D, w, d, 0.02) + R(-W, -D, w, d, P2.arm, 0.02) + `<line x1="${-W + 0.06}" y1="0" x2="${W - 0.06}" y2="0" stroke="${O}" stroke-width="0.012" stroke-dasharray="0.05 0.04" opacity=".45"/>`;
      for (let i = 1; i < n; i++) s += `<line x1="${-W + i * w / n}" y1="${D - 0.05}" x2="${-W + i * w / n}" y2="${D}" stroke="${O}" stroke-width="0.014"/>`;
      for (let i = 0; i < n; i++) s += R(-W + (i + 0.5) * w / n + (i % 2 ? 0.07 : -0.07) - 0.015, D - 0.03, 0.03, 0.05, P2.oro, 0.01);
      return s; }
    case "scrivania": return R(-0.22, D + 0.04, 0.44, 0.42, P2.sedia, 0.1) + ombra(-W, -D, w, d, 0.03) + R(-W, -D, w, d, P2.legno, 0.03) + R(-0.18, -0.13, 0.36, 0.24, "#d5d9dc", 0.02) + Ci(W - 0.18, -D + 0.16, 0.11, "#f6eee0") + Ci(W - 0.18, -D + 0.16, 0.03, P2.oro) + pianta(-W + 0.16, -D + 0.16, 0.1);
    case "libreria": { const C = [P2.acc, P2.oro, P2.tess2, "#7a8c9e", P2.cusc, P2.plaid, P2.verde2]; let s = ombra(-W, -D, w, d, 0.02) + R(-W, -D, w, d, P2.mob, 0.02), x = -W + 0.05, i = 0;
      while (x < W - 0.08) { const bw = 0.03 + ((i * 37) % 5) * 0.008; if (i % 9 !== 8) s += `<rect x="${x}" y="${-D + 0.05}" width="${bw}" height="${d - 0.1}" fill="${C[i % C.length]}" stroke="${O}" stroke-width="0.006"/>`; x += bw + 0.004; i++; }
      return s; }
    case "wc": return ombra(-W, -D, w, d, 0.1) + R(-W, -D, w, 0.18, P2.bianco, 0.04) + E(0, -D + 0.38, W - 0.01, 0.23, P2.bianco) + E(0, -D + 0.4, W - 0.08, 0.16, "#eef3f4");
    case "bidet": return ombra(-W, -D, w, d, 0.1) + R(-W, -D, w, 0.14, P2.bianco, 0.04) + E(0, -D + 0.33, W - 0.01, 0.21, P2.bianco) + E(0, -D + 0.34, W - 0.08, 0.14, P2.acqua) + Ci(0, -D + 0.08, 0.025, P2.acciaio);
    case "lavabo": return ombra(-W, -D, w, d, 0.05) + R(-W, -D, w, d, P2.bianco, 0.06) + E(0, 0.03, W - 0.1, D - 0.1, P2.acqua) + Ci(0, -D + 0.07, 0.03, P2.acciaio) + R(W + 0.04, -D + 0.02, 0.06, 0.4, P2.oro, 0.02) + R(-W + 0.05, -D + 0.04, 0.1, 0.06, P2.verde2, 0.02);
    case "doccia": return R(-W, -D, w, d, "#e3eef1", 0.02) + `<g stroke="#c8d8dd" stroke-width="0.008">${Array.from({ length: Math.floor(w / 0.15) }, (_, i) => `<line x1="${-W + (i + 1) * 0.15}" y1="${-D}" x2="${-W + (i + 1) * 0.15}" y2="${D}"/>`).join("")}</g>`
      + Ci(0, 0, 0.04, P2.acciaio) + Ci(0, -D + 0.14, 0.09, "#e6ecee") + `<line x1="${-W}" y1="${D}" x2="${W}" y2="${D}" stroke="#7fb0c4" stroke-width="0.035"/>`;
    case "vasca": return ombra(-W, -D, w, d, 0.12) + R(-W, -D, w, d, P2.bianco, 0.12) + `<rect x="${-W + 0.08}" y="${-D + 0.08}" width="${w - 0.16}" height="${d - 0.16}" rx="0.25" fill="${P2.acqua}" ${S}/>` + Ci(-W + 0.18, 0, 0.03, P2.acciaio) + R(W - 0.55, D - 0.14, 0.42, 0.2, P2.oro, 0.03);
    case "consolle": return ombra(-W, -D, w, d, 0.03) + R(-W, -D, w, d, P2.legno, 0.03) + pianta(W * 0.5, 0, Math.min(0.13, D * 0.8)) + Ci(-W * 0.4, 0, Math.min(0.1, D * 0.6), P2.bianco);
    case "esterno": return sedia(-W - 0.15, 0, -90) + sedia(W + 0.15, 0, 90) + ombraC(0, 0, W * 0.6) + Ci(0, 0, W * 0.6, P2.legno) + pianta(0, 0, Math.min(0.12, W * 0.3));
    case "pianta": return pianta(0, 0, W);
    default: return ombra(-W, -D, w, d) + R(-W, -D, w, d, P2.mob, 0.03);
  }
}

// muri pieni bordeaux (come il bordo dei muri nel 3D Illustrato)
function rnMuriPng(p) {
  const c = document.createElement("canvas"); c.width = p.W; c.height = p.H; const g = c.getContext("2d"), d = g.createImageData(p.W, p.H);
  const m = rnMaschera(p); for (let i = 0; i < m.length; i++) if (m[i]) { d.data[i * 4] = 122; d.data[i * 4 + 1] = 31; d.data[i * 4 + 2] = 51; d.data[i * 4 + 3] = 255; }
  g.putImageData(d, 0, 0); return c.toDataURL("image/png");
}

// pavimenti caldi, tende alle finestre e piante vicino alle finestre
{ const sv = rnSvg; rnSvg = function (p, opt = {}) {
  let out = sv(p, opt).replace(/#ead8b8/g, "#ebcfa0").replace(/#d9c19a/g, "#d5b27d").replace(/#f4eee6/g, "#eef0ec").replace(/#ddd2c4/g, "#d3dad5");
  if (opt.solo === "sotto" || opt.lavori || !p.scala || !(p.mobili || []).length) return out;
  const k = 1 / p.scala, O = P2.o; let deco = "";
  const usate = new Set();
  for (const f of p.finestre || []) { const [x0, y0, x1, y1] = f.seg, L = Math.hypot(x1 - x0, y1 - y0) || 1, tx = (x1 - x0) / L, ty = (y1 - y0) / L, [nx, ny] = f.n || [-ty, tx];
    const st = (p.stanze || []).find(r => r.id === f.st), bagno = st && RN_TIPI[st.tipo]?.pav === "piastrelle";
    const P = (a, b) => [(x0 + tx * a * k - nx * b * k), (y0 + ty * a * k - ny * b * k)], Lm = L / k;
    if (!bagno) {
      // bastone dorato, velo leggero e tende raccolte ai lati
      const [ax, ay] = P(-0.22, 0.05), [bx, by] = P(Lm + 0.22, 0.05), [vx, vy] = P(0, 0.09), [wx, wy] = P(Lm, 0.09);
      deco += `<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="${P2.oro}" stroke-width="${0.025 * k}" stroke-linecap="round"/>`;
      deco += `<line x1="${vx}" y1="${vy}" x2="${wx}" y2="${wy}" stroke="${P2.tenda}" stroke-width="${0.03 * k}" stroke-dasharray="${0.08 * k} ${0.04 * k}" opacity=".9"/>`;
      for (const a0 of [-0.16, Lm - 0.02]) for (let i = 0; i < 3; i++) { const [cx, cy] = P(a0 + i * 0.07, 0.11 + (i % 2) * 0.03);
        deco += `<ellipse cx="${cx}" cy="${cy}" rx="${0.06 * k}" ry="${0.085 * k}" transform="rotate(${Math.atan2(ty, tx) * 180 / Math.PI} ${cx} ${cy})" fill="${P2.tenda}" stroke="${O}" stroke-width="${0.01 * k}" stroke-opacity=".6"/>`; } }
    // una pianta accanto alla finestra, se c'è posto
    if (!st || usate.has(st.id) || ["bagno", "disimpegno", "ripostiglio", "ingresso"].includes(st.tipo)) continue;
    for (const [a, b] of [[Lm + 0.45, 0.4], [-0.45, 0.4]]) { const q = P(a, b);
      if (!RN.dentro(q, st.poly) || RN.distBordo(q, st.poly) < 0.22 * k) continue;
      const libero = !(p.mobili || []).some(m => { if (m.tipo === "tappeto") return false; const [mw, md] = rnDim(m), r = Math.hypot(mw, md) / 2 * k + 0.3 * k; return Math.hypot(q[0] - m.x, q[1] - m.y) < r; });
      if (!libero) continue;
      deco += `<g transform="translate(${q[0]},${q[1]}) scale(${k})">${rnMobSvg("pianta", 0.56, 0.56)}</g>`; usate.add(st.id); break; } }
  if (!deco) return out;
  const i = out.indexOf('<g font-family="Barlow'); return i > 0 ? out.slice(0, i) + deco + out.slice(i) : out.replace(/<\/svg>$/, deco + "</svg>"); }; }
