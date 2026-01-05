import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许加载外部图片和PDF文件
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'urbansdg.gz.bcebos.com',
      },
      {
        protocol: 'https',
        hostname: 'data.mofimo.cn',
      },
    ],
  },
};

export default nextConfig;
