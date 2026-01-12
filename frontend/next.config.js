/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath: process.env.NODE_ENV === 'production' ? '/HireMind-AI' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/HireMind-AI/' : '',
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    },
};

module.exports = nextConfig;


