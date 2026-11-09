import { Project } from "./Project";

export const projects = [
  {
    icon: '/tucano.png',
    title: "Tucano",
    tagline: "A programming language in Portuguese, from interpreter to classroom",
    description: "A programming language built to teach algorithms to Brazilian high school students: a TypeScript interpreter with its own lexer, parser and AST runtime, a browser playground, full documentation and a gamified learning platform around it.",
    tags: ["TypeScript", "Compilers", "Deno", "React", "Astro"],
    links: [
      { label: "Site", href: "https://linguagemtucano.com.br" },
      { label: "Playground", href: "https://play.linguagemtucano.com.br" },
      { label: "Docs", href: "https://docs.linguagemtucano.com.br" },
      { label: "Making a Language", href: "https://leonnaviegas.dev.br/posts/making-a-language/" }
    ]
  },
  {
    icon: '/manilha.svg',
    title: "Manilha",
    tagline: "Multiplayer card game with an authoritative server",
    description: "Online card game for 2 to 6 players: an authoritative Node.js server with WebSocket rooms, bots, reconnection and spectators, a pure rules engine with seeded RNG shared by server and client, a Zod-validated protocol, and a Svelte 5 + Canvas 2D client that draws every card procedurally — no sprite assets.",
    tags: ["TypeScript", "Fastify", "WebSocket", "Svelte 5", "Zod"],
    links: [
      { label: "Source", href: "https://github.com/ALGAS-Jogos/FilhoDaPuta" }
    ]
  },
  {
    icon: '/economias.svg',
    title: "Economias",
    tagline: "Self-hosted finance backend written in Lua, no framework",
    description: "Expense tracker whose backend I wrote from scratch: HTTP routing, JSON encoding, bcrypt session auth and MySQL persistence on top of my own Lua HTTP server, with a vanilla JavaScript front end consuming the API.",
    tags: ["Lua", "MySQL", "bcrypt", "Vanilla JS"],
    links: [
      { label: "Source", href: "https://github.com/NakeleKantoo/Economias" }
    ]
  }
] satisfies Project[];
