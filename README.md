# Edin Labs (`edinlabs.ai`)

Sovereign intelligence systems. Judgment emulator. Decision exoskeletons.

This repo is the source of truth for the marketing site. Do not treat a Grok sandbox as backup.

## Stack

- TanStack Start (Vite) + React 19
- Tailwind CSS v4
- Hedvig Letters Serif / Inter / IBM Plex Mono
- Palette: Obsidian `#0A0D0B`, Emerald `#1B4D3E`, Gold `#D4AF37`

## Local

```bash
npm install
npm run dev
```

## Domain

Production host: `edinlabs.ai` (Cloudflare Pages). Canonical, Open Graph, robots, and sitemap assume that origin.

- Hero fingerprint lives at `public/hero-splash.jpg`
- Drawer stills live in `public/feeds/`
- Site copy and nav: `src/lib/content.ts`
