# Portafolio de Datnya Monzón

Sitio estático. HTML, CSS y JavaScript planos: **sin framework, sin build, sin
`npm install`**. Se abre y ya.

---

## Cómo verlo

```bash
python3 -m http.server 8000
```

Y entrar a `http://localhost:8000`.

> Ábrelo con un servidor, no con doble clic en `index.html`. Los vídeos y el JS
> necesitan `http://`, con `file://` fallan.

---

## Los archivos

| | |
|---|---|
| `index.html` | Estructura. Las secciones vacías las rellena el JS. |
| `estilos.css` | Todo el CSS: tokens, sistema y componentes. |
| `sitio.js` | Datos de proyectos y servicios + render + interacción. |
| `assets/` | Retrato, vídeos de los casos, logo del cliente, zorro de fondo. |
| `arquitectura.md` | Cómo está estructurado todo, sección por sección. |
| `design-system/` | Los tokens y la gramática de color, con su porqué. |

---

## Cómo añadir un proyecto

Abrir `sitio.js` y **añadir un objeto** al array `PROYECTOS`. No hay que tocar el
HTML: la rejilla y el caso se dibujan solos.

```js
{
  id: 'nombre-corto',
  cliente: 'Nombre del cliente',
  sector: 'A qué se dedica',
  titulo: 'Qué se hizo',
  resultado: 'La línea que aparece en la tarjeta',
  portada: 'assets/mi-video.mp4',   // '' si todavía no hay
  alt: 'Qué se ve en la portada',
  logo: 'assets/logo-cliente.jpg',  // '' si no hay permiso
  tags: ['Web'],
  reto: '...',
  solucion: '...',
  resultados: ['...', '...'],
  evidencia: [
    { src: 'assets/otro.mp4', cap: 'Pie de foto', alt: 'Descripción' }
  ]
}
```

Los servicios funcionan igual, en el array `SERVICIOS`.

---

## Dos cosas que hay que saber

**Al cambiar `estilos.css` o `sitio.js`, subir el número de versión** en los
enlaces de `index.html`:

```html
<link rel="stylesheet" href="estilos.css?v=2" />
<script src="sitio.js?v=2"></script>
```

Sin eso el navegador sirve la versión vieja y parece que el cambio no se aplicó.
Nos pasó dos veces.

**Los vídeos son MP4, no GIF.** Los originales pesaban 6,6 / 7,8 / 12 MB; en MP4
pesan el 1,5 % de eso. Para añadir uno nuevo:

```bash
ffmpeg -i entrada.gif -vf "scale=1280:-2" -c:v libx264 -crf 26 \
       -pix_fmt yuv420p -movflags +faststart -an salida.mp4
```

---

## Reglas del sistema

Están explicadas a fondo en `design-system/README.md`. En corto:

- **El naranja significa cambio o acción.** Nada decorativo lo lleva. Hoy aparece
  cinco veces en toda la página.
- **Negro** = nav, franja de servicios y footer. **Blanco** = donde vive el
  trabajo. **Grises** = metadatos.
- Sin captura real, no se pone tarjeta. Sin `alt`, no se publica la imagen.

---

## Lo que falta

- Una **cifra de resultado** por proyecto. Hoy las tarjetas llevan texto
  cualitativo donde el diseño pide un número.
- **Capturas del estacionamiento y de la consultora.**
- **Capturas del sitio viejo de APM**, para poder montar el antes → después.
- El **Instagram** apunta a `foxystudio.digital` mientras el portafolio lo firma
  Datnya como persona. Falta decidir.

---

## Detalles menores

- La tipografía **Poppins se carga desde Google Fonts**. Sin internet cae a la
  fuente del sistema y el diseño cambia bastante. Si hace falta que funcione
  offline, hay que descargarla a `assets/`.
- Los archivos `.py` de la raíz (`fix_html.py`, `cleanup.py`, etc.) son de la
  versión anterior y **ya no sirven**: apuntan a un HTML que ya no existe.
