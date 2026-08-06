# Portafolio de Datnya Monzón

Sitio estático (HTML + CSS + JS, sin framework). En rebranding sobre la rama `YAMIL`.

## Fuente del sistema de diseño

`design-system/tokens.css` es la **fuente única de verdad**. No deduzcas el sistema
de `styles.css`: ese archivo todavía contiene decisiones que el rebranding elimina
(naranja decorativo, círculos y líneas de fondo, divisores punto-línea, estilos de
placeholder). Los tokens ganan siempre.

Pendiente de Fase 1: `styles.css` debe consumir `tokens.css` y perder su propio
bloque `:root` duplicado.

## Gramática

**El naranja significa delta.** Marca únicamente un cambio o una acción: la cifra
de un resultado, el "después" de un antes/después, la única acción de la pantalla.
Si un elemento no representa un cambio ni una acción, no lleva naranja.

- Sobre fondo claro el naranja es marca o cifra grande, nunca texto pequeño.
  Para texto naranja sobre claro: `--delta-on-light` (#C15F00).
- Sobre fondo negro el naranja sí es texto: `--delta` o `--delta-on-dark`.
- Cuando el naranja es fondo, el texto encima va **negro** (#1A1A1A), nunca blanco.

**Negro** = marco y autoría (nav, footer, franjas de proceso).
**Blanco** = superficie de evidencia; el trabajo del portafolio vive sobre blanco.
**Grises** = metadato (sector, año, stack, etiquetas).

## Tesis del rediseño

De catálogo a evidencia. El sitio no afirma capacidad, la muestra. De ahí tres
reglas duras que el código debe hacer cumplir por estructura, no por buena voluntad:

- Sin imagen real, no se renderiza la tarjeta.
- Sin cifra de resultado, no se renderiza el caso.
- Sin `alt` descriptivo, la evidencia no se publica.

## Anatomía de la tarjeta de trabajo

Contrato fijo, en este orden: portada 16:9 · cliente · sector · una línea de
resultado con la cifra en naranja · dos o tres etiquetas. Nada más. La variedad
vive dentro del caso, nunca en la rejilla.

## Decisión abierta

El sitio enlaza dos identidades: LinkedIn personal (`datnya-monzón`) e Instagram
de estudio (`foxystudio.digital`). Está sin resolver cuál firma el portafolio.
No asumas ninguna de las dos al generar el héroe.
