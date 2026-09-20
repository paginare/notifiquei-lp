// Checagem do functions/api/evento.js sem rede: troca o fetch global e confere o
// que iria pra Meta. Rodar: npm run check:capi
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/evento.js';

const enviados = [];
globalThis.fetch = async (url, init) => { enviados.push({ url, corpo: JSON.parse(init.body) }); return new Response('{}'); };

// request.cf é o que a Cloudflare entrega na borda; aqui entra fixo.
const CF = { city: 'São Paulo', regionCode: 'SP', postalCode: '01310-000', country: 'BR' };
const sha = async (v) =>
  [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v)))]
    .map((b) => b.toString(16).padStart(2, '0')).join('');

async function chama(body, headers = {}, cf = CF) {
  const pendentes = [];
  const request = new Request('https://notifiquei.com.br/api/evento', {
    method: 'POST',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: {
      Origin: 'https://notifiquei.com.br',
      Cookie: 'a=1; _fbp=fb.1.111.222',
      'CF-Connecting-IP': '203.0.113.9',
      'User-Agent': 'Teste/1.0',
      ...headers,
    },
  });
  Object.defineProperty(request, 'cf', { value: cf, configurable: true });
  const r = await onRequestPost({ request, env: { META_CAPI_TOKEN: 'tok\n' }, waitUntil: (p) => pendentes.push(p) });
  await Promise.all(pendentes);
  return r.status;
}

const ok = {
  event_name: 'InitiateCheckout',
  event_id: '0b6f6c1e-1111-4222-8333-944445555666',
  event_source_url: 'https://notifiquei.com.br/?fbclid=ABC',
  custom_data: { value: 99, currency: 'BRL', content_name: 'solo_mensal', lixo: 'x' },
  test_event_code: 'TEST123',
};

// chamada de teste responde 200 com o resultado da Meta e os campos preenchidos
assert.equal(await chama(ok), 200);
const { url, corpo } = enviados.pop();
assert.match(url, /\/v26\.0\/4197456147066821\/events$/);
assert.equal(corpo.access_token, 'tok'); // trim: pbpaste pode trazer quebra de linha
assert.equal(corpo.test_event_code, 'TEST123');
const [ev] = corpo.data;
assert.equal(ev.event_id, ok.event_id);
assert.equal(ev.action_source, 'website');
assert.deepEqual(ev.custom_data, { value: 99, currency: 'BRL', content_name: 'solo_mensal' });
assert.equal(ev.user_data.client_ip_address, '203.0.113.9');
assert.equal(ev.user_data.fbp, 'fb.1.111.222');
assert.match(ev.user_data.fbc, /^fb\.1\.\d+\.ABC$/);

// localização do IP entra em hash, sem acento e sem pontuação
assert.deepEqual(ev.user_data.ct, [await sha('saopaulo')]);
assert.deepEqual(ev.user_data.st, [await sha('sp')]);
assert.deepEqual(ev.user_data.zp, [await sha('01310000')]);
assert.deepEqual(ev.user_data.country, [await sha('br')]);

// sem request.cf (dev local) o evento sai sem a parte de localização (null, não
// undefined: undefined cairia no valor padrão do parâmetro)
await chama(ok, {}, null);
const semGeo = enviados.pop().corpo.data[0].user_data;
assert.equal(semGeo.ct, undefined);
assert.equal(semGeo.country, undefined);

// marco de rolagem é evento válido
assert.equal(await chama({ ...ok, event_name: 'Scroll40', custom_data: {} }), 200);
assert.equal(enviados.pop().corpo.data[0].event_name, 'Scroll40');
assert.equal(await chama({ ...ok, event_name: 'Scroll30' }), 400);

// cookie _fbc manda mais que o fbclid da URL
await chama(ok, { Cookie: '_fbc=fb.1.9.XYZ' });
assert.equal(enviados.pop().corpo.data[0].user_data.fbc, 'fb.1.9.XYZ');

// o que não pode passar
// sem código de teste a resposta é 204 e o envio fica em waitUntil
assert.equal(await chama({ ...ok, test_event_code: undefined }), 204);
assert.equal(enviados.pop().corpo.test_event_code, undefined);

assert.equal(await chama(ok, { Origin: 'https://evil.com' }), 403);
assert.equal(await chama({ ...ok, event_name: 'Purchase' }), 400);
assert.equal(await chama({ ...ok, event_id: 'x' }), 400);
assert.equal(await chama('{quebrado'), 400);
assert.equal(await chama({ ...ok, test_event_code: 'x'.repeat(5000) }), 413);
assert.equal(enviados.length, 0);

console.log('check-capi ok');
