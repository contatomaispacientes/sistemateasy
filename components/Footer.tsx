import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import {
  IconWhatsApp,
  IconInstagram,
  IconLinkedIn,
  IconGitHub,
} from "./Icons";
import {
  TextHoverEffect,
  FooterBackgroundGradient,
} from "./ui/hover-footer";

const SECTIONS = [
  {
    title: "Empresa",
    links: [
      { label: "Sobre nós", href: "#sobre" },
      { label: "Cases", href: "#cases" },
      { label: "Carreira", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Documentação", href: "#" },
      { label: "Status", href: "#", pulse: true },
    ],
  },
];

const CONTACT = [
  {
    icon: <Mail size={18} className="text-accent" />,
    text: "contato@sistemateasy.com.br",
    href: "mailto:contato@sistemateasy.com.br",
  },
  {
    icon: <Phone size={18} className="text-accent" />,
    text: "+55 (11) 99999-9999",
    href: "tel:+5511999999999",
  },
  {
    icon: <MapPin size={18} className="text-accent" />,
    text: "São Paulo, Brasil",
  },
];

type FooterProps = {
  whatsappUrl: string;
};

export default function Footer({ whatsappUrl }: FooterProps) {
  const socials = [
    { icon: <IconInstagram size={20} />, label: "Instagram", href: "#" },
    { icon: <IconLinkedIn size={20} />, label: "LinkedIn", href: "#" },
    { icon: <IconGitHub size={20} />, label: "GitHub", href: "#" },
    { icon: <IconWhatsApp size={20} />, label: "WhatsApp", href: whatsappUrl },
  ];

  return (
    <footer className="relative h-fit rounded-3xl overflow-hidden mx-4 md:mx-8 mb-8 bg-white/[.025] border border-white/[.06]">
      <FooterBackgroundGradient />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Logo />
            <p className="text-sm text-white/55 leading-relaxed font-sans max-w-xs">
              Soluções SaaS sob medida, sites de alta performance e suporte de
              TI para fazer sua empresa crescer no digital.
            </p>
          </div>

          {/* Link sections */}
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6 font-sans">
                {section.title}
              </h4>
              <ul className="space-y-3 text-white/55 font-sans">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="relative inline-block hover:text-accent transition-colors"
                    >
                      {link.label}
                      {"pulse" in link && link.pulse && (
                        <span className="absolute top-1 -right-3 w-2 h-2 rounded-full bg-accent animate-pulse" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6 font-sans">
              Contato
            </h4>
            <ul className="space-y-4 text-white/55 font-sans">
              {CONTACT.map((c, i) => (
                <li key={i} className="flex items-center gap-3">
                  {c.icon}
                  {c.href ? (
                    <a
                      href={c.href}
                      className="hover:text-accent transition-colors"
                    >
                      {c.text}
                    </a>
                  ) : (
                    <span>{c.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/10 my-8" />

        {/* Social + copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <div className="flex gap-6 text-white/40">
            {socials.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-accent transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
          <div className="font-sans text-center md:text-right">
            <p className="text-[13px] text-white/40">
              © {new Date().getFullYear()} · Sistemateasy
            </p>
            <p className="text-[11px] text-white/30 mt-1 tracking-[0.18em] uppercase">
              Crie. <span className="text-accent/70">Lance.</span> Escale.
            </p>
          </div>
        </div>
      </div>

      {/* Giant brand logo — same pattern as the navbar logo at huge scale.
          Sits behind the content (z-0) with a negative margin scaled to the
          text size so the social row always lands roughly at its midline. */}
      <div
        className="hidden sm:block relative z-0 px-4 md:px-8 pb-4"
        style={{ marginTop: "calc(clamp(44px, 8vw, 120px) * -0.5)" }}
      >
        <TextHoverEffect />
      </div>
    </footer>
  );
}
