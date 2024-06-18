
import nextPWA from "next-pwa";

const withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

};

export default withPWA(nextConfig);
