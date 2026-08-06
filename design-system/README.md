# Sistema de diseño — Datnya Monzón

`tokens.css` es la fuente única de verdad. Los tokens están nombrados **por
función, no por apariencia**: `--delta` en vez de `--primary`, `--frame` en vez
de `--black`, `--evidence` en vez de `--white`. La gramática vive en el nombre.

> No deduzcas el sistema de `styles.css` del sitio actual: ese archivo todavía
> contiene decisiones que este rebranding elimina (naranja decorativo, círculos
> y líneas de fondo, divisores punto-línea, estilos de placeholder).

## Gramática de color

**El naranja significa delta.** Marca únicamente un cambio o una acción: la cifra
de un resultado, el "después" de un antes/después, la única acción de la pantalla.
Si un elemento no representa un cambio ni una acción, no lleva naranja.

| | |
|---|---|
| `--delta` `#E8740C` | Marca, relleno, cifra grande |
| `--delta-on-light` `#C15F00` | Único naranja legible como texto sobre claro |
| `--delta-on-dark` `#F5933A` | Naranja como texto sobre negro |
| `--frame` `#1A1A1A` | Marco y autoría: nav, footer, franjas de proceso |
| `--evidence` `#FFFFFF` | Superficie de evidencia: el trabajo vive aquí |
| `--meta-*` | Metadato: sector, año, stack, etiquetas |

Asimetría a respetar: **sobre claro el naranja es una marca; sobre oscuro el
naranja es voz.** Y cuando el naranja es fondo, el texto encima va negro
`#1A1A1A` (5.7:1), nunca blanco (3.0:1).

## Tipografía

Poppins. Display con `letter-spacing: -0.02em` y `line-height: 1.15` —es
geométrica, y sin tracking negativo las contraformas abren la palabra. Cuerpo a
1.7 con medida máxima de 66 caracteres por línea.

Etiquetas de sección en sustantivo seco: Trabajo, Proceso, Contacto. Nunca
imperativo ("Hablemos") ni posesivo ("Mis Proyectos").

## Tesis

De catálogo a evidencia. El sitio no afirma capacidad, la muestra. Tres reglas
que la estructura debe hacer cumplir, no la buena voluntad:

- Sin imagen real, no se renderiza la tarjeta.
- Sin cifra de resultado, no se renderiza el caso.
- Sin `alt` descriptivo, la evidencia no se publica.

## Anatomía de la tarjeta de trabajo

Contrato fijo, en este orden: portada 16:9 · cliente · sector · una línea de
resultado con la cifra en naranja · dos o tres etiquetas. Nada más. La variedad
vive dentro del caso, nunca en la rejilla.

## Fuera del sistema — no generar nunca

Círculos y líneas decorativas de fondo · divisores punto-línea · badges que
repiten el nombre de su sección · marcos de navegador falsos alrededor de las
capturas · placeholders visibles · contadores animados desde cero · blanco
sobre naranja.
