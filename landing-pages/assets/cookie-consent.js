/**
 * Notifiquei — Cookie Consent (LGPD + Google Consent Mode v2)
 * Carrega antes do analytics. Bloqueia rastreamento até consentimento.
 */
(function () {
  var STORAGE_KEY = 'notifiquei_consent';
  var stored = localStorage.getItem(STORAGE_KEY);

  // Expõe o estado de consentimento globalmente
  window.notifiqueiConsent = stored || null;

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

  // Se já tem resposta, não mostra banner
  if (stored) return;

  // --- Injeta CSS ---
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

  // --- Injeta HTML do banner ---
  function buildBanner() {
    var banner = document.createElement('div');
    banner.id = 'nf-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML = [
      '<div id="nf-cookie-text">',
      '<p>Usamos cookies essenciais para o funcionamento da plataforma e, com seu consentimento,',
      ' cookies analíticos e de marketing para melhorar sua experiência.',
      ' Consulte nossa <a href="/politica-de-privacidade">Política de Privacidade</a>.</p>',
      '</div>',
      '<div id="nf-cookie-btns">',
      '<button class="nf-btn-essential" id="nf-btn-essential">Apenas essenciais</button>',
      '<button class="nf-btn-accept" id="nf-btn-accept">Aceitar todos</button>',
      '</div>'
    ].join('');
    return banner;
  }

  function setConsent(value) {
    localStorage.setItem(STORAGE_KEY, value);
    window.notifiqueiConsent = value;

    var granted = value === 'all';
    gtag('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied'
    });

    // Dispara analytics se aceito e função de init existir
    if (granted && typeof window._nfInitAnalytics === 'function') {
      window._nfInitAnalytics();
    }

    // Esconde banner
    var b = document.getElementById('nf-cookie-banner');
    if (b) {
      b.style.transform = 'translateY(100%)';
      setTimeout(function () { b.remove(); }, 400);
    }
  }

  // --- Mostra banner após DOM ready ---
  function show() {
    var banner = buildBanner();
    document.body.appendChild(banner);
    // Força reflow antes de adicionar classe para animar entrada
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { banner.classList.add('visible'); });
    });
    document.getElementById('nf-btn-accept').addEventListener('click', function () { setConsent('all'); });
    document.getElementById('nf-btn-essential').addEventListener('click', function () { setConsent('essential'); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', show);
  } else {
    show();
  }
})();
