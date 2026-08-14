---
title: "Webhook e integrações: conectando o Notifiquei às suas ferramentas"
description: "Veja como usar o nó de webhook do Notifiquei para mandar dados da conversa pro n8n, pro seu CRM ou pro Slack — no ponto exato do fluxo que você escolher."
date: 2026-07-29
updated: 2026-08-14
author: "Carlos Duarte"
category: "Estratégia"
tags: ["Automação", "Instagram", "Integração", "Webhook", "n8n"]
keywords: ["webhook instagram", "integração notifiquei", "n8n instagram", "automação externa instagram"]
tldr: "O webhook do Notifiquei é um nó que você coloca dentro da automação, no ponto do fluxo que quiser: quando a pessoa responde uma pergunta, toca num botão ou chega no fim do funil, os dados daquele momento vão pro endereço que você configurou. Dá pra ligar com n8n, Slack, CRM ou planilha. Para quem tem sistema próprio, existe também a API de parceiros, com chave própria."
faq:
  - q: "O que é o webhook no Notifiquei?"
    a: "É um nó da automação, como qualquer outro. Você o arrasta pro ponto do fluxo em que quer o disparo — depois de uma pergunta respondida, depois de um botão, no fim do funil — e a partir dali cada pessoa que passa por ali gera uma chamada para o endereço que você configurou."
  - q: "Posso integrar o Notifiquei com n8n?"
    a: "Pode. Existe o nó de webhook genérico, que serve pra qualquer ferramenta que aceite chamada HTTP, e um nó de n8n específico. Você cria o nó de Webhook do lado do n8n, cola o endereço no nó do Notifiquei, e cada pessoa que chega naquele ponto do fluxo vira um dado no seu fluxo do n8n."
  - q: "E se eu tiver um sistema próprio?"
    a: "Aí o caminho é a API de parceiros. Você gera uma chave dentro da sua conta, no menu API, e integra direto — sem depender de um intermediário no meio. É o canal usado por quem constrói em cima do Notifiquei."
---

Você configurou o fluxo de perguntas, a automação está respondendo no direct, e aí vem a dúvida de sempre: isso funciona sozinho ou consegue conversar com o resto das ferramentas que você usa?

O Notifiquei não precisa ficar numa ilha. Ele tem um nó de webhook que você coloca dentro da automação, e com isso dá pra amarrar o que acontece no Instagram com o CRM, o Slack, a planilha, ou qualquer coisa que já faça parte do seu processo.

## o webhook aqui é um nó, não um evento fixo

Essa é a diferença que costuma pegar quem já usou outras ferramentas. Em boa parte delas, o webhook dispara em eventos pré-definidos: "novo contato", "conversa encerrada". Você escolhe de uma lista fechada.

No Notifiquei, o webhook é uma peça do fluxo. Você arrasta ele pro ponto exato onde quer o disparo, do mesmo jeito que arrastaria um "enviar texto" ou uma "espera".

Na prática, isso quer dizer que **você define o evento**. Quer avisar o time só quando a pessoa passa da terceira pergunta? Põe o nó ali. Quer registrar todo mundo que tocou no botão "quero fechar hoje", mas ignorar quem tocou em "só pesquisando"? Põe o nó só naquele braço do fluxo. Quem não chega naquele ponto não dispara nada.

É bem mais preciso do que receber tudo e filtrar depois.

## o que dá pra fazer na prática

O exemplo mais direto é o alerta no Slack. Você coloca o webhook logo depois do botão que indica decisão de compra e manda a chamada pro canal do time de vendas. Quem tocou naquele botão vira uma linha no Slack, na hora, e alguém entra na conversa enquanto ela ainda está quente.

Além do alerta, dá pra:

- **Criar uma tarefa no CRM** quando alguém termina a sequência de qualificação.
- **Alimentar uma planilha** com as respostas que a automação coletou, pergunta por pergunta.
- **Disparar uma sequência de e-mail** quando a pessoa deixa o e-mail dentro do direct.

Esse último é o mais valioso e o menos usado. Como a Meta fecha a janela de conversa em poucos dias — o que a gente explica em [por que mensagem em massa no Instagram não funciona](/blog/campanhas-de-mensagem-em-massa-no-instagram) —, tirar o contato do direct e levar pro seu sistema é o que permite falar com aquela pessoa daqui a um mês. O webhook é a ponte.

## conectando com n8n

Se você prefere montar as automações no seu ritmo, o n8n dá flexibilidade total. O processo é direto: você cria um nó do tipo Webhook no n8n, copia o endereço que ele gera, e cola no nó de webhook dentro da sua automação do Notifiquei.

A partir daí, cada pessoa que passa por aquele ponto do fluxo vira um dado disponível no n8n, e você encadeia o que quiser do lado de lá.

Uma vantagem de operar pela API oficial da Meta é a consistência do que chega. Não é raspagem de tela nem automação que depende do layout da plataforma continuar igual: são dados reais da conversa, com a estabilidade que ferramentas fora da API não têm.

## quando o webhook não basta: a api de parceiros

Webhook é bom para empurrar informação pra fora. Quando você precisa do contrário — consultar, criar, integrar de forma mais profunda — o caminho é a API de parceiros.

Ela fica no menu **API**, dentro da sua conta, e é lá que você gera a chave. É o canal de quem tem sistema próprio e quer plugar direto, sem intermediário no meio. Agência com painel próprio, infoprodutor com área de membros, plataforma que quer oferecer automação de Instagram pros próprios clientes: é esse o caso de uso.

## onde colocar o nó pra ter o dado mais útil

Uma dica que economiza retrabalho: quanto mais fundo no fluxo o webhook estiver, mais qualificado é o dado que chega.

Um webhook logo na entrada te manda todo mundo que comentou uma palavra, inclusive quem só passou. Um webhook depois de duas perguntas e um botão te manda quem se interessou de verdade. O primeiro gera volume, o segundo gera lista de trabalho.

A lógica é a mesma que a gente descreve em [como saber quem está pronto pra fechar](/blog/deteccao-de-intencao-de-compra-no-instagram): o valor não está em capturar tudo, está em capturar quem agiu.

Se você quer testar como o webhook funciona na prática, acessa [notifiquei.com.br](https://notifiquei.com.br), monta uma automação e arrasta o nó pro ponto que fizer sentido.
