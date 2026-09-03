const PATH = "M40 210 C 220 210, 360 150, 620 140";
const PACKETS = ["wobbler", "weight: 10.9", "verdict: no"] as const;

const STREAM = `{
  "tool": "read_file",
  "case": "clear",
  "verdict": "grant"
}
{
  "id": "judg_8f3c",
  "operator": "agent.desk.04",
  "tool": "send_term_sheet",
  "case": "wobbler",
  "slice": "2025-Q3",
  "default": "grant",
  "reasons": [
    { "axis": "novelty", "volume": 0.13, "weight": 10.9, "fired": true },
    { "axis": "writing", "volume": 0.15, "weight": 6.2, "fired": false }
  ],
  "w": 0.28,
  "verdict": "no"
}
{
  "tool": "search",
  "case": "clear",
  "verdict": "grant"
}`;

export function VerdictPlane() {
  return (
    <div id="emulator" className="relative isolate mt-8 overflow-hidden">
      <div className="relative mx-auto grid max-w-7xl items-start gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)_minmax(0,22rem)]">
        <div>
          <p className="font-serif text-xl tracking-display text-fg sm:text-2xl">
            Verdict JSON in. Judgment out.
          </p>
          <div className="emu-scroll mt-5">
            <p className="border-b border-border px-3 py-2 font-mono text-2xs tracking-status uppercase text-muted">
              judgment.stream
            </p>
            <div className="emu-scroll-mask">
              <pre className="emu-scroll-track px-3 py-3 font-mono text-[11px] leading-relaxed text-secondary">
                {STREAM}
                {"\n"}
                {STREAM}
              </pre>
            </div>
          </div>
        </div>

        <div className="relative hidden min-h-[16rem] lg:block" aria-hidden="true">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 680 360" fill="none">
            <path
              d={PATH}
              stroke="color-mix(in srgb, var(--color-gold) 45%, transparent)"
              strokeWidth="1"
            />
            {PACKETS.map((packet, index) => (
              <g key={packet} className="emu-packet" style={{ animationDelay: `${index * 1.4}s` }}>
                <rect x={-54} y={-11} width={108} height={22} rx="2" fill="#0a0d0b" stroke="var(--color-gold)" />
                <text x="0" y="4" textAnchor="middle">
                  {packet}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="emu-scroll relative">
          <p className="border-b border-border px-3 py-2 font-mono text-2xs tracking-status uppercase text-muted">
            agent.desk.04
          </p>
          <pre className="px-3 py-4 font-mono text-[12px] leading-7 text-secondary">
            <span className="agent-call">agent    call   send_term_sheet</span>
            {"\n"}
            {`         args   deal=EDN-441
plane    wobbler   slice=2025-Q3   w=0.28
plane    fired     novelty  +10.9
plane    verdict   no`}
          </pre>
          <span className="agent-stamp">NO</span>
        </div>
      </div>
    </div>
  );
}
