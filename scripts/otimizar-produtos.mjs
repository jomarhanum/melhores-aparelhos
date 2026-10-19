// Converte fotos de produto para WebP 600x600 com fundo branco. Uso: node scripts/otimizar-produtos.mjs <pasta-origem>
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import { join, parse } from 'node:path';
const src = process.argv[2];
for (const f of readdirSync(src).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
  const out = `public/images/produtos/${parse(f).name}.webp`;
  await sharp(join(src, f)).trim({ threshold: 10 }).resize(560, 560, { fit: 'contain', background: '#ffffff' })
    .extend({ top: 20, bottom: 20, left: 20, right: 20, background: '#ffffff' }).flatten({ background: '#ffffff' })
    .webp({ quality: 82 }).toFile(out);
  console.log(out);
}
