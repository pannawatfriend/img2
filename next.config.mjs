/** @type {import('next').NextConfig} */

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
const nextConfig = {
    reactStrictMode: true,
    rewrites: async () => [
        {
            source: "/api/dataslot/:path*",
            destination: `${
                isProduction ? "http://localhost:3000" : ""
            }/:path*`,
        },
    ],
}

export default nextConfig
