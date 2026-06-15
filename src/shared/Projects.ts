import { Project } from "./Project";

export const projects = [
  {
    icon: '/tucano.png',
    title: "Tucano",
    description: "A programming language made for teaching Brazilian High School Students algorithms and problem-solving, written in Typescript it features a web playground for the students to learn while building awesome projects.",
    tags: ["React", "Compilers", "TypeScript", "Vite.js"],
    url: 'https://linguagemtucano.com.br'
  },
  {
    icon: '/quanto.png',
    title: "Quanto",
    description: "A financial application designed to automate the tedious task of filling out details of your supermarket trips into a spreadsheet, it scans your receipt and automatically inserts it into a database, it can also show you spending statistics.",
    tags: ["React Native", "Node.js", "SQLite3", "Express.js"],
    url: 'https://github.com/NakeleKantoo/ReceiptReader'
  },
  {
    icon: '/hajapaciencia.png',
    title: "Haja Paciencia",
    description: "A Solitaire game implementation focused on simple gameplay.",
    tags: ["LÖVE2D", "Lua", "Android", "Gradle"],
    url: 'https://github.com/ALGAS-Jogos/HajaPaciencia'
  }
] as Project[];