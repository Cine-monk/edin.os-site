import { useEffect, useRef, useState } from "react";
import { WordRoll } from "@/components/word-roll";

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

function FailMeter() {
  const [n, setN] = useState(47);
  useEffect(() => {
    const id = window.setInterval(() => setN((value) => value + 1), 1400);
    return () => window.clearInterval(id);
  }, []);
  return <b>{String(n).padStart(5, "0")}</b>;
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

export function ThesisRead() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-in");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        io.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px 40% 0px" },
    );
    io.observe(el);

    const fallback = window.setTimeout(show, 1200);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="thesis"
      className="thesis-band scroll-mt-20 border-t border-border px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="corpus-stage" aria-hidden="true">
          <StallDesk />
        </div>

        <div className="thesis-copy min-w-0 pt-2 text-right">
          <p className="section-kicker ml-auto">// Our Thesis</p>
          <h2 className="mt-4 font-serif text-3xl font-normal leading-[1.15] tracking-display text-fg sm:text-4xl lg:text-[2.75rem]">
            <WordRoll
              text="A model cannot anticipate the hardest decisions you or your company makes."
              delay={40}
              step={55}
            />
          </h2>
          <p className="mt-5 font-serif text-2xl font-normal leading-snug tracking-display text-gold sm:text-3xl">
            <WordRoll text="We solve that problem." delay={920} step={70} />
          </p>
        </div>
      </div>
    </section>
  );
}
