import { createFileRoute } from "@tanstack/react-router";
import { DeployedSystems } from "@/components/deployed-systems";
import { SiteShell } from "@/components/site-shell";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/deployments")({
  component: DeploymentsPage,
  head: () => ({
    meta: [
      { title: "Deployments | Edin Labs" },
      {
        name: "description",
        content: "Deployed judgment infrastructure across agentic and robotic operations.",
      },
      { property: "og:title", content: "Deployments | Edin Labs" },
      { property: "og:url", content: `${SITE.url}/deployments` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/deployments` }],
  }),
});

function DeploymentsPage() {
  return (
    <SiteShell>
      <DeployedSystems />
    </SiteShell>
  );
}
