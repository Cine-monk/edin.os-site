const DEFAULTS = {
  site_title: "Edin Labs | The Judgment Emulator",
  site_description:
    "Edin Labs captures, stores, analyzes, and deploys a company's judgment so agents, robots, and machines can act with their trust.",
  hero_title: "Decision Exoskeletons.",
  hero_sub: "Building the digital judgment layer for agentic and robotic operations.",
  hero_cta: "Explore Deployed Infrastructure",
  hero_image: "/hero-splash.jpg",
  thesis: "A model cannot anticipate the hardest decisions you or your company makes.",
  thesis_solve: "We solve that problem.",
  close_kicker: "// Take control",
  close_title: "Sign up to take control of your judgment in the age of AI.",
  close_cta: "Get Started",
  build_title: "Where we build.",
  mission_kicker: "// Mission",
  mission_title: "One objective.",
  mission_p1: "We have one objective at Edin Labs.",
  mission_p2:
    "To free humans from machines by responsibly imbuing AI with human taste and judgment.",
  mission_p3:
    "We see this as a foremost opportunity for the betterment of civilization alongside agentic intelligence.",
  plate_ingest_hero: "Your Decisions at Scale.",
  plate_ingest_gold: "Your Taste Profile",
  plate_analyze_hero: "How we distill your judgments.",
  plate_analyze_lede:
    "We use a combination of weights, microjudgments, time-slicing, recency, and group and individual.",
  plate_emulate_hero: "What is an emulator.",
  plate_emulate_lede:
    "A digitized and weighted taste and judgment layer refined from your decisions at scale.",
  plate_mcp_hero: "Exposed as ports.",
  plate_mcp_gold: "Callable MCP.",
  plate_compounds_hero: "Judgment compounds.",
  drawer_stacks: "Private agentic and commercial pipelines.",
  drawer_humanoids: "Bipedal operators in human environments.",
  drawer_robots: "Industrial arms and service machines.",
  drawer_fleets: "Kinetic terrestrial and maritime fleets.",
  media_stack: "/feeds/stack.jpg",
  media_humanoid: "/feeds/humanoid.jpg",
  media_robots: "/feeds/robots.jpg",
  media_fleets: "/feeds/vehicles.jpg",
  css_extra: "",
};

const GROUPS = {
  brand: ["site_title", "site_description"],
  hero: ["hero_title", "hero_sub", "hero_cta", "hero_image"],
  thesis: ["thesis", "thesis_solve"],
  close: ["close_kicker", "close_title", "close_cta"],
  build: ["build_title"],
  mission: ["mission_kicker", "mission_title", "mission_p1", "mission_p2", "mission_p3"],
  plates: [
    "plate_ingest_hero",
    "plate_ingest_gold",
    "plate_analyze_hero",
    "plate_analyze_lede",
    "plate_emulate_hero",
    "plate_emulate_lede",
    "plate_mcp_hero",
    "plate_mcp_gold",
    "plate_compounds_hero",
  ],
  drawers: ["drawer_stacks", "drawer_humanoids", "drawer_robots", "drawer_fleets"],
  media: ["media_stack", "media_humanoid", "media_robots", "media_fleets", "hero_image"],
  layout: ["css_extra"],
};

const HINTS = {
  hero_image: "Site path or https URL.",
  css_extra: "Raw CSS injected site-wide.",
  media_stack: "Full-bleed drawer image. Site path or https.",
};

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type, authorization, mcp-protocol-version",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      ...extra,
    },
  });
}

async function readCopy(env) {
  const raw = env.COPY ? await env.COPY.get("site") : null;
  const live = raw ? JSON.parse(raw) : {};
  return { ...DEFAULTS, ...live };
}

async function writeKey(env, key, value) {
  const current = await readCopy(env);
  current[key] = value;
  if (env.COPY) await env.COPY.put("site", JSON.stringify(current));
  return current;
}

function authorized(req, env, write) {
  if (!write) return true;
  const token = env.MCP_TOKEN;
  if (!token) return true;
  const header = req.headers.get("authorization") || "";
  return header === `Bearer ${token}`;
}

const TOOLS = [
  {
    name: "ping",
    description: "Liveness check.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "catalog",
    description: "Copy keys grouped for text, media, and layout. Use set_copy to write.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_copy",
    description: "Read live marketing copy. Omit key for the full object.",
    inputSchema: { type: "object", properties: { key: { type: "string" } } },
  },
  {
    name: "set_copy",
    description:
      "Write a copy, media URL, or css_extra key. Live on the next page load. Graphics: hero_image, media_stack, media_humanoid, media_robots, media_fleets. Layout: css_extra.",
    inputSchema: {
      type: "object",
      properties: { key: { type: "string" }, value: { type: "string" } },
      required: ["key", "value"],
    },
  },
  {
    name: "reset_copy_key",
    description: "Reset one copy key to the shipped default.",
    inputSchema: { type: "object", properties: { key: { type: "string" } }, required: ["key"] },
  },
  {
    name: "get_status",
    description: "Site health and MCP status.",
    inputSchema: { type: "object", properties: {} },
  },
];

async function callTool(name, args, env) {
  if (name === "ping") return { ok: true, site: "edinlabs.ai" };
  if (name === "catalog") return { groups: GROUPS, hints: HINTS, keys: Object.keys(DEFAULTS) };
  if (name === "get_copy") {
    const copy = await readCopy(env);
    if (args.key) return { key: args.key, value: copy[args.key] ?? null };
    return copy;
  }
  if (name === "set_copy") {
    if (!args.key) throw new Error("key required");
    const copy = await writeKey(env, String(args.key), String(args.value ?? ""));
    return { ok: true, key: args.key, value: copy[args.key] };
  }
  if (name === "reset_copy_key") {
    const key = String(args.key || "");
    if (!(key in DEFAULTS)) throw new Error("unknown key");
    const copy = await writeKey(env, key, DEFAULTS[key]);
    return { ok: true, key, value: copy[key] };
  }
  if (name === "get_status") {
    return {
      ok: true,
      site: env.SITE_URL || "https://edinlabs.ai",
      mcp: "edin-labs-mcp",
      keys: Object.keys(DEFAULTS).length,
    };
  }
  throw new Error(`unknown tool: ${name}`);
}

async function handleRpc(body, env, req) {
  const method = body.method;
  const id = body.id ?? null;
  if (method === "initialize") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2025-03-26",
        capabilities: { tools: {} },
        serverInfo: { name: "edin-labs-mcp", version: "1.0.0" },
      },
    };
  }
  if (method === "notifications/initialized") return null;
  if (method === "tools/list") {
    return { jsonrpc: "2.0", id, result: { tools: TOOLS } };
  }
  if (method === "tools/call") {
    const name = body.params?.name;
    const args = body.params?.arguments || {};
    const write = name === "set_copy" || name === "reset_copy_key";
    if (!authorized(req, env, write)) {
      return { jsonrpc: "2.0", id, error: { code: -32001, message: "unauthorized" } };
    }
    try {
      const result = await callTool(name, args, env);
      return {
        jsonrpc: "2.0",
        id,
        result: { content: [{ type: "text", text: JSON.stringify(result) }] },
      };
    } catch (err) {
      return { jsonrpc: "2.0", id, error: { code: -32000, message: String(err.message || err) } };
    }
  }
  if (method === "ping") {
    return { jsonrpc: "2.0", id, result: {} };
  }
  return { jsonrpc: "2.0", id, error: { code: -32601, message: "method not found" } };
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-headers": "content-type, authorization, mcp-protocol-version",
          "access-control-allow-methods": "GET, POST, OPTIONS",
        },
      });
    }
    const url = new URL(req.url);
    if (req.method === "GET" && (url.pathname === "/copy" || url.pathname === "/api/copy")) {
      return json(await readCopy(env));
    }
    if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
      return json({ ok: true, mcp: "edin-labs-mcp" });
    }
    if (req.method === "POST") {
      const body = await req.json().catch(() => null);
      if (!body) return json({ error: "invalid json" }, 400);
      const reply = await handleRpc(body, env, req);
      if (reply == null) return new Response(null, { status: 204 });
      return json(reply);
    }
    return json({ error: "not found" }, 404);
  },
};
