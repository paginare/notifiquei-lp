# Guia de escrita do blog (para a rotina automática)

Este arquivo é auto-suficiente: contém tudo que o agente precisa pra escrever e publicar UM post novo do blog do Notifiquei. Sobre o Notifiquei: ferramenta brasileira de automação de DM e comentário do Instagram e TikTok, pela **API oficial da Meta**. Público: quem vende no Instagram/TikTok no Brasil.

## Passo a passo do agente

1. Ler `docs/seo/search-console-2026-08.md` (dados reais de busca), `docs/blog-topic-queue.md` (fila de temas), `docs/blog-index.md` (posts já publicados) e este guia.
2. Pegar o **primeiro tema** da fila que ainda não foi publicado (confira no índice pra não repetir). Os temas marcados **[demanda confirmada]** vêm de consulta real no Search Console e ficam no topo de propósito: sempre saem antes dos demais.
3. Escrever o arquivo `src/content/blog/<slug>.md` seguindo o formato abaixo, usando SÓ os fatos que o tema traz na fila (não inventar número, preço nem recurso).
4. Rodar `npm install` e `npm run build`. O build tem que passar (ele valida o frontmatter). Se falhar, corrigir o frontmatter e rodar de novo. **Não publicar build quebrado.**
5. Conferir no HTML gerado: `grep -c '"@type":"BlogPosting"' dist/blog/<slug>.html` e o mesmo pra `FAQPage` e `class="tldr"` (cada um = 1).
6. Atualizar `docs/blog-index.md` (adicionar a linha do novo post) e `docs/blog-topic-queue.md` (remover/marcar o tema usado).
7. `git add`, `git commit` e `git push` na branch `main` (dispara o deploy automático).
8. No fim, escrever um resumo do que publicou (título, slug, URL `/blog/<slug>`, os 2 links internos usados).

## Frontmatter (schema exato do Astro — chaves obrigatórias)

```yaml
---
title: "Título direto, até ~65 caracteres"
description: "1 frase, ≤160 caracteres, natural (vira meta description)"
date: 2026-01-01            # USE A DATA DE HOJE (formato YYYY-MM-DD). Nunca forjar data antiga.
author: "Carlos Duarte"
category: "Estratégia"      # Estratégia | Copywriting | Tráfego Pago
tags: ["Automação", "Instagram", "DM"]
cover: "https://images.unsplash.com/photo-XXXX?q=80&w=1200&auto=format&fit=crop"
coverAlt: "alt curto e literal em português"
keywords: ["palavra 1", "palavra 2", "palavra 3"]
tldr: "1-2 frases citáveis com a resposta central (aparece no topo e ajuda a IA a citar)."
faq:
  - q: "Pergunta real que o leitor faria?"
    a: "Resposta curta, autossuficiente, factual (2-4 frases)."
  # 2-3 itens
---
```

**Capa:** use SÓ uma URL do pool de capas verificadas listado no fim de `docs/blog-topic-queue.md` (ou a capa sugerida no próprio tema). NUNCA escolher um ID aleatório do Unsplash — já deu problema (caiu logo do Twitter). Sempre `?q=80&w=1200&auto=format&fit=crop`.

### `title` e `description`: é aí que se ganha ou se perde o clique

O CTR do site pra busca que não é de marca está em 1%. Tem post com 626 impressões e 1,28% de clique. Parte disso é posição (média 7,65 quer dizer que ele cai bastante na página 2), mas a outra parte é título que não convence quem viu. O título é o pedaço barato de consertar, então trate ele como parte do trabalho, não como enfeite. Regras:

- **A consulta que o tema persegue tem que estar no `title`**, o mais perto possível do começo. Se o tema traz um campo `Consulta-alvo`, ela entra literal.
- **Até 60 caracteres.** Acima disso o Google corta e a promessa some.
- **Prometa a resposta, não o assunto.** "Automação no Instagram: um guia" descreve o tema; "Automação no Instagram: o que dá pra automatizar sem arriscar a conta" entrega o resultado.
- **Um diferencial concreto quando couber**: sem planilha, em 5 minutos, sem risco de banimento, sem pagar por seguidor.
- **`description` de 140-160 caracteres**, com a consulta e uma razão pra clicar. Ela aparece na SERP, então escreva pra convencer, não pra resumir.
- **Sem clickbait.** O texto entrega o que o título prometeu, senão o clique sobe e a posição cai depois.
- Em `keywords`, use os termos como as pessoas digitam de verdade (estão em `docs/seo/dados/Consultas.csv`), incluindo a versão sem acento quando ela tiver impressão própria.

## Corpo (markdown)

1. **Abertura (sem heading):** uma cena concreta que o leitor reconhece. 2-3 parágrafos. Nada de "neste artigo vamos ver".
2. **H2 em minúsculas (3-5):** cada um cobre um ponto; várias em forma de pergunta ajudam no GEO.
3. **Números:** ao menos uma conta concreta de impacto em receita (ex: X DMs, produto de R$Y, na mão vs automático).
4. **Produto:** citar o Notifiquei com naturalidade (não como bloco de anúncio); mencionar "API oficial da Meta" quando fizer sentido.
5. **CTA:** parágrafo final curto linkando `https://notifiquei.com.br`.
6. **Linkagem interna (obrigatória):** inserir **2 links contextuais inline** pros posts mais relevantes do `docs/blog-index.md`, com markdown `[trecho real da frase](/blog/<slug>)`, dentro de frases naturais (âncora = pedaço real do texto, 3-6 palavras; nunca "clique aqui"). **Não** escrever seção "Leia também" (o template gera relacionados sozinho). **Não** repetir a FAQ no corpo.

## Voz (inegociável)

- Português do Brasil, informal, "você" + "a gente". Parágrafos curtos (2-4 linhas).
- **Sem travessão/em-dash (—)**; usar vírgula ou ponto.
- Sem punchline/staccato, sem frases de uma ou duas palavras como sentença.
- Sem clichê de IA: "revolucione", "potencialize", "solução completa", "inovador", "transforme seu negócio".
- Headings em minúscula. Emoji só dentro de mockup de chat, nunca no texto editorial.
- Só escrever sobre recurso que existe de verdade (o tema na fila diz o que é real). Se um recurso está "em configuração/em breve", falar disso com honestidade, não como se já estivesse pronto.

## Checklist antes do push

- [ ] `docs/seo/search-console-2026-08.md` lido; tema `[demanda confirmada]` foi priorizado se havia algum na fila.
- [ ] `Consulta-alvo` do tema aparece literal no `title`, perto do começo, com até 60 caracteres.
- [ ] `description` de 140-160 caracteres, com a consulta e uma razão pra clicar.
- [ ] Frontmatter completo no schema exato; `cover` do pool verificado; `date` = hoje.
- [ ] Abre com cena; ao menos 1 conta de receita; produto citado com naturalidade + CTA.
- [ ] 2 links internos contextuais no corpo.
- [ ] Sem travessão, sem clichê de IA, headings minúsculos.
- [ ] `npm run build` passou; BlogPosting + FAQPage + TL;DR presentes no HTML.
- [ ] `docs/blog-index.md` e `docs/blog-topic-queue.md` atualizados.
- [ ] commit + push na `main`.
