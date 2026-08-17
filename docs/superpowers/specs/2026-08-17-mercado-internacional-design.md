# LP internacional: preço por país, sem grátis fora do BR, home em EN/ES

**Data:** 17/08/2026 · **Repo:** `notifiquei-lp-nova` (+ 1 passo no `instaV2`)

## Objetivo

Visitante de fora do Brasil vê preço em dólar ou euro, botão que leva ao Stripe, e
**não** vê o plano grátis. Visitante brasileiro não vê diferença nenhuma. A home ganha
versão em inglês e espanhol.

## Decisões tomadas (17/08)

| Ponto | Decisão |
|---|---|
| Geo | Só troca **preço e checkout**. Sem redirecionar página. |
| Plano grátis | Some **só na versão gringa**. No Brasil continua como está. |
| CTA gringo | "Começar agora" + garantia de 7 dias. Sem promessa de trial. |
| i18n | Só a home (`/en`, `/es`). Blog e demais páginas seguem em PT. |
| Checkout | Botão leva ao cadastro com o plano na URL; paga dentro do app pelo fluxo Stripe já existente. |

### Por que não redirecionar por IP

O Googlebot rastreia majoritariamente de IPs dos EUA. Redirecionar "não-BR → /en" faz o
Google enxergar o site como se fosse só a versão gringa e ameaça o posicionamento dos 35
posts do blog em português — que é a máquina de tráfego orgânico. URLs distintas +
`hreflang` + banner de sugestão entregam o mesmo resultado comercial sem esse risco.

## Arquitetura

### Camada geo — Cloudflare Pages Function

Hoje a LP é 100% estática, sem nenhuma function. Entra uma:

```
functions/_middleware.js
```

Responsabilidade única: ler `request.cf.country`, decidir mercado e moeda, e estampar no
`<html>` via **HTMLRewriter** (transformação na borda, sem piscada e sem JS de decisão):

```html
<html data-market="BR|INTL" data-currency="BRL|USD|EUR">
```

Mapa de moeda:

- `BR` → mercado `BR`, moeda `BRL`
- Zona do euro (`AT BE CY DE EE ES FI FR GR HR IE IT LT LU LV MT NL PT SI SK` + `AD MC SM VA`) → `INTL` / `EUR`
- Qualquer outro → `INTL` / `USD`

**Modo de falha:** se a Function não rodar ou o país vier vazio, o `<html>` fica sem os
atributos e o CSS cai no padrão **Brasil** — ou seja, o site se comporta exatamente como
hoje. Falha para o lado seguro.

### Como o HTML serve os dois mercados

O build gera **todas** as variantes no HTML; o CSS revela a certa. Nada de JS decidindo,
nada de request extra.

```html
<span data-cur="BRL">R$ 99</span>
<span data-cur="USD">$19</span>
<span data-cur="EUR">€18</span>
```

```css
[data-cur] { display: none; }
html[data-currency="USD"] [data-cur="USD"],
html[data-currency="EUR"] [data-cur="EUR"],
html[data-currency="BRL"] [data-cur="BRL"],
html:not([data-currency]) [data-cur="BRL"] { display: inline; }

html[data-market="INTL"] .br-only { display: none; }
html[data-market="BR"] .intl-only,
html:not([data-market]) .intl-only { display: none; }
```

Custo: o HTML cresce (três variantes de preço), mas é texto — some no gzip.

### Cache

A Function transforma HTML por requisição. Assets (`/assets/*`, imagens, vídeos) seguem
cacheados normalmente; só o HTML passa pelo rewriter. HTML é pequeno e a origem é o
próprio edge do Pages, então o custo é de milissegundos.

## O que muda fora do Brasil

| Elemento | Brasil | Internacional |
|---|---|---|
| Preço dos planos | R$ 99 / 499 / 799 | $19 / 79 / 129 · €18 / 75 / 125 |
| Ciclo anual | R$ 990 / 4.990 / 7.990 | $190 / 790 / 1.290 · €180 / 750 / 1.250 |
| Botão do plano | `pay.cakto.com.br/...` | `app.notifiquei.com.br/auth?plan=<slug>&cycle=<m\|a>&src=intl` |
| Card do plano grátis | visível | **escondido** |
| CTA principal | "Começar grátis" | "Começar agora" |
| Badge do hero | "Comece grátis · sem cartão" | "Garantia de 7 dias · cancele quando quiser" |
| Barra fixa (mobile) | "Grátis pra sempre" | "A partir de $19/mês" |
| Comparativo ManyChat/Gaio | tabela em R$ | **escondida** (os valores em real não dizem nada lá fora; variante em US$ fica pra depois) |

## i18n

- `/en` e `/es` — só a home, geradas de um dicionário compartilhado (`src/i18n/`).
- Páginas internacionais **nunca** mostram o plano grátis nem preço em real.
- `hreflang` recíproco em `/`, `/en`, `/es` no `Base.astro`.
- Banner discreto no topo sugerindo o idioma quando `data-market="INTL"` e a página é PT.
  Dismissível, grava em `localStorage`, **não** redireciona.
- Blog e demais páginas ficam em português. Traduzir 35 posts é projeto à parte.

## Stripe — o que falta (repo instaV2)

O catálogo já existe (criado 14/08, conta aprovada em 17/08: `charges_enabled`,
`payouts_enabled`, cartão ativo, zero pendências). Falta:

1. Mapear os price IDs nos planos — `MAPEAR_PLANOS_STRIPE.sql`, rodado **no Postgres do
   VPS**, não no Supabase antigo (ver `reference_banco_producao_nao_e_supabase`).
2. Pôr o `whsec_` real em `STRIPE_WEBHOOK_SECRET` no `.env` do VPS (o valor lá é
   placeholder) e recriar os containers com `--force-recreate`.

Sem (1), `/billing/stripe/plans` não devolve plano nenhum e o gringo que se cadastrar não
acha o que comprar. Sem (2), o pagamento acontece e a assinatura nunca é liberada.

## Fases

1. **Geo + preço internacional** — Function, variantes de preço, CTAs, esconder grátis e
   comparativo. É o que destrava a venda lá fora.
2. **i18n da home** — dicionário, `/en`, `/es`, hreflang, banner.
3. **Stripe backend** — os dois passos acima (dependem do Antônio: SQL no VPS e o segredo).

## Como verifico

- `curl -H "CF-IPCountry: US"` e `BR` contra o preview, conferindo `data-market` e
  `data-currency` no HTML servido — e o **conteúdo** renderizado, não só o status.
- Build do Astro limpo.
- Screenshot das duas variantes (BR e INTL) em desktop e mobile.
- Depois de publicar: `scripts/verificar-deploy-web.sh` no painel não se aplica aqui, mas
  vale conferir `content-type` dos assets da LP e a presença das strings novas no HTML.

## Fora de escopo

- Traduzir o blog (35 posts).
- Traduzir `/criadores`, `/vs-manychat`, `/afiliados`, `/ferramentas`.
- Payment Links do Stripe e compra anônima (decidido: fica pra quando o volume justificar).
- Variante em dólar da tabela comparativa.
