import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/data/url.mjs';

const produtos = [
  ['electrolux-sp12f', 'Electrolux SP12F 12.000 BTUs Frio com Wi-Fi'],
  ['hisense-ap-12cwbrnps01', 'Hisense AP-12CWBRNPS01 12.000 BTUs Frio'],
  ['philco-pac12000f5', 'Philco PAC12000F5 12.000 BTUs Frio'],
  ['philco-pac12000qf5', 'Philco PAC12000QF5 12.000 BTUs Quente e Frio'],
  ['gree-aovia-gpc10ap', 'Gree Aovia R32 10.000 BTUs Frio'],
  ['eos-eap14iqf', 'EOS Slim Inverter EAP14IQF 14.000 BTUs Quente e Frio'],
  ['lg-lp1419ivsm', 'LG Dual Inverter LP1419IVSM 14.000 BTUs Frio'],
  ['rheem-rb1hp12k220', 'Rheem RB1HP12K220 12.000 BTUs Quente e Frio'],
  ['delonghi-pinguino-pact120ed', 'DeLonghi Pinguino PACT120ED 12.000 BTUs Frio'],
  ['rheem-rb1cc12k220', 'Rheem RB1CC12K220 12.000 BTUs Frio'],
];
const img = (path, caption) => ({ url: `${SITE_URL}${path}`, caption });
const fotoAutor = img('/images/autor-jomar-hanum-400.jpg', 'Jomar Hanum, editor-chefe do Melhores Aparelhos');

// Prioridade, frequência, data da última alteração real e imagens de cada página.
const paginas = {
  '/': { priority: 1.0, changefreq: 'weekly', lastmod: '2026-10-19', img: [img('/images/produtos/electrolux-sp12f.webp', 'Melhor ar-condicionado portátil de 2026')] },
  '/melhor-ar-condicionado-portatil/': {
    priority: 0.9, changefreq: 'weekly', lastmod: '2026-10-19',
    img: [img('/images/og-melhores-aparelhos.jpg', 'Melhor ar-condicionado portátil de 2026'),
      ...produtos.map(([slug, nome]) => img(`/images/produtos/${slug}.webp`, `Ar-condicionado portátil ${nome}`))],
  },
  '/autor/jomar-hanum/': { priority: 0.6, changefreq: 'monthly', lastmod: '2026-10-19', img: [fotoAutor] },
  '/sobre/': { priority: 0.5, changefreq: 'monthly', lastmod: '2026-10-19', img: [fotoAutor] },
  '/contato/': { priority: 0.5, changefreq: 'yearly', lastmod: '2026-10-19' },
  '/politica-de-privacidade/': { priority: 0.3, changefreq: 'yearly', lastmod: '2026-10-19' },
  '/termos-de-uso/': { priority: 0.3, changefreq: 'yearly', lastmod: '2026-10-19' },
  '/divulgacao-de-afiliados/': { priority: 0.3, changefreq: 'yearly', lastmod: '2026-10-19' },
};

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  // CSS embutido no HTML: nenhuma folha de estilo bloqueando a primeira pintura.
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const cfg = paginas[new URL(item.url).pathname];
        if (cfg) Object.assign(item, cfg);
        return item;
      },
    }),
  ],
});
