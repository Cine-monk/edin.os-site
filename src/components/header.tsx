import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { EdinLogo } from "@/components/logo";
import { useSheet } from "@/components/sheet-context";
import { Button } from "@/components/ui/button";
import { COMPANY_NAV, NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";

const navItem =
  "inline-flex h-16 items-center rounded-md px-3 font-mono text-micro font-medium leading-none tracking-status uppercase text-secondary transition-colors duration-150 hover:text-fg";

export function Header() {
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const menuId = useId();
  const companyId = useId();
  const sheet = useSheet();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="header-drop sticky top-0 z-50 border-b border-border bg-obsidian/80 backdrop-blur-lg">
      <div className="site-bar mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <EdinLogo />

        <nav className="hidden h-16 items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={navItem}>
              {link.label}
            </a>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              type="button"
              className={navItem}
              aria-expanded={companyOpen}
              aria-controls={companyId}
              onClick={() => setCompanyOpen((value) => !value)}
            >
              Company
              <ChevronDown className="ml-1 size-3.5 opacity-70" aria-hidden="true" />
            </button>
            <div
              id={companyId}
              className={cn(
                "absolute left-0 top-full min-w-[13.5rem] border border-border bg-obsidian/95 py-2 shadow-gold-soft backdrop-blur-lg",
                companyOpen ? "block" : "hidden",
              )}
            >
              {COMPANY_NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex min-h-10 items-center px-4 font-mono text-micro tracking-status uppercase text-secondary transition-colors duration-150 hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            className="hidden rounded-none sm:inline-flex"
            onClick={() => {
              setOpen(false);
              sheet.show();
            }}
          >
            Get Started
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-border text-fg lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={cn("border-t border-border bg-obsidian lg:hidden", open ? "block" : "hidden")}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center rounded-md px-3 font-mono text-sm tracking-status uppercase text-fg"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <p className="mt-3 px-3 font-mono text-2xs tracking-status uppercase text-muted">Company</p>
          {COMPANY_NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center rounded-md px-3 font-mono text-sm tracking-status uppercase text-secondary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            block
            className="mt-3 rounded-none"
            onClick={() => {
              setOpen(false);
              sheet.show();
            }}
          >
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
}
