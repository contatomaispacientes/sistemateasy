"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView"> & {
  /** Delay (s) before the reveal starts. Useful for cascading siblings. */
  delay?: number;
  /** Initial Y offset (px). Bigger = more dramatic. */
  y?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Initial scale — 0.96 gives a subtle "settling" feel. */
  scale?: number;
};

/**
 * Wraps any block in a one-shot reveal that triggers when the element
 * scrolls into the viewport. Combines fade + translate-up + a subtle scale
 * settle for an "arriving" feel rather than a flat slide. Honours
 * `prefers-reduced-motion` via the global MotionConfig.
 *
 * Easing: ease-out-expo-ish — slow start, fast finish, natural deceleration.
 */
export default function Reveal({
  delay = 0,
  y = 28,
  duration = 0.85,
  scale = 1,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: scale === 1 ? 1 : scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration,
        delay,
        // Custom cubic — slight overshoot of "ease-out" without the bounce.
        // Reads as deliberate but never sluggish.
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
