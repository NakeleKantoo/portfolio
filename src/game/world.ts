import { C } from './palette';

export const COLS = 80;
export const ROWS = 30;
/** Linhas 0..MAP_ROWS-1 são a sala; o resto é HUD. */
export const MAP_ROWS = 27;

export type Target =
  | { kind: 'project'; project: string }
  | { kind: 'link'; href: string }
  | { kind: 'pdf'; href: string }
  | { kind: 'sound' }
  | { kind: 'text' };

export type GameObject = {
  id: string;
  x: number;
  y: number;
  sprite: string[];
  label: string;
  hint: string;
  target: Target;
  /** objetos "principais" brilham mais */
  hero?: boolean;
};

export const PLAYER_START = { x: 40, y: 23 };

export const objects: GameObject[] = [
  {
    id: 'tucano',
    x: 30,
    y: 6,
    label: 'TUCANO',
    hint: 'linguagem de programação em português',
    hero: true,
    target: { kind: 'project', project: 'Tucano' },
    sprite: [
      '╔═════════════════╗',
      '║                 ║',
      '║ ┌─────────────┐ ║',
      '║ │ >_ TUCANO   │ ║',
      '║ │    ( •>     │ ║',
      '║ └─────────────┘ ║',
      '║                 ║',
      '╚════════╤════════╝',
      '       ▄▄▄▄▄▄▄     ',
    ],
  },
  {
    id: 'github',
    x: 18,
    y: 2,
    label: 'GITHUB',
    hint: 'código, forks e experimentos',
    target: { kind: 'link', href: 'https://github.com/NakeleKantoo' },
    sprite: ['╔═══════════╗', '║  >_  git  ║', '║  fork me  ║', '╚═══════════╝'],
  },
  {
    id: 'blog',
    x: 48,
    y: 2,
    label: 'BLOG',
    hint: 'posts, incluindo "Making a Language"',
    target: { kind: 'link', href: 'https://leonnaviegas.dev.br/posts/' },
    sprite: ['╔═════════════╗', '║ NakeleBlog  ║', '║  posts/  *  ║', '╚═════════════╝'],
  },
  {
    id: 'manilha',
    x: 10,
    y: 7,
    label: 'MANILHA',
    hint: 'jogo de cartas multiplayer',
    target: { kind: 'project', project: 'Manilha' },
    sprite: [' ┌─┬─┬─┬─┐ ', ' │♠│♦│♣│♥│ ', ' └─┴─┴─┴─┘ ', '  ═╪═╪═╪═  '],
  },
  {
    id: 'economias',
    x: 63,
    y: 7,
    label: 'ECONOMIAS',
    hint: 'backend em Lua, sem framework',
    target: { kind: 'project', project: 'Economias' },
    sprite: ['┌──────┐', '│██████│', '│──────│', '│██████│', '│──────│', '└──────┘'],
  },
  {
    id: 'cv',
    x: 27,
    y: 19,
    label: 'CV',
    hint: 'é o teu pdf, mas dentro do tubo',
    target: { kind: 'pdf', href: '/curriculum.pdf' },
    sprite: ['┌───────┐', '│ * * * │', '├───────┤', '│═══════│'],
  },
  {
    id: 'radio',
    x: 52,
    y: 17,
    label: 'SOM',
    hint: 'liga/desliga os blips do terminal',
    target: { kind: 'sound' },
    sprite: ['┌───────────┐', '│ ● ┌─────┐ │', '│   │ ♪♪♪ │ │', '└───┴─────┴─┘'],
  },
  {
    id: 'sair',
    x: 72,
    y: 18,
    label: 'MODO TEXTO',
    hint: 'a versão do site sem jogo',
    target: { kind: 'text' },
    sprite: ['╔═══╗', '║   ║', '║  o║', '║   ║', '║   ║', '╚═══╝'],
  },
];

/** Decoração sólida, sem interação. */
const decor: { x: number; y: number; sprite: string[]; color: string }[] = [
  { x: 3, y: 2, color: C.wall, sprite: ['╔═══════╗', '║ · · · ║', '║ · ✦ · ║', '╚═══════╝'] },
  { x: 3, y: 21, color: C.wall, sprite: ['\\|/', ' | ', '─┴─'] },
  { x: 58, y: 23, color: C.dim, sprite: [' /\\_/\\ ', '( -.- )'] },
];

function rect(obj: GameObject) {
  return {
    x0: obj.x,
    y0: obj.y,
    x1: obj.x + Math.max(...obj.sprite.map((l) => l.length)) - 1,
    y1: obj.y + obj.sprite.length - 1,
  };
}

export function isWall(x: number, y: number) {
  return x <= 0 || x >= COLS - 1 || y <= 0 || y >= MAP_ROWS - 1;
}

export function isBlocked(x: number, y: number) {
  if (isWall(x, y)) return true;
  for (const obj of objects) {
    const r = rect(obj);
    if (x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1) return true;
  }
  for (const d of decor) {
    const w = Math.max(...d.sprite.map((l) => l.length));
    if (x >= d.x && x < d.x + w && y >= d.y && y < d.y + d.sprite.length) return true;
  }
  return false;
}

export function objectAt(x: number, y: number): GameObject | undefined {
  return objects.find((obj) => {
    const r = rect(obj);
    return x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1;
  });
}

export function isAdjacent(px: number, py: number, obj: GameObject) {
  const r = rect(obj);
  const dx = Math.max(r.x0 - px, 0, px - r.x1);
  const dy = Math.max(r.y0 - py, 0, py - r.y1);
  return Math.max(dx, dy) <= 1;
}

export function nearestObject(px: number, py: number) {
  return objects.find((obj) => isAdjacent(px, py, obj));
}

export function drawMap(put: (x: number, y: number, ch: string, color: string) => void) {
  for (let y = 0; y < MAP_ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (isWall(x, y)) {
        const shade = (x * 3 + y * 5) % 4 === 0;
        put(x, y, shade ? '░' : '▒', shade ? C.wall : C.wallDark);
      } else {
        put(x, y, '·', C.floor);
      }
    }
  }

  // tapete na frente do Tucano
  for (let y = 15; y <= 17; y++) {
    for (let x = 28; x <= 50; x++) {
      put(x, y, (x + y) % 2 === 0 ? '·' : ' ', C.rug);
    }
  }

  // skirting
  for (let x = 0; x < COLS; x++) put(x, MAP_ROWS - 1, '▄', C.wallDark);
}

export function drawDecor(put: (x: number, y: number, ch: string, color: string) => void) {
  for (const d of decor) {
    d.sprite.forEach((line, dy) => {
      for (let dx = 0; dx < line.length; dx++) {
        if (line[dx] !== ' ') put(d.x + dx, d.y + dy, line[dx], d.color);
      }
    });
  }
}
