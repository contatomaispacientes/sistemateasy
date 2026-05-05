import MeshGradient from "./MeshGradient";
import HeroSlider from "./HeroSlider";
import { IconArrow, IconBolt, IconShield, IconChat } from "./Icons";
import { Button } from "./ui/neon-button";
import Reveal from "./ui/Reveal";
import Counter from "./ui/Counter";
import Parallax from "./ui/Parallax";
import BouncingHeadline from "./ui/BouncingHeadline";
import PulsingDot from "./ui/PulsingDot";
import { HERO_HANDOFF } from "./IntroOverlay";

type Stat =
  | { num: number; suffix: string; label: string }
  | { raw: string; label: string };

const STATS: Stat[] = [
  { num: 50, suffix: "+", label: "Projetos entregues" },
  { raw: "24/7", label: "Suporte dedicado" },
  { num: 98, suffix: "%", label: "Satisfação" },
];

const TRUST: { icon: React.ReactNode; text: string }[] = [
  { icon: <IconBolt />, text: "Entrega em 4-6 semanas" },
  { icon: <IconShield />, text: "Entrega segura" },
  { icon: <IconChat />, text: "Suporte 24/7" },
];

type HeroProps = {
  whatsappUrl: string;
};

export default function Hero({ whatsappUrl }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <MeshGradient delay={HERO_HANDOFF - 0.4} />

      {/* ── Top: side-by-side hero ─ left stack | right slider ─
          Layout uses proportional flex (2:3) so the slider scales with the
          viewport instead of capping at a fixed width — at 1920+ and 2440+
          the slider grows with the page rather than leaving the right side
          empty. */}
      <div className="relative z-10 max-w-[1700px] mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-12 md:pb-20">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-14 items-center">
          {/* Left column — badge → H1 → text → buttons (stacked, all left-aligned) */}
          <div className="w-full xl:flex-[2] min-w-0">
            {/* Visual/DOM order stays: badge → H1 → subhead → CTAs.
                Animation order: H1 cascade fully completes (~4.82s) BEFORE
                any secondary element starts. Hero secondaries cascade from
                HERO_HANDOFF+1.05 onwards with 0.12s gaps. */}
            <Reveal delay={HERO_HANDOFF + 1.18}>
              <div className="flex items-center gap-3 mb-8">
                {/* Pulsing dot — pops in with a spring, then keeps pinging */}
                <PulsingDot delay={HERO_HANDOFF + 1.32} />
                <span className="text-[11px] tracking-[0.22em] uppercase text-white/55 font-sans font-medium">
                  Soluções SaaS sob medida
                </span>
              </div>
            </Reveal>

            <BouncingHeadline
              startDelay={HERO_HANDOFF}
              lines={[
                { text: "Crie." },
                { text: "Lance.", accent: true },
                { text: "Escale." },
              ]}
              className="font-display text-white tracking-[-0.03em] text-[52px] sm:text-[68px] lg:text-[88px] leading-[0.95] mb-7"
            />

            <Reveal delay={HERO_HANDOFF + 1.32}>
              <p className="text-[17px] md:text-[18px] text-white/55 leading-[1.7] max-w-[480px] font-sans mb-9">
                Desenvolvimento de SaaS, sites de alta performance e suporte de
                TI. Tudo que sua empresa precisa para crescer no digital.
              </p>
            </Reveal>

            {/* CTA buttons — each gets its own Reveal so they cascade in
                instead of arriving together as a single block. */}
            <div className="flex flex-wrap gap-3.5">
              <Reveal delay={HERO_HANDOFF + 1.46}>
                <Button
                  href={whatsappUrl}
                  variant="solid"
                  size="lg"
                  className="hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(232,113,58,0.27)] hover:shadow-[0_8px_32px_rgba(232,113,58,0.4)]"
                >
                  Falar no WhatsApp <IconArrow />
                </Button>
              </Reveal>
              <Reveal delay={HERO_HANDOFF + 1.58}>
                <Button href="#cases" variant="outline" size="lg">
                  Ver Cases
                </Button>
              </Reveal>
            </div>
          </div>

          {/* Right column — auto-rotating slider with 3 mock scenes.
              Held back until after H1's cascade lands fully so the
              headline reads first, alone. */}
          <Reveal
            delay={HERO_HANDOFF + 1.05}
            y={36}
            className="w-full xl:flex-[3] min-w-0"
          >
            <Parallax range={70} className="w-full">
              <HeroSlider />
            </Parallax>
          </Reveal>
        </div>
      </div>

      {/* ── Closing strip: stats + trust, glass band over the mesh ─
          The strip's bg/border fades in as a unit; each stat and each
          trust badge then cascades in individually on top. */}
      <Reveal delay={HERO_HANDOFF + 1.6}>
        <div
          className="relative z-10 border-t border-white/[.06]"
          style={{
            background: "rgba(10,10,11,0.55)",
            backdropFilter: "blur(8px) saturate(1.2)",
            WebkitBackdropFilter: "blur(8px) saturate(1.2)",
          }}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 md:py-10 flex flex-col lg:flex-row lg:justify-between gap-y-8 gap-x-12 items-start lg:items-center">
            {/* Stats — each fades + slides up individually, staggered */}
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {STATS.map((s, i) => {
                const statDelay = HERO_HANDOFF + 1.85 + i * 0.12;
                return (
                  <Reveal key={s.label} delay={statDelay} y={20}>
                    <div>
                      <div className="font-display text-accent text-[28px] md:text-[34px] leading-none">
                        {"num" in s ? (
                          <Counter
                            to={s.num}
                            suffix={s.suffix}
                            delay={statDelay + 0.35}
                          />
                        ) : (
                          s.raw
                        )}
                      </div>
                      <div className="text-[11px] text-white/40 mt-2 font-sans tracking-[0.12em] uppercase">
                        {s.label}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Trust badges — same staggered pattern, slightly behind stats */}
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {TRUST.map((t, i) => (
                <Reveal
                  key={t.text}
                  delay={HERO_HANDOFF + 2.1 + i * 0.1}
                  y={16}
                >
                  <div className="flex items-center gap-2 text-[13px] text-white/50 font-sans">
                    <span className="text-accent/70">{t.icon}</span>
                    {t.text}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
