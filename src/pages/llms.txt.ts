// llms.txt: resumo do site para buscadores e assistentes de IA (padrão llmstxt.org).
// Gerado a partir do registro de artigos, então acompanha cada categoria nova.
import type { APIRoute } from 'astro';
import { site, author } from '../data/site';
import { artigos } from '../data/artigos.mjs';
import { categorias, grupos } from '../data/categorias.mjs';

export const GET: APIRoute = () => {
  const url = (u: string) => `${site.url}${u}`;
  const linha = (a: { h1: string; url: string; resumo: string }) => `- [${a.h1}](${url(a.url)}): ${a.resumo}`;
  const secoes = categorias.map((c) => {
    const itens = artigos.filter((a) => a.secao === c.id);
    const hub = itens.find((a) => a.url === c.hub);
    const resto = itens.filter((a) => a !== hub);
    return [`## ${c.nome}`, '', ...(hub ? [linha(hub)] : []), ...resto.map(linha)].join('\n');
  });
  const texto = `# ${site.name}

> ${site.description} Comparativos com 10 modelos por categoria, prós e contras, resumo das opiniões de compradores e dados oficiais do Inmetro (consumo de energia e de água) quando disponíveis.

Escrito por ${author.name} (${author.role}). Os comparativos são baseados em pesquisa: especificações dos fabricantes e das lojas, tabelas do Inmetro e os principais guias de compra do Brasil. Não são testes de laboratório. Preços não são publicados porque mudam com frequência. O site participa dos programas de afiliados da Amazon e do Mercado Livre.

## Páginas principais

- [Home](${url('/')}): todas as categorias e guias.
${grupos.map((g) => `- [${g.nome}](${url(g.url)}): comparativos e guias de ${g.nome.toLowerCase()}.`).join('\n')}
- [Todos os guias](${url('/guias/')}): guias práticos de compra, consumo e instalação.
- [Sobre e metodologia](${url('/sobre/')}): como os comparativos são feitos.
- [Divulgação de afiliados](${url('/divulgacao-de-afiliados/')}): como o site é financiado.

${secoes.join('\n\n')}
`;
  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
