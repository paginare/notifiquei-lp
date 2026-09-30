// Central de ajuda em inglês e espanhol (/en/help, /es/ayuda) — tradução de
// data/ajuda.ts (conferido no instaV2 em 30/09/2026), adaptada ao mercado
// internacional: sem plano grátis, pagamento com cartão pelo Stripe (USD/EUR).
// Os nomes dos menus do Instagram/TikTok seguem a interface em cada língua.
import type { Secao } from "./ajuda";

export const secoesIntl: Record<"en" | "es", Secao[]> = {
  en: [
    {
      id: "getting-started", titulo: "Getting started", icon: "bolt",
      artigos: [
        { id: "connect-instagram", q: "How do I connect my Instagram?", a: `<ol><li>In the dashboard, open <b>Accounts</b> and click to connect Instagram.</li><li>Log in to Instagram itself and authorize Notifiquei.</li><li>Wait for the sync to finish — your posts and stories show up on their own.</li></ol><p>You connect through Instagram's official login: you <b>don't</b> give us your password and you don't need a Facebook Page. The account must be <b>Professional or Creator</b> (switching is free, in Instagram's settings).</p>` },
        { id: "first-automation", q: "How do I create my first comment automation?", a: `<ol><li>Click <b>New automation</b> and choose <b>Comment on a post or Reel</b>.</li><li>Choose where it applies: one specific post, every post, or the next one you publish.</li><li>Set the keywords (up to 20) — or let any comment trigger it.</li><li>Choose what people get in their DMs: a link, a text or a product showcase.</li><li>Optionally turn on a public reply to the comment (up to 3 variations) and switch it on.</li></ol><p>The DM accepts up to 1,000 characters and the button, up to 20.</p>` },
        { id: "templates", q: "Are there ready-made templates?", a: `Yes. In the dashboard, pick a template — link by DM, coupon, e-book, giveaway, booking and more — change the keyword and the link, and switch it on.` },
        { id: "claude", q: "Can I build automations by chatting with Claude?", a: `Yes. The dashboard has an <b>API</b> page where you generate your key and get the ready-made kit. Paste the kit into a Claude Project and ask in plain language: it finds the post, builds the automation, shows you a summary to confirm, and turns it on.` },
        { id: "stories", q: "How do I reply to people who reply to my story?", a: `Create an automation with the <b>Story reply</b> trigger and choose whether it applies to every story or a specific one. You can create the story version together with the comment automation, in the same flow.` },
      ],
    },
    {
      id: "dm-not-delivered", titulo: "The message didn't arrive", icon: "send",
      artigos: [
        { id: "message-access", q: "The comment got a reply, but the DM didn't arrive", a: `It's almost always <b>message access</b> turned off in Instagram. Turn it on at: <b>Menu → Settings and activity → Messages and story replies → Message requests → Connected tools → Allow access to messages</b>. Without it, Meta refuses every automatic DM. The dashboard shows a warning when it detects the problem.` },
        { id: "meta-limit", q: "Meta limited my account's messages. What now?", a: `When Instagram limits an account's messages for a while, Notifiquei <b>pauses and resends automatically</b> later — you don't lose the contact. Meta's pause usually lasts about 2 hours. To avoid it, use specific keywords and varied messages on high-volume posts.` },
        { id: "one-per-comment", q: "Why did the person get only one message?", a: `It's a Meta rule: someone who only commented can receive <b>one</b> message per comment. Once they tap the button or reply, the conversation opens up and the flow continues. If they comment the same keyword again, the automation only fires again after 24 hours.` },
        { id: "24h-window", q: "Can I message someone days later?", a: `No. Under Meta's rules, an automatic DM can only be sent up to 24 hours after the person's last message.` },
        { id: "reconnect", q: "My account shows as disconnected or with an error", a: `Instagram access expired or was removed. Open <b>Accounts</b> and connect the same profile again: your automations are still there. Notifiquei renews access on its own while the account is active; it only drops if the Instagram password is changed or access is revoked.` },
      ],
    },
    {
      id: "features", titulo: "Features", icon: "spark",
      artigos: [
        { id: "giveaway", q: "How do giveaways work?", a: `In <b>Giveaways</b>, choose the account, the post, the keyword (optional) and how many winners. Each person counts once, comments from your own account are excluded and capitalization doesn't matter. “Draw again” replaces the winners.` },
        { id: "links", q: "How do I see how many people clicked the link?", a: `Links in your messages become tracked links. In the <b>Click report</b> you see clicks per automation. With <b>dynamic links</b>, you give a link a nickname and, when the destination changes, you update it in one place — every automation starts sending the new one.` },
        { id: "tiktok", q: "How do I connect TikTok?", a: `TikTok needs to be a <b>Business account</b>. In the TikTok app: <b>Menu (☰) → Settings and privacy → Account → Switch to Business Account</b>. Then connect it under <b>Accounts</b> in the dashboard.` },
        { id: "app", q: "Is there an app?", a: `Yes, for iPhone and Android. From the app you create, pause and follow your automations.` },
      ],
    },
    {
      id: "billing", titulo: "Account and billing", icon: "cartao",
      artigos: [
        { id: "plans", q: "What's the difference between the plans?", a: `Solo: 1 account, Instagram + TikTok, unlimited messages and contacts. Pro: up to 5 accounts, with teams and roles. Business: up to 10 accounts and priority support. Pay yearly and you pay for 10 months. <a href="/en/pricing">See the full table</a>.` },
        { id: "payment", q: "How do I pay?", a: `By card, through Stripe, in USD or EUR depending on your country.` },
        { id: "cancel", q: "How do I cancel?", a: `No lock-in. Manage or cancel your subscription in the Stripe customer portal, from the dashboard's billing page. Your access continues until the end of the period already paid for. Every plan has a 7-day guarantee: ask within that window and we refund 100%.` },
        { id: "delete", q: "How do I delete my account and my data?", a: `In <b>Settings → Delete my account</b> (on the web or in the app). Access is blocked immediately and automations stop. After 30 days the data is permanently deleted — within that window you can still change your mind by contacting support. More in <a href="/en/security">Security</a>.` },
      ],
    },
  ],
  es: [
    {
      id: "primeros-pasos", titulo: "Primeros pasos", icon: "bolt",
      artigos: [
        { id: "conectar-instagram", q: "¿Cómo conecto mi Instagram?", a: `<ol><li>En el panel, abre <b>Cuentas</b> y haz clic para conectar Instagram.</li><li>Inicia sesión en el propio Instagram y autoriza a Notifiquei.</li><li>Espera a que termine la sincronización — tus posts e historias aparecen solos.</li></ol><p>La conexión es por el login oficial de Instagram: <b>no</b> nos das tu contraseña y no necesitas una Página de Facebook. La cuenta tiene que ser <b>Profesional o de Creador</b> (cambiar es gratis, en la configuración de Instagram).</p>` },
        { id: "primera-automatizacion", q: "¿Cómo creo mi primera automatización de comentarios?", a: `<ol><li>Haz clic en <b>Nueva automatización</b> y elige <b>Comentario en publicación o Reel</b>.</li><li>Elige dónde aplica: un post específico, todos los posts o el próximo que publiques.</li><li>Define las palabras clave (hasta 20) — o deja que cualquier comentario la active.</li><li>Elige qué recibe la persona por DM: un enlace, un texto o una vitrina de productos.</li><li>Si quieres, activa la respuesta pública al comentario (hasta 3 variaciones) y enciéndela.</li></ol><p>El mensaje por DM acepta hasta 1.000 caracteres y el botón, hasta 20.</p>` },
        { id: "plantillas", q: "¿Hay plantillas listas?", a: `Sí. En el panel, elige una plantilla — enlace por DM, cupón, e-book, sorteo, agenda y más —, cambia la palabra y el enlace, y enciéndela.` },
        { id: "claude", q: "¿Puedo crear automatizaciones conversando con Claude?", a: `Sí. El panel tiene una página de <b>API</b> donde generas tu clave y obtienes el kit listo. Pega el kit en un Proyecto de Claude y pídelo en tu idioma: encuentra el post, arma la automatización, te muestra el resumen para confirmar y la activa.` },
        { id: "historias", q: "¿Cómo respondo a quien responde mi historia?", a: `Crea una automatización con el disparador <b>Respuesta a historia</b> y elige si aplica a todas las historias o a una específica. Puedes crear la versión de historia junto con la de comentarios, en el mismo flujo.` },
      ],
    },
    {
      id: "no-llego", titulo: "El mensaje no llegó", icon: "send",
      artigos: [
        { id: "acceso-mensajes", q: "Se respondió el comentario, pero el DM no llegó", a: `Casi siempre es el <b>acceso a los mensajes</b> desactivado en Instagram. Actívalo en: <b>Menú → Configuración y actividad → Mensajes y respuestas a historias → Solicitudes de mensajes → Herramientas conectadas → Permitir acceso a los mensajes</b>. Sin eso, Meta rechaza todos los DMs automáticos. El panel muestra un aviso cuando detecta el problema.` },
        { id: "limite-meta", q: "Meta limitó los envíos de mi cuenta. ¿Y ahora?", a: `Cuando Instagram limita los envíos de una cuenta por un tiempo, Notifiquei <b>pausa y reenvía solo</b> después — no pierdes el contacto. La pausa de Meta suele durar unas 2 horas. Para evitarlo, usa palabras clave específicas y mensajes variados en posts con mucho volumen.` },
        { id: "uno-por-comentario", q: "¿Por qué la persona recibió un solo mensaje?", a: `Es una regla de Meta: quien solo comentó puede recibir <b>un</b> mensaje por comentario. Cuando toca el botón o responde, la conversación queda libre y el flujo sigue. Si comenta la misma palabra otra vez, la automatización solo se activa de nuevo después de 24 horas.` },
        { id: "ventana-24h", q: "¿Puedo enviar mensajes días después?", a: `No. Según las reglas de Meta, el DM automático solo puede enviarse hasta 24 horas después del último mensaje de la persona.` },
        { id: "reconectar", q: "Mi cuenta aparece desconectada o con error", a: `El acceso de Instagram venció o fue eliminado. Abre <b>Cuentas</b> y vuelve a conectar el mismo perfil: tus automatizaciones siguen ahí. Notifiquei renueva el acceso solo mientras la cuenta está activa; solo se cae si se cambia la contraseña de Instagram o se revoca el acceso.` },
      ],
    },
    {
      id: "funciones", titulo: "Funciones", icon: "spark",
      artigos: [
        { id: "sorteo", q: "¿Cómo funciona el sorteo?", a: `En <b>Sorteos</b>, elige la cuenta, el post, la palabra clave (opcional) y cuántos ganadores. Cada persona cuenta una vez, los comentarios de tu propia cuenta quedan fuera y las mayúsculas no importan. “Sortear de nuevo” cambia los ganadores.` },
        { id: "enlaces", q: "¿Cómo veo cuántas personas hicieron clic en el enlace?", a: `Los enlaces de los mensajes se convierten en enlaces rastreados. En el <b>Informe de clics</b> ves los clics por automatización. Con los <b>enlaces dinámicos</b>, le das un apodo al enlace y, cuando cambia el destino, lo cambias en un solo lugar — todas las automatizaciones empiezan a enviar el nuevo.` },
        { id: "tiktok", q: "¿Cómo conecto TikTok?", a: `TikTok tiene que ser una <b>cuenta de empresa</b>. En la app de TikTok: <b>Menú (☰) → Ajustes y privacidad → Cuenta → Cambiar a cuenta de empresa</b>. Después conéctala en <b>Cuentas</b> en el panel.` },
        { id: "app", q: "¿Hay aplicación?", a: `Sí, para iPhone y Android. Desde la app creas, pausas y sigues tus automatizaciones.` },
      ],
    },
    {
      id: "cuenta", titulo: "Cuenta y cobro", icon: "cartao",
      artigos: [
        { id: "planes", q: "¿Cuál es la diferencia entre los planes?", a: `Solo: 1 cuenta, Instagram + TikTok, mensajes y contactos ilimitados. Pro: hasta 5 cuentas, con equipos y roles. Business: hasta 10 cuentas y soporte prioritario. Pagando anual pagas 10 meses. <a href="/es/precios">Ver la tabla completa</a>.` },
        { id: "pago", q: "¿Cómo pago?", a: `Con tarjeta, a través de Stripe, en USD o EUR según tu país.` },
        { id: "cancelar", q: "¿Cómo cancelo?", a: `Sin permanencia. Gestionas o cancelas tu suscripción en el portal de clientes de Stripe, desde la página de facturación del panel. Tu acceso sigue hasta el final del período ya pagado. Todos los planes tienen garantía de 7 días: si lo pides en ese plazo, te devolvemos el 100%.` },
        { id: "eliminar", q: "¿Cómo elimino mi cuenta y mis datos?", a: `En <b>Configuración → Eliminar mi cuenta</b> (en la web o en la app). El acceso se bloquea al instante y las automatizaciones se detienen. Después de 30 días los datos se borran definitivamente — en ese plazo todavía puedes arrepentirte hablando con soporte. Más en <a href="/es/seguridad">Seguridad</a>.` },
      ],
    },
  ],
};
