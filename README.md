# Edin Labs

Judgment emulator for agentic and robotic operations.

Live: [edinlabs.ai](https://edinlabs.ai)

## Stack

Vite + React + TanStack Router. Tailwind 4. Cloudflare Pages. Copy MCP at `mcp.edinlabs.ai`.

## MCP

Connect `https://mcp.edinlabs.ai` as an MCP server (same pattern as cine-brain). Writes are live on the next page load.

Tools: `ping`, `catalog`, `list_copy_keys`, `site_map`, `get_copy`, `set_copy`, `set_copy_many`, `reset_copy_key`, `get_status`.

- Text: hero, thesis, gap columns, plate heroes, drawers, mission, about, close
- Graphics: `hero_image`, `close_image`, drawer stills, plate posters and videos
- Theme: `color_bg`, `color_fg`, `color_gold`, `color_emerald`, fonts
- Animation: `anim_plate_ms`, `anim_hero_zoom`, or `css_extra`
- Layout: `css_extra`

Plate heroes accept `|` for a line break.

## Deploy

```
npm run build:cf
npx wrangler pages deploy dist --project-name edin-labs
npx wrangler deploy --config workers/edin-mcp/wrangler.toml
```

Canonical domain: `https://edinlabs.ai`.
