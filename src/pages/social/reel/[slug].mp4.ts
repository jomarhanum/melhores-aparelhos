import type { APIRoute, GetStaticPaths } from 'astro';
import { reelsDoSite, renderReel } from '../../../lib/reel';

export const getStaticPaths: GetStaticPaths = () => reelsDoSite().map((x) => ({ params: { slug: x.slug } }));

export const GET: APIRoute = async ({ params }) =>
  new Response(new Uint8Array(await renderReel(params.slug!)), { headers: { 'Content-Type': 'video/mp4' } });
