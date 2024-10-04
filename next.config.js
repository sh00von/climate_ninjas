// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // this allows images from any hostname
        },
      ],
    },
  }
  
  module.exports = nextConfig
  