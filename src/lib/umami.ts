// Umami Analytics 工具函数

// 扩展 Window 接口以包含 umami
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, string | number>) => void;
    };
  }
}

/**
 * 发送 Umami 事件
 * @param eventName 事件名称
 * @param data 事件数据
 */
export const trackEvent = (eventName: string, data?: Record<string, string | number>) => {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, data);
  }
};

/**
 * 跟踪 PDF 阅读事件
 */
export const trackPdfView = (reportTitle: string, reportId: string, url: string) => {
  // 为每个报告创建独立的事件名称
  const eventName = `${reportId}-view`;
  trackEvent(eventName, {
    reportTitle,
    url
  });
};

/**
 * 跟踪 PDF 下载事件
 */
export const trackPdfDownload = (reportTitle: string, reportId: string, url: string) => {
  // 为每个报告创建独立的事件名称
  const eventName = `${reportId}-download`;
  trackEvent(eventName, {
    reportTitle,
    url
  });
};
