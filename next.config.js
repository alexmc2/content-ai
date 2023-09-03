/** @type {import('next').NextConfig} */
const withVideos = require('next-videos');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'cdn.sanity.io',
      's.gravatar.com',
      'platform-lookaside.fbsbx.com',
      'replicate.com',
      'replicate.delivery',
      'pbxt.replicate.delivery',
      'res.cloudinary.com',
    ],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.com',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
    ],
  },
};

module.exports = withVideos(nextConfig);


