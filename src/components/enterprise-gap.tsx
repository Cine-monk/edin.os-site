import { useEffect, useRef, useState } from "react";
import { Reveal, RevealItem } from "@/components/reveal";
import { ThesisRead } from "@/components/thesis-read";
import { WordRoll } from "@/components/word-roll";
import { useSheet } from "@/components/sheet-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCopy } from "@/lib/copy";

export function ThesisCards() {
  const copy = useCopy();
  const columns = [
    { id: "public", title: copy.gap_1_title, body: copy.gap_1_body, tone: "muted" as const },
    { id: "agencies", title: copy.gap_2_title, body: copy.gap_2_body, tone: "muted" as const },
    { id: "edin", title: copy.gap_3_title, body: copy.gap_3_body, tone: "gold" as const },
  ];

  return (
    <>
      <ThesisRead />
      <section className="gap-band relative isolate px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-14">
        <div className="relative mx-auto max-w-7xl">
          <Reveal stagger className="relative mt-0 grid gap-10 lg:grid-cols-3 lg:gap-0">
            {columns.map((column, index) => {
              const isEdin = column.tone === "gold";
              return (
                <RevealItem
                  key={column.id}
                  as="article"
                  delay={index * 140}
                  className={cn(
                    "gap-pane px-0 py-2 lg:px-10",
                    index === 0 && "lg:pl-0",
                    index === columns.length - 1 && "lg:pr-0",
                    index > 0 && "border-t border-border pt-10 lg:border-t-0 lg:border-l lg:pt-2",
                    isEdin && "is-gold",
                  )}
                  data-layer={index}
                  tabIndex={0}
                >
                  <p className={cn("section-kicker", isEdin ? "text-gold" : "text-muted")}>
                    // 0{index + 1}
                  </p>
                  <h3
                    className={cn(
                      "mt-4 whitespace-nowrap font-serif text-[1.35rem] font-normal leading-none tracking-display sm:text-[1.5rem] lg:text-[1.55rem]",
                      isEdin ? "text-gold" : "text-fg",
                    )}
                  >
                    {column.title}
                  </h3>
                  <ul className="mt-8 flex flex-col gap-6">
                    <li
                      className={cn(
                        "font-serif text-base leading-relaxed tracking-display",
                        isEdin ? "text-fg/90" : "text-secondary",
                      )}
                    >
                      {column.body}
                    </li>
                  </ul>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function CloseBand() {
  const sheet = useSheet();
  const copy = useCopy();
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      el.classList.add("is-in");
      requestAnimationFrame(() => setReady(true));
      cleanup();
    };

    const inBand = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.visualViewport?.height ?? window.innerHeight;
      return rect.top < vh * 0.82 && rect.bottom > 80;
    };

    const onScroll = () => {
      if (inBand()) show();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    const start = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (inBand()) show();
      });
    });

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      io.disconnect();
      window.cancelAnimationFrame(start);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, true);
    };
    return cleanup;
  }, []);

  return (
    <section ref={ref} className="close-band relative isolate overflow-hidden border-t border-border">
      <div className="close-field pointer-events-none absolute inset-0" aria-hidden="true">
        <img src={copy.close_image} alt="" className="close-splash" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian/60 via-obsidian/25 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="section-kicker">
          {ready ? (
            <WordRoll text={copy.close_kicker} delay={40} step={70} />
          ) : (
            <span className="thesis-hold">{copy.close_kicker}</span>
          )}
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-3xl font-normal tracking-display text-fg sm:text-4xl">
          {ready ? (
            <WordRoll text={copy.close_title} delay={220} step={80} />
          ) : (
            <span className="thesis-hold">{copy.close_title}</span>
          )}
        </h2>
        <div className="close-cta mt-8">
          <Button className="rounded-md" onClick={() => sheet.show()}>
            {copy.close_cta}
          </Button>
        </div>
      </div>
    </section>
  );
}