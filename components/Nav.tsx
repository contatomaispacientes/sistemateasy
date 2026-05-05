import Logo from "./Logo";
import { IconWhatsApp } from "./Icons";
import { Button } from "./ui/neon-button";

const LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Cases", href: "#cases" },
  { label: "Contato", href: "#contato" },
];

type NavProps = {
  whatsappUrl: string;
};

export default function Nav({ whatsappUrl }: NavProps) {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-[18px] border-b border-white/[.06]"
      style={{
        background: "rgba(10,10,11,.8)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
      }}
    >
      <Logo />

      <div className="hidden md:flex gap-9 text-[14px] font-medium font-sans text-white/50">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="transition-colors duration-200 hover:text-white"
          >
            {l.label}
          </a>
        ))}
      </div>

      <Button
        href={whatsappUrl}
        variant="solid"
        size="default"
        className="hover:-translate-y-px shadow-[0_2px_16px_rgba(232,113,58,0.2)] hover:shadow-[0_6px_28px_rgba(232,113,58,0.33)]"
      >
        <IconWhatsApp size={20} /> WhatsApp
      </Button>
    </nav>
  );
}
