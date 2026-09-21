import { pt, type CopyHome } from "./pt";
import { en } from "./en";
import { es } from "./es";

export type Lang = "pt-BR" | "en" | "es";
export type { CopyHome };

const COPY: Record<Lang, CopyHome> = { "pt-BR": pt, en, es };

export const copyHome = (lang: Lang): CopyHome => COPY[lang];

/** Prefixo das rotas: a home em português mora na raiz. */
export const raiz = (lang: Lang) => (lang === "pt-BR" ? "/" : `/${lang}`);

/**
 * Marcadores de copy → HTML. O espaço depois do <br /> não é descuido: no
 * celular algumas seções escondem o <br>, e sem ele as palavras se colam.
 * `{hl}` vira o destaque rosa da página, `{span}`
 * o destaque do bloco escuro e `\n` vira quebra de linha do título.
 * Usar sempre com set:html — o texto vem do nosso dicionário, não do visitante.
 */
export const marcar = (texto: string): string =>
  texto
    .replace(/\{hl\}([\s\S]*?)\{\/hl\}/g, '<span class="hl">$1</span>')
    .replace(/\{span\}([\s\S]*?)\{\/span\}/g, "<span>$1</span>")
    .replace(/\n/g, "<br /> ");
