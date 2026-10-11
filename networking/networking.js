(() => {
  'use strict';

  const config = window.contactConfig;
  if (!config) return;

  // Solo se aceptan referencias breves y legibles en URL. Una referencia vacía
  // o inválida equivale al QR general.
  const rawRef = new URLSearchParams(window.location.search).get('ref') || '';
  const ref = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rawRef) && rawRef.length <= 48 ? rawRef : '';

  function track(event) {
    if (window.posthog && typeof window.posthog.capture === 'function') {
      window.posthog.capture(event, ref ? { ref } : {});
    }
  }

  function contactUrl() {
    const url = new URL('/contacto', config.website);
    if (ref) url.searchParams.set('ref', ref);
    return url.href;
  }

  function renderQrCode() {
    const image = document.getElementById('contact-qr');
    if (!image || !ref || typeof window.qrcode !== 'function') return;
    const url = contactUrl();
    try {
      const qr = window.qrcode(0, 'M');
      qr.addData(url);
      qr.make();
      // SVG negro sobre blanco con 4 módulos de margen. El SVG estático del HTML
      // sigue disponible si el script de QR falla o JavaScript está desactivado.
      const svg = qr.createSvgTag({ cellSize: 5, margin: 20, scalable: true });
      image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      image.alt = `Código QR para abrir ${url}`;
    } catch (error) {
      // La imagen estática apunta siempre a /contacto sin referencia.
      image.alt = 'Código QR para abrir datnyamonzon.com/contacto';
    }
  }

  function whatsappUrl() {
    const eventName = ref === 'open-innovation-grow-night' ? 'Open Innovation Grow Night' : 'un evento de networking';
    const message = `Hola Datnya, nos conocimos en ${eventName}. Me gustaría conversar contigo sobre una posible solución para mi empresa.`;
    const digits = config.phone.replace(/\D/g, '');
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  }

  function validExternalUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
    } catch {
      return '';
    }
  }

  const icons = {
    contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 19v-1a5.5 5.5 0 0 1 11 0v1H3.5Z"/><path d="M17 8v6m-3-3h6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.3 7.6L3 21l1.7-5.1a8.5 8.5 0 1 1 15.8-4.2Z"/><path d="M8.4 8.2c-.4.2-1 1.1-.9 1.8.2 1.9 2.7 4.4 4.6 5.1 1.6.6 2.9.4 3.4-.4l-2-1.2-.9 1c-1.5-.7-2.7-1.9-3.3-3.3l.9-.9-1-2.1Z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-13 5h3m-3 3h3"/></svg>',
    portfolio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 10h18m-14-2h.01m3 0h.01m2 9 2-2-2-2"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 20.4h-3.5v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.6H9.4V9h3.4v1.6h.04c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.06 2.06 0 1 1 0-4.1 2.06 2.06 0 0 1 0 4.1zm1.8 13H3.6V9h3.5v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.7C24 .8 23.2 0 22.2 0z"/></svg>'
  };

  function contactActionButton({ label, icon, href, style = '', event, newTab = false, disabled = false, onClick }) {
    const node = document.createElement(disabled ? 'span' : onClick ? 'button' : 'a');
    node.className = `action-button${style ? ` action-button--${style}` : ''}${disabled ? ' action-button--disabled' : ''}`;
    if (onClick) node.type = 'button';
    node.innerHTML = `${icons[icon]}<span class="action-button__label"></span><span class="action-button__arrow" aria-hidden="true">${disabled ? '' : newTab ? '↗' : '→'}</span>`;
    node.querySelector('.action-button__label').textContent = label;
    if (disabled) {
      node.setAttribute('aria-disabled', 'true');
      const hint = document.createElement('small');
      hint.className = 'action-button__hint';
      hint.textContent = 'Disponible próximamente';
      node.querySelector('.action-button__label').append(hint);
    } else {
      if (onClick) node.addEventListener('click', onClick);
      else node.href = href;
      if (newTab && !onClick) {
        node.target = '_blank';
        node.rel = 'noopener noreferrer';
      }
      if (event) node.addEventListener('click', () => track(event));
    }
    return node;
  }

  function renderContactLanding() {
    const actions = document.getElementById('contact-actions');
    if (!actions) return;

    const contactDialog = document.getElementById('contact-dialog');
    const contactName = document.getElementById('contact-display-name');
    const contactSave = document.getElementById('contact-dialog-save');
    const contactClose = document.getElementById('contact-dialog-close');
    contactName.textContent = config.contactDisplayName;
    contactClose.addEventListener('click', () => contactDialog.close());
    contactDialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        contactDialog.close();
      }
    });
    contactSave.addEventListener('click', () => {
      track('networking_contact_save');
      contactDialog.close();
    });

    const whatsApp = whatsappUrl();
    const booking = validExternalUrl(config.bookingUrl);
    const linkedin = validExternalUrl(config.linkedin);

    actions.append(
      contactActionButton({ label: 'Guardar mi contacto', icon: 'contact', style: 'primary', onClick: () => contactDialog.showModal() }),
      contactActionButton({ label: 'Escríbeme por WhatsApp', icon: 'whatsapp', href: whatsApp, style: 'strong', event: 'networking_whatsapp_click', newTab: true }),
      contactActionButton({ label: 'Agendar una reunión de 15 min', icon: 'calendar', href: booking, event: 'networking_booking_click', newTab: true, disabled: !booking }),
      contactActionButton({ label: 'Ver mi portafolio', icon: 'portfolio', href: config.website, event: 'networking_portfolio_click' }),
      contactActionButton({ label: 'Conectar en LinkedIn', icon: 'linkedin', href: linkedin, event: 'networking_linkedin_click', newTab: true, disabled: !linkedin })
    );

    const cta = document.getElementById('networking-cta-link');
    if (cta) {
      cta.href = whatsApp;
      cta.target = '_blank';
      cta.rel = 'noopener noreferrer';
      cta.addEventListener('click', () => track('networking_whatsapp_click'));
    }
    track('networking_contact_view');
  }

  if (document.body.dataset.page === 'tarjeta' && ref) {
    const qrScript = document.createElement('script');
    qrScript.src = '../networking/vendor/qrcode.js';
    qrScript.onload = renderQrCode;
    document.head.append(qrScript);
  }
  if (document.body.dataset.page === 'contacto') renderContactLanding();
})();
