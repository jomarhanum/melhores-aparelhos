// Lista de artigos com as artes de cada um, lida pelo workflow n8n "[MA] Redes sociais".
import type { APIRoute } from 'astro';
import { artesDoSite } from '../../lib/social';

const SITE = 'https://melhoresaparelhos.com.br';

export const GET: APIRoute = () => {
  const itens = artesDoSite().map(({ artigo: a, slug, ranking, arquivos }) => ({
    slug,
    url: SITE + a.url,
    titulo: a.titulo,
    h1: a.h1,
    descricao: a.descricao,
    resumo: a.resumo,
    categoria: a.categoria,
    secao: a.secao ?? '',
    publicado: a.publicado,
    imagens: arquivos.map((f) => `${SITE}/social/${f}.jpg`),
    ranking: ranking.map((p) => ({ rank: p.rank, nome: p.nome, selo: p.selo ?? '', idealPara: p.idealPara })),
  }));
  return new Response(JSON.stringify(itens), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
