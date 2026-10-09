# Sistema gráfico para eventos · TP4

Presentación web interactiva para **Diseño Gráfico 3 · Cátedra Belluccia · FADU UBA (2026)**.
Acompaña el TP4 (sistema de identificación y comunicación para un evento) y responde tres preguntas:

1. **Qué se espera** de un evento de este tipo.
2. **Cómo se suele mostrar**, con referentes argentinos de cada tema.
3. **Qué sostiene** a un sistema gráfico prolijo, utilizable y concreto.

Los cuatro temas: Fuego Nativo, Cruce Urbano, Ritmo Blanco y Trazo Oculto.

## Dos archivos, dos usos

- **`index.html`**: la presentación web completa, para recorrer y consultar (referentes, fuentes, fichas, checklist).
- **`calendario.html`**: el calendario de entregas. Qué traer a cada clase hasta la pre-entrega (mié 11/11) y la entrega (lun 16/11), con los feriados descontados, checklist por clase y exportación a Google Calendar u otro calendario (.ics). Las fechas, los feriados y los hitos se editan al principio de `assets/js/calendario.js`.
- **`clase.html`**: la versión en slides para dar la clase. 30 slides en 16:9, con pasos animados, demos interactivas y notas para el docente. Se enlaza desde la portada de `index.html`.

### Atajos de `clase.html`

| Acción | Tecla |
|---|---|
| Siguiente paso o slide | `→`, `Espacio`, `AvPág` (puntero de presentación) |
| Paso o slide anterior | `←`, `RePág` |
| Índice de slides | `I` |
| Notas para el docente | `N` |
| Cambiar de tema | `1` `2` `3` `4` |
| Pantalla completa | `F` |
| Pantalla en negro | `B` |
| Ir a una slide | `clase.html#12` |

Los textos de cada slide están en `clase.html`; los datos compartidos (temas, programa, piezas, ejemplos) salen de `assets/js/data.js`, así que un cambio ahí se ve en las dos presentaciones.

## Cómo verla

Abrí `index.html` en el navegador. No necesita instalación, servidor ni conexión: las tipografías están incluidas.

| Acción | Cómo |
|---|---|
| Avanzar / retroceder | `→` `←`, `AvPág` `RePág` (sirve con puntero de presentación) o las flechas de la barra |
| Ir al principio / al final | `Inicio` / `Fin` |
| Cambiar de tema | Botones de la barra o teclas `1` `2` `3` `4` |
| Índice | Botón «Índice» |
| Modo claro / oscuro | Botón de la derecha |
| Abrir directo en un tema | `index.html?tema=fuego` · `cruce` · `ritmo` · `trazo` |

## Publicarla con GitHub Pages

1. Subí los cambios a `main`.
2. En GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
3. En un par de minutos queda en `https://<usuario>.github.io/belluccia-2026-event-ppt/`.

## Cómo editarla

Todo el contenido está en **`assets/js/data.js`**. No hace falta tocar el HTML para corregir un dato.

| Quiero cambiar… | Dónde |
|---|---|
| Fechas del evento, cátedra, año, link a la consigna | `CONFIG` (primeras líneas de `data.js`) |
| Textos de un tema y sus referentes | `TEMAS` |
| Espacios inventados de cada evento (4 por tema) | `TEMAS` → `espacios` |
| Programa de ejemplo (3 jornadas, 10 actividades por día) | `TEMAS` → `programa`. Cada actividad: hora, espacio (0 a 3), título, tipo, modalidad (`P`, `V`, `H`) y bajada |
| Medios de vía pública (séxtuple, mupi, valla, transporte) | `CALLE` |
| Carrusel de ejemplos resueltos (imagen, texto, crédito) | `EJEMPLOS`. Las imágenes van en `assets/img/ejemplos/`: una `.webp` grande y una `-mini.webp` por ejemplo |
| Fichas de las 12 piezas | `PIEZAS` |
| Una fuente o un link | `FUENTES` (y su nombre corto en `FUENTE_CORTA`) |
| Checklist de autoevaluación | `PAUTAS` |
| Colores de cada tema | `assets/css/styles.css`, sección «1. Tokens» |

```
index.html            Estructura de las 17 pantallas
clase.html            Presentación de clase en slides (30)
calendario.html       Calendario de entregas
assets/css/styles.css Estilos
assets/js/data.js     Contenido (editar acá)
assets/js/app.js      Navegación e interacciones de index.html
assets/js/clase.js    Motor de slides y demos de clase.html
assets/css/clase.css  Estilos de clase.html
assets/js/calendario.js   Fechas, feriados, hitos y lógica del calendario
assets/css/calendario.css Estilos de calendario.html
assets/fonts/         Archivo y Chivo Mono (Omnibus-Type, licencia SIL OFL)
assets/img/ejemplos/  Imágenes del carrusel, optimizadas para web
```

## Criterios del material

- **Todo dato con número tiene fuente.** Los links con ↗ debajo de cada bloque abren la nota original. Relevamiento: octubre de 2026.
- **Los diagramas son propios y esquemáticos.** De los referentes argentinos no se reproducen imágenes: hay que abrir la fuente.
- **El carrusel de ejemplos resueltos muestra proyectos publicados en Behance por sus autores**, con fines educativos. Para acreditarlos como corresponde, completar `autor` y `url` de cada uno en `EJEMPLOS`.
- **Lo que es criterio de cátedra está marcado como sugerencia** (matriz de datos por pieza, estructura de los videos), para discutir en clase.
- **Los programas de actividades y los nombres de los espacios son ejemplos inventados**, marcados como tales en pantalla, para que cada grupo los cambie. Dos actividades con la misma hora y distinto espacio se muestran en simultáneo.
- **La consigna pide el séxtuple.** Mupi, valla y transporte aparecen como los medios que lo acompañan en una campaña real y sirven para poner a prueba el sistema.
- Las medidas de vía pública son las de circuitos comerciales y pueden variar según el proveedor.

## Licencias

Contenido y código: CC0 1.0 (ver `LICENSE`). Tipografías: SIL Open Font License 1.1 (ver `assets/fonts/`).
Las marcas y eventos citados pertenecen a sus titulares y se mencionan con fines educativos.
