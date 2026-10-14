---
titulo: "Dá para criar automação conversando com o Claude?"
resumo: "Dá. Em Ferramentas → API você conecta o Claude (ou outra IA compatível) ou gera uma chave com um kit pronto para colar no Claude."
categoria: primeiros-passos
secao: celular-e-ia
ordem: 3
atualizado: 2026-10-09
antigo: claude
relacionados: [noti, api-e-webhooks, primeira-automacao]
perguntas:
  - q: "Preciso saber programar?"
    a: "Não. Você conecta uma vez e depois é só conversar em português."
  - q: "Quem pode gerar chaves?"
    a: "Só o dono do time, porque a chave dá acesso a todas as contas do time."
  - q: "A automação criada pelo Claude aparece no painel?"
    a: "Aparece, igual às que você cria no painel."
---

Dá, sim. Você conecta o Claude (ou o Codex, ou outra IA compatível) ao Notifiquei e passa a pedir em português: ele acha o post, monta a automação, mostra o resumo e liga.

Tudo fica em **Ferramentas → API**, no menu lateral do painel.

## Jeito 1: conectar sua IA (sem chave)

É o caminho mais simples. Na seção **Conectar na sua IA**:

1. Clique em **Copiar URL**.
2. No Claude (site ou app), abra **Configurações → Conectores**.
3. Toque em **Adicionar conector personalizado** e cole a URL.
4. Autorize o Notifiquei e escolha o time.

Pronto: é só pedir. Também há abas com o passo a passo para **Claude Code**, **Codex** e **Outro app (MCP)**.

> **Dica:** para cortar o acesso de uma IA conectada, use **Revogar** na lista de conexões. O app perde o acesso na hora.

## Jeito 2: gerar uma chave e usar o kit pronto

1. Em **Chaves do time**, clique em **Gerar chave**.
2. Dê um nome para saber de quem é a chave (ex.: "Claude do João").
3. Copie a chave — **ela só aparece essa vez**. Guarde como senha.
4. Clique em **Copiar kit pro Claude**. O kit já vem com a chave dentro.
5. No claude.ai, cole o kit nas **Instruções de um Projeto**.
6. Converse: "cria um comenta QUERO no meu próximo post com esses links".

> **Atenção:** só o **dono do time** gera e revoga chaves. Se perder uma chave, revogue e gere outra.

## Exemplo de pedido

> "Cria um comenta QUERO no meu próximo post que manda o link do e-book."

O Claude responde com o resumo da automação e pergunta se pode ligar.
