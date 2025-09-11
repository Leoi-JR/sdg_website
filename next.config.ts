import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  // 允许加载外部PDF文件
  images: {
    domains: ['urbansdg.gz.bcebos.com'],
  },
};

export default nextConfig;
