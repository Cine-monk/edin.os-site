import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 font-sans text-sm font-medium tracking-tight transition-[background-color,border-color,box-shadow,color,transform] duration-150 ease-[var(--ease-out-smooth)] active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gold text-obsidian hover:bg-gold-hover hover:shadow-gold",
        secondary: "border border-emerald-bright bg-card/60 text-fg hover:bg-card-hover",
        outline: "border border-gold bg-obsidian text-gold hover:shadow-gold hover:bg-gold/5",
        ghost: "text-secondary hover:text-fg hover:bg-card-hover",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", block: false },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, block, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, block }), className)} {...props} />;
}
