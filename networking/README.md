# Tarjeta digital de networking

Dos páginas independientes del portafolio: `/tarjeta` muestra el QR y `/contacto`
presenta las acciones. Ninguna está enlazada desde el home. Ambas usan `noindex,
nofollow`. `vercel.json` resuelve esas rutas sin extensión en el dominio actual.

## Datos editables

Editar `contact-config.js`. El teléfono, correo y LinkedIn se copiaron de los
enlaces del home al crear esta funcionalidad. `bookingUrl` apunta a la agenda pública
de 15 minutos de Google Calendar y abre en una nueva pestaña. `organization`
es opcional y solo aparece en la vCard cuando tiene valor.

La vCard pública `datnya-monzon.vcf` se genera desde esta configuración con
`node networking/generate-vcard.cjs`. Ejecuta ese comando después de cambiar datos
de contacto y antes de publicar. El botón abre directamente esta vCard 3.0 con
`Content-Disposition: inline`, para que un móvil compatible ofrezca la ficha en
Contactos. El navegador puede descargar el archivo según su configuración; en
ese caso se abre desde Descargas. El guardado siempre requiere confirmación de
la persona. `contactDisplayName` añade «Desarrollo Web» al nombre guardado.

## QR por evento

Abrir `/tarjeta?ref=open-innovation-grow-night` para mostrar un QR que apunta a
`/contacto?ref=open-innovation-grow-night`. Se aceptan referencias de hasta 48
caracteres con letras minúsculas, números y guiones. El QR normal apunta a
`/contacto`. Su SVG estático sirve como respaldo cuando JavaScript no está
disponible. La librería QR está incluida localmente en `vendor/qrcode.js`
(qrcode-generator 2.0.4, licencia MIT) y solo se carga para un QR con `ref`, sin
peticiones a servicios QR externos.

En `/contacto`, `ref` se envía como propiedad de los eventos `networking_*` a la
instancia PostHog que ya usa el portafolio. La referencia del ejemplo también
personaliza el mensaje de WhatsApp; otras referencias mantienen el texto general.

## Prueba local

Desde la raíz del repositorio, usar un servidor estático. Por ejemplo:

```bash
npx --yes http-server . -p 8000
```

Abrir `http://localhost:8000/tarjeta` y `http://localhost:8000/contacto`. Para una
prueba con dos teléfonos en la misma red, abrir la tarjeta mediante la dirección IP
local del equipo; el QR siempre apunta al dominio público configurado.
