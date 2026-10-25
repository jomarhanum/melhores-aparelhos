// Todos os produtos de todas as categorias, para componentes que buscam por slug.
import type { Produto } from './tipos';
import { produtos as portateis } from './produtos';
import { inverters } from './inverter';
import { fornos } from './forno';
import { bancadas } from './bancada';
import { ventiladores } from './ventilador';
import { colunas } from './coluna';
import { geladeiras } from './geladeira';
import { airfryers } from './airfryer';
import { maquinas } from './maquina';
import { cafeteiras } from './cafeteira';
import { cafeteirasEletricas } from './cafeteira-eletrica';

export const todosProdutos: Produto[] = [...portateis, ...inverters, ...fornos, ...bancadas, ...ventiladores, ...colunas, ...geladeiras, ...airfryers, ...maquinas, ...cafeteiras, ...cafeteirasEletricas];

export const buscarProduto = (slug: string) => {
  const p = todosProdutos.find((x) => x.slug === slug);
  if (!p) throw new Error(`Produto não encontrado: ${slug}`);
  return p;
};
