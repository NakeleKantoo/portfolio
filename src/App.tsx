import { useEffect, useState } from 'react';
import { Page } from './components/Page';
import { copy, type Lang } from './shared/i18n';

const LANG_KEY = 'leonna.idioma';

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'pt';
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'en' || fromUrl === 'pt') return fromUrl;
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'pt') return saved;
  } catch {
    /* sem storage */
  }
  return 'pt';
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    const t = copy[lang];
    document.documentElement.lang = t.htmlLang;
    document.title = t.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.description);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* sem storage */
    }
  }, [lang]);

  return <Page lang={lang} onLang={setLang} />;
}
