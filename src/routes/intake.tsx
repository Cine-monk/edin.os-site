import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/intake")({ component: IntakePage });

function IntakePage() {
  return (
    <SiteShell>
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-lg">
          <Reveal stagger>
            <RevealItem as="p" className="section-kicker">
              // Contact
            </RevealItem>
            <RevealItem as="h1" delay={80} className="mt-4 font-serif text-4xl tracking-display text-fg">
              Talk to us.
            </RevealItem>
            <RevealItem delay={140} className="mt-8">
              <form
                className="flex flex-col gap-6"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <label className="flex flex-col">
                  <span className="font-mono text-2xs tracking-status uppercase text-muted">
                    Corporate email
                  </span>
                  <input className="sheet-line" type="email" name="email" required />
                </label>
                <label className="flex flex-col">
                  <span className="font-mono text-2xs tracking-status uppercase text-muted">
                    Target industry
                  </span>
                  <select className="sheet-line" name="industry" defaultValue="PE & VC">
                    <option>PE & VC</option>
                    <option>Legal & Compliance</option>
                    <option>E-Commerce</option>
                    <option>Commercial Real Estate</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="flex flex-col">
                  <span className="font-mono text-2xs tracking-status uppercase text-muted">
                    Current operational bottleneck
                  </span>
                  <textarea className="sheet-line min-h-28 resize-none" name="bottleneck" />
                </label>
                <Button type="submit" className="rounded-none">
                  Initialize System Scoping
                </Button>
              </form>
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
