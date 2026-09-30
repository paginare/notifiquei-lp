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
