import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 明确使用 webpack 而不是 Turbopack（Next.js 16 默认使用 Turbopack）
  webpack: (config) => {
    // 配置PDF.js worker
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };

    // 处理PDF.js的worker文件
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      type: 'asset/resource',
      generator: {
        filename: 'static/worker/[hash][ext][query]',
      },
    });

    return config;
  },
  // 允许加载外部PDF文件（使用 remotePatterns 替代已弃用的 domains）
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'urbansdg.gz.bcebos.com',
      },
    ],
  },
};

export default nextConfig;
