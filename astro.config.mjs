import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/data/url.mjs';
import { artigos } from './src/data/artigos.mjs';

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
const inverters = [
  ['midea-ai-ecomaster-9000', 'Midea AI Ecomaster 9.000 BTUs'],
  ['lg-dual-inverter-ai-voice-12000', 'LG Dual Inverter AI Voice 12.000 BTUs'],
  ['samsung-windfree-ai-12000', 'Samsung WindFree AI 12.000 BTUs'],
  ['gree-g-side-auto-12000', 'Gree G-Side Auto Inverter 12.000 BTUs'],
  ['elgin-eco-iii-9000-qf', 'Elgin Eco III Wi-Fi 9.000 BTUs quente e frio'],
  ['hisense-hi-efficiency-12000-qf', 'Hisense Hi-Efficiency 12.000 BTUs quente e frio'],
  ['electrolux-color-adapt-12000', 'Electrolux Color Adapt 12.000 BTUs'],
  ['tcl-elite-gv-12000', 'TCL Elite GV 12.000 BTUs'],
  ['electrolux-color-adapt-9000-qf', 'Electrolux Color Adapt 9.000 BTUs quente e frio'],
  ['daikin-full-inverter-12000', 'Daikin Full Inverter 12.000 BTUs'],
];
const fornos = [
  ['electrolux-oe8ea', 'Electrolux Experience OE8EA 80 litros'],
  ['brastemp-boc84ar', 'Brastemp BOC84AR 84 litros'],
  ['fischer-infinity-50-air-fryer', 'Fischer Infinity 50 litros com air fryer'],
  ['consul-cob47', 'Consul COB47BE 47 litros'],
  ['electrolux-oe8el', 'Electrolux Efficient OE8EL 80 litros'],
  ['panasonic-hl-cx668', 'Panasonic HL-CX668SRPK 80 litros'],
  ['fischer-infinity-touch-82', 'Fischer Infinity Touch 82 litros'],
  ['brastemp-bo260ar', 'Brastemp BO260AR 67 litros'],
  ['mueller-mfe0268', 'Mueller MFE0268G1 68 litros'],
  ['continental-oc4em', 'Continental OC4EM 50 litros'],
];
const bancadas = [
  ['philco-pfe65', 'Philco PFE65 65 litros'],
  ['oster-ofor455', 'Oster 45 litros com convecção'],
  ['fischer-gourmet-grill', 'Fischer Gourmet Grill 44 litros'],
  ['philco-pfe52p', 'Philco PFE52P 50 litros'],
  ['britania-bfe55p', 'Britânia BFE55P 52 litros'],
  ['mondial-family-grill', 'Mondial Family Grill Inox 52 litros'],
  ['nardelli-smart-60s', 'Nardelli Smart 60s 60 litros com espeto giratório'],
  ['fischer-premier-48', 'Fischer Premier 48 litros'],
  ['suggar-fe42', 'Suggar FE42 42 litros'],
  ['mondial-pratic-cook', 'Mondial Pratic Cook 6 litros'],
];
const ventiladores = [
  ['arno-vx13', 'Arno Ultimate VX13'],
  ['ventisol-aires-inverter', 'Ventisol Aires Inverter'],
  ['arno-vx15', 'Arno Ultimate VX15'],
  ['ventisol-fenix-370', 'Ventisol Fênix 370'],
  ['ventisol-fenix-led-inverter', 'Ventisol Fênix Inverter com LED'],
  ['aliseu-terral', 'Aliseu Terral'],
  ['ventisol-wind-inverter', 'Ventisol Wind Inverter'],
  ['venti-delta-new-light', 'Venti-Delta New Light'],
  ['tron-marbella-new', 'Tron Marbella New'],
  ['venti-delta-new-zeta', 'Venti-Delta New Zeta'],
];
const fotosDoHub = {
  '/melhor-ventilador-de-teto/': ventiladores.map(([s, n]) => [s, `Ventilador de teto ${n}`]),
  '/melhor-forno-eletrico-de-bancada/': bancadas.map(([s, n]) => [s, `Forno elétrico de bancada ${n}`]),
  '/melhor-forno-eletrico-de-embutir/': fornos.map(([s, n]) => [s, `Forno elétrico de embutir ${n}`]),
  '/melhor-ar-condicionado-portatil/': produtos.map(([s, n]) => [s, `Ar-condicionado portátil ${n}`]),
  '/melhor-ar-condicionado-inverter/': inverters.map(([s, n]) => [s, `Ar-condicionado split inverter ${n}`]),
};
const img = (path, caption) => ({ url: `${SITE_URL}${path}`, caption });
const fotoAutor = img('/images/autor-jomar-hanum-400.jpg', 'Jomar Hanum, editor-chefe do Melhores Aparelhos');
const ultimaAtualizacao = artigos.map((a) => a.atualizado).sort().at(-1);

// Páginas fixas: prioridade, frequência, data da última alteração real e imagens.
const paginas = {
  '/': { priority: 1.0, changefreq: 'weekly', lastmod: ultimaAtualizacao, img: [img('/images/produtos/electrolux-sp12f.webp', 'Melhor ar-condicionado portátil de 2026')] },
  '/guias/': { priority: 0.7, changefreq: 'weekly', lastmod: ultimaAtualizacao },
  '/fornos/': { priority: 0.8, changefreq: 'weekly', lastmod: ultimaAtualizacao },
  '/climatizacao/': { priority: 0.8, changefreq: 'weekly', lastmod: ultimaAtualizacao },
  '/autor/jomar-hanum/': { priority: 0.6, changefreq: 'monthly', lastmod: '2026-10-19', img: [fotoAutor] },
  '/sobre/': { priority: 0.5, changefreq: 'monthly', lastmod: '2026-10-19', img: [fotoAutor] },
  '/contato/': { priority: 0.5, changefreq: 'yearly', lastmod: '2026-10-19' },
  '/politica-de-privacidade/': { priority: 0.3, changefreq: 'yearly', lastmod: '2026-10-19' },
  '/termos-de-uso/': { priority: 0.3, changefreq: 'yearly', lastmod: '2026-10-19' },
  '/divulgacao-de-afiliados/': { priority: 0.3, changefreq: 'yearly', lastmod: '2026-10-19' },
};

// Artigos: dados vêm do registro em src/data/artigos.mjs.
for (const a of artigos) {
  const fotos = fotosDoHub[a.url];
  paginas[a.url] = {
    priority: fotos ? 0.9 : a.categoria === 'Guia' ? 0.7 : 0.8,
    changefreq: fotos ? 'weekly' : 'monthly',
    lastmod: a.atualizado,
    img: fotos ? fotos.map(([slug, nome]) => img(`/images/produtos/${slug}.webp`, nome)) : [img(a.imagem, a.h1)],
  };
}

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
