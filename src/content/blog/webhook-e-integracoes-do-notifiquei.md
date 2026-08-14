---
title: "Webhook e integrações: conectando o Notifiquei às suas ferramentas"
description: "Veja como usar os webhooks do Notifiquei para conectar com n8n, FunilOnline e Responda.me e criar alertas em tempo real de intenção de compra."
date: 2026-07-29
author: "Carlos Duarte"
category: "Estratégia"
tags: ["Automação", "Instagram", "Integração", "Webhook", "n8n"]
keywords: ["webhook instagram", "integração notifiquei", "n8n instagram", "automação externa instagram"]
tldr: "O Notifiquei envia webhooks em tempo real quando alguém responde uma qualificação ou demonstra intenção de compra no direct, permitindo conectar com n8n, FunilOnline e Responda.me para criar alertas e automações externas sem depender de ferramentas caras."
faq:
  - q: "O que é um webhook no Notifiquei?"
    a: "É uma notificação automática que o Notifiquei envia para um endereço externo sempre que um evento específico acontece no direct, como uma resposta numa sequência de qualificação ou a detecção de intenção de compra. Você usa essa URL em ferramentas como n8n, Make ou Zapier para disparar ações em sequência."
  - q: "Posso integrar o Notifiquei com n8n?"
    a: "Sim. O Notifiquei envia um webhook com os dados da conversa e você configura o n8n para receber essa chamada e executar o que quiser: mandar uma mensagem no Slack, criar uma tarefa no CRM, atualizar uma planilha. Além do n8n, há integração nativa com FunilOnline e Responda.me, sem precisar montar o fluxo do zero."
  - q: "Consigo receber um alerta quando alguém demonstra intenção de compra?"
    a: "Sim, esse é um dos eventos disponíveis. Quando o agente de IA detecta intenção de compra no direct, o Notifiquei dispara um webhook em tempo real. Você configura o destino para notificar o time de vendas no Slack, por exemplo, antes que o lead esfrie."
---

Você configurou o fluxo de perguntas, o agente de IA está respondendo no direct, e aí vem a dúvida de sempre: isso funciona sozinho ou precisa conversar com o resto das ferramentas que você usa?

O Notifiquei não precisa ficar numa ilha. Ele tem webhooks que disparam em eventos específicos do direct, e com isso você consegue amarrar a automação do Instagram com o CRM, o Slack, a planilha, ou qualquer outra ferramenta que já faz parte do seu processo.

A diferença na prática é considerável. Em vez de checar o painel o tempo todo esperando aparecer um lead quente, você recebe o aviso no lugar certo, na hora certa, e entra na conversa quando ainda faz diferença.

## para que serve um webhook aqui?

Um webhook é, em essência, um aviso automático em tempo real. Quando acontece alguma coisa no direct, o Notifiquei manda uma requisição para um endereço que você configurou, carregando os dados daquele evento. Você usa esse endereço no n8n, no Make ou em qualquer ferramenta que aceite chamadas HTTP para executar o próximo passo sem intervenção manual.

No Notifiquei, os dois eventos que disparam webhook hoje são respostas dentro de sequências de perguntas e respostas, e a detecção de intenção de compra no direct. São exatamente os momentos em que o lead está mais perto de comprar, o que torna o timing do alerta bastante relevante.

## o que dá pra fazer na prática?

O exemplo mais direto é o alerta no Slack. Quando alguém demonstra interesse alto durante uma qualificação, o webhook dispara e cai como mensagem no canal do time de vendas. Nenhuma janela de direct perdida, nenhum lead esfriando enquanto espera alguém checar o inbox.

Mas a lista de possibilidades vai além do alerta. Dependendo do que você já usa, dá pra criar uma tarefa no CRM assim que o lead qualifica, atualizar uma planilha com as respostas da sequência de perguntas, ou acionar um fluxo externo quando a conversa chega em determinado ponto, como o disparo de uma sequência de e-mails.

A conta de impacto aparece rápido quando você faz as contas: um produto de R$ 497 com 10 leads demonstrando intenção de compra por semana tem um resultado muito diferente dependendo de você entrar na conversa em 5 minutos ou em 3 horas. Com o alerta chegando no Slack, você não precisa ficar de olho no direct durante o dia todo para não perder esses momentos.

## integrações nativas: FunilOnline e Responda.me

Para quem usa ferramentas específicas do mercado brasileiro, o Notifiquei tem integração nativa com FunilOnline e Responda.me. Isso significa que você não precisa montar o fluxo no n8n do zero: a conexão já está prevista na plataforma.

O Responda.me centraliza o atendimento de vários canais num só lugar. Quando a conversa no Instagram chega num ponto que precisa de uma pessoa, a integração faz a mensagem aparecer no painel do time de suporte sem ninguém precisar copiar e colar ou alternar de tela.

Essa estrutura combina bem com o modelo de quem [integra o Notifiquei com o checkout e rastreia vendas](/blog/integrar-notifiquei-com-checkout-kiwify-hotmart) pelo mesmo webhook, porque você consegue ligar os eventos do direct com as confirmações de compra e montar um funil mais completo sem depender de intermediários caros.

## conectando com n8n

Se você prefere montar as automações no seu ritmo, o n8n é a escolha pra quem quer flexibilidade total. O processo é direto: você cria um nó do tipo Webhook no n8n, cola o endereço nos ajustes do Notifiquei, e a partir daí cada evento relevante no direct vira um dado disponível para você encadear da forma que fizer sentido.

Uma das vantagens de operar pela API oficial da Meta é a consistência dos dados que chegam no webhook. Não é raspagem de tela nem automação que depende do layout da plataforma continuar igual: são dados reais da conversa, o que dá uma estabilidade que ferramentas fora da API simplesmente não têm.

## quando usar o webhook de intenção de compra?

Esse é o evento que gera retorno mais direto. Quando o agente de IA detecta sinais de compra no direct, o webhook dispara antes mesmo de o lead perguntar o preço. Você ou alguém do time recebe o aviso e pode entrar na conversa no momento certo, em vez de só aparecer depois que a pessoa já decidiu comprar em outro lugar ou simplesmente perdeu o interesse.

Para entender melhor como o Notifiquei identifica esses sinais, a lógica de [detectar intenção de compra no direct](/blog/deteccao-de-intencao-de-compra-no-instagram) explica o que o agente avalia durante a conversa e o que acontece na sequência da detecção.

Se você quer testar como o webhook funciona na prática, acessa [notifiquei.com.br](https://notifiquei.com.br) e configura pelo painel. A documentação com os endpoints de cada evento fica disponível dentro da conta.
