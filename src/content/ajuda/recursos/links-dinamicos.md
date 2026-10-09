---
titulo: "O que são links dinâmicos?"
resumo: "Você dá um apelido para um link e usa o apelido nas automações. Quando o destino muda, troca num lugar só e todas acompanham."
categoria: recursos
secao: links-e-resultados
ordem: 2
atualizado: 2026-10-09
relacionados: [links-rastreados, link-texto-ou-vitrine]
perguntas:
  - q: "O que acontece se eu excluir um link dinâmico?"
    a: "As automações que usam esse apelido passam a não enviar link. Troque antes de excluir."
  - q: "Para que serve na prática?"
    a: "Link de grupo VIP, de checkout ou de promoção que muda toda semana: você troca num lugar só."
---

Com os **links dinâmicos**, você dá um apelido para um link (ex.: "Grupo VIP") e usa esse apelido nas automações. Quando o destino muda, você troca **num lugar só** e todas as automações passam a mandar o novo.

## Como criar

1. No menu lateral, abra **Ferramentas → Links dinâmicos**.
2. Preencha o **Nome** (ex.: Grupo VIP) e a URL.
3. Clique em **Criar link**.
4. Clique em **Copiar** para copiar o código do link, no formato `{{link:apelido}}`.

## Como usar nas automações

Cole o código `{{link:apelido}}` no lugar do link, na mensagem da automação. Na hora de enviar, o Notifiquei troca pelo endereço atual.

## Como trocar o destino

1. Em **Links dinâmicos**, clique em **Editar** no link.
2. Cole a nova URL e clique em **Salvar**.

Pronto: todas as automações que usam esse apelido já mandam o novo link.

> **Atenção:** se você **Excluir** um link dinâmico, as automações que usam o apelido passam a não enviar link.
