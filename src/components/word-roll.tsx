import type { CSSProperties } from "react";

type WordRollProps = {
  text: string;
  delay?: number;
  step?: number;
  className?: string;
};

export function WordRoll({ text, delay = 0, step = 70, className }: WordRollProps) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="word-roll-clip"
          style={
            {
              "--d": `${delay + index * step}ms`,
              display: "inline-block",
              overflow: "hidden",
              paddingRight: "0.3em",
              verticalAlign: "bottom",
            } as CSSProperties
          }
        >
          <span className="word-roll">{word}</span>
        </span>
      ))}
    </span>
  );
}
