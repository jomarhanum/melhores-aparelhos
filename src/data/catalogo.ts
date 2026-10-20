// Todos os produtos de todas as categorias, para componentes que buscam por slug.
import type { Produto } from './tipos';
import { produtos as portateis } from './produtos';
import { inverters } from './inverter';

export const todosProdutos: Produto[] = [...portateis, ...inverters];

export const buscarProduto = (slug: string) => {
  const p = todosProdutos.find((x) => x.slug === slug);
  if (!p) throw new Error(`Produto não encontrado: ${slug}`);
  return p;
};
