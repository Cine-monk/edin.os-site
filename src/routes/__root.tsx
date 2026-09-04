import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { CopyProvider } from "@/lib/copy";
import { SITE, SITE_JSON_LD } from "@/lib/site";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { name: "theme-color", content: "#0A0D0B" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Edin Labs" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: SITE.locale },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: SITE.url },
      { property: "og:image", content: SITE.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
      { name: "twitter:image", content: SITE.ogImage },
    ],
    links: [
      { rel: "canonical", href: SITE.url },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preload", as: "image", href: "/hero-splash.jpg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap",
      },
      {
        rel: "manifest",
        href: "/__grok/manifest.webmanifest",
      },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "alternate", type: "text/plain", href: "/llms.txt", title: "llms.txt" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(SITE_JSON_LD),
      },
      {
        children: `(function(){try{history.scrollRestoration="manual"}catch(e){}var keep=0,hold=false,ticks=0;function note(){keep=window.scrollY}addEventListener("wheel",note,{passive:true});addEventListener("touchmove",note,{passive:true});addEventListener("scroll",function(){if(window.scrollY>keep)keep=window.scrollY},{passive:true});function thesis(){var el=document.getElementById("thesis");if(!el)return;var r=el.getBoundingClientRect();if(r.top<(window.innerHeight||0)*0.92&&r.bottom>24)el.classList.add("is-in")}addEventListener("wheel",thesis,{passive:true});addEventListener("touchmove",thesis,{passive:true});addEventListener("scroll",thesis,{passive:true});var id=setInterval(function(){ticks++;thesis();if(!hold&&keep>160&&window.scrollY<48){hold=true;window.scrollTo(0,keep);setTimeout(function(){hold=false},40)}if(ticks>45)clearInterval(id)},100)})();`,
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-obsidian text-fg antialiased">
        <PreviewHostBridge />
        <CopyProvider>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </CopyProvider>
        <Scripts />
      </body>
    </html>
  ),
});
