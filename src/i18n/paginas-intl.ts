/**
 * Copy das páginas /en/creators, /es/creadores, /en/vs-manychat e /es/vs-manychat
 * no visual novo (30/09/2026). Espelha /criadores e /vs-manychat em português,
 * com as diferenças do mercado internacional: sem plano grátis, sem PIX, preço
 * em dólar/euro pelo Stripe. Mesmas regras de honestidade: nada de "sua voz" nem
 * "zero risco de bloqueio"; na tabela do ManyChat, só diferenças verificáveis.
 * `{hl}`/`{span}`/`\n` seguem o marcar() de i18n/home.
 */

type Uso = { icon: string; tag: string; palavra: string; resposta: string; texto: string };
type Passo = { icon: string; titulo: string; texto: string };
type Faq = { q: string; a: string };

export interface CopyCriadores {
  title: string; description: string;
  hero: { eyebrow: string; titulo: string[]; lead: string; cta: string; ctaSecundario: string; micro: string;
    foto: { alt: string; quem: string; comentario: string; dm: string; auto: string } };
  usos: { kicker: string; titulo: string; lead: string; itens: Uso[] };
  painelTitulo: string;
  passos: { titulo: string; lead: string; cta: string; itens: Passo[] };
  faq: { titulo: string; itens: Faq[] };
  final: { bolha: string; kicker: string; titulo: string; lead: string; cta: string };
}

export interface CopyVs {
  title: string; description: string;
  head: { kicker: string; titulo: string; lead: string; cta: string; ver: string };
  tabela: { kicker: string; titulo: string; lead: string; criterio: string; nota: string;
    linhas: { c: string; n: string; m: string; igual?: boolean }[] };
  motivos: { titulo: string; lead: string; itens: { icon: string; t: string; d: string }[] };
  painel: { titulo: string; lead: string };
  troca: { titulo: string; lead: string; cta: string; itens: Passo[] };
  faq: { titulo: string; itens: Faq[] };
  final: { bolha: string; kicker: string; titulo: string; lead: string; cta: string; micro: string };
}

const PASSO_ICONES = ["instagram", "chat", "bolt"];

export const criadores: Record<"en" | "es", CopyCriadores> = {
  en: {
    title: "Notifiquei for creators — your post goes viral, we reply",
    description: "For creators who can't keep up with comments: Notifiquei sends your link by DM to everyone who commented, in seconds, on Instagram and TikTok. Meta's official API.",
    hero: {
      eyebrow: "Instagram + TikTok · Comment and DM automation",
      titulo: ["Your post goes viral.", "We reply."],
      lead: "Everyone who comments <strong>“WANT”</strong> gets your link by DM in seconds — on Instagram and TikTok. You get back to creating and nobody is left without an answer.",
      cta: "Automate my profile",
      ctaSecundario: "See it working",
      micro: "7-day guarantee · Instagram + TikTok on one plan",
      foto: { alt: "Creator smiling on the couch while looking at her phone", quem: "julia commented on your post", comentario: "WANT the link! 😍", dm: "Sent everything to your DMs 💌", auto: "Automatic reply by Notifiquei" },
    },
    usos: {
      kicker: "BUILT FOR PEOPLE WHO CREATE",
      titulo: "One comment.\n{hl}Many ways to use it.{/hl}",
      lead: "You pick the keyword. Whoever comments gets the right message in their DMs.",
      itens: [
        { icon: "link", tag: "Link in the post", palavra: "WANT", resposta: "Hey! Here's the link to what I showed in the video 💕", texto: "Course, preset, product or sales page: whoever comments gets the link right away, no “link in bio”." },
        { icon: "bookmark", tag: "Free download", palavra: "GUIDE", resposta: "Done! Your free guide is right here 📚", texto: "E-book, class, spreadsheet or recipe. Delivery is automatic and your post gets more comments." },
        { icon: "heart", tag: "Brand deals and affiliates", palavra: "LINK", resposta: "Your discount link is here! 🛍️", texto: "Your affiliate link or your partner brand's coupon — straight to their DMs." },
        { icon: "spark", tag: "Giveaway", palavra: "IN", resposta: "You're in! Good luck 🍀", texto: "Everyone who comments the keyword is entered. At the end, you draw the winners in the dashboard — no spreadsheet, no screenshots." },
        { icon: "chat", tag: "Stories", palavra: "replied to your story", resposta: "Glad you liked it! Here's the link 👇", texto: "People who reply to your story get the message too. Great for polls, questions and launches." },
        { icon: "bolt", tag: "Viral post", palavra: "800 comments", resposta: "Everyone answered in seconds ✨", texto: "Your reel blew up? Every comment becomes a conversation, without you spending the night copying and pasting." },
      ],
    },
    painelTitulo: "Built for creators,\n{hl}inside too.{/hl}",
    passos: {
      titulo: "You're a creator.\n{hl}Not a developer.{/hl}",
      lead: "Three steps between your post and the first automatic reply.",
      cta: "Get started",
      itens: [
        { icon: "", titulo: "Connect your profile", texto: "Official Instagram login, through Meta. Your password stays with you." },
        { icon: "", titulo: "Pick the keyword", texto: "“WANT”, “LINK”, “GUIDE”… and write the message people will get." },
        { icon: "", titulo: "Post and get back to creating", texto: "Your audience comments, Notifiquei replies. You follow the clicks in the dashboard." },
      ],
    },
    faq: {
      titulo: "Questions from\n{hl}creators.{/hl}",
      itens: [
        { q: "Does it work with a small following?", a: "It works with a profile of any size. Whoever replies faster converts more — whether you have 500 or 500,000 followers. Smaller profiles often feel the result first." },
        { q: "Can this get my Instagram blocked?", a: "Notifiquei uses Meta's official API, and you connect through Instagram's own login — you never share your password with us. Automations should still respect the platform's rules and limits." },
        { q: "Do I need a professional account?", a: "Yes, a Professional or Creator account on Instagram — it's free to switch and takes a minute. It's a requirement of Meta's official API." },
        { q: "Do I need to know how to code?", a: "No. You pick the post, the keyword and the message. If you can send an Instagram message, you can use Notifiquei." },
        { q: "Can I send affiliate links or brand-deal coupons?", a: "Yes, it's one of the most common uses. Post, ask people to comment the keyword, and Notifiquei sends your link — from any store." },
        { q: "Does it work with TikTok?", a: "Yes. Every plan includes Instagram and TikTok DMs (a TikTok Business account is required), on the same plan." },
        { q: "Does the price go up as my profile grows?", a: "No. Contacts and automations are unlimited. The price only changes if you switch plans." },
        { q: "Can I cancel anytime?", a: "Yes, no lock-in. Every plan has a 7-day guarantee: if it doesn't work out, we refund 100%." },
      ],
    },
    final: { bolha: "want it! 💕", kicker: "WHILE YOU WERE READING THIS…", titulo: "Someone commented\n{span}“want” on your post.{/span}", lead: "Let Notifiquei reply. You get back to creating.", cta: "Automate my profile" },
  },

  es: {
    title: "Notifiquei para creadores — tu post se hace viral, nosotros respondemos",
    description: "Para creadores que no dan abasto con los comentarios: Notifiquei envía tu enlace por DM a cada persona que comentó, en segundos, en Instagram y TikTok. API oficial de Meta.",
    hero: {
      eyebrow: "Instagram + TikTok · Automatización de comentarios y DM",
      titulo: ["Tu post se hace viral.", "Nosotros respondemos."],
      lead: "Cada persona que comenta <strong>“QUIERO”</strong> recibe tu enlace por DM en segundos — en Instagram y TikTok. Tú vuelves a crear y nadie se queda sin respuesta.",
      cta: "Automatizar mi perfil",
      ctaSecundario: "Verlo en acción",
      micro: "Garantía de 7 días · Instagram + TikTok en un solo plan",
      foto: { alt: "Creadora sonriendo en el sofá mientras mira el celular", quem: "julia comentó en tu post", comentario: "¡QUIERO el link! 😍", dm: "Te mandé todo por DM 💌", auto: "Respuesta automática de Notifiquei" },
    },
    usos: {
      kicker: "HECHO PARA QUIEN CREA CONTENIDO",
      titulo: "Un comentario.\n{hl}Muchas formas de usarlo.{/hl}",
      lead: "Tú eliges la palabra. Quien comenta recibe el mensaje correcto por DM.",
      itens: [
        { icon: "link", tag: "Enlace del post", palavra: "QUIERO", resposta: "¡Hola! Aquí está el enlace de lo que mostré en el video 💕", texto: "Curso, preset, producto o página de ventas: quien comenta recibe el enlace al instante, sin “link en la bio”." },
        { icon: "bookmark", tag: "Material gratis", palavra: "GUÍA", resposta: "¡Listo! Aquí tienes tu guía gratis 📚", texto: "E-book, clase, planilla o receta. La entrega es automática y tu post gana comentarios." },
        { icon: "heart", tag: "Colaboraciones y afiliados", palavra: "LINK", resposta: "¡Te llegó el enlace con descuento! 🛍️", texto: "Tu enlace de afiliado o el cupón de la marca aliada — directo por DM." },
        { icon: "spark", tag: "Sorteo", palavra: "PARTICIPO", resposta: "¡Ya estás participando! Suerte 🍀", texto: "Quien comenta la palabra entra en la lista. Al final, sorteas en el panel — sin planillas ni capturas." },
        { icon: "chat", tag: "Historias", palavra: "respondió tu historia", resposta: "¡Qué bueno que te gustó! Aquí está el enlace 👇", texto: "Quien responde tu historia también recibe el mensaje. Ideal para encuestas, preguntas y lanzamientos." },
        { icon: "bolt", tag: "Post viral", palavra: "800 comentarios", resposta: "Todos respondidos en segundos ✨", texto: "¿Tu reel explotó? Cada comentario se vuelve una conversación, sin pasar la noche copiando y pegando." },
      ],
    },
    painelTitulo: "Hecho para creadores,\n{hl}también por dentro.{/hl}",
    passos: {
      titulo: "Eres creador.\n{hl}No programador.{/hl}",
      lead: "Tres pasos entre tu post y la primera respuesta automática.",
      cta: "Empezar ahora",
      itens: [
        { icon: "", titulo: "Conecta tu perfil", texto: "Login oficial de Instagram, a través de Meta. Tu contraseña se queda contigo." },
        { icon: "", titulo: "Elige la palabra", texto: "“QUIERO”, “LINK”, “GUÍA”… y escribe el mensaje que va a recibir la persona." },
        { icon: "", titulo: "Publica y vuelve a crear", texto: "Tu público comenta, Notifiquei responde. Sigues los clics en el panel." },
      ],
    },
    faq: {
      titulo: "Dudas de\n{hl}quien crea.{/hl}",
      itens: [
        { q: "¿Funciona con pocos seguidores?", a: "Funciona con perfiles de cualquier tamaño. Quien responde rápido convierte más — tengas 500 o 500 mil seguidores. Los perfiles pequeños suelen notar el resultado primero." },
        { q: "¿Esto puede bloquear mi Instagram?", a: "Notifiquei usa la API oficial de Meta y te conectas con el propio login de Instagram: nunca compartes tu contraseña con nosotros. Las automatizaciones igual deben respetar las reglas y los límites de la plataforma." },
        { q: "¿Necesito una cuenta profesional?", a: "Sí, una cuenta Profesional o de Creador en Instagram — cambiar es gratis y toma un minuto. Es un requisito de la API oficial de Meta." },
        { q: "¿Necesito saber programar?", a: "No. Eliges el post, la palabra y el mensaje. Si sabes enviar un mensaje en Instagram, sabes usar Notifiquei." },
        { q: "¿Puedo enviar enlaces de afiliado o cupones de marcas?", a: "Sí, es uno de los usos más comunes. Publicas, pides que comenten la palabra y Notifiquei envía tu enlace — de cualquier tienda." },
        { q: "¿Funciona con TikTok?", a: "Sí. Todos los planes incluyen Instagram y DMs de TikTok (se necesita una cuenta Business de TikTok), en el mismo plan." },
        { q: "¿El precio sube si mi perfil crece?", a: "No. Los contactos y las automatizaciones son ilimitados. El precio solo cambia si cambias de plan." },
        { q: "¿Puedo cancelar cuando quiera?", a: "Sí, sin permanencia. Todos los planes tienen garantía de 7 días: si no funciona, te devolvemos el 100%." },
      ],
    },
    final: { bolha: "¡quiero! 💕", kicker: "MIENTRAS LEÍAS ESTO…", titulo: "Alguien comentó\n{span}“quiero” en tu post.{/span}", lead: "Deja que Notifiquei responda. Tú vuelve a crear.", cta: "Automatizar mi perfil" },
  },
};

export const vs: Record<"en" | "es", CopyVs> = {
  en: {
    title: "Notifiquei vs ManyChat — fixed price, unlimited contacts",
    description: "Compare Notifiquei and ManyChat: the same comment, story and DM automation on Instagram, with a fixed price, unlimited contacts and TikTok on the same plan.",
    head: { kicker: "NOTIFIQUEI × MANYCHAT", titulo: "The same automation.\n{hl}A price that doesn't grow.{/hl}", lead: "Comments, stories and DMs on autopilot, on Meta's official API — with a fixed price, unlimited contacts and TikTok on the same plan.", cta: "See pricing", ver: "See the comparison" },
    tabela: {
      kicker: "HONEST COMPARISON", titulo: "Side by side,\n{hl}no spin.{/hl}",
      lead: "ManyChat is a good tool and also uses the official API. We only mark where the difference is real.",
      criterio: "Criterion",
      nota: "ManyChat information based on their public website in September 2026. Prices and features may change.",
      linhas: [
        { c: "Price as your list grows", n: "Fixed — unlimited contacts", m: "Goes up with your contact count" },
        { c: "Instagram + TikTok", n: "On the same plan, at no extra cost", m: "Channels billed separately" },
        { c: "Comment giveaways", n: "Built in, one click", m: "Not built in" },
        { c: "Meta official API", n: "Yes", m: "Yes", igual: true },
        { c: "Asks for your Instagram password?", n: "Never", m: "Never", igual: true },
        { c: "Comment, story and DM keyword triggers", n: "Yes", m: "Yes", igual: true },
      ],
    },
    motivos: {
      titulo: "Why switch\n{hl}to Notifiquei.{/hl}", lead: "Same automation, a bill that doesn't chase your audience.",
      itens: [
        { icon: "infinito", t: "Doesn't grow with your list", d: "Unlimited contacts and automations. Your profile grows, your price stays the same." },
        { icon: "tiktok", t: "TikTok included", d: "The same seat covers Instagram and TikTok DMs, no separate plan." },
        { icon: "spark", t: "Automation by conversation", d: "Describe it to Claude in plain language and it builds the automation for you to review and turn on." },
        { icon: "heart", t: "Giveaways built in", d: "Everyone who commented the keyword is entered. Draw the winners in one click." },
      ],
    },
    painel: { titulo: "The same automation,\n{hl}a simpler dashboard.{/hl}", lead: "These are the real screens — folders, previews and click reports." },
    troca: {
      titulo: "Switching takes\n{hl}one afternoon.{/hl}", lead: "Without missing a single comment along the way.", cta: "Get started",
      itens: [
        { icon: "", titulo: "Connect Instagram", texto: "Official Meta login. You can connect to Notifiquei before turning ManyChat off." },
        { icon: "", titulo: "Recreate your automations", texto: "Start from a ready-made template or ask Claude to build it. The main ones are ready in minutes." },
        { icon: "", titulo: "Turn off there, on here", texto: "Pause the automation in ManyChat and turn on Notifiquei's on the same post. Nobody goes unanswered." },
      ],
    },
    faq: {
      titulo: "Questions from\n{hl}ManyChat users.{/hl}",
      itens: [
        { q: "Is Notifiquei cheaper than ManyChat?", a: "Notifiquei has a fixed monthly price with unlimited contacts. ManyChat's price goes up with your contact count — for big lists, the difference tends to be larger." },
        { q: "Can switching get my Instagram blocked?", a: "Both use Meta's official API and neither asks for your password. Switching tools doesn't affect the account; automations should always respect the platform's rules and limits." },
        { q: "Can I bring my ManyChat automations?", a: "There's no automatic import between the two tools. In practice, recreating the main automations takes minutes with the ready-made templates or with Claude — and our support helps on WhatsApp." },
        { q: "Can I try it before canceling ManyChat?", a: "Yes. Subscribe with the 7-day guarantee, get everything ready, and only then turn ManyChat off." },
      ],
    },
    final: { bolha: "let's switch? 💕", kicker: "READY TO SWITCH?", titulo: "Same automation.\n{span}Fixed price.{/span}", lead: "Get everything ready here before turning ManyChat off.", cta: "See pricing", micro: "7-day guarantee · cancel anytime" },
  },

  es: {
    title: "Notifiquei vs ManyChat — precio fijo, contactos ilimitados",
    description: "Compara Notifiquei y ManyChat: la misma automatización de comentarios, historias y DMs en Instagram, con precio fijo, contactos ilimitados y TikTok en el mismo plan.",
    head: { kicker: "NOTIFIQUEI × MANYCHAT", titulo: "La misma automatización.\n{hl}Un precio que no sube.{/hl}", lead: "Comentarios, historias y DMs en automático, por la API oficial de Meta — con precio fijo, contactos ilimitados y TikTok en el mismo plan.", cta: "Ver precios", ver: "Ver la comparación" },
    tabela: {
      kicker: "COMPARACIÓN HONESTA", titulo: "Lado a lado,\n{hl}sin exagerar.{/hl}",
      lead: "ManyChat es una buena herramienta y también usa la API oficial. Solo marcamos donde la diferencia es real.",
      criterio: "Criterio",
      nota: "Información de ManyChat según su sitio público en septiembre de 2026. Precios y funciones pueden cambiar.",
      linhas: [
        { c: "Precio cuando tu lista crece", n: "Fijo — contactos ilimitados", m: "Sube según la cantidad de contactos" },
        { c: "Instagram + TikTok", n: "En el mismo plan, sin pagar más", m: "Canales cobrados aparte" },
        { c: "Sorteos por comentarios", n: "Nativo, en 1 clic", m: "No es nativo" },
        { c: "API oficial de Meta", n: "Sí", m: "Sí", igual: true },
        { c: "¿Pide la contraseña de Instagram?", n: "Nunca", m: "Nunca", igual: true },
        { c: "Disparadores por comentario, historia y palabra en DM", n: "Sí", m: "Sí", igual: true },
      ],
    },
    motivos: {
      titulo: "Por qué cambiarse\n{hl}a Notifiquei.{/hl}", lead: "La misma automatización, con una factura que no persigue a tu audiencia.",
      itens: [
        { icon: "infinito", t: "No crece con tu lista", d: "Contactos y automatizaciones ilimitados. Tu perfil crece y el precio sigue igual." },
        { icon: "tiktok", t: "TikTok incluido", d: "La misma cuenta atiende Instagram y DMs de TikTok, sin plan aparte." },
        { icon: "spark", t: "Automatización conversando", d: "Descríbela a Claude en tu idioma y él arma la automatización para que la revises y la actives." },
        { icon: "heart", t: "Sorteos incluidos", d: "Quien comentó la palabra ya participa. Sorteas los ganadores en un clic." },
      ],
    },
    painel: { titulo: "La misma automatización,\n{hl}un panel más simple.{/hl}", lead: "Estas son las pantallas reales — carpetas, vista previa e informes de clics." },
    troca: {
      titulo: "Cambiarse toma\n{hl}una tarde.{/hl}", lead: "Sin perder ningún comentario en el camino.", cta: "Empezar ahora",
      itens: [
        { icon: "", titulo: "Conecta Instagram", texto: "Login oficial de Meta. Puedes conectar Notifiquei antes de apagar ManyChat." },
        { icon: "", titulo: "Recrea tus automatizaciones", texto: "Empieza con una plantilla lista o pídele a Claude que la arme. Las principales quedan listas en minutos." },
        { icon: "", titulo: "Apaga allá, enciende aquí", texto: "Pausa la automatización en ManyChat y activa la de Notifiquei en el mismo post. Nadie se queda sin respuesta." },
      ],
    },
    faq: {
      titulo: "Dudas de quien\n{hl}viene de ManyChat.{/hl}",
      itens: [
        { q: "¿Notifiquei es más barato que ManyChat?", a: "Notifiquei tiene un precio mensual fijo con contactos ilimitados. El precio de ManyChat sube según la cantidad de contactos — con listas grandes, la diferencia suele ser mayor." },
        { q: "¿Cambiarme puede bloquear mi Instagram?", a: "Las dos usan la API oficial de Meta y ninguna pide tu contraseña. Cambiar de herramienta no afecta la cuenta; las automatizaciones siempre deben respetar las reglas y los límites de la plataforma." },
        { q: "¿Puedo traer mis automatizaciones de ManyChat?", a: "No hay importación automática entre las dos herramientas. En la práctica, recrear las principales toma minutos con las plantillas listas o con Claude — y nuestro soporte ayuda por WhatsApp." },
        { q: "¿Puedo probar antes de cancelar ManyChat?", a: "Sí. Suscríbete con la garantía de 7 días, deja todo listo y recién ahí apaga ManyChat." },
      ],
    },
    final: { bolha: "¿nos cambiamos? 💕", kicker: "¿LISTO PARA CAMBIARTE?", titulo: "La misma automatización.\n{span}Precio fijo.{/span}", lead: "Deja todo listo aquí antes de apagar ManyChat.", cta: "Ver precios", micro: "Garantía de 7 días · cancela cuando quieras" },
  },
};

// Os ícones dos passos são estrutura, não tradução.
for (const c of [...Object.values(criadores).map((x) => x.passos.itens), ...Object.values(vs).map((x) => x.troca.itens)]) {
  c.forEach((p, i) => { p.icon = PASSO_ICONES[i]; });
}
