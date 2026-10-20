// Avisa Bing, Yandex e outros buscadores (via IndexNow) sobre páginas novas ou alteradas.
// Uso: npm run indexnow  (depois de "npm run build" e do deploy)
//      npm run indexnow -- --todas   (reenvia todas as páginas)
// Compara o <lastmod> do sitemap com o último envio, salvo em indexnow-estado.json.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { SITE_URL } from '../src/data/url.mjs';

const KEY = 'b91e1d15e2ba5213d81a223b233ac0aa';

// Conexões às vezes são resetadas no Windows: tenta até 3 vezes.
const fetchTentando = async (url, opcoes, tentativas = 3) => {
  for (let i = 1; ; i++) {
    try {
      return await fetch(url, opcoes);
    } catch (e) {
      if (i >= tentativas) throw e;
      await new Promise((r) => setTimeout(r, 2000 * i));
    }
  }
};
const ESTADO = 'indexnow-estado.json';
const host = new URL(SITE_URL).host;

const xml = readFileSync('dist/sitemap-0.xml', 'utf8');
const paginas = [...xml.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => ({ url: m[1], lastmod: m[2] ?? '' }));
const anterior = existsSync(ESTADO) ? JSON.parse(readFileSync(ESTADO, 'utf8')) : {};
const todas = process.argv.includes('--todas');
const enviar = paginas.filter((p) => todas || anterior[p.url] !== p.lastmod).map((p) => p.url);

if (!enviar.length) {
  console.log('Nenhuma página nova ou alterada desde o último envio.');
  process.exit(0);
}

// Confere se o arquivo da chave já está publicado antes de enviar.
const chave = await fetchTentando(`${SITE_URL}/${KEY}.txt`);
if (!chave.ok || (await chave.text()).trim() !== KEY) {
  console.error(`Arquivo da chave não encontrado em ${SITE_URL}/${KEY}.txt. Publique o site antes.`);
  process.exit(1);
}

// Só envia páginas que já respondem 200 no site publicado (evita avisar páginas de um deploy que falhou).
for (const u of enviar) {
  const resp = await fetchTentando(u, { method: 'HEAD' });
  if (!resp.ok) {
    console.error(`${u} respondeu ${resp.status}. Confira o deploy antes de enviar ao IndexNow.`);
    process.exit(1);
  }
}

const r = await fetchTentando('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList: enviar }),
});
console.log(`IndexNow respondeu ${r.status} ${r.statusText} para ${enviar.length} página(s):`);
enviar.forEach((u) => console.log(`  ${u}`));

// 200 = aceito; 202 = recebido, chave ainda em validação. Outros códigos: não grava o estado.
if (r.status === 200 || r.status === 202) {
  writeFileSync(ESTADO, JSON.stringify(Object.fromEntries(paginas.map((p) => [p.url, p.lastmod])), null, 2) + '\n');
} else {
  console.error(await r.text());
  process.exit(1);
}
