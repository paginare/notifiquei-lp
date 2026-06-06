# Redesign da Landing Page — Notifiquei

**Data:** 2026-06-06
**Projeto:** `notifiquei-lp-nova`
**Status:** Spec para aprovação

---

## 1. Objetivo

Recriar do zero a landing page institucional do Notifiquei, hoje "amadora" e com links quebrados (um único `index.html` de 188KB com tudo inline). A nova LP deve ter o nível de craft das referências dadas pelo usuário: [emilkowal.ski](https://emilkowal.ski/skill), [impeccable.style](https://impeccable.style), [tasteskill.dev](https://www.tasteskill.dev/) — editorial, muito respiro, tipografia forte, micro-interações suaves, um único acento elétrico.

### Decisões do usuário (travadas)
- **Escopo:** principal (`index`) + segmentadas (`criadores`, `afiliados`). Começa pela `index`, que estabelece o design system; depois replica.
- **Conteúdo:** reescrever toda a copy do zero (mantendo os preços e dados reais).
- **Visual:** liberdade total. Única amarra: manter o **rosa `#FF1F6D`** e a **logo**. Resto livre.
- **Stack:** **Astro** (estático), pela vantagem de SEO, velocidade (zero JS por padrão) e reuso de componentes entre as 3 páginas.

## 2. Não-objetivos (YAGNI)

- **Não** tocar nas páginas legais/transacionais existentes: `termos-de-uso.html`, `politica-de-privacidade.html`, `dpa.html`, `obrigado.html`, `vitalicio.html`, `index2.html`. Entram intactas em `public/` e saem nas mesmas URLs.
- **Não** migrar para framework com runtime (React/Vue) no cliente. Astro estático, ilhas só onde precisar.
- **Não** criar CMS, blog ou área logada. É LP estática.
- **Não** inventar dados: preços, depoimentos e diferenciais vêm do conteúdo atual.

## 3. Arquitetura técnica

### Stack
- **Astro** (último estável), saída **estática** (`output: 'static'`).
- **Zero dependências de UI runtime.** Animações via CSS moderno (scroll-driven `animation-timeline: view()`) + ilhas mínimas de JS vanilla só onde CSS não alcança (ex.: contador, accordion do FAQ com `<details>` nativo — sem JS).
- **Fontes self-hosted** (já existem `bricolage-700/800`, `jakarta-400/600/700` em `assets/fonts/`). Reaproveitar para evitar download externo. Adicionar uma monospace só se necessário (preferir stack de sistema `ui-monospace`).
- **Imagens:** `astro:assets` para otimização (avif/webp, responsivas, lazy).

### Estrutura de pastas (novo)
```
notifiquei-lp-nova/
├── astro.config.mjs
├── package.json
├── public/                      ← pass-through intacto
│   ├── termos-de-uso.html
│   ├── politica-de-privacidade.html
│   ├── dpa.html
│   ├── obrigado.html
│   ├── vitalicio.html
│   ├── index2.html
│   └── assets/                  ← fonts, favicons, og-image, clientes/ (paths preservados)
├── src/
│   ├── styles/
│   │   ├── tokens.css           ← design tokens (cor, type scale, espaço, raio, sombra)
│   │   └── global.css           ← reset + base + utilitários
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Button.astro
│   │   ├── Section.astro        ← wrapper com reveal no scroll
│   │   ├── Eyebrow.astro        ← label mono maiúsculo
│   │   ├── Marquee.astro        ← faixa de logos / chips
│   │   ├── ChatBubble.astro     ← bolha de conversa reutilizável
│   │   ├── PricingCard.astro
│   │   ├── FeatureCard.astro
│   │   └── FaqItem.astro
│   ├── layouts/
│   │   └── Base.astro           ← <head>, SEO, OG, JSON-LD, fonts, GTM/pixel
│   └── pages/
│       ├── index.astro
│       ├── criadores.astro      ← fase 2
│       └── afiliados.astro      ← fase 2
└── docs/superpowers/specs/...
```

### Deploy / Vercel
- Projeto já linkado (`prj_VY1qfSJyZehYs8fZNAOqb5MX3NTa`). Vercel autodetecta Astro.
- `vercel.json`: remover `outputDirectory: landing-pages` (Astro emite `dist/`); manter `cleanUrls: true`, `trailingSlash: false` e os headers de cache de `/assets/*`.
- `build.format` do Astro definido para preservar URLs limpas das páginas Astro (`/criadores`, `/afiliados`) e das estáticas em `public/` (`/termos-de-uso`, `/dpa`, `/vitalicio`, `/obrigado`).

## 4. Linguagem visual

Direção: **editorial de alto craft, papel quente, um acento elétrico.**

### Cor (tokens em OKLCH com fallback hex)
- `--ink`: quase-preto quente (`#16110F` aprox.) — texto e seções dramáticas.
- `--paper`: branco-papel quente, bem mais sóbrio que o creme atual (`#FBF8F4` aprox.).
- `--paper-2`: tom de quebra secundária.
- `--brand`: **`#FF1F6D`** (mantido) — usado com parcimônia: CTA, ênfase pontual, detalhes. Nada de banhar tudo de rosa.
- `--brand-ink`: rosa escurecido para texto sobre claro quando precisar de contraste AA.
- Cinzas quentes derivados para bordas/secundário.
- **Distribuição:** ~70% papel, ~20% ink (momentos dramáticos: contraste, risco/API, CTA final), ~10% rosa (acento).

### Tipografia
- **Display:** Bricolage Grotesque (700/800) — headlines grandes, `text-wrap: balance`, tracking negativo sutil.
- **Corpo:** Plus Jakarta Sans (400/600/700).
- **Labels/eyebrows:** monospace de sistema, maiúsculo, tracking aberto, pequeno — assinatura dos sites de referência.
- Escala tipográfica fluida com `clamp()`.

### Movimento (sutil, nunca gratuito)
- Revelação no scroll (fade + translate pequeno) via `animation-timeline: view()`, com `prefers-reduced-motion` respeitado.
- Hero: automação "acontecendo ao vivo" (bolhas que entram em sequência).
- Bloco emocional: chat "sem Notifiquei × com Notifiquei" animado em sequência ao entrar na viewport.
- Botões: micro-interação (leve elevação/escala, transição suave).
- Seção de risco (API oficial) em fundo `--ink`, contraste dramático.

### Acessibilidade
- Contraste AA mínimo em todo texto (atenção ao rosa sobre claro — usar `--brand-ink` para texto).
- Foco visível, navegação por teclado, `aria` nos componentes interativos, alt em imagens.
- FAQ com `<details>/<summary>` nativo (acessível sem JS).
- Movimento desligado com `prefers-reduced-motion`.

## 5. Estrutura e copy da `index` (reescrita)

Ordem das seções (copy abaixo é direção — refinada na implementação):

1. **Nav** — logo + links âncora minimalistas (Como funciona · Recursos · vs ManyChat · Planos) + CTA "Entrar"/"Começar".
2. **Hero** — headline de tensão ("Eles comentam. A gente vende."), subhead (responde DMs, comentários e stories na hora, com a sua voz, pela API oficial da Meta), dual CTA, selo "Provedor oficial Meta · 7 dias de garantia". Visual: card de automação ao vivo.
3. **Prova social** — faixa de logos (`assets/clientes/`) + "+2.000 criadores já automatizam".
4. **O contraste** — sem Notifiquei (venda perdida) × com Notifiquei (venda fechada), em chat animado. Coração emocional.
5. **Como funciona** — 3 passos (Conecte o Instagram → Escolha os gatilhos → Relaxe e venda). "Cinco minutos. Zero código."
6. **Dentro da plataforma** — showcase: Montagem visual, Números em tempo real, Inbox unificada, Intenção de compra (IA), Moderação com IA. Cada um com mock de UI.
7. **Capacidades** — grade "tudo que precisa, nada que não precisa": comentário→DM, funil que qualifica, templates, times/agência, app no celular, agente de IA com a sua voz, sorteios pelos comentários, TikTok DM.
8. **Por que API oficial** (fundo `--ink`) — risco das ferramentas não-oficiais × proteção do parceiro certificado Meta.
9. **vs ManyChat** — tabela honesta (preço, suporte PT, configuração, API oficial, agente IA, sorteios, app, foco BR).
10. **Depoimentos** — Leid Medeiros (@leidconsultoria) + logos verificáveis.
11. **Planos** — Solo / Pro / Business (dados na seção 6).
12. **FAQ** — perguntas atuais (ban, programação, e-commerce, vs ManyChat, poucos seguidores, IA, conta profissional, cancelamento, TikTok).
13. **CTA final** — "Enquanto você lia isso, alguém comentou 'quero' no seu post." + botão.
14. **Footer** — navegação, contato, CNPJ, selos (Meta partner, TikTok partner), pagamentos (Abacatepay), links legais.

## 6. Dados reais (não inventar)

### Planos (recorrente, AbacatePay)
| Plano | Preço | Destaque | Inclui | Checkout |
|---|---|---|---|---|
| **Solo** | R$ 99/mês | Criador iniciante | 1 conta, automações ilimitadas, templates básicos, suporte chat | `https://app.abacatepay.com/pay/bill_XfbzAFRLF2eewHGZFGD60Cbd` |
| **Pro** | R$ 499/mês | **Mais popular** | 5 contas, times/equipe, ilimitadas, templates completos, suporte chat | `https://app.abacatepay.com/pay/bill_JE2kBfquBfQKRJbaycuhwrmF` |
| **Business** | R$ 799/mês | Agência | 10 contas, times, atendimento VIP + controle no WhatsApp | `https://app.abacatepay.com/pay/bill_DyLau2JXc0RDXKbHsAYcCSTp` |

Garantia de 7 dias em todos. Comparativo: "Um funcionário custa R$ 2.500/mês."

### Links e contatos (preservar)
- App / login: `https://app.notifiquei.com.br`
- WhatsApp: `https://wa.me/551231995949` · (12) 3199-5949
- E-mail: `contato@notifiquei.com.br`
- Sociais: Instagram `@notifiquei.com.br`, YouTube `@notifiqueicombr`, LinkedIn `company/notifiquei`
- Legais (estáticas, pass-through): `/termos-de-uso`, `/politica-de-privacidade`, `/dpa`
- CNPJ: 59.859.848/0001-13
- Selos: Provedor oficial Meta, TikTok Marketing Partner, Pagamentos Abacatepay
- **Futuro (do peer no app):** podem surgir rotas de "comparação vs ManyChat" e "afiliado NINHO" — deixar nav/footer fáceis de estender quando as URLs existirem.

### Assets disponíveis
- Fontes self-hosted, favicons (`favicon.svg`, `-32`, `-180`), `og-image.jpg`, `meta-business-partner.png`, `tiktok-marketing-partner.svg`, `servidores-turbo.png`, logos de clientes em `assets/clientes/`.

## 7. SEO & performance

- `<title>` e meta description por página; OG/Twitter cards com `og-image.jpg`.
- **JSON-LD:** `Organization` + `Product`/`Offer` (planos) + `FAQPage` (perguntas do FAQ).
- HTML semântico (`<header><main><section><footer>`, headings em ordem).
- Fontes com `preload` + `font-display: swap`; CSS crítico inline pelo Astro.
- Imagens otimizadas e dimensionadas (evitar CLS). Lighthouse alvo: 95+ em Perf/SEO/Best Practices/A11y.
- Manter GTM/Meta Pixel (com consentimento — já existe `cookie-consent.js`).

## 8. Plano de implementação (fases)

- **Fase 0 — Andaime:** criar projeto Astro, mover `public/` (legais + assets), configurar Vercel/`vercel.json`, tokens + global CSS, layout Base com SEO. Verificar build e que as páginas legais respondem nas URLs corretas.
- **Fase 1 — `index` completa:** todos os componentes + todas as seções com copy reescrita. Renderizar no navegador, iterar visualmente com o usuário até aprovar.
- **Fase 2 — `criadores` + `afiliados`:** reaproveitar componentes/tokens, copy específica de cada segmento.
- **Fase 3 — Polimento:** Lighthouse, a11y, responsivo (mobile-first), QA de links, OG, deploy preview na Vercel.

## 9. Verificação

- `npm run build` sem erros; `dist/` contém `index.html`, `criadores`, `afiliados` e as páginas legais intactas.
- Todos os `href` resolvem (sem 404 — corrige o problema original de "links quebrados").
- CTAs apontam para os checkouts/app corretos.
- Lighthouse mobile ≥ 95 em Performance e SEO.
- Responsivo de 320px a desktop largo.
- `prefers-reduced-motion` desliga animações.
- Preview na Vercel revisado pelo usuário antes de promover a produção.
