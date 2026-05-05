"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Total Y travel in px across the section's scroll range. */
  range?: number;
};

/**
 * GSAP ScrollTrigger-driven parallax. Smoother and tighter than motion's
 * `useScroll`+`useTransform`, and stays in lockstep with the Lenis-smoothed
 * scroll position via the global ScrollTrigger update wired up in
 * LenisProvider.
 */
export default function Parallax({
  children,
  className,
  range = 60,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip parallax for users who prefer reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: range / 2 },
        {
          y: -range / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            // `scrub: 0.4` adds a small lag, smoothing micro-jitters and
            // locking the motion to scroll velocity.
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [range]);

  return (
    <div ref={ref} className={className} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
