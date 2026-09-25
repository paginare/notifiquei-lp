// Landings de tráfego pago: /comece/<tema>. O tema é o que o anúncio aponta; o
// hero de cada um é uma variante do teste de headline (resultado desejado primeiro,
// pra tráfego frio). Pra testar outra promessa, acrescente uma entrada e aponte o
// anúncio pra /comece/<nova-chave>. O tema também vira o src da Cakto (lp-<tema>).
export interface TemaLp {
  titulo: string[]; // uma linha por item; a última fica rosa
  lead: string; // pode ter <strong>
  cta: string;
  ctaSecundario: string;
}

export const eyebrowLp = "Instagram + TikTok · Automação de comentários e DM";

export const temas: Record<string, TemaLp> = {
  // Variante "intenção": fala do momento em que o lead já levantou a mão.
  "link-na-bio": {
    titulo: ["Se comentaram,", "já estão interessados.", "Mande a oferta."],
    lead: "Quem comenta no seu post recebe sua oferta <strong>direto na DM</strong>, em segundos. Automático, no Instagram e TikTok.",
    cta: "Quero automatizar",
    ctaSecundario: "Ver funcionando",
  },
  // Variante "resultado": comentou → recebeu → vendeu.
  "vendas-por-dm": {
    titulo: ["Comentou.", "Recebeu.", "Você vendeu."],
    lead: "O Notifiquei responde cada comentário e <strong>envia sua oferta na DM</strong> em segundos, mesmo com você offline.",
    cta: "Automatizar minhas DMs",
    ctaSecundario: "Ver como funciona",
  },
};
