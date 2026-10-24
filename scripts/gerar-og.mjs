// Gera favicons PNG e as imagens de compartilhamento (1200x630). Rode: npm run og
// - og-melhores-aparelhos-geral.jpg: imagem padrão do site (home, guias, grupos, páginas institucionais)
// - og-ar-condicionado-portatil.jpg: imagem do comparativo de ar-condicionado portátil
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const fav = readFileSync('public/favicon.svg');
await sharp(fav).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(fav).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(fav).resize(512, 512).png().toFile('public/favicon-512.png');

const fundo = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b5cab"/><stop offset="1" stop-color="#083f78"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1050" cy="90" r="220" fill="#ffffff" opacity=".06"/>`;
const fotoAutor = (lado) => sharp('public/images/autor-jomar-hanum-160.jpg').resize(lado, lado)
  .composite([{ input: Buffer.from(`<svg width="${lado}" height="${lado}"><circle cx="${lado / 2}" cy="${lado / 2}" r="${lado / 2}"/></svg>`), blend: 'dest-in' }])
  .png().toBuffer();

// Imagem geral: as categorias do site lado a lado.
const cards = [
  ['lg-dual-inverter-ai-voice-12000', 'Ar-condicionado'],
  ['electrolux-it70s', 'Geladeira'],
  ['philips-walita-serie-2000-xl', 'Air fryer'],
  ['panasonic-na-f150b1t', 'Máq. de lavar'],
  ['philco-pfe65', 'Forno elétrico'],
  ['mondial-vsp-40c', 'Ventilador'],
];
const L = 168, G = 18, X0 = (1200 - (cards.length * L + (cards.length - 1) * G)) / 2, Y0 = 330, H = 220;
const svgGeral = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${fundo}
  <text x="70" y="92" font-family="Segoe UI, Arial" font-size="28" font-weight="700" fill="#9fd0ff">MELHORES APARELHOS · 2026</text>
  <text x="70" y="178" font-family="Segoe UI, Arial" font-size="64" font-weight="800" fill="#fff">Reviews e comparativos</text>
  <text x="70" y="252" font-family="Segoe UI, Arial" font-size="64" font-weight="800" fill="#fff">honestos para a sua casa</text>
  <text x="70" y="300" font-family="Segoe UI, Arial" font-size="27" fill="#d6e8fb">Prós e contras sinceros, dados oficiais e guias de compra em linguagem simples</text>
  ${cards.map((_, i) => `<rect x="${X0 + i * (L + G)}" y="${Y0}" width="${L}" height="${H}" rx="22" fill="#fff"/>`).join('')}
  ${cards.map(([, rot], i) => `<text x="${X0 + i * (L + G) + L / 2}" y="${Y0 + H - 18}" text-anchor="middle" font-family="Segoe UI, Arial" font-size="19" font-weight="700" fill="#0f1a27">${rot}</text>`).join('')}
  <text x="1040" y="598" text-anchor="end" font-family="Segoe UI, Arial" font-size="24" fill="#fff">Por <tspan font-weight="800">Jomar Hanum</tspan></text>
</svg>`;
const fotos = await Promise.all(cards.map(([slug]) => sharp(`public/images/produtos/${slug}.webp`)
  .resize(146, 160, { fit: 'contain', background: '#ffffff' }).png().toBuffer()));
await sharp(Buffer.from(svgGeral))
  .composite([
    ...fotos.map((input, i) => ({ input, left: Math.round(X0 + i * (L + G) + (L - 146) / 2), top: Y0 + 12 })),
    { input: await fotoAutor(64), left: 1060, top: 556 },
  ])
  .jpeg({ quality: 86 }).toFile('public/images/og-melhores-aparelhos-geral.jpg');

// Imagem do comparativo de ar-condicionado portátil (a original do site).
const svgAr = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${fundo}
  <text x="70" y="110" font-family="Segoe UI, Arial" font-size="30" font-weight="700" fill="#9fd0ff">MELHORES APARELHOS · 2026</text>
  <text x="70" y="215" font-family="Segoe UI, Arial" font-size="72" font-weight="800" fill="#fff">Melhor Ar-Condicionado</text>
  <text x="70" y="300" font-family="Segoe UI, Arial" font-size="72" font-weight="800" fill="#fff">Portátil de 2026</text>
  <text x="70" y="375" font-family="Segoe UI, Arial" font-size="34" fill="#d6e8fb">10 modelos comparados · prós e contras · guia de compra</text>
  <rect x="70" y="420" width="360" height="64" rx="32" fill="#ffe600"/>
  <text x="250" y="462" text-anchor="middle" font-family="Segoe UI, Arial" font-size="28" font-weight="800" fill="#0f1a27">Veja o ranking →</text>
  <text x="250" y="570" font-family="Segoe UI, Arial" font-size="28" fill="#fff">Por <tspan font-weight="800">Jomar Hanum</tspan></text>
</svg>`;
await sharp(Buffer.from(svgAr)).composite([{ input: await fotoAutor(110), left: 120, top: 505 }])
  .jpeg({ quality: 86 }).toFile('public/images/og-ar-condicionado-portatil.jpg');
console.log('OK');
