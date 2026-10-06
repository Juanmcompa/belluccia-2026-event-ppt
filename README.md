# Sistema gráfico para eventos · TP4

Presentación web interactiva para **Diseño Gráfico 3 · Cátedra Belluccia · FADU UBA (2026)**.
Acompaña el TP4 (sistema de identificación y comunicación para un evento) y responde tres preguntas:

1. **Qué se espera** de un evento de este tipo.
2. **Cómo se suele mostrar**, con referentes argentinos de cada tema.
3. **Qué sostiene** a un sistema gráfico prolijo, utilizable y concreto.

Los cuatro temas: Fuego Nativo, Cruce Urbano, Ritmo Blanco y Trazo Oculto.

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
| Fichas de las 12 piezas | `PIEZAS` |
| Una fuente o un link | `FUENTES` |
| Checklist de autoevaluación | `PAUTAS` |
| Colores de cada tema | `assets/css/styles.css`, sección «1. Tokens» |

```
index.html            Estructura de las 15 pantallas
assets/css/styles.css Estilos
assets/js/data.js     Contenido (editar acá)
assets/js/app.js      Navegación e interacciones
assets/fonts/         Archivo y Chivo Mono (Omnibus-Type, licencia SIL OFL)
```

## Criterios del material

- **Todo dato con número tiene fuente.** Los recuadros numerados abren la nota original; la última pantalla las lista todas. Relevamiento: octubre de 2026.
- **No se reproducen imágenes de terceros.** Los diagramas son propios y esquemáticos; para ver las piezas reales de cada referente hay que abrir la fuente.
- **Lo que es criterio de cátedra está marcado como sugerencia** (matriz de datos por pieza, estructura de los videos), para discutir en clase.
- La medida del séxtuple (4,31 × 2,15 m) es la de un circuito comercial y puede variar según el proveedor.

## Licencias

Contenido y código: CC0 1.0 (ver `LICENSE`). Tipografías: SIL Open Font License 1.1 (ver `assets/fonts/`).
Las marcas y eventos citados pertenecen a sus titulares y se mencionan con fines educativos.
