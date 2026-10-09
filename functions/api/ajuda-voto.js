// "Este artigo foi útil?" da central de ajuda (/ajuda). Guarda o voto no D1
// (binding AJUDA_DB, banco notifiquei-ajuda-votos) e devolve a contagem.
//   GET  /api/ajuda-voto?artigo=/ajuda/<categoria>/<slug>  → { util, total }
//   POST /api/ajuda-voto  { artigo, util: true|false }      → { util, total }
const ARTIGO = /^\/ajuda\/[a-z0-9-]{2,60}\/[a-z0-9-]{2,80}$/;
const json = (dados, status = 200) =>
  new Response(JSON.stringify(dados), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

async function contagem(db, artigo) {
  const r = await db
    .prepare('SELECT COALESCE(SUM(util), 0) AS util, COUNT(*) AS total FROM voto WHERE artigo = ?')
    .bind(artigo)
    .first();
  return { util: Number(r?.util ?? 0), total: Number(r?.total ?? 0) };
}

export async function onRequestGet({ request, env }) {
  const artigo = new URL(request.url).searchParams.get('artigo') || '';
  if (!ARTIGO.test(artigo) || !env.AJUDA_DB) return json({ util: 0, total: 0 });
  return json(await contagem(env.AJUDA_DB, artigo));
}

export async function onRequestPost({ request, env }) {
  if (!env.AJUDA_DB) return json({ erro: 'indisponível' }, 503);
  let corpo;
  try {
    corpo = await request.json();
  } catch {
    return json({ erro: 'corpo inválido' }, 400);
  }
  const artigo = String(corpo?.artigo || '');
  if (!ARTIGO.test(artigo) || typeof corpo?.util !== 'boolean') return json({ erro: 'dados inválidos' }, 400);
  await env.AJUDA_DB.prepare('INSERT INTO voto (artigo, util) VALUES (?, ?)').bind(artigo, corpo.util ? 1 : 0).run();
  return json(await contagem(env.AJUDA_DB, artigo));
}
