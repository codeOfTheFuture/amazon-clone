/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["fakestoreapi.com"],
  },
  basePath: "",
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  }
};

module.exports = nextConfig;
