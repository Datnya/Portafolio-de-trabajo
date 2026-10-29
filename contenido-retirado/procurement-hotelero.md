# Plataforma de gestión para Procurement Hotelero

Este caso se retiró temporalmente de la sección **Trabajo → Plataformas** el 20 de octubre de 2026 y se preparó para volver a publicarse el 29 de octubre de 2026. Su posición es después de «Plataforma de gestión para consultoras», como último objeto del array `PROYECTOS` en `sitio.js`. El cliente se llama **HPG International**; **VAAK** es el nombre de la plataforma.

Este bloque conserva la versión actual del caso para una futura restauración. Los GIFs originales están en `assets/Vaak GIF 1.gif` a `assets/Vaak GIF 5.gif`; la web utiliza las copias MP4 optimizadas. Si vuelves a añadir el objeto, aumenta la versión de `sitio.js` en `index.html` para evitar que se sirva una copia en caché.

```js
{
  id: 'procurement-hotelero', cat: 'platforms', cliente: 'HPG International', sector: 'Compras y logística hotelera',
  titulo: 'VAAK: plataforma de gestión para Procurement Hotelero',
  resultado: 'Proyectos, proveedores, compras, facturación y logística centralizados en una única plataforma.',
  portada: 'assets/vaak-proyectos.mp4',
  alt: 'Panel de VAAK con el portafolio de proyectos hoteleros',
  logo: '',
  tags: ['Plataforma', 'Procurement', 'Hotelería'],
  reto: 'Centralizar procesos que involucraban proyectos hoteleros, proveedores, trabajadores, documentos y órdenes de compra.',
  solucion: 'Desarrollé una plataforma empresarial personalizada que reúne toda la operación en un único sistema y permite seguir ampliándola conforme aparecen nuevas necesidades.',
  funcionalidades: [
    'Gestión centralizada de proyectos hoteleros y SPECs',
    'Administración de proveedores y órdenes de compra',
    'Control de facturación y seguimiento logístico',
    'Gestión de usuarios, trabajadores y permisos',
    'Acceso dedicado para clientes'
  ],
  resultados: [
    'Toda la operación reunida en un único sistema',
    'Información y documentos accesibles desde un solo lugar',
    'Base flexible para incorporar nuevas funciones según evoluciona el negocio'
  ],
  evidencia: [
    { src: 'assets/vaak-proyectos.mp4', cap: 'Panel y portafolio de proyectos', alt: 'Panel de VAAK con proyectos hoteleros y acceso a la creación de proyectos', horizontal: true },
    { src: 'assets/vaak-detalle-proyecto.mp4', cap: 'Detalle de un proyecto hotelero', alt: 'Ficha de proyecto de VAAK con datos generales, áreas y equipo del cliente', horizontal: true },
    { src: 'assets/vaak-usuarios.mp4', cap: 'Gestión de usuarios', alt: 'Listado de usuarios de VAAK con roles, equipos y estados', horizontal: true },
    { src: 'assets/vaak-permisos.mp4', cap: 'Roles y permisos de acceso', alt: 'Formulario de edición de usuario con selección de rol y permisos', horizontal: true },
    { src: 'assets/vaak-objetivos.mp4', cap: 'Objetivos del equipo', alt: 'Panel de objetivos de VAAK con formulario para asignar un objetivo al equipo', horizontal: true }
  ]
}
```
