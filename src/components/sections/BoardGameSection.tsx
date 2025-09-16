'use client';

import React from 'react';
import { useTranslations } from '@/components/providers/IntlProvider';
import ScrollAnimation from '../animations/ScrollAnimation';
import Card from '../ui/Card';
import Button from '../ui/Button';

const BoardGameSection: React.FC = () => {
  const t = useTranslations('boardgame');
  return (
    <section id="boardgame" className="py-20 px-4 sm:px-6 lg:px-8">
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

        <ScrollAnimation delay={0.2}>
          <Card className="max-w-4xl mx-auto overflow-hidden" glow>
            <div
              className="relative bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/games/SDGsGame.png')" }}
            >
              {/* 毛玻璃效果遮罩层 */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

              {/* 内容区域 */}
              <div className="relative z-10 text-center p-8">
                <h3 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">{t('gameTitle')}</h3>
                <p className="text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
                  {t('gameDescription')}
                </p>
              
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center bg-black/20 backdrop-blur-[2px] rounded-lg p-4">
                    <div className="text-[#00d4ff] text-xl mb-2">🎯</div>
                    <h4 className="font-semibold mb-1 text-white drop-shadow-md">{t('features.educational')}</h4>
                    <p className="text-sm text-gray-200 drop-shadow-sm">{t('features.educationalDesc')}</p>
                  </div>
                  <div className="text-center bg-black/20 backdrop-blur-[2px] rounded-lg p-4">
                    <div className="text-[#00ff88] text-xl mb-2">🎮</div>
                    <h4 className="font-semibold mb-1 text-white drop-shadow-md">{t('features.entertaining')}</h4>
                    <p className="text-sm text-gray-200 drop-shadow-sm">{t('features.entertainingDesc')}</p>
                  </div>
                  <div className="text-center bg-black/20 backdrop-blur-[2px] rounded-lg p-4">
                    <div className="text-[#00d4ff] text-xl mb-2">👥</div>
                    <h4 className="font-semibold mb-1 text-white drop-shadow-md">{t('features.interactive')}</h4>
                    <p className="text-sm text-gray-200 drop-shadow-sm">{t('features.interactiveDesc')}</p>
                  </div>
                </div>

                <div className="bg-black/30 backdrop-blur-[2px] rounded-lg p-6 mb-6 border border-white/10">
                  <h4 className="text-lg font-semibold mb-2 text-[#00d4ff] drop-shadow-md">{t('comingSoon')}</h4>
                  <p className="text-gray-100 text-sm drop-shadow-sm">
                    {t('releaseInfo')}
                  </p>
                </div>

                {/* <Button size="lg">
                  预约通知
                </Button> */}
              </div>
            </div>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default BoardGameSection;
