// Animações da home e das páginas internas — sem biblioteca. A coreografia vive
// em CSS (conversa do topo: lib/animacao-conversa.ts; demo: HomeDemo.astro);
// este arquivo só liga/pausa e faz a entrada suave das seções ao rolar.
// Antes era GSAP: ~1,5s de CPU no celular (PageSpeed mobile).
// Sem JS ou com prefers-reduced-motion, tudo aparece completo e parado.
export function initHomeMotion() {
  const page = document.querySelector<HTMLElement>(".home-page");
  if (!page || page.dataset.motionInitialized) return;
  page.dataset.motionInitialized = "true";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  page.dataset.motion = "on";

  const loop = page.querySelector<HTMLElement>("[data-chat-loop]");
  if (loop) controlarConversa(loop);
  const demo = page.querySelector<HTMLElement>("#demo");
  if (demo) controlarDemo(demo);
  revelarSecoes(page);
}

function controlarConversa(loop: HTMLElement) {
  const button = loop.querySelector<HTMLButtonElement>("[data-chat-pause]");
  const pauseIcon = button?.querySelector<HTMLElement>("[data-pause-icon]");
  const playIcon = button?.querySelector<HTMLElement>("[data-play-icon]");
  let visivel = true;
  let pausadoPeloUsuario = false;
  const sync = () => {
    loop.dataset.chatState = pausadoPeloUsuario ? "paused" : !visivel || document.hidden ? "offscreen" : "playing";
  };
  new IntersectionObserver(([e]) => { visivel = e.isIntersecting; sync(); }, { threshold: 0.15 }).observe(loop);
  document.addEventListener("visibilitychange", sync);
  if (button && pauseIcon && playIcon) {
    button.hidden = false;
    button.addEventListener("click", () => {
      pausadoPeloUsuario = !pausadoPeloUsuario;
      button.setAttribute("aria-pressed", String(pausadoPeloUsuario));
      button.setAttribute("aria-label", pausadoPeloUsuario ? "Reproduzir animação" : "Pausar animação");
      pauseIcon.hidden = pausadoPeloUsuario;
      playIcon.hidden = !pausadoPeloUsuario;
      sync();
    });
  }
  sync();
}

function controlarDemo(demo: HTMLElement) {
  const scene = demo.querySelector<HTMLElement>(".demo-scene");
  if (!scene) return;
  const button = demo.querySelector<HTMLButtonElement>("[data-demo-replay]");
  let visivel = false;
  let tocou = false;
  const tocar = () => {
    tocou = true;
    scene.classList.remove("is-playing");
    void scene.offsetWidth; // reinicia as animações CSS
    scene.classList.add("is-playing");
  };
  const sync = () => {
    if (visivel && !document.hidden && !tocou) tocar();
    scene.classList.toggle("is-paused", !visivel || document.hidden);
  };
  const repetir = () => { tocou = false; sync(); };
  new IntersectionObserver(([e]) => { visivel = e.isIntersecting; sync(); }, { threshold: 0.2 }).observe(scene);
  document.addEventListener("visibilitychange", sync);
  demo.addEventListener("home:demo-change", repetir);
  if (button) { button.hidden = false; button.addEventListener("click", repetir); }
}

// Entrada suave (sobe 28px e aparece) dos blocos ao entrar na tela. O que já
// está visível quando o script roda fica como está — esconder pra reanimar
// daria uma piscada, já que o script sobe depois do load.
function revelarSecoes(page: HTMLElement) {
  const grupos = page.querySelectorAll<HTMLElement>(".authority__intro, .authority__profiles, .home-centered-heading, .home-audience-grid, .home-comparison, .home-resource-list, .home-steps, #plans-grid, .home-final > .container");
  const comFilhos = ".home-audience-grid, .authority__profiles, .home-comparison, .home-resource-list, .home-steps, #plans-grid";
  const alturaTela = innerHeight;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      (entry.target as HTMLElement).querySelectorAll<HTMLElement>(":scope > .nf-rev, :scope.nf-rev").forEach((el) => el.classList.add("is-in"));
      if ((entry.target as HTMLElement).classList.contains("nf-rev")) entry.target.classList.add("is-in");
    });
  }, { threshold: 0.12 });
  grupos.forEach((grupo) => {
    if (grupo.getBoundingClientRect().top < alturaTela) return;
    const alvos = grupo.matches(comFilhos) ? [...grupo.children] as HTMLElement[] : [grupo];
    alvos.forEach((el, i) => { el.classList.add("nf-rev"); el.style.setProperty("--nf-rev-i", String(i)); });
    observer.observe(grupo);
  });
}
