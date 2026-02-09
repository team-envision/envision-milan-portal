/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // 1. THIS IS THE MISSING PART: Map your Env Vars here
  env: {
    DYNAMODB_TABLE_NAME: process.env.DYNAMODB_TABLE_NAME,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    REGION: process.env.REGION,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
};

export default nextConfig;