# leonna.os

Portfólio da Leonna Tomás Viegas em duas caras: **o tubo** e **o papel**.

- **o tubo** (`/`): uma sala em ASCII art dentro de um monitor de CRT, com shader de verdade
  (WebGL), sequência de boot, blips de som sintetizados e objetos interativos.
- **o papel** (`/#texto`): o mesmo conteúdo impresso — tipografia de zine, grão de papel,
  carimbo, fita adesiva nas bordas e colofão. Sem jogo, sem canvas, tudo em DOM.

## Como jogar

| tecla | ação |
| --- | --- |
| `WASD` / setas | andar pela sala |
| `E` / `Enter` | abrir o objeto que estiver ao lado |
| clique | abrir o objeto clicado |
| `T` | modo texto (site normal, com todos os links) |
| `M` | liga/desliga o som |
| `Esc` | fechar o painel |

Em telas pequenas a sala vira um **menu de terminal** (a grade de 80 colunas fica ilegível
no celular).

## A sala

| objeto | o que é |
| --- | --- |
| TUCANO (centro) | linguagem de programação: site, playground, docs e o post "Making a Language" |
| MANILHA | jogo de cartas com servidor autoritativo |
| ECONOMIAS | backend pessoal escrito em Lua, sem framework |
| APRENDA | plataforma gamificada de ensino |
| CV | o currículo em PDF, renderizado **dentro** da tela (e link para o original) |
| GITHUB / BLOG | cartazes na parede |
| SOM | a rádio: liga/desliga os blips |
| MODO TEXTO | a porta de saída para a versão sem jogo |

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4 (só no DOM; a sala é desenhada em canvas)
- Fontes self-hosted (woff2, OFL) só para o modo texto: Instrument Serif, Instrument Sans,
  JetBrains Mono e Caveat — ver `public/fonts/LICENSE.txt` e `scripts/fetch-fonts.py`
- WebGL puro para o shader CRT: curvatura de tubo, scanlines, bloom, vinheta, flicker e power-on
- **Monocromático**: o canvas carrega apenas luminância; a cor vem do fósforo escolhido
  (âmbar, verde, branco ou vermelho), aplicado no shader (`uTint`) e no CSS (`--phosphor`)
- Áudio 100% sintetizado com WebAudio (osciladores + envelope), nenhum arquivo
- Zero imagem no cenário: tudo é texto numa grade 80×30

## Estrutura

```
src/
  game/
    screen.ts     grade de caracteres → canvas 960×720 (4:3)
    crt.ts        shader CRT + tint do fósforo + fallback 2D
    world.ts      sala, objetos, colisão e hit-test do clique
    boot.ts       texto da sequência de boot
    audio.ts      blips (passo, abrir, fechar, negar, boot)
    palette.ts    luminâncias + cores de fósforo
  components/
    GameView.tsx    boot, movimento, interação, loop de render, som e fósforo
    MenuScreen.tsx  versão em lista para mobile
    ProjectPanel.tsx painel do objeto (inclusive o leitor de PDF)
    TextMode.tsx    o impresso: zine em papel, acessível e indexável
    ProjectCard.tsx recorte de jornal com fita adesiva e numeração
```

## Rotas

- `/` — o jogo
- `/#texto` — o impresso (modo texto)
- `/?gl=0` — força o fallback 2D (sem shader), útil para depurar

## Acessibilidade

- link "pular o jogo" no primeiro Tab
- `prefers-reduced-motion` pula o boot animado e desliga flicker/rolagem do CRT
- todo o conteúdo existe em DOM no modo texto, com links reais
- som desligado por preferência fica desligado (localStorage)

## Fontes

```bash
python3 scripts/fetch-fonts.py   # baixa os woff2 e regera src/fonts.css
```

As fontes só são baixadas pelo navegador quando o modo texto aparece — o jogo não usa
nenhuma delas.

## Rodando

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
npm run preview
```
