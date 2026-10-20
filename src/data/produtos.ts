// Links de afiliado (amazonUrl e mercadoLivreUrl) vêm da planilha "links afiliado.xlsx".
// Se algum ficar vazio, o botão leva para a busca do modelo na loja.
//
// Especificações: ranking do my-best + fichas dos anúncios oficiais nas lojas (out/2026).
// Voltagem: nenhum destes modelos é bivolt; "versoes" indica venda em 127 V e 220 V separadas.
// "opiniao" resume, com palavras nossas, os temas mais citados por compradores em lojas online.

import { type Produto, amazonLink, mercadoLivreLink, fotoProduto } from './tipos';
export { amazonLink, mercadoLivreLink, fotoProduto };

interface PortatilDados {
  slug: string;
  rank: number;
  marca: string;
  modelo: string;
  nome: string;
  selo?: string;
  nota: number;
  btu: number;
  area: string;
  funcoes: string[];
  voltagem: string;
  versoes: boolean;
  ruido: string;
  peso: string;
  dimensoes?: string;
  potencia?: string;
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
  opiniao: { elogios: string[]; criticas: string[]; observacao?: string };
  amazonUrl: string;
  mercadoLivreUrl: string;
}

const dados: PortatilDados[] = [
  {
    slug: 'electrolux-sp12f',
    rank: 1,
    marca: 'Electrolux',
    modelo: 'SP12F',
    nome: 'Electrolux SP12F 12.000 BTUs Frio com Wi-Fi',
    selo: 'Melhor escolha geral',
    nota: 9.6,
    btu: 12000,
    area: 'até 15 m²',
    funcoes: ['Refrigerar', 'Desumidificar', 'Ventilar', 'Timer', 'Modo dormir'],
    voltagem: '127 V ou 220 V (versões separadas)',
    versoes: true,
    ruido: '49 a 52 dB',
    peso: '30 kg',
    dimensoes: '48 × 35 × 88 cm (L × P × A)',
    wifi: 'Sim (app + comando de voz)',
    controle: 'Sim',
    ciclo: 'Só frio',
    idealPara: 'Quem quer o pacote mais completo com ótimo custo-benefício e controle pelo celular.',
    resumo:
      'O Electrolux SP12F junta tudo o que a maioria das pessoas procura: 12.000 BTUs, Wi-Fi com app, comando de voz e eficiência nível A. E ainda entrega um dos melhores custos-benefícios da lista.',
    caracteristicas: [
      '12.000 BTUs de capacidade de refrigeração',
      'Conexão Wi-Fi com aplicativo e compatível com assistentes de voz',
      'Modo "Dormir Bem", que ajusta a temperatura durante a noite',
      'Filtro ionizador lavável',
      '3 velocidades de ventilação e timer',
    ],
    beneficios: [
      'Você liga o ar pelo celular antes de chegar em casa e encontra o quarto já fresco.',
      'O modo dormir reduz o ruído e ajusta a temperatura ao longo da noite.',
      'O filtro ionizador ajuda a deixar o ar mais limpo, o que é bom para quem tem rinite.',
    ],
    vantagens: [
      'Melhor custo-benefício entre os modelos com Wi-Fi',
      'Marca com ampla rede de assistência técnica no Brasil',
    ],
    pros: [
      'Ótimo custo-benefício para um modelo com Wi-Fi',
      'Comando de voz e aplicativo',
      'Eficiência energética nível A',
      'Filtro lavável, sem custo de reposição',
    ],
    contras: [
      'Pesado (30 kg) e um dos mais altos da lista',
      'Não aquece: não serve para o inverno',
      'Não é bivolt: escolha a versão certa da sua tomada',
    ],
    opiniao: {
      elogios: [
        'Gela bem quartos pequenos e médios',
        'Modo dormir ajuda a tornar o barulho aceitável à noite',
        'Fácil de instalar e de mudar de cômodo',
        'Atendimento da Electrolux elogiado ao resolver problemas',
      ],
      criticas: [
        'Faz barulho parecido com o de um ventilador forte',
        'Há relatos de que não dá conta de cômodos de 12 m² ou mais em dias muito quentes',
        'Consumo de energia maior que o de um split',
      ],
    },
    amazonUrl: 'https://link.amazon/B075uq2Gd',
    mercadoLivreUrl: 'https://meli.la/25Q9SWn',
  },
  {
    slug: 'hisense-ap-12cwbrnps01',
    rank: 2,
    marca: 'Hisense',
    modelo: 'AP-12CWBRNPS01',
    nome: 'Hisense AP-12CWBRNPS01 12.000 BTUs Frio',
    selo: 'Mais silencioso no modo dormir',
    nota: 9.4,
    btu: 12000,
    area: 'até 15 m²',
    funcoes: ['Refrigerar', 'Desumidificar', 'Ventilar', 'Modo Smart', 'Modo dormir'],
    voltagem: '127 V',
    versoes: false,
    ruido: '19 dB (dormir) a 56 dB',
    peso: '25 kg',
    dimensoes: '43 × 32 × 69,4 cm (L × P × A)',
    potencia: '1.100 W',
    wifi: 'Sim (app ConnectLife)',
    controle: 'Sim (físico e pelo app)',
    ciclo: 'Só frio',
    idealPara: 'Quem vai usar no quarto e tem sono leve.',
    resumo:
      'O Hisense se destaca pelo modo dormir extremamente silencioso (a partir de 19 dB) e pelo gás R32, mais eficiente e menos agressivo ao meio ambiente. Tem evaporação automática, vem com kit de duto e funciona pelo controle remoto ou pelo aplicativo ConnectLife.',
    caracteristicas: [
      '12.000 BTUs com gás refrigerante R32',
      'Wi-Fi com o aplicativo ConnectLife e controle remoto',
      'Modo Smart, que escolhe sozinho a melhor configuração',
      'Evaporação automática (dreno seco)',
      'Kit de duto de exaustão incluso',
    ],
    beneficios: [
      'No modo dormir ele fica muito mais silencioso, bom para o quarto.',
      'O gás R32 refrigera bem gastando menos energia.',
      'A evaporação automática reduz a necessidade de esvaziar reservatório.',
    ],
    vantagens: [
      'Nível de ruído noturno mais baixo da lista',
      'Gás R32, mais moderno que o R410A',
    ],
    pros: [
      'Modo dormir muito silencioso',
      'Gás R32 eficiente',
      'Aplicativo completo e controle remoto',
      'Compacto para 12.000 BTUs (69 cm de altura)',
    ],
    contras: ['Apenas 127 V', 'No volume máximo chega a 56 dB', 'Não aquece'],
    opiniao: {
      elogios: [
        'Tamanho compacto e boa refrigeração em ambientes pequenos',
        'Vento forte e bom custo-benefício',
        'Muitos dizem que, com a expectativa certa, o resultado agrada',
      ],
      criticas: [
        'Barulho no modo normal, comparado a um ar de janela antigo',
        'Em dias quentes, a temperatura real fica acima da programada (relatos de 19 °C a 24 °C)',
      ],
      observacao: 'É o modelo com mais avaliações entre os 12.000 BTUs com Wi-Fi.',
    },
    amazonUrl: 'https://link.amazon/B08NvaM7n',
    mercadoLivreUrl: 'https://meli.la/2GSQTSt',
  },
  {
    slug: 'philco-pac12000f5',
    rank: 3,
    marca: 'Philco',
    modelo: 'PAC12000F5',
    nome: 'Philco PAC12000F5 12.000 BTUs Frio',
    nota: 9.1,
    btu: 12000,
    area: 'até 15 m²',
    funcoes: ['Refrigerar', 'Desumidificar', 'Automático', 'Timer', 'Oscilação', 'Modo dormir'],
    voltagem: '127 V ou 220 V (versões separadas)',
    versoes: true,
    ruido: '51 dB',
    peso: '25 kg',
    dimensoes: '41,5 × 35 × 71,5 cm (L × P × A)',
    potencia: '1.200 W',
    wifi: 'Não',
    controle: 'Sim',
    ciclo: 'Só frio',
    idealPara: 'Quem quer um aparelho simples, eficiente e fácil de mudar de cômodo.',
    resumo:
      'O Philco PAC12000F5 é direto ao ponto: refrigera bem, tem eficiência nível A, oscilação para espalhar o ar pelo ambiente, painel digital e rodinhas para levar de um cômodo para outro.',
    caracteristicas: [
      '12.000 BTUs com eficiência energética nível A',
      'Modos refrigerar, desumidificar e automático',
      'Função oscilação da saída de ar',
      'Filtro antibacteriano e função Protect',
      'Painel digital, controle remoto e rodízios',
    ],
    beneficios: [
      'A oscilação distribui o ar frio de forma mais uniforme.',
      'Fácil de usar mesmo para quem não gosta de tecnologia.',
      'Quase não é preciso esvaziar o reservatório de água.',
    ],
    vantagens: ['Oscilação automática da saída de ar', 'Um dos modelos mais vendidos e avaliados do Brasil'],
    pros: ['Eficiência nível A', 'Oscilação de ar', 'Rodinhas e painel digital', 'Peso razoável (25 kg)'],
    contras: [
      'Costuma custar mais que concorrentes com recursos parecidos',
      'Sem Wi-Fi',
      'Não aquece',
    ],
    opiniao: {
      elogios: [
        'Bom acabamento e controle simples de usar',
        'Gela bem e é prático de mudar de lugar',
        'Raramente é preciso esvaziar o tanque de água',
      ],
      criticas: [
        'Ruído típico de portátil, que exige adaptação',
        'Aumento perceptível na conta de luz com uso diário',
        'Kit de janela pequeno para algumas janelas',
      ],
      observacao: 'É o modelo da lista com mais avaliações de compradores.',
    },
    amazonUrl: 'https://link.amazon/B07jPirZw',
    mercadoLivreUrl: 'https://meli.la/1YHf1PY',
  },
  {
    slug: 'philco-pac12000qf5',
    rank: 4,
    marca: 'Philco',
    modelo: 'PAC12000QF5',
    nome: 'Philco PAC12000QF5 12.000 BTUs Quente e Frio',
    selo: 'Melhor quente e frio custo-benefício',
    nota: 9.0,
    btu: 12000,
    area: 'até 15 m²',
    funcoes: ['Refrigerar', 'Aquecer', 'Desumidificar', 'Ventilar', 'Automático', 'Modo dormir'],
    voltagem: '127 V ou 220 V (versões separadas)',
    versoes: true,
    ruido: 'até 51 dB',
    peso: '25 kg',
    dimensoes: '41,5 × 35 × 71,5 cm (L × P × A)',
    potencia: '1.200 W',
    wifi: 'Não',
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
      'Eficiência energética nível A.',
    ],
    vantagens: ['Quente e frio com custo próximo ao de modelos só frio', 'Autoevaporação'],
    pros: ['Aquece e refrigera', 'Autoevaporação', 'Eficiência nível A', 'Bom custo-benefício'],
    contras: ['Sem Wi-Fi', 'Sem tecnologia inverter', 'Duto de saída curto, que limita a posição'],
    opiniao: {
      elogios: [
        'Vento bem gelado e boa refrigeração em quartos pequenos e médios',
        'Supera a expectativa de quem esperava "só um ventilador"',
      ],
      criticas: [
        'Encaixe da saída de ar na janela pouco firme',
        'Duto curto: precisa ficar perto da janela',
        'Barulho e aquecimento do gabinete durante o uso',
      ],
    },
    amazonUrl: 'https://link.amazon/B0fhkN9r9',
    mercadoLivreUrl: 'https://meli.la/1H7eKPf',
  },
  {
    slug: 'gree-aovia-gpc10ap',
    rank: 5,
    marca: 'Gree',
    modelo: 'Aovia R32 GPC10AP-A6NNA1A',
    nome: 'Gree Aovia R32 10.000 BTUs Frio',
    selo: 'Mais em conta',
    nota: 8.8,
    btu: 10000,
    area: 'até 12 m²',
    funcoes: ['Refrigerar', 'Desumidificar', 'Resfriamento rápido', 'Timer', 'Modo dormir'],
    voltagem: '127 V',
    versoes: false,
    ruido: '51 a 55 dB',
    peso: '20,5 kg',
    dimensoes: '28,6 × 32 × 70 cm (L × P × A)',
    wifi: 'Não',
    controle: 'Sim',
    ciclo: 'Só frio',
    idealPara: 'Quartos pequenos, escritórios e quem tem orçamento apertado.',
    resumo:
      'O Gree Aovia é o mais leve e o mais estreito da lista, além de um dos mais em conta. Com 10.000 BTUs e gás R32, dá conta de cômodos pequenos e tem um modo de resfriamento rápido para os dias mais quentes.',
    caracteristicas: [
      '10.000 BTUs com gás R32',
      'Função de resfriamento rápido',
      '3 velocidades de ventilação',
      'Timer e modo dormir',
      'Controle remoto',
    ],
    beneficios: [
      'Leve (20,5 kg) e estreito: cabe em cantos onde os outros não cabem.',
      'Boa porta de entrada para quem quer sair do ventilador.',
      'Gás R32 com bom rendimento.',
    ],
    vantagens: ['Um dos mais em conta da lista', 'Mais leve e mais estreito da lista'],
    pros: ['Mais em conta', 'Leve e compacto', 'Gás R32', 'Resfriamento rápido'],
    contras: ['Só serve para ambientes pequenos', 'Apenas 127 V', 'Chega a 55 dB'],
    opiniao: {
      elogios: [
        'Refrigera mais do que o esperado em espaços pequenos',
        'Compacto e fácil de instalar',
        'Barulho descrito como "ruído branco", parecido com ventilador',
      ],
      criticas: ['Em cômodos do tamanho de um quarto, refresca mais do que gela'],
      observacao: 'Tem a melhor média de satisfação entre os modelos com muitas avaliações.',
    },
    amazonUrl: 'https://link.amazon/B0dB2BESc',
    mercadoLivreUrl: 'https://meli.la/11xFpRT',
  },
  {
    slug: 'eos-eap14iqf',
    rank: 6,
    marca: 'EOS',
    modelo: 'EAP14IQF',
    nome: 'EOS Slim Inverter EAP14IQF 14.000 BTUs Quente e Frio',
    selo: 'Melhor inverter custo-benefício',
    nota: 8.7,
    btu: 14000,
    area: 'até 18 m²',
    funcoes: ['Refrigerar', 'Aquecer', 'Ventilar', 'Desumidificar', 'Timer'],
    voltagem: '127 V ou 220 V (versões separadas)',
    versoes: true,
    ruido: 'até 50 dB',
    peso: '26,8 kg',
    dimensoes: '36 × 42 × 69 cm (L × P × A)',
    potencia: '1.100 W',
    wifi: 'Não',
    controle: 'Sim',
    ciclo: 'Quente e frio',
    idealPara: 'Salas e quartos maiores, e quem quer economizar energia com inverter.',
    resumo:
      'O EOS Slim combina 14.000 BTUs, tecnologia inverter e ciclo quente e frio, com design fino e eficiência nível A. É uma das opções mais completas para ambientes médios.',
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
    vantagens: ['Inverter + quente e frio + eficiência A', 'Ruído máximo baixo para 14.000 BTUs'],
    pros: ['Inverter econômico', 'Aquece e refrigera', 'Eficiência nível A', 'Kit de janela incluso'],
    contras: ['Marca com menos assistências que as grandes', 'Sem Wi-Fi', 'Kit de janela curto (cerca de 1 m)'],
    opiniao: {
      elogios: [
        'Climatiza de verdade, acima da média dos portáteis',
        'Vários compradores não acharam barulhento',
      ],
      criticas: ['Adaptador de janela curto e sem fixação na esquadria', 'Ruído incomoda no começo'],
    },
    amazonUrl: 'https://link.amazon/B09gvsUCi',
    mercadoLivreUrl: 'https://meli.la/2ewKzfZ',
  },
  {
    slug: 'lg-lp1419ivsm',
    rank: 7,
    marca: 'LG',
    modelo: 'LP1419IVSM',
    nome: 'LG Dual Inverter LP1419IVSM 14.000 BTUs Frio',
    selo: 'Mais tecnológico',
    nota: 8.6,
    btu: 14000,
    area: 'até 18 m²',
    funcoes: ['Refrigerar', 'Ventilar', 'Desumidificar', 'Modo dormir', 'Timer'],
    voltagem: '127 V',
    versoes: false,
    ruido: '44 dB (dormir) a 53 dB',
    peso: '32,2 kg',
    potencia: '1.370 W',
    wifi: 'Sim (LG ThinQ + assistentes de voz)',
    controle: 'Sim (remoto, app e voz)',
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
    opiniao: {
      elogios: ['Mantém uma sala de 20 m² entre 20 °C e 21 °C mesmo com sol na janela'],
      criticas: [],
      observacao: 'Ainda há poucas avaliações de compradores deste modelo nas lojas brasileiras.',
    },
    amazonUrl: 'https://link.amazon/B05HZP1Lz',
    mercadoLivreUrl: 'https://meli.la/1y6VU7x',
  },
  {
    slug: 'rheem-rb1hp12k220',
    rank: 8,
    marca: 'Rheem',
    modelo: 'RB1HP12K220',
    nome: 'Rheem RB1HP12K220 12.000 BTUs Quente e Frio',
    nota: 8.4,
    btu: 12000,
    area: 'até 18 m²',
    funcoes: ['Refrigerar', 'Aquecer', 'Desumidificar', 'Ventilar', 'Timer'],
    voltagem: '220 V',
    versoes: false,
    ruido: '49 a 51 dB',
    peso: '27 kg',
    dimensoes: '41,9 × 35,8 × 68,8 cm (L × P × A)',
    wifi: 'Não',
    controle: 'Sim',
    ciclo: 'Quente e frio',
    idealPara: 'Casas com tomada 220 V que precisam de aquecimento no inverno.',
    resumo:
      'O Rheem quente e frio tem sistema de autolimpeza antibacteriana, eficiência nível A e um ruído bem controlado, entre 49 e 51 dB. Vem com kit de régua de 1 m para a janela.',
    caracteristicas: [
      '12.000 BTUs com ciclo quente e frio',
      'Autolimpeza antibacteriana',
      'Painel digital e timer programável',
      'Filtro lavável',
      'Kit com duto, régua de janela (100 cm), tubo de drenagem e controle remoto',
    ],
    beneficios: [
      'A autolimpeza ajuda a evitar mofo e mau cheiro.',
      'Ruído baixo e estável, bom para home office.',
      'Aquece nos dias frios.',
    ],
    vantagens: ['Autolimpeza antibacteriana', 'Ruído máximo de apenas 51 dB'],
    pros: ['Quente e frio', 'Autolimpeza', 'Silencioso para a categoria', 'Kit de instalação completo'],
    contras: ['Somente 220 V', 'Sem Wi-Fi', 'Fluxo de ar concentrado, circula pouco pelo cômodo'],
    opiniao: {
      elogios: ['Bonito e fácil de operar pelo controle remoto', 'Refrigera bem quartos'],
      criticas: [
        'Barulho citado com frequência',
        'Consumo de energia alto (há relato de conta de luz dobrando)',
        'Precisa de saída de ar e de água para refrigerar e aquecer',
      ],
    },
    amazonUrl: 'https://link.amazon/B0bKfmVEl',
    mercadoLivreUrl: 'https://meli.la/27mdTZn',
  },
  {
    slug: 'delonghi-pinguino-pact120ed',
    rank: 9,
    marca: 'DeLonghi',
    modelo: 'Pinguino PACT120ED',
    nome: 'DeLonghi Pinguino PACT120ED 12.000 BTUs Frio',
    selo: 'Maior vazão de ar',
    nota: 8.3,
    btu: 12000,
    area: 'até 15 m²',
    funcoes: ['Refrigerar', 'Desumidificar', 'Ventilar', 'Timer 24 h'],
    voltagem: '127 V ou 220 V (versões separadas)',
    versoes: true,
    ruido: 'até 53 dB',
    peso: '26,7 kg',
    dimensoes: '40 × 44 × 84 cm (L × P × A)',
    wifi: 'Não',
    controle: 'Sim',
    ciclo: 'Só frio',
    idealPara: 'Quem valoriza acabamento europeu e um fluxo de ar forte.',
    resumo:
      'O clássico Pinguino da DeLonghi tem isolamento interno para reduzir o barulho e vazão de ar de 430 m³/h, uma das maiores entre os portáteis.',
    caracteristicas: [
      '12.000 BTUs',
      'Vazão de ar de 430 m³/h',
      'Isolamento acústico interno',
      'Timer de 24 horas',
      'Controle remoto',
    ],
    beneficios: [
      'O fluxo de ar forte gela o ambiente mais rápido.',
      'O isolamento interno deixa o som mais abafado.',
      'Acabamento de marca italiana especialista em portáteis.',
    ],
    vantagens: ['Marca italiana especialista em portáteis', 'Vazão de ar alta'],
    pros: ['Fluxo de ar forte', 'Bom acabamento', 'Timer de 24 h', 'Compacto em largura (40 cm)'],
    contras: ['Sem Wi-Fi', 'Não aquece', 'Duto de ar quente curto e com rosca invertida'],
    opiniao: {
      elogios: ['Esfria bem quartos de 10 a 15 m²', 'Relativamente compacto'],
      criticas: [
        'Mangueira de saída de ar curta',
        'Gera bastante água em dias úmidos',
        'Barulho citado por parte dos compradores',
      ],
      observacao: 'Ainda há poucas avaliações nas lojas brasileiras.',
    },
    amazonUrl: 'https://link.amazon/B0hrAz5cA',
    mercadoLivreUrl: 'https://meli.la/1Z6YYcF',
  },
  {
    slug: 'rheem-rb1cc12k220',
    rank: 10,
    marca: 'Rheem',
    modelo: 'RB1CC12K220',
    nome: 'Rheem RB1CC12K220 12.000 BTUs Frio',
    nota: 8.1,
    btu: 12000,
    area: 'até 18 m² (pouco sol)',
    funcoes: ['Refrigerar', 'Desumidificar', 'Ventilar'],
    voltagem: '220 V (há versão 127 V com outro código)',
    versoes: true,
    ruido: '50 a 52 dB',
    peso: '27 kg',
    dimensoes: '41,9 × 35,8 × 68,8 cm (L × P × A)',
    wifi: 'Não',
    controle: 'Sim',
    ciclo: 'Só frio',
    idealPara: 'Quem quer um aparelho só frio confiável, com autolimpeza e fácil de transportar.',
    resumo:
      'Versão só frio do Rheem, com o mesmo sistema de autolimpeza, eficiência nível A, filtro lavável, rodinhas e alças laterais para mudar de cômodo com facilidade.',
    caracteristicas: [
      '12.000 BTUs só frio',
      'Sistema de autolimpeza',
      'Filtro lavável',
      'Rodízios e alças laterais',
      'Kit com duto, régua de janela (100 cm), tubo de drenagem e controle remoto',
    ],
    beneficios: [
      'Alças e rodinhas facilitam o transporte.',
      'Autolimpeza reduz a manutenção.',
      'Costuma custar menos que a versão quente e frio.',
    ],
    vantagens: ['Autolimpeza em um modelo de entrada', 'Ergonomia para transporte'],
    pros: ['Autolimpeza', 'Alças e rodinhas', 'Bom custo-benefício', 'Filtro lavável'],
    contras: ['Não aquece', 'Sem Wi-Fi', 'Régua de janela pequena para janelas grandes'],
    opiniao: {
      elogios: ['Gela bem', 'Barulho aceitável para a categoria'],
      criticas: ['Tubo de saída de ar difícil de encaixar', 'Régua da janela pequena'],
      observacao: 'Ainda há poucas avaliações deste modelo nas lojas brasileiras.',
    },
    amazonUrl: 'https://link.amazon/B0aEgZ1F0',
    mercadoLivreUrl: 'https://meli.la/1kbJLVS',
  },
];

export type ProdutoPortatil = PortatilDados & Produto;

const fichaPortatil = (p: PortatilDados): [string, string][] => [
  ['Capacidade', `${p.btu.toLocaleString('pt-BR')} BTUs`],
  ['Área indicada (estimativa)', p.area],
  ['Ciclo', p.ciclo],
  ['Voltagem', p.voltagem],
  ['Ruído', p.ruido],
  ['Peso', p.peso],
  ...(p.dimensoes ? [['Dimensões', p.dimensoes] as [string, string]] : []),
  ...(p.potencia ? [['Potência elétrica', p.potencia] as [string, string]] : []),
  ['Wi-Fi', p.wifi],
  ['Controle remoto', p.controle],
  ['Funções', p.funcoes.join(', ')],
];

export const produtos: ProdutoPortatil[] = dados.map((p) => ({
  ...p,
  ficha: fichaPortatil(p),
  busca: `ar condicionado portátil ${p.marca} ${p.modelo}`,
  hub: '/melhor-ar-condicionado-portatil/',
}));

export const produtoPorSlug = (slug: string) => produtos.find((p) => p.slug === slug)!;
