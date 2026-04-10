import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        turbopackUseSystemTlsCerts: true,
    },
    output: 'standalone',
};

export default nextConfig;