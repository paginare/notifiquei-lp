import fs from "fs";
import path from "path";

const TOKEN =
  process.env.APIYI_TOKEN ||
  (() => {
    for (const p of [
      "/Users/antonioduarte/Lançar/ver-o-sofisticado-seu-guia-essencial/gtm-carrosseis/.env",
      "/Users/antonioduarte/Lançar/carrosseis-notifiquei-v2/.env",
    ]) {
      try { const m = fs.readFileSync(p, "utf8").match(/APIYI_TOKEN=(\S+)/); if (m) return m[1]; } catch {}
    }
  })();
if (!TOKEN) { console.error("Sem APIYI_TOKEN"); process.exit(1); }

const BASE = "https://api.apiyi.com/v1/images/generations";
const MODEL = "gemini-3-pro-image-preview"; // qualidade máxima p/ pessoas
const OUT = "/Users/antonioduarte/Lançar/notifiquei-lp-nova/public/assets/creators";
fs.mkdirSync(OUT, { recursive: true });

const LOOK =
  "Photoreal candid lifestyle photo, warm natural light, authentic Brazilian home setting, real skin texture with pores and small imperfections, subtle film grain, editorial muted warm cream tones with a single soft hot-pink accent, shot like on a real phone/35mm, NOT a glossy studio stock photo, no plastic AI skin, genuine relaxed expression.";

const tasks = [
  { name: "c1-nutri",    size: "1024x1280", prompt: `Brazilian woman early 30s, light-brown skin, natural curly hair, sitting on a cream linen sofa in a sunlit apartment, holding her phone and smiling softly as she reads a message, soft warm morning window light, shallow depth of field, small hot-pink phone case as accent, not looking at camera. ${LOOK} Vertical 4:5.` },
  { name: "c2-fitness",  size: "1024x1280", prompt: `Young Black Brazilian man mid-20s, athletic, in a simple home gym by a window, recording a workout reel on a phone on a small tripod with a ring light, mid-motion and laughing, faint pink ring-light reflection. ${LOOK} Vertical 4:5.` },
  { name: "c3-beleza",   size: "1024x1280", prompt: `Young mixed-race Brazilian woman in her 20s applying lipstick while filming a beauty reel on her phone at a small home vanity with a ring light, warm vanity lighting, soft pink glow accent, intimate and authentic. ${LOOK} Vertical 4:5.` },
  { name: "c4-coach",    size: "1024x1280", prompt: `Brazilian man in his 40s, fuller body type, light beard, glasses, sitting at a home desk talking to camera while recording a course lesson on a phone, relaxed confident expression, books and a plant behind him, one pink sticky note on the wall. ${LOOK} Vertical 4:5.` },
  { name: "c5-gastro",   size: "1024x1280", prompt: `Brazilian woman in her 50s, dark skin, hair in a colorful headwrap, filming a cooking reel on her phone in a cozy home kitchen, steam rising from a pan, joyful natural expression mid-laugh, warm golden kitchen light. ${LOOK} Vertical 4:5.` },
  { name: "c6-moda",     size: "1024x1280", prompt: `Young androgynous Brazilian person in their 20s, medium-brown skin, stylish thrift outfit, filming a try-on reel on a phone in a bedroom with a full-length mirror and a clothes rack, soft pink wall, relaxed authentic pose. ${LOOK} Vertical 4:5.` },
  { name: "c7-artesa",   size: "1024x1280", prompt: `Brazilian woman in her 60s, warm wrinkled smile, packing a handmade product into a kraft box at a home worktable, phone propped nearby, soft warm afternoon light, genuine pride, small pink ribbon as accent. ${LOOK} Vertical 4:5.` },
  { name: "day-morning", size: "1024x1820", prompt: `Brazilian woman early 30s, light-brown skin, curly hair, standing by a bright window in athleisure, casually filming a quick reel on her phone and smiling, fresh soft morning light, calm unhurried mood. ${LOOK} Vertical 9:16.` },
  { name: "day-night",   size: "1024x1820", prompt: `Brazilian woman early 30s, light-brown skin, curly hair, in cozy clothes at night sitting in bed, face softly lit by her phone screen, eyes wide and delighted, hand over mouth in happy surprise seeing many notifications, warm low lamp light and gentle screen glow, intimate and emotional. ${LOOK} Vertical 9:16.` },
  { name: "voice-quote", size: "1024x1280", prompt: `Candid editorial portrait of a Brazilian woman late 20s, medium skin, natural hair, laughing genuinely while looking down at her phone held in both hands, soft warm side light against a cream wall, shallow depth of field, real skin texture and freckles, one small pink earring. ${LOOK} Vertical 4:5.` },
];

async function gen({ name, prompt, size }) {
  try {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: MODEL, prompt, n: 1, size }),
    });
    if (!res.ok) { console.error(name, "HTTP", res.status, (await res.text()).slice(0, 200)); return; }
    const json = await res.json();
    const d = json?.data?.[0];
    let buf;
    if (d?.b64_json) buf = Buffer.from(d.b64_json, "base64");
    else if (d?.url) buf = Buffer.from(await (await fetch(d.url)).arrayBuffer());
    else { console.error(name, "resp inesperada", JSON.stringify(json).slice(0, 200)); return; }
    fs.writeFileSync(path.join(OUT, `${name}.png`), buf);
    console.log("OK", name, (buf.length / 1024).toFixed(0) + "KB");
  } catch (e) { console.error(name, e.message); }
}

for (const t of tasks) { await gen(t); }
console.log("DONE");
