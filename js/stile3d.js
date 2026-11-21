/* KEYSTONE — 3D in tre stili (Maison, Luce, Illustrato) con arredo dettagliato e decorazioni automatiche:
   cucina completa (lavello, piano cottura, forno, pensili, cappa), letto con cuscini e plaid, comodini con lampade,
   divano con cuscini, tavolo con sedie e centrotavola, tende leggere alle finestre, piante vicino alle finestre. */
const RN3S = {
  maison: { n: "Maison", h: 2.2, fronte: 0.9, esterno: "#efe6d6", legno: "#d9b98a", piastrelle: "#ebe6de", muro: "#fbf7f0", cap: "#6a1828", davanzale: "#e9e1d3",
    tessuto: "#e8dcc6", tessuto2: "#ddcdb2", cuscino: "#f1e7d6", accento: "#7a1f33", oro: "#c9a24b", plaid: "#b9894a", legnoM: "#a77c52", mobile: "#efe5d6",
    sedia: "#e4d6bf", tappeto: "#d6bf95", tappeto2: "#c4a36b", cucina: "#f1ebe1", top: "#6e6560", alzatina: "#e6ddd0", testiera: "#d8c6aa", piumone: "#f7f1e6",
    armadio: "#efe6d8", asciugamano: "#c9a24b", verde: "#6f8f5a", verde2: "#86a56c", tenda: "#fbf6ec", vaso: "#c9a24b", sfondo: "#f6efe4" },
  luce: { n: "Luce", h: 2.7, fronte: 1.0, esterno: "#e9e4dc", legno: "#caa679", piastrelle: "#e7e3dd", muro: "#f6f3ee", cap: "#e9e2d6", davanzale: "#efebe5",
    tessuto: "#cfc7bb", tessuto2: "#c2b9ab", cuscino: "#ddd6ca", accento: "#6a1828", oro: "#b8913a", plaid: "#8e6f4e", legnoM: "#8a6646", mobile: "#ece7df",
    sedia: "#6d5a49", tappeto: "#d9d1c3", tappeto2: "#c9bfae", cucina: "#e9e5de", top: "#2f2c2b", alzatina: "#d9d3ca", testiera: "#bfb3a1", piumone: "#f4f1ec",
    armadio: "#ebe6de", asciugamano: "#e6dccb", verde: "#5c7a4c", verde2: "#7a9765", tenda: "#f7f5f1", vaso: "#d8d2c8", sfondo: "#f3efe9" },
  illustrato: { n: "Illustrato", h: 2.0, fronte: 0.6, orto: true, esterno: "#f4ecdf", legno: "#e6c99a", piastrelle: "#eef0ec", muro: "#fffaf2", cap: "#7a1f33", davanzale: "#f0e4cf",
    tessuto: "#f0dcc0", tessuto2: "#e4c9a4", cuscino: "#f8ead6", accento: "#9b2c42", oro: "#d9b25a", plaid: "#c98b4a", legnoM: "#c08a5a", mobile: "#f6ecdc",
    sedia: "#f0dfc4", tappeto: "#e3c07e", tappeto2: "#cf9d55", cucina: "#fbf3e6", top: "#8d7f78", alzatina: "#f0e6d8", testiera: "#e8d2b0", piumone: "#fff7ea",
    armadio: "#f7eddc", asciugamano: "#d9b25a", verde: "#7fa86a", verde2: "#9cc07f", tenda: "#fffaf0", vaso: "#d9b25a", sfondo: "#f6efe4" }
};
RN3S.foto = { n: "Foto", h: 2.7, fronte: 2.7, foto: true, esterno: "#ebe7e1", legno: "#d2b48c", piastrelle: "#ecebe8", muro: "#ece6dd", cap: "#d9d1c6", davanzale: "#f2efe9",
  tessuto: "#d9cfc1", tessuto2: "#cbbfae", cuscino: "#e6ddd0", accento: "#7a2a35", oro: "#b8955a", plaid: "#a89580", legnoM: "#6e5038", mobile: "#efe9e1",
  sedia: "#d8ccbb", tappeto: "#e4ddd2", tappeto2: "#d3c9ba", cucina: "#f1ede7", top: "#eeebe6", alzatina: "#e7e2da", testiera: "#cdbfad", piumone: "#f5f1ea",
  armadio: "#ebe4da", asciugamano: "#e8dfd2", verde: "#56743f", verde2: "#738f58", tenda: "#fbfaf7", vaso: "#d8d2c8", sfondo: "#f4f1ec" };
// texture disegnate al volo (niente download): parquet a spina di pesce, marmo, tessuto
const RN_TEX = {};
function rnTex(THREE, tipo) { if (RN_TEX[tipo]) return RN_TEX[tipo];
  const c = document.createElement("canvas"), N = tipo === "tessuto" ? 256 : 1024; c.width = c.height = N; const g = c.getContext("2d"), R = (a, b) => a + Math.random() * (b - a);
  let metri = 1;
  if (tipo === "parquet") { metri = 1.2; const k = N / metri, W = 0.1 * k, L = 0.6 * k, tinte = ["#b88a5c", "#c29567", "#ad8053", "#c89e70", "#b3875a", "#bd9062"];
    g.fillStyle = "#9c7550"; g.fillRect(0, 0, N, N);
    const tavola = (x, y, w, h) => { const col = tinte[Math.floor(Math.random() * tinte.length)], gr = [0, 1, 2, 3, 4].map(() => [R(2, (w > h ? h : w) - 2), R(-3, 3), R(-3, 3), R(-2, 2)]);
      for (const ox of [-N, 0, N]) for (const oy of [-N, 0, N]) { const X = x + ox, Y = y + oy; if (X > N || Y > N || X + w < 0 || Y + h < 0) continue;
      g.fillStyle = col; g.fillRect(X, Y, w, h);
      g.strokeStyle = "rgba(90,60,35,.10)"; g.lineWidth = 1; for (const [o, a1, a2, a3] of gr) { g.beginPath(); if (w > h) { const yy = Y + o; g.moveTo(X, yy); g.bezierCurveTo(X + w * .3, yy + a1, X + w * .7, yy + a2, X + w, yy + a3); } else { const xx = X + o; g.moveTo(xx, Y); g.bezierCurveTo(xx + a1, Y + h * .3, xx + a2, Y + h * .7, xx + a3, Y + h); } g.stroke(); }
      g.strokeStyle = "rgba(70,45,25,.55)"; g.lineWidth = 1.5; g.strokeRect(X + .5, Y + .5, w - 1, h - 1); } };
    const kk = Math.round(L / W); for (let c0 = -3; c0 <= 3; c0++) for (let i = -2 * kk; i < 2 * kk; i++) { const bx = (i + c0 * kk) * W, by = (i - c0 * kk) * W;
      tavola(((bx % N) + N) % N, ((by % N) + N) % N, L, W); tavola((((bx + L) % N) + N) % N, (((by - L + W) % N) + N) % N, W, L); } }
  else if (tipo === "marmo") { metri = 1.2; g.fillStyle = "#efedea"; g.fillRect(0, 0, N, N);
    for (let i = 0; i < 26; i++) { g.strokeStyle = `rgba(${R(120, 170)},${R(120, 165)},${R(120, 160)},${R(.08, .28)})`; g.lineWidth = R(.6, 2.4); g.beginPath(); let x = R(0, N), y = R(0, N); g.moveTo(x, y); for (let j = 0; j < 6; j++) { x += R(-160, 220); y += R(-120, 160); g.quadraticCurveTo(x + R(-60, 60), y + R(-60, 60), x, y); } g.stroke(); }
    g.strokeStyle = "rgba(170,165,158,.9)"; g.lineWidth = 2; for (const t of [1, N / 2]) { g.beginPath(); g.moveTo(t, 0); g.lineTo(t, N); g.moveTo(0, t); g.lineTo(N, t); g.stroke(); } }
  else { metri = 0.25; const d = g.createImageData(N, N); for (let i = 0; i < N * N; i++) { const x = i % N, y = (i / N) | 0, v = 228 + ((x + y) % 3 === 0 ? 10 : 0) + R(-14, 14); d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v; d.data[i * 4 + 3] = 255; } g.putImageData(d, 0, 0); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1 / metri, 1 / metri); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return (RN_TEX[tipo] = t); }
Object.keys(RN_STILI3D).forEach(k => delete RN_STILI3D[k]); Object.assign(RN_STILI3D, { maison: ["Maison", 2.2], luce: ["Luce", 2.7], illustrato: ["Illustrato", 2.0], foto: ["Foto", 2.7] });

rn3D = async function (host, p, stile, opt = {}) {
  const THREE = await import("https://esm.sh/three@0.160.0");
  const { OrbitControls } = await import("https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js");
  if (!RN3S[stile]) stile = "maison";
  const FOTO = !!RN3S[stile].foto, dentro = FOTO && opt.vista && opt.vista !== "alto" ? (p.stanze || []).find(r => r.id === opt.vista) : null;
  const RBG = FOTO ? (await import("https://esm.sh/three@0.160.0/examples/jsm/geometries/RoundedBoxGeometry.js")).RoundedBoxGeometry : null;
  const ENV = FOTO ? (await import("https://esm.sh/three@0.160.0/examples/jsm/environments/RoomEnvironment.js")).RoomEnvironment : null;
  const S = RN3S[stile], s = p.scala, HW = S.h, ill = !!S.orto;
  const bb = RN.bbox((p.stanze || []).flatMap(st => st.poly)), X0 = bb.x0 * s, X1 = bb.x1 * s, Z0 = bb.y0 * s, Z1 = bb.y1 * s, cx = (X0 + X1) / 2, cz = (Z0 + Z1) / 2, span = Math.max(X1 - X0, Z1 - Z0);
  const ren = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true }); ren.setPixelRatio(Math.min(2, devicePixelRatio));
  ren.shadowMap.enabled = !ill; ren.shadowMap.type = THREE.PCFSoftShadowMap;
  if (FOTO) { ren.toneMapping = THREE.ACESFilmicToneMapping; ren.toneMappingExposure = 1.0; }
  const w = host.clientWidth, h = Math.round(w * 0.75); ren.setSize(w, h); host.innerHTML = ""; host.appendChild(ren.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color(S.sfondo);
  let cam;
  if (ill) { const e = span * 0.75; cam = new THREE.OrthographicCamera(-e * w / h, e * w / h, e, -e, 0.1, 200); cam.position.set(cx + span, span * 1.15, cz + span); }
  else { cam = new THREE.PerspectiveCamera(stile === "luce" ? 40 : 38, w / h, 0.1, 200); const d = span; cam.position.set(cx + d * (stile === "luce" ? 0.5 : 0.45), d * (stile === "luce" ? 1.15 : 1.05), cz + d * (stile === "luce" ? 0.75 : 0.95)); }
  let guarda = [cx, 0, cz];
  if (FOTO && !dentro) { cam = new THREE.PerspectiveCamera(32, w / h, 0.1, 300); cam.position.set(cx, span * 2.05, cz + span * 0.42); }
  if (dentro) { // in piedi nella stanza, nell'angolo più lontano dalle finestre, guardando verso la luce
    const P = dentro.poly.map(([x, y]) => [x * s, y * s]), b = RN.bbox(dentro.poly), C = [(b.x0 + b.x1) / 2 * s, (b.y0 + b.y1) / 2 * s];
    const F = (p.finestre || []).filter(f => f.st === dentro.id), FC = F.length ? [F.reduce((a, f) => a + (f.seg[0] + f.seg[2]) / 2, 0) / F.length * s, F.reduce((a, f) => a + (f.seg[1] + f.seg[3]) / 2, 0) / F.length * s] : null;
    const ingombri = (p.mobili || []).filter(m => m.tipo !== "tappeto").map(m => { const [mw, md] = rnDim(m), r = m.rot * Math.PI / 180, hw = (Math.abs(Math.cos(r)) * mw + Math.abs(Math.sin(r)) * md) / 2, hd = (Math.abs(Math.sin(r)) * mw + Math.abs(Math.cos(r)) * md) / 2;
      return { x0: m.x * s - hw, x1: m.x * s + hw, z0: m.y * s - hd, z1: m.y * s + hd, alto: /armadio|libreria|frigo|cucina|doccia/.test(m.tipo) }; });
    const dentroM = (x, z, mg, soloAlti) => ingombri.some(r => (!soloAlti || r.alto) && x > r.x0 - mg && x < r.x1 + mg && z > r.z0 - mg && z < r.z1 + mg);
    let best = null, bs = -Infinity;
    for (let x = b.x0 * s; x <= b.x1 * s; x += 0.2) for (let z = b.y0 * s; z <= b.y1 * s; z += 0.2) { if (!RN.dentro([x / s, z / s], dentro.poly) || RN.distBordo([x / s, z / s], dentro.poly) * s < 0.35 || dentroM(x, z, 0.6)) continue;
      let vista = true; for (let t = 0.1; t < 1; t += 0.1) if (dentroM(x + (C[0] - x) * t, z + (C[1] - z) * t, 0.05, true)) { vista = false; break; } if (!vista) continue;
      const sc = Math.hypot(x - C[0], z - C[1]) + (FC ? Math.hypot(x - FC[0], z - FC[1]) * 0.8 : 0); if (sc > bs) { bs = sc; best = [x, z]; } }
    best = best || C; const T = FC ? [(C[0] * 0.6 + FC[0] * 0.4), (C[1] * 0.6 + FC[1] * 0.4)] : C;
    cam = new THREE.PerspectiveCamera(64, w / h, 0.05, 100); cam.position.set(best[0], 1.45, best[1]); guarda = [T[0], 1.15, T[1]];
    scene.background = new THREE.Color("#eef2f4"); }
  const ctl = new OrbitControls(cam, ren.domElement); ctl.target.set(...guarda); if (!dentro) ctl.maxPolarAngle = Math.PI * 0.47;
  if (dentro) { const k = 0.02; ctl.target.set(cam.position.x + (guarda[0] - cam.position.x) * k, cam.position.y + (guarda[1] - cam.position.y) * k, cam.position.z + (guarda[2] - cam.position.z) * k); ctl.enableZoom = false; ctl.enablePan = false; ctl.rotateSpeed = -0.35; } ctl.enableDamping = true; ctl.update();
  // luci: dal lato di chi guarda, morbide
  scene.add(new THREE.HemisphereLight(0xfffaf0, 0xc9b89a, ill ? 1.25 : 1.0));
  const sun = new THREE.DirectionalLight(0xfff3df, ill ? 0.6 : 1.25); sun.position.set(cx + span * 0.5, span * 1.5, cz + span * 0.9); sun.target.position.set(cx, 0, cz);
  if (!ill) { sun.castShadow = true; const e = span * 0.9; Object.assign(sun.shadow.camera, { left: -e, right: e, top: e, bottom: -e, near: 0.1, far: span * 5 }); sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0006; sun.shadow.radius = 4; }
  scene.add(sun, sun.target);
  if (FOTO) { // luce d'ambiente realistica e sole che entra dalle finestre
    const pm = new THREE.PMREMGenerator(ren); scene.environment = pm.fromScene(new ENV(), 0.04).texture;
    scene.children.filter(o => o.isHemisphereLight).forEach(o => { o.intensity = 0.25; });
    const FN = (p.finestre || []).filter(f => f.n); let nx = -0.5, nz = -0.7; if (FN.length) { nx = FN.reduce((a, f) => a + f.n[0], 0); nz = FN.reduce((a, f) => a + f.n[1], 0); const L = Math.hypot(nx, nz) || 1; nx /= L; nz /= L; }
    sun.intensity = dentro ? 3.2 : 2.4; sun.color.set("#fff1dc"); sun.position.set(cx + nx * span * 1.2 + nz * span * 0.35, span * (dentro ? 0.9 : 1.6), cz + nz * span * 1.2 - nx * span * 0.35);
    const e = span * 1.1; Object.assign(sun.shadow.camera, { left: -e, right: e, top: e, bottom: -e, near: 0.1, far: span * 6 }); sun.shadow.camera.updateProjectionMatrix(); sun.shadow.mapSize.set(2048, 2048); sun.shadow.radius = 6; sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02; }
  const TXK = FOTO ? { [S.tessuto]: ["tessuto", 0.95], [S.tessuto2]: ["tessuto", 0.95], [S.cuscino]: ["tessuto", 0.95], [S.tappeto]: ["tessuto", 1], [S.tappeto2]: ["tessuto", 1], [S.plaid]: ["tessuto", 1], [S.piumone]: ["tessuto", 0.9], [S.testiera]: ["tessuto", 0.95], [S.sedia]: ["tessuto", 0.9], [S.top]: ["marmo", 0.18] } : {};
  const RUV = FOTO ? { [S.legnoM]: 0.5, [S.cucina]: 0.45, [S.mobile]: 0.5, [S.armadio]: 0.5, "#c9ccce": 0.25, "#9aa3a6": 0.3, "#fbfbfb": 0.15, "#f7f7f5": 0.15, "#151517": 0.2, "#1e1e22": 0.15 } : {};
  const MAT = {}, mat = (c, extra) => { const k = c + (extra ? JSON.stringify(extra) : ""); if (MAT[k]) return MAT[k];
    if (!FOTO) return (MAT[k] = new (ill ? THREE.MeshLambertMaterial : THREE.MeshStandardMaterial)({ color: c, roughness: 0.82, ...(extra || {}) }));
    const t = TXK[c], o = { color: c, roughness: t ? t[1] : RUV[c] ?? 0.7, metalness: ["#c9ccce", "#9aa3a6"].includes(c) ? 0.8 : 0, ...(extra || {}) }; if (t) o.map = rnTex(THREE, t[0]);
    return (MAT[k] = new THREE.MeshStandardMaterial(o)); };
  const EDGE = new THREE.LineBasicMaterial({ color: 0x3a1a20, transparent: true, opacity: 0.55 });
  const BOX = new THREE.BoxGeometry(1, 1, 1);
  const RGC = {}, tondo = (sx, sy, sz) => { const r = Math.min(0.035, Math.min(sx, sy, sz) * 0.3), k = [sx, sy, sz, r].map(v => v.toFixed(3)).join(); return RGC[k] || (RGC[k] = new RBG(sx, sy, sz, 2, r)); };
  const mesh = (geo, m, x, y, z, sx = 1, sy = 1, sz = 1, par = scene) => { const rt = FOTO && geo === BOX && !m.transparent && Math.min(sx, sy, sz) > 0.025, o = new THREE.Mesh(rt ? tondo(sx, sy, sz) : geo, m); o.position.set(x, y, z); if (!rt) o.scale.set(sx, sy, sz); o.castShadow = !ill; o.receiveShadow = !ill; par.add(o);
    if (ill && geo === BOX && !m.transparent) { const l = new THREE.LineSegments(EDGES, EDGE); o.add(l); } return o; };
  const EDGES = new THREE.EdgesGeometry(BOX);
  // pavimento esterno e pavimenti
  const base = new THREE.Mesh(new THREE.PlaneGeometry(span * 2.2, span * 2.2), mat(S.esterno)); base.rotation.x = -Math.PI / 2; base.position.set(cx, -0.01, cz); base.receiveShadow = !ill; scene.add(base);
  for (const st of p.stanze || []) { const sh = new THREE.Shape(st.poly.map(([x, y]) => new THREE.Vector2(x * s, y * s))), bagno = RN_TIPI[st.tipo]?.pav === "piastrelle";
    const m = new THREE.Mesh(new THREE.ShapeGeometry(sh), FOTO ? new THREE.MeshStandardMaterial({ map: rnTex(THREE, bagno ? "marmo" : "parquet"), color: bagno ? "#ffffff" : "#d8cbb8", roughness: bagno ? 0.2 : 0.6, side: THREE.DoubleSide }) : mat(bagno ? S.piastrelle : S.legno, { side: THREE.DoubleSide })); m.rotation.x = Math.PI / 2; m.position.y = 0.002; m.receiveShadow = !ill; scene.add(m);
    if (!bagno && !FOTO) { const b = RN.bbox(st.poly); for (let x = b.x0 * s + 0.18; x < b.x1 * s - 0.05; x += 0.18) mesh(BOX, mat(new THREE.Color(S.legno).multiplyScalar(0.93).getStyle()), x, 0.003, (b.y0 + b.y1) / 2 * s, 0.008, 0.001, (b.y1 - b.y0) * s - 0.04); } }
  // muri (guscio), finestre con davanzale, vetro e architrave; muri verso chi guarda tagliati bassi
  const cell = Math.max(1, Math.round(0.05 / s)), gw = Math.ceil(p.W / cell), gh = Math.ceil(p.H / cell), G = new Uint8Array(gw * gh), MM3 = rnMaschera(p);
  for (let y = 0; y < p.H; y++) for (let x = 0; x < p.W; x++) if (MM3[y * p.W + x]) G[((y / cell) | 0) * gw + ((x / cell) | 0)]++;
  for (let i = 0; i < G.length; i++) G[i] = G[i] > cell * cell * 0.35 ? 1 : 0;
  const usato = new Uint8Array(gw * gh), a = cell * s, FIN = p.finestre || [];
  const inFin = (mx, mz) => FIN.some(({ seg: [x0, y0, x1, y1] }) => { const t = 0.5, X = [x0 * s, x1 * s], Z = [y0 * s, y1 * s];
    return Math.abs(X[1] - X[0]) >= Math.abs(Z[1] - Z[0]) ? mx >= Math.min(...X) - 0.02 && mx <= Math.max(...X) + 0.02 && Math.abs(mz - Z[0]) <= t : mz >= Math.min(...Z) - 0.02 && mz <= Math.max(...Z) + 0.02 && Math.abs(mx - X[0]) <= t; });
  const mMuro = [0, 1, 2, 3, 4, 5].map(i => mat(i === 2 ? S.cap : S.muro)), mDav = [0, 1, 2, 3, 4, 5].map(i => mat(i === 2 ? S.davanzale : S.muro));
  const vetro = mat("#bcd9e3", { transparent: true, opacity: 0.45 });
  const muro = (x, z, w0, h0, d0, y0, mm) => { const o = new THREE.Mesh(BOX, mm); o.position.set(x, y0 + h0 / 2, z); o.scale.set(w0, h0, d0); o.castShadow = !ill; o.receiveShadow = !ill; scene.add(o); if (ill) o.add(new THREE.LineSegments(EDGES, EDGE)); };
  for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) { if (!G[y * gw + x] || usato[y * gw + x]) continue;
    let x2 = x; while (x2 + 1 < gw && G[y * gw + x2 + 1] && !usato[y * gw + x2 + 1]) x2++;
    let y2 = y; fuori: while (y2 + 1 < gh) { for (let i = x; i <= x2; i++) if (!G[(y2 + 1) * gw + i] || usato[(y2 + 1) * gw + i]) break fuori; y2++; }
    for (let j = y; j <= y2; j++) for (let i = x; i <= x2; i++) usato[j * gw + i] = 1;
    const mx = (x + x2 + 1) / 2 * a, mz = (y + y2 + 1) / 2 * a, ww = (x2 - x + 1) * a, dd = (y2 - y + 1) * a, hm = (mz > Z1 - 0.05 || mx > X1 - 0.05) ? S.fronte : HW;
    if (FIN.length && inFin(mx, mz)) { muro(mx, mz, ww, Math.min(0.9, hm), dd, 0, mDav); if (hm > 2.25) muro(mx, mz, ww, hm - 2.2, dd, 2.2, mMuro);
      if (hm > 1) { const o = new THREE.Mesh(BOX, vetro); o.position.set(mx, (0.9 + Math.min(hm, 2.2)) / 2, mz); o.scale.set(ww > dd ? ww : 0.03, Math.min(hm, 2.2) - 0.9, dd > ww ? dd : 0.03); scene.add(o); } }
    else muro(mx, mz, ww, hm, dd, 0, mMuro); }
  // ---- arredo dettagliato ----
  for (const m of p.mobili || []) {
    const [w0, d0] = rnDim(m), g = new THREE.Group(); g.position.set(m.x * s, 0, m.y * s); g.rotation.y = -m.rot * Math.PI / 180; scene.add(g);
    const B = (W, H, D, ox, y0, oz, c, extra) => mesh(BOX, mat(c, extra), ox, y0 + H / 2, oz, W, H, D, g);
    const C = (ox, y0, oz, r, h, c, r2) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(r2 ?? r, r, h, 20), mat(c)); o.position.set(ox, y0 + h / 2, oz); o.castShadow = !ill; g.add(o); return o; };
    const Sf = (ox, y, oz, r, c, sy = 1) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 9), mat(c)); o.position.set(ox, y, oz); o.scale.y = sy; o.castShadow = !ill; g.add(o); };
    const t = m.tipo, bk = -d0 / 2, w = w0, d = d0, dx = m.lato === "dx";
    if (t === "divano" || t === "poltrona") {
      const ang = t === "divano" && m.v === "angolare", dp = ang ? 0.92 : d;
      B(w, 0.06, dp - 0.05, 0, 0, bk + dp / 2 + 0.02, "#5a4636"); B(w, 0.34, dp, 0, 0.06, bk + dp / 2, S.tessuto); B(w, 0.42, 0.22, 0, 0.4, bk + 0.11, S.tessuto2);
      if (ang) { const xa = dx ? w / 2 - 0.46 : -w / 2 + 0.46; B(0.92, 0.34, d, xa, 0.06, 0, S.tessuto); B(0.92 - 0.24, 0.12, d - 0.95, xa, 0.4, d / 2 - (d - 0.95) / 2 - 0.05, S.cuscino); }
      B(0.18, 0.24, dp, -w / 2 + 0.09, 0.4, bk + dp / 2, S.tessuto2); B(0.18, 0.24, dp, w / 2 - 0.09, 0.4, bk + dp / 2, S.tessuto2);
      const n = t === "poltrona" ? 1 : w > 2 ? 3 : 2, cw = (w - 0.36) / n; for (let i = 0; i < n; i++) B(cw - 0.03, 0.12, dp - 0.3, -w / 2 + 0.18 + cw * (i + 0.5), 0.4, bk + dp / 2 + 0.06, S.cuscino);
      B(0.42, 0.38, 0.12, -w / 2 + 0.45, 0.5, bk + 0.3, S.accento); if (t === "divano") { B(0.42, 0.38, 0.12, w / 2 - 0.45, 0.5, bk + 0.3, S.oro); B(0.5, 0.03, dp * 0.9, w / 2 - 0.5, 0.52, bk + dp / 2, S.plaid); }
    } else if (t === "tavolino") {
      if (m.v === "tondo") { C(0, 0.38, 0, w / 2, 0.04, S.legnoM); C(0, 0, 0, 0.05, 0.38, "#3c2c22"); } else { B(w, 0.04, d, 0, 0.38, 0, S.legnoM); for (const [a1, b1] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) B(0.04, 0.38, 0.04, a1 * (w / 2 - 0.05), 0, b1 * (d / 2 - 0.05), "#3c2c22"); }
      B(0.3, 0.05, 0.22, -w / 4, 0.42, 0, S.accento); B(0.26, 0.03, 0.2, -w / 4, 0.47, 0, "#efe6d6"); C(w / 4, 0.42, 0, 0.06, 0.18, "#e9e2d6"); Sf(w / 4, 0.66, 0, 0.1, S.verde);
    } else if (t === "tv") {
      B(w, 0.45, d, 0, 0.12, 0, S.mobile); B(w, 0.12, d - 0.06, 0, 0, 0, "#5a4636"); B(Math.min(1.3, w - 0.2), 0.72, 0.05, 0, 0.62, bk + 0.1, "#1e1e22");
      C(w / 2 - 0.2, 0.57, 0, 0.08, 0.25, S.oro); Sf(w / 2 - 0.2, 0.92, 0, 0.14, S.verde);
    } else if (t.startsWith("tavolo")) {
      const tondo = m.v === "tondo";
      if (tondo) { C(0, 0.72, 0, w / 2, 0.04, S.legnoM); C(0, 0, 0, 0.06, 0.72, "#3c2c22"); }
      else { B(w, 0.04, d, 0, 0.72, 0, S.legnoM); for (const [a1, b1] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) B(0.05, 0.72, 0.05, a1 * (w / 2 - 0.06), 0, b1 * (d / 2 - 0.06), "#3c2c22"); }
      const sedia = (ox, oz, ang) => { const sg = new THREE.Group(); sg.position.set(ox, 0, oz); sg.rotation.y = ang; g.add(sg);
        const b2 = (W, H, D, x, y0, z, c) => mesh(BOX, mat(c), x, y0 + H / 2, z, W, H, D, sg); b2(0.42, 0.05, 0.42, 0, 0.44, 0, S.sedia); b2(0.42, 0.45, 0.05, 0, 0.48, 0.19, S.sedia);
        for (const [a1, b1] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) b2(0.03, 0.44, 0.03, a1 * 0.18, 0, b1 * 0.18, "#3c2c22"); };
      if (tondo) { const n = Math.max(3, Math.round(Math.PI * w / 0.65)); for (let i = 0; i < n; i++) { const an = i / n * Math.PI * 2; sedia(Math.cos(an) * (w / 2 + 0.18), Math.sin(an) * (w / 2 + 0.18), Math.PI / 2 - an); } }
      else { const n = w > 1.5 ? 3 : 2; for (const sd of [-1, 1]) for (let i = 0; i < n; i++) { const ox = -w / 2 + w * (i + 0.5) / n; sedia(ox, sd * (d / 2 + 0.18), sd > 0 ? 0 : Math.PI); B(0.34, 0.005, 0.26, ox, 0.762, sd * (d / 2 - 0.2), "#efe6d6"); } }
      C(0, 0.76, 0, 0.07, 0.22, "#e9e2d6"); for (const [ox, oz, c] of [[0, 0, S.accento], [0.07, 0.04, S.oro], [-0.06, 0.05, "#f2e8df"], [0.02, -0.07, S.accento]]) Sf(ox, 1.03, oz, 0.07, c); Sf(0, 0.96, 0, 0.12, S.verde, 0.6);
    } else if (t === "tappeto") {
      if (m.v === "tondo") C(0, 0, 0, w / 2, 0.012, S.tappeto); else { B(w, 0.012, d, 0, 0, 0, S.tappeto); B(w - 0.2, 0.014, d - 0.2, 0, 0, 0, S.tappeto2); B(w - 0.34, 0.016, d - 0.34, 0, 0, 0, S.tappeto); }
    } else if (t.startsWith("cucina")) {
      const run = (W, ox, oz, rot) => { const kg = new THREE.Group(); kg.position.set(ox, 0, oz); kg.rotation.y = rot; g.add(kg);
        const b2 = (W2, H, D, x, y0, z, c, ex) => mesh(BOX, mat(c, ex), x, y0 + H / 2, z, W2, H, D, kg); return { kg, b2 }; };
      const linea = (W, ox, oz, rot, conFuochi, conLavello) => { const { kg, b2 } = run(W, ox, oz, rot), D = 0.62, bkk = -D / 2;
        b2(W, 0.1, D - 0.06, 0, 0, -0.03, "#5a4636"); b2(W, 0.76, D - 0.02, 0, 0.1, -0.01, S.cucina); b2(W + 0.02, 0.04, D + 0.02, 0, 0.86, 0, S.top);
        const nm = Math.max(2, Math.round(W / 0.6)); for (let i = 1; i < nm; i++) b2(0.008, 0.72, 0.01, -W / 2 + W * i / nm, 0.12, D / 2 + 0.001, "#8c7a68");
        for (let i = 0; i < nm; i++) b2(0.18, 0.015, 0.02, -W / 2 + W * (i + 0.5) / nm, 0.8, D / 2 + 0.01, S.oro);
        if (conLavello) { const sx = -W / 2 + W * 0.3; b2(0.5, 0.012, 0.38, sx, 0.9, 0.02, "#9aa3a6"); b2(0.44, 0.012, 0.32, sx, 0.902, 0.02, "#6f7a7e");
          const tap = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.3, 10), mat("#c9ccce")); tap.position.set(sx, 1.05, bkk + 0.08); kg.add(tap); b2(0.03, 0.02, 0.16, sx, 1.18, bkk + 0.15, "#c9ccce"); }
        if (conFuochi) { const hx = W / 2 - 0.45; b2(0.6, 0.01, 0.5, hx, 0.9, 0.02, "#151517");
          for (const [ddx, ddz] of [[-0.14, -0.11], [0.14, -0.11], [-0.14, 0.12], [0.14, 0.12]]) { const r = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.004, 18), mat("#3a3a3e")); r.position.set(hx + ddx, 0.912, 0.02 + ddz); kg.add(r); }
          b2(0.56, 0.5, 0.01, hx, 0.18, D / 2 + 0.002, "#2a2a2e"); b2(0.5, 0.015, 0.02, hx, 0.66, D / 2 + 0.012, "#c9ccce");
          if (HW >= 2.2) { b2(0.6, 0.35, 0.4, hx, 1.6, bkk + 0.2, "#d8d4ce"); b2(0.6, 0.04, 0.45, hx, 1.56, bkk + 0.22, "#bdb7ae"); } }
        if (HW >= 2.2) { b2(W, 0.55, 0.012, 0, 0.9, bkk + 0.006, S.alzatina); const wp = conFuochi ? W - 0.62 : W, xp = conFuochi ? -0.31 : 0;
          if (wp > 0.3) { b2(wp, 0.72, 0.35, xp, 1.45, bkk + 0.175, S.cucina); for (let i = 1; i < Math.max(2, Math.round(wp / 0.6)); i++) b2(0.008, 0.68, 0.01, xp - wp / 2 + i * wp / Math.max(2, Math.round(wp / 0.6)), 1.47, bkk + 0.352, "#8c7a68"); } }
        else { b2(W, 0.3, 0.012, 0, 0.9, bkk + 0.006, S.alzatina); b2(W * 0.6, 0.03, 0.25, -W * 0.15, 1.35, bkk + 0.13, S.legnoM); }
        if (conLavello) { const pv = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), mat(S.verde)); pv.position.set(-W / 2 + 0.25, 1.0, 0); kg.add(pv); } };
      if (m.v === "angolare") { linea(w, 0, bk + 0.31, 0, true, false); const xa = dx ? w / 2 - 0.31 : -w / 2 + 0.31; linea(d - 0.62, xa, bk + 0.62 + (d - 0.62) / 2, dx ? -Math.PI / 2 : Math.PI / 2, false, true); }
      else if (m.v === "isola") { linea(w, 0, bk + 0.31, 0, true, true); const iw = Math.min(w * 0.7, 2.2); B(iw, 0.88, 0.9, 0, 0, d / 2 - 0.45, S.cucina); B(iw + 0.04, 0.04, 0.94, 0, 0.88, d / 2 - 0.45, S.top);
        for (const i of [-1, 0, 1]) { C(i * iw / 3, 0, d / 2 + 0.25, 0.17, 0.05, S.sedia); C(i * iw / 3, 0.05, d / 2 + 0.25, 0.02, 0.6, "#3c2c22"); C(i * iw / 3, 0.65, d / 2 + 0.25, 0.18, 0.05, S.sedia); } }
      else linea(w, 0, 0, 0, true, true);
    } else if (t === "frigo") { B(w, Math.min(1.95, HW - 0.1), d, 0, 0, 0, S.cucina); B(0.012, 1.4, 0.02, w / 2 - 0.08, 0.3, d / 2 + 0.01, S.oro);
    } else if (t.startsWith("letto")) {
      B(w + 0.06, 0.28, d + 0.04, 0, 0, 0.02, S.legnoM); B(w - 0.02, 0.22, d - 0.06, 0, 0.28, 0.03, "#fbf6ee"); B(w + 0.06, 1.0, 0.1, 0, 0, bk, S.testiera);
      B(w + 0.04, 0.08, d * 0.62, 0, 0.46, d * 0.17, S.piumone); const np = w > 1.2 ? 2 : 1;
      for (let i = 0; i < np; i++) { B(w / np - 0.12, 0.13, 0.36, -w / 2 + (i + 0.5) * w / np, 0.5, bk + 0.32, "#ffffff"); B(w / np - 0.28, 0.12, 0.13, -w / 2 + (i + 0.5) * w / np, 0.54, bk + 0.56, i ? S.oro : S.accento); }
      B(w + 0.08, 0.1, 0.45, 0, 0.47, d / 2 - 0.3, S.plaid);
    } else if (t === "comodino") { B(w, 0.5, d, 0, 0, 0, S.legnoM); B(w - 0.06, 0.01, 0.01, 0, 0.3, d / 2 + 0.001, "#3c2c22"); C(0, 0.5, 0, 0.06, 0.25, S.oro); C(0, 0.75, 0, 0.15, 0.2, "#f6eee0", 0.1); B(0.18, 0.04, 0.13, 0.05, 0.5, 0.05, S.accento);
    } else if (t.startsWith("armadio")) { const hh = Math.min(2.3, HW - 0.05); B(w, hh, d, 0, 0, 0, S.armadio); const nd = Math.max(2, Math.round(w / 0.5));
      for (let i = 1; i < nd; i++) B(0.008, hh - 0.1, 0.01, -w / 2 + w * i / nd, 0.05, d / 2 + 0.001, "#8c7a68"); for (let i = 0; i < nd; i++) B(0.015, 0.4, 0.02, -w / 2 + w * (i + 0.5) / nd + (i % 2 ? 0.08 : -0.08), hh * 0.45, d / 2 + 0.01, S.oro);
    } else if (t === "vasca") { B(w, 0.55, d, 0, 0, 0, "#f7f7f5"); B(w - 0.14, 0.02, d - 0.14, 0, 0.54, 0, "#cfe0e6"); B(0.5, 0.03, 0.3, -w / 2 + 0.45, 0.56, d / 2 - 0.1, S.asciugamano);
    } else if (t === "doccia") { B(w, 0.04, d, 0, 0, 0, "#e7eef0"); B(w, Math.min(2.0, HW - 0.05), 0.012, 0, 0.04, d / 2, "#cfe4ec", { transparent: true, opacity: 0.4 }); C(0, 1.9, bk + 0.15, 0.1, 0.02, "#c9ccce");
    } else if (t === "wc") { B(w, 0.35, 0.18, 0, 0.4, bk + 0.09, "#fbfbfb"); C(0, 0, 0.06, 0.17, 0.4, "#fbfbfb", 0.19);
    } else if (t === "bidet") { C(0, 0, 0.04, 0.16, 0.4, "#fbfbfb", 0.18);
    } else if (t === "lavabo") { B(w, 0.45, d, 0, 0.35, 0, S.legnoM); B(w + 0.02, 0.06, d + 0.02, 0, 0.8, 0, "#fbfbfb"); B(w - 0.16, 0.01, d - 0.16, 0, 0.86, 0.02, "#cfe0e6");
      if (HW >= 1.7) B(w - 0.06, 0.7, 0.02, 0, 1.05, bk + 0.01, "#dfeaee"); B(0.3, 0.4, 0.04, w / 2 + 0.2, 0.7, bk + 0.03, S.asciugamano);
    } else if (t === "scrivania") { B(w, 0.03, d, 0, 0.72, 0, S.legnoM); B(0.04, 0.72, d, -w / 2 + 0.02, 0, 0, "#3c2c22"); B(0.04, 0.72, d, w / 2 - 0.02, 0, 0, "#3c2c22"); C(w / 3, 0.75, 0, 0.06, 0.3, S.oro); C(w / 3, 1.05, 0, 0.13, 0.15, "#f6eee0", 0.09);
    } else if (t === "libreria") { const hh = Math.min(1.9, HW - 0.1); B(w, hh, d, 0, 0, 0, S.mobile); for (let y = 0.4; y < hh; y += 0.4) B(w - 0.04, 0.02, d - 0.02, 0, y, 0.01, S.legnoM);
    } else if (t === "consolle") { B(w, 0.04, d, 0, 0.8, 0, S.legnoM); B(0.04, 0.8, d, -w / 2 + 0.03, 0, 0, "#3c2c22"); B(0.04, 0.8, d, w / 2 - 0.03, 0, 0, "#3c2c22"); C(w / 4, 0.84, 0, 0.06, 0.2, "#e9e2d6"); Sf(w / 4, 1.1, 0, 0.1, S.verde);
    } else if (t === "pianta") { C(0, 0, 0, w * 0.32, 0.32, S.vaso); Sf(0, 0.72, 0, w * 0.55, S.verde);
    } else if (t === "esterno") { C(0, 0.7, 0, w / 2 * 0.6, 0.03, S.legnoM); C(0, 0, 0, 0.03, 0.7, "#3c2c22");
    } else B(w, 0.6, d, 0, 0, 0, S.mobile);
  }
  // ---- tende leggere e piante vicino alle finestre ----
  const tenda = mat(S.tenda, { transparent: true, opacity: 0.6, side: THREE.DoubleSide });
  for (const f of FIN) { const [x0, y0, x1, y1] = f.seg.map(v => v * s), L = Math.hypot(x1 - x0, y1 - y0) || 1, tx = (x1 - x0) / L, tz = (y1 - y0) / L, [nx, nz] = f.n || [-tz, tx];
    if (!FOTO && ((y0 + y1) / 2 > Z1 - 0.5 || (x0 + x1) / 2 > X1 - 0.5)) continue;      // muro tagliato: niente tende
    const hT = Math.min(HW, 2.25) - 0.08, rot = -Math.atan2(tz, tx);
    for (const [ex, ez, sg] of [[x0, y0, -1], [x1, y1, 1]]) for (let k = 0; k < 3; k++) { const o = new THREE.Mesh(BOX, tenda); o.position.set(ex + tx * sg * (0.08 + (k - 1) * 0.15) - nx * (0.07 + (k === 1 ? 0.02 : 0)), 0.03 + hT / 2, ez + tz * sg * (0.08 + (k - 1) * 0.15) - nz * (0.07 + (k === 1 ? 0.02 : 0))); o.scale.set(0.2, hT, 0.03); o.rotation.y = rot; scene.add(o); }
    if (HW >= 2.2) { const o = mesh(BOX, mat(S.oro), (x0 + x1) / 2 - nx * 0.07, hT + 0.035, (y0 + y1) / 2 - nz * 0.07, L + 0.6, 0.03, 0.03); o.rotation.y = rot; }
    // pianta accanto alla finestra, se c'è posto
    const px = x1 + tx * 0.45 - nx * 0.4, pz = y1 + tz * 0.45 - nz * 0.4, st = (p.stanze || []).find(r => RN.dentro([px / s, pz / s], r.poly));
    if (st && !["bagno", "disimpegno", "ripostiglio"].includes(st.tipo) && !(p.mobili || []).some(m => { if (m.tipo === "tappeto") return false; const [mw, md] = rnDim(m); return Math.abs(px - m.x * s) < Math.max(mw, md) / 2 + 0.35 && Math.abs(pz - m.y * s) < Math.max(mw, md) / 2 + 0.35; })) {
      const pg = new THREE.Group(); pg.position.set(px, 0, pz); scene.add(pg);
      const vaso = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.14, 0.4, 18), mat(S.vaso)); vaso.position.y = 0.2; vaso.castShadow = !ill; pg.add(vaso);
      for (const [ox, oy, oz, r, c] of [[0, 0.95, 0, 0.32, S.verde], [0.12, 0.75, -0.05, 0.22, S.verde2], [-0.1, 1.15, 0.05, 0.2, S.verde2]]) { const f2 = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 9), mat(c)); f2.position.set(ox, oy, oz); f2.scale.y = 1.25; f2.castShadow = !ill; pg.add(f2); } } }
  if (FOTO) { // soffitto (vista da dentro), telai neri alle finestre, lampade accese
    if (dentro) { const pts = (p.stanze || []).flatMap(st => st.poly); const b = RN.bbox(pts); const c = new THREE.Mesh(new THREE.BoxGeometry((b.x1 - b.x0) * s + 1.5, 0.12, (b.y1 - b.y0) * s + 1.5), new THREE.MeshStandardMaterial({ color: "#f7f5f1", roughness: 0.9, emissive: "#efe9e0", emissiveIntensity: 0.55 }));
      c.position.set((b.x0 + b.x1) / 2 * s, HW + 0.06, (b.y0 + b.y1) / 2 * s); c.castShadow = true; c.receiveShadow = true; scene.add(c);
      { const B = RN.bbox(dentro.poly), l = new THREE.PointLight("#fff4e4", 6, 9, 1.6); l.position.set((B.x0 + B.x1) / 2 * s, HW - 0.35, (B.y0 + B.y1) / 2 * s); scene.add(l); }
      scene.children.filter(o => o.isHemisphereLight).forEach(o => { o.intensity = 0.7; });
      // gola luminosa lungo i muri della stanza
      const P = dentro.poly; for (let i = 0; i < P.length; i++) { const [x0, y0] = P[i], [x1, y1] = P[(i + 1) % P.length], L = Math.hypot(x1 - x0, y1 - y0) * s; if (L < 0.5) continue;
        const o = new THREE.Mesh(new THREE.BoxGeometry(L, 0.02, 0.04), new THREE.MeshStandardMaterial({ color: "#fff6e6", emissive: "#fff1d6", emissiveIntensity: 1.6 })); const ax = -Math.atan2(y1 - y0, x1 - x0), mx = (x0 + x1) / 2 * s, mz = (y0 + y1) / 2 * s, C = RN.bbox(P);
        const dx = (C.x0 + C.x1) / 2 * s - mx, dz = (C.y0 + C.y1) / 2 * s - mz, dl = Math.hypot(dx, dz) || 1; o.position.set(mx + dx / dl * 0.08, HW - 0.06, mz + dz / dl * 0.08); o.rotation.y = ax; scene.add(o); } }
    const telaio = new THREE.MeshStandardMaterial({ color: "#2a2928", roughness: 0.4, metalness: 0.3 });
    for (const f of FIN) { const [x0, y0, x1, y1] = f.seg.map(v => v * s), L = Math.hypot(x1 - x0, y1 - y0) || 1, tx = (x1 - x0) / L, tz = (y1 - y0) / L, [nx, nz] = f.n || [-tz, tx], sp = Math.min(0.66, Math.max(0.12, f.sp || p.spMuro || 0.3)), ox = nx * sp * 0.5, oz = nz * sp * 0.5, rot = -Math.atan2(tz, tx);
      const pezzo = (a, y0w, w0, h0) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w0, h0, 0.06), telaio); o.position.set(x0 + tx * a + ox, y0w + h0 / 2, y0 + tz * a + oz); o.rotation.y = rot; o.castShadow = true; scene.add(o); };
      const yb = 0.9, yt = Math.min(2.2, HW - 0.05); pezzo(0.03, yb, 0.06, yt - yb); pezzo(L - 0.03, yb, 0.06, yt - yb); pezzo(L / 2, yb, L, 0.06); pezzo(L / 2, yt - 0.06, L, 0.06); if (L > 0.9) pezzo(L / 2, yb, 0.05, yt - yb); }
    { const cv = document.createElement("canvas"); cv.width = cv.height = 128; const g = cv.getContext("2d"), gr = g.createRadialGradient(64, 64, 10, 64, 64, 64); gr.addColorStop(0, "rgba(40,30,20,.55)"); gr.addColorStop(1, "rgba(40,30,20,0)"); g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
      const tx = new THREE.CanvasTexture(cv), mo = new THREE.MeshBasicMaterial({ map: tx, transparent: true, depthWrite: false });
      for (const m of p.mobili || []) { if (m.tipo === "tappeto") continue; const [mw, md] = rnDim(m), o = new THREE.Mesh(new THREE.PlaneGeometry(mw + 0.35, md + 0.35), mo); o.rotation.x = -Math.PI / 2; o.rotation.z = -m.rot * Math.PI / 180; o.position.set(m.x * s, 0.006, m.y * s); scene.add(o); } }
    { const bat = new THREE.MeshStandardMaterial({ color: "#f4f1ec", roughness: 0.5 });
      for (const st of p.stanze || []) { const P = st.poly, C = RN.bbox(P); for (let i = 0; i < P.length; i++) { const [x0, y0] = P[i], [x1, y1] = P[(i + 1) % P.length], L = Math.hypot(x1 - x0, y1 - y0) * s; if (L < 0.2) continue;
        const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, nx = -(y1 - y0), ny = x1 - x0, nl2 = Math.hypot(nx, ny) || 1, inn = RN.dentro([mx + nx / nl2 * 3, my + ny / nl2 * 3], P) ? 1 : -1;
        const o = new THREE.Mesh(new THREE.BoxGeometry(L, 0.08, 0.015), bat); o.position.set(mx * s + nx / nl2 * inn * 0.008, 0.04, my * s + ny / nl2 * inn * 0.008); o.rotation.y = -Math.atan2(y1 - y0, x1 - x0); scene.add(o); } } }
    let nl = 0; for (const m of p.mobili || []) { if (nl >= 3) break; const lampada = m.tipo === "comodino" || m.tipo === "scrivania", tav = m.tipo.startsWith("tavolo") && !dentro === false;
      if (lampada) { const l = new THREE.PointLight("#ffd9a0", dentro ? 1.6 : 0.8, 3.5, 2); l.position.set(m.x * s, m.tipo === "comodino" ? 0.85 : 1.15, m.y * s); scene.add(l); nl++; }
      else if (m.tipo.startsWith("tavolo") && dentro) { const X = m.x * s, Z = m.y * s; for (const d of [-0.25, 0, 0.25]) { const g0 = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 14), new THREE.MeshStandardMaterial({ color: "#fff7ea", emissive: "#ffe2b0", emissiveIntensity: 1.2, roughness: 0.3 })); g0.position.set(X + d, 1.65, Z); scene.add(g0);
          const fl = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, HW - 1.76, 6), telaio); fl.position.set(X + d, (HW + 1.76) / 2, Z); scene.add(fl); }
        const l = new THREE.PointLight("#ffdcaa", 2.2, 4.5, 2); l.position.set(X, 1.5, Z); scene.add(l); nl++; } } }
  let vivo = true; const loop = () => { if (!vivo || !document.body.contains(ren.domElement)) { ren.dispose(); return; } ctl.update(); ren.render(scene, cam); requestAnimationFrame(loop); }; loop();
  return { foto: () => { ren.render(scene, cam); return ren.domElement.toDataURL("image/png"); }, stop: () => { vivo = false; } };
};
