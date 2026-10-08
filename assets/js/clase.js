/* ============================================================
   TP4 · Presentación de clase — motor de slides y demos
   El contenido compartido (temas, piezas, ejemplos) viene de data.js
   ============================================================ */
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
  const reducido = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  $$("[data-cfg]").forEach(e => { e.textContent = CONFIG[e.dataset.cfg] || ""; });

  const deck = $("#deck");
  const slides = $$(".s", deck);
  let i = 0, paso = 0;
  const ENTRA = {}, SALE = {}, ACCION = {};
  const RENDER_TEMA = [];

  /* ── Escala del escenario 1600 × 900 ───────────────────── */
  function ajustar() { deck.style.setProperty("--k", Math.min(innerWidth / 1600, innerHeight / 900)); }
  addEventListener("resize", ajustar); ajustar();

  /* ── Tema activo ───────────────────────────────────────── */
  let tema = TEMAS.find(t => t.id === root.dataset.tema) || TEMAS[0];
  function setTema(id) {
    tema = TEMAS.find(t => t.id === id) || TEMAS[0];
    root.dataset.tema = tema.id; store.set("tp4-tema", tema.id);
    $$("[data-tema-btn]").forEach(b => b.setAttribute("aria-pressed", b.dataset.temaBtn === tema.id));
    RENDER_TEMA.forEach(f => f());
  }

  /* ── Motor: slides y pasos ─────────────────────────────── */
  const pasos = s => $$(".f", s);
  function aplicarPasos(s, p) {
    pasos(s).forEach((f, k) => {
      const on = k < p;
      f.classList.toggle("vis", on);
      f.classList.toggle("pasado", k < p - 1);
      if (f.dataset.accion && ACCION[f.dataset.accion]) ACCION[f.dataset.accion](s, on);
    });
  }
  function mostrar(n, p = 0, dir = 1) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    const vieja = slides[i];
    if (vieja && SALE[vieja.id]) SALE[vieja.id](vieja);
    slides.forEach(s => s.classList.remove("on", "atras"));
    const s = slides[n];
    i = n; paso = p;
    s.classList.add("on"); if (dir < 0) s.classList.add("atras");
    aplicarPasos(s, p);
    if (ENTRA[s.id]) ENTRA[s.id](s);
    actualizar();
  }
  function sig() {
    const s = slides[i], fs = pasos(s);
    if (paso < fs.length) { paso++; aplicarPasos(s, paso); actualizar(); }
    else if (i < slides.length - 1) mostrar(i + 1, 0, 1);
  }
  function ant() {
    const s = slides[i];
    if (paso > 0) { paso--; aplicarPasos(s, paso); actualizar(); }
    else if (i > 0) mostrar(i - 1, pasos(slides[i - 1]).length, -1);
  }
  const pad = n => String(n).padStart(2, "0");
  function actualizar() {
    const s = slides[i], fs = pasos(s);
    const txt = `${pad(i + 1)} / ${pad(slides.length)}`;
    $("#uN").textContent = fs.length ? `${txt} · ${paso}/${fs.length}` : txt;
    $("#pieN").textContent = txt;
    $("#barra").style.width = ((i + 1) / slides.length * 100) + "%";
    deck.classList.toggle("en-divisor", s.hasAttribute("data-div"));
    $("#notasT").textContent = `${pad(i + 1)} · ${s.dataset.t}`;
    $("#notasP").textContent = s.dataset.notas || "Sin notas para esta slide.";
    $$("#indiceGrid button").forEach((b, k) => b.setAttribute("aria-current", k === i));
    history.replaceState(null, "", "#" + (i + 1));
  }

  /* ── Interfaz: botones, índice, notas, ayuda ───────────── */
  $("#uAnt").addEventListener("click", ant);
  $("#uSig").addEventListener("click", sig);
  $("#uTemas").innerHTML = TEMAS.map(t => `<button class="ui__tema c-${t.id}" data-tema-btn="${t.id}" aria-pressed="false" title="${esc(t.nombre)}">${t.n}</button>`).join("");
  $$("#uTemas button").forEach(b => b.addEventListener("click", () => setTema(b.dataset.temaBtn)));
  $("#indiceGrid").innerHTML = slides.map((s, k) =>
    `<button data-i="${k}" class="${s.hasAttribute("data-div") ? "es-div" : ""}"><small>${pad(k + 1)}</small><b>${esc(s.dataset.t)}</b></button>`).join("");
  $$("#indiceGrid button").forEach(b => b.addEventListener("click", () => { cerrarCapas(); mostrar(+b.dataset.i); }));
  const capa = id => { const c = $(id); const abrir = !c.classList.contains("vis"); cerrarCapas(); c.classList.toggle("vis", abrir); };
  function cerrarCapas() { $$(".capa").forEach(c => c.classList.remove("vis")); }
  $$("[data-cerrar]").forEach(b => b.addEventListener("click", cerrarCapas));
  $("#uIdx").addEventListener("click", () => capa("#indice"));
  $("#uAyuda").addEventListener("click", () => capa("#ayuda"));
  const notas = () => $("#notas").classList.toggle("vis");
  $("#uNotas").addEventListener("click", notas);
  function modo() {
    const oscuro = root.dataset.modo ? root.dataset.modo === "oscuro" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.modo = oscuro ? "claro" : "oscuro"; store.set("tp4-modo", root.dataset.modo);
  }
  $("#uModo").addEventListener("click", modo);
  function completa() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
  }
  $("#uFull").addEventListener("click", completa);

  document.addEventListener("keydown", e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const enControl = e.target.matches && e.target.matches("input, textarea, select");
    const enBoton = e.target.matches && e.target.matches("button");
    if (e.key === "Escape") { cerrarCapas(); $("#negro").classList.remove("vis"); return; }
    if (enControl && e.key.startsWith("Arrow")) return;
    if (enBoton && (e.key === " " || e.key === "Enter")) return;
    const k = e.key;
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(k)) { e.preventDefault(); if ($("#negro").classList.contains("vis")) return; sig(); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(k)) { e.preventDefault(); ant(); }
    else if (k === "Home") mostrar(0);
    else if (k === "End") mostrar(slides.length - 1);
    else if (/^[1-4]$/.test(k)) setTema(TEMAS[+k - 1].id);
    else if (k === "i" || k === "I" || k === "o" || k === "O") capa("#indice");
    else if (k === "n" || k === "N") notas();
    else if (k === "f" || k === "F") completa();
    else if (k === "d" || k === "D") modo();
    else if (k === "b" || k === "B" || k === ".") $("#negro").classList.toggle("vis");
    else if (k === "?") capa("#ayuda");
  });
  $("#negro").addEventListener("click", () => $("#negro").classList.remove("vis"));

  let tx = null;
  deck.addEventListener("touchstart", e => { tx = e.target.closest("input, button") ? null : e.touches[0].clientX; }, { passive: true });
  deck.addEventListener("touchend", e => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) (dx < 0 ? sig : ant)(); tx = null; });

  let quieto;
  function despertar() { document.body.classList.remove("quieto"); clearTimeout(quieto); quieto = setTimeout(() => document.body.classList.add("quieto"), 2600); }
  addEventListener("mousemove", despertar); despertar();

  /* ═══════════════ CONTENIDO Y DEMOS ═══════════════ */

  /* Portada: elegir tema */
  $("#portadaTemas").innerHTML = TEMAS.map(t =>
    `<button class="ptema c-${t.id}" data-tema-btn="${t.id}" aria-pressed="false"><small>${t.n}</small><b>${esc(t.nombre)}</b><span>${esc(t.tipo)}</span></button>`).join("");
  $$("#portadaTemas button").forEach(b => b.addEventListener("click", () => setTema(b.dataset.temaBtn)));

  /* La pregunta: doce piezas que se ordenan */
  const CORTOS = ["Marca", "Séxtuple", "Programa A2", "ID animado", "Teaser", "Promo", "Instagram", "Video de espera", "Web", "Overlays", "Merch", "Photo op"];
  $("#doce").innerHTML = CORTOS.map(t => `<div>${t}</div>`).join("");
  ACCION.ordenar = (s, on) => { const d = $("#doce"); d.classList.toggle("orden", on); d.classList.toggle("caos", !on); };

  /* Consigna: las doce piezas */
  $("#piezas12").innerHTML = PIEZAS.map(p => `<div><small>${p.n}</small><b>${esc(p.t)}</b><span>${esc(p.corto)}</span></div>`).join("");

  /* Temas: tarjetas que se abren */
  $("#temas4").innerHTML = TEMAS.map(t => `
    <button class="tcard c-${t.id}" data-id="${t.id}">
      <small>${t.n} · ${esc(t.tipo)}</small>
      <h3>${esc(t.nombre)}</h3>
      <p class="lugar">${esc(t.lugar)}</p>
      <p class="clave">${esc(t.clave)}</p>
      <p class="spons">${t.sponsors.map(s => `<span>${esc(s)}</span>`).join("")}</p>
      <span class="ver">Tocá para ver la clave ↓</span>
    </button>`).join("");
  $$("#temas4 .tcard").forEach(b => b.addEventListener("click", () => { b.classList.toggle("abierta"); setTema(b.dataset.id); }));
  SALE.temas = () => $$("#temas4 .tcard").forEach(b => b.classList.remove("abierta"));

  /* Concepto 01: seis patrones, de a uno */
  $("#patr").innerHTML = PATRONES.map((p, k) => `<div class="f f--der"><i>${k + 1}</i><b>${esc(p.t)}</b><span>${esc(p.d)}</span></div>`).join("");

  /* Concepto 02: cuatro momentos con barra de datos */
  const NDATOS = [2, 6, 4, 1];
  $("#mom4").innerHTML = MOMENTOS.map((m, k) => `
    <div class="mom f">
      <div class="mom__bar">${Array.from({ length: 6 }, (_, j) => `<i class="${j < NDATOS[k] ? "" : "vacio"}"></i>`).join("")}</div>
      <small>${esc(m.cuando)}</small>
      <h3>${esc(m.t)}</h3>
      <p><b>${esc(m.verbo)}.</b> ${esc(m.datos)}</p>
      <div class="pz">${m.piezas.map(id => `<span>${esc(PIEZAS.find(p => p.id === id).t)}</span>`).join("")}</div>
    </div>`).join("");

  /* Concepto 03: un día del programa del tema */
  function renderPrograma() {
    const d = tema.programa[0], esp = tema.espacios;
    $("#pgTitulo").textContent = `${tema.nombre} · ${d.dia}: ${d.lema} · ejemplo inventado`;
    const horas = [...new Set(d.acts.map(a => a[0]))].sort().slice(0, 6);
    $("#pg").innerHTML = `<div></div>` + esp.map(e => `<div class="pg__h"><b>${esc(e.n)}</b><span>${esc(e.d)}</span></div>`).join("") +
      horas.map(h => { const fila = d.acts.filter(a => a[0] === h);
        return `<div class="pg__t">${h}${fila.length > 1 ? `<i>${fila.length} a la vez</i>` : ""}</div>` +
          esp.map((e, k) => { const a = fila.find(x => x[1] === k); return a ? `<div class="pg__c"><div><b>${esc(a[2])}</b><span>${esc(a[3])}</span></div></div>` : `<div class="pg__c pg__vacio"></div>`; }).join("");
      }).join("");
  }
  RENDER_TEMA.push(renderPrograma);

  /* Lienzo de formato (mismo esquema que la presentación web) */
  function lienzo(el, fmt, extra = "") {
    el.dataset.fmt = fmt; el.className = "lienzo " + extra;
    el.innerHTML = `<div class="lz">
      <div class="l-img"><span>IMAGEN</span></div>
      <div class="l-marca">${esc(tema.nombre)}</div>
      <div class="l-titular">Una idea, en pocas palabras</div>
      <div class="l-fecha">${esc(CONFIG.fechasCorta)}</div>
      <div class="l-lugar">${esc(tema.lugar)}</div>
      <div class="l-precio">Entrada accesible</div>
      <div class="l-cta">Anotate →</div>
      <div class="l-sponsors">${tema.sponsors.map(s => `<span>${esc(s)}</span>`).join("")}</div>
    </div>`;
  }

  /* Concepto 04: el mismo contenido cambia de formato solo */
  const FMT = [["sextuple", "Séxtuple · 4,31 × 2,15 m"], ["mupi", "Mupi · vertical"], ["a2", "Programa A2"], ["story", "Video vertical · 9:16"], ["post", "Posteo · 4:5"], ["overlay", "Overlay · 16:9"], ["valla", "Valla · 4:1"], ["avatar", "Avatar · 1:1"]];
  let fmtI = 0, fmtTimer = null, fmtPlay = true;
  const morph = $("#morph");
  $("#morphSeg").innerHTML = FMT.map(([id, t], k) => `<button data-k="${k}" aria-pressed="${k === 0}">${t.split(" · ")[0]}</button>`).join("");
  function ponerFmt(k) {
    fmtI = k; const [id, t] = FMT[k];
    morph.dataset.fmt = id; morph.className = "lienzo";
    morph.style.setProperty("--h", id === "valla" ? "190px" : id === "avatar" ? "330px" : "400px");
    $("#morphCap").textContent = t;
    $$("#morphSeg button").forEach(b => b.setAttribute("aria-pressed", +b.dataset.k === k));
  }
  function playFmt(on) {
    fmtPlay = on; clearInterval(fmtTimer);
    $("#morphPlay").textContent = on ? "❚❚ Pausa" : "▶ Recorrer"; $("#morphPlay").setAttribute("aria-pressed", on);
    if (on && !reducido()) fmtTimer = setInterval(() => ponerFmt((fmtI + 1) % FMT.length), 2400);
  }
  $("#morphPlay").addEventListener("click", () => playFmt(!fmtPlay));
  $$("#morphSeg button").forEach(b => b.addEventListener("click", () => { playFmt(false); ponerFmt(+b.dataset.k); }));
  ENTRA.c04 = () => { ponerFmt(fmtI); playFmt(!reducido()); };
  SALE.c04 = () => clearInterval(fmtTimer);
  RENDER_TEMA.push(() => { lienzo(morph, FMT[fmtI][0]); ponerFmt(fmtI); });

  /* Concepto 05: tres piezas, romper el sistema */
  const TRES = [["story", "Video vertical"], ["post", "Posteo"], ["mupi", "Mupi"]];
  const RT = { story: .5625, post: .8, mupi: .686 };
  $("#tres").innerHTML = TRES.map(([f, t], k) => `<div style="width:${Math.round(380 * RT[f])}px;flex:none"><div class="lienzo" id="tres${k}" style="--h:380px"></div><p class="etq">${t}</p></div>`).join("");
  let roto = false;
  function renderTres() { TRES.forEach(([f], k) => lienzo($("#tres" + k), f, roto ? ["roto", "roto2", "roto3"][k] : "")); $$("#tres .lienzo").forEach(l => l.style.setProperty("--h", "380px")); }
  $("#romper").addEventListener("click", () => {
    roto = !roto; $("#romper").setAttribute("aria-pressed", roto);
    $("#romper").textContent = roto ? "Volver al sistema" : "Romper el sistema";
    TRES.forEach((_, k) => { const l = $("#tres" + k); l.classList.toggle(["roto", "roto2", "roto3"][k], roto); });
  });
  RENDER_TEMA.push(renderTres);

  /* Concepto 06: la marca a escala */
  function usoMarca(v) {
    if (v < 24) return "Favicon: solo sobrevive la versión reducida";
    if (v < 80) return "Sticker o ícono: la principal ya no se lee";
    if (v <= 140) return "Avatar de Instagram (se ve a 110 px)";
    if (v <= 260) return "Credencial, merchandising, firma de video";
    if (v <= 360) return "Afiche y programa";
    return "Séxtuple y photo opportunity (metros)";
  }
  function renderMarca() {
    const v = +$("#mkRango").value, nombre = tema.nombre;
    const mk = $("#mkP"); mk.textContent = nombre;
    mk.style.fontSize = (v / (nombre.length * 0.43 + 0.9)) + "px";
    const r = $("#mkR"); r.style.width = r.style.height = Math.max(8, v * 0.62) + "px";
    $("#mkUso").textContent = `${v} px · ${usoMarca(v)}`;
  }
  $("#mkRango").addEventListener("input", renderMarca);
  RENDER_TEMA.push(renderMarca);

  /* Concepto 07: test de 3 segundos */
  let t3sV = "mal", t3sTimers = [];
  function afiche(el, mal) {
    el.className = "afi" + (mal ? " afi--mal" : "") + (el.classList.contains("oculto") ? " oculto" : "");
    el.innerHTML = `<div class="afi__img"></div>
      <div class="afi__marca">${esc(tema.nombre)}</div>
      <div class="afi__tit">${esc(tema.tipo)}</div>
      <div class="afi__fecha">${esc(CONFIG.fechasCorta)}</div>
      <div class="afi__chico">${esc(tema.lugar)} · Entrada accesible · Inscripción en evento.com.ar · ${tema.sponsors.map(esc).join(" · ")}</div>`;
  }
  function limpiar3s() { t3sTimers.forEach(clearTimeout); t3sTimers = []; $("#t3sCuenta").classList.remove("vis"); $("#t3sPreg").classList.remove("vis"); }
  function render3s(ocultar = true) {
    limpiar3s(); const a = $("#t3sAfi"); a.classList.toggle("oculto", ocultar); afiche(a, t3sV === "mal");
    $("#t3sPreg").textContent = ""; $$("#t3sVar button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === t3sV));
  }
  $$("#t3sVar button").forEach(b => b.addEventListener("click", () => { t3sV = b.dataset.v; render3s(); }));
  $("#t3sGo").addEventListener("click", () => {
    render3s(true);
    const cuenta = $("#t3sCuenta"), a = $("#t3sAfi");
    [3, 2, 1].forEach((n, k) => t3sTimers.push(setTimeout(() => { cuenta.textContent = n; cuenta.classList.add("vis"); }, k * 650)));
    t3sTimers.push(setTimeout(() => { cuenta.classList.remove("vis"); a.classList.remove("oculto"); }, 1950));
    t3sTimers.push(setTimeout(() => { a.classList.add("oculto"); const p = $("#t3sPreg"); p.textContent = "¿Cómo se llamaba? ¿Cuándo es?"; p.classList.add("vis"); }, 4950));
  });
  $("#t3sVer").addEventListener("click", () => { limpiar3s(); $("#t3sAfi").classList.remove("oculto"); });
  SALE.c07 = () => render3s(true);
  RENDER_TEMA.push(() => render3s(true));

  /* Concepto 08: sacar datos y ver la consecuencia */
  const CONSEC = {
    que: "Sin el qué, la pieza es decoración: nadie sabe qué se anuncia.",
    cuando: "Sin fecha, nadie puede agendarlo.",
    donde: "Sin lugar, el interés no se convierte en visita.",
    cuanto: "Sin precio, el público supone lo peor y no va.",
    como: "Sin el cómo, el interés se pierde en el camino: no hay a dónde ir.",
    quien: "Sin organizador ni sponsors, el evento pierde respaldo y los sponsors, su razón para estar."
  };
  const datOn = { que: true, cuando: true, donde: true, cuanto: true, como: true, quien: true };
  function renderDatos(ultimo) {
    const a = $("#datAfi");
    a.innerHTML = `<div class="afi__img" data-dato="que"></div>
      <div class="afi__marca" data-dato="que">${esc(tema.nombre)}</div>
      <div class="afi__tit" data-dato="que">${esc(tema.tipo)}</div>
      <div class="afi__fecha" data-dato="cuando">${esc(CONFIG.fechas)}</div>
      <div class="afi__tit" data-dato="donde" style="font-size:19px">${esc(tema.lugar)}</div>
      <div class="afi__tit" data-dato="cuanto" style="font-size:17px;font-weight:500">Entrada accesible · preventa</div>
      <div class="afi__tit" data-dato="como" style="font-size:17px">Anotate en evento.com.ar →</div>
      <div class="afi__chico" data-dato="quien">${tema.sponsors.map(esc).join(" · ")}</div>`;
    $$("[data-dato]", a).forEach(e => e.classList.toggle("sin", !datOn[e.dataset.dato]));
    $$("#datChips button").forEach(b => b.setAttribute("aria-pressed", datOn[b.dataset.d]));
    const faltan = Object.keys(datOn).filter(k => !datOn[k]);
    const m = $("#datMsg");
    m.classList.toggle("ok", !faltan.length);
    m.textContent = !faltan.length ? "Con los seis datos, la pieza convierte interés en asistencia." : CONSEC[ultimo && !datOn[ultimo] ? ultimo : faltan[faltan.length - 1]];
  }
  $("#datChips").innerHTML = DATOS.map(d => `<button data-d="${d.id}" aria-pressed="true">${esc(d.t)}<span>tocá para sacarlo</span></button>`).join("");
  $$("#datChips button").forEach(b => b.addEventListener("click", () => { datOn[b.dataset.d] = !datOn[b.dataset.d]; renderDatos(b.dataset.d); }));
  RENDER_TEMA.push(() => renderDatos());

  /* Concepto 09: armar el llamado a la acción */
  const CTA = [["Anotate", "Un verbo, en imperativo"], ["gratis", "Qué gano o cuánto cuesta"], ["hasta el 10/11", "Por qué ahora"], ["en evento.com.ar", "Un solo destino, o un QR"]];
  const ctaOn = [false, false, false, false];
  const CTA_T = ["«Más info» no dice qué hacer ni por qué hacerlo.", "Hay una acción, pero nada empuja a hacerla.", "Mejor: ya hay acción y algo para ganar.", "Casi: falta decir a dónde ir.", "Completo: qué hacer, qué gano, por qué ahora y dónde."];
  $("#ctaPartes").innerHTML = CTA.map(([b, s], k) => `<button data-k="${k}" aria-pressed="false"><b>${b}</b><span>${s}</span></button>`).join("");
  function renderCta() {
    const n = ctaOn.filter(Boolean).length;
    $("#ctaBtn").innerHTML = n ? CTA.map(([b], k) => ctaOn[k] ? `<span>${b}</span>` : "").join("") : `<span class="vacio">Más info</span>`;
    $$("#ctaPartes button").forEach((b, k) => b.setAttribute("aria-pressed", ctaOn[k]));
    $$("#ctaMed i").forEach((x, k) => x.classList.toggle("on", k < n));
    $("#ctaTxt").textContent = CTA_T[n];
  }
  $$("#ctaPartes button").forEach(b => b.addEventListener("click", () => { ctaOn[+b.dataset.k] = !ctaOn[+b.dataset.k]; renderCta(); }));
  renderCta();

  /* Concepto 10: teaser y promocional con cabezal */
  const LT = {
    teaser: { t: "Teaser", total: 20, beats: [["Gancho", 2], ["Clima y pistas", 12], ["Nombre y fecha", 3], ["ID", 3]] },
    promo: { t: "Promocional", total: 60, beats: [["Gancho", 3], ["Qué es", 9], ["Qué hay", 28], ["Datos", 12], ["CTA", 5], ["ID", 3]] }
  };
  [["#ltTeaser", "teaser"], ["#ltPromo", "promo"]].forEach(([sel, k]) => {
    const L = LT[k];
    $(sel).innerHTML = `<div class="lt__head"><b>${L.t}</b><span>${L.total === 20 ? "15 a 20 s" : "45 a 60 s"} · cierra con el ID</span></div>
      <div class="lt__barra">${L.beats.map(([n, s]) => `<div style="flex:${s}" title="${n}">${s >= 5 ? n : ""}</div>`).join("")}<i class="lt__cab"></i></div>`;
  });
  let ltT = 0, ltRaf = null, ltUlt = 0;
  const VEL = 4; /* 1 segundo real = 4 segundos de video */
  function pintarLt() {
    let txt = [];
    [["#ltTeaser", "teaser"], ["#ltPromo", "promo"]].forEach(([sel, k]) => {
      const L = LT[k], t = Math.min(ltT, L.total);
      $(sel + " .lt__cab").style.left = (t / L.total * 100) + "%";
      let acc = 0, act = 0;
      L.beats.forEach(([, s], j) => { if (t >= acc) act = j; acc += s; });
      $$(sel + " .lt__barra div").forEach((d, j) => d.classList.toggle("act", ltT > 0 && j === act && t < L.total));
      txt.push(`${L.t}: <b>${t >= L.total ? "terminó" : esc(L.beats[act][0])}</b>`);
    });
    $("#ltAhora").innerHTML = `${Math.floor(ltT)} s · ` + txt.join(" · ");
  }
  function cuadroLt(ts) {
    if (ltUlt) ltT += (ts - ltUlt) / 1000 * VEL; ltUlt = ts;
    if (ltT >= 60) { ltT = 60; pausaLt(); pintarLt(); return; }
    pintarLt(); ltRaf = requestAnimationFrame(cuadroLt);
  }
  function pausaLt() { cancelAnimationFrame(ltRaf); ltRaf = null; ltUlt = 0; $("#ltPlay").textContent = "▶ Reproducir"; }
  $("#ltPlay").addEventListener("click", () => {
    if (ltRaf) return pausaLt();
    if (ltT >= 60) ltT = 0;
    $("#ltPlay").textContent = "❚❚ Pausa"; ltRaf = requestAnimationFrame(cuadroLt);
  });
  $("#ltReset").addEventListener("click", () => { pausaLt(); ltT = 0; pintarLt(); });
  SALE.c10 = pausaLt;
  pintarLt();

  /* Concepto 11: duraciones y un ID animado */
  const DUR = [["ID animado", 5, 5, "hasta 5 s"], ["Video de espera", 5, 10, "5 a 10 s"], ["Teaser", 15, 20, "15 a 20 s"], ["Promocional", 45, 60, "45 a 60 s"]];
  $("#dur").innerHTML = DUR.map(([t, a, b, l]) => `<div class="dur__fila"><b>${t}</b><div class="dur__pista"><div class="dur__max" data-w="${b / 60 * 100}"></div><div class="dur__min" data-w="${a / 60 * 100}"></div></div><span>${l}</span></div>`).join("") +
    `<div class="dur__eje"><span></span><div><span>0</span><span>15</span><span>30</span><span>45</span><span>60 s</span></div><span></span></div>`;
  ENTRA.c11 = () => {
    $$("#dur [data-w]").forEach(e => { e.style.width = "0"; });
    requestAnimationFrame(() => requestAnimationFrame(() => $$("#dur [data-w]").forEach(e => { e.style.width = e.dataset.w + "%"; })));
    const id = $("#idanim"); id.classList.remove("corre"); void id.offsetWidth; id.classList.add("corre");
  };
  SALE.c11 = () => $("#idanim").classList.remove("corre");
  RENDER_TEMA.push(() => { $("#idW").textContent = tema.nombre; });

  /* Concepto 12: escala real, objeto por objeto */
  (function escala() {
    const S = 38, G = 205, W = 1392, H = 262;
    let g = "";
    for (let y = G; y >= G - 4.7 * S; y -= S) g += `<line class="e-grid" x1="0" x2="${W}" y1="${y}" y2="${y}"/>`;
    for (let x = 0; x <= W; x += S) g += `<line class="e-grid" x1="${x}" x2="${x}" y1="${G - 4.7 * S}" y2="${G}"/>`;
    const lbl = (x, t, s) => `<text class="e-lbl" x="${x}" y="${G + 28}">${t}</text><text class="e-sub" x="${x}" y="${G + 48}">${s}</text>`;
    const grupo = inner => `<g class="f f--crece">${inner}</g>`;
    let x = 10;
    const persona = px => `<g class="e-ink"><circle cx="${px + 10}" cy="${G - 1.7 * S + 8}" r="8"/><path d="M${px} ${G}v-${1.7 * S - 22}q0-9 10-9t10 9v${1.7 * S - 22}z"/></g>`;
    g += grupo(persona(x) + `<rect class="e-obj" x="${x + 34}" y="${G - 1.5 * S}" width="${0.42 * S}" height="${0.594 * S}"/>` + lbl(x, "Persona con un A2", "1,70 m · 42 × 59 cm"));
    x = 230; const sw = 4.31 * S, sh = 2.15 * S, sy = G - 0.9 * S - sh;
    g += grupo(`<path class="e-obj" d="M${x + 16} ${sy + sh}V${G}M${x + sw - 16} ${sy + sh}V${G}"/><rect class="e-obj" x="${x}" y="${sy}" width="${sw}" height="${sh}"/><circle class="e-acc" cx="${x + 36}" cy="${sy + sh / 2}" r="24"/>` + lbl(x, "Séxtuple", "4,31 × 2,15 m"));
    x = 430; const vw = 8.62 * S, vy = G - 2.2 * S - sh;
    g += grupo(`<path class="e-obj" d="M${x + 40} ${vy + sh}V${G}M${x + vw - 40} ${vy + sh}V${G}"/><rect class="e-obj" x="${x}" y="${vy}" width="${vw}" height="${sh}"/><circle class="e-acc" cx="${x + 40}" cy="${vy + sh / 2}" r="26"/><circle class="e-acc" cx="${x + 96}" cy="${vy + sh / 2}" r="26" opacity=".5"/>` + lbl(x, "Valla", "8,62 × 2,15 m"));
    x = 800; const pw = 4 * S;
    g += grupo(`<rect class="e-obj" x="${x}" y="${G - pw}" width="${pw}" height="${pw}"/><circle class="e-acc" cx="${x + pw / 2}" cy="${G - pw + 44}" r="34"/>` + persona(x + 46) + persona(x + 84) + lbl(x, "Photo opportunity", "4 × 4 m"));
    x = 980; const bw = Math.min(12 * S, W - x - 4), bh = 3 * S;
    g += grupo(`<rect class="e-obj" x="${x}" y="${G - bh}" width="${bw}" height="${bh - 12}" rx="12"/><rect class="e-acc" x="${x + 14}" y="${G - bh + 12}" width="${bw - 28}" height="42" rx="3"/><g class="e-ink"><circle cx="${x + 70}" cy="${G - 12}" r="12"/><circle cx="${x + bw - 80}" cy="${G - 12}" r="12"/></g>` + lbl(x, "Colectivo con full glass", "aprox. 12 m de largo"));
    g += `<line class="e-ground" x1="0" x2="${W}" y1="${G}" y2="${G}"/>`;
    $("#esc").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Comparación de tamaños reales a escala">${g}</svg>`;
  })();

  /* Concepto 13: cuatro medios */
  const FORMA = { sextuple: [2, 64], mupi: [0.686, 86], valla: [4, 42], bus: [4.6, 36] };
  $("#calle4").innerHTML = CALLE.map(c => { const [r, h] = FORMA[c.id];
    return `<div class="medio f" style="--r:${r};--hh:${h}px">
      <div class="medio__forma"><i></i></div>
      <h3>${esc(c.t)}</h3>
      <p class="mono">${esc(c.medida)} · ${esc(c.prop)}</p>
      <dl><dt>Lo ve</dt><dd>${esc(c.quien)}</dd><dt>Tiempo</dt><dd>${esc(c.tiempo)}</dd></dl>
      <p class="exige">${esc(c.prueba)}</p>
    </div>`; }).join("");

  /* Concepto 14: grilla de Instagram */
  const IG = ["Line up", "Día 1", "Expositor", "Taller", "", "Entradas", "Faltan 5 días", "Charla", "Mapa"];
  function renderIg() {
    $("#ig").innerHTML = `<div class="ig__tel"><div class="ig__perfil"><span class="ig__av"></span><div><b>${esc(tema.nombre.toLowerCase().replace(/\s+/g, ""))}</b><span>${esc(CONFIG.fechas)}</span></div></div>
      <div class="ig__grid">${IG.map(t => `<div>${t || esc(tema.nombre)}</div>`).join("")}</div></div>
      <p class="p" style="font-size:20px">Fijadas arriba, una por actividad. Misma tipografía, misma paleta y una alternancia que se repite.</p>`;
  }
  $("#igBtn").addEventListener("click", () => {
    const ig = $("#ig"), on = !ig.classList.contains("sis");
    ig.classList.toggle("sis", on); ig.classList.toggle("caos", !on);
    $("#igBtn").setAttribute("aria-pressed", on); $("#igBtn").textContent = on ? "Volver a posteos sueltos" : "Aplicar el sistema";
  });
  RENDER_TEMA.push(renderIg);

  /* Concepto 15: el encuadre del celular */
  function renderFoto() {
    $("#fotoNombre").textContent = tema.nombre;
    const muro = $("#fotoMuro"), cam = $("#fotoCam"), marca = $("#fotoMarca");
    const v = +$("#fotoRango").value, libre = muro.offsetWidth - cam.offsetWidth;
    const left = libre * v / 100; cam.style.left = left + "px";
    const mL = marca.offsetLeft - marca.offsetWidth / 2, mR = mL + marca.offsetWidth;
    const dentro = left <= mL + 4 && left + cam.offsetWidth >= mR - 4;
    const est = $("#fotoEstado"); est.classList.toggle("mal", !dentro);
    $("span", est).textContent = dentro ? "La marca entra en la foto" : "La marca queda afuera: la foto circula sin el nombre";
  }
  $("#fotoRango").addEventListener("input", renderFoto);
  ENTRA.c15 = () => requestAnimationFrame(renderFoto);
  RENDER_TEMA.push(renderFoto);

  /* Concepto 16: sponsors */
  function renderSpo() { $("#spoEv").textContent = tema.nombre; $("#spoFr").innerHTML = tema.sponsors.map(s => `<span>${esc(s)}</span>`).join(""); }
  $("#spoBtn").addEventListener("click", () => {
    const s = $("#spo"), on = !s.classList.contains("caos");
    s.classList.toggle("caos", on); $("#spoBtn").setAttribute("aria-pressed", on); $("#spoBtn").textContent = on ? "Con franja" : "Sin reglas";
  });
  RENDER_TEMA.push(renderSpo);

  /* Ejemplos resueltos */
  let ejI = 0;
  function renderEj() {
    const e = EJEMPLOS[ejI], box = $("#ejImg");
    $("img", box) && $("img", box).remove();
    box.insertAdjacentHTML("afterbegin", `<img src="assets/img/ejemplos/${e.img}.webp" alt="${esc(e.proyecto)}: ${esc(e.muestra)}" width="${e.w}" height="${e.h}">`);
    $("#ejN").textContent = `${ejI + 1} / ${EJEMPLOS.length}`;
    $("#ejInfo").innerHTML = `<span class="tag">${esc(e.tag)}</span><h3>${esc(e.proyecto)}</h3><p class="ev">${esc(e.evento)}</p>
      <p class="m">${esc(e.muestra)}</p><div class="mirar"><b>Qué mirar.</b> ${esc(e.mirar)}</div>
      <div class="ej__dots">${EJEMPLOS.map((x, k) => `<button data-k="${k}" aria-current="${k === ejI}" aria-label="${esc(x.proyecto)}"></button>`).join("")}</div>
      <p class="cred">${e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.autor || e.proyecto)} en Behance ↗</a>` : `${e.autor ? esc(e.autor) + " · " : ""}Proyecto publicado en Behance`}</p>`;
    $$("#ejInfo .ej__dots button").forEach(b => b.addEventListener("click", () => { ejI = +b.dataset.k; renderEj(); }));
  }
  $("#ejA").addEventListener("click", () => { ejI = (ejI - 1 + EJEMPLOS.length) % EJEMPLOS.length; renderEj(); });
  $("#ejS").addEventListener("click", () => { ejI = (ejI + 1) % EJEMPLOS.length; renderEj(); });
  renderEj();

  /* Referentes del tema */
  function renderRefs() {
    $("#refT").textContent = `Quién ya lo hizo en Argentina · ${tema.nombre}`;
    $("#refs3").innerHTML = tema.referentes.slice(0, 3).map(r => `
      <div class="rf f">
        <div class="rf__h"><h3>${esc(r.n)}</h3><p>${esc(r.d)}</p></div>
        <div class="rf__k">${r.k.map(([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("")}</div>
        <p class="rf__m"><em>Qué mirar</em>${esc(r.mirar)}</p>
      </div>`).join("");
    if (slides[i] && slides[i].id === "referentes") aplicarPasos(slides[i], paso);
  }
  RENDER_TEMA.push(renderRefs);

  /* Clichés */
  $("#cli4").innerHTML = TEMAS.map(t => `
    <div class="cli f c-${t.id}">
      <h3>${esc(t.nombre)}</h3>
      <span class="no">Cliché</span>
      <p>${esc(t.cliche)}</p>
      <p class="si">Mejor preguntarse: ${esc(t.preguntas[0])}</p>
    </div>`).join("");

  /* Pautas */
  $("#pau").innerHTML = PAUTAS.map((p, k) => `<div class="f"><i>Pauta ${k + 1}</i><b>${esc(p.t)}</b><p>${esc(p.d)}</p><ul>${p.checks.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>`).join("");

  /* ── Arranque ──────────────────────────────────────────── */
  setTema(tema.id);
  const desdeHash = () => { const h = parseInt(location.hash.slice(1), 10); return Number.isFinite(h) ? h - 1 : 0; };
  addEventListener("hashchange", () => { const n = desdeHash(); if (n !== i) mostrar(n); });
  mostrar(desdeHash());
})();
