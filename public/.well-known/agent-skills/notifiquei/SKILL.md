---
name: notifiquei
description: Use quando o usuário quiser responder comentários, stories ou directs do Instagram/TikTok automaticamente, entregar um link no direct para quem comenta uma palavra-chave, ou criar, editar, ligar, desligar e diagnosticar automações na conta Notifiquei dele.
---

# Notifiquei

O Notifiquei responde comentários, stories e directs do Instagram e TikTok automaticamente, pela API oficial da Meta e do TikTok. O caso mais comum: quem comenta uma palavra (ex.: "QUERO") recebe uma mensagem com link no direct.

## Como usar

1. Conecte o servidor MCP `https://api.notifiquei.com.br/mcp` (OAuth com escopo `notifiquei`, detalhes em https://notifiquei.com.br/auth.md).
2. `listar_contas` → `listar_posts` (ou `listar_stories`) para achar o post certo.
3. `prever_automacao` e mostre a prévia ao usuário. Só chame `criar_automacao` depois do "sim" dele.
4. Se algo não disparou, use `diagnosticar_automacao` antes de mudar qualquer coisa.

## Sem conta ainda

Plano grátis sem cartão em https://app.notifiquei.com.br/auth. Planos pagos a partir de R$ 99/mês, com garantia de 7 dias: https://notifiquei.com.br/precos
