/**
 * Detecção de país na borda (Cloudflare Pages Function).
 *
 * A LP é estática. Esta function é a ÚNICA parte dinâmica: lê o país do visitante
 * e estampa dois atributos no <html>. Todo o resto — preço, botão, esconder o
 * plano grátis — é CSS reagindo a esses atributos, com as variantes já dentro do
 * HTML gerado no build.
 *
 * Por que HTMLRewriter e não um cookie + JS: com cookie o preço em real aparece
 * por um instante antes de virar dólar. Aqui o HTML já sai da borda com o atributo
 * certo — o visitante nunca vê o preço errado.
 *
 * MODO DE FALHA: se a function não rodar, o país vier vazio ou der erro, o <html>
 * fica SEM os atributos e o CSS cai no padrão Brasil (`html:not([data-currency])`).
 * Ou seja, o pior caso é o site se comportar exatamente como antes desta mudança.
 */

// Países de língua espanhola — decidem qual idioma SUGERIR a quem cai na home
// em português vindo de fora. Não redireciona: só alimenta o convite.
const ESPANHOL = new Set([
  'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO',
  'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ', 'PR',
]);

// Zona do euro + microestados que usam euro. Fora daqui (e fora do BR) é dólar.
const EURO = new Set([
  'AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR',
  'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PT', 'SI', 'SK',
  'AD', 'MC', 'SM', 'VA',
]);

/**
 * País → mercado e moeda.
 *
 * `traduzida` = a rota é /en ou /es. Essas páginas são internacionais POR
 * DEFINIÇÃO: não têm preço em real nem plano grátis. Sem esta regra, um
 * brasileiro que abre /en recebia data-currency="BRL" e não via preço nenhum,
 * porque as únicas variantes ali são USD e EUR.
 */
function decidir(pais, traduzida) {
  if (traduzida) {
    return { market: 'INTL', currency: EURO.has(pais) ? 'EUR' : 'USD' };
  }
  if (!pais || pais === 'XX') return null; // XX = Cloudflare não sabe (Tor, etc.)
  if (pais === 'BR') return { market: 'BR', currency: 'BRL' };
  return { market: 'INTL', currency: EURO.has(pais) ? 'EUR' : 'USD' };
}

/**
 * Buscadores e crawlers de IA. Eles NUNCA são redirecionados: o Googlebot
 * rastreia majoritariamente de IPs dos EUA, e mandá-lo pra /en faria o site ser
 * indexado como se fosse só a versão gringa — o que ameaça o ranking dos posts
 * do blog em português, que são a maior fonte de tráfego orgânico.
 */
const BOTS = /bot|crawler|spider|crawling|slurp|facebookexternalhit|whatsapp|telegram|discord|preview|embed|lighthouse|pagespeed|gptbot|chatgpt|oai-search|claude|perplexity|applebot|ahrefs|semrush/i;

/** Só a home tem tradução. Redirecionar blog ou ferramentas levaria a lugar nenhum. */
const REDIRECIONAVEL = new Set(['/', '/index.html']);

export async function onRequest(context) {
  const resposta = await context.next();

  // Só HTML passa pelo rewriter. Assets, imagens e vídeos seguem intocados
  // (e cacheados normalmente).
  const tipo = resposta.headers.get('content-type') || '';
  if (!tipo.includes('text/html')) return resposta;

  const req = context.request;
  const url = new URL(req.url);
  // `?pais=US` força o mercado — usado nos testes e pra conferir em produção.
  const forcado = url.searchParams.get('pais');
  const pais = (forcado || req.headers.get('CF-IPCountry') || '').toUpperCase();
  const traduzida = /^\/(en|es)(\/|$)/.test(url.pathname);

  const alvo = decidir(pais, traduzida);

  // ---- Redirecionamento por idioma (só a home, só gente, só quem não escolheu) ----
  const ua = req.headers.get('User-Agent') || '';
  const escolheu = /(?:^|;\s*)nq_lang_escolhido=1/.test(req.headers.get('Cookie') || '');
  if (
    REDIRECIONAVEL.has(url.pathname) &&
    alvo?.market === 'INTL' &&
    !BOTS.test(ua) &&          // buscador nunca é redirecionado
    !escolheu &&               // quem já escolheu um idioma manda no próprio destino
    !forcado                   // ?pais= é ferramenta de teste; não deve saltar
  ) {
    const destino = ESPANHOL.has(pais) ? '/es' : '/en';
    const u = new URL(url);
    u.pathname = destino;
    // 302: temporário de propósito. 301 gruda no cache do navegador e do
    // buscador, e um brasileiro viajando ficaria preso no /en.
    return new Response(null, {
      status: 302,
      headers: { Location: u.toString(), 'Cache-Control': 'private, no-store', Vary: 'User-Agent, Cookie' },
    });
  }

  // Idioma: nas rotas traduzidas vem da própria rota; no resto, do cookie que a
  // LP grava quando o visitante clica em comprar. É assim que o /obrigado sabe
  // em que idioma falar com quem acabou de pagar — a URL de retorno do Payment
  // Link é fixa e não consegue variar por idioma.
  const cookie = req.headers.get('Cookie') || '';
  const doCookie = (cookie.match(/(?:^|;\s*)nq_lang=([a-zA-Z-]+)/) || [])[1];
  const idioma = url.pathname.startsWith('/en')
    ? 'en'
    : url.pathname.startsWith('/es')
      ? 'es'
      : doCookie || 'pt-BR';

  if (!alvo) {
    // Sem mercado definido ainda pode haver idioma a estampar (ex.: /obrigado).
    if (idioma === 'pt-BR') return resposta;
    const so = new HTMLRewriter()
      .on('html', { element: (el) => el.setAttribute('data-lang', idioma) })
      .transform(resposta);
    return new Response(so.body, { status: so.status, statusText: so.statusText, headers: new Headers(so.headers) });
  }

  const saida = new HTMLRewriter()
    .on('html', {
      element(el) {
        el.setAttribute('data-market', alvo.market);
        el.setAttribute('data-currency', alvo.currency);
        el.setAttribute('data-lang', idioma);
        // Idioma sugerido a quem está na home em português vindo de fora.
        // Só um convite: o CSS mostra o banner certo, ninguém é redirecionado.
        if (alvo.market === 'INTL') {
          el.setAttribute('data-suggest', ESPANHOL.has(pais) ? 'es' : 'en');
        }
      },
    })
    .transform(resposta);

  // O HTML agora varia por país: não pode ser guardado num cache compartilhado,
  // senão um visitante recebe o preço de outro. Os assets seguem cacheados.
  const headers = new Headers(saida.headers);
  headers.set('Cache-Control', 'private, no-store');
  headers.set('X-Notifiquei-Market', alvo.market);

  return new Response(saida.body, {
    status: saida.status,
    statusText: saida.statusText,
    headers,
  });
}
