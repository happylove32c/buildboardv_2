import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: (config) => config,
  experimental: {
    // turbo: true
  },

  allowedDevOrigins: [
    '127.0.0.1',
    'localhost',
    '*.github.dev', // allow Codespaces preview URLs
  ]
  /* config options here */
};

export default nextConfig;
