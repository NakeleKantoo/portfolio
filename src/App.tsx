import { useState } from 'react';
import { GameView } from './components/GameView';
import { TextMode } from './components/TextMode';

type Mode = 'game' | 'text';

function initialMode(): Mode {
  if (typeof window === 'undefined') return 'game';
  return window.location.hash === '#texto' ? 'text' : 'game';
}

export default function App() {
  const [mode, setMode] = useState<Mode>(initialMode);

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
