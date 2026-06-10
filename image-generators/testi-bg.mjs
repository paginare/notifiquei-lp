import { writeFileSync } from 'fs';

const APIYI_KEY = process.env.APIYI_KEY;
const ENDPOINTS = ['https://api.apiyi.com', 'https://b.apiyi.com', 'https://vip.apiyi.com'];
const MODEL = 'gemini-3.1-flash-image-preview';

const prompt = `A moody, cinematic, dark atmospheric photograph for a website section background. A cozy behind-the-scenes corner of a Brazilian content creator's home studio at night: a softly glowing ring light and a warm desk lamp casting amber light, a camera on a tripod slightly out of focus, a couple of plants, a coffee mug, warm wood and fabric textures. Mostly very dark warm tones — deep browns and near-black with soft glowing warm highlights. Shallow depth of field, gentle bokeh. A large area of dark, empty shadow on the LEFT side of the frame. Intentionally low-key and dark. Premium editorial photography, real and relatable — NOT cheesy stock photo, NOT corporate, NOT bright. Landscape 16:9, photorealistic, magazine-grade. CRITICAL: absolutely NO phone, NO smartphone, NO screens, NO computer/laptop/monitor. And NO text, NO letters, NO numbers, NO captions, NO watermark, NO labels anywhere in the image — it must be a clean photograph with zero writing of any kind.`;

const body = JSON.stringify({
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '16:9' } },
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
      writeFileSync('/tmp/testi-bg.png', Buffer.from(raw.data, 'base64'));
      console.log(`✅ Imagem salva em /tmp/testi-bg.png`);
      process.exit(0);
    }
    console.log('  Sem imagem:', JSON.stringify(data).slice(0, 300));
  } catch (err) {
    console.log(`  Erro: ${err.message}`);
  }
}
console.log('❌ Todos os endpoints falharam');
process.exit(1);
