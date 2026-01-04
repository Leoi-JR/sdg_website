import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import "../globals.css";
import { locales, type Locale } from '@/i18n';
import { IntlProvider } from '@/components/providers/IntlProvider';

export const metadata: Metadata = {
  title: "SDG Explorer",
  description: "展示SDG报告、微信小程序和桌游项目的专业宣传网站，致力于推动可持续发展目标的实现",
  keywords: "SDG, 可持续发展目标, 环保, 社会责任, 创新",
  authors: [{ name: "SDG团队" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

async function getMessages(locale: Locale) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    throw new Error(`Failed to load messages for locale: ${locale}`);
  }
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;

  // 验证语言参数
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 获取消息
  const messages = await getMessages(locale as Locale);

  return (
    <html lang={locale}>
      <head>
        <script defer src="http://182.61.56.252:3000/script.js" data-website-id="45b5481e-de7a-4809-acbe-352cb279e641"></script>
      </head>
      <body className="antialiased">
        <IntlProvider messages={messages} locale={locale as Locale}>
          <div className="text-sm text-gray-500 p-2">Current locale: {locale}</div>
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}
