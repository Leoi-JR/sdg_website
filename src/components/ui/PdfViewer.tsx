'use client';

import React, { useState } from 'react';

interface PdfViewerProps {
  pdfUrl: string;
  title: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, title }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setError('PDF文件加载失败，请稍后重试');
    setLoading(false);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">PDF加载失败</h3>
        <p className="text-gray-400 mb-4">{error}</p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-medium rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          在新窗口中打开PDF
        </a>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* PDF显示区域 */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff] mx-auto mb-4"></div>
              <p className="text-gray-600">正在加载PDF...</p>
            </div>
          </div>
        )}

        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          className="w-full h-full border-0"
          title={title}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
