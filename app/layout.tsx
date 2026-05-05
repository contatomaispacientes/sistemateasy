import type { Metadata } from "next";
import { Gloock, Gelasio } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import LenisProvider from "@/components/LenisProvider";

const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const gelasio = Gelasio({
  variable: "--font-gelasio",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sistemateasy — Crie. Lance. Escale.",
  description:
    "Desenvolvimento de SaaS, sites de alta performance e suporte de TI. Tudo que sua empresa precisa para crescer no digital.",
  openGraph: {
    title: "Sistemateasy",
    description:
      "Soluções SaaS sob medida, sites de alta performance e suporte de TI 24/7.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${gloock.variable} ${gelasio.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <LenisProvider>{children}</LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
