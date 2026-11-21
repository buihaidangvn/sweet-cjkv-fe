import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isGitHubPages ? "/sweet-cjkv-fe" : "",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: "export",
};

export default nextConfig;
