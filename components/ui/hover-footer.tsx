"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Giant version of the brand logo for the footer:
 * - "Sistemat" in Gloock (font-display)
 * - "easy" in Gelasio italic (font-sans) on the accent orange
 * - Curved swoop SVG below "easy" that animates in on mount
 *
 * Sizes are expressed in `em` so the whole thing scales fluidly with the
 * container fontSize (set via `style` from the parent — `clamp(...)` keeps
 * it responsive across breakpoints).
 */
export const TextHoverEffect = ({ className }: Props) => {
  return (
    <div
      aria-hidden
      className={cn(
        "flex items-baseline justify-center select-none pointer-events-none",
        className,
      )}
      style={{
        fontSize: "clamp(44px, 8vw, 120px)",
        // Heavy blur turns the logo into a soft atmospheric watermark behind
        // the readable footer copy.
        filter: "blur(10px)",
      }}
    >
      <span
        className="font-display text-white tracking-[-0.02em] leading-none"
        style={{ fontSize: "0.96em" }}
      >
        Sistemat
      </span>
      <span className="relative inline-block leading-none">
        <span className="font-sans italic text-accent leading-none">easy</span>
        <svg
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            bottom: "-0.13em",
            left: "-0.087em",
            width: "calc(100% + 0.174em)",
            height: "0.348em",
            overflow: "visible",
          }}
          viewBox="0 0 80 12"
          fill="none"
        >
          <motion.path
            d="M2 8 C20 2, 60 2, 78 6"
            stroke="var(--accent)"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
      </span>
    </div>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, rgba(15,15,17,0.4) 50%, rgba(232,113,58,0.18) 100%)",
      }}
    />
  );
};
