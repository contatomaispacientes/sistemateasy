"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
  children: React.ReactNode;
  /** Pixel gap between items (and between the two copies). */
  gap?: number;
  /** Time in seconds for one full loop of the content. */
  duration?: number;
  /** Reverse the scroll direction. */
  reverse?: boolean;
  className?: string;
  /** Pause the loop while the user hovers. */
  pauseOnHover?: boolean;
};

/**
 * rAF-driven infinite marquee. Two copies of the children are rendered side
 * by side; a position counter is advanced each frame and wrapped via modulo
 * into `[0, contentWidth)`. Because the second copy is laid out exactly one
 * `contentWidth` to the right of the first, any `pos` always shows the same
 * visual content as `pos + contentWidth`, so the modulo wrap is invisible —
 * items leaving the left appear immediately on the right with no reset.
 *
 * Why not pure CSS? `transform: translateX(-50%)` keyframes are subject to
 * sub-pixel rounding when the keyframe boundary is hit, which can produce a
 * faint visible jump. rAF + integer-aware math keeps the loop seamless.
 */
export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  reverse = false,
  className,
  pauseOnHover = false,
}: InfiniteSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const inner = innerRef.current;
    if (!track || !inner) return;

    let pos = 0;
    let last = performance.now();
    let raf = 0;
    let contentWidth = inner.offsetWidth;

    // Re-measure if content reflows (font load, viewport resize, etc.).
    const ro = new ResizeObserver(() => {
      contentWidth = inner.offsetWidth;
    });
    ro.observe(inner);

    const direction = reverse ? -1 : 1;

    const tick = (now: number) => {
      // Clamp dt so a long pause (tab in background) doesn't fast-forward.
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      if (!pausedRef.current && contentWidth > 0 && duration > 0) {
        pos += (dt / duration) * contentWidth * direction;
        // Normalize into [0, contentWidth). Handles negative direction too.
        pos = ((pos % contentWidth) + contentWidth) % contentWidth;
        track.style.transform = `translate3d(${-pos}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [duration, reverse]);

  const onEnter = pauseOnHover
    ? () => {
        pausedRef.current = true;
      }
    : undefined;
  const onLeave = pauseOnHover
    ? () => {
        pausedRef.current = false;
      }
    : undefined;

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
      >
        <div
          ref={innerRef}
          className="flex shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {children}
        </div>
        <div
          className="flex shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  );
}
