"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Line = {
  text: string;
  /** Renders this line in the brand accent color. */
  accent?: boolean;
};

type BouncingHeadlineProps = {
  lines: Line[];
  className?: string;
  /** Delay in seconds before the first line starts. */
  startDelay?: number;
  /** Stagger between lines in seconds. */
  stagger?: number;
};

/**
 * Renders an `<h1>` whose lines drop in from above one by one with a spring
 * bounce. Each line settles independently — the next one starts before the
 * previous fully stops, so the cascade reads as one fluid motion.
 */
export default function BouncingHeadline({
  lines,
  className,
  startDelay = 0,
  stagger = 0.16,
}: BouncingHeadlineProps) {
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={`${i}-${line.text}`}
          className={cn("block", line.accent && "text-accent")}
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 13,
            mass: 0.85,
            delay: startDelay + i * stagger,
          }}
        >
          {line.text}
        </motion.span>
      ))}
    </h1>
  );
}
