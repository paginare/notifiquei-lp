# Fila de atualização do blog (para a rotina automática)

Desde 14/09/2026 a rotina **não publica post novo**. A leitura do Search Console (`docs/seo/search-console-2026-09.md`) mostrou que a fila de temas acabou os temas com demanda confirmada e que os posts novos nascem sem impressão, enquanto os posts que já aparecem no Google não convertem em clique. Então cada execução faz **uma** atualização desta fila, de cima pra baixo.

## Como o agente trabalha cada item

1. Ler `docs/seo/search-console-2026-09.md`, `docs/blog-writing-guide.md` (regras de `title`, `description` e voz), `docs/blog-index.md` e o item inteiro abaixo.
2. Fazer só o que o item pede. **Não** reescrever o artigo inteiro. **Não** mudar a `date`. **Não** mudar o nome do arquivo (o slug é a URL).
3. Se o item mexe em `title`, `description`, `tldr`, FAQ ou H2, adicionar ou atualizar `updated: <data de hoje YYYY-MM-DD>` logo abaixo da `date`. Item que só adiciona link interno não mexe no `updated`.
4. Regras que valem sempre: `title` com até 60 caracteres e a consulta perto do começo; `description` de 140 a 160 caracteres com a consulta e uma razão pra clicar; headings em minúscula; sem travessão; link interno no formato `[trecho real da frase](/blog/<slug>)` dentro de uma frase natural, nunca "clique aqui" nem seção "Leia também".
5. Usar só os fatos do item e do próprio post. Não inventar número, prazo nem recurso.
6. `npm install` e `npm run build`. O build tem que passar. Conferir `grep -c '"@type":"BlogPosting"' dist/blog/<slug>.html` (=1) em cada post alterado.
7. Se o `title` mudou, atualizar a coluna de título do post em `docs/blog-index.md`.
8. Remover o item desta fila e registrar uma linha na seção "Feito" (data e o que mudou).
9. `git add -A && git commit -m "feat(blog): atualiza <slug principal>" && git push origin main`.
10. Resumo final: item feito, posts alterados, título e description antes e depois, links adicionados, e se o push foi feito.

**Fila vazia:** não escrever post novo e não puxar tema de `docs/blog-topic-queue.md`. Reportar "fila de atualização vazia" e parar. A próxima leitura do Search Console (por volta de 14/10/2026) reabastece esta fila.

---

## Bloqueado (não mexer até alguém conferir no Search Console)

- **`fluxo-de-boas-vindas-no-direct-do-instagram`** (102 impressões no mês, posição 2,3, 1 clique). Posição 2 com CTR de 1% tem cara de impressão vinda da busca "notifiquei". Precisa abrir Search Console > Desempenho > filtro Página com a URL do post > aba Consultas. Se as consultas forem de sorteio, boas-vindas ou direct, vira item desta fila. Se forem de marca, o post sai da lista.

## Feito

- **2026-09-21** — Items 1 e 3 removidos da fila ativa: o trabalho de ambos já estava concluído (confirmado nos arquivos dos posts e nas entradas do histórico abaixo), mas os itens não tinham sido apagados da seção ativa em execuções anteriores. Fila limpa.

- **2026-09-18** — `follow-up-automatico-no-direct-do-instagram`: title encurtado de 61 pra 57 chars ("sem parecer chato" → "sem ser chato"); description reescrita com a consulta "follow-up automático no direct" (155 chars); primeiro H2 agora começa com "follow-up automático:"; `updated: 2026-09-18` adicionado.

- **2026-09-17** — Item 3 e mais: os 48 posts foram organizados em pilar e satélite (`docs/blog-clusters.md`), com link do satélite pro pilar e do pilar pra cada satélite. O guia `automacao-no-instagram-guia` saiu de 2 pra 16 links de entrada e os 19 posts órfãos zeraram. Nenhum `title`, `description` ou `date` foi tocado. Verificador: `npm run check:blog`.

- 16/09/2026: `stories-com-interacao-e-dm-automatico` (title, description, keywords, FAQ corrigidos — sem "enquete" como gatilho) e `automatizar-resposta-a-stories-no-instagram` (description, link contextual pra stories-com-interacao). Os dois posts agora abrem a description de forma diferente e a FAQ do post de stories corrige o mito do enquete/caixinha.
- 14/09/2026: `sorteio-no-instagram-pelos-comentarios` com `title`, `description`, `tldr`, primeira pergunta da FAQ e dois H2 cobrindo "sorteio de comentários no Instagram"; links de entrada novos em `palavras-chave-em-comentarios-para-acionar-automacao` e `como-um-comentario-no-instagram-vira-venda`. Conferir o efeito na leitura de outubro.
