import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { WordRoll } from "@/components/word-roll";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/lib/copy";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const copy = useCopy();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let locked = false;
    const lock = () => {
      if (locked) return;
      locked = true;
      el.style.minHeight = `${Math.round(el.getBoundingClientRect().height)}px`;
    };
    const id = window.setTimeout(lock, 120);
    window.addEventListener("wheel", lock, { passive: true, once: true });
    window.addEventListener("scroll", lock, { passive: true, once: true });
    window.addEventListener("touchmove", lock, { passive: true, once: true });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("wheel", lock);
      window.removeEventListener("scroll", lock);
      window.removeEventListener("touchmove", lock);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden"
    >
      <div className="hero-field pointer-events-none absolute inset-0" aria-hidden="true">
        <img src={copy.hero_image} alt="" className="hero-splash" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian/50 via-obsidian/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/25"
        aria-hidden="true"
      />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-20">
        <div className="hero-roll">
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[1.04] tracking-display text-fg sm:text-6xl lg:text-[4.5rem]">
            <WordRoll text={copy.hero_title} delay={40} step={240} />
          </h1>
          <p className="mt-7 max-w-xl font-serif text-xl leading-[1.25] tracking-display text-fg/70 sm:text-2xl lg:text-[1.75rem]">
            <WordRoll text={copy.hero_sub} delay={1650} step={50} />
          </p>
          <div className="hero-cta mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="primary" asChild>
              <a href="/deployments">
                {copy.hero_cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
