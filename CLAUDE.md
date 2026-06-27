# Project Agent Rules

This project uses Next.js 16 with static export (`output: "export"`).

## Key conventions
- Server components export `metadata` and render client components
- All interactive components (hooks, animations) live in `*Client.tsx` files
- Animation variants are centralized in `src/lib/animations.ts`
- Personal data is single-sourced in `src/lib/config.ts`
- Never hardcode secrets; use `NEXT_PUBLIC_*` env vars

## Design system
- Theme: dark by default, glassmorphism via `.glass` utility class
- Fonts: JetBrains Mono via `--font-nerd` CSS variable
- Colors: HSL-based CSS variables in `globals.css`
