import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOgImage } from "../../../lib/og-image";

// Uma imagem por post, gerada no build: /blog/og/<slug>.png
// Fica fora de /blog/<slug> pra não colidir com a rota do artigo.
export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: { data: { title: string; category: string } } };
  const png = await renderOgImage(post.data.title, post.data.category);

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
