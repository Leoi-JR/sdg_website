import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1f] border-t border-[#2a2a2f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent">
              SDG团队
            </h3>
            <p className="text-gray-400 text-sm">
              致力于可持续发展目标的研究与实践，通过创新的方式推动社会进步。
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <a href="#reports" className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors duration-200">
                  SDG报告
                </a>
              </li>
              <li>
                <a href="#miniprogram" className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors duration-200">
                  微信小程序
                </a>
              </li>
              <li>
                <a href="#boardgame" className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors duration-200">
                  SDG桌游
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors duration-200">
                  联系我们
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">联系信息</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>邮箱: contact@sdg-team.com</p>
              {/* <p>电话: +86 123-4567-8900</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-200">
                  微信
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-200">
                  微博
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-200">
                  LinkedIn
                </a>
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2a2a2f] mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 SDG团队. 保留所有权利. | 
            <a href="#" className="hover:text-[#00d4ff] ml-1 transition-colors duration-200">隐私政策</a> | 
            <a href="#" className="hover:text-[#00d4ff] ml-1 transition-colors duration-200">使用条款</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
