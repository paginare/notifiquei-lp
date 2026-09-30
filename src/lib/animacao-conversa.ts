/**
 * Keyframes da conversa do topo da home, em CSS puro (antes era uma timeline
 * GSAP que custava ~1,5s de CPU no celular). Mesma coreografia e mesmos tempos:
 * cada conversa dura 7,5s e elas se revezam num ciclo de N × 7,5s.
 *
 * Anima `translate`, `scale` e `opacity` — propriedades separadas de
 * `transform`, então a inclinação dos balões (transform: rotate) continua a do
 * CSS do componente, como o GSAP fazia.
 */
const OUT = "cubic-bezier(.215,.61,.355,1)"; // power3.out
const back = (s: number) => `cubic-bezier(.34,${(1 + s * 0.33).toFixed(2)},.64,1)`; // back.out(s) aproximado
const IN = "cubic-bezier(.55,.055,.675,.19)"; // power2.in

interface Passo { t: number; props: string; ease?: string }

// Tempos (s) dentro da janela de 7,5s de cada conversa — copiados da timeline antiga.
const PARTES: Record<string, Passo[]> = {
  exchange: [
    { t: 0, props: "opacity:1;visibility:visible;translate:0 0" },
    { t: 6.85, props: "opacity:1;visibility:visible;translate:0 0", ease: IN },
    { t: 7.4, props: "opacity:0;visibility:hidden;translate:0 -68px" },
  ],
  incoming: [
    { t: 0.08, props: "opacity:0;translate:0 62px;scale:.95", ease: back(1.3) },
    { t: 0.73, props: "opacity:1;translate:0 10px;scale:1" },
    { t: 1.6, props: "opacity:1;translate:0 10px;scale:1", ease: OUT },
    { t: 2.2, props: "opacity:1;translate:0 -3px;scale:1" },
  ],
  typing: [
    { t: 0.9, props: "opacity:0;visibility:hidden;translate:0 15px", ease: OUT },
    { t: 0.901, props: "opacity:0;visibility:visible;translate:0 15px", ease: OUT },
    { t: 1.15, props: "opacity:1;visibility:visible;translate:0 0" },
    { t: 1.9, props: "opacity:1;visibility:visible;translate:0 0", ease: OUT },
    { t: 2.08, props: "opacity:0;visibility:hidden;translate:0 -5px" },
  ],
  answer: [
    { t: 2.0, props: "opacity:0;translate:0 48px;scale:.96", ease: back(1.15) },
    { t: 2.65, props: "opacity:1;translate:0 0;scale:1" },
  ],
  link: [
    { t: 2.35, props: "opacity:0;translate:0 8px", ease: OUT },
    { t: 2.75, props: "opacity:1;translate:0 0" },
  ],
  reaction: [
    { t: 2.8, props: "opacity:0;scale:.3", ease: back(2) },
    { t: 3.25, props: "opacity:1;scale:1" },
  ],
  receipt: [
    { t: 2.9, props: "opacity:0;translate:0 5px", ease: OUT },
    { t: 3.2, props: "opacity:1;translate:0 0" },
  ],
  thanks: [
    { t: 3.7, props: "opacity:0;translate:0 27px;scale:.97", ease: back(1.2) },
    { t: 4.2, props: "opacity:1;translate:0 0;scale:1" },
  ],
  dot: [
    { t: 0, props: "width:15px;background:#ff9abe" },
    { t: 7.4, props: "width:15px;background:#ff9abe" },
    { t: 7.5, props: "width:5px;background:#fff5" },
  ],
};

const JANELA = 7.5;
const pct = (t: number, ciclo: number) => `${((t / ciclo) * 100).toFixed(3)}%`;

/** CSS completo da animação para `n` conversas (só roda sem prefers-reduced-motion). */
export function cssConversa(n: number): string {
  const ciclo = n * JANELA;
  const regras: string[] = [];
  const keyframes = Object.entries(PARTES).map(([nome, passos]) => {
    const primeiro = passos[0];
    const ultimo = passos[passos.length - 1];
    // Antes do primeiro passo: estado inicial (escondido). Depois da janela: volta
    // ao inicial no fim do ciclo, pra conversa seguinte começar limpa.
    const inicial = nome === "exchange" ? "opacity:0;visibility:hidden;translate:0 0"
      : nome === "dot" ? "width:5px;background:#fff5" : primeiro.props;
    const linhas = [`0%{${inicial}}`];
    if (nome === "exchange" || nome === "dot") linhas.push(`0.001%{${primeiro.props}}`);
    // exchange e dot já ganharam o passo 0 em 0,001% (0% fica escondido pro
    // atraso das conversas seguintes); um "0.000%" aqui sobrescreveria o 0%.
    passos.filter((p) => !(p.t === 0 && (nome === "exchange" || nome === "dot"))).forEach((p) => linhas.push(`${pct(p.t, ciclo)}{${p.props}${p.ease ? `;animation-timing-function:${p.ease}` : ""}}`));
    linhas.push(`${pct(JANELA - 0.001, ciclo)}{${ultimo.props}}`, `${pct(JANELA, ciclo)}{${inicial}}`, `100%{${inicial}}`);
    return `@keyframes nf-chat-${nome}{${linhas.join("")}}`;
  });
  const alvo: Record<string, string> = {
    exchange: ".hero-chat__exchange", incoming: "[data-chat-incoming]", typing: "[data-chat-typing]",
    answer: "[data-chat-answer]", link: "[data-chat-link]", reaction: "[data-chat-reaction]",
    receipt: "[data-chat-receipt]", thanks: "[data-chat-thanks]",
  };
  for (let i = 0; i < n; i++) {
    const atraso = `${i * JANELA}s`;
    Object.entries(alvo).forEach(([nome, sel]) => {
      const base = `.hero-chat__exchange:nth-child(${i + 1})`;
      const s = nome === "exchange" ? base : `${base} ${sel}`;
      regras.push(`${s}{animation:nf-chat-${nome} ${ciclo}s linear ${atraso} infinite both}`);
    });
    regras.push(`.hero-chat__footer i:nth-child(${i + 1}){animation:nf-chat-dot ${ciclo}s linear ${atraso} infinite both}`);
  }
  // Pontinhos do "digitando": sobem e descem em sequência.
  regras.push(`@keyframes nf-chat-bolinha{from{translate:0 0;opacity:.4}to{translate:0 -4px;opacity:1}}`);
  regras.push(`.hero-chat__typing i{animation:nf-chat-bolinha .18s ease-out infinite alternate}`);
  regras.push(`.hero-chat__typing i:nth-child(2){animation-delay:.1s}.hero-chat__typing i:nth-child(3){animation-delay:.2s}`);
  // Pausa: botão, fora da tela ou aba escondida (estado posto pelo JS mínimo).
  regras.push(`.hero-chat[data-chat-state="paused"] *,.hero-chat[data-chat-state="offscreen"] *{animation-play-state:paused!important}`);
  return `@media (prefers-reduced-motion: no-preference){${keyframes.join("")}${regras.join("")}}`;
}
