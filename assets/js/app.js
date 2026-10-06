/* ============================================================
   TP4 · Sistema gráfico para eventos — comportamiento
   El contenido está en data.js. Acá solo se dibuja y se navega.
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ── Fuentes numeradas ─────────────────────────────────── */
  const fKeys = Object.keys(FUENTES);
  const fnum = id => {
    const f = FUENTES[id]; if (!f) return "";
    const n = fKeys.indexOf(id) + 1;
    return `<a class="fnum" href="${esc(f.u)}" target="_blank" rel="noopener" title="${esc(f.t)}" aria-label="Fuente ${n}: ${esc(f.t)}">${n}</a>`;
  };
  const fnums = ids => (ids || []).map(fnum).join("");

  /* ── Configuración en el HTML ──────────────────────────── */
  $$("[data-cfg]").forEach(e => { e.textContent = CONFIG[e.dataset.cfg] || ""; });
  $$("a[data-f]").forEach(a => {
    const f = FUENTES[a.dataset.f]; if (!f) return;
    a.href = f.u; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Ver fuente ↗";
  });

  /* ── Tema activo ───────────────────────────────────────── */
  let tema = TEMAS[0];
  const qTema = new URLSearchParams(location.search).get("tema");
  const tInit = qTema || root.dataset.tema;
  tema = TEMAS.find(t => t.id === tInit) || TEMAS[0];

  $("#temas").innerHTML = TEMAS.map(t =>
    `<button class="tema-btn c-${t.id}" role="radio" data-id="${t.id}" aria-checked="false" title="${esc(t.nombre)} · ${esc(t.tipo)}"><i>${t.n}</i><span>${esc(t.nombre)}</span></button>`).join("");
  $("#portadaTemas").innerHTML = TEMAS.map(t =>
    `<button class="pt c-${t.id}" data-id="${t.id}" aria-pressed="false"><small>${t.n}</small><b>${esc(t.nombre)}</b><span>${esc(t.tipo)}</span></button>`).join("");
  $$("[data-id]", $("#temas")).concat($$("[data-id]", $("#portadaTemas"))).forEach(b =>
    b.addEventListener("click", () => setTema(b.dataset.id)));

  function setTema(id) {
    tema = TEMAS.find(t => t.id === id) || TEMAS[0];
    root.dataset.tema = tema.id; store.set("tp4-tema", tema.id);
    $$(".tema-btn").forEach(b => b.setAttribute("aria-checked", b.dataset.id === tema.id));
    $$(".pt").forEach(b => b.setAttribute("aria-pressed", b.dataset.id === tema.id));
    $$("[data-bind]").forEach(e => { const v = tema[e.dataset.bind] || ""; e.textContent = e.dataset.bind === "tipo" ? v.toLowerCase() : v; });
    renderTema(); renderRefs(); renderDemoTexto(); renderSponsors();
  }

  /* ── 03 Patrones y escala ──────────────────────────────── */
  $("#patrones").innerHTML = PATRONES.map(p =>
    `<article class="patron"><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p><p class="ev">${esc(p.ev)} ${fnums(p.f)}</p></article>`).join("");
  $("#escalaRef").innerHTML = ESCALA_REF.map(([v, u, d, f]) =>
    `<a class="stat" href="${esc(FUENTES[f].u)}" target="_blank" rel="noopener" title="${esc(FUENTES[f].t)}"><b>${esc(v)}</b><span>${esc(u)}</span><small>${esc(d)}</small></a>`).join("");

  /* ── 04 Momentos ───────────────────────────────────────── */
  const pz = id => PIEZAS.find(p => p.id === id);
  $("#momentosTabs").innerHTML = MOMENTOS.map((m, i) =>
    `<button class="mom" role="tab" data-i="${i}" aria-selected="${i === 1}"><i>${i + 1}</i><small>${esc(m.cuando)}</small><b>${esc(m.t)}</b></button>`).join("");
  function renderMomento(i) {
    const m = MOMENTOS[i];
    $$(".mom").forEach((b, j) => b.setAttribute("aria-selected", j === i));
    $("#momentoPanel").innerHTML =
      `<div><p class="lbl">${esc(m.cuando)} · verbo</p><h3>${esc(m.verbo)}</h3><p>${esc(m.d)}</p>
        <div class="dato"><small>Cuánta información</small>${esc(m.datos)}</div></div>
       <div><p class="lbl" style="margin-bottom:10px">Piezas del TP que trabajan acá</p>
        <div class="chips">${m.piezas.map(id => { const p = pz(id); return `<a class="chip" href="#piezas" data-pieza="${id}"><i>${p.n}</i>${esc(p.t)}</a>`; }).join("")}</div></div>`;
    $$("[data-pieza]", $("#momentoPanel")).forEach(a => a.addEventListener("click", () => renderPieza(a.dataset.pieza)));
  }
  $$(".mom").forEach(b => b.addEventListener("click", () => renderMomento(+b.dataset.i)));
  renderMomento(1);

  /* ── 05 Ficha del tema ─────────────────────────────────── */
  const li = a => a.map(x => `<li>${esc(x)}</li>`).join("");
  function renderTema() {
    $("#temaTitulo").textContent = `${tema.nombre}: ${tema.tipo.toLowerCase()}`;
    $("#temaTldr").innerHTML = `<b>TL;DR</b> ${esc(tema.brief)}`;
    $("#temaFicha").innerHTML = `
      <div class="fbox fbox--lead">
        <p class="lbl">La clave de este tema</p>
        <p class="big">${esc(tema.clave)}</p>
      </div>
      <div class="fbox fbox--wide">
        <p class="lbl">Datos de la consigna ${fnum("tp")}</p>
        <dl class="meta">
          <dt>Lugar</dt><dd>${esc(tema.lugar)}</dd>
          <dt>Fecha</dt><dd>${esc(CONFIG.fechas)}</dd>
          <dt>Desafío</dt><dd>${esc(tema.desafio)}</dd>
          <dt>Sponsors</dt><dd><span class="tags">${tema.sponsors.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</span></dd>
        </dl>
      </div>
      <div class="fbox"><p class="lbl">Qué espera el público</p><ul class="lista">${li(tema.espera)}</ul></div>
      <div class="fbox"><p class="lbl">Cómo se suele mostrar</p><ul class="lista">${li(tema.codigos)}</ul></div>
      <div class="fbox">
        <div class="cliche"><span class="lbl">Cliché a evitar</span>${esc(tema.cliche)}</div>
        <p class="lbl">Dos preguntas para arrancar</p>
        ${tema.preguntas.map(q => `<p class="preg">${esc(q)}</p>`).join("")}
      </div>`;
  }

  /* ── 06 Referentes ─────────────────────────────────────── */
  function renderRefs() {
    $("#refTitulo").textContent = `Quién ya hizo algo así en Argentina`;
    $("#refs").innerHTML = tema.referentes.map(r => `
      <article class="ref">
        <div class="ref__head"><h3>${esc(r.n)}</h3><p>${esc(r.d)}</p></div>
        <div class="ref__k">${r.k.map(([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("")}</div>
        <div class="ref__mirar"><span class="lbl">Qué mirar</span>${esc(r.mirar)}</div>
        <div class="ref__f">${r.f.map(id => `<a href="${esc(FUENTES[id].u)}" target="_blank" rel="noopener">${esc(FUENTES[id].t.split(" — ")[0])} ↗</a>`).join("")}</div>
      </article>`).join("");
  }

  /* ── 07 Sistemas completos ─────────────────────────────── */
  $("#sistemasGrid").innerHTML = SISTEMAS.map(s => `
    <article class="sis">
      <h3>${esc(s.n)}</h3><p class="sisub">${esc(s.sub)}</p>
      <ul class="lista">${li(s.puntos)}</ul>
      <p class="lec"><small>Lo que enseña</small>${esc(s.leccion)}</p>
      <p class="nota">Fuentes ${fnums(s.f)}</p>
    </article>`).join("");

  /* ── 08 Demo de formatos ───────────────────────────────── */
  const FORMATOS = [
    { id: "sextuple", t: "Séxtuple", s: "2:1 · vía pública", nota: "Se lee en segundos y en movimiento: una imagen, un titular, fecha y lugar. El precio y el botón no entran.", cap: "4,31 × 2,15 m aprox." },
    { id: "a2", t: "Programa A2", s: "1:√2 · en mano", nota: "Hay tiempo y cercanía: entran todos los datos. Acá manda el orden, no el impacto.", cap: "420 × 594 mm" },
    { id: "story", t: "Video vertical", s: "9:16 · celular", nota: "Arriba y abajo hay zonas que tapa la interfaz. Lo importante va al centro.", cap: "750 × 1334 px" },
    { id: "post", t: "Posteo", s: "4:5 · feed", nota: "Un posteo, una actividad. Los sponsors y el precio van al texto del posteo, no a la imagen.", cap: "1080 × 1350 px" },
    { id: "overlay", t: "Overlay", s: "16:9 · streaming", nota: "El video es el protagonista. La gráfica se corre a los bordes y deja el centro libre.", cap: "1920 × 1080 px" },
    { id: "avatar", t: "Avatar", s: "1:1 · circular", nota: "Solo la marca, en su versión reducida. Todo lo demás desaparece.", cap: "320 × 320 px · se ve a 110 px" }
  ];
  const lienzo = $("#lienzo");
  $("#demoFormatos").innerHTML = FORMATOS.map(f =>
    `<button role="radio" data-fmt="${f.id}" aria-checked="${f.id === "sextuple"}">${esc(f.t)}<small>${esc(f.s)}</small></button>`).join("");
  function setFormato(id) {
    const f = FORMATOS.find(x => x.id === id);
    lienzo.dataset.fmt = id;
    $$("#demoFormatos button").forEach(b => b.setAttribute("aria-checked", b.dataset.fmt === id));
    $("#demoNota").textContent = f.nota; $("#demoCap").textContent = f.t + " · " + f.cap;
  }
  $$("#demoFormatos button").forEach(b => b.addEventListener("click", () => setFormato(b.dataset.fmt)));
  [["#tgReticula", "reticula"], ["#tgNiveles", "niveles"], ["#tgRomper", "roto"]].forEach(([sel, cls]) =>
    $(sel).addEventListener("change", e => {
      lienzo.classList.toggle(cls, e.target.checked);
      if (cls === "roto") $("#demoNota").textContent = e.target.checked
        ? "Mismos datos, mismas posiciones, sin constantes: cada elemento habla con otra voz y el evento deja de reconocerse."
        : FORMATOS.find(x => x.id === lienzo.dataset.fmt).nota;
    }));
  function renderDemoTexto() {
    $(".l-marca", lienzo).textContent = tema.nombre;
    $(".l-fecha", lienzo).textContent = CONFIG.fechasCorta;
    $(".l-lugar", lienzo).textContent = tema.lugar;
    $(".l-sponsors", lienzo).innerHTML = tema.sponsors.map(s => `<span>${esc(s)}</span>`).join("");
  }
  setFormato("sextuple");

  /* ── 09 Piezas: esquemas ───────────────────────────────── */
  const svg = (inner, vb = "0 0 320 220") => `<svg viewBox="${vb}" role="img" aria-label="Esquema de la pieza">${inner}</svg>`;
  const phone = (x, inner) => `<rect class="wf-s" x="${x}" y="14" width="84" height="150" rx="8"/><g transform="translate(${x},14)">${inner}</g>`;
  const WF = {
    marca: () => svg(`
      <rect class="wf-s" x="16" y="34" width="172" height="92"/><circle class="wf-a" cx="54" cy="80" r="22"/>
      <rect class="wf-k" x="86" y="64" width="86" height="13"/><rect class="wf-f" x="86" y="84" width="58" height="8"/>
      <rect class="wf-s" x="204" y="34" width="44" height="44"/><circle class="wf-a" cx="226" cy="56" r="13"/>
      <rect class="wf-k" x="258" y="34" width="44" height="44"/><circle cx="280" cy="56" r="13" fill="var(--surface)"/>
      <circle class="wf-s" cx="226" cy="106" r="20"/><circle class="wf-a" cx="226" cy="106" r="10"/>
      <circle class="wf-s" cx="280" cy="106" r="9"/><circle class="wf-a" cx="280" cy="106" r="4.5"/>
      <text class="wf-t" x="16" y="146">principal</text><text class="wf-t" x="204" y="146">reducida, negativo</text>
      <text class="wf-t" x="204" y="160">y avatar a 110 px</text>`),
    afiche: () => svg(`
      <rect class="wf-s" x="10" y="36" width="300" height="150"/>
      <rect class="wf-a" x="22" y="48" width="132" height="126" opacity=".85"/>
      <rect class="wf-k" x="168" y="58" width="128" height="17"/><rect class="wf-k" x="168" y="81" width="96" height="17"/>
      <rect class="wf-f" x="168" y="128" width="78" height="9"/><rect class="wf-f" x="168" y="143" width="108" height="9"/>
      <circle class="wf-a" cx="288" cy="164" r="9"/>
      <path class="wf-d" d="M110 36V186M210 36V186M10 111H310"/>
      <text class="wf-t" x="10" y="204">6 paños · 2:1 · cuidar las uniones</text>`),
    programa: () => svg(`
      <rect class="wf-s" x="38" y="14" width="112" height="158"/><rect class="wf-s" x="170" y="14" width="112" height="158"/>
      <rect class="wf-k" x="48" y="24" width="58" height="9"/>
      <path class="wf-n" d="M48 42h92v66H48zM48 58h92M48 75h92M48 91h92M78 42v66M109 42v66"/>
      <rect class="wf-a" x="79" y="59" width="29" height="15" opacity=".85"/><rect class="wf-a" x="110" y="92" width="29" height="15" opacity=".85"/>
      <rect class="wf-f" x="48" y="118" width="54" height="44"/><rect class="wf-k" x="112" y="134" width="28" height="28"/>
      <circle class="wf-a" cx="226" cy="80" r="40"/><rect class="wf-k" x="186" y="140" width="80" height="11"/>
      <path class="wf-d" d="M38 93H150M94 14V172M170 93H282M226 14V172"/>
      <text class="wf-t" x="38" y="190">frente: programa</text><text class="wf-t" x="170" y="190">dorso: aficheta</text>
      <text class="wf-t" x="38" y="204">líneas punteadas = pliegues</text>`),
    id: () => svg(`
      ${[0, 1, 2, 3, 4].map(i => `<rect class="${i === 4 ? "wf-s" : "wf-d"}" x="${12 + i * 60}" y="56" width="54" height="54"/>`).join("")}
      <circle class="wf-a" cx="39" cy="83" r="3"/><circle class="wf-a" cx="99" cy="83" r="9"/><circle class="wf-a" cx="159" cy="83" r="15"/>
      <circle class="wf-a" cx="212" cy="83" r="11"/><rect class="wf-f" x="226" y="79" width="10" height="8"/>
      <circle class="wf-a" cx="266" cy="83" r="9"/><rect class="wf-k" x="278" y="78" width="22" height="10"/>
      <path class="wf-n" d="M12 138H306M12 133v10M306 133v10"/>
      <text class="wf-t" x="12" y="158">0 s</text><text class="wf-t" x="284" y="158">5 s</text>
      <text class="wf-t" x="196" y="46">cierra en marca quieta</text>`),
    teaser: () => svg(`
      ${phone(20, `<rect class="wf-a" x="8" y="10" width="68" height="130" opacity=".85"/>`)}
      ${phone(118, `<rect class="wf-f" x="8" y="10" width="68" height="130"/><text x="42" y="92" text-anchor="middle" style="font:900 48px var(--sans);fill:var(--ink)">?</text>`)}
      ${phone(216, `<circle class="wf-a" cx="42" cy="66" r="15"/><rect class="wf-k" x="16" y="92" width="52" height="9"/>`)}
      <text class="wf-t" x="20" y="184">gancho</text><text class="wf-t" x="118" y="184">clima, pistas</text><text class="wf-t" x="216" y="184">ID</text>
      <text class="wf-t" x="20" y="204">no revela el detalle</text>`),
    promo: () => svg(`
      ${phone(20, `<rect class="wf-a" x="8" y="10" width="68" height="86" opacity=".85"/><rect class="wf-k" x="8" y="106" width="60" height="10"/><rect class="wf-k" x="8" y="121" width="40" height="10"/>`)}
      ${phone(118, `<rect class="wf-f" x="8" y="10" width="32" height="40"/><rect class="wf-f" x="44" y="10" width="32" height="40"/><rect class="wf-f" x="8" y="54" width="32" height="40"/><rect class="wf-a" x="44" y="54" width="32" height="40" opacity=".85"/><rect class="wf-k" x="8" y="118" width="68" height="14"/><rect x="14" y="123" width="40" height="4" fill="var(--surface)"/>`)}
      ${phone(216, `<rect class="wf-f" x="14" y="22" width="56" height="7"/><rect class="wf-f" x="14" y="34" width="40" height="7"/><rect class="wf-k" x="14" y="56" width="56" height="18" rx="3"/><circle class="wf-a" cx="42" cy="108" r="13"/>`)}
      <text class="wf-t" x="20" y="184">qué es</text><text class="wf-t" x="118" y="184">qué hay</text><text class="wf-t" x="216" y="184">datos, CTA, ID</text>
      <text class="wf-t" x="20" y="204">información clara, subtitulada</text>`),
    ig: () => svg(`
      <rect class="wf-s" x="92" y="6" width="136" height="208" rx="10"/>
      <circle class="wf-a" cx="120" cy="36" r="15"/><rect class="wf-k" x="144" y="26" width="58" height="8"/><rect class="wf-f" x="144" y="40" width="72" height="6"/>
      ${[0, 1, 2].map(i => `<rect class="${i === 1 ? "wf-a" : "wf-k"}" x="${100 + i * 41}" y="66" width="38" height="50" ${i === 1 ? 'opacity=".85"' : ""}/><circle cx="${131 + i * 41}" cy="73" r="3" fill="var(--surface)"/>`).join("")}
      <rect class="wf-f" x="100" y="120" width="38" height="50"/><path d="M126 125h8v8h-8zM123 128h8v8h-8z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/>
      <rect class="wf-d" x="141" y="120" width="38" height="50"/><rect class="wf-d" x="182" y="120" width="38" height="50"/>
      <text class="wf-t" x="8" y="40">avatar</text><text class="wf-t" x="8" y="94">3 fijadas</text><text class="wf-t" x="8" y="148">1 carrusel</text>
      <text class="wf-t" x="236" y="94">grilla</text><text class="wf-t" x="236" y="106">3:4</text>`),
    espera: () => svg(`
      <rect class="wf-s" x="28" y="26" width="264" height="148"/>
      <rect class="wf-k" x="48" y="52" width="156" height="16"/><rect class="wf-k" x="48" y="74" width="112" height="16"/>
      <circle class="wf-f" cx="68" cy="132" r="18"/><rect class="wf-k" x="96" y="122" width="84" height="9"/><rect class="wf-f" x="96" y="137" width="60" height="7"/>
      <circle class="wf-a" cx="262" cy="146" r="12"/>
      <text class="wf-t" x="28" y="194">charla + expositor · en loop</text>`),
    web: () => svg(`
      <rect class="wf-s" x="12" y="24" width="204" height="138" rx="4"/><path class="wf-n" d="M12 38H216"/>
      <rect class="wf-a" x="22" y="48" width="184" height="60" opacity=".85"/><rect x="32" y="60" width="90" height="12" fill="var(--surface)"/><rect x="32" y="78" width="60" height="8" fill="var(--surface)"/>
      <rect class="wf-k" x="22" y="118" width="56" height="16" rx="3"/><rect class="wf-f" x="88" y="122" width="70" height="8"/>
      <rect class="wf-s" x="236" y="24" width="72" height="156" rx="9"/>
      <rect class="wf-a" x="243" y="38" width="58" height="62" opacity=".85"/><rect x="249" y="50" width="40" height="9" fill="var(--surface)"/>
      <rect class="wf-f" x="243" y="108" width="50" height="7"/><rect class="wf-k" x="243" y="124" width="58" height="16" rx="3"/>
      <path class="wf-d" d="M4 148H224M228 148H316"/>
      <text class="wf-t" x="12" y="196">línea punteada = primer scroll</text>`),
    overlays: () => svg(`
      ${[10, 112, 214].map(x => `<rect class="wf-s" x="${x}" y="66" width="96" height="54"/>`).join("")}
      <rect class="wf-f" x="14" y="70" width="88" height="46"/><rect class="wf-k" x="16" y="104" width="46" height="10"/><circle class="wf-a" cx="22" cy="77" r="4"/>
      <rect class="wf-f" x="117" y="74" width="41" height="30"/><rect class="wf-f" x="162" y="74" width="41" height="30"/><rect class="wf-k" x="117" y="108" width="86" height="8"/>
      <circle class="wf-a" cx="262" cy="86" r="10"/><rect class="wf-k" x="236" y="102" width="52" height="7"/><rect class="wf-f" x="246" y="112" width="32" height="4"/>
      <text class="wf-t" x="10" y="138">principal</text><text class="wf-t" x="112" y="138">comentaristas</text><text class="wf-t" x="214" y="138">por comenzar</text>
      <text class="wf-t" x="10" y="160">el video manda, la gráfica acompaña</text>`),
    merch: () => svg(`
      <path class="wf-s" d="M46 62l22-12q12 12 24 0l22 12 16 22-16 10-6-9v72H52V85l-6 9-16-10z"/><circle class="wf-a" cx="80" cy="104" r="12"/>
      <rect class="wf-s" x="152" y="86" width="62" height="70"/><path class="wf-n" d="M164 86q19-48 38 0"/><rect class="wf-a" x="166" y="108" width="34" height="9"/><rect class="wf-k" x="166" y="122" width="22" height="6"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect class="wf-d" x="${238 + (i % 2) * 34}" y="${48 + Math.floor(i / 2) * 30}" width="26" height="22"/>`).join("")}
      <text class="wf-t" x="46" y="182">remera</text><text class="wf-t" x="152" y="182">tote bag</text><text class="wf-t" x="238" y="182">+ 8 a elección</text>`),
    photo: () => svg(`
      <rect class="wf-s" x="80" y="16" width="164" height="164"/>
      <circle class="wf-a" cx="162" cy="64" r="34"/><rect class="wf-k" x="110" y="106" width="104" height="12"/>
      <g class="wf-k"><circle cx="140" cy="134" r="7"/><path d="M130 180v-28q0-9 10-9t10 9v28z"/><circle cx="184" cy="138" r="7"/><path d="M174 180v-24q0-9 10-9t10 9v24z"/></g>
      <rect class="wf-d" x="116" y="20" width="90" height="158" rx="4"/>
      <path class="wf-n" d="M80 192H244M80 188v8M244 188v8M62 16V180M58 16h8M58 180h8"/>
      <text class="wf-t" x="150" y="208">4 m</text><text class="wf-t" x="34" y="102">4 m</text>
      <text class="wf-t" x="252" y="40">encuadre</text><text class="wf-t" x="252" y="53">9:16</text>`)
  };

  $("#piezasLista").innerHTML = PIEZAS.map(p =>
    `<button class="pz" role="tab" data-id="${p.id}" aria-selected="false"><small>${p.n}</small><b>${esc(p.t)}</b><span>${esc(p.corto)}</span></button>`).join("");
  function renderPieza(id) {
    const p = pz(id) || PIEZAS[0];
    $$(".pz").forEach(b => b.setAttribute("aria-selected", b.dataset.id === p.id));
    $("#piezaPanel").innerHTML = `
      <div class="pieza__fig">
        ${WF[p.id]()}
        <div class="specs">
          <div><span class="lbl">Formato</span><b>${esc(p.formato)}</b></div>
          <div><span class="lbl">Cómo se lee</span><b>${esc(p.lectura)}</b></div>
        </div>
      </div>
      <div class="pieza__txt">
        <p class="lbl">Pieza ${p.n} de 12 ${fnum("tp")}${fnums(p.f)}</p>
        <h3>${esc(p.t)}</h3>
        <p class="fun">${esc(p.funcion)}</p>
        <div><p class="lbl" style="margin-bottom:8px">Tiene que tener</p><ul class="lista">${li(p.debe)}</ul></div>
        <div class="duo">
          <div class="err"><span class="lbl">Error típico</span>${esc(p.error)}</div>
          <div class="pru"><span class="lbl">Prueba rápida</span>${esc(p.prueba)}</div>
        </div>
      </div>`;
  }
  $$(".pz").forEach(b => b.addEventListener("click", () => renderPieza(b.dataset.id)));
  renderPieza("marca");
  $("#photoSvg").innerHTML = WF.photo();

  /* ── 10 Escala y duración ──────────────────────────────── */
  (function escala() {
    const S = 62, G = 300, W = 1040, H = 360;
    let g = "";
    for (let y = G; y >= G - 4.5 * S; y -= S) g += `<line class="e-grid" x1="0" x2="${W}" y1="${y}" y2="${y}"/>`;
    for (let x = 20; x < W; x += S) g += `<line class="e-grid" x1="${x}" x2="${x}" y1="${G - 4.5 * S}" y2="${G}"/>`;
    const persona = (x, cls = "e-ink", op = 1) => `<g class="${cls}" opacity="${op}"><circle cx="${x + 13}" cy="${G - 96}" r="9"/><path d="M${x} ${G}v-64q0-20 13-20t13 20v64z"/></g>`;
    const lbl = (x, t, s) => `<text class="e-lbl" x="${x}" y="${G + 24}">${t}</text><text class="e-sub" x="${x}" y="${G + 40}">${s}</text>`;
    const sx = 250, sw = 4.31 * S, sh = 2.15 * S, sy = G - 0.9 * S - sh;
    const px = 560, pw = 4 * S;
    const tx = 850, tw = 2.6 * S, th = tw * 9 / 16, ty = G - 1.2 * S - th;
    g += persona(40) + `<rect class="e-acc" x="70" y="${G - 78}" width="5" height="10" rx="1"/>` + `<text class="e-sub" x="80" y="${G - 84}">celular</text>` + lbl(30, "Persona", "1,70 m");
    g += `<rect class="e-obj" x="150" y="${G - 1.75 * S}" width="${0.42 * S}" height="${0.594 * S}"/><circle class="e-acc" cx="${150 + 0.21 * S}" cy="${G - 1.75 * S + 13}" r="6"/>` + lbl(150, "A2", "42 × 59 cm");
    g += `<path class="e-line" d="M${sx + 30} ${sy + sh}V${G}M${sx + sw - 30} ${sy + sh}V${G}"/><rect class="e-obj" x="${sx}" y="${sy}" width="${sw}" height="${sh}"/>
          <path class="wf-d" d="M${sx + sw / 3} ${sy}v${sh}M${sx + 2 * sw / 3} ${sy}v${sh}M${sx} ${sy + sh / 2}h${sw}"/>
          <circle class="e-acc" cx="${sx + sw * .26}" cy="${sy + sh / 2}" r="42"/>` + lbl(sx, "Séxtuple", "4,31 × 2,15 m · seis paños");
    g += `<rect class="e-obj" x="${px}" y="${G - pw}" width="${pw}" height="${pw}"/><circle class="e-acc" cx="${px + pw / 2}" cy="${G - pw + 86}" r="64"/>` + persona(px + 78, "e-ink", .9) + persona(px + 144, "e-ink", .9) + lbl(px, "Photo opportunity", "4 × 4 m como mínimo");
    g += `<path class="e-line" d="M${tx + tw / 2} ${ty + th}V${G}"/><rect class="e-obj" x="${tx}" y="${ty}" width="${tw}" height="${th}"/><circle class="e-acc" cx="${tx + tw - 26}" cy="${ty + th - 24}" r="13"/>` + lbl(tx, "Pantalla de sala", "16:9 · ej. 2,6 m de ancho");
    g += `<line class="e-ground" x1="0" x2="${W}" y1="${G}" y2="${G}"/>`;
    $("#escalaSvg").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Comparación de tamaños reales: persona con celular, A2, séxtuple, photo opportunity y pantalla de sala">${g}</svg>`;
  })();

  const DUR = [["ID animado", 5, 5, "hasta 5 s"], ["Video de espera", 5, 10, "5 a 10 s"], ["Teaser", 15, 20, "15 a 20 s"], ["Promocional", 45, 60, "45 a 60 s"]];
  $("#duraciones").innerHTML = DUR.map(([t, a, b, l]) =>
    `<div class="dur__row" title="${t}: ${l}"><b>${t}</b><div class="dur__track"><div class="dur__max" style="width:${b / 60 * 100}%"></div><div class="dur__min" style="width:${a / 60 * 100}%"></div></div><span>${l}</span></div>`).join("") +
    `<div class="dur__axis"><span></span><div><span>0</span><span>15</span><span>30</span><span>45</span><span>60 s</span></div><span></span></div>
     <p class="dur__key"><span><i style="background:var(--accent)"></i>Duración mínima</span><span><i style="background:color-mix(in srgb, var(--accent) 35%, var(--surface))"></i>Margen hasta el máximo</span></p>`;

  /* ── 11 Matriz de datos por pieza ──────────────────────── */
  const M = { marca: [2, 0, 0, 0, 0, 0], afiche: [2, 2, 2, 1, 1, 2], programa: [2, 2, 2, 2, 2, 2], id: [2, 0, 0, 0, 0, 0], teaser: [2, 2, 0, 0, 1, 0], promo: [2, 2, 2, 2, 2, 2],
    ig: [2, 2, 2, 1, 2, 1], espera: [2, 1, 0, 0, 0, 1], web: [2, 2, 2, 2, 2, 2], overlays: [2, 1, 0, 0, 0, 2], merch: [2, 1, 0, 0, 0, 0], photo: [2, 0, 0, 0, 1, 1] };
  const dot = v => v === 2 ? '<span class="dot dot--si" title="Va siempre"></span><span class="sr">sí</span>' : v === 1 ? '<span class="dot dot--op" title="Según el caso"></span><span class="sr">opcional</span>' : '<span class="dot dot--no" title="No va"></span><span class="sr">no</span>';
  $("#matriz").innerHTML = `<thead><tr><th scope="col" style="text-align:left">Pieza</th>${DATOS.map(d => `<th scope="col" title="${esc(d.d)}">${esc(d.t)}</th>`).join("")}</tr></thead><tbody>` +
    PIEZAS.map(p => `<tr><th scope="row"><small>${p.n}</small>${esc(p.t)}</th>${M[p.id].map(v => `<td>${dot(v)}</td>`).join("")}</tr>`).join("") + "</tbody>";

  /* ── 12 Estructura de los videos ───────────────────────── */
  function beats(sel, arr) {
    let t = 0;
    const rows = arr.map(([n, s, on], i) => { const a = t; t += s; return { n, s, on, i: i + 1, a, b: t }; });
    $(sel).innerHTML = `<div class="beats__bar">${rows.map(r => `<div class="${r.on ? "on" : ""}" style="flex:${r.s}" title="${r.n}: ${r.a}–${r.b} s">${r.i}</div>`).join("")}</div>
      <div class="beats__lbl">${rows.map(r => `<div><b>${r.i} · ${r.n}</b>${r.a}–${r.b} s</div>`).join("")}</div>`;
  }
  beats("#beatsTeaser", [["Gancho", 2], ["Clima y pistas", 12], ["Nombre y fecha", 3], ["ID", 3, 1]]);
  beats("#beatsPromo", [["Gancho", 3], ["Qué es", 9], ["Qué hay", 28], ["Datos", 12], ["CTA", 5], ["ID", 3, 1]]);

  /* ── 13 Sponsors ───────────────────────────────────────── */
  function renderSponsors() { $("#sponBox").innerHTML = tema.sponsors.map(s => `<span>${esc(s)}</span>`).join(""); }

  /* ── 14 Autoevaluación ─────────────────────────────────── */
  let checks = {};
  try { checks = JSON.parse(store.get("tp4-checks") || "{}") || {}; } catch (e) { checks = {}; }
  $("#pautas").innerHTML = PAUTAS.map((p, i) => `
    <article class="pauta"><span class="lbl">Pauta ${i + 1}</span><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p>
      ${p.checks.map((c, j) => `<label class="chk"><input type="checkbox" data-k="${i}-${j}" ${checks[i + "-" + j] ? "checked" : ""}><span>${esc(c)}</span></label>`).join("")}
    </article>`).join("");
  function score() {
    const all = $$("#pautas input"), n = all.filter(c => c.checked).length;
    $("#scoreN").textContent = n; $("#scoreBar").style.width = (n / all.length * 100) + "%";
  }
  $$("#pautas input").forEach(c => c.addEventListener("change", () => { checks[c.dataset.k] = c.checked; store.set("tp4-checks", JSON.stringify(checks)); score(); }));
  $("#scoreReset").addEventListener("click", () => { checks = {}; store.set("tp4-checks", "{}"); $$("#pautas input").forEach(c => { c.checked = false; }); score(); });
  score();

  /* ── 15 Fuentes ────────────────────────────────────────── */
  const grupos = {};
  fKeys.forEach((k, i) => { (grupos[FUENTES[k].g] = grupos[FUENTES[k].g] || []).push([i + 1, FUENTES[k]]); });
  $("#fuentesLista").innerHTML = Object.entries(grupos).map(([g, arr]) =>
    `<section class="fgrupo"><h3>${esc(g)}</h3><ol>${arr.map(([n, f]) => `<li><span>${n}</span><a href="${esc(f.u)}" target="_blank" rel="noopener">${esc(f.t)}</a></li>`).join("")}</ol></section>`).join("");

  /* ── Navegación ────────────────────────────────────────── */
  const slides = $$(".slide");
  const pad = n => String(n).padStart(2, "0");
  let actual = 0;
  const indice = $("#indice"), btnIndice = $("#btnIndice");
  indice.innerHTML = slides.map((s, i) => `<a href="#${s.id}" data-i="${i}"><span>${pad(i + 1)}</span>${esc(s.dataset.t)}</a>`).join("");

  function ir(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    window.scrollTo({ top: slides[i].offsetTop, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  function marcar() {
    const y = window.scrollY + window.innerHeight * 0.35;
    let i = 0;
    slides.forEach((s, j) => { if (s.offsetTop <= y) i = j; });
    actual = i;
    $("#contador").textContent = `${pad(i + 1)} / ${pad(slides.length)}`;
    $("#progreso").style.width = ((i + 1) / slides.length * 100) + "%";
    $$("a", indice).forEach((a, j) => a.setAttribute("aria-current", j === i));
  }
  let tick = false;
  window.addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(() => { marcar(); tick = false; }); } }, { passive: true });
  window.addEventListener("resize", marcar);

  function toggleIndice(open) {
    const o = open === undefined ? indice.hidden : open;
    indice.hidden = !o; btnIndice.setAttribute("aria-expanded", o);
  }
  btnIndice.addEventListener("click", () => toggleIndice());
  indice.addEventListener("click", e => { const a = e.target.closest("a"); if (a) { e.preventDefault(); toggleIndice(false); ir(+a.dataset.i); } });
  document.addEventListener("click", e => { if (!indice.hidden && !e.target.closest("#indice, #btnIndice")) toggleIndice(false); });
  $("#btnPrev").addEventListener("click", () => ir(actual - 1));
  $("#btnNext").addEventListener("click", () => ir(actual + 1));
  $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const i = slides.findIndex(s => "#" + s.id === a.getAttribute("href"));
    if (i >= 0 && !a.closest("#indice")) { e.preventDefault(); ir(i); }
  }));
  document.addEventListener("click", e => { const a = e.target.closest('.chip[href="#piezas"]'); if (a) { e.preventDefault(); ir(slides.findIndex(s => s.id === "piezas")); } });

  document.addEventListener("keydown", e => {
    if (e.target.matches("input, textarea, select") || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "Escape") return toggleIndice(false);
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); ir(actual + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); ir(actual - 1); }
    else if (e.key === "Home") { e.preventDefault(); ir(0); }
    else if (e.key === "End") { e.preventDefault(); ir(slides.length - 1); }
    else if (/^[1-4]$/.test(e.key)) setTema(TEMAS[+e.key - 1].id);
  });

  $("#btnModo").addEventListener("click", () => {
    const oscuro = root.dataset.modo ? root.dataset.modo === "oscuro" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.modo = oscuro ? "claro" : "oscuro"; store.set("tp4-modo", root.dataset.modo);
  });

  setTema(tema.id);
  marcar();
})();
