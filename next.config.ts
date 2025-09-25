import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "cdn.prod.website-files.com",
      },
      { hostname: "ik.imagekit.io" },
      { hostname: "riwayatalquran.com" },
    ],
  },
};

export default nextConfig;
