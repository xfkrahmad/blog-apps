/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'tailwindui.com',
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'upload.wikimedia.org',
      'cdn.mos.cms.futurecdn.net',
      'images.barrons.com',
      'awsimages.detik.net.id',
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
