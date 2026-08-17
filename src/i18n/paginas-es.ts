/**
 * /es/creadores e /es/vs-manychat.
 *
 * ⚠️ A comparação com o ManyChat NÃO é tradução da página brasileira. Seis dos
 * 16 argumentos de lá só valem no Brasil (real sem câmbio, PIX, plataforma em
 * português, LGPD, "feito pra criador BR") e, traduzidos, argumentariam CONTRA
 * o produto: o americano paga em dólar, não tem PIX e quer GDPR.
 * Aqui a comparação é a que se sustenta fora: preço fixo vs por contato,
 * Instagram+TikTok no mesmo plano, sorteios, apps nativos e a API com o Claude.
 */
export const creatorsEs = {
  title: "Notifiquei para creadores — tu post se vuelve viral, nosotros respondemos",
  description:
    "Para el creador que no da abasto con los DMs: Notifiquei responde cada “lo quiero” de tu post en segundos, con tu voz, por la API oficial de Meta.",
  eyebrow: "Creadores de 10k a 1M seguidores",
  h1a: "Tu post se vuelve viral.",
  h1b: "Nosotros",
  h1hl: "respondemos",
  lead: "Publicaste el reel que explotó. Ahora hay 800 comentarios de “lo quiero” esperando. Notifiquei manda el enlace a cada uno en segundos — tú solo despiertas y ves el resultado.",
  cta: "Automatizar mi Instagram",
  cta2: "Ver cómo funciona",
  trust: ["API oficial de Meta", "No parece un robot", "Responde en 3 segundos"],
  demo: {
    pill: "Automatización activa", metric: "847 respuestas hoy",
    who: "@mariana.fit comentó en tu reel",
    comment: "“¿cuánto cuesta el curso? 😍”",
    flow: "respuesta automática por DM",
    answer: "¡Hola! 😊 Está <strong>$97</strong> al contado. ¿Te mando el enlace?",
    done: "Mariana abrió el enlace ·", secs: "3s",
  },
  how: { eyebrow: "Cómo funciona", t1: "Eres creador,", t2: "no programador.",
    lead: "Por eso lo hicimos simple: sin configuración infinita, sin tutorial de dos horas, sin llamar al sobrino que sabe de computadoras.",
    steps: [
      { n: "01", t: "Conecta en 3 clics", d: "Login oficial de Meta. Nunca pedimos tu contraseña (ni podríamos). Sin riesgo de bloqueo, cuenta segura." },
      { n: "02", t: "Elige la palabra", d: "“Quiero”, “precio”, “enlace”… tú decides. Quien la comente o la mande por DM recibe la respuesta al instante." },
      { n: "03", t: "Vuelve a crear", d: "Los DMs se responden solos, los leads llegan calificados, y tú entras solo cuando el cliente ya quiere comprar." },
    ] },
  contrast: { eyebrow: "Mira la diferencia", t1: "Quien responde primero", t2: "se queda con el cliente.",
    lose: { tag: "Sin Notifiquei", m1: "¡Hola! ¿Cuánto cuesta el curso? 😍", gap: "⋯ 6 horas después", m2: "Déjalo, ya lo compré con otra persona.", foot: "Cliente perdido en 6 horas." },
    win: { tag: "Con Notifiquei", m1: "¡Hola! ¿Cuánto cuesta el curso? 😍", m2: "¡Hola! 😊 $97 al contado. ¿Te mando el enlace?", meta: "14:32 · automático", m3: "¡Mándalo! Quiero comprar ahora 🔥", foot: "Respondido en 1 minuto." } },
  perks: [
    { t: "Aguanta un viral", d: "¿800 comentarios de “lo quiero” en un reel que explotó? Cada uno se vuelve una conversación por DM, en segundos — sin que te trabes." },
    { t: "Sortea sin rebuscar comentarios", d: "Quien comenta la palabra entra automáticamente. Haces clic en sortear y te muestra los ganadores — sin hojas de cálculo, sin capturas." },
    { t: "Tú duermes, él vende", d: "Respuestas automáticas 24h, incluso de madrugada. Quien responde primero se queda con el cliente." },
    { t: "Sin riesgo para tu perfil", d: "API oficial de Meta, partner certificado. Tu alcance y tus anuncios siguen normales." },
    { t: "Solo te llama cuando importa", d: "Filtra y califica. Cuando un lead se calienta, te avisa para cerrar — sin rebuscar en los DMs." },
    { t: "Configura sin programador", d: "Eres creador, no programador. Eliges el disparador, respondes tres preguntas, lo activas." },
  ],
  finalcta: { eyebrow: "Tu próximo post", title: "Que no se pierda otro", titleHl: "“lo quiero”", lead: "Cada comentario sin respuesta es una venta que se va. Actívalo antes del próximo post.", cta: "Empezar", talk: "Habla con nosotros" },
};

export const vsEs = {
  title: "Notifiquei vs ManyChat — precio fijo, contactos ilimitados",
  description:
    "Compara Notifiquei y ManyChat: precio fijo mensual con contactos ilimitados, Instagram + TikTok en un plan, apps nativas y una API que manejas desde Claude.",
  eyebrow: "Notifiquei × ManyChat",
  headline: "Todo lo que hace ManyChat — a un precio que no crece con tu audiencia.",
  subhead: "Automatización de DM, comentarios e historias de Instagram con la API oficial de Meta. Precio fijo mensual, contactos ilimitados y los dos canales en el mismo plan.",
  honestidade:
    "ManyChat es una buena herramienta y también usa la API oficial de Meta — no hay “riesgo de bloqueo” por usarlo, y ninguno de los dos pide tu contraseña. Nuestras diferencias reales son el modelo de precio, tener Instagram y TikTok en un plan, apps móviles nativas y una API que manejas desde un asistente de IA. La tabla marca solo donde de verdad nos diferenciamos.",
  tabelaTitulo: "Lado a lado,",
  tabelaTitulo2: "sin humo publicitario.",
  th: { criterio: "Criterio", nq: "★ Notifiquei", mc: "ManyChat" },
  rows: [
    { c: "Modelo de precio", n: "Precio fijo mensual", m: "Por contacto — crece con tu audiencia", hl: true },
    { c: "Contactos", n: "Ilimitados en todos los planes", m: "Por tramos de contactos", hl: true },
    { c: "Instagram + TikTok", n: "Los dos en el mismo plan", m: "Solo Instagram", hl: true },
    { c: "API oficial de Meta", n: "Sí", m: "Sí", hl: false },
    { c: "Automatización por DM", n: "Sí", m: "Sí", hl: false },
    { c: "Disparador por comentario", n: "Sí", m: "Sí", hl: false },
    { c: "Disparador por historia", n: "Sí", m: "Sí", hl: false },
    { c: "Crear flujo en lenguaje natural", n: "Sí — descríbelo y la IA lo monta", m: "No — editor visual manual", hl: true },
    { c: "Manejarlo desde un asistente de IA", n: "Sí — clave de API + kit listo para Claude", m: "No", hl: true },
    { c: "Sorteos nativos", n: "Sí — sortea en 1 clic", m: "No", hl: true },
    { c: "App móvil", n: "Sí — iOS y Android", m: "App limitada", hl: true },
    { c: "¿Pide tu contraseña de Instagram?", n: "Nunca — token oficial", m: "Nunca — token oficial", hl: false },
  ],
  reasonsTitulo: "Por qué los creadores cambian",
  reasons: [
    { t: "Tu factura deja de perseguir tu audiencia", d: "ManyChat cobra por contacto: cuanto mejor te va, más pagas. Aquí el precio es fijo — 500 seguidores o 500.000, la misma factura." },
    { t: "Dos canales, un plan", d: "Cada cuenta conecta 1 Instagram + 1 TikTok. Automatizas los dos sin pagar el doble." },
    { t: "Una API con la que solo conversas", d: "Copias el kit listo en un Proyecto de Claude y creas automatizaciones charlando. Ninguna otra herramienta de esta categoría hace eso." },
    { t: "Sorteos incluidos", d: "Los sorteos por comentarios son nativos: recoge participantes y sortea en un clic, sin herramienta externa." },
  ],
  finalcta: { eyebrow: "La misma automatización, otra factura", title: "Deja de pagar más", titleHl: "por crecer", lead: "Precio fijo, contactos ilimitados, garantía de 7 días. Si no te sirve, devolvemos el 100%.", cta: "Empezar", talk: "Habla con nosotros" },
};
