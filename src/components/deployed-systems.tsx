import { Reveal, RevealItem } from "@/components/reveal";
import { DEPLOYED_SYSTEMS } from "@/lib/content";

export function DeployedSystems() {
  return (
    <section id="proof" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal stagger>
          <RevealItem as="p" className="section-kicker">
            // Impact studies
          </RevealItem>
          <RevealItem
            as="h1"
            delay={80}
            className="mt-4 max-w-3xl font-serif text-4xl font-normal tracking-display text-fg sm:text-5xl"
          >
            Deployed infrastructure.
          </RevealItem>
        </Reveal>
        <div className="mt-14 grid gap-0 border-t border-border">
          {DEPLOYED_SYSTEMS.map((system, index) => (
            <Reveal key={system.id}>
              <article className="grid gap-6 border-b border-border py-10 lg:grid-cols-[8rem_1fr_1.2fr]">
                <p className="font-mono text-2xs tracking-status uppercase text-muted">/{system.id}</p>
                <div>
                  <p className="font-mono text-2xs tracking-status uppercase text-gold">{system.badge}</p>
                  <h2 className="mt-2 font-serif text-2xl tracking-display text-fg">{system.name}</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <p className="font-serif text-base leading-relaxed text-secondary">{system.problem}</p>
                  <p className="font-serif text-base leading-relaxed text-fg">{system.result}</p>
                </div>
                <span className="sr-only">{index}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
