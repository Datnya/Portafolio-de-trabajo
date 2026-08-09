/* Portafolio Datnya Monzón — sin runtime, sin dependencias.
   Todo lo que aquí funciona chocaba contra el runtime de Claude Design. */
(function () {
  'use strict';

  var PROYECTOS = [
    {
      id: 'web', cat: 'web', cliente: 'APM Group', sector: 'Consultoría en normas ISO',
      titulo: 'Modernización y automatización de una web corporativa',
      resultado: 'Webinars y auditorías que antes se actualizaban a mano, ahora solos.',
      portada: 'assets/apm-portada.mp4',
      alt: 'Portada del nuevo sitio de APM Group',
      logo: 'assets/apm-logo.jpg',
      tags: ['Web', 'Automatización'],
      reto: 'Una página web desactualizada que no reflejaba la calidad de la empresa y requería constantes actualizaciones manuales.',
      solucion: 'Rediseñé completamente el sitio e incorporé herramientas interactivas y automatizaciones para mejorar la experiencia del usuario y reducir tareas manuales.',
      resultados: ['Imagen mucho más profesional', 'Simulador de auditoría personalizado',
                   'Webinars actualizados automáticamente', 'Diseño optimizado para computadoras y móviles'],
      evidencia: [
        { src: 'assets/apm-portada.mp4', cap: 'Portada rediseñada', alt: 'Portada del nuevo sitio de APM Group con el titular sobre una fotografía de montaña' },
        { src: 'assets/apm-servicios.mp4', cap: 'Servicios, con acceso directo a cada línea', alt: 'Sección de servicios con tarjetas de Consultoría y Auditoría' },
        { src: 'assets/apm-equipo.mp4', cap: 'Equipo, con perfil al pasar el cursor', alt: 'Tarjetas del equipo que revelan el perfil de cada consultor al pasar el cursor' }
      ]
    },
    {
      id: 'software', cat: 'software', cliente: 'Estacionamiento', sector: 'Movilidad urbana',
      titulo: 'Sistema de gestión para estacionamiento',
      resultado: 'El registro en papel pasó a ser digital, con tickets y reportes automáticos.',
      portada: 'assets/GIF estacionamiento pc.gif', alt: 'Demo del sistema de estacionamiento', logo: '', tags: ['Software'],
      reto: 'El estacionamiento registraba manualmente el ingreso y salida de vehículos, lo que ocasionaba pérdida de información y dificultaba el control de los ingresos.',
      solucion: 'Desarrollé una aplicación personalizada para digitalizar todo el proceso de atención, desde el registro de vehículos hasta el control de pagos y reportes.',
      resultados: ['Registro digital de vehículos', 'Tickets automáticos', 'Control de ingresos en tiempo real'],
      evidencia: [
        { src: 'assets/GIF estacionamiento pc.gif', cap: 'Adaptado para PC y dispositivos móviles', alt: 'Vista del sistema en computadora', horizontal: true },
        { src: 'assets/GIF estacionamiento 1.gif', cap: 'Registro de ingreso', alt: 'Muestra del proceso de registro de vehículos' },
        { src: 'assets/GIF estacionamiento 2.gif', cap: 'Gestión de tickets', alt: 'Muestra de la generación y gestión de tickets' },
        { src: 'assets/GIF estacionamiento 3.gif', cap: 'Reportes y control', alt: 'Visualización de reportes de ingresos' }
      ]
    },
    {
      id: 'lavanderia', cat: 'software', cliente: 'Lavandería', sector: 'Servicios de lavado',
      titulo: 'Sistema de gestión para lavandería',
      resultado: 'El cuaderno y los papeles fueron reemplazados por un sistema digital que agilizó toda la operación.',
      portada: '', alt: '', logo: '', tags: ['Software'],
      reto: 'La lavandería registraba todo a mano en un cuaderno: clientes, horarios, peso de la ropa, pagos. Esto consumía demasiado tiempo y generaba acumulación de papeles todos los días, con riesgo constante de perder información.',
      solucion: 'Analicé el flujo de trabajo completo y desarrollé un software accesible desde PC y celular que permite registrar clientes, controlar ventas, dar seguimiento a pedidos en proceso y completados, generar tickets digitales (boletas de venta) y llevar un control detallado de los ingresos.',
      resultados: ['Registro digital de clientes y pedidos', 'Control de ventas e ingresos en tiempo real', 'Tickets digitales (boleta de venta)', 'Seguimiento de pedidos en proceso y realizados', 'Ahorro significativo de tiempo operativo'],
      evidencia: []
    },
    {
      id: 'platforms', cat: 'platforms', cliente: 'Consultora', sector: 'Servicios profesionales',
      titulo: 'Plataforma de gestión para consultoras',
      resultado: 'Clientes, proyectos y consultores centralizados en un solo lugar.',
      portada: 'assets/GIF plataforma.gif', alt: 'Vista general de la plataforma de gestión para consultoras', logo: '', tags: ['Plataforma', 'Gestión'],
      reto: 'La empresa gestionaba múltiples proyectos y consultores desde diferentes ubicaciones, lo que dificultaba conocer el avance real de cada servicio y centralizar toda la información.',
      solucion: 'Desarrollé una plataforma web totalmente personalizada para gestionar clientes, proyectos, consultores y el seguimiento de cada servicio desde un solo lugar y accesible desde cualquier dispositivo.',
      resultados: ['Control centralizado de todos los proyectos', 'Seguimiento en tiempo real'],
      evidencia: [
        { src: 'assets/GIF plataforma.gif', cap: 'Vista general de la plataforma', alt: 'Demostración general de la plataforma de gestión para consultoras', horizontal: true },
        { src: 'assets/GIF plataforma 1.gif', cap: 'Gestión de clientes y proyectos', alt: 'Demostración de la gestión de clientes y proyectos en la plataforma' },
        { src: 'assets/GIF plataforma 2.gif', cap: 'Seguimiento de servicios', alt: 'Demostración del seguimiento de servicios en la plataforma' },
        { src: 'assets/GIF plataforma 3.gif', cap: 'Control y reportes', alt: 'Demostración del control y reportes en la plataforma' }
      ], demoBtn: true
    }
  ];

  var esc = function (t) { var d = document.createElement('div'); d.textContent = t == null ? '' : t; return d.innerHTML; };
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return [].slice.call(document.querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var activo = 'web', filtro = 'todos';

  /* ---------- rejilla ---------- */
  function pintaRejilla() {
    var g = $('#rejilla'); if (!g) return;
    g.innerHTML = PROYECTOS
      .filter(function (p) { return filtro === 'todos' || p.cat === filtro; })
      .map(function (p) {
        var portada = '';
        if (p.portada) {
          if (p.portada.endsWith('.mp4')) {
            portada = '<video src="' + p.portada + '" autoplay muted loop playsinline preload="metadata" aria-label="' + esc(p.alt) + '"></video>';
          } else {
            portada = '<img src="' + p.portada + '" alt="' + esc(p.alt) + '" />';
          }
        } else {
          portada = '<div class="ph"><span>captura pendiente</span></div>';
        }
        return '<a class="card' + (p.id === activo ? ' on' : '') + '" href="#caso" data-id="' + p.id + '">' +
          '<div class="card-cover">' + portada + '</div>' +
          '<p class="card-meta">' + esc(p.cliente) + ' · ' + esc(p.sector) + '</p>' +
          '<h3 class="card-title">' + esc(p.titulo) + '</h3>' +
          '<p class="card-res">' + esc(p.resultado) + '</p>' +
          '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
          '<p class="card-abrir">' + (p.id === activo ? '✓ Caso abierto abajo' : 'Ver el caso →') + '</p>' +
          '</a>';
      }).join('');
    revisaRail();
    reveal();
  }

  /* ---------- caso modal ---------- */
  function pintaCaso() {
    var c = PROYECTOS.filter(function (p) { return p.id === activo; })[0] || PROYECTOS[0];
    var ev = c.evidencia.length
      ? '<div class="ev" style="grid-template-columns: 1fr; margin-top:0;">' + c.evidencia.map(function (e) {
          var isHoriz = e.horizontal;
          var style = isHoriz ? ' style="aspect-ratio:16/9;object-fit:cover;max-height:none;height:auto;"' : '';
          var media = e.src.endsWith('.mp4') 
            ? '<video class="media-zoom" src="' + e.src + '" autoplay muted loop playsinline preload="metadata" aria-label="' + esc(e.alt) + '"' + style + '></video>'
            : '<img class="media-zoom" src="' + e.src + '" alt="' + esc(e.alt) + '"' + style + ' />';
          return '<figure>' + media + '<figcaption>' + esc(e.cap) + '</figcaption></figure>';
        }).join('') + '</div>'
      : '<div class="ev-none" style="margin-top:0;"><span>capturas de este proyecto · pendientes</span></div>';
    $('#casoCuerpo').innerHTML =
      '<div class="case-layout">' +
        '<div class="case-left">' +
          '<div class="case-top">' + (c.logo ? '<img src="' + c.logo + '" alt="' + esc(c.cliente) + '" />' : '') +
            '<p class="eyebrow">' + esc(c.cliente) + ' · ' + esc(c.sector) + '</p></div>' +
          '<h3 class="case-h" style="max-width:none;">' + esc(c.titulo) + '</h3>' +
          '<div class="box"><h4>El reto</h4><p>' + esc(c.reto) + '</p></div>' +
          '<div class="box"><h4>La solución</h4><p>' + esc(c.solucion) + '</p></div>' +
          '<div class="res" style="margin-top:0;"><h4 class="eyebrow">El resultado</h4><div class="res-list">' +
            c.resultados.map(function (t) { return '<p class="res-item"><i>→</i>' + esc(t) + '</p>'; }).join('') +
          '</div></div>' +
          (c.demoBtn ? '<a href="#demo" class="btn-demo" onclick="document.getElementById(\'casoClose\').click()">Ver video demostrativo de la plataforma</a>' : '') +
        '</div>' +
        '<div class="case-right">' + ev + '</div>' +
      '</div>';
    
    var modal = $('#casoModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function cerrarCaso() {
    var modal = $('#casoModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }


  /* ---------- servicios ----------
     El copy va en clave de problema, no de característica: quien contrata
     reconoce primero su dolor y después el nombre del servicio. */
  var SERVICIOS = [
    {
      id: 'web', pill: 'Páginas web', eyebrow: 'Páginas web',
      titulo: 'Sitios que no envejecen',
      desc: 'Rediseño el sitio completo y automatizo lo que hoy actualizas a mano —webinars, contenidos, formularios—. Deja de necesitarte cada semana.',
      media: 'assets/apm-portada.mp4',
      tag: 'APM Group · Normas ISO',
      incluye: [
        ['Diseño y desarrollo', 'desde cero'],
        ['Automatizaciones', 'contenido que se actualiza solo'],
        ['Adaptado a móvil', 'computadora y teléfono']
      ],
      caso: 'web', casoLabel: 'Ver el caso de APM Group'
    },
    {
      id: 'software', pill: 'Software adaptado', eyebrow: 'Software adaptado',
      titulo: 'El proceso ya existe',
      desc: 'No te pido cambiar cómo trabajas: construyo el sistema alrededor de tu proceso y digitalizo justo donde hoy se pierde la información.',
      media: 'assets/GIF estacionamiento pc.gif', tag: 'Estacionamiento · Movilidad',
      incluye: [
        ['Registro digital', 'se acabó el papel'],
        ['Documentos automáticos', 'tickets y comprobantes'],
        ['Control en tiempo real', 'ingresos y movimientos']
      ],
      caso: 'software', casoLabel: 'Ver el caso del estacionamiento'
    },
    {
      id: 'platforms', pill: 'Plataformas', eyebrow: 'Plataformas digitales',
      titulo: 'Todo en un solo lugar',
      desc: 'Clientes, proyectos y equipo dejan de vivir en hojas sueltas y cadenas de correo. Una plataforma a tu medida, abierta desde donde estés.',
      media: 'assets/GIF plataforma.gif', tag: 'Consultora · Servicios profesionales',
      incluye: [
        ['Gestión centralizada', 'clientes y proyectos'],
        ['Seguimiento en vivo', 'avance de cada servicio'],
        ['Acceso multiusuario', 'desde cualquier dispositivo']
      ],
      caso: 'platforms', casoLabel: 'Ver el caso de la consultora', demoBtn: true
    }
  ];

  var svcActivo = 'web';

  function pintaServicio() {
    var v = SERVICIOS.filter(function (x) { return x.id === svcActivo; })[0];
    var media = $('#svcMedia'), cuerpo = $('#svcBody'), tag = $('#svcTag'), sw = $('#svcSwitch');
    if (!media || !cuerpo) return;

    media.className = 'svc-media ' + (v.media ? 'con-video' : 'sin-video');
    media.innerHTML = v.media
      ? (v.media.endsWith('.mp4') 
          ? '<video class="media-zoom" src="' + v.media + '" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>'
          : '<img class="media-zoom" src="' + v.media + '" aria-hidden="true" />')
      : '<p class="svc-word">' + esc(v.titulo) + '</p>';
    tag.textContent = v.tag;

    cuerpo.innerHTML =
      '<p class="eyebrow">' + esc(v.eyebrow) + '</p>' +
      '<h3>' + esc(v.titulo) + '</h3>' +
      '<p class="svc-desc">' + esc(v.desc) + '</p>' +
      '<ul class="svc-list">' + v.incluye.map(function (i) {
        return '<li><b>' + esc(i[0]) + '</b><em>' + esc(i[1]) + '</em></li>';
      }).join('') + '</ul>' +
      '<div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;margin-top:2rem">' +
        '<a class="svc-prueba" style="margin-top:0" href="#caso" data-caso="' + v.caso + '">' + esc(v.casoLabel) + ' →</a>' +
        (v.demoBtn ? '<a class="btn-demo" style="margin-top:0" href="#demo">Ver video demostrativo de la plataforma</a>' : '') +
      '</div>';

    sw.innerHTML = SERVICIOS.map(function (x) {
      return '<button type="button" role="tab" class="svc-pill' + (x.id === svcActivo ? ' on' : '') +
             '" data-svc="' + x.id + '" aria-selected="' + (x.id === svcActivo) + '">' + esc(x.pill) + '</button>';
    }).join('');

    /* reinicia la entrada para que el cambio se note */
    [media, cuerpo].forEach(function (el) { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
  }


  /* ---------- nav plegable ----------
     Se pliega al bajar y se despliega al subir o al pulsarlo. La anchura
     desplegada se mide, porque width:auto no es animable. */
  var navEl = $('#nav'), plegado = false, yPrevio = 0, yAlPlegar = 0, anchoAbierto = 0;
  var BAJAR_PARA_PLEGAR = 150, SUBIR_PARA_ABRIR = 80;

  function mideNav() {
    if (!navEl) return;
    var era = navEl.classList.contains('mini');
    navEl.classList.remove('mini');
    navEl.style.width = 'auto';
    anchoAbierto = Math.ceil(navEl.getBoundingClientRect().width);
    navEl.style.width = anchoAbierto + 'px';
    if (era) navEl.classList.add('mini');
  }

  function pliega(v) {
    if (!navEl || v === plegado) return;
    plegado = v;
    navEl.classList.toggle('mini', v);
    var b = navEl.querySelector('.nav-mini');
    if (b) b.setAttribute('aria-expanded', String(!v));
  }

  function revisaNav() {
    if (!navEl) return;
    var y = window.pageYOffset;
    if (!plegado && y > yPrevio && y > BAJAR_PARA_PLEGAR) { pliega(true); yAlPlegar = y; }
    else if (plegado) {
      /* Se sigue el punto MÁS profundo alcanzado; si no, tras bajar mucho habría
         que volver casi al punto de plegado para recuperar el nav. */
      if (y > yAlPlegar) yAlPlegar = y;
      else if (yAlPlegar - y > SUBIR_PARA_ABRIR) pliega(false);
    }
    if (y <= BAJAR_PARA_PLEGAR) pliega(false);
    yPrevio = y;
  }

  /* ---------- carril ---------- */
  function revisaRail() {
    var g = $('#rejilla'), r = $('.rail'); if (!g || !r) return;
    var hay = g.scrollWidth > g.clientWidth + 4;
    r.style.display = hay ? 'flex' : 'none';
    var b = r.querySelectorAll('.rail-btn');
    if (b[0]) b[0].disabled = g.scrollLeft <= 2;
    if (b[1]) b[1].disabled = g.scrollLeft >= g.scrollWidth - g.clientWidth - 2;
  }

  /* ---------- aparición al hacer scroll ---------- */
  var io = null;
  function reveal() {
    if (reduce) return;
    if (!io) {
      io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } });
      }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    }
    $$('.svc-body,.card,.stats-grid>div,.ct-card,.head,.fbox,.box,.res,.ev figure,.met-grid,.demo-layout,.met-card').forEach(function (el) {
      if (!el.classList.contains('rv')) { el.classList.add('rv'); io.observe(el); }
    });
  }

  /* ---------- nav: seguimiento ---------- */
  function marcaNav() {
    var enlaces = $$('.nav-links a[href^="#"]');
    if (!enlaces.length) return;
    var y = window.pageYOffset + 140, act = 0;
    enlaces.forEach(function (a, i) {
      var d = document.getElementById(a.getAttribute('href').slice(1));
      if (d && d.getBoundingClientRect().top + window.pageYOffset <= y) act = i;
    });
    if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 4) act = enlaces.length - 1;
    enlaces.forEach(function (a, i) { a.classList.toggle('on', i === act); });
  }

  /* ---------- eventos ---------- */
  document.addEventListener('click', function (e) {
    var t;
    if (plegado && e.target.closest('#nav')) { e.preventDefault(); pliega(false); yAlPlegar = 0; return; }
    if ((t = e.target.closest('.card'))) {
      e.preventDefault(); activo = t.dataset.id; pintaRejilla(); pintaCaso();
      return;
    }
    if ((t = e.target.closest('.filter'))) {
      filtro = t.dataset.f;
      $$('.filter').forEach(function (b) { b.classList.toggle('on', b === t); });
      pintaRejilla(); return;
    }
    if ((t = e.target.closest('.filtog'))) {
      var mas = $('.filmore'), ab = mas.style.display === 'inline-flex';
      mas.style.display = ab ? 'none' : 'inline-flex';
      t.textContent = ab ? '+' : '–';
      t.setAttribute('aria-expanded', ab ? 'false' : 'true'); return;
    }
    if ((t = e.target.closest('.svc-pill'))) {
      svcActivo = t.dataset.svc; pintaServicio(); return;
    }
    if ((t = e.target.closest('.svc-prueba'))) {
      e.preventDefault();
      activo = t.dataset.caso; filtro = 'todos';
      $$('.filter').forEach(function (b) { b.classList.toggle('on', b.dataset.f === 'todos'); });
      pintaRejilla(); pintaCaso();
      return;
    }
    if ((t = e.target.closest('.rail-btn'))) {
      var g = $('#rejilla'), c = g.querySelector('.card');
      var paso = (c ? c.getBoundingClientRect().width : 300) + 28;
      g.scrollBy({ left: paso * (+t.dataset.dir), behavior: reduce ? 'auto' : 'smooth' });
      setTimeout(revisaRail, 420); return;
    }
    
    /* Cerrar modal de caso */
    if (e.target.closest('#casoClose') || e.target === $('#casoModal')) {
      cerrarCaso();
      return;
    }

    /* Abrir Lightbox */
    var imgZoom = e.target.closest('.media-zoom') || (e.target.tagName === 'IMG' && e.target.closest('.card-cover, .hero-photo')) || (e.target.tagName === 'VIDEO' && e.target.closest('.card-cover, .hero-photo'));
    if (imgZoom) {
      e.preventDefault();
      var lb = $('#lightbox');
      var lbC = $('#lightboxContent');
      if (lb && lbC) {
        if (imgZoom.tagName === 'VIDEO') {
          lbC.innerHTML = '<video src="' + imgZoom.getAttribute('src') + '" autoplay muted loop playsinline></video>';
        } else {
          lbC.innerHTML = '<img src="' + imgZoom.getAttribute('src') + '" />';
        }
        lb.classList.add('open');
      }
      return;
    }

    /* Cerrar Lightbox */
    var lb = $('#lightbox');
    if (lb && lb.classList.contains('open')) {
      if (e.target.closest('.lightbox-close') || e.target === lb) {
        lb.classList.remove('open');
        $('#lightboxContent').innerHTML = '';
      }
      return;
    }
  });

  var ult = 0;
  function alScroll() { var n = performance.now(); if (n - ult < 50) return; ult = n; marcaNav(); revisaNav(); }
  window.addEventListener('scroll', alScroll, { passive: true });
  window.addEventListener('resize', function () { mideNav(); marcaNav(); revisaRail(); }, { passive: true });
  var yTic = -1;
  setInterval(function () { if (window.pageYOffset !== yTic) { yTic = window.pageYOffset; marcaNav(); revisaNav(); } }, 140);
  var rj = $('#rejilla'); if (rj) rj.addEventListener('scroll', revisaRail, { passive: true });

  /* ---------- arranque ---------- */
  pintaRejilla(); pintaServicio(); mideNav(); marcaNav();
  document.documentElement.classList.add('anim');
  reveal();
  [200, 800].forEach(function (d) { setTimeout(function () { reveal(); revisaRail(); marcaNav(); }, d); });
})();
