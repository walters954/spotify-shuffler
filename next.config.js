/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.scdn.co",
            },
            {
                protocol: "https",
                hostname: "*.spotifycdn.com",
            },
        ],
        // Optimize image sizes
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
        formats: ["image/webp"],
    },
    // Add caching headers
    async headers() {
        return [
            {
                source: "/fonts/:font*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/_next/image/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=60, stale-while-revalidate=60",
                    },
                ],
            },
            {
                source: "/_next/static/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
