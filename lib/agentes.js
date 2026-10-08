/**
 * Descoberta por agentes de IA (o que o isitagentready.com confere).
 *
 * - /.well-known/api-catalog e os metadados OAuth: o MCP mora na API
 *   (api.notifiquei.com.br); aqui só apontamos para ele. Os metadados OAuth são
 *   buscados na própria API, para nunca ficarem diferentes do que ela serve.
 * - Link no cabeçalho de toda página HTML.
 * - Markdown para quem pede `Accept: text/markdown`; navegador continua com HTML.
 */

const API = 'https://api.notifiquei.com.br';

export const LINK = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</auth.md>; rel="service-doc"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json"',
  '</.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"',
].join(', ');

const CATALOGO = {
  linkset: [
    {
      anchor: `${API}/mcp`,
      'service-desc': [{ href: 'https://notifiquei.com.br/.well-known/mcp/server-card.json', type: 'application/json' }],
      'service-doc': [{ href: 'https://notifiquei.com.br/auth.md', type: 'text/markdown' }],
      status: [{ href: `${API}/health`, type: 'application/json' }],
    },
  ],
};

const json = (dados, tipo = 'application/json') =>
  new Response(JSON.stringify(dados, null, 2), {
    headers: { 'Content-Type': tipo, 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=3600' },
  });

/** Repete a resposta da API (só JSON 200); se ela falhar, 404 em vez de HTML. */
async function daApi(caminho, ajustar = (m) => m) {
  try {
    const r = await fetch(API + caminho, { cf: { cacheTtl: 3600, cacheEverything: true } });
    if (r.ok) return json(ajustar(await r.json()));
  } catch {}
  return new Response('Not found', { status: 404 });
}

/** Rotas de descoberta. Devolve null quando o caminho não é delas. */
export function descoberta(pathname) {
  // RFC 9728: o cliente pode pedir com o caminho do recurso no fim
  // (/.well-known/oauth-protected-resource/en). Tudo aponta para o MCP.
  if (pathname.startsWith('/.well-known/oauth-protected-resource')) {
    return daApi('/.well-known/oauth-protected-resource/mcp');
  }
  switch (pathname.replace(/\/$/, '')) {
    case '/.well-known/api-catalog':
      return json(CATALOGO, 'application/linkset+json');
    case '/.well-known/oauth-authorization-server':
      return daApi('/.well-known/oauth-authorization-server', (m) => ({
        ...m,
        // Bloco do auth.md (workos/auth.md): onde o agente se registra e se desliga.
        agent_auth: {
          docs_uri: 'https://notifiquei.com.br/auth.md',
          register_uri: m.registration_endpoint,
          identity_types: ['user'],
          credential_types: ['oauth2_access_token', 'api_key'],
          revocation_uri: m.revocation_endpoint,
        },
      }));
    default:
      return null;
  }
}

export const querMarkdown = (req) => /text\/markdown/i.test(req.headers.get('Accept') || '');

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };
const decodificar = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+|#39);/gi, (m, e) => {
    if (e[0] === '#') {
      const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTIDADES[e.toLowerCase()] ?? m;
  });

/**
 * HTML → Markdown na borda. Pega o <main> (ou o corpo todo, se não houver),
 * com títulos, parágrafos, listas e links. Script, estilo e SVG ficam de fora.
 */
export async function paraMarkdown(resposta, url) {
  const partes = [];
  let pular = 0;
  let noMain = 0;
  let viuMain = false;
  let titulo = '';
  let noTitulo = false;
  const por = (s) => { if (!pular) partes.push({ s, main: noMain > 0 }); };
  const PULAR = new Set(['script', 'style', 'svg', 'noscript', 'template', 'iframe']);
  const BLOCO = new Set(['p', 'section', 'article', 'header', 'footer', 'details', 'summary', 'blockquote', 'ul', 'ol', 'table', 'tr']);

  // Um único handler por elemento: o HTMLRewriter guarda só um onEndTag por
  // elemento, então dois handlers no mesmo nó se atropelam (e o "pular" nunca
  // voltava a zero, cortando a página no meio).
  const rw = new HTMLRewriter()
    .on('*', {
      element(el) {
        const tag = el.tagName;
        const aoFechar = [];
        if (tag === 'title') { noTitulo = true; aoFechar.push(() => { noTitulo = false; }); }
        else if (PULAR.has(tag) || el.getAttribute('aria-hidden') === 'true' || /\bhome-skip\b/.test(el.getAttribute('class') || '')) {
          pular++; aoFechar.push(() => { pular--; });
        } else if (tag === 'main') { noMain++; viuMain = true; aoFechar.push(() => { noMain--; }); }
        else if (/^h[1-6]$/.test(tag)) { por('\n\n' + '#'.repeat(Number(tag[1])) + ' '); aoFechar.push(() => por('\n\n')); }
        else if (BLOCO.has(tag)) { por('\n\n'); aoFechar.push(() => por('\n\n')); }
        else if (tag === 'div') por('\n');
        else if (tag === 'li') por('\n- ');
        else if (tag === 'span') aoFechar.push(() => por(' '));
        else if (tag === 'br') por('\n');
        else if (tag === 'strong' || tag === 'b') { por('**'); aoFechar.push(() => por('**')); }
        else if (tag === 'a') {
          const href = el.getAttribute('href') || '';
          if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
            let abs = href;
            try { abs = new URL(href, url).toString(); } catch {}
            por('[');
            aoFechar.push(() => por(`](${abs})`));
          }
        }
        if (!aoFechar.length) return;
        // Elemento sem fechamento (void) não aceita onEndTag: desfaz na hora.
        try { el.onEndTag(() => aoFechar.forEach((f) => f())); }
        catch { aoFechar.forEach((f) => f()); }
      },
    })
    .onDocument({
      text(t) {
        if (noTitulo) { titulo += t.text; return; }
        if (pular) return;
        const txt = decodificar(t.text).replace(/\s+/g, ' ');
        if (txt) por(txt);
      },
    });

  await rw.transform(resposta).arrayBuffer();

  const escolhidas = viuMain ? partes.filter((p) => p.main) : partes;
  let md = escolhidas.map((p) => p.s).join('');
  md = md
    .replace(/\*\*\s*\*\*/g, '')
    .replace(/\[\s*\]\([^)]*\)/g, '')
    .split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).join('\n')
    .replace(/^(#+|-)\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const tituloLimpo = decodificar(titulo).trim();
  if (tituloLimpo) md = `---\ntitle: ${JSON.stringify(tituloLimpo)}\nurl: ${url}\n---\n\n${md}`;

  return new Response(md + '\n', {
    status: resposta.status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(Math.ceil(md.length / 4)),
      'Vary': 'Accept',
      'Cache-Control': 'private, no-store',
      'Link': LINK,
    },
  });
}
