import { Link } from "./components/Link";
import { ProjectCard } from "./components/ProjectCard";
import { Project } from "./shared/Project";
import { projects } from "./shared/Projects";

export default function App() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans antialiased">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--border)] pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-h)]">Leonna Tomás Viegas</h1>
          <p className="text-sm opacity-80">Computer Science Student & Aspiring Developer</p>
        </div>
        {/* Contact Links */}
        <div className="flex gap-4 text-sm font-mono">
          <Link href="/curriculum.pdf" text="Curriculum" />
          <Link href="https://github.com/NakeleKantoo" text="Github" />
          <Link href="https://www.linkedin.com/in/leonna-viegas/" text="LinkedIn" />
          <Link href="mailto:profissional@leonnaviegas.dev.br" text="Email" />
        </div>
      </header>

      {/* About Section */}
      <section className="py-12 border-b border-[var(--border)]">
        <h2 className="text-xl font-bold text-[var(--text-h)] mb-4">About Me</h2>
        <p className="leading-relaxed text-justify mb-6">
          Computer Science student focused on systems architecture,
          backend development, and infrastructure. Experienced in
          building scalable APIs, process automation, and managing
          self-hosted environments. Committed to software craftsmanship,
          clean code, and solving complex architectural challenges.
        </p>

      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <h2 className="text-xl font-bold text-[var(--text-h)] mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-[var(--border)] py-6 text-center text-sm opacity-60 flex flex-col justify-center items-center">
        <p>© 2026 • Built with Love</p>
        <Link href="https://github.com/NakeleKantoo/portfolio" text="Check this page out on Github" />
      </footer>
    </div>
  );
}
