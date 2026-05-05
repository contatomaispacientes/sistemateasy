"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectShowcaseItem = {
  title: string;
  /** Optional uppercase eyebrow shown next to the title (e.g. "SAAS"). */
  tag?: string;
  description: string;
  year: string;
  link: string;
  image: string;
};

type Props = {
  projects: ProjectShowcaseItem[];
  className?: string;
};

// Floating preview card dimensions
const PREVIEW_W = 340;
const PREVIEW_H = 230;

/**
 * Editorial project list with a cursor-following image preview.
 *
 * On hover:
 * 1. The active row gets a subtle background highlight + animated underline
 *    + arrow icon that slides in.
 * 2. A floating preview frame trails the cursor with a smooth lerp.
 * 3. Inside the frame, the active image scales 1.18 → 1.05 and blurs out
 *    of focus → into focus, a strong zoom-in effect.
 * 4. The image also gets a subtle parallax — it drifts in the OPPOSITE
 *    direction of cursor movement, simulating depth (like looking through
 *    a window into the project).
 */
export default function ProjectShowcase({ projects, className }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const isVisible = hoveredIndex !== null;

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // rAF lerp toward the latest mouse position for buttery follow.
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const tick = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Parallax offset: image drifts opposite to cursor for depth feel.
  // Values clamp to roughly ±28px max — subtle but visible.
  const rect = containerRef.current?.getBoundingClientRect();
  const cw = rect?.width ?? 1;
  const ch = rect?.height ?? 1;
  const parallaxX =
    -((smoothPosition.x - cw / 2) / Math.max(cw, 1)) * 32;
  const parallaxY =
    -((smoothPosition.y - ch / 2) / Math.max(ch, 1)) * 32;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative w-full", className)}
    >
      {/* Cursor-following preview frame — desktop only, clearly distracting on touch. */}
      <div
        aria-hidden
        className="pointer-events-none fixed z-50 hidden md:block"
        style={{
          left: rect?.left ?? 0,
          top: rect?.top ?? 0,
          transform: `translate3d(${smoothPosition.x + 32}px, ${smoothPosition.y - PREVIEW_H / 2}px, 0)`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform, opacity",
        }}
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-white/[.08]"
          style={{
            width: PREVIEW_W,
            height: PREVIEW_H,
            background: "#0e0e10",
            boxShadow:
              "0 28px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {projects.map((p, i) => {
            const active = hoveredIndex === i;
            return (
              <Image
                key={p.title}
                src={p.image}
                alt={p.title}
                fill
                sizes={`${PREVIEW_W}px`}
                className="object-cover"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active
                    ? `scale(1.05) translate3d(${parallaxX}px, ${parallaxY}px, 0)`
                    : "scale(1.18)",
                  filter: active ? "none" : "blur(16px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                  willChange: "transform, opacity, filter",
                }}
              />
            );
          })}
          {/* Top vignette for legibility of any future overlay text */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 35%)",
            }}
          />
          {/* Faint accent wash on the bottom-right corner */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 80% 100%, rgba(232,113,58,0.18), transparent 55%)",
            }}
          />
        </div>
      </div>

      {/* Item list */}
      <div className="space-y-0">
        {projects.map((project, index) => {
          const active = hoveredIndex === index;
          return (
            <a
              key={project.title}
              href={project.link}
              className="group relative block focus-visible:outline-none"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative py-7 md:py-8 border-t border-white/[.07]">
                {/* Background highlight on hover */}
                <div
                  aria-hidden
                  className="absolute -inset-x-4 inset-y-0 rounded-xl bg-white/[.02] transition-opacity duration-500"
                  style={{ opacity: active ? 1 : 0 }}
                />

                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      {project.tag && (
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-accent/80 font-sans">
                          {project.tag}
                        </span>
                      )}
                      <h3 className="font-display text-white text-[26px] md:text-[34px] leading-tight tracking-[-0.02em]">
                        <span className="relative">
                          {project.title}
                          {/* Animated underline draws left → right */}
                          <span
                            aria-hidden
                            className="absolute left-0 -bottom-1 h-px bg-accent transition-[width] duration-500 ease-out"
                            style={{ width: active ? "100%" : "0%" }}
                          />
                        </span>
                      </h3>
                      <ArrowUpRight
                        className="w-5 h-5 text-accent/80 transition-all duration-300 ease-out"
                        style={{
                          opacity: active ? 1 : 0,
                          transform: active
                            ? "translate(0,0)"
                            : "translate(-10px, 10px)",
                        }}
                        strokeWidth={1.75}
                      />
                    </div>

                    <p
                      className="text-[14px] md:text-[15px] mt-2 leading-relaxed font-sans transition-colors duration-300"
                      style={{
                        color: active
                          ? "rgba(255,255,255,0.72)"
                          : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <span
                    className="text-[12px] font-sans text-white/35 tabular-nums tracking-wide transition-colors duration-300 mt-2 shrink-0"
                    style={{
                      color: active
                        ? "rgba(255,255,255,0.55)"
                        : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
        {/* Closing border under the last item */}
        <div className="border-t border-white/[.07]" />
      </div>
    </div>
  );
}
