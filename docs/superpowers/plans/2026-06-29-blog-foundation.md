# Blog Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a native blog inside the Astro site at `/blog`, with one migrated, fully SEO/GEO-optimized seed article, and wire it into the site's internal linking.

**Architecture:** Astro 5 Content Layer collection (`blog`) loading markdown from `src/content/blog/`. A list page (`/blog`) and an article template (`/blog/[slug]`) render the content reusing the existing `Base`/`Nav`/`Footer` and design tokens. Each article emits `BlogPosting` + `BreadcrumbList` (+ `FAQPage` when it has FAQ) JSON-LD and a GEO-friendly layout (TL;DR block, question-style headings, FAQ, sources). Internal links are added from `Nav` and `Footer`.

**Tech Stack:** Astro 5.18.2 (Content Layer API, `glob` loader from `astro/loaders`), plain markdown (no MDX), `@astrojs/sitemap` (already integrated), Cloudflare Pages.

## Global Constraints

- Astro version: **5.18.2**. Use the Content Layer API: `defineCollection` + `glob({ pattern, base })` from `astro/loaders`. **No MDX** — articles are plain `.md`.
- `astro.config.mjs` already sets: `site: 'https://notifiquei.com.br'`, `trailingSlash: 'never'`, `build: { format: 'file', inlineStylesheets: 'always' }`. Do **not** change it in this plan. `format: 'file'` makes `src/pages/blog/index.astro` → `dist/blog.html` and `src/pages/blog/[slug].astro` → `dist/blog/<slug>.html`, both served clean by Cloudflare (proven: `/afiliados` + `/afiliados/central` already coexist this way).
- Links use **no trailing slash**: `/blog`, `/blog/<slug>`.
- Reuse the existing design system: `Base` layout (`src/layouts/Base.astro`, props `title, description, path, jsonLd, noindex`), `Nav`, `Footer`, and tokens in `src/styles/tokens.css` (`--brand #FF1F6D`, `--brand-ink #C90C54`, `--ink`, `--ink-soft`, `--paper`, `--paper-2`, `--card`, `--line`, `--font-display`, `--font-mono`, `--r-lg`, `--shadow-sm`, `--ease-out`, etc.) and global utility classes (`.section`, `.section--paper2`, `.container`, `.container--narrow`, `.eyebrow`, `.eyebrow.is-plain`, `.lead`, `.hl`, `.section-head`, `.btn`, `.btn--brand`, `.btn--ghost`, `.btn--lg`, `.arr`).
- Voice (from `_contexto/preferencias.md`): natural, conversado, PT-BR, "você" + "a gente". No punchline copy, no one/two-word fragments as sentences, no AI-marketing clichés ("revolucione", "potencialize"). Emoji só em mockup de chat, nunca no texto editorial.
- Author default: **"Carlos Duarte"**. Publisher: the existing Organization (`@id` `https://notifiquei.com.br/#org`, declared in `src/pages/index.astro`).
- **No unit-test framework in this repo.** Verification per task = `npm run build` (must succeed) + asserting markers in the generated `dist/` HTML with `grep`. Treat "test fails before / passes after" as "marker absent before the file exists / present after".
- **Scope guard:** this plan is **additive and verified locally** (build + `npm run preview`). Do **NOT** touch the existing Cloudflare `/blog` proxy, do **NOT** add redirects, and do **NOT** deploy to production here — domain cutover, bulk migration, redirects, and the `notifiquei-blog-post` skill update are separate follow-on plans (listed at the end). Execute on a feature branch `feat/blog-foundation`.

---

### Task 1: Content collection + seed article

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/api-oficial-meta-automacao-instagram.md`

**Interfaces:**
- Produces: a collection named `blog`. Each entry has `entry.id` (string slug = filename without `.md`), `entry.data` (typed by the schema below), and is renderable via `render(entry)`. Schema fields later tasks rely on: `title: string`, `description: string`, `date: Date`, `updated?: Date`, `author: string`, `category: string`, `tags: string[]`, `cover?: string`, `coverAlt?: string`, `keywords: string[]`, `draft: boolean`, `tldr?: string`, `faq: { q: string; a: string }[]`.

- [ ] **Step 1: Create the collection config**

Create `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Carlos Duarte'),
    category: z.string().default('Estratégia'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    tldr: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Create the seed article (migrated from the old blog)**

Create `src/content/blog/api-oficial-meta-automacao-instagram.md`. Frontmatter is the new schema (converted from the old `excerpt`/`imageUrl`, plus new `tldr`/`faq`/`keywords`/`tags`). Body is the existing prose verbatim from `/Users/antonioduarte/Lançar/blog-notifiquei/data/posts/api-oficial-meta-automacao-instagram.md` (lines 12–96), keeping the `Sources` block and **dropping** the old `Leia também` block (lines 100–104) — related posts are auto-generated by the template:

```markdown
---
title: "API oficial da Meta pra automação no Instagram: o que isso significa pra você"
description: "Tem ferramenta de automação que some do nada e bana sua conta junto. Entenda por que a API oficial da Meta é diferente — e por que isso importa pra quem vende."
date: 2026-04-20
author: "Carlos Duarte"
category: "Estratégia"
tags: ["Automação", "Segurança", "Instagram"]
cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop"
coverAlt: "Tela de celular com o app do Instagram aberto"
keywords: ["API oficial da Meta", "automação Instagram", "banimento Instagram", "Instagram Graph API", "Messaging API"]
tldr: "Ferramenta de automação que não usa a API oficial da Meta simula um humano e pode derrubar seu perfil sem aviso. A API oficial é aprovada pela Meta, nunca pede sua senha e não coloca a conta em risco — é assim que o Notifiquei opera."
faq:
  - q: "Automação de Instagram pode bloquear minha conta?"
    a: "A automação em si não. O risco vem de ferramentas não oficiais, que simulam um humano e violam os termos da Meta. Quem usa a API oficial da Meta não corre risco de banimento por automação, porque as ações são reconhecidas como operação legítima de negócio."
  - q: "Como sei se uma ferramenta usa a API oficial da Meta?"
    a: "Pergunte direto se ela é parceira oficial, com acesso aprovado à Instagram Graph API ou à Messaging API. E desconfie se ela pedir a senha do seu Instagram: a API oficial nunca precisa de senha, ela trabalha com permissões concedidas dentro da própria Meta."
  - q: "Qual o limite de mensagens da API oficial do Instagram?"
    a: "A API oficial permite cerca de 200 mensagens por hora por conta. É justamente esse controle que mantém o envio sustentável, sem parecer spam e sem disparar os alertas de segurança do Instagram."
---

Você já deve ter visto alguma ferramenta de automação pro Instagram prometendo responder DMs sozinha, enviar mensagem pra quem comentou no post, mandar catálogo automático, essas coisas. Algumas parecem até boas. Têm dashboard bonito, plano baratinho, suporte no WhatsApp.

Mas tem uma pergunta que muita gente não faz antes de assinar: essa ferramenta usa a API oficial da Meta ou tá rodando numa gambiarra que o Instagram vai barrar qualquer hora?

A diferença entre as duas respostas pode ser a diferença entre uma operação de vendas funcionando de madrugada enquanto você dorme — e acordar com a sua conta de 50 mil seguidores desativada sem explicação.

## o que é essa tal de API oficial

API é uma sigla técnica que, na prática, significa uma porta de comunicação. Quando você usa um aplicativo que acessa seu Instagram, esse aplicativo tá usando uma API pra conversar com a plataforma.

A Meta — empresa dona do Instagram, do WhatsApp e do Facebook — tem uma API oficial chamada Instagram Graph API. É ela que empresas parceiras usam pra criar integrações legítimas com a plataforma. Dentro dessa infraestrutura existe também a Messaging API, que é a parte específica que permite automação de mensagens diretas.

Quando uma ferramenta usa a API oficial, ela tá dentro das regras da Meta. A Meta sabe que ela existe. A Meta aprovou o acesso. A Meta pode auditar o que ela faz.

Isso muda tudo.

## o que as ferramentas não oficiais fazem

Aqui começa o problema.

Ferramentas não oficiais não têm essa porta aberta pela Meta. Então elas fazem o seguinte: simulam ser um usuário humano acessando o Instagram normalmente, pelo navegador ou pelo app, e automatizam ações como se fosse uma pessoa fazendo tudo manualmente — mas muito mais rápido.

É basicamente um robô fingindo ser gente.

O Instagram detecta esse comportamento. Ele analisa padrão de uso, velocidade de ações, horários, volume. Quando algo foge do comportamento humano normal, o sistema de detecção entra em ação. E a punição não é um aviso carinhoso — é bloqueio de funcionalidade, suspensão temporária ou banimento permanente.

Tem gente que perdeu perfil com anos de construção, base de clientes fidelizada, conteúdo publicado, histórico de vendas — tudo — porque confiou numa ferramenta que prometia automação e não deixou claro que tava operando fora das regras.

## por que isso afeta quem vende pelo Instagram

Se você é lojista, criador de conteúdo ou prestador de serviços que usa o Instagram como canal de vendas, seu perfil não é só uma rede social. É seu ponto comercial. É onde seus clientes chegam, tiram dúvida, pedem orçamento, fecham pedido.

Imagina perder esse canal de uma hora pra outra.

Sem aviso prévio. Sem recuperação garantida. Com todo o histórico de conversas e contatos que você construiu ao longo de meses ou anos simplesmente sumindo.

Não é um cenário hipotético. É exatamente o que acontece quando a Meta identifica violação de termos de uso. E o uso de ferramentas não autorizadas é violação direta. O processo de recurso é lento, burocrático e sem garantia nenhuma de resultado.

## o que muda quando a ferramenta usa a API oficial

Quando uma plataforma de automação usa a API oficial da Meta, a relação é outra.

Primeiro, a Meta aprovou aquele acesso. Isso significa que a empresa por trás da ferramenta passou por um processo de revisão, aceitou os termos de uso da plataforma e se comprometeu a operar dentro das regras.

Segundo, sua conta não corre risco de banimento por automação. As ações que a ferramenta executa são reconhecidas pelo Instagram como operações legítimas de negócio, não como comportamento suspeito de bot.

Terceiro, a estabilidade é real. Ferramentas que operam por gambiarra somem do nada porque o Instagram fecha a brecha que elas exploravam. Ferramentas que usam API oficial continuam funcionando porque o acesso delas foi negociado, não sequestrado.

Existe um detalhe técnico importante aqui: a API oficial tem limites. Por exemplo, há um limite de 200 mensagens por hora por conta. Isso pode parecer restritivo, mas é justamente esse controle que garante que a plataforma funcione de forma sustentável — sem parecer spam, sem disparar alertas do sistema de segurança do Instagram, sem colocar sua conta em risco.

## a diferença que ninguém fala na hora da venda

A maioria das ferramentas não oficiais não vai te dizer claramente que operam fora da API oficial. Elas vão usar termos vagos como "integração com Instagram", "conecta direto com o seu perfil", "automação nativa".

Nenhum desses termos significa API oficial.

Para saber se uma ferramenta é realmente parceira oficial da Meta, você pode perguntar diretamente: vocês são um parceiro oficial da Meta? Têm acesso aprovado à Instagram Graph API ou à Messaging API? A resposta precisa ser direta e verificável — não uma resposta de vendas em cima da dúvida.

Outra forma de identificar: ferramentas não oficiais geralmente pedem sua senha do Instagram. A API oficial nunca precisa da sua senha. Ela trabalha com um sistema de autenticação diferente, via permissões que você concede ao aplicativo dentro da plataforma da Meta. Se uma ferramenta pedir sua senha pra funcionar, é sinal vermelho imediato.

## automação não é o problema — ferramenta errada é

Automatizar atendimento, responder quem comentou no post, enviar mensagem pra quem mandou uma palavra-chave, acompanhar o cliente que abandonou o carrinho — tudo isso faz sentido como estratégia de vendas. Libera tempo, escala o atendimento, não deixa cliente esperando.

O problema nunca foi automação. O problema é automação feita de qualquer jeito, com qualquer ferramenta, sem se perguntar se aquilo vai continuar funcionando amanhã — ou se vai levar sua conta junto quando o Instagram decidir fechar a brecha.

Quem constrói canal de vendas no Instagram precisa tratar esse canal com seriedade. E seriedade começa por não colocar o perfil na mão de uma ferramenta que opera na ilegalidade da plataforma.

## o que o Notifiquei faz diferente

O Notifiquei é uma plataforma de automação de vendas no Instagram que opera 100% dentro da API oficial da Meta. Isso não é detalhe técnico de rodapé — é o fundamento de como a ferramenta funciona.

Na prática, isso significa que você pode configurar respostas automáticas pra DMs, enviar catálogo quando alguém comentar numa palavra específica, acompanhar leads e fechar vendas — tudo sem colocar sua conta em risco, sem gambiarras, sem torcer pra ferramenta continuar funcionando semana que vem.

Se você vende pelo Instagram e quer escalar o atendimento de um jeito que não vai te deixar na mão, faz sentido conhecer o que o Notifiquei faz. Não precisa ser agora, mas quando a pergunta vier — essa ferramenta é segura? — você vai saber exatamente o que perguntar pra qualquer plataforma que considerar.

---

Sources:
- [Automações para Instagram: você está colocando seu perfil em risco ao usar a ferramenta errada? — Buzzmonitor](https://buzzmonitor.com.br/blog/automacoes-para-instagram-voce-esta-colocando-seu-perfil-em-risco-ao-usar-a-ferramenta-errada/)
- [Messaging API — Instagram Platform — Meta for Developers](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/)
- [Instagram API Rate Limits: 200 DMs/Hour Explained (2026)](https://creatorflow.so/blog/instagram-api-rate-limits-explained/)
```

- [ ] **Step 3: Build to verify the schema validates and the entry loads**

Run: `npm run build`
Expected: build completes with no schema error. (No new route yet, so no new HTML — this only proves the collection + frontmatter are valid. A frontmatter typo would fail here with a Zod error naming the field.)

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content/blog/api-oficial-meta-automacao-instagram.md
git commit -m "feat(blog): content collection + first migrated article"
```

---

### Task 2: Blog index page (`/blog`)

**Files:**
- Create: `src/pages/blog/index.astro`

**Interfaces:**
- Consumes: collection `blog` from Task 1 via `getCollection('blog')`; fields `data.title`, `data.description`, `data.date`, `data.category`, `data.cover`, `entry.id`.
- Produces: route `/blog` (emitted as `dist/blog.html`). Linked to by Task 4.

- [ ] **Step 1: Create the index page**

Create `src/pages/blog/index.astro`:

```astro
---
import Base from "../../layouts/Base.astro";
import Nav from "../../components/Nav.astro";
import Footer from "../../components/Footer.astro";
import { getCollection } from "astro:content";

const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime(),
);

const fmtDate = (d: Date) =>
  d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog do Notifiquei",
    url: "https://notifiquei.com.br/blog",
    publisher: { "@id": "https://notifiquei.com.br/#org" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Notifiquei", item: "https://notifiquei.com.br/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://notifiquei.com.br/blog" },
    ],
  },
];
---

<Base
  title="Blog do Notifiquei — automação de vendas no Instagram"
  description="Artigos sobre automação de Instagram e TikTok, vendas no direct, API oficial da Meta e estratégia de conteúdo — pra quem vende pelas redes."
  path="/blog"
  jsonLd={jsonLd}
>
  <Nav />
  <main>
    <section class="section bloghero">
      <div class="container container--narrow">
        <span class="eyebrow is-plain">Blog</span>
        <h1 class="bloghero__title">Como <span class="hl">vender mais</span> pelo Instagram, sem gambiarra.</h1>
        <p class="lead">Estratégia, automação e bastidores do que funciona pra quem usa o Instagram e o TikTok como canal de vendas.</p>
      </div>
    </section>

    <section class="section section--paper2">
      <div class="container">
        <ul class="postlist">
          {posts.map((post) => (
            <li class="postcard">
              <a class="postcard__link" href={`/blog/${post.id}`}>
                {post.data.cover && (
                  <img class="postcard__cover" src={post.data.cover} alt={post.data.coverAlt ?? ""} loading="lazy" width="600" height="338" />
                )}
                <div class="postcard__body">
                  <span class="postcard__cat">{post.data.category}</span>
                  <h2 class="postcard__title">{post.data.title}</h2>
                  <p class="postcard__desc">{post.data.description}</p>
                  <span class="postcard__date">{fmtDate(post.data.date)}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </main>
  <Footer />
</Base>

<style>
  .bloghero { padding-block: clamp(6rem, 4rem + 8vw, 9rem) var(--space-section); }
  .bloghero__title { margin-top: 1rem; font-size: var(--fs-display-l); line-height: 1.0; letter-spacing: -0.03em; }
  .bloghero .lead { margin-top: 1.2rem; }

  .postlist { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
  @media (min-width: 680px) { .postlist { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 1000px) { .postlist { grid-template-columns: repeat(3, 1fr); } }

  .postcard { background: var(--card); border: 1px solid var(--line); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out), border-color 0.2s var(--ease-out); }
  .postcard:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--brand); }
  .postcard__link { display: flex; flex-direction: column; height: 100%; }
  .postcard__cover { width: 100%; height: 180px; object-fit: cover; }
  .postcard__body { padding: 1.25rem 1.3rem 1.4rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
  .postcard__cat { font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--brand-ink); }
  .postcard__title { font-family: var(--font-display); font-weight: 700; font-size: 1.18rem; line-height: 1.2; letter-spacing: -0.01em; }
  .postcard__desc { font-size: 0.9rem; color: var(--ink-soft); line-height: 1.5; flex: 1; }
  .postcard__date { font-size: 0.78rem; color: var(--ink-faint); margin-top: 0.25rem; }
</style>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: PASS, and the log lists `▶ src/pages/blog/index.astro` → `/blog.html`.

- [ ] **Step 3: Verify the index rendered the seed post**

Run: `grep -c "api-oficial-meta-automacao-instagram" dist/blog.html`
Expected: `1` or more (the card links to the article).

Run: `grep -c '"@type":"Blog"' dist/blog.html`
Expected: `1` (Blog JSON-LD present).

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/index.astro
git commit -m "feat(blog): index page at /blog"
```

---

### Task 3: Article template (`/blog/[slug]`) with SEO + GEO

**Files:**
- Create: `src/pages/blog/[slug].astro`

**Interfaces:**
- Consumes: collection `blog` (Task 1) via `getCollection`/`render`; fields `data.title, data.description, data.date, data.updated, data.author, data.category, data.cover, data.coverAlt, data.tldr, data.faq, data.tags`.
- Produces: route `/blog/<slug>` (emitted as `dist/blog/<slug>.html`), with `BlogPosting` + `BreadcrumbList` (+ `FAQPage` when `faq.length > 0`) JSON-LD.

- [ ] **Step 1: Create the article template**

Create `src/pages/blog/[slug].astro`:

```astro
---
import Base from "../../layouts/Base.astro";
import Nav from "../../components/Nav.astro";
import Footer from "../../components/Footer.astro";
import { getCollection, render } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await render(post);
const d = post.data;
const url = `https://notifiquei.com.br/blog/${post.id}`;
const published = d.date.toISOString();
const modified = (d.updated ?? d.date).toISOString();

const fmtDate = (date: Date) =>
  date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

// Posts relacionados: mesma categoria primeiro, completa com recentes. Máx 3.
const all = (await getCollection("blog", ({ data }) => !data.draft))
  .filter((p) => p.id !== post.id)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const related = [
  ...all.filter((p) => p.data.category === d.category),
  ...all.filter((p) => p.data.category !== d.category),
].slice(0, 3);

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: d.title,
    description: d.description,
    ...(d.cover ? { image: d.cover } : {}),
    datePublished: published,
    dateModified: modified,
    author: { "@type": "Person", name: d.author },
    publisher: { "@id": "https://notifiquei.com.br/#org" },
    ...(d.keywords.length ? { keywords: d.keywords.join(", ") } : {}),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Notifiquei", item: "https://notifiquei.com.br/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://notifiquei.com.br/blog" },
      { "@type": "ListItem", position: 3, name: d.title, item: url },
    ],
  },
  ...(d.faq.length
    ? [{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: d.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }]
    : []),
];
---

<Base title={`${d.title} — Notifiquei`} description={d.description} path={`/blog/${post.id}`} jsonLd={jsonLd}>
  <Nav />
  <main>
    <article class="article">
      <div class="container container--narrow">
        <nav class="crumbs" aria-label="Você está em"><a href="/blog">Blog</a> · <span>{d.category}</span></nav>
        <h1 class="article__title">{d.title}</h1>
        <p class="article__meta">Por {d.author} · {fmtDate(d.date)}{d.updated ? ` · atualizado em ${fmtDate(d.updated)}` : ""}</p>

        {d.tldr && (
          <aside class="tldr">
            <span class="tldr__label">Resumo</span>
            <p>{d.tldr}</p>
          </aside>
        )}

        {d.cover && <img class="article__cover" src={d.cover} alt={d.coverAlt ?? ""} width="780" height="439" />}

        <div class="article__body">
          <Content />
        </div>

        {d.faq.length > 0 && (
          <section class="afaq">
            <h2 class="afaq__t">Perguntas frequentes</h2>
            {d.faq.map((f) => (
              <details class="afaq__item">
                <summary>{f.q}</summary>
                <div class="afaq__a"><p>{f.a}</p></div>
              </details>
            ))}
          </section>
        )}

        <aside class="acta">
          <h2 class="acta__t">Automatize suas vendas no Instagram com a API oficial da Meta</h2>
          <p>O Notifiquei responde DMs e comentários na sua voz, sem risco de bloqueio. Comece de graça.</p>
          <div class="acta__btns">
            <a class="btn btn--brand btn--lg" href="/">Conhecer o Notifiquei<span class="arr" aria-hidden="true">→</span></a>
            <a class="btn btn--ghost btn--lg" href="/vs-manychat">Comparar com o ManyChat</a>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div class="container">
          <section class="related">
            <h2 class="related__t">Leia também</h2>
            <ul class="related__list">
              {related.map((p) => (
                <li><a href={`/blog/${p.id}`}><span class="related__cat">{p.data.category}</span><span class="related__title">{p.data.title}</span></a></li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </article>
  </main>
  <Footer />
</Base>

<style>
  .article { padding-block: clamp(5.5rem, 4rem + 7vw, 8rem) var(--space-section); }
  .crumbs { font-size: 0.85rem; color: var(--ink-soft); }
  .crumbs a { color: var(--brand-ink); font-weight: 600; }
  .article__title { margin-top: 0.8rem; font-size: var(--fs-display-m); line-height: 1.1; letter-spacing: -0.02em; }
  .article__meta { margin-top: 0.8rem; font-size: 0.85rem; color: var(--ink-faint); font-family: var(--font-mono); }

  .tldr { margin-top: 1.75rem; background: var(--brand-wash); border: 1px solid color-mix(in srgb, var(--brand) 22%, transparent); border-radius: var(--r-md); padding: 1.1rem 1.3rem; }
  .tldr__label { font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.14em; color: var(--brand-ink); }
  .tldr p { margin-top: 0.4rem; font-size: 1rem; line-height: 1.55; color: var(--ink); }

  .article__cover { width: 100%; border-radius: var(--r-lg); margin-top: 1.75rem; }

  .article__body { margin-top: 2rem; font-size: 1.0625rem; line-height: 1.75; color: var(--ink); }
  .article__body :global(h2) { font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; letter-spacing: -0.01em; margin-top: 2.4rem; margin-bottom: 0.5rem; }
  .article__body :global(h3) { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; margin-top: 1.8rem; margin-bottom: 0.4rem; }
  .article__body :global(p) { margin-top: 1rem; }
  .article__body :global(ul), .article__body :global(ol) { margin-top: 1rem; padding-left: 1.3rem; display: flex; flex-direction: column; gap: 0.4rem; }
  .article__body :global(a) { color: var(--brand-ink); text-decoration: underline; text-underline-offset: 2px; }
  .article__body :global(hr) { margin-block: 2rem; border: none; border-top: 1px solid var(--line); }
  .article__body :global(strong) { font-weight: 700; }

  .afaq { margin-top: 3rem; }
  .afaq__t { font-family: var(--font-display); font-weight: 700; font-size: 1.4rem; margin-bottom: 0.8rem; }
  .afaq__item { border: 1px solid var(--line); border-radius: var(--r-md); background: var(--card); margin-bottom: 0.6rem; padding: 0.5rem 0; }
  .afaq__item summary { cursor: pointer; padding: 0.7rem 1.1rem; font-weight: 600; }
  .afaq__a { padding: 0 1.1rem 0.9rem; }
  .afaq__a p { color: var(--ink-soft); line-height: 1.6; }

  .acta { margin-top: 3rem; background: var(--ink); color: var(--on-ink); border-radius: var(--r-lg); padding: 2rem 1.75rem; box-shadow: var(--shadow-md); }
  .acta__t { font-family: var(--font-display); font-weight: 800; font-size: 1.5rem; color: #fff; line-height: 1.15; }
  .acta p { margin-top: 0.6rem; color: var(--on-ink-soft); }
  .acta__btns { margin-top: 1.4rem; display: flex; flex-wrap: wrap; gap: 0.8rem; }

  .related { margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid var(--line); }
  .related__t { font-family: var(--font-display); font-weight: 700; font-size: 1.3rem; }
  .related__list { margin-top: 1.25rem; display: grid; grid-template-columns: 1fr; gap: 1rem; }
  @media (min-width: 760px) { .related__list { grid-template-columns: repeat(3, 1fr); } }
  .related__list a { display: flex; flex-direction: column; gap: 0.4rem; background: var(--card); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 1.2rem 1.3rem; box-shadow: var(--shadow-sm); transition: border-color 0.2s var(--ease-out), transform 0.2s var(--ease-out); }
  .related__list a:hover { border-color: var(--brand); transform: translateY(-2px); }
  .related__cat { font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--brand-ink); }
  .related__title { font-family: var(--font-display); font-weight: 700; font-size: 1.02rem; line-height: 1.2; }
</style>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: PASS, log lists `▶ src/pages/blog/[slug].astro` → `/blog/api-oficial-meta-automacao-instagram.html`.

- [ ] **Step 3: Verify SEO/GEO markers in the article HTML**

Run each; each must print `1` (or more):

```bash
f=dist/blog/api-oficial-meta-automacao-instagram.html
grep -c '"@type":"BlogPosting"' "$f"
grep -c '"@type":"FAQPage"' "$f"
grep -c '"@type":"BreadcrumbList"' "$f"
grep -c 'class="tldr"' "$f"
grep -c 'Perguntas frequentes' "$f"
grep -c 'Leia também' "$f"
```
Expected: every line prints `1` (BreadcrumbList may print `1`).

- [ ] **Step 4: Visual smoke test (optional but recommended)**

Run: `npm run preview` and open `http://localhost:4321/blog` and `http://localhost:4321/blog/api-oficial-meta-automacao-instagram`. Confirm the list shows the card and the article renders the TL;DR, body, FAQ, CTA and related. Stop the server after.

- [ ] **Step 5: Commit**

```bash
git add src/pages/blog/[slug].astro
git commit -m "feat(blog): article template with SEO + GEO (schema, TL;DR, FAQ, related, CTA)"
```

---

### Task 4: Internal linking (Nav + Footer)

**Files:**
- Modify: `src/components/Nav.astro` (the `links` array near the top)
- Modify: `src/components/Footer.astro` (the `cols` array, "Produto" column)

**Interfaces:**
- Consumes: route `/blog` from Task 2.
- Produces: a "Blog" link in the global nav and footer of every page.

- [ ] **Step 1: Add Blog to the Nav links**

In `src/components/Nav.astro`, the `links` array currently ends with `{ href: "/#planos", label: "Planos" }`. Add a Blog entry after `vs ManyChat`. Change:

```js
  { href: "/vs-manychat", label: "vs ManyChat" },
  { href: "/ferramentas", label: "Ferramentas" },
```
to:
```js
  { href: "/vs-manychat", label: "vs ManyChat" },
  { href: "/blog", label: "Blog" },
  { href: "/ferramentas", label: "Ferramentas" },
```

- [ ] **Step 2: Add Blog to the Footer "Produto" column**

In `src/components/Footer.astro`, in the `cols` array, "Produto" column, change:

```js
      { href: "/ferramentas", label: "Ferramentas grátis" },
      { href: "/criadores", label: "Para criadores" },
```
to:
```js
      { href: "/ferramentas", label: "Ferramentas grátis" },
      { href: "/blog", label: "Blog" },
      { href: "/criadores", label: "Para criadores" },
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Verify the link is present on a normal page**

Run: `grep -c 'href="/blog"' dist/index.html`
Expected: `2` or more (nav + footer).

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.astro src/components/Footer.astro
git commit -m "feat(blog): link blog from nav and footer (internal linking)"
```

---

## Self-Review

**1. Spec coverage (frente 1 — infra + seed):**
- Content collection + schema → Task 1 ✓
- `/blog` index → Task 2 ✓
- Article template with Article + BreadcrumbList + FAQPage, TL;DR, FAQ, sources, related, CTA (SEO + GEO) → Task 3 ✓
- Internal linking (Nav + Footer + related + CTA) → Tasks 3 & 4 ✓
- Seed article migrated (frontmatter converted, body verbatim) → Task 1 ✓
- Sitemap: automatic via existing `@astrojs/sitemap`; `/blog` and the article enter it on build — no task needed (verify post-build: `grep blog dist/sitemap-0.xml`). ✓
- Robots/AI crawlers: already allowed site-wide; `/blog` inherits — no task needed. ✓
- **Deferred to follow-on plans (out of scope here, by design):** bulk migration of the other 11 articles, 301 redirects from old URLs, domain cutover (subdomain → subdirectory, remove proxy), `notifiquei-blog-post` skill update, topic backlog.

**2. Placeholder scan:** No "TBD/TODO". The seed body is reproduced from the exact source path; FAQ/TL;DR are authored in full. No "add error handling"-style vagueness.

**3. Type consistency:** Schema field names in Task 1 (`tldr`, `faq[].q/.a`, `cover`, `coverAlt`, `keywords`, `updated`, `category`) match their use in Tasks 2–3. `entry.id` used consistently as the slug for `params.slug`, `/blog/${post.id}` links, and `getStaticPaths`. `render(post)` → `Content` used once. JSON-LD `@id` `#org` matches the Organization declared in `index.astro`.

---

## Follow-on plans (not in this plan)

1. **Bulk migration** — triagem dos 11 artigos restantes (migrar / revisar-tom / reescrever os de responda.me / cortar), converter frontmatter, revisar voz.
2. **Domain cutover + redirects** — servir `/blog` pelo Astro/Cloudflare, `blog.notifiquei.com.br` → 301 → `/blog`, `_redirects` das URLs antigas (`/[categoria]/[slug]` → `/blog/[slug]`), validar 200/301 e zero 404; depois deploy em produção.
3. **Skill update + backlog** — atualizar `~/.claude/skills/notifiquei-blog-post/SKILL.md` pro novo lar (Astro, novo frontmatter, checklist SEO/GEO) e entregar backlog de 10–15 pautas.
