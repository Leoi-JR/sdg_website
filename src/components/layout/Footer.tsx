'use client';

import React from 'react';
import { useTranslations } from '@/components/providers/IntlProvider';

const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const nav = useTranslations('navigation');
  return (
    <footer className="bg-[#1a1a1f] border-t border-[#2a2a2f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent">
              {t('brandTitle')}
            </h3>
            <p className="text-gray-400 text-sm">
              {t('brandDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#reports" className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors duration-200">
                  {nav('reports')}
                </a>
              </li>
              <li>
                <a href="#miniprogram" className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors duration-200">
                  {nav('miniprogram')}
                </a>
              </li>
              <li>
                <a href="#boardgame" className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors duration-200">
                  {nav('boardgame')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors duration-200">
                  {nav('contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('contactInfo')}</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{t('email')}: contact@jusike.top</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2a2a2f] mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            {t('copyright')} |
            <a href="#" className="hover:text-[#00d4ff] ml-1 transition-colors duration-200">{t('privacyPolicy')}</a> |
            <a href="#" className="hover:text-[#00d4ff] ml-1 transition-colors duration-200">{t('termsOfService')}</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
