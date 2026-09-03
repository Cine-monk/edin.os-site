import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SheetProvider } from "@/components/sheet-context";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <SheetProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </SheetProvider>
  );
}
