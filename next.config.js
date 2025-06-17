/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  serverExternalPackages: [],
  images: {
    domains: [],
    unoptimized: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig