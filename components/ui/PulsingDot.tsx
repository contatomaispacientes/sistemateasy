"use client";

import { motion } from "motion/react";

type Props = {
  /** Delay (s) before the pop-in entrance fires. */
  delay?: number;
};

/**
 * Small accent dot that pops in with a spring (one-shot) and then keeps a
 * continuous `animate-ping` halo for the live-status feel.
 */
export default function PulsingDot({ delay = 0 }: Props) {
  return (
    <motion.span
      className="relative inline-flex w-2 h-2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 16,
        delay,
      }}
    >
      <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
      <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
    </motion.span>
  );
}
