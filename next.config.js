/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  images: {
    domains: [
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'cdn.sanity.io',
      's.gravatar.com',
      'platform-lookaside.fbsbx.com',
    ],
  },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: { domains: ['lh3.googleusercontent.com'] },
// };

// module.exports = nextConfig;
