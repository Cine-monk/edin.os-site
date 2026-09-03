import { Link } from "@tanstack/react-router";
import { EdinMark } from "@/components/logo";
import { SOCIAL_LINKS } from "@/lib/content";

const linkClass =
  "block leading-none py-1 font-mono text-2xs tracking-status uppercase text-secondary transition-colors duration-150 hover:text-gold";

const COMPANY_LINKS = [
  { href: "/privacy", label: "Privacy", internal: true },
  { href: "/terms", label: "Terms", internal: true },
  { href: "/intake", label: "Contact", internal: true },
  { href: "https://edincloud.com", label: "edincloud.com", internal: false },
] as const;

export function Footer() {
  return (
    <footer id="company" className="relative isolate scroll-mt-20 overflow-hidden border-t border-border">
      <img
        src="/hero-splash.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/70 to-obsidian/40"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-5 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2.5 text-fg no-underline" aria-label="Edin Labs home">
          <EdinMark className="size-6 shrink-0 text-gold" />
          <span className="flex flex-col gap-1">
            <span className="font-sans text-sm font-medium leading-none tracking-[-0.02em]">Edin Labs</span>
            <span className="font-mono text-2xs leading-none tracking-status uppercase text-muted">© 2026</span>
          </span>
        </Link>
        <div className="flex gap-10 sm:gap-14">
          <nav className="flex flex-col" aria-label="Social">
            {SOCIAL_LINKS.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {item.label}
              </a>
            ))}
          </nav>
          <nav className="flex flex-col" aria-label="Company">
            {COMPANY_LINKS.map((item) =>
              item.internal ? (
                <Link key={item.label} to={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
