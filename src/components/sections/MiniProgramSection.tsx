'use client';

import React from 'react';
import ScrollAnimation from '../animations/ScrollAnimation';
import Card from '../ui/Card';

// 小程序数据
const miniProgramData = {
  title: '心情分享小程序',
  description: '一个温暖的心情分享平台，让用户可以记录和分享日常的心情状态，支持文字描述和图片上传，构建积极的社交环境。',
  // 占位符二维码路径 - 实际使用时需要替换为真实二维码图片
  qrCodePath: '/images/qrcodes/mood-sharing-miniprogram-qr.jpg',
  features: [
    { text: '文本心情分享', color: 'bg-[#00d4ff]' },
    { text: '图片上传功能', color: 'bg-[#00ff88]' },
    { text: '社交互动体验', color: 'bg-[#00d4ff]' }
  ]
};

const MiniProgramSection: React.FC = () => {
  return (
    <section id="miniprogram" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f14]">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent">
                微信小程序
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              用户心情分享平台，支持文本和图片分享功能
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <Card className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">{miniProgramData.title}</h3>
                <p className="text-gray-400 mb-6">
                  {miniProgramData.description}
                </p>
                <div className="space-y-2">
                  {miniProgramData.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <span className={`w-2 h-2 ${feature.color} rounded-full mr-3`}></span>
                      {feature.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-lg overflow-hidden relative">
                  {/* 小程序二维码图片 */}
                  <img
                    src={miniProgramData.qrCodePath}
                    alt="心情分享小程序二维码"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 图片加载失败时的回退方案
                      const target = e.target as HTMLImageElement;
                      const container = target.parentElement!;
                      target.style.display = 'none';

                      // 添加渐变背景和占位符内容
                      container.classList.add('bg-gradient-to-br', 'from-[#00d4ff]/20', 'to-[#00ff88]/20', 'flex', 'items-center', 'justify-center');

                      // 创建占位符内容
                      const placeholder = document.createElement('span');
                      placeholder.className = 'text-gray-400';
                      placeholder.textContent = '小程序二维码';
                      container.appendChild(placeholder);
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default MiniProgramSection;
