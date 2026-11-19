// Artes de redes sociais (ver src/lib/social.ts). Usadas pelo workflow n8n "[MA] Redes sociais".
import type { APIRoute, GetStaticPaths } from 'astro';
import { artesDoSite, renderArte } from '../../lib/social';

export const getStaticPaths: GetStaticPaths = () =>
  artesDoSite().flatMap((x) => x.arquivos.map((arquivo) => ({ params: { arquivo } })));

export const GET: APIRoute = async ({ params }) =>
  new Response(await renderArte(params.arquivo!), { headers: { 'Content-Type': 'image/jpeg' } });
