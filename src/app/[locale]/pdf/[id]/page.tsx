import React from 'react';
import { notFound } from 'next/navigation';
import PdfPageClient from './PdfPageClient';
import { getReportByRouteId } from '@/data/content';

interface PdfPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PdfPage({ params }: PdfPageProps) {
  const { id } = await params;
  const report = getReportByRouteId(id);

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
  const report = getReportByRouteId(id);

  if (!report) {
    return {
      title: '页面未找到 | SDG宣传展示网站',
    };
  }

  // 简化的元数据，使用翻译键作为后备
  return {
    title: `${report.titleKey} | SDG宣传展示网站`,
    description: report.descriptionKey,
  };
}
