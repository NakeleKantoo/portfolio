import { useEffect, useRef, useState } from 'react';
import { AsciiScreen } from '../game/screen';
import { createPainter, type Painter } from '../game/crt';
import { C, PHOSPHORS, type PhosphorId } from '../game/palette';
import { LOGO, bootLines } from '../game/boot';
import { audio } from '../game/audio';
import {
  COLS,
  MAP_ROWS,
  PLAYER_START,
  ROWS,
  drawDecor,
  drawMap,
  isBlocked,
  nearestObject,
  objectAt,
  objects,
  type GameObject,
} from '../game/world';
import { ProjectPanel } from './ProjectPanel';
import { MenuScreen } from './MenuScreen';

type Phase = 'boot' | 'play';

const PHOSPHOR_KEY = 'leonna.fosforo';
const HINTS = '[WASD/setas] andar   [E] interagir   [T] modo texto';

function readPhosphor(): PhosphorId {
  try {
    const saved = localStorage.getItem(PHOSPHOR_KEY);
    if (saved && saved in PHOSPHORS) return saved as PhosphorId;
  } catch {
    /* sem storage */
  }
  return 'amber';
}

export function GameView({ onTextMode }: { onTextMode: () => void }) {
  const displayRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<Phase>('boot');
  const [active, setActive] = useState<GameObject | null>(null);
  const [screenMode, setScreenMode] = useState<'webgl' | '2d'>('webgl');
  const [phosphor, setPhosphor] = useState<PhosphorId>(readPhosphor);
  const [soundOn, setSoundOn] = useState(() => audio.isOn());
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches,
  );

  const painterRef = useRef<Painter | null>(null);
  const phosphorRef = useRef(phosphor);
  phosphorRef.current = phosphor;

  const activeRef = useRef<GameObject | null>(null);
  const onTextModeRef = useRef(onTextMode);
  onTextModeRef.current = onTextMode;

  const soundOnRef = useRef(soundOn);
  soundOnRef.current = soundOn;

  const toggleSound = () => {
    const next = audio.toggle();
    setSoundOn(next);
    return next;
  };
  const toggleSoundRef = useRef(toggleSound);
  toggleSoundRef.current = toggleSound;

  // fósforo: CSS var (DOM) + uniforme do shader
  useEffect(() => {
    const hex = PHOSPHORS[phosphor].hex;
    document.documentElement.style.setProperty('--phosphor', hex);
    try {
      localStorage.setItem(PHOSPHOR_KEY, phosphor);
    } catch {
      /* sem storage */
    }
    painterRef.current?.setTint(hex);
  }, [phosphor]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const onChange = () => setCompact(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const canvas = displayRef.current;
    if (!canvas || compact) return;

    const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ascii = new AsciiScreen(COLS, ROWS);
    const force2d = new URLSearchParams(window.location.search).get('gl') === '0';
    const painter = createPainter(canvas, motion, force2d, PHOSPHORS[phosphorRef.current].hex);
    painterRef.current = painter;
    setScreenMode(painter.kind);

    const st = {
      phase: 'boot' as Phase,
      bootIndex: motion ? 0 : bootLines.length,
      x: PLAYER_START.x,
      y: PLAYER_START.y,
      flash: null as { text: string; until: number } | null,
    };
    if (!motion) {
      st.phase = 'play';
      setPhase('play');
    }

    let dirty = true;
    const markDirty = () => {
      dirty = true;
    };

    const openObject = (obj: GameObject) => {
      if (obj.target.kind === 'sound') {
        const on = toggleSoundRef.current();
        st.flash = { text: `som ${on ? 'ligado' : 'desligado'}`, until: performance.now() + 1600 };
        markDirty();
        window.setTimeout(markDirty, 1700);
        return;
      }
      activeRef.current = obj;
      setActive(obj);
      audio.open();
      markDirty();
    };

    const closeObject = () => {
      activeRef.current = null;
      setActive(null);
      audio.close();
      markDirty();
    };

    const drawBoot = () => {
      ascii.clear();
      const lx = Math.floor((COLS - LOGO[0].length) / 2);
      LOGO.forEach((line, i) => ascii.text(lx, 3 + i, line, C.redBright));

      const n = Math.min(st.bootIndex, bootLines.length);
      for (let i = 0; i < n; i++) {
        const line = bootLines[i];
        if (line.text) ascii.text(10, 9 + i, line.text, line.color ?? C.text);
      }

      const pct = Math.round((n / bootLines.length) * 100);
      const barW = 44;
      const filled = Math.round((pct / 100) * barW);
      const bar = '█'.repeat(filled) + '░'.repeat(barW - filled);
      ascii.text(10, 26, `[${bar}] ${String(pct).padStart(3, ' ')}%`, C.ok);
      if (motion) {
        const blink = Math.floor(performance.now() / 500) % 2 === 0;
        ascii.text(
          10,
          28,
          blink ? 'pressione qualquer tecla para pular ▮' : 'pressione qualquer tecla para pular',
          C.dim,
        );
      }
    };

    const drawPlay = () => {
      ascii.clear();
      const put = (x: number, y: number, ch: string, color: string) => ascii.cell(x, y, ch, color);
      drawMap(put);
      drawDecor(put);

      const near = nearestObject(st.x, st.y);

      for (const obj of objects) {
        const isNear = near?.id === obj.id;
        const base = obj.hero ? C.objectHi : C.object;
        ascii.sprite(obj.x, obj.y, obj.sprite, isNear ? C.objectHi : base);
        const w = Math.max(...obj.sprite.map((l) => l.length));
        const lx = Math.max(1, obj.x + Math.floor((w - obj.label.length) / 2));
        ascii.text(lx, obj.y - 1, obj.label, isNear ? C.hudHi : C.label);
      }

      ascii.cell(st.x, st.y, '@', C.player);

      // HUD
      for (let x = 1; x < COLS - 1; x++) ascii.cell(x, MAP_ROWS, '─', C.wallDark);
      ascii.text(2, MAP_ROWS + 1, HINTS, C.hud);
      const tag = soundOnRef.current ? 'leonna.os v1.0 ♪' : 'leonna.os v1.0';
      ascii.text(COLS - tag.length - 2, MAP_ROWS + 1, tag, C.hudHi);

      const flashing = st.flash && performance.now() < st.flash.until;
      if (flashing && st.flash) {
        ascii.text(2, MAP_ROWS + 2, `» ${st.flash.text}`, C.hudHi);
      } else if (near) {
        ascii.text(2, MAP_ROWS + 2, `» [E] ${near.label} · ${near.hint}`, C.hudHi);
      } else {
        ascii.text(2, MAP_ROWS + 2, '» ande até um objeto (ou clique nele)', C.dim);
      }
    };

    const draw = () => {
      if (st.phase === 'boot') drawBoot();
      else drawPlay();
      ascii.present();
      painter.setSource(ascii.canvas);
    };

    const startPlaying = () => {
      st.phase = 'play';
      st.bootIndex = bootLines.length;
      setPhase('play');
      audio.open();
      markDirty();
    };

    const timer = motion
      ? window.setInterval(() => {
          if (st.phase !== 'boot') return;
          st.bootIndex++;
          markDirty();
          if (st.bootIndex > bootLines.length) {
            window.clearInterval(timer);
            startPlaying();
          }
        }, 130)
      : 0;

    const move = (dx: number, dy: number) => {
      if (st.phase !== 'play' || activeRef.current) return;
      const nx = st.x + dx;
      const ny = st.y + dy;
      if (isBlocked(nx, ny)) {
        audio.deny();
        return;
      }
      st.x = nx;
      st.y = ny;
      audio.step();
      markDirty();
    };

    const interact = () => {
      if (st.phase === 'boot') {
        startPlaying();
        return;
      }
      if (activeRef.current) return;
      const near = nearestObject(st.x, st.y);
      if (near) openObject(near);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) return;
      audio.unlock();
      if (e.key === 't' || e.key === 'T') {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        onTextModeRef.current();
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        const on = toggleSoundRef.current();
        st.flash = { text: `som ${on ? 'ligado' : 'desligado'}`, until: performance.now() + 1600 };
        markDirty();
        window.setTimeout(markDirty, 1700);
        return;
      }
      if (st.phase === 'boot') {
        e.preventDefault();
        startPlaying();
        return;
      }
      if (activeRef.current) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeObject();
        }
        return;
      }
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          move(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          move(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          move(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          move(1, 0);
          break;
        case 'e':
        case 'E':
        case 'Enter':
          e.preventDefault();
          interact();
          break;
        default:
          break;
      }
    };

    const onClick = (e: MouseEvent) => {
      audio.unlock();
      if (st.phase === 'boot') {
        startPlaying();
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const cx = Math.floor(((e.clientX - rect.left) / rect.width) * COLS);
      const cy = Math.floor(((e.clientY - rect.top) / rect.height) * ROWS);
      const obj = objectAt(cx, cy);
      if (obj) openObject(obj);
    };

    window.addEventListener('keydown', onKey);
    canvas.addEventListener('click', onClick);

    const ro = new ResizeObserver(() => painter.resize());
    ro.observe(canvas);

    let raf = 0;
    let lastBlink = 0;
    let lastBootBlink = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      if (st.phase === 'boot') {
        const tick = Math.floor(now / 500);
        if (tick !== lastBootBlink) {
          lastBootBlink = tick;
          markDirty();
        }
      } else if (!activeRef.current) {
        // cursor piscando na tela do CRT: mantém a cena "viva"
        const tick = Math.floor(now / 650);
        if (tick !== lastBlink) {
          lastBlink = tick;
          markDirty();
        }
      }
      if (dirty) {
        dirty = false;
        draw();
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      if (timer) window.clearInterval(timer);
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('click', onClick);
      ro.disconnect();
      painter.dispose();
      painterRef.current = null;
    };
  }, [compact]);

  const cyclePhosphor = () => {
    const ids = Object.keys(PHOSPHORS) as PhosphorId[];
    const next = ids[(ids.indexOf(phosphor) + 1) % ids.length];
    setPhosphor(next);
  };

  return (
    <div className="min-h-svh flex flex-col items-center justify-center gap-5 px-4 py-6">
      <h1 className="sr-only">Leonna Tomás Viegas — portfólio interativo (leonna.os)</h1>
      <a
        href="#texto"
        onClick={(e) => {
          e.preventDefault();
          onTextMode();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-[var(--bg)] focus:text-[var(--text-h)] focus:px-4 focus:py-2 focus:border focus:border-[var(--accent)] focus:rounded"
      >
        Pular o jogo e ler o site em modo texto
      </a>

      <div className="monitor">
        <div className="screen" data-compact={compact ? 'true' : 'false'}>
          {compact ? (
            <MenuScreen
              activeId={active?.id ?? null}
              onOpen={(obj) => {
                if (obj.target.kind === 'sound') {
                  toggleSound();
                  return;
                }
                setActive(obj);
              }}
            />
          ) : (
            <canvas ref={displayRef} className="display" aria-hidden="true" />
          )}
          <div className="crt-overlay" data-kind={screenMode} aria-hidden="true" />
          <div className="screen-glare" aria-hidden="true" />
          {active && (
            <ProjectPanel
              object={active}
              soundOn={soundOn}
              onToggleSound={toggleSound}
              onClose={() => {
                setActive(null);
                activeRef.current = null;
                audio.close();
              }}
              onTextMode={onTextMode}
            />
          )}
        </div>

        <div className="bezel-plate">
          <span className="led" data-phase={compact ? 'play' : phase} />
          <span>LEONNA · CRT 14&quot; · {compact ? 'menu' : screenMode === 'webgl' ? 'shader ativo' : 'modo compatível'}</span>
          <span className="plate-buttons">
            <button type="button" className="plate-btn" onClick={toggleSound} aria-pressed={soundOn}>
              ♪ {soundOn ? 'som' : 'mudo'}
            </button>
            <button
              type="button"
              className="plate-btn"
              onClick={cyclePhosphor}
              aria-label={`fósforo ${PHOSPHORS[phosphor].label}, clique para trocar`}
            >
              ◐ {PHOSPHORS[phosphor].label}
            </button>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        {!compact && (
          <p className="text-[11px] font-mono text-[var(--text-dim)] text-center">
            WASD/setas andar · E interagir · T modo texto · M som · clique nos objetos também funciona
          </p>
        )}
        <button
          type="button"
          onClick={onTextMode}
          className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors underline-offset-4 hover:underline"
        >
          [ T ] ver tudo em modo texto
        </button>
      </div>
    </div>
  );
}
