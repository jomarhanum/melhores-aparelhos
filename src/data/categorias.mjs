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
];

export const categoriaPorId = (id) => categorias.find((c) => c.id === id);
