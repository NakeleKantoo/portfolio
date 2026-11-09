import { C } from './palette';

export type Cell = { ch: string; color: string };

const FONT = '20px "DejaVu Sans Mono", "Fira Code", "Hack", ui-monospace, monospace';

/**
 * Renderiza uma grade de caracteres num canvas 80x30 (960x720 = 4:3, formato de CRT).
 * O canvas resultante é usado como textura do shader CRT.
 */
export class AsciiScreen {
  readonly canvas: HTMLCanvasElement;
  readonly cols: number;
  readonly rows: number;
  readonly cellW: number;
  readonly cellH: number;
  private ctx: CanvasRenderingContext2D;
  private buf: Cell[][];

  constructor(cols = 80, rows = 30, cellW = 12, cellH = 24) {
    this.cols = cols;
    this.rows = rows;
    this.cellW = cellW;
    this.cellH = cellH;

    this.canvas = document.createElement('canvas');
    this.canvas.width = cols * cellW;
    this.canvas.height = rows * cellH;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('canvas 2d indisponível');
    this.ctx = ctx;
    this.ctx.font = FONT;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';

    this.buf = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ ch: ' ', color: C.text })),
    );
  }

  clear() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.buf[y][x].ch = ' ';
        this.buf[y][x].color = C.text;
      }
    }
  }

  cell(x: number, y: number, ch: string, color: string) {
    if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) return;
    const c = this.buf[y][x];
    c.ch = ch;
    c.color = color;
  }

  text(x: number, y: number, str: string, color: string) {
    for (let i = 0; i < str.length; i++) this.cell(x + i, y, str[i], color);
  }

  /** Escreve centralizado a partir de uma coluna. */
  center(y: number, str: string, color: string) {
    this.text(Math.max(0, Math.floor((this.cols - str.length) / 2)), y, str, color);
  }

  /** Desenha o sprite respeitando a grade; `highlight` clareia o sprite. */
  sprite(x: number, y: number, lines: string[], color: string) {
    lines.forEach((line, dy) => {
      for (let dx = 0; dx < line.length; dx++) {
        const ch = line[dx];
        if (ch !== ' ') this.cell(x + dx, y + dy, ch, color);
      }
    });
  }

  present() {
    const { ctx } = this;
    ctx.fillStyle = C.bgScreen;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    let current = '';
    for (let y = 0; y < this.rows; y++) {
      const row = this.buf[y];
      for (let x = 0; x < this.cols; x++) {
        const cell = row[x];
        if (cell.ch === ' ') continue;
        if (cell.color !== current) {
          ctx.fillStyle = cell.color;
          current = cell.color;
        }
        ctx.fillText(cell.ch, x * this.cellW, y * this.cellH + this.cellH / 2);
      }
    }
  }
}
