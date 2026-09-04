"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { WordRoll } from "@/components/word-roll";

const PLATES = [
  {
    id: "ingest",
    video: "/pipeline/ingest.mp4",
    poster: "/pipeline/ingest.jpg",
    hero: ["Your Decisions", "at Scale."],
    gold: "Your Taste Profile",
    layers: null,
    json: null,
    lede: null,
    desk: false,
    pg: false,
    place: "ingest",
  },
  {
    id: "analyze",
    video: "/pipeline/analyze.mp4",
    poster: "/pipeline/analyze.jpg",
    hero: ["How we distill your judgments."],
    gold: null,
    layers: null,
    json: null,
    lede: "We use a combination of weights, microjudgments, time-slicing, recency, and group and individual.",
    desk: false,
    pg: false,
    place: "analyze",
  },
  {
    id: "emulate",
    video: "/pipeline/emulate.mp4",
    poster: "/pipeline/emulate.jpg",
    hero: ["What is an emulator."],
    gold: null,
    layers: null,
    json: null,
    lede: "A digitized and weighted taste and judgment layer refined from your decisions at scale.",
    desk: false,
    pg: false,
    place: "emulate",
  },
  {
    id: "mcp",
    video: "/pipeline/mcp.mp4",
    poster: "/pipeline/mcp.jpg",
    hero: ["Exposed", "as ports."],
    gold: "Callable MCP.",
    layers: null,
    json: null,
    lede: null,
    desk: true,
    pg: false,
    place: "mcp",
  },
  {
    id: "compounds",
    video: "/pipeline/compounds.mp4",
    poster: "/pipeline/compounds.jpg",
    hero: ["Judgment", "compounds."],
    gold: null,
    layers: null,
    json: null,
    lede: null,
    desk: false,
    pg: true,
    place: "compounds",
  },
] as const;

const ASKED = [
  { q: "Trust the vendor?", verdict: "HOLD", note: "weight 0.91 · desk" },
  { q: "Kill the deal?", verdict: "NO", note: "stop rule" },
  { q: "Escalate to counsel?", verdict: "YES", note: "authority: legal" },
  { q: "Ship without sign-off?", verdict: "NO", note: "unsigned" },
  { q: "Send the term sheet?", verdict: "YES", note: "recency now" },
  { q: "Fire the operator?", verdict: "NO", note: "individual scope" },
  { q: "Grant the exception?", verdict: "YES", note: "group decision" },
  { q: "Hold the convoy?", verdict: "HOLD", note: "microjudgment" },
  { q: "Approve the cut?", verdict: "YES", note: "signed" },
  { q: "Break the glass?", verdict: "NO", note: "risk rank 0.12" },
] as const;

const ASKED_LOOP = [...ASKED, ...ASKED];

const CORPUS = [
  { id: "1841", type: "judgment", verdict: "HOLD", weight: "0.91" },
  { id: "1842", type: "micro", verdict: "YES", weight: "0.88" },
  { id: "1843", type: "judgment", verdict: "NO", weight: "0.12" },
  { id: "1844", type: "group", verdict: "YES", weight: "0.94" },
  { id: "1845", type: "judgment", verdict: "HOLD", weight: "0.77" },
] as const;

function FloorTable({ active }: { active: boolean }) {
  const [n, setN] = useState(3);

  useEffect(() => {
    if (!active) {
      setN(3);
      return;
    }
    const id = window.setInterval(() => {
      setN((value) => (value >= CORPUS.length ? 3 : value + 1));
    }, 1200);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <table className="pipe-floor">
      <thead>
        <tr>
          <th>id</th>
          <th>type</th>
          <th>verdict</th>
          <th>weight</th>
        </tr>
      </thead>
      <tbody>
        {CORPUS.slice(0, n).map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.type}</td>
            <td>{row.verdict}</td>
            <td>{row.weight}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PassMeter({ active }: { active: boolean }) {
  const n = useRef(1284);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      n.current += 1;
      const node = document.getElementById("pass-meter");
      if (node) node.textContent = String(n.current).padStart(5, "0");
    }, 1100);
    return () => window.clearInterval(id);
  }, [active]);
  return <b id="pass-meter">01284</b>;
}

function PassDesk({ active }: { active: boolean }) {
  return (
    <article className="corpus is-pass">
      <header className="corpus-bar">
        <span>Judgment emulator</span>
        <span className="corpus-pipe">callable</span>
      </header>
      <div className="corpus-split">
        <div className="corpus-col">
          <p>Agent asked</p>
          <div className="corpus-ticker">
            <ul>
              {ASKED_LOOP.map((row, index) => (
                <li key={`q-${index}`}>{row.q}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="corpus-col is-reason">
          <p>
            Judgment
            <i className="corpus-dots" />
          </p>
          <div className="corpus-ticker">
            <ul>
              {ASKED_LOOP.map((row, index) => (
                <li key={`r-${index}`}>
                  <strong>{row.verdict}</strong>
                  <span>{row.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <footer className="corpus-foot">
        <span>passed</span>
        <strong className="is-pass">
          <PassMeter active={active} />
        </strong>
      </footer>
    </article>
  );
}

function PlateVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;
    if (!active) {
      node.pause();
      return;
    }
    const play = () => {
      const run = node.play();
      if (run) run.catch(() => undefined);
    };
    if (node.readyState >= 2) play();
    node.addEventListener("canplay", play);
    node.addEventListener("loadeddata", play);
    play();
    return () => {
      node.removeEventListener("canplay", play);
      node.removeEventListener("loadeddata", play);
    };
  }, [active, src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload={active ? "auto" : "none"}
      className={active ? "is-live" : undefined}
    />
  );
}

export function PipelineWorld({ beat }: { beat: number }) {
  return (
    <div className="pipe" data-beat={beat}>
      {PLATES.map((plate, index) => {
        const on = beat === index;
        return (
          <figure
            key={plate.id}
            className={on ? `pipe-plate is-on is-${plate.place}` : `pipe-plate is-${plate.place}`}
            aria-hidden={!on}
          >
            <img src={plate.poster} alt="" />
            <PlateVideo src={plate.video} active={on} />
            {plate.desk ? (
              <div className="pipe-desk">
                <PassDesk active={on} />
              </div>
            ) : null}
            <div className={`pipe-copy is-${plate.place}`}>
              {plate.layers ? (
                <div className={`pipe-lockup is-${plate.place}`}>
                  {plate.hero.length ? (
                    <h3 className={`pipe-hero is-${plate.place}`}>
                      {plate.hero.map((line, lineIndex) => (
                        <span key={line} className="pipe-hero-line">
                          {on ? <WordRoll text={line} delay={40 + lineIndex * 140} step={55} /> : line}
                        </span>
                      ))}
                    </h3>
                  ) : null}
                  <ul className="pipe-layers">
                    {plate.layers.map((label, lineIndex) => (
                      <li key={label} style={{ "--d": `${220 + lineIndex * 90}ms` } as CSSProperties}>
                        {on ? <WordRoll text={label} delay={220 + lineIndex * 90} step={40} /> : label}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : plate.lede ? (
                <div className={`pipe-lockup is-${plate.place}`}>
                  <h3 className={`pipe-hero is-${plate.place}`}>
                    {plate.hero.map((line, lineIndex) => (
                      <span key={line} className="pipe-hero-line">
                        {on ? <WordRoll text={line} delay={40 + lineIndex * 160} step={60} /> : line}
                      </span>
                    ))}
                  </h3>
                  <p className="pipe-lede">
                    {on ? <WordRoll text={plate.lede} delay={320} step={28} /> : plate.lede}
                  </p>
                </div>
              ) : (
                <h3 className={`pipe-hero is-${plate.place}`}>
                  {plate.hero.map((line, lineIndex) => (
                    <span key={line} className="pipe-hero-line">
                      {on ? <WordRoll text={line} delay={40 + lineIndex * 160} step={60} /> : line}
                    </span>
                  ))}
                </h3>
              )}
              {plate.gold ? (
                <p className={`pipe-choke is-${plate.place}`}>
                  <span>{plate.gold}</span>
                </p>
              ) : null}
              {plate.json ? (
                <pre className="pipe-json">
                  <span>{plate.json}</span>
                </pre>
              ) : null}
              {plate.pg ? <FloorTable active={on} /> : null}
            </div>
          </figure>
        );
      })}
    </div>
  );
}
