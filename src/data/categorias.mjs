// Categorias do site. Para adicionar uma nova (ex.: airfryer), inclua aqui e crie o hub + dados.

/** @typedef {{ id: string, nome: string, curto: string, hub: string, imagem: string, descricao: string }} Categoria */

/** @type {Categoria[]} */
export const categorias = [
  {
    id: 'ar-portatil',
    nome: 'Ar-condicionado portátil',
    curto: 'Ar Portátil',
    hub: '/melhor-ar-condicionado-portatil/',
    imagem: '/images/produtos/electrolux-sp12f.webp',
    descricao: 'Sem obra e sem instalador: os melhores portáteis para quem mora de aluguel ou quer mudar de cômodo.',
  },
  {
    id: 'ar-inverter',
    nome: 'Ar-condicionado inverter',
    curto: 'Ar Inverter',
    hub: '/melhor-ar-condicionado-inverter/',
    imagem: '/images/produtos/lg-dual-inverter-ai-voice-12000.webp',
    descricao: 'Split inverter: mais economia na conta de luz, menos barulho e conforto para o dia a dia.',
  },
  {
    id: 'forno-embutir',
    nome: 'Forno elétrico de embutir',
    curto: 'Forno de Embutir',
    hub: '/melhor-forno-eletrico-de-embutir/',
    imagem: '/images/produtos/electrolux-oe8ea.webp',
    descricao: 'Fornos elétricos para a cozinha planejada: capacidade, funções, consumo e medidas do nicho.',
  },
  {
    id: 'forno-bancada',
    nome: 'Forno elétrico de bancada',
    curto: 'Forno de Bancada',
    hub: '/melhor-forno-eletrico-de-bancada/',
    imagem: '/images/produtos/philco-pfe65.webp',
    descricao: 'Sem instalação: fornos de bancada do mini de 6 litros ao de 65 litros, com dourador, grill e convecção.',
  },
];

export const categoriaPorId = (id) => categorias.find((c) => c.id === id);
