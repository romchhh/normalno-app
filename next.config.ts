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
  serverExternalPackages: [
    "node-telegram-bot-api",
    "array.prototype.findindex",
    "asn1",
    "assert-plus",
  ],
  experimental: {
    optimizePackageImports: ["swiper"],
  },
  turbopack: {},
};

export default nextConfig;
