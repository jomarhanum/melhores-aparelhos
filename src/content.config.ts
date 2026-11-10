// Guias em Markdown (src/content/guias/<slug>.md), publicados pelo workflow do n8n ou à mão.
// Cada arquivo vira /guias/<slug>/ com o layout Artigo e entra sozinho no registro de artigos
// (sitemap, página de guias, "Leia também" e bloco de guias do hub). Ver src/data/guias-md.mjs.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categorias } from './data/categorias.mjs';

const secoes = categorias.map((c) => c.id) as [string, ...string[]];

const guias = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guias' }),
  schema: z.object({
    titulo: z.string().min(20).max(70),
    h1: z.string().min(10),
    descricao: z.string().min(80).max(170),
    secao: z.enum(secoes),
    publicado: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    atualizado: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    imagem: z.string().startsWith('/images/'),
    resumo: z.string().min(10),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    relacionados: z.array(z.string()).optional(),
  }),
});

export const collections = { guias };
