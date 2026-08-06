# Arquitectura del portafolio

Mapa de cómo está construido el sitio de Datnya Monzón. Todos los números salen de
medir el render, no de estimar.

> **Dónde vive:** en este repositorio, rama `YAMIL`. Para verlo:
> `python3 -m http.server 8000` y entrar a `http://localhost:8000`.
> Instrucciones completas en `README.md`.

---

## 1. Los tres archivos

| Archivo | Líneas | Qué contiene |
|---|---|---|
| `index.html` | 171 | Estructura estática. Las secciones vacías las rellena el JS. |
| `estilos.css` | 363 | Tokens, sistema y todos los componentes. Sin framework. |
| `sitio.js` | 306 | Datos de proyectos y servicios + render + interacción. |

**Sin dependencias.** Ni React, ni Tailwind, ni framework de animación. Lo único
externo es la fuente Poppins desde Google Fonts.

Peso total con assets: **864 KB**. El sitio original pesaba 28 MB.

---

## 2. Orden de scroll

Cinco bloques. El color de fondo **no es decisión por bloque, es consecuencia de
quién habla**: negro cuando habla Datnya, blanco cuando habla el trabajo.

| # | Bloque | `id` | Alto | Fondo |
|---|---|---|---|---|
| 0 | Nav | — | 58 px, flotante | `#1A1A1A` |
| 1 | Héroe + Prueba | `#inicio` | 1 122 px | blanco |
| 2 | Servicios | `#servicios` | 884 px | `#1A1A1A` |
| 3 | Trabajo + Caso | `#trabajo` | 1 898 px | blanco |
| 4 | Contacto | `#contacto` | 912 px | blanco |
| 5 | Footer | — | 183 px | `#1A1A1A` |

Alto total: **5 186 px**.

---

## 3. Qué hay en cada bloque

### Nav — píldora flotante que se pliega
`Datnya Monzón` (texto, izquierda) · `Inicio · Trabajo · Contacto` (centrado) ·
LinkedIn e Instagram (derecha). Flota a 18 px del borde superior, no ocupa el
ancho completo.

**Se pliega a un círculo de 58 px al bajar** y se despliega al subir 80 px desde
el punto más profundo alcanzado, o al pulsarla. El nombre, los enlaces y las redes
se ocultan a la vez, cada uno con su dirección de salida. La anchura desplegada la
mide el JS y la fija en píxeles: `width:auto` no es animable.

Sigue el scroll: el enlace de la sección activa va en **blanco con subrayado
blanco** — nunca naranja, porque indica *dónde estás*, no un cambio. Debajo de
680 px pasa a dos filas.

### Héroe
Dos columnas: retrato a la izquierda, texto a la derecha.

- **Retrato** — `datnya-foto.webp`, 740 px de alto, WebP con transparencia (44,6 KB).
- **Suelo** — un degradado de 252 px en la base más una sombra de contacto elíptica
  de 315 px. Sin eso la figura flota; el recorte de la foto se leería como un corte.
- **Zorro de fondo** — al 4 %, 435 × 577 px, asomando por el borde izquierdo. Va
  por delante del suelo (z2) y por detrás del retrato (z3): detrás del suelo, el
  degradado se lo tragaba.
- **Texto** — eyebrow «¡Hola! Soy», nombre en Poppins 800, filete, párrafo, y **un
  solo botón**: «Ver el caso APM Group». Nombra su destino real; el original decía
  «Abrir mi portafolio» *dentro* del portafolio.
- Entrada escalonada: los cinco elementos aparecen con 90 ms de diferencia.

### Prueba — tres cifras
`35 · 28 · 5`, centradas, con la cifra en naranja a tamaño display. **Tres, no
cuatro**: la cuarta obligaba a rellenar y así nació «100 % Compromiso». Sin
animación de conteo — los números aparecen ya contados.

> **Pendiente:** son métricas de ella, no del cliente. «−6 h/semana de trabajo
> manual» vale más, pero hace falta el dato real.

### Servicios — escaparate con prueba
Franja negra. Marco **16:9 de 541 × 304 px** a la izquierda (misma proporción que
el vídeo nativo 1280 × 720, así que no se recorta nada), contenido a la derecha,
conmutador de píldoras debajo — la activa con fondo blanco, 17,4:1.

El marco se centra **con flexbox, no con transform**: la animación de entrada
anima `transform` y destruía el centrado. Está documentado en el apartado 6.

Tres servicios, uno visible cada vez:

| Conmuta a | Titular | Sello |
|---|---|---|
| Páginas web | Sitios que no envejecen | APM Group · Normas ISO |
| Software adaptado | El proceso ya existe | Estacionamiento · Movilidad |
| Plataformas | Todo en un solo lugar | Consultora · Servicios profesionales |

Cada uno lleva **qué incluye** (tres líneas) y un enlace que **abre su caso real**
más abajo. Donde la referencia ponía barras de «Latency 12 %», aquí va lo único
verificable. Sin captura propia, el marco muestra el titular en tipografía
perfilada — no finge ser una pantalla.

### Trabajo — carril con filtros
Encabezado + filtros + carril horizontal de tarjetas + flechas.

- **Filtros**: `Todos` visible siempre; `Web · Software · Plataformas` se despliegan
  con el `+`. Mismo lenguaje que el conmutador de servicios.
- **Tarjetas** (contrato fijo): portada 16:9 · cliente · sector · una línea de
  resultado · etiquetas · «Ver el caso →».
- **Carril**: se desplaza en horizontal con scroll-snap. Las flechas **solo
  aparecen cuando hay más de lo que cabe** — con tres tarjetas están ocultas.

### Caso — dentro de Trabajo
Cambia al pulsar una tarjeta o el enlace de un servicio.

Logo (solo si existe) · cliente · sector · titular · **El reto | La solución** en
columnas exactamente iguales (541 px cada una, sin fondo de color que haga gritar a
una más que a la otra) · El resultado en lista · Evidencia.

APM tiene 3 vídeos; los otros dos muestran «capturas pendientes».

### Contacto — un solo canal primario
WhatsApp como acción principal en naranja. Debajo, tres tarjetas de contacto
(celular, correo, LinkedIn). A la derecha, el formulario **plegado** tras
«Prefiero llenar un formulario» — 5 campos, correo opcional.

### Footer
Frase, tres enlaces, copyright.

---

## 4. Sistema de color

Ningún hex es nuevo: es la paleta original con reglas.

```
--delta          #E8740C   cambio o acción. Nunca adorno.
--delta-on-light #C15F00   único naranja legible como texto sobre claro
--delta-on-dark  #F5933A   naranja sobre negro (hover en nav y footer)
--frame          #1A1A1A   marco y autoría: nav, franja, footer
--evidence       #FFFFFF   superficie de evidencia: el trabajo vive aquí
--meta-700       #555      metadatos  ·  --meta-500 #888 bordes de control
--meta-200       #E5E5E5   filetes    ·  --meta-100 #F5F5F5 micro-superficies
--measure        60ch      medida de lectura
--wrap           1200px    ancho de contenedor
```

**El naranja aparece cinco veces en toda la página**: dos acciones (en pantallas
distintas) y las tres cifras. Nada más.

Contraste medido: cero fallos sobre los 32 textos.
`#888` sobre blanco da 3,5:1 y por eso **no se usa para texto pequeño** — solo para
bordes de control, donde el mínimo es 3:1.

---

## 5. Cómo se alimenta

Todo el contenido vive en dos arrays al inicio de `sitio.js`. **Añadir un proyecto
es añadir un objeto**, no copiar 80 líneas de HTML.

```js
PROYECTOS = [{
  id, cliente, sector, titulo,
  resultado,            // la línea que va en la tarjeta
  portada, alt, logo,   // '' si no hay
  tags: [],
  reto, solucion,
  resultados: [],
  evidencia: [{ src, cap, alt }]
}]

SERVICIOS = [{
  id, pill, eyebrow, titulo, desc,
  media, tag,
  incluye: [[etiqueta, coletilla]],
  caso, casoLabel       // a qué proyecto salta
}]
```

Funciones: `pintaRejilla` · `pintaCaso` · `pintaServicio` · `marcaNav` ·
`revisaRail` · `reveal` · `alScroll`.

Todos los clics van **delegados en `document`**, así que el contenido re-renderizado
nunca pierde sus manejadores.

---

## 6. Movimiento

Entrada escalonada del héroe, aparición al hacer scroll (`IntersectionObserver`),
y transición al cambiar de caso. Todo bajo `prefers-reduced-motion`.

> **Trampa documentada:** centrar con `transform` y animar `transform` a la vez se
> destruyen mutuamente. El marco de servicios se descentraba por eso. Se centra con
> flexbox y se anima con transform: mecanismos independientes.

---

## 7. Assets

| Archivo | Peso | Uso |
|---|---|---|
| `apm-equipo.mp4` | 229,9 KB | evidencia del caso |
| `apm-logo.jpg` | 174,9 KB | logo del cliente |
| `apm-servicios.mp4` | 137,6 KB | evidencia del caso |
| `apm-portada.mp4` | 98,2 KB | portada de tarjeta y marco de servicios |
| `datnya-foto.webp` | 44,6 KB | retrato del héroe |
| `peek.mp4` | 98,2 KB | **huérfano** — sobra de una versión anterior |

Los GIF originales pesaban 6,6 / 7,8 / 12 MB. Convertidos a MP4 pesan 1,5 % de eso.

---

## 8. Lo que falta

Nada de esto depende del código:

- **Una cifra de resultado por proyecto.** Hoy las tarjetas llevan texto
  cualitativo donde el sistema pide un número.
- **Capturas del estacionamiento y de la consultora.** Sin ellas, dos de tres
  tarjetas muestran marcador y el marco de servicios no puede enseñar pantalla.
- **Capturas del sitio viejo de APM**, para el antes → después.
- **El Instagram** apunta a `foxystudio.digital`, mientras el portafolio lo firma
  Datnya como persona. Es el último cabo suelto de esa decisión.
- **Borrar `peek.mp4`**, que ya no usa nadie.
