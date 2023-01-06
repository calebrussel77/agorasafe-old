/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  images: {
    domains: [
      'res.cloudinary.com',
      'pbs.twimg.com',
      'api.anence.com',
      'naver.github.io',
      'randomuser.me',
      'images.unsplash.com',
      'tailwindui.com',
    ],
  },
  eslint: {
    dirs: ['src'],
  },
};

module.exports = nextConfig;
