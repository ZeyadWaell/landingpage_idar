import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async rewrites() {
    return [
      {
        source: "/api/nahla/:path*",
        destination: "https://swagger.nahlare.com/:path*",
      },
    ];
  },
};

export default nextConfig;
