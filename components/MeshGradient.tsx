"use client";

import { motion } from "motion/react";
import { MeshGradient as PaperMeshGradient } from "@paper-design/shaders-react";

const PALETTE = ["#0a0a0b", "#1a0e08", "#6b2e15", "#e8713a"];

type Props = {
  /** Delay (s) before the gradient starts fading in. */
  delay?: number;
};

export default function MeshGradient({ delay = 0 }: Props) {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay, ease: "easeOut" }}
    >
      <PaperMeshGradient
        className="absolute inset-0 w-full h-full"
        colors={PALETTE}
        speed={0.35}
        distortion={0.85}
        swirl={0.4}
        grainMixer={0.15}
      />
      {/* Soften the bottom edge so it blends into the page background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, #0a0a0b 100%)",
        }}
      />
      {/* Grid overlay (kept from the original design) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </motion.div>
  );
}
