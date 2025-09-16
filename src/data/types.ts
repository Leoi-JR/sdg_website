// 数据类型定义文件

export interface Report {
  id: number;
  routeId: string; // 用于路由的ID
  titleKey: string; // 国际化键名
  descriptionKey: string; // 国际化键名
  pdfUrl: string;
  thumbnailPath: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface Video {
  id: number;
  titleKey: string; // 国际化键名
  descriptionKey: string; // 国际化键名
  bilibiliUrl: string;
  thumbnailPath: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface ContentData {
  reports: Report[];
  videos: Video[];
}
