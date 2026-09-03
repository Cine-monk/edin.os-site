import { ArrowRight } from "lucide-react";
import { WordRoll } from "@/components/word-roll";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      <div className="hero-field pointer-events-none absolute inset-0" aria-hidden="true">
        <img src="/hero-splash.jpg" alt="" className="hero-splash" />
        <div className="hero-current" />
        <div className="hero-current-fine" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40"
        aria-hidden="true"
      />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-20">
        <div className="hero-roll">
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[1.04] tracking-display text-fg sm:text-6xl lg:text-[4.5rem]">
            <WordRoll text="Decision Exoskeletons." delay={40} step={240} />
          </h1>
          <p className="mt-7 max-w-xl font-serif text-xl leading-[1.25] tracking-display text-fg/70 sm:text-2xl lg:text-[1.75rem]">
            <WordRoll
              text="Building the AI taste layer for digital and robotic operations."
              delay={1650}
              step={50}
            />
          </p>
          <div className="hero-cta mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="primary" asChild>
              <a href="/deployments">
                Explore Deployed Infrastructure
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
