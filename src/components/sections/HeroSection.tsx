'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '@/components/providers/IntlProvider';
import FadeIn from '../animations/FadeIn';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const t = useTranslations('hero');
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00d4ff]/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00ff88]/20 rounded-full blur-2xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-20">
        <FadeIn delay={0.2}>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent">
              {t('title')}
            </span>
            <br />
            <span className="text-white">{t('subtitle')}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
            {t('description')}
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" onClick={() => document.querySelector('#reports')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('viewReports')}
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('contactUs')}
            </Button>
          </div>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <FadeIn delay={0.8}>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-[#00d4ff] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#00d4ff] rounded-full mt-2" />
          </div>
        </motion.div>
      </FadeIn>
    </section>
  );
};

export default HeroSection;
