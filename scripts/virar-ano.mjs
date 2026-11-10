// Troca o ano "de vitrine" (títulos, H1, descrições e textos como "melhores de 2026") pelo ano novo.
// Não mexe em datas (2026-10-19), em referências de pesquisa (out/2026, "outubro de 2026") nem em normas.
// Uso: node scripts/virar-ano.mjs 2026 2027          -> mostra o que mudaria
//      node scripts/virar-ano.mjs 2026 2027 --gravar -> grava e atualiza a data "atualizado" dos comparativos
// Rodar na última semana de dezembro, conferir os preços/modelos dos hubs e fazer o deploy.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const [de, para, flag] = process.argv.slice(2);
if (!/^\d{4}$/.test(de || '') || !/^\d{4}$/.test(para || '')) {
  console.error('Uso: node scripts/virar-ano.mjs <ano-atual> <ano-novo> [--gravar]');
  process.exit(1);
}
const gravar = flag === '--gravar';
const meses = 'janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro|jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez';
// Ano isolado, que não seja data ISO, nem "out/2026", nem "outubro de 2026", nem parte de número maior.
// Frases factuais que citam o ano de um acontecimento (não é vitrine): a linha inteira fica como está.
const FATO = /Google em|lançad[oa]s? em|desde|padrão \d{4}|Portaria|norma/i;
const re = new RegExp(`(?<![\\d/.-])(?<!(?:${meses}) de )${de}(?![\\d-])`, 'gi');

const arquivos = [];
(function andar(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) andar(p);
    else if (/\.(astro|mjs|ts|md)$/.test(f)) arquivos.push(p);
  }
})('src');

let total = 0;
const hoje = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
for (const p of arquivos) {
  const s = readFileSync(p, 'utf8');
  const linhas = s.split('\n');
  let mudou = 0;
  linhas.forEach((l, i) => {
    // Comentários de fonte/pesquisa ficam com o ano real.
    if (/^\s*(\/\/|\*|\/\*)/.test(l) || FATO.test(l)) return;
    if (re.test(l)) {
      re.lastIndex = 0;
      mudou++;
      if (!gravar) console.log(`${p}:${i + 1}  ${l.trim().slice(0, 140)}`);
    }
    re.lastIndex = 0;
  });
  if (!mudou) continue;
  total += mudou;
  if (gravar) {
    let novo = linhas.map((l) => (/^\s*(\/\/|\*|\/\*)/.test(l) || FATO.test(l) ? l : l.replace(re, para))).join('\n');
    // Comparativos cujo texto mudou: "atualizado" vai para hoje (sitemap e IndexNow percebem).
    if (p.endsWith('artigos.mjs')) {
      novo = novo.replace(/(\{[^{}]*?categoria: 'Comparativo'[^{}]*?atualizado: ')(\d{4}-\d{2}-\d{2})(')/g, `$1${hoje}$3`);
    }
    writeFileSync(p, novo);
  }
}
console.log(`\n${total} linha(s) ${gravar ? 'alteradas' : 'seriam alteradas'}${gravar ? '' : ' (use --gravar)'}.`);
