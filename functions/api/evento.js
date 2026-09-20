/**
 * API de Conversões da Meta: eventos da LP (Pages Function = Worker na borda).
 *
 * O navegador manda {event_name, event_id, custom_data} só DEPOIS do aceite de
 * cookies (quem chama é src/components/Conversoes.astro, via nfAoConsentir).
 * Aqui entra o que só o servidor vê direito: IP, user agent e os cookies
 * _fbp/_fbc. O pixel do navegador dispara o mesmo evento com o mesmo event_id,
 * e a Meta conta uma vez só.
 *
 * Responde 204 na hora; o envio pra Meta segue em waitUntil. Falha da Meta vira
 * log (wrangler pages deployment tail), nunca erro pro visitante.
 */
const PIXEL = '4197456147066821';
const GRAPH = `https://graph.facebook.com/v26.0/${PIXEL}/events`;
// Scroll<N> são eventos personalizados (marcos de leitura da página), o resto é padrão da Meta.
const EVENTOS = new Set(['Lead', 'InitiateCheckout', 'Scroll20', 'Scroll40', 'Scroll60', 'Scroll80', 'Scroll100']);
const MOEDAS = new Set(['BRL', 'USD', 'EUR']);

function cookie(req, nome) {
  const m = (req.headers.get('Cookie') || '').match(new RegExp(`(?:^|;\\s*)${nome}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/** Normalização que a Meta pede antes do hash: minúsculo, sem acento e sem pontuação. */
const normaliza = (v) =>
  typeof v === 'string'
    ? v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || undefined
    : undefined;

async function hash(v) {
  const limpo = normaliza(v);
  if (!limpo) return undefined;
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(limpo));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Localização aproximada que a Cloudflare deduz do IP na borda (request.cf).
 * Vai em hash, como a Meta exige — é o que melhora a qualidade do pareamento
 * quando não há e-mail, que é o caso dos eventos anônimos do site.
 */
async function geo(cf) {
  if (!cf) return {};
  const [ct, st, zp, country] = await Promise.all([
    hash(cf.city), hash(cf.regionCode || cf.region), hash(cf.postalCode), hash(cf.country),
  ]);
  return { ct: ct && [ct], st: st && [st], zp: zp && [zp], country: country && [country] };
}

export async function onRequestPost({ request, env, waitUntil }) {
  const url = new URL(request.url);
  // Só o próprio site. Navegador antigo sem Origin ainda manda Sec-Fetch-Site.
  const origin = request.headers.get('Origin');
  if (origin ? origin !== url.origin : request.headers.get('Sec-Fetch-Site') !== 'same-origin') {
    return new Response(null, { status: 403 });
  }

  const texto = await request.text();
  if (texto.length > 4096) return new Response(null, { status: 413 });
  let b;
  try { b = JSON.parse(texto); } catch { return new Response(null, { status: 400 }); }
  if (!EVENTOS.has(b?.event_name) || !/^[\w-]{8,64}$/.test(b.event_id || '')) {
    return new Response(null, { status: 400 });
  }

  let pagina;
  try { pagina = new URL(b.event_source_url); } catch {}
  if (pagina?.host !== url.host) pagina = undefined;

  const c = b.custom_data || {};
  const custom_data = {};
  if (Number.isFinite(c.value) && c.value > 0 && c.value < 100000) custom_data.value = c.value;
  if (MOEDAS.has(c.currency)) custom_data.currency = c.currency;
  if (typeof c.content_name === 'string') custom_data.content_name = c.content_name.slice(0, 60);

  // _fbc só existe se o pixel já rodou com fbclid na URL. Se o clique veio na
  // mesma página que recebeu o fbclid, monta direto (formato da Meta).
  let fbc = cookie(request, '_fbc');
  const fbclid = pagina?.searchParams.get('fbclid');
  if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;

  const token = (env.META_CAPI_TOKEN || '').trim();
  if (!token) {
    console.error('capi: META_CAPI_TOKEN ausente');
    return new Response(null, { status: 204 });
  }

  const corpo = {
    data: [{
      event_name: b.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: b.event_id,
      action_source: 'website',
      event_source_url: pagina?.href || request.headers.get('Referer') || undefined,
      user_data: {
        client_ip_address: request.headers.get('CF-Connecting-IP') || undefined,
        client_user_agent: request.headers.get('User-Agent') || undefined,
        fbp: cookie(request, '_fbp'),
        fbc,
        ...(await geo(request.cf)),
      },
      custom_data,
    }],
    // Código da aba "Testar eventos" do Gerenciador: evento de teste não conta pra campanha.
    test_event_code: /^TEST\w{1,20}$/.test(b.test_event_code || '') ? b.test_event_code : undefined,
    access_token: token,
  };

  waitUntil(
    fetch(GRAPH, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) })
      .then(async (r) => { if (!r.ok) console.error('capi', r.status, await r.text()); })
      .catch((e) => console.error('capi', e.message)),
  );
  return new Response(null, { status: 204 });
}
