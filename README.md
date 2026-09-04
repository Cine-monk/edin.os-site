# Edin Labs

Judgment emulator for agentic and robotic operations.

Live: [edinlabs.ai](https://edinlabs.ai)

## Stack

Vite + React + TanStack Router. Tailwind 4. Cloudflare Pages. Copy MCP at `mcp.edinlabs.ai`.

## MCP

The site copy, drawer media URLs, and `css_extra` are live-editable:

- `get_copy` / `set_copy` / `catalog` / `reset_copy_key` / `get_status` / `ping`
- Graphics: `hero_image`, `media_stack`, `media_humanoid`, `media_robots`, `media_fleets`
- Layout: `css_extra`

Connect `https://mcp.edinlabs.ai` as an MCP server (same pattern as cine-brain). Writes are live on the next page load.

## Deploy

```
npm run build
npx wrangler pages deploy dist --project-name edin-labs
npx wrangler deploy --config workers/edin-mcp/wrangler.toml
```

Canonical domain: `https://edinlabs.ai`.
