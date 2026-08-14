# Search Console — leitura de 14/08/2026 (últimos 16 meses)

Export bruto em `docs/seo/dados/` (Consultas, Páginas, Gráfico, Países, Dispositivos). Tipo de pesquisa: Web. Este arquivo é a **fonte de verdade da rotina do blog** pra escolher tema, título e post pra atualizar. Refazer o export e reescrever esta leitura a cada 60-90 dias.

## O número que muda a estratégia

| | Cliques | Impressões | CTR |
|---|---|---|---|
| Consultas de marca ("notifiquei" e variações) | 981 | 2.086 | 47% |
| **Tudo que não é marca** | **3** | **296** | **1%** |

Em 16 meses o site inteiro ganhou **3 cliques** de quem não estava procurando a marca. Os posts do blog somados deram **18 cliques** (a diferença vem de consultas de marca que caem em post).

Traduzindo: o blog hoje não capta demanda nova. Ele é encontrado por quem já conhece o Notifiquei. O trabalho da rotina não é publicar mais volume, é **ranquear pras buscas que já existem**.

## Onde tem demanda de verdade (e a gente não pega)

Google já mostra o site pra esses termos, mas lá no fundo. Impressão sem clique é ranking ruim, não falta de interesse.

| Cluster | Impressões | Posição média | Cliques |
|---|---|---|---|
| "automação [de/para/no/do] instagram" (11 variações) | 107 | 47,8 | 0 |
| "seguidores em clientes" / "funil de vendas instagram" | 16 | 66,1 | 0 |
| "como automatizar instagram" (how-to) | 5 | 37,8 | 0 |
| "automação de mensagens/direct/comentários instagram" | 6 | 75,5 | 0 |
| "manychat" | 1 | 8,0 | 0 |

O cluster de cabeça (**automação no Instagram**, 107 impressões) é o maior ativo não explorado. Nenhum post ataca o termo de frente: os artigos existentes tratam de recortes (stories, comentário, follow-up), nunca do termo-mãe.

Detalhe que importa: a URL antiga do WordPress `/uncategorized/automacao-no-instagram-o-guia-definitivo-para-transformar-seguidores-emclientes/` acumulou **239 impressões na posição 33** — é o conteúdo que o Google associa ao termo de cabeça, e hoje essa URL entrega a home.

## Posts que já ranqueiam (problema é CTR, não posição)

| Post | Impressões | Posição | CTR |
|---|---|---|---|
| `/blog/sorteio-no-instagram-pelos-comentarios` | 626 | 7,65 | **1,28%** |
| `/blog/automatizar-resposta-a-stories-no-instagram` | 126 | 7,14 | 2,38% |
| `/blog/fluxo-de-boas-vindas-no-direct-do-instagram` | 82 | 2,24 | 0% |
| `/blog/dm-para-quem-comentou-no-instagram` | 52 | 5,79 | 0% |
| `/blog/integrar-notifiquei-com-checkout-kiwify-hotmart` | 51 | 3,63 | 5,88% |
| `/blog/follow-up-automatico-no-direct-do-instagram` | 41 | 6,98 | 0% |

Cuidado ao ler essa tabela: **posição é média**, não lugar fixo. Um post com média 7,65 em 626 impressões aparece às vezes em 3º e às vezes em 15º, e boa parte dessas impressões provavelmente cai na página 2, onde o clique é quase zero de qualquer jeito. Então CTR baixo aqui tem duas causas misturadas, e as duas precisam de ação:

1. **Posição instável.** A parte das impressões que está fora da página 1 não se resolve com título. Se resolve com o post ficando mais completo, recebendo link interno dos outros artigos e cobrindo as variações da consulta.
2. **Clique não ganho onde já aparece.** Aí sim é `title` e `description`.

O título atual do post do sorteio ("Sorteio no Instagram pelos comentários: justo e automático") já está num formato razoável, então não dá pra dizer que o título sozinho explica 1,28%. O que dá pra afirmar com os dados na mão: **cinco desses seis posts já têm audiência de busca e não convertem impressão em visita.** Trabalhar neles rende mais que publicar posts novos que vão nascer com zero impressão, como aconteceu com os 20 últimos.

A exceção é `integrar-notifiquei-com-checkout-kiwify-hotmart`, com 5,88% de CTR: esse está saudável e serve de referência do que funciona (título específico, com nome de ferramenta que a pessoa está buscando).

## O que NÃO é demanda (não escrever pra isso)

1. **"comprar seguidores"** e derivados (14 consultas, 22 impressões). Público errado, produto errado. Ignorar sempre.
2. **Cauda de verbo no passado**: "verifiquei", "publiquei", "identifiquei", "retifiquei", "qualifiquei", "certifiquei", "visitei", "enviei" e mais uns 40. É o nome da marca colidindo com conjugação em português. Zero clique, zero ação possível. **Não é sinal de nada** — não confundir com volume de busca.
3. **n8n genérico** ("o que é n8n", "templates n8n", "n8n planos"). Intenção de quem quer montar automação sozinho, não de quem compra ferramenta pronta.

## Posts publicados que nunca apareceram

Dos 33 posts no ar, **20 têm zero impressão**. O padrão é claro: os que somem são os de **documentação de funcionalidade** — etiquetas, webhook, campanhas, caixa de entrada unificada, quebra-gelos, limites de envio, relatórios. Ninguém busca por funcionalidade de uma ferramenta que ainda não conhece.

Regra que sai daí: **funcionalidade vira post só quando existe uma busca real por trás**. Senão vira página de ajuda, não post de blog.

## Achados técnicos (fora do escopo da rotina de post, mas travam o resultado)

Registrados aqui porque afetam todo o conteúdo. Não corrigidos ainda.

1. **Qualquer caminho inexistente devolve a home com HTTP 200.** `/author/antonio/`, `/category/institucional/`, `/uncategorized/...`, `/sample-page/`, `/teste-form/` — todos entregam a home (175 KB, mesmo `<title>`). São soft-404: o Google indexa como cópias da home. Juntas somam mais de 1.400 impressões com CTR perto de zero, que sujam a média do domínio. Precisa de 404 de verdade + 301 das URLs antigas do WordPress.
2. **`www` não redireciona pro apex.** `https://www.notifiquei.com.br/` responde 200 (tem canonical certo, mas sem 301) e levou **119 cliques / 712 impressões** que deviam ser do apex. Falta o 301.
3. **`/blog` e `/blog/` contam separado** (450 e 605 impressões). Mesma página, duas URLs.
4. **`insta.notifiquei.com.br`**: 1.214 impressões, CTR 2,22%. Subdomínio competindo com o domínio principal na mesma consulta.
5. **`/institucional/automacao-para-instagram-barato/` e `/automacao-para-instagram-barato/`** são o mesmo artigo em dois caminhos.

## Dispositivo e país

Brasil concentra 1.291 dos 1.316 cliques. Desktop 951 cliques (CTR 33%) contra celular 360 (CTR 15%) — coerente com busca de marca de quem vai abrir o painel, não com descoberta de conteúdo.
