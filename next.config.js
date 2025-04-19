/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // This is important to allow importing from node_modules
  transpilePackages: ['phaser'],
  // Ensure webpack can handle the Phaser file requirements
  webpack: (config) => {
    // Add support for importing various file types used by Phaser
    config.module.rules.push({
      test: /\.woff2?$|\.ttf$|\.eot$|\.wav$|\.mp3$|\.png$/,
      type: 'asset/resource',
    });
    
    return config;
  },
};

module.exports = nextConfig;