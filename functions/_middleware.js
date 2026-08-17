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
  if (!alvo) return resposta;

  const saida = new HTMLRewriter()
    .on('html', {
      element(el) {
        el.setAttribute('data-market', alvo.market);
        el.setAttribute('data-currency', alvo.currency);
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
