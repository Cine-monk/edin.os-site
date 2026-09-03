import { createFileRoute } from "@tanstack/react-router";
import { CloseBand, ThesisCards } from "@/components/enterprise-gap";
import { FigureDrawers, SystemsBand } from "@/components/figure-strip";
import { Hero } from "@/components/hero";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell>
      <Hero />
      <ThesisCards />
      <SystemsBand />
      <FigureDrawers />
      <CloseBand />
    </SiteShell>
  );
}
