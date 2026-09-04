export const SITE = {
  name: "Edin Labs",
  domain: "edinlabs.ai",
  url: "https://edinlabs.ai",
  title: "Edin Labs | The Judgment Emulator",
  description:
    "Edin Labs captures, stores, analyzes, and deploys a company's judgment so agents, robots, and machines can act with their trust. A model with facts still does not know when to say yes or no.",
  ogImage: "https://edinlabs.ai/og.jpg",
  locale: "en_US",
} as const;

export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://edinlabs.ai/#org",
      name: "Edin Labs",
      url: "https://edinlabs.ai",
      logo: "https://edinlabs.ai/favicon.svg",
      description:
        "Forward-deployed studio. Judgment emulator for agentic and robotic operations.",
      sameAs: [
        "https://x.com/StevenHolleran",
        "https://www.youtube.com/@edinlabs",
        "https://github.com/Cine-monk/edin.os-site",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://edinlabs.ai/#site",
      url: "https://edinlabs.ai",
      name: "Edin Labs",
      publisher: { "@id": "https://edinlabs.ai/#org" },
      inLanguage: "en-US",
    },
  ],
} as const;
