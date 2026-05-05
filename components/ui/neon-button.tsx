"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "relative group inline-flex items-center justify-center gap-2 border text-center rounded-full font-sans transition-all duration-150 cursor-pointer no-underline whitespace-nowrap",
  {
    variants: {
      variant: {
        // Subtle orange tint with accent border — quiet primary CTA.
        default:
          "bg-accent/[.06] hover:bg-accent/[.1] border-accent/30 text-white",
        // Filled accent button — loudest CTA (WhatsApp etc.).
        solid:
          "bg-accent hover:bg-accent-deep text-white border-transparent hover:border-white/40",
        // Transparent with subtle border — secondary CTAs.
        outline:
          "bg-transparent border-white/[.12] text-white hover:border-white/30 hover:bg-white/[.04]",
        // No border — for tertiary / link-like buttons.
        ghost:
          "border-transparent bg-transparent text-white hover:bg-white/[.05]",
      },
      size: {
        sm: "px-4 py-1.5 text-[13px] font-medium",
        default: "px-6 py-2.5 text-[14px] font-semibold",
        lg: "px-8 py-3.5 text-[15px] font-semibold",
        xl: "px-10 py-[18px] text-[16px] font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

type ButtonOnly = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};
type AnchorOnly = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export type ButtonProps = (ButtonOnly | AnchorOnly) &
  Variants & { neon?: boolean };

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, neon = true, size, variant, children, ...props }, ref) => {
  const classes = cn(buttonVariants({ variant, size }), className);
  const overlay = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-accent to-transparent hidden",
          neon && "block",
        )}
      />
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-accent to-transparent hidden",
          neon && "block",
        )}
      />
    </>
  );

  if (props.href !== undefined) {
    const anchorProps = props as AnchorOnly;
    return (
      <a
        {...anchorProps}
        className={classes}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {overlay}
      </a>
    );
  }

  const buttonProps = props as ButtonOnly;
  return (
    <button
      {...buttonProps}
      className={classes}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {overlay}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
