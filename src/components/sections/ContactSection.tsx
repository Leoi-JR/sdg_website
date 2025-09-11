'use client';

import React from 'react';
import ScrollAnimation from '../animations/ScrollAnimation';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f14]">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent">
                联系我们
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              期待与您合作，共同推进可持续发展目标的实现
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScrollAnimation delay={0.2}>
            <Card>
              <h3 className="text-2xl font-semibold mb-6">团队信息</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00d4ff] rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs">📧</span>
                  </div>
                  <div>
                    <p className="font-medium">邮箱</p>
                    <p className="text-gray-400">contact@sdg-team.com</p>
                  </div>
                </div>
                {/* <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00ff88] rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs">📱</span>
                  </div>
                  <div>
                    <p className="font-medium">电话</p>
                    <p className="text-gray-400">+86 123-4567-8900</p>
                  </div>
                </div> */}
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00d4ff] rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs">📍</span>
                  </div>
                  <div>
                    <p className="font-medium">地址</p>
                    <p className="text-gray-400">中国 · 深圳市</p>
                  </div>
                </div>
              </div>

              {/* <div className="mt-8">
                <h4 className="font-semibold mb-4">关注我们</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-[#1a1a1f] border border-[#2a2a2f] rounded-lg flex items-center justify-center hover:border-[#00d4ff] transition-colors duration-200">
                    <span className="text-sm">微信</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#1a1a1f] border border-[#2a2a2f] rounded-lg flex items-center justify-center hover:border-[#00d4ff] transition-colors duration-200">
                    <span className="text-sm">微博</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#1a1a1f] border border-[#2a2a2f] rounded-lg flex items-center justify-center hover:border-[#00d4ff] transition-colors duration-200">
                    <span className="text-sm">LI</span>
                  </a>
                </div>
              </div> */}
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={0.4}>
            <Card>
              <h3 className="text-2xl font-semibold mb-6">合作咨询</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">姓名</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-[#2a2a2f] border border-[#3a3a3f] rounded-lg focus:outline-none focus:border-[#00d4ff] transition-colors duration-200"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">邮箱</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-[#2a2a2f] border border-[#3a3a3f] rounded-lg focus:outline-none focus:border-[#00d4ff] transition-colors duration-200"
                    placeholder="请输入您的邮箱"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">消息</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-[#2a2a2f] border border-[#3a3a3f] rounded-lg focus:outline-none focus:border-[#00d4ff] transition-colors duration-200 resize-none"
                    placeholder="请描述您的合作需求..."
                  />
                </div>
                <Button className="w-full">
                  发送消息
                </Button>
              </form>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
