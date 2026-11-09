import { useEffect } from 'react';
import { Link } from './Link';
import { ProjectCard } from './ProjectCard';
import { projects } from '../shared/Projects';

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
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans antialiased">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-[var(--bg)] focus:text-[var(--text-h)] focus:px-4 focus:py-2 focus:border focus:border-[var(--accent)] focus:rounded"
      >
        Pular para o conteúdo
      </a>

      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--border)] pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-h)]">Leonna Tomás Viegas</h1>
          <p className="text-sm text-slate-300">Computer Science Student & Aspiring Developer</p>
        </div>
        <nav aria-label="Links de contato" className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-mono">
          <Link href="/curriculum.pdf" text="Curriculum" />
          <Link href="https://github.com/NakeleKantoo" text="Github" />
          <Link href="https://www.linkedin.com/in/leonna-viegas/" text="LinkedIn" />
          <Link href="mailto:profissional@leonnaviegas.dev.br" text="Email" />
        </nav>
      </header>

      <main id="conteudo">
        <section className="py-12 border-b border-[var(--border)]" aria-labelledby="about-title">
          <h2 id="about-title" className="text-xl font-bold text-[var(--text-h)] mb-4">About Me</h2>
          <p className="leading-relaxed sm:text-justify mb-6">
            Computer Science student focused on systems architecture, backend development, and
            infrastructure. Experienced in building scalable APIs, process automation, and managing
            self-hosted environments. Committed to software craftsmanship, clean code, and solving
            complex architectural challenges.
          </p>
          <button
            type="button"
            onClick={onGame}
            className="font-mono text-xs uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
          >
            [ G ] voltar para o jogo
          </button>
        </section>

        <section className="py-12" aria-labelledby="projects-title">
          <h2 id="projects-title" className="text-xl font-bold text-[var(--text-h)] mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-[var(--border)] py-6 text-center text-sm text-slate-400 flex flex-col justify-center items-center gap-1">
        <p>© {new Date().getFullYear()} • Built with Love</p>
        <Link href="https://github.com/NakeleKantoo/portfolio" text="Check this page out on Github" />
      </footer>
    </div>
  );
}
