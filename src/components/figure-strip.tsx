import { useState } from "react";
import { Reveal, RevealItem } from "@/components/reveal";
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
    title: "Moving vehicles",
    caption: "Kinetic terrestrial and maritime fleets.",
    src: "/feeds/vehicles.jpg",
  },
] as const;

export function SystemsBand() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-14">
        <Reveal stagger>
          <RevealItem>
            <p className="section-kicker">// Systems</p>
          </RevealItem>
          <h2 className="mt-6 max-w-4xl font-serif text-3xl font-normal leading-[1.18] tracking-display text-fg sm:text-4xl lg:text-[2.65rem]">
            <WordRoll
              text="We capture, analyze, and store your choices at scale, then deploy a judgment emulator so agents and machines can act with your trust."
              delay={80}
              step={42}
            />
          </h2>
        </Reveal>
      </div>
      <VerdictPlane />
    </section>
  );
}

export function FigureDrawers() {
  const [active, setActive] = useState(0);

  return (
    <div
      className="figure-field relative border-t border-border"
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
  );
}
