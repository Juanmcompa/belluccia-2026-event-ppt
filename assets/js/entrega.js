/* ============================================================
   TP4 · Cómo se entrega
   Cubo en 3D (CSS 3D, sin librerías), paneles a escala,
   plantillas 1:1, objetos, armado, checklist y dudas.
   Medidas y zonas: archivo de paneles de la cátedra (en puntos, 1 cm = 72 / 2,54 pt).
   ============================================================ */

/* ── Datos de la entrega: editar acá ───────────────────────── */
const ENTREGA = {
  fecha: "Lunes 16 de noviembre",
  fechaCorta: "16/11",
  horario: "en el horario de clase, de 19 a 23 h",
  panel: [50, 70],   // cm
  base: [50, 50],    // cm
  espesor: 0.5       // cm, foamboard de 5 mm (solo para dibujar)
};

/* Página de 50 × 70 cm en puntos, como en el archivo de la cátedra */
const PAG = [1417.32, 1984.25];
const PT = 2.54 / 72;

const PANELES = [
  { id: "p1", n: 1, t: "Fondo", donde: "enfrente, al fondo del cubo", resumen: "Afiche",
    zonas: [
      { id: "afiche", r: [113, 150, 1191, 1684], t: "Afiche", l: ["Afiche", "A2"],
        x: "El afiche del evento a tamaño A2: el mismo que va al dorso del programa (la aficheta). Es lo primero que se ve al mirar el cubo de frente.",
        tip: "Va centrado, con 4 cm de aire a los costados y 5,3 cm arriba y abajo." }
    ] },
  { id: "p2", n: 2, t: "Lateral izquierdo", donde: "a la izquierda, mirando desde el lado abierto", resumen: "QR, marca y vía pública",
    zonas: [
      { id: "qr", r: [57, 41, 410, 410], t: "QR", l: ["QR"],
        x: "Lleva al Instagram del evento, donde están las piezas y los videos: ID animado, teaser, promocional y video de espera.",
        tip: "Probalo ya impreso, con dos o tres celulares distintos, antes de pegarlo." },
      { id: "marcaColor", r: [504, 41, 410, 410], t: "Marca gráfica a color", l: ["Marca gráfica", "a color"],
        x: "La versión principal del identificador, a color.",
        tip: "Con aire alrededor: que no toque los bordes de la zona." },
      { id: "marcaPluma", r: [951, 41, 410, 410], t: "Marca gráfica pluma", l: ["Marca gráfica", "pluma"],
        x: "La versión pluma: a una tinta, en negro sobre blanco.",
        tip: "Al lado de la versión a color, demuestra que la marca funciona sin color." },
      { id: "afichevp", r: [59, 484, 1300, 683], t: "Afiche de vía pública promocional", l: ["Afiche de", "vía pública promocional"],
        x: "El afiche de vía pública como pieza plana, completo, tal como se diseñó.",
        tip: "Es el original: sin mockup y sin perspectiva." },
      { id: "sextuple", r: [59, 1199, 1300, 720], t: "Séxtuple / Mupi / Full glass", l: ["Séxtuple / Mupi /", "Full glass"],
        x: "El afiche aplicado en contexto: en séxtuple, en mupi y en el full glass de transporte. Muestra cómo se articula el sistema según el medio.",
        tip: "Mockups realistas, con fotos de calle creíbles y la misma luz." }
    ] },
  { id: "p3", n: 3, t: "Lateral derecho", donde: "a la derecha, mirando desde el lado abierto", resumen: "Redes, photo op y digital",
    zonas: [
      { id: "rrss", r: [58, 56, 1302, 660], t: "RRSS", l: ["RRSS"],
        x: "El perfil de Instagram: la grilla con el avatar, las tres publicaciones fijas y el carrusel.",
        tip: "Mostrá la grilla como se ve en el celular y el carrusel desplegado." },
      { id: "photo", r: [58, 737, 729, 683], t: "Photo opportunity", l: ["Photo", "opportunity"],
        x: "La photo opportunity en render o mockup, con una persona para dar escala.",
        tip: "Sumá el encuadre vertical del celular: es para sacarse una foto." },
      { id: "web", r: [808, 737, 551, 683], t: "Sitio web", l: ["Sitio web"],
        x: "La landing del evento, en desktop y en mobile.",
        tip: "Mockup de pantallas: que se lea el contenido, no el dispositivo." },
      { id: "merch", r: [58, 1438, 528, 493], t: "Merch", l: ["Merch"],
        x: "Los objetos de merchandising del sistema en mockup.",
        tip: "La tote y la remera también se entregan reales: acá va el resto de la línea." },
      { id: "overlays", r: [607, 1438, 753, 493], t: "Streaming overlays", l: ["Streaming", "overlays"],
        x: "Las pantallas de streaming con los overlays del evento aplicados.",
        tip: "Sobre una toma real del evento, no sobre un fondo vacío." }
    ] }
];
PANELES.forEach(p => p.zonas.forEach(z => { z.panel = p; z.cm = z.r.map(v => v * PT); }));
const ZONAS = PANELES.flatMap(p => p.zonas);

const OBJETOS = [
  { id: "tote", t: "Tote", donde: "Sobre la base", medida: "Tote real, estampada",
    x: "La tote del evento, producida y estampada con el sistema. Se apoya sobre la base del cubo.",
    ok: ["Estampada, no en mockup", "Dentro de los 50 × 50 cm de la base"] },
  { id: "aficheta", t: "Aficheta", donde: "Sobre la base", medida: "Programa A2 · 42 × 59,4 cm",
    x: "El programa A2 impreso: de un lado la programación, del otro el afiche. Extendido no entra en la base: va doblado, como se le entrega al público, junto a la tote.",
    ok: ["Impresa de los dos lados", "Doblada, dentro de los 50 × 50 cm de la base"] },
  { id: "remera", t: "Remera", donde: "Aparte, en el espacio de remeras", medida: "Remera real, con percha",
    x: "La remera del evento, estampada. No va en la base: la cátedra arma un espacio especial para las remeras. Llega colgada en su percha, la más barata que encuentren.",
    ok: ["Estampada de frente y de espalda", "Colgada en una percha"] }
];

const PASOS = [
  { t: "La entrega completa", v: "general", ver: "todo",
    x: "Un cubo abierto al frente: tres paneles de 50 × 70 cm parados sobre una base de 50 × 50 cm. Sobre la base van la tote y la aficheta. Al lado, la remera en su percha, en el espacio de remeras." },
  { t: "La base · 50 × 50 cm", v: "base", ver: ["base"],
    x: "Es el piso del cubo: sostiene los tres paneles y es donde se apoyan la tote y la aficheta. Del mismo material que los paneles." },
  { t: "Panel 1 · Fondo", v: "p1", ver: ["base", "p1"],
    x: "El panel de enfrente. Lleva un solo elemento: el afiche, a tamaño A2." },
  { t: "Paneles 2 y 3 · Laterales", v: "tresCuartos", ver: ["base", "p1", "p2", "p3"],
    x: "Cierran el cubo a los costados. Todo el contenido mira hacia adentro del cubo; las caras de afuera quedan lisas." },
  { t: "Panel 2 · Izquierda", v: "p2", ver: ["base", "p1", "p2", "p3"],
    x: "Marca y vía pública: QR, marca a color, marca pluma, el afiche de vía pública y sus aplicaciones en séxtuple, mupi y full glass." },
  { t: "Panel 3 · Derecha", v: "p3", ver: ["base", "p1", "p2", "p3"],
    x: "Redes y piezas digitales: Instagram, photo opportunity, sitio web, merch y overlays de streaming." },
  { t: "Sobre la base: tote y aficheta", v: "arriba", ver: ["base", "p1", "p2", "p3", "objs"],
    x: "Se apoyan sobre la base, dentro de los 50 × 50 cm. Cómo acomodarlas lo decide cada grupo." },
  { t: "La remera va aparte", v: "remera", ver: "todo",
    x: "Las remeras no van en la base: hay un espacio especial para ellas. Cada remera llega colgada en su percha, la más barata que encuentren." },
  { t: "Prueba de apilado", v: "apilado", ver: "todo", apilar: true,
    x: "El cubo se entrega armado y tiene que aguantar otra entrega encima sin ceder ni inclinarse. Si no se mantiene estable, sufre la nota." }
];

/* Vistas de cámara: giro, inclinación, acercamiento y punto al que mira (cm) */
const VISTAS = {
  general:     { yaw: -26, pitch: -20, zoom: .84, t: [17, 44, 0] },
  tresCuartos: { yaw: -36, pitch: -14, zoom: 1, t: [0, 36, 0] },
  base:        { yaw: -28, pitch: -38, zoom: 1.25, t: [0, 6, 0] },
  p1:          { yaw: 0, pitch: -4, zoom: 1.28, t: [0, 36, -25] },
  p2:          { yaw: -90, pitch: -4, zoom: 1.28, t: [-25, 36, 0], tapa: ["p3", "remera"] },
  p3:          { yaw: 90, pitch: -4, zoom: 1.28, t: [25, 36, 0], tapa: ["p2"] },
  arriba:      { yaw: -12, pitch: -66, zoom: 1.4, t: [0, 4, 4] },
  remera:      { yaw: -14, pitch: -8, zoom: 1.05, t: [62, 62, 0] },
  despiece:    { yaw: -32, pitch: -22, zoom: .78, t: [0, 40, 0], tapa: ["remera"] },
  apilado:     { yaw: -34, pitch: -12, zoom: .62, t: [0, 72, 0] }
};

(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const num = v => (Math.round(v * 10) / 10).toLocaleString("es-AR");
  const medida = z => `${num(z.cm[2])} × ${num(z.cm[3])} cm`;
  if (typeof CONFIG !== "undefined") $$("[data-cfg]").forEach(e => { e.textContent = CONFIG[e.dataset.cfg] || ""; });

  /* ── Resumen ───────────────────────────────────────────── */
  $("#stats").innerHTML = [
    ["hito", ENTREGA.fechaCorta, "Entrega", ENTREGA.fecha.toLowerCase() + ", 19 h"],
    ["", "3", "Paneles", "de 50 × 70 cm, en cubo"],
    ["", "50×50", "Base", "cm, del mismo material"],
    ["", String(ZONAS.length), "Zonas", "piezas pegadas en los paneles"],
    ["", "3", "Objetos", "tote y aficheta en la base; la remera, aparte"]
  ].map(([c, b, s, m]) => `<div class="stat${c ? " stat--" + c : ""}"><b>${b}</b><span>${s}</span><small>${m}</small></div>`).join("");

  /* ── Dibujos (SVG) ─────────────────────────────────────── */
  const SVG = {
    remera: (lado) => `<svg viewBox="-6 -26 112 128" class="dib" aria-hidden="true">
      <path class="dib__percha" d="M50 -22 c5 0 7 -3 7 -6 M50 -22 v8 M10 18 L50 -2 L90 18"/>
      <path class="dib__tela" d="M33 6 Q50 ${lado === "frente" ? 18 : 10} 67 6 L91 18 L85 38 L75 34 L75 96 L25 96 L25 34 L15 38 L9 18 Z"/>
      <path class="dib__linea" d="M33 6 Q50 ${lado === "frente" ? 18 : 10} 67 6 M25 92 H75 M15 38 L13.5 35 M85 38 L86.5 35"/>
      ${lado === "frente"
        ? `<circle class="dib__acc" cx="50" cy="40" r="10"/><rect class="dib__acc2" x="38" y="55" width="24" height="3" rx="1"/>`
        : `<rect class="dib__acc" x="32" y="26" width="36" height="44" rx="2"/><rect class="dib__acc2" x="36" y="74" width="28" height="3" rx="1"/><rect class="dib__acc2" x="40" y="80" width="20" height="3" rx="1"/>`}
    </svg>`,
    tote: () => `<svg viewBox="0 0 38 40" class="dib" aria-hidden="true">
      <rect class="dib__tela" x=".4" y=".4" width="37.2" height="39.2" rx=".6"/>
      <path class="dib__asa" d="M9 .5 C9 12 15 16 19 16 M29 .5 C29 12 23 16 19 16"/>
      <circle class="dib__acc" cx="19" cy="26" r="6.5"/><rect class="dib__acc2" x="12" y="34.5" width="14" height="1.6" rx=".4"/>
    </svg>`,
    aficheta: () => `<svg viewBox="0 0 21 29.7" class="dib" aria-hidden="true">
      <rect class="dib__papel" x=".2" y=".2" width="20.6" height="29.3"/>
      <rect class="dib__acc" x="2" y="2" width="17" height="17" rx="8.5"/>
      <rect class="dib__acc2" x="2" y="21" width="12" height="2"/><rect class="dib__acc2" x="2" y="24.2" width="8" height="1.2"/>
      <path class="dib__pliegue" d="M10.5 0 V29.7 M0 14.85 H21"/>
    </svg>`
  };

  /* ══════════════════════════════════════════════════════
     1. EL CUBO EN 3D
     ══════════════════════════════════════════════════════ */
  const U = 10;                       // px por cm dentro del modelo
  const T = ENTREGA.espesor, TB = ENTREGA.espesor;
  const escE = $("#esc"), camE = $("#cam"), mundo = $("#mundo");
  mundo.style.setProperty("--u", U + "px");
  const px = v => (v * U).toFixed(2) + "px";
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  function cara(w, h, tr, cls, html) {
    const f = el("div", "f " + (cls || ""), html);
    f.style.width = px(w); f.style.height = px(h);
    f.style.left = px(-w / 2); f.style.top = px(-h / 2);
    f.style.transform = tr;
    return f;
  }
  /* Caja centrada en el origen: w (x) × h (y) × d (z) */
  function caja(w, h, d, cls, cont) {
    const g = el("div", "g " + (cls || "")); cont = cont || {};
    const C = [
      ["front", w, h, `translateZ(${px(d / 2)})`],
      ["back", w, h, `rotateY(180deg) translateZ(${px(d / 2)})`],
      ["right", d, h, `rotateY(90deg) translateZ(${px(w / 2)})`],
      ["left", d, h, `rotateY(-90deg) translateZ(${px(w / 2)})`],
      ["top", w, d, `rotateX(90deg) translateZ(${px(h / 2)})`],
      ["bottom", w, d, `rotateX(-90deg) translateZ(${px(h / 2)})`]
    ];
    C.forEach(([k, a, b, tr]) => g.appendChild(cara(a, b, tr, "f--" + k + (cont[k] ? " f--cont" : ""), cont[k] || "")));
    return g;
  }
  function grupo(cls) { const g = el("div", "g " + (cls || "")); mundo.appendChild(g); return g; }
  const lugar = (x, y, z, extra) => `translate3d(${px(x)}, ${px(-y)}, ${px(z)})${extra ? " " + extra : ""}`;

  /* Contenido de un panel: zonas en % de la página de 50 × 70 */
  const contenidoPanel = p => p.zonas.map(z => {
    const [x, y, w, h] = z.r, fs = Math.max(1.1, Math.min(2.4, z.cm[2] * .11));
    return `<button class="zn" data-z="${z.id}" style="left:${x / PAG[0] * 100}%;top:${y / PAG[1] * 100}%;width:${w / PAG[0] * 100}%;height:${h / PAG[1] * 100}%;--fs:${fs}">
      <b>${z.l.map(esc).join("<br>")}</b><small>${medida(z)}</small></button>`;
  }).join("") + `<span class="f__tag">Panel ${p.n} · ${esc(p.t)}</span>`;

  const G = {};
  /* Piso con grilla de 10 cm y sombra */
  G.piso = grupo("piso");
  G.piso.appendChild(cara(220, 220, "rotateX(90deg)", "f--piso"));
  G.piso.appendChild(cara(70, 70, `translateY(${px(-.05)}) rotateX(90deg)`, "f--sombra"));

  /* Base */
  G.base = grupo("base");
  G.base.appendChild(caja(50, TB, 50, "", { top: `<span class="f__base">Base · 50 × 50 cm</span>` }));

  /* Paneles (el contenido mira hacia adentro) */
  const P = Object.fromEntries(PANELES.map(p => [p.id, p]));
  G.p1 = grupo("panel"); G.p1.appendChild(caja(50, 70, T, "", { front: contenidoPanel(P.p1) }));
  G.p2 = grupo("panel"); G.p2.appendChild(caja(T, 70, 50, "", { right: contenidoPanel(P.p2) }));
  G.p3 = grupo("panel"); G.p3.appendChild(caja(T, 70, 50, "", { left: contenidoPanel(P.p3) }));
  ["p1", "p2", "p3"].forEach(k => { G[k].dataset.p = k; });

  /* Objetos sobre la base: tote y aficheta, apoyadas */
  G.objs = grupo("objs");
  const tote = cara(38, 40, `${lugar(-4, TB + .08, -3)} rotateX(90deg) rotateZ(-4deg)`, "f--obj f--plano", SVG.tote());
  const afi = cara(21, 29.7, `${lugar(11, TB + .35, 8)} rotateX(90deg) rotateZ(7deg)`, "f--obj f--plano", SVG.aficheta());
  tote.dataset.o = "tote"; afi.dataset.o = "aficheta";
  G.objs.append(tote, afi);

  /* Espacio de remeras, aparte */
  G.remera = grupo("remeraG");
  const RX = 66;
  G.remera.appendChild(cara(56, 34, `${lugar(RX, .02, 0)} rotateX(90deg)`, "f--zona", `<span>Espacio de remeras</span>`));
  [[RX - 26, 0], [RX + 26, 0]].forEach(([x, z]) => { const b = caja(1.2, 100, 1.2, "barra"); b.style.transform = lugar(x, 50, z); G.remera.appendChild(b); });
  const barra = caja(53.2, 1.2, 1.2, "barra"); barra.style.transform = lugar(RX, 100.6, 0); G.remera.appendChild(barra);
  const remF = cara(52, 59, `${lugar(RX, 100 - 29.5, 0)}`, "f--obj f--remera", SVG.remera("frente"));
  const remB = cara(52, 59, `${lugar(RX, 100 - 29.5, 0)} rotateY(180deg)`, "f--obj f--remera", SVG.remera("espalda"));
  remF.dataset.o = remB.dataset.o = "remera";
  G.remera.append(remF, remB);
  G.remera.appendChild(cara(52, 6, `${lugar(RX, 108, 0)}`, "f--rot", `<span>Remera · aparte, con percha</span>`));

  /* Cotas */
  G.cotas = grupo("cotas"); G.cotasAlto = grupo("cotas"); G.cotasFondo = grupo("cotas");
  const cota = (g, w, txt, tr) => g.appendChild(cara(w, 5, tr, "f--cota", `<i></i><span>${txt}</span><i></i>`));
  cota(G.cotas, 50, "50 cm", `${lugar(0, .05, 29)} rotateX(90deg)`);
  cota(G.cotas, 50, "50 cm", `${lugar(29, .05, 0)} rotateX(90deg) rotateZ(-90deg)`);
  cota(G.cotasAlto, 70, "70 cm", `${lugar(29, TB + 35, 25)} rotateZ(-90deg)`);
  cota(G.cotasFondo, 50, "50 cm", `${lugar(0, TB + 80, -25)}`);

  /* Otra entrega encima (prueba de apilado) */
  G.ghost = grupo("ghost");
  const gb = caja(50, TB, 50, "fant-b"); gb.style.transform = lugar(0, TB / 2, 0);
  const g1 = caja(50, 70, T, "fant-b"); g1.style.transform = lugar(0, TB + 35, -25 + T / 2);
  const g2 = caja(T, 70, 49.5, "fant-b"); g2.style.transform = lugar(-25 + T / 2, TB + 35, .25);
  const g3 = caja(T, 70, 49.5, "fant-b"); g3.style.transform = lugar(25 - T / 2, TB + 35, .25);
  G.ghost.append(gb, g1, g2, g3);
  G.ghost.appendChild(cara(60, 6, lugar(0, TB + 76, 25.5), "f--rot f--rot-acc", `<span>Otra entrega apoyada encima</span>`));

  /* Posición de cada grupo según estado (despiece, apilado, visibilidad) */
  const est = { ver: new Set(["base", "p1", "p2", "p3", "objs", "remera"]), despiece: false, apilar: false, tapa: null, cotas: true };
  function ubicar() {
    const d = est.despiece ? 1 : 0, sube = k => est.ver.has(k) ? 0 : 34;
    G.base.style.transform = lugar(0, TB / 2 + sube("base"), 0);
    G.p1.style.transform = lugar(0, TB + 35 + sube("p1"), -25 + T / 2 - 18 * d);
    G.p2.style.transform = lugar(-25 + T / 2 - 18 * d, TB + 35 + sube("p2"), .25) + " scaleZ(.99)";
    G.p3.style.transform = lugar(25 - T / 2 + 18 * d, TB + 35 + sube("p3"), .25) + " scaleZ(.99)";
    G.objs.style.transform = lugar(0, 14 * d + sube("objs"), 0);
    G.remera.style.transform = lugar(0, sube("remera"), 0);
    G.ghost.style.transform = lugar(0, (TB + 70) + (est.apilar ? 0 : 60), 0);
    ["base", "p1", "p2", "p3", "objs", "remera"].forEach(k => G[k].classList.toggle("off", !est.ver.has(k)));
    ["p2", "p3", "remera"].forEach(k => G[k].classList.toggle("tapa", !!est.tapa && est.tapa.includes(k)));
    G.ghost.classList.toggle("off", !est.apilar);
    const sinCotas = !est.cotas || est.despiece || est.apilar;
    G.cotas.classList.toggle("off", sinCotas);
    G.cotasAlto.classList.toggle("off", sinCotas || !est.ver.has("p3"));
    G.cotasFondo.classList.toggle("off", sinCotas || !est.ver.has("p1"));
    $("#tgDespiece").checked = est.despiece; $("#tgApilar").checked = est.apilar; $("#tgCotas").checked = est.cotas;
  }

  /* Cámara */
  const cam = Object.assign({ vista: "general" }, structuredClone(VISTAS.general));
  let ajuste = 1;
  function medir() {
    const r = escE.getBoundingClientRect();
    ajuste = Math.min(r.height / (U * 118), r.width / (U * 92));
    pintarCam();
  }
  function pintarCam() {
    const [tx, ty, tz] = cam.t;
    camE.style.transform = `scale(${(ajuste * cam.zoom).toFixed(4)}) rotateX(${cam.pitch}deg) rotateY(${cam.yaw}deg) translate3d(${px(-tx)}, ${px(ty)}, ${px(-tz)})`;
  }
  function irA(nombre) {
    const v = VISTAS[nombre]; if (!v) return;
    camE.classList.remove("drag");
    /* camino corto entre ángulos */
    let yaw = v.yaw; while (yaw - cam.yaw > 180) yaw -= 360; while (yaw - cam.yaw < -180) yaw += 360;
    Object.assign(cam, structuredClone(v), { yaw, vista: nombre });
    est.tapa = v.tapa || null;
    $$(".esc__vistas .chip").forEach(b => b.classList.toggle("on", b.dataset.vista === nombre));
    ubicar(); pintarCam();
  }

  /* Arrastrar para girar (sin robar el clic de las zonas) */
  let arr = null;
  escE.addEventListener("pointerdown", e => {
    if (e.target.closest(".esc__hud")) return;
    arr = { x: e.clientX, y: e.clientY, yaw: cam.yaw, pitch: cam.pitch, mov: false, id: e.pointerId };
  });
  escE.addEventListener("pointermove", e => {
    if (!arr || e.pointerId !== arr.id) return;
    const dx = e.clientX - arr.x, dy = e.clientY - arr.y;
    if (!arr.mov && Math.hypot(dx, dy) < 5) return;
    if (!arr.mov) { arr.mov = true; escE.setPointerCapture(e.pointerId); camE.classList.add("drag"); escE.classList.add("girando"); est.tapa = null; ubicar(); $$(".esc__vistas .chip").forEach(b => b.classList.remove("on")); }
    cam.yaw = arr.yaw + dx * .35;
    cam.pitch = Math.max(-85, Math.min(8, arr.pitch - dy * .3));
    pintarCam();
  });
  const soltar = e => {
    if (!arr) return;
    if (arr.mov) { escE.dataset.recien = "1"; setTimeout(() => delete escE.dataset.recien, 60); }
    arr = null; camE.classList.remove("drag"); escE.classList.remove("girando");
    escE.classList.add("usado");
  };
  escE.addEventListener("pointerup", soltar); escE.addEventListener("pointercancel", soltar);
  escE.addEventListener("wheel", e => { if (!e.ctrlKey) return; e.preventDefault(); zoom(e.deltaY < 0 ? 1.08 : 1 / 1.08, true); }, { passive: false });
  escE.addEventListener("keydown", e => {
    const k = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, 6], ArrowDown: [0, -6] }[e.key];
    if (!k || e.target !== escE) return;
    e.preventDefault(); cam.yaw += k[0]; cam.pitch = Math.max(-85, Math.min(8, cam.pitch - k[1])); pintarCam();
  });
  function zoom(f, sinAnim) { camE.classList.toggle("drag", !!sinAnim); cam.zoom = Math.max(.4, Math.min(3.2, cam.zoom * f)); pintarCam(); }
  $("#zMas").addEventListener("click", () => zoom(1.2));
  $("#zMenos").addEventListener("click", () => zoom(1 / 1.2));
  $$(".esc__vistas .chip").forEach(b => b.addEventListener("click", () => {
    est.ver = new Set(["base", "p1", "p2", "p3", "objs", "remera"]); est.apilar = false;
    irA(b.dataset.vista);
  }));
  $("#tgCotas").addEventListener("change", e => { est.cotas = e.target.checked; ubicar(); });
  $("#tgDespiece").addEventListener("change", e => {
    est.despiece = e.target.checked;
    if (est.despiece) { est.apilar = false; est.ver = new Set(["base", "p1", "p2", "p3", "objs", "remera"]); irA("despiece"); } else irA("tresCuartos");
  });
  $("#tgApilar").addEventListener("change", e => {
    est.apilar = e.target.checked;
    if (est.apilar) { est.despiece = false; est.ver = new Set(["base", "p1", "p2", "p3", "objs", "remera"]); irA("apilado"); } else ubicar();
  });

  /* ── Recorrido ─────────────────────────────────────────── */
  let paso = 0;
  $("#tourDots").innerHTML = PASOS.map((p, i) => `<li><button data-i="${i}" aria-label="Paso ${i + 1}: ${esc(p.t)}"></button></li>`).join("");
  function irPaso(i) {
    paso = Math.max(0, Math.min(PASOS.length - 1, i));
    const p = PASOS[paso];
    est.ver = new Set(p.ver === "todo" ? ["base", "p1", "p2", "p3", "objs", "remera"] : p.ver);
    est.apilar = !!p.apilar; est.despiece = false;
    irA(p.v);
    $("#tourN").textContent = `${paso + 1} / ${PASOS.length}`;
    $("#tourT").textContent = p.t;
    $("#tourX").innerHTML = `<p>${esc(p.x)}</p>` + (p.v.startsWith("p") && P[p.v] ? listaZonas(P[p.v]) : "");
    $("#tourPrev").disabled = paso === 0;
    $("#tourNext").textContent = paso === PASOS.length - 1 ? "Volver al inicio ↺" : "Siguiente →";
    $$("#tourDots button").forEach((b, k) => b.classList.toggle("on", k === paso));
  }
  const listaZonas = p => `<ul class="tour__zonas">${p.zonas.map(z => `<li><button data-z="${z.id}"><b>${esc(z.t)}</b><span>${medida(z)}</span></button></li>`).join("")}</ul>`;
  $("#tourPrev").addEventListener("click", () => irPaso(paso - 1));
  $("#tourNext").addEventListener("click", () => irPaso(paso === PASOS.length - 1 ? 0 : paso + 1));
  $("#tourDots").addEventListener("click", e => { const b = e.target.closest("button"); if (b) irPaso(+b.dataset.i); });

  /* ── Selección de zona (3D, recorrido y paneles 2D) ────── */
  let zSel = null;
  function selZona(id, mover) {
    const z = ZONAS.find(q => q.id === id); if (!z) return;
    zSel = id;
    $$("[data-z]").forEach(e => e.classList.toggle("sel", e.dataset.z === id));
    const d = $("#zonaDet"); d.hidden = false;
    d.innerHTML = `<div class="zona-det__h"><span class="lbl">Panel ${z.panel.n} · ${esc(z.panel.t)}</span><button class="ico" data-cerrar aria-label="Cerrar">×</button></div>
      <h4>${esc(z.t)}</h4><p class="zona-det__m">${medida(z)}</p><p>${esc(z.x)}</p><p class="zona-det__tip"><b>Consejo.</b> ${esc(z.tip)}</p>`;
    if (mover) {
      est.ver = new Set(["base", "p1", "p2", "p3", "objs", "remera"]); est.apilar = false; est.despiece = false;
      if (cam.vista !== z.panel.id) irA(z.panel.id); else ubicar();
    }
  }
  $("#zonaDet").addEventListener("click", e => {
    if (!e.target.closest("[data-cerrar]")) return;
    zSel = null; $("#zonaDet").hidden = true; $$("[data-z].sel").forEach(x => x.classList.remove("sel"));
  });
  mundo.addEventListener("click", e => {
    if (escE.dataset.recien) return;
    const b = e.target.closest(".zn"); if (b) selZona(b.dataset.z, true);
  });
  $("#tourX").addEventListener("click", e => { const b = e.target.closest("[data-z]"); if (b) selZona(b.dataset.z, true); });

  /* ══════════════════════════════════════════════════════
     2. PANELES A ESCALA Y PLANTILLAS 1:1
     ══════════════════════════════════════════════════════ */
  function svgPanel(p, plantilla) {
    const [W, H] = PAG;
    const zonas = p.zonas.map(z => {
      const [x, y, w, h] = z.r, cx = x + w / 2, cy = y + h / 2;
      const fs = plantilla ? 30 : Math.max(48, Math.min(72, w * .13)), n = z.l.length;
      const lineas = z.l.map((t, i) => `<tspan x="${cx}" y="${cy + (i - (n - 1) / 2) * fs * 1.15 - (plantilla ? 0 : fs * .35)}">${esc(t)}</tspan>`).join("");
      return plantilla
        ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#000" stroke-width="1.5"/>
           <text text-anchor="middle" font-family="Arial, sans-serif" font-size="${fs}" fill="#000">${lineas}</text>
           <text x="${cx}" y="${cy + n * fs * .6 + 24}" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#666">${medida(z)}</text>`
        : `<g class="ez" data-z="${z.id}" tabindex="0" role="button" aria-label="${esc(z.t)}, ${medida(z)}">
             <rect x="${x}" y="${y}" width="${w}" height="${h}"/>
             <text class="ez__t" text-anchor="middle" font-size="${fs}">${lineas}</text>
             <text class="ez__m" x="${cx}" y="${cy + (n / 2) * fs * 1.15 + fs * .35}" text-anchor="middle" font-size="${fs * .62}">${medida(z)}</text>
           </g>`;
    }).join("");
    if (plantilla) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="50cm" height="70cm" viewBox="0 0 ${W} ${H}">
  <title>TP4 · Panel ${p.n} · ${p.t} · 50 × 70 cm</title>
  <rect x="0" y="0" width="${W}" height="${H}" fill="#fff" stroke="#000" stroke-width="1"/>
  ${zonas}
  <text x="${W - 20}" y="${H - 14}" text-anchor="end" font-family="Arial, sans-serif" font-size="14" fill="#999">TP4 · Panel ${p.n} · ${p.t} · 50 × 70 cm · escala 1:1</text>
</svg>`;
    }
    return `<svg viewBox="-150 -120 ${W + 170} ${H + 140}" class="elev" role="img" aria-label="Panel ${p.n}, ${esc(p.t)}, 50 por 70 centímetros">
      <g class="cota"><path d="M0 -70 H${W} M0 -90 V-50 M${W} -90 V-50"/><text x="${W / 2}" y="-84" text-anchor="middle">50 cm</text></g>
      <g class="cota"><path d="M-80 0 V${H} M-100 0 H-60 M-100 ${H} H-60"/><text transform="translate(-96 ${H / 2}) rotate(-90)" text-anchor="middle">70 cm</text></g>
      <rect class="elev__hoja" x="0" y="0" width="${W}" height="${H}"/>
      ${zonas}
    </svg>`;
  }
  $("#panelesG").innerHTML = PANELES.map(p => `
    <article class="pan" id="pan-${p.id}">
      <header class="pan__h"><span class="pan__n">${p.n}</span><div><h3>Panel ${p.n} · ${esc(p.t)}</h3><p>${esc(p.donde)}</p></div></header>
      ${svgPanel(p)}
      <ul class="pan__zonas">${p.zonas.map(z => `<li data-z="${z.id}"><button data-z="${z.id}"><b>${esc(z.t)}</b><span>${medida(z)}</span></button><p>${esc(z.x)}</p></li>`).join("")}</ul>
      <div class="pan__acc"><button class="btn btn--s" data-plantilla="${p.id}">Plantilla 1:1 (SVG)</button><button class="btn btn--sec btn--s" data-ver="${p.id}">Ver en 3D</button></div>
    </article>`).join("");
  $("#panelesG").addEventListener("click", e => {
    const z = e.target.closest("[data-z]"); if (z && !e.target.closest(".pan__zonas p")) { selZona(z.dataset.z, false); }
    const v = e.target.closest("[data-ver]");
    if (v) { est.ver = new Set(["base", "p1", "p2", "p3", "objs", "remera"]); est.apilar = false; est.despiece = false; irA(v.dataset.ver); $("#cubo").scrollIntoView({ behavior: "smooth" }); }
    const t = e.target.closest("[data-plantilla]");
    if (t) {
      const p = P[t.dataset.plantilla];
      const blob = new Blob([svgPanel(p, true)], { type: "image/svg+xml" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `tp4-panel-${p.n}-${p.t.toLowerCase().replace(/\s+/g, "-")}-50x70.svg`;
      document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    }
  });
  $("#panelesG").addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.matches(".ez")) { e.preventDefault(); selZona(e.target.dataset.z, false); } });

  /* ══════════════════════════════════════════════════════
     3. OBJETOS
     ══════════════════════════════════════════════════════ */
  const planoBase = `<svg viewBox="-9 -6 68 66" class="plano" role="img" aria-label="Base de 50 por 50 centímetros vista desde arriba, con la tote y la aficheta">
    <rect class="plano__base" x="0" y="0" width="50" height="50"/>
    <rect class="plano__pan" x="0" y="0" width="50" height="1"/><rect class="plano__pan" x="0" y="0" width="1" height="50"/><rect class="plano__pan" x="49" y="0" width="1" height="50"/>
    <g transform="translate(21 22) rotate(-4)"><rect class="plano__obj" x="-19" y="-20" width="38" height="40"/><text x="0" y="1">Tote</text></g>
    <g transform="translate(36 33) rotate(7)"><rect class="plano__obj plano__obj--b" x="-10.5" y="-14.85" width="21" height="29.7"/><text x="0" y="1">Aficheta</text></g>
    <text class="plano__lbl" x="25" y="-2.2">Panel 1 · fondo</text>
    <text class="plano__lbl" transform="translate(-2.2 25) rotate(-90)">Panel 2</text>
    <text class="plano__lbl" transform="translate(52.2 25) rotate(90)">Panel 3</text>
    <path class="plano__cota" d="M0 54 H50 M0 52.5 V55.5 M50 52.5 V55.5"/><text class="plano__lbl" x="25" y="58.6">50 cm · lado abierto</text>
  </svg>`;
  $("#objetosG").innerHTML = `
    <article class="obj obj--base"><div class="obj__fig">${planoBase}</div>
      <div class="obj__tx"><span class="lbl">La base, desde arriba</span><h3>Tote y aficheta, dentro de los 50 × 50</h3>
      <p>Las dos se apoyan sobre la base, adentro del cubo. Cómo se acomodan lo decide cada grupo: el esquema es un ejemplo.</p></div></article>
    ${OBJETOS.map(o => `<article class="obj" data-o="${o.id}"><div class="obj__fig">${o.id === "remera"
      ? `<div class="obj__dos"><figure>${SVG.remera("frente")}<figcaption>Frente</figcaption></figure><figure>${SVG.remera("espalda")}<figcaption>Espalda</figcaption></figure></div>`
      : SVG[o.id]()}</div>
      <div class="obj__tx"><span class="lbl">${esc(o.donde)}</span><h3>${esc(o.t)}</h3><p class="obj__m">${esc(o.medida)}</p><p>${esc(o.x)}</p>
      <ul class="obj__ok">${o.ok.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div></article>`).join("")}`;

  /* ══════════════════════════════════════════════════════
     4. MATERIALES Y ARMADO
     ══════════════════════════════════════════════════════ */
  const REQ = [
    ["Medidas", "Tres paneles de 50 × 70 cm y una base de 50 × 50 cm."],
    ["Material", "Foamboard o cualquier material que aguante el armado y sea apilable."],
    ["Forma", "Se entrega armado, en forma de cubo: fondo y dos laterales sobre la base, abierto al frente."],
    ["Estabilidad", "Se para solo y aguanta otra entrega apoyada encima. Si no se mantiene estable, sufre la nota."],
    ["Objetos", "Tote y aficheta sobre la base. La remera, aparte y en percha (la más barata que encuentren)."]
  ];
  const REC = [
    ["Foamboard de 5 mm o más", "El de 10 mm es más rígido y perdona más. Cartulina, cartón gris fino o corrugado sin refuerzo se comban con el peso."],
    ["Paneles apoyados sobre la base", "Pegá cada panel al canto de la base y los paneles entre sí en las esquinas. El espesor del material se absorbe en las uniones: lo importante es que quede a escuadra."],
    ["Pegamento que no derrita", "Cola vinílica, silicona caliente o cinta doble faz de espuma. Los pegamentos de contacto con solvente pueden derretir el foam: probá siempre en un recorte."],
    ["Refuerzos por fuera", "Escuadras o tiras del mismo material en las esquinas, del lado de afuera, donde no tapan ninguna pieza."],
    ["Piezas bien montadas", "Impresas y pegadas en toda su superficie, sin burbujas ni puntas levantadas, recortadas al ras de su zona."],
    ["Bordes superiores parejos", "Los tres paneles a la misma altura y nada que sobresalga arriba: ahí se apoya la entrega de encima."]
  ];
  $("#armadoG").innerHTML = `
    <div class="arm arm--req"><h3>Lo que se pide</h3><dl>${REQ.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl></div>
    <div class="arm"><h3>Cómo lograrlo</h3><dl>${REC.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl></div>`;
  $("#prueba").innerHTML = [
    ["Se para solo", "Apoyalo en el piso y soltalo. No se tiene que inclinar ni abrir."],
    ["Empujón lateral", "Empujalo suave desde un costado. Se tiene que mover entero, sin que se doble ningún panel."],
    ["Peso encima", "Apoyá unos libros sobre los bordes superiores. No tiene que ceder."],
    ["QR", "Escanealo ya impreso con dos celulares. Tiene que abrir el Instagram del evento."]
  ].map(([a, b], i) => `<li><span class="prueba__n">${i + 1}</span><b>${esc(a)}</b><p>${esc(b)}</p></li>`).join("");

  /* ══════════════════════════════════════════════════════
     5. CHECKLIST
     ══════════════════════════════════════════════════════ */
  const CHK = [
    { t: "Estructura", items: [["e1", "Tres paneles de 50 × 70 cm"], ["e2", "Base de 50 × 50 cm"], ["e3", "Armado en cubo, con los paneles a escuadra"], ["e4", "Se para solo, sin inclinarse"], ["e5", "Aguanta otra entrega encima"], ["e6", "Bordes superiores parejos, sin nada que sobresalga"]] },
    ...PANELES.map(p => ({ t: `Panel ${p.n} · ${p.t}`, items: p.zonas.map(z => [z.id, `${z.t} · ${medida(z)}`]) })),
    { t: "Objetos", items: [["o1", "Tote estampada, sobre la base"], ["o2", "Aficheta impresa de los dos lados, doblada, sobre la base"], ["o3", "Remera estampada, colgada en su percha"]] },
    { t: "Antes de salir", items: [["a1", "El QR impreso abre el Instagram del evento"], ["a2", "Las piezas y los videos están publicados en ese Instagram"]] }
  ];
  let checks = {};
  try { checks = JSON.parse(store.get("tp4-entrega-checks") || "{}") || {}; } catch (e) {}
  const totalChk = CHK.reduce((a, g) => a + g.items.length, 0);
  function renderChk() {
    $("#chk").innerHTML = CHK.map(g => {
      const n = g.items.filter(([k]) => checks[k]).length;
      return `<fieldset class="chk__g"><legend>${esc(g.t)} <span>${n}/${g.items.length}</span></legend>${g.items.map(([k, t]) =>
        `<label class="chk__i"><input type="checkbox" data-k="${k}"${checks[k] ? " checked" : ""}><span>${esc(t)}</span></label>`).join("")}</fieldset>`;
    }).join("");
    const n = Object.keys(checks).filter(k => checks[k]).length;
    $("#chkN").textContent = `${n} de ${totalChk}`;
    $("#chkBarra").style.width = (n / totalChk * 100) + "%";
  }
  $("#chk").addEventListener("change", e => {
    const k = e.target.dataset.k; if (!k) return;
    if (e.target.checked) checks[k] = 1; else delete checks[k];
    store.set("tp4-entrega-checks", JSON.stringify(checks)); renderChk();
  });
  $("#chkReset").addEventListener("click", () => { checks = {}; store.set("tp4-entrega-checks", "{}"); renderChk(); });
  renderChk();

  /* ══════════════════════════════════════════════════════
     6. DUDAS
     ══════════════════════════════════════════════════════ */
  const DUDAS = [
    ["¿Cuándo se entrega?", `${ENTREGA.fecha}, ${ENTREGA.horario}.`],
    ["¿De qué material hago los paneles?", "Foamboard o cualquier material que aguante el armado y sea apilable. Si se comba o se dobla con peso encima, no sirve."],
    ["¿Qué quiere decir que sea apilable?", "Que el cubo, armado, aguanta otra entrega apoyada encima sin ceder ni inclinarse. Por eso los bordes superiores tienen que quedar parejos."],
    ["¿Qué pasa si el cubo no se mantiene estable?", "Sufre la nota. Hacé la prueba de la sección Materiales y armado antes de traerlo."],
    ["¿El contenido de los paneles mira hacia afuera o hacia adentro?", "Hacia adentro. El cubo se mira desde el lado abierto: al fondo el panel 1, a la izquierda el 2 y a la derecha el 3. Las caras de afuera quedan lisas."],
    ["¿Cómo se ven las piezas animadas?", "Por el QR del panel 2: lleva al Instagram del evento, donde están publicadas las piezas y los videos."],
    ["¿Dónde van la tote y la aficheta?", "Sobre la base, dentro de los 50 × 50 cm. Cómo las acomodan lo decide cada grupo."],
    ["¿Y la remera?", "No va en la base. Hay un espacio especial para las remeras. Tiene que llegar colgada en una percha: la más barata que encuentren."],
    ["¿Puedo usar la plantilla para diagramar?", "Sí. Cada panel se descarga como SVG a tamaño real (50 × 70 cm), con las zonas y sus medidas. Se abre en Illustrator, Figma o Inkscape."]
  ];
  $("#dudasG").innerHTML = DUDAS.map(([q, a]) => `<details class="duda"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");

  /* ── Modo claro / oscuro compartido ────────────────────── */
  $("#btnModo").addEventListener("click", () => {
    const oscuro = root.dataset.modo ? root.dataset.modo === "oscuro" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.modo = oscuro ? "claro" : "oscuro"; store.set("tp4-modo", root.dataset.modo);
  });

  /* ── Arranque ──────────────────────────────────────────── */
  camE.classList.add("drag");
  medir(); irPaso(0);
  requestAnimationFrame(() => requestAnimationFrame(() => camE.classList.remove("drag")));
  addEventListener("resize", () => { camE.classList.add("drag"); medir(); requestAnimationFrame(() => camE.classList.remove("drag")); });
  window.__entrega = { cam, est, irPaso, irA, selZona, ZONAS, svgPanel: id => svgPanel(P[id], true) }; /* para pruebas */
})();
