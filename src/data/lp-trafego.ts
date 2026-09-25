// Landings de tráfego pago: /comece/<tema>. Cada tema repete a promessa do anúncio
// no hero (linhas de até ~12 caracteres, senão cortam no celular). O lead começa
// dizendo o que o produto é: quem vem de anúncio frio não conhece o Notifiquei.
// Pra testar outra promessa, acrescente uma entrada e aponte o anúncio pra
// /comece/<nova-chave>. O tema também vira o src da Cakto (lp-<tema>).
export const temas: Record<string, { titulo: string[]; lead: string }> = {
  "link-na-bio": {
    titulo: ["Chega de", "mandar pro", "link da bio."],
    lead: "<strong>Automação de Instagram:</strong> quem comenta a palavra-chave no seu post recebe o link direto na DM, na hora. Sem caçar link na bio.",
  },
  "vendas-por-dm": {
    titulo: ["Respondeu", "na hora,", "vendeu."],
    lead: "<strong>Automação de Instagram e TikTok:</strong> o Notifiquei responde cada comentário e manda o link da sua oferta na DM, na hora. Dia e noite.",
  },
};

// Card animado do hero nas LPs: um exemplo só (o que o anúncio promete:
// comentou → link na DM), com a oferta que o público dos criativos vende — curso.
export const conversaLp = {
  topo: "Comentou no post → recebeu o link na DM",
  respondeu: "Na DM da julia · enviado pelo Notifiquei",
  exemplo: {
    inicial: "J",
    nome: "julia",
    origem: "comentou no seu post",
    pergunta: "QUERO! Me manda o link do curso? 😍",
    resposta: "Oi, Julia! Aqui está o link da turma. Te espero lá dentro 💕",
    link: "Garantir minha vaga",
    rotulo: "Seu curso, a um toque",
    obrigada: "Garantido! Obrigada 💖",
  },
  imagem: "/assets/home/creator-content-v2.webp",
};
