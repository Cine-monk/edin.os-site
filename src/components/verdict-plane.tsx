"use client";

import { useEffect, useRef, useState } from "react";
import { PipelineWorld } from "@/components/pipeline-canvas";

const BEATS = [
  "Ingest",
  "Analyze",
  "Emulate",
  "Real-World Decisions",
  "Judgment Compounds",
] as const;

export function VerdictPlane() {
  const root = useRef<HTMLDivElement>(null);
  const held = useRef(false);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let timer = 0;
    let visible = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.12 },
    );
    io.observe(el);

    timer = window.setInterval(() => {
      if (held.current || !visible) return;
      setBeat((value) => (value + 1) % BEATS.length);
    }, 3200);

    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const hold = (index: number) => {
    held.current = true;
    setBeat(index);
  };

  return (
    <div ref={root} id="emulator" className="relative isolate pt-12 pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="max-w-3xl font-serif text-3xl font-normal leading-[1.12] tracking-display text-fg sm:text-4xl">
          A judgment layer is your key to
          <br />
          unlocking real agentic representation.
        </h2>
        <ol
          className="fly-beats is-five"
          onMouseLeave={() => {
            held.current = false;
          }}
        >
          {BEATS.map((label, index) => (
            <li
              key={label}
              className={beat === index ? "is-hold" : undefined}
              onMouseEnter={() => hold(index)}
              onClick={() => hold(index)}
            >
              <span>0{index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
      </div>
      <div className="fly-bleed mt-6">
        <div className="fly-stage">
          <PipelineWorld beat={beat} />
        </div>
      </div>
    </div>
  );
}
