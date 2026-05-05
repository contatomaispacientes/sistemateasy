import SectionWithMockup from "./ui/section-with-mockup";
import Reveal from "./ui/Reveal";

export default function Services() {
  return (
    <div id="servicos" className="relative">
      {/* ── Intro header ── */}
      <section className="px-6 md:px-12 pt-20 md:pt-32 pb-4 md:pb-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <Reveal>
            <div className="text-[13px] font-semibold text-accent tracking-[0.1em] uppercase mb-4 font-sans">
              Serviços
            </div>
            <h2 className="font-display text-white tracking-[-0.02em] text-[36px] md:text-[48px] lg:text-[56px] leading-[1.05] mb-5">
              O que fazemos de melhor
            </h2>
            <p className="text-[17px] text-white/45 max-w-[540px] mx-auto font-sans leading-[1.7]">
              SaaS, sites de alta performance e suporte de TI — três frentes
              pensadas pra fazer sua empresa crescer no digital.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 01 · SaaS ── */}
      <SectionWithMockup
        tag="01 / SaaS"
        title={
          <>
            Software que cresce
            <br />
            junto com seu negócio.
          </>
        }
        description={
          <>
            Construímos plataformas pensadas pra escalar — do primeiro usuário
            ao milionésimo. Arquitetura sólida, UX cuidada e código documentado
            pra qualquer time poder evoluir.
          </>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=1200&fit=crop&q=80"
        secondaryImageSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=1200&fit=crop&q=80"
      />

      {/* ── 02 · Sites & landing pages ── */}
      <SectionWithMockup
        reverseLayout
        tag="02 / Sites & landing pages"
        title={
          <>
            Sites que convertem antes
            <br />
            da primeira reunião.
          </>
        }
        description={
          <>
            Landing pages, sites institucionais e e-commerces feitos pra
            performance, SEO e conversão. Identidade visual única — sem
            templates, sem &ldquo;tema do WordPress&rdquo;.
          </>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&h=1200&fit=crop&q=80"
        secondaryImageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=1200&fit=crop&q=80"
      />

      {/* ── 03 · Suporte 24/7 ── */}
      <SectionWithMockup
        tag="03 / Suporte 24/7"
        title={
          <>
            Operação que não para.
            <br />
            Nunca.
          </>
        }
        description={
          <>
            Monitoramento contínuo, resposta em minutos e times que conhecem
            seu stack. Mantemos o uptime, resolvemos incidentes e prevenimos os
            próximos antes do usuário perceber.
          </>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=900&h=1200&fit=crop&q=80"
        secondaryImageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=1200&fit=crop&q=80"
      />
    </div>
  );
}
