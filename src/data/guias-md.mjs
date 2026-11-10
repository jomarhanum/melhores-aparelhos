// Lê os guias em Markdown (src/content/guias/*.md) para o registro de artigos.
// Roda também no astro.config.mjs (sitemap), onde a coleção de conteúdo ainda não existe,
// por isso lê os arquivos direto. Regra do frontmatter: um campo por linha, valor em JSON
// (ex.: titulo: "Texto", faq: [{"q":"...","a":"..."}]). O schema fica em src/content.config.ts.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const PASTA = join(process.cwd(), 'src', 'content', 'guias');

const lerFrontmatter = (texto, arquivo) => {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`Guia sem frontmatter: ${arquivo}`);
  const dados = {};
  for (const linha of m[1].split(/\r?\n/)) {
    const i = linha.indexOf(':');
    if (i < 1) continue;
    const valor = linha.slice(i + 1).trim();
    try { dados[linha.slice(0, i).trim()] = JSON.parse(valor); }
    catch { dados[linha.slice(0, i).trim()] = valor.replace(/^['"]|['"]$/g, ''); }
  }
  return { dados, corpo: m[2] };
};

/** @returns {import('./artigos.mjs').Artigo[]} */
export function guiasMarkdown() {
  if (!existsSync(PASTA)) return [];
  return readdirSync(PASTA)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((arquivo) => {
      const { dados: d, corpo } = lerFrontmatter(readFileSync(join(PASTA, arquivo), 'utf8'), arquivo);
      const palavras = corpo.split(/\s+/).filter(Boolean).length;
      return {
        url: `/guias/${arquivo.replace(/\.md$/, '')}/`,
        titulo: d.titulo,
        h1: d.h1,
        descricao: d.descricao,
        categoria: 'Guia',
        secao: d.secao,
        publicado: d.publicado,
        atualizado: d.atualizado,
        imagem: d.imagem,
        resumo: d.resumo,
        minutos: Math.max(3, Math.round(palavras / 200)),
      };
    });
}
