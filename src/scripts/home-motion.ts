import { gsap } from "gsap";

// Animations enhance complete server-rendered examples; disabling motion or JS
// leaves the copy, conversations, navigation and checkout links usable.
export function initHomeMotion() {
  const page = document.querySelector<HTMLElement>(".home-page");
  if (!page || page.dataset.motionInitialized) return;
  page.dataset.motionInitialized = "true";
  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    const context = gsap.context(() => {}, page);
    const cleanups: Array<() => void> = [];
    page.dataset.motion = "on";

    context.add(() => {
      // Hero sem animação de entrada: esconder o texto até o JS rodar jogava o LCP
      // para ~13s no mobile throttled do PageSpeed. O hero é o LCP; aparece pronto.
      const loop = page.querySelector<HTMLElement>("[data-chat-loop]");
      if (loop) cleanups.push(animateConversation(loop));
      const demo = page.querySelector<HTMLElement>("#demo");
      if (demo) cleanups.push(animateDemo(demo, context));

      // Native intersection observation keeps scroll free and doesn't pin content.
      const groups = page.querySelectorAll<HTMLElement>(".authority__intro, .authority__profiles, .home-centered-heading, .home-audience-grid, .home-comparison, .home-resource-list, .home-steps, #plans-grid, .home-final > .container");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const group = entry.target;
          const children = group.matches(".home-audience-grid, .authority__profiles, .home-comparison, .home-resource-list, .home-steps, #plans-grid") ? [...group.children] : [group];
          context.add(() => {
            gsap.fromTo(children, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .75, stagger: .085, ease: "power3.out", clearProps: "transform,opacity" });
          });
        });
      }, { threshold: .12 });
      groups.forEach((group) => observer.observe(group));
      cleanups.push(() => observer.disconnect());
    });

    return () => {
      context.revert();
      cleanups.forEach((cleanup) => cleanup());
      page.dataset.motion = "off";
    };
  });
  document.addEventListener("astro:before-swap", () => media.revert(), { once: true });
}

function snapshotStyles(elements: Iterable<Element>) {
  const styles = [...elements].map((element) => [element, element.getAttribute("style")] as const);
  return () => styles.forEach(([element, style]) => {
    if (style === null) element.removeAttribute("style");
    else element.setAttribute("style", style);
  });
}

function animateConversation(loop: HTMLElement) {
  const restoreStyles = snapshotStyles(loop.querySelectorAll("*"));
  const exchanges = [...loop.querySelectorAll<HTMLElement>("[data-chat-exchange]")];
  const dots = [...loop.querySelectorAll<HTMLElement>("[data-chat-dot]")];
  const button = loop.querySelector<HTMLButtonElement>("[data-chat-pause]")!;
  const pauseIcon = button.querySelector<HTMLElement>("[data-pause-icon]")!;
  const playIcon = button.querySelector<HTMLElement>("[data-play-icon]")!;
  const timeline = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: "power3.out" } });
  gsap.set(exchanges, { autoAlpha: 0 });

  exchanges.forEach((exchange, index) => {
    const find = (name: string) => exchange.querySelector<HTMLElement>(`[data-chat-${name}]`)!;
    const incoming = find("incoming"), typing = find("typing"), answer = find("answer");
    const link = find("link"), reaction = find("reaction"), receipt = find("receipt"), thanks = find("thanks");
    const parts = [incoming, typing, answer, link, reaction, receipt, thanks];
    gsap.set(parts, { autoAlpha: 0 });
    const start = index * 7.5;
    timeline
      .set(exchange, { autoAlpha: 1, y: 0 }, start)
      .call(() => {
        exchanges.forEach((item, i) => item.setAttribute("aria-hidden", String(i !== index)));
        dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
        loop.dataset.chatPhase = "incoming";
        loop.dataset.chatExample = String(index);
      }, [], start)
      .fromTo(incoming, { autoAlpha: 0, y: 62, scale: .95 }, { autoAlpha: 1, y: 10, scale: 1, duration: .65, ease: "back.out(1.3)" }, start + .08)
      .fromTo(typing, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: .25 }, start + .9)
      .call(() => { loop.dataset.chatPhase = "typing"; }, [], start + .9)
      .fromTo(typing.querySelectorAll("i"), { y: 0, opacity: .4 }, { y: -4, opacity: 1, duration: .18, stagger: .1, repeat: 3, yoyo: true }, start + 1)
      .to(incoming, { y: -3, duration: .6 }, start + 1.6)
      .to(typing, { autoAlpha: 0, y: -5, duration: .18 }, start + 1.9)
      .fromTo(answer, { autoAlpha: 0, y: 48, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: .65, ease: "back.out(1.15)" }, start + 2)
      .call(() => { loop.dataset.chatPhase = "reply"; }, [], start + 2)
      .fromTo(link, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .4 }, start + 2.35)
      .fromTo(reaction, { autoAlpha: 0, scale: .3 }, { autoAlpha: 1, scale: 1, duration: .45, ease: "back.out(2)" }, start + 2.8)
      .fromTo(receipt, { autoAlpha: 0, y: 5 }, { autoAlpha: 1, y: 0, duration: .3 }, start + 2.9)
      .fromTo(thanks, { autoAlpha: 0, y: 27, scale: .97 }, { autoAlpha: 1, y: 0, scale: 1, duration: .5, ease: "back.out(1.2)" }, start + 3.7)
      .call(() => { loop.dataset.chatPhase = "complete"; }, [], start + 4.2)
      .to(exchange, { y: -68, autoAlpha: 0, duration: .55, ease: "power2.in" }, start + 6.85);
  });

  let visible = false;
  let userPaused = false;
  const sync = () => {
    const playing = visible && !document.hidden && !userPaused;
    timeline.paused(!playing);
    loop.dataset.chatState = playing ? "playing" : userPaused ? "paused" : "offscreen";
  };
  const toggle = () => {
    userPaused = !userPaused;
    button.setAttribute("aria-pressed", String(userPaused));
    button.setAttribute("aria-label", userPaused ? "Reproduzir animação" : "Pausar animação");
    pauseIcon.hidden = userPaused;
    playIcon.hidden = !userPaused;
    sync();
  };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .15 });
  observer.observe(loop);
  button.hidden = false;
  button.addEventListener("click", toggle);
  document.addEventListener("visibilitychange", sync);

  return () => {
    observer.disconnect();
    timeline.kill();
    button.removeEventListener("click", toggle);
    document.removeEventListener("visibilitychange", sync);
    button.hidden = true;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", "Pausar animação");
    pauseIcon.hidden = false;
    playIcon.hidden = true;
    exchanges.forEach((item, i) => item.setAttribute("aria-hidden", String(i !== 0)));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === 0));
    delete loop.dataset.chatState;
    delete loop.dataset.chatPhase;
    delete loop.dataset.chatExample;
    restoreStyles();
  };
}

function animateDemo(demo: HTMLElement, context: gsap.Context) {
  const restoreStyles = snapshotStyles(demo.querySelectorAll(".demo-scene, .demo-scene *"));
  const scene = demo.querySelector<HTMLElement>(".demo-scene")!;
  const button = demo.querySelector<HTMLButtonElement>("[data-demo-replay]")!;
  const comment = demo.querySelector<HTMLElement>(".demo__comment")!;
  const connection = demo.querySelector<HTMLElement>(".demo__connection")!;
  const typing = demo.querySelector<HTMLElement>("[data-demo-typing]")!;
  const message = demo.querySelector<HTMLElement>(".demo__message")!;
  const link = demo.querySelector<HTMLElement>(".demo__product-link")!;
  const sent = demo.querySelector<HTMLElement>(".demo__sent")!;
  const notification = demo.querySelector<HTMLElement>(".demo__notification")!;
  let timeline: gsap.core.Timeline | undefined;
  let visible = false;
  let played = false;

  const play = () => context.add(() => {
    timeline?.revert();
    played = true;
    scene.dataset.demoPhase = "incoming";
    timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo(comment, { autoAlpha: 0, y: 38, scale: .94 }, { autoAlpha: 1, y: 0, scale: 1, duration: .55 })
      .fromTo(connection, { autoAlpha: 0 }, { autoAlpha: 1, duration: .35 }, .4)
      .fromTo(typing, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .3 }, .75)
      .call(() => { scene.dataset.demoPhase = "typing"; }, [], .75)
      .fromTo(typing.querySelectorAll("i"), { y: 0, opacity: .4 }, { y: -4, opacity: 1, duration: .18, stagger: .1, repeat: 3, yoyo: true }, .85)
      .to(typing, { autoAlpha: 0, duration: .15 }, 1.8)
      .fromTo(message, { autoAlpha: 0, y: 34, scale: .97 }, { autoAlpha: 1, y: 0, scale: 1, duration: .65, ease: "back.out(1.1)" }, 1.9)
      .call(() => { scene.dataset.demoPhase = "reply"; }, [], 1.9)
      .fromTo(link, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .4 }, 2.3)
      .fromTo(sent, { autoAlpha: 0 }, { autoAlpha: 1, duration: .35 }, 2.6)
      .fromTo(notification, { autoAlpha: 0, y: 20, scale: .95 }, { autoAlpha: 1, y: 0, scale: 1, duration: .55, ease: "back.out(1.5)" }, 2.8)
      .call(() => { scene.dataset.demoPhase = "complete"; }, [], 3.35);
  });
  const sync = () => {
    if (visible && !document.hidden && !played) play();
    timeline?.paused(!visible || document.hidden);
  };
  const requestReplay = () => { played = false; sync(); };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }, { threshold: .2 });
  observer.observe(scene);
  button.hidden = false;
  demo.addEventListener("home:demo-change", requestReplay);
  button.addEventListener("click", requestReplay);
  document.addEventListener("visibilitychange", sync);

  return () => {
    observer.disconnect();
    timeline?.revert();
    demo.removeEventListener("home:demo-change", requestReplay);
    button.removeEventListener("click", requestReplay);
    document.removeEventListener("visibilitychange", sync);
    button.hidden = true;
    delete scene.dataset.demoPhase;
    restoreStyles();
  };
}
