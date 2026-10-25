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
  {
    id: 'ventilador-teto',
    nome: 'Ventilador de teto',
    curto: 'Ventilador de Teto',
    hub: '/melhor-ventilador-de-teto/',
    imagem: '/images/produtos/arno-vx13.webp',
    descricao: 'Conforto gastando pouco: modelos inverter de 30 W, com controle remoto, luz LED e modo exaustor.',
  },
  {
    id: 'ventilador-coluna',
    nome: 'Ventilador de coluna',
    curto: 'Ventilador de Coluna',
    hub: '/melhor-ventilador-de-coluna/',
    imagem: '/images/produtos/mondial-vsp-40c.webp',
    descricao: 'Sem instalação e fácil de levar de um cômodo a outro: modelos de 40 e 50 cm, com altura ajustável e até controle remoto.',
  },
  {
    id: 'geladeira',
    nome: 'Geladeira',
    curto: 'Geladeira',
    hub: '/melhor-geladeira/',
    imagem: '/images/produtos/electrolux-it70s.webp',
    descricao: 'Duplex, inverse, French Door e side by side: consumo oficial do Inmetro, medidas e capacidade lado a lado.',
  },
  {
    id: 'airfryer',
    nome: 'Air fryer',
    curto: 'Air Fryer',
    hub: '/melhor-air-fryer/',
    imagem: '/images/produtos/philips-walita-serie-2000-xl.webp',
    descricao: 'Do modelo compacto de 3,5 litros à air fryer forno de 12: capacidade, potência, visor e facilidade de limpeza.',
  },
  {
    id: 'maquina-lavar',
    nome: 'Máquina de lavar',
    curto: 'Máquina de Lavar',
    hub: '/melhor-maquina-de-lavar/',
    imagem: '/images/produtos/panasonic-na-f150b1t.webp',
    descricao: 'Abertura superior, frontal e lava e seca: capacidade, água e energia por ciclo segundo o Inmetro.',
  },
  {
    id: 'cafeteira-capsula',
    nome: 'Cafeteira de cápsula',
    curto: 'Cafeteira de Cápsula',
    hub: '/melhor-cafeteira-de-capsula/',
    imagem: '/images/produtos/nescafe-dolce-gusto-genio-s-plus.webp',
    descricao: 'Dolce Gusto, Nespresso, TRES e Delta Q: sistema de cápsula, bebidas, reservatório e custo por xícara.',
  },
];

// Grupos de categorias com página própria (itens do menu).
export const grupos = [
  { id: 'climatizacao', nome: 'Climatização', url: '/climatizacao/', categorias: ['ar-portatil', 'ar-inverter', 'ventilador-teto', 'ventilador-coluna'] },
  { id: 'cozinha', nome: 'Cozinha', url: '/cozinha/', categorias: ['forno-embutir', 'forno-bancada', 'geladeira', 'airfryer', 'cafeteira-capsula'] },
];

export const categoriaPorId = (id) => categorias.find((c) => c.id === id);
