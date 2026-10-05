# Search Console: leitura de 05/10/2026 (últimos 12 meses)

Export bruto em `docs/seo/dados/` (Consultas, Páginas, Gráfico, Países, Dispositivos). Tipo de pesquisa: Web, janela de 04/10/2025 a 03/10/2026. Este arquivo é a **fonte de verdade da rotina do blog** e substitui a leitura de 14/09/2026 (`search-console-2026-09.md`, export anterior no histórico do git).

## Antes de ler: como comparar com setembro

- **Os dias em comum batem certinho** nos dois exports (04/10/2025 a 12/09/2026, 344 dias, zero diferença dia a dia). A diferença entre um export e outro é confiável.
- **Pra URL do blog, novo menos velho é exatamente 13/09 a 03/10/2026 (21 dias)**, porque nenhum post existia antes de 2026. É daí que saem os números "em 21 dias" abaixo. A leitura saiu antes do previsto (14/10), então o intervalo é de 3 semanas, não de um mês.
- **A posição "em 21 dias"** é a posição média só das impressões novas, calculada a partir dos dois exports.
- As ressalvas de setembro continuam: o Gráfico conta por site e a tabela de Páginas por URL; `Consultas.csv` só mostra as consultas que o Google não esconde; posição perto de 2 com CTR perto de zero é sitelink da busca "notifiquei".

## O resumo

| | Cliques | Impressões | CTR |
|---|---|---|---|
| Site inteiro, setembro (Gráfico) | 497 | 1.801 | 28% |
| Site inteiro, agosto | 487 | 1.645 | 30% |
| Site inteiro, últimos 30 dias (04/09 a 03/10) | 481 | 1.851 | 26% |
| **Posts do blog, 13/09 a 03/10 (21 dias)** | **4** | **799** | **0,5%** |
| Posts do blog, 13/08 a 12/09 (31 dias, leitura de setembro) | 10 | 914 | 1,1% |

O site ficou estável (setembro um pouco acima de agosto). A busca "notifiquei" ganhou 179 cliques no período e continua sendo praticamente todo o tráfego.

O blog ganhou ritmo de impressão (38 por dia contra 29 no mês anterior), mas o clique caiu. Dos 4 cliques, os 4 foram do post do sorteio. Os outros 47 posts somaram 328 impressões e nenhum clique.

## Sorteio: a mudança de 14/09 trouxe a consulta, falta o clique

O post do sorteio recebeu **471 impressões em 21 dias**, quase metade das 982 que tinha acumulado até setembro. A mudança de 14/09 colocou "sorteio de comentários no Instagram" no title, e apareceu uma família inteira de consultas que não existia no export anterior:

| Família de consulta | Impressões novas | Posição | Cliques |
|---|---|---|---|
| "como sortear comentários no/do instagram" (3 variações) | 61 | 7,5 a 10 | 0 |
| "como fazer sorteio de/dos/com/pelos comentários..." (9 variações) | 54 | 8,8 a 16 | 0 |
| "sorteio de comentários (no) instagram" e variações sem "como" | cerca de 25 | 31 a 52 | 4 |

A maior consulta nova é **"como sortear comentários no instagram"** (48 impressões, posição 10). O verbo "sortear" não aparece no title, na description nem em nenhum H2: o post fala "sorteio de comentários" e "como fazer". O post está na borda da primeira página pra quem pergunta "como sortear", com zero clique.

A posição média do post piorou (8,0 no acumulado até setembro, 11,1 nas impressões novas). Isso não é queda: é o post aparecendo pra muito mais variações, várias delas na página 3 a 5. O title mudou há 3 semanas e está funcionando pra trazer a consulta, então **não mexer no title de novo agora**. O próximo passo é cobrir "como sortear" na description e num H2 (item 1 da fila).

## Os posts mexidos em setembro: cedo demais pra julgar

| Post | O que mudou | Impressões em 21 dias | Posição | Cliques |
|---|---|---|---|---|
| `automatizar-resposta-a-stories-no-instagram` | description em 28/09 | 58 | 7,3 | 0 |
| `follow-up-automatico-no-direct-do-instagram` | title e description em 18/09 | 37 | 7,5 | 0 |
| `stories-com-interacao-e-dm-automatico` | title e FAQ em 16/09 | 23 | 3,5 | 0 |
| `dm-para-quem-comentou-no-instagram` | title em 30/09 | 16 | 5,4 | 0 |
| `automacao-no-instagram-guia` | links de entrada em 17/09, description em 02/10 | 12 | 3,6 | 0 |

Nenhum desses entra na fila agora. Mudança com menos de um mês não tem dado pra comparar, e mexer de novo apaga o teste. Rever na próxima leitura.

O único sinal claro é o guia: as impressões novas vieram na posição 3,6, contra 10,6 na leitura de setembro. Os 16 links de entrada de 17/09 parecem estar ajudando. Ainda é pouco volume.

## Posts que começaram a aparecer

| Post | Impressões em 21 dias | Antes | Posição | Problema no frontmatter |
|---|---|---|---|---|
| `disparar-mensagem-na-live-do-instagram` | 53 | 3 | 7,9 | description com 136 caracteres |
| `limites-de-envio-da-api-do-instagram` | 24 | 0 | 6,3 | description com 134 caracteres |
| `caixa-de-entrada-unificada-do-instagram` | 13 | 12 | 6,6 | description com 134, travessão no tldr e na FAQ |
| `palavras-chave-em-comentarios-para-acionar-automacao` | 10 | 2 | 6,5 | title com 66, description com 132 |

As consultas desses posts não aparecem no `Consultas.csv` (o Google esconde). Por isso os itens da fila pra eles só ajustam o frontmatter às regras do guia, usando a consulta que o próprio title já persegue. Ninguém deve inventar consulta nova pra esses posts.

Fora esses, outros 23 posts estão fora das regras de tamanho (title acima de 60 ou description fora de 140 a 160). A fila só pega os que já têm impressão. O resto pode esperar até ter demanda.

## Fluxo de boas-vindas: a hipótese de sitelink ganhou força

`fluxo-de-boas-vindas-no-direct-do-instagram` teve **6 impressões em 21 dias**, contra 102 no mês anterior. A posição das impressões novas foi 8,3, contra 2,3 antes. O volume alto na posição 2 sumiu de uma vez, que é o comportamento de sitelink da busca de marca, não de demanda. Continua bloqueado. Se a próxima leitura repetir esse número, o post sai da lista sem precisar abrir o filtro no Search Console.

## Passo a passo: segunda leitura sem impressão

`como-automatizar-o-instagram-passo-a-passo` continua sem nenhuma impressão, quase dois meses depois de publicado. A leitura de setembro definiu a regra: se continuasse zerado, juntar o conteúdo no guia e redirecionar a URL. **Isso não é trabalho da rotina** (ela não muda slug nem cria redirect). Fica pra alguém fazer à mão: levar o que o passo a passo tem de útil pro `automacao-no-instagram-guia`, criar o 301 de `/blog/como-automatizar-o-instagram-passo-a-passo` pro guia e tirar o post do `docs/blog-index.md` e do `docs/blog-clusters.md`.

## O que NÃO é demanda (continua valendo)

1. **"comprar seguidores"** e derivados ("comprar comentarios automaticos instagram", "bot seguidores instagram grátis").
2. **Cauda de verbo no passado** ("metrifiquei", "retifiquei", "identifiquei" e mais uns 30). Nome da marca colidindo com conjugação.
3. **Perguntas soltas sem contexto**: "quanto custa?", "é pago?", "qual o valor dele?", "quantos dias". Uma impressão cada, posição 1 a 5, sem post que faça sentido.
4. **Sitelinks**: `/criadores` (+232 impressões, posição 2,3), `/vs-manychat` (+351, 1,8), `/ferramentas` (de 30 pra 325, 1,8), `/termos-de-uso`, `/blog`, `/afiliados`, e os novos `/modelos` e `/novidades` no `www`. É a busca de marca mostrando páginas do site.

## Achados técnicos (rechecados em 05/10 com curl)

| Achado | Setembro | Outubro |
|---|---|---|
| Caminho inexistente devolve a home com HTTP 200 (soft-404) | aberto | **continua.** `/pagina-que-nao-existe-xyz`, `/category/institucional/`, `/uncategorized/...` e `/institucional/automacao-para-instagram-barato/` entregam a home (302 KB, 200). As impressões dessas URLs antigas estão caindo sozinhas (`/category/institucional/` de 574 pra 473) |
| `www` sem 301 pro apex | aberto | **continua**, mas perdeu peso: `https://www.notifiquei.com.br/` não ganhou nenhuma impressão nova no período |
| `insta.notifiquei.com.br` fora do DNS | 1.214 impressões históricas | caindo como previsto (1.094). Os 25 cliques de histórico se perdem sem redirect |
| Redirect por idioma | não visto | **novo.** Apex e `www` respondem 302 pra `/en` pra um acesso de fora do Brasil (até com `Accept-Language: pt-BR`). O Googlebot recebe 200 na home em português, então não afeta o índice. `/en` subiu de 21 pra 69 impressões |

A correção técnica continua a mesma de setembro: 404 de verdade pra caminho inexistente, 301 do `www` pro apex e 301 das URLs antigas do WordPress pro post equivalente.

## Dispositivo e país

Brasil concentra 1.820 dos 1.852 cliques. Computador 1.308 cliques (CTR 37%) contra celular 537 (CTR 14%). Mesmo padrão de sempre: busca de marca de quem vai abrir o painel.

## Ordem de trabalho até a próxima leitura

1. **Rotina (fila de atualização):** "como sortear comentários no Instagram" no post do sorteio, depois o frontmatter dos quatro posts que começaram a aparecer. Os itens estão em `docs/blog-refresh-queue.md`.
2. **À mão:** juntar o passo a passo no guia e redirecionar (seção acima).
3. **Técnico:** 404 real, 301 do `www` e 301 das URLs antigas do WordPress.
4. **Não mexer** nos posts alterados em setembro até a próxima leitura.

**Próxima leitura:** exportar de novo por volta de 05/11/2026, com a mesma janela de 12 meses. É quando dá pra medir o efeito das mudanças de setembro (stories, follow-up, DM pra quem comentou, guia) e do item 1 desta fila.
