import { IconWhatsApp } from "./Icons";
import { Button } from "./ui/neon-button";
import Reveal from "./ui/Reveal";

type CTAProps = {
  whatsappUrl: string;
};

export default function CTA({ whatsappUrl }: CTAProps) {
  return (
    <section
      id="contato"
      className="px-6 md:px-12 max-w-[1200px] mx-auto mb-20"
    >
      <Reveal
        className="relative overflow-hidden rounded-[28px] py-20 px-8 md:px-15 text-center border border-white/[.07]"
        style={{ background: "linear-gradient(145deg, #141416, #18181c)" }}
      >
        <div
          aria-hidden
          className="absolute -top-15 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(232,113,58,.083), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,113,58,.25), transparent)",
          }}
        />

        <div className="relative z-10">
          <h2 className="font-display text-white tracking-[-0.02em] text-[36px] md:text-[48px] leading-[1.1] mb-4">
            Vamos <span className="text-accent">conversar?</span>
          </h2>
          <p className="text-[17px] text-white/40 max-w-[460px] mx-auto mb-9 leading-[1.7] font-sans">
            Entre em contato pelo WhatsApp e solicite um orçamento sem
            compromisso. Estamos prontos para tirar sua ideia do papel.
          </p>
          <Button
            href={whatsappUrl}
            variant="solid"
            size="xl"
            className="hover:scale-[1.04] shadow-[0_4px_32px_rgba(232,113,58,0.27)] hover:shadow-[0_8px_40px_rgba(232,113,58,0.4)]"
          >
            <IconWhatsApp /> Chamar no WhatsApp
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
