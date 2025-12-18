import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-94024244cf5f47538b0f873a6f54f09e.r2.dev",
        port: "",
      },
    ],
  },
};

export default nextConfig;
