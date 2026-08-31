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
  serverExternalPackages: ["@prisma/client", "node-telegram-bot-api"],
  outputFileTracingIncludes: {
    "/*": ["./node_modules/.prisma/client/**/*"],
    "/api/**/*": ["./node_modules/.prisma/client/**/*"],
  },
  experimental: {
    optimizePackageImports: ["swiper"],
  },
  turbopack: {},
};

export default nextConfig;
