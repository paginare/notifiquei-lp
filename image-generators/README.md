# image-generators

Receitas que geram as imagens da landing page. **Não fazem parte do build** (pasta fora de `src/` e `public/`), são só ferramentas versionadas pra não se perderem.

## Dois tipos

**Geradores APIYI** (fotos via IA — modelo `gemini-3.1-flash-image-preview`):
- `og-person.mjs` — foto lifestyle de criador(a) brasileiro(a) (usada no OG e no banner). Salva em `/tmp/og-person.png`.
- `testi-bg.mjs` — foto de fundo escura/atmosférica da seção de depoimentos (estúdio de criador). Salva em `/tmp/testi-bg.png`.
- `niches.mjs` — 5 fotos de nicho do marquee de criadores (pet, confeitaria, estética, decoração, fotografia). Salva em `/tmp/c8..c12.png`.

**Compositores Puppeteer** (montam texto/marca nítidos sobre HTML+CSS na identidade da LP — fontes em base64, sem depender da IA pra texto):
- `og-image.mjs` — OG image 1200×630 (foto + headline + selos). Escreve em `public/assets/og-image.jpg`.
- `checkout-banner.mjs` — banner do checkout Cakto 1280×320 ("7 dias grátis"). Escreve em `/tmp/checkout-banner.png`.

## Fluxo (gerar → otimizar → publicar)

1. Gerar a foto (APIYI) → sai PNG cru em `/tmp` (ou `out/`).
2. Otimizar/redimensionar com **sharp** pra webp e colocar em `public/assets/...` (ver os commits de cada imagem pros tamanhos/qualidade usados).
3. Para OG/banner: rodar o compositor, que lê a foto + selos de `assets/` e renderiza o resultado final.

## Como rodar (a partir da raiz do repo)

```bash
# geradores APIYI (precisam da chave):
APIYI_KEY=sk-xxxx node image-generators/testi-bg.mjs
APIYI_KEY=sk-xxxx node image-generators/niches.mjs

# compositores (não precisam de chave):
node image-generators/og-image.mjs
node image-generators/checkout-banner.mjs
```

## Dependências (deste ambiente)

- **`APIYI_KEY`** — chave da APIYI, via env (NUNCA commitar). Endpoint: `api.apiyi.com`. Ver `.env.example`.
- **puppeteer** — importado de `../carrossel-generator/node_modules/puppeteer` (caminho absoluto no topo dos compositores). Se mudar de máquina, ajustar o import.
- **Chrome** — `executablePath: /Applications/Google Chrome.app/...` (macOS).
- **sharp** — vem do `node_modules` deste repo (passo de otimização, manual).
- `assets/og-person2.png` (foto do criador) e `assets/meta-cropped.png` (selo Meta cropado) são lidos pelos compositores.
