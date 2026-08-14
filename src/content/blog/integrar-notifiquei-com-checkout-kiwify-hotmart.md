---
title: "Ligar o direct ao checkout: como rastrear a venda que veio do Instagram"
description: "Não existe integração pronta com Kiwify ou Hotmart no Notifiquei. Veja os dois caminhos que funcionam hoje pra saber qual conversa virou venda."
date: 2026-07-08
updated: 2026-08-14
author: "Carlos Duarte"
category: "Estratégia"
tags: ["Automação", "Instagram", "Vendas", "Checkout"]
keywords: ["integrar notifiquei com checkout", "kiwify hotmart notifiquei", "rastrear vendas instagram", "webhook notifiquei"]
tldr: "O Notifiquei não tem integração pronta com Kiwify, Hotmart, Cakto ou Greenn — e não há data pra ter. Os dois caminhos que funcionam hoje são o link rastreado, que mostra quantas pessoas de cada automação clicaram até o checkout, e o nó de webhook, que manda os dados da conversa pro seu sistema pra você cruzar com a venda do lado de lá."
faq:
  - q: "O Notifiquei integra com Kiwify, Hotmart, Cakto ou Greenn?"
    a: "Não. Não existe integração pronta com nenhum checkout, e a área de rastreamento de vendas saiu do produto porque não estava sendo usada. Quem precisa fechar esse ciclo faz pelo webhook, mandando os dados da conversa pro próprio sistema."
  - q: "Então dá pra saber qual automação está vendendo?"
    a: "Dá, pelo relatório de cliques por automação. Ele mostra quantas pessoas receberam o link em cada automação e quantas clicaram. Não é a venda confirmada, mas é o indicador mais próximo — e costuma bastar pra decidir qual post e qual palavra-chave valem a pena repetir."
  - q: "Como faço pra saber a venda confirmada, e não só o clique?"
    a: "Cruzando do lado do seu sistema. Você usa um link com parâmetro de origem para cada automação e olha esse parâmetro no relatório do seu checkout, ou manda os dados da conversa por webhook e casa com o pedido quando ele entra. Nos dois casos, o cruzamento acontece fora do Notifiquei."
---

Você investe numa campanha, aquela pessoa comenta no post, entra pro seu direct, conversa, demonstra interesse e desaparece do seu radar. Você não sabe se ela comprou, se desistiu no meio do checkout ou se simplesmente esqueceu. Aí no mês seguinte você repete a campanha com a mesma dúvida.

Esse buraco entre o DM e a venda é onde a maior parte do dinheiro some. Vale começar pela parte que costuma frustrar: **não existe integração pronta de checkout no Notifiquei**, nem com Kiwify, nem com Hotmart, Cakto ou Greenn. Chegou a estar em construção, mas a área de rastreamento de vendas saiu do produto — em produção ela não registrou nenhuma atribuição, e manter uma tela que ninguém usa custa mais do que rende.

O que existe são dois caminhos que funcionam, e que na prática respondem a maior parte da pergunta.

## caminho 1: o clique, que resolve 80% da dúvida

Antes de perseguir a venda confirmada, vale perguntar o que você vai fazer com o número. Quase sempre a resposta é: decidir o que postar de novo e qual palavra-chave usar.

Para isso, o clique basta. O relatório de cliques por automação mostra, automação por automação, quantas pessoas receberam o link e quantas foram até ele. Com isso você descobre:

- Qual **post** trouxe gente que realmente clicou, e qual só rendeu comentário.
- Qual **palavra-chave** atrai comprador e qual atrai curioso.
- Qual **mensagem** faz a pessoa avançar e qual faz ela parar.

Se um Reel gerou 400 comentários e 12 cliques, e outro gerou 90 comentários e 60 cliques, você já sabe qual dos dois repetir — sem precisar da confirmação de pagamento pra chegar nessa conclusão.

É o mesmo raciocínio de [como saber quem está pronto pra fechar](/blog/deteccao-de-intencao-de-compra-no-instagram): o clique é o sinal mais honesto que o direct te dá.

## caminho 2: o link com origem, pra casar no seu checkout

Se você quer a venda confirmada, o cruzamento acontece do lado do checkout — e o truque é levar a informação de origem junto com a pessoa.

Você monta um link diferente para cada automação, com um parâmetro que identifica de onde veio, no formato que a sua plataforma aceita. Depois, no relatório do seu checkout, você filtra por esse parâmetro e vê quantas vendas cada origem gerou.

Vale usar os **links dinâmicos por apelido** aqui. Você cadastra o link uma vez com um apelido, usa esse apelido dentro das automações e, quando o destino mudar — mudou a oferta, mudou a página, acabou a promoção —, troca num lugar só e todas as automações passam a mandar o novo. Sem isso, cada troca de campanha vira uma caçada por automações desatualizadas.

## caminho 3: o webhook, pra quem tem sistema

Quem tem CRM ou sistema próprio consegue fechar o ciclo de verdade.

Você coloca um nó de webhook dentro da automação, no ponto em que a pessoa está prestes a receber o link, e manda os dados daquela conversa pro seu sistema. Do lado de lá, quando o pedido entra, você casa o contato com a venda.

O post sobre [webhook e integrações](/blog/webhook-e-integracoes-do-notifiquei) mostra onde posicionar o nó pra o dado chegar já qualificado, em vez de vir todo mundo que passou pelo topo do funil.

## por que fechar esse ciclo importa no número

Pensa num produto de R$ 297. Se você tem 500 conversas no direct por mês e converte 5%, são 25 vendas e R$ 7.425.

Agora imagine que, olhando os cliques, você descobre que duas das suas seis automações concentram quase todo o clique — e as outras quatro estão gastando alcance à toa. Trocar o conteúdo das quatro pelo formato das duas que funcionam costuma mexer mais no resultado do que qualquer dashboard de atribuição.

O rastreamento não é vaidade técnica. É saber onde o dinheiro parou de caminhar — e para isso você não precisa de integração de checkout, precisa de olhar o que já está sendo medido.

## o que fazer enquanto isso

A recomendação honesta: comece pelo clique. Monte as automações com links rastreados, use apelido pra não se perder quando a oferta mudar, e leia o relatório uma vez por semana.

Se em algum momento o volume justificar a atribuição completa, o webhook está lá — e você não vai precisar refazer nada, porque o fluxo já vai estar montado.

Pra começar, acesse [https://notifiquei.com.br](https://notifiquei.com.br) e monte o seu primeiro fluxo com link rastreado.
