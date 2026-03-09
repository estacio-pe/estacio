import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  serverExternalPackages: [
    //"pino",
    //"pino-pretty",
    "@mastra/*",
  ],
};

export default nextConfig;
