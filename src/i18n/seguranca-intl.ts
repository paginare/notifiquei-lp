// /en/security e /es/seguridad — tradução dos fatos de /seguranca (conferidos no
// instaV2 e nas políticas de privacidade em inglês e espanhol, 30/09/2026).
type Item = { icon?: string; t: string; d: string };
export const segurancaIntl: Record<"en" | "es", {
  title: string; description: string; kicker: string; titulo: string; lead: string;
  pilares: Item[]; dadosKicker: string; dadosTitulo: string; dados: Item[];
  direitosKicker: string; direitosTitulo: string; direitos: Item[];
  docsKicker: string; docsTitulo: string; docs: { href: string; icon: string; t: string; d: string }[]; empresa: string;
}> = {
  en: {
    title: "Security and privacy | Notifiquei",
    description: "How Notifiquei protects your account and your data: official Meta connection without your password, encrypted access tokens, data deletion, DPA and a data protection officer.",
    kicker: "SECURITY AND PRIVACY", titulo: "Your account and your data,\n{hl}well looked after.{/hl}",
    lead: "What Notifiquei does to protect your Instagram and the conversations with your customers — in plain language.",
    pilares: [
      { icon: "instagram", t: "Official connection, no password", d: "Your Instagram account is connected through Meta's official login (OAuth). Meta's screen shows every permission requested (comments, messages and publishing), and you can revoke it anytime." },
      { icon: "shield", t: "Encrypted access", d: "Instagram access tokens are stored encrypted (AES-256-GCM). A copy of the database alone can't be used to access any account." },
      { icon: "chat", t: "Conversations kept out of logs", d: "The content of comments and messages and personal data don't go into the system's technical logs." },
      { icon: "clock", t: "Limits against abuse", d: "The API rate-limits each client and respects the pauses Meta asks for. When Instagram limits an account, Notifiquei waits and resends instead of insisting." },
    ],
    dadosKicker: "YOUR DATA", dadosTitulo: "What we keep\n{hl}and for how long.{/hl}",
    dados: [
      { t: "What we process", d: "Your sign-up data, your connected accounts (username, photo, follower count) and the interactions that trigger your automations (comments, story replies and messages)." },
      { t: "For how long", d: "Automation run history is kept for 120 days. Meta access tokens are valid only while the authorization is active. Other periods are in the privacy policy." },
      { t: "Where", d: "As stated in the privacy policy: AWS and Google Cloud servers, with datacenters in Brazil and the United States, and Turbocloud (a Brazilian provider) for the main API server." },
      { t: "Payments", d: "Card payments are processed by Stripe (international) and Cakto (Brazil). Notifiquei doesn't store card data." },
    ],
    direitosKicker: "YOUR RIGHTS", direitosTitulo: "You decide\n{hl}what stays.{/hl}",
    direitos: [
      { t: "Delete your account", d: "In Settings → Delete my account, on the web or in the app. Access is blocked and automations stop immediately; after 30 days the account data is permanently deleted." },
      { t: "Disconnect from Instagram", d: "If you remove Notifiquei in Instagram's settings, Meta notifies us and the account is disconnected. Data deletion requests sent by Meta are also handled automatically." },
      { t: "Contact our data protection officer", d: "Data Protection Officer (DPO): Antonio Duarte — dpa@notifiquei.com.br." },
    ],
    docsKicker: "DOCUMENTS", docsTitulo: "All in writing.",
    docs: [
      { href: "/en/privacy-policy", icon: "shield", t: "Privacy policy", d: "What data, what for and with whom" },
      { href: "/en/dpa", icon: "bookmark", t: "Data processing agreement (DPA)", d: "For companies and agencies that need a contract" },
      { href: "/en/terms-of-use", icon: "check", t: "Terms of use", d: "The rules of the service" },
    ],
    empresa: "Notifiquei Tecnologia LTDA · Brazilian company ID (CNPJ) 59.859.848/0001-13",
  },
  es: {
    title: "Seguridad y privacidad | Notifiquei",
    description: "Cómo Notifiquei protege tu cuenta y tus datos: conexión oficial con Meta sin tu contraseña, accesos cifrados, eliminación de datos, DPA y delegado de protección de datos.",
    kicker: "SEGURIDAD Y PRIVACIDAD", titulo: "Tu cuenta y tus datos,\n{hl}bien cuidados.{/hl}",
    lead: "Lo que hace Notifiquei para proteger tu Instagram y las conversaciones con tus clientes — en lenguaje claro.",
    pilares: [
      { icon: "instagram", t: "Conexión oficial, sin contraseña", d: "Tu cuenta de Instagram se conecta con el login oficial de Meta (OAuth). La pantalla de Meta muestra cada permiso solicitado (comentarios, mensajes y publicaciones) y puedes revocarlo cuando quieras." },
      { icon: "shield", t: "Accesos cifrados", d: "Las claves de acceso de Instagram se guardan cifradas (AES-256-GCM). Una copia de la base de datos, sola, no sirve para acceder a ninguna cuenta." },
      { icon: "chat", t: "Conversaciones fuera de los registros", d: "El contenido de comentarios y mensajes y los datos personales no van a los registros técnicos del sistema." },
      { icon: "clock", t: "Límites contra abusos", d: "La API limita las solicitudes por cliente y respeta las pausas que pide Meta. Cuando Instagram limita una cuenta, Notifiquei espera y reenvía en vez de insistir." },
    ],
    dadosKicker: "TUS DATOS", dadosTitulo: "Qué guardamos\n{hl}y por cuánto tiempo.{/hl}",
    dados: [
      { t: "Qué tratamos", d: "Tus datos de registro, las cuentas conectadas (usuario, foto, cantidad de seguidores) y las interacciones que activan tus automatizaciones (comentarios, respuestas a historias y mensajes)." },
      { t: "Por cuánto tiempo", d: "El historial de ejecuciones de las automatizaciones se guarda 120 días. Los accesos a Meta valen solo mientras la autorización esté activa. Los demás plazos están en la política de privacidad." },
      { t: "Dónde", d: "Según la política de privacidad: servidores de AWS y Google Cloud, con centros de datos en Brasil y Estados Unidos, y Turbocloud (proveedor brasileño) para el servidor principal de la API." },
      { t: "Pagos", d: "Los pagos con tarjeta los procesan Stripe (internacional) y Cakto (Brasil). Notifiquei no guarda datos de tarjetas." },
    ],
    direitosKicker: "TUS DERECHOS", direitosTitulo: "Tú decides\n{hl}qué se queda.{/hl}",
    direitos: [
      { t: "Eliminar la cuenta", d: "En Configuración → Eliminar mi cuenta, en la web o en la app. El acceso se bloquea y las automatizaciones se detienen al instante; después de 30 días los datos de la cuenta se borran definitivamente." },
      { t: "Desconectar desde Instagram", d: "Si quitas Notifiquei en la configuración de Instagram, Meta nos avisa y la cuenta se desconecta. Las solicitudes de eliminación de datos que envía Meta también se atienden automáticamente." },
      { t: "Hablar con el delegado", d: "Delegado de Protección de Datos (DPO): Antonio Duarte — dpa@notifiquei.com.br." },
    ],
    docsKicker: "DOCUMENTOS", docsTitulo: "Todo por escrito.",
    docs: [
      { href: "/es/politica-de-privacidad", icon: "shield", t: "Política de privacidad", d: "Qué datos, para qué y con quién" },
      { href: "/es/dpa", icon: "bookmark", t: "Acuerdo de tratamiento de datos (DPA)", d: "Para empresas y agencias que necesitan contrato" },
      { href: "/es/terminos-de-uso", icon: "check", t: "Términos de uso", d: "Las reglas del servicio" },
    ],
    empresa: "Notifiquei Tecnologia LTDA · CNPJ (Brasil) 59.859.848/0001-13",
  },
};
