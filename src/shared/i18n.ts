export type Lang = 'pt' | 'en';

export const LANGS: Lang[] = ['pt', 'en'];

type Copy = {
  htmlLang: string;
  title: string;
  description: string;
  kicker: string;
  subtitle: string;
  strip: string;
  stampTop: string;
  stampBottom: string;
  nav: { resumo: string; github: string; linkedin: string; email: string };
  langLabel: string;
  newTab: string;
  skip: string;
  sections: { about: string; projects: string; end: string };
  note: (age: number) => string;
  about: [string, string];
  ticket: { labels: [string, string, string]; values: [string, string, string] };
  footer: {
    labels: [string, string, string];
    thisPage: string;
    smallPrint: string;
    signature: (age: number) => string;
    copyright: (year: number) => string;
    codeLink: string;
  };
};

export const copy: Record<Lang, Copy> = {
  pt: {
    htmlLang: 'pt-BR',
    title: 'Leonna Tomás Viegas — compiladores, backend e infraestrutura',
    description:
      'Portfólio de Leonna Tomás Viegas: linguagens de programação, backend e infraestrutura. Tucano, Manilha e Economias.',
    kicker: 'caderno de projetos · vol. 1',
    subtitle: 'Ciência da Computação, 7º período · compiladores, backend e infraestrutura.',
    strip:
      'nakelekantoo ✶ portfólio ✶ tiragem única ✶ 2026 ✶ impresso em casa ✶ sem fins lucrativos ✶',
    stampTop: 'portfólio',
    stampBottom: '2026',
    nav: { resumo: 'currículo', github: 'github', linkedin: 'linkedin', email: 'email' },
    langLabel: 'idioma',
    newTab: ' (abre em nova aba)',
    skip: 'Pular para o conteúdo',
    sections: { about: 'Sobre', projects: 'Projetos selecionados', end: 'Fim da tiragem' },
    note: (age) => `${age} anos, Arch Linux, Lua e café demais. bleeeeh.`,
    about: [
      'Estudante de Ciência da Computação em Ipatinga. Trabalho com backend e infraestrutura: APIs, automação do que é chato de fazer à mão e servidores que eu mesma administro — este domínio roda em Apache, numa máquina minha. O Tucano, uma linguagem de programação para ensinar adolescentes, é meu projeto de extensão e TCC.',
      'Já passei por um estágio de desenvolvimento em C# com integração SAP. No tempo livre escrevo linguagem de programação, faço jogos de carta e construo ferramentas para mim mesma. Se elas servirem para você também, melhor ainda.',
    ],
    ticket: {
      labels: ['foco', 'tecnologias', 'onde'],
      values: ['compiladores · backend · infra', 'typescript · node · react · c# · sql', 'ipatinga, mg · utc−3'],
    },
    footer: {
      labels: ['contato', 'esta página', 'letra miúda'],
      thisPage:
        'Escrita à mão em React, Vite e Tailwind. O grão do papel é um SVG, as fontes são da Google (OFL) e não existe uma única imagem no layout.',
      smallPrint:
        'Sem cookies, sem analytics, sem banner. Feita no Arch, entre uma xícara e outra. Se quiser conversar sobre linguagem, servidor ou jogo de carta, é só escrever.',
      signature: (age) => `obrigada por ler até o fim — leonna, ${age} anos`,
      copyright: (year) => `© ${year} Leonna Tomás Viegas · tiragem única`,
      codeLink: 'código no github',
    },
  },
  en: {
    htmlLang: 'en',
    title: 'Leonna Tomás Viegas — compilers, backend and infrastructure',
    description:
      'Portfolio of Leonna Tomás Viegas: programming languages, backend and infrastructure. Tucano, Manilha and Economias.',
    kicker: 'project notebook · vol. 1',
    subtitle: 'Computer Science, 7th semester · compilers, backend and infrastructure.',
    strip: 'nakelekantoo ✶ portfolio ✶ single print run ✶ 2026 ✶ printed at home ✶ non-profit ✶',
    stampTop: 'portfolio',
    stampBottom: '2026',
    nav: { resumo: 'resume', github: 'github', linkedin: 'linkedin', email: 'email' },
    langLabel: 'language',
    newTab: ' (opens in a new tab)',
    skip: 'Skip to content',
    sections: { about: 'About', projects: 'Selected projects', end: 'End of the run' },
    note: (age) => `${age}, Arch Linux, Lua and too much coffee. bleeeeh.`,
    about: [
      'Computer Science student in Ipatinga, Brazil. I work on backend and infrastructure: APIs, automating what is boring to do by hand and servers I run myself — this domain is served by Apache on a machine of mine. Tucano, a programming language for teaching teenagers, is my extension project and thesis.',
      'I did an internship in C# development with SAP integration. In my free time I write programming languages, make card games and build tools for myself. If they help you too, even better.',
    ],
    ticket: {
      labels: ['focus', 'stack', 'where'],
      values: ['compilers · backend · infra', 'typescript · node · react · c# · sql', 'ipatinga, br · utc−3'],
    },
    footer: {
      labels: ['contact', 'this page', 'fine print'],
      thisPage:
        'Handwritten in React, Vite and Tailwind. The paper grain is an SVG, the fonts are Google (OFL) and there is not a single layout image.',
      smallPrint:
        'No cookies, no analytics, no banner. Made on Arch, between two cups of coffee. If you want to talk about languages, servers or card games, just write.',
      signature: (age) => `thanks for reading to the end — leonna, ${age} years old`,
      copyright: (year) => `© ${year} Leonna Tomás Viegas · single print run`,
      codeLink: 'code on github',
    },
  },
};
