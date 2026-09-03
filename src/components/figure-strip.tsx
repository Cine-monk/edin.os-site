import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { VerdictPlane } from "@/components/verdict-plane";
import { WordRoll } from "@/components/word-roll";
import { cn } from "@/lib/utils";

const FIGURES = [
  {
    id: "0.1",
    mark: "Stacks",
    title: "Stacks",
    caption: "Private agentic and commercial pipelines.",
    src: "/feeds/stack.jpg",
  },
  {
    id: "0.2",
    mark: "Humanoids",
    title: "Humanoids",
    caption: "Bipedal operators in human environments.",
    src: "/feeds/humanoid.jpg",
  },
  {
    id: "0.3",
    mark: "Robots",
    title: "Robots",
    caption: "Industrial arms and service machines.",
    src: "/feeds/robots.jpg",
  },
  {
    id: "0.4",
    mark: "Fleets",
    title: "Fleets",
    caption: "Kinetic terrestrial and maritime fleets.",
    src: "/feeds/vehicles.jpg",
  },
] as const;

export function SystemsBand() {
  return (
    <section className="border-t border-border">
      <VerdictPlane />
    </section>
  );
}

export function FigureDrawers() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 sm:pb-10 sm:pt-16">
        <Reveal className="reveal-group">
          <h2 className="max-w-2xl font-serif text-3xl font-normal leading-[1.12] tracking-display text-fg sm:text-4xl lg:text-[2.75rem]">
            <WordRoll text="Where we build." delay={40} step={70} />
          </h2>
        </Reveal>
      </div>
      <div
        className="figure-field relative"
        onMouseLeave={() => setActive(0)}
      >
      {FIGURES.map((figure, index) => (
        <Reveal key={figure.id}>
          <a
            href="/deployments"
            data-figure={index}
            className={cn("figure-slide", index === active && "is-open")}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <div className="figure-inner">
              <div className="figure-copy">
                {figure.title !== figure.mark ? (
                  <p className="mb-2 font-serif text-base tracking-display text-fg">{figure.title}</p>
                ) : null}
                <p className="font-serif text-lg leading-snug tracking-display text-fg sm:text-xl">
                  {figure.caption}
                </p>
                <p className="mt-6 font-mono text-micro tracking-status uppercase text-muted">
                  /{figure.id}
                </p>
              </div>
              <div className="figure-stage">
                <div className="figure-still">
                  <img
                    src={figure.src}
                    alt={figure.title}
                    className={figure.id === "0.2" ? "object-contain" : "object-cover"}
                  />
                </div>
              </div>
              <p className="figure-mark">{figure.mark}</p>
            </div>
          </a>
        </Reveal>
      ))}
      </div>
    </section>
  );
}
