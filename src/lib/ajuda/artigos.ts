import { getCollection, type CollectionEntry } from "astro:content";
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

/** Índice enxuto para a busca no navegador (título, resumo e trecho). */
export function indiceDeBusca(artigos: Artigo[]) {
  return artigos.map((a) => ({
    t: a.data.titulo,
    r: a.data.resumo,
    c: categoriaPorId(a.data.categoria)?.titulo ?? "",
    u: urlDe(a),
    x: textoPuro(a.body ?? "").slice(0, 1200),
  }));
}

export { categorias, categoriaPorId };
