import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d.media.kavehome.com",
        pathname: "/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
