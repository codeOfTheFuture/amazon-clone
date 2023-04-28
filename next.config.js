/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["fakestoreapi.com"],
  },
  basePath: ""
};

module.exports = nextConfig;
