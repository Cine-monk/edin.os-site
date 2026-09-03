import { useId } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function EdinMark({ className }: { className?: string }) {
  const clipId = useId();

  return (
    <svg viewBox="0 0 32 32" className={cn("text-gold", className)} fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <polygon points="11,3.4 21,3.4 28.6,11 28.6,21 21,28.6 11,28.6 3.4,21 3.4,11" />
        </clipPath>
      </defs>
      <image
        href="/hero-splash.jpg"
        x="2"
        y="2"
        width="28"
        height="28"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
        opacity="0.55"
      />
      <polygon
        points="11,3.4 21,3.4 28.6,11 28.6,21 21,28.6 11,28.6 3.4,21 3.4,11"
        fill="#1b4d3e"
        opacity="0.28"
        clipPath={`url(#${clipId})`}
      />
      <polygon
        points="11,3.4 21,3.4 28.6,11 28.6,21 21,28.6 11,28.6 3.4,21 3.4,11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 21.6 L20.2 10.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

export function EdinLogo() {
  return (
    <Link
      to="/"
      className="site-brand group -ml-1.5 inline-flex h-16 items-center gap-2.5 text-fg no-underline"
      aria-label="Edin Labs home"
    >
      <EdinMark className="size-7 shrink-0 text-gold transition-transform duration-200 ease-[var(--ease-out-smooth)] group-hover:scale-[1.04]" />
      <span className="site-wordmark font-sans text-[15px] font-medium leading-none tracking-[-0.02em] text-fg">
        Edin Labs
      </span>
    </Link>
  );
}
