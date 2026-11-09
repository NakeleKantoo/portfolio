export type ProjectLink = {
    label: string;
    href: string;
}

export type Project = {
    icon: string;
    title: string;
    tagline: string;
    description: string;
    tags: string[];
    links: ProjectLink[];
}
