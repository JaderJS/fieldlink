/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*'
            },
            {
                protocol: 'http',
                hostname: '*'
            },
        ]
    },
    // serverExternalPackages: ['@react-pdf/renderer'],
    output: "standalone",
    transpilePackages: ["@react-pdf/renderer"],

}

export default nextConfig;
