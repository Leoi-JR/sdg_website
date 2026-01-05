'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/components/providers/IntlProvider';
import { usePathname } from 'next/navigation';
import ScrollAnimation from '../animations/ScrollAnimation';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { getReports, getVideos } from '@/data/content';

const ReportsSection: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'zh';
  const t = useTranslations('reports');
  const tGlobal = useTranslations(); // 用于访问全局翻译键

  // 从数据文件获取数据
  const reports = getReports();
  const videos = getVideos();

  // 报告统计数据状态
  const [reportStats, setReportStats] = useState<Record<string, { views: number; downloads: number }>>({
    'shenzhen-sdg': { views: 0, downloads: 0 },
    'city-sdg': { views: 0, downloads: 0 }
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // 视频模态框状态
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');

  // 获取统计数据
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const response = await fetch('/api/stats');
        const data = await response.json();
        setReportStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // PDF预览处理函数 - 跳转到内部PDF查看器页面
  const handlePdfPreview = (routeId: string) => {
    router.push(`/${locale}/pdf/${routeId}`);
  };

  // 视频播放处理函数
  const handleVideoPlay = (video: typeof videos[0]) => {
    // 根据当前语言选择合适的视频源
    let videoUrl = video.bilibiliUrl;
    
    if (locale === 'en') {
      // 英文环境：优先使用英文MP4，其次英文Bilibili，最后默认Bilibili
      if (video.mp4UrlEn) {
        videoUrl = video.mp4UrlEn;
      } else if (video.bilibiliUrlEn) {
        videoUrl = video.bilibiliUrlEn;
      }
    } else {
      // 中文环境：优先使用中文MP4，其次默认Bilibili
      if (video.mp4Url) {
        videoUrl = video.mp4Url;
      }
    }
    
    setCurrentVideoUrl(videoUrl);
    setCurrentVideoTitle(tGlobal(video.titleKey));
    setIsVideoModalOpen(true);
  };

  // 关闭视频模态框
  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideoUrl('');
    setCurrentVideoTitle('');
  };

  return (
    <section id="reports" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reports.map((report, index) => (
            <ScrollAnimation key={report.id} delay={0.2 + index * 0.2}>
              <Card className="group cursor-pointer" onClick={() => handlePdfPreview(report.routeId)}>
                {/* 报告缩略图 */}
                <div className={`h-48 bg-gradient-to-br ${report.gradientFrom} ${report.gradientTo} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                  {/* 这里将来可以替换为实际的报告封面图片 */}
                  <img
                    src={report.thumbnailPath}
                    alt={`${tGlobal(report.titleKey)}封面`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 图片加载失败时的回退方案
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.classList.add('bg-gradient-to-br', report.gradientFrom, report.gradientTo, 'flex', 'items-center', 'justify-center');
                      target.parentElement!.innerHTML = `
                        <div class="text-center">
                          <div class="text-4xl mb-2">📊</div>
                          <span class="text-gray-300 text-sm">点击预览PDF</span>
                        </div>
                      `;
                    }}
                  />
                  
                  {/* 悬浮时的预览提示 */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl mb-2">👁️</div>
                      <span className="text-sm">{t('onlinePreview')}</span>
                    </div>
                  </div>
                </div>

                {/* 报告信息 */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#00d4ff] transition-colors duration-200">
                  {tGlobal(report.titleKey)}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {tGlobal(report.descriptionKey)}
                </p>

                {/* 操作按钮 */}
                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                      e?.stopPropagation();
                      handlePdfPreview(report.routeId);
                    }}
                  >
                    {t('onlinePreview')}
                  </Button>

                  {/* 统计信息 */}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <span className="text-base">👁️</span>
                      <span>{statsLoading ? '...' : (reportStats[report.routeId]?.views.toLocaleString() || '0')}</span>
                      <span className="text-xs">{t('views')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-base">⬇️</span>
                      <span>{statsLoading ? '...' : (reportStats[report.routeId]?.downloads.toLocaleString() || '0')}</span>
                      <span className="text-xs">{t('downloads')}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* 视频介绍区域 */}
        <ScrollAnimation delay={0.8}>
          <div className="text-center mt-20 mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent">
                {t('videosTitle')}
              </span>
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('videosDescription')}
            </p>
          </div>
        </ScrollAnimation>

        {/* 视频卡片区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <ScrollAnimation key={video.id} delay={1.0 + index * 0.2}>
              <Card className="group cursor-pointer" onClick={() => handleVideoPlay(video)}>
                {/* 视频缩略图 */}
                <div className="h-48 rounded-lg mb-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  {/* 视频缩略图图片 */}
                  <img
                    src={video.thumbnailPath}
                    alt={`${tGlobal(video.titleKey)}缩略图`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 图片加载失败时的回退方案
                      const target = e.target as HTMLImageElement;
                      const container = target.parentElement!;
                      target.style.display = 'none';

                      // 添加渐变背景和占位符内容
                      container.classList.add('bg-gradient-to-br', video.gradientFrom, video.gradientTo, 'flex', 'items-center', 'justify-center');

                      // 创建占位符内容
                      const placeholder = document.createElement('div');
                      placeholder.className = 'text-center';
                      placeholder.innerHTML = `
                        <div class="text-5xl mb-2">🎬</div>
                        <span class="text-gray-300 text-sm">点击观看视频</span>
                      `;
                      container.appendChild(placeholder);
                    }}
                  />

                  {/* 悬浮时的播放提示 */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-[#00d4ff]/20 backdrop-blur-sm border-2 border-[#00d4ff] rounded-full flex items-center justify-center mb-2">
                        <div className="text-2xl">▶️</div>
                      </div>
                      <span className="text-sm">{t('playVideo')}</span>
                    </div>
                  </div>
                </div>

                {/* 视频信息 */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#00d4ff] transition-colors duration-200">
                  {tGlobal(video.titleKey)}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {tGlobal(video.descriptionKey)}
                </p>

                {/* 播放按钮 */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                      e?.stopPropagation();
                      handleVideoPlay(video);
                    }}
                  >
                    {t('playVideo')}
                  </Button>
                </div>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* 视频播放模态框 */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideoModal}
        title={currentVideoTitle}
        size="video"
      >
        <div className="w-full bg-black rounded-b-xl" style={{ aspectRatio: '16/9' }}>
          {currentVideoUrl.endsWith('.mp4') ? (
            // MP4视频使用video标签
            <video
              src={currentVideoUrl}
              className="w-full h-full border-0 rounded-b-xl"
              controls
              autoPlay
              title={currentVideoTitle}
            >
              您的浏览器不支持视频播放。
            </video>
          ) : (
            // Bilibili等嵌入式播放器使用iframe
            <iframe
              src={currentVideoUrl}
              className="w-full h-full border-0 rounded-b-xl"
              allowFullScreen
              title={currentVideoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          )}
        </div>
      </Modal>
    </section>
  );
};

export default ReportsSection;
