import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Portal | Edin Labs" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function LoginPage() {
  return (
    <SiteShell>
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-md">
          <Reveal stagger>
            <RevealItem>
              <p className="section-kicker">// Portal</p>
            </RevealItem>
            <RevealItem as="h1" delay={80} className="mt-4 font-serif text-4xl font-normal tracking-display text-fg">
              Log in.
            </RevealItem>
            <RevealItem delay={140} className="mt-8">
              <form
                className="flex flex-col gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-2xs tracking-status uppercase text-muted">
                    Corporate email
                  </span>
                  <input className="field-input" type="email" name="email" required autoComplete="email" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-2xs tracking-status uppercase text-muted">Password</span>
                  <input className="field-input" type="password" name="password" required autoComplete="current-password" />
                </label>
                <Button type="submit" className="mt-4 rounded-none">
                  Enter
                </Button>
              </form>
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
