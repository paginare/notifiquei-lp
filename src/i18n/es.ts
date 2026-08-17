/**
 * Home em espanhol. Mesmo desenho da /en: mercado internacional por definição,
 * sem real e sem plano grátis, botões nos Payment Links do Stripe.
 *
 * Espanha cai em EUR e a América Latina em USD — quem decide é o `data-currency`
 * que a Pages Function estampa, não este arquivo.
 */
export const es = {
  lang: "es" as const,
  title: "Notifiquei — Automatización de Instagram con la API oficial de Meta",
  description:
    "Notifiquei responde tus DMs, comentarios y respuestas a historias de Instagram en segundos, con tu propia voz y por la API oficial de Meta. Tú creas. Él convierte.",

  nav: {
    links: [
      { href: "/es#como", label: "Cómo funciona" },
      { href: "/es#plataforma", label: "Plataforma" },
      { href: "/es#claude", label: "API + Claude" },
      { href: "/es#planes", label: "Precios" },
    ],
    entrar: "Entrar",
    comecar: "Empezar",
  },

  hero: {
    badge: "Garantía de 7 días · cancela cuando quieras",
    eyebrow: "Instagram + TikTok · API oficial",
    title: "Responde cada comentario y DM de Instagram",
    titleHl: "en automático",
    lead:
      "Para creadores y tiendas que venden en Instagram y TikTok. Responde comentarios, DMs e historias con <em>tu</em> voz, por la API oficial de Meta, y solo te avisa cuando el cliente ya quiere comprar.",
    cta: "Empezar",
    proof: "<strong>+2.000 creadores</strong> ya venden en automático · con la API oficial de Meta",
  },

  proof: [
    { num: "3s", lbl: "tiempo medio de respuesta" },
    { num: "24h", lbl: "vendiendo, incluso mientras duermes" },
    { num: "98%", lbl: "de los comentarios respondidos" },
  ],

  affiliate: {
    eyebrow: "Para afiliados",
    title: "Quien comenta en tu publicación recibe tu enlace de afiliado por DM,",
    titleHl: "al instante",
    lead:
      "Publica el producto, pide que comenten una palabra clave y Notifiquei envía <strong>tu enlace de afiliado</strong> al DM de cada persona — sin copiar y pegar enlaces todo el día.",
    cta: "Empezar",
    marks: "Funciona con enlaces de afiliado de",
  },

  creators: {
    eyebrow: "Quién lo usa",
    title: "Hecho para creadores<br />como tú.",
    lead:
      "De fitness a gastronomía, de infoproductos a tiendas de barrio — Notifiquei ya responde por más de <strong>2.000 creadores</strong> mientras ellos crean (o duermen).",
    nichos: {
      Nutrição: "Nutrición", Fitness: "Fitness", Pet: "Mascotas", Beleza: "Belleza",
      Confeitaria: "Repostería", Estética: "Estética", Infoproduto: "Infoproductos",
      Gastronomia: "Gastronomía", Decoração: "Decoración", Moda: "Moda",
      Fotografia: "Fotografía", Artesanato: "Artesanía",
    } as Record<string, string>,
  },

  how: {
    eyebrow: "Cómo funciona",
    title: "Lo pones a funcionar en",
    titleHl: "cinco minutos",
    lead:
      "Sin programador, sin equipo técnico, sin tutorial de dos horas. Si hubiéramos sabido que era tan simple, habríamos cobrado más.",
    steps: [
      { n: "01", title: "Conecta tu Instagram", body: "Inicio de sesión oficial de Meta, en pocos clics. Sin contraseñas expuestas, sin riesgo, sin complicaciones." },
      { n: "02", title: "Elige los disparadores", body: "Una palabra en un comentario, un DM recibido, una respuesta a historia — tú decides qué activa cada automatización." },
      { n: "03", title: "Relájate y vende", body: "Responde, califica, envía el enlace y solo te llama cuando el cliente ya está listo para comprar." },
    ],
  },

  inaction: {
    eyebrow: "Míralo en acción",
    title: "Un comentario se convierte en venta en segundos.",
    lead:
      "La misma pregunta con dos finales posibles. En Instagram, quien responde primero se queda con el cliente — y Notifiquei se asegura de que seas tú.",
    lose: { tag: "Sin Notifiquei", text: "🥲 Venta perdida en 6 horas" },
    win: { tag: "Con Notifiquei", text: "🎉 Venta cerrada en 1 minuto" },
  },

  day: {
    eyebrow: "Un día cualquiera",
    title: "Responde y vende todo el día,<br /><span class='hl'>incluso cuando estás desconectado</span>.",
    beats: [
      { k: "08h", t: "Publicas el reel y te vas a vivir tu vida." },
      { k: "14h", t: "Llovieron los “lo quiero” en los comentarios. Ya respondió a cada uno — en Instagram y TikTok." },
      { k: "22h", t: "Abres la app en la cama: la venta ocurrió sin ti." },
    ],
    alt: "Creadora viendo llegar las ventas desde el móvil, de noche",
    badge: "12 ventas hoy · en automático",
  },

  platform: {
    eyebrow: "Dentro de la plataforma",
    title: "Un panel simple para crear, seguir<br class='br-r' /> y <span class='hl'>ajustar tus automatizaciones</span>.",
    lead: "Nada de paneles confusos con mil pestañas. Todo lo que necesitas, donde esperas encontrarlo.",
    precoNota: "<strong><span data-cur=\"USD\">Desde $19/mes</span><span data-cur=\"EUR\">Desde €18/mes</span></strong> · contactos ilimitados · garantía de 7 días · <a href=\"#planes\">ver planes</a>",
    cards: [
      { tag: "Creación guiada", title: "Elige el disparador, él hace el resto.", body: "Eliges el disparador: comentario, historia o palabra en el DM. Dices qué recibe la persona y lo revisas en un móvil, igual a como se ve en Instagram. ¿Prefieres el editor visual? Está a un clic." },
      { tag: "Números en tiempo real", title: "Mira cada clic al momento.", body: "Cuántos DMs respondidos, cuántos leads recibieron el enlace, cuántos hicieron clic. Datos simples que responden “¿está funcionando?”." },
      { tag: "Sorteos por comentarios", title: "Sortea sin rebuscar comentarios.", body: "Quien comenta la palabra entra solo en la lista. Haces clic en sortear y te muestra los ganadores — sin hojas de cálculo, sin capturas, sin contar a mano." },
      { tag: "Enlaces y clics", title: "Cambia el enlace sin tocar tus automatizaciones.", body: "Cada enlace tiene un alias. ¿Cambió el destino? Lo cambias en un solo sitio y todas las automatizaciones envían el nuevo — y ves cuántos hicieron clic en cada una." },
    ],
    mock: {
      relatorios: "notifiquei · informes", sorteios: "notifiquei · sorteos", links: "notifiquei · enlaces",
      dmsRespondidos: "DMs respondidos", linksClicados: "Clics en enlaces", taxaResposta: "Tasa de respuesta",
      vsSemana: "vs. semana pasada", tempoMedio: "tiempo medio · 3s",
      comentou: "Comentó", participantes: "participantes", ganhou: "ganó", sortear: "Sortear",
      usadoEm: "Usado en", automacoes: "7 automatizaciones",
      trocaAqui: "— lo cambias aquí y todas envían el nuevo.", trocar: "cambiar",
      cliquesSemana: "847 clics esta semana",
      exemploUrl: "tienda.com/black-friday",
      palavra: "LOQUIERO", qtdParticipantes: "1.842",
      g1: "mariana.fit", g2: "juan.suplementos", g3: "bia.estetica",
      comentarioDm: "Comentario → DM", respostaStory: "Respuesta a historia", quebraGelo: "Rompehielos",
    } as Record<string, string>,
  },

  capabilities: {
    eyebrow: "Lo que consigues",
    title: "Todo lo que Notifiquei <br class='br-r' /><span class='hl'>hace por ti</span>.",
    lead: "Nada de funciones que nunca vas a usar. Dejamos solo lo que te ayuda a vender — y cortamos el resto.",
    caps: [
      { t: "Comentario → DM → venta", d: "Alguien comenta “lo quiero”. Lo lleva al privado, manda el enlace, califica y te avisa justo cuando toca cerrar." },
      { t: "Escaparate de productos en el DM", d: "Pegas los enlaces de tus productos y él saca la foto y el nombre de cada uno solo. Un escaparate de verdad en el DM — no un enlace suelto." },
      { t: "Rompehielos en el DM", d: "Preguntas listas arriba de tu bandeja. El seguidor toca una y ya entra en la automatización." },
      { t: "Un embudo que califica solo", d: "Preguntas, botones y respuestas rápidas dentro del flujo. Hablas solo con quien ya quiere comprar." },
      { t: "Moderación automática", d: "Tú defines las palabras y él oculta o borra spam y ofensas antes de que ningún seguidor las vea." },
      { t: "Sorteos por comentarios", d: "Quien comenta la palabra entra automáticamente. Haces clic en sortear y él elige a los ganadores — sin rebuscar comentarios." },
      { t: "Equipos y agencias", d: "Varias cuentas, equipo organizado, accesos separados. Ideal para quien gestiona varias marcas." },
      { t: "DM automático en TikTok", d: "Bienvenida, palabras clave y respuesta por defecto en TikTok Business — nadie se queda sin respuesta." },
      { t: "Contrólalo desde el móvil", d: "App nativa en iPhone y Android: crea, pausa y sigue tus automatizaciones desde donde estés." },
    ],
  },

  zoom: {
    cap1a: "Por dentro", cap1b: "Todo en un solo panel.",
    cap2a: "En tiempo real", cap2b: "Y ves llegar cada lead caliente.",
    url: "notifiquei · panel",
    ola: "Hola, Mariana 👋", resumo: "aquí está el resumen de hoy", periodo: "Últimos 30 días",
    seguidores: "Seguidores activos", interacoes: "Interacciones automáticas", taxa: "Tasa de respuesta",
    desdeMes: "desde el mes pasado",
    cliques: "Clics en el enlace", semana: "esta semana",
  } as Record<string, string>,

  claude: {
    eyebrow: "Nuevo · para quien usa IA",
    title: "¿Ni siquiera quieres montar el flujo?",
    titleHl: "Pídeselo a Claude",
    lead:
      "Todos los planes incluyen una clave de API. Copias el kit listo desde el panel, lo pegas en un Proyecto de <strong>Claude</strong> y a partir de ahí solo conversas: él elige la publicación, monta la automatización y la activa por ti.",
    bullets: [
      "Un botón copia el kit con tu clave dentro",
      "Siempre muestra el resumen y pide tu OK antes de crear",
      "Puedes listar, activar y desactivar automatizaciones conversando",
      "Incluido en todos los planes, sin coste extra",
    ],
    note: "¿Tienes sistema propio? La misma clave se conecta directo a tu aplicación.",
    chat: {
      me1: "crea una automatización en mi último reel: quien comente QUIERO recibe el enlace de la promo por DM",
      ai1: "Encontré el Reel de ayer — “kit verano con 30% de descuento”. Antes de crearla, confirma:",
      rec: [
        ["Cuenta", "@tu.tienda"],
        ["Se activa con", "QUIERO"],
        ["En el comentario", "“te escribí por DM 💛”"],
        ["En el DM", "enlace + botón “lo quiero”"],
      ],
      ask: "¿La creo?",
      me2: "dale",
      done: "Creada y activa. Ya está funcionando con los próximos comentarios.",
    },
  },

  midcta: {
    eyebrow: "Listo cuando tú lo estés",
    title: "Quien responde primero se lleva la venta,<br class='br-r' /> y esa persona puede",
    titleHl: "ser tú",
    cta: "Empezar",
    sub: "Garantía de 7 días · devolución 100%",
  },

  risk: {
    eyebrow: "Por qué importa la API oficial",
    title: "Todo con la API oficial de Meta,<br class='br-r' /> <span class='hl'>sin riesgo de sanciones ni bloqueos</span>.",
    lead:
      "Menos alcance, anuncios hasta 3× más caros, cuenta bloqueada — ese es el precio de la automatización que Meta prohíbe. Notifiquei es 100% API oficial: vendes sin arriesgar tu perfil.",
    bad: {
      title: "⚠ Herramientas no oficiales",
      items: [
        "Sanciones silenciosas — menos alcance, menos visualizaciones",
        "Anuncios hasta 3× más caros tras una sanción",
        "Riesgo real de bloqueo temporal o permanente",
        "Acceso revocado sin previo aviso",
      ],
    },
    good: {
      title: "✓ Con Notifiquei (API oficial)",
      items: [
        "Integración 100% aprobada por Meta — dentro de las reglas",
        "Sin riesgo de sanciones, bloqueos ni pérdida de alcance",
        "Tus métricas y tus anuncios siguen normales",
        "Se actualiza solo cuando Meta cambia las reglas",
      ],
    },
    seal:
      "Notifiquei es partner certificado de Meta. Cada automatización aquí está dentro de las reglas — y tu perfil queda protegido mientras vendes.",
  },

  plans: {
    eyebrow: "Planes",
    title: "Precio fijo y",
    titleHl: "contactos ilimitados",
    lead:
      "ManyChat cobra por contacto — tu factura crece con tu audiencia. Aquí el precio es fijo, con contactos ilimitados: creces sin que crezca la factura.",
    note: "<strong>2 en 1:</strong> cada cuenta conecta <strong>Instagram + TikTok</strong> en el mismo plan — automatiza los dos sin pagar el doble.",
    monthly: "Mensual",
    yearly: "Anual",
    save: "2 meses gratis",
    per: "/mes",
    billed: "se cobra {v}/año",
    guarantee: "Garantía de 7 días · devolución 100%",
    blurbs: {
      solo: "Creador que empieza, operación pequeña.",
      pro: "Para quien ya escaló un poco.",
      business: "Agencias y operaciones grandes.",
    },
    cta: "Empezar con",
    features: {
      solo: ["1 cuenta — Instagram + TikTok", "Automatizaciones ilimitadas", "Plantillas completas", "Soporte por chat", "Novedades antes que nadie"],
      pro: ["5 cuentas — Instagram + TikTok", "Equipos y división por roles", "Automatizaciones ilimitadas", "Plantillas completas", "Soporte por chat", "Novedades antes que nadie"],
      business: ["10 cuentas — Instagram + TikTok", "Equipos y división por roles", "Automatizaciones ilimitadas", "Plantillas completas", "Soporte VIP prioritario"],
    },
  },

  faqEyebrow: "Dudas frecuentes",
  faqTitle: "Resuelve tus dudas",
  faqTitleHl: "antes de empezar",
  faqs: [
    { q: "¿Esto puede bloquear mi Instagram?", a: "No. Somos proveedores oficiales de Meta y usamos exclusivamente la API oficial de Instagram. Nada de automatización encubierta, nada de romper reglas, cero riesgo de bloqueo." },
    { q: "¿Necesito saber programar?", a: "Para nada. Cero código. Si sabes enviar un mensaje por Instagram, sabes usar Notifiquei. La interfaz es totalmente visual." },
    { q: "¿Puedo crear automatizaciones conversando con Claude?", a: "Sí. Todos los planes incluyen una clave de API, y el panel te entrega un kit listo con tu clave dentro. Lo pegas en un Proyecto de Claude y pides en español: él encuentra la publicación, monta la automatización, te muestra un resumen para confirmar y la activa. También puedes listar, activar y desactivar automatizaciones conversando." },
    { q: "¿Funciona para e-commerce?", a: "Sí. Tenemos clientes vendiendo moda, cosmética, suplementos y productos físicos en general. El flujo ideal cambia un poco y hay una plantilla lista para eso." },
    { q: "¿Cuál es la diferencia con ManyChat?", a: "Precio fijo con contactos ilimitados, una interfaz más simple, e Instagram + TikTok en el mismo plan. Si ya usas ManyChat y estás contento, no necesitas cambiar. Si te resulta complicado o caro, Notifiquei se hizo para ti." },
    { q: "¿Funciona con pocos seguidores?", a: "Funciona con una cuenta de cualquier tamaño. Quien responde rápido vende más — da igual si tienes 500 o 500.000 seguidores. Las cuentas pequeñas suelen notar el resultado primero." },
    { q: "¿Necesito cuenta profesional o de empresa?", a: "Sí, una cuenta Profesional o de Creador en Instagram — activarla es gratis y lleva un minuto. Es un requisito de la propia API oficial de Meta." },
    { q: "¿Funciona con TikTok?", a: "Sí. Notifiquei automatiza los DMs de TikTok (cuenta Business) — y cada plan conecta 1 Instagram + 1 TikTok al mismo precio. Automatizas los dos canales sin pagar el doble." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí, sin permanencia — cancelas en cualquier momento desde el panel. Y todos los planes de pago tienen garantía de 7 días: si no te sirve, devolvemos el 100%." },
  ],

  finalcta: {
    eyebrow: "Mientras leías esto…",
    title: "Alguien comentó",
    titleHl: "“lo quiero”",
    titleEnd: "en tu publicación.",
    lead:
      "Quien responde primero se queda con el cliente. Notifiquei se asegura de que siempre seas tú. Garantía de 7 días — si no te sirve, devolvemos el 100%.",
    cta: "Empezar",
    talk: "Habla con nosotros",
  },

  sticky: { titulo: "Garantía de 7 días", sub: "planes desde {p}/mes", cta: "Empezar" },

  langBanner: { texto: "Ver esta página en português", href: "/" },

  footer: {
    legal: "© 2026 Notifiquei. Todos los derechos reservados. · CNPJ 59.859.848/0001-13 (Brasil)",
    status: "Todos los sistemas operativos",
    pitch: "Automatización de ventas en Instagram con la API oficial de Meta. Hecho en Brasil, funcionando en todo el mundo.",
    cookies: "Preferencias de cookies",
    cols: [
      { title: "Producto", links: [
        { href: "/es#como", label: "Cómo funciona" },
        { href: "/es#plataforma", label: "Plataforma" },
        { href: "/es#claude", label: "API + Claude" },
        { href: "/es#planes", label: "Precios" },
      ]},
      { title: "Empresa", links: [
        { href: "https://www.instagram.com/notifiquei.com.br/", label: "Instagram" },
        { href: "https://www.youtube.com/@notifiqueicombr", label: "YouTube" },
        { href: "https://br.linkedin.com/company/notifiquei", label: "LinkedIn" },
        { href: "mailto:contato@notifiquei.com.br", label: "contato@notifiquei.com.br" },
      ]},
      { title: "Legal", links: [
        { href: "/es/terminos-de-uso", label: "Términos de uso" },
        { href: "/es/politica-de-privacidad", label: "Privacidad" },
        { href: "/es/dpa", label: "Acuerdo de datos (DPA)" },
      ]},
    ],
  },
};
