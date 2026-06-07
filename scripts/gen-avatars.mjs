import fs from "fs";
import path from "path";

// Token: reaproveita o dos outros projetos (não fica no git deste repo).
const TOKEN =
  process.env.APIYI_TOKEN ||
  (() => {
    for (const p of [
      "/Users/antonioduarte/Lançar/ver-o-sofisticado-seu-guia-essencial/gtm-carrosseis/.env",
      "/Users/antonioduarte/Lançar/carrosseis-notifiquei-v2/.env",
    ]) {
      try {
        const m = fs.readFileSync(p, "utf8").match(/APIYI_TOKEN=(\S+)/);
        if (m) return m[1];
      } catch {}
    }
  })();

if (!TOKEN) {
  console.error("Sem APIYI_TOKEN");
  process.exit(1);
}

const BASE = "https://api.apiyi.com/v1/images/generations";
const MODEL = "gemini-3.1-flash-image-preview";
const OUT = "/Users/antonioduarte/Lançar/notifiquei-lp-nova/public/assets/avatars";
fs.mkdirSync(OUT, { recursive: true });

const COMMON =
  "Photorealistic friendly close-up headshot portrait, real natural human skin texture, candid and authentic (not a stock photo, not over-retouched), soft natural window light, plain softly-blurred warm neutral background (#FBF7F0 cream tone), shot on 50mm, centered face, looking at camera with a warm genuine smile, Brazilian. Square 1:1 framing suitable for a circular avatar. No text, no watermark, no logo.";

const tasks = [
  { name: "mariana", prompt: `Young Brazilian woman, ~27, fitness creator, healthy glow, hair in a casual ponytail, wearing a simple light activewear top. ${COMMON}` },
  { name: "joao", prompt: `Brazilian man, ~32, small supplements business owner, short beard, friendly approachable look, wearing a plain dark t-shirt. ${COMMON}` },
  { name: "bia", prompt: `Brazilian woman, ~30, aesthetician / beauty professional, warm tan skin, soft makeup, hair down, wearing a cream blouse. ${COMMON}` },
];

async function gen({ name, prompt }) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, prompt, n: 1, size: "1024x1024" }),
  });
  if (!res.ok) {
    console.error(name, "HTTP", res.status, (await res.text()).slice(0, 300));
    return false;
  }
  const json = await res.json();
  const d = json?.data?.[0];
  let buf;
  if (d?.b64_json) buf = Buffer.from(d.b64_json, "base64");
  else if (d?.url) buf = Buffer.from(await (await fetch(d.url)).arrayBuffer());
  else {
    console.error(name, "resposta inesperada:", JSON.stringify(json).slice(0, 300));
    return false;
  }
  const file = path.join(OUT, `${name}.png`);
  fs.writeFileSync(file, buf);
  console.log("OK", file, (buf.length / 1024).toFixed(0) + "KB");
  return true;
}

for (const t of tasks) {
  try { await gen(t); } catch (e) { console.error(t.name, e.message); }
}
