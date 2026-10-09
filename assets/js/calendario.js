/* ============================================================
   TP4 · Calendario de entregas
   Las fechas, feriados y el plan de hitos están acá arriba.
   ============================================================ */

/* --- Configuración: cambiá estas fechas si cambia la cursada --- */
const CAL = {
  inicio: "2026-10-08",          // primera clase del TP (presentación)
  entrega: "2026-11-16",         // entrega final
  dias: [1, 2, 3, 4],            // días de cursada: 1 lunes … 4 jueves
  previas: 2,                    // la pre-entrega es N clases antes de la entrega
  horario: ["19:00", "23:00"]
};

/* --- Feriados entre octubre y diciembre de 2026 ------------------------
   bloquea: true = no hay clase en FADU (CABA). false = solo informativo. */
const FERIADOS = [
  { f: "2026-10-12", t: "Día del Respeto a la Diversidad Cultural", a: "Nacional", bloquea: true, src: "infobae" },
  { f: "2026-11-09", t: "Visita del papa León XIV", a: "Nacional · Decreto 1103/2026", bloquea: true, src: "chequeado" },
  { f: "2026-11-10", t: "Visita del papa León XIV", a: "Ciudad de Buenos Aires y Córdoba", bloquea: true, src: "chequeado" },
  { f: "2026-11-11", t: "Visita del papa León XIV", a: "Solo provincia de Buenos Aires: en CABA es día hábil", bloquea: false, src: "chequeado" },
  { f: "2026-11-23", t: "Día de la Soberanía Nacional (trasladado del 20/11)", a: "Nacional", bloquea: true, src: "lanacion" },
  { f: "2026-12-07", t: "Día no laborable con fines turísticos", a: "Nacional", bloquea: true, src: "bloomberg" },
  { f: "2026-12-08", t: "Inmaculada Concepción de María", a: "Nacional", bloquea: true, src: "bloomberg" }
];
const FUENTES_CAL = {
  chequeado: ["Chequeado — Feriados del 9, 10 y 11 de noviembre y dónde rigen", "https://chequeado.com/el-explicador/visita-del-papa-leon-xiv-cuales-son-los-feriados-del-9-10-y-11-de-noviembre-y-donde-rigen/"],
  infobae: ["Infobae — Calendario 2026: cuándo es el próximo feriado", "https://www.infobae.com/sociedad/2026/09/28/calendario-2026-cuando-es-el-proximo-feriado-en-argentina/"],
  lanacion: ["La Nación — Feriados de octubre 2026", "https://www.lanacion.com.ar/feriados/2026/feriados-de-octubre-2026-el-calendario-completo-de-fines-de-semana-largos-nid30092026/"],
  bloomberg: ["Bloomberg Línea — Feriados de octubre y noviembre de 2026", "https://www.bloomberglinea.com/latinoamerica/argentina/feriados-de-octubre-y-noviembre-de-2026-cuando-es-el-proximo-fin-de-semana-largo-en-argentina/"]
};

/* --- Fases del trabajo (ordenadas en el tiempo) --- */
const FASES = [
  { id: 1, t: "Arranque", d: "Tema, público, concepto y programa" },
  { id: 2, t: "Identidad y sistema", d: "Marca, versiones y constantes" },
  { id: 3, t: "Piezas gráficas", d: "Séxtuple, A2, Instagram y web" },
  { id: 4, t: "Movimiento", d: "ID, teaser, promocional, espera y overlays" },
  { id: 5, t: "Espacio", d: "Merchandising y photo opportunity" },
  { id: 6, t: "Cierre", d: "Sistema completo, pre-entrega y entrega" }
];

/* --- Hitos: lo que se trae a cada clase, en orden. "peso" = esfuerzo relativo --- */
const HITOS = [
  { fase: 1, peso: 1, t: "Tema, público y referentes", piezas: [],
    traer: "Análisis del tema: a quién le habla el evento, qué espera ese público, tres referentes argentinos con lo que se toma de cada uno y un moodboard de una lámina.",
    clase: "Puesta en común por tema. Se marcan los clichés a evitar.",
    listo: ["Público definido en una frase", "Tres referentes con qué mirar de cada uno", "Lista de clichés a evitar"] },
  { fase: 1, peso: 1, t: "Concepto y programa", piezas: [],
    traer: "Concepto en una frase y el programa del evento: actividades, espacios y horarios de los tres días, precio e inscripción.",
    clase: "Corrección del concepto. El programa queda como fuente de todos los datos de las piezas.",
    listo: ["Concepto en una frase", "Al menos 8 actividades por día, con espacios inventados", "Qué, cuándo, dónde, cuánto, cómo y quiénes definidos"] },
  { fase: 2, peso: 1, t: "Bocetos de marca", piezas: ["marca"],
    traer: "Tres caminos de identificador, en blanco y negro, a mano o en digital.",
    clase: "Se elige un camino, o se combinan dos.",
    listo: ["Tres caminos distintos entre sí", "Cada uno probado a 110 px"] },
  { fase: 2, peso: 1, t: "Marca y versiones", piezas: ["marca"],
    traer: "Identificador elegido con versión principal, reducida, en un color y en negativo.",
    clase: "Prueba de escala: de avatar a séxtuple.",
    listo: ["Se lee como avatar circular", "Funciona en un color y en negativo", "Área de resguardo definida"] },
  { fase: 2, peso: 1.2, t: "Kit del sistema", piezas: ["marca"],
    traer: "Una lámina con las constantes: paleta con proporciones, dos familias tipográficas con roles, retícula, recurso propio y misceláneas.",
    clase: "Prueba del sistema: se aplica en clase a un formato que no estaba previsto.",
    listo: ["Paleta con proporciones", "Dos familias con roles fijos", "Recurso propio definido"] },
  { fase: 3, peso: 0.8, t: "Séxtuple: bocetos", piezas: ["afiche"],
    traer: "Dos o tres bocetos del afiche de vía pública, en proporción 2:1.",
    clase: "Test de 3 segundos con el grupo.",
    listo: ["Una imagen, un titular, la marca", "Fecha y lugar en segundo nivel", "Nada importante en las uniones de los paños"] },
  { fase: 3, peso: 1, t: "Perfil de Instagram", piezas: ["ig"],
    traer: "Avatar, tres publicaciones fijas y un carrusel de tres placas, vistos en la grilla del perfil.",
    clase: "Corrección de la grilla completa, no posteo por posteo.",
    listo: ["Avatar con la versión reducida", "Cada posteo informa una actividad, expositor o taller", "La grilla se lee como un solo evento"] },
  { fase: 3, peso: 1.2, t: "Programa A2: frente", piezas: ["programa"],
    traer: "Frente del A2 con grilla de días, horarios y espacios, mapa, destacados y QR. Impreso a tamaño real o al 50 %.",
    clase: "Corrección sobre papel: se marcan los pliegues.",
    listo: ["Se encuentra una actividad en menos de 10 segundos", "Mapa y QR presentes", "Los pliegues no cortan títulos"] },
  { fase: 3, peso: 1, t: "Séxtuple final y aficheta", piezas: ["afiche", "programa"],
    traer: "Séxtuple corregido y dorso decorativo del A2.",
    clase: "Se comparan las dos piezas juntas.",
    listo: ["El séxtuple pasa el test de 3 segundos", "El dorso funciona como póster por sí solo"] },
  { fase: 3, peso: 0.8, t: "Landing web", piezas: ["web"],
    traer: "Primera pantalla del sitio en desktop y en mobile, como mockup.",
    clase: "Revisión de la jerarquía en los dos tamaños.",
    listo: ["Marca, fecha, lugar y botón sin scrollear", "Mobile diagramado, no achicado"] },
  { fase: 4, peso: 1, t: "ID animado", piezas: ["id"],
    traer: "Storyboard y primera animación del identificador, de 5 segundos como máximo.",
    clase: "Se define el gesto de movimiento de todo el sistema.",
    listo: ["Termina en la marca quieta", "Se entiende sin sonido", "Dura 5 segundos o menos"] },
  { fase: 4, peso: 1, t: "Guiones de teaser y promocional", piezas: ["teaser", "promo"],
    traer: "Guion y storyboard de los dos videos verticales: teaser de 15 a 20 s y promocional de 45 a 60 s.",
    clase: "Corrección de estructura y tiempos antes de animar.",
    listo: ["El teaser no revela el detalle", "El promocional incluye todos los datos y el CTA", "Los dos cierran con el ID"] },
  { fase: 4, peso: 1, t: "Teaser animado", piezas: ["teaser"],
    traer: "Teaser exportado en 750 × 1334, de 15 a 20 segundos.",
    clase: "Se mira en celular, sin sonido.",
    listo: ["Gancho en los primeros 2 segundos", "Cierra con el ID"] },
  { fase: 4, peso: 1.3, t: "Promocional animado", piezas: ["promo"],
    traer: "Promocional exportado en 750 × 1334, de 45 a 60 segundos, con subtítulos.",
    clase: "Se mira en celular, sin sonido.",
    listo: ["Se entiende qué, cuándo, dónde y cómo sin audio", "Termina con CTA e ID"] },
  { fase: 4, peso: 1, t: "Video de espera y overlays", piezas: ["espera", "overlays"],
    traer: "Video de espera de 5 a 10 s en 1920 × 1080 y las tres pantallas de streaming.",
    clase: "Se proyecta en el aula para probar la lectura a distancia.",
    listo: ["El nombre del expositor se lee desde el fondo", "Los zócalos se leen sobre fondo claro y oscuro"] },
  { fase: 5, peso: 1, t: "Merchandising", piezas: ["merch"],
    traer: "Remera, tote bag y ocho objetos más, en mockup, con la técnica de impresión pensada.",
    clase: "Corrección del conjunto de objetos.",
    listo: ["Remera y tote bag", "Ocho objetos con sentido para el tema", "Patrones y misceláneas, no solo el logo"] },
  { fase: 5, peso: 1, t: "Photo opportunity", piezas: ["photo"],
    traer: "Photo opportunity de al menos 4 × 4 m en render o mockup, con el encuadre vertical del celular dibujado.",
    clase: "Prueba de encuadre con dos personas.",
    listo: ["La marca entra en la foto vertical", "Se entiende dónde pararse"] },
  { fase: 6, peso: 1, t: "Sistema completo", piezas: ["marca", "afiche", "programa", "id", "teaser", "promo", "ig", "espera", "web", "overlays", "merch", "photo"],
    traer: "Las doce piezas juntas en una lámina o presentación borrador.",
    clase: "Revisión de coherencia y de datos con el checklist de las cinco pautas.",
    listo: ["Están las 12 piezas", "Fecha, lugar y precio iguales en todas", "Ningún color ni tipografía fuera del sistema"] }
];

/* Pares que pueden compartir clase si faltan días (índices de HITOS), en orden de prioridad */
const JUNTAR = [[0, 1], [5, 6], [15, 16], [9, 10], [13, 14]];

const ESPECIALES = {
  presentacion: { t: "Presentación del TP", fase: 1,
    traer: "Nada. Es la primera clase del TP.",
    clase: "Presentación de la consigna y de los cuatro temas, con la clase en slides. Cada grupo elige tema.",
    listo: ["Tema elegido", "Grupo armado"] },
  pre: { t: "Pre-entrega", fase: 6, piezas: ["marca", "afiche", "programa", "id", "teaser", "promo", "ig", "espera", "web", "overlays", "merch", "photo"],
    traer: "Todo lo de la entrega, completo y presentado como si fuera la entrega final: las doce piezas, en sus formatos y duraciones.",
    clase: "Última corrección. Lo que se marca hoy es lo único que se cambia antes de entregar.",
    listo: ["Las 12 piezas completas", "Videos exportados en su formato y duración", "Merchandising: remera, tote bag y 8 más", "Presentación armada"] },
  ajuste: { t: "Ajustes finales", fase: 6, piezas: ["marca", "afiche", "programa", "id", "teaser", "promo", "ig", "espera", "web", "overlays", "merch", "photo"],
    traer: "Las piezas con las correcciones de la pre-entrega.",
    clase: "Últimos ajustes, revisión de archivos y armado final de la presentación.",
    listo: ["Correcciones de la pre-entrega aplicadas", "Archivos exportados y nombrados", "Presentación en el orden de la consigna"] },
  entrega: { t: "Entrega final", fase: 6, piezas: ["marca", "afiche", "programa", "id", "teaser", "promo", "ig", "espera", "web", "overlays", "merch", "photo"],
    traer: "Las doce piezas finales en la presentación.",
    clase: "Entrega y presentación del sistema.",
    listo: ["Identificación eficaz", "Coherencia sistémica", "Adecuación estilística", "Rendimiento comunicacional", "Ajuste a la consigna"] }
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
  $$("[data-cfg]").forEach(e => { e.textContent = CONFIG[e.dataset.cfg] || ""; });

  /* ── Fechas sin sorpresas de zona horaria ──────────────── */
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const deIso = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const DIAS_C = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const largo = d => `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`;
  const corto = d => `${DIAS_C[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
  const feriado = s => FERIADOS.find(f => f.f === s);
  const pz = id => PIEZAS.find(p => p.id === id);
  const hoyIso = iso(new Date());

  /* ── Estado: configuración ajustable por el usuario ────── */
  let cfg = Object.assign({}, CAL);
  try { const g = JSON.parse(store.get("tp4-cal") || "null"); if (g && g.v === 1) cfg = Object.assign(cfg, g.cfg); } catch (e) {}

  /* ── El plan: sesiones y reparto de hitos ──────────────── */
  function planificar() {
    const ini = deIso(cfg.inicio), fin = deIso(cfg.entrega), ses = [];
    for (let d = new Date(ini); d <= fin; d.setDate(d.getDate() + 1)) {
      const s = iso(d), f = feriado(s);
      const esClase = cfg.dias.includes(d.getDay()) && !(f && f.bloquea);
      if (esClase || s === cfg.entrega) ses.push({ f: s, d: new Date(d) });
    }
    const n = ses.length, iEnt = n - 1;
    const iPre = Math.max(1, iEnt - cfg.previas);
    ses.forEach((s, k) => { s.n = k + 1; s.hitos = []; });
    ses[0].tipo = "presentacion";
    ses[iEnt].tipo = "entrega";
    if (iPre < iEnt) ses[iPre].tipo = "pre";
    for (let k = iPre + 1; k < iEnt; k++) ses[k].tipo = "ajuste";
    const trabajo = ses.slice(1, iPre);
    trabajo.forEach(s => { s.tipo = "trabajo"; });
    /* Reparto: un hito por clase. Si faltan clases, se juntan primero los pares
       que conviven bien; si sobran, se agrega una clase de avance tras los hitos más pesados. */
    let grupos = HITOS.map(h => [h]);
    const peso = g => g.reduce((a, h) => a + h.peso, 0);
    const N = trabajo.length;
    while (N && grupos.length > N) {
      let k = -1;
      for (const [a, b2] of JUNTAR) {
        const i = grupos.findIndex(g => g.includes(HITOS[a])), j = grupos.findIndex(g => g.includes(HITOS[b2]));
        if (i >= 0 && j === i + 1) { k = i; break; }
      }
      if (k < 0) { let min = Infinity; for (let i = 0; i < grupos.length - 1; i++) { const w = peso(grupos[i]) + peso(grupos[i + 1]); if (w < min) { min = w; k = i; } } }
      grupos.splice(k, 2, grupos[k].concat(grupos[k + 1]));
    }
    let extra = N - grupos.length;
    const pesados = grupos.map((g, i) => [peso(g), i]).sort((x, y) => y[0] - x[0]).slice(0, Math.max(0, extra)).map(x => x[1]).sort((x, y) => y - x);
    pesados.forEach(i => grupos.splice(i + 1, 0, { sigue: grupos[i][grupos[i].length - 1] }));
    for (; extra > pesados.length; extra--) grupos.push({ sigue: grupos[grupos.length - 1].sigue || grupos[grupos.length - 1][0] });
    trabajo.forEach((s, k) => { const g = grupos[k]; if (!g) return; if (Array.isArray(g)) s.hitos = g; else s.sigue = g.sigue; });
    return { ses, iPre, iEnt, trabajo: trabajo.length };
  }

  /* Contenido de una sesión */
  function contenido(s) {
    if (s.tipo === "trabajo") {
      if (s.hitos.length) return {
        t: s.hitos.map(h => h.t).join(" + "), fase: s.hitos[0].fase,
        traer: s.hitos.map(h => h.traer), clase: s.hitos.map(h => h.clase).join(" "),
        listo: s.hitos.flatMap(h => h.listo), piezas: [...new Set(s.hitos.flatMap(h => h.piezas))]
      };
      const h = s.sigue || HITOS[0];
      return { t: "Avance: " + h.t, fase: h.fase, traer: ["Avance corregido de " + h.t.toLowerCase() + "."], clase: "Corrección en mesa del avance.", listo: h.listo, piezas: h.piezas };
    }
    const e = ESPECIALES[s.tipo];
    return { t: e.t, fase: e.fase, traer: [e.traer], clase: e.clase, listo: e.listo, piezas: e.piezas || [] };
  }

  let plan = planificar(), sel = null;
  const faseColor = f => `var(--fase${f})`;

  /* ── Render: resumen ───────────────────────────────────── */
  function renderResumen() {
    const { ses, iPre, iEnt } = plan;
    const ini = deIso(cfg.inicio), fin = deIso(cfg.entrega);
    const bloq = FERIADOS.filter(f => f.bloquea && f.f >= cfg.inicio && f.f <= cfg.entrega && cfg.dias.includes(deIso(f.f).getDay()));
    const quedan = ses.filter(s => s.f >= hoyIso && s.tipo !== "entrega").length;
    const prox = ses.find(s => s.f >= hoyIso);
    $("#stats").innerHTML = [
      [ses.length - 1, "clases antes de entregar", `de ${corto(ini)} a ${corto(fin)}`],
      [bloq.length, "feriados en días de clase", bloq.map(f => corto(deIso(f.f))).join(" · ") || "ninguno"],
      [corto(ses[iPre].d), "pre-entrega", `${cfg.previas} clases antes`],
      [corto(ses[iEnt].d), "entrega final", `${CAL.horario[0]} a ${CAL.horario[1]} h`],
      [quedan, "clases que quedan", prox ? `próxima: ${corto(prox.d)}` : "terminó la cursada"]
    ].map(([v, l, s], k) => `<div class="stat${k === 2 || k === 3 ? " stat--hito" : ""}"><b>${v}</b><span>${l}</span><small>${esc(s)}</small></div>`).join("");
    const alerta = $("#alerta");
    if (plan.trabajo < 8) { alerta.hidden = false; alerta.textContent = `Con ${plan.trabajo} clases de trabajo antes de la pre-entrega, varias clases juntan dos o más hitos. Conviene adelantar trabajo fuera de clase.`; }
    else alerta.hidden = true;
  }

  /* ── Render: barra de fases ────────────────────────────── */
  function renderFases() {
    const cuenta = FASES.map(f => plan.ses.filter(s => contenido(s).fase === f.id).length);
    const tot = cuenta.reduce((a, b) => a + b, 0);
    $("#fases").innerHTML = FASES.map((f, k) => cuenta[k] ? `<div class="fase" style="flex:${cuenta[k]};--c:${faseColor(f.id)}" title="${esc(f.t)}: ${cuenta[k]} clases"><i></i><b>${esc(f.t)}</b><span>${cuenta[k]} ${cuenta[k] === 1 ? "clase" : "clases"}</span></div>` : "").join("");
    $("#fasesLeyenda").textContent = `${tot} encuentros, de la presentación a la entrega. Las fases van de claro a oscuro a medida que se acerca la entrega.`;
  }

  /* ── Render: meses ─────────────────────────────────────── */
  function renderMeses() {
    const ini = deIso(cfg.inicio), fin = deIso(cfg.entrega);
    const porFecha = Object.fromEntries(plan.ses.map(s => [s.f, s]));
    let html = "";
    for (let m = new Date(ini.getFullYear(), ini.getMonth(), 1); m <= fin; m = new Date(m.getFullYear(), m.getMonth() + 1, 1)) {
      const off = (m.getDay() + 6) % 7, dim = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
      let celdas = "";
      for (let k = 0; k < off; k++) celdas += `<div class="dia dia--vacio" aria-hidden="true"></div>`;
      for (let dd = 1; dd <= dim; dd++) {
        const d = new Date(m.getFullYear(), m.getMonth(), dd), s = iso(d), ses = porFecha[s], f = feriado(s);
        const fuera = s < cfg.inicio || s > cfg.entrega, finde = d.getDay() === 0 || d.getDay() === 6;
        const cls = ["dia"];
        if (fuera) cls.push("dia--fuera");
        if (finde) cls.push("dia--finde");
        if (s === hoyIso) cls.push("dia--hoy");
        if (f) cls.push(f.bloquea ? "dia--feriado" : "dia--aviso");
        let inner = `<span class="dia__n">${dd}</span>`;
        if (ses && !fuera) {
          const c = contenido(ses);
          cls.push("dia--clase", "dia--" + ses.tipo);
          if (sel === s) cls.push("dia--sel");
          inner += `<span class="dia__k">${ses.tipo === "entrega" ? "Entrega" : ses.tipo === "pre" ? "Pre-entrega" : "Clase " + ses.n}</span><span class="dia__t">${esc(c.t)}</span>`;
          celdas += `<button class="${cls.join(" ")}" data-f="${s}" style="--c:${faseColor(c.fase)}" aria-label="${esc(largo(d))}: ${esc(c.t)}">${inner}${f ? `<span class="dia__fer">${esc(f.t)}</span>` : ""}</button>`;
        } else {
          if (f && !fuera) inner += `<span class="dia__fer">${esc(f.t)}</span>`;
          celdas += `<div class="${cls.join(" ")}">${inner}</div>`;
        }
      }
      html += `<section class="mes"><h3>${MESES[m.getMonth()]} <span>${m.getFullYear()}</span></h3>
        <div class="mes__grid"><div class="mes__cab">lun</div><div class="mes__cab">mar</div><div class="mes__cab">mié</div><div class="mes__cab">jue</div><div class="mes__cab">vie</div><div class="mes__cab">sáb</div><div class="mes__cab">dom</div>${celdas}</div></section>`;
    }
    $("#meses").innerHTML = html;
    $$("#meses button.dia").forEach(b => b.addEventListener("click", () => { elegir(b.dataset.f, true); }));
  }

  /* ── Render: detalle de una clase ──────────────────────── */
  function checks() { try { return JSON.parse(store.get("tp4-cal-checks") || "{}") || {}; } catch (e) { return {}; } }
  function renderDetalle() {
    const s = plan.ses.find(x => x.f === sel) || plan.ses[0];
    const k = plan.ses.indexOf(s), c = contenido(s), sig = plan.ses[k + 1], ant = plan.ses[k - 1];
    const fz = FASES.find(f => f.id === c.fase), ch = checks();
    const f = feriado(s.f);
    $("#detalle").style.setProperty("--c", faseColor(c.fase));
    $("#detalle").innerHTML = `
      <div class="det__top">
        <button class="det__nav" data-ir="${ant ? ant.f : ""}" ${ant ? "" : "disabled"} aria-label="Clase anterior">←</button>
        <p class="det__fecha">${esc(largo(s.d).replace(/^./, c => c.toUpperCase()))} · ${CAL.horario[0]} a ${CAL.horario[1]} h</p>
        <button class="det__nav" data-ir="${sig ? sig.f : ""}" ${sig ? "" : "disabled"} aria-label="Clase siguiente">→</button>
      </div>
      <p class="det__k"><span>${s.tipo === "entrega" ? "Entrega" : s.tipo === "pre" ? "Pre-entrega" : `Clase ${s.n} de ${plan.ses.length - 1}`}</span><span class="det__fase"><i></i>${esc(fz.t)}</span></p>
      <h3>${esc(c.t)}</h3>
      ${f ? `<p class="det__aviso">${esc(f.t)}: ${esc(f.a)}. Avisar con tiempo a quien viaja desde provincia.</p>` : ""}
      <div class="det__b"><span class="lbl">Traer a clase</span>${c.traer.map(t => `<p>${esc(t)}</p>`).join("")}</div>
      <div class="det__b"><span class="lbl">En clase</span><p>${esc(c.clase)}</p></div>
      <div class="det__b"><span class="lbl">Está listo si…</span>${c.listo.map((t, j) => { const id = s.f + "-" + j; return `<label class="chk"><input type="checkbox" data-k="${id}" ${ch[id] ? "checked" : ""}><span>${esc(t)}</span></label>`; }).join("")}</div>
      ${c.piezas.length ? `<div class="det__b"><span class="lbl">Piezas del TP</span><div class="chips">${c.piezas.map(id => `<span class="chip"><i>${pz(id).n}</i>${esc(pz(id).t)}</span>`).join("")}</div></div>` : ""}
      ${sig ? `<div class="det__prox"><span class="lbl">Para la clase siguiente · ${esc(corto(sig.d))}</span><p>${esc(contenido(sig).t)}</p>${hueco(s, sig) >= 4 ? `<small>Hasta esa clase pasan ${hueco(s, sig)} días: buen momento para adelantar trabajo.</small>` : ""}</div>` : ""}`;
    $$("#detalle [data-ir]").forEach(b => b.addEventListener("click", () => b.dataset.ir && elegir(b.dataset.ir, false)));
    $$("#detalle input[type=checkbox]").forEach(i => i.addEventListener("change", () => { const c2 = checks(); c2[i.dataset.k] = i.checked; store.set("tp4-cal-checks", JSON.stringify(c2)); renderAgenda(); }));
  }
  const hueco = (a, b2) => Math.round((b2.d - a.d) / 864e5);
  function elegir(f, desplazar) {
    sel = f; renderMeses(); renderDetalle();
    $$("#agenda li").forEach(li => li.classList.toggle("sel", li.dataset.f === f));
    if (desplazar && matchMedia("(max-width: 980px)").matches) $("#detalle").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ── Render: clase por clase ───────────────────────────── */
  function renderAgenda() {
    const ch = checks();
    let semana = null, html = "";
    plan.ses.forEach(s => {
      const lunes = new Date(s.d); lunes.setDate(lunes.getDate() - ((lunes.getDay() + 6) % 7));
      const ls = iso(lunes);
      if (ls !== semana) { semana = ls; html += `<li class="ag__sem">Semana del ${lunes.getDate()} de ${MESES[lunes.getMonth()]}</li>`; }
      const c = contenido(s), hechos = c.listo.filter((_, j) => ch[s.f + "-" + j]).length;
      html += `<li class="ag__it ag--${s.tipo}${s.f < hoyIso ? " ag--pasada" : ""}${s.f === hoyIso ? " ag--hoy" : ""}" data-f="${s.f}" style="--c:${faseColor(c.fase)}">
        <button>
          <span class="ag__fecha"><b>${s.d.getDate()}/${s.d.getMonth() + 1}</b>${DIAS_C[s.d.getDay()]}</span>
          <span class="ag__txt"><small>${s.tipo === "entrega" ? "Entrega final" : s.tipo === "pre" ? "Pre-entrega" : "Clase " + s.n}${s.f === hoyIso ? " · hoy" : ""}</small><b>${esc(c.t)}</b><span>${esc(c.traer[0])}</span></span>
          <span class="ag__ok" title="Comprobaciones hechas">${hechos}/${c.listo.length}</span>
        </button></li>`;
    });
    $("#agenda").innerHTML = html;
    $$("#agenda .ag__it button").forEach(b => b.addEventListener("click", () => { elegir(b.parentElement.dataset.f, false); $("#calendario").scrollIntoView({ behavior: "smooth" }); }));
  }

  /* ── Render: piezas en el tiempo ───────────────────────── */
  function renderPiezas() {
    const ses = plan.ses;
    const cab = `<div class="pt__esq">Pieza</div>` + ses.map(s => `<div class="pt__c pt__h${s.tipo === "pre" || s.tipo === "entrega" ? " pt__h--hito" : ""}" title="${esc(largo(s.d))}">${s.d.getDate()}/${s.d.getMonth() + 1}</div>`).join("");
    const filas = PIEZAS.map(p => {
      const celdas = ses.map(s => {
        const c = contenido(s), en = c.piezas.includes(p.id);
        const tipo = s.tipo === "pre" || s.tipo === "entrega" ? "hito" : s.tipo === "ajuste" ? "aj" : "";
        return `<div class="pt__c">${en ? `<i class="pt__dot${tipo ? " pt__dot--" + tipo : ""}" style="--c:${faseColor(c.fase)}" title="${esc(p.t)} · ${esc(corto(s.d))} · ${esc(c.t)}"></i>` : ""}</div>`;
      }).join("");
      return `<div class="pt__n"><small>${p.n}</small>${esc(p.t)}</div>${celdas}`;
    }).join("");
    $("#piezasT").style.setProperty("--cols", ses.length);
    $("#piezasT").innerHTML = cab + filas;
  }

  /* ── Render: feriados ──────────────────────────────────── */
  function renderFeriados() {
    $("#feriados").innerHTML = FERIADOS.map(f => {
      const d = deIso(f.f), dentro = f.f >= cfg.inicio && f.f <= cfg.entrega;
      return `<li class="${f.bloquea ? "" : "fer--aviso"}${dentro ? "" : " fer--fuera"}"><b>${esc(corto(d))}</b><span>${esc(f.t)}</span><small>${esc(f.a)}${f.bloquea ? " · sin clase" : " · hay clase"}</small><a href="${esc(FUENTES_CAL[f.src][1])}" target="_blank" rel="noopener">Fuente ↗</a></li>`;
    }).join("");
  }

  /* ── Ajustes ───────────────────────────────────────────── */
  function renderAjustes() {
    $("#ajDias").innerHTML = [1, 2, 3, 4, 5, 6].map(d => `<label class="tg"><input type="checkbox" value="${d}" ${cfg.dias.includes(d) ? "checked" : ""}><span>${DIAS[d].slice(0, 3)}</span></label>`).join("");
    $("#ajInicio").value = cfg.inicio; $("#ajEntrega").value = cfg.entrega; $("#ajPrevias").value = cfg.previas;
  }
  function leerAjustes() {
    const dias = $$("#ajDias input:checked").map(i => +i.value);
    if (!dias.length) return;
    const ini = $("#ajInicio").value, ent = $("#ajEntrega").value;
    if (!ini || !ent || ini >= ent) return;
    cfg = { inicio: ini, entrega: ent, dias, previas: Math.max(1, Math.min(4, +$("#ajPrevias").value || 2)) };
    store.set("tp4-cal", JSON.stringify({ v: 1, cfg }));
    todo();
  }
  $("#ajustes").addEventListener("change", leerAjustes);
  $("#ajReset").addEventListener("click", () => { cfg = Object.assign({}, CAL); store.set("tp4-cal", ""); renderAjustes(); todo(); });

  /* ── Exportar a calendario (.ics) ──────────────────────── */
  function ics() {
    const pad = n => String(n).padStart(2, "0");
    const utc = (d, hm, extra = 0) => { const [h, m] = hm.split(":").map(Number); const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), h + 3, m)); x.setUTCDate(x.getUTCDate() + extra); return `${x.getUTCFullYear()}${pad(x.getUTCMonth() + 1)}${pad(x.getUTCDate())}T${pad(x.getUTCHours())}${pad(x.getUTCMinutes())}00Z`; };
    const txt = s => String(s).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
    const plegar = l => { const out = []; let s = l; while (s.length > 74) { out.push(s.slice(0, 74)); s = " " + s.slice(74); } out.push(s); return out.join("\r\n"); };
    const now = new Date(), stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;
    const L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Catedra Belluccia//TP4 Calendario//ES", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:TP4 · Diseño Gráfico 3"];
    plan.ses.forEach(s => {
      const c = contenido(s);
      const titulo = s.tipo === "entrega" ? "TP4 · ENTREGA FINAL" : s.tipo === "pre" ? "TP4 · PRE-ENTREGA" : `TP4 · Clase ${s.n}: ${c.t}`;
      const desc = `Traer: ${c.traer.join(" ")}\nEn clase: ${c.clase}\nListo si: ${c.listo.join(" / ")}`;
      L.push("BEGIN:VEVENT", `UID:tp4-${s.f}@belluccia-2026`, `DTSTAMP:${stamp}`, `DTSTART:${utc(s.d, CAL.horario[0])}`, `DTEND:${utc(s.d, CAL.horario[1])}`,
        plegar(`SUMMARY:${txt(titulo)}`), plegar(`DESCRIPTION:${txt(desc)}`), "LOCATION:FADU UBA", "END:VEVENT");
    });
    L.push("END:VCALENDAR");
    const blob = new Blob([L.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "tp4-calendario.ics";
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  $("#btnIcs").addEventListener("click", ics);
  $("#btnPrint").addEventListener("click", () => print());

  /* ── Modo y tema compartidos con las otras páginas ─────── */
  $("#btnModo").addEventListener("click", () => {
    const oscuro = root.dataset.modo ? root.dataset.modo === "oscuro" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.modo = oscuro ? "claro" : "oscuro"; store.set("tp4-modo", root.dataset.modo);
  });

  function todo() {
    plan = planificar();
    if (!sel || !plan.ses.find(s => s.f === sel)) { const p = plan.ses.find(s => s.f >= hoyIso); sel = (p || plan.ses[0]).f; }
    renderResumen(); renderFases(); renderMeses(); renderDetalle(); renderAgenda(); renderPiezas(); renderFeriados();
  }
  renderAjustes(); todo();
  window.__plan = () => plan; /* para pruebas */
})();
