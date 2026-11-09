import { Project } from "../shared/Project"

export const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    return (
        <article className="clip">
            <div className="clip-head">
                <h3 className="clip-title">{project.title}</h3>
                <span className="clip-num">Nº {String(index + 1).padStart(2, '0')}</span>
            </div>

            <p className="clip-tagline">{project.tagline}</p>
            <p className="clip-text">{project.description}</p>

            <ul className="clip-tags" aria-label={`tecnologias de ${project.title}`}>
                {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>

            <ul className="clip-links" aria-label={`links de ${project.title}`}>
                {project.links.map((link) => (
                    <li key={link.href}>
                        <a href={link.href} target="_blank" rel="noreferrer">
                            {link.label} <span aria-hidden="true">↗</span>
                            <span className="sr-only"> (abre em nova aba)</span>
                        </a>
                    </li>
                ))}
            </ul>
        </article>
    )
}
