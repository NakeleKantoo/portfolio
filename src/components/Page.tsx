import { useEffect } from 'react';
import { ProjectCard } from './ProjectCard';
import { projects } from '../shared/Projects';
import { copy, type Lang } from '../shared/i18n';
import { AGE } from '../shared/profile';

const EMAIL = 'profissional@leonnaviegas.dev.br';

export function Page({ lang, onLang }: { lang: Lang; onLang: (lang: Lang) => void }) {
  const t = copy[lang];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        onLang(lang === 'pt' ? 'en' : 'pt');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lang, onLang]);

  return (
    <div className="paper">
      <div className="paper-inner">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:border focus:border-current"
        >
          {t.skip}
        </a>

        <header className="sheet-head">
          <div>
            <p className="kicker">{t.kicker}</p>
            <h1 className="sheet-title">
              Leonna Tomás <span className="scribble">Viegas</span>
            </h1>
            <p className="sheet-sub">{t.subtitle}</p>

            <div className="header-actions">
              <nav className="sheet-nav" aria-label={t.nav.github}>
                <a href="/curriculum.pdf" target="_blank" rel="noreferrer">
                  {t.nav.resumo}
                  <span className="sr-only">{t.newTab}</span>
                </a>
                <a href="https://github.com/NakeleKantoo" target="_blank" rel="noreferrer">
                  {t.nav.github}
                  <span className="sr-only">{t.newTab}</span>
                </a>
                <a href="https://www.linkedin.com/in/leonna-viegas/" target="_blank" rel="noreferrer">
                  {t.nav.linkedin}
                  <span className="sr-only">{t.newTab}</span>
                </a>
                <a href={`mailto:${EMAIL}`}>{t.nav.email}</a>
              </nav>

              <div className="lang-switch" role="group" aria-label={t.langLabel}>
                <button type="button" aria-pressed={lang === 'pt'} onClick={() => onLang('pt')}>
                  pt
                </button>
                <span aria-hidden="true">/</span>
                <button type="button" aria-pressed={lang === 'en'} onClick={() => onLang('en')}>
                  en
                </button>
              </div>
            </div>
          </div>

          <div className="stamp" aria-hidden="true">
            {t.stampTop}
            <br />
            {t.stampBottom}
          </div>
        </header>

        <main id="conteudo">
          <section className="sheet-section" aria-labelledby="sobre">
            <div className="section-head">
              <span className="section-num">01</span>
              <h2 id="sobre">{t.sections.about}</h2>
              <span className="section-rule" aria-hidden="true" />
            </div>

            <div className="sheet-cols">
              <aside className="margin-note">{t.note(AGE)}</aside>

              <div className="prose">
                <p>{t.about[0]}</p>
                <p>{t.about[1]}</p>

                <dl className="ticket">
                  {t.ticket.labels.map((label, i) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{t.ticket.values[i]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          <section className="sheet-section" aria-labelledby="projetos">
            <div className="section-head">
              <span className="section-num">02</span>
              <h2 id="projetos">{t.sections.projects}</h2>
              <span className="section-rule" aria-hidden="true" />
            </div>

            <div className="sheet-grid">
              {projects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} lang={lang} newTab={t.newTab} />
              ))}
            </div>
          </section>
        </main>

        <footer className="colophon" aria-labelledby="fim">
          <div className="section-head">
            <span className="section-num">03</span>
            <h2 id="fim">{t.sections.end}</h2>
            <span className="section-rule" aria-hidden="true" />
          </div>

          <div className="colophon-grid">
            <div>
              <p className="colophon-label">{t.footer.labels[0]}</p>
              <ul className="colophon-links">
                <li>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
                <li>
                  <a href="https://github.com/NakeleKantoo" target="_blank" rel="noreferrer">
                    github.com/NakeleKantoo
                    <span className="sr-only">{t.newTab}</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/leonna-viegas/" target="_blank" rel="noreferrer">
                    linkedin.com/in/leonna-viegas
                    <span className="sr-only">{t.newTab}</span>
                  </a>
                </li>
                <li>
                  <a href="/curriculum.pdf" target="_blank" rel="noreferrer">
                    curriculum.pdf <span aria-hidden="true">↓</span>
                    <span className="sr-only">{t.newTab}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="colophon-label">{t.footer.labels[1]}</p>
              <p>{t.footer.thisPage}</p>
            </div>

            <div>
              <p className="colophon-label">{t.footer.labels[2]}</p>
              <p>{t.footer.smallPrint}</p>
            </div>
          </div>

          <p className="signature">
            <span aria-hidden="true">( •&gt; </span>
            {t.footer.signature(AGE)}
          </p>

          <p className="colophon-fine">
            {t.footer.copyright(new Date().getFullYear())} ·{' '}
            <a href="https://github.com/NakeleKantoo/portfolio" target="_blank" rel="noreferrer">
              {t.footer.codeLink}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
