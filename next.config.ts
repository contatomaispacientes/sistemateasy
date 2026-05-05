import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera arquivos estáticos em /out — necessário para hospedagem compartilhada (Hostinger)
  output: "export",

  // Apache serve /about/index.html automaticamente para /about/
  trailingSlash: true,

  images: {
    // Otimização de imagem requer servidor Node.js; desabilitada no export estático
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
