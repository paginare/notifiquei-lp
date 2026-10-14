/**
 * Dados públicos da API de parceiros, servidos do domínio do site:
 *   /developers/openapi.json   → especificação OpenAPI 3
 *   /developers/openapi.yaml   → a mesma, em YAML
 *   /developers/novidades.json → o que mudou na API
 *
 * Quem gera tudo é a API (repo instaV2, backend/src/partners/), a cada release.
 * Esta Function busca de lá NO SERVIDOR, mandando o segredo PARTNERS_DOCS_TOKEN
 * (secret do projeto Pages, o mesmo valor do .env da API). Sem o segredo a API
 * responde 404 nessas rotas, então elas só ficam abertas aqui.
 *
 * Cache de 5 minutos na borda: release nova aparece aqui em até 5 min.
 * Qualquer outro /developers/<algo> segue para o arquivo estático (next()).
 */

const API = 'https://api.notifiquei.com.br';
const CACHE_SEGUNDOS = 300;

const ARQUIVOS = {
  'openapi.json': { origem: '/partners/openapi.json', tipo: 'application/json; charset=utf-8' },
  'openapi.yaml': { origem: '/partners/openapi.yaml', tipo: 'text/yaml; charset=utf-8' },
  'novidades.json': { origem: '/partners/novidades', tipo: 'application/json; charset=utf-8' },
};

const cabecalhos = (tipo) => ({
  'Content-Type': tipo,
  'Cache-Control': `public, max-age=${CACHE_SEGUNDOS}`,
  // Postman web, geradores de SDK e agentes leem de qualquer origem. Sem credencial.
  'Access-Control-Allow-Origin': '*',
  'X-Content-Type-Options': 'nosniff',
});

export async function onRequest(context) {
  const { request, params, env, next, waitUntil } = context;
  const nome = String(params.arquivo || '');
  const alvo = Object.hasOwn(ARQUIVOS, nome) ? ARQUIVOS[nome] : null;
  if (!alvo) return next();

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS', 'Access-Control-Max-Age': '86400' },
    });
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD, OPTIONS' } });
  }

  // Chave fixa (sem query string): ?x=1 não fura o cache nem martela a API.
  const chave = new Request(new URL(`/developers/${nome}`, request.url).toString());
  const cache = caches.default;
  let resposta = await cache.match(chave);

  if (!resposta) {
    const segredo = (env.PARTNERS_DOCS_TOKEN || '').trim();
    let corpo = null;
    try {
      const r = await fetch(API + alvo.origem, {
        headers: { Accept: alvo.tipo.split(';')[0], ...(segredo ? { 'X-Notifiquei-Docs-Token': segredo } : {}) },
        cf: { cacheTtl: 0 },
      });
      if (r.ok) corpo = await r.text();
      else console.error(`developers: API respondeu ${r.status} em ${alvo.origem}${segredo ? '' : ' (PARTNERS_DOCS_TOKEN ausente)'}`);
    } catch (erro) {
      console.error('developers: falha ao buscar', alvo.origem, String(erro));
    }
    if (corpo === null) {
      return new Response(JSON.stringify({ erro: 'Não consegui carregar agora. Tente de novo em instantes.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' },
      });
    }
    resposta = new Response(corpo, { headers: cabecalhos(alvo.tipo) });
    waitUntil(cache.put(chave, resposta.clone()));
  }

  if (request.method === 'HEAD') return new Response(null, { status: resposta.status, headers: resposta.headers });
  return resposta;
}
