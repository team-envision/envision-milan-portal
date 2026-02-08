import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Required for monorepo (Turbo + workspaces)
  outputFileTracingRoot: path.join(__dirname, "../../"),

  // 🔴 CRITICAL: prevent AWS SDK from being bundled into .next/node_modules
  serverExternalPackages: [
    "@aws-sdk/client-s3",
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/util-dynamodb",
  ],

  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
