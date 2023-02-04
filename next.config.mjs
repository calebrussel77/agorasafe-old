// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
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
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
};
export default config;
