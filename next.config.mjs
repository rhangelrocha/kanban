/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api-kanban.aedigital.dev',

            }
        ]
    }
};

export default nextConfig;
