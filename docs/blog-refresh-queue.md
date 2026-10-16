# Fila de atualização do blog (para a rotina automática)

Desde 14/09/2026 a rotina **não publica post novo**. A leitura do Search Console (`docs/seo/search-console-2026-09.md`) mostrou que a fila de temas acabou os temas com demanda confirmada e que os posts novos nascem sem impressão, enquanto os posts que já aparecem no Google não convertem em clique. Então cada execução faz **uma** atualização desta fila, de cima pra baixo.

## Como o agente trabalha cada item

1. Ler `docs/seo/search-console-2026-10.md` (substitui a de setembro), `docs/blog-writing-guide.md` (regras de `title`, `description` e voz), `docs/blog-index.md` e o item inteiro abaixo.
2. Fazer só o que o item pede. **Não** reescrever o artigo inteiro. **Não** mudar a `date`. **Não** mudar o nome do arquivo (o slug é a URL).
3. Se o item mexe em `title`, `description`, `tldr`, FAQ ou H2, adicionar ou atualizar `updated: <data de hoje YYYY-MM-DD>` logo abaixo da `date`. Item que só adiciona link interno não mexe no `updated`.
4. Regras que valem sempre: `title` com até 60 caracteres e a consulta perto do começo; `description` de 140 a 160 caracteres com a consulta e uma razão pra clicar; headings em minúscula; sem travessão; link interno no formato `[trecho real da frase](/blog/<slug>)` dentro de uma frase natural, nunca "clique aqui" nem seção "Leia também".
5. Usar só os fatos do item e do próprio post. Não inventar número, prazo nem recurso.
6. `npm install` e `npm run build`. O build tem que passar. Conferir `grep -c '"@type":"BlogPosting"' dist/blog/<slug>.html` (=1) em cada post alterado.
7. Se o `title` mudou, atualizar a coluna de título do post em `docs/blog-index.md`.
8. Remover o item desta fila e registrar uma linha na seção "Feito" (data e o que mudou).
9. `git add -A && git commit -m "feat(blog): atualiza <slug principal>" && git push origin main`.
10. Resumo final: item feito, posts alterados, título e description antes e depois, links adicionados, e se o push foi feito.

**Fila vazia:** não escrever post novo e não puxar tema de `docs/blog-topic-queue.md`. Reportar "fila de atualização vazia" e parar. A próxima leitura do Search Console (por volta de 05/11/2026) reabastece esta fila.

---

## Fila ativa

Reabastecida em 05/10/2026 pela leitura `docs/seo/search-console-2026-10.md`. Fila vazia — próxima leitura do Search Console por volta de 05/11/2026.

---

## Bloqueado (não mexer até alguém conferir no Search Console)

- **`fluxo-de-boas-vindas-no-direct-do-instagram`** (102 impressões no mês até 12/09 na posição 2,3; só 6 impressões de 13/09 a 03/10, na posição 8,3). A queda de uma vez reforça que o volume era sitelink da busca "notifiquei". Se a leitura de novembro repetir esse número, o post sai da lista. Se alguém quiser decidir antes: Search Console > Desempenho > filtro Página com a URL do post > aba Consultas.

## Feito

- **2026-10-16** — `palavras-chave-em-comentarios-para-acionar-automacao`: title encurtado de 66 para 57 chars ("Palavras-chave nos comentários: como escolher os gatilhos"); description reescrita de 132 para 142 chars, agora começa com "Palavras-chave nos comentários do Instagram" e inclui "intenção de compra real" e "ruído com as genéricas"; `updated: 2026-10-16`. tldr, FAQ e H2 não mexidos.

- **2026-10-14** — `caixa-de-entrada-unificada-do-instagram`: description reescrita de 134 para 153 chars, agora começa com "Caixa de entrada do Instagram organizada não impede a venda de esfriar"; travessão do `tldr` substituído por dois-pontos; travessão da resposta da FAQ 1 substituído por dois-pontos; travessão da resposta da FAQ 2 substituído por vírgula; `updated: 2026-10-14`. Title não mudou (59 chars).

- **2026-10-12** — `limites-de-envio-da-api-do-instagram`: description reescrita de 134 para 151 chars, agora começa com "Mensagens por hora na API do Instagram"; inclui "cerca de 200 DMs por hora" e destaca o risco de bloqueio ou banimento de ferramentas de envio ilimitado; `updated: 2026-10-12`. Title não mudou (58 chars).

- **2026-10-09** — `disparar-mensagem-na-live-do-instagram`: description reescrita de 136 para 153 chars, agora começa com "Disparar mensagem na live do Instagram"; destaca que a resposta vai pro direct (não no chat), chega em segundos e se configura antes de entrar ao vivo; `updated: 2026-10-09`. Title não mudou (50 chars).

- **2026-10-05** — `sorteio-no-instagram-pelos-comentarios`: description reescrita de 153 para 151 chars, agora começa com "Como sortear comentários no Instagram"; H2 "como sortear e re-sortear sem refazer tudo" virou "como sortear comentários no instagram e re-sortear sem refazer tudo"; keywords ganharam "como sortear comentários no Instagram" e "como sortear comentario no instagram"; `updated: 2026-10-05`. Title não mudou (57 chars). Conferir na leitura de novembro a posição de "como sortear comentários no instagram" (era 10, zero clique).

- **2026-10-05** — Fila reabastecida com 5 itens a partir da leitura de outubro (`docs/seo/search-console-2026-10.md`). Item do fluxo de boas-vindas segue bloqueado, com o número novo.

- **2026-10-02** — `automacao-no-instagram-guia`: description reescrita de 154 para 142 chars, agora começa com "Automação no Instagram" e inclui o diferencial de segurança do title; primeiro H2 atualizado para começar com "automação no instagram:"; `updated: 2026-10-02` adicionado. Title não mudou (57 chars).

- **2026-09-30** — `dm-para-quem-comentou-no-instagram`: title encurtado de 74 para 52 chars ("DM pra quem comentou: como funciona a janela da Meta"); `updated: 2026-09-30` adicionado. Description não mudou (151 chars).

- **2026-09-28** — `automatizar-resposta-a-stories-no-instagram`: description reescrita de 162 para 146 chars, agora começa com a consulta "Automatizar resposta a stories no Instagram"; `updated: 2026-09-28`. Title não mudou (50 chars).

- **2026-09-21** — Items 1 e 3 removidos da fila ativa: o trabalho de ambos já estava concluído (confirmado nos arquivos dos posts e nas entradas do histórico abaixo), mas os itens não tinham sido apagados da seção ativa em execuções anteriores. Fila limpa.

- **2026-09-18** — `follow-up-automatico-no-direct-do-instagram`: title encurtado de 61 pra 57 chars ("sem parecer chato" → "sem ser chato"); description reescrita com a consulta "follow-up automático no direct" (155 chars); primeiro H2 agora começa com "follow-up automático:"; `updated: 2026-09-18` adicionado.

- **2026-09-17** — Item 3 e mais: os 48 posts foram organizados em pilar e satélite (`docs/blog-clusters.md`), com link do satélite pro pilar e do pilar pra cada satélite. O guia `automacao-no-instagram-guia` saiu de 2 pra 16 links de entrada e os 19 posts órfãos zeraram. Nenhum `title`, `description` ou `date` foi tocado. Verificador: `npm run check:blog`.

- 16/09/2026: `stories-com-interacao-e-dm-automatico` (title, description, keywords, FAQ corrigidos — sem "enquete" como gatilho) e `automatizar-resposta-a-stories-no-instagram` (description, link contextual pra stories-com-interacao). Os dois posts agora abrem a description de forma diferente e a FAQ do post de stories corrige o mito do enquete/caixinha.
- 14/09/2026: `sorteio-no-instagram-pelos-comentarios` com `title`, `description`, `tldr`, primeira pergunta da FAQ e dois H2 cobrindo "sorteio de comentários no Instagram"; links de entrada novos em `palavras-chave-em-comentarios-para-acionar-automacao` e `como-um-comentario-no-instagram-vira-venda`. Conferir o efeito na leitura de outubro.
