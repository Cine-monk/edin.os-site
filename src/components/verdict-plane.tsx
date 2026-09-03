const PATHS = ["-34%", "-20%", "-8%", "8%", "20%", "34%"] as const;

const JSON_LINES = [
  `{`,
  `  "id": "judg_8f3c",`,
  `  "tool": "send_term_sheet",`,
  `  "case": "wobbler",`,
  `  "w": 0.28,`,
  `  "verdict": "no"`,
  `}`,
] as const;

const PORTS = ["verdict", "wobbler", "weight", "scope"] as const;

const AGENTS = [
  { id: "native", label: "Your agents", badge: "native" },
  { id: "third", label: "Third-party", badge: "secured" },
  { id: "machines", label: "Machines", badge: "MCP" },
] as const;

const BEATS = ["Ingest", "Converge", "Judgment", "Mint JSON", "MCP", "Call"] as const;

export function VerdictPlane() {
  return (
    <div id="emulator" className="relative isolate mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-serif text-xl tracking-display text-fg sm:text-2xl">
          Data in. Judgment layer at the waypoint. MCP out.
        </p>
      </div>

      <div className="fly mx-auto mt-8 max-w-7xl">
        <ol className="fly-beats" aria-hidden="true">
          {BEATS.map((beat) => (
            <li key={beat}>{beat}</li>
          ))}
        </ol>

        <div className="fly-stage">
          <div className="fly-floor" aria-hidden="true">
            {PATHS.map((offset) => (
              <span key={offset} className="fly-path" style={{ left: `calc(50% + ${offset})` }} />
            ))}
          </div>

          <div className="fly-waypoint">
            <span className="fly-waypoint-core" />
            <p>Judgment layer</p>
          </div>

          <pre className="fly-json">
            {JSON_LINES.map((line) => (
              <span key={line} className="fly-json-line">
                {line}
              </span>
            ))}
          </pre>

          <div className="fly-mcp" aria-hidden="false">
            <div className="fly-hub">MCP</div>
            <ul className="fly-ports">
              {PORTS.map((port) => (
                <li key={port}>{port}</li>
              ))}
            </ul>
          </div>

          <ul className="fly-agents">
            {AGENTS.map((agent) => (
              <li key={agent.id} className={`fly-agent is-${agent.id}`}>
                <span>{agent.badge}</span>
                {agent.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
