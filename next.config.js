/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },

  // Allow importing from node_modules (Phaser)
  transpilePackages: ["phaser"],

  // Empty turbopack config to silence warning (Phaser works fine with Turbopack)
  turbopack: {},

  // Webpack config kept for fallback builds
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff2?|ttf|eot|wav|mp3|png)$/,
      type: "asset/resource",
    });

    return config;
  },
};

module.exports = nextConfig;
