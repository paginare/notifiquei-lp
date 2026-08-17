/**
 * Catálogo internacional — fonte única de preço e link, compartilhada por /en e /es.
 *
 * Os valores batem com o catálogo criado no Stripe em 14/08 e os links são os
 * Payment Links. Se mexer aqui, mexer lá — senão a página promete um valor e o
 * checkout cobra outro.
 *
 * DOIS conjuntos de link porque o Payment Link FIXA a moeda do Price: um link em
 * USD cobra dólar do europeu mesmo com EUR no currency_options (testado em 17/08).
 */
export const PLANOS_INTL = [
  { name: "Solo",     slug: "solo"     as const, usd: "19",  eur: "18",  featured: true  },
  { name: "Pro",      slug: "pro"      as const, usd: "79",  eur: "75",  featured: false },
  { name: "Business", slug: "business" as const, usd: "129", eur: "125", featured: false },
];

const LINKS: Record<string, Record<"USD" | "EUR", { m: string; a: string }>> = {
  solo: {
    USD: { m: "https://buy.stripe.com/8x25kD9Ew4za04AaAk8N200", a: "https://buy.stripe.com/3cI5kD6sk1mYaJe37S8N201" },
    EUR: { m: "https://buy.stripe.com/7sYdR98As0iUcRmdMw8N206", a: "https://buy.stripe.com/cNi8wP8AsaXy4kQ6k48N207" },
  },
  pro: {
    USD: { m: "https://buy.stripe.com/9B6bJ19Ew2r26sYbEo8N202", a: "https://buy.stripe.com/6oU7sL6sk0iUg3y6k48N203" },
    EUR: { m: "https://buy.stripe.com/00wbJ1dUM7LmbNieQA8N208", a: "https://buy.stripe.com/eVqeVd03Wd5G5oUaAk8N209" },
  },
  business: {
    USD: { m: "https://buy.stripe.com/4gMbJ1cQI7Lm6sY8sc8N204", a: "https://buy.stripe.com/6oU14naIA5DedVq7o88N205" },
    EUR: { m: "https://buy.stripe.com/5kQfZhg2U7Lm18EgYI8N20a", a: "https://buy.stripe.com/7sY3cvbME3v64kQbEo8N20b" },
  },
};

export const intlHref = (slug: string, moeda: "USD" | "EUR", ciclo: "m" | "a") => LINKS[slug][moeda][ciclo];

/** Mensalidade exibida no ciclo anual = anual (10x) / 12. Mesma conta em toda moeda. */
export const mensalNoAnual = (v: string) => String(Math.round((Number(v) * 10) / 12));
export const totalAnual = (v: string) => Number(v) * 10;
