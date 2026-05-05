"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type SectionWithMockupProps = {
  /** Optional eyebrow above the title (e.g. "01 / SaaS"). */
  tag?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  primaryImageSrc: string;
  secondaryImageSrc: string;
  /** When true, text moves to the right and mockup to the left. */
  reverseLayout?: boolean;
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SectionWithMockup({
  tag,
  title,
  description,
  primaryImageSrc,
  secondaryImageSrc,
  reverseLayout = false,
}: SectionWithMockupProps) {
  const layoutClasses = reverseLayout
    ? "md:grid-cols-2 md:grid-flow-col-dense"
    : "md:grid-cols-2";
  const textOrderClass = reverseLayout ? "md:col-start-2" : "";
  const imageOrderClass = reverseLayout ? "md:col-start-1" : "";

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1220px] mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          className={cn(
            "grid grid-cols-1 gap-16 md:gap-20 w-full items-center",
            layoutClasses,
          )}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Text — z-20 so it always sits above the blurred secondary card */}
          <motion.div
            className={cn(
              "relative z-20 flex flex-col items-start gap-5 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0",
              textOrderClass,
            )}
            variants={itemVariants}
          >
            {tag && (
              <span className="text-[12px] font-sans font-medium tracking-[0.22em] uppercase text-accent">
                {tag}
              </span>
            )}
            <h2 className="font-display text-white tracking-[-0.02em] text-[36px] md:text-[44px] lg:text-[48px] leading-[1.05]">
              {title}
            </h2>
            <p className="text-[15px] md:text-[16px] text-white/55 leading-[1.7] font-sans max-w-[480px]">
              {description}
            </p>
          </motion.div>

          {/* Mockup */}
          <motion.div
            className={cn(
              "relative mt-10 md:mt-0 mx-auto w-full max-w-[300px] md:max-w-[471px]",
              imageOrderClass,
            )}
            variants={itemVariants}
          >
            {/* Secondary card — sits behind, blurred, drifts up on enter.
                Offsets stay within the mockup column so the blurred halo
                doesn't bleed into the text column. */}
            <motion.div
              className="absolute w-[260px] h-[300px] md:w-[88%] md:h-[490px] rounded-[32px] z-0 overflow-hidden border border-white/[.05]"
              style={{
                top: reverseLayout ? "auto" : "8%",
                bottom: reverseLayout ? "8%" : "auto",
                left: reverseLayout ? "auto" : "-8%",
                right: reverseLayout ? "-8%" : "auto",
                background: "#090909",
                filter: "blur(1.5px)",
              }}
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? -20 : -30 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Image
                src={secondaryImageSrc}
                alt=""
                fill
                sizes="(max-width: 768px) 300px, 472px"
                className="object-cover rounded-[32px]"
              />
            </motion.div>

            {/* Primary card — frosted glass, drifts down on enter */}
            <motion.div
              className="relative w-full h-[405px] md:h-[637px] rounded-[32px] backdrop-blur-[15px] border border-white/[.06] z-10 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)" }}
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? 20 : 30 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Image
                src={primaryImageSrc}
                alt=""
                fill
                sizes="(max-width: 768px) 300px, 471px"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hairline at bottom — soft glow that fades into the next section */}
      <div
        aria-hidden
        className="absolute w-full h-px bottom-0 left-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </section>
  );
}
