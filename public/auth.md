# Notifiquei — acesso para agentes

O Notifiquei expõe um servidor MCP para agentes de IA (Claude, ChatGPT, Cursor, Codex ou qualquer cliente MCP) criarem e gerenciarem automações de Instagram e TikTok na conta do usuário.

- **Endpoint MCP (Streamable HTTP):** `https://api.notifiquei.com.br/mcp`
- **Recurso protegido (RFC 9728):** `https://api.notifiquei.com.br/.well-known/oauth-protected-resource/mcp`
- **Servidor de autorização (RFC 8414):** `https://api.notifiquei.com.br/.well-known/oauth-authorization-server`
- **Escopo:** `notifiquei`

## Como o agente se registra

1. **OAuth 2.1 com registro dinâmico (recomendado).** Registre o cliente em `https://api.notifiquei.com.br/register` (RFC 7591), use authorization code com PKCE (S256) e peça o escopo `notifiquei`. O usuário faz login no Notifiquei e aprova o acesso.
2. **Chave de API.** O usuário gera uma chave no painel do Notifiquei (app.notifiquei.com.br) e o agente envia `Authorization: Bearer <chave>`.

## Regras

- O acesso é sempre em nome de um usuário com plano ativo. Não há acesso anônimo.
- Nenhuma automação entra no ar sem confirmação do usuário.
- Revogar token: `https://api.notifiquei.com.br/revoke`. O usuário também pode apagar a chave no painel.
- Dúvidas: contato@notifiquei.com.br
