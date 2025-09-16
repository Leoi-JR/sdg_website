'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import PdfViewer from '@/components/ui/PdfViewer';
import { useTranslations } from '@/components/providers/IntlProvider';

interface Report {
  id: number;
  title: string;
  description: string;
  pdfUrl: string;
  gradientFrom: string;
  gradientTo: string;
}

interface PdfPageClientProps {
  report: Report;
}

const PdfPageClient: React.FC<PdfPageClientProps> = ({ report }) => {
  const t = useTranslations('pdf');

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* 导航栏 */}
      <Header />
      
      {/* PDF查看器内容区域 */}
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 页面标题和描述 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl sm:text-4xl font-bold">
                <span className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent">
                  {report.title}
                </span>
              </h1>
              
              {/* 操作按钮 */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <span>←</span>
                  {t('backToReports')}
                </button>

                <a
                  href={report.pdfUrl}
                  download={`${report.title}.pdf`}
                  className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
                >
                  <span>⬇</span>
                  {t('downloadPdf')}
                </a>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg max-w-4xl">
              {report.description}
            </p>
          </div>

          {/* PDF查看器 */}
          <div className="bg-[#1a1a1f] rounded-xl p-6 shadow-2xl">
            <PdfViewer 
              pdfUrl={report.pdfUrl} 
              title={report.title}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PdfPageClient;
