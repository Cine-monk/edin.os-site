import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const COPY_DEFAULTS = {
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
} as const;

export type CopyKey = keyof typeof COPY_DEFAULTS;
export type CopyMap = Record<CopyKey, string>;

export const COPY_GROUPS: Record<string, CopyKey[]> = {
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
  media: ["media_stack", "media_humanoid", "media_robots", "media_fleets"],
  layout: ["css_extra"],
};

const CopyCtx = createContext<CopyMap>({ ...COPY_DEFAULTS });

const COPY_ENDPOINT =
  typeof window === "undefined"
    ? "https://mcp.edinlabs.ai/copy"
    : window.location.hostname.endsWith("edinlabs.ai")
      ? "https://mcp.edinlabs.ai/copy"
      : "/api/copy";

export function CopyProvider({ children }: { children: ReactNode }) {
  const [live, setLive] = useState<Partial<CopyMap>>({});

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(COPY_ENDPOINT, { signal: ctrl.signal })
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
    value.css_extra
      ? createElement("style", { key: "css-extra", "data-edin": "css-extra" }, value.css_extra)
      : null,
  ]);
}

export function useCopy(): CopyMap {
  return useContext(CopyCtx);
}

export function useCopyKey(key: CopyKey): string {
  return useContext(CopyCtx)[key] ?? COPY_DEFAULTS[key];
}
