// Landings de tráfego pago: /comece/<tema>. Cada tema repete a promessa do anúncio
// no hero (linhas de até ~12 caracteres, senão cortam no celular). Pra testar outra promessa, acrescente uma entrada e aponte o anúncio
// pra /comece/<nova-chave>. O tema também vira o src da Cakto (lp-<tema>).
export const temas: Record<string, { titulo: string[]; lead: string }> = {
  "link-na-bio": {
    titulo: ["Chega de", "mandar pro", "link da bio."],
    lead: "Quem comenta no seu post recebe o link <strong>direto na DM</strong>, na hora. Sem caçar link na bio, sem esfriar a compra.",
  },
  "vendas-por-dm": {
    titulo: ["Respondeu", "na hora,", "vendeu."],
    lead: "O Notifiquei responde cada comentário e manda o link da sua oferta <strong>na DM, automaticamente</strong>. De dia, de noite e no fim de semana.",
  },
};
