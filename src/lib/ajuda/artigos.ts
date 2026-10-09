import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;
import { categorias, categoriaPorId } from "../../data/ajuda-categorias";

export type Artigo = CollectionEntry<"ajuda">;

/** O id da coleção é "<categoria>/<slug>"; o slug é a última parte. */
export const slugDe = (a: Artigo) => a.id.split("/").pop() as string;
export const urlDe = (a: Artigo) => `/ajuda/${a.data.categoria}/${slugDe(a)}`;

export async function todosOsArtigos(): Promise<Artigo[]> {
  const lista = await getCollection("ajuda");
  return lista.sort((a, b) => a.data.ordem - b.data.ordem || a.data.titulo.localeCompare(b.data.titulo, "pt-BR"));
}

/** Artigos de uma categoria agrupados pelas seções, na ordem do cadastro. */
export function porSecao(artigos: Artigo[], categoriaId: string) {
  const cat = categoriaPorId(categoriaId);
  if (!cat) return [];
  const daCategoria = artigos.filter((a) => a.data.categoria === categoriaId);
  const secoes = cat.secoes.map((s) => ({ ...s, artigos: daCategoria.filter((a) => a.data.secao === s.id) }));
  const soltos = daCategoria.filter((a) => !cat.secoes.some((s) => s.id === a.data.secao));
  if (soltos.length) secoes.push({ id: "outros", titulo: "Outros", artigos: soltos });
  return secoes.filter((s) => s.artigos.length > 0);
}

/** Texto puro do Markdown (para a busca). */
export const textoPuro = (md: string) =>
  md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export async function postsDoBlog(): Promise<Post[]> {
  const lista = await getCollection("blog", ({ data }) => !data.draft);
  return lista.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Índice enxuto para a busca no navegador: artigos da ajuda + posts do blog
 * (a busca é a mesma nas duas partes; os endereços do blog não mudam).
 */
export function indiceDeBusca(artigos: Artigo[], posts: Post[] = []) {
  return [
    ...artigos.map((a) => ({
      t: a.data.titulo,
      r: a.data.resumo,
      c: categoriaPorId(a.data.categoria)?.titulo ?? "",
      u: urlDe(a),
      x: textoPuro(a.body ?? "").slice(0, 1200),
    })),
    ...posts.map((p) => ({
      t: p.data.title,
      r: p.data.description,
      c: "Blog",
      u: `/blog/${p.id}`,
      x: textoPuro(p.body ?? "").slice(0, 600),
    })),
  ];
}

const PALAVRAS_VAZIAS = new Set("a o as os de da do das dos e em no na nos nas um uma para pra por com sem que como se seu sua no instagram notifiquei direct dm mais vale qual quais o que é".split(" "));
const termos = (t: string) =>
  new Set(
    t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[^a-z0-9]+/)
      .filter((w) => w.length > 3 && !PALAVRAS_VAZIAS.has(w)),
  );

/** Artigos da ajuda mais ligados a um post do blog (por palavras em comum). */
export function ajudaParaPost(post: Post, artigos: Artigo[], max = 3): Artigo[] {
  const dele = termos(`${post.data.title} ${post.data.description} ${(post.data.tags ?? []).join(" ")}`);
  return artigos
    .map((a) => {
      const delas = termos(`${a.data.titulo} ${a.data.resumo}`);
      let n = 0;
      for (const w of dele) if (delas.has(w)) n++;
      return { a, n };
    })
    .filter((x) => x.n >= 2)
    .sort((x, y) => y.n - x.n)
    .slice(0, max)
    .map((x) => x.a);
}

export { categorias, categoriaPorId };
