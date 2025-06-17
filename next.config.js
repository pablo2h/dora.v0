/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
  },
  images: {
    domains: [],
    unoptimized: false,
  },
}

module.exports = nextConfig