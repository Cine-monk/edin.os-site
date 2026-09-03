"use client";

import { WordRoll } from "@/components/word-roll";

const PLATES = [
  {
    id: "ingest",
    video: "/pipeline/ingest.mp4",
    poster: "/pipeline/ingest.jpg",
    hero: ["Your Decisions", "at Scale."],
    gold: "Your Taste Profile",
    place: "ingest",
  },
  {
    id: "analyze",
    video: "/pipeline/analyze.mp4",
    poster: "/pipeline/analyze.jpg",
    hero: ["What is an emulator."],
    gold: null,
    place: "analyze",
  },
  {
    id: "emulate",
    video: "/pipeline/emulate.mp4",
    poster: "/pipeline/emulate.jpg",
    hero: ["A packet", "of judgment."],
    gold: "Minted. Weighted. Signed.",
    place: "emulate",
  },
  {
    id: "mcp",
    video: "/pipeline/mcp.mp4",
    poster: "/pipeline/mcp.jpg",
    hero: ["Exposed", "as ports."],
    gold: "Callable MCP.",
    place: "mcp",
  },
  {
    id: "calls",
    video: "/pipeline/calls.mp4",
    poster: "/pipeline/calls.jpg",
    hero: ["Decisions leave", "the desk."],
    gold: "Agents subscribe.",
    place: "calls",
  },
  {
    id: "compounds",
    video: "/pipeline/compounds.mp4",
    poster: "/pipeline/compounds.jpg",
    hero: ["Judgment", "compounds."],
    gold: "Signed into the corpus.",
    place: "compounds",
  },
] as const;

export function PipelineWorld({ beat }: { beat: number }) {
  return (
    <div className="pipe" data-beat={beat}>
      {PLATES.map((plate, index) => {
        const on = beat === index;
        return (
          <figure key={plate.id} className={on ? "pipe-plate is-on" : "pipe-plate"} aria-hidden={!on}>
            <img src={plate.poster} alt="" />
            {on ? (
              <video src={plate.video} autoPlay muted loop playsInline preload="metadata" />
            ) : null}
            <div className={`pipe-copy is-${plate.place}`}>
              <h3 className={`pipe-hero is-${plate.place}`}>
                {on ? (
                  plate.hero.map((line, lineIndex) => (
                    <span key={line} className="pipe-hero-line">
                      <WordRoll text={line} delay={80 + lineIndex * 180} step={70} />
                    </span>
                  ))
                ) : (
                  plate.hero.map((line) => (
                    <span key={line} className="pipe-hero-line">
                      {line}
                    </span>
                  ))
                )}
              </h3>
              {plate.gold ? (
                <p className={`pipe-choke is-${plate.place}`}>
                  <span>{plate.gold}</span>
                </p>
              ) : null}
            </div>
          </figure>
        );
      })}
    </div>
  );
}
