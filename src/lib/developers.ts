/**
 * Página /developers (API de parceiros). A parte que muda com o produto —
 * rotas, limites, exemplos e novidades — NÃO mora aqui: vem da própria API,
 * que gera tudo do código a cada subida (repo instaV2, backend/src/partners/):
 *   - https://api.notifiquei.com.br/partners/openapi.json
 *   - https://api.notifiquei.com.br/partners/novidades
 *
 * As mesmas funções rodam duas vezes: no build (HTML já sai preenchido, bom
 * para busca e para quem está sem JS) e no navegador, que relê a API ao abrir
 * a página. Assim, rota nova ou novidade nova aparece aqui sem novo deploy do
 * site. Se a API não responder, fica o que veio do build.
 */

export const API = "https://api.notifiquei.com.br";
export const URL_OPENAPI = `${API}/partners/openapi.json`;
export const URL_NOVIDADES = `${API}/partners/novidades`;
export const URL_REFERENCIA = "/developers/referencia";

export interface Novidade {
  data: string;
  versao: string;
  tipo: "novo" | "mudanca" | "conserto" | "aviso";
  titulo: string;
  texto: string[];
  exigeAcao: boolean;
}

export interface Rota {
  metodo: string;
  caminho: string;
  resumo: string;
  limite?: number;
  tag: string;
  operationId?: string;
}

export interface Exemplo {
  metodo: string;
  caminho: string;
  titulo: string;
  descricao?: string;
  corpo: unknown;
}

const METODOS = ["get", "post", "put", "patch", "delete"] as const;

export const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** `código` → <code>, **negrito** → <strong>. Só o básico, depois de escapar. */
const md = (s: string) =>
  esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

const dataBr = (iso: string) => String(iso).split("-").reverse().join("/");

/** Busca JSON com prazo. Nunca lança: devolve null se falhar. */
export async function buscarJson<T>(url: string, ms = 8000): Promise<T | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    const r = await fetch(url, { signal: ctrl.signal, headers: { Accept: "application/json" } });
    clearTimeout(t);
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

export function rotasDoDocumento(doc: any): Rota[] {
  const rotas: Rota[] = [];
  for (const [caminho, item] of Object.entries<any>(doc?.paths ?? {})) {
    for (const metodo of METODOS) {
      const op = item?.[metodo];
      if (!op) continue;
      rotas.push({
        metodo: metodo.toUpperCase(),
        caminho,
        resumo: op.summary ?? "",
        limite: op["x-limite-por-minuto"],
        tag: op.tags?.[0] ?? "Outros",
        operationId: op.operationId,
      });
    }
  }
  return rotas;
}

/** Exemplos de corpo que a API publica nas rotas POST/PATCH (os mesmos do "Try it out"). */
export function exemplosDoDocumento(doc: any): Exemplo[] {
  const lista: Exemplo[] = [];
  for (const [caminho, item] of Object.entries<any>(doc?.paths ?? {})) {
    for (const metodo of METODOS) {
      const exs = item?.[metodo]?.requestBody?.content?.["application/json"]?.examples;
      if (!exs) continue;
      for (const ex of Object.values<any>(exs)) {
        if (ex?.value === undefined) continue;
        lista.push({ metodo: metodo.toUpperCase(), caminho, titulo: ex.summary ?? "Exemplo", descricao: ex.description, corpo: ex.value });
      }
    }
  }
  return lista;
}

export function bloco(codigo: string, rotulo = "Copiar") {
  return `<div class="dv-codigo"><button type="button" class="dv-copiar" data-copiar>${esc(rotulo)}</button><pre><code>${esc(codigo)}</code></pre></div>`;
}

export function curl(metodo: string, caminho: string, corpo?: unknown) {
  const linhas = [`curl -X ${metodo} ${API}${caminho} \\`, `  -H "X-API-Key: SUA_CHAVE_AQUI"`];
  if (corpo !== undefined) {
    linhas[1] += " \\";
    linhas.push(`  -H "Content-Type: application/json" \\`);
    linhas.push(`  -d '${JSON.stringify(corpo, null, 2).replace(/'/g, "'\\''")}'`);
  }
  return linhas.join("\n");
}

const ancoraReferencia = (r: Rota) =>
  r.operationId ? `${URL_REFERENCIA}#/${encodeURIComponent(r.tag)}/${encodeURIComponent(r.operationId)}` : URL_REFERENCIA;

export function htmlRotas(rotas: Rota[]) {
  if (!rotas.length) {
    return `<p class="dv-vazio">Não consegui carregar a lista agora. Ela está sempre completa na <a href="${URL_REFERENCIA}">referência</a>.</p>`;
  }
  const grupos = new Map<string, Rota[]>();
  for (const r of rotas) grupos.set(r.tag, [...(grupos.get(r.tag) ?? []), r]);
  const linhas = [...grupos.entries()]
    .map(
      ([tag, rs]) =>
        `<tr class="dv-grupo"><th colspan="3" scope="colgroup">${esc(tag)}</th></tr>` +
        rs
          .map(
            (r) => `<tr>
  <td><span class="dv-metodo dv-m-${esc(r.metodo.toLowerCase())}">${esc(r.metodo)}</span></td>
  <td><a href="${esc(ancoraReferencia(r))}"><code>${esc(r.caminho)}</code></a><span class="dv-resumo">${esc(r.resumo)}</span></td>
  <td class="dv-num">${r.limite ? `${esc(r.limite)} por minuto` : "—"}</td>
</tr>`,
          )
          .join(""),
    )
    .join("");
  return `<div class="dv-tabela"><table>
<thead><tr><th scope="col">Tipo</th><th scope="col">Rota</th><th scope="col">Limite</th></tr></thead>
<tbody>${linhas}</tbody></table></div>`;
}

export function htmlExemplos(exemplos: Exemplo[]) {
  if (!exemplos.length) {
    return `<p class="dv-vazio">Não consegui carregar os exemplos agora. Eles estão prontos para testar na <a href="${URL_REFERENCIA}">referência</a>.</p>`;
  }
  return exemplos
    .map(
      (e, i) => `<details class="dv-det"${i === 0 ? " open" : ""}>
  <summary><span class="dv-metodo dv-m-${esc(e.metodo.toLowerCase())}">${esc(e.metodo)}</span> <code>${esc(e.caminho)}</code> — ${esc(e.titulo)}</summary>
  ${e.descricao ? `<p>${md(e.descricao)}</p>` : ""}
  ${bloco(curl(e.metodo, e.caminho, e.corpo))}
</details>`,
    )
    .join("\n");
}

const ROTULO_TIPO: Record<string, string> = { novo: "Novo", mudanca: "Mudança", conserto: "Conserto", aviso: "Aviso" };

export function htmlNovidades(lista: Novidade[] | null) {
  if (!lista) {
    return `<p class="dv-vazio">Não consegui carregar as novidades agora. Elas também ficam em <a href="${URL_NOVIDADES}"><code>/partners/novidades</code></a>.</p>`;
  }
  if (!lista.length) return `<p class="dv-vazio">Nada novo por enquanto.</p>`;
  return lista
    .map(
      (n) => `<article class="dv-novidade">
  <div class="dv-novidade__topo">
    <span class="dv-selo dv-selo--${esc(n.tipo)}">${esc(ROTULO_TIPO[n.tipo] ?? n.tipo)}</span>
    <time datetime="${esc(n.data)}">${esc(dataBr(n.data))}</time>
    <span class="dv-versao">v${esc(n.versao)}</span>
    ${n.exigeAcao ? `<span class="dv-selo dv-selo--aviso">Precisa mudar a integração</span>` : `<span class="dv-nada">Não precisa mudar nada</span>`}
  </div>
  <h3>${esc(n.titulo)}</h3>
  ${(n.texto ?? []).map((p) => `<p>${md(p)}</p>`).join("\n  ")}
</article>`,
    )
    .join("\n");
}

export function htmlUltima(lista: Novidade[] | null) {
  const n = lista?.[0];
  return n ? `Última novidade: <a href="#novidades">${esc(n.titulo)}</a> (${esc(dataBr(n.data))})` : "";
}

export const versaoApi = (doc: any) => (doc?.info?.version ? `Versão ${esc(doc.info.version)}` : "");
