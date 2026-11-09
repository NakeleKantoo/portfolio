import { Project } from "../shared/Project"

export const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <article className="border-2 border-[var(--accent-border)] rounded-lg p-6 flex flex-col justify-between gap-6 transition-all duration-500 ease-in-out hover:border-[var(--accent)]">
            <div className="flex flex-col items-center text-center">
                <img
                    src={project.icon}
                    alt={`${project.title} icon`}
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="size-[48px] mb-3 rounded-xl"
                />
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">{project.title}</h3>
                <p className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-3">{project.tagline}</p>
                <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>
            </div>

            <div>
                <ul className="flex flex-wrap gap-2 list-none p-0 m-0" aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                        <li key={tag} className="bg-[#141310] text-slate-200 px-2 py-1 rounded text-xs font-medium">
                            {tag}
                        </li>
                    ))}
                </ul>

                <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-4 pt-3 border-t border-[var(--accent-border)] list-none p-0 font-mono text-xs" aria-label={`${project.title} links`}>
                    {project.links.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors underline-offset-4 hover:underline"
                            >
                                {link.label} <span aria-hidden="true">↗</span>
                                <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    )
}
