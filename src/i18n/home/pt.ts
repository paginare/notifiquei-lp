/**
 * Copy da home nova, em português. É o contrato: `en.ts` e `es.ts` repetem
 * exatamente estas chaves (o tipo CopyHome garante isso no build).
 *
 * Regras que valem para as três línguas:
 *  - `hl`, `span` e quebras marcadas com \n existem para o desenho do título;
 *    manter o sentido, não a contagem de caracteres.
 *  - O plano grátis e o preço em real só aparecem no Brasil (CSS br-only),
 *    mas os textos ficam aqui de qualquer jeito.
 *  - Nada de nome de cliente: não temos autorização.
 */
export const pt = {
  meta: {
    title: "Notifiquei — Seu próximo cliente está no direct.",
    description:
      "Transforme comentários em conversas que vendem. Automatize comentários, directs e stories do Instagram com o seu jeito de falar. Conheça o Notifiquei e comece grátis.",
    skip: "Pular para o conteúdo",
    navLangLabel: "Escolher idioma",
    navComecar: "Começar agora",
  },

  nav: [
    { href: "/#plataforma", label: "Recursos" },
    { href: "/#como", label: "Como funciona" },
    { href: "/criadores", label: "Para criadores" },
    { href: "/#planos", label: "Planos" },
  ],

  hero: {
    canais: { nota: "NO AUTOMÁTICO" },
    titulo: ["Seu próximo", "cliente está", "no direct."],
    lead: 'Transforme comentários em conversas que vendem. Automatize seu Instagram e TikTok, com mensagens que têm <strong>o seu jeito.</strong>',
    ctaBr: "Começar grátis",
    ctaIntl: "Começar agora",
    verNaPratica: "Ver na prática",
    microBr: "Grátis para sempre. Sem cartão.",
    microIntl: "Garantia de 7 dias. Cancele quando quiser.",
    fotoAlt: "Criadora olhando para o celular, iluminada pela tela, em um ambiente escuro",
  },

  conversa: {
    topo: "A conversa acontece.",
    pausar: "Pausar animação",
    enviado: "Enviado automaticamente",
    rodape: "Conversas ilustrativas",
    respondeu: "Notifiquei respondeu por você",
    exemplos: [
      { inicial: "J", nome: "julia", origem: "comentou no seu post", pergunta: "QUERO! Me manda o link? 😍", resposta: "Oii, Julia! Separei esse look pra você. Acho que você vai amar 💕", link: "Quero ver o look", rotulo: "Seu próximo look favorito", obrigada: "Era isso! Obrigada 💖" },
      { inicial: "M", nome: "mateus", origem: "mandou um direct", pergunta: "GUIA 🙌 Quero começar!", resposta: "Oi, Mateus! Aqui está o guia que você pediu. Depois me conta o que achou!", link: "Acessar meu guia", rotulo: "Seu conteúdo, a um toque", obrigada: "Já salvei aqui. Valeu! 🙌" },
      { inicial: "B", nome: "bia", origem: "respondeu ao seu story", pergunta: "Amei! Onde eu encontro? 💕", resposta: "Esse é um dos meus favoritos! Deixei o link aqui pra você conhecer ✨", link: "Quero conhecer", rotulo: "A indicação que você queria", obrigada: "Achei! Era esse mesmo 😍" },
    ],
  },

  autoridade: {
    kicker: "CONTAS CONECTADAS AO NOTIFIQUEI",
    titulo: "Grandes perfis\njá estão por aqui.",
    lead: "O tamanho do público que já\nconversa pela plataforma.",
    milhoes: "milhões",
    legenda: "de seguidores somados\nnas contas conectadas",
  },

  provaMarcas: "Mais conversas na rotina de marcas como",
    perfisTitulo: "Contas que já conversam pelo Notifiquei",

  publicos: {
    kicker: "FEITO PARA QUEM TEM ALGO A COMPARTILHAR",
    titulo: "Tem gente querendo\n{hl}o que você tem.{/hl}",
    lead: "Seu próximo cliente, aluno ou fã pode estar a uma mensagem de distância.",
    verComo: "Veja como funciona",
    cards: [
      { tag: "CRIADORES", titulo: "Seu conteúdo abre portas. E conversas.", texto: "Entregue seu material, divulgue seu curso e aproxime quem acompanha você.", alt: "Criador gravando conteúdo com o celular em seu espaço de trabalho" },
      { tag: "LOJAS E NEGÓCIOS", titulo: "Do “tem meu tamanho?” ao seu carrinho.", texto: "Responda o interesse na hora e leve o cliente até o produto que ele quer.", alt: "Criadora de moda apresentando uma camisa rosa e calça clara" },
      { tag: "AFILIADOS", titulo: "Você indica. Seu link chega junto.", texto: "Transforme a curiosidade no seu post em um clique no seu link de afiliado.", alt: "Afiliada gravando uma recomendação de produto com o celular" },
    ],
  },

  demo: {
    titulo: "Converta o interesse\nem novas vendas.",
    lead: "Leve quem interage com seu conteúdo até sua oferta, com respostas automáticas em comentários, stories e directs.",
    escolha: "Escolha uma opção e veja na prática",
    ctaBr: "Criar minha automação",
    ctaIntl: "Começar agora",
    emAcao: "Sua automação em ação",
    exemplo: "EXEMPLO",
    marca: "sua.marca",
    legenda: "O look que vocês pediram.",
    digitando: "Digitando",
    respondeuCom: "Respondeu com Notifiquei",
    enviado: "Enviado automaticamente",
    fechoSub: "E você seguiu criando.",
    // Uma cena por gatilho (comentário, story, direct). A primeira é o estado
    // inicial no HTML; o script troca as outras quando a pessoa escolhe.
    cenas: [
      { chamada: "Comenta QUERO que eu te mando o link 💕", rotulo: "julia comentou", texto: "QUERO 😍", resposta: "Oii, Julia! Esse look é a sua cara 💕 Aqui está o link com todos os detalhes.", link: "Quero ver o look", fecho: "Comentou. Recebeu." },
      { chamada: "Gostou do look? Responde esse story 💕", rotulo: "julia respondeu ao story", texto: "Onde eu encontro? 😍", resposta: "Oi, Julia! Que bom que você gostou 💕 Separei o link do look que apareceu no story pra você.", link: "Ver o look do story", fecho: "Respondeu. Recebeu." },
      { chamada: "Me chama no direct com a palavra LOOK 💕", rotulo: "julia mandou um direct", texto: "LOOK 💕", resposta: "Oii! Procurando o look do último post? 💕 É só tocar aqui para ver os detalhes e escolher o seu.", link: "Ver todos os detalhes", fecho: "Chamou. Recebeu." },
    ],
    gatilhos: [
      { nome: "Comentário", titulo: "Comentou? A conversa já começou.", texto: "Um “quero”, “link” ou “quanto custa” vira uma mensagem no direct. Você escolhe a palavra e a resposta." },
      { nome: "Story", titulo: "Seu story merece uma continuação.", texto: "Respondeu ao story? Continue a conversa automaticamente e entregue seu link a quem se interessou." },
      { nome: "Direct", titulo: "Um direct. Várias possibilidades.", texto: "Responda às palavras-chave com a mensagem certa. Envie uma oferta, um material ou o próximo passo." },
    ],
  },

  mcp: {
    kicker: "AUTOMAÇÃO POR CONVERSA",
    titulo: "Explica do seu jeito.\n{hl}Ele monta a automação.{/hl}",
    lead: "Sem abrir painel e sem preencher formulário: você descreve o que quer como explicaria para alguém do seu time. O Claude acha o post, monta a automação e mostra como ficou. Só entra no ar quando você diz que está certo.",
    itens: [
      "Funciona no Claude e em qualquer app que fale MCP",
      "Cria, edita, liga e desliga sem você sair da conversa",
      "Não disparou? Ele investiga e te diz o motivo",
      "Nada entra no ar sem o seu sim",
    ],
    ctaBr: "Pegar minha chave",
    ctaIntl: "Ver os planos",
    conectado: "Notifiquei conectado",
    novaConversa: "Nova conversa",
    conversas: ["Automação do reel", "Sorteio de sexta", "Palavra “guia”"],
    pedido: "no meu último reel: quem comentar {hl}CUPOM{/hl} recebe o link da loja no direct",
    achou: "Achei o reel de ontem, “bastidores do lançamento”, com 312 comentários. Montei assim:",
    previa: [
      { rotulo: "Gatilho", valor: "Comentário com “cupom”" },
      { rotulo: "No post", valor: "Responde “Te mandei no direct”" },
      { rotulo: "No direct", valor: "Mensagem + botão “Pegar meu cupom”" },
    ],
    permissao: "Permitir que o Claude use {tool}?",
    permitirUma: "Permitir uma vez",
    permitirSempre: "Sempre permitir",
    pronto: "<b>Pronto, está no ar.</b> Automação “CUPOM” ligada nesse reel. Quer que eu avise quando o primeiro comentário chegar?",
    responder: "Responder ao Claude…",
    legenda: "Conversa ilustrativa. As ferramentas e o pedido de permissão são os do conector.",
    aria: "Simulação de uma conversa criando uma automação pelo conector",
  },

  antesDepois: {
    kicker: "MENOS COPIAR E COLAR. MAIS TEMPO PARA VOCÊ.",
    titulo: "Seu direct pode\nter {hl}outra rotina.{/hl}",
    antesRotulo: "SEM AUTOMAÇÃO",
    antesTitulo: "Seu post bombou.\nSeu trabalho também.",
    esperando: ["Tem o link?", "Qual o valor?", "Me manda também!"],
    antesItens: [
      "Responder a mesma pergunta, de novo.",
      "Parar o que está fazendo a cada direct.",
      "Deixar quem tem interesse esperando.",
    ],
    depoisRotulo: "COM NOTIFIQUEI",
    depoisTitulo: "Seu post bombou.\n{span}Pode comemorar.{/span}",
    enviado: "Link enviado no direct.",
    enviadoSub: "Mais uma conversa acontecendo.",
    depoisItens: [
      "Respostas automáticas com a sua voz.",
      "Links chegando a quem quer saber mais.",
      "Seu tempo de volta para criar e vender.",
    ],
    cta: "Quero essa rotina",
  },

  afiliados: {
    kicker: "PARA QUEM GANHA INDICANDO",
    titulo: "“Comenta {hl}QUERO{/hl}\nque eu te mando.”\nE pronto.",
    lead: "Você posta o achadinho. O Notifiquei entrega o seu link de afiliado no direct de cada pessoa que comentou. Sem passar o dia copiando e colando.",
    cta: "Quero automatizar meus links",
    tag: "Do comentário para o seu link",
    comentarioRotulo: "COMENTÁRIO RECEBIDO",
    comentario: "Quero esse achadinho! 😍",
    respostaTitulo: "Oii! Seu link chegou 💕",
    respostaSub: "Enviado automaticamente no direct",
    respostaBotao: "Ver meu achadinho",
    fecho: "Seu conteúdo. Seu link. Sua comissão.",
    marketplaces: "Funciona com os seus links de",
    aria: "Exemplo de envio de link de afiliado",
  },

  extras: {
    titulo: "A conversa é só\n{hl}o começo.{/hl}",
    lead: "As ferramentas para organizar o que acontece depois também estão aqui.",
    cards: [
      { titulo: "Entenda cada clique", texto: "Veja quais automações estão levando seu público até a sua oferta." },
      { titulo: "Mude o link uma vez só", texto: "Atualize o destino e todas as suas automações passam a enviar o link certo." },
      { titulo: "Sorteie sem planilha", texto: "Reúna quem comentou a palavra-chave e faça o sorteio direto no painel." },
    ],
  },

  como: {
    titulo: "Você não precisa de código.\n{hl}Só de uma boa conversa.{/hl}",
    lead: "Três passos entre a sua ideia e a primeira resposta automática.",
    passos: [
      { titulo: "Conecte sua conta", texto: "Entre com seu Instagram pelo login oficial da Meta. Sua senha continua só com você." },
      { titulo: "Faça do seu jeito", texto: "Escolha um post, a palavra-chave e a mensagem. Ou comece com um template pronto." },
      { titulo: "Pronto. Pode publicar.", texto: "Seu público comenta, o Notifiquei responde. E você acompanha tudo pelo painel." },
    ],
    ctaBr: "Começar grátis",
    ctaIntl: "Começar agora",
    seguranca: "Conexão oficial com a Meta. Sua senha fica com você.",
  },

  planos: {
    eyebrow: "Planos",
    titulo: "Sua audiência cresce.\n{hl}Seu preço continua fixo.{/hl}",
    leadBr: "Escolha o plano que acompanha o seu momento. Sem surpresas na fatura.",
    leadIntl: "Escolha o plano que acompanha o seu momento. Preço fixo, sem surpresas na fatura.",
    nota: "<strong>2 em 1:</strong> cada conta já conecta <strong>Instagram + TikTok</strong> no mesmo plano — automatize os dois sem pagar a mais.",
    ciclo: "Ciclo de cobrança",
    mensal: "Mensal",
    anual: "Anual",
    economia: "2 meses de economia",
    porMes: "/mês",
    cobradoAno: "cobrado {valor}/ano",
    maisPopular: "Mais popular",
    garantia: "Garantia de 7 dias · devolução 100%",
    gratisTag: "Grátis para sempre",
    gratisNome: "Plano Grátis",
    gratisBlurb: "Quer só experimentar, sem cartão e sem prazo? Comece de graça e suba de plano quando quiser.",
    gratisItens: [
      "Para sempre, sem cartão",
      "Só Instagram (sem TikTok)",
      "Até 200 envios automáticos por mês",
      "Mensagens com marca d’água “⚡ Enviado com Notifiquei”",
    ],
    gratisCta: "Começar grátis",
    // Nome, frase e itens de cada plano. Preço e link ficam em data/home.ts:
    // número e URL não se traduzem.
    diferenciais: [
      { titulo: "Contatos ilimitados", texto: "O preço não muda se a sua lista dobrar. No ManyChat, a conta acompanha o número de contatos." },
      { titulo: "Instagram e TikTok no mesmo plano", texto: "O segundo canal não custa a mais. Lá, não existe TikTok." },
      { titulo: "Preço em real, com PIX", texto: "Sem câmbio, sem IOF e sem cartão internacional. Suporte em português, por gente." },
      { titulo: "A automação nasce de uma conversa", texto: "Você descreve e o Claude monta. No editor visual, você monta bloco por bloco." },
    ],
    cartoes: {
      solo: { blurb: "Criador iniciante, operação pequena.", cta: "Começar com Solo", itens: ["1 conta — Instagram + TikTok", "Automações e contatos ilimitados", "Templates prontos e atendimento por chat"] },
      duo: { blurb: "Duas frentes na mesma operação.", base: "Tudo do Solo, mais:", cta: "Começar com Duo", itens: ["2 contas em vez de 1", "Times: mais de uma pessoa cuidando", "Divisão por equipe: cada um vê o que é seu"] },
      pro: { blurb: "Pra quem já escalou um pouco.", base: "Tudo do Solo, mais:", cta: "Começar com Pro", itens: ["5 contas — Instagram + TikTok", "Times e divisão por equipe"] },
      business: { blurb: "Agência e operação grande.", base: "Tudo do Pro, mais:", cta: "Começar com Business", itens: ["10 contas — Instagram + TikTok", "Atendimento VIP prioritário"] },
    },
  },

    zapTexto: "Oi! Vim pela página do Notifiquei e queria tirar uma dúvida.",
    zapRotulo: "Falar com a gente no WhatsApp",

  faq: {
    kicker: "PODE PERGUNTAR",
    titulo: "Vamos tirar\n{hl}suas dúvidas?{/hl}",
    lead: "Se preferir uma conversa de verdade, nosso time está por aqui.",
    cta: "Falar com a gente",
  },

  final: {
    bolha: "quero! 💕",
    kicker: "SUA PRÓXIMA CONVERSA COMEÇA AQUI",
    titulo: "Menos “te respondo depois”.\nMais {span}“já te mandei”.{/span}",
    lead: "Seu conteúdo chama atenção. O Notifiquei cuida da conversa.",
    ctaBr: "Começar grátis agora",
    ctaIntl: "Escolher meu plano",
    microBr: "Sem cartão. Sem prazo. Do seu jeito.",
    microIntl: "Garantia de 7 dias. Do seu jeito.",
  },
};

// Sem `as const`: os tipos ficam string/string[], senão en.ts e es.ts teriam de
// repetir as MESMAS palavras do português para satisfazer o tipo literal.
export type CopyHome = typeof pt;
