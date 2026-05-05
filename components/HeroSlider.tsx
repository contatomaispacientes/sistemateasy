"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const SLIDES = [
  { id: "dashboard", label: "dashboard" },
  { id: "projetos", label: "projetos" },
  { id: "suporte", label: "suporte" },
] as const;

const ROTATE_MS = 5500;
const MAIN_HEIGHT = 540;

export default function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const active = SLIDES[activeIdx];

  return (
    <div className="relative w-full max-w-[1100px] mx-auto">
      {/* Atmospheric glow behind the frame */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[640px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(232,113,58,0.18), transparent 70%)",
        }}
      />

      {/* Browser-style frame */}
      <div
        className="relative w-full rounded-[22px] overflow-hidden border border-white/[.08]"
        style={{
          background: "linear-gradient(145deg, #141416, #1a1a1e)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04)",
        }}
      >
        {/* Browser bar — URL reflects the active slide */}
        <div className="flex items-center gap-3 px-6 py-5 bg-white/[.03] border-b border-white/[.06]">
          <div className="flex gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#28ca42]" />
          </div>
          <div className="flex-1 h-11 rounded-lg bg-white/[.05] ml-3 flex items-center px-5 overflow-hidden">
            <span className="text-[14px] text-white/30 whitespace-nowrap font-sans">
              app.sistemateasy.com/
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active.label}
                  className="text-white/55 inline-block font-medium"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {active.label}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex gap-6 p-8 md:p-10">
          {/* Sidebar — active item follows slide */}
          <div className="w-[80px] flex flex-col gap-4 items-center pt-2 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
              <span className="font-display text-[22px] text-accent leading-none">
                S
              </span>
            </div>
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "w-10 h-10 rounded-lg transition-colors duration-300",
                  i === activeIdx ? "bg-accent/30" : "bg-white/[.04]",
                )}
              />
            ))}
          </div>

          {/* Main — animated swap */}
          <div
            className="flex-1 min-w-0 relative"
            style={{ height: MAIN_HEIGHT }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {active.id === "dashboard" && <DashboardSlide />}
                {active.id === "projetos" && <ProjectsSlide />}
                {active.id === "suporte" && <SupportSlide />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Dot / pill indicators */}
      <div className="flex justify-center gap-4 mt-8">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveIdx(i)}
            aria-label={`Ver ${s.label}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer",
              i === activeIdx
                ? "w-14 bg-accent"
                : "w-7 bg-white/15 hover:bg-white/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Slide 1: Dashboard ─────────────────────────────────────────────────────

const DASHBOARD_STATS = [
  { label: "Receita", val: "R$ 84k", color: "var(--accent)", pct: "+12%" },
  { label: "Usuários", val: "2.4k", color: "#3b82f6", pct: "+8%" },
  { label: "Conversão", val: "4.2%", color: "#8b5cf6", pct: "+3%" },
];

function DashboardSlide() {
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex justify-between items-center">
        <div className="text-[13px] text-white/40 font-sans">
          Últimos 30 dias
        </div>
        <div className="h-10 px-5 rounded-lg border border-accent/20 bg-accent/[.13] flex items-center">
          <span className="text-[13px] text-accent font-medium font-sans">
            Exportar
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {DASHBOARD_STATS.map((s) => (
          <div
            key={s.label}
            className="bg-white/[.03] rounded-[16px] p-6 border border-white/[.05]"
          >
            <div className="text-[12px] text-white/35 mb-3 font-sans">
              {s.label}
            </div>
            <div className="text-[28px] font-bold font-sans text-white leading-none">
              {s.val}
            </div>
            <div
              className="text-[13px] mt-3 font-sans font-medium"
              style={{ color: s.color }}
            >
              {s.pct}
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-1 min-h-[180px] rounded-[16px] border border-white/[.04] bg-white/[.02] overflow-hidden">
        <svg
          width="100%"
          height="80%"
          viewBox="0 0 300 70"
          preserveAspectRatio="none"
          className="absolute bottom-4 left-0"
        >
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 Q30 50 60 42 T120 30 T180 18 T240 25 T300 10"
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 60 Q30 50 60 42 T120 30 T180 18 T240 25 T300 10 V70 H0Z"
            fill="url(#chartGrad)"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        {[
          { w: 78, active: true },
          { w: 62, active: false },
          { w: 45, active: false },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5">
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full",
                row.active ? "bg-accent" : "bg-white/10",
              )}
            />
            <div className="h-[8px] flex-1 bg-white/[.04] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${row.w}%`,
                  background: row.active
                    ? "rgba(232,113,58,.4)"
                    : "rgba(255,255,255,.1)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Slide 2: Projects pipeline ─────────────────────────────────────────────

const PROJECTS = [
  {
    name: "ERP Cloud",
    progress: 86,
    status: "Produção",
    color: "#10b981",
  },
  {
    name: "Portal Inovação",
    progress: 58,
    status: "Dev",
    color: "var(--accent)",
  },
  {
    name: "FinTrack App",
    progress: 32,
    status: "Design",
    color: "#3b82f6",
  },
  {
    name: "Vitrine B2B",
    progress: 14,
    status: "Início",
    color: "#8b5cf6",
  },
];

function ProjectsSlide() {
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex justify-between items-center">
        <div className="text-[13px] text-white/40 font-sans">
          Em andamento ({PROJECTS.length})
        </div>
        <div className="h-10 px-5 rounded-lg border border-accent/20 bg-accent/[.13] flex items-center">
          <span className="text-[13px] text-accent font-medium font-sans">
            + Novo
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        {PROJECTS.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-3 px-6 py-5 bg-white/[.03] border border-white/[.05] rounded-[16px]"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[16px] font-semibold text-white font-sans truncate">
                  {p.name}
                </span>
                <span
                  className="text-[12px] font-semibold px-3.5 py-[5px] rounded-full whitespace-nowrap font-sans"
                  style={{
                    background: `color-mix(in srgb, ${p.color} 18%, transparent)`,
                    color: p.color,
                  }}
                >
                  {p.status}
                </span>
              </div>
              <div className="h-[7px] bg-white/[.05] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{ width: `${p.progress}%`, background: p.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Slide 3: Support ──────────────────────────────────────────────────────

const MESSAGES = [
  {
    from: "user",
    text: "O site está fora do ar",
    time: "14:30",
  },
  {
    from: "agent",
    text: "Verificando agora — 1 min",
    time: "14:30",
  },
  {
    from: "agent",
    text: "Servidor reativado · uptime 99.9%",
    time: "14:32",
    success: true,
  },
];

function SupportSlide() {
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-[#10b981] animate-ping opacity-60" />
            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          </span>
          <span className="text-[13px] text-white/45 font-sans">
            Suporte online
          </span>
        </div>
        <div className="text-[12px] text-white/30 font-sans">
          SLA &lt; 15min
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-1">
        {MESSAGES.map((m, i) => {
          const isUser = m.from === "user";
          return (
            <div
              key={i}
              className={cn(
                "flex gap-3.5 items-end",
                isUser && "flex-row-reverse",
              )}
            >
              <div
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold font-sans shrink-0",
                  isUser
                    ? "bg-white/[.08] text-white/60"
                    : "bg-accent/20 text-accent",
                )}
              >
                {isUser ? "U" : "S"}
              </div>
              <div
                className={cn(
                  "max-w-[78%] px-5 py-4 rounded-[18px] text-[15px] font-sans leading-snug",
                  isUser
                    ? "bg-white/[.06] text-white/85 rounded-br-sm"
                    : "bg-accent/10 text-white/90 border border-accent/15 rounded-bl-sm",
                )}
              >
                {m.text}
                {m.success && (
                  <span className="ml-2 text-[#10b981]">✓</span>
                )}
                <div
                  className={cn(
                    "text-[11px] opacity-50 mt-2",
                    isUser ? "text-right" : "text-left",
                  )}
                >
                  {m.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
