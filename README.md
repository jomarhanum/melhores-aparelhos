# Melhores Aparelhos

Blog de reviews (Astro, estático) — keyword principal: **melhor ar condicionado portátil**.

## Comandos
- `npm run dev` — ambiente local
- `npm run build` — gera `dist/`
- `npm run og` — regenera favicons e imagem de compartilhamento

## Onde editar
- **Links de afiliado:** `src/data/produtos.ts` → campos `amazonUrl` e `mercadoLivreUrl` de cada produto (vazios = botão leva para a busca do modelo na loja).
- **Domínio:** `src/data/url.mjs` (melhoresaparelhos.com.br).
- **Fotos dos produtos:** `public/images/produtos/<slug>.webp` (otimize com `node scripts/otimizar-produtos.mjs <pasta>`).
- **E-mail de contato, autor, menu:** `src/data/site.ts`.

Desenvolvido por [JH Online Solutions](https://jhonlinesolutions.com.br).
