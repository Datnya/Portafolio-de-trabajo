# Plataforma de gestión para Procurement Hotelero

Este caso se retiró temporalmente de la sección **Trabajo → Plataformas** el 20 de octubre de 2026. Su posición original era después de «Plataforma de gestión para consultoras», como último objeto del array `PROYECTOS` en `sitio.js`.

Para restaurarlo, vuelve a añadir el siguiente objeto en esa posición dentro de `PROYECTOS` y aumenta la versión de `sitio.js` en `index.html` para evitar que se sirva una copia en caché. No tenía portada, logo ni imágenes de evidencia; esos valores se conservan tal como estaban.

```js
{
  id: 'procurement-hotelero', cat: 'platforms', cliente: 'Procurement hotelero', sector: 'Compras y logística hotelera',
  titulo: 'Plataforma de gestión para Procurement Hotelero',
  resultado: 'Proyectos, proveedores, compras, facturación y logística centralizados en una única plataforma.',
  portada: '',
  alt: 'Vista general de la plataforma de gestión para procurement hotelero',
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
  evidencia: []
}
```
