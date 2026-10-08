# auth.md — Notifiquei

Acesso de agentes de IA (Claude, ChatGPT, Cursor, Codex ou qualquer cliente MCP) ao Notifiquei, para criar e gerenciar automações de Instagram e TikTok **em nome de um usuário** com conta no Notifiquei.

## Endpoints

- MCP (Streamable HTTP): https://api.notifiquei.com.br/mcp
- Protected Resource Metadata (RFC 9728): https://api.notifiquei.com.br/.well-known/oauth-protected-resource/mcp
- Authorization Server Metadata (RFC 8414): https://api.notifiquei.com.br/.well-known/oauth-authorization-server
- Registro de cliente (RFC 7591): https://api.notifiquei.com.br/register
- Revogação: https://api.notifiquei.com.br/revoke
- Escopo: notifiquei

## Registro do agente (passo a passo)

1. Registre o agente como cliente OAuth com um POST em https://api.notifiquei.com.br/register (registro dinâmico, RFC 7591), informando o redirect_uri do agente.
2. Mande o usuário para https://api.notifiquei.com.br/authorize com authorization code + PKCE (S256) e escopo notifiquei. O usuário entra no Notifiquei e aprova o acesso.
3. Troque o code pelo token em https://api.notifiquei.com.br/token.
4. Use o token em toda chamada ao MCP no cabeçalho: Authorization: Bearer <token>.

## Alternativa: chave de API

O usuário gera uma chave no painel do Notifiquei (https://app.notifiquei.com.br) e o agente a envia no mesmo cabeçalho: Authorization: Bearer <chave>.

## Regras

- Sempre em nome de um usuário com plano ativo. Não há acesso anônimo.
- Nenhuma automação entra no ar sem a confirmação do usuário.
- O usuário pode revogar o acesso a qualquer momento (revogação acima ou apagando a chave no painel).
- Dúvidas: contato@notifiquei.com.br
