# Assets das landings

Esta pasta contém os arquivos estáticos referenciados pelas 3 landings.

## 📦 Já inclusos

| Arquivo | Tamanho | Uso |
|---|---|---|
| `favicon.svg` | 1 KB | Favicon principal (SVG, nítido em qualquer DPI) |
| `favicon-32.png` | 1 KB | Fallback PNG pra navegadores sem suporte a SVG favicon |
| `favicon-180.png` | 5 KB | `apple-touch-icon` pra iOS/iPadOS |

O favicon é o **símbolo das ondas** da logo em cream sobre fundo rosa brand (#FF1F6D), com cantos arredondados estilo app icon. Funciona bem em aba clara e escura.

## ⚠️ Falta adicionar

### `servidores-turbo.png`
Badge que já existe no site atual:
→ https://www.notifiquei.com.br/servidores-turbo.png

Download dessa URL e salva como `servidores-turbo.png` nesta pasta.

**Fallback automático:** se o arquivo local não existir, as landings tentam carregar direto da URL da produção (via `onerror` do `<img>`). Funciona mesmo sem o arquivo local — mas é mais rápido e confiável servir pelo seu próprio domínio.

### `abacatepay.svg` (ou `.png`)
Logo oficial da Abacatepay pra badge "Payments by".

Pega o arquivo oficial em:
→ https://abacatepay.com/ (área de brand/press kit)
→ ou solicita pro time deles

**Nomeie como `abacatepay.svg`** e coloca aqui. Se for PNG, renomeia pra `.png` e ajusta a extensão no `<img src>` dentro de cada landing (3 arquivos: index.html, criadores.html, afiliados.html).

**Fallback automático:** se o arquivo não existir, a landing mostra `🥑 Abacatepay` como texto estilizado. Funciona, mas a logo oficial fica melhor.

## Resumo final

```
landing-pages/assets/
├── README.md             ← este arquivo
├── favicon.svg           ✓ incluso
├── favicon-32.png        ✓ incluso
├── favicon-180.png       ✓ incluso
├── servidores-turbo.png  ⚠️ baixar de notifiquei.com.br
└── abacatepay.svg        ⚠️ pegar com o time da Abacatepay
```

Sem os 2 últimos, as landings ainda renderizam corretamente (com fallbacks). Com eles, fica na identidade visual completa.
