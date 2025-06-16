/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
  },
  images: {
    domains: [],
    unoptimized: false,
  },
  // Removed output: 'standalone' to fix manifest issues
  generateStaticParams: true,
  swcMinify: true,
}

module.exports = nextConfig