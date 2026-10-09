---
titulo: "Como crio uma sequência de mensagens?"
resumo: "Em Ferramentas → Sequências, crie a sequência, escreva as mensagens com o tempo entre elas e coloque a pessoa na sequência por uma automação."
categoria: automacoes
secao: sequencias
ordem: 1
atualizado: 2026-10-09
popular: true
relacionados: [sequencias-24-horas, lembrete, primeira-automacao, editor-simples-ou-avancado]
perguntas:
  - q: "Quantas mensagens cabem numa sequência?"
    a: "Até 30 mensagens por sequência."
  - q: "Se a pessoa comentar de novo, a sequência recomeça?"
    a: "Não. Cada pessoa recebe a mesma sequência uma vez só. Inscrever de novo não reinicia."
  - q: "Posso usar a mesma sequência em várias automações?"
    a: "Pode. Qualquer automação da mesma conta pode inscrever a pessoa nela."
---

Uma **sequência** é uma série de mensagens que chegam sozinhas ao longo dos dias para quem entrou nela. Exemplo: a pessoa pede o e-book hoje, recebe uma dica amanhã e um convite daqui a 3 dias.

Funciona em três partes: **criar a sequência**, **escrever as mensagens** e **colocar a pessoa nela** por uma automação.

## 1. Crie a sequência

1. No menu lateral, abra **Ferramentas → Sequências**.
2. Clique em **Nova sequência**.
3. Dê um nome (ex.: "Boas-vindas de quem pediu o e-book") e clique em **Criar**.

> **Dica:** cada sequência pertence a uma conta do Instagram. Se você tem várias, confira a conta escolhida na barra lateral (ou no seletor do topo da página).

## 2. Escreva as mensagens

Dentro da sequência, clique em **+ Mensagem**. Para cada mensagem, você define:

**Quando enviar**

- Quanto tempo depois: em **minutos**, **horas** ou **dias**. Na primeira mensagem, o tempo conta **a partir de quando a pessoa entra** na sequência (0 = envia na hora). Nas outras, conta **a partir da mensagem anterior**.
- **Enviar só em certo horário** (opcional): ex.: entre 09:00 e 18:00. Se cair fora, espera o próximo horário permitido.
- **Dias da semana** (opcional): marque os dias em que pode enviar. Nenhum marcado = qualquer dia.

Os horários seguem o **horário de Brasília**.

**Mensagem**

- O texto, com até 1.000 caracteres.
- Um **Botão** (opcional), com até 20 caracteres:
  - **Resposta** — um botão de resposta (ex.: "Quero saber mais"). Quando a pessoa toca, conta como resposta e abre mais 24 horas para as próximas mensagens chegarem.
  - **Link** — um botão que abre um endereço.
  - **Sem botão**.

Clique em **Salvar**. Repita para as próximas mensagens (até 30 por sequência).

> **Dica:** prefira o botão **Resposta** na maioria das mensagens. Ele é o que mantém a conversa aberta. Entenda em [Sequências e a regra das 24 horas](/ajuda/automacoes/sequencias-24-horas).

## 3. Coloque a pessoa na sequência

**Pelo editor simples:** no fim do editor, em **Turbinar (opcional)**, ligue **Inscrever numa sequência** e escolha **Qual sequência**. Depois da entrega, a pessoa passa a receber as mensagens. Funciona em comentário, story, live e direct.

**Pelo editor avançado:** use o passo **Inscrever na sequência**. Para parar as mensagens de alguém, use o passo **Tirar da sequência** (dá para tirar de uma sequência ou de **Todas as sequências**).

> **Atenção:** a mesma pessoa entra em cada sequência **uma vez só**. Se ela comentar de novo, não recomeça do zero.

## Acompanhe os resultados

Na página da sequência você vê:

- **Na sequência agora**, **Concluíram**, **Mensagens enviadas** e **Puladas (fora das 24h)**.
- Em cada mensagem, quantas foram enviadas e quantas foram puladas.
- Na aba **Inscritos**: cada pessoa, a **Situação** (Na sequência, Concluiu ou Saiu), a **Próxima** mensagem com data e hora, e quando entrou. O botão **Tirar** remove a pessoa da sequência.

## Editar, pausar e excluir

- **Mudar a ordem:** use as setas de subir e descer em cada mensagem.
- **Desligar uma mensagem:** use a chave da mensagem. Quem chegar nela passa direto para a próxima.
- **Pausar a sequência:** use a chave no topo. Pausada, ninguém recebe nada até você ligar de novo.
- **Renomear:** clique no nome da sequência.
- **Excluir uma mensagem:** quem estava esperando por ela passa para a próxima.
- **Excluir a sequência:** as pessoas inscritas param de receber, e os passos "Inscrever na sequência" das automações deixam de funcionar.
