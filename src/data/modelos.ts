// Modelos prontos que o produto oferece hoje: tabela AutomationTemplate ativa no
// banco em 30/09/2026. Ficaram de fora os que dependem de etiquetas (recurso
// desligado) e as cópias sem prévia. gatilho: comentario | story | direct.
export const modelos = [
  {
    "nome": "Comentou, recebe o link no Direct",
    "descricao": "Quando alguém comenta uma palavra-chave (ex.: EU QUERO), o bot responde o comentário e manda seu link de compra no Direct, com um botão.",
    "categoria": "Vendas",
    "gatilho": "comentario",
    "destaque": true,
    "comentario": "EU QUERO",
    "resposta": "Acabei de te chamar no Direct com o link 💜",
    "botao": "Quero comprar"
  },
  {
    "nome": "Lançamento: link da oferta no Direct",
    "descricao": "Durante um lançamento, quem comenta a palavra do dia recebe na hora o link da oferta com um botão de compra. Troque a palavra-chave e a URL.",
    "categoria": "Vendas",
    "gatilho": "comentario",
    "destaque": false,
    "comentario": "OFERTA",
    "resposta": "Te mandei a oferta no Direct, corre que é por tempo limitado ⏰",
    "botao": "Ver oferta"
  },
  {
    "nome": "Cupom de desconto no Direct",
    "descricao": "Quem comenta CUPOM recebe um código de desconto e o link da loja no Direct. Ótimo pra converter quem já está quase comprando.",
    "categoria": "Vendas",
    "gatilho": "comentario",
    "destaque": true,
    "comentario": "CUPOM",
    "resposta": "Pronto! Te mandei seu cupom no Direct 🎁",
    "botao": "Usar meu cupom"
  },
  {
    "nome": "Mandou \"catálogo\"? Recebe na hora",
    "descricao": "Quando alguém te chama no Direct pedindo o catálogo, o bot responde com o link do seu catálogo na hora. Personalize a palavra-chave e o link.",
    "categoria": "Vendas",
    "gatilho": "direct",
    "destaque": false,
    "comentario": "Oi, tem catálogo?",
    "resposta": "Tenho sim! Aqui está o nosso catálogo completo 👉 https://seulink.com/catalogo",
    "botao": ""
  },
  {
    "nome": "Respondeu o story, eu puxo conversa",
    "descricao": "Sempre que alguém responde seu story, o bot agradece e puxa conversa no Direct. Simples e ótimo pra aquecer audiência.",
    "categoria": "Engajamento",
    "gatilho": "story",
    "destaque": true,
    "comentario": "🔥🔥🔥",
    "resposta": "Aeee, obrigado por responder meu story! 🙌 Me conta o que você achou?",
    "botao": ""
  },
  {
    "nome": "Sorteio: comente para participar",
    "descricao": "Quem comenta a palavra do sorteio recebe a confirmação e as regras no Direct, com um botão pro post do sorteio. Edite a palavra-chave e as regras.",
    "categoria": "Engajamento",
    "gatilho": "comentario",
    "destaque": false,
    "comentario": "EU QUERO PARTICIPAR",
    "resposta": "Você está participando! Te mandei as regras no Direct 🎉",
    "botao": "Ver as regras"
  },
  {
    "nome": "Boas-vindas no primeiro Direct",
    "descricao": "Recebe quem te manda a primeira mensagem com uma saudação calorosa e um convite pra continuar a conversa. Vale pra qualquer mensagem no Direct.",
    "categoria": "Engajamento",
    "gatilho": "direct",
    "destaque": false,
    "comentario": "Oi!",
    "resposta": "Oi! Que bom te ver por aqui 💜 Como posso te ajudar hoje?",
    "botao": ""
  },
  {
    "nome": "Ebook grátis no Direct",
    "descricao": "Comentou a palavra-chave (ex.: EBOOK), recebe o link do material na hora, com um botão de download. Troque a palavra-chave e o link.",
    "categoria": "Captar contatos",
    "gatilho": "comentario",
    "destaque": true,
    "comentario": "EBOOK",
    "resposta": "Te chamei no Direct com o material 🎁",
    "botao": "Baixar ebook"
  },
  {
    "nome": "Entrar na lista VIP",
    "descricao": "Quem comenta VIP entra na sua lista de espera/aviso. Exige seguir a conta antes de enviar o link. Personalize a palavra-chave e a URL de inscrição.",
    "categoria": "Captar contatos",
    "gatilho": "comentario",
    "destaque": false,
    "comentario": "VIP",
    "resposta": "Bem-vindo(a) à lista VIP! Te mandei o link no Direct 👑",
    "botao": "Entrar na lista"
  },
  {
    "nome": "Aula gratuita no Direct",
    "descricao": "Comentou AULA, recebe o link da aula gratuita com um botão pra assistir. Ótimo pra captar leads de conteúdo. Edite a palavra-chave e o link.",
    "categoria": "Captar contatos",
    "gatilho": "comentario",
    "destaque": false,
    "comentario": "AULA",
    "resposta": "Boa! Te mandei o link da aula no Direct 🎬",
    "botao": "Assistir aula"
  },
  {
    "nome": "Agende sua avaliação",
    "descricao": "Quem comenta AGENDAR recebe seu link de agendamento no Direct, com um botão. Perfeito pra serviços (clínicas, salões, consultorias). Troque o link da agenda.",
    "categoria": "Agendamento",
    "gatilho": "comentario",
    "destaque": true,
    "comentario": "AGENDAR",
    "resposta": "Que ótimo! Te mandei o link pra agendar no Direct 📅",
    "botao": "Agendar agora"
  },
  {
    "nome": "Mandou \"marcar\"? Recebe a agenda",
    "descricao": "Quando alguém te chama no Direct querendo marcar, o bot responde na hora com seu link de agendamento. Personalize as palavras-chave e o link.",
    "categoria": "Agendamento",
    "gatilho": "direct",
    "destaque": false,
    "comentario": "Quero marcar um horário",
    "resposta": "Claro! Escolha o melhor horário aqui 👉 https://seulink.com/agenda",
    "botao": ""
  },
  {
    "nome": "Tira-dúvidas automático no Direct",
    "descricao": "Quem chama no Direct com DÚVIDA/AJUDA recebe uma primeira resposta de boas-vindas com os caminhos de atendimento. Edite o texto com as suas informações.",
    "categoria": "Atendimento",
    "gatilho": "direct",
    "destaque": false,
    "comentario": "Tenho uma dúvida",
    "resposta": "Oi! Estou aqui pra ajudar 💬 Me conta sua dúvida que já te respondo.",
    "botao": ""
  },
  {
    "nome": "Horário de funcionamento no Direct",
    "descricao": "Responde automaticamente quem pergunta o horário de funcionamento. Ótimo pra reduzir perguntas repetidas. Atualize com os seus horários.",
    "categoria": "Atendimento",
    "gatilho": "direct",
    "destaque": false,
    "comentario": "Que horas vocês abrem?",
    "resposta": "Funcionamos de seg. a sex., das 9h às 18h 🕘 Como posso ajudar?",
    "botao": ""
  },
  {
    "nome": "Comentou? Recebe o link da bio",
    "descricao": "Modelo coringa: quem comenta LINK recebe no Direct o link que estaria na bio, com um botão. Use pra direcionar tráfego de qualquer post.",
    "categoria": "Uso geral",
    "gatilho": "comentario",
    "destaque": false,
    "comentario": "LINK",
    "resposta": "Te mandei o link no Direct 👇",
    "botao": "Abrir link"
  },
  {
    "nome": "Comentário vira conversa no Direct",
    "descricao": "Modelo simples e versátil: responde o comentário e abre conversa no Direct com um botão \"Saiba mais\". Ponto de partida pra qualquer campanha.",
    "categoria": "Uso geral",
    "gatilho": "comentario",
    "destaque": false,
    "comentario": "QUERO",
    "resposta": "Boa! Acabei de te chamar no Direct 😉",
    "botao": "Saiba mais"
  }
] as const;
