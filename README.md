# leonna.os

Portfólio da Leonna Tomás Viegas — um **impresso** em forma de site: papel, tinta, carimbo e
tipografia de zine. Sem jogo, sem canvas, sem uma única imagem no layout. Bilíngue (pt/en).

## Estrutura

```
src/
  components/
    Page.tsx        a folha: cabeçalho, sobre, projetos, colofão
    ProjectCard.tsx recorte de jornal com fita adesiva e numeração
  shared/
    i18n.ts         todo o texto do site, em pt e en
    Projects.ts     os três projetos, com tagline/descrição nos dois idiomas
    profile.ts      data de nascimento e idade calculada na hora
  index.css         papel, grão, perfuração, recortes e colofão
  fonts.css         gerado por scripts/fetch-fonts.py
public/
  fonts/            Instrument Serif/Sans, JetBrains Mono, Caveat (OFL)
  curriculum.pdf
  og.png            cartão social 1200x630 no mesmo papel
```

## Idioma

- `pt` por padrão, `en` na troca do cabeçalho (ou tecla `l`)
- a escolha fica em `localStorage` (`leonna.idioma`)
- `?lang=en` força o idioma sem gravar preferência
- trocar o idioma atualiza `<html lang>`, `<title>` e a meta description

## Idade

`src/shared/profile.ts` guarda `BIRTH = { year, month, day }` e `getAge()` compara a data de
hoje com ela, então o número se corrige sozinho no aniversário — aparece na nota da margem e
na assinatura do rodapé.

## Fontes

```bash
python3 scripts/fetch-fonts.py   # baixa os woff2 (subset latin) e regera src/fonts.css
```

Todas são SIL Open Font License 1.1 — ver `public/fonts/LICENSE.txt`.

## Acessibilidade

- skip-link no primeiro Tab, `main`, `nav` e `footer` com rótulos
- contraste de tinta sobre papel acima de 7:1
- `prefers-reduced-motion` para a fita do topo e as inclinações
- `@media print` deixa a folha imprimível de verdade

## Rodando

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
npm run preview
```
