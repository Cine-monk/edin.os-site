import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const COPY_DEFAULTS = {
  site_title: "Edin Labs | The Judgment Emulator",
  site_description:
    "Edin Labs captures, stores, analyzes, and deploys a company's judgment so agents, robots, and machines can act with their trust.",
  brand_name: "Edin Labs",
  hero_title: "Decision Exoskeletons.",
  hero_sub: "Building the digital judgment layer for agentic and robotic operations.",
  hero_cta: "Explore Deployed Infrastructure",
  hero_image: "/hero-splash.jpg",
  thesis: "A model cannot anticipate the hardest decisions you or your company makes.",
  thesis_solve: "We solve that problem.",
  gap_1_title: "Current Limitations with AI",
  gap_1_body: "A model with infinite facts does not know when to say no.",
  gap_2_title: "Humans Trapped in the Chat",
  gap_2_body: "Machines outproduce humans but rely on our judgement, trapping us in the chat.",
  gap_3_title: "The Future is Digital Exoskeletons",
  gap_3_body:
    "We offer a secure and accurate judgement emulator for your future decisions built on your previous choices.",
  pipeline_title: "A judgment layer is your key to unlocking real agentic representation.",
  tab_ingest: "Ingest",
  tab_analyze: "Analyze",
  tab_emulate: "Emulate",
  tab_mcp: "Real-World Decisions",
  tab_compounds: "Judgment Compounds",
  close_kicker: "// Take control",
  close_title: "Sign up to take control of your judgment in the age of AI.",
  close_cta: "Get Started",
  close_image: "/hero-splash.jpg",
  build_title: "Where we build.",
  mission_kicker: "// Mission",
  mission_title: "One objective.",
  mission_p1: "We have one objective at Edin Labs.",
  mission_p2:
    "To free humans from machines by responsibly imbuing AI with human taste and judgment.",
  mission_p3:
    "We see this as a foremost opportunity for the betterment of civilization alongside agentic intelligence.",
  about_kicker: "// Company",
  about_title: "About Edin Labs.",
  about_p1:
    "Agents will run out of work for humans because they will not have enough guidance. Humans are not meant to stay in the loop around the clock. We free operators from the chat and give machines a callable copy of human judgment, so quality can rise for the business, the individual, and the work itself.",
  about_p2:
    "Edin Labs is a forward-deployed engineering studio. We capture, analyze, and store your choices at scale, then deploy a judgment emulator over MCP so agents and machines can act with your trust.",
  plate_ingest_hero: "Your Decisions|at Scale.",
  plate_ingest_gold: "Your Taste Profile",
  plate_analyze_hero: "How we distill your judgments.",
  plate_analyze_lede:
    "We use a combination of weights, microjudgments, time-slicing, recency, and group and individual.",
  plate_emulate_hero: "What is an emulator.",
  plate_emulate_lede:
    "A digitized and weighted taste and judgment layer refined from your decisions at scale.",
  plate_mcp_hero: "Exposed|as ports.",
  plate_mcp_gold: "Callable MCP.",
  plate_compounds_hero: "Judgment|compounds.",
  drawer_stacks: "Private agentic and commercial pipelines.",
  drawer_humanoids: "Bipedal operators in human environments.",
  drawer_robots: "Industrial arms and service machines.",
  drawer_fleets: "Kinetic terrestrial and maritime fleets.",
  media_stack: "/feeds/stack.jpg",
  media_humanoid: "/feeds/humanoid.jpg",
  media_robots: "/feeds/robots.jpg",
  media_fleets: "/feeds/vehicles.jpg",
  media_ingest_video: "/pipeline/ingest.mp4",
  media_ingest_poster: "/pipeline/ingest.jpg",
  media_analyze_video: "/pipeline/analyze.mp4",
  media_analyze_poster: "/pipeline/analyze.jpg",
  media_emulate_video: "/pipeline/emulate.mp4",
  media_emulate_poster: "/pipeline/emulate.jpg",
  media_mcp_video: "/pipeline/mcp.mp4",
  media_mcp_poster: "/pipeline/mcp.jpg",
  media_compounds_video: "/pipeline/compounds.mp4",
  media_compounds_poster: "/pipeline/compounds.jpg",
  color_bg: "#0A0D0B",
  color_fg: "#F3EFE4",
  color_gold: "#D4AF37",
  color_emerald: "#1B4D3E",
  font_url:
    "https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap",
  font_serif: '"Hedvig Letters Serif", ui-serif, Georgia, serif',
  font_sans: "Inter, ui-sans-serif, system-ui, sans-serif",
  anim_plate_ms: "3200",
  anim_hero_zoom: "28s",
  css_extra: "",
} as const;

export type CopyKey = keyof typeof COPY_DEFAULTS;
export type CopyMap = Record<CopyKey, string>;

export const COPY_GROUPS: Record<string, CopyKey[]> = {
  brand: ["site_title", "site_description", "brand_name"],
  hero: ["hero_title", "hero_sub", "hero_cta", "hero_image"],
  thesis: ["thesis", "thesis_solve"],
  gap: ["gap_1_title", "gap_1_body", "gap_2_title", "gap_2_body", "gap_3_title", "gap_3_body"],
  pipeline: ["pipeline_title", "tab_ingest", "tab_analyze", "tab_emulate", "tab_mcp", "tab_compounds"],
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
  close: ["close_kicker", "close_title", "close_cta", "close_image"],
  build: ["build_title"],
  drawers: ["drawer_stacks", "drawer_humanoids", "drawer_robots", "drawer_fleets"],
  mission: ["mission_kicker", "mission_title", "mission_p1", "mission_p2", "mission_p3"],
  about: ["about_kicker", "about_title", "about_p1", "about_p2"],
  media: [
    "hero_image",
    "close_image",
    "media_stack",
    "media_humanoid",
    "media_robots",
    "media_fleets",
    "media_ingest_video",
    "media_ingest_poster",
    "media_analyze_video",
    "media_analyze_poster",
    "media_emulate_video",
    "media_emulate_poster",
    "media_mcp_video",
    "media_mcp_poster",
    "media_compounds_video",
    "media_compounds_poster",
  ],
  theme: ["color_bg", "color_fg", "color_gold", "color_emerald", "font_url", "font_serif", "font_sans"],
  animation: ["anim_plate_ms", "anim_hero_zoom"],
  layout: ["css_extra"],
};

export const COPY_HINTS: Partial<Record<CopyKey, string>> = {
  hero_image: "Site path or https URL.",
  close_image: "Site path or https URL.",
  css_extra: "Raw CSS injected site-wide. Layout, spacing, animation tweaks.",
  plate_ingest_hero: "Use | for a line break.",
  plate_mcp_hero: "Use | for a line break.",
  plate_compounds_hero: "Use | for a line break.",
  media_ingest_video: "Plate video. Site path or https.",
  anim_plate_ms: "Milliseconds between plate beats.",
  anim_hero_zoom: "CSS duration for the hero Ken Burns, e.g. 28s.",
  color_bg: "Hex. Maps to --color-obsidian.",
  font_url: "Google Fonts CSS URL. Pair with font_serif / font_sans.",
};

const CopyCtx = createContext<CopyMap>({ ...COPY_DEFAULTS });

function copyEndpoint() {
  if (typeof window === "undefined") return "https://mcp.edinlabs.ai/copy";
  const host = window.location.hostname;
  if (host.endsWith("edinlabs.ai") || host.endsWith("pages.dev")) {
    return "https://mcp.edinlabs.ai/copy";
  }
  return "/api/copy";
}

function themeCss(copy: CopyMap) {
  const bits = [
    `:root{--color-obsidian:${copy.color_bg};--color-fg:${copy.color_fg};--color-gold:${copy.color_gold};--color-emerald:${copy.color_emerald};--font-serif:${copy.font_serif};--font-sans:${copy.font_sans};--hero-zoom:${copy.anim_hero_zoom};}`,
    `html,body{background-color:${copy.color_bg};color:${copy.color_fg};}`,
    copy.anim_hero_zoom ? `.hero-splash{animation-duration:${copy.anim_hero_zoom};}` : "",
    copy.css_extra || "",
  ];
  return bits.filter(Boolean).join("\n");
}

export function CopyProvider({ children }: { children: ReactNode }) {
  const [live, setLive] = useState<Partial<CopyMap>>({});

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(copyEndpoint(), { signal: ctrl.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === "object") setLive(data as Partial<CopyMap>);
      })
      .catch(() => undefined);
    return () => ctrl.abort();
  }, []);

  const value = useMemo(
    () => ({ ...COPY_DEFAULTS, ...live }) as CopyMap,
    [live],
  );

  return createElement(CopyCtx.Provider, { value }, [
    children,
    value.font_url
      ? createElement("link", {
          key: "font-url",
          rel: "stylesheet",
          href: value.font_url,
        })
      : null,
    createElement("style", { key: "edin-theme", "data-edin": "theme" }, themeCss(value)),
  ]);
}

export function useCopy(): CopyMap {
  return useContext(CopyCtx);
}

export function useCopyKey(key: CopyKey): string {
  return useContext(CopyCtx)[key] ?? COPY_DEFAULTS[key];
}

export function splitCopyLines(text: string): string[] {
  return text
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}
