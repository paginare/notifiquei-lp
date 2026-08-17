/**
 * Notifiquei — Cookie Consent (LGPD + GDPR + Google Consent Mode v2)
 * Carrega antes do analytics. Bloqueia rastreamento até consentimento.
 *
 * Fala o idioma da página: tanto a LGPD quanto o GDPR exigem consentimento
 * INFORMADO, e um banner em português numa página em inglês não informa nada —
 * o visitante clica em "Aceitar todos" sem ter lido o que aceitou. O idioma sai
 * do <html lang>, com a URL (/en, /es) como rede de segurança.
 */
(function () {
  var STORAGE_KEY = 'notifiquei_consent';
  var stored = localStorage.getItem(STORAGE_KEY);

  var TEXTOS = {
    'pt-BR': {
      aria: 'Aviso de cookies',
      texto: 'Usamos cookies essenciais para o funcionamento da plataforma e, com seu consentimento,'
        + ' cookies analíticos e de marketing para melhorar sua experiência.'
        + ' Consulte nossa ',
      politica: 'Política de Privacidade',
      href: '/politica-de-privacidade',
      essenciais: 'Apenas essenciais',
      aceitar: 'Aceitar todos'
    },
    en: {
      aria: 'Cookie notice',
      texto: 'We use essential cookies to run the platform and, with your consent,'
        + ' analytics and marketing cookies to improve your experience.'
        + ' See our ',
      politica: 'Privacy Policy',
      href: '/en/privacy-policy',
      essenciais: 'Essential only',
      aceitar: 'Accept all'
    },
    es: {
      aria: 'Aviso de cookies',
      texto: 'Usamos cookies esenciales para el funcionamiento de la plataforma y, con su consentimiento,'
        + ' cookies analíticas y de marketing para mejorar su experiencia.'
        + ' Consulte nuestra ',
      politica: 'Política de Privacidad',
      href: '/es/politica-de-privacidad',
      essenciais: 'Solo esenciales',
      aceitar: 'Aceptar todo'
    }
  };

  function idioma() {
    var lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    if (lang.indexOf('en') === 0) return 'en';
    if (lang.indexOf('es') === 0) return 'es';
    if (lang.indexOf('pt') === 0) return 'pt-BR';
    // sem lang no <html>: cai pra URL
    var p = location.pathname;
    if (p === '/en' || p.indexOf('/en/') === 0) return 'en';
    if (p === '/es' || p.indexOf('/es/') === 0) return 'es';
    return 'pt-BR';
  }

  var t = TEXTOS[idioma()];

  // Expõe o estado de consentimento globalmente
  window.notifiqueiConsent = stored || null;

  // Fila de quem depende de consentimento. Quem quiser ligar algo se registra
  // com nfAoConsentir() e é chamado na hora se o visitante já tinha aceitado.
  var ligar = [];
  var desligar = [];
  window.nfAoConsentir = function (fn) {
    ligar.push(fn);
    if (window.notifiqueiConsent === 'all') { try { fn(); } catch (e) {} }
  };
  window.nfAoRecusar = function (fn) { desligar.push(fn); };

  // --- Google Consent Mode v2 defaults (nega tudo por padrão) ---
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  if (!stored || stored === 'essential') {
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
  } else {
    gtag('consent', 'default', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }

  // --- Injeta CSS ---
  var cssInjetado = false;
  function injetaCss() {
  if (cssInjetado) return;
  cssInjetado = true;
  var style = document.createElement('style');
  style.textContent = [
    '#nf-cookie-banner{',
    'position:fixed;bottom:0;left:0;right:0;z-index:99999;',
    'background:#1A1416;color:#FFF9F3;',
    'padding:20px 28px;',
    'display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;',
    'box-shadow:0 -1px 0 0 rgba(255,31,109,0.3),0 -20px 40px -8px rgba(26,20,22,0.5);',
    'font-family:"Plus Jakarta Sans",system-ui,sans-serif;font-size:14px;line-height:1.5;',
    'transform:translateY(100%);transition:transform .4s cubic-bezier(.2,.8,.2,1);',
    '}',
    '#nf-cookie-banner.visible{transform:translateY(0);}',
    '#nf-cookie-text{flex:1;min-width:240px;max-width:640px;}',
    '#nf-cookie-text p{color:rgba(255,249,243,0.75);margin:0;}',
    '#nf-cookie-text a{color:#FF1F6D;text-decoration:none;border-bottom:1px solid rgba(255,31,109,0.4);}',
    '#nf-cookie-text a:hover{border-color:#FF1F6D;}',
    '#nf-cookie-btns{display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap;}',
    '.nf-btn-accept{background:#FF1F6D;color:white;border:none;padding:11px 22px;border-radius:999px;',
    'font-size:13px;font-weight:700;cursor:pointer;transition:background .2s;letter-spacing:-.005em;',
    'font-family:inherit;}',
    '.nf-btn-accept:hover{background:#C81558;}',
    '.nf-btn-essential{background:transparent;color:rgba(255,249,243,0.6);border:1px solid rgba(255,249,243,0.2);',
    'padding:11px 18px;border-radius:999px;font-size:13px;font-weight:500;cursor:pointer;',
    'transition:all .2s;font-family:inherit;}',
    '.nf-btn-essential:hover{color:#FFF9F3;border-color:rgba(255,249,243,0.5);}',
    '@media(max-width:600px){',
    '#nf-cookie-banner{padding:16px 20px;}',
    '#nf-cookie-btns{width:100%;}',
    '.nf-btn-accept,.nf-btn-essential{flex:1;text-align:center;}',
    '}'
  ].join('');
  document.head.appendChild(style);
  }

  // --- Injeta HTML do banner ---
  function buildBanner() {
    var banner = document.createElement('div');
    banner.id = 'nf-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', t.aria);
    banner.innerHTML = [
      '<div id="nf-cookie-text">',
      '<p>', t.texto,
      '<a href="', t.href, '">', t.politica, '</a>.</p>',
      '</div>',
      '<div id="nf-cookie-btns">',
      '<button class="nf-btn-essential" id="nf-btn-essential">', t.essenciais, '</button>',
      '<button class="nf-btn-accept" id="nf-btn-accept">', t.aceitar, '</button>',
      '</div>'
    ].join('');
    return banner;
  }

  // Cookies de rastreio conhecidos (GA, Clarity, pixel da Meta, PostHog).
  var RASTREIO = /^(_ga|_gid|_gat|_clck|_clsk|_fbp|_fbc|ph_|__ph_)/;

  function limpaCookies() {
    var host = location.hostname;
    var dominios = ['', host, '.' + host];
    var partes = host.split('.');
    if (partes.length > 2) dominios.push('.' + partes.slice(-2).join('.'));

    document.cookie.split(';').forEach(function (c) {
      var nome = c.split('=')[0].trim();
      if (!RASTREIO.test(nome)) return;
      dominios.forEach(function (d) {
        document.cookie = nome + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
          + (d ? '; domain=' + d : '');
      });
    });

    Object.keys(localStorage).forEach(function (k) {
      if (RASTREIO.test(k)) localStorage.removeItem(k);
    });
  }

  // Purga na carga: se o visitante não autorizou, nada de rastreio pode
  // sobreviver no navegador — nem resto de quem já tinha aceitado e voltou
  // atrás, nem cookie de antes deste banner existir. Roda antes de qualquer
  // tag subir, então não há corrida com flush de persistência de ninguém.
  if (stored !== 'all') limpaCookies();

  function setConsent(value) {
    var anterior = window.notifiqueiConsent;
    localStorage.setItem(STORAGE_KEY, value);
    window.notifiqueiConsent = value;

    var granted = value === 'all';
    gtag('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied'
    });

    // Liga (ou desliga) o que não é essencial.
    (granted ? ligar : desligar).forEach(function (fn) {
      try { fn(); } catch (e) {}
    });

    // Esconde banner
    var b = document.getElementById('nf-cookie-banner');
    if (b) {
      b.style.transform = 'translateY(100%)';
      setTimeout(function () { b.remove(); }, 400);
    }

    // Retirou depois de ter aceitado: recarregar. As tags do GTM que já
    // subiram não têm como ser descarregadas — sem o reload elas seguem
    // disparando e a retirada não teria efeito nenhum agora.
    //
    // Quem apaga os cookies é a purga no topo deste arquivo, na carga
    // seguinte. Tentar apagar aqui não funcionava: o posthog.reset() gera um
    // distinct_id novo e o flush de persistência dele regravava o cookie
    // depois da limpeza (medido — o cookie voltava mesmo pós-reload).
    if (!granted && anterior === 'all') {
      setTimeout(function () { location.reload(); }, 450);
    }
  }

  // --- Mostra banner após DOM ready ---
  function show() {
    if (document.getElementById('nf-cookie-banner')) return;
    injetaCss();
    var banner = buildBanner();
    document.body.appendChild(banner);
    // Força reflow antes de adicionar classe para animar entrada
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { banner.classList.add('visible'); });
    });
    document.getElementById('nf-btn-accept').addEventListener('click', function () { setConsent('all'); });
    document.getElementById('nf-btn-essential').addEventListener('click', function () { setConsent('essential'); });
  }

  // Retirar o consentimento tem que ser tão fácil quanto dar (GDPR art. 7(3)).
  // Sem isto, quem clica em "Aceitar todos" fica preso pra sempre — o banner
  // nunca mais aparece. O rodapé chama esta função.
  window.notifiqueiAbrirCookies = function () {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', show);
    } else {
      show();
    }
  };

  // Já respondeu antes: nada de banner, mas o link do rodapé continua valendo.
  if (stored) return;

  window.notifiqueiAbrirCookies();
})();
