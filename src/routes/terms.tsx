import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <SiteShell>
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <p className="section-kicker">// Terms</p>
          <h1 className="mt-4 font-serif text-4xl tracking-display text-fg">Terms of use.</h1>
          <p className="mt-6 font-serif text-lg leading-relaxed text-secondary">
            This site describes Edin Labs systems. It is not an offer of software until a scoping engagement is accepted in writing. Use of the portal is limited to authorized operators.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
