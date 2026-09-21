const SRC = "home"; // atribuição A/B: identifica a landing de origem (?src=) p/ o webhook da Cakto
export const FREE = `https://app.notifiquei.com.br/auth?src=${SRC}`; // signup grátis (entrada do funil, sem cartão)
export const WPP = "https://wa.me/551231995949";

// Snapshot fornecido pelo responsável em 08/09/2026. Só o total: sem nome de conta
// e sem a régua de destaques, que o dono pediu para tirar.
export const connectedAudience = {
  totalFollowers: 48_680_969,
};

// Preços por moeda. BRL é o de sempre (Cakto). USD/EUR batem com o catálogo criado
// no Stripe em 14/08 — se mexer aqui, mexer lá também, senão a LP promete um valor
// e o checkout cobra outro.
export const plans = [
  {
    name: "Solo",
    slug: "solo",
    mercado: "ambos",
    price: "99",
    usd: "19",
    eur: "18",
    blurb: "Criador iniciante, operação pequena.",
    hrefM: "https://pay.cakto.com.br/jghakt9_1023509",
    hrefA: "https://pay.cakto.com.br/ccwxocu",
    cta: "Começar com Solo",
    featured: true,
    features: ["1 conta — Instagram + TikTok", "Automações ilimitadas", "Templates completos", "Atendimento via chat", "Novidades antes de todo mundo"],
  },
  {
    name: "Duo",
    slug: "duo",
    mercado: "br",
    price: "198",
    blurb: "Duas frentes na mesma operação.",
    hrefM: "https://pay.cakto.com.br/39dt59k",
    hrefA: "https://pay.cakto.com.br/bncrchf",
    cta: "Começar com Duo",
    featured: false,
    features: ["2 contas — Instagram + TikTok", "Times e divisão por equipe", "Automações ilimitadas", "Templates completos", "Atendimento via chat", "Novidades antes de todo mundo"],
  },
  // Pro e Business seguem no catálogo internacional (Stripe). No Brasil a tabela é
  // Solo + Duo: Pro quase não recebia clique e Business, nenhum (PostHog, 30 dias).
  {
    name: "Pro",
    slug: "pro",
    mercado: "intl",
    usd: "79",
    eur: "75",
    blurb: "Pra quem já escalou um pouco.",
    cta: "Começar com Pro",
    featured: false,
    features: ["5 contas — Instagram + TikTok", "Times e divisão por equipe", "Automações ilimitadas", "Templates completos", "Atendimento via chat", "Novidades antes de todo mundo"],
  },
  {
    name: "Business",
    slug: "business",
    mercado: "intl",
    usd: "129",
    eur: "125",
    blurb: "Agência e operação grande.",
    cta: "Começar com Business",
    featured: false,
    features: ["10 contas — Instagram + TikTok", "Times e divisão por equipe", "Automações ilimitadas", "Templates completos", "Atendimento VIP prioritário"],
  },
];


// Links e preços internacionais: fonte única em src/i18n/planos.ts (compartilhada
// com /en e /es). Duplicar aqui já causou divergência antes.

export const planosBR = plans.filter((p) => p.mercado !== "intl");
export const planosINTL = plans.filter((p) => p.mercado !== "br");

export const faqs = [
  { q: "Isso pode bloquear meu Instagram?", a: "O Notifiquei usa a API oficial da Meta, e a conexão acontece pelo login do próprio Instagram. Você não precisa compartilhar sua senha com a gente. As automações devem respeitar as regras e os limites da plataforma." },
  { q: "Preciso saber programar?", a: "Nada. Zero código. Se você sabe mandar mensagem no Instagram, sabe usar o Notifiquei. A interface é toda visual." },
  { q: "Dá pra criar automação conversando com o Claude?", a: "Dá. Todo plano tem uma chave de API, e o painel entrega um kit pronto com a sua chave dentro. Você cola esse kit nas instruções de um Projeto no Claude e passa a pedir em português: ele acha o post, monta a automação, mostra o resumo pra você confirmar e liga. Também dá pra listar, ativar e desativar automações pela conversa." },
  { q: "Dá pra usar como afiliado?", a: "Dá, e é um dos usos mais comuns. Você posta o produto, pede pra comentarem a palavra-chave e o Notifiquei manda o seu link de afiliado no direct de cada pessoa que comentou. Funciona com link de Shopee, Mercado Livre, Amazon, AliExpress, Magalu ou qualquer outro." },
  { q: "Funciona pra e-commerce?", a: "Sim. Temos clientes vendendo moda, cosméticos, suplementos e produtos físicos em geral. O fluxo ideal muda um pouco, mas tem template pronto pra isso." },
  { q: "Qual a diferença pro ManyChat?", a: "O Notifiquei tem interface e suporte em português, planos com preço fixo e contatos ilimitados. Os planos pagos incluem Instagram e TikTok. Você pode começar pelo plano grátis para conhecer a plataforma." },
  { q: "Funciona com poucos seguidores?", a: "Funciona com conta de qualquer tamanho. Quem responde rápido vende mais — não importa se você tem 500 ou 500 mil seguidores. Conta menor costuma sentir o resultado primeiro." },
  { q: "Preciso de conta comercial ou profissional?", a: "Sim, uma conta Profissional ou de Criador no Instagram — gratuita de ativar e leva 1 minuto. É exigência da própria API oficial da Meta." },
  { q: "Funciona com TikTok?", a: "Sim. Os planos pagos incluem Instagram e DMs do TikTok, que exige uma conta Business. Você automatiza os dois canais no mesmo plano. O plano grátis atende apenas o Instagram." },
  { q: "Posso cancelar quando quiser?", a: "Sim, sem fidelidade — você cancela a qualquer momento direto pelo painel. E todo plano pago tem garantia de 7 dias: se não rolar, devolvemos 100% do valor." },
];

// Curado: só logos com fundo transparente e cor real (sem as brancas/fundo-branco).
// Perfis que autorizaram o uso da marca na página. O @ aparece num balão ao
// passar o mouse; quem não tem handle aqui é logo de marca, sem balão.
export const handles: Record<string, string> = {
  "resiliencia-humana.webp": "@resiliencia_humana",
  "mulher-motivada.webp": "@mulhermotivadaa__",
};

// Contas conectadas mostradas em formato de stories. Ordem = tamanho do
// público. O dono confirmou a autorização de uso em 21/09/2026.
export const perfis = [
  { arquivo: "resiliencia_humana", handle: "resiliencia_humana" },
  { arquivo: "mudeparaevoluir", handle: "mudeparaevoluir" },
  { arquivo: "mentedeambicao", handle: "mentedeambicao" },
  { arquivo: "mulheres_maduras", handle: "mulheres_maduras" },
  { arquivo: "drjuanlambert", handle: "drjuanlambert" },
  { arquivo: "gummy", handle: "gummy" },
  { arquivo: "valordiario", handle: "valordiario" },
  { arquivo: "mentalidade_autoritaria", handle: "mentalidade_autoritaria" },
  { arquivo: "emagrecercomdietaofcc", handle: "emagrecercomdietaofcc" },
  { arquivo: "sabedoriaexponencial_", handle: "sabedoriaexponencial_" },
  { arquivo: "mulherderiqueza", handle: "mulherderiqueza" },
  { arquivo: "poesiadasruas", handle: "poesiadasruas" },
  { arquivo: "respiresucesso", handle: "respiresucesso" },
  { arquivo: "metamotivacional", handle: "metamotivacional" },
  { arquivo: "floresceremospoesia", handle: "floresceremospoesia" },
  { arquivo: "ousadiamental", handle: "ousadiamental" },
  { arquivo: "mentaldeaco", handle: "mentaldeaco" },
  { arquivo: "umanordestinacitou", handle: "umanordestinacitou" },
  { arquivo: "tecnicadamente", handle: "tecnicadamente" },
  { arquivo: "curiosidadescantada", handle: "curiosidadescantada" },
  { arquivo: "mentalidade.valiosa", handle: "mentalidade.valiosa" },
  { arquivo: "opoderdaconsistencia", handle: "opoderdaconsistencia" },
  { arquivo: "amandaamicaele", handle: "amandaamicaele" },
  { arquivo: "fazendoanossafestaoficial", handle: "fazendoanossafestaoficial" },
  { arquivo: "karenreceitasfit", handle: "karenreceitasfit" },
  { arquivo: "diquinhas.juliana", handle: "diquinhas.juliana" },
  { arquivo: "dr.limpezaof", handle: "dr.limpezaof" },
  { arquivo: "donamaria_resolve", handle: "donamaria_resolve" },
  { arquivo: "gestoresiliente", handle: "gestoresiliente" },
  { arquivo: "mentesdeslumbrantess", handle: "mentesdeslumbrantess" },
  { arquivo: "chavesdisse", handle: "chavesdisse" },
  { arquivo: "objetosdodia", handle: "objetosdodia" },
  { arquivo: "fatoscomclique", handle: "fatoscomclique" },
  { arquivo: "sutilmenteforte", handle: "sutilmenteforte" },
];

export const clientes = [
  "gummy.png", "responda.png", "rosa-selvagem.png",
  "vert-sophistique.png", "cikiy.svg", "debran.svg",
];
// largura intrínseca de cada logo quando renderizado a 30px de altura — evita CLS (unsized-images)
export const logoDims: Record<string, number> = {
  "gummy.png": 83, "responda.png": 178, "rosa-selvagem.png": 180,
  "vert-sophistique.png": 51, "cikiy.svg": 59, "debran.svg": 100,
};

// Structured data matches the visible plans and FAQ.
export const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://notifiquei.com.br/#org",
    name: "Notifiquei",
    legalName: "Notifiquei Tecnologia",
    url: "https://notifiquei.com.br",
    logo: "https://notifiquei.com.br/assets/favicon-180.png",
    description: "Ferramenta brasileira de automação de Instagram (DMs, comentários e stories) pela API oficial da Meta, para criadores e negócios.",
    taxID: "59.859.848/0001-13",
    sameAs: [
      "https://www.instagram.com/notifiquei.com.br/",
      "https://www.youtube.com/@notifiqueicombr",
      "https://br.linkedin.com/company/notifiquei",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Notifiquei",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: "Automação de Instagram pela API oficial da Meta e DMs do TikTok: responde comentários e DMs automaticamente, com sorteios pelos comentários e links rastreados. Alternativa brasileira ao ManyChat.",
    url: "https://notifiquei.com.br",
    publisher: { "@id": "https://notifiquei.com.br/#org" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      lowPrice: "99",
      highPrice: "198",
      offerCount: planosBR.length,
      offers: planosBR.map((p) => ({
        "@type": "Offer",
        name: `Plano ${p.name}`,
        price: p.price,
        priceCurrency: "BRL",
        url: p.hrefM,
        availability: "https://schema.org/InStock",
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];
