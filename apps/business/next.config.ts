import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  output: process.env.NODE_ENV !== 'development' ? "standalone" : undefined,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: "**" }]
  }
};

export default nextConfig;
