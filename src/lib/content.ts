export const SOCIAL_LINKS = [
  { href: "https://www.youtube.com/@edinlabs", label: "YouTube" },
  { href: "https://x.com/StevenHolleran", label: "X" },
  { href: "https://github.com/edinlabs", label: "GitHub" },
] as const;

export const NAV_LINKS = [
  { href: "/mission", label: "Mission" },
  { href: "/deployments", label: "Deployments" },
  { href: "/login", label: "Edin portal" },
] as const;

export const COMPANY_NAV = [
  { href: "/about", label: "About" },
  { href: "/deployments#proof", label: "Impact studies" },
  { href: "/intake", label: "Contact" },
] as const;

export const GAP_COLUMNS = [
  {
    id: "public",
    title: "Current Limitations with AI",
    tone: "muted" as const,
    rows: [
      "A model with infinite facts does not know when to say no.",
    ],
  },
  {
    id: "agencies",
    title: "Humans Trapped in the Chat",
    tone: "muted" as const,
    rows: [
      "Machines outproduce humans but rely on our judgement, trapping us in the chat.",
    ],
  },
  {
    id: "edin",
    title: "The Future is Digital Exoskeletons",
    tone: "gold" as const,
    rows: [
      "We offer a secure and accurate judgement emulator for your future decisions built on your previous choices.",
    ],
  },
] as const;

export const DEPLOYED_SYSTEMS = [
  {
    id: "01",
    name: "CineBrain",
    badge: "Deal Intelligence & Quant Desk",
    problem: "Operators drowned in unstructured deal flow with no callable judgment layer.",
    result: "A private query desk over the corpus. Agents subscribe. Humans leave the chat.",
  },
  {
    id: "02",
    name: "Creator Bay",
    badge: "Judgment Routing",
    problem: "Volume without a veto. Creative machines had no weight for yes or no.",
    result: "A scoped emulator of house judgment, callable at production speed.",
  },
  {
    id: "03",
    name: "Art Uncharted",
    badge: "Editorial Judgment",
    problem: "A field of near-misses and no way to reproduce the championed yes.",
    result: "Stop rules and rank rules extracted from exhaust, then deployed.",
  },
  {
    id: "04",
    name: "Auto-Media Engine",
    badge: "High-throughput Ops",
    problem: "Pipelines that demo and collapse under live load.",
    result: "An operator interface on private infrastructure with zero public egress.",
  },
] as const;
