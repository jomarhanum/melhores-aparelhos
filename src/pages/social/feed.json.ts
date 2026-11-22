// Lista de artigos com as artes (e o Reel, nos comparativos) de cada um, lida pelos workflows n8n "[MA] Redes sociais" e "[MA] Reels".
import type { APIRoute } from 'astro';
import { artesDoSite } from '../../lib/social';
import { reelsDoSite } from '../../lib/reel';

const SITE = 'https://melhoresaparelhos.com.br';

export const GET: APIRoute = () => {
  const comReel = new Set(reelsDoSite().map((x) => x.slug));
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
    reel: comReel.has(slug) ? `${SITE}/social/reel/${slug}.mp4` : '',
    ranking: ranking.map((p) => ({ rank: p.rank, nome: p.nome, selo: p.selo ?? '', idealPara: p.idealPara })),
  }));
  return new Response(JSON.stringify(itens), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
