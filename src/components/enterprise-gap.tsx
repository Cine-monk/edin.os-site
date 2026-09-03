import { useState } from "react";
import { Reveal, RevealItem } from "@/components/reveal";
import { ThesisRead } from "@/components/thesis-read";
import { useSheet } from "@/components/sheet-context";
import { Button } from "@/components/ui/button";
import { GAP_COLUMNS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ThesisCards() {
  const [hot, setHot] = useState<number | null>(null);

  return (
    <>
      <ThesisRead />
      <section
        className="relative isolate overflow-hidden border-t border-border px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-14"
        onMouseLeave={() => setHot(null)}
      >
        <div
          className="gap-caustic"
          data-hot={hot ?? ""}
          aria-hidden="true"
        >
          <video
            src={hot !== null ? "/caustic-room.mp4" : undefined}
            poster="/caustic-room.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        </div>
        <div className="relative mx-auto max-w-7xl">
      <Reveal stagger className="relative mt-0 grid gap-10 lg:grid-cols-3 lg:gap-0">
        {GAP_COLUMNS.map((column, index) => {
          const isEdin = column.tone === "gold";
          return (
            <RevealItem
              key={column.id}
              as="article"
              delay={index * 140}
              className={cn(
                "gap-pane px-0 py-2 lg:px-10",
                index === 0 && "lg:pl-0",
                index === GAP_COLUMNS.length - 1 && "lg:pr-0",
                index > 0 && "border-t border-border pt-10 lg:border-t-0 lg:border-l lg:pt-2",
                isEdin && "is-gold",
              )}
              data-layer={index}
              tabIndex={0}
              onMouseEnter={() => setHot(index)}
              onFocus={() => setHot(index)}
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
                {column.rows.map((row) => (
                  <li
                    key={row}
                    className={cn(
                      "font-serif text-base leading-relaxed tracking-display",
                      isEdin ? "text-fg/90" : "text-secondary",
                    )}
                  >
                    {row}
                  </li>
                ))}
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
  return (
    <section className="relative isolate overflow-hidden border-t border-border">
      <img
        src="/hero-splash.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-50"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/55" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal stagger>
          <RevealItem as="p" className="section-kicker">
            // Take control
          </RevealItem>
          <RevealItem
            as="h2"
            delay={80}
            className="mt-4 max-w-2xl font-serif text-3xl font-normal tracking-display text-fg sm:text-4xl"
          >
            Start a conversation. Sign up when you are ready to take control of your judgment.
          </RevealItem>
          <RevealItem delay={160} className="mt-8">
            <Button className="rounded-none" onClick={() => sheet.show()}>
              Get Started
            </Button>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
