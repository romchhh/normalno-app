import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.tildacdn.com",
        pathname: "/**",
      },
    ],
    localPatterns: [{ pathname: "/**" }],
  },
  serverExternalPackages: ["node-telegram-bot-api"],
  experimental: {
    optimizePackageImports: ["swiper"],
  },
  turbopack: {},
};

export default nextConfig;
