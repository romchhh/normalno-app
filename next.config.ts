import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.tildacdn.com", pathname: "/**" },
      { protocol: "https", hostname: "static.tildacdn.pro", pathname: "/**" },
      { protocol: "https", hostname: "thb.tildacdn.com", pathname: "/**" },
      { protocol: "https", hostname: "i.postimg.cc", pathname: "/**" },
      { protocol: "https", hostname: "postimg.cc", pathname: "/**" },
      { protocol: "https", hostname: "i.ibb.co", pathname: "/**" },
      { protocol: "https", hostname: "ibb.co", pathname: "/**" },
      { protocol: "https", hostname: "imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
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
