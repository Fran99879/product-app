import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.111",
    "192.168.1.125",
    "localhost",
  ],
};

export default nextConfig;
