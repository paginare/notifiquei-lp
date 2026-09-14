# Search Console: leitura de 14/09/2026 (últimos 12 meses)

Export bruto em `docs/seo/dados/` (Consultas, Páginas, Gráfico, Países, Dispositivos). Tipo de pesquisa: Web, janela de 13/09/2025 a 12/09/2026. Este arquivo é a **fonte de verdade da rotina do blog** pra escolher tema, título e post pra atualizar. Substitui a leitura de 14/08/2026 (que está no histórico do git).

## Antes de ler: como comparar com agosto

- **A janela mudou de 16 pra 12 meses.** Os totais dos dois exports não se comparam direto.
- **Os dias em comum batem certinho** nos dois arquivos (13/09/2025 a 12/08/2026: 1.148 cliques e 4.688 impressões nos dois). Então a diferença entre um export e outro é confiável.
- **Pra URL do blog, novo menos velho é exatamente o último mês** (13/08 a 12/09), porque nenhum post existia antes de 2026. É daí que saem os números "no mês" abaixo.
- **Somar a tabela de Páginas não dá o total do Gráfico.** O Gráfico conta por site, a tabela conta cada URL separada.
- **`Consultas.csv` só mostra as consultas que o Google não esconde.** O post do sorteio teve 982 impressões em 12 meses e a tabela de consultas mostra só 5 impressões de buscas sobre sorteio. Serve pra achar as palavras que as pessoas usam, não pra medir volume.
- **Posição perto de 2 com CTR perto de zero é o padrão dos sitelinks da busca "notifiquei".** `/termos-de-uso` (966 impressões, posição 1,7, 1 clique), `/dpa`, `/criadores`, `/vs-manychat` e `/blog` têm esse perfil. Impressão ali não é demanda, é gente procurando a marca.

## O resumo do mês

| | Cliques | Impressões | CTR |
|---|---|---|---|
| Site inteiro, últimos 30 dias (Gráfico) | 432 | 1.489 | 29% |
| Site inteiro, 30 dias anteriores | 484 | 1.674 | 29% |
| **Posts do blog no último mês** | **10** | **914** | **1,1%** |
| Posts do blog, histórico inteiro até 12/08 (os que ainda estão no ar) | 15 | 1.117 | 1,3% |

O site cresceu forte de junho a agosto (138, 325 e 487 cliques por mês) e deu uma leve recuada nos últimos 30 dias. Quase tudo continua sendo busca de marca: em 12 meses, "notifiquei" e variações somam 1.217 cliques e as consultas visíveis que não são marca somam 2.

O blog está ganhando impressão (914 num mês contra 1.117 em todo o período anterior), mas não clique. CTR de 1,1% com posição média entre 3 e 8.

## Correção da leitura de agosto: "automação no Instagram" era demanda de 2025

Agosto apontou o cluster "automação no Instagram" como o maior ativo parado: 107 impressões, posição 47,8. Com a janela de 12 meses, sobram **17 impressões**. O resto veio de antes de setembro de 2025, época do guia antigo do WordPress.

| Consulta | 16 meses (agosto) | 12 meses (setembro) |
|---|---|---|
| automação instagram | 30 | 3 |
| automação de instagram | 19 | 5 |
| automação de marketing instagram | 13 | 0 |
| automação para instagram | 11 | 0 |
| automacao do instagram | 6 | 6 |

Continua sendo o termo-mãe do produto e vale ter um post forte nele. Mas a demanda medida hoje é pequena, e não justifica mais de um post disputando o mesmo termo. O único sinal de movimento: "como fazer automação no instagram" apareceu na posição 19 (era 35).

## Nível 1: os posts com audiência continuam sem título novo

A leitura de agosto mandou reescrever `title` e `description` dos posts que já recebem impressão. **Isso não foi feito.** O git mostra que esses arquivos só ganharam a capa gerada no próprio dia 14/08, e a rotina seguiu publicando post novo. Então a pergunta "o título novo melhorou o CTR?" ainda não tem resposta.

| Post | Impressões no mês | Cliques | CTR | Posição no mês | Agosto (16 meses) |
|---|---|---|---|---|---|
| `sorteio-no-instagram-pelos-comentarios` | 356 | 5 | 1,4% | 8,6 | 626 impr., pos. 7,65 |
| `automatizar-resposta-a-stories-no-instagram` | 131 | 0 | 0% | 7,2 | 126 impr., pos. 7,14 |
| `fluxo-de-boas-vindas-no-direct-do-instagram` | 102 | 1 | 1,0% | 2,3 | 82 impr., pos. 2,24 |
| `stories-com-interacao-e-dm-automatico` (novo, 02/09) | 81 | 2 | 2,5% | 3,0 | não existia |
| `dm-para-quem-comentou-no-instagram` | 37 | 2 | 5,4% | 6,1 | 52 impr., pos. 5,79 |
| `follow-up-automatico-no-direct-do-instagram` | 31 | 0 | 0% | 8,3 | 41 impr., pos. 6,98 |

O que dá pra tirar daí:

1. **Sorteio é o único post com tração de verdade, e está escorregando.** Recebeu num mês mais da metade das impressões que tinha acumulado desde junho, mas a posição do mês ficou em 8,6, contra 7,65 no acumulado até agosto. As consultas novas mostram o motivo: o site aparece em 5º pra "sorteio no instagram pelos comentários" (a ordem das palavras do título) e em 29º a 34º pra "sorteio de comentários no instagram", "sorteio de comentarios no instagram" e "como fazer sorteio de comentarios no instagram". A ordem que as pessoas digitam não está no título nem nos H2.
2. **Os dois posts de stories estão brigando entre si.** `automatizar-resposta-a-stories-no-instagram` e `stories-com-interacao-e-dm-automatico` abrem a `description` com praticamente a mesma frase ("Quando alguém responde seu story..."). Juntos somam 212 impressões no mês. O novo estreou na posição 3, o antigo está em 7 com zero clique. Antes de mexer em título, diferenciar: um é sobre o gatilho de resposta a story, o outro sobre enquete e caixinha como entrada de funil. E um precisa linkar pro outro.
3. **Fluxo de boas-vindas e o post novo de stories têm cara de sitelink.** Posição 2-3 com CTR de 1-2% é o mesmo perfil de `/termos-de-uso`. Antes de reescrever o título deles, abrir no Search Console o filtro Página = URL do post e olhar a aba Consultas. Se a impressão vier de "notifiquei", título não resolve e o post sai da lista.
4. **Follow-up está caindo** (6,98 pra 8,3) sem clique nenhum.

## Nível 2: como estão os posts escritos pra demanda

| Post | Publicado | Impressões | Posição |
|---|---|---|---|
| `transformar-seguidores-em-clientes-no-instagram` | 17/08 | 22 | 3,7 |
| `automacao-no-instagram-guia` | 14/08 | 13 | 10,6 |
| `como-automatizar-o-instagram-passo-a-passo` | 14/08 | 0 | - |
| `funil-de-vendas-pelo-direct-do-instagram` | 24/08 | 0 | - |

O guia começou a aparecer na posição 10,6, na borda da primeira página. É a direção certa (o cluster estava em 47,8), mas 13 impressões é pouco pra concluir. O passo a passo, publicado no mesmo dia pra uma intenção quase igual, não teve impressão nenhuma em um mês.

Hoje quatro posts giram em torno de "automação no Instagram": o guia, o passo a passo, `instagram-com-e-sem-automacao-o-que-muda` e `instagram-para-coaches-e-infoprodutores`. **Não escrever mais nada nesse termo.** Apontar links internos dos outros três pro guia com a âncora "automação no Instagram". Se o passo a passo continuar zerado na próxima leitura, juntar o conteúdo dele no guia e redirecionar a URL.

## A rotina: 16 posts desde a última leitura

| Situação | Posts |
|---|---|
| Com alguma impressão | 6 (`stories-com-interacao-e-dm-automatico` 81, `transformar-seguidores-em-clientes-no-instagram` 22, `como-vender-servicos-pelo-direct-do-instagram` 15, `automacao-no-instagram-guia` 13, `dm-automatico-parece-robo-como-evitar` 6, `profissoes-regulamentadas-automacao-instagram` 3) |
| Zero impressão com 1 semana ou mais no ar | 7 (`como-automatizar-o-instagram-passo-a-passo`, `black-friday-no-instagram-automacao`, `automacao-no-lancamento-de-produto-no-instagram`, `funil-de-vendas-pelo-direct-do-instagram`, `reativar-contatos-que-pararam-de-responder-no-direct`, `instagram-para-coaches-e-infoprodutores`, `promocao-relampago-com-automacao-no-instagram`) |
| Novos demais pra julgar (depois de 09/09) | 3 (`relatorios-e-metricas-do-notifiquei`, `templates-de-mensagem-no-direct-do-instagram`, `primeiros-passos-no-notifiquei-guia-completo`) |

Somando o blog inteiro: **48 posts no ar, 23 com zero impressão em 12 meses.** Dos posts que estavam zerados em agosto, 13 continuam zerados e 6 ganharam entre 2 e 12 impressões no mês (caixa de entrada, script do primeiro DM, quebra-gelos e outros três), nenhum com clique.

Dois alertas pra rotina:

1. **A fila não tem mais tema `[demanda confirmada]`.** O que sobrou (Temas 17 a 30) é tudo hipótese. Daqui pra frente a rotina publica três hipóteses por semana, que é o tipo de post que os dados mostram nascer e ficar sem impressão.
2. **Os três últimos posts são documentação de funcionalidade** (relatórios, templates, primeiros passos). É exatamente a categoria que a leitura de agosto identificou como a que some. Vale conferir de novo na próxima leitura, mas a expectativa é zero.

## O que NÃO é demanda (continua valendo)

1. **"comprar seguidores"** e derivados, incluindo "comprar comentarios automaticos instagram" e "bot seguidores instagram grátis". Público errado.
2. **Cauda de verbo no passado**: "metrifiquei", "retifiquei", "identifiquei", "impulsionei", "verifiquei", "certifiquei" e mais uns 30. É o nome da marca colidindo com conjugação. Zero clique, nada a fazer.
3. **n8n genérico.** Sumiu da janela de 12 meses, mas a regra fica.
4. **Ruído novo sem ação**: "api shopee afiliado", "oii meta", "mande o link", "programa de afiliado". Uma ou duas impressões cada, sem post que faça sentido.
5. **Impressão de sitelink** (`/termos-de-uso`, `/dpa`, `/criadores`, `/blog`, `/politica-de-privacidade`). `/criadores` ganhou 587 impressões no mês na posição 1,8 com CTR de 0,6%: é a busca de marca mostrando a página, não gente procurando "automação para criadores".

## Achados técnicos (rechecados em 14/09 com curl)

| Achado | Agosto | Setembro |
|---|---|---|
| Caminho inexistente devolve a home com HTTP 200 (soft-404) | aberto | **continua.** `/pagina-que-nao-existe-xyz`, `/category/institucional/` e `/uncategorized/...` entregam a home (194 KB, 200). `/category/institucional/` somou 574 impressões |
| `www` sem 301 pro apex | aberto | **continua.** `https://www.notifiquei.com.br/` responde 200 e levou 119 cliques e 712 impressões |
| `/blog` e `/blog/` contando separado | aberto | **resolvido.** `/blog/` agora faz 308 pra `/blog` |
| `insta.notifiquei.com.br` competindo com o domínio | aberto | **mudou.** O subdomínio não resolve mais no DNS. As 1.214 impressões são histórico e vão sumir. Levou 27 cliques em 12 meses, que se perdem se ninguém redirecionar |
| `/institucional/automacao-para-instagram-barato/` duplicado | aberto | **piorou.** Os dois caminhos agora devolvem a home. Esse artigo era a URL não-marca de melhor CTR do site (3 cliques, 13,6%) |

Os três primeiros pedem a mesma correção: 404 de verdade pra caminho inexistente, 301 do `www` pro apex e 301 das URLs antigas do WordPress pro post equivalente (`/uncategorized/automacao-no-instagram-...` pro `automacao-no-instagram-guia`, `automacao-para-instagram-barato` pro post mais próximo).

## Dispositivo e país

Brasil concentra 1.563 dos 1.595 cliques. Computador 1.147 cliques (CTR 37%) contra celular 441 (CTR 14%). Mesmo padrão de agosto: busca de marca de quem vai abrir o painel.

## Ordem de trabalho até a próxima leitura

1. **Nível 1, que ficou pendente:** título, `description` e primeiro H2 do post do sorteio cobrindo "sorteio de comentários no Instagram". Depois diferenciar os dois posts de stories. Fluxo de boas-vindas só depois de conferir as consultas dele no Search Console.
2. **Links internos pro guia** de automação no Instagram, sem post novo nesse termo.
3. **Fila da rotina:** decidir o que a rotina faz agora que não tem tema com demanda confirmada (pausar, reduzir a frequência ou trocar publicação por atualização dos posts do Nível 1).
4. **Técnico:** 404 real, 301 do `www` e 301 das URLs antigas do WordPress.

**Próxima leitura:** exportar de novo por volta de 14/10/2026, com a mesma janela de 12 meses. Com um mês de intervalo, a subtração entre os exports dá o número exato do mês pra cada post, que foi o que permitiu esta leitura.
