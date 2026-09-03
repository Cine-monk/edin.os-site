"use client";

import { WordRoll } from "@/components/word-roll";

export const CAPTIONS = [
  "Your Decisions at Scale.",
  "Filtered by weight, timeslice, freshness.",
  "Minted as a judgment packet.",
  "Exposed as callable MCP ports.",
  "Agents and machines subscribe.",
  "Judgment compounds in the corpus.",
] as const;

const PLATES = [
  {
    id: "ingest",
    video: "/pipeline/ingest.mp4",
    poster: "/pipeline/ingest.jpg",
    left: ["inbound", "96 paths", "live desk", "no public egress"],
    right: ["pe.desk", "ops.floor", "legal.desk", "fleet.cmd"],
  },
  {
    id: "analyze",
    video: "/pipeline/analyze.mp4",
    poster: "/pipeline/analyze.jpg",
    left: ["filter volume", "5 layers", "weight", "timeslice"],
    right: ["freshness", "scope", "signer", "w"],
  },
  {
    id: "emulate",
    video: "/pipeline/emulate.mp4",
    poster: "/pipeline/emulate.jpg",
    left: ["packet mint", "judg_8f3c", "w 0.82", "verdict no"],
    right: ["send_term_sheet", "wobbler", "case closed", "emulatable"],
  },
  {
    id: "mcp",
    video: "/pipeline/mcp.mp4",
    poster: "/pipeline/mcp.jpg",
    left: ["mcp", "ports open", "tls", "scoped"],
    right: ["verdict", "weight", "timeslice", "freshness"],
  },
  {
    id: "calls",
    video: "/pipeline/calls.mp4",
    poster: "/pipeline/calls.jpg",
    left: ["subscribers", "native", "secured", "machines"],
    right: ["term sheet", "exception", "convoy", "cut"],
  },
  {
    id: "compounds",
    video: "/pipeline/compounds.mp4",
    poster: "/pipeline/compounds.jpg",
    left: ["corpus", "roots signed", "trunk v2.0", "14 patterns"],
    right: ["compounds", "human-signed", "immutable", "edin"],
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
              <video src={plate.video} autoPlay muted loop playsInline preload="auto" />
            ) : null}
            {index === 0 ? (
              <div className="pipe-copy">
                <h3 className="pipe-hero">
                  Your Decisions
                  <br />
                  at Scale.
                </h3>
                <p className="pipe-choke">
                  <span>Your Taste Profile</span>
                </p>
              </div>
            ) : index === 1 ? (
              <div className="pipe-copy">
                <h3 className="pipe-hero is-analyze">
                  {on ? <WordRoll text="What is an emulator." delay={80} step={70} /> : null}
                </h3>
              </div>
            ) : (
              <figcaption className="pipe-hud">
                <ul>
                  {plate.left.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <ul>
                  {plate.right.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </figcaption>
            )}
          </figure>
        );
      })}
      {beat > 1 ? (
        <p className="pipe-caption" key={beat}>
          <WordRoll text={CAPTIONS[beat]} delay={60} step={55} />
        </p>
      ) : null}
    </div>
  );
}
