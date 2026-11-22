// Reels (1080x1920, MP4) gerados no build em /social/reel/<slug>.mp4, a partir das artes do carrossel
// dos comparativos (capa + 4 primeiros do ranking). Precisa do ffmpeg: no deploy (GitHub Actions) ele
// vem do sistema; localmente, defina FFMPEG com o caminho do executável. Sem ffmpeg, os Reels são
// simplesmente omitidos (o resto do site continua sendo gerado).
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { artesDoSite, renderArte } from './social';

const W = 1080, H = 1920, ART_H = 1350;
// Trilhas originais (scripts/gerar-trilhas.mjs): cada Reel usa uma, escolhida pelo slug.
const TRILHAS = ['trilha-1', 'trilha-2', 'trilha-3'].map((t) => join(process.cwd(), 'src/assets/audio', `${t}.m4a`));
const trilhaDe = (slug: string) => TRILHAS[[...slug].reduce((s, c) => s + c.charCodeAt(0), 0) % TRILHAS.length];
const ffmpeg = process.env.FFMPEG || 'ffmpeg';

let disponivel: boolean | undefined;
export function temFfmpeg() {
  if (disponivel === undefined) {
    const r = spawnSync(ffmpeg, ['-version'], { stdio: 'ignore' });
    disponivel = r.status === 0;
    if (!disponivel) console.warn('[reel] ffmpeg não encontrado: Reels não serão gerados.');
  }
  return disponivel;
}

/** Artigos que ganham Reel: os comparativos com carrossel. */
export function reelsDoSite() {
  if (!temFfmpeg()) return [];
  return artesDoSite().filter((x) => x.arquivos.length > 1);
}

const fundo = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#0b5cab"/><stop offset="1" stop-color="#083f78"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`);

async function quadro(arquivo: string) {
  const arte = await renderArte(arquivo);
  return sharp(fundo).composite([{ input: arte, top: Math.round((H - ART_H) / 2), left: 0 }]).png().toBuffer();
}

/** Gera o MP4: cada arte fica ~3 s na tela, com transição suave entre elas. */
export async function renderReel(slug: string): Promise<Buffer> {
  const item = reelsDoSite().find((x) => x.slug === slug);
  if (!item) throw new Error(`Reel desconhecido: ${slug}`);
  const dir = mkdtempSync(join(tmpdir(), 'reel-'));
  try {
    const quadros = item.arquivos;
    for (let i = 0; i < quadros.length; i++) writeFileSync(join(dir, `q${i}.png`), await quadro(quadros[i]));
    const dur = (i: number) => (i === 0 ? 3.6 : 3.2), trans = 0.5;
    const args = ['-y', '-loglevel', 'error'];
    quadros.forEach((_, i) => args.push('-loop', '1', '-t', String(dur(i)), '-framerate', '30', '-i', join(dir, `q${i}.png`)));
    args.push('-i', trilhaDe(slug));
    // Encadeia as transições: [0][1]xfade -> [v1]; [v1][2]xfade -> [v2]; ...
    const filtros: string[] = quadros.map((_, i) => `[${i}:v]format=yuv420p,setsar=1[s${i}]`);
    let anterior = 's0', offset = 0;
    for (let i = 1; i < quadros.length; i++) {
      offset += dur(i - 1) - trans;
      const saida = i === quadros.length - 1 ? 'v' : `v${i}`;
      filtros.push(`[${anterior}][s${i}]xfade=transition=fade:duration=${trans}:offset=${offset.toFixed(2)}[${saida}]`);
      anterior = saida;
    }
    const total = quadros.reduce((s, _, i) => s + dur(i), 0) - trans * (quadros.length - 1);
    filtros.push(`[${quadros.length}:a]atrim=0:${total.toFixed(2)},afade=t=out:st=${(total - 1.2).toFixed(2)}:d=1.2[a]`);
    args.push('-filter_complex', filtros.join(';'), '-map', '[v]', '-map', '[a]',
      '-t', total.toFixed(2), '-r', '30', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', join(dir, 'reel.mp4'));
    const r = spawnSync(ffmpeg, args, { encoding: 'utf8' });
    if (r.status !== 0) throw new Error(`ffmpeg falhou (${slug}): ${r.stderr}`);
    return readFileSync(join(dir, 'reel.mp4'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
