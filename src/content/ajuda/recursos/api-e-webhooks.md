---
titulo: "Como uso a API e os webhooks do Notifiquei?"
resumo: "Em Ferramentas → API você gera chaves para ligar seu sistema; no editor avançado, os blocos Webhook e n8n mandam os dados do contato para outra ferramenta."
categoria: recursos
secao: integracoes
ordem: 1
atualizado: 2026-10-09
relacionados: [claude-e-api, editor-simples-ou-avancado, noti]
perguntas:
  - q: "A API dispara mensagens?"
    a: "Não. A API cria, consulta e liga ou desliga automações. Quem dispara a mensagem continua sendo a interação real da pessoa no Instagram."
  - q: "Quem pode gerar uma chave?"
    a: "Só o dono do time."
  - q: "Perdi a chave. E agora?"
    a: "Ela só aparece uma vez. Revogue a antiga e gere outra."
---

O Notifiquei conversa com outros sistemas de três jeitos: **conectando sua IA** (Claude, Codex e outras), pela **API com chave** e pelos blocos **Webhook** e **n8n** dentro das automações.

## Conectar sua IA

Se você quer criar automações conversando com o Claude, veja [Dá para criar automação conversando com o Claude?](/ajuda/primeiros-passos/claude-e-api). Não precisa de chave.

## API com chave

Para ligar o seu sistema (site, plataforma, outra ferramenta):

1. No menu lateral, abra **Ferramentas → API**.
2. Em **Chaves do time**, clique em **Gerar chave**.
3. Dê um nome (ex.: "Integração do site") e gere.
4. Copie a chave na hora — **ela aparece uma vez só**. Trate como senha.

A chave vai no cabeçalho `X-API-Key` das chamadas. Com ela, seu sistema pode:

- Listar as contas do Instagram do time e os posts de cada conta.
- Criar automações de comentário → direct (o padrão "comenta QUERO").
- Consultar automações e ligar ou desligar.

Na lista de chaves você vê quando cada uma foi criada, o último uso e quantas automações ela já criou. Para cortar o acesso, use **Revogar**.

> **Atenção:** a chave dá poder de criar automações em **todas as contas do time**. Por isso só o dono do time gera e revoga chaves.

> **Dica:** a API não manda mensagem sozinha. Quem dispara continua sendo a pessoa que comenta no Instagram.

## Webhook e n8n nas automações

No **editor avançado**, você pode colocar no fluxo os blocos:

- **Webhook** — envia os dados do contato para qualquer endereço (URL) via POST.
- **n8n** — mesma ideia, para quem usa o n8n: cole a URL do webhook do n8n.

Assim, quando alguém passa pela automação, seu outro sistema recebe os dados na hora — por exemplo, para salvar numa planilha ou num CRM.

Para chegar no editor avançado, veja [editor simples ou avançado](/ajuda/primeiros-passos/editor-simples-ou-avancado).
