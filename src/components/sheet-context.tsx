import { createContext, useContext, useEffect, useId, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type SheetContextValue = { show: () => void; hide: () => void };

const SheetContext = createContext<SheetContextValue>({ show: () => {}, hide: () => {} });

export function useSheet() {
  return useContext(SheetContext);
}

export function SheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <SheetContext.Provider value={{ show: () => setOpen(true), hide: () => setOpen(false) }}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            className="absolute inset-0 bg-obsidian/70"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border bg-obsidian px-8 py-10"
          >
            <p className="section-kicker">// Get started</p>
            <h2 id={titleId} className="mt-4 font-serif text-3xl tracking-display text-fg">
              Get started.
            </h2>
            <p className="mt-3 font-serif text-secondary">
              Sign up to take control of your judgment in the age of AI.
            </p>
            <form
              className="mt-10 flex flex-col gap-6"
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <label className="flex flex-col">
                <span className="font-mono text-2xs tracking-status uppercase text-muted">
                  Corporate email
                </span>
                <input className="sheet-line" type="email" name="email" required autoComplete="email" />
              </label>
              <label className="flex flex-col">
                <span className="font-mono text-2xs tracking-status uppercase text-muted">
                  Target industry
                </span>
                <select className="sheet-line" name="industry" defaultValue="PE & VC">
                  <option>PE & VC</option>
                  <option>Legal & Compliance</option>
                  <option>E-Commerce</option>
                  <option>Commercial Real Estate</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-mono text-2xs tracking-status uppercase text-muted">
                  Current operational bottleneck
                </span>
                <textarea className="sheet-line min-h-24 resize-none" name="bottleneck" />
              </label>
              <Button type="submit" className="mt-2 rounded-none">
                Initialize System Scoping
              </Button>
            </form>
          </div>
        </div>
      ) : null}
    </SheetContext.Provider>
  );
}
