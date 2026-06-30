<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-conventions -->
# Project-Specific Conventions

## Next.js 16 Breaking Changes (confirmed during setup)

- `middleware.ts` is **deprecated**. Use `proxy.ts` at the project root instead, exporting a function named `proxy` (not `middleware`).
- No `src/` directory. All code lives at the project root.
- ESLint uses flat config (`eslint.config.mjs`).
- Tailwind CSS v4 with `@import "tailwindcss"` and `@tailwindcss/postcss`.
<!-- END:project-conventions -->
