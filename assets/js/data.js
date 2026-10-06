/* ============================================================
   CONTENIDO DE LA PRESENTACIÓN
   Todo el texto vive acá. Para corregir un dato, editá este archivo.
   ============================================================ */

/* --- Configuración general: cambiá fechas y créditos en un solo lugar --- */
const CONFIG = {
  catedra: "Cátedra Belluccia",
  materia: "Diseño Gráfico 3",
  facultad: "FADU · UBA",
  anio: "2026",
  tp: "TP4",
  fechas: "14 al 17 de noviembre",
  fechasCorta: "14–17 NOV",
  tpUrl: "https://docs.google.com/document/d/1Q1zSipWRC6nfVNADkaFNS-SmTtgyW5NpS9-THUnzs0g/edit"
};

/* --- Fuentes: cada dato de la presentación apunta a una de estas --- */
const FUENTES = {
  tp:        { t: "TP4 FADU 2026 · Evento (consigna de la cátedra)", u: CONFIG.tpUrl, g: "Consigna" },
  masticar14:{ t: "GCBA — Más de 110 mil personas pasaron por la Feria Masticar (2014)", u: "http://buenosaires.gob.ar/noticias/mas-de-110-mil-personas-pasaron-por-la-feria-masticar", g: "Fuego Nativo" },
  masticar18:{ t: "Circuito Gastronómico — Vuelve la feria Masticar en septiembre (2018)", u: "https://circuitogastronomico.com/vuelve-la-feria-masticar-en-septiembre-y-llega-con-muchas-novedades/", g: "Fuego Nativo" },
  masticar19:{ t: "El Cronista — Vuelve la Feria Masticar: fechas, precios y novedades (2019)", u: "https://www.cronista.com/clase/gourmet/vuelve-la-feria-masticar-fechas-precios-y-novedades-en-su-edicion-aniversario/", g: "Fuego Nativo" },
  bamarket:  { t: "GCBA — Buenos Aires Market llega al Parque Rivadavia (2015)", u: "https://buenosaires.gob.ar/gcaba_historico/noticias/buenos-aires-market-llega-al-parque-rivadavia", g: "Fuego Nativo" },
  asado:     { t: "GCBA — El Campeonato Federal del Asado vuelve al Obelisco (2017)", u: "https://www.buenosaires.gob.ar/noticias/el-campeonato-federal-del-asado-vuelve-al-obelisco", g: "Fuego Nativo" },
  bocas:     { t: "El Cronista — Bocas Abiertas en San Isidro: fechas, entradas, platos y precios (2023)", u: "https://www.cronista.com/clase/gourmet/bocas-abiertas-en-san-isidro-fechas-entradas-platos-y-precios-para-comer-junto-al-rio/", g: "Fuego Nativo" },
  foodfest:  { t: "La Nación — Food Fest en Palermo: la feria con 33 puestos de comida (2025)", u: "https://www.lanacion.com.ar/que-sale/food-fest-en-palermo-cuando-y-donde-es-la-feria-gastronomica-con-33-puestos-de-comida-nid05062025/", g: "Fuego Nativo" },
  extremoRS: { t: "Rolling Stone — Buenos Aires Extremo 5: 35 mil personas (2025)", u: "https://es.rollingstone.com/arg-buenos-aires-extremo-5-35-mil-personas-adrenalina-al-maximo-y-un-poderoso-cierre-con-a-n-i-m-a-l/", g: "Cruce Urbano" },
  extremoLP: { t: "La Posta Capital — Buenos Aires Extremo 5 (previa, 2025)", u: "https://www.lapostacapital.com.ar/index.php/ciudad/11943-buenos-aires-extremo-5", g: "Cruce Urbano" },
  joj:       { t: "Wikipedia — Juegos Olímpicos de la Juventud de Buenos Aires 2018", u: "https://es.wikipedia.org/wiki/Juegos_Ol%C3%ADmpicos_de_la_Juventud_de_Buenos_Aires_2018", g: "Cruce Urbano" },
  joj3x3:    { t: "Wikipedia — 3x3 basketball at the 2018 Summer Youth Olympics", u: "https://en.wikipedia.org/wiki/3x3_basketball_at_the_2018_Summer_Youth_Olympics", g: "Cruce Urbano" },
  toma:      { t: "Street Art Latam — El fútbol callejero tomó el Obelisco de la mano de Nike (2026)", u: "https://www.streetartlatam.com/articulo/el-futbol-callejero-tomo-el-obelisco-de-la-mano-de-nike/1945", g: "Cruce Urbano" },
  liga3x3:   { t: "Marketing Registrado — El básquet argentino lanza un calendario de torneos 3x3 (2025)", u: "https://www.marketingregistrado.com/noticias/2025/basquet-argentino-lanza-calendario-torneos-3x3-impacto-nacional-internacional-44151/", g: "Cruce Urbano" },
  silentA:   { t: "La Nación — Las fiestas silenciosas están entre nosotros (2012)", u: "https://www.lanacion.com.ar/lifestyle/las-fiestas-silenciosas-estan-entre-nosotros-nid1504314/", g: "Ritmo Blanco" },
  silentB:   { t: "La Nación — Bailar en silencio, una forma de celebrar que gana adeptos (2012)", u: "https://www.lanacion.com.ar/lifestyle/bailar-en-silencio-una-forma-de-celebrar-que-gana-adeptos-nid1539429/", g: "Ritmo Blanco" },
  clubsilent:{ t: "Club Silent — sitio oficial", u: "https://www.clubsilent.com/", g: "Ritmo Blanco" },
  fibasilent:{ t: "GCBA / FIBA — Fiesta Silent", u: "http://buenosaires.gob.ar/fiba/fiesta-silent", g: "Ritmo Blanco" },
  bioferiaLN:{ t: "La Nación — Bioferia vuelve a Buenos Aires: cuándo, dónde y precios (2026)", u: "https://www.lanacion.com.ar/que-sale/bioferia-vuelve-a-buenos-aires-cuando-y-donde-es-cual-es-el-precio-de-las-entradas-y-como-comprarlas-nid06042026/", g: "Ritmo Blanco" },
  bioferiaP: { t: "Perfil — Bioferia 2026: el festival de sustentabilidad más grande de la región", u: "https://www.perfil.com/noticias/sociedad/bioferia-2026-el-festival-de-sustentabilidad-mas-grande-de-la-region-llega-al-hipodromo.phtml", g: "Ritmo Blanco" },
  rockrecycle:{ t: "Lollapalooza Argentina — Rock & Recycle (datos 2024)", u: "https://www.lollapaloozaar.com/sustainability/rock-recycle", g: "Ritmo Blanco" },
  espverde:  { t: "Infobae — El «espíritu verde» del Lollapalooza Argentina (2017)", u: "https://www.infobae.com/teleshow/infoshow/2017/03/24/el-espiritu-verde-del-lollapalooza-argentina/", g: "Ritmo Blanco" },
  colorba:   { t: "La Nación — Color BA, un festival de muralismo que iluminó La Boca (2017)", u: "https://www.lanacion.com.ar/buenos-aires/color-ba-un-festival-de-muralismo-que-ilumino-la-boca-nid1995495/", g: "Trazo Oculto" },
  mos11:     { t: "graffitimundo — Meeting of Styles festival hits Buenos Aires (2011)", u: "https://graffitimundo.com/blog/events/meeting-of-styles-festival-hits-buenos-aires/", g: "Trazo Oculto" },
  mos12:     { t: "Meeting of Styles — 22-25 November 2012, Buenos Aires", u: "https://meetingofstyles.com/22-25-november-2012-buenos-aires-argentina/", g: "Trazo Oculto" },
  colegiales:{ t: "Turismo Buenos Aires — Murales de Colegiales", u: "https://turismo.buenosaires.gob.ar/es/article/murales-de-colegiales", g: "Trazo Oculto" },
  colegialesM:{ t: "Culturismo (Medium) — Colegiales: un circuito de arte urbano a cielo abierto", u: "https://medium.com/@culturismo/colegiales-un-circuito-de-arte-urbano-a-cielo-abierto-6cc7cce13c85", g: "Trazo Oculto" },
  ron:       { t: "Wikipedia — Martín Ron (artista)", u: "https://es.wikipedia.org/wiki/Mart%C3%ADn_Ron_(artista)", g: "Trazo Oculto" },
  mugica:    { t: "GCBA — Arte urbano: Festival de Murales en el Barrio Mugica (2022)", u: "https://buenosaires.gob.ar/jefaturadegabinete/integracion/noticias/arte-urbano-festival-de-murales-en-el-barrio-mugica", g: "Trazo Oculto" },
  lollaSis:  { t: "Cátedra Cosgaya (FADU) — El sistema detrás del Lollapalooza (2017)", u: "https://catedracosgaya.com.ar/tipoblog/2017/el-sistema-detras-del-lollapalooza/", g: "Sistemas" },
  lolla26:   { t: "Ámbito — Lollapalooza Argentina presentó el nuevo mapa de su edición 2026", u: "https://www.ambito.com/espectaculos/lollapalooza-argentina-presento-el-nuevo-mapa-ampliado-su-edicion-2026-n6249930", g: "Sistemas" },
  trimarchi: { t: "Indie Hoy — TRImarchi DG celebra sus 20 años en Mar del Plata (2022)", u: "https://indiehoy.com/arte/trimarchi-dg-celebra-sus-20-anos-en-mar-del-plata/", g: "Sistemas" },
  sextuple:  { t: "Rental Vía Pública — Séxtuples (medidas del formato)", u: "https://rentalvp.com.ar/sextuples/", g: "Formatos" },
  afichePrint:{ t: "Rotularte — Impresión en papel afiche para vía pública (requisitos de archivo)", u: "https://rotularte.com.ar/producto/impresion-en-papel-tipo-afiche/", g: "Formatos" },
  ig:        { t: "Tiendanube — Medidas de Instagram 2026", u: "https://www.tiendanube.com/blog/tamano-post-instagram/", g: "Formatos" }
};

/* --- Los cuatro temas del TP ---------------------------------------- */
const TEMAS = [
  {
    id: "fuego", nombre: "Fuego Nativo", tipo: "Feria Gourmet Móvil", n: "01",
    brief: "Feria de street food experimental que cambia de locación cada día, con sabores locales e internacionales y puestos interactivos.",
    lugar: "Circuito rotativo en Palermo Soho",
    sponsors: ["Mercado Pago", "Stella Artois", "PedidosYa", "Essen"],
    desafio: "Identidad dinámica y sistema modular que se adapte a distintos entornos urbanos.",
    clave: "El dato «dónde» cambia todos los días. El sistema necesita un módulo de locación que se actualice sin rediseñar la pieza.",
    espera: [
      "Saber dónde es hoy y dónde es mañana",
      "Cuánto sale la entrada y cuánto un plato",
      "Cómo se paga (QR, billetera, efectivo)",
      "Qué puestos hay y qué opciones: veggie, sin TACC",
      "Horarios, si llueve, si va con chicos o mascotas"
    ],
    codigos: [
      "Foto de producto cercana y apetitosa",
      "Fuego, humo y brasa como textura",
      "Rotulación de puesto: sello, pizarra, cartel pintado",
      "Paleta cálida, materiales nobles",
      "Íconos de dieta y nivel de picante"
    ],
    cliche: "Llama + tenedor, papel kraft genérico y lettering «artesanal» que no se lee a tres metros.",
    preguntas: [
      "¿Qué parte de la marca se mueve con la feria y qué parte queda quieta?",
      "¿Cómo se ve la pieza cuando todavía no se anunció la locación del día?"
    ],
    referentes: [
      { n: "Buenos Aires Market", d: "Feria itinerante de alimentos saludables que arma cada edición en un barrio distinto.",
        k: [["70", "puestos y food trucks"], ["+800", "opciones"], ["$0", "entrada libre"]],
        mirar: "Cómo comunica una locación que cambia: el barrio y la fecha son el titular.", f: ["bamarket"] },
      { n: "Feria Masticar", d: "La feria de los cocineros (grupo A.C.E.L.G.A.). Mercado de productores, puestos de restaurantes y clases de cocina.",
        k: [["110 mil", "visitantes · 2014"], ["80 + 40", "productores y puestos"], ["3", "precios de plato · 2019"]],
        mirar: "Moneda propia («Billetes Masticar») y platos en tres precios fijos: una regla simple que ordena toda la señalética.", f: ["masticar14", "masticar18", "masticar19"] },
      { n: "Campeonato Federal del Asado", d: "El fuego como espectáculo en el Obelisco, dentro de BA Capital Gastronómica.",
        k: [["24", "parrillas en competencia"], ["23 + 1", "provincias y Ciudad"], ["+250 mil", "personas · edición previa"]],
        mirar: "La competencia como relato: categorías, jurado y ganador le dan estructura al día.", f: ["asado"] },
      { n: "Bocas Abiertas", d: "Festival gastronómico de San Isidro, junto al río. Edición 11 en noviembre de 2023.",
        k: [["+30", "stands"], ["3", "días"], ["$2.750", "entrada desde · 2023"]],
        mirar: "Entrada paga pero accesible, con precio tope por plato comunicado de antemano.", f: ["bocas"] },
      { n: "Food Fest", d: "Street food en La Rural, Palermo, con apoyo de BA Capital Gastronómica.",
        k: [["33", "puestos · jun 2025"], ["12–20 h", "horario"], ["$0", "entrada gratis"]],
        mirar: "Los datos que siempre aparecen en la difusión: gratis, pet friendly, cómo llegar, DJ.", f: ["foodfest"] }
    ]
  },
  {
    id: "cruce", nombre: "Cruce Urbano", tipo: "Torneo de Deportes Urbanos", n: "02",
    brief: "Torneo de deportes callejeros (básquet 3x3, skate y fútbol urbano) que celebra la cultura barrial.",
    lugar: "Polideportivos y plazas de Villa Crespo",
    sponsors: ["Nike", "Gatorade", "Rexona", "Quilmes"],
    desafio: "Identidad audaz, con presencia callejera, aplicada sobre canchas, indumentaria y señalética del barrio.",
    clave: "La marca se pisa, se viste y se transmite. Tiene que funcionar pintada en el piso, estampada en una camiseta y en un marcador en pantalla.",
    espera: [
      "Fixture y llaves: quién juega, cuándo y dónde",
      "Cómo inscribirse: categorías, cupos, costo",
      "Reglas resumidas de cada disciplina",
      "Resultados y streaming en vivo",
      "Música, freestyle y premios"
    ],
    codigos: [
      "Tipografía condensada, pesada, en mayúsculas",
      "Números grandes: dorsales, marcadores, sedes",
      "Líneas de cancha y cintas como grafismo",
      "Foto de acción, contraste alto",
      "Aplicación sobre superficie: piso, red, vallado"
    ],
    cliche: "Salpicadura de pintura con fuente «graffiti» de descarga y una estética importada que no tiene nada de Villa Crespo.",
    preguntas: [
      "¿Cómo se ve la marca desde arriba, pintada en una cancha?",
      "¿Qué distingue a las tres disciplinas sin romper el sistema?"
    ],
    referentes: [
      { n: "Buenos Aires Extremo", d: "Festival gratuito de la Ciudad que junta deporte y cultura urbana. Quinta edición en diciembre de 2025, en el Parque Deportivo Costanera.",
        k: [["+35 mil", "personas"], ["16", "equipos de 3x3"], ["70", "atletas de skate y BMX"]],
        mirar: "Deporte + música + graffiti en vivo (con artistas de Montana Colors) en una sola grilla.", f: ["extremoRS", "extremoLP"] },
      { n: "Buenos Aires 2018 · Parque Urbano", d: "Juegos Olímpicos de la Juventud. El 3x3 se jugó en Puerto Madero, junto a breaking, BMX freestyle y escalada.",
        k: [["4.012", "atletas"], ["4", "parques sede"], ["Oro", "3x3 masculino argentino"]],
        mirar: "Un sistema que ordena sedes múltiples: marca, mascota (Pandi) y un parque por tipo de deporte.", f: ["joj", "joj3x3"] },
      { n: "Nike TOMA en el Obelisco", d: "Fútbol callejero 3 contra 3 en 9 de Julio y Corrientes, con final latinoamericana en México (2026).",
        k: [["3 vs 3", "formato"], ["2", "categorías: masc. y fem."], ["Kick", "streaming en vivo"]],
        mirar: "Marca deportiva que toma un ícono de la ciudad y suma música (Trueno) y streamers.", f: ["toma"] },
      { n: "Calendario 3x3 argentino", d: "CAB, AdC y FeBAMBA armaron en 2025 tres competencias con puntos para el ranking FIBA.",
        k: [["3", "competencias"], ["+20", "fines de semana seguidos"], ["FIBA", "suma puntos al ranking"]],
        mirar: "El fixture como pieza central: la información deportiva es la comunicación.", f: ["liga3x3"] }
    ]
  },
  {
    id: "ritmo", nombre: "Ritmo Blanco", tipo: "Festival Silencioso y Sustentable", n: "03",
    brief: "Evento musical inmersivo donde los asistentes usan auriculares inalámbricos. La sustentabilidad se cruza con el arte visual.",
    lugar: "Bosques de Palermo",
    sponsors: ["Spotify", "Philips Hue", "Natura", "Sony"],
    desafio: "Transformar el espacio con luz, color vibrante y materiales reciclados para crear atmósfera.",
    clave: "Hay que explicar un formato que casi nadie vivió. Antes de persuadir, la comunicación tiene que enseñar cómo funciona.",
    espera: [
      "Cómo funciona: retiro, canales, devolución",
      "Qué suena en cada canal y a qué hora",
      "Qué pasa si llueve, cómo llegar sin auto",
      "Dónde hay agua, reciclaje y descanso",
      "Qué tiene de sustentable, con números"
    ],
    codigos: [
      "El color del auricular indica el canal",
      "Noche + luz: la gente iluminada es la imagen",
      "Blanco y silencio como espacio gráfico",
      "Instalaciones con material recuperado",
      "Infografía de «cómo funciona» en 3 pasos"
    ],
    cliche: "Hojita verde + auricular, onda de sonido genérica y «eco» resuelto solo con color verde.",
    preguntas: [
      "¿Cómo se muestra el sonido en una pieza que no suena?",
      "¿Qué dato concreto vuelve creíble la palabra «sustentable»?"
    ],
    referentes: [
      { n: "Silent Day frente al Planetario", d: "Fiesta silenciosa de Sony Argentina en los Bosques de Palermo, con transmisión por FM a los auriculares (2012).",
        k: [["~700", "personas"], ["FM", "transmisión"], ["1 h", "con parlantes, para convocar"]],
        mirar: "Mismo lugar y mismo sponsor que el TP. Abrieron con parlantes para atraer y después pasaron al silencio.", f: ["silentB"] },
      { n: "Club Silent", d: "Productora argentina de eventos con auriculares: fiestas, cine, yoga, visitas guiadas, conferencias.",
        k: [["3", "canales simultáneos"], ["100 m", "alcance de señal"], ["8–10 h", "de batería"]],
        mirar: "Azul, rojo y verde identifican cada canal: el color ya viene dado por el dispositivo.", f: ["clubsilent"] },
      { n: "Fiestas silenciosas en Buenos Aires", d: "Llegaron hacia 2011. Se canjea el documento por auriculares y se elige canal A o B. En el FIBA hubo una al aire libre, en el Abasto.",
        k: [["2–3", "canales"], ["A / B", "un DJ por canal"], ["DNI", "a cambio del auricular"]],
        mirar: "El «cómo funciona» siempre forma parte del mensaje. Es el contenido, no una aclaración.", f: ["silentA", "fibasilent"] },
      { n: "Bioferia", d: "Festival de vida sustentable en el Hipódromo de Palermo. Séptima edición del 10 al 12 de abril de 2026.",
        k: [["+200", "expositores"], ["8 y 12", "escenarios y áreas"], ["+45 mil", "personas · edición previa"]],
        mirar: "Entradas con nombre propio (packs 3x2 y 4x3) y un programa organizado por áreas temáticas.", f: ["bioferiaLN", "bioferiaP"] },
      { n: "Rock & Recycle · Lollapalooza", d: "Programa de reciclaje del festival: ecobotellas, bicicletas que trituran PET y premios en entradas.",
        k: [["16.150 kg", "de material · 2024"], ["45 mil", "botellas trituradas"], ["30 mil", "colillas recuperadas"]],
        mirar: "La sustentabilidad se comunica con cifras y con juego, no con adjetivos.", f: ["rockrecycle", "espverde"] }
    ]
  },
  {
    id: "trazo", nombre: "Trazo Oculto", tipo: "Galería a Cielo Abierto", n: "04",
    brief: "Instalación de arte pop-up que transforma medianeras gigantes en lienzos interactivos de arte urbano de gran formato.",
    lugar: "Circuito de medianeras en Colegiales",
    sponsors: ["Montana Colors", "Wacom", "Cynar", "Sinteplast"],
    desafio: "Equilibrar la ilustración artística pura con el branding comercial y dominar la narrativa visual en el espacio público.",
    clave: "La obra es la protagonista y cada artista trae su estilo. La marca del evento funciona como marco, no como otra obra que compite.",
    espera: [
      "Mapa del circuito: paradas, distancias, tiempos a pie",
      "Quién pinta qué muro y en qué horario",
      "Visitas guiadas, talleres y charlas",
      "Algo interactivo por muro: QR o realidad aumentada",
      "Cómo llegar y por dónde empezar"
    ],
    codigos: [
      "Marca sobria que convive con muchos estilos",
      "Cédula de obra en la calle: artista, título, año",
      "Mapa y numeración de muros como eje",
      "Foto del proceso: andamio, grúa, escala humana",
      "Paleta acotada para no pelear con las obras"
    ],
    cliche: "Tipografía chorreada que imita un tag, aerosol en primer plano y «todo multicolor» como única idea.",
    preguntas: [
      "¿Cómo firma la marca sin tapar la obra?",
      "¿Dónde entran cuatro sponsors sin convertir el muro en un cartel?"
    ],
    referentes: [
      { n: "Color BA", d: "Festival de muralismo en La Boca, producido y curado por Tamara Selvood. Segunda edición en marzo de 2017.",
        k: [["~5.000 m²", "de fachadas y medianeras"], ["+20", "artistas"], ["1", "semana de pintura en vivo"]],
        mirar: "Suma talleres, música y charlas. Artistas locales e internacionales en un mismo recorrido.", f: ["colorba"] },
      { n: "Meeting of Styles Buenos Aires", d: "Festival internacional de graffiti, organizado localmente por Estilo Libre. Ediciones 2011 y 2012 (Barracas).",
        k: [["+130", "artistas · 2011"], ["3", "días"], ["Sinteplast", "entre los sponsors"]],
        mirar: "Un sponsor del TP ya acompañó un evento así. Ver cómo aparece la marca de pintura junto a la obra.", f: ["mos11", "mos12"] },
      { n: "Murales de Colegiales", d: "El barrio del TP ya es un circuito: Distrito Audiovisual, Mercado de Pulgas y recorridos guiados.",
        k: [["1", "manzana entera pintada"], ["2", "focos: Distrito Audiovisual y Mercado de Pulgas"], ["Tours", "a pie por el barrio"]],
        mirar: "Trabajar sobre lo que existe: el evento se suma a un recorrido que el barrio ya tiene.", f: ["colegiales", "colegialesM"] },
      { n: "Martín Ron", d: "Muralista argentino de gran formato. «El cuento de los loros» (2013) ocupa una medianera de cuatro pisos en Villa Urquiza.",
        k: [["412 m²", "un solo mural"], ["+250", "murales · Embellecimiento Urbano"], ["4", "pisos de altura"]],
        mirar: "La escala es el mensaje. En la foto siempre aparece una persona o una grúa como referencia.", f: ["ron"] },
      { n: "Festival de Murales · Barrio Mugica", d: "Once murales pintados en simultáneo por artistas profesionales junto a vecinos del taller de muralismo (2022).",
        k: [["11", "murales simultáneos"], ["2.ª", "edición"], ["Taller", "con vecinos del barrio"]],
        mirar: "El barrio participa de la obra: la comunicación muestra quién pinta, no solo qué.", f: ["mugica"] }
    ]
  }
];

/* --- Qué se espera de un evento así: patrones que se repiten -------- */
const PATRONES = [
  { t: "Entrada gratis o accesible", d: "El precio es parte del mensaje principal, no letra chica.",
    ev: "Buenos Aires Market, Food Fest y Buenos Aires Extremo: gratis. Bocas Abiertas y Bioferia cobran entrada y comunican el precio de entrada.", f: ["bamarket", "foodfest", "extremoLP", "bocas", "bioferiaLN"] },
  { t: "Un programa que se lee de un vistazo", d: "Días, franjas horarias y espacios en una grilla.",
    ev: "Bioferia: 8 escenarios y 12 áreas. Masticar: mercado, puestos y clases como secciones fijas.", f: ["bioferiaLN", "masticar18"] },
  { t: "Un mapa", d: "Dónde está cada cosa y cómo se llega.",
    ev: "Lollapalooza presentó el mapa de su edición 2026 como una noticia en sí misma. Buenos Aires 2018 repartió los deportes en 4 parques.", f: ["lolla26", "joj"] },
  { t: "Reglas claras para participar", d: "Cómo pago, cómo me anoto, cómo funciona.",
    ev: "Masticar: billetes propios y platos a tres precios. Fiestas silenciosas: documento por auricular y canal a elección.", f: ["masticar19", "silentA"] },
  { t: "Más que la actividad central", d: "Música, talleres, propuestas para chicos.",
    ev: "Buenos Aires Extremo suma bandas, taller de rap y graffiti en vivo. Color BA: talleres, música y charlas.", f: ["extremoRS", "colorba"] },
  { t: "Algo para llevarse y algo para compartir", d: "Merch, foto, transmisión.",
    ev: "Nike TOMA se transmitió por streaming. Rock & Recycle premia con entradas a quienes reciclan.", f: ["toma", "rockrecycle"] }
];

const ESCALA_REF = [
  ["+250 mil", "personas", "Campeonato Federal del Asado · edición 2016", "asado"],
  ["110 mil", "visitantes", "Feria Masticar · 2014", "masticar14"],
  ["+45 mil", "personas", "Bioferia · edición previa a 2026", "bioferiaLN"],
  ["+35 mil", "personas", "Buenos Aires Extremo 5 · 2025", "extremoRS"],
  ["+130", "artistas", "Meeting of Styles BA · 2011", "mos11"],
  ["~5.000 m²", "pintados", "Color BA · 2017", "colorba"]
];

/* --- Momentos de la comunicación ------------------------------------ */
const MOMENTOS = [
  { id: "antes", t: "Expectativa", cuando: "Semanas antes", verbo: "Intrigar",
    d: "Todavía no se explica nada. Se instala un clima, un nombre y una fecha.",
    datos: "Nombre + fecha. Nada más.", piezas: ["marca", "id", "teaser", "ig"] },
  { id: "lanz", t: "Convocatoria", cuando: "Días antes", verbo: "Informar y convencer",
    d: "Aparecen los datos completos y el llamado a la acción. Es donde se gana o se pierde público.",
    datos: "Qué, cuándo, dónde, cuánto y cómo anotarse.", piezas: ["afiche", "promo", "ig", "web"] },
  { id: "durante", t: "El evento", cuando: CONFIG.fechas, verbo: "Orientar y hacer participar",
    d: "La gráfica pasa a ser un servicio: ubica, ordena tiempos y acompaña a quien mira desde su casa.",
    datos: "Programa, mapa, horarios, quién habla ahora.", piezas: ["programa", "espera", "overlays", "photo", "merch"] },
  { id: "despues", t: "Recuerdo", cuando: "Después", verbo: "Quedar",
    d: "Lo que la gente se lleva y lo que sube a redes. Construye la próxima edición.",
    datos: "Marca + clima. El dato ya no importa.", piezas: ["programa", "merch", "photo"] }
];

/* --- Las 12 piezas del TP ------------------------------------------- */
const PIEZAS = [
  { id: "marca", n: "01", t: "Identificador", corto: "Marca",
    formato: "Vectorial · sin medida fija", lectura: "De 110 px a 4 m",
    funcion: "Nombrar y firmar. Es la única pieza que está en todas las demás.",
    debe: ["Versión principal y versión reducida", "Funcionar en un color y en negativo", "Leerse como avatar circular"],
    error: "Diseñarla grande y con todos sus colores, y descubrir tarde que no entra en un avatar.",
    prueba: "Achicala a 110 px de ancho. Si se entiende, sigue." },
  { id: "afiche", n: "02", t: "Afiche de vía pública", corto: "Séxtuple",
    formato: "Horizontal · aprox. 4,31 × 2,15 m (2:1)", lectura: "3 a 5 segundos, en movimiento",
    funcion: "Avisar que el evento existe. Se ve de lejos y de pasada.",
    debe: ["Una imagen, un titular, la marca", "Fecha y lugar en segundo nivel", "Nada importante sobre las uniones de los seis paños"],
    error: "Tratarlo como un flyer grande: demasiado texto, cuerpo chico, tres ideas a la vez.",
    prueba: "Miralo 3 segundos al tamaño de una estampilla. ¿Qué te quedó?", f: ["sextuple", "afichePrint"] },
  { id: "programa", n: "03", t: "Programa + aficheta", corto: "A2 doble faz",
    formato: "A2 · 420 × 594 mm · frente y dorso", lectura: "En la mano, a 40 cm, varios minutos",
    funcion: "Frente: toda la programación, con claridad. Dorso: una imagen para colgar en la pared.",
    debe: ["Grilla de días, horarios y espacios", "Mapa, destacados y QR de inscripción", "Dorso vertical con marca, paleta y misceláneas"],
    error: "Olvidar los pliegues: un A2 se entrega doblado y los dobleces cortan títulos y caras.",
    prueba: "Doblá una hoja en 8 y marcá dónde caen los pliegues antes de diagramar." },
  { id: "id", n: "04", t: "ID animado", corto: "Hasta 5 s",
    formato: "Animación · máximo 5 segundos", lectura: "Cierra todos los videos",
    funcion: "La firma en movimiento. Define cómo se mueve todo el sistema.",
    debe: ["Terminar en la marca quieta y legible", "Entenderse sin sonido", "Un solo gesto de movimiento, reconocible"],
    error: "Animar por animar: efectos que no salen de la forma ni del concepto de la marca.",
    prueba: "¿El último cuadro sirve como imagen fija? Tiene que ser la marca tal cual." },
  { id: "teaser", n: "05", t: "Teaser", corto: "15–20 s vertical",
    formato: "Vertical · 750 × 1334 px · 15 a 20 s", lectura: "Con el pulgar listo para pasar",
    funcion: "Generar expectativa sin revelar el detalle. Clima antes que información.",
    debe: ["Gancho en los primeros 2 segundos", "Coherencia con el clima del evento", "Cierre con el ID"],
    error: "Contarlo todo. Si ya dice horarios y actividades, es un promocional corto.",
    prueba: "Al terminar, ¿quedan ganas de saber más? Esa es la medida." },
  { id: "promo", n: "06", t: "Promocional", corto: "45–60 s vertical",
    formato: "Vertical · 750 × 1334 px · 45 a 60 s", lectura: "Muchas veces sin sonido",
    funcion: "Explicar las activaciones del evento con información clara.",
    debe: ["Estructura: gancho, qué es, qué hay, datos, CTA", "Subtítulos o texto en pantalla", "Cierre con el ID"],
    error: "Un minuto de clima sin datos. A los 60 segundos el público tiene que saber cómo ir.",
    prueba: "Miralo en silencio. ¿Se entiende qué, cuándo, dónde y cómo?" },
  { id: "ig", n: "07", t: "Perfil de Instagram", corto: "Avatar + 3 + carrusel",
    formato: "Avatar 320 × 320 · posteos 1080 × 1350 (4:5)", lectura: "En grilla y de a uno",
    funcion: "La casa del evento en redes. Cada posteo informa una actividad, expositor o taller.",
    debe: ["Avatar con la versión reducida de la marca", "3 publicaciones fijas que se leen juntas", "1 carrusel de 3 imágenes con secuencia"],
    error: "Posteos lindos sueltos que, puestos en la grilla, no parecen del mismo evento.",
    prueba: "Armá la grilla completa antes de cerrar cada pieza. La grilla recorta a 3:4.", f: ["ig"] },
  { id: "espera", n: "08", t: "Video de espera", corto: "5–10 s horizontal",
    formato: "Horizontal · 1920 × 1080 px · 5 a 10 s", lectura: "Proyectado, de fondo, en loop",
    funcion: "Entretener e informar mientras empieza una charla o taller.",
    debe: ["Título de la charla y nombre del expositor", "Legible desde el fondo de la sala", "Cierre con el ID"],
    error: "Texto chico pensado para monitor. En sala, el cuerpo mínimo es mucho mayor.",
    prueba: "Alejate 5 metros de la pantalla. ¿Se lee el nombre del expositor?" },
  { id: "web", n: "09", t: "Sitio web", corto: "Landing · 2 mockups",
    formato: "Imagen fija · desktop y mobile", lectura: "Primer scroll",
    funcion: "Mostrar la gráfica del evento aplicada y llevar a la inscripción.",
    debe: ["Marca, fecha, lugar y CTA sin scrollear", "Misma jerarquía en desktop y en mobile", "Programa y sponsors más abajo"],
    error: "Achicar el desktop para hacer el mobile. Son dos diagramaciones distintas del mismo sistema.",
    prueba: "Tapá todo menos la primera pantalla del celular. ¿Está el botón?" },
  { id: "overlays", n: "10", t: "Streaming overlays", corto: "3 pantallas",
    formato: "1920 × 1080 px · 3 pantallas", lectura: "En vivo, sobre video",
    funcion: "Vestir la transmisión: principal, comentaristas y «está por comenzar».",
    debe: ["Prioridad a la imagen del evento", "Zócalos legibles sobre cualquier fondo", "Lugar previsto para sponsors y marcador"],
    error: "Marcos tan cargados que achican el video. La gráfica acompaña, el evento manda.",
    prueba: "Poné una foto oscura y una clara detrás. ¿El zócalo se lee en las dos?" },
  { id: "merch", n: "11", t: "Merchandising", corto: "2 + 8 elementos",
    formato: "Remera + tote bag + 8 a elección", lectura: "Puesto, usado, regalado",
    funcion: "Que la gente quiera llevarse el evento. El sistema sale a la calle.",
    debe: ["Objetos que tengan sentido para el tema", "Misceláneas y patrones, no solo el logo", "Pensar el soporte: tela, serigrafía, tintas"],
    error: "Pegar el logo centrado en diez objetos. Eso es stock con marca, no merchandising.",
    prueba: "¿Lo usarías aunque no hubieras ido al evento?" },
  { id: "photo", n: "12", t: "Photo opportunity", corto: "Mínimo 4 × 4 m",
    formato: "Espacial · mínimo 4 × 4 m", lectura: "A través de la cámara de un celular",
    funcion: "Un lugar hecho para sacarse una foto y compartirla. Publicidad que hace el público.",
    debe: ["Marca dentro del encuadre vertical, arriba de las cabezas", "Lugar claro para pararse", "Algo para hacer: posar, sostener, asomarse"],
    error: "Un banner con logos repetidos. Nadie se saca una foto con un fondo de prensa por gusto.",
    prueba: "Dibujá el encuadre 9:16 con dos personas adentro. ¿Entra el nombre del evento?" }
];

/* --- Datos obligatorios --------------------------------------------- */
const DATOS = [
  { id: "que", t: "Qué", d: "Nombre del evento y de qué se trata, en una línea." },
  { id: "cuando", t: "Cuándo", d: "Días y horarios. La fecha se lee igual en todas las piezas." },
  { id: "donde", t: "Dónde", d: "Lugar y barrio. Si hay varias sedes, un mapa." },
  { id: "cuanto", t: "Cuánto", d: "Precio o «gratis». Si hay preventa, hasta cuándo." },
  { id: "como", t: "Cómo", d: "Inscripción, web, QR. Es el llamado a la acción." },
  { id: "quien", t: "Quiénes", d: "Organizador y sponsors, en su franja, sin competir." }
];

/* --- Sistemas completos argentinos ---------------------------------- */
const SISTEMAS = [
  { n: "Lollapalooza Argentina", sub: "Un sistema que cambia cada año sin dejar de ser el mismo",
    puntos: [
      "Logotipo hecho a mano: es la constante que no se toca.",
      "Paleta fija dentro de cada edición, distinta de un año al otro.",
      "Un solo estilo de ilustración en entradas, banners, web, redes, escenarios y merchandising.",
      "El mapa del predio es una pieza de comunicación: en 2026 se anunció con 5 escenarios y zonas nuevas."
    ], leccion: "Constantes fuertes permiten variables libres.", f: ["lollaSis", "lolla26"] },
  { n: "Buenos Aires 2018", sub: "Juegos Olímpicos de la Juventud: una marca para cuatro parques",
    puntos: [
      "Emblema con letras curvas pintadas con los colores de los anillos olímpicos.",
      "Mascota: Pandi, un yaguareté, diseñado por la agencia Human Full y animado por Buda TV.",
      "Cada parque agrupó deportes afines: el Parque Urbano de Puerto Madero reunió 3x3, breaking, BMX y escalada.",
      "Un lema para todas las piezas: «Viví el futuro»."
    ], leccion: "Muchas sedes y disciplinas se ordenan con una regla, no con más logos.", f: ["joj", "joj3x3"] },
  { n: "TRImarchi", sub: "Un festival de diseño hecho por estudiantes de diseño",
    puntos: [
      "Nació en Mar del Plata, fundado por dos estudiantes de la Escuela Malharro.",
      "Cumplió 20 años en 2022, con tres días en el Polideportivo Islas Malvinas.",
      "Combina charlas, recitales y encuentros: el evento también es una fiesta.",
      "Se lo presenta como el mayor encuentro internacional de diseño gráfico de Latinoamérica."
    ], leccion: "El público de diseño exige que la gráfica esté a la altura del contenido.", f: ["trimarchi"] }
];

/* --- Autoevaluación: las 5 pautas del TP ---------------------------- */
const PAUTAS = [
  { t: "Identificación eficaz", d: "Los signos del evento cumplen su función en todos los usos.",
    checks: ["La marca se lee en un avatar de 110 px", "Funciona en un solo color y en negativo", "Se reconoce el evento tapando el nombre"] },
  { t: "Calidad gráfica y coherencia sistémica", d: "Armonía y coherencia en los elementos y su combinación.",
    checks: ["Las 12 piezas juntas parecen del mismo evento", "Uso las mismas 2 familias tipográficas en todo", "La paleta está definida y no aparecen colores sueltos"] },
  { t: "Adecuación estilística", d: "Lenguaje promocional acorde a las necesidades del evento.",
    checks: ["El estilo corresponde al tema y a su público", "Evité el cliché del rubro", "Los sponsors conviven sin desarmar el sistema"] },
  { t: "Rendimiento comunicacional", d: "Buena selección y jerarquía de la información.",
    checks: ["Cada pieza tiene un solo mensaje principal", "Fecha, lugar y precio son correctos e iguales en todas", "Hay un llamado a la acción donde corresponde"] },
  { t: "Ajuste a la consigna", d: "Todo lo pedido, en tiempo y forma.",
    checks: ["Están las 12 piezas con sus formatos y duraciones", "Todos los videos cierran con el ID", "Merchandising: remera, tote bag y 8 más"] }
];
