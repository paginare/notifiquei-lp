/**
 * Gera a imagem de compartilhamento (1200x630) de cada post do blog.
 *
 * Roda no build: satori monta o SVG a partir de uma árvore de elementos e o
 * resvg converte pra PNG. As fontes vêm de src/assets/og-fonts em .ttf porque
 * o satori não lê woff2 (as woff2 de public/assets/fonts são pro navegador).
 *
 * Paleta e tipografia espelham src/styles/tokens.css. Se os tokens mudarem lá,
 * atualizar aqui também.
 */
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";

const FONTS_DIR = path.join(process.cwd(), "src/assets/og-fonts");
const bricolage = fs.readFileSync(path.join(FONTS_DIR, "bricolage-800.ttf"));
const jakarta = fs.readFileSync(path.join(FONTS_DIR, "jakarta-600.ttf"));

// tokens.css
const PAPER = "#FAF6EF";
const INK = "#14100E";
const INK_SOFT = "#5F564D";
const BRAND = "#FF1F6D";

type Node = { type: string; props: Record<string, unknown> };

const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: children === undefined ? { style } : { style, children },
});

/** Título longo precisa de corpo menor pra caber nas 3 linhas sem cortar. */
function titleSize(title: string): number {
  const n = title.length;
  if (n > 72) return 56;
  if (n > 58) return 64;
  if (n > 44) return 72;
  return 80;
}

export async function renderOgImage(title: string, category: string): Promise<Buffer> {
  const tree = el(
    "div",
    {
      width: 1200,
      height: 630,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: PAPER,
      padding: "68px 76px",
      position: "relative",
    },
    [
      // brilho rosa da marca, canto inferior direito
      el("div", {
        position: "absolute",
        right: -170,
        bottom: -210,
        width: 620,
        height: 620,
        borderRadius: 9999,
        backgroundColor: "rgba(255, 31, 109, 0.10)",
        display: "flex",
      }),
      // filete rosa no topo
      el("div", {
        position: "absolute",
        top: 0,
        left: 0,
        width: 1200,
        height: 10,
        backgroundColor: BRAND,
        display: "flex",
      }),

      // cabeçalho: marca + categoria
      el("div", { display: "flex", alignItems: "center" }, [
        el(
          "div",
          {
            fontFamily: "Jakarta",
            fontSize: 25,
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: INK,
            display: "flex",
          },
          "NOTIFIQUEI",
        ),
        el("div", {
          width: 7,
          height: 7,
          borderRadius: 9999,
          backgroundColor: BRAND,
          margin: "0 18px",
          display: "flex",
        }),
        el(
          "div",
          {
            fontFamily: "Jakarta",
            fontSize: 25,
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: BRAND,
            display: "flex",
          },
          category.toUpperCase(),
        ),
      ]),

      // título
      el(
        "div",
        {
          fontFamily: "Bricolage",
          fontSize: titleSize(title),
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-0.025em",
          color: INK,
          display: "flex",
          maxWidth: 1000,
        },
        title,
      ),

      // rodapé
      el(
        "div",
        {
          fontFamily: "Jakarta",
          fontSize: 26,
          fontWeight: 600,
          color: INK_SOFT,
          display: "flex",
        },
        "notifiquei.com.br/blog",
      ),
    ],
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Bricolage", data: bricolage, weight: 800, style: "normal" },
      { name: "Jakarta", data: jakarta, weight: 600, style: "normal" },
    ],
  });

  return Buffer.from(new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng());
}
