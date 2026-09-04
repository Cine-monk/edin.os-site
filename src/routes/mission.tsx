import { useLayoutEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { WordRoll } from "@/components/word-roll";
import { useSheet } from "@/components/sheet-context";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { useCopy } from "@/lib/copy";

export const Route = createFileRoute("/mission")({
  component: MissionPage,
  head: () => ({
    meta: [
      { title: "Mission | Edin Labs" },
      {
        name: "description",
        content:
          "One objective at Edin Labs. Free humans from machines by imbuing AI with human taste and judgment.",
      },
      { property: "og:title", content: "Mission | Edin Labs" },
      { property: "og:url", content: `${SITE.url}/mission` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/mission` }],
  }),
});

function MissionPage() {
  const band = useRef<HTMLElement>(null);
  const sheet = useSheet();
  const copy = useCopy();

  useLayoutEffect(() => {
    band.current?.classList.add("is-in");
  }, []);

  return (
    <SiteShell>
      <section
        ref={band}
        className="mission-band relative isolate overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
      >
        <img
          src="/hero-splash.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/82 to-obsidian/55"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl">
          <p className="section-kicker">{copy.mission_kicker}</p>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.08] tracking-display text-fg sm:text-5xl lg:text-[3.6rem]">
            <WordRoll text={copy.mission_title} delay={40} step={90} />
          </h1>
          <p className="mt-10 max-w-3xl font-serif text-2xl font-normal leading-snug tracking-display text-fg sm:text-3xl">
            {copy.mission_p1}
          </p>
          <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed tracking-display text-secondary sm:text-2xl">
            {copy.mission_p2}
          </p>
          <p className="mt-8 max-w-3xl font-serif text-xl leading-relaxed tracking-display text-gold sm:text-2xl">
            {copy.mission_p3}
          </p>
          <div className="mt-12">
            <Button className="rounded-none" onClick={() => sheet.show()}>
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
