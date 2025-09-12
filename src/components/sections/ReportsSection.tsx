'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ScrollAnimation from '../animations/ScrollAnimation';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

// PDF报告数据
const reports = [
  {
    id: 1,
    routeId: 'shenzhen-sdg', // 用于路由的ID
    title: '深圳SDG实践报告',
    description: '展示深圳市在可持续发展目标实践中的创新举措、成功案例和经验总结，为其他城市提供借鉴。',
    pdfUrl: 'https://pub-abdfc2e3309449f5a5cd3ecd63fcc16b.r2.dev/SZSDGs.pdf',
    // 占位符图片路径 - 实际使用时需要替换为真实图片
    thumbnailPath: '/images/reports/shenzhen-sdg-thumbnail.jpg',
    gradientFrom: 'from-[#00ff88]/20',
    gradientTo: 'to-[#00d4ff]/20'
  },
  {
    id: 2,
    routeId: 'city-sdg', // 用于路由的ID
    title: '城市SDG发展报告',
    description: '深入分析城市可持续发展目标的实施现状、挑战与机遇，为城市规划者和政策制定者提供专业指导。',
    pdfUrl: 'https://pub-abdfc2e3309449f5a5cd3ecd63fcc16b.r2.dev/CitySDGs.pdf',
    // 占位符图片路径 - 实际使用时需要替换为真实图片
    thumbnailPath: '/images/reports/city-sdg-thumbnail.jpg',
    gradientFrom: 'from-[#00d4ff]/20',
    gradientTo: 'to-[#00ff88]/20'
  }
];

// 视频数据
const videos = [
  {
    id: 1,
    title: '深圳SDG实践报告 - 视频介绍',
    description: '通过视频深入了解深圳市在可持续发展目标实践中的创新举措和成功经验。',
    bilibiliUrl: '//player.bilibili.com/player.html?isOutside=true&aid=859483287&bvid=BV1SV4y1G7gZ&cid=871349544&p=1',
    // 占位符图片路径 - 实际使用时需要替换为真实图片
    thumbnailPath: '/images/videos/shenzhen-sdg-video-thumbnail.jpg',
    gradientFrom: 'from-[#00ff88]/20',
    gradientTo: 'to-[#00d4ff]/20'
  },
  {
    id: 2,
    title: '城市SDG发展报告 - 视频介绍',
    description: '视频解读城市可持续发展目标的实施现状、面临挑战以及未来发展机遇。',
    bilibiliUrl: '//player.bilibili.com/player.html?isOutside=true&aid=112750793592788&bvid=BV1eeaFeaErX&cid=500001608959623&p=1',
    // 占位符图片路径 - 实际使用时需要替换为真实图片
    thumbnailPath: '/images/videos/city-sdg-video-thumbnail.jpg',
    gradientFrom: 'from-[#00d4ff]/20',
    gradientTo: 'to-[#00ff88]/20'
  }
];

const ReportsSection: React.FC = () => {
  const router = useRouter();

  // 视频模态框状态
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');

  // PDF预览处理函数 - 跳转到内部PDF查看器页面
  const handlePdfPreview = (routeId: string) => {
    router.push(`/pdf/${routeId}`);
  };

  // 视频播放处理函数
  const handleVideoPlay = (videoUrl: string, title: string) => {
    setCurrentVideoUrl(videoUrl);
    setCurrentVideoTitle(title);
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
                SDG报告
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              深入研究可持续发展目标，提供专业的分析报告和实践指导
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
                    alt={`${report.title}封面`}
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
                      <span className="text-sm">在线预览</span>
                    </div>
                  </div>
                </div>

                {/* 报告信息 */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#00d4ff] transition-colors duration-200">
                  {report.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {report.description}
                </p>

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                      e?.stopPropagation();
                      handlePdfPreview(report.routeId);
                    }}
                  >
                    在线预览
                  </Button>
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
                相关视频
              </span>
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              通过视频更直观地了解SDG报告的核心内容和实践案例
            </p>
          </div>
        </ScrollAnimation>

        {/* 视频卡片区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <ScrollAnimation key={video.id} delay={1.0 + index * 0.2}>
              <Card className="group cursor-pointer" onClick={() => handleVideoPlay(video.bilibiliUrl, video.title)}>
                {/* 视频缩略图 */}
                <div className="h-48 rounded-lg mb-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  {/* 视频缩略图图片 */}
                  <img
                    src={video.thumbnailPath}
                    alt={`${video.title}缩略图`}
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
                      <span className="text-sm">播放视频</span>
                    </div>
                  </div>
                </div>

                {/* 视频信息 */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#00d4ff] transition-colors duration-200">
                  {video.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {video.description}
                </p>

                {/* 播放按钮 */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                      e?.stopPropagation();
                      handleVideoPlay(video.bilibiliUrl, video.title);
                    }}
                  >
                    播放视频
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
          <iframe
            src={currentVideoUrl}
            className="w-full h-full border-0 rounded-b-xl"
            allowFullScreen
            title={currentVideoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      </Modal>
    </section>
  );
};

export default ReportsSection;
