/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },

  // Allow importing from node_modules (Phaser)
  transpilePackages: ["phaser"],

  // Pin turbopack root to this project directory
  turbopack: {
    root: __dirname,
  },

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
