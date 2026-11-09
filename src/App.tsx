import { useEffect, useState } from 'react';
import { GameView } from './components/GameView';
import { TextMode } from './components/TextMode';

type Mode = 'game' | 'text';

function initialMode(): Mode {
  if (typeof window === 'undefined') return 'game';
  return window.location.hash === '#texto' ? 'text' : 'game';
}

export default function App() {
  const [mode, setMode] = useState<Mode>(initialMode);

  // o jogo é escuro, o modo texto é papel: acompanha a barra do navegador
  useEffect(() => {
    const paper = mode === 'text';
    const color = paper ? '#efe7d5' : '#0d0c0b';
    document.documentElement.style.backgroundColor = color;
    document.documentElement.style.colorScheme = paper ? 'light' : 'dark';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', color);
  }, [mode]);

  if (mode === 'text') {
    return (
      <TextMode
        onGame={() => {
          setMode('game');
          history.replaceState(null, '', window.location.pathname);
        }}
      />
    );
  }

  return (
    <GameView
      onTextMode={() => {
        setMode('text');
        window.location.hash = 'texto';
      }}
    />
  );
}
