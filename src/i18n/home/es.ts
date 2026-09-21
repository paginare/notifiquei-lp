import type { CopyHome } from "./pt";

/** Copy da home em espanhol. Mesmas chaves do pt.ts (ver as regras lá). */
export const es: CopyHome = {
  meta: {
    title: "Notifiquei — Automatiza comentarios y DMs de Instagram",
    description:
      "Automatiza las respuestas a comentarios, DMs e historias de Instagram y TikTok con tu propia voz y por la API oficial de Meta. Convierte comentarios en conversaciones que venden.",
    skip: "Saltar al contenido",
    navLangLabel: "Elegir idioma",
    navComecar: "Empezar ahora",
  },

  nav: [
    { href: "/es#plataforma", label: "Funciones" },
    { href: "/es#como", label: "Cómo funciona" },
    { href: "/es#mcp", label: "Claude y MCP" },
    { href: "/es#planos", label: "Precios" },
  ],

  hero: {
    canais: { nota: "EN AUTOMÁTICO" },
    titulo: ["Tu próximo", "cliente está", "en el DM."],
    lead: 'Convierte comentarios en conversaciones que venden. Automatiza tu Instagram y TikTok, con mensajes que tienen <strong>tu voz.</strong>',
    ctaBr: "Empezar gratis",
    ctaIntl: "Empezar ahora",
    verNaPratica: "Verlo en acción",
    microBr: "Gratis para siempre. Sin tarjeta.",
    microIntl: "Garantía de 7 días. Cancela cuando quieras.",
    fotoAlt: "Creadora mirando el móvil, iluminada por la pantalla, en un ambiente oscuro",
  },

  conversa: {
    topo: "La conversación ocurre.",
    pausar: "Pausar animación",
    enviado: "Enviado automáticamente",
    rodape: "Conversaciones ilustrativas",
    respondeu: "Notifiquei respondió por ti",
    exemplos: [
      { inicial: "J", nome: "julia", origem: "comentó en tu publicación", pergunta: "¡LO QUIERO! ¿Me pasas el enlace? 😍", resposta: "¡Hola, Julia! Te separé este look. Creo que te va a encantar 💕", link: "Quiero ver el look", rotulo: "Tu próximo look favorito", obrigada: "¡Era eso! Gracias 💖" },
      { inicial: "M", nome: "mateo", origem: "te mandó un DM", pergunta: "¡GUÍA 🙌 Quiero empezar!", resposta: "¡Hola, Mateo! Aquí tienes la guía que pediste. ¡Luego me cuentas qué te pareció!", link: "Acceder a mi guía", rotulo: "Tu contenido, a un toque", obrigada: "Ya la guardé. ¡Gracias! 🙌" },
      { inicial: "B", nome: "bea", origem: "respondió a tu historia", pergunta: "¡Me encanta! ¿Dónde lo encuentro? 💕", resposta: "¡Es uno de mis favoritos! Te dejo el enlace aquí para que lo conozcas ✨", link: "Quiero verlo", rotulo: "La recomendación que buscabas", obrigada: "¡Lo encontré! Era ese mismo 😍" },
    ],
  },

  autoridade: {
    kicker: "CUENTAS CONECTADAS A NOTIFIQUEI",
    titulo: "Grandes perfiles\nya están aquí.",
    lead: "El tamaño del público que ya\nconversa por la plataforma.",
    milhoes: "millones",
    legenda: "de seguidores sumados\nen las cuentas conectadas",
  },

  provaMarcas: "Más conversaciones en la rutina de marcas como",
    perfisTitulo: "Cuentas que ya conversan con Notifiquei",

  publicos: {
    kicker: "HECHO PARA QUIEN TIENE ALGO QUE COMPARTIR",
    titulo: "Hay gente que quiere\n{hl}lo que tú tienes.{/hl}",
    lead: "Tu próximo cliente, alumno o fan puede estar a un mensaje de distancia.",
    verComo: "Mira cómo funciona",
    cards: [
      { tag: "CREADORES", titulo: "Tu contenido abre puertas. Y conversaciones.", texto: "Entrega tu material, promociona tu curso y acércate a quien te sigue.", alt: "Creador grabando contenido con el móvil en su espacio de trabajo" },
      { tag: "TIENDAS Y NEGOCIOS", titulo: "Del “¿tienen mi talla?” a tu carrito.", texto: "Responde al interés al instante y lleva al cliente hasta el producto que quiere.", alt: "Creadora de moda presentando una camisa rosa y un pantalón claro" },
      { tag: "AFILIADOS", titulo: "Tú recomiendas. Tu enlace llega contigo.", texto: "Convierte la curiosidad en tu publicación en un clic en tu enlace de afiliado.", alt: "Afiliada grabando una recomendación de producto con el móvil" },
    ],
  },

  demo: {
    titulo: "Convierte el interés\nen nuevas ventas.",
    lead: "Lleva a quien interactúa con tu contenido hasta tu oferta, con respuestas automáticas en comentarios, historias y DMs.",
    escolha: "Elige una opción y velo en acción",
    ctaBr: "Crear mi automatización",
    ctaIntl: "Empezar ahora",
    emAcao: "Tu automatización en acción",
    exemplo: "EJEMPLO",
    marca: "tu.marca",
    legenda: "El look que pedían.",
    digitando: "Escribiendo",
    respondeuCom: "Respondió con Notifiquei",
    enviado: "Enviado automáticamente",
    fechoSub: "Y tú te enteras después, en el panel.",
    cenas: [
      { chamada: "Comenta QUIERO y te mando el enlace 💕", rotulo: "julia comentó", texto: "QUIERO 😍", resposta: "¡Hola, Julia! Este look es totalmente tuyo 💕 Aquí tienes el enlace con todos los detalles.", link: "Quiero ver el look", fecho: "Comentó. Recibió." },
      { chamada: "¿Te gustó el look? Responde a esta historia 💕", rotulo: "julia respondió a la historia", texto: "¿Dónde lo encuentro? 😍", resposta: "¡Hola, Julia! Qué bueno que te gustó 💕 Te separé el enlace del look que apareció en la historia.", link: "Ver el look de la historia", fecho: "Respondió. Recibió." },
      { chamada: "Escríbeme por DM con la palabra LOOK 💕", rotulo: "julia mandó un DM", texto: "LOOK 💕", resposta: "¡Hola! ¿Buscas el look de la última publicación? 💕 Solo tienes que tocar aquí para ver los detalles y elegir el tuyo.", link: "Ver todos los detalles", fecho: "Escribió. Recibió." },
    ],
    gatilhos: [
      { nome: "Comentario", titulo: "¿Comentó? La conversación ya empezó.", texto: "Un “quiero”, “enlace” o “cuánto cuesta” se convierte en un mensaje en el DM. Tú eliges la palabra y la respuesta." },
      { nome: "Historia", titulo: "Tu historia merece una continuación.", texto: "¿Respondió a la historia? Sigue la conversación automáticamente y entrega tu enlace a quien se interesó." },
      { nome: "DM", titulo: "Un DM. Muchas posibilidades.", texto: "Responde a las palabras clave con el mensaje correcto. Envía una oferta, un material o el siguiente paso." },
    ],
  },

  mcp: {
    kicker: "AUTOMATIZACIÓN CONVERSANDO",
    titulo: "Dilo a tu manera.\n{hl}Él arma la automatización.{/hl}",
    lead: "Sin panel y sin formularios: describes lo que quieres como se lo explicarías a alguien de tu equipo. Claude encuentra la publicación, arma la automatización y te muestra cómo quedó. Solo se activa cuando dices que está bien.",
    itens: [
      "Funciona en Claude y en cualquier app que hable MCP",
      "Crea, edita, activa y desactiva sin salir de la conversación",
      "¿No se disparó? Lo revisa y te dice por qué",
      "Nada se activa sin tu sí",
    ],
    ctaBr: "Conseguir mi clave",
    ctaIntl: "Ver los planes",
    conectado: "Notifiquei conectado",
    novaConversa: "Nueva conversación",
    conversas: ["Automatización del reel", "Sorteo del viernes", "Palabra “guía”"],
    pedido: "en mi último reel: quien comente {hl}CUPÓN{/hl} recibe el enlace de la tienda por DM",
    achou: "Encontré el reel de ayer, “detrás del lanzamiento”, con 312 comentarios. Lo monté así:",
    previa: [
      { rotulo: "Disparador", valor: "Comentario con “cupón”" },
      { rotulo: "En la publicación", valor: "Responde “Te escribí por DM”" },
      { rotulo: "En el DM", valor: "Mensaje + botón “Conseguir mi cupón”" },
    ],
    permissao: "¿Permitir que Claude use {tool}?",
    permitirUma: "Permitir una vez",
    permitirSempre: "Permitir siempre",
    pronto: "<b>Listo, ya está en marcha.</b> Automatización “CUPÓN” activada en ese reel. ¿Quieres que te avise cuando llegue el primer comentario?",
    responder: "Responder a Claude…",
    legenda: "Conversación ilustrativa. Las herramientas y la petición de permiso son las del conector.",
    aria: "Simulación de una conversación creando una automatización con el conector",
  },

  antesDepois: {
    kicker: "MENOS COPIAR Y PEGAR. MÁS TIEMPO PARA TI.",
    titulo: "Tu DM puede\ntener {hl}otra rutina.{/hl}",
    antesRotulo: "SIN AUTOMATIZACIÓN",
    antesTitulo: "Tu publicación fue un éxito.\nTu trabajo también.",
    esperando: ["¿Tienes el enlace?", "¿Cuánto cuesta?", "¡Mándamelo a mí también!"],
    antesItens: [
      "Responder la misma pregunta, otra vez.",
      "Parar lo que estás haciendo con cada DM.",
      "Dejar esperando a quien tiene interés.",
    ],
    depoisRotulo: "CON NOTIFIQUEI",
    depoisTitulo: "Tu publicación fue un éxito.\n{span}Puedes celebrar.{/span}",
    enviado: "Enlace enviado por DM.",
    enviadoSub: "Una conversación más en marcha.",
    depoisItens: [
      "Respuestas automáticas con tu voz.",
      "Enlaces que llegan a quien quiere saber más.",
      "Tu tiempo de vuelta para crear y vender.",
    ],
    cta: "Quiero esa rutina",
  },

  afiliados: {
    kicker: "PARA QUIEN GANA RECOMENDANDO",
    titulo: "“Comenta {hl}QUIERO{/hl}\ny te lo mando.”\nY ya está.",
    lead: "Publicas el hallazgo. Notifiquei entrega tu enlace de afiliado en el DM de cada persona que comentó. Sin pasar el día copiando y pegando.",
    cta: "Quiero automatizar mis enlaces",
    tag: "Del comentario a tu enlace",
    comentarioRotulo: "COMENTARIO RECIBIDO",
    comentario: "¡Quiero ese hallazgo! 😍",
    respostaTitulo: "¡Hola! Ya llegó tu enlace 💕",
    respostaSub: "Enviado automáticamente por DM",
    respostaBotao: "Ver mi hallazgo",
    fecho: "Tu contenido. Tu enlace. Tu comisión.",
    marketplaces: "Funciona con tus enlaces de",
    aria: "Ejemplo de envío de enlace de afiliado",
  },

  extras: {
    titulo: "La conversación es solo\n{hl}el comienzo.{/hl}",
    lead: "Las herramientas para organizar lo que pasa después también están aquí.",
    cards: [
      { titulo: "Entiende cada clic", texto: "Mira qué automatizaciones están llevando a tu público hasta tu oferta." },
      { titulo: "Cambia el enlace una sola vez", texto: "Actualiza el destino y todas tus automatizaciones pasan a enviar el enlace correcto." },
      { titulo: "Sortea sin hojas de cálculo", texto: "Reúne a quien comentó la palabra clave y haz el sorteo directo en el panel." },
    ],
  },

  como: {
    titulo: "No necesitas código.\n{hl}Solo una buena conversación.{/hl}",
    lead: "Tres pasos entre tu idea y la primera respuesta automática.",
    passos: [
      { titulo: "Conecta tu cuenta", texto: "Entra con tu Instagram por el inicio de sesión oficial de Meta. Tu contraseña sigue siendo solo tuya." },
      { titulo: "Hazlo a tu manera", texto: "Elige una publicación, la palabra clave y el mensaje. O empieza con una plantilla lista." },
      { titulo: "Listo. Ya puedes publicar.", texto: "Tu público comenta, Notifiquei responde. Y tú lo sigues todo desde el panel." },
    ],
    ctaBr: "Empezar gratis",
    ctaIntl: "Empezar ahora",
    seguranca: "Conexión oficial con Meta. Tu contraseña se queda contigo.",
  },

  planos: {
    eyebrow: "Planes",
    titulo: "Tu audiencia crece.\n{hl}Tu precio sigue fijo.{/hl}",
    leadBr: "Elige el plan que acompaña tu momento. Contactos ilimitados en todos ellos, sin sorpresas en la factura.",
    leadIntl: "Elige el plan que acompaña tu momento. Contactos ilimitados y precio fijo, sin sorpresas en la factura.",
    nota: "<strong>2 en 1:</strong> cada cuenta ya conecta <strong>Instagram + TikTok</strong> en el mismo plan — automatiza los dos sin pagar de más.",
    ciclo: "Ciclo de facturación",
    mensal: "Mensual",
    anual: "Anual",
    economia: "2 meses de ahorro",
    porMes: "/mes",
    cobradoAno: "se cobra {valor}/año",
    maisPopular: "Más popular",
    garantia: "Garantía de 7 días · devolución 100%",
    gratisTag: "Gratis para siempre",
    gratisNome: "Plan Gratis",
    gratisBlurb: "¿Solo quieres probarlo, sin tarjeta y sin plazo? Empieza gratis y sube de plan cuando quieras.",
    gratisItens: [
      "Para siempre, sin tarjeta",
      "Solo Instagram (sin TikTok)",
      "Hasta 200 envíos automáticos al mes",
      "Mensajes con marca de agua “⚡ Enviado con Notifiquei”",
    ],
    gratisCta: "Empezar gratis",
    cartoes: {
      solo: { blurb: "Creador que empieza, operación pequeña.", cta: "Empezar con Solo", itens: ["1 cuenta — Instagram + TikTok", "Automatizaciones ilimitadas", "Plantillas completas", "Soporte por chat", "Novedades antes que nadie"] },
      duo: { blurb: "Dos frentes en la misma operación.", cta: "Empezar con Duo", itens: ["2 cuentas — Instagram + TikTok", "Equipos y división por roles", "Automatizaciones ilimitadas", "Plantillas completas", "Soporte por chat", "Novedades antes que nadie"] },
      pro: { blurb: "Para quien ya escaló un poco.", cta: "Empezar con Pro", itens: ["5 cuentas — Instagram + TikTok", "Equipos y división por roles", "Automatizaciones ilimitadas", "Plantillas completas", "Soporte por chat", "Novedades antes que nadie"] },
      business: { blurb: "Agencias y operaciones grandes.", cta: "Empezar con Business", itens: ["10 cuentas — Instagram + TikTok", "Equipos y división por roles", "Automatizaciones ilimitadas", "Plantillas completas", "Soporte VIP prioritario"] },
    },
  },

    zapTexto: "¡Hola! Vengo de la página de Notifiquei y tengo una duda.",
    zapRotulo: "Hablar con nosotros por WhatsApp",

  faq: {
    kicker: "PUEDES PREGUNTAR",
    titulo: "¿Resolvemos\n{hl}tus dudas?{/hl}",
    lead: "Si prefieres una conversación de verdad, nuestro equipo está por aquí.",
    cta: "Habla con nosotros",
  },

  final: {
    bolha: "¡lo quiero! 💕",
    kicker: "TU PRÓXIMA CONVERSACIÓN EMPIEZA AQUÍ",
    titulo: "Menos “te respondo luego”.\nMás {span}“ya te lo mandé”.{/span}",
    lead: "Tu contenido llama la atención. Notifiquei se encarga de la conversación.",
    ctaBr: "Empezar gratis ahora",
    ctaIntl: "Elegir mi plan",
    microBr: "Sin tarjeta. Sin plazo. A tu manera.",
    microIntl: "Garantía de 7 días. A tu manera.",
  },
};
