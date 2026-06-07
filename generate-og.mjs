import { writeFileSync } from 'fs';

const APIYI_KEY = 'sk-j3SHndNMTQzrFvr269D256D18a134814B2D107661f035f10';
const ENDPOINTS = ['https://api.apiyi.com', 'https://b.apiyi.com', 'https://vip.apiyi.com'];
const MODEL = 'gemini-3.1-flash-image-preview';

const prompt = `Create a professional social media Open Graph image for "Notifiquei", a Brazilian Instagram automation SaaS.

Design specifications:
- Dark warm black background (#1A1416), almost like charcoal
- Centered bold product name "Notifiquei" in large white display font (Bricolage Grotesque style, heavy weight)
- Tagline below in smaller text: "Você posta. A gente vende." in soft cream/off-white
- A glowing hot pink/magenta (#FF1F6D) accent — either a subtle glow behind the logo or a thin neon underline
- Abstract visual metaphor: floating Instagram DM bubbles or comment notification dots on the right side, in pink/magenta tones, slightly blurred/bokeh style
- Bottom-left small text: "notifiquei.com.br" in muted gray
- Overall feel: modern, premium, Brazilian digital brand, slightly cinematic
- Landscape orientation, 1200x630 proportions (16:9 wide)
- No excessive decoration, clean and bold
- The pink wave/logo symbol of Notifiquei (two overlapping N wave shapes) subtly visible as a watermark or background element`;

async function generateOG() {
  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: '16:9' },
    },
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
      if (!res.ok) { console.log(`  HTTP ${res.status}`); continue; }
      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts ?? [];
      const img = parts.find(p => p.inlineData?.data || p.inline_data?.data);
      if (img) {
        const raw = img.inlineData ?? img.inline_data;
        const ext = (raw.mimeType ?? raw.mime_type ?? 'image/png').includes('jpeg') ? 'jpg' : 'png';
        const outPath = `landing-pages/assets/og-image.${ext}`;
        writeFileSync(outPath, Buffer.from(raw.data, 'base64'));
        console.log(`✅ OG image salva em ${outPath}`);
        console.log(`   Mime: ${raw.mimeType ?? raw.mime_type}`);
        return outPath;
      }
      console.log('  Sem imagem na resposta');
    } catch (err) {
      console.log(`  Erro: ${err.message}`);
    }
  }
  throw new Error('Todos os endpoints falharam');
}

generateOG().catch(e => { console.error(e.message); process.exit(1); });
