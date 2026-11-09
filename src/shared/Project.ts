type Localized = { pt: string; en: string };

export type ProjectLink = {
    label: Localized;
    href: string;
}

export type Project = {
    title: string;
    tagline: Localized;
    description: Localized;
    tags: string[];
    links: ProjectLink[];
}
