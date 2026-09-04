import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  immediate?: boolean;
};

function viewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  stagger = false,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      el.classList.add("is-in");
      cleanup();
    };

    if (immediate) {
      const id = window.requestAnimationFrame(show);
      return () => window.cancelAnimationFrame(id);
    }

    const inBand = () => {
      const rect = el.getBoundingClientRect();
      const vh = viewportHeight();
      return rect.top < vh * 0.94 && rect.bottom > 4;
    };

    const onScroll = () => {
      if (inBand()) show();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
      },
      { threshold: 0, rootMargin: "0px 0px 22% 0px" },
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    const start = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (inBand()) show();
      });
    });
    const fallback = window.setTimeout(show, 6000);

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      io.disconnect();
      window.clearTimeout(fallback);
      window.cancelAnimationFrame(start);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, true);
    };

    return cleanup;
  }, [immediate]);

  return createElement(
    as,
    {
      ref,
      className: cn("reveal-group", !stagger && "reveal-item", className),
      style: { "--d": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}

type RevealItemProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  [key: string]: unknown;
};

export function RevealItem({
  as = "div",
  children,
  className,
  delay = 0,
  ...rest
}: RevealItemProps) {
  return createElement(
    as,
    {
      ...rest,
      className: cn("reveal-item", className),
      style: { "--d": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
