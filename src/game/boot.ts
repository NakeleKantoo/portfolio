import { C } from './palette';

export type BootLine = { text: string; color?: string };

export const bootLines: BootLine[] = [
  { text: 'LEONNA-BIOS (C) 2026 NakeleKantoo Industries', color: C.redBright },
  { text: '' },
  { text: 'CPU ........ 1x cérebro, 2 núcleos acordados, 1 café' },
  { text: 'MEM ........ 640K (suficiente pra qualquer um)' },
  { text: 'DISCO ...... /dev/leonna ............ montado', color: C.ok },
  { text: 'GPU ........ CRT fantasma ........... pronto', color: C.ok },
  { text: 'TECLADO .... 95 teclas, 0 vim ....... ok', color: C.ok },
  { text: 'ÁUDIO ...... cmus: nada tocando ..... ok', color: C.ok },
  { text: '' },
  { text: 'carregando tucano.lang ........ [ ok ] 17k linhas de TS', color: C.text },
  { text: 'carregando manilha.protocol ... [ ok ] ws autoritativo', color: C.text },
  { text: 'carregando economias.lua ...... [ ok ] http server caseiro', color: C.text },
  { text: 'carregando docs/ .............. [ ok ] astro starlight', color: C.text },
  { text: 'montando ~/projetos ........... [ ok ] 12 volumes', color: C.text },
  { text: '' },
  { text: 'pronto.', color: C.objectHi },
];

export const LOGO = [
  '╔══════════════════════════════════════════╗',
  '║   l e o n n a . o s   ·  v1.0 (mexerica) ║',
  '╚══════════════════════════════════════════╝',
];
