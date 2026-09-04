import { useLayoutEffect, useRef, useState } from "react";
import { VerdictPlane } from "@/components/verdict-plane";
import { WordRoll } from "@/components/word-roll";
import { cn } from "@/lib/utils";
import { useCopy } from "@/lib/copy";

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

function armEnter(el: HTMLElement, onEnter: () => void) {
  let done = false;
  const show = () => {
    if (done) return;
    done = true;
    onEnter();
    cleanup();
  };

  const visible = () => {
    const rect = el.getBoundingClientRect();
    const vh = window.visualViewport?.height ?? window.innerHeight;
    return rect.top < vh * 0.92 && rect.bottom > 24;
  };

  const onMove = () => {
    if (visible()) show();
  };

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) show();
    },
    { threshold: 0, rootMargin: "0px" },
  );
  io.observe(el);

  const opts: AddEventListenerOptions = { passive: true, capture: true };
  window.addEventListener("scroll", onMove, opts);
  window.addEventListener("wheel", onMove, opts);
  window.addEventListener("touchmove", onMove, opts);
  document.addEventListener("scroll", onMove, opts);

  const start = window.requestAnimationFrame(() => {
    if (visible()) show();
  });

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    io.disconnect();
    window.cancelAnimationFrame(start);
    window.removeEventListener("scroll", onMove, opts);
    window.removeEventListener("wheel", onMove, opts);
    window.removeEventListener("touchmove", onMove, opts);
    document.removeEventListener("scroll", onMove, opts);
  };

  return cleanup;
}

export function SystemsBand() {
  return (
    <section>
      <VerdictPlane />
    </section>
  );
}

export function FigureDrawers() {
  const [active, setActive] = useState(0);
  const head = useRef<HTMLDivElement>(null);
  const copy = useCopy();
  const captions = {
    Stacks: copy.drawer_stacks,
    Humanoids: copy.drawer_humanoids,
    Robots: copy.drawer_robots,
    Fleets: copy.drawer_fleets,
  } as const;
  const media = {
    Stacks: copy.media_stack,
    Humanoids: copy.media_humanoid,
    Robots: copy.media_robots,
    Fleets: copy.media_fleets,
  } as const;

  useLayoutEffect(() => {
    const el = head.current;
    if (!el) return;
    const show = () => el.classList.add("is-in");
    if (el.classList.contains("is-in")) return;
    return armEnter(el, show);
  }, []);

  return (
    <section className="border-t border-border">
      <div ref={head} className="build-head w-full px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <h2 className="ml-auto w-full text-right font-serif text-4xl font-normal leading-[1.08] tracking-display text-fg sm:text-5xl lg:text-[4.25rem]">
          <WordRoll text={copy.build_title} delay={40} step={90} />
        </h2>
      </div>
      <div className="figure-field relative" onMouseLeave={() => setActive(0)}>
        {FIGURES.map((figure, index) => (
          <a
            key={figure.id}
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
                  {captions[figure.mark]}
                </p>
                <p className="mt-6 font-mono text-micro tracking-status uppercase text-muted">
                  /{figure.id}
                </p>
              </div>
              <div className="figure-stage">
                <div className="figure-still">
                  <img
                    src={media[figure.mark]}
                    alt={figure.title}
                    className={`is-${figure.mark.toLowerCase()}`}
                  />
                </div>
              </div>
              <p className="figure-mark">{figure.mark}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
