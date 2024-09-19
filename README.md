# [Is this chess?](https://is-this-chess.netlify.app/)

You upload an image. Cutting-edge AI tells you if it's chess. That's it.

## Development

This is an Astro site. It uses Solid.js Islands for interactivity.

It is deployed to Netify.

It uses the PNPM package manager.

### Prerequisites

For local development, you'll need to configure your own OpenAI API key. Follow the
instructions in the `.env.example` file.

### Commands

All commands are run from the root of the project, from a terminal:

| Command            | Action                                       |
| :----------------- | :------------------------------------------- |
| `pnpm install`     | Installs dependencies                        |
| `pnpm run dev`     | Starts local dev server at `localhost:4321`  |
| `pnpm run build`   | Build your production site to `./dist/`      |
| `pnpm run preview` | Preview your build locally, before deploying |
| `pnpm run lint`    | Run eslint, with autofix enabled             |
| `pnpm run format`  | Format files with prettier                   |
| `pnpm run test`    | Run all checks                               |
