import { useEffect, useLayoutEffect, useRef } from "react";
import { WordRoll } from "@/components/word-roll";
import { useCopy } from "@/lib/copy";

const PAIRS = [
  { q: "Send the term sheet?", guess: "yes?", note: "no prior on this counterparty" },
  { q: "Fire the operator?", guess: "ask CEO?", note: "authority not in context" },
  { q: "Grant the exception?", guess: "no?", note: "weights conflict" },
  { q: "Hold the convoy?", guess: "ask legal?", note: "clause not in training" },
  { q: "Approve the cut?", guess: "grant?", note: "guessing from similar deal" },
  { q: "Break the glass?", guess: "hold?", note: "cannot rank the risk" },
  { q: "Trust the vendor?", guess: "ask owner?", note: "no callable judgment" },
  { q: "Kill the deal?", guess: "yes?", note: "hallucinated precedent" },
  { q: "Escalate to counsel?", guess: "no?", note: "insufficient memory" },
  { q: "Ship without sign-off?", guess: "cannot decide", note: "stall" },
] as const;

const LOOP = [...PAIRS, ...PAIRS];
const THESIS =
  "A model cannot anticipate the hardest decisions you or your company makes.";
const SOLVE = "We solve that problem.";

function FailMeter() {
  const n = useRef(47);
  useEffect(() => {
    const id = window.setInterval(() => {
      n.current += 1;
      const node = document.getElementById("fail-meter");
      if (node) node.textContent = String(n.current).padStart(5, "0");
    }, 1400);
    return () => window.clearInterval(id);
  }, []);
  return <b id="fail-meter">00047</b>;
}

function StallDesk() {
  return (
    <article className="corpus">
      <header className="corpus-bar">
        <span>Generic model</span>
        <span className="corpus-pipe">cannot decide</span>
      </header>

      <div className="corpus-split">
        <div className="corpus-col">
          <p>Decisions needed</p>
          <div className="corpus-ticker">
            <ul>
              {LOOP.map((row, index) => (
                <li key={`q-${index}`}>{row.q}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="corpus-col is-reason">
          <p>
            Agent reasoning
            <i className="corpus-dots" />
          </p>
          <div className="corpus-ticker">
            <ul>
              {LOOP.map((row, index) => (
                <li key={`r-${index}`}>
                  <strong>{row.guess}</strong>
                  <span>{row.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <footer className="corpus-foot">
        <span>failures</span>
        <strong className="is-fail">
          <FailMeter />
        </strong>
      </footer>
    </article>
  );
}

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

export function ThesisRead() {
  const band = useRef<HTMLElement>(null);
  const copy = useCopy();
  const thesis = copy.thesis || THESIS;
  const solve = copy.thesis_solve || SOLVE;

  useLayoutEffect(() => {
    const el = band.current;
    if (!el) return;
    const show = () => el.classList.add("is-in");
    if (el.classList.contains("is-in")) return;
    return armEnter(el, show);
  }, []);

  return (
    <section
      ref={band}
      id="thesis"
      suppressHydrationWarning
      className="thesis-band scroll-mt-24 border-t border-border px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-16">
        <div className="corpus-stage" aria-hidden="true">
          <StallDesk />
        </div>

        <div className="thesis-copy min-w-0 pt-1 text-right lg:pt-3">
          <p className="section-kicker ml-auto">// Our Thesis</p>
          <h2 className="mt-4 font-serif text-3xl font-normal leading-[1.15] tracking-display text-fg sm:text-4xl lg:text-[2.65rem]">
            <WordRoll text={thesis} delay={30} step={50} />
          </h2>
          <p className="mt-5 font-serif text-2xl font-normal leading-snug tracking-display text-gold sm:text-3xl">
            <WordRoll text={solve} delay={720} step={60} />
          </p>
        </div>
      </div>
    </section>
  );
}
