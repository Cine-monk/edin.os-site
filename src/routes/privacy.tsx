import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <SiteShell>
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <p className="section-kicker">// Privacy</p>
          <h1 className="mt-4 font-serif text-4xl tracking-display text-fg">Privacy policy.</h1>
          <p className="mt-6 font-serif text-lg leading-relaxed text-secondary">
            Edin Labs does not use submitted materials to train public models. Intake data is used to scope a private system and is retained only as needed to run that engagement. Questions can be sent through Contact.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
