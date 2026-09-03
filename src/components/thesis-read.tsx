import { Reveal } from "@/components/reveal";
import { WordRoll } from "@/components/word-roll";

export function ThesisRead() {
  return (
    <section id="thesis" className="scroll-mt-20 border-t border-border px-4 py-14 sm:px-6 sm:py-16">
      <Reveal stagger className="mx-auto max-w-7xl">
        <div className="ml-auto max-w-3xl text-right">
          <p className="section-kicker ml-auto">// The Thesis</p>
          <h2 className="mt-4 font-serif text-3xl font-normal leading-[1.15] tracking-display text-fg sm:text-4xl lg:text-5xl">
            <WordRoll
              text="A model cannot anticipate the hardest decisions you or your company makes."
              delay={40}
              step={90}
            />
          </h2>
          <p className="mt-5 font-serif text-2xl font-normal leading-snug tracking-display text-gold sm:text-3xl">
            <WordRoll text="We solve that problem." delay={1280} step={110} />
          </p>
        </div>
      </Reveal>
    </section>
  );
}
