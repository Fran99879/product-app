import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.111",
    "192.168.1.125",
    "localhost",
  ],
  images: {
    // Permitir imágenes remotas (URLs cargadas a mano hoy; ajustar al pasar a Cloudinary/S3).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
