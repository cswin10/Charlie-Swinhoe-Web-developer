/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    config.externals.push({
      'three': 'three'
    });
    return config;
  },
}

module.exports = nextConfig
