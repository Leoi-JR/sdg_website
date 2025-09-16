import { ContentData } from './types';

// SDG网站内容数据
export const contentData: ContentData = {
  // PDF报告数据
  reports: [
    {
      id: 1,
      routeId: 'shenzhen-sdg', // 用于路由的ID
      titleKey: 'reports.shenzhenReport.title',
      descriptionKey: 'reports.shenzhenReport.description',
      pdfUrl: 'https://data.jusike.top/SZSDGs.pdf',
      thumbnailPath: '/images/reports/shenzhen-sdg-thumbnail.jpg',
      gradientFrom: 'from-[#00ff88]/20',
      gradientTo: 'to-[#00d4ff]/20'
    },
    {
      id: 2,
      routeId: 'city-sdg', // 用于路由的ID
      titleKey: 'reports.cityReport.title',
      descriptionKey: 'reports.cityReport.description',
      pdfUrl: 'https://data.jusike.top/CitySDGs.pdf',
      thumbnailPath: '/images/reports/city-sdg-thumbnail.jpg',
      gradientFrom: 'from-[#00d4ff]/20',
      gradientTo: 'to-[#00ff88]/20'
    }
  ],

  // 视频数据
  videos: [
    {
      id: 1,
      titleKey: 'reports.shenzhenVideo.title',
      descriptionKey: 'reports.shenzhenVideo.description',
      bilibiliUrl: '//player.bilibili.com/player.html?isOutside=true&aid=859483287&bvid=BV1SV4y1G7gZ&cid=871349544&p=1',
      thumbnailPath: '/images/videos/shenzhen-sdg-video-thumbnail.jpg',
      gradientFrom: 'from-[#00ff88]/20',
      gradientTo: 'to-[#00d4ff]/20'
    },
    {
      id: 2,
      titleKey: 'reports.cityVideo.title',
      descriptionKey: 'reports.cityVideo.description',
      bilibiliUrl: '//player.bilibili.com/player.html?isOutside=true&aid=112750793592788&bvid=BV1eeaFeaErX&cid=500001608959623&p=1',
      thumbnailPath: '/images/videos/city-sdg-video-thumbnail.jpg',
      gradientFrom: 'from-[#00d4ff]/20',
      gradientTo: 'to-[#00ff88]/20'
    }
  ]
};

// 便捷的数据访问函数
export const getReports = () => contentData.reports;
export const getVideos = () => contentData.videos;
export const getReportByRouteId = (routeId: string) => 
  contentData.reports.find(report => report.routeId === routeId);
