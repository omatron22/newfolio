/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Add any external image domains here
    formats: ['image/avif', 'image/webp'],
  },
  // If you want to ensure faster page loads, you can enable this
  swcMinify: true,
};

module.exports = nextConfig;