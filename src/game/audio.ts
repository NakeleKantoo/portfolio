/** Blips de terminal via WebAudio — nenhum arquivo de áudio. */

type ToneOpts = {
  to?: number;
  dur?: number;
  type?: OscillatorType;
  gain?: number;
};

const STORAGE_KEY = 'leonna.som';

function readPref(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

let enabled = readPref();
let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function ensure(): AudioContext | null {
  if (!enabled) return null;
  if (!ctx) {
    const Ctor = window.AudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.14;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function tone(freq: number, opts: ToneOpts = {}) {
  const ac = ensure();
  if (!ac || !master) return;
  const { to = freq, dur = 0.07, type = 'square', gain = 0.5 } = opts;
  const t0 = ac.currentTime;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (to !== freq) osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

export const audio = {
  unlock() {
    ensure();
  },
  isOn() {
    return enabled;
  },
  toggle(): boolean {
    enabled = !enabled;
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
    } catch {
      /* sem storage, segue o baile */
    }
    if (enabled) {
      ensure();
      tone(520, { to: 780, dur: 0.09, type: 'triangle' });
    }
    return enabled;
  },
  step() {
    tone(170 + Math.random() * 40, { dur: 0.03, gain: 0.3 });
  },
  deny() {
    tone(95, { to: 70, dur: 0.09, type: 'sawtooth', gain: 0.22 });
  },
  open() {
    tone(430, { to: 900, dur: 0.09, type: 'triangle', gain: 0.45 });
  },
  close() {
    tone(700, { to: 320, dur: 0.08, type: 'triangle', gain: 0.35 });
  },
  bootTick() {
    tone(1300, { dur: 0.012, gain: 0.08 });
  },
  power() {
    tone(60, { to: 120, dur: 0.5, type: 'sine', gain: 0.25 });
  },
};
