import Image from "next/image";
import { InfiniteSlider } from "./ui/infinite-slider";
import { ProgressiveBlur } from "./ui/progressive-blur";

const PARTNERS = [
  { src: "/Wandahortamelhorada.png", alt: "Wanda Horta" },
  { src: "/Endostarmelhorada.png", alt: "Endostar" },
  { src: "/CBTmelhorada.png", alt: "CBT" },
  { src: "/Avanceaidark.png", alt: "Avance AI" },
];

// Repeat enough times so the track always fills the viewport with no gap.
const REPEATED = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function Partners() {
  return (
    <section className="border-y border-white/[.06] py-10">
      <p className="text-center text-[13px] text-white/30 font-sans mb-6">
        Empresas que confiam
      </p>

      <div className="relative h-12 w-full overflow-hidden">
        <InfiniteSlider
          className="flex h-full w-full items-center"
          duration={40}
          gap={80}
        >
          {REPEATED.map((p, i) => (
            <Image
              key={`${p.alt}-${i}`}
              src={p.src}
              alt={p.alt}
              height={40}
              width={140}
              className="h-10 w-auto object-contain opacity-60"
            />
          ))}
        </InfiniteSlider>

        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-32 md:w-48"
          direction="left"
          blurIntensity={0.8}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-32 md:w-48"
          direction="right"
          blurIntensity={0.8}
        />
      </div>
    </section>
  );
}
