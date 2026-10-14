// Status ao vivo dos sistemas (api.notifiquei.com.br/status/public).
// Uma consulta por página preenche todo elemento com [data-status-vivo]:
//   [data-status-texto]  → frase do estado geral
//   [data-status-hora]   → "conferido há X min"
//   [data-status-lista]  → um item por componente, com a cor de cada um
// Sem resposta em 6s, fica o texto neutro do HTML — nunca afirma "tudo ok"
// sem ter medido.

type Estado = "operational" | "degraded" | "outage" | "unknown";
interface Resposta {
  overall: Estado;
  generatedAt: string;
  components: { key: string; name: string; status: Estado }[];
  activeIncidents: unknown[];
}

const TEXTOS = {
  pt: {
    geral: { operational: "Todos os sistemas funcionando", degraded: "Alguns sistemas com lentidão", outage: "Instabilidade em andamento" },
    item: { operational: "Normal", degraded: "Lento", outage: "Fora do ar", unknown: "Sem dados" },
    agora: "conferido agora", ha: (m: number) => `conferido há ${m} min`,
    nomes: {
      webhook_reception: "Receber comentários e mensagens",
      queue: "Fila de envios",
      reply_comment: "Responder comentário",
      send_dm: "Enviar direct",
      meta_api: "Conexão com o Instagram (Meta)",
      database: "Banco de dados",
    } as Record<string, string>,
  },
  en: {
    geral: { operational: "All systems operational", degraded: "Some systems are slow", outage: "Ongoing incident" },
    item: { operational: "Normal", degraded: "Slow", outage: "Down", unknown: "No data" },
    agora: "checked just now", ha: (m: number) => `checked ${m} min ago`,
    nomes: {} as Record<string, string>,
  },
  es: {
    geral: { operational: "Todos los sistemas operativos", degraded: "Algunos sistemas lentos", outage: "Incidente en curso" },
    item: { operational: "Normal", degraded: "Lento", outage: "Caído", unknown: "Sin datos" },
    agora: "verificado ahora", ha: (m: number) => `verificado hace ${m} min`,
    nomes: {} as Record<string, string>,
  },
};

export function iniciarStatus() {
  const alvos = document.querySelectorAll<HTMLElement>("[data-status-vivo]");
  if (!alvos.length) return;
  const lang = document.documentElement.lang.slice(0, 2) as keyof typeof TEXTOS;
  const t = TEXTOS[lang] ?? TEXTOS.pt;
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), 6000);
  fetch("https://api.notifiquei.com.br/status/public", { signal: ctrl.signal, cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((d: Resposta | null) => {
      if (!d || !(d.overall in t.geral)) return;
      const geral = d.overall as keyof typeof t.geral;
      const min = Math.max(0, Math.round((Date.now() - Date.parse(d.generatedAt)) / 60000));
      alvos.forEach((el) => {
        el.dataset.estado = geral;
        el.querySelectorAll("[data-status-texto]").forEach((n) => (n.textContent = t.geral[geral]));
        el.querySelectorAll("[data-status-hora]").forEach((n) => (n.textContent = min < 1 ? t.agora : t.ha(min)));
        el.querySelectorAll<HTMLElement>("[data-status-lista]").forEach((ul) => {
          ul.replaceChildren(
            ...d.components.map((c) => {
              const li = document.createElement("li");
              li.dataset.estado = c.status in t.item ? c.status : "unknown";
              const nome = document.createElement("span");
              nome.textContent = t.nomes[c.key] ?? c.name;
              const est = document.createElement("small");
              est.textContent = t.item[li.dataset.estado as Estado];
              li.append(nome, est);
              return li;
            }),
          );
          ul.hidden = false;
        });
      });
    })
    .catch(() => undefined);
}
