"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { IconArrow } from "./Icons";
import Reveal from "./ui/Reveal";
import { cn } from "@/lib/utils";

type Metric = { label: string; value: string };

type CaseItem = {
  title: string;
  tag: string;
  year: string;
  desc: string;
  longDesc: string;
  stack: string[];
  metrics: Metric[];
  img: string;
};

const CASES: CaseItem[] = [
  {
    title: "ERP Cloud",
    tag: "SaaS",
    year: "2025",
    desc: "Gestão empresarial unificada em nuvem, sincronizada em tempo real.",
    longDesc:
      "Plataforma SaaS que substitui três sistemas legados — financeiro, estoque e CRM — em uma única interface. Sincronização real-time entre filiais com arquitetura offline-first.",
    stack: ["Next.js", "PostgreSQL", "GraphQL", "Redis"],
    metrics: [
      { label: "MAU", value: "30k+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Países", value: "5" },
    ],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop&q=80",
  },
  {
    title: "Portal Inovação",
    tag: "Site",
    year: "2024",
    desc: "Portal corporativo de alta performance — 95+ no Lighthouse.",
    longDesc:
      "Portal corporativo com mais de 200 páginas geradas por ISR, servindo conteúdo CMS atualizado sem comprometer Core Web Vitals. Edge cache global pra latência <80ms.",
    stack: ["Next.js", "Sanity CMS", "Vercel Edge"],
    metrics: [
      { label: "Lighthouse", value: "98" },
      { label: "TBT", value: "<50ms" },
      { label: "Páginas", value: "200+" },
    ],
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&h=900&fit=crop&q=80",
  },
  {
    title: "FinTrack App",
    tag: "SaaS",
    year: "2024",
    desc: "Controle financeiro fim-a-fim para PMEs — do DRE ao fluxo de caixa.",
    longDesc:
      "App financeiro para PMEs sem time financeiro dedicado. DRE automático, fluxo de caixa preditivo e integração via Open Finance com 8 bancos brasileiros.",
    stack: ["React Native", "Node.js", "Pluggy", "Postgres"],
    metrics: [
      { label: "Empresas", value: "1.2k" },
      { label: "Bancos", value: "8" },
      { label: "Acurácia", value: "99%" },
    ],
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&h=900&fit=crop&q=80",
  },
  {
    title: "Vitrine Digital",
    tag: "Site",
    year: "2023",
    desc: "E-commerce B2B com catálogo inteligente e checkout em 1 clique.",
    longDesc:
      "E-commerce B2B com catálogo de 50k SKUs e busca semântica baseada em embeddings. Checkout em 1 clique pra revendedores recorrentes, reduzindo abandono em 38%.",
    stack: ["Next.js", "Algolia", "Stripe", "Shopify"],
    metrics: [
      { label: "SKUs", value: "50k" },
      { label: "Conversão", value: "+38%" },
      { label: "Latência", value: "<200ms" },
    ],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop&q=80",
  },
];

// ─── Mini card (default grid state) ────────────────────────────────────────

function MiniCard({
  data,
  inactive,
}: {
  data: CaseItem;
  inactive: boolean;
}) {
  return (
    <article
      className={cn(
        "h-full rounded-[20px] overflow-hidden bg-white/[.025] border border-white/[.07] cursor-pointer",
        // Slower + ease-out-expo for a weighty, fluid handoff
        "transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        inactive
          ? "opacity-25 scale-[0.97]"
          : "opacity-100 scale-100 hover:border-accent/35",
      )}
    >
      <div className="relative h-[220px] md:h-[260px] overflow-hidden">
        <Image
          src={data.img}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          style={{
            filter: "brightness(0.55) saturate(0.7)",
            transition: "filter 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,11,.8), transparent 60%)",
          }}
        />
        <span className="absolute top-4 right-4 text-[11px] font-semibold text-white bg-accent/80 rounded-full px-3 py-1 tracking-[.04em] font-sans">
          {data.tag}
        </span>
      </div>
      <div className="px-6 py-5">
        <div className="flex items-baseline justify-between gap-4 mb-1.5">
          <h3 className="font-display text-white tracking-[-0.02em] text-[22px] leading-tight">
            {data.title}
          </h3>
          <span className="text-[12px] text-white/35 font-sans tabular-nums shrink-0">
            {data.year}
          </span>
        </div>
        <p className="text-[14px] text-white/45 font-sans leading-relaxed">
          {data.desc}
        </p>
      </div>
    </article>
  );
}

// ─── Expanded card (desktop hover state) ───────────────────────────────────

function ExpandedCard({
  data,
  parallaxX,
  parallaxY,
}: {
  data: CaseItem;
  parallaxX: number;
  parallaxY: number;
}) {
  return (
    <article
      className="relative h-full w-full rounded-[20px] overflow-hidden border border-accent/35"
      style={{
        background: "linear-gradient(145deg, #141416, #1a1a1e)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04)",
      }}
    >
      <div className="grid grid-cols-[1.15fr_1fr] h-full">
        {/* Image side with parallax */}
        <div className="relative overflow-hidden">
          <Image
            src={data.img}
            alt={data.title}
            fill
            sizes="(max-width: 1200px) 60vw, 700px"
            className="object-cover"
            style={{
              transform: `scale(1.18) translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
              // 1.1s with ease-out-expo — weight without sluggishness.
              // The spring of the curve makes fast cursor moves feel
              // intentional, slow moves feel buttery.
              transition:
                "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
              filter: "brightness(0.7) saturate(0.95)",
              willChange: "transform",
            }}
          />
          {/* Right-edge fade so the image bleeds into the dark text panel */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent 55%, rgba(20,20,22,0.55) 88%, rgba(20,20,22,0.85) 100%)",
            }}
          />
          {/* Subtle accent wash from top-left */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 15% 20%, rgba(232,113,58,0.18), transparent 55%)",
            }}
          />
          <span className="absolute top-5 left-5 text-[11px] font-semibold text-white bg-accent/85 rounded-full px-3.5 py-1 tracking-[.04em] font-sans">
            {data.tag}
          </span>
        </div>

        {/* Text panel */}
        <div className="p-7 lg:p-9 flex flex-col justify-between min-w-0">
          <div className="flex-1 flex flex-col">
            <div className="text-[11px] text-accent/85 font-sans tracking-[0.22em] uppercase mb-3 font-semibold">
              {data.tag} · {data.year}
            </div>
            <h3 className="font-display text-white tracking-[-0.02em] text-[30px] lg:text-[40px] leading-[1.05] mb-4">
              {data.title}
            </h3>
            <p className="text-[14px] lg:text-[15px] text-white/55 font-sans leading-[1.65] mb-5">
              {data.longDesc}
            </p>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {data.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] lg:text-[12px] text-white/55 font-sans px-3 py-[5px] rounded-full border border-white/[.08] bg-white/[.025]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-[13px] text-accent font-sans font-medium">
              Ver case completo
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-3 pt-5 mt-5 border-t border-white/[.07]">
            {data.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-accent text-[22px] lg:text-[26px] leading-none">
                  {m.value}
                </div>
                <div className="text-[10px] text-white/40 mt-1.5 uppercase tracking-[0.12em] font-sans">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────

export default function Cases() {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const onLeave = () => {
    setActive(null);
    setPos({ x: 0, y: 0 });
  };

  // Parallax: image drifts opposite to cursor for depth
  const tx = -pos.x * 50;
  const ty = -pos.y * 50;

  return (
    <section
      id="cases"
      className="px-6 md:px-12 py-20 md:py-[100px] max-w-[1200px] mx-auto"
    >
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12">
          <div>
            <div className="text-[13px] font-semibold text-accent tracking-[0.1em] uppercase mb-2.5 font-sans">
              Portfólio
            </div>
            <h2 className="font-display text-white tracking-[-0.02em] text-[36px] md:text-[44px] leading-[1.1]">
              Cases de sucesso
            </h2>
          </div>
          <a
            href="#"
            className="text-[14px] text-accent font-sans inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
          >
            Ver todos <IconArrow />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          ref={containerRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {CASES.map((c, i) => (
            <div
              key={c.title}
              onMouseEnter={() => setActive(i)}
              className="md:cursor-pointer"
            >
              <MiniCard
                data={c}
                inactive={active !== null && active !== i}
              />
            </div>
          ))}

          {/* Expanded overlay — desktop only. Pointer-events-none so cursor
              still hits the underlying mini-card zones to switch active.
              Sync mode lets a new card cross-fade with the outgoing one
              instead of waiting for it to fully exit. */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-10">
            <AnimatePresence mode="sync">
              {active !== null && (
                <motion.div
                  key={`exp-${active}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{
                    // Slower crossfade — reads as a "morph" between cards
                    // rather than a snap when switching hover targets.
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ExpandedCard
                    data={CASES[active]}
                    parallaxX={tx}
                    parallaxY={ty}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
