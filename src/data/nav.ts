// Um item do menu é um link ou um grupo (abre um painel com os subitens).
export interface NavLink { href?: string; label: string; desc?: string; itens?: NavLink[] }

// Menu único do site em português (a home usa o mesmo, vindo de i18n/home/pt.ts).
export const LINKS_PT: NavLink[] = [
  { label: "Recursos", itens: [
    { href: "/#plataforma", label: "Como funciona", desc: "Comentário, story e direct no automático" },
    { href: "/modelos", label: "Modelos prontos", desc: "Automações pra copiar e ligar" },
    { href: "/ferramentas", label: "Ferramentas grátis", desc: "Sorteador, calculadoras e link de direct" },
    { href: "/novidades", label: "Novidades", desc: "O que mudou no produto" },
    { href: "/seguranca", label: "Segurança e LGPD", desc: "API oficial, dados e privacidade" },
  ] },
  { href: "/criadores", label: "Para criadores" },
  { href: "/vs-manychat", label: "vs ManyChat" },
  { href: "/precos", label: "Preços" },
  { href: "/blog", label: "Blog" },
  { href: "/ajuda", label: "Ajuda" },
];

// Menus em inglês e espanhol: mesma estrutura, só com as páginas que existem
// nessas línguas (modelos, novidades, ferramentas e blog são só em português).
export const LINKS_EN: NavLink[] = [
  { label: "Features", itens: [
    { href: "/en#plataforma", label: "How it works", desc: "Comments, stories and DMs on autopilot" },
    { href: "/en#mcp", label: "Claude + MCP", desc: "Build automations by chatting" },
    { href: "/en/security", label: "Security", desc: "Official API, data and privacy" },
  ] },
  { href: "/en/creators", label: "For creators" },
  { href: "/en/vs-manychat", label: "vs ManyChat" },
  { href: "/en/pricing", label: "Pricing" },
  { href: "/en/help", label: "Help" },
];

export const LINKS_ES: NavLink[] = [
  { label: "Funciones", itens: [
    { href: "/es#plataforma", label: "Cómo funciona", desc: "Comentarios, stories y DMs en automático" },
    { href: "/es#mcp", label: "Claude y MCP", desc: "Crea automatizaciones conversando" },
    { href: "/es/seguridad", label: "Seguridad", desc: "API oficial, datos y privacidad" },
  ] },
  { href: "/es/creadores", label: "Para creadores" },
  { href: "/es/vs-manychat", label: "vs ManyChat" },
  { href: "/es/precios", label: "Precios" },
  { href: "/es/ayuda", label: "Ayuda" },
];
