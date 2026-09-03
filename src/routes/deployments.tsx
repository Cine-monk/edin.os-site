import { createFileRoute } from "@tanstack/react-router";
import { DeployedSystems } from "@/components/deployed-systems";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/deployments")({ component: DeploymentsPage });

function DeploymentsPage() {
  return (
    <SiteShell>
      <DeployedSystems />
    </SiteShell>
  );
}
