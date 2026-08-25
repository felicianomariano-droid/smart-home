import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/smart-home",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;