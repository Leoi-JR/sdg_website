import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SDG宣传展示网站 | 可持续发展目标",
  description: "展示SDG报告、微信小程序和桌游项目的专业宣传网站，致力于推动可持续发展目标的实现",
  keywords: "SDG, 可持续发展目标, 环保, 社会责任, 创新",
  authors: [{ name: "SDG团队" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
