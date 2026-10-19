// Links de afiliado: preencha amazonUrl e mercadoLivreUrl quando gerar os links.
// Enquanto estiverem vazios, os botões levam para a busca do modelo na loja.

export interface Produto {
  slug: string;
  rank: number;
  marca: string;
  modelo: string;
  nome: string;
  selo?: string;
  nota: number;
  precoRef: number;
  btu: number;
  area: string;
  funcoes: string[];
  voltagem: string;
  ruido: string;
  peso: string;
  wifi: string;
  controle: string;
  ciclo: 'Só frio' | 'Quente e frio';
  idealPara: string;
  resumo: string;
  caracteristicas: string[];
  beneficios: string[];
  vantagens: string[];
  pros: string[];
  contras: string[];
  amazonUrl: string;
  mercadoLivreUrl: string;
}

export const produtos: Produto[] = [
  {
    slug: 'electrolux-sp12f',
    rank: 1,
    marca: 'Electrolux',
    modelo: 'SP12F',
    nome: 'Electrolux SP12F 12.000 BTUs Frio com Wi-Fi',
    selo: 'Melhor escolha geral',
    nota: 9.6,
    precoRef: 2599,
    btu: 12000,
    area: 'até 15 m²',
    funcoes: ['Refrigerar', 'Desumidificar', 'Ventilar', 'Timer', 'Modo dormir'],
    voltagem: 'Bivolt',
    ruido: '49 a 52 dB',
    peso: '30 kg',
    wifi: 'Sim (app + comando de voz)',
    controle: 'Sim',
    ciclo: 'Só frio',
    idealPara: 'Quem quer o pacote mais completo pelo melhor preço, com controle pelo celular.',
    resumo:
      'O Electrolux SP12F junta tudo o que a maioria das pessoas procura: 12.000 BTUs, Wi-Fi com app, comando de voz e ligação em qualquer tomada por ser bivolt. E ainda é um dos mais baratos da lista.',
    caracteristicas: [
      '12.000 BTUs de capacidade de refrigeração',
      'Conexão Wi-Fi com aplicativo e compatível com assistentes de voz',
      'Modo "Dormir Bem", que ajusta a temperatura durante a noite',
      'Filtro ionizador lavável',
      '3 velocidades de ventilação e timer',
    ],
    beneficios: [
      'Você liga o ar pelo celular antes de chegar em casa e encontra o quarto já fresco.',
      'Por ser bivolt, funciona em 127 V ou 220 V: ótimo para quem muda de casa ou viaja.',
      'O filtro ionizador ajuda a deixar o ar mais limpo, o que é bom para quem tem rinite.',
    ],
    vantagens: [
      'Melhor custo-benefício entre os modelos com Wi-Fi',
      'Marca com ampla rede de assistência técnica no Brasil',
    ],
    pros: [
      'Preço baixo para um modelo com Wi-Fi',
      'Bivolt, liga em qualquer tomada',
      'Comando de voz e aplicativo',
      'Filtro lavável, sem custo de reposição',
    ],
    contras: [
      'É o mais pesado entre os 12.000 BTUs (30 kg)',
      'Não aquece: não serve para o inverno',
    ],
    amazonUrl: '',
    mercadoLivreUrl: '',
  },
  {
    slug: 'hisense-ap-12cwbrnps01',
    rank: 2,
    marca: 'Hisense',
    modelo: 'AP-12CWBRNPS01',
    nome: 'Hisense AP-12CWBRNPS01 12.000 BTUs Frio',
    selo: 'Mais silencioso no modo dormir',
    nota: 9.4,
    precoRef: 3099,
    btu: 12000,
    area: 'até 15 m²',
    funcoes: ['Refrigerar', 'Desumidificar', 'Ventilar', 'Modo Smart', 'Modo dormir'],
    voltagem: '127 V',
    ruido: '19 dB (dormir) a 56 dB',
    peso: '25 kg',
    wifi: 'Sim (app ConnectLife)',
    controle: 'Via app',
    ciclo: 'Só frio',
    idealPara: 'Quem vai usar no quarto e tem sono leve.',
    resumo:
      'O Hisense se destaca pelo modo dormir extremamente silencioso (a partir de 19 dB) e pelo gás R32, mais eficiente e menos agressivo ao meio ambiente. Vem com kit de duto e funciona pelo aplicativo ConnectLife.',
    caracteristicas: [
      '12.000 BTUs com gás refrigerante R32',
      'Wi-Fi com o aplicativo ConnectLife',
      'Modo Smart, que escolhe sozinho a melhor configuração',
      'Dreno seco: reaproveita a água condensada',
      'Kit de duto de exaustão incluso',
    ],
    beneficios: [
      'No modo dormir ele fica quase inaudível, ideal para o quarto.',
      'O gás R32 refrigera bem gastando menos energia.',
      'O dreno seco reduz a necessidade de esvaziar reservatório.',
    ],
    vantagens: [
      'Nível de ruído noturno mais baixo da lista',
      'Gás R32, mais moderno que o R410A',
    ],
    pros: [
      'Modo dormir muito silencioso',
      'Gás R32 eficiente',
      'Aplicativo completo',
      'Mais leve que o Electrolux (25 kg)',
    ],
    contras: [
      'Apenas 127 V',
      'No volume máximo chega a 56 dB',
      'Não aquece',
    ],
    amazonUrl: '',
    mercadoLivreUrl: '',
  },
  {
    slug: 'philco-pac12000f5',
    rank: 3,
    marca: 'Philco',
    modelo: 'PAC12000F5',
    nome: 'Philco PAC12000F5 12.000 BTUs Frio',
    nota: 9.1,
    precoRef: 5200,
    btu: 12000,
    area: 'até 15 m²',
    funcoes: ['Refrigerar', 'Desumidificar', 'Automático', 'Timer', 'Oscilação', 'Modo dormir'],
    voltagem: 'Bivolt',
    ruido: '51 dB',
    peso: '25 kg',
    wifi: 'Não informado',
    controle: 'Sim',
    ciclo: 'Só frio',
    idealPara: 'Quem quer um aparelho simples, bivolt e fácil de mudar de cômodo.',
    resumo:
      'O Philco PAC12000F5 é direto ao ponto: refrigera bem, tem oscilação para espalhar o ar pelo ambiente, painel digital e rodinhas para levar de um cômodo para outro.',
    caracteristicas: [
      '12.000 BTUs',
      'Modos refrigerar, desumidificar e automático',
      'Função oscilação da saída de ar',
      'Painel digital e controle remoto',
      'Rodízios para transporte',
    ],
    beneficios: [
      'A oscilação distribui o ar frio de forma mais uniforme.',
      'Fácil de usar mesmo para quem não gosta de tecnologia.',
      'Bivolt: funciona em qualquer tomada.',
    ],
    vantagens: ['Oscilação automática da saída de ar', 'Ruído constante e moderado (51 dB)'],
    pros: ['Bivolt', 'Oscilação de ar', 'Rodinhas e painel digital', 'Peso razoável (25 kg)'],
    contras: [
      'Preço de referência alto para o que entrega',
      'Sem Wi-Fi informado',
      'Não aquece',
    ],
    amazonUrl: '',
    mercadoLivreUrl: '',
  },
  {
    slug: 'philco-pac12000qf5',
    rank: 4,
    marca: 'Philco',
    modelo: 'PAC12000QF5',
    nome: 'Philco PAC12000QF5 12.000 BTUs Quente e Frio',
    selo: 'Melhor quente e frio barato',
    nota: 9.0,
    precoRef: 2999.9,
    btu: 12000,
    area: 'até 15 m²',
    funcoes: ['Refrigerar', 'Aquecer', 'Desumidificar', 'Ventilar', 'Automático', 'Modo dormir'],
    voltagem: 'Bivolt',
    ruido: 'até 51 dB',
    peso: '25 kg',
    wifi: 'Não informado',
    controle: 'Sim',
    ciclo: 'Quente e frio',
    idealPara: 'Quem mora em região com inverno frio e quer um aparelho para o ano todo.',
    resumo:
      'Versão quente e frio da Philco, com o diferencial da autoevaporação: a água retirada do ar é evaporada pelo próprio aparelho, então você quase não precisa esvaziar reservatório.',
    caracteristicas: [
      '12.000 BTUs com ciclo quente e frio',
      'Sistema de autoevaporação',
      'Modos ventilar, desumidificar, automático e dormir',
      'Oscilação e timer',
      'Controle remoto',
    ],
    beneficios: [
      'Um único aparelho resolve o calor do verão e o frio do inverno.',
      'A autoevaporação elimina a chatice de esvaziar água todo dia.',
      'Funciona em 127 V ou 220 V.',
    ],
    vantagens: ['Quente e frio com preço de modelo só frio', 'Autoevaporação'],
    pros: ['Aquece e refrigera', 'Autoevaporação', 'Bivolt', 'Bom preço'],
    contras: ['Sem Wi-Fi informado', 'Sem tecnologia inverter'],
    amazonUrl: '',
    mercadoLivreUrl: '',
  },
  {
    slug: 'gree-aovia-gpc10ap',
    rank: 5,
    marca: 'Gree',
    modelo: 'Aovia R32 GPC10AP-A6NNA1A',
    nome: 'Gree Aovia R32 10.000 BTUs Frio',
    selo: 'Mais barato',
    nota: 8.8,
    precoRef: 1828,
    btu: 10000,
    area: 'até 12 m²',
    funcoes: ['Refrigerar', 'Desumidificar', 'Resfriamento rápido', 'Timer', 'Modo dormir'],
    voltagem: '127 V',
    ruido: '51 a 55 dB',
    peso: '20,5 kg',
    wifi: 'Não informado',
    controle: 'Sim',
    ciclo: 'Só frio',
    idealPara: 'Quartos pequenos, escritórios e quem tem orçamento apertado.',
    resumo:
      'O Gree Aovia é o mais leve e o mais barato da lista. Com 10.000 BTUs e gás R32, dá conta de cômodos pequenos e tem um modo de resfriamento rápido para os dias mais quentes.',
    caracteristicas: [
      '10.000 BTUs com gás R32',
      'Função de resfriamento rápido',
      '3 velocidades de ventilação',
      'Timer e modo dormir',
      'Controle remoto',
    ],
    beneficios: [
      'Leve (20,5 kg): fácil de mudar de lugar até para uma pessoa só.',
      'Preço de entrada para quem quer sair do ventilador.',
      'Gás R32 com bom rendimento.',
    ],
    vantagens: ['Menor preço da lista', 'Mais leve da lista'],
    pros: ['Preço baixo', 'Leve e compacto', 'Gás R32', 'Resfriamento rápido'],
    contras: ['Só serve para ambientes pequenos', 'Apenas 127 V', 'Chega a 55 dB'],
    amazonUrl: '',
    mercadoLivreUrl: '',
  },
  {
    slug: 'eos-eap14iqf',
    rank: 6,
    marca: 'EOS',
    modelo: 'EAP14IQF',
    nome: 'EOS Slim Inverter EAP14IQF 14.000 BTUs Quente e Frio',
    selo: 'Melhor inverter custo-benefício',
    nota: 8.7,
    precoRef: 3628.49,
    btu: 14000,
    area: 'até 18 m²',
    funcoes: ['Refrigerar', 'Aquecer', 'Ventilar', 'Desumidificar', 'Timer'],
    voltagem: 'Bivolt',
    ruido: 'até 50 dB',
    peso: '26,8 kg',
    wifi: 'Não informado',
    controle: 'Sim',
    ciclo: 'Quente e frio',
    idealPara: 'Salas e quartos maiores, e quem quer economizar energia com inverter.',
    resumo:
      'O EOS Slim combina 14.000 BTUs, tecnologia inverter e ciclo quente e frio, com design fino. É uma das opções mais completas para ambientes médios.',
    caracteristicas: [
      '14.000 BTUs com tecnologia inverter',
      'Ciclo quente e frio',
      'Design slim',
      'Kit de janela deslizante incluso',
      'Dreno contínuo e filtros laváveis',
    ],
    beneficios: [
      'O inverter mantém a temperatura estável e reduz a conta de luz.',
      'Potência para cômodos maiores do que os modelos de 12.000 BTUs.',
      'Dreno contínuo: dá para ligar uma mangueira e esquecer o reservatório.',
    ],
    vantagens: ['Inverter + quente e frio + bivolt', 'Ruído máximo baixo para 14.000 BTUs'],
    pros: ['Inverter econômico', 'Aquece e refrigera', 'Bivolt', 'Kit de janela incluso'],
    contras: ['Marca com menos assistências que as grandes', 'Sem Wi-Fi informado'],
    amazonUrl: '',
    mercadoLivreUrl: '',
  },
  {
    slug: 'lg-lp1419ivsm',
    rank: 7,
    marca: 'LG',
    modelo: 'LP1419IVSM',
    nome: 'LG Dual Inverter LP1419IVSM 14.000 BTUs Frio',
    selo: 'Mais tecnológico',
    nota: 8.6,
    precoRef: 5654.99,
    btu: 14000,
    area: 'até 18 m²',
    funcoes: ['Refrigerar', 'Ventilar', 'Desumidificar', 'Modo dormir', 'Timer'],
    voltagem: '127 V',
    ruido: '44 dB (dormir) a 53 dB',
    peso: '32,2 kg',
    wifi: 'Sim (LG ThinQ + assistentes de voz)',
    controle: 'Via app',
    ciclo: 'Só frio',
    idealPara: 'Quem quer o máximo de tecnologia e economia, e não se importa em pagar mais.',
    resumo:
      'O LG Dual Inverter é o portátil premium da lista: compressor Dual Inverter, app LG ThinQ, integração com assistentes de voz e operação silenciosa a partir de 44 dB.',
    caracteristicas: [
      '14.000 BTUs com compressor Dual Inverter',
      'Wi-Fi com app LG ThinQ',
      'Compatível com assistentes de voz',
      'Modo dormir a partir de 44 dB',
      'Timer programável',
    ],
    beneficios: [
      'O Dual Inverter gasta menos energia no uso diário.',
      'Controle total pelo celular, inclusive por voz.',
      'Refrigera ambientes maiores com conforto.',
    ],
    vantagens: ['Compressor Dual Inverter da LG', 'Ecossistema de casa inteligente ThinQ'],
    pros: ['Muito econômico', 'App e comando de voz', 'Silencioso no modo dormir', 'Marca forte'],
    contras: ['Mais caro da lista', 'Mais pesado (32,2 kg)', 'Apenas 127 V', 'Não aquece'],
    amazonUrl: '',
    mercadoLivreUrl: '',
  },
  {
    slug: 'rheem-rb1hp12k220',
    rank: 8,
    marca: 'Rheem',
    modelo: 'RB1HP12K220',
    nome: 'Rheem RB1HP12K220 12.000 BTUs Quente e Frio',
    nota: 8.4,
    precoRef: 3099,
    btu: 12000,
    area: 'até 18 m²',
    funcoes: ['Refrigerar', 'Aquecer', 'Desumidificar', 'Ventilar', 'Timer'],
    voltagem: '220 V',
    ruido: '49 a 51 dB',
    peso: '27 kg',
    wifi: 'Não informado',
    controle: 'Sim',
    ciclo: 'Quente e frio',
    idealPara: 'Casas com tomada 220 V que precisam de aquecimento no inverno.',
    resumo:
      'O Rheem quente e frio tem sistema de autolimpeza antibacteriana e um ruído bem controlado, entre 49 e 51 dB. Atende cômodos de até 18 m².',
    caracteristicas: [
      '12.000 BTUs com ciclo quente e frio',
      'Autolimpeza antibacteriana',
      'Painel digital e timer programável',
      'Filtro lavável',
      'Controle remoto',
    ],
    beneficios: [
      'A autolimpeza ajuda a evitar mofo e mau cheiro.',
      'Ruído baixo e estável, bom para home office.',
      'Aquece nos dias frios.',
    ],
    vantagens: ['Autolimpeza antibacteriana', 'Ruído máximo de apenas 51 dB'],
    pros: ['Quente e frio', 'Autolimpeza', 'Silencioso', 'Filtro lavável'],
    contras: ['Somente 220 V', 'Sem Wi-Fi informado'],
    amazonUrl: '',
    mercadoLivreUrl: '',
  },
  {
    slug: 'delonghi-pinguino-pact120ed',
    rank: 9,
    marca: 'DeLonghi',
    modelo: 'Pinguino PACT120ED',
    nome: 'DeLonghi Pinguino PACT120ED 12.000 BTUs Frio',
    selo: 'Maior vazão de ar',
    nota: 8.3,
    precoRef: 3662,
    btu: 12000,
    area: 'até 15 m²',
    funcoes: ['Refrigerar', 'Desumidificar', 'Ventilar', 'Timer 24 h'],
    voltagem: 'Bivolt',
    ruido: 'até 53 dB',
    peso: '26,7 kg',
    wifi: 'Não informado',
    controle: 'Sim',
    ciclo: 'Só frio',
    idealPara: 'Quem valoriza acabamento europeu e um fluxo de ar forte.',
    resumo:
      'O clássico Pinguino da DeLonghi tem isolamento interno para reduzir o barulho, vazão de 430 m³/h e eficiência energética classe B.',
    caracteristicas: [
      '12.000 BTUs',
      'Vazão de ar de 430 m³/h',
      'Isolamento acústico interno',
      'Timer de 24 horas',
      'Eficiência energética classe B',
    ],
    beneficios: [
      'O fluxo de ar forte gela o ambiente mais rápido.',
      'O isolamento interno deixa o som mais abafado.',
      'Bivolt.',
    ],
    vantagens: ['Marca italiana especialista em portáteis', 'Vazão de ar alta'],
    pros: ['Bivolt', 'Fluxo de ar forte', 'Bom acabamento', 'Timer de 24 h'],
    contras: ['Classe B, não A', 'Sem Wi-Fi informado', 'Não aquece'],
    amazonUrl: '',
    mercadoLivreUrl: '',
  },
  {
    slug: 'rheem-rb1cc12k220',
    rank: 10,
    marca: 'Rheem',
    modelo: 'RB1CC12K220',
    nome: 'Rheem RB1CC12K220 12.000 BTUs Frio',
    nota: 8.1,
    precoRef: 2799,
    btu: 12000,
    area: 'até 18 m² (pouco sol)',
    funcoes: ['Refrigerar', 'Desumidificar', 'Ventilar'],
    voltagem: '220 V',
    ruido: '50 a 52 dB',
    peso: '27 kg',
    wifi: 'Não informado',
    controle: 'Sim',
    ciclo: 'Só frio',
    idealPara: 'Quem tem tomada 220 V e quer um aparelho só frio confiável e com autolimpeza.',
    resumo:
      'Versão só frio do Rheem, com o mesmo sistema de autolimpeza, filtro lavável, rodinhas e alças laterais para mudar de cômodo com facilidade.',
    caracteristicas: [
      '12.000 BTUs só frio',
      'Sistema de autolimpeza',
      'Filtro lavável',
      'Rodízios e alças laterais',
      'Controle remoto',
    ],
    beneficios: [
      'Alças e rodinhas facilitam o transporte.',
      'Autolimpeza reduz a manutenção.',
      'Preço menor que a versão quente e frio.',
    ],
    vantagens: ['Autolimpeza em um modelo de entrada', 'Ergonomia para transporte'],
    pros: ['Autolimpeza', 'Alças e rodinhas', 'Preço acessível', 'Filtro lavável'],
    contras: ['Somente 220 V', 'Não aquece', 'Sem Wi-Fi informado'],
    amazonUrl: '',
    mercadoLivreUrl: '',
  },
];

export const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const amazonLink = (p: Produto) =>
  p.amazonUrl ||
  `https://www.amazon.com.br/s?k=${encodeURIComponent(`ar condicionado portátil ${p.marca} ${p.modelo}`)}`;

export const mercadoLivreLink = (p: Produto) =>
  p.mercadoLivreUrl ||
  `https://lista.mercadolivre.com.br/${encodeURIComponent(`ar condicionado portatil ${p.marca} ${p.modelo}`.toLowerCase().replace(/\s+/g, '-'))}`;

export const fotoProduto = (p: Produto) => `/images/produtos/${p.slug}.webp`;
