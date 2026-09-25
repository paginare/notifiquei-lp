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

  // Regime estampado pela função de borda (functions/_middleware.js):
  //   'previo' → Europa, Reino Unido, Suíça e país desconhecido: nada carrega
  //              antes do aceite, como manda a ePrivacy/GDPR.
  //   'aberto' → Brasil e demais países: análise e marketing já valem, e a
  //              pessoa pode bloquear pelo aviso, com confirmação.
  var REGIME = document.documentElement.getAttribute('data-consent') === 'aberto' ? 'aberto' : 'previo';
  var liberadoPorPadrao = REGIME === 'aberto' && !stored;

  var TEXTOS = {
    'pt-BR': {
      aria: 'Aviso de cookies',
      texto: 'Cookies essenciais e, com seu aceite, de análise e marketing. Detalhes na ',
      politica: 'Política de Privacidade',
      href: '/politica-de-privacidade',
      essenciais: 'Apenas essenciais',
      aceitar: 'Aceitar todos',
      abertoTexto: 'Usamos cookies de análise e marketing para entender o uso do site. Detalhes na ',
      bloquear: 'Bloquear',
      confirmaTexto: 'Bloquear os cookies de análise e marketing? A página será recarregada.',
      confirmaSim: 'Sim, bloquear',
      confirmaNao: 'Manter'
    },
    en: {
      aria: 'Cookie notice',
      texto: 'Essential cookies and, with your consent, analytics and marketing ones. Details in our ',
      politica: 'Privacy Policy',
      href: '/en/privacy-policy',
      essenciais: 'Essential only',
      aceitar: 'Accept all',
      abertoTexto: 'We use analytics and marketing cookies to understand how the site is used. Details in our ',
      bloquear: 'Block',
      confirmaTexto: 'Block analytics and marketing cookies? The page will reload.',
      confirmaSim: 'Yes, block',
      confirmaNao: 'Keep'
    },
    es: {
      aria: 'Aviso de cookies',
      texto: 'Cookies esenciales y, con su aceptación, de análisis y marketing. Detalles en la ',
      politica: 'Política de Privacidad',
      href: '/es/politica-de-privacidad',
      essenciais: 'Solo esenciales',
      aceitar: 'Aceptar todo',
      abertoTexto: 'Usamos cookies de análisis y marketing para entender el uso del sitio. Detalles en la ',
      bloquear: 'Bloquear',
      confirmaTexto: '¿Bloquear las cookies de análisis y marketing? La página se recargará.',
      confirmaSim: 'Sí, bloquear',
      confirmaNao: 'Mantener'
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
  window.notifiqueiConsent = stored || (liberadoPorPadrao ? 'all' : null);

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
  if (window.notifiqueiConsent !== 'all') {
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
    // Compacto no celular de propósito: o aviso tapava metade da primeira tela, que é
    // onde metade das pessoas decide — e é ele que libera toda a medição do site.
    '#nf-cookie-banner{padding:10px 14px;gap:8px;font-size:11.5px;line-height:1.4;}',
    '#nf-cookie-btns{width:100%;}',
    '.nf-btn-accept,.nf-btn-essential{padding:7px 14px;font-size:12px;}',
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
      '<p>', REGIME === 'aberto' ? t.abertoTexto : t.texto,
      '<a href="', t.href, '">', t.politica, '</a>.</p>',
      '</div>',
      '<div id="nf-cookie-btns">',
      '<button class="nf-btn-essential" id="nf-btn-essential">' + (REGIME === 'aberto' ? t.bloquear : t.essenciais) + '</button>',
      '<button class="nf-btn-accept" id="nf-btn-accept">' + (REGIME === 'aberto' ? t.confirmaNao : t.aceitar) + '</button>',
      '</div>'
    ].join('');
    return banner;
  }

  // Cookies de rastreio conhecidos (GA, Clarity, pixel da Meta, PostHog).
  var RASTREIO = /^(_ga|_gid|_gat|_clck|_clsk|_fbp|_fbc|_fbi|nf_eid|ph_|__ph_)/;

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
  if (window.notifiqueiConsent !== 'all') limpaCookies();

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
    var aceitar = document.getElementById('nf-btn-accept');
    var recusar = document.getElementById('nf-btn-essential');
    if (aceitar) aceitar.addEventListener('click', function () { setConsent('all'); });
    if (recusar) {
      recusar.addEventListener('click', function () {
        // No regime aberto, bloquear pede confirmação: um clique só não desliga.
        if (REGIME !== 'aberto') return setConsent('essential');
        if (recusar.getAttribute('data-confirmando') === '1') return setConsent('essential');
        recusar.setAttribute('data-confirmando', '1');
        recusar.textContent = t.confirmaSim;
        var texto = banner.querySelector('#nf-cookie-text p');
        if (texto) texto.textContent = t.confirmaTexto;
        if (aceitar) aceitar.textContent = t.confirmaNao;
      });
    }
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

  // Regime aberto: o aviso informa e oferece o bloqueio. Some sozinho depois de
  // um tempo (a menos que a pessoa esteja no meio da confirmação); o link do
  // rodapé segue abrindo quando ela quiser.
  if (REGIME === 'aberto') {
    // Landings de tráfego pago (/comece/*): sem o aviso, a pedido do dono — no
    // regime aberto o rastreamento já vale por padrão e o aviso cobria a demo do
    // hero no celular. A política segue linkada no rodapé. Regime prévio (UE)
    // continua mostrando o banner em qualquer página.
    if (location.pathname.indexOf('/comece/') === 0) return;
    window.notifiqueiAbrirCookies();
    setTimeout(function () {
      var b = document.getElementById('nf-cookie-banner');
      if (b && !b.querySelector('[data-confirmando="1"]')) {
        b.style.transform = 'translateY(100%)';
        setTimeout(function () { if (b.parentNode) b.remove(); }, 400);
      }
    }, 12000);
    return;
  }

  window.notifiqueiAbrirCookies();
})();
