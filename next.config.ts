import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoBasePath = "/learning-vault";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubActions ? repoBasePath : undefined,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["three"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
