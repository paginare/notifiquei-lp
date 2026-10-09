import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Carlos Duarte'),
    category: z.string().default('Estratégia'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    tldr: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

// Central de ajuda: um artigo por página (/ajuda/<categoria>/<slug>).
// Categoria e seção apontam para src/data/ajuda-categorias.ts.
const ajuda = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ajuda' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    categoria: z.enum(['primeiros-passos', 'automacoes', 'mensagem-nao-chegou', 'recursos', 'conta-e-cobranca']),
    secao: z.string(),
    ordem: z.number().default(50),
    atualizado: z.coerce.date(),
    popular: z.boolean().default(false),
    relacionados: z.array(z.string()).default([]),
    perguntas: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    // Âncora da página antiga (/ajuda#id) que deve abrir este artigo.
    antigo: z.string().optional(),
  }),
});

export const collections = { blog, ajuda };
