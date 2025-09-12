import React from 'react';
import { notFound } from 'next/navigation';
import PdfPageClient from './PdfPageClient';

// PDF报告数据映射
const pdfData = {
  'shenzhen-sdg': {
    id: 1,
    title: '深圳SDG实践报告',
    description: '展示深圳市在可持续发展目标实践中的创新举措、成功案例和经验总结，为其他城市提供借鉴。',
    pdfUrl: 'https://pub-abdfc2e3309449f5a5cd3ecd63fcc16b.r2.dev/SZSDGs.pdf',
    gradientFrom: 'from-[#00ff88]/20',
    gradientTo: 'to-[#00d4ff]/20'
  },
  'city-sdg': {
    id: 2,
    title: '城市SDG发展报告',
    description: '深入分析城市可持续发展目标的实施现状、挑战与机遇，为城市规划者和政策制定者提供专业指导。',
    pdfUrl: 'https://pub-abdfc2e3309449f5a5cd3ecd63fcc16b.r2.dev/CitySDGs.pdf',
    gradientFrom: 'from-[#00d4ff]/20',
    gradientTo: 'to-[#00ff88]/20'
  }
};

interface PdfPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PdfPage({ params }: PdfPageProps) {
  const { id } = await params;
  const report = pdfData[id as keyof typeof pdfData];

  // 如果找不到对应的PDF报告，返回404
  if (!report) {
    notFound();
  }

  return <PdfPageClient report={report} />;
}

// 生成静态参数（可选，用于静态生成）
export async function generateStaticParams() {
  return [
    { id: 'shenzhen-sdg' },
    { id: 'city-sdg' },
  ];
}

// 页面元数据
export async function generateMetadata({ params }: PdfPageProps) {
  const { id } = await params;
  const report = pdfData[id as keyof typeof pdfData];

  if (!report) {
    return {
      title: '页面未找到 | SDG宣传展示网站',
    };
  }

  return {
    title: `${report.title} | SDG宣传展示网站`,
    description: report.description,
  };
}
