import { writeFileSync } from 'fs';

const APIYI_KEY = process.env.APIYI_KEY;
const ENDPOINTS = ['https://api.apiyi.com', 'https://b.apiyi.com', 'https://vip.apiyi.com'];
const MODEL = 'gemini-3.1-flash-image-preview';

const COMMON = ` Soft natural window light, warm cream and beige tones, shallow depth of field, candid and relatable, genuine warm expression, holding a smartphone naturally in one hand with the screen NOT visible. Premium editorial lifestyle photography — NOT cheesy stock, NOT corporate, NOT studio-flat. Square 1:1 composition, photorealistic, magazine-grade. Absolutely NO text, no letters, no numbers, no watermark, no logos anywhere in the image.`;

const NICHES = [
  { file: 'c8-pet',     prompt: `A warm authentic lifestyle photo of a young Brazilian woman at home sitting on a cozy couch with her small fluffy dog beside her, plants in the background.` },
  { file: 'c9-doces',   prompt: `A warm authentic lifestyle photo of a young Brazilian woman in a bright cozy home kitchen, a beautifully decorated homemade cake and small sweets on the wooden counter in front of her.` },
  { file: 'c10-estetica', prompt: `A warm authentic lifestyle photo of a young Brazilian woman, an esthetician, in her small clean cozy beauty studio with soft neutral decor and a treatment chair softly out of focus behind her.` },
  { file: 'c11-decor',  prompt: `A warm authentic lifestyle photo of a young Brazilian man in a beautifully decorated cozy living room with plants, warm textiles and tasteful shelves, relaxed by the window.` },
  { file: 'c12-foto',   prompt: `A warm authentic lifestyle photo of a young Brazilian man, a photographer, with a camera hanging from his neck, standing by a bright window in a warm creative studio.` },
];

async function gen(niche) {
  const body = JSON.stringify({
    contents: [{ parts: [{ text: niche.prompt + COMMON }] }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '1:1' } },
  });
  for (const base of ENDPOINTS) {
    try {
      const res = await fetch(`${base}/v1beta/models/${MODEL}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${APIYI_KEY}` },
        body,
      });
      if (!res.ok) { console.log(`  ${niche.file} ${base} HTTP ${res.status}`); continue; }
      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts ?? [];
      const img = parts.find((p) => p.inlineData?.data || p.inline_data?.data);
      if (img) {
        const raw = img.inlineData ?? img.inline_data;
        writeFileSync(`/tmp/${niche.file}.png`, Buffer.from(raw.data, 'base64'));
        console.log(`✅ ${niche.file}`);
        return true;
      }
    } catch (err) { console.log(`  ${niche.file} ${base} erro: ${err.message}`); }
  }
  console.log(`❌ ${niche.file} falhou`);
  return false;
}

for (const n of NICHES) await gen(n);
console.log('fim');
