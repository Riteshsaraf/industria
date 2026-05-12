import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        turbopackUseSystemTlsCerts: true,
    },
    output: 'standalone',
   
    images: {
          unoptimized: true,
        domains: ['picsum.photos'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;