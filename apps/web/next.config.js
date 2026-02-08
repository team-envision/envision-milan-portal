const nextConfig = {
  // output: 'standalone',
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