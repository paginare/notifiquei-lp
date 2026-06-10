import { writeFileSync, existsSync } from 'fs';

// Gera as 12 fotos de criadores do CreatorsMarquee. Cada nicho tem etnia/cabelo
// DIVERSOS e — importante — POSE e ENQUADRAMENTO próprios (não é todo mundo sentado
// segurando o celular pra câmera, que era o que deixava as fotos "muito parecidas").
// Saída: /tmp/<file>.png (1:1). Depois converter p/ public/assets/creators/<file>.webp:
//   sharp(png).resize(480,600,{fit:'cover',position:'attention'}).webp({quality:74})
// Rodar da raiz do repo com APIYI_KEY no ambiente (.env gitignorado — NUNCA commitar a chave).

const APIYI_KEY = process.env.APIYI_KEY;
const ENDPOINTS = ['https://api.apiyi.com', 'https://b.apiyi.com', 'https://vip.apiyi.com'];
const MODEL = 'gemini-3.1-flash-image-preview';

const TAIL = ` Premium editorial lifestyle photography — photorealistic, magazine-grade, natural light, genuine candid expression, NOT cheesy stock, NOT corporate. Upper-body / three-quarter framing. Absolutely NO text, no letters, no numbers, no watermark, no logos anywhere.`;

const NICHES = [
  { file: 'c1-nutri',    prompt: `A Black Brazilian woman with natural voluminous curly afro hair, around 30, a nutritionist STANDING and laughing while chopping fresh greens on a cutting board in a bright airy kitchen, both hands busy, crisp green and white palette, leafy plants.` },
  { file: 'c2-fitness',  prompt: `A white Brazilian man with light brown short hair and a beard, athletic, crouching to lace his sneaker on a gym floor, looking up with a confident smile, low dynamic camera angle, cool TEAL and electric BLUE tones, gym equipment soft behind.` },
  { file: 'c3-beleza',   prompt: `An East-Asian Brazilian woman with sleek straight black hair, a beauty creator seen in a tight close-up portrait applying lipstick while looking into a vanity mirror with warm bulbs, soft BLUSH PINK palette, dreamy and intimate.` },
  { file: 'c4-coach',    prompt: `A Black Brazilian man with short cropped hair and a trimmed beard, an online course creator standing and gesturing mid-explanation in front of a glass board with sticky notes, energetic teaching pose, WARM WOOD and deep NAVY home office.` },
  { file: 'c5-gastro',   prompt: `A brown-skinned (pardo) Brazilian woman with wavy chestnut-brown hair, a food creator plating a finished dish at the counter, looking down focused with a small smile, hands arranging the plate, slightly overhead angle, warm TERRACOTTA and amber tones.` },
  { file: 'c6-moda',     prompt: `A Black Brazilian woman with bold box braids, a stylish fashion creator in a confident standing pose with one hand on her hip against a BOLD COLORFUL wall (mustard yellow and coral), editorial fashion mood, three-quarter body.` },
  { file: 'c7-artesa',   prompt: `A white Brazilian woman with wavy auburn (reddish) hair, an artisan with both hands shaping clay on a table, eyes down on her work with a gentle smile, close on hands and face, EARTHY ochre and sage craft studio.` },
  { file: 'c8-pet',      prompt: `A brown-skinned (pardo) Brazilian man with curly dark hair, sitting on the living-room floor playing with his happy golden dog, holding a chew toy and laughing, warm candid moment, fresh GREEN and cream tones, plants, sunny.` },
  { file: 'c9-doces',    prompt: `An Indigenous-Brazilian woman with long straight dark hair, a confectioner piping frosting onto a decorated cake, focused happy expression, hands on the piping bag, tight framing on the action, sweet PASTEL kitchen (mint and soft pink).` },
  { file: 'c10-estetica',prompt: `A white Brazilian woman with blonde shoulder-length hair, an esthetician holding up a skincare product and examining it with a calm smile near a clean minimal counter, WHITE and soft LAVENDER spa tones.` },
  { file: 'c11-decor',   prompt: `A Black Brazilian woman with long locs, an interior decorator reaching up to arrange a hanging plant and cushions in a vibrant cozy living room, dynamic candid pose, warm ORANGE, deep green and patterned textiles.` },
  { file: 'c12-foto',    prompt: `An East-Asian Brazilian man with dark tousled hair, a photographer raising a DSLR camera to his eye to take a shot, dynamic over-the-shoulder feel, moody creative studio, deep MOODY blue-gray tones with a warm key light.` },
];

async function gen(n) {
  if (existsSync(`/tmp/${n.file}.png`)) { console.log(`· skip ${n.file}`); return; }
  const body = JSON.stringify({ contents: [{ parts: [{ text: n.prompt + TAIL }] }], generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '1:1' } } });
  for (const base of ENDPOINTS) {
    try {
      const res = await fetch(`${base}/v1beta/models/${MODEL}:generateContent`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${APIYI_KEY}` }, body });
      if (!res.ok) continue;
      const data = await res.json();
      const img = (data?.candidates?.[0]?.content?.parts ?? []).find((x) => x.inlineData?.data || x.inline_data?.data);
      if (img) { writeFileSync(`/tmp/${n.file}.png`, Buffer.from((img.inlineData ?? img.inline_data).data, 'base64')); console.log(`✅ ${n.file}`); return; }
    } catch (e) {}
  }
  console.log(`❌ ${n.file}`);
}
for (const n of NICHES) await gen(n);
console.log('fim');
