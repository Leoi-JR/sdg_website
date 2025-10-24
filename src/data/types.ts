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
  bilibiliUrlEn?: string; // 英文版Bilibili链接（可选）
  mp4Url?: string; // MP4视频链接（可选）
  mp4UrlEn?: string; // 英文版MP4视频链接（可选）
  thumbnailPath: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface ContentData {
  reports: Report[];
  videos: Video[];
}
