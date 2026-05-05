import Image from "next/image";
import { Headphones, Sparkles, Target, TrendingUp } from "lucide-react";
import Reveal from "./ui/Reveal";

const VALUES = [
  {
    icon: Headphones,
    title: "Suporte 24/7",
    desc: "Resposta direta com quem entende seu projeto. Sem fila, sem ticket.",
  },
  {
    icon: Target,
    title: "Entrega previsível",
    desc: "Sprints de 2 semanas com demo ao final de cada etapa.",
  },
  {
    icon: Sparkles,
    title: "Design autêntico",
    desc: "Sua identidade visual no produto — nunca um template do mercado.",
  },
  {
    icon: TrendingUp,
    title: "Foco no resultado",
    desc: "Métricas claras definidas antes da primeira linha de código.",
  },
];

export default function About() {
  return (
    <section
      id="sobre"
      className="overflow-hidden py-20 md:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 space-y-14 md:space-y-20">
        {/* ── Header ── */}
        <Reveal>
          <div className="relative z-10 max-w-2xl">
            <div className="text-[13px] font-semibold text-accent tracking-[0.1em] uppercase mb-4 font-sans">
              Sobre nós
            </div>
            <h2 className="font-display text-white tracking-[-0.02em] text-[36px] md:text-[48px] lg:text-[56px] leading-[1.05] mb-6">
              Tecnologia com propósito
            </h2>
            <p className="text-[17px] md:text-[18px] text-white/55 leading-[1.7] font-sans">
              Tecnologia que resolve, não que impressiona. Cada SaaS, site e
              plataforma sai daqui com arquitetura pra crescer, design que
              carrega sua marca e suporte contínuo — porque o lançamento é só o
              começo.
            </p>
          </div>
        </Reveal>

        {/* ── Wide hero image with 3D perspective skew ── */}
        <Reveal delay={0.15}>
          <div className="relative -mx-4 md:-mx-12">
            <div className="[perspective:1000px]">
              <div className="[transform:skewY(-2deg)skewX(-2deg)rotateX(6deg)]">
                <div className="aspect-[88/36] relative rounded-2xl overflow-hidden border border-white/[.06]">
                  <Image
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1760&h=720&fit=crop&q=80"
                    alt="Equipe Sistemateasy em sessão de trabalho"
                    fill
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    className="object-cover"
                  />
                  {/* Bottom fade so the photo bleeds into the page bg */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 50%, rgba(10,10,11,0.85) 100%)",
                    }}
                  />
                  {/* Soft accent wash from top-right */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 80% 20%, rgba(232,113,58,0.18), transparent 60%)",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Outer fade — keeps the skewed corners blending into background */}
            <div
              aria-hidden
              className="absolute pointer-events-none z-10"
              style={{
                inset: "-4.25rem",
                background:
                  "radial-gradient(ellipse at 75% 25%, transparent 0%, var(--background) 78%)",
              }}
            />
          </div>
        </Reveal>

        {/* ── 4-column values grid ── */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-8">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className="w-[18px] h-[18px] text-accent shrink-0"
                      strokeWidth={1.75}
                    />
                    <h3 className="text-[15px] font-semibold text-white font-sans">
                      {v.title}
                    </h3>
                  </div>
                  <p className="text-[14px] text-white/45 leading-[1.65] font-sans">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
