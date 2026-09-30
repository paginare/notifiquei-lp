// Carrega as animações (GSAP + home-motion, ~1s de CPU no celular) só depois
// que a página já apareceu: após o load, quando o navegador fica livre, ou na
// primeira interação. O conteúdo é todo renderizado no servidor; a animação é
// enfeite e não pode atrasar o primeiro desenho (LCP do PageSpeed mobile).
let pedido = false;
export function iniciarMovimento() {
  const rodar = () => {
    if (pedido) return;
    pedido = true;
    ["pointerdown", "keydown", "touchstart"].forEach((ev) => removeEventListener(ev, rodar, true));
    import("./home-motion").then((m) => m.initHomeMotion());
  };
  ["pointerdown", "keydown", "touchstart"].forEach((ev) => addEventListener(ev, rodar, { capture: true, passive: true, once: true }));
  const depoisDoLoad = () => {
    const ocioso = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1));
    setTimeout(() => ocioso(rodar, { timeout: 1500 }), 300);
  };
  if (document.readyState === "complete") depoisDoLoad();
  else addEventListener("load", depoisDoLoad, { once: true });
}
