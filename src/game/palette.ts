/**
 * A tela é monocromática: o canvas só carrega *luminância*.
 * A cor final vem do fósforo escolhido (shader + CSS var --phosphor).
 */
export const C = {
  bg: '#0a0a0a',
  bgScreen: '#0e0e0e',
  wall: '#3d3d3d',
  wallDark: '#1e1e1e',
  floor: '#2e2e2e',
  rug: '#262626',
  player: '#ffffff',
  object: '#a8a8a8',
  objectHi: '#e8e8e8',
  label: '#7a7a7a',
  hud: '#8f8f8f',
  hudHi: '#ffffff',
  text: '#cfcfcf',
  dim: '#5f5f5f',
  red: '#bdbdbd',
  redBright: '#eaeaea',
  green: '#b4b4b4',
  ok: '#c4c4c4',
} as const;

export type PhosphorId = 'amber' | 'green' | 'white' | 'red';

export const PHOSPHORS: Record<PhosphorId, { hex: string; label: string }> = {
  amber: { hex: '#ffb000', label: 'âmbar' },
  green: { hex: '#4dff8f', label: 'verde' },
  white: { hex: '#e8f2ff', label: 'branco' },
  red: { hex: '#ff5040', label: 'vermelho' },
};
