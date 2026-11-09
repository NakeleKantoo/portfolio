import type { Project } from "../shared/Project"
import type { Lang } from "../shared/i18n"

export const ProjectCard = ({
    project,
    index,
    lang,
    newTab,
}: {
    project: Project
    index: number
    lang: Lang
    newTab: string
}) => {
    return (
        <article className="clip">
            <div className="clip-head">
                <h3 className="clip-title">{project.title}</h3>
                <span className="clip-num">Nº {String(index + 1).padStart(2, '0')}</span>
            </div>

            <p className="clip-tagline">{project.tagline[lang]}</p>
            <p className="clip-text">{project.description[lang]}</p>

            <ul className="clip-tags" aria-label={`${project.title} — tags`}>
                {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>

            <ul className="clip-links" aria-label={`${project.title} — links`}>
                {project.links.map((link) => (
                    <li key={link.href}>
                        <a href={link.href} target="_blank" rel="noreferrer">
                            {link.label[lang]} <span aria-hidden="true">↗</span>
                            <span className="sr-only">{newTab}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </article>
    )
}
