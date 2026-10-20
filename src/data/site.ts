import { SITE_URL } from './url.mjs';

export const site = {
  url: SITE_URL,
  name: 'Melhores Aparelhos',
  tagline: 'Reviews honestos para você comprar certo',
  description:
    'Comparativos e reviews independentes de eletrodomésticos e eletrônicos, escritos em linguagem simples para ajudar você a escolher o melhor aparelho.',
  locale: 'pt_BR',
  lang: 'pt-BR',
  // E-mail exibido na página de contato. Troque pelo e-mail oficial do blog.
  contactEmail: 'contato@jhonlinesolutions.com.br',
  developer: { name: 'JH Online Solutions', url: 'https://jhonlinesolutions.com.br' },
  ogImage: '/images/og-melhores-aparelhos.jpg',
};

export const author = {
  name: 'Jomar Hanum',
  slug: 'jomar-hanum',
  url: '/autor/jomar-hanum/',
  photo: '/images/autor-jomar-hanum-400.jpg',
  photoSmall: '/images/autor-jomar-hanum-104.webp',
  role: 'Editor-chefe e analista de produtos',
  bio: 'Jomar Hanum é o criador do Melhores Aparelhos. Ele pesquisa e compara eletrodomésticos e tecnologia, traduzindo ficha técnica em linguagem simples para quem quer comprar bem sem cair em propaganda.',
  sameAs: ['https://jhonlinesolutions.com.br'],
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Ar Portátil', href: '/melhor-ar-condicionado-portatil/' },
  { label: 'Ar Inverter', href: '/melhor-ar-condicionado-inverter/' },
  { label: 'Fornos', href: '/fornos/' },
  { label: 'Guias', href: '/guias/' },
  { label: 'Sobre', href: '/sobre/' },
  { label: 'Contato', href: '/contato/' },
];

export const legalLinks = [
  { label: 'Sobre', href: '/sobre/' },
  { label: 'Contato', href: '/contato/' },
  { label: 'Política de Privacidade', href: '/politica-de-privacidade/' },
  { label: 'Termos de Uso', href: '/termos-de-uso/' },
  { label: 'Divulgação de Afiliados', href: '/divulgacao-de-afiliados/' },
];
