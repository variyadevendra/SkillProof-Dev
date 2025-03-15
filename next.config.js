/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['randomuser.me'],
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even with
    // ESLint errors. Remove this once you've fixed the errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even with
    // TypeScript errors. Remove this once you've fixed the errors.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 