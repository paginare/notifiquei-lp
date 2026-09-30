// Tabela e perguntas de /en/pricing e /es/precios (30/09/2026). Planos do
// catálogo internacional (i18n/planos.ts): Solo, Pro e Business, pagos no Stripe
// em dólar ou euro. Sem plano grátis fora do Brasil. true = tem, false = não tem.
import { PLANOS_INTL } from "../i18n/planos";

const preco = (slug: string) => {
  const p = PLANOS_INTL.find((x) => x.slug === slug)!;
  return `$${p.usd} / €${p.eur}`;
};
const PRECOS = [preco("solo"), preco("pro"), preco("business")];

type Linha = { recurso: string; valores: (string | boolean)[] };
type Grupo = { titulo: string; linhas: Linha[] };

export const precosIntl: Record<"en" | "es", {
  title: string; description: string; kicker: string; titulo: string; nota: string; faqTitulo: string;
  planos: string[]; grupos: Grupo[]; faqs: { q: string; a: string }[];
}> = {
  en: {
    title: "Pricing — Notifiquei",
    description: "Notifiquei plans in USD or EUR: fixed price, unlimited contacts and automations, Instagram + TikTok on the same plan. 7-day guarantee.",
    kicker: "COMPARE PLANS", titulo: "Everything in\n{hl}each plan.{/hl}",
    nota: "Monthly prices in USD or EUR, depending on your country. Pay yearly and get 2 months free. Every plan has a 7-day guarantee.",
    faqTitulo: "Questions about\n{hl}plans and billing.{/hl}",
    planos: ["Solo", "Pro", "Business"],
    grupos: [
      { titulo: "Price and accounts", linhas: [
        { recurso: "Price per month", valores: PRECOS },
        { recurso: "Instagram accounts", valores: ["1", "5", "10"] },
        { recurso: "TikTok DMs (same brand)", valores: [true, true, true] },
        { recurso: "Automatic messages per month", valores: ["Unlimited", "Unlimited", "Unlimited"] },
        { recurso: "Contacts and automations", valores: ["Unlimited", "Unlimited", "Unlimited"] },
      ] },
      { titulo: "Automations", linhas: [
        { recurso: "Comment → DM", valores: [true, true, true] },
        { recurso: "Story replies", valores: [true, true, true] },
        { recurso: "DM keywords", valores: [true, true, true] },
        { recurso: "Ice breakers in DMs", valores: [true, true, true] },
        { recurso: "Ready-made templates", valores: [true, true, true] },
        { recurso: "Build automations by chatting with Claude", valores: [true, true, true] },
      ] },
      { titulo: "Tools", linhas: [
        { recurso: "Comment giveaways", valores: [true, true, true] },
        { recurso: "Tracked links and clicks", valores: [true, true, true] },
        { recurso: "Keyword comment moderation", valores: [true, true, true] },
        { recurso: "iPhone and Android app", valores: [true, true, true] },
      ] },
      { titulo: "Team and support", linhas: [
        { recurso: "Teams and roles", valores: [false, true, true] },
        { recurso: "Support", valores: ["Chat", "Chat", "Priority VIP"] },
        { recurso: "7-day guarantee", valores: [true, true, true] },
      ] },
    ],
    faqs: [
      { q: "Does the price go up as my contacts grow?", a: "No. You pay for the plan, not for the size of your list: contacts and automations are unlimited." },
      { q: "What counts as one account?", a: "Each connected Instagram account. The TikTok account of the same brand comes with it and doesn't count as another one." },
      { q: "What's the difference between Solo and Pro?", a: "Number of accounts and teamwork. Solo is for one account. Pro covers up to five and lets more than one person handle the automations, with roles." },
      { q: "How do I pay?", a: "By card, through Stripe, in USD or EUR depending on your country." },
      { q: "Is there a free plan?", a: "Outside Brazil, no — but every plan has a 7-day guarantee: if it doesn't work out, we refund 100%." },
      { q: "Can I cancel anytime?", a: "Yes, no lock-in. You manage or cancel your subscription in the Stripe customer portal, and access continues until the end of the period you already paid for." },
    ],
  },
  es: {
    title: "Precios — Notifiquei",
    description: "Planes de Notifiquei en USD o EUR: precio fijo, contactos y automatizaciones ilimitados, Instagram + TikTok en el mismo plan. Garantía de 7 días.",
    kicker: "COMPARA LOS PLANES", titulo: "Todo lo que trae\n{hl}cada plan.{/hl}",
    nota: "Precios mensuales en USD o EUR, según tu país. Pagando anual tienes 2 meses gratis. Todos los planes tienen garantía de 7 días.",
    faqTitulo: "Dudas sobre\n{hl}planes y cobro.{/hl}",
    planos: ["Solo", "Pro", "Business"],
    grupos: [
      { titulo: "Precio y cuentas", linhas: [
        { recurso: "Precio por mes", valores: PRECOS },
        { recurso: "Cuentas de Instagram", valores: ["1", "5", "10"] },
        { recurso: "DMs de TikTok (misma marca)", valores: [true, true, true] },
        { recurso: "Mensajes automáticos por mes", valores: ["Ilimitados", "Ilimitados", "Ilimitados"] },
        { recurso: "Contactos y automatizaciones", valores: ["Ilimitados", "Ilimitados", "Ilimitados"] },
      ] },
      { titulo: "Automatizaciones", linhas: [
        { recurso: "Comentario → DM", valores: [true, true, true] },
        { recurso: "Respuesta a historias", valores: [true, true, true] },
        { recurso: "Palabra clave en DM", valores: [true, true, true] },
        { recurso: "Rompehielos en DM", valores: [true, true, true] },
        { recurso: "Plantillas listas", valores: [true, true, true] },
        { recurso: "Crear automatizaciones conversando con Claude", valores: [true, true, true] },
      ] },
      { titulo: "Herramientas", linhas: [
        { recurso: "Sorteos por comentarios", valores: [true, true, true] },
        { recurso: "Enlaces rastreados y clics", valores: [true, true, true] },
        { recurso: "Moderación de comentarios por palabra", valores: [true, true, true] },
        { recurso: "App para iPhone y Android", valores: [true, true, true] },
      ] },
      { titulo: "Equipo y soporte", linhas: [
        { recurso: "Equipos y roles", valores: [false, true, true] },
        { recurso: "Soporte", valores: ["Chat", "Chat", "VIP prioritario"] },
        { recurso: "Garantía de 7 días", valores: [true, true, true] },
      ] },
    ],
    faqs: [
      { q: "¿El precio sube si crecen mis contactos?", a: "No. Pagas por el plan, no por el tamaño de tu lista: los contactos y las automatizaciones son ilimitados." },
      { q: "¿Qué cuenta como una cuenta?", a: "Cada cuenta de Instagram conectada. La cuenta de TikTok de la misma marca va incluida y no cuenta como otra." },
      { q: "¿Cuál es la diferencia entre Solo y Pro?", a: "La cantidad de cuentas y el trabajo en equipo. Solo es para una cuenta. Pro cubre hasta cinco y permite que más de una persona maneje las automatizaciones, con roles." },
      { q: "¿Cómo pago?", a: "Con tarjeta, a través de Stripe, en USD o EUR según tu país." },
      { q: "¿Hay plan gratis?", a: "Fuera de Brasil, no — pero todos los planes tienen garantía de 7 días: si no funciona, te devolvemos el 100%." },
      { q: "¿Puedo cancelar cuando quiera?", a: "Sí, sin permanencia. Gestionas o cancelas tu suscripción en el portal de clientes de Stripe, y el acceso sigue hasta el final del período ya pagado." },
    ],
  },
};
