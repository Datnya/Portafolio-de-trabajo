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

## Firma — decidido

El portafolio lo firma **Datnya Monzón como persona**. La voz es en primera
persona del singular.

Cabo suelto: el nav volvió a incluir el enlace de Instagram, y sigue apuntando a
`foxystudio.digital` —el estudio— mientras el sitio lo firma la persona. Hay que
decidir si se cambia por un Instagram propio o se acepta como nombre comercial.

## Estado

Rama `YAMIL`. El rebranding está **terminado y en el repositorio**: `index.html`,
`estilos.css`, `sitio.js` y `assets/` son el sitio vivo. Se arranca con
`python3 -m http.server 8000` — ver `README.md`.

**Fase 1 (saneo) — hecha.** Carrusel de un logo repetido, seis placeholders y
Foxy Studio eliminados. Assets de 28 MB a 864 KB. `alt` descriptivos. Correo del
formulario ya no obligatorio. 23 reglas CSS huérfanas fuera.

**Fase 2 (estructura) — hecha.** Los proyectos y servicios viven en dos arrays al
inicio de `sitio.js`: añadir un trabajo es añadir un objeto. Rejilla con filtros
y carril horizontal en lugar de las tres pestañas.

**Fase 3 (composición) — hecha.** Héroe con suelo y zorro al 4 %; franja de
servicios con marco 16:9 y conmutador; tres métricas en vez de cuatro; contacto
de un solo canal con formulario plegado; nav flotante que se pliega al bajar.

`styles.css` y `script.js` del sitio anterior salieron del árbol; siguen en el
historial. Los `.py` de la raíz son de esa versión y ya no sirven.

Mapa completo en `arquitectura.md`.

## Pendiente del cliente

Las cifras de resultado no existen. Hoy el sitio dice «Imagen mucho más
profesional», que no es un número. La tarjeta las exige y son su corazón: hay
que pedírselas a Datnya antes de publicar.
