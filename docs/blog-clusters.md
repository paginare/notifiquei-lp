# Clusters do blog (pilar + satélites)

Fonte de verdade da **teia de links internos**. Cada post pertence a um cluster e tem um papel: `pilar` ou `satelite`.

A regra é a do modelo pilar/satélite: o **pilar** cobre o tema de forma geral e linka pra cada satélite; cada **satélite** aprofunda um subtópico e linka de volta pro pilar. Isso concentra autoridade no termo-mãe em vez de espalhar 48 posts soltos.

**Verificar:** `node scripts/check-clusters.mjs` (roda no build e na rotina; falha se algum link da teia estiver faltando).

## Regras

1. Todo post novo entra nesta tabela **antes** de ser escrito, com cluster e papel definidos.
2. Satélite: o link pro pilar usa a **consulta-alvo do pilar como âncora** (ex: `[automação no Instagram](/blog/automacao-no-instagram-guia)`), dentro de uma frase natural.
3. Pilar: ganha um link inline pro satélite novo no trecho onde aquele subtópico é citado. Sem seção "Leia também".
4. Links laterais (satélite → satélite do mesmo cluster ou de outro) continuam valendo e não substituem o link pro pilar.
5. Cluster sem pilar não pode existir. Se um tema novo não cabe em nenhum cluster, o pilar dele vem primeiro.

## C1 — automação no Instagram

Termo-mãe do blog. Pilar responde "o que é, o que dá pra automatizar, é seguro".

| Slug | Papel |
|---|---|
| automacao-no-instagram-guia | pilar |
| como-automatizar-o-instagram-passo-a-passo | satelite |
| api-oficial-meta-automacao-instagram | satelite |
| precisa-de-conta-profissional-no-instagram | satelite |
| instagram-com-e-sem-automacao-o-que-muda | satelite |
| limites-de-envio-da-api-do-instagram | satelite |
| automacao-de-instagram-com-poucos-seguidores | satelite |
| notifiquei-vs-manychat | satelite |
| agendar-posts-reels-e-stories-no-instagram | satelite |
| agente-de-ia-que-responde-dm-no-instagram | satelite |
| automacao-de-dm-no-tiktok | satelite |
| automacao-de-instagram-para-e-commerce | satelite |
| instagram-para-coaches-e-infoprodutores | satelite |
| profissoes-regulamentadas-automacao-instagram | satelite |
| gerenciar-instagram-de-clientes-com-times | satelite |
| black-friday-no-instagram-automacao | satelite |
| automacao-no-lancamento-de-produto-no-instagram | satelite |

## C2 — comentário vira DM

| Slug | Papel |
|---|---|
| como-um-comentario-no-instagram-vira-venda | pilar |
| dm-para-quem-comentou-no-instagram | satelite |
| responder-comentarios-do-instagram-automaticamente | satelite |
| palavras-chave-em-comentarios-para-acionar-automacao | satelite |
| sorteio-no-instagram-pelos-comentarios | satelite |
| disparar-mensagem-na-live-do-instagram | satelite |
| promocao-relampago-com-automacao-no-instagram | satelite |

## C3 — funil de vendas pelo direct

| Slug | Papel |
|---|---|
| funil-de-vendas-pelo-direct-do-instagram | pilar |
| fluxo-de-boas-vindas-no-direct-do-instagram | satelite |
| follow-up-automatico-no-direct-do-instagram | satelite |
| reativar-contatos-que-pararam-de-responder-no-direct | satelite |
| quantas-vendas-voce-perde-demorando-responder-dm | satelite |
| caixa-de-entrada-unificada-do-instagram | satelite |
| como-vender-servicos-pelo-direct-do-instagram | satelite |
| stories-com-interacao-e-dm-automatico | satelite |
| automatizar-resposta-a-stories-no-instagram | satelite |

## C4 — o que escrever no DM

| Slug | Papel |
|---|---|
| script-do-primeiro-dm-automatico-no-instagram | pilar |
| quebra-gelos-no-direct-do-instagram | satelite |
| templates-de-mensagem-no-direct-do-instagram | satelite |
| dm-automatico-parece-robo-como-evitar | satelite |

## C5 — transformar seguidores em clientes

| Slug | Papel |
|---|---|
| transformar-seguidores-em-clientes-no-instagram | pilar |
| seguidores-que-curtem-mas-nao-compram | satelite |
| como-qualificar-lead-antes-de-mandar-preco | satelite |
| deteccao-de-intencao-de-compra-no-instagram | satelite |
| etiquetas-e-segmentacao-no-instagram | satelite |
| campanhas-de-mensagem-em-massa-no-instagram | satelite |

## C6 — produto (documentação)

Não disputa busca genérica: são páginas de ajuda que existem pra quem já é cliente. Ficam na teia pra não virar página órfã, mas **não** recebem investimento de SEO.

| Slug | Papel |
|---|---|
| primeiros-passos-no-notifiquei-guia-completo | pilar |
| migrar-da-versao-antiga-do-notifiquei | satelite |
| relatorios-e-metricas-do-notifiquei | satelite |
| webhook-e-integracoes-do-notifiquei | satelite |
| integrar-notifiquei-com-checkout-kiwify-hotmart | satelite |

## Buraco conhecido

Os 6 posts de nicho e ocasião do C1 (e-commerce, coaches, profissões regulamentadas, agências, Black Friday, lançamento) hoje penduram direto no pilar geral. Eles têm cara de cluster próprio ("automação no Instagram para *quem*"), mas **não existe pilar pra eles** e não há busca medida que justifique escrever um. Esse é o primeiro lugar onde entra dado de volume de palavra-chave externo.

## Quando chegar dado de volume de busca

O Search Console só mostra consulta em que o site **já** aparece (74 consultas, quase todas de marca), então ele não descobre cluster novo. Pra isso é preciso volume externo.

**Onde colocar:** o CSV do Google Keyword Planner vai em `docs/seo/dados/keyword-planner-<aaaa-mm>.csv`, do jeito que sai da ferramenta (Ferramentas → Planejador de palavras-chave → Descobrir palavras-chave → Brasil, português → baixar).

**O que fazer com ele, nesta ordem:**

1. Agrupar as palavras por intenção e casar cada grupo com um cluster desta página. Palavra que não casa com nenhum é candidata a cluster novo.
2. Pro buraco conhecido acima (nicho e ocasião), conferir se existe volume real em "automação de Instagram para *nicho*". Se existir, o **pilar vem antes** dos satélites que já estão no ar; se não existir, os 6 posts continuam pendurados no pilar geral e ninguém escreve mais nada nesse ângulo.
3. Cluster novo só nasce com pilar. Registrar pilar e satélites planejados aqui antes de escrever a primeira linha.
4. Volume sem clique não vale nada: a regra do `title` e da `description` do `blog-writing-guide.md` continua valendo, e o gargalo medido em 14/09/2026 era CTR, não falta de tema.

Sem esse CSV dá pra montar a lista com autocomplete do Google, perguntas relacionadas e Trends. Sai a estrutura e a ordem relativa, não sai o número de buscas por mês.
