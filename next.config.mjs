/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    domains: ['upload.wikimedia.org', 'en.wikipedia.org'],
  },
};

export default nextConfig;
