// Artes para Facebook/Instagram (1080x1350, JPEG), geradas no build em /social/<slug>.jpg.
// Os comparativos principais ganham carrossel: /social/<slug>-2.jpg a -5.jpg (os 4 primeiros do ranking).
// O texto é desenhado pelo resvg com a fonte Figtree (src/assets/fonts), sem depender das fontes do sistema.
// As larguras dos caracteres (larguras.json) servem para quebrar as linhas.
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

import { join } from 'node:path';
import { artigos } from '../data/artigos.mjs';
import { todosProdutos } from '../data/catalogo';
import { fotoProduto, type Produto } from '../data/tipos';
import larguras from '../assets/fonts/larguras.json';

const W = 1080, H = 1350, M = 72;
const raiz = process.cwd();
const fontes = [join(raiz, 'src/assets/fonts/figtree-500.ttf'), join(raiz, 'src/assets/fonts/figtree-800.ttf')];

type Artigo = { url: string; titulo: string; h1: string; descricao: string; resumo: string; categoria: string; secao?: string; publicado: string; atualizado?: string; imagem?: string };

export const slugDe = (url: string) => url.split('/').filter(Boolean).pop()!;

export const rankingDe = (url: string): Produto[] =>
  todosProdutos.filter((p) => p.hub === url).sort((a, b) => a.rank - b.rank).slice(0, 4);

/** Lista de artes por artigo: a capa e, nos comparativos principais, 4 slides de produto. */
export function artesDoSite() {
  const vistos = new Set<string>();
  return (artigos as Artigo[]).map((a) => {
    const slug = slugDe(a.url);
    if (vistos.has(slug)) throw new Error(`Slug social repetido: ${slug}`);
    vistos.add(slug);
    const ranking = a.categoria === 'Comparativo' ? rankingDe(a.url) : [];
    const arquivos = [slug, ...ranking.map((_, i) => `${slug}-${i + 2}`)];
    return { artigo: a, slug, ranking, arquivos };
  });
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const largura = (t: string, tam: number, peso: 500 | 800, espaco = 0) => {
  const tab = (larguras as Record<string, Record<string, number>>)[String(peso)];
  let s = 0;
  for (const c of t) s += (tab[c] ?? 0.6) * tam + espaco;
  return s;
};

/** Quebra o texto em linhas que cabem em `max` px; corta com reticências depois de `maxLinhas`. */
function quebra(texto: string, tam: number, peso: 500 | 800, max: number, maxLinhas: number) {
  const linhas: string[] = [];
  let atual = '';
  for (const p of texto.split(/\s+/).filter(Boolean)) {
    const teste = atual ? `${atual} ${p}` : p;
    if (largura(teste, tam, peso) <= max || !atual) atual = teste;
    else { linhas.push(atual); atual = p; }
  }
  if (atual) linhas.push(atual);
  if (linhas.length > maxLinhas) {
    const cortadas = linhas.slice(0, maxLinhas);
    let ult = cortadas[maxLinhas - 1];
    while (largura(ult + '…', tam, peso) > max && ult.includes(' ')) ult = ult.slice(0, ult.lastIndexOf(' '));
    cortadas[maxLinhas - 1] = ult.replace(/[,.;:]$/, '') + '…';
    return { linhas: cortadas, cortou: true };
  }
  return { linhas, cortou: false };
}

const textoSvg = (linhas: string[], x: number, y: number, tam: number, peso: 500 | 800, cor: string, alt = 1.12, ancora = 'start') =>
  linhas.map((l, i) => `<text x="${x}" y="${Math.round(y + i * tam * alt)}" font-family="Figtree" font-size="${tam}" font-weight="${peso}" fill="${cor}" text-anchor="${ancora}">${esc(l)}</text>`).join('');

const fundo = `<defs><linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#0b5cab"/><stop offset="1" stop-color="#083f78"/></linearGradient>
  <filter id="s" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#021a33" flood-opacity=".28"/></filter></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="${W}" cy="0" r="300" fill="#fff" opacity=".1"/><circle cx="0" cy="${H}" r="260" fill="#6cb4ff" opacity=".16"/>`;

const marca = `<g transform="translate(${M} 74) scale(.75)"><rect width="64" height="64" rx="16" fill="#0b5cab"/><path d="M32 12v40M14.7 22l34.6 20M14.7 42l34.6-20" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M26 15l6 5 6-5M26 49l6-5 6 5" stroke="#6cb4ff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <text x="${M + 66}" y="${74 + 37}" font-family="Figtree" font-size="26" font-weight="800" letter-spacing="3.5" fill="#bfe0ff">MELHORES APARELHOS</text>`;

const pilula = (texto: string, x: number, y: number, fundoCor: string, cor: string, tam = 24, ancora: 'start' | 'middle' = 'start') => {
  const l = largura(texto, tam, 800, 2) + 40, h = tam * 2.1;
  const x0 = ancora === 'middle' ? x - l / 2 : x;
  return `<rect x="${x0}" y="${y}" width="${l}" height="${h}" rx="${h / 2}" fill="${fundoCor}"/><text x="${x0 + l / 2}" y="${y + h / 2 + tam * 0.36}" text-anchor="middle" font-family="Figtree" font-size="${tam}" font-weight="800" letter-spacing="2" fill="${cor}">${esc(texto)}</text>`;
};
const site = (y = 1222) => pilula('melhoresaparelhos.com.br', W / 2, y, 'rgba(255,255,255,.16)', '#fff', 28, 'middle');

/** Foto do produto (WebP do site) encaixada numa caixa, como PNG embutido no SVG. */
async function foto(caminho: string, w: number, h: number, x: number, y: number) {
  const buf = await sharp(join(raiz, 'public', caminho)).resize(w, h, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
  return `<image x="${x}" y="${y}" width="${w}" height="${h}" href="data:image/png;base64,${buf.toString('base64')}"/>`;
}

const nomeCurto = (p: Produto) => `${p.marca} ${p.modelo.split(' (')[0]}`;

async function capa(a: Artigo, ranking: Produto[]) {
  const tag = a.categoria === 'Comparativo' ? ['COMPARATIVO ' + a.publicado.slice(0, 4), '#ffd84d', '#3a2a00'] : a.categoria === 'Review' ? ['REVIEW', '#ffd84d', '#3a2a00'] : ['GUIA PRÁTICO', '#bfe0ff', '#083f78'];
  let partes = [fundo, marca, pilula(tag[0], M, 150, tag[1], tag[2])];
  const maxW = W - 2 * M;
  let tam = 80, t = quebra(a.h1, tam, 800, maxW, 3);
  if (t.cortou) { tam = 68; t = quebra(a.h1, tam, 800, maxW, 4); }
  let y = 150 + 50 + 34 + tam;
  partes.push(textoSvg(t.linhas, M, y, tam, 800, '#fff', 1.08));
  y += (t.linhas.length - 1) * tam * 1.08 + 30;
  const r = quebra(a.resumo || a.descricao, 32, 500, maxW, 3);
  partes.push(textoSvg(r.linhas, M, y + 32, 32, 500, '#d6e9fb', 1.32));
  y += 32 + (r.linhas.length - 1) * 32 * 1.32 + 44;
  const topo = Math.round(y), base = 1180, alt = base - topo;
  if (ranking.length >= 4) {
    const g = 20, cw = (maxW - g) / 2, ch = (alt - g) / 2;
    for (let i = 0; i < 4; i++) {
      const p = ranking[i], cx = M + (i % 2) * (cw + g), cy = topo + Math.floor(i / 2) * (ch + g);
      partes.push(`<rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="26" fill="#fff" filter="url(#s)"/>`);
      const fh = Math.max(80, ch - 110);
      partes.push(await foto(fotoProduto(p), Math.round(cw - 60), Math.round(fh), Math.round(cx + 30), Math.round(cy + 22)));
      partes.push(`<text x="${cx + cw / 2}" y="${cy + ch - 56}" text-anchor="middle" font-family="Figtree" font-size="22" font-weight="800" letter-spacing="1.5" fill="#0b5cab">${esc((p.selo || `Nº ${p.rank} no ranking`).toUpperCase())}</text>`);
      const n = quebra(nomeCurto(p), 25, 800, cw - 40, 1);
      partes.push(textoSvg(n.linhas, cx + cw / 2, cy + ch - 22, 25, 800, '#1b2430', 1.1, 'middle'));
    }
  } else {
    partes.push(`<rect x="${M}" y="${topo}" width="${maxW}" height="${alt}" rx="30" fill="#fff" filter="url(#s)"/>`);
    if (a.imagem) partes.push(await foto(a.imagem, maxW - 120, alt - 80, M + 60, topo + 40));
  }
  partes.push(site());
  return partes.join('');
}

async function slideProduto(a: Artigo, p: Produto) {
  const maxW = W - 2 * M;
  const partes = [fundo, marca];
  partes.push(`<circle cx="${M + 56}" cy="216" r="56" fill="#ffd84d"/><text x="${M + 56}" y="236" text-anchor="middle" font-family="Figtree" font-size="54" font-weight="800" fill="#3a2a00">${p.rank}º</text>`);
  if (p.selo) partes.push(pilula(p.selo.toUpperCase(), M + 136, 190, 'rgba(255,255,255,.16)', '#fff', 22));
  partes.push(`<rect x="${M}" y="300" width="${maxW}" height="520" rx="30" fill="#fff" filter="url(#s)"/>`);
  partes.push(await foto(fotoProduto(p), maxW - 120, 440, M + 60, 340));
  const n = quebra(p.nome, 52, 800, maxW, 2);
  let y = 900;
  partes.push(textoSvg(n.linhas, M, y, 52, 800, '#fff', 1.1));
  y += (n.linhas.length - 1) * 52 * 1.1 + 58;
  const i = quebra('Ideal para: ' + p.idealPara, 31, 500, maxW, 3);
  partes.push(textoSvg(i.linhas, M, y, 31, 500, '#d6e9fb', 1.32));
  partes.push(`<text x="${W / 2}" y="1196" text-anchor="middle" font-family="Figtree" font-size="26" font-weight="500" fill="#bfe0ff">${esc(`Ranking completo: ${a.h1.split(':')[0]}`)}</text>`);
  partes.push(site(1222));
  return partes.join('');
}

/** Gera o JPEG de um arquivo (slug ou slug-N). */
export async function renderArte(arquivo: string): Promise<Buffer> {
  const item = artesDoSite().find((x) => x.arquivos.includes(arquivo));
  if (!item) throw new Error(`Arte desconhecida: ${arquivo}`);
  const idx = item.arquivos.indexOf(arquivo);
  const corpo = idx === 0 ? await capa(item.artigo, item.ranking) : await slideProduto(item.artigo, item.ranking[idx - 1]);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${corpo}</svg>`;
  const png = new Resvg(svg, { font: { fontFiles: fontes, loadSystemFonts: false, defaultFontFamily: 'Figtree' } }).render().asPng();
  return sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
}

