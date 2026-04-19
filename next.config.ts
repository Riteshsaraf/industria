import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        turbopackUseSystemTlsCerts: true,
    },
    output: 'standalone',
    images: {
        domains: ['picsum.photos'],
    },
};

export default nextConfig;