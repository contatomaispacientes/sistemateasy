import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import About from "@/components/About";
import Cases from "@/components/Cases";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import IntroOverlay from "@/components/IntroOverlay";

// Replace with real wa.me link once a phone number is available, e.g.
// "https://wa.me/5511999999999?text=Ol%C3%A1%2C+gostaria+de+um+or%C3%A7amento"
const WHATSAPP_URL = "#contato";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Nav whatsappUrl={WHATSAPP_URL} />
      <main className="flex-1">
        <Hero whatsappUrl={WHATSAPP_URL} />
        <Partners />
        <Services />
        <About />
        <Cases />
        <CTA whatsappUrl={WHATSAPP_URL} />
      </main>
      <Footer whatsappUrl={WHATSAPP_URL} />
    </>
  );
}
