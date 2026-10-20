// Tipo base de produto, comum a todas as categorias (ar portátil, ar inverter, airfryer...).
// Cada categoria tem seu arquivo de dados e monta a "ficha" (tabela de especificações) do seu jeito.

export interface Opiniao {
  elogios: string[];
  criticas: string[];
  observacao?: string;
}

export interface Produto {
  slug: string;
  rank: number;
  marca: string;
  modelo: string;
  nome: string;
  selo?: string;
  nota: number;
  idealPara: string;
  resumo: string;
  caracteristicas: string[];
  beneficios: string[];
  vantagens: string[];
  pros: string[];
  contras: string[];
  opiniao?: Opiniao;
  /** Vendido em versões separadas de 127 V e 220 V (não bivolt). */
  versoes?: boolean;
  /** Linhas da ficha técnica exibida no card. */
  ficha: [string, string][];
  /** Termo de busca usado quando ainda não há link de afiliado. */
  busca: string;
  /** Página principal (comparativo) da categoria. */
  hub: string;
  /** '' = ainda sem link (botão leva à busca na loja); null = produto não vendido na loja (botão some). */
  amazonUrl: string | null;
  mercadoLivreUrl: string | null;
}

export const amazonLink = (p: Produto): string | null =>
  p.amazonUrl === null ? null : p.amazonUrl || `https://www.amazon.com.br/s?k=${encodeURIComponent(p.busca)}`;

export const mercadoLivreLink = (p: Produto): string | null =>
  p.mercadoLivreUrl === null
    ? null
    : p.mercadoLivreUrl ||
      `https://lista.mercadolivre.com.br/${encodeURIComponent(p.busca.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-'))}`;

export const fotoProduto = (p: Pick<Produto, 'slug'>) => `/images/produtos/${p.slug}.webp`;
