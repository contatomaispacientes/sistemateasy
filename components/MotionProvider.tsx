"use client";

import { MotionConfig } from "motion/react";

/**
 * Wraps the tree in a MotionConfig that defers to the user's
 * `prefers-reduced-motion` setting — heavy reveals/parallax disable
 * automatically when the OS asks for less motion.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
