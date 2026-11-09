import { Project } from "./Project";

export const projects = [
  {
    title: "Tucano",
    tagline: {
      pt: "Uma linguagem de programação em português, do interpretador à sala de aula",
      en: "A programming language in Portuguese, from interpreter to the classroom",
    },
    description: {
      pt: "Linguagem feita para ensinar algoritmos a alunos do ensino médio: interpretador em TypeScript com lexer, parser e runtime de AST próprios, playground no navegador, documentação completa e uma plataforma de ensino gamificada em volta.",
      en: "A language built to teach algorithms to Brazilian high school students: a TypeScript interpreter with its own lexer, parser and AST runtime, a browser playground, full documentation and a gamified learning platform around it.",
    },
    tags: ["TypeScript", "Compilers", "Deno", "React", "Astro"],
    links: [
      { label: { pt: "Site", en: "Site" }, href: "https://linguagemtucano.com.br" },
      { label: { pt: "Playground", en: "Playground" }, href: "https://play.linguagemtucano.com.br" },
      { label: { pt: "Documentação", en: "Docs" }, href: "https://docs.linguagemtucano.com.br" },
      { label: { pt: "Post: Making a Language", en: "Post: Making a Language" }, href: "https://leonnaviegas.dev.br/posts/making-a-language/" }
    ]
  },
  {
    title: "Manilha",
    tagline: {
      pt: "Jogo de cartas multiplayer com servidor autoritativo",
      en: "Multiplayer card game with an authoritative server",
    },
    description: {
      pt: "Jogo de cartas online para 2 a 6 jogadores: servidor autoritativo em Node.js com salas WebSocket, bots, reconexão e espectadores, engine de regras pura com RNG semeável compartilhada entre os dois lados, protocolo validado com Zod e cliente em Svelte 5 + Canvas 2D que desenha cada carta na hora — nenhum sprite.",
      en: "Online card game for 2 to 6 players: an authoritative Node.js server with WebSocket rooms, bots, reconnection and spectators, a pure rules engine with seeded RNG shared by server and client, a Zod-validated protocol, and a Svelte 5 + Canvas 2D client that draws every card procedurally — no sprite assets.",
    },
    tags: ["TypeScript", "Fastify", "WebSocket", "Svelte 5", "Zod"],
    links: [{ label: { pt: "Código", en: "Source" }, href: "https://github.com/ALGAS-Jogos/FilhoDaPuta" }]
  },
  {
    title: "Economias",
    tagline: {
      pt: "Backend de finanças pessoais em Lua, sem framework",
      en: "Self-hosted finance backend written in Lua, no framework",
    },
    description: {
      pt: "Controle de gastos cujo backend eu escrevi do zero: rotas HTTP, codificação JSON, sessão com bcrypt e persistência em MySQL em cima do meu próprio servidor HTTP em Lua, com um front em JavaScript puro consumindo a API.",
      en: "Expense tracker whose backend I wrote from scratch: HTTP routing, JSON encoding, bcrypt session auth and MySQL persistence on top of my own Lua HTTP server, with a vanilla JavaScript front end consuming the API.",
    },
    tags: ["Lua", "MySQL", "bcrypt", "Vanilla JS"],
    links: [{ label: { pt: "Código", en: "Source" }, href: "https://github.com/NakeleKantoo/Economias" }]
  }
] satisfies Project[];
