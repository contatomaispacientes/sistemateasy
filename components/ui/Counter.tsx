"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";

type CounterProps = {
  to: number;
  duration?: number;
  /** Delay (s) before the count animation begins after entering view. */
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/**
 * Animates 0 → `to` once, the first time the element enters the viewport.
 * Falls back to the static target value if the user requested reduced motion
 * (the underlying `animate` from motion already respects that).
 *
 * The `delay` prop matters in the Hero — `useInView` fires immediately on
 * page load (the element is in the DOM behind the intro overlay), so without
 * an explicit delay the count would finish before the user sees it.
 */
export default function Counter({
  to,
  duration = 1.6,
  delay = 0,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(value, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, delay, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
