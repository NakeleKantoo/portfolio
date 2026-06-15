import { Project } from "../shared/Project"

export const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="border-[2px] border-red-900 rounded-lg p-6 bg-black-900 flex flex-col justify-between hover:shadow-sm hover:scale-105 duration-500 transition-all ease-in-out group"
            onClick={() => {window.open(project.url)}}
        >
            <div className="flex flex-col items-center">
                <img src={project.icon} className="size-[48px] mb-1 rounded-xl"/>
                <h3 className="text-xl font-bold text-red-500 mb-2 border-b-2 border-transparent group-hover:border-red-800 transition-all ease-in-out duration-500">{project.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300 text-center">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="hover:bg-slate-600 transition-all ease-in-out bg-slate-900 text-slate-100 px-2 py-1 rounded text-xs font-medium">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}