import { useEffect } from 'react';
import { ProjectCard } from './ProjectCard';
import { projects } from '../shared/Projects';

const CONTACTS = [
  { href: '/curriculum.pdf', text: 'currículo' },
  { href: 'https://github.com/NakeleKantoo', text: 'github' },
  { href: 'https://www.linkedin.com/in/leonna-viegas/', text: 'linkedin' },
  { href: 'mailto:profissional@leonnaviegas.dev.br', text: 'email' },
];

export function TextMode({ onGame }: { onGame: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'g' || e.key === 'G') && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        onGame();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onGame]);

  return (
    <div className="paper">
      <div className="paper-inner">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:border focus:border-current"
        >
          Pular para o conteúdo
        </a>

        <div className="strip" aria-hidden="true">
          <div className="strip-track">
            <span className="strip-item">
              nakelekantoo ✶ portfólio ✶ tiragem única ✶ <em>2026</em> ✶ impresso em casa ✶ sem
              fins lucrativos ✶ volte ao tubo com [ g ] ✶
            </span>
            <span className="strip-item">
              nakelekantoo ✶ portfólio ✶ tiragem única ✶ <em>2026</em> ✶ impresso em casa ✶ sem
              fins lucrativos ✶ volte ao tubo com [ g ] ✶
            </span>
          </div>
        </div>

        <header className="sheet-head">
          <div>
            <p className="kicker">caderno de projetos · vol. 1</p>
            <h1 className="sheet-title">
              Leonna Tomás <span className="scribble">Viegas</span>
            </h1>
            <p className="sheet-sub">
              Ciência da Computação · compiladores, backend e infraestrutura.
            </p>
            <nav className="sheet-nav" aria-label="Links de contato">
              {CONTACTS.map((c) => (
                <a key={c.href} href={c.href} target="_blank" rel="noreferrer">
                  {c.text}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="stamp" aria-hidden="true">
            portfólio
            <br />
            2026
          </div>
        </header>

        <main id="conteudo">
          <section className="sheet-section" aria-labelledby="sobre">
            <div className="section-head">
              <span className="section-num">01</span>
              <h2 id="sobre">Sobre</h2>
              <span className="section-rule" aria-hidden="true" />
            </div>

            <div className="sheet-cols">
              <aside className="margin-note">
                20 anos, Arch Linux,
                <br />
                Lua e café demais.
                <br />
                bleeeeh.
              </aside>

              <div className="prose">
                <p>
                  Estudante de Ciência da Computação focada em arquitetura de sistemas, backend e
                  infraestrutura. Gosto de construir APIs, automatizar o que é chato e cuidar dos
                  meus próprios servidores — o blog que mora neste domínio roda em Apache, numa
                  máquina que eu mesma administro.
                </p>
                <p>
                  No tempo livre escrevo linguagem de programação, faço jogos de carta e construo
                  ferramentas para mim mesma. Se elas servirem para você também, melhor ainda.
                </p>

                <dl className="ticket">
                  <div>
                    <dt>foco</dt>
                    <dd>compiladores · backend · infra</dd>
                  </div>
                  <div>
                    <dt>tecnologias</dt>
                    <dd>typescript · lua · react · sql</dd>
                  </div>
                  <div>
                    <dt>onde</dt>
                    <dd>brasil · utc−3 · remoto</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <section className="sheet-section" aria-labelledby="projetos">
            <div className="section-head">
              <span className="section-num">02</span>
              <h2 id="projetos">Projetos selecionados</h2>
              <span className="section-rule" aria-hidden="true" />
            </div>

            <div className="sheet-grid">
              {projects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>
          </section>
        </main>

        <footer className="colophon">
          <p>
            <strong>colofão</strong> — composto em Instrument Serif, Instrument Sans e JetBrains
            Mono. Impresso em casa, tiragem única, sem fins lucrativos.{' '}
            <span aria-hidden="true" style={{ fontFamily: 'var(--hand)', fontSize: '19px' }}>
              ( •&gt;
            </span>
          </p>
          <p>
            © {new Date().getFullYear()} Leonna Tomás Viegas ·{' '}
            <a
              href="https://github.com/NakeleKantoo/portfolio"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted underline-offset-4"
            >
              código desta página
            </a>
          </p>
          <button type="button" onClick={onGame} className="back-to-game">
            [ g ] voltar para o tubo
          </button>
        </footer>
      </div>
    </div>
  );
}
