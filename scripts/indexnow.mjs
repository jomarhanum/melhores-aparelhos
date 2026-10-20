// Avisa Bing, Yandex e outros buscadores (via IndexNow) sobre páginas novas ou alteradas.
// Uso: npm run indexnow  (depois de "npm run build" e do deploy)
//      npm run indexnow -- --todas   (reenvia todas as páginas)
// Compara o <lastmod> do sitemap com o último envio, salvo em indexnow-estado.json.
// As requisições usam o curl, que é mais estável que o fetch do Node no Windows.
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { SITE_URL } from '../src/data/url.mjs';

const KEY = 'b91e1d15e2ba5213d81a223b233ac0aa';
const ESTADO = 'indexnow-estado.json';
const host = new URL(SITE_URL).host;

// Executa o curl e devolve { status, corpo }. Tenta até 3 vezes em caso de falha de rede.
const curl = (args) => {
  for (let i = 1; ; i++) {
    try {
      const saida = execFileSync('curl', ['-s', '--ssl-no-revoke', '-m', '30', '-w', '\n%{http_code}', ...args], { encoding: 'utf8' });
      const corte = saida.lastIndexOf('\n');
      return { status: Number(saida.slice(corte + 1)), corpo: saida.slice(0, corte) };
    } catch (e) {
      if (i >= 3) throw e;
    }
  }
};

const xml = readFileSync('dist/sitemap-0.xml', 'utf8');
const paginas = [...xml.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => ({ url: m[1], lastmod: m[2] ?? '' }));
const anterior = existsSync(ESTADO) ? JSON.parse(readFileSync(ESTADO, 'utf8')) : {};
const todas = process.argv.includes('--todas');
const enviar = paginas.filter((p) => todas || anterior[p.url] !== p.lastmod).map((p) => p.url);

if (!enviar.length) {
  console.log('Nenhuma página nova ou alterada desde o último envio.');
  process.exit(0);
}

// Confere se o arquivo da chave está publicado.
const chave = curl([`${SITE_URL}/${KEY}.txt`]);
if (chave.status !== 200 || chave.corpo.trim() !== KEY) {
  console.error(`Arquivo da chave não encontrado em ${SITE_URL}/${KEY}.txt. Publique o site antes.`);
  process.exit(1);
}

// Só envia páginas que já respondem 200 no site publicado (evita avisar páginas de um deploy que falhou).
for (const u of enviar) {
  const { status } = curl(['-o', process.platform === 'win32' ? 'NUL' : '/dev/null', '-I', u]);
  if (status !== 200) {
    console.error(`${u} respondeu ${status}. Confira o deploy antes de enviar ao IndexNow.`);
    process.exit(1);
  }
}

const corpoArq = join(mkdtempSync(join(tmpdir(), 'indexnow-')), 'corpo.json');
writeFileSync(corpoArq, JSON.stringify({ host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList: enviar }));
const r = curl(['-X', 'POST', '-H', 'Content-Type: application/json; charset=utf-8', '--data-binary', `@${corpoArq}`, 'https://api.indexnow.org/indexnow']);
console.log(`IndexNow respondeu ${r.status} para ${enviar.length} página(s):`);
enviar.forEach((u) => console.log(`  ${u}`));

// 200 = aceito; 202 = recebido, chave ainda em validação. Outros códigos: não grava o estado.
if (r.status === 200 || r.status === 202) {
  writeFileSync(ESTADO, JSON.stringify(Object.fromEntries(paginas.map((p) => [p.url, p.lastmod])), null, 2) + '\n');
} else {
  console.error(r.corpo);
  process.exit(1);
}
