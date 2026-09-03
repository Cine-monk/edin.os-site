import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealItem } from "@/components/reveal";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <SiteShell>
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal stagger>
            <RevealItem as="p" className="section-kicker">
              // Company
            </RevealItem>
            <RevealItem as="h1" delay={80} className="mt-4 font-serif text-4xl font-normal tracking-display text-fg sm:text-5xl">
              About Edin Labs.
            </RevealItem>
            <RevealItem as="p" delay={160} className="mt-8 font-serif text-xl leading-relaxed tracking-display text-secondary">
              Agents will run out of work for humans because they will not have enough guidance. Humans are not meant to stay in the loop around the clock. We free operators from the chat and give machines a callable copy of human taste, so quality can rise for the business, the individual, and the work itself.
            </RevealItem>
            <RevealItem as="p" delay={240} className="mt-6 font-serif text-lg leading-relaxed tracking-display text-secondary">
              Edin Labs is a forward-deployed engineering studio. We capture, analyze, and store your choices at scale, then deploy a judgment emulator over MCP so agents and machines can act with your trust.
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
