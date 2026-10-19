// Gera favicons PNG e a imagem de compartilhamento (1200x630). Rode: npm run og
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const fav = readFileSync('public/favicon.svg');
await sharp(fav).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(fav).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(fav).resize(512, 512).png().toFile('public/favicon-512.png');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b5cab"/><stop offset="1" stop-color="#083f78"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1050" cy="90" r="220" fill="#ffffff" opacity=".06"/>
  <text x="70" y="110" font-family="Segoe UI, Arial" font-size="30" font-weight="700" fill="#9fd0ff">MELHORES APARELHOS · 2026</text>
  <text x="70" y="215" font-family="Segoe UI, Arial" font-size="72" font-weight="800" fill="#fff">Melhor Ar-Condicionado</text>
  <text x="70" y="300" font-family="Segoe UI, Arial" font-size="72" font-weight="800" fill="#fff">Portátil de 2026</text>
  <text x="70" y="375" font-family="Segoe UI, Arial" font-size="34" fill="#d6e8fb">10 modelos comparados · prós e contras · guia de compra</text>
  <rect x="70" y="420" width="360" height="64" rx="32" fill="#ffe600"/>
  <text x="250" y="462" text-anchor="middle" font-family="Segoe UI, Arial" font-size="28" font-weight="800" fill="#0f1a27">Veja o ranking →</text>
  <text x="250" y="570" font-family="Segoe UI, Arial" font-size="28" fill="#fff">Por <tspan font-weight="800">Jomar Hanum</tspan></text>
</svg>`;
const foto = await sharp('public/images/autor-jomar-hanum-160.jpg').resize(110, 110)
  .composite([{ input: Buffer.from('<svg width="110" height="110"><circle cx="55" cy="55" r="55"/></svg>'), blend: 'dest-in' }])
  .png().toBuffer();
await sharp(Buffer.from(svg)).composite([{ input: foto, left: 120, top: 505 }])
  .jpeg({ quality: 86 }).toFile('public/images/og-melhores-aparelhos.jpg');
console.log('OK');
