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

export const collections = { blog };
