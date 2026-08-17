#!/usr/bin/env node
/**
 * Gera as versões EN/ES das três páginas jurídicas a partir do template PT.
 *
 * Por que um gerador e não seis arquivos escritos à mão: as páginas jurídicas
 * são HTML estático solto em public/ (não passam pelo Astro), então o <head>,
 * o SVG do logo, a nav e o rodapé são ~200 linhas de boilerplate idênticas.
 * Copiar isso à mão garante que uma mudança de rodapé conserte só uma das seis.
 * Aqui o PT é a fonte da verdade do CHROME; só o miolo (<main>) é traduzido,
 * e vive em scripts/legais/{en,es}/*.html.
 *
 * Também escreve os hreflang nos três arquivos PT — hreflang precisa ser
 * recíproco (A aponta pra B e B aponta pra A) ou o Google ignora o conjunto
 * inteiro e as páginas competem entre si.
 *
 * Rodar:  node scripts/legais/gerar.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, "..", "..");
const PUB = join(RAIZ, "public");
const SITE = "https://notifiquei.com.br";

/** Os três documentos e o slug de cada um em cada idioma. */
const DOCS = [
  {
    id: "termos-de-uso",
    slug: { "pt-BR": "termos-de-uso", en: "en/terms-of-use", es: "es/terminos-de-uso" },
    title: {
      en: "Terms of Use — Notifiquei",
      es: "Términos de Uso — Notifiquei",
    },
    desc: {
      en: "Terms of use for the Notifiquei platform.",
      es: "Términos de uso de la plataforma Notifiquei.",
    },
  },
  {
    id: "politica-de-privacidade",
    slug: { "pt-BR": "politica-de-privacidade", en: "en/privacy-policy", es: "es/politica-de-privacidad" },
    title: {
      en: "Privacy Policy — Notifiquei",
      es: "Política de Privacidad — Notifiquei",
    },
    desc: {
      en: "How Notifiquei collects, uses and protects personal data.",
      es: "Cómo Notifiquei recopila, usa y protege los datos personales.",
    },
  },
  {
    id: "dpa",
    slug: { "pt-BR": "dpa", en: "en/dpa", es: "es/dpa" },
    title: {
      en: "Data Processing Agreement (DPA) — Notifiquei",
      es: "Acuerdo de Tratamiento de Datos (DPA) — Notifiquei",
    },
    desc: {
      en: "Data Processing Agreement between Notifiquei and its customers (LGPD Art. 39 · GDPR Art. 28).",
      es: "Acuerdo de Tratamiento de Datos entre Notifiquei y sus clientes (LGPD Art. 39 · RGPD Art. 28).",
    },
  },
];

/** Textos da nav e do rodapé, por idioma. */
const CHROME = {
  en: {
    home: "/en",
    creators: "/en/creators",
    voltar: "Back to home",
    entrar: "Log in",
    planos: "See plans →",
    tag: "Instagram sales automation on Meta's official API. Built in Brazil, running worldwide.",
    colProduto: "Product",
    colNotifiquei: "Notifiquei",
    colContato: "Contact",
    como: "How it works",
    features: "Features",
    planosLink: "Pricing",
    faq: "FAQ",
    criadores: "For creators",
    termos: "Terms of use",
    privacidade: "Privacy",
    dpa: "Data agreement (DPA)",
    copy: "© 2026 Notifiquei. All rights reserved. &nbsp;·&nbsp; CNPJ 59.859.848/0001-13",
    sistemas: "All systems operational",
    parceiro: "Official Meta Partner",
  },
  es: {
    home: "/es",
    creators: "/es/creadores",
    voltar: "Volver al inicio",
    entrar: "Entrar",
    planos: "Ver planes →",
    tag: "Automatización de ventas en Instagram con la API oficial de Meta. Hecho en Brasil, funcionando en todo el mundo.",
    colProduto: "Producto",
    colNotifiquei: "Notifiquei",
    colContato: "Contacto",
    como: "Cómo funciona",
    features: "Funcionalidades",
    planosLink: "Planes",
    faq: "Preguntas",
    criadores: "Para creadores",
    termos: "Términos de uso",
    privacidade: "Privacidad",
    dpa: "Acuerdo de datos (DPA)",
    copy: "© 2026 Notifiquei. Todos los derechos reservados. &nbsp;·&nbsp; CNPJ 59.859.848/0001-13",
    sistemas: "Todos los sistemas operativos",
    parceiro: "Socio oficial de Meta",
  },
};

/** CSS do bloco de aviso — existe só no dpa.html; termos e política precisam receber. */
const CSS_CONSENT = `  .consent-block {
    background: var(--brand-light);
    border: 1.5px solid rgba(255,31,109,0.2);
    border-radius: 16px;
    padding: 24px 28px;
    margin-bottom: 48px;
    display: flex; align-items: flex-start; gap: 16px;
  }
  .consent-block .consent-icon { font-size: 24px; flex-shrink: 0; line-height: 1; }
  .consent-block p { font-size: 14px; color: var(--ink-soft); line-height: 1.6; }
  .consent-block strong { color: var(--ink); }
`;

/**
 * Botão de retirar consentimento no rodapé. Estas páginas têm rodapé próprio
 * (não passam pelo Footer.astro), e quem chega nelas direto da busca ficaria
 * sem como voltar atrás — que é justamente o que o GDPR 7(3) exige.
 */
const BOTAO_COOKIES = {
  "pt-BR": "Preferências de cookies",
  en: "Cookie preferences",
  es: "Preferencias de cookies",
};
const ANCORA_BADGE = '<span class="foot-bottom-badge"><span class="badge-dot"></span>';

const RE_BOTAO = /<button type="button" data-abrir-cookies[\s\S]*?<\/button>\s*/g;
const RE_SCRIPT = /<script>document\.querySelector\('\[data-abrir-cookies\]'\)[\s\S]*?<\/script>\n?/g;

function comBotaoCookies(html, lang) {
  // Remover antes de injetar, em vez de "já tem, pula": o PT é lido como
  // template das traduções, e na segunda rodada do gerador ele já vinha com o
  // botão — as versões EN e ES herdavam o rótulo em português.
  html = html.replace(RE_BOTAO, "").replace(RE_SCRIPT, "");
  if (!html.includes(ANCORA_BADGE)) throw new Error("rodapé sem o badge de status");
  const botao =
    '<button type="button" data-abrir-cookies style="background:none;border:0;padding:0;'
    + "font:inherit;font-size:inherit;color:inherit;opacity:.75;cursor:pointer;"
    + 'text-decoration:underline;text-underline-offset:3px">'
    + BOTAO_COOKIES[lang]
    + "</button>\n        ";
  const script =
    "<script>document.querySelector('[data-abrir-cookies]')"
    + ".addEventListener('click',function(){"
    + "if(typeof window.notifiqueiAbrirCookies==='function')window.notifiqueiAbrirCookies();});"
    + "</script>\n</body>";
  return html.replace(ANCORA_BADGE, botao + ANCORA_BADGE).replace("</body>", script);
}

/** slug de outro documento no mesmo idioma (pros links cruzados do rodapé). */
function slugDe(id, lang) {
  const d = DOCS.find((x) => x.id === id);
  if (!d) throw new Error(`documento desconhecido: ${id}`);
  return d.slug[lang];
}

/**
 * ?v= com o hash do cookie-consent.js. Mesmo motivo do src/lib/versao-asset.ts:
 * a Cloudflare serviu a versão antiga do script por 42 min junto com o HTML
 * novo, e o rastreamento parou de subir até pra quem aceitava. Conteúdo novo
 * tem que virar URL nova.
 */
const VERSAO_CONSENT = createHash("sha1")
  .update(readFileSync(join(PUB, "assets", "cookie-consent.js")))
  .digest("hex")
  .slice(0, 10);

function comVersaoDoConsent(html) {
  return html.replace(
    /src="\/assets\/cookie-consent\.js(\?v=[a-f0-9]+)?"/g,
    `src="/assets/cookie-consent.js?v=${VERSAO_CONSENT}"`,
  );
}

/**
 * Prende o GTM ao consentimento, igual ao Gtm.astro.
 *
 * Estas páginas traziam o snippet cru do GTM no topo do <head> — e, pior,
 * ANTES do cookie-consent.js, então nem os defaults do Consent Mode chegavam
 * a tempo. Medido: 11 requisições e 3 cookies (_clck, _clsk, _fbp) antes de o
 * visitante responder qualquer coisa.
 */
const RE_GTM_CRU = /<!-- Google Tag Manager -->\n<script>\(function\(w,d,s,l,i\)[\s\S]*?<!-- End Google Tag Manager -->\n/;
const RE_GTM_NOSCRIPT = /<!-- Google Tag Manager \(noscript\) -->\n<noscript>[\s\S]*?<!-- End Google Tag Manager \(noscript\) -->\n/;
const MARCA_GTM = "<!-- GTM preso ao consentimento -->";

const GTM_GATED = `${MARCA_GTM}
<script>(function(){var c=false;function carrega(){if(c)return;c=true;
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-577WSF49');}
if(typeof window.nfAoConsentir==='function')window.nfAoConsentir(carrega);})();</script>
`;

function comGtmPresoAoConsentimento(html) {
  let out = html.replace(RE_GTM_CRU, "").replace(RE_GTM_NOSCRIPT, "");
  // o <noscript> some de vez: é pixel que dispara sem passar pelo Consent Mode
  // e sem como ser bloqueado, justamente porque não há JS pra perguntar nada.
  out = out.replace(new RegExp(`${MARCA_GTM}[\\s\\S]*?<\\/script>\\n`), "");
  const tagConsent = out.match(/<script src="\/assets\/cookie-consent\.js[^"]*"><\/script>\n/);
  if (!tagConsent) throw new Error("não achei a tag do cookie-consent.js");
  return out.replace(tagConsent[0], tagConsent[0] + GTM_GATED);
}

const MARCA_INICIO = "<!-- hreflang:início -->";
const MARCA_FIM = "<!-- hreflang:fim -->";

function blocoHreflang(doc) {
  const linha = (l) => `<link rel="alternate" hreflang="${l}" href="${SITE}/${doc.slug[l]}">`;
  return [
    MARCA_INICIO,
    linha("pt-BR"),
    linha("en"),
    linha("es"),
    `<link rel="alternate" hreflang="x-default" href="${SITE}/${doc.slug["pt-BR"]}">`,
    MARCA_FIM,
  ].join("\n");
}

/** Idempotente: tira o bloco antigo antes de escrever o novo. */
function comHreflang(html, doc) {
  const limpo = html.replace(
    new RegExp(`${MARCA_INICIO}[\\s\\S]*?${MARCA_FIM}\\n?`, "g"),
    "",
  );
  const canonical = limpo.match(/<link rel="canonical"[^>]*>/);
  if (!canonical) throw new Error(`sem <link rel="canonical"> em ${doc.id}`);
  return limpo.replace(canonical[0], `${canonical[0]}\n${blocoHreflang(doc)}`);
}

function trocaUm(html, de, para, onde) {
  if (!html.includes(de)) throw new Error(`string não encontrada em ${onde}: ${de.slice(0, 70)}`);
  return html.split(de).join(para);
}

function traduzir(htmlPt, doc, lang) {
  const c = CHROME[lang];
  const fatia = readFileSync(join(AQUI, lang, `${doc.id}.html`), "utf8").trimEnd();

  // 1. miolo
  const ini = htmlPt.indexOf("<main>");
  const fim = htmlPt.indexOf("</main>") + "</main>".length;
  if (ini < 0 || fim < 7) throw new Error(`sem <main> em ${doc.id}`);
  let out = htmlPt.slice(0, ini) + fatia + htmlPt.slice(fim);

  // 2. cabeça
  out = trocaUm(out, '<html lang="pt-BR">', `<html lang="${lang}">`, doc.id);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${doc.title[lang]}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${doc.desc[lang]}">`,
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${SITE}/${doc.slug[lang]}">`,
  );
  out = comHreflang(out, doc);

  // Favicons são relativos no PT ("assets/…"). Da raiz funcionam; de /en/ viram
  // /en/assets/… e dão 404. Absolutiza.
  out = out.split('href="assets/').join('href="/assets/');

  // 3. nav
  out = trocaUm(out, '<a href="/" style="display: inline-flex;', `<a href="${c.home}" style="display: inline-flex;`, doc.id);
  out = trocaUm(out, 'class="nav-login">Entrar<', `class="nav-login">${c.entrar}<`, doc.id);
  out = trocaUm(out, 'class="btn-brand">Ver planos →<', `class="btn-brand">${c.planos}<`, doc.id);

  // 4. rodapé
  out = trocaUm(out, '<a href="/" class="foot-brand">', `<a href="${c.home}" class="foot-brand">`, doc.id);
  out = trocaUm(
    out,
    "Automação de vendas no Instagram com a API oficial da Meta. Feito no Brasil, pra quem vende em português.",
    c.tag,
    doc.id,
  );
  out = trocaUm(out, '>Produto</p>', `>${c.colProduto}</p>`, doc.id);
  out = trocaUm(out, '>Contato</p>', `>${c.colContato}</p>`, doc.id);
  // a coluna do meio muda de rótulo entre os arquivos (Notifiquei / Legal)
  if (out.includes(">Notifiquei</p>")) out = out.split(">Notifiquei</p>").join(`>${c.colNotifiquei}</p>`);
  if (out.includes("<h2>Legal</h2>")) out = out.split("<h2>Legal</h2>").join("<h2>Legal</h2>");

  const links = [
    ['href="/#como">Como funciona<', `href="${c.home}#como">${c.como}<`],
    ['href="/#features">Funcionalidades<', `href="${c.home}#features">${c.features}<`],
    ['href="/#planos">Planos<', `href="${c.home}#planos">${c.planosLink}<`],
    ['href="/#faq">Dúvidas<', `href="${c.home}#faq">${c.faq}<`],
    ['href="/criadores">Pra criadores<', `href="${c.creators}">${c.criadores}<`],
    ['href="/termos-de-uso">Termos de uso<', `href="/${slugDe("termos-de-uso", lang)}">${c.termos}<`],
    ['href="/politica-de-privacidade">Privacidade<', `href="/${slugDe("politica-de-privacidade", lang)}">${c.privacidade}<`],
    ['href="/dpa">Acordo de dados (DPA)<', `href="/${slugDe("dpa", lang)}">${c.dpa}<`],
  ];
  for (const [de, para] of links) if (out.includes(de)) out = out.split(de).join(para);

  // o link "/#planos" da nav já foi trocado acima; sobra o do rodapé se houver
  out = out.split('href="/#planos"').join(`href="${c.home}#planos"`);

  out = trocaUm(
    out,
    "© 2026 Notifiquei. Todos os direitos reservados. &nbsp;·&nbsp; CNPJ 59.859.848/0001-13",
    c.copy,
    doc.id,
  );
  // "(12) 3199-5949" não diz nada pra quem está fora do Brasil — o link wa.me
  // já é internacional, o rótulo é que não era.
  out = out.split(">(12) 3199-5949<").join(">+55 12 3199-5949<");

  out = trocaUm(out, ">Todos os sistemas operando<", `>${c.sistemas}<`, doc.id);
  out = trocaUm(out, ">Parceiro oficial Meta<", `>${c.parceiro}<`, doc.id);

  // 5. o aviso de tradução usa .consent-block, que só existe no CSS do dpa
  if (!out.includes(".consent-block {")) {
    out = out.replace("</style>", `${CSS_CONSENT}</style>`);
  }

  return comGtmPresoAoConsentimento(comVersaoDoConsent(comBotaoCookies(out, lang)));
}

let escritos = 0;
for (const doc of DOCS) {
  const origem = join(PUB, `${doc.id}.html`);
  const htmlPt = readFileSync(origem, "utf8");

  // recíproco: o PT também precisa apontar pros irmãos
  writeFileSync(origem, comGtmPresoAoConsentimento(comVersaoDoConsent(comBotaoCookies(comHreflang(htmlPt, doc), "pt-BR"))));
  escritos++;

  for (const lang of ["en", "es"]) {
    const destino = join(PUB, `${doc.slug[lang]}.html`);
    const pasta = dirname(destino);
    if (!existsSync(pasta)) mkdirSync(pasta, { recursive: true });
    writeFileSync(destino, traduzir(htmlPt, doc, lang));
    escritos++;
    console.log(`  ✓ /${doc.slug[lang]}`);
  }
}
console.log(`\n${escritos} arquivos escritos (3 PT com hreflang + 6 traduzidos).`);
