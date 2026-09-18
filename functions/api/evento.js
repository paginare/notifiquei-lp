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
const EVENTOS = new Set(['Lead', 'InitiateCheckout']);
const MOEDAS = new Set(['BRL', 'USD', 'EUR']);

function cookie(req, nome) {
  const m = (req.headers.get('Cookie') || '').match(new RegExp(`(?:^|;\\s*)${nome}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : undefined;
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
