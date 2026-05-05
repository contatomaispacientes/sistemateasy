"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Site-wide smooth scrolling via Lenis, synchronized with GSAP ScrollTrigger
 * so any scroll-driven animation (Parallax, pinning) reads the smoothed
 * position. Honours `prefers-reduced-motion` — if the user requested less
 * motion, Lenis is skipped entirely so native scroll behavior wins.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Custom ease: matches our motion ease curve for animation parity.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Wheel + touch by default. Smooth wheel only — touch stays native.
      smoothWheel: true,
    });

    // Drive ScrollTrigger updates from Lenis so scroll-pinned animations
    // stay in lockstep with the smoothed position.
    lenis.on("scroll", ScrollTrigger.update);

    let raf = 0;
    const tick = (time: number) => {
      // Lenis expects time in ms.
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ScrollTrigger needs to know about lag from Lenis so refreshes line up.
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
