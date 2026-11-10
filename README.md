# Melhores Aparelhos

Blog de reviews (Astro, estático) — https://melhoresaparelhos.com.br

## Comandos
- `npm run dev` — ambiente local
- `npm run build` — gera `dist/`
- `npm run og` — regenera favicons e imagem de compartilhamento
- `node scripts/otimizar-produtos.mjs <pasta>` — converte fotos de produto para WebP em `public/images/produtos/`
- `npm run indexnow` — depois do build e do deploy, avisa Bing/Yandex (IndexNow) das páginas novas ou alteradas (compara o `lastmod` do sitemap com `indexnow-estado.json`). `-- --todas` reenvia tudo.

- `node scripts/virar-ano.mjs 2026 2027` — mostra onde o ano "de vitrine" (títulos, H1, descrições) seria trocado; com `--gravar`, troca e atualiza a data dos comparativos. Rodar na última semana de dezembro.

> Para uma página contar como "alterada", atualize a data `atualizado` dela em `src/data/artigos.mjs` (ou em `astro.config.mjs`, nas páginas fixas).

## Estrutura
| O quê | Onde |
|---|---|
| Categorias (menu da home, migalhas, guias) | `src/data/categorias.mjs` |
| Registro de artigos (títulos, datas, sitemap, "Leia também") | `src/data/artigos.mjs` |
| Tipo base de produto e links de compra | `src/data/tipos.ts` |
| Produtos — ar portátil | `src/data/produtos.ts` |
| Produtos — ar inverter | `src/data/inverter.ts` |
| Domínio | `src/data/url.mjs` |
| E-mail, autor, menu | `src/data/site.ts` |

## Guias em Markdown (publicação automática)
Arquivos em `src/content/guias/<slug>.md` viram `/guias/<slug>/` com o layout `Artigo` e entram sozinhos no registro de artigos
(sitemap, `/guias/`, "Leia também", llms.txt e o bloco "Guias de …" no fim de cada hub). Não precisam de entrada em `artigos.mjs`.
Frontmatter: um campo por linha, valor em JSON (`titulo`, `h1`, `descricao`, `secao` = id de `categorias.mjs`, `publicado`,
`atualizado`, `imagem`, `resumo`, `faq` e, opcional, `relacionados`). `> **Resumo:** ...` vira a caixa de destaque.
O workflow do n8n **[MA] Guia diário** escreve esses arquivos com a pauta da Data Table `ma_pautas` e faz o commit na `main`.

## Links de afiliado
Preencha `amazonUrl` e `mercadoLivreUrl` de cada produto no arquivo da categoria. Vazios = o botão leva para a busca do modelo na loja.

## Como adicionar uma nova categoria (ex.: airfryer)
1. Crie `src/data/airfryer.ts` no modelo de `inverter.ts`: dados + função `ficha` + `hub: '/melhor-airfryer/'`.
2. Inclua a lista em `src/data/catalogo.ts`.
3. Adicione a categoria em `src/data/categorias.mjs` e o item no menu (`src/data/site.ts`).
4. Crie o hub `src/pages/melhor-airfryer.astro` (copie `melhor-ar-condicionado-inverter.astro`) e registre-o em `artigos.mjs` com `secao: 'airfryer'`.
5. Artigos de apoio usam o layout `Artigo.astro` e precisam estar em `artigos.mjs`.
6. Fotos em `public/images/produtos/<slug>.webp` e fotos do hub em `astro.config.mjs` (`fotosDoHub`).

Desenvolvido por [JH Online Solutions](https://jhonlinesolutions.com.br).
