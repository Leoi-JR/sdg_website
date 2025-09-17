'use client';

import React, { useState } from 'react';
import { useTranslations } from '@/components/providers/IntlProvider';
import ScrollAnimation from '../animations/ScrollAnimation';
import Card from '../ui/Card';
import Button from '../ui/Button';

// 表单数据接口
interface FormData {
  name: string;
  email: string;
  organization: string;
  position: string;
  message: string;
}

// 表单错误接口
interface FormErrors {
  name?: string;
  email?: string;
  organization?: string;
  position?: string;
  message?: string;
}

const ContactSection: React.FC = () => {
  const t = useTranslations('contact');

  // 表单状态
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    position: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // 邮箱验证正则表达式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 表单验证函数
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 验证姓名
    if (!formData.name.trim()) {
      newErrors.name = t('form.nameRequired');
    }

    // 验证邮箱
    if (!formData.email.trim()) {
      newErrors.email = t('form.emailRequired');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('form.emailInvalid');
    }

    // 验证机构/学校
    if (!formData.organization.trim()) {
      newErrors.organization = t('form.organizationRequired');
    }

    // 验证职位
    if (!formData.position.trim()) {
      newErrors.position = t('form.positionRequired');
    }

    // 验证消息
    if (!formData.message.trim()) {
      newErrors.message = t('form.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('form.messageTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理输入变化
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    // 清除提交状态
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  // 表单提交处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // 调用实际的API接口
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');

        // 清空表单
        setFormData({
          name: '',
          email: '',
          organization: '',
          position: '',
          message: ''
        });
      } else {
        console.error('API错误:', result);
        setSubmitStatus('error');
      }

    } catch (error) {
      console.error('网络错误:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f14]">
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
          <ScrollAnimation delay={0.2}>
            <Card>
              <h3 className="text-2xl font-semibold mb-6">{t('teamInfo')}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00d4ff] rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs">📧</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('email')}</p>
                    <p className="text-gray-400">contact@jusike.top</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00d4ff] rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs">📍</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('address')}</p>
                    <p className="text-gray-400">{t('addressValue')}</p>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={0.4}>
            <Card>
              <h3 className="text-2xl font-semibold mb-6">{t('cooperation')}</h3>

              {/* 提交状态提示 */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm">{t('form.submitSuccess')}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{t('form.submitError')}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 第一行：姓名和邮箱 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('form.name')}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-2 bg-[#2a2a2f] border rounded-lg focus:outline-none transition-colors duration-200 ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#3a3a3f] focus:border-[#00d4ff]'
                      }`}
                      placeholder={t('form.namePlaceholder')}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('form.email')}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-2 bg-[#2a2a2f] border rounded-lg focus:outline-none transition-colors duration-200 ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#3a3a3f] focus:border-[#00d4ff]'
                      }`}
                      placeholder={t('form.emailPlaceholder')}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* 第二行：机构/学校和职位 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('form.organization')}</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      className={`w-full px-4 py-2 bg-[#2a2a2f] border rounded-lg focus:outline-none transition-colors duration-200 ${
                        errors.organization
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#3a3a3f] focus:border-[#00d4ff]'
                      }`}
                      placeholder={t('form.organizationPlaceholder')}
                      disabled={isSubmitting}
                    />
                    {errors.organization && (
                      <p className="mt-1 text-sm text-red-400">{errors.organization}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('form.position')}</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className={`w-full px-4 py-2 bg-[#2a2a2f] border rounded-lg focus:outline-none transition-colors duration-200 ${
                        errors.position
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#3a3a3f] focus:border-[#00d4ff]'
                      }`}
                      placeholder={t('form.positionPlaceholder')}
                      disabled={isSubmitting}
                    />
                    {errors.position && (
                      <p className="mt-1 text-sm text-red-400">{errors.position}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('form.message')}</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-2 bg-[#2a2a2f] border rounded-lg focus:outline-none transition-colors duration-200 resize-none ${
                      errors.message
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[#3a3a3f] focus:border-[#00d4ff]'
                    }`}
                    placeholder={t('form.messagePlaceholder')}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
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
