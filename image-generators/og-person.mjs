import { writeFileSync } from 'fs';

const APIYI_KEY = process.env.APIYI_KEY;
const ENDPOINTS = ['https://api.apiyi.com', 'https://b.apiyi.com', 'https://vip.apiyi.com'];
const MODEL = 'gemini-3.1-flash-image-preview';

const prompt = `A warm, authentic lifestyle portrait photo of a young Brazilian woman, around 27 years old, a content creator and small online-business owner. She has a natural, genuine smile, looking slightly off-camera, holding a smartphone in one hand as if she just got a sale notification. Soft natural window light, shallow depth of field. Background: a clean warm cream/beige studio wall (#FAF6EF tone) with subtle warmth, slightly out of focus. She wears casual modern clothing in neutral/warm tones. Premium editorial lifestyle photography, Brazilian, real and relatable — NOT cheesy stock photo, NOT corporate. Vertical portrait 3:4, head-and-shoulders to mid-torso, subject positioned slightly to the right so there is breathing room. Photorealistic, high quality, magazine-grade.`;

const body = JSON.stringify({
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '3:4' } },
});

for (const base of ENDPOINTS) {
  const url = `${base}/v1beta/models/${MODEL}:generateContent`;
  try {
    console.log(`Tentando ${base}...`);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${APIYI_KEY}` },
      body,
    });
    if (!res.ok) { console.log(`  HTTP ${res.status}:`, (await res.text()).slice(0, 200)); continue; }
    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const img = parts.find((p) => p.inlineData?.data || p.inline_data?.data);
    if (img) {
      const raw = img.inlineData ?? img.inline_data;
      writeFileSync('/tmp/og-person.png', Buffer.from(raw.data, 'base64'));
      console.log(`✅ Foto salva em /tmp/og-person.png`);
      process.exit(0);
    }
    console.log('  Sem imagem:', JSON.stringify(data).slice(0, 300));
  } catch (err) {
    console.log(`  Erro: ${err.message}`);
  }
}
console.log('❌ Todos os endpoints falharam');
process.exit(1);
